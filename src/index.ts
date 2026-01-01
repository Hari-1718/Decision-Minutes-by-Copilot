
import { DecisionExtractor } from "./extractor";
import * as fs from 'fs';

async function main() {
    const extractor = new DecisionExtractor();

    const transcriptPath = process.argv[2];
    let transcript = "";

    if (transcriptPath) {
        try {
            transcript = fs.readFileSync(transcriptPath, 'utf-8');
        } catch (err) {
            console.error(`Error reading file ${transcriptPath}:`, err);
            process.exit(1);
        }
    } else {
        console.log("No transcript file provided. Using dummy transcript.");
        transcript = "Okay everyone. Let's decide to use Node.js for the backend. Sarah, please setup the repo by Monday.";
    }

    try {
        console.log("Analyzing...");
        const result = await extractor.extract(transcript);
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Main execution failed:", error);
        process.exit(1);
    }
}

main();
