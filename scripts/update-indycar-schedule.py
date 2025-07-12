
import requests
from bs4 import BeautifulSoup
import json
import re

def scrape_indycar_schedule():
    url = "https://www.indycar.com/Schedule"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    schedule_data = []
    schedule_rows = soup.select(".schedule-list__item")

    for row in schedule_rows:
        date_element = row.select_one(".schedule-list__date")
        race_element = row.select_one(".schedule-list__title")
        venue_element = row.select_one(".schedule-list__track")
        time_element = row.select_one(".schedule-list__time")
        network_element = row.select_one(".schedule-list__network img")

        if date_element and race_element and venue_element:
            date = date_element.get_text(strip=True)
            race = race_element.get_text(strip=True)
            venue = venue_element.get_text(strip=True)
            time = time_element.get_text(strip=True) if time_element else "TBA"
            network = network_element['alt'] if network_element else "TBA"

            schedule_data.append({
                "date": date,
                "race": race,
                "venue": venue,
                "time": time,
                "series": "IndyCar",
                "network": network
            })

    return schedule_data

if __name__ == "__main__":
    indycar_schedule = scrape_indycar_schedule()
    with open('assets/_data/indycar.json', 'w') as f:
        json.dump(indycar_schedule, f, indent=2)
    print("Successfully scraped and saved IndyCar schedule to assets/_data/indycar.json")
