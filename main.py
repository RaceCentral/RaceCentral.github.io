"""
RaceCentral 2.0 - Main Application
A modern, dynamic racing calendar app with FastAPI, Azure Table Storage, and HTMX.
"""

import asyncio
import json
import os
import logging
from datetime import datetime, timezone, timedelta
from contextlib import asynccontextmanager
from typing import Optional
from concurrent.futures import ThreadPoolExecutor

import httpx
import feedparser
import fastf1
from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.templating import Jinja2Templates
from azure.data.tables.aio import TableServiceClient as AsyncTableServiceClient
from ics import Calendar, Event

from utils import (
    get_track_info,
    get_series_logo,
    get_series_color,
    format_race_time,
    generate_row_key,
    RSS_FEEDS,
    TRACK_DATA,
)

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# =============================================================================
# CONFIGURATION
# =============================================================================

AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING", "")
TABLE_NAME = "RaceEvents"
PARTITION_KEY = "Season_2025"
DATA_SYNC_INTERVAL_HOURS = 24

# News cache (in-memory)
news_cache: dict = {"data": [], "timestamp": None}
NEWS_CACHE_TTL_MINUTES = 15

# =============================================================================
# FASTF1 INTEGRATION (Dynamic F1 Schedule)
# =============================================================================

# Thread pool for running FastF1 sync calls
executor = ThreadPoolExecutor(max_workers=2)


def fetch_f1_schedule_sync(year: int = 2025) -> list[dict]:
    """
    Fetch F1 schedule from FastF1 (synchronous).
    This replaces the deprecated Ergast API.
    """
    try:
        # Get the event schedule for the year
        schedule = fastf1.get_event_schedule(year)

        races = []
        for _, event in schedule.iterrows():
            # Skip testing events
            if event.get('EventFormat') == 'testing':
                continue

            # Get race session date (Session5 is typically the Race)
            # Try Session5DateUtc first, fallback to EventDate
            race_date = event.get('Session5DateUtc')
            if race_date is None or str(race_date) == 'NaT':
                race_date = event.get('EventDate')

            if race_date is None or str(race_date) == 'NaT':
                continue

            # Format date as ISO string
            if hasattr(race_date, 'isoformat'):
                date_str = race_date.isoformat()
                if not date_str.endswith('Z') and '+' not in date_str:
                    date_str += 'Z'
            else:
                date_str = str(race_date)

            races.append({
                "name": event.get('EventName', 'Unknown GP'),
                "circuit": event.get('Location', 'Unknown'),
                "country": event.get('Country', ''),
                "date": date_str,
                "round": event.get('RoundNumber', 0),
            })

        logger.info(f"Fetched {len(races)} F1 races for {year} from FastF1")
        return races

    except Exception as e:
        logger.error(f"Failed to fetch F1 schedule from FastF1: {e}")
        return []


async def fetch_f1_schedule(year: int = 2025) -> list[dict]:
    """
    Async wrapper for fetching F1 schedule.
    Runs the sync FastF1 call in a thread pool.
    """
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, fetch_f1_schedule_sync, year)


