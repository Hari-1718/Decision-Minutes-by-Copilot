import { DecisionExtractor } from "./extractor";
import { MockLLMService } from "./llm";
import { Context } from "./types";
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const llm = new MockLLMService(); // switch to RealLLMService when ready
    const extractor = new DecisionExtractor(llm);

    // Load sample transcript if available, or use a dummy one
    // For this CLI, we will accept a file path as an argument or default to a dummy string
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
        transcript = `
      [00:00:00] Alice: Welcome everyone to the weekly sync.
      [00:01:00] Bob: I think we should update the API documentation by next Monday.
      [00:01:30] Alice: Agreed. Mike, can you handle that?
      [00:01:35] Mike: Sure, I'll do it.
      `;
    }

    const context: Context = {
        project_name: "Decision-Minutes Copilot",
        meeting_type: "standup"
    };

    try {
        const result = await extractor.extract(transcript, context);
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Main execution failed:", error);
        process.exit(1);
    }
}

main();
