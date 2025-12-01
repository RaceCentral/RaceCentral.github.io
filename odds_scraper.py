"""
DraftKings Motorsport Odds Scraper
Scrapes F1 and NASCAR race winner odds from DraftKings sportsbook
"""

import asyncio
import logging
from datetime import datetime, timedelta
from typing import Optional
from dataclasses import dataclass

from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout

logger = logging.getLogger(__name__)

# DraftKings URLs for motorsports
DRAFTKINGS_URLS = {
    "F1": "https://sportsbook.draftkings.com/leagues/motorsports/formula-1",
    "NASCAR": "https://sportsbook.draftkings.com/leagues/motorsports/nascar-cup-series",
}

@dataclass
class DriverOdds:
    """Represents odds for a single driver"""
    driver_name: str
    odds: str  # American odds format (e.g., "+450", "-110")
    decimal_odds: float  # Decimal format for easier comparison

@dataclass
class RaceOdds:
    """Represents odds for an entire race"""
    race_name: str
    series: str
    scraped_at: datetime
    drivers: list[DriverOdds]

def american_to_decimal(american_odds: str) -> float:
    """Convert American odds to decimal format"""
    try:
        odds = int(american_odds.replace("+", "").replace("−", "-").replace("–", "-"))
        if odds > 0:
            return round((odds / 100) + 1, 2)
        else:
            return round((100 / abs(odds)) + 1, 2)
    except (ValueError, ZeroDivisionError):
        return 0.0