async def fetch_openf1_race_results(year: int, location: str) -> dict:
    """
    Fetch race results from OpenF1 API.
    OpenF1 provides real-time accurate race results.
    """
    try:
        async with httpx.AsyncClient() as client:
            # Get session info for the race
            sessions_url = f"https://api.openf1.org/v1/sessions?year={year}&session_name=Race"
            sessions_resp = await client.get(sessions_url, timeout=10.0)
            sessions = sessions_resp.json()

            # Find matching session by location
            session_key = None
            location_lower = location.lower()
            for s in sessions:
                if location_lower in s.get('location', '').lower() or \
                   location_lower in s.get('country_name', '').lower() or \
                   location_lower in s.get('circuit_short_name', '').lower():
                    session_key = s['session_key']
                    break

            if not session_key:
                logger.warning(f"No OpenF1 session found for {location}")
                return {}

            # Get drivers for this session
            drivers_url = f"https://api.openf1.org/v1/drivers?session_key={session_key}"
            drivers_resp = await client.get(drivers_url, timeout=10.0)
            drivers_data = drivers_resp.json()

            # Create driver number to name mapping
            driver_map = {}
            for d in drivers_data:
                driver_map[d['driver_number']] = {
                    'full_name': f"{d.get('first_name', '')} {d.get('last_name', '')}".strip(),
                    'abbreviation': d.get('name_acronym', ''),
                    'team': d.get('team_name', ''),
                }

            # Get final positions
            positions_url = f"https://api.openf1.org/v1/position?session_key={session_key}"
            positions_resp = await client.get(positions_url, timeout=10.0)
            positions_data = positions_resp.json()

            # Get the latest position for each driver
            latest_positions = {}
            for p in positions_data:
                driver_num = p['driver_number']
                latest_positions[driver_num] = p

            # Sort by position
            sorted_positions = sorted(
                latest_positions.values(),
                key=lambda x: x.get('position', 99)
            )

            # Build podium
            podium = []
            for p in sorted_positions[:3]:
                driver_num = p['driver_number']
                driver_info = driver_map.get(driver_num, {})
                podium.append({
                    "position": p['position'],
                    "driver": driver_info.get('abbreviation', ''),
                    "full_name": driver_info.get('full_name', f"Driver #{driver_num}"),
                    "team": driver_info.get('team', ''),
                })

            return {
                "winner": podium[0]["full_name"] if podium else "",
                "podium": podium,
            }

    except Exception as e:
        logger.error(f"Failed to fetch OpenF1 results for {location}: {e}")
        return {}


async def fetch_f1_race_results(year: int, round_number: int, location: str = "") -> dict:
    """
    Fetch F1 race results - tries OpenF1 first, falls back to FastF1.
    """
    # Try OpenF1 first (more reliable for recent races)
    if location:
        results = await fetch_openf1_race_results(year, location)
        if results and results.get("winner"):
            return results

    # Fallback to FastF1 (for historical data)
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, fetch_f1_race_results_sync, year, round_number)


def fetch_f1_race_results_sync(year: int, round_number: int) -> dict:
    """
    Fallback: Fetch race results from FastF1.
    Note: FastF1 data may be unreliable when Ergast API is down.
    """
    try:
        session = fastf1.get_session(year, round_number, 'R')
        session.load(telemetry=False, weather=False, messages=False)

        results = session.results
        if results is None or len(results) == 0:
            return {}

        # Check if Position data is available
        if results['Position'].notna().any():
            sorted_results = results[results['Position'].notna()].sort_values(by='Position')
        else:
            # Fallback to row order (may not be accurate)
            sorted_results = results

        podium = []
        for i in range(min(3, len(sorted_results))):
            driver = sorted_results.iloc[i]
            try:
                podium.append({
                    "position": i + 1,
                    "driver": str(driver.get('Abbreviation', '')),
                    "full_name": f"{driver.get('FirstName', '')} {driver.get('LastName', '')}".strip(),
                    "team": str(driver.get('TeamName', '')),
                })
            except (ValueError, KeyError) as e:
                logger.warning(f"Error parsing driver data: {e}")
                continue

        return {
            "winner": podium[0]["full_name"] if podium else "",
            "podium": podium,
        }
    except Exception as e:
        logger.error(f"Failed to fetch FastF1 results for round {round_number}: {e}")
        return {}

