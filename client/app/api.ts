
// Basic types matching the backend
export interface Decision {
    content: string;
    confidence: number;
}

export interface ActionItem {
    content: string;
    owner: string | null;
    deadline: string | null;
    confidence: number;
}

export interface ExtractionResult {
    decisions: Decision[];
    action_items: ActionItem[];
    raw_response?: string;
}

export async function analyzeTranscript(transcript: string): Promise<ExtractionResult> {
    const response = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    return response.json();
}
