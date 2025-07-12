
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
        position: standing.position,
        driver: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
        points: standing.points
      };
    });

    const teamStandings = teamData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(standing => {
      return {
        position: standing.position,
        team: standing.Constructor.name,
        points: standing.points
      };
    });

    const dataJsContent = fs.readFileSync('assets/_js/data.js', 'utf8');

    const newF1DriverStandings = `const f1PastStandings = ${JSON.stringify(driverStandings, null, 2)};`;
    const newF1TeamStandings = `const f1TeamStandings = ${JSON.stringify(teamStandings, null, 2)};`;

    let updatedContent = dataJsContent.replace(/const f1PastStandings = \[[\s\S]*?\];/, newF1DriverStandings);
    updatedContent = updatedContent.replace(/const f1TeamStandings = \[[\s\S]*?\];/, newF1TeamStandings);

    fs.writeFileSync('assets/_js/data.js', updatedContent);

    console.log('Successfully updated F1 standings in data.js');

  } catch (error) {
    console.error('Error fetching or updating F1 standings:', error);
  }
}

fetchStandings();