# 2026 NASCAR Cup Series Schedule
# Source: https://dailydownforce.com/all-confirmed-dates-on-the-2026-nascar-schedule-so-far/
NASCAR_2026_SCHEDULE = [
    {"name": "Daytona 500", "circuit": "Daytona International Speedway", "date": "2026-02-15T19:30:00Z", "network": "FOX"},
    {"name": "Atlanta 400", "circuit": "EchoPark Speedway", "date": "2026-02-22T20:00:00Z", "network": "FOX"},
    {"name": "COTA 400", "circuit": "Circuit of the Americas", "date": "2026-03-01T20:30:00Z", "network": "FOX"},
    {"name": "Phoenix 400", "circuit": "Phoenix Raceway", "date": "2026-03-08T20:30:00Z", "network": "FS1"},
    {"name": "Las Vegas 400", "circuit": "Las Vegas Motor Speedway", "date": "2026-03-15T21:00:00Z", "network": "FS1"},
    {"name": "Darlington 400", "circuit": "Darlington Raceway", "date": "2026-03-22T20:00:00Z", "network": "FS1"},
    {"name": "Martinsville 400", "circuit": "Martinsville Speedway", "date": "2026-03-29T20:30:00Z", "network": "FS1"},
    {"name": "Bristol 500", "circuit": "Bristol Motor Speedway", "date": "2026-04-12T20:00:00Z", "network": "FS1"},
    {"name": "Kansas 400", "circuit": "Kansas Speedway", "date": "2026-04-19T19:00:00Z", "network": "FOX"},
    {"name": "Talladega 500", "circuit": "Talladega Superspeedway", "date": "2026-04-26T20:00:00Z", "network": "FOX"},
    {"name": "Texas 500", "circuit": "Texas Motor Speedway", "date": "2026-05-03T20:30:00Z", "network": "FS1"},
    {"name": "Watkins Glen 355", "circuit": "Watkins Glen International", "date": "2026-05-10T20:00:00Z", "network": "FS1"},
    {"name": "Coca-Cola 600", "circuit": "Charlotte Motor Speedway", "date": "2026-05-24T22:00:00Z", "network": "Prime Video"},
    {"name": "Nashville 400", "circuit": "Nashville Superspeedway", "date": "2026-05-31T23:00:00Z", "network": "Prime Video"},
    {"name": "Michigan 400", "circuit": "Michigan Speedway", "date": "2026-06-07T18:00:00Z", "network": "Prime Video"},
    {"name": "Pocono 400", "circuit": "Pocono Raceway", "date": "2026-06-14T18:00:00Z", "network": "Prime Video"},
    {"name": "San Diego Street Race", "circuit": "Naval Base Coronado", "date": "2026-06-21T21:00:00Z", "network": "Prime Video"},
    {"name": "Sonoma 350", "circuit": "Sonoma Raceway", "date": "2026-06-28T22:00:00Z", "network": "TNT"},
    {"name": "Chicagoland 400", "circuit": "Chicagoland Speedway", "date": "2026-07-05T20:00:00Z", "network": "TNT"},
    {"name": "Atlanta 400", "circuit": "EchoPark Speedway", "date": "2026-07-12T19:00:00Z", "network": "TNT"},
    {"name": "North Wilkesboro 400", "circuit": "North Wilkesboro Speedway", "date": "2026-07-19T19:00:00Z", "network": "TNT"},
    {"name": "Brickyard 400", "circuit": "Indianapolis Motor Speedway", "date": "2026-07-26T18:30:00Z", "network": "TNT"},
    {"name": "Iowa 400", "circuit": "Iowa Speedway", "date": "2026-08-09T19:00:00Z", "network": "USA"},
    {"name": "Richmond 400", "circuit": "Richmond Raceway", "date": "2026-08-15T23:00:00Z", "network": "USA"},
    {"name": "New Hampshire 301", "circuit": "New Hampshire Motor Speedway", "date": "2026-08-23T18:30:00Z", "network": "USA"},
    {"name": "Coke Zero 400", "circuit": "Daytona International Speedway", "date": "2026-08-29T23:30:00Z", "network": "NBC"},
    {"name": "Southern 500", "circuit": "Darlington Raceway", "date": "2026-09-06T22:00:00Z", "network": "USA"},
    {"name": "Gateway 400", "circuit": "World Wide Technology Raceway", "date": "2026-09-13T19:00:00Z", "network": "USA"},
    {"name": "Bristol Night Race", "circuit": "Bristol Motor Speedway", "date": "2026-09-19T23:30:00Z", "network": "USA"},
    {"name": "Kansas 400", "circuit": "Kansas Speedway", "date": "2026-09-27T20:00:00Z", "network": "USA"},
    {"name": "Las Vegas 400", "circuit": "Las Vegas Motor Speedway", "date": "2026-10-04T19:30:00Z", "network": "USA"},
    {"name": "Charlotte Roval 400", "circuit": "Charlotte Motor Speedway Road Course", "date": "2026-10-11T18:00:00Z", "network": "NBC"},
    {"name": "Phoenix 400", "circuit": "Phoenix Raceway", "date": "2026-10-18T19:00:00Z", "network": "NBC"},
    {"name": "Talladega 500", "circuit": "Talladega Superspeedway", "date": "2026-10-25T18:00:00Z", "network": "NBC"},
    {"name": "Martinsville 500", "circuit": "Martinsville Speedway", "date": "2026-11-01T18:00:00Z", "network": "NBC"},
    {"name": "Championship Race", "circuit": "Homestead-Miami Speedway", "date": "2026-11-08T20:00:00Z", "network": "NBC"},
]

