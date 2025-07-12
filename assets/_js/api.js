// API Integration Utilities
import { config } from './config.js';

/**
 * Cache object to store API responses
 */
const apiCache = new Map();

// Schedule validation constants
const EXPECTED_COUNTS = {
    F1_RACES: 24,
    INDY_RACES: 17,
    NASCAR_REGULAR: 30,
    NASCAR_PLAYOFF: 10
};

/**
 * Validate response data against expected race counts
 * @param {Object} data - The response data
 * @param {string} series - Series identifier ('f1', 'indycar', 'nascar')
 * @returns {boolean} Whether the data is valid
 */
function validateResponseData(data, series) {
    if (!data) return false;
    
    switch (series) {
        case 'f1':
            return data.length === EXPECTED_COUNTS.F1_RACES;
        case 'indycar':
            return data.length === EXPECTED_COUNTS.INDY_RACES;
        case 'nascar':
            // NASCAR combines regular and playoff races
            return data.length === (EXPECTED_COUNTS.NASCAR_REGULAR + EXPECTED_COUNTS.NASCAR_PLAYOFF);
        default:
            return false;
    }
}

/**
 * Fetch with cache utility
 * @param {string} url - The URL to fetch
 * @param {number} cacheTime - Cache duration in milliseconds (default: 5 minutes)
 */
