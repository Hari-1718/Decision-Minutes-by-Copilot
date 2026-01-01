
// Core Data Structures

export interface Decision {
    content: string;
    confidence: number;
    // Optional for now
    id?: string;
}

export interface ActionItem {
    content: string;
    owner: string | null;
    deadline: string | null;
    confidence: number;
    // Optional for now
    id?: string;
}

export interface ExtractionResult {
    decisions: Decision[];
    action_items: ActionItem[];
    raw_response?: string;
}