# 2026 NTT IndyCar Series Schedule
# Source: https://www.indycar.com/Schedule
INDYCAR_2026_SCHEDULE = [
    {"name": "St. Petersburg Grand Prix", "circuit": "Streets of St. Petersburg", "date": "2026-03-01T17:00:00Z", "network": "NBC"},
    {"name": "Phoenix Grand Prix", "circuit": "Phoenix Raceway", "date": "2026-03-07T21:00:00Z", "network": "NBC"},
    {"name": "Arlington Grand Prix", "circuit": "Streets of Arlington", "date": "2026-03-15T20:00:00Z", "network": "NBC"},
    {"name": "Barber Grand Prix", "circuit": "Barber Motorsports Park", "date": "2026-03-29T18:00:00Z", "network": "NBC"},
    {"name": "Long Beach Grand Prix", "circuit": "Streets of Long Beach", "date": "2026-04-19T20:30:00Z", "network": "NBC"},
    {"name": "Indianapolis GP", "circuit": "Indianapolis Motor Speedway Road Course", "date": "2026-05-09T19:00:00Z", "network": "NBC"},
    {"name": "Indianapolis 500", "circuit": "Indianapolis Motor Speedway", "date": "2026-05-24T16:45:00Z", "network": "NBC"},
    {"name": "Detroit Grand Prix", "circuit": "Streets of Detroit", "date": "2026-05-31T19:00:00Z", "network": "NBC"},
    {"name": "Gateway 500", "circuit": "World Wide Technology Raceway", "date": "2026-06-07T20:00:00Z", "network": "NBC"},
    {"name": "Road America", "circuit": "Road America", "date": "2026-06-21T18:00:00Z", "network": "NBC"},
    {"name": "Mid-Ohio 200", "circuit": "Mid-Ohio Sports Car Course", "date": "2026-07-05T17:30:00Z", "network": "NBC"},
    {"name": "Nashville Grand Prix", "circuit": "Nashville Superspeedway", "date": "2026-07-19T19:00:00Z", "network": "NBC"},
    {"name": "Portland Grand Prix", "circuit": "Portland International Raceway", "date": "2026-08-09T22:00:00Z", "network": "NBC"},
    {"name": "Indy Markham", "circuit": "Ontario Honda Dealers Indy Markham", "date": "2026-08-16T19:00:00Z", "network": "NBC"},
    {"name": "Milwaukee Mile Race 1", "circuit": "Milwaukee Mile", "date": "2026-08-29T21:00:00Z", "network": "NBC"},
    {"name": "Milwaukee Mile Race 2", "circuit": "Milwaukee Mile", "date": "2026-08-30T18:00:00Z", "network": "NBC"},
    {"name": "Laguna Seca", "circuit": "WeatherTech Raceway Laguna Seca", "date": "2026-09-06T20:00:00Z", "network": "NBC"},
]


# =============================================================================
# AZURE TABLE STORAGE HELPERS
# =============================================================================

async def get_async_table_client():
    """Get async Azure Table client."""
    if not AZURE_STORAGE_CONNECTION_STRING:
        logger.warning("AZURE_STORAGE_CONNECTION_STRING not configured")
        return None

    service = AsyncTableServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)

    # Create table if not exists
    try:
        await service.create_table(TABLE_NAME)
        logger.info(f"Created table: {TABLE_NAME}")
    except Exception:
        pass  # Table already exists

    return service.get_table_client(TABLE_NAME)


async def upsert_race_event(table_client, event: dict) -> None:
    """Upsert a race event to Azure Table Storage."""
    if not table_client:
        return
    try:
        await table_client.upsert_entity(event)
        logger.info(f"Upserted event: {event.get('RaceName', 'Unknown')}")
    except Exception as e:
        logger.error(f"Failed to upsert event: {e}")


