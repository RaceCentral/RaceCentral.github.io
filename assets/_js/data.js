// data.js
// Data module for racing schedules and results

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
function enhanceEventData(events) {
  return events.map(event => {
    const displaySeries = event.series.includes("NASCAR") ? "NASCAR" : event.series;
    return {
      ...event,
      start: parseEventDate(event.date),
      displaySeries
    };
  });
}

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
  parseEventDate,
  enhanceEventData,
  convertUTCtoLocal
};