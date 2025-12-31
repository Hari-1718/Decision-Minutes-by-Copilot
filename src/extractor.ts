import { ExtractionOutput, Context } from "./types";
import { ExtractionOutputSchema } from "./schemas";
import { LLMService } from "./llm";
import { SYSTEM_PROMPT } from "./prompts";

export class DecisionExtractor {
    private llm: LLMService;

    constructor(llm: LLMService) {
        this.llm = llm;
    }

    /**
     * Main entry point for extracting decisions from a transcript.
     * 
     * This method orchestrates the entire pipeline:
     * 1. Constructs the context-aware prompt.
     * 2. Calls the LLM service.
     * 3. Validates the output against the Zod schema to ensure type safety.
     * 
     * @param transcript - The raw text of the meeting.
     * @param context - Optional metadata (project name, meeting type) to guide the LLM.
     */
    async extract(transcript: string, context: Context = {}): Promise<ExtractionOutput> {
        const contextString = JSON.stringify(context, null, 2);
        // Combine context and transcript into a structured user prompt
        const userPrompt = `
CONTEXT:
${contextString}

TRANSCRIPT:
${transcript}
`;

        try {
            console.log("Sending request to LLM...");
            const rawResponse = await this.llm.generate(SYSTEM_PROMPT, userPrompt);
            console.log("Received response from LLM.");

            // Attempt to parse JSON
            let parsedJson;
            try {
                parsedJson = JSON.parse(rawResponse);
            } catch (e) {
                console.error("Failed to parse JSON from LLM response:", rawResponse);
                throw new Error("LLM response was not valid JSON");
            }

            // Validate against Zod schema
            const validationResult = ExtractionOutputSchema.safeParse(parsedJson);

            if (!validationResult.success) {
                console.error("Schema validation failed:", validationResult.error);
                throw new Error("LLM response did not match the expected schema");
            }

            return validationResult.data;

        } catch (error) {
            console.error("Extraction failed:", error);
            // specific error handling logic could go here
            // for now rethrow
            throw error;
        }
    }
}
