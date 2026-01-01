
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyCSXuonMzND87APfMEHfz9rMu7lzvmVskA"; // Using the same key as llm.ts

async function listModels() {
    try {
        console.log("Fetching models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response body:", text);
            return;
        }
        const data = await response.json();
        if (data.models) {
            console.log("Available Models:");
            data.models.forEach((m: any) => console.log(` - ${m.name.replace('models/', '')}`));
        } else {
            console.log("No models found:", JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
