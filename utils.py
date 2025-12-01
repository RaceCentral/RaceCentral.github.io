"""
RaceCentral 2.0 - Utility Functions and Track Data
Contains hardcoded track coordinates, networks, and helper functions.
"""

from typing import Optional
from datetime import datetime, timezone

# =============================================================================
# TRACK DATA ENRICHMENT DICTIONARY
# Maps track names to their coordinates and broadcast networks
# =============================================================================

TRACK_DATA: dict[str, dict] = {
    # =========================================================================
    # FORMULA 1 CIRCUITS
    # =========================================================================
    "F1": {
        "Bahrain International Circuit": {
            "latitude": 26.0325,
            "longitude": 50.5106,
            "network": "ESPN",
            "country": "Bahrain",
            "city": "Sakhir"
        },
        "Jeddah Corniche Circuit": {
            "latitude": 21.6319,
            "longitude": 39.1044,
            "network": "ESPN",
            "country": "Saudi Arabia",
            "city": "Jeddah"
        },
        "Albert Park Circuit": {
            "latitude": -37.8497,
            "longitude": 144.9680,
            "network": "ESPN",
            "country": "Australia",
            "city": "Melbourne"
        },
        "Suzuka International Racing Course": {
            "latitude": 34.8431,
            "longitude": 136.5407,
            "network": "ESPN",
            "country": "Japan",
            "city": "Suzuka"
        },
        "Shanghai International Circuit": {
            "latitude": 31.3389,
            "longitude": 121.2197,
            "network": "ESPN",
            "country": "China",
            "city": "Shanghai"
        },
        "Miami International Autodrome": {
            "latitude": 25.9581,
            "longitude": -80.2389,
            "network": "ESPN",
            "country": "USA",
            "city": "Miami"
        },
        "Autodromo Enzo e Dino Ferrari": {
            "latitude": 44.3439,
            "longitude": 11.7167,
            "network": "ESPN",
            "country": "Italy",
            "city": "Imola"
        },
        "Circuit de Monaco": {
            "latitude": 43.7347,
            "longitude": 7.4206,
            "network": "ESPN",
            "country": "Monaco",
            "city": "Monte Carlo"
        },
        "Circuit Gilles Villeneuve": {
            "latitude": 45.5000,
            "longitude": -73.5228,
            "network": "ESPN",
            "country": "Canada",
            "city": "Montreal"
        },
        "Circuit de Barcelona-Catalunya": {
            "latitude": 41.5700,
            "longitude": 2.2611,
            "network": "ESPN",
            "country": "Spain",
            "city": "Barcelona"
        },
        "Red Bull Ring": {
            "latitude": 47.2197,
            "longitude": 14.7647,
            "network": "ESPN",
            "country": "Austria",
            "city": "Spielberg"
        },
        "Silverstone Circuit": {
            "latitude": 52.0786,
            "longitude": -1.0169,
            "network": "ESPN",
            "country": "UK",
            "city": "Silverstone"
        },
        "Hungaroring": {
            "latitude": 47.5789,
            "longitude": 19.2486,
            "network": "ESPN",
            "country": "Hungary",
            "city": "Budapest"
        },
        "Circuit de Spa-Francorchamps": {
            "latitude": 50.4372,
            "longitude": 5.9714,
            "network": "ESPN",
            "country": "Belgium",
            "city": "Spa"
        },
        "Circuit Zandvoort": {
            "latitude": 52.3888,
            "longitude": 4.5409,
            "network": "ESPN",
            "country": "Netherlands",
            "city": "Zandvoort"
        },
        "Autodromo Nazionale Monza": {
            "latitude": 45.6156,
            "longitude": 9.2811,
            "network": "ESPN",
            "country": "Italy",
            "city": "Monza"
        },
        "Baku City Circuit": {
            "latitude": 40.3725,
            "longitude": 49.8533,
            "network": "ESPN",
            "country": "Azerbaijan",
            "city": "Baku"
        },
        "Marina Bay Street Circuit": {
            "latitude": 1.2914,
            "longitude": 103.8644,
            "network": "ESPN",
            "country": "Singapore",
            "city": "Singapore"
        },
        "Circuit of the Americas": {
            "latitude": 30.1328,
            "longitude": -97.6411,
            "network": "ESPN",
            "country": "USA",
            "city": "Austin"
        },
        "Autodromo Hermanos Rodriguez": {
            "latitude": 19.4042,
            "longitude": -99.0907,
            "network": "ESPN",
            "country": "Mexico",
            "city": "Mexico City"
        },
        "Interlagos": {
            "latitude": -23.7036,
            "longitude": -46.6997,
            "network": "ESPN",
            "country": "Brazil",
            "city": "São Paulo"
        },
        "Las Vegas Street Circuit": {
            "latitude": 36.1147,
            "longitude": -115.1728,
            "network": "ESPN",
            "country": "USA",
            "city": "Las Vegas"
        },
        "Lusail International Circuit": {
            "latitude": 25.4900,
            "longitude": 51.4542,
            "network": "ESPN",
            "country": "Qatar",
            "city": "Lusail"
        },
        "Yas Marina Circuit": {
            "latitude": 24.4672,
            "longitude": 54.6031,
            "network": "ESPN",
            "country": "UAE",
            "city": "Abu Dhabi"
        },
    },

    # =========================================================================
    # NASCAR TRACKS
    # =========================================================================
    "NASCAR": {
        "Daytona International Speedway": {
            "latitude": 29.1857,
            "longitude": -81.0689,
            "network": "FOX",
            "country": "USA",
            "city": "Daytona Beach"
        },
        "Atlanta Motor Speedway": {
            "latitude": 33.3867,
            "longitude": -84.3169,
            "network": "FOX",
            "country": "USA",
            "city": "Hampton"
        },
        "Las Vegas Motor Speedway": {
            "latitude": 36.2719,
            "longitude": -115.0103,
            "network": "FOX",
            "country": "USA",
            "city": "Las Vegas"
        },
        "Phoenix Raceway": {
            "latitude": 33.3753,
            "longitude": -112.3119,
            "network": "FOX",
            "country": "USA",
            "city": "Avondale"
        },
        "Circuit of the Americas": {
            "latitude": 30.1328,
            "longitude": -97.6411,
            "network": "FOX",
            "country": "USA",
            "city": "Austin"
        },
        "Bristol Motor Speedway": {
            "latitude": 36.5158,
            "longitude": -82.2572,
            "network": "FOX",
            "country": "USA",
            "city": "Bristol"
        },
        "Martinsville Speedway": {
            "latitude": 36.6347,
            "longitude": -79.8517,
            "network": "FS1",
            "country": "USA",
            "city": "Martinsville"
        },
        "Texas Motor Speedway": {
            "latitude": 33.0372,
            "longitude": -97.2822,
            "network": "FOX",
            "country": "USA",
            "city": "Fort Worth"
        },
        "Richmond Raceway": {
            "latitude": 37.5925,
            "longitude": -77.4197,
            "network": "FOX",
            "country": "USA",
            "city": "Richmond"
        },
        "Talladega Superspeedway": {
            "latitude": 33.5667,
            "longitude": -86.0642,
            "network": "FOX",
            "country": "USA",
            "city": "Talladega"
        },
        "Dover Motor Speedway": {
            "latitude": 39.1900,
            "longitude": -75.5306,
            "network": "FS1",
            "country": "USA",
            "city": "Dover"
        },
        "Kansas Speedway": {
            "latitude": 39.1158,
            "longitude": -94.8306,
            "network": "FS1",
            "country": "USA",
            "city": "Kansas City"
        },
        "Darlington Raceway": {
            "latitude": 34.2947,
            "longitude": -79.9056,
            "network": "FS1",
            "country": "USA",
            "city": "Darlington"
        },
        "Charlotte Motor Speedway": {
            "latitude": 35.3522,
            "longitude": -80.6828,
            "network": "FOX",
            "country": "USA",
            "city": "Concord"
        },
        "Nashville Superspeedway": {
            "latitude": 36.0086,
            "longitude": -86.3700,
            "network": "NBC",
            "country": "USA",
            "city": "Lebanon"
        },
        "Sonoma Raceway": {
            "latitude": 38.1611,
            "longitude": -122.4550,
            "network": "FOX",
            "country": "USA",
            "city": "Sonoma"
        },
        "New Hampshire Motor Speedway": {
            "latitude": 43.3631,
            "longitude": -71.4606,
            "network": "USA Network",
            "country": "USA",
            "city": "Loudon"
        },
        "Pocono Raceway": {
            "latitude": 41.0536,
            "longitude": -75.5117,
            "network": "USA Network",
            "country": "USA",
            "city": "Long Pond"
        },
        "Indianapolis Motor Speedway": {
            "latitude": 39.7950,
            "longitude": -86.2347,
            "network": "NBC",
            "country": "USA",
            "city": "Indianapolis"
        },
        "Michigan International Speedway": {
            "latitude": 42.0650,
            "longitude": -84.2403,
            "network": "USA Network",
            "country": "USA",
            "city": "Brooklyn"
        },
        "Watkins Glen International": {
            "latitude": 42.3369,
            "longitude": -76.9275,
            "network": "USA Network",
            "country": "USA",
            "city": "Watkins Glen"
        },
        "Homestead-Miami Speedway": {
            "latitude": 25.4517,
            "longitude": -80.4089,
            "network": "NBC",
            "country": "USA",
            "city": "Homestead"
        },
    },

    # =========================================================================
    # INDYCAR CIRCUITS
    # =========================================================================
    "IndyCar": {
        "Streets of St. Petersburg": {
            "latitude": 27.7676,
            "longitude": -82.6403,
            "network": "NBC",
            "country": "USA",
            "city": "St. Petersburg"
        },
        "Thermal Club": {
            "latitude": 33.7431,
            "longitude": -116.1661,
            "network": "NBC",
            "country": "USA",
            "city": "Thermal"
        },
        "Streets of Long Beach": {
            "latitude": 33.7650,
            "longitude": -118.1892,
            "network": "NBC",
            "country": "USA",
            "city": "Long Beach"
        },
        "Barber Motorsports Park": {
            "latitude": 33.5344,
            "longitude": -86.6125,
            "network": "NBC",
            "country": "USA",
            "city": "Birmingham"
        },
        "Indianapolis Motor Speedway": {
            "latitude": 39.7950,
            "longitude": -86.2347,
            "network": "NBC",
            "country": "USA",
            "city": "Indianapolis"
        },
        "Indianapolis Motor Speedway Road Course": {
            "latitude": 39.7950,
            "longitude": -86.2347,
            "network": "NBC",
            "country": "USA",
            "city": "Indianapolis"
        },
        "Belle Isle": {
            "latitude": 42.3431,
            "longitude": -82.9792,
            "network": "NBC",
            "country": "USA",
            "city": "Detroit"
        },
        "Road America": {
            "latitude": 43.7989,
            "longitude": -87.9892,
            "network": "NBC",
            "country": "USA",
            "city": "Elkhart Lake"
        },
        "Mid-Ohio Sports Car Course": {
            "latitude": 40.6839,
            "longitude": -82.6392,
            "network": "NBC",
            "country": "USA",
            "city": "Lexington"
        },
        "Streets of Toronto": {
            "latitude": 43.6336,
            "longitude": -79.4158,
            "network": "NBC",
            "country": "Canada",
            "city": "Toronto"
        },
        "Iowa Speedway": {
            "latitude": 41.6781,
            "longitude": -93.0047,
            "network": "NBC",
            "country": "USA",
            "city": "Newton"
        },
        "World Wide Technology Raceway": {
            "latitude": 38.6669,
            "longitude": -90.1369,
            "network": "NBC",
            "country": "USA",
            "city": "Madison"
        },
        "Portland International Raceway": {
            "latitude": 45.5961,
            "longitude": -122.6869,
            "network": "NBC",
            "country": "USA",
            "city": "Portland"
        },
        "WeatherTech Raceway Laguna Seca": {
            "latitude": 36.5847,
            "longitude": -121.7533,
            "network": "NBC",
            "country": "USA",
            "city": "Monterey"
        },
        "Nashville Street Circuit": {
            "latitude": 36.1628,
            "longitude": -86.7747,
            "network": "NBC",
            "country": "USA",
            "city": "Nashville"
        },
    }
}

