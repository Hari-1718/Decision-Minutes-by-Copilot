export interface LLMService {
    generate(systemPrompt: string, userPrompt: string): Promise<string>;
}

export class MockLLMService implements LLMService {
    async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        // Return a pre-canned response for testing purposes
        // In a real scenario, this would call OpenAI/Gemini/etc.
        console.log("MockLLMService: Generating response...");

        return JSON.stringify({
            meeting_summary: {
                title: "Weekly Sync",
                date: "2023-10-27",
                duration_minutes: 45
            },
            decisions: [
                {
                    decision_text: "Use PostgreSQL for the new microservice",
                    owner: "Sarah",
                    deadline: "2023-11-01",
                    confidence: 0.95,
                    source_timestamp: "00:15:30",
                    needs_clarification: false
                }
            ],
            action_items: [
                {
                    task: "Update API documentation",
                    owner: "Mike",
                    deadline: "2023-10-30",
                    blockers: [],
                    confidence: 0.8,
                    source_timestamp: "00:20:10",
                    needs_clarification: false
                },
                {
                    task: "Investigate latency spike",
                    owner: "unknown",
                    deadline: "ASAP",
                    blockers: [],
                    confidence: 0.3,
                    source_timestamp: "00:25:00",
                    needs_clarification: true
                }
            ],
            open_questions: [
                "Who is responsible for investigating the latency spike?"
            ],
            metrics: {
                decisions_count: 1,
                action_items_count: 2,
                avg_confidence: 0.68
            }
        });
    }
}
