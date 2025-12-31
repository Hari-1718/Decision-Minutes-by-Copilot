export interface MeetingSummary {
    title: string;
    date: string;
    duration_minutes: number;
}

export interface Decision {
    decision_text: string;
    owner: string;
    deadline: string;
    confidence: number;
    source_timestamp: string;
    needs_clarification: boolean;
}

export interface ActionItem {
    task: string;
    owner: string;
    deadline: string;
    blockers: string[];
    confidence: number;
    source_timestamp: string;
    needs_clarification: boolean;
}

export interface Metrics {
    decisions_count: number;
    action_items_count: number;
    avg_confidence: number;
}

export interface ExtractionOutput {
    meeting_summary: MeetingSummary;
    decisions: Decision[];
    action_items: ActionItem[];
    open_questions: string[];
    metrics: Metrics;
}

export interface Speaker {
    name: string;
    role?: string;
    email?: string;
}

export interface Context {
    team_directory?: Speaker[];
    project_name?: string;
    meeting_type?: "standup" | "planning" | "review" | "retro" | "other";
}
