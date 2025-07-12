// Configuration module for racing site
// Centralized configuration management

export const config = {
    // API Configuration
    ERGAST_API_BASE: 'https://ergast.com/api/f1',
    PROXY_BASE_URL: 'https://api.allorigins.win/get?url=',
    
    // Groq API Configuration
    GROQ_API_KEY: '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',
    GROQ_BASE_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_MODEL: 'meta-llama/llama-4-scout-17b-16e-instruct',
    
    // Feature Flags
    FEATURES: {
        AI_PREVIEWS: true,
        AI_WEATHER_INSIGHTS: true,
        AI_RACE_ANALYSIS: true,
        AI_SEARCH: true,
        AI_TRIVIA: true,
        SMART_RECOMMENDATIONS: true
    },
    
    // Cache Configuration
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    AI_CACHE_DURATION: 60 * 60 * 1000, // 1 hour
    
    // API Keys (placeholder structure)
    API_KEYS: {
        f1: null,
        indycar: null,
        nascar: null
    },
    
    // Performance Settings
    MAX_CONCURRENT_REQUESTS: 3,
    REQUEST_TIMEOUT: 10000, // 10 seconds
    
    // UI Configuration
    UI: {
        ANIMATION_DURATION: 300,
        DEBOUNCE_DELAY: 300,
        PAGINATION_SIZE: 20,
        MOBILE_BREAKPOINT: 768
    },
    
    // Weather API Configuration
    WEATHER: {
        USER_AGENT: '(RacingCentral, info@racecentral.info)',
        API_BASE: 'https://api.weather.gov',
        CACHE_DURATION: 15 * 60 * 1000 // 15 minutes
    },
    
    // News Configuration
    NEWS: {
        RSS_PROXY: 'https://api.rss2json.com/v1/api.json',
        CACHE_DURATION: 30 * 60 * 1000, // 30 minutes
        MAX_ITEMS: 5
    },
    
    // Validation
    hasValidCredentials(service) {
        return this.API_KEYS[service] && this.API_KEYS[service].length > 0;
    },
    
    // Environment detection
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    },
    
    // Feature flag checker
    isFeatureEnabled(feature) {
        return this.FEATURES[feature] === true;
    },
    
    // Get appropriate cache duration for content type
    getCacheDuration(type) {
        switch (type) {
            case 'ai': return this.AI_CACHE_DURATION;
            case 'weather': return this.WEATHER.CACHE_DURATION;
            case 'news': return this.NEWS.CACHE_DURATION;
            default: return this.CACHE_DURATION;
        }
    }
};