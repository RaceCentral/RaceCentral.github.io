// API Integration Utilities
import { config } from './config.js';

/**
 * Cache object to store API responses
 */
const apiCache = new Map();

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
 * @returns {Promise<Object>} Driver standings data
 */
export async function getF1DriverStandings() {
    const url = `${config.ERGAST_API_BASE}/current/driverStandings.json`;
    const data = await fetchWithCache(url);
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

/**
 * Get F1 constructor standings
 * @returns {Promise<Object>} Constructor standings data
 */
export async function getF1ConstructorStandings() {
    const url = `${config.ERGAST_API_BASE}/current/constructorStandings.json`;
    const data = await fetchWithCache(url);
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}

/**
 * Get F1 race results
 * @param {number} round - Race round number
 * @returns {Promise<Object>} Race results data
 */
export async function getF1RaceResults(round) {
    const url = `${config.ERGAST_API_BASE}/current/${round}/results.json`;
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
 * Get NASCAR driver standings
 * @returns {Promise<Object>} NASCAR standings data
 */
export async function getNASCARDriverStandings() {
    try {
        const data = await fetchWithCache('/src/data/standings.json');
        return data.nascar;
    } catch (error) {
        console.error('Error fetching NASCAR standings:', error);
        return null;
    }
}

/**
 * Parse HTML string into a DOM Document
 * @param {string} html - HTML string to parse
 * @returns {Document} Parsed DOM Document
 */
function parseHTML(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
}

/**
 * Get IndyCar driver standings from local data
 * @returns {Promise<Object[]>} Array of driver standings
 */
export async function getIndyCarDriverStandings() {
    try {
        const data = await fetchWithCache('/src/data/standings.json');
        return data.indycar;
    } catch (error) {
        console.error('Error fetching IndyCar standings:', error);
        return null;
    }
} 