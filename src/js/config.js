// API Configuration

export const config = {
    // Base URLs
    ERGAST_API_BASE: 'https://ergast.com/api/f1',
    INDYCAR_API_BASE: 'https://indycar.com/api', // Example URL
    NASCAR_API_BASE: 'https://api.nascar.com/live/1', // Example URL
    
    // Cache settings
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes in milliseconds
    
    // API credentials check
    hasValidCredentials: (series) => {
        // For now, only F1 (Ergast) API is publicly available
        return series.toLowerCase() === 'f1';
    }
}; 