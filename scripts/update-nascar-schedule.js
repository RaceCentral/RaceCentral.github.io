
// This script fetches the NASCAR schedule and formats it for the data.js file.
// It requires the 'node-fetch' package to be installed (npm install node-fetch).

import fetch from 'node-fetch';
import fs from 'fs';

const NASCAR_API_URL = 'https://cf.nascar.com/cacher/2025/1/schedule.json';

async function fetchNascarSchedule() {
  try {
    const response = await fetch(NASCAR_API_URL);
    const data = await response.json();

    const formattedRaces = data.map(race => {
      return {
        date: new Date(race.start_time_utc).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        race: race.race_name,
        venue: race.track_name,
        time: new Date(race.start_time_utc).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        time_utc: new Date(race.start_time_utc).toISOString().substr(11, 5),
        series: 'NASCAR Cup',
        network: race.tv_network,
        city: race.track_city,
        latitude: race.track_latitude,
        longitude: race.track_longitude
      };
    });

    fs.writeFileSync('assets/_data/nascar.json', JSON.stringify(formattedRaces, null, 2));

    console.log('Successfully fetched and saved NASCAR schedule to assets/_data/nascar.json');

  } catch (error) {
    console.error('Error fetching or updating NASCAR schedule:', error);
  }
}

fetchNascarSchedule();
