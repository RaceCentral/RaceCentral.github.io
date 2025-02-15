// data.js
// Data module for racing schedules and results

// 2025 Schedule Data

const f1Events = [
    { date: "Mar 15", race: "Australian GP", circuit: "Melbourne Grand Prix Circuit", time: "9:00 PM", time_utc: "04:00", series: "Formula 1", city: "Melbourne", latitude: -37.8136, longitude: 144.9631, network: "ESPN" },
    { date: "Mar 23", race: "Chinese GP", circuit: "Shanghai International Circuit", time: "12:00 AM", time_utc: "07:00", series: "Formula 1", city: "Shanghai", latitude: 31.2304, longitude: 121.4737, network: "ESPN" },
    { date: "Apr 5",  race: "Japanese GP", circuit: "Suzuka International Racing Course", time: "10:00 PM", time_utc: "05:00", series: "Formula 1", city: "Suzuka", latitude: 34.8823, longitude: 136.5844, network: "ESPN" },
    { date: "Apr 13", race: "Bahrain GP", circuit: "Bahrain International Circuit", time: "8:00 AM", time_utc: "15:00", series: "Formula 1", city: "Sakhir", latitude: 26.0325, longitude: 50.5106, network: "ESPN" },
    { date: "Apr 20", race: "Saudi Arabian GP", circuit: "Jeddah Street Circuit", time: "10:00 AM", time_utc: "17:00", series: "Formula 1", city: "Jeddah", latitude: 21.4858, longitude: 39.1925, network: "ESPN" },
    { date: "May 4",  race: "Miami GP", circuit: "Miami International Autodrome", time: "1:00 PM", time_utc: "20:00", series: "Formula 1", city: "Miami", latitude: 25.7617, longitude: -80.1918, network: "ESPN" },
    { date: "May 18", race: "Emilia Romagna GP", circuit: "Autodromo Enzo e Dino Ferrari", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Imola", latitude: 44.3559, longitude: 11.7161, network: "ESPN" },
    { date: "May 25", race: "Monaco GP", circuit: "Circuit de Monaco", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Monte Carlo", latitude: 43.7384, longitude: 7.4246, network: "ESPN" },
    { date: "Jun 1", race: "Spanish GP", circuit: "Circuit de Barcelona-Catalunya", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Barcelona", latitude: 41.3851, longitude: 2.1734, network: "ESPN" },
    { date: "Jun 15", race: "Canadian GP", circuit: "Circuit Gilles-Villeneuve", time: "11:00 AM", time_utc: "18:00", series: "Formula 1", city: "Montreal", latitude: 45.5017, longitude: -73.5673, network: "ESPN" },
    { date: "Jun 29", race: "Austrian GP", circuit: "Red Bull Ring", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Spielberg", latitude: 47.2171, longitude: 14.7819, network: "ESPN" },
    { date: "Jul 6", race: "British GP", circuit: "Silverstone Circuit", time: "7:00 AM", time_utc: "14:00", series: "Formula 1", city: "Silverstone", latitude: 52.0786, longitude: -1.0169, network: "ESPN" },
    { date: "Jul 27", race: "Belgian GP", circuit: "Circuit de Spa-Francorchamps", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Spa-Francorchamps", latitude: 50.4542, longitude: 5.9714, network: "ESPN" },
    { date: "Aug 3", race: "Hungarian GP", circuit: "Hungaroring", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Budapest", latitude: 47.4979, longitude: 19.0402, network: "ESPN" },
    { date: "Aug 31", race: "Dutch GP", circuit: "Circuit Park Zandvoort", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Zandvoort", latitude: 52.3833, longitude: 4.5333, network: "ESPN" },
    { date: "Sep 7", race: "Italian GP", circuit: "Autodromo Nazionale Monza", time: "6:00 AM", time_utc: "13:00", series: "Formula 1", city: "Monza", latitude: 45.5845, longitude: 9.2744, network: "ESPN" },
    { date: "Sep 21", race: "Azerbaijan GP", circuit: "Baku City Circuit", time: "4:00 AM", time_utc: "11:00", series: "Formula 1", city: "Baku", latitude: 40.4093, longitude: 49.8671, network: "ESPN" },
    { date: "Oct 5", race: "Singapore GP", circuit: "Marina Bay Street Circuit", time: "5:00 AM", time_utc: "12:00", series: "Formula 1", city: "Singapore", latitude: 1.3521, longitude: 103.8198, network: "ESPN" },
    { date: "Oct 19", race: "United States GP", circuit: "Circuit of the Americas", time: "12:00 PM", time_utc: "19:00", series: "Formula 1", city: "Austin", latitude: 30.2672, longitude: -97.7431, network: "ESPN" },
    { date: "Oct 26", race: "Mexico City GP", circuit: "Autodromo Hermanos Rodriguez", time: "1:00 PM", time_utc: "20:00", series: "Formula 1", city: "Mexico City", latitude: 19.4326, longitude: -99.1332, network: "ESPN" },
    { date: "Nov 9", race: "São Paulo GP", circuit: "Autodromo Jose Carlos Pace", time: "9:00 AM", time_utc: "17:00", series: "Formula 1", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, network: "ESPN" },
    { date: "Nov 22", race: "Las Vegas GP", circuit: "Las Vegas Street Circuit", time: "8:00 PM", time_utc: "04:00", series: "Formula 1", city: "Las Vegas", latitude: 36.1699, longitude: -115.1398, network: "ESPN" },
    { date: "Nov 30", race: "Qatar GP", circuit: "Losail International Circuit", time: "8:00 AM", time_utc: "16:00", series: "Formula 1", city: "Lusail", latitude: 25.4181, longitude: 51.4904, network: "ESPN" },
    { date: "Dec 7", race: "Abu Dhabi GP", circuit: "Yas Marina Circuit", time: "5:00 AM", time_utc: "13:00", series: "Formula 1", city: "Abu Dhabi", latitude: 24.4539, longitude: 54.3773, network: "ESPN" }
  ];
  
  const indyEvents = [
    { date: "Mar 2", race: "Firestone Grand Prix of St. Petersburg", venue: "Streets of St. Petersburg", time: "12:00 PM", time_utc: "17:00", series: "IndyCar", network: "FOX", city: "St. Petersburg", latitude: 27.7676, longitude: -82.6403 },
    { date: "Mar 23", race: "The Thermal Club IndyCar Grand Prix", venue: "The Thermal Club", time: "3:00 PM", time_utc: "20:00", series: "IndyCar", network: "FOX", city: "Thermal", latitude: 33.6403, longitude: -116.1310 },
    { date: "Apr 13", race: "Acura Grand Prix of Long Beach", venue: "Streets of Long Beach", time: "4:30 PM", time_utc: "21:30", series: "IndyCar", network: "FOX", city: "Long Beach", latitude: 33.7701, longitude: -118.1937 },
    { date: "May 4", race: "Children's of Alabama Indy Grand Prix", venue: "Barber Motorsports Park", time: "1:30 PM", time_utc: "18:30", series: "IndyCar", network: "FOX", city: "Birmingham", latitude: 33.5307, longitude: -86.6123 },
    { date: "May 10", race: "Sonsio Grand Prix", venue: "Indianapolis Motor Speedway (Road)", time: "4:30 PM", time_utc: "21:30", series: "IndyCar", network: "FOX", city: "Indianapolis", latitude: 39.7955, longitude: -86.2354 },
    { date: "May 25", race: "109th Running of the Indianapolis 500", venue: "Indianapolis Motor Speedway (Oval)", time: "10:00 AM", time_utc: "15:00", series: "IndyCar", network: "FOX", city: "Indianapolis", latitude: 39.7955, longitude: -86.2354 },
    { date: "Jun 1", race: "Chevrolet Detroit Grand Prix", venue: "Streets of Detroit", time: "12:30 PM", time_utc: "17:30", series: "IndyCar", network: "FOX", city: "Detroit", latitude: 42.3314, longitude: -83.0458 },
    { date: "Jun 15", race: "Bommarito Automotive Group 500", venue: "World Wide Technology Raceway", time: "3:00 PM", time_utc: "20:00", series: "IndyCar", network: "FOX", city: "Madison", latitude: 38.6513, longitude: -90.1372 },
    { date: "Jun 22", race: "XPEL Grand Prix at Road America", venue: "Road America", time: "3:30 PM", time_utc: "20:30", series: "IndyCar", network: "FOX", city: "Elkhart Lake", latitude: 43.8014, longitude: -87.9950 },
    { date: "Jul 6", race: "Honda Indy 200 at Mid-Ohio", venue: "Mid-Ohio Sports Car Course", time: "2:00 PM", time_utc: "19:00", series: "IndyCar", network: "FOX", city: "Lexington", latitude: 40.6876, longitude: -82.6381 },
    { date: "Jul 12", race: "Hy-Vee INDYCAR Race Weekend Race 1", venue: "Iowa Speedway", time: "5:00 PM", time_utc: "22:00", series: "IndyCar", network: "FOX", city: "Newton", latitude: 41.6739, longitude: -93.0223 },
    { date: "Jul 13", race: "Hy-Vee INDYCAR Race Weekend Race 2", venue: "Iowa Speedway", time: "2:00 PM", time_utc: "19:00", series: "IndyCar", network: "FOX", city: "Newton", latitude: 41.6739, longitude: -93.0223 },
    { date: "Jul 20", race: "Ontario Honda Dealers Indy Toronto", venue: "Streets of Toronto", time: "2:00 PM", time_utc: "19:00", series: "IndyCar", network: "FOX", city: "Toronto", latitude: 43.6532, longitude: -79.3832 },
    { date: "Jul 27", race: "INDYCAR Grand Prix of Monterey", venue: "WeatherTech Raceway Laguna Seca", time: "3:00 PM", time_utc: "20:00", series: "IndyCar", network: "FOX", city: "Monterey", latitude: 36.5841, longitude: -121.7544 },
    { date: "Aug 10", race: "BITNILE.com Grand Prix of Portland", venue: "Portland International Raceway", time: "3:00 PM", time_utc: "20:00", series: "IndyCar", network: "FOX", city: "Portland", latitude: 45.5955, longitude: -122.6869 },
    { date: "Aug 24", race: "Milwaukee Mile", venue: "Milwaukee Mile", time: "2:00 PM", time_utc: "19:00", series: "IndyCar", network: "FOX", city: "West Allis", latitude: 43.0167, longitude: -88.0165 },
    { date: "Aug 31", race: "Big Machine Music City Grand Prix", venue: "Nashville Superspeedway", time: "2:30 PM", time_utc: "19:30", series: "IndyCar", network: "FOX", city: "Lebanon", latitude: 36.0870, longitude: -86.4144 }
  ];
  
  const nascarEvents = [
    // Regular Season
    { date: "Feb 2", race: "Clash at Bowman Gray", venue: "Bowman Gray Stadium", time: "8:00 PM", time_utc: "01:00", series: "NASCAR Cup (Regular)", network: "FOX", city: "Winston-Salem", latitude: 36.0999, longitude: -80.2242 },
    { date: "Feb 13", race: "Duels at Daytona", venue: "Daytona International Speedway", time: "7:00 PM", time_utc: "00:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "Daytona Beach", latitude: 29.1857, longitude: -81.0694 },
    { date: "Feb 16", race: "Daytona 500", venue: "Daytona International Speedway", time: "1:30 PM", time_utc: "18:30", series: "NASCAR Cup (Regular)", network: "FOX", city: "Daytona Beach", latitude: 29.1857, longitude: -81.0694 },
    { date: "Feb 23", race: "Ambetter Health 400", venue: "Atlanta Motor Speedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FOX", city: "Hampton", latitude: 33.3863, longitude: -84.3150 },
    { date: "Mar 2", race: "EchoPark Automotive Grand Prix", venue: "Circuit of the Americas", time: "3:30 PM", time_utc: "20:30", series: "NASCAR Cup (Regular)", network: "FOX", city: "Austin", latitude: 30.1328, longitude: -97.6411 },
    { date: "Mar 9", race: "Shriners Children's 500", venue: "Phoenix Raceway", time: "3:30 PM", time_utc: "20:30", series: "NASCAR Cup (Regular)", network: "FS1", city: "Avondale", latitude: 33.3748, longitude: -112.3110 },
    { date: "Mar 16", race: "Pennzoil 400", venue: "Las Vegas Motor Speedway", time: "3:30 PM", time_utc: "20:30", series: "NASCAR Cup (Regular)", network: "FS1", city: "Las Vegas", latitude: 36.2724, longitude: -115.0100 },
    { date: "Mar 23", race: "Straight Talk Wireless 400", venue: "Homestead-Miami Speedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "Homestead", latitude: 25.4502, longitude: -80.4043 },
    { date: "Mar 30", race: "NASCAR Cup Series Race at Martinsville", venue: "Martinsville Speedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "Ridgeway", latitude: 36.6340, longitude: -79.8525 },
    { date: "Apr 6", race: "Goodyear 400", venue: "Darlington Raceway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "Darlington", latitude: 34.2950, longitude: -79.9053 },
    { date: "Apr 13", race: "Food City 500", venue: "Bristol Motor Speedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "Bristol", latitude: 36.5158, longitude: -82.2570 },
    { date: "Apr 27", race: "Jack Link's 500", venue: "Talladega Superspeedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FOX", city: "Lincoln", latitude: 33.5689, longitude: -86.0665 },
    { date: "May 4", race: "AutoTrader EchoPark Automotive 400", venue: "Texas Motor Speedway", time: "3:30 PM", time_utc: "20:30", series: "NASCAR Cup (Regular)", network: "FS1", city: "Fort Worth", latitude: 32.8972, longitude: -97.2820 },
    { date: "May 11", race: "AdventHealth 400", venue: "Kansas Speedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "Kansas City", latitude: 39.1156, longitude: -94.8316 },
    { date: "May 18", race: "All-Star Open", venue: "North Wilkesboro Speedway", time: "5:30 PM", time_utc: "22:30", series: "NASCAR Cup (Regular)", network: "FS1", city: "North Wilkesboro", latitude: 36.1779, longitude: -81.0756 },
    { date: "May 18", race: "All-Star Race", venue: "North Wilkesboro Speedway", time: "8:00 PM", time_utc: "01:00", series: "NASCAR Cup (Regular)", network: "FS1", city: "North Wilkesboro", latitude: 36.1779, longitude: -81.0756 },
    { date: "May 25", race: "Coca-Cola 600", venue: "Charlotte Motor Speedway", time: "6:00 PM", time_utc: "23:00", series: "NASCAR Cup (Regular)", network: "Prime Video", city: "Concord", latitude: 35.3487, longitude: -80.6820 },
    { date: "Jun 1", race: "NASCAR Cup Series Race at Nashville", venue: "Nashville Superspeedway", time: "7:00 PM", time_utc: "00:00", series: "NASCAR Cup (Regular)", network: "Prime Video", city: "Lebanon", latitude: 36.0870, longitude: -86.4144 },
    { date: "Jun 8", race: "FireKeepers Casino 400", venue: "Michigan International Speedway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Regular)", network: "Prime Video", city: "Brooklyn", latitude: 42.0667, longitude: -84.2417 },
    { date: "Jun 15", race: "NASCAR Cup Series Race at Mexico City", venue: "Autódromo Hermanos Rodríguez", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Regular)", network: "Prime Video", city: "Mexico City", latitude: 19.4042, longitude: -99.0907 },
    { date: "Jun 22", race: "NASCAR Cup Series Race at Pocono", venue: "Pocono Raceway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Regular)", network: "Prime Video", city: "Long Pond", latitude: 41.0552, longitude: -75.5099 },
    { date: "Jun 28", race: "In-Season Tournament: Quaker State 400", venue: "Atlanta Motor Speedway", time: "7:00 PM", time_utc: "00:00", series: "NASCAR Cup (Regular)", network: "TNT", city: "Hampton", latitude: 33.3863, longitude: -84.3150 },
    { date: "Jul 6", race: "In-Season Tournament: Grant Park 165", venue: "Chicago Street Race", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Regular)", network: "TNT", city: "Chicago", latitude: 41.8781, longitude: -87.6298 },
    { date: "Jul 13", race: "In-Season Tournament: Toyota/Save Mart 350", venue: "Sonoma Raceway", time: "3:30 PM", time_utc: "20:30", series: "NASCAR Cup (Regular)", network: "TNT", city: "Sonoma", latitude: 38.1613, longitude: -122.4547 },
    { date: "Jul 20", race: "In-Season Tournament: NASCAR Cup Series Race at Dover", venue: "Dover Motor Speedway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Regular)", network: "TNT", city: "Dover", latitude: 39.1897, longitude: -75.5327 },
    { date: "Jul 27", race: "In-Season Tournament: Brickyard 400", venue: "Indianapolis Motor Speedway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Regular)", network: "TNT", city: "Speedway", latitude: 39.7955, longitude: -86.2354 },
    { date: "Aug 3", race: "Iowa Corn 350", venue: "Iowa Speedway", time: "3:30 PM", time_utc: "20:30", series: "NASCAR Cup (Regular)", network: "USA Network", city: "Newton", latitude: 41.6739, longitude: -93.0223 },
    { date: "Aug 10", race: "NASCAR Cup Series Race at Watkins Glen", venue: "Watkins Glen International", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Regular)", network: "USA Network", city: "Watkins Glen", latitude: 42.3369, longitude: -76.9273 },
    { date: "Aug 16", race: "NASCAR Cup Series Race at Richmond", venue: "Richmond Raceway", time: "7:30 PM", time_utc: "00:30", series: "NASCAR Cup (Regular)", network: "USA Network", city: "Richmond", latitude: 37.5927, longitude: -77.4198 },
    { date: "Aug 23", race: "Coke Zero Sugar 400", venue: "Daytona International Speedway", time: "7:30 PM", time_utc: "00:30", series: "NASCAR Cup (Regular)", network: "NBC", city: "Daytona Beach", latitude: 29.1857, longitude: -81.0694 },

    // Playoffs
    { date: "Aug 31", race: "Southern 500", venue: "Darlington Raceway", time: "6:00 PM", time_utc: "23:00", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Darlington", latitude: 34.2950, longitude: -79.9053 },
    { date: "Sep 7", race: "Enjoy Illinois 300", venue: "World Wide Technology Raceway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Madison", latitude: 38.6513, longitude: -90.1372 },
    { date: "Sep 13", race: "Bass Pro Shops Night Race", venue: "Bristol Motor Speedway", time: "7:30 PM", time_utc: "00:30", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Bristol", latitude: 36.5158, longitude: -82.2570 },
    { date: "Sep 21", race: "NASCAR Cup Series Playoff Race at New Hampshire", venue: "New Hampshire Motor Speedway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Loudon", latitude: 43.3616, longitude: -71.4647 },
    { date: "Sep 28", race: "Hollywood Casino 400", venue: "Kansas Speedway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Kansas City", latitude: 39.1156, longitude: -94.8316 },
    { date: "Oct 5", race: "Bank of America ROVAL 400", venue: "Charlotte Motor Speedway Road Course", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Concord", latitude: 35.3487, longitude: -80.6820 },
    { date: "Oct 12", race: "South Point 400", venue: "Las Vegas Motor Speedway", time: "5:30 PM", time_utc: "22:30", series: "NASCAR Cup (Playoffs)", network: "USA Network", city: "Las Vegas", latitude: 36.2724, longitude: -115.0100 },
    { date: "Oct 19", race: "NASCAR Cup Series Playoff Race at Talladega", venue: "Talladega Superspeedway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Playoffs)", network: "NBC", city: "Lincoln", latitude: 33.5689, longitude: -86.0665 },
    { date: "Oct 26", race: "NASCAR Cup Series Playoff Race at Martinsville", venue: "Martinsville Speedway", time: "2:00 PM", time_utc: "19:00", series: "NASCAR Cup (Playoffs)", network: "NBC", city: "Ridgeway", latitude: 36.6340, longitude: -79.8525 },
    { date: "Nov 2", race: "NASCAR Cup Series Championship", venue: "Phoenix Raceway", time: "3:00 PM", time_utc: "20:00", series: "NASCAR Cup (Playoffs)", network: "NBC", city: "Avondale", latitude: 33.3748, longitude: -112.3110 }
  ];
  
  // Split NASCAR events into regular season and playoffs
  const nascarRegularEvents = nascarEvents.filter(event => event.series === "NASCAR Cup (Regular)");
  const nascarPlayoffEvents = nascarEvents.filter(event => event.series === "NASCAR Cup (Playoffs)");
  
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
    { race: "Clash at Bowman Gray", date: "Feb 2, 2024", winner: "Chase Elliott", second: "Ryan Blaney", third: "Denny Hamlin" },
    { race: "Duels at Daytona #1", date: "Feb 13, 2024", winner: "Bubba Wallace", second: "William Byron", third: "Ty Dillon" },
    { race: "Duels at Daytona #2", date: "Feb 13, 2024", winner: "Austin Cindric", second: "Erik Jones", third: "Chris Buescher" },
    // Add more NASCAR results as they happen
  ];
  
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