# Alias mappings for common name variations
TRACK_ALIASES: dict[str, tuple[str, str]] = {
    # F1 Aliases
    "Bahrain Grand Prix": ("F1", "Bahrain International Circuit"),
    "Saudi Arabian Grand Prix": ("F1", "Jeddah Corniche Circuit"),
    "Australian Grand Prix": ("F1", "Albert Park Circuit"),
    "Japanese Grand Prix": ("F1", "Suzuka International Racing Course"),
    "Chinese Grand Prix": ("F1", "Shanghai International Circuit"),
    "Miami Grand Prix": ("F1", "Miami International Autodrome"),
    "Emilia Romagna Grand Prix": ("F1", "Autodromo Enzo e Dino Ferrari"),
    "Monaco Grand Prix": ("F1", "Circuit de Monaco"),
    "Canadian Grand Prix": ("F1", "Circuit Gilles Villeneuve"),
    "Spanish Grand Prix": ("F1", "Circuit de Barcelona-Catalunya"),
    "Austrian Grand Prix": ("F1", "Red Bull Ring"),
    "British Grand Prix": ("F1", "Silverstone Circuit"),
    "Hungarian Grand Prix": ("F1", "Hungaroring"),
    "Belgian Grand Prix": ("F1", "Circuit de Spa-Francorchamps"),
    "Dutch Grand Prix": ("F1", "Circuit Zandvoort"),
    "Italian Grand Prix": ("F1", "Autodromo Nazionale Monza"),
    "Azerbaijan Grand Prix": ("F1", "Baku City Circuit"),
    "Singapore Grand Prix": ("F1", "Marina Bay Street Circuit"),
    "United States Grand Prix": ("F1", "Circuit of the Americas"),
    "Mexican Grand Prix": ("F1", "Autodromo Hermanos Rodriguez"),
    "Brazilian Grand Prix": ("F1", "Interlagos"),
    "Las Vegas Grand Prix": ("F1", "Las Vegas Street Circuit"),
    "Qatar Grand Prix": ("F1", "Lusail International Circuit"),
    "Abu Dhabi Grand Prix": ("F1", "Yas Marina Circuit"),

    # NASCAR Aliases
    "Daytona 500": ("NASCAR", "Daytona International Speedway"),
    "Coca-Cola 600": ("NASCAR", "Charlotte Motor Speedway"),
    "Southern 500": ("NASCAR", "Darlington Raceway"),
    "Brickyard 400": ("NASCAR", "Indianapolis Motor Speedway"),
    "Indy 500": ("IndyCar", "Indianapolis Motor Speedway"),
    "Indianapolis 500": ("IndyCar", "Indianapolis Motor Speedway"),
}


