// AI Race Analysis Module - Static Site Version
// Provides race analysis, circuit insights, and track information
// Note: For GitHub Pages deployment, AI features are disabled due to API key security

export class AIRaceAnalysis {
    constructor() {
        this.baseURL = '/api'; // Backend API endpoint (not available on GitHub Pages)
        this.cache = new Map();
        this.isEnabled = false; // Disabled for static site deployment
        this.isStaticSite = true; // Flag to indicate static site mode
        this.userApiKey = localStorage.getItem('openai-api-key'); // User-provided API key
        
        // Auto-configure for site owner
        this.initializeForOwner();
        
        // Enable AI if user has provided their own API key
        if (this.userApiKey) {
            this.isEnabled = true;
            this.isStaticSite = false;
        }
    }

    // Initialize with owner's API key (for your personal use)
    initializeForOwner() {
        // Check if this is likely the site owner (no existing key, localhost/your domain)
        const isOwner = !this.userApiKey && (
            window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.includes('connorbescos')
        );
        
        if (isOwner) {
            // Your pre-configured key (encoded to avoid GitHub scrapers)
            const ownerKey = atob('c2stcHJvai1BdG1zSFE3WnZDeUxUaTVOVWRNVVFYYUtnN3ZkZXV4dXBzTGx1TjJORGYtTEdMSnNmTVVkOWpxWE5ZUTNkQWhnRmVCU0ZxdTFpRVQzQmxia0ZKM3gwamdIUlFsTklaenh5cjVReUtSM2FVY291RVo4aFExQ0dBeWVETHBJTHhhSy1acDdCbmszQUFmcnhKWEw3NWRWQ3pPeHNzQUE=');
            this.setUserApiKey(ownerKey);
            console.log('🤖 AI predictions enabled for site owner');
        }
    }

    // Allow users to set their own OpenAI API key
    setUserApiKey(apiKey) {
        if (apiKey && apiKey.startsWith('sk-')) {
            localStorage.setItem('openai-api-key', apiKey);
            this.userApiKey = apiKey;
            this.isEnabled = true;
            this.isStaticSite = false;
            return true;
        }
        return false;
    }

    // Remove user API key
    removeUserApiKey() {
        localStorage.removeItem('openai-api-key');
        this.userApiKey = null;
        this.isEnabled = false;
        this.isStaticSite = true;
    }

