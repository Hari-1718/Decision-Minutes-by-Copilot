
import express from 'express';
import cors from 'cors';
import { DecisionExtractor } from './extractor';

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Service Dependencies
const extractor = new DecisionExtractor();

// Middleware Configuration
app.use(cors()); // Allow cross-origin requests from Frontend
app.use(express.json()); // Parse JSON request bodies

/**
 * API Endpoint: POST /api/analyze
 * Accepts a meeting transcript and processes it to find decisions and action items.
 */
app.post('/api/analyze', async (req, res) => {
    try {
        const { transcript, context } = req.body;

        // Input Validation
        if (!transcript || typeof transcript !== 'string') {
            return res.status(400).json({ error: 'Invalid transcript input' });
        }

        console.log(`[API] Received request. Processing ${transcript.length} chars...`);

        // Business Logic Execution
        const result = await extractor.extract(transcript);

        // Success Response
        res.json(result);

    } catch (error: any) {
        console.error('[API] Analysis failed:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// Server Initialization
app.listen(PORT, () => {
    console.log(`✅ Decision-Minutes Copilot API running at http://localhost:${PORT}`);
});