def get_track_info(series: str, track_name: str) -> Optional[dict]:
    """
    Get track information by series and track name.
    Checks direct match first, then aliases.

    Args:
        series: Racing series (F1, NASCAR, IndyCar)
        track_name: Name of the track or race

    Returns:
        Dictionary with latitude, longitude, network, country, city or None
    """
    # Direct lookup
    if series in TRACK_DATA and track_name in TRACK_DATA[series]:
        return TRACK_DATA[series][track_name]

    # Check aliases
    if track_name in TRACK_ALIASES:
        alias_series, alias_track = TRACK_ALIASES[track_name]
        if alias_series == series or series == "":
            return TRACK_DATA.get(alias_series, {}).get(alias_track)

    # Fuzzy match - check if track_name contains any known track
    if series in TRACK_DATA:
        for known_track in TRACK_DATA[series]:
            if known_track.lower() in track_name.lower() or track_name.lower() in known_track.lower():
                return TRACK_DATA[series][known_track]

    return None


def get_series_logo(series: str) -> str:
    """Get the logo/icon for a racing series."""
    logos = {
        "F1": "🏎️",
        "NASCAR": "🏁",
        "IndyCar": "🏎️"
    }
    return logos.get(series, "🏎️")


def get_series_color(series: str) -> str:
    """Get the brand color for a racing series."""
    colors = {
        "F1": "#E10600",      # F1 Red
        "NASCAR": "#FFC629",  # NASCAR Yellow
        "IndyCar": "#0052A5"  # IndyCar Blue
    }
    return colors.get(series, "#6B7280")