    // Direct OpenAI API call with user's key
    async callOpenAI(prompt) {
        if (!this.userApiKey) {
            throw new Error('No API key available');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.userApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Cheaper model
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Main method to get race analysis
    async getRacePrediction(event, weatherData = null) {
        if (!this.isEnabled) {
            return this.getStaticRaceInfo(event);
        }

        const cacheKey = `prediction_${event.series}_${event.race}_${event.date}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < 3600000) { // 1 hour cache
                return cached.data;
            }
        }

        try {
            let analysis;
            
            if (this.userApiKey) {
                // Use direct OpenAI API with user's key
                const prompt = this.buildRaceAnalysisPrompt(event, weatherData);
                analysis = await this.callOpenAI(prompt);
            } else {
                // Use backend API (if available)
                analysis = await this.callBackendAPI('/race-analysis', {
                    event,
                    weatherData,
                    analysisType: 'detailed'
                });
            }
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: analysis,
                timestamp: Date.now()
            });

            return analysis;
        } catch (error) {
            console.error('Error generating AI analysis:', error);
            // Fallback to static content
            return this.getStaticRaceInfo(event);
        }
    }

    // Build prompt for race analysis
    buildRaceAnalysisPrompt(event, weatherData = null) {
        const weatherInfo = weatherData ? 
            `Weather conditions: ${weatherData.forecast}, ${weatherData.temperature}°F, wind: ${weatherData.wind}` : 
            'Weather conditions unknown';

        return `Analyze the upcoming ${event.series} race: "${event.race}" at ${event.circuit || event.venue} on ${event.date}.

${weatherInfo}

Please provide:
1. Circuit characteristics and racing challenges
2. Key factors that will influence the race outcome
3. Strategic considerations (tire strategy, fuel, weather impact)
4. What fans should watch for during the race

Keep the analysis under 400 words and focus on racing insights rather than just describing the circuit.`;
    }

    // Generate race preview/analysis
    async getRacePreview(event) {
        if (!this.isEnabled) {
            return this.getStaticRaceInfo(event);
        }

        const cacheKey = `preview_${event.series}_${event.race}_${event.date}`;
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < 3600000) { // 1 hour cache
                return cached.data;
            }
        }

        try {
            const preview = await this.callBackendAPI('/race-analysis', {
                event,
                analysisType: 'preview'
            });
            
            this.cache.set(cacheKey, {
                data: preview,
                timestamp: Date.now()
            });

            return preview;
        } catch (error) {
            console.error('Error generating race preview:', error);
            return this.getStaticRaceInfo(event);
        }
    }

    // Get weather-based insights
    async getWeatherInsights(event, weatherData) {
        if (!weatherData || !this.isEnabled) return null;

        try {
            return await this.callBackendAPI('/race-analysis', {
                event,
                weatherData,
                analysisType: 'weather'
            });
        } catch (error) {
            return null;
        }
    }

    // Static race information for when AI is not available
    getStaticRaceInfo(event) {
        const circuitInfo = this.getCircuitInfo(event);
        
        return `${circuitInfo.description}\n\n${circuitInfo.keyFeatures}\n\n${circuitInfo.watchFor}`;
    }

    // Get race winner predictions based on historical data and track characteristics
    getRaceWinnerPredictions(event) {
        const series = event.series;
        const circuit = event.circuit || event.venue;
        const race = event.race;

        // Get series-specific predictions
        if (series === 'F1') {
            return this.getF1Predictions(circuit, race);
        } else if (series === 'IndyCar') {
            return this.getIndyCarPredictions(circuit, race);
        } else if (series.includes('NASCAR')) {
            return this.getNASCARPredictions(circuit, race);
        }

        return "1. TBD - Predictions will be updated closer to race weekend\n2. TBD - Check back for updated analysis\n3. TBD - Multiple contenders possible";
    }

    // F1 Winner Predictions
    getF1Predictions(circuit, race) {
        const predictions = {
            // Street Circuits favor precision drivers
            "Monaco": "1. Charles Leclerc - Monaco specialist with home advantage\n2. Max Verstappen - Exceptional in qualifying, crucial for Monaco\n3. Lewis Hamilton - Seven-time winner, street circuit master",
            
            "Jeddah": "1. Max Verstappen - Dominant on high-speed street circuits\n2. Charles Leclerc - Strong in Saudi Arabia historically\n3. Sergio Pérez - Excellent street circuit record",
            
            "Singapore": "1. Charles Leclerc - Night race specialist\n2. Carlos Sainz - Consistent in hot conditions\n3. Lando Norris - Strong in technical street sections",
            
            "Baku": "1. Charles Leclerc - Previous winner, strong in Baku\n2. Sergio Pérez - Excellent street circuit form\n3. Max Verstappen - Speed advantage on long straights",

            // High-speed circuits favor Red Bull/McLaren
            "Monza": "1. Max Verstappen - Dominant pace advantage\n2. Lando Norris - McLaren's straight-line speed\n3. Charles Leclerc - Ferrari's home race motivation",
            
            "Spa": "1. Max Verstappen - Exceptional in changing conditions\n2. Charles Leclerc - Strong Ferrari performance at Spa\n3. Lewis Hamilton - Master of wet weather racing",
            
            "Silverstone": "1. Lewis Hamilton - Home hero, seven-time winner\n2. Max Verstappen - Dominant current form\n3. Lando Norris - McLaren's British hope",

            // Technical circuits
            "Suzuka": "1. Max Verstappen - Technical precision specialist\n2. Charles Leclerc - Strong in technical sections\n3. Fernando Alonso - Suzuka master",
            
            "Barcelona": "1. Max Verstappen - Testing advantage knowledge\n2. Charles Leclerc - Ferrari development track\n3. Lewis Hamilton - Consistent Barcelona performer",

            // Power circuits
            "Austin": "1. Max Verstappen - COTA specialist\n2. Lewis Hamilton - Previous winner\n3. Charles Leclerc - Ferrari's US push",
            
            "Mexico": "1. Max Verstappen - Altitude advantage\n2. Sergio Pérez - Home race hero\n3. Charles Leclerc - Strong at altitude",

            // Default for other circuits
            "default": "1. Max Verstappen - Championship leader, consistent pace\n2. Charles Leclerc - Ferrari's top threat\n3. Lando Norris - McLaren's rising star"
        };

        // Try to find specific circuit predictions
        for (const [key, prediction] of Object.entries(predictions)) {
            if (circuit.includes(key) || race.includes(key)) {
                return prediction;
            }
        }

        return predictions.default;
    }

    // IndyCar Winner Predictions
    getIndyCarPredictions(circuit, race) {
        const predictions = {
            // Indianapolis 500 - Special case
            "Indianapolis 500": "1. Scott Dixon - Six-time champion, Indy specialist\n2. Josef Newgarden - Defending winner, oval master\n3. Álex Palou - Current champion, rising star",
            
            "Indianapolis": "1. Scott Dixon - IMS specialist, multiple wins\n2. Álex Palou - Defending champion\n3. Will Power - Penske power at home track",

            // Street circuits
            "St. Petersburg": "1. Josef Newgarden - Street circuit specialist\n2. Álex Palou - Season opener advantage\n3. Scott Dixon - Consistent street performer",
            
            "Long Beach": "1. Álex Palou - Defending winner\n2. Josef Newgarden - Street circuit master\n3. Colton Herta - California native",
            
            "Detroit": "1. Álex Palou - Strong on street circuits\n2. Will Power - Penske Detroit specialist\n3. Scott McLaughlin - Rising Penske star",
            
            "Toronto": "1. Colton Herta - Previous winner\n2. Álex Palou - Championship form\n3. Scott Dixon - Street circuit veteran",

            // Road courses
            "Road America": "1. Álex Palou - Road course specialist\n2. Scott Dixon - Veteran road racer\n3. Colton Herta - Natural road course talent",
            
            "Mid-Ohio": "1. Scott Dixon - Home track advantage\n2. Álex Palou - Technical circuit specialist\n3. Graham Rahal - Ohio native",
            
            "Laguna Seca": "1. Álex Palou - West coast specialist\n2. Colton Herta - California advantage\n3. Scott Dixon - Veteran presence",
            
            "Portland": "1. Álex Palou - Pacific Northwest form\n2. Scott Dixon - Consistent performer\n3. Josef Newgarden - Road course improvement",

            // Ovals
            "Iowa": "1. Josef Newgarden - Oval specialist\n2. Scott Dixon - Short oval master\n3. Will Power - Penske oval strength",
            
            "Gateway": "1. Josef Newgarden - Gateway specialist\n2. Scott Dixon - Oval veteran\n3. Álex Palou - Improving oval form",

            // Default
            "default": "1. Álex Palou - Defending champion, consistent pace\n2. Scott Dixon - Six-time champion veteran\n3. Josef Newgarden - Penske's top threat"
        };

        // Try to find specific venue predictions
        for (const [key, prediction] of Object.entries(predictions)) {
            if (circuit.includes(key) || race.includes(key)) {
                return prediction;
            }
        }

        return predictions.default;
    }

    // NASCAR Winner Predictions
    getNASCARPredictions(circuit, race) {
        const predictions = {
            // Superspeedways
            "Daytona": "1. Joey Logano - Superspeedway specialist, defending champion\n2. Ryan Blaney - Penske superspeedway strength\n3. Denny Hamlin - Three-time Daytona 500 winner",
            
            "Talladega": "1. Joey Logano - Superspeedway master\n2. Brad Keselowski - Restrictor plate specialist\n3. Ryan Blaney - Penske superspeedway power",

            // Short tracks
            "Bristol": "1. Kyle Larson - Short track specialist\n2. Christopher Bell - Bristol winner\n3. Tyler Reddick - Rising short track star",
            
            "Martinsville": "1. Joey Logano - Martinsville master\n2. Ryan Blaney - Short track specialist\n3. Christopher Bell - Playoff performer",
            
            "Richmond": "1. Denny Hamlin - Home track advantage\n2. Kyle Larson - Short track speed\n3. Tyler Reddick - Richmond specialist",

            // Intermediate tracks
            "Charlotte": "1. Kyle Larson - 600-mile specialist\n2. Denny Hamlin - Charlotte master\n3. Christopher Bell - JGR strength",
            
            "Atlanta": "1. Joey Logano - Superspeedway-style racing\n2. Ryan Blaney - Pack racing specialist\n3. Kyle Larson - Speed advantage",
            
            "Kansas": "1. Denny Hamlin - Kansas specialist\n2. Kyle Larson - Intermediate track master\n3. Christopher Bell - Playoff experience",
            
            "Las Vegas": "1. Kyle Larson - Vegas winner\n2. Joey Logano - Intermediate specialist\n3. Tyler Reddick - Rising star",
            
            "Phoenix": "1. Joey Logano - Championship experience\n2. Ryan Blaney - Phoenix specialist\n3. Christopher Bell - Playoff performer",

            // Road courses
            "COTA": "1. Tyler Reddick - Road course specialist\n2. AJ Allmendinger - Road course master\n3. Chase Elliott - Road course talent",
            
            "Sonoma": "1. Tyler Reddick - Road course ace\n2. AJ Allmendinger - Sonoma specialist\n3. Christopher Bell - Road course improver",
            
            "Watkins Glen": "1. Tyler Reddick - Road course specialist\n2. AJ Allmendinger - Road course veteran\n3. Chase Elliott - Glen winner",
            
            "Chicago": "1. Tyler Reddick - Street course specialist\n2. AJ Allmendinger - Road racing expert\n3. Christopher Bell - Adaptability",

            // Unique tracks
            "Pocono": "1. Denny Hamlin - Pocono specialist\n2. Kyle Larson - Unique track master\n3. Christopher Bell - JGR strength",
            
            "Michigan": "1. Joey Logano - Michigan winner\n2. Kyle Larson - Superspeedway speed\n3. Ryan Blaney - Penske power",
            
            "Indianapolis": "1. Kyle Larson - Brickyard specialist\n2. Denny Hamlin - Indy experience\n3. Tyler Reddick - Rising talent",

            // Default
            "default": "1. Kyle Larson - Speed and versatility\n2. Joey Logano - Defending champion\n3. Denny Hamlin - Veteran consistency"
        };

        // Try to find specific track predictions
        for (const [key, prediction] of Object.entries(predictions)) {
            if (circuit.includes(key) || race.includes(key)) {
                return prediction;
            }
        }

        return predictions.default;
    }

    // Static circuit information database
    getCircuitInfo(event) {
        const circuit = event.circuit || event.venue;
        const series = event.series;

        // Default info structure
        const defaultInfo = {
            description: `The ${event.race} is a key event in the ${series} calendar.`,
            keyFeatures: `This race takes place at ${circuit}, known for its unique characteristics and challenging layout.`,
            watchFor: `Watch for exciting racing action and strategic battles throughout the event.`
        };

        // Circuit-specific information
        const circuitDatabase = {
            // F1 Circuits
            "Monaco": {
                description: "The Monaco Grand Prix is the crown jewel of Formula 1, held on the streets of Monte Carlo.",
                keyFeatures: "Ultra-narrow streets, elevation changes, and the famous tunnel section make this the ultimate test of precision driving.",
                watchFor: "Qualifying is crucial as overtaking is nearly impossible. Watch for strategy plays and potential safety car periods."
            },
            "Silverstone": {
                description: "The British Grand Prix at Silverstone is the home of Formula 1, featuring high-speed corners and rich history.",
                keyFeatures: "Fast flowing corners like Maggotts and Becketts, plus the challenging Copse corner test aerodynamic efficiency.",
                watchFor: "High-speed battles through the technical middle sector and potential for multiple overtaking zones."
            },
            "Spa-Francorchamps": {
                description: "The Belgian Grand Prix at Spa is known for its length, elevation changes, and unpredictable weather.",
                keyFeatures: "The famous Eau Rouge-Raidillon complex and long Kemmel Straight create spectacular racing moments.",
                watchFor: "Weather can change rapidly, creating strategic opportunities and dramatic racing conditions."
            },
            "Monza": {
                description: "The Italian Grand Prix at Monza is the 'Temple of Speed' with passionate tifosi support.",
                keyFeatures: "Long straights and chicanes create slipstream battles and late-braking opportunities.",
                watchFor: "Pack racing with multiple lead changes and strategic use of DRS zones for overtaking."
            },

            // IndyCar Venues
            "Indianapolis Motor Speedway": {
                description: "The Indianapolis 500 is the greatest spectacle in racing, held at the legendary Brickyard.",
                keyFeatures: "2.5-mile oval with four distinct turns, requiring perfect setup balance between speed and handling.",
                watchFor: "Pack racing, strategic fuel windows, and the traditional milk celebration for the winner."
            },
            "Streets of St. Petersburg": {
                description: "The season opener on the streets of St. Petersburg combines technical sections with waterfront views.",
                keyFeatures: "Concrete barriers, elevation changes, and a challenging turn 1 create exciting racing opportunities.",
                watchFor: "First race rust, new car debuts, and potential for caution periods on the street circuit."
            },
            "Road America": {
                description: "Road America in Wisconsin is a high-speed natural terrain road course beloved by drivers.",
                keyFeatures: "Long straights, sweeping corners, and the famous Kink create opportunities for spectacular racing.",
                watchFor: "Multiple racing lines, late-race fuel strategy, and battles through the carousel section."
            },

            // NASCAR Venues
            "Daytona International Speedway": {
                description: "Daytona is the home of NASCAR, hosting both the season-opening Daytona 500 and summer night race.",
                keyFeatures: "2.5-mile superspeedway with high banking creates pack racing and dramatic finishes.",
                watchFor: "Restrictor plate racing, drafting strategies, and the potential for 'The Big One' multi-car accidents."
            },
            "Talladega Superspeedway": {
                description: "Talladega is NASCAR's longest and fastest track, known for incredible speeds and close finishes.",
                keyFeatures: "2.66-mile tri-oval with 33-degree banking allows for three-wide racing at 200+ mph.",
                watchFor: "Superspeedway racing tactics, late-race positioning, and photo finishes."
            },
            "Bristol Motor Speedway": {
                description: "Bristol is a high-banked short track known as 'The Last Great Colosseum' for its gladiator-like racing.",
                keyFeatures: "0.533-mile concrete oval with 28-degree banking creates intense, close-quarters racing.",
                watchFor: "Bumping and grinding, tire strategy, and the unique atmosphere of night racing under the lights."
            },
            "Charlotte Motor Speedway": {
                description: "Charlotte hosts the longest race of the year, the Coca-Cola 600, on Memorial Day weekend.",
                keyFeatures: "1.5-mile quad-oval with multiple grooves allows for side-by-side racing and strategic battles.",
                watchFor: "600-mile endurance test, changing track conditions from day to night, and fuel mileage strategies."
            }
        };

        // Try to find specific circuit info
        for (const [key, info] of Object.entries(circuitDatabase)) {
            if (circuit.includes(key) || event.race.includes(key)) {
                return info;
            }
        }

        // Series-specific defaults
        if (series === 'F1') {
            return {
                description: `The ${event.race} is a prestigious Formula 1 Grand Prix featuring the world's best drivers and teams.`,
                keyFeatures: `${circuit} presents unique challenges with its distinctive layout and characteristics that test both car and driver.`,
                watchFor: "Strategic battles, DRS overtaking zones, and the precision required for Formula 1 racing."
            };
        } else if (series === 'IndyCar') {
            return {
                description: `The ${event.race} showcases IndyCar's diverse racing with close competition and strategic depth.`,
                keyFeatures: `${circuit} offers exciting racing opportunities with its challenging layout and multiple racing lines.`,
                watchFor: "Close wheel-to-wheel racing, fuel strategy windows, and the competitive parity of IndyCar."
            };
        } else if (series.includes('NASCAR')) {
            return {
                description: `The ${event.race} brings NASCAR's exciting stock car racing to ${circuit}.`,
                keyFeatures: `This venue provides thrilling NASCAR action with opportunities for multiple racing grooves and strategic battles.`,
                watchFor: "Drafting strategies, tire management, and the potential for late-race drama and exciting finishes."
            };
        }

        return defaultInfo;
    }

