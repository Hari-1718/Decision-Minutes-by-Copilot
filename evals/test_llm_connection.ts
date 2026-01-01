
import { callLLM } from '../src/llm';

async function testConnection() {
    try {
        console.log("Testing LLM connection...");
        const result = await callLLM("This is a test transcript.", "Extract nothing.");
        console.log("LLM Connection Successful!", result);
    } catch (error) {
        console.error("LLM Connection Failed:", error);
    }
}

testConnection();