def format_race_time(iso_time: str) -> dict:
    """
    Format ISO time string to human-readable format.

    Returns dict with:
        - date: "Sun, Mar 2"
        - time: "2:00 PM EST"
        - countdown: "in 3 days" or "LIVE" or "Completed"
    """
    try:
        dt = datetime.fromisoformat(iso_time.replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)

        # Format date and time
        date_str = dt.strftime("%a, %b %d")
        time_str = dt.strftime("%I:%M %p UTC")

        # Calculate countdown
        diff = dt - now
        if diff.total_seconds() < 0:
            # Race has started or completed
            if diff.total_seconds() > -7200:  # Within 2 hours
                countdown = "LIVE"
            else:
                countdown = "Completed"
        elif diff.days > 0:
            countdown = f"in {diff.days} day{'s' if diff.days != 1 else ''}"
        elif diff.seconds > 3600:
            hours = diff.seconds // 3600
            countdown = f"in {hours} hour{'s' if hours != 1 else ''}"
        else:
            minutes = diff.seconds // 60
            countdown = f"in {minutes} min"

        return {
            "date": date_str,
            "time": time_str,
            "countdown": countdown,
            "timestamp": dt.timestamp(),
            "iso": dt.isoformat()
        }
    except Exception:
        return {
            "date": "TBD",
            "time": "TBD",
            "countdown": "TBD",
            "timestamp": 0,
            "iso": ""
        }


def generate_row_key(start_time: str, series: str, race_id: str) -> str:
    """
    Generate a RowKey for Azure Table Storage.
    Format: {Timestamp}_{Series}_{RaceID}
    """
    try:
        dt = datetime.fromisoformat(start_time.replace('Z', '+00:00'))
        timestamp = dt.strftime("%Y%m%d%H%M")
    except Exception:
        timestamp = "00000000000"

    # Sanitize race_id for Azure Table Storage (no special chars)
    safe_race_id = "".join(c for c in race_id if c.isalnum())[:50]

    return f"{timestamp}_{series}_{safe_race_id}"


# RSS Feed URLs for motorsport news
RSS_FEEDS = {
    "motorsport": "https://www.motorsport.com/rss/all/news/",
    "f1": "https://www.formula1.com/content/fom-website/en/latest/all.xml",
    "racer": "https://racer.com/feed/",
}

# The Odds API Sport Keys
ODDS_API_SPORT_KEYS = {
    "F1": "motorsport_formula_one",
    "NASCAR": "motorsport_nascar_cup",
    "IndyCar": "motorsport_indycar",
}
