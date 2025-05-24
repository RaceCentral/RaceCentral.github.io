const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// OpenAI API configuration
const OPENAI_API_KEY = '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';
const OPENAI_BASE_URL = 'https://api.openai.com/v1/chat/completions';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// AI Race Analysis endpoint
app.post('/api/race-analysis', async (req, res) => {
    try {
        const { event, weatherData, analysisType = 'preview' } = req.body;

        if (!event) {
            return res.status(400).json({ error: 'Event data is required' });
        }

        const prompt = buildAnalysisPrompt(event, weatherData, analysisType);
        
        const response = await fetch(OPENAI_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert motorsports analyst with deep knowledge of Formula 1, IndyCar, and NASCAR. Provide accurate, engaging, and insightful analysis focused on track characteristics, racing dynamics, and educational content rather than specific outcome predictions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from OpenAI API');
        }

        res.json({
            success: true,
            analysis: data.choices[0].message.content.trim(),
            event: event.race,
            series: event.series
        });

    } catch (error) {
        console.error('Error generating race analysis:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate race analysis',
            details: error.message
        });
    }
});

// Batch analysis endpoint
app.post('/api/batch-analysis', async (req, res) => {
    try {
        const { events, limit = 3 } = req.body;

        if (!events || !Array.isArray(events)) {
            return res.status(400).json({ error: 'Events array is required' });
        }

        const limitedEvents = events.slice(0, limit);
        const analyses = [];

        for (const event of limitedEvents) {
            try {
                const prompt = buildAnalysisPrompt(event, null, 'preview');
                
                const response = await fetch(OPENAI_BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are an expert motorsports analyst. Provide engaging race previews focused on track characteristics and what makes each venue unique.'
                            },
                            {
                                role: 'user',
                                content: prompt
                            }
                        ],
                        max_tokens: 400,
                        temperature: 0.7
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    analyses.push({
                        event,
                        analysis: data.choices[0].message.content.trim(),
                        success: true
                    });
                } else {
                    analyses.push({
                        event,
                        error: `API error: ${response.status}`,
                        success: false
                    });
                }

                // Add delay between requests to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                analyses.push({
                    event,
                    error: error.message,
                    success: false
                });
            }
        }

        res.json({
            success: true,
            analyses
        });

    } catch (error) {
        console.error('Error generating batch analysis:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate batch analysis'
        });
    }
});

// Helper function to build analysis prompts
function buildAnalysisPrompt(event, weatherData, analysisType) {
    const weatherInfo = weatherData ? 
        `Weather conditions: ${weatherData.forecast}, Temperature: ${weatherData.temperature}°F, Wind: ${weatherData.wind}` : 
        'Weather data not available';

    let seriesContext = '';
    switch (event.series) {
        case 'F1':
            seriesContext = 'Formula 1 is known for its technical complexity, aerodynamics, and strategic pit stops. Track characteristics and weather significantly impact performance.';
            break;
        case 'IndyCar':
            seriesContext = 'IndyCar features close racing with emphasis on driver skill and car setup. Oval vs road course characteristics vary greatly.';
            break;
        case 'NASCAR':
        case 'NASCAR Cup':
            seriesContext = 'NASCAR emphasizes drafting, strategy, and late-race drama. Track type (superspeedway, short track, road course) greatly affects racing style.';
            break;
    }

    if (analysisType === 'detailed') {
        return `As a motorsports expert, provide an informative race analysis for the upcoming ${event.series} race:

**Event Details:**
- Race: ${event.race}
- Series: ${event.series}
- Venue: ${event.circuit || event.venue}
- Date: ${event.date}
- ${weatherInfo}

**Series Context:**
${seriesContext}

Please provide:
1. **Track Characteristics**: What makes this circuit/venue unique and challenging
2. **Key Factors**: 2-3 main factors that will influence the race (track layout, weather, strategy)
3. **What to Watch**: Important aspects fans should pay attention to during the race

Keep the response under 200 words, engaging, and informative for racing fans. Focus on educational content about the track and racing dynamics.`;
    } else {
        return `As a motorsports analyst, create an engaging preview for this upcoming ${event.series} race:

**Race Details:**
- Event: ${event.race}
- Series: ${event.series}
- Location: ${event.circuit || event.venue}
- Date: ${event.date}

Please provide a compelling 150-word preview that includes:
1. **Track Characteristics**: What makes this venue unique or challenging
2. **What to Watch**: Key storylines, rivalries, or technical aspects to follow
3. **Historical Context**: Brief mention of past memorable moments at this venue (if applicable)

Write in an engaging, accessible tone for both casual and dedicated racing fans. Focus on building excitement for the upcoming event.`;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', service: 'Racing Site AI Analysis API' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('AI Analysis API endpoints:');
    console.log('- POST /api/race-analysis');
    console.log('- POST /api/batch-analysis');
    console.log('- GET /api/health');
}); 