async function fetchWithCache(url, cacheTime = config.CACHE_DURATION) {
    if (apiCache.has(url)) {
        const { data, timestamp } = apiCache.get(url);
        if (Date.now() - timestamp < cacheTime) {
            return data;
        }
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    apiCache.set(url, {
        data,
        timestamp: Date.now()
    });
    
    return data;
}

/**
 * Get current F1 driver standings
 * @param {number} [season] - Optional season year (defaults to current season)
 * @returns {Promise<Object>} Driver standings data
 */
export async function getF1DriverStandings(season) {
    const url = season 
        ? `${config.ERGAST_API_BASE}/${season}/driverStandings.json`
        : `${config.ERGAST_API_BASE}/current/driverStandings.json`;
    
    const data = await fetchWithCache(url);
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

/**
 * Get F1 constructor standings
 * @param {number} [season] - Optional season year (defaults to current season)
 * @returns {Promise<Object>} Constructor standings data
 */
export async function getF1ConstructorStandings(season) {
    const url = season 
        ? `${config.ERGAST_API_BASE}/${season}/constructorStandings.json`
        : `${config.ERGAST_API_BASE}/current/constructorStandings.json`;
    
    const data = await fetchWithCache(url);
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}

/**
 * Get F1 race results
 * @param {number} round - Race round number
 * @param {number} [season] - Optional season year (defaults to current season)
 * @returns {Promise<Object>} Race results data
 */
export async function getF1RaceResults(round, season) {
    const url = season 
        ? `${config.ERGAST_API_BASE}/${season}/${round}/results.json`
        : `${config.ERGAST_API_BASE}/current/${round}/results.json`;
    
    const data = await fetchWithCache(url);
    return data.MRData.RaceTable.Races[0];
}

/**
 * Get F1 qualifying results
 * @param {number} round - Race round number
 * @param {number} [season] - Optional season year (defaults to current season)
 * @returns {Promise<Object>} Qualifying results data
 */
export async function getF1QualifyingResults(round, season) {
    const url = season 
        ? `${config.ERGAST_API_BASE}/${season}/${round}/qualifying.json`
        : `${config.ERGAST_API_BASE}/current/${round}/qualifying.json`;
    
    const data = await fetchWithCache(url);
    return data.MRData.RaceTable.Races[0];
}

/**
 * Get F1 lap times for a specific race
 * @param {number} round - Race round number
 * @param {number} [season] - Optional season year (defaults to current season)
 * @returns {Promise<Object>} Lap times data
 */
export async function getF1LapTimes(round, season) {
    const url = season 
        ? `${config.ERGAST_API_BASE}/${season}/${round}/laps.json`
        : `${config.ERGAST_API_BASE}/current/${round}/laps.json`;
    
    const data = await fetchWithCache(url);
    return data.MRData.RaceTable.Races[0];
}

/**
 * Get F1 pit stops for a specific race
 * @param {number} round - Race round number
 * @param {number} [season] - Optional season year (defaults to current season)
 * @returns {Promise<Object>} Pit stops data
 */
export async function getF1PitStops(round, season) {
    const url = season 
        ? `${config.ERGAST_API_BASE}/${season}/${round}/pitstops.json`
        : `${config.ERGAST_API_BASE}/current/${round}/pitstops.json`;
    
    const data = await fetchWithCache(url);
    return data.MRData.RaceTable.Races[0];
}

/**
 * Get F1 driver information
 * @param {string} driverId - Driver identifier
 * @returns {Promise<Object>} Driver information
 */
export async function getF1DriverInfo(driverId) {
    const url = `${config.ERGAST_API_BASE}/drivers/${driverId}.json`;
    const data = await fetchWithCache(url);
    return data.MRData.DriverTable.Drivers[0];
}

/**
 * Get F1 circuit information
 * @param {string} circuitId - Circuit identifier
 * @returns {Promise<Object>} Circuit information
 */
export async function getF1CircuitInfo(circuitId) {
    const url = `${config.ERGAST_API_BASE}/circuits/${circuitId}.json`;
    const data = await fetchWithCache(url);
    return data.MRData.CircuitTable.Circuits[0];
}

/**
 * IndyCar API Base URL (requires API key)
 */
const INDYCAR_API_BASE = 'https://indycar.com/api';
const INDYCAR_API_KEY = INDYCAR_API_KEY; // Would need to be configured

/**
 * NASCAR API Base URL (requires credentials)
 */
const NASCAR_API_BASE = 'https://api.nascar.com/live/1';
const NASCAR_API_KEY = NASCAR_API_KEY; // Would need to be configured

/**
 * Get IndyCar driver standings
 * @param {number} [season] - Optional season year
 * @returns {Promise<Object>} Driver standings data
 */
export async function getIndyCarDriverStandings(season) {
    try {
        if (!config.hasValidCredentials('indycar')) {
            // Fallback to scraping or alternative source
            const data = await scrapeIndyCarStandings(season);
            if (validateResponseData(data, 'indycar')) {
                return data;
            }
            throw new Error('Invalid IndyCar standings data');
        }

        const url = `${config.INDYCAR_API_BASE}/standings/drivers/${season || 'current'}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${config.INDYCAR_API_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`IndyCar API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        if (!validateResponseData(data, 'indycar')) {
            throw new Error('Invalid IndyCar API response');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching IndyCar standings:', error);
        return null;
    }
}

/**
 * Get NASCAR Cup Series standings
 * @param {number} [season] - Optional season year
 * @returns {Promise<Object>} Driver standings data
 */
export async function getNASCARDriverStandings(season) {
    try {
        if (!config.hasValidCredentials('nascar')) {
            // Fallback to scraping or alternative source
            const data = await scrapeNASCARStandings(season);
            if (validateResponseData(data, 'nascar')) {
                return data;
            }
            throw new Error('Invalid NASCAR standings data');
        }

        const url = `${config.NASCAR_API_BASE}/points-feed/cup/${season || new Date().getFullYear()}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${config.NASCAR_API_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`NASCAR API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        if (!validateResponseData(data, 'nascar')) {
            throw new Error('Invalid NASCAR API response');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching NASCAR standings:', error);
        return null;
    }
}

/**
 * Fallback: Scrape IndyCar standings from their website
 * @param {number} [season] - Optional season year
 */
async function scrapeIndyCarStandings(season) {
    try {
        const response = await fetch(`${config.PROXY_BASE_URL}/scrape/indycar/standings/${season || ''}`);
        if (!response.ok) throw new Error('Failed to fetch IndyCar standings');
        return await response.json();
    } catch (error) {
        console.error('Error fetching IndyCar standings:', error);
        return null;
    }
}

/**
 * Fallback: Scrape NASCAR standings from their website
 * @param {number} [season] - Optional season year
 */
async function scrapeNASCARStandings(season) {
    try {
        const response = await fetch(`${config.PROXY_BASE_URL}/scrape/nascar/standings/${season || ''}`);
        if (!response.ok) throw new Error('Failed to fetch NASCAR standings');
        return await response.json();
    } catch (error) {
        console.error('Error fetching NASCAR standings:', error);
        return null;
    }
}

/**
 * Check if F1 season data is available
 * @param {number} season - Season year to check
 * @returns {Promise<boolean>} Whether the season data is available
 */
async function isF1SeasonAvailable(season) {
    try {
        const url = `${config.ERGAST_API_BASE}/${season}/1.json`;
        const response = await fetch(url);
        const data = await response.json();
        return data.MRData.RaceTable.Races.length > 0;
    } catch {
        return false;
    }
}

/**
 * Get F1 standings with fallback options
 * @param {number} [season] - Optional season year
 * @returns {Promise<Object>} Standings data
 */
export async function getF1StandingsWithFallback(season = new Date().getFullYear()) {
    try {
        // First try Ergast API
        if (await isF1SeasonAvailable(season)) {
            const data = await getF1DriverStandings(season);
            if (validateResponseData(data, 'f1')) {
                return data;
            }
        }

        // If not available, try official F1 API if we have credentials
        if (config.hasValidCredentials('f1')) {
            const data = await getF1OfficialStandings(season);
            if (validateResponseData(data, 'f1')) {
                return data;
            }
        }

        // Last resort: use cached/scraped data
        if (config.USE_CACHED_DATA) {
            const data = await getF1CachedStandings(season);
            if (validateResponseData(data, 'f1')) {
                return data;
            }
        }

        throw new Error('No valid F1 standings data available');
    } catch (error) {
        console.error('Error fetching F1 standings:', error);
        return null;
    }
}

/**
 * Get standings from official F1 API
 * @param {number} season - Season year
 * @returns {Promise<Object>} Standings data
 */
async function getF1OfficialStandings(season) {
    const url = `https://api.formula1.com/v1/standings/${season}`;
    const response = await fetch(url, {
        headers: {
            'apikey': config.F1_OFFICIAL_API_KEY,
            'Accept': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error('F1 official API request failed');
    }
    
    return await response.json();
}

/**
 * Get cached/scraped F1 standings
 * @param {number} season - Season year
 * @returns {Promise<Object>} Standings data
 */
async function getF1CachedStandings(season) {
    const response = await fetch(`${config.PROXY_BASE_URL}/f1/cached-standings/${season}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cached F1 standings');
    }
    return await response.json();
}

// Additional APIs can be added here for IndyCar and NASCAR
// Note: These series don't have official APIs, so we might need to use alternative data sources 