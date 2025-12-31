import { z } from "zod";

export const MeetingSummarySchema = z.object({
    title: z.string(),
    date: z.string(),
    duration_minutes: z.number().min(0),
});

export const DecisionSchema = z.object({
    decision_text: z.string(),
    owner: z.string(),
    deadline: z.string(),
    confidence: z.number().min(0).max(1),
    source_timestamp: z.string(),
    needs_clarification: z.boolean(),
});

export const ActionItemSchema = z.object({
    task: z.string(),
    owner: z.string(),
    deadline: z.string(),
    blockers: z.array(z.string()),
    confidence: z.number().min(0).max(1),
    source_timestamp: z.string(),
    needs_clarification: z.boolean(),
});

export const MetricsSchema = z.object({
    decisions_count: z.number().min(0),
    action_items_count: z.number().min(0),
    avg_confidence: z.number().min(0).max(1),
});

export const ExtractionOutputSchema = z.object({
    meeting_summary: MeetingSummarySchema,
    decisions: z.array(DecisionSchema),
    action_items: z.array(ActionItemSchema),
    open_questions: z.array(z.string()),
    metrics: MetricsSchema,
});