    // Call backend API with error handling (for when backend is available)
    async callBackendAPI(endpoint, data, maxRetries = 2) {
        if (this.isStaticSite) {
            throw new Error('Backend API not available in static site mode');
        }

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(`${this.baseURL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.error || 'Unknown API error');
                }

                return result.analysis || result;

            } catch (error) {
                console.error(`Backend API attempt ${attempt + 1} failed:`, error);
                
                if (attempt === maxRetries) {
                    throw new Error(`Failed to get AI analysis after ${maxRetries + 1} attempts: ${error.message}`);
                }
                
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
    }

    // Get quick analysis for multiple events
    async getBatchPredictions(events, limit = 3) {
        if (!this.isEnabled) {
            // Return static info for each event
            return events.slice(0, limit).map(event => ({
                event,
                prediction: this.getStaticRaceInfo(event),
                success: true
            }));
        }

        try {
            const response = await this.callBackendAPI('/batch-analysis', {
                events,
                limit
            });

            return response.analyses.map(analysis => ({
                event: analysis.event,
                prediction: analysis.analysis,
                success: analysis.success,
                error: analysis.error
            }));
        } catch (error) {
            console.error('Error getting batch predictions:', error);
            // Fallback to static content
            return events.slice(0, limit).map(event => ({
                event,
                prediction: this.getStaticRaceInfo(event),
                success: true
            }));
        }
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Get cache stats
    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.keys())
        };
    }

    // Check if AI features are available
    isAIEnabled() {
        return this.isEnabled;
    }

    // Get status message for UI
    getStatusMessage() {
        if (this.isStaticSite) {
            return "Race predictions and circuit information provided from our comprehensive database.";
        }
        return this.isEnabled ? "AI analysis available" : "AI analysis temporarily unavailable";
    }

    // Get just the winner predictions (for compact display)
    getWinnerPredictions(event) {
        return this.getRaceWinnerPredictions(event);
    }

    // Get top 3 predictions as an array
    getTop3Predictions(event) {
        const predictions = this.getRaceWinnerPredictions(event);
        const lines = predictions.split('\n');
        return lines.slice(0, 3).map(line => {
            const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/);
            if (match) {
                return {
                    position: line.charAt(0),
                    driver: match[1].trim(),
                    reason: match[2].trim()
                };
            }
            return {
                position: line.charAt(0),
                driver: line.substring(3).trim(),
                reason: ""
            };
        });
    }

    // Generate styled HTML for race predictions
    generatePredictionsHTML(event, compact = false) {
        const predictions = this.getTop3Predictions(event);
        const series = event.series;
        const compactClass = compact ? 'predictions-compact' : '';
        
        const positionClasses = ['first', 'second', 'third'];
        const confidenceValues = [85, 75, 65]; // Mock confidence values
        
        const predictionsHTML = predictions.map((pred, index) => {
            const positionClass = positionClasses[index] || '';
            const confidence = confidenceValues[index] || 50;
            
            return `
                <div class="prediction-item">
                    <div class="prediction-position ${positionClass}">
                        ${pred.position}
                    </div>
                    <div class="prediction-details">
                        <div class="prediction-driver">${pred.driver}</div>
                        <div class="prediction-reason">${pred.reason}</div>
                    </div>
                    <div class="prediction-confidence">
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${confidence}%"></div>
                        </div>
                        <span class="confidence-text">${confidence}%</span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="race-predictions loading ${compactClass}" data-series="${series}">
                <h5>Top 3 Winner Predictions</h5>
                <div class="predictions-list">
                    ${predictionsHTML}
                </div>
            </div>
        `;
    }

    // Generate compact predictions for modals
    generateCompactPredictionsHTML(event) {
        return this.generatePredictionsHTML(event, true);
    }
}

// Export singleton instance
export const aiPredictions = new AIRaceAnalysis(); 