async def scrape_draftkings_odds(series: str = "F1", headless: bool = True) -> Optional[RaceOdds]:
    """
    Scrape race winner odds from DraftKings for a given series

    Args:
        series: Either "F1" or "NASCAR"
        headless: Run browser in headless mode (default True)

    Returns:
        RaceOdds object with driver odds, or None if scraping fails
    """
    if series not in DRAFTKINGS_URLS:
        logger.error(f"Unknown series: {series}. Must be 'F1' or 'NASCAR'")
        return None

    url = DRAFTKINGS_URLS[series]
    logger.info(f"Scraping {series} odds from {url}")

    async with async_playwright() as p:
        try:
            # Launch browser
            browser = await p.chromium.launch(headless=headless)
            context = await browser.new_context(
                viewport={"width": 1920, "height": 1080},
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            page = await context.new_page()

            # Navigate to the page - use domcontentloaded since networkidle can be slow
            await page.goto(url, wait_until="domcontentloaded", timeout=60000)

            # Wait for dynamic content to load
            await asyncio.sleep(5)

            # Try to wait for odds elements with various selectors
            try:
                await page.wait_for_selector("[class*='outcome'], [class*='odds'], [class*='participant']", timeout=20000)
            except PlaywrightTimeout:
                logger.warning("Could not find typical odds selectors, proceeding anyway...")

            # Extra wait for JavaScript rendering
            await asyncio.sleep(3)

            # Get race name from page title or header
            race_name = "Unknown Race"
            try:
                # Try to find race name in the page
                race_header = await page.query_selector("[class*='event-cell__name'], [class*='sportsbook-event-accordion__title'], h1, h2")
                if race_header:
                    race_name = await race_header.text_content()
                    race_name = race_name.strip() if race_name else "Unknown Race"
            except Exception as e:
                logger.warning(f"Could not get race name: {e}")

            # Extract driver names and odds using JavaScript for reliability
            drivers = []

            # The DraftKings structure has the Race Winner market in a cb-market__template--2-columns section
            # We target the FIRST such section which is the Race Winner market
            logger.info("Extracting odds via JavaScript (Race Winner market only)...")
            try:
                data = await page.evaluate("""
                    () => {
                        const results = [];
                        const seenDrivers = new Set();

                        // Find the FIRST cb-market__template--2-columns which is the Race Winner market
                        const winnerMarket = document.querySelector('.cb-market__template--2-columns');
                        if (!winnerMarket) {
                            // Fallback to searching entire document
                            return [];
                        }

                        // Find all market label divs within this specific market section
                        const labelDivs = winnerMarket.querySelectorAll('.cb-market__label--row');

                        labelDivs.forEach(labelDiv => {
                            // Get the driver name from the <p> inside
                            const nameEl = labelDiv.querySelector('.cb-market__label--truncate-strings');
                            // The odds button is the next sibling element
                            const buttonEl = labelDiv.nextElementSibling;

                            if (nameEl && buttonEl && buttonEl.classList.contains('cb-market__button')) {
                                const oddsEl = buttonEl.querySelector('.cb-market__button-odds');

                                if (oddsEl) {
                                    const name = nameEl.textContent.trim();
                                    const odds = oddsEl.textContent.trim();

                                    // Only include valid odds (starts with + or -)
                                    // Also skip duplicates (stop when we hit a driver we've seen)
                                    if (name && odds &&
                                        (odds.startsWith('+') || odds.startsWith('-') || odds.startsWith('−')) &&
                                        !seenDrivers.has(name)) {
                                        seenDrivers.add(name);
                                        results.push({name, odds});
                                    }
                                }
                            }
                        });

                        return results;
                    }
                """)

                for item in data:
                    drivers.append(DriverOdds(
                        driver_name=item['name'],
                        odds=item['odds'],
                        decimal_odds=american_to_decimal(item['odds'])
                    ))
                logger.info(f"JavaScript extraction found {len(drivers)} drivers")

            except Exception as e:
                logger.error(f"JavaScript extraction failed: {e}")

            # Save page content for debugging if no drivers found
            if not drivers:
                logger.warning(f"No driver odds found for {series}")
                # Save screenshot and HTML for debugging
                await page.screenshot(path=f"debug_{series.lower()}.png")
                html = await page.content()
                with open(f"debug_{series.lower()}.html", "w") as f:
                    f.write(html)
                logger.info(f"Saved debug files: debug_{series.lower()}.png and debug_{series.lower()}.html")

            await browser.close()

            if not drivers:
                return None

            logger.info(f"Found {len(drivers)} drivers with odds for {series}")

            # Deduplicate drivers - keep only the first (best odds) for each driver
            seen_drivers = set()
            unique_drivers = []
            for driver in sorted(drivers, key=lambda d: d.decimal_odds):
                if driver.driver_name not in seen_drivers:
                    seen_drivers.add(driver.driver_name)
                    unique_drivers.append(driver)

            logger.info(f"After deduplication: {len(unique_drivers)} unique drivers")

            return RaceOdds(
                race_name=race_name,
                series=series,
                scraped_at=datetime.now(),
                drivers=unique_drivers  # Already sorted by odds (favorites first)
            )

        except PlaywrightTimeout as e:
            logger.error(f"Timeout scraping {series} odds: {e}")
            return None
        except Exception as e:
            logger.error(f"Error scraping {series} odds: {e}")
            return None

async def scrape_all_odds(headless: bool = True) -> dict[str, RaceOdds]:
    """
    Scrape odds for all available series

    Returns:
        Dictionary mapping series name to RaceOdds
    """
    results = {}

    for series in DRAFTKINGS_URLS.keys():
        odds = await scrape_draftkings_odds(series, headless)
        if odds:
            results[series] = odds
        # Small delay between requests to be respectful
        await asyncio.sleep(2)

    return results

def format_odds_for_display(odds: RaceOdds, top_n: int = 5) -> list[dict]:
    """
    Format odds for display in the UI

    Args:
        odds: RaceOdds object
        top_n: Number of top favorites to return

    Returns:
        List of dicts with driver info for display
    """
    return [
        {
            "driver": d.driver_name,
            "odds": d.odds,
            "decimal": d.decimal_odds,
            "position": i + 1
        }
        for i, d in enumerate(odds.drivers[:top_n])
    ]

# CLI testing
if __name__ == "__main__":
    import sys

    logging.basicConfig(level=logging.INFO)

    async def main():
        series = sys.argv[1] if len(sys.argv) > 1 else "F1"
        print(f"\nScraping {series} odds from DraftKings...\n")

        odds = await scrape_draftkings_odds(series, headless=True)

        if odds:
            print(f"Race: {odds.race_name}")
            print(f"Series: {odds.series}")
            print(f"Scraped at: {odds.scraped_at}")
            print(f"\nTop Drivers:")
            print("-" * 50)

            for i, driver in enumerate(odds.drivers[:10], 1):
                print(f"{i:2}. {driver.driver_name:<25} {driver.odds:>8} ({driver.decimal_odds:.2f})")
        else:
            print("Failed to scrape odds")

    asyncio.run(main())
