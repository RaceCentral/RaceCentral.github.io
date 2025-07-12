
// This script consolidates the data from the JSON files in the _data directory into the data.js file.

import fs from 'fs';

const f1Data = JSON.parse(fs.readFileSync('assets/_data/f1.json', 'utf8'));
const nascarData = JSON.parse(fs.readFileSync('assets/_data/nascar.json', 'utf8'));
const indycarData = JSON.parse(fs.readFileSync('assets/_data/indycar.json', 'utf8'));
const f1ResultsData = JSON.parse(fs.readFileSync('assets/_data/f1-results.json', 'utf8'));
const indycarResultsData = JSON.parse(fs.readFileSync('assets/_data/indycar-results.json', 'utf8'));
const nascarResultsData = JSON.parse(fs.readFileSync('assets/_data/nascar-results.json', 'utf8'));

const dataJsContent = `
// data.js
// Data module for racing schedules and results

// 2025 Schedule Data

const f1Events = ${JSON.stringify(f1Data, null, 2)};

const indyEvents = ${JSON.stringify(indycarData, null, 2)};

const nascarEvents = ${JSON.stringify(nascarData, null, 2)};

// Split NASCAR events into regular season and playoffs internally
const nascarRegularEvents = nascarEvents.filter(event => {
  const eventDate = parseEventDate(event.date);
  return eventDate < new Date(Date.UTC(2025, 7, 31)); // Before Aug 31
});

const nascarPlayoffEvents = nascarEvents.filter(event => {
  const eventDate = parseEventDate(event.date);
  return eventDate >= new Date(Date.UTC(2025, 7, 31)); // Aug 31 and after
});
  
// Helper function to parse date strings.
// For date ranges (e.g. "Mar 15-17"), we take the first day.
function parseEventDate(dateStr) {
  const [month, day] = dateStr.split(" ");
  const months = {
    "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
    "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
  };
  
  const date = new Date(Date.UTC(2025, months[month], parseInt(day)));
  return date;
}
  
// Helper function to enhance event data with a "start" property.
function enhanceEventData() {
  const allEvents = [...f1Events, ...indyEvents, ...nascarRegularEvents, ...nascarPlayoffEvents];
  console.log('Enhanced Events:', allEvents.length);
  return allEvents.map(event => {
    const displaySeries = event.series.includes("NASCAR") ? "NASCAR" : event.series;
    return {
      ...event,
      start: parseEventDate(event.date),
      displaySeries
    };
  });
}

// 2024 Past Season Data

// Standings Data
const f1PastStandings = [
  { position: 1, driver: "Max Verstappen (Red Bull Racing Honda RBPT)", points: 437 },
  { position: 2, driver: "Lando Norris (McLaren Mercedes)", points: 374 },
  { position: 3, driver: "Charles Leclerc (Ferrari)", points: 356 }
];

const indyPastStandings = [
  { position: 1, driver: "Álex Palou (Chip Ganassi Racing)", points: 544 },
  { position: 2, driver: "Colton Herta (Andretti Global with Curb-Agajanian)", points: 513 },
  { position: 3, driver: "Scott Dixon (Chip Ganassi Racing)", points: 487 }
];

const nascarPastStandings = [
  { position: 1, driver: "Joey Logano (Team Penske)", points: 5040 },
  { position: 2, driver: "Ryan Blaney (Team Penske)", points: 5035 },
  { position: 3, driver: "Denny Hamlin (Joe Gibbs Racing)", points: 5030 }
];

// Race Results Data
const f1PastResults = f1ResultsData;

const indyPastResults = indycarResultsData;

const nascarPastResults = nascarResultsData;

// Add a "start" property to each schedule event using parseEventDate.
[f1Events, indyEvents, nascarRegularEvents, nascarPlayoffEvents].forEach(group => {
  group.forEach(e => {
    e.start = parseEventDate(e.date);
  });
});
  
// Create the data objects
const scheduleData = {
  f1Events,
  indyEvents,
  nascarRegularEvents,
  nascarPlayoffEvents
};

const resultsData = {
  f1Past: {
    standings: f1PastStandings,
    results: f1PastResults
  },
  indyPast: {
    standings: indyPastStandings,
    results: indyPastResults
  },
  nascarPast: {
    standings: nascarPastStandings,
    results: nascarPastResults
  }
};

// Debug logging
console.log('Schedule Data:', {
  f1Events: f1Events.length,
  indyEvents: indyEvents.length,
  nascarRegularEvents: nascarRegularEvents.length,
  nascarPlayoffEvents: nascarPlayoffEvents.length
});
  
// Debug logging
console.log('Results Data:', {
  f1Past: resultsData.f1Past.results.length,
  indyPast: resultsData.indyPast.results.length,
  nascarPast: resultsData.nascarPast.results.length
});

// Function to convert UTC time to local timezone
function convertUTCtoLocal(dateStr, timeUTC) {
  if (!timeUTC) return "";
  
  // Parse the date and UTC time
  const [month, day] = dateStr.split(" ");
  const months = {
    "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
    "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
  };
  
  // Parse UTC time components
  const [hours, minutes] = timeUTC.split(":");
  
  // Create date object in UTC
  const date = new Date(Date.UTC(2025, months[month], parseInt(day), parseInt(hours), parseInt(minutes)));
  
  // Convert to local time string
  return date.toLocaleTimeString([], { 
    hour: 'numeric', 
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

// Export all data and functions
export {
  scheduleData,
  resultsData,
  parseEventDate,
  enhanceEventData,
  convertUTCtoLocal
};
`;

fs.writeFileSync('assets/_js/data.js', dataJsContent);

console.log('Successfully consolidated data into data.js');
