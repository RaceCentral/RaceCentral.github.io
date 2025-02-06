// data.js
// Data module for racing schedules and results

// 2025 Schedule Data

const f1Events = [
    { date: "Mar 15", race: "Australian GP", circuit: "Melbourne Grand Prix Circuit", time: "9:00 PM", series: "Formula 1", city: "Melbourne", latitude: -37.8136, longitude: 144.9631 },
    { date: "Mar 23", race: "Chinese GP", circuit: "Shanghai International Circuit", time: "12:00 AM", series: "Formula 1", city: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
    { date: "Apr 5",  race: "Japanese GP", circuit: "Suzuka International Racing Course", time: "10:00 PM", series: "Formula 1", city: "Suzuka", latitude: 34.8823, longitude: 136.5844 },
    { date: "Apr 13", race: "Bahrain GP", circuit: "Bahrain International Circuit", time: "8:00 AM", series: "Formula 1", city: "Sakhir", latitude: 26.0325, longitude: 50.5106 },
    { date: "Apr 20", race: "Saudi Arabian GP", circuit: "Jeddah Street Circuit", time: "10:00 AM", series: "Formula 1", city: "Jeddah", latitude: 21.4858, longitude: 39.1925 },
    { date: "May 4",  race: "Miami GP", circuit: "Miami International Autodrome", time: "1:00 PM", series: "Formula 1", city: "Miami", latitude: 25.7617, longitude: -80.1918 },
    { date: "May 18", race: "Emilia Romagna GP", circuit: "Autodromo Enzo e Dino Ferrari", time: "6:00 AM", series: "Formula 1", city: "Imola", latitude: 44.3559, longitude: 11.7161 },
    { date: "May 25", race: "Monaco GP", circuit: "Circuit de Monaco", time: "6:00 AM", series: "Formula 1", city: "Monte Carlo", latitude: 43.7384, longitude: 7.4246 },
    { date: "Jun 1", race: "Spanish GP", circuit: "Circuit de Barcelona-Catalunya", time: "6:00 AM", series: "Formula 1", city: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
    { date: "Jun 15", race: "Canadian GP", circuit: "Circuit Gilles-Villeneuve", time: "11:00 AM", series: "Formula 1", city: "Montreal", latitude: 45.5017, longitude: -73.5673 },
    { date: "Jun 29", race: "Austrian GP", circuit: "Red Bull Ring", time: "6:00 AM", series: "Formula 1", city: "Spielberg", latitude: 47.2171, longitude: 14.7819 },
    { date: "Jul 6", race: "British GP", circuit: "Silverstone Circuit", time: "7:00 AM", series: "Formula 1", city: "Silverstone", latitude: 52.0786, longitude: -1.0169 },
    { date: "Jul 27", race: "Belgian GP", circuit: "Circuit de Spa-Francorchamps", time: "6:00 AM", series: "Formula 1", city: "Spa-Francorchamps", latitude: 50.4542, longitude: 5.9714 },
    { date: "Aug 3", race: "Hungarian GP", circuit: "Hungaroring", time: "6:00 AM", series: "Formula 1", city: "Budapest", latitude: 47.4979, longitude: 19.0402 },
    { date: "Aug 31", race: "Dutch GP", circuit: "Circuit Park Zandvoort", time: "6:00 AM", series: "Formula 1", city: "Zandvoort", latitude: 52.3833, longitude: 4.5333 },
    { date: "Sep 7", race: "Italian GP", circuit: "Autodromo Nazionale Monza", time: "6:00 AM", series: "Formula 1", city: "Monza", latitude: 45.5845, longitude: 9.2744 },
    { date: "Sep 21", race: "Azerbaijan GP", circuit: "Baku City Circuit", time: "4:00 AM", series: "Formula 1", city: "Baku", latitude: 40.4093, longitude: 49.8671 },
    { date: "Oct 5", race: "Singapore GP", circuit: "Marina Bay Street Circuit", time: "5:00 AM", series: "Formula 1", city: "Singapore", latitude: 1.3521, longitude: 103.8198 },
    { date: "Oct 19", race: "United States GP", circuit: "Circuit of the Americas", time: "12:00 PM", series: "Formula 1", city: "Austin", latitude: 30.2672, longitude: -97.7431 },
    { date: "Oct 26", race: "Mexico City GP", circuit: "Autodromo Hermanos Rodriguez", time: "1:00 PM", series: "Formula 1", city: "Mexico City", latitude: 19.4326, longitude: -99.1332 },
    { date: "Nov 9", race: "São Paulo GP", circuit: "Autodromo Jose Carlos Pace", time: "9:00 AM", series: "Formula 1", city: "São Paulo", latitude: -23.5505, longitude: -46.6333 },
    { date: "Nov 22", race: "Las Vegas GP", circuit: "Las Vegas Street Circuit", time: "8:00 PM", series: "Formula 1", city: "Las Vegas", latitude: 36.1699, longitude: -115.1398 },
    { date: "Nov 30", race: "Qatar GP", circuit: "Losail International Circuit", time: "8:00 AM", series: "Formula 1", city: "Lusail", latitude: 25.4181, longitude: 51.4904 },
    { date: "Dec 7", race: "Abu Dhabi GP", circuit: "Yas Marina Circuit", time: "5:00 AM", series: "Formula 1", city: "Abu Dhabi", latitude: 24.4539, longitude: 54.3773 }
  ];
  
  const indyEvents = [
    { date: "Mar 2", race: "Grand Prix of St. Petersburg", venue: "Streets of St. Petersburg", network: "FOX", series: "IndyCar", city: "St. Petersburg", latitude: 27.7676, longitude: -82.6403 },
    { date: "Mar 23", race: "Grand Prix of Thermal", venue: "The Thermal Club", network: "FOX", series: "IndyCar", city: "Thermal", latitude: 33.6409, longitude: -116.1390 },
    { date: "Apr 13", race: "Grand Prix of Long Beach", venue: "Streets of Long Beach", network: "FOX", series: "IndyCar", city: "Long Beach", latitude: 33.7701, longitude: -118.1937 },
    { date: "May 4", race: "Grand Prix of Alabama", venue: "Barber Motorsports Park", network: "FOX", series: "IndyCar", city: "Birmingham", latitude: 33.5186, longitude: -86.8104 },
    { date: "May 10", race: "Grand Prix of Indianapolis", venue: "Indianapolis Motor Speedway Road Course", network: "FOX", series: "IndyCar", city: "Indianapolis", latitude: 39.7684, longitude: -86.1581 },
    { date: "May 25", race: "Indianapolis 500", venue: "Indianapolis Motor Speedway", network: "FOX", series: "IndyCar", city: "Indianapolis", latitude: 39.7684, longitude: -86.1581 },
    { date: "Jun 1", race: "Grand Prix of Detroit", venue: "Detroit Street Circuit", network: "FOX", series: "IndyCar", city: "Detroit", latitude: 42.3314, longitude: -83.0458 },
    { date: "Jun 15", race: "Grand Prix of Illinois", venue: "World Wide Technology Raceway", network: "FOX", series: "IndyCar", city: "Madison", latitude: 38.6781, longitude: -90.1507 },
    { date: "Jun 22", race: "Grand Prix of Road America", venue: "Road America", network: "FOX", series: "IndyCar", city: "Elkhart Lake", latitude: 43.8336, longitude: -88.0173 },
    { date: "Jul 6", race: "Grand Prix of Mid-Ohio", venue: "Mid-Ohio Sports Car Course", network: "FOX", series: "IndyCar", city: "Lexington", latitude: 40.7334, longitude: -82.5824 },
    { date: "Jul 12", race: "Grand Prix of Iowa Race 1", venue: "Iowa Speedway", network: "FOX", series: "IndyCar", city: "Newton", latitude: 41.6997, longitude: -93.0477 },
    { date: "Jul 13", race: "Grand Prix of Iowa Race 2", venue: "Iowa Speedway", network: "FOX", series: "IndyCar", city: "Newton", latitude: 41.6997, longitude: -93.0477 },
    { date: "Jul 20", race: "Grand Prix of Toronto", venue: "Streets of Toronto", network: "FOX", series: "IndyCar", city: "Toronto", latitude: 43.6511, longitude: -79.3470 },
    { date: "Jul 27", race: "Grand Prix of Monterey", venue: "Weathertech Raceway Laguna Seca", network: "FOX", series: "IndyCar", city: "Monterey", latitude: 36.6002, longitude: -121.8947 },
    { date: "Aug 10", race: "Grand Prix of Portland", venue: "Portland International Raceway", network: "FOX", series: "IndyCar", city: "Portland", latitude: 45.5152, longitude: -122.6784 },
    { date: "Aug 24", race: "Grand Prix of Milwaukee", venue: "The Milwaukee Mile", network: "FOX", series: "IndyCar", city: "West Allis", latitude: 43.0167, longitude: -88.0070 },
    { date: "Aug 31", race: "Grand Prix of Nashville", venue: "Nashville Superspeedway", network: "FOX", series: "IndyCar", city: "Lebanon", latitude: 36.2081, longitude: -86.2911 }
  ];
  
  const nascarRegularEvents = [
    { date: "Feb 2", race: "Clash at Bowman Gray", venue: "Bowman Gray Stadium", network: "FOX", series: "NASCAR Cup (Regular)", city: "Winston-Salem, NC", latitude: 36.0999, longitude: -80.2442 },
    { date: "Feb 13", race: "Duel #1 & #2", venue: "Daytona International Speedway", network: "FS1", series: "NASCAR Cup (Regular)", city: "Daytona Beach, FL", latitude: 29.2108, longitude: -81.0228 },
    { date: "Feb 16", race: "Daytona 500", venue: "Daytona International Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Daytona Beach, FL", latitude: 29.2108, longitude: -81.0228 },
    { date: "Feb 23", race: "Atlanta", venue: "Atlanta Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Hampton, GA", latitude: 33.3870, longitude: -84.2827 },
    { date: "Mar 2", race: "Circuit of the Americas", venue: "Circuit of the Americas", network: "FOX", series: "NASCAR Cup (Regular)", city: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
    { date: "Mar 9", race: "Phoenix", venue: "Phoenix Raceway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Avondale, AZ", latitude: 33.4356, longitude: -112.3496 },
    { date: "Mar 16", race: "Las Vegas", venue: "Las Vegas Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Las Vegas, NV", latitude: 36.1699, longitude: -115.1398 },
    { date: "Mar 23", race: "Homestead-Miami", venue: "Homestead-Miami Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Homestead, FL", latitude: 25.4687, longitude: -80.4776 },
    { date: "Mar 30", race: "Martinsville", venue: "Martinsville Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Ridgeway, VA", latitude: 36.5782, longitude: -79.8511 },
    { date: "Apr 6", race: "Darlington", venue: "Darlington Raceway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Darlington, SC", latitude: 34.2996, longitude: -79.8764 },
    { date: "Apr 13", race: "Bristol", venue: "Bristol Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Bristol, TN", latitude: 36.5174, longitude: -82.5585 },
    { date: "Apr 27", race: "Talladega", venue: "Talladega Superspeedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Talladega, AL", latitude: 33.5801, longitude: -86.1058 },
    { date: "May 4", race: "Texas", venue: "Texas Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Fort Worth, TX", latitude: 32.7555, longitude: -97.3308 },
    { date: "May 11", race: "Kansas", venue: "Kansas Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Kansas City, KS", latitude: 39.1142, longitude: -94.6275 },
    { date: "May 18", race: "All-Star Race", venue: "North Wilkesboro Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "North Wilkesboro, NC", latitude: 36.1582, longitude: -81.1473 },
    { date: "May 25", race: "Charlotte", venue: "Charlotte Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Concord, NC", latitude: 35.4088, longitude: -80.5816 },
    { date: "Jun 1", race: "Nashville", venue: "Nashville Superspeedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Lebanon, TN", latitude: 36.2081, longitude: -86.2911 },
    { date: "Jun 8", race: "Michigan", venue: "Michigan International Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Brooklyn, MI", latitude: 42.1045, longitude: -84.2486 },
    { date: "Jun 15", race: "Mexico City", venue: "Autódromo Hermanos Rodríguez", network: "FOX", series: "NASCAR Cup (Regular)", city: "Mexico City, MX", latitude: 19.4326, longitude: -99.1332 },
    { date: "Jun 22", race: "Pocono", venue: "Pocono Raceway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Long Pond, PA", latitude: 41.0543, longitude: -75.5105 },
    { date: "Jun 28", race: "Atlanta", venue: "Atlanta Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Hampton, GA", latitude: 33.3870, longitude: -84.2827 },
    { date: "Jul 6", race: "Chicago Street Race", venue: "Chicago Street Course", network: "FOX", series: "NASCAR Cup (Regular)", city: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
    { date: "Jul 13", race: "Sonoma", venue: "Sonoma Raceway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Sonoma, CA", latitude: 38.2919, longitude: -122.458 },
    { date: "Jul 20", race: "Dover", venue: "Dover International Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Dover, DE", latitude: 39.1582, longitude: -75.5244 },
    { date: "Jul 27", race: "Indianapolis", venue: "Indianapolis Motor Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Indianapolis, IN", latitude: 39.7684, longitude: -86.1581 },
    { date: "Aug 3", race: "Iowa", venue: "Iowa Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Newton, IA", latitude: 41.6997, longitude: -93.0477 },
    { date: "Aug 10", race: "Watkins Glen", venue: "Watkins Glen International", network: "FOX", series: "NASCAR Cup (Regular)", city: "Watkins Glen, NY", latitude: 42.3809, longitude: -76.8735 },
    { date: "Aug 16", race: "Richmond", venue: "Richmond Raceway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Richmond, VA", latitude: 37.5407, longitude: -77.4360 },
    { date: "Aug 23", race: "Daytona", venue: "Daytona International Speedway", network: "FOX", series: "NASCAR Cup (Regular)", city: "Daytona Beach, FL", latitude: 29.2108, longitude: -81.0228 }
  ];
  
  const nascarPlayoffEvents = [
    { date: "Aug 31", race: "Darlington", venue: "Darlington Raceway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Darlington, SC", latitude: 34.2996, longitude: -79.8764 },
    { date: "Sep 7", race: "World Wide Technology Raceway", venue: "World Wide Technology Raceway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Madison, IL", latitude: 38.6781, longitude: -90.1507 },
    { date: "Sep 13", race: "Bristol", venue: "Bristol Motor Speedway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Bristol, TN", latitude: 36.5174, longitude: -82.5585 },
    { date: "Sep 21", race: "New Hampshire", venue: "New Hampshire Motor Speedway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Loudon, NH", latitude: 43.3623, longitude: -71.4634 },
    { date: "Sep 28", race: "Kansas", venue: "Kansas Speedway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Kansas City, KS", latitude: 39.1142, longitude: -94.6275 },
    { date: "Oct 5", race: "Charlotte Roval", venue: "Charlotte Motor Speedway Road Course", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Concord, NC", latitude: 35.4088, longitude: -80.5816 },
    { date: "Oct 12", race: "Las Vegas", venue: "Las Vegas Motor Speedway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Las Vegas, NV", latitude: 36.1699, longitude: -115.1398 },
    { date: "Oct 19", race: "Talladega", venue: "Talladega Superspeedway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Talladega, AL", latitude: 33.5801, longitude: -86.1058 },
    { date: "Oct 26", race: "Martinsville", venue: "Martinsville Speedway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Ridgeway, VA", latitude: 36.5782, longitude: -79.8511 },
    { date: "Nov 2", race: "Phoenix", venue: "Phoenix Raceway", network: "FOX", series: "NASCAR Cup (Playoffs)", city: "Avondale, AZ", latitude: 33.4356, longitude: -112.3496 }
  ];
  
  // Helper function to parse date strings.
  // For date ranges (e.g. "Mar 15-17"), we take the first day.
  export function parseEventDate(dateStr) {
    const parts = dateStr.split("-")[0].trim().split(" ");
    const monthStr = parts[0];
    const day = parseInt(parts[1]);
    const months = { 
      "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, 
      "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, 
      "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 
    };
    return new Date(2025, months[monthStr], day);
  }
    
  // Helper function to enhance event data with a "start" property.
  export function enhanceEventData() {
    const allEvents = [...f1Events, ...indyEvents, ...nascarRegularEvents, ...nascarPlayoffEvents];
    return allEvents.map(event => ({
      ...event,
      start: parseEventDate(event.date)
    }));
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
  const f1PastResults = [
    { grandPrix: "Bahrain", date: "Mar 2, 2024", winner: "Max Verstappen", second: "Charles Leclerc", third: "Carlos Sainz" },
    { grandPrix: "Saudi Arabia", date: "Mar 9, 2024", winner: "Max Verstappen", second: "Sergio Pérez", third: "Charles Leclerc" },
    { grandPrix: "Australia", date: "Mar 24, 2024", winner: "Carlos Sainz", second: "Max Verstappen", third: "Charles Leclerc" },
    { grandPrix: "Japan", date: "Apr 7, 2024", winner: "Max Verstappen", second: "Charles Leclerc", third: "Carlos Sainz" },
    { grandPrix: "China", date: "Apr 21, 2024", winner: "Max Verstappen", second: "Fernando Alonso", third: "Charles Leclerc" },
    { grandPrix: "Miami", date: "May 5, 2024", winner: "Lando Norris", second: "Max Verstappen", third: "Oscar Piastri" },
    { grandPrix: "Emilia-Romagna", date: "May 19, 2024", winner: "Max Verstappen", second: "George Russell", third: "Charles Leclerc" },
    { grandPrix: "Monaco", date: "May 26, 2024", winner: "Charles Leclerc", second: "Lewis Hamilton", third: "Max Verstappen" },
    { grandPrix: "Canada", date: "Jun 9, 2024", winner: "Max Verstappen", second: "George Russell", third: "Lewis Hamilton" },
    { grandPrix: "Spain", date: "Jun 23, 2024", winner: "Max Verstappen", second: "Lando Norris", third: "Lando Norris" },
    { grandPrix: "Austria", date: "Jun 30, 2024", winner: "George Russell", second: "Max Verstappen", third: "Fernando Alonso" },
    { grandPrix: "Great Britain", date: "Jul 7, 2024", winner: "Lewis Hamilton", second: "George Russell", third: "Carlos Sainz" },
    { grandPrix: "Hungary", date: "Jul 21, 2024", winner: "Oscar Piastri", second: "Lando Norris", third: "George Russell" },
    { grandPrix: "Belgium", date: "Jul 28, 2024", winner: "Lewis Hamilton", second: "Charles Leclerc", third: "Sergio Pérez" },
    { grandPrix: "Netherlands", date: "Aug 25, 2024", winner: "Lando Norris", second: "Lando Norris", third: "Lando Norris" },
    { grandPrix: "Italy", date: "Sep 1, 2024", winner: "Charles Leclerc", second: "Lando Norris", third: "Lando Norris" },
    { grandPrix: "Azerbaijan", date: "Sep 15, 2024", winner: "Oscar Piastri", second: "Charles Leclerc", third: "Lando Norris" },
    { grandPrix: "Singapore", date: "Sep 22, 2024", winner: "Lando Norris", second: "Lando Norris", third: "Daniel Ricciardo" },
    { grandPrix: "United States", date: "Oct 20, 2024", winner: "Charles Leclerc", second: "Lando Norris", third: "Esteban Ocon" },
    { grandPrix: "Mexico", date: "Oct 27, 2024", winner: "Carlos Sainz", second: "Carlos Sainz", third: "Charles Leclerc" },
    { grandPrix: "Brazil", date: "Nov 3, 2024", winner: "Max Verstappen", second: "Lando Norris", third: "Max Verstappen" },
    { grandPrix: "Las Vegas", date: "Nov 23, 2024", winner: "George Russell", second: "George Russell", third: "Lando Norris" },
    { grandPrix: "Qatar", date: "Dec 1, 2024", winner: "Max Verstappen", second: "George Russell", third: "Lando Norris" },
    { grandPrix: "Abu Dhabi", date: "Dec 8, 2024", winner: "Lando Norris", second: "Lando Norris", third: "Kevin Magnussen" }
  ];
  
  const indyPastResults = [
    { race: "Firestone Grand Prix of St. Petersburg", date: "Mar 10, 2024", winner: "Pato O'Ward", second: "Scott Dixon", third: "Josef Newgarden" },
    { race: "Acura Grand Prix of Long Beach", date: "Apr 21, 2024", winner: "Alex Palou", second: "Scott Dixon", third: "Will Power" },
    { race: "Honda Indy Grand Prix of Alabama", date: "May 5, 2024", winner: "Rinus VeeKay", second: "Álex Palou", third: "Alexander Rossi" },
    { race: "GMR Grand Prix", date: "May 12, 2024", winner: "Romain Grosjean", second: "Colton Herta", third: "Pato O'Ward" },
    { race: "Indianapolis 500", date: "May 26, 2024", winner: "Josef Newgarden", second: "Pato O'Ward", third: "Scott Dixon" },
    { race: "Chevrolet Detroit Grand Prix", date: "Jun 2, 2024", winner: "Álex Palou", second: "Will Power", third: "Marcus Ericsson" },
    { race: "Honda Indy 200 at Mid-Ohio", date: "Jul 7, 2024", winner: "Scott Dixon", second: "Álex Palou", third: "Josef Newgarden" },
    { race: "Honda Indy Toronto", date: "Jul 21, 2024", winner: "Colton Herta", second: "Kyle Kirkwood", third: "Scott Dixon" },
    { race: "Hy-Vee Homefront 250", date: "Jul 13, 2024", winner: "Josef Newgarden", second: "Will Power", third: "Pato O'Ward" },
    { race: "Hy-Vee One Step 250", date: "Jul 14, 2024", winner: "Josef Newgarden", second: "Pato O'Ward", third: "Scott McLaughlin" },
    { race: "Big Machine Music City Grand Prix", date: "Aug 4, 2024", winner: "Kyle Kirkwood", second: "Scott McLaughlin", third: "Álex Palou" },
    { race: "Gallagher Grand Prix", date: "Aug 11, 2024", winner: "Scott Dixon", second: "Graham Rahal", third: "Pato O'Ward" },
    { race: "Bommarito Automotive Group 500", date: "Aug 25, 2024", winner: "Josef Newgarden", second: "Pato O'Ward", third: "Scott Dixon" },
    { race: "Grand Prix of Portland", date: "Sep 1, 2024", winner: "Álex Palou", second: "Felix Rosenqvist", third: "Scott McLaughlin" },
    { race: "Firestone Grand Prix of Monterey", date: "Sep 8, 2024", winner: "Álex Palou", second: "Scott Dixon", third: "Will Power" }
  ];
  
  const nascarPastResults = [
    { race: "Daytona 500", date: "Feb 18, 2024", winner: "William Byron", second: "Joey Logano", third: "Kyle Larson" },
    { race: "Ambetter Health 400", date: "Feb 25, 2024", winner: "Daniel Suárez", second: "Ross Chastain", third: "Denny Hamlin" },
    { race: "Pennzoil 400", date: "Mar 3, 2024", winner: "Kyle Larson", second: "Martin Truex Jr.", third: "Christopher Bell" },
    { race: "Shriners Children's 500", date: "Mar 10, 2024", winner: "Christopher Bell", second: "Kevin Harvick", third: "Chase Elliott" },
    { race: "Food City 500", date: "Mar 17, 2024", winner: "Denny Hamlin", second: "Kyle Busch", third: "Tyler Reddick" },
    { race: "EchoPark Automotive Grand Prix", date: "Mar 24, 2024", winner: "William Byron", second: "A.J. Allmendinger", third: "Alex Bowman" },
    { race: "Toyota Owners 400", date: "Mar 31, 2024", winner: "Denny Hamlin", second: "William Byron", third: "Martin Truex Jr." },
    { race: "Cook Out 400", date: "Apr 7, 2024", winner: "William Byron", second: "Kyle Larson", third: "Christopher Bell" },
    { race: "Autotrader EchoPark Automotive 400", date: "Apr 14, 2024", winner: "Chase Elliott", second: "Ryan Blaney", third: "Joey Logano" },
    { race: "GEICO 500", date: "Apr 21, 2024", winner: "Tyler Reddick", second: "Bubba Wallace", third: "Brad Keselowski" },
    { race: "Würth 400", date: "Apr 28, 2024", winner: "Denny Hamlin", second: "Martin Truex Jr.", third: "Ross Chastain" },
    { race: "AdventHealth 400", date: "May 5, 2024", winner: "Kyle Larson", second: "Chase Elliott", third: "William Byron" },
    { race: "Goodyear 400", date: "May 12, 2024", winner: "Brad Keselowski", second: "Joey Logano", third: "Kevin Harvick" },
    { race: "NASCAR All-Star Race", date: "May 19, 2024", winner: "Joey Logano", second: "Ryan Blaney", third: "Kyle Busch" },
    { race: "Coca-Cola 600", date: "May 26, 2024", winner: "Christopher Bell", second: "Martin Truex Jr.", third: "Denny Hamlin" },
    { race: "Enjoy Illinois 300", date: "Jun 2, 2024", winner: "Austin Cindric", second: "Chase Briscoe", third: "Aric Almirola" },
    { race: "Toyota/Save Mart 350", date: "Jun 9, 2024", winner: "Kyle Larson", second: "Chase Elliott", third: "Tyler Reddick" },
    { race: "Iowa Corn 350", date: "Jun 16, 2024", winner: "Ryan Blaney", second: "Joey Logano", third: "William Byron" },
    { race: "USA Today 301", date: "Jun 23, 2024", winner: "Christopher Bell", second: "Denny Hamlin", third: "Martin Truex Jr." },
    { race: "Ally 400", date: "Jun 30, 2024", winner: "Joey Logano", second: "Kyle Larson", third: "Ross Chastain" },
    { race: "Grant Park 165", date: "Jul 7, 2024", winner: "Alex Bowman", second: "Chase Elliott", third: "Tyler Reddick" },
    { race: "The Great American Getaway 400", date: "Jul 14, 2024", winner: "Ryan Blaney", second: "William Byron", third: "Kyle Busch" },
    { race: "Brickyard 400", date: "Jul 21, 2024", winner: "Kyle Larson", second: "Denny Hamlin", third: "Christopher Bell" },
    { race: "Cook Out 400", date: "Aug 11, 2024", winner: "Austin Dillon", second: "Kevin Harvick", third: "Joey Logano" },
    { race: "FireKeepers Casino 400", date: "Aug 18, 2024", winner: "Tyler Reddick", second: "Martin Truex Jr.", third: "Kyle Larson" },
    { race: "Coke Zero Sugar 400", date: "Aug 24, 2024", winner: "Harrison Burton", second: "Kyle Busch", third: "Christopher Bell" },
    { race: "Southern 500", date: "Sep 1, 2024", winner: "Chase Briscoe", second: "Denny Hamlin", third: "Joey Logano" },
    { race: "Quaker State 400", date: "Sep 8, 2024", winner: "Joey Logano", second: "Ryan Blaney", third: "William Byron" },
    { race: "Go Bowling at The Glen", date: "Sep 15, 2024", winner: "Chris Buescher", second: "Chase Elliott", third: "Kyle Larson" },
    { race: "Bass Pro Shops Night Race", date: "Sep 21, 2024", winner: "Kyle Larson", second: "Denny Hamlin", third: "Martin Truex Jr." },
    { race: "Hollywood Casino 400", date: "Sep 29, 2024", winner: "Ross Chastain", second: "Kyle Busch", third: "Tyler Reddick" },
    { race: "YellaWood 500", date: "Oct 6, 2024", winner: "Ricky Stenhouse Jr.", second: "Bubba Wallace", third: "Joey Logano" },
    { race: "Bank of America Roval 400", date: "Oct 13, 2024", winner: "Kyle Larson", second: "A.J. Allmendinger", third: "Chase Elliott" },
    { race: "South Point 400", date: "Oct 20, 2024", winner: "Joey Logano", second: "Ryan Blaney", third: "Denny Hamlin" },
    { race: "Straight Talk Wireless 400", date: "Oct 27, 2024", winner: "Tyler Reddick", second: "William Byron", third: "Kyle Larson" },
    { race: "Xfinity 500", date: "Nov 3, 2024", winner: "Ryan Blaney", second: "Joey Logano", third: "Martin Truex Jr." },
    { race: "NASCAR Cup Series Championship", date: "Nov 10, 2024", winner: "Joey Logano", second: "Ryan Blaney", third: "William Byron" }
  ];
  
  // Add a "start" property to each schedule event using parseEventDate.
  [f1Events, indyEvents, nascarRegularEvents, nascarPlayoffEvents].forEach(group => {
    group.forEach(e => {
      e.start = parseEventDate(e.date);
    });
  });
    
  // Export schedule and results data.
  export const scheduleData = {
    f1Events,
    indyEvents,
    nascarRegularEvents,
    nascarPlayoffEvents
  };
    
  export const resultsData = {
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