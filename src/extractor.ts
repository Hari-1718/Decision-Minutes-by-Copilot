
import { callLLM } from './llm';
import { SYSTEM_PROMPT } from './prompts';
import { ExtractionResult } from './types';

export class DecisionExtractor {

    /**
     * Extracts decisions and action items from a given transcript string.
     */
    async extract(transcript: string): Promise<ExtractionResult> {
        if (!transcript || transcript.trim().length === 0) {
            return { decisions: [], action_items: [] };
        }

        console.log(`Processing transcript length: ${transcript.length} chars...`);

        // 1. Prompt LLM
        const result = await callLLM(transcript, SYSTEM_PROMPT);

        // 2. Here we would validation (Zod) -> omitted for MVP speed

        return result;
    }
}