async def query_race_events(series_filter: Optional[str] = None) -> list[dict]:
    """Query race events from Azure Table Storage."""
    try:
        table_client = await get_async_table_client()
        if not table_client:
            return []

        filter_query = f"PartitionKey eq '{PARTITION_KEY}'"
        if series_filter:
            filter_query += f" and Series eq '{series_filter}'"

        entities = []
        async for entity in table_client.query_entities(filter_query):
            entities.append(dict(entity))

        # Sort by StartTime
        entities.sort(key=lambda x: x.get("StartTime", ""))

        await table_client.close()
        return entities
    except Exception as e:
        logger.error(f"Failed to query events: {e}")
        return []


# =============================================================================
# BACKGROUND DATA SYNC WORKER
# =============================================================================

async def delete_series_entries(table_client, series: str) -> int:
    """Delete all entries for a specific series from Azure Table Storage."""
    if not table_client:
        return 0

    deleted_count = 0
    try:
        filter_query = f"PartitionKey eq '{PARTITION_KEY}' and Series eq '{series}'"
        entities_to_delete = []

        async for entity in table_client.query_entities(filter_query):
            entities_to_delete.append({
                "PartitionKey": entity["PartitionKey"],
                "RowKey": entity["RowKey"]
            })

        for entity in entities_to_delete:
            try:
                await table_client.delete_entity(
                    partition_key=entity["PartitionKey"],
                    row_key=entity["RowKey"]
                )
                deleted_count += 1
            except Exception as e:
                logger.warning(f"Failed to delete entity {entity['RowKey']}: {e}")

        logger.info(f"Deleted {deleted_count} {series} entries from storage")
        return deleted_count
    except Exception as e:
        logger.error(f"Failed to delete {series} entries: {e}")
        return deleted_count


