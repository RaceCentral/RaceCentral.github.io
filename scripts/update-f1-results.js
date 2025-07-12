
// This script fetches the latest F1 race results from the Ergast API and formats them.
// It requires the 'node-fetch' package to be installed.

import fetch from 'node-fetch';
import fs from 'fs';

const F1_RESULTS_API_URL = 'https://ergast.com/api/f1/current/last/results.json';

async function fetchF1Results() {
  try {
    const response = await fetch(F1_RESULTS_API_URL);
    const data = await response.json();
    const race = data.MRData.RaceTable.Races[0]; // Get the last race

    if (!race) {
      console.log('No F1 results found.');
      return null;
    }

    const formattedResults = {
      race: race.raceName,
      date: race.date,
      winner: `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`,
      second: `${race.Results[1].Driver.givenName} ${race.Results[1].Driver.familyName}`,
      third: `${race.Results[2].Driver.givenName} ${race.Results[2].Driver.familyName}`,
    };

    fs.writeFileSync('_data/f1-results.json', JSON.stringify(formattedResults, null, 2));
    console.log('Successfully fetched and saved F1 results to assets/_data/f1-results.json');
    return formattedResults;

  } catch (error) {
    console.error('Error fetching F1 results:', error);
    return null;
  }
}

fetchF1Results();
