
// This script fetches the F1 schedule from the Ergast API and formats it for the data.js file.
// It requires the 'node-fetch' package to be installed (npm install node-fetch).

import fetch from 'node-fetch';
import fs from 'fs';

const F1_API_URL = 'https://ergast.com/api/f1/2025.json';

async function fetchF1Schedule() {
  try {
    const response = await fetch(F1_API_URL);
    const data = await response.json();
    const races = data.MRData.RaceTable.Races;

    const formattedRaces = races.map(race => {
      return {
        date: new Date(race.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        race: race.raceName,
        circuit: race.Circuit.circuitName,
        time: race.time,
        time_utc: race.time.replace(':00Z', ''),
        series: 'F1',
        city: race.Circuit.Location.locality,
        latitude: parseFloat(race.Circuit.Location.lat),
        longitude: parseFloat(race.Circuit.Location.long),
        network: 'ESPN' // Assuming ESPN, as this is not in the API response
      };
    });

    fs.writeFileSync('assets/_data/f1.json', JSON.stringify(formattedRaces, null, 2));

    console.log('Successfully fetched and saved F1 schedule to assets/_data/f1.json');

  } catch (error) {
    console.error('Error fetching or updating F1 schedule:', error);
  }
}

fetchF1Schedule();
