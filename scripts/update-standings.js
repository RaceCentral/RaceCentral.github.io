// This script fetches the F1 driver and team standings from the Ergast API and formats it for the data.js file.
// It requires the 'node-fetch' package to be installed (npm install node-fetch).

import fetch from 'node-fetch';
import fs from 'fs';

const F1_DRIVER_STANDINGS_API_URL = 'https://ergast.com/api/f1/2025/driverStandings.json';
const F1_TEAM_STANDINGS_API_URL = 'https://ergast.com/api/f1/2025/constructorStandings.json';

async function fetchStandings() {
  try {
    const [driverResponse, teamResponse] = await Promise.all([
      fetch(F1_DRIVER_STANDINGS_API_URL),
      fetch(F1_TEAM_STANDINGS_API_URL)
    ]);

    const driverData = await driverResponse.json();
    const teamData = await teamResponse.json();

    const driverStandings = driverData.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(standing => {
      return {
        position: parseInt(standing.position),
        driver: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
        points: parseFloat(standing.points)
      };
    });

    const teamStandings = teamData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(standing => {
      return {
        position: parseInt(standing.position),
        team: standing.Constructor.name,
        points: parseFloat(standing.points)
      };
    });

    // Read existing results.json
    let resultsJson = {};
    try {
      resultsJson = JSON.parse(fs.readFileSync('_data/results.json', 'utf8'));
    } catch (readError) {
      console.warn('Could not read _data/results.json, creating new one.', readError.message);
    }

    // Update F1 standings in resultsJson
    if (!resultsJson.f1Past) {
      resultsJson.f1Past = {};
    }
    resultsJson.f1Past.standings = driverStandings;
    resultsJson.f1Past.teamStandings = teamStandings; // Add team standings

    // Write updated results.json back
    fs.writeFileSync('_data/results.json', JSON.stringify(resultsJson, null, 2));

    console.log('Successfully updated F1 standings in _data/results.json');

  } catch (error) {
    console.error('Error fetching or updating F1 standings:', error);
  }
}

fetchStandings();