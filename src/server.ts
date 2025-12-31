import express from 'express';
import cors from 'cors';
import { DecisionExtractor } from './extractor';
import { MockLLMService } from './llm';
import { Context } from './types';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize services (Dependency Injection)
// In a real production app, we might use a container like InversifyJS
// For now, we manually inject the MockLLMService. 
// TODO: Replace MockLLMService with OpenAI/Gemini adapter in production.
const llmService = new MockLLMService();
const extractor = new DecisionExtractor(llmService);

app.post('/api/analyze', async (req, res) => {
    try {
        const { transcript, context } = req.body;

        if (!transcript) {
            return res.status(400).json({ error: 'Transcript is required' });
        }

        // Default context if not provided
        const safeContext: Context = context || {
            project_name: "Unknown Project",
            meeting_type: "other"
        };

        console.log(`Analyzing transcript... (Length: ${transcript.length})`);
        const result = await extractor.extract(transcript, safeContext);

        res.json(result);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to analyze transcript' });
    }
});

app.listen(port, () => {
    console.log(`Decision-Minutes Copilot API running at http://localhost:${port}`);
});