async def sync_race_data():
    """Main data sync function that runs every 24 hours."""
    logger.info("Starting data sync...")

    try:
        table_client = await get_async_table_client()
        if not table_client:
            logger.warning("No table client - skipping sync")
            return

        # Clean up old entries before syncing fresh data
        logger.info("Cleaning up old F1 entries...")
        await delete_series_entries(table_client, "F1")
        logger.info("Cleaning up old NASCAR entries...")
        await delete_series_entries(table_client, "NASCAR")
        logger.info("Cleaning up old IndyCar entries...")
        await delete_series_entries(table_client, "IndyCar")

        # Sync F1 races from FastF1
        logger.info("Syncing F1 data from FastF1...")
        f1_races = await fetch_f1_schedule(2025)
        now = datetime.now(timezone.utc)

        for race in f1_races:
            # Try to match circuit from our track data
            track_info = get_track_info("F1", race["circuit"])

            # Check if race is completed and fetch results
            winner = ""
            podium2 = ""
            podium3 = ""
            try:
                race_time = datetime.fromisoformat(race["date"].replace('Z', '+00:00'))
                if race_time < now and race.get("round", 0) > 0:
                    # Race has happened, fetch results using OpenF1 API
                    logger.info(f"Fetching results for {race['name']} (Round {race['round']})...")
                    results = await fetch_f1_race_results(2025, race["round"], race.get("circuit", ""))
                    if results and results.get("podium"):
                        podium = results["podium"]
                        winner = podium[0]["full_name"] if len(podium) > 0 else ""
                        podium2 = podium[1]["full_name"] if len(podium) > 1 else ""
                        podium3 = podium[2]["full_name"] if len(podium) > 2 else ""
                        logger.info(f"Results: 1st {winner}, 2nd {podium2}, 3rd {podium3}")
            except Exception as e:
                logger.error(f"Error checking race results: {e}")

            entity = {
                "PartitionKey": PARTITION_KEY,
                "RowKey": generate_row_key(race["date"], "F1", race["name"].replace(" ", "")),
                "Series": "F1",
                "RaceName": race["name"],
                "Venue": race.get("circuit", "TBD"),
                "StartTime": race["date"],
                "Network": track_info.get("network", "ESPN") if track_info else "ESPN",
                "Latitude": track_info.get("latitude", 0.0) if track_info else 0.0,
                "Longitude": track_info.get("longitude", 0.0) if track_info else 0.0,
                "Odds_Data": "N/A",
                "Polymarket_Prob": "N/A",
                "Winner": winner,
                "Podium2": podium2,
                "Podium3": podium3,
                "Country": race.get("country", track_info.get("country", "") if track_info else ""),
                "RoundNumber": race.get("round", 0),
            }
            await upsert_race_event(table_client, entity)
        logger.info(f"Synced {len(f1_races)} F1 races from FastF1")

        # Sync NASCAR 2026 races
        logger.info("Syncing NASCAR 2026 data...")
        for race in NASCAR_2026_SCHEDULE:
            track_info = get_track_info("NASCAR", race["circuit"])
            entity = {
                "PartitionKey": PARTITION_KEY,
                "RowKey": generate_row_key(race["date"], "NASCAR", race["name"].replace(" ", "")),
                "Series": "NASCAR",
                "RaceName": race["name"],
                "Venue": race["circuit"],
                "StartTime": race["date"],
                "Network": race.get("network", track_info.get("network", "FOX") if track_info else "FOX"),
                "Latitude": track_info.get("latitude", 0.0) if track_info else 0.0,
                "Longitude": track_info.get("longitude", 0.0) if track_info else 0.0,
                "Odds_Data": "N/A",
                "Polymarket_Prob": "N/A",
                "Winner": "",
                "Country": track_info.get("country", "USA") if track_info else "USA",
            }
            await upsert_race_event(table_client, entity)
        logger.info(f"Synced {len(NASCAR_2026_SCHEDULE)} NASCAR races")

        # Sync IndyCar 2026 races
        logger.info("Syncing IndyCar 2026 data...")
        for race in INDYCAR_2026_SCHEDULE:
            track_info = get_track_info("IndyCar", race["circuit"])
            entity = {
                "PartitionKey": PARTITION_KEY,
                "RowKey": generate_row_key(race["date"], "IndyCar", race["name"].replace(" ", "")),
                "Series": "IndyCar",
                "RaceName": race["name"],
                "Venue": race["circuit"],
                "StartTime": race["date"],
                "Network": race.get("network", track_info.get("network", "NBC") if track_info else "NBC"),
                "Latitude": track_info.get("latitude", 0.0) if track_info else 0.0,
                "Longitude": track_info.get("longitude", 0.0) if track_info else 0.0,
                "Odds_Data": "N/A",
                "Polymarket_Prob": "N/A",
                "Winner": "",
                "Country": track_info.get("country", "USA") if track_info else "USA",
            }
            await upsert_race_event(table_client, entity)
        logger.info(f"Synced {len(INDYCAR_2026_SCHEDULE)} IndyCar races")

        await table_client.close()
        logger.info("Data sync completed successfully!")

    except Exception as e:
        logger.error(f"Data sync failed: {e}")


async def background_worker():
    """Background worker that syncs data every 24 hours."""
    while True:
        try:
            await sync_race_data()
        except Exception as e:
            logger.error(f"Background worker error: {e}")

        # Sleep for 24 hours
        logger.info(f"Next sync in {DATA_SYNC_INTERVAL_HOURS} hours...")
        await asyncio.sleep(DATA_SYNC_INTERVAL_HOURS * 3600)


# =============================================================================
# NEWS FETCHING
# =============================================================================

async def fetch_news() -> list[dict]:
    """Fetch and parse RSS feeds with caching."""
    global news_cache

    # Check cache
    if news_cache["timestamp"]:
        cache_age = datetime.now(timezone.utc) - news_cache["timestamp"]
        if cache_age.total_seconds() < NEWS_CACHE_TTL_MINUTES * 60:
            return news_cache["data"]

    news_items = []

    async with httpx.AsyncClient() as client:
        for source, url in RSS_FEEDS.items():
            try:
                response = await client.get(url, timeout=10.0, follow_redirects=True)
                feed = feedparser.parse(response.text)

                for entry in feed.entries[:5]:  # Top 5 from each source
                    news_items.append({
                        "title": entry.get("title", ""),
                        "link": entry.get("link", ""),
                        "source": source.upper(),
                        "published": entry.get("published", ""),
                    })
            except Exception as e:
                logger.error(f"Failed to fetch RSS from {source}: {e}")

    # Sort by published date (newest first)
    news_items.sort(key=lambda x: x.get("published", ""), reverse=True)

    # Update cache
    news_cache = {
        "data": news_items[:15],  # Keep top 15
        "timestamp": datetime.now(timezone.utc)
    }

    return news_cache["data"]


