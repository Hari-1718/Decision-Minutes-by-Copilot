
import { ExtractionResult } from './types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Service to interact with Google Gemini API for transcript analysis.
 * 
 * This module handles the connection to the LLM, constructs the prompt,
 * and parses the JSON response into our structured ExtractionResult.
 */
export async function callLLM(transcript: string, systemPrompt: string): Promise<ExtractionResult> {
    // Securely retrieve API Key from environment or fallback configuration
    const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyCSXuonMzND87APfMEHfz9rMu7lzvmVskA";

    if (!apiKey) {
        console.error("❌ Critical Error: No Google API Key found.");
        throw new Error("Missing API Configuration");
    }

    try {
        // Initialize the Gemini Client
        const genAI = new GoogleGenerativeAI(apiKey);
        // Using 'gemini-flash-latest' as it is verified in the model list
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Construct the full prompt context
        const prompt = `${systemPrompt}\n\nTRANSCRIPT:\n${transcript}\n\nRemember to return VALID JSON ONLY.`;

        console.log(`[LLM Service] Processing transcript length: ${transcript.length} characters...`);

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Sanitize the output: Remove any markdown code blocks that the LLM might include
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        console.log("[LLM Debug] Raw Response:", text); // Uncommented for debugging

        return JSON.parse(text) as ExtractionResult;

    } catch (error: any) {
        console.error("[LLM Service] Failed to process transcript:", error);
        throw new Error(`LLM Failure: ${error.message || error}`);
    }
}