# =============================================================================
# FASTAPI APPLICATION
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan - start background worker on startup."""
    # Start background data sync worker
    task = asyncio.create_task(background_worker())
    logger.info("Started background data sync worker")

    yield

    # Cleanup
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass


app = FastAPI(
    title="RaceCentral 2.0",
    description="Dynamic racing calendar with live odds and predictions",
    version="2.0.0",
    lifespan=lifespan
)

# Templates
templates = Jinja2Templates(directory="templates")

# Add custom template filters
templates.env.filters["format_race_time"] = format_race_time
templates.env.filters["series_logo"] = get_series_logo
templates.env.filters["series_color"] = get_series_color


# =============================================================================
# ROUTES
# =============================================================================

@app.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    """Render the main homepage."""
    # Get all race events
    races = await query_race_events()

    # Enrich with formatted time
    for race in races:
        race["time_info"] = format_race_time(race.get("StartTime", ""))

    # Filter upcoming races (this week only) and past races
    now = datetime.now(timezone.utc)
    one_week_later = now + timedelta(days=7)
    upcoming = []
    past = []

    for race in races:
        try:
            race_time = datetime.fromisoformat(race.get("StartTime", "").replace('Z', '+00:00'))
            if race_time > now and race_time <= one_week_later:
                # Only include races within the next 7 days
                upcoming.append(race)
            elif race_time <= now:
                past.append(race)
        except Exception:
            continue

    # Sort past races by date descending (most recent first)
    past.sort(key=lambda x: x.get("StartTime", ""), reverse=True)

    # Fetch news
    news = await fetch_news()

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "upcoming_races": upcoming[:20],
            "past_races": past[:3],  # Show last 3 completed races by default
            "news": news,
            "series_list": ["F1", "NASCAR", "IndyCar"],
            "current_filter": "all",
        }
    )


@app.get("/calendar", response_class=HTMLResponse)
async def calendar_page(request: Request, year: Optional[int] = None, series: Optional[str] = None):
    """Render the full calendar page for 2025/2026."""
    from collections import defaultdict

    # Get all race events
    races = await query_race_events()

    # Enrich with formatted time
    for race in races:
        race["time_info"] = format_race_time(race.get("StartTime", ""))

    # Filter by series if specified
    if series and series.lower() != "all":
        races = [r for r in races if r.get("Series", "").lower() == series.lower()]

    # Filter by year if specified
    if year:
        races = [r for r in races if str(year) in r.get("StartTime", "")]

    # Sort races by date
    races.sort(key=lambda x: x.get("StartTime", ""))

    # Group races by month
    races_by_month = defaultdict(list)
    for race in races:
        try:
            race_time = datetime.fromisoformat(race.get("StartTime", "").replace('Z', '+00:00'))
            month_key = race_time.strftime("%Y-%m")
            month_name = race_time.strftime("%B %Y")
            race["month_name"] = month_name
            race["day"] = race_time.strftime("%d")
            race["weekday"] = race_time.strftime("%a")
            races_by_month[month_key].append(race)
        except Exception:
            continue

    # Convert to sorted list of (month_key, month_name, races) tuples
    months = []
    for month_key in sorted(races_by_month.keys()):
        month_races = races_by_month[month_key]
        if month_races:
            months.append({
                "key": month_key,
                "name": month_races[0]["month_name"],
                "races": month_races
            })

    # Get current year for default filtering
    current_year = datetime.now().year

    return templates.TemplateResponse(
        "calendar.html",
        {
            "request": request,
            "months": months,
            "selected_year": year or "all",
            "selected_series": series or "all",
            "years": [2025, 2026],
            "series_list": ["F1", "NASCAR", "IndyCar"],
            "total_races": len(races),
        }
    )


@app.get("/filter/{series}", response_class=HTMLResponse)
async def filter_races(request: Request, series: str):
    """HTMX endpoint to filter races by series."""
    if series.lower() == "all":
        races = await query_race_events()
    else:
        races = await query_race_events(series_filter=series)

    # Enrich with formatted time
    for race in races:
        race["time_info"] = format_race_time(race.get("StartTime", ""))

    # Filter to upcoming races
    now = datetime.now(timezone.utc)
    upcoming = []

    for race in races:
        try:
            race_time = datetime.fromisoformat(race.get("StartTime", "").replace('Z', '+00:00'))
            if race_time > now:
                upcoming.append(race)
        except Exception:
            continue

    return templates.TemplateResponse(
        "partials/race_card.html",
        {
            "request": request,
            "races": upcoming[:20],
        }
    )


@app.get("/calendar.ics")
async def generate_calendar():
    """Generate iCal file for download."""
    races = await query_race_events()

    cal = Calendar()

    for race in races:
        try:
            event = Event()
            event.name = f"{race.get('Series', '')} - {race.get('RaceName', 'Race')}"
            event.begin = race.get("StartTime", "")
            event.duration = timedelta(hours=3)  # Assume 3-hour race
            event.location = race.get("Venue", "")
            event.description = f"Watch on: {race.get('Network', 'TBD')}"
            cal.events.add(event)
        except Exception as e:
            logger.error(f"Failed to add event to calendar: {e}")

    return Response(
        content=cal.serialize(),
        media_type="text/calendar",
        headers={"Content-Disposition": "attachment; filename=racecentral.ics"}
    )


@app.get("/api/races")
async def api_races(series: Optional[str] = None):
    """JSON API endpoint for race data."""
    if series:
        races = await query_race_events(series_filter=series)
    else:
        races = await query_race_events()

    return {"races": races}


@app.get("/past-races", response_class=HTMLResponse)
async def past_races_page(request: Request):
    """HTMX endpoint to load all past races with results."""
    races = await query_race_events()

    # Enrich with formatted time
    for race in races:
        race["time_info"] = format_race_time(race.get("StartTime", ""))

    # Filter to past races only
    now = datetime.now(timezone.utc)
    past = []

    for race in races:
        try:
            race_time = datetime.fromisoformat(race.get("StartTime", "").replace('Z', '+00:00'))
            if race_time <= now:
                past.append(race)
        except Exception:
            continue

    # Sort by date descending (most recent first)
    past.sort(key=lambda x: x.get("StartTime", ""), reverse=True)

    return templates.TemplateResponse(
        "partials/past_races.html",
        {
            "request": request,
            "races": past,
        }
    )


@app.get("/recent-races", response_class=HTMLResponse)
async def recent_races_page(request: Request):
    """HTMX endpoint to load only recent past races (last 3)."""
    races = await query_race_events()

    # Enrich with formatted time
    for race in races:
        race["time_info"] = format_race_time(race.get("StartTime", ""))

    # Filter to past races only
    now = datetime.now(timezone.utc)
    past = []

    for race in races:
        try:
            race_time = datetime.fromisoformat(race.get("StartTime", "").replace('Z', '+00:00'))
            if race_time <= now:
                past.append(race)
        except Exception:
            continue

    # Sort by date descending (most recent first) and limit to 3
    past.sort(key=lambda x: x.get("StartTime", ""), reverse=True)

    return templates.TemplateResponse(
        "partials/past_races.html",
        {
            "request": request,
            "races": past[:3],
        }
    )


@app.get("/api/results/{series}/{round_num}")
async def get_race_results(series: str, round_num: int):
    """API endpoint to fetch race results for a specific race."""
    if series.upper() == "F1":
        results = await fetch_f1_race_results(2025, round_num)
        return results
    return {"error": "Results only available for F1 races"}


@app.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    """Serve robots.txt for SEO."""
    return """User-agent: *
Allow: /

Sitemap: https://racecentral.info/sitemap.xml
"""


@app.get("/sitemap.xml", response_class=Response)
async def sitemap():
    """Generate sitemap.xml for SEO."""
    xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://racecentral.info/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://racecentral.info/filter/F1</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://racecentral.info/filter/NASCAR</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://racecentral.info/filter/IndyCar</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
"""
    return Response(content=xml, media_type="application/xml")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "2.0.0"}


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("ENV", "production") == "development"
    )
