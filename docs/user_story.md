# User Story & Requirements

## 1. User Story
**As a** Project Manager or Team Lead,
**I want to** automatically extract decisions, action items, and owners from my meeting recordings,
**So that** I can save time on manual note-taking and ensure nothing slips through the cracks.

### Core Pain Points
- **Lost Decisions**: "Wait, what did we decide on that last week?"
- **Ambiguous Ownership**: "I thought you were doing that?"
- **Manual Drudgery**: Spending 30 mins summarizing a 30 min meeting.

## 2. Definition of Done (MVP)
To consider this project "complete" for the MVP phase, we must achieve:

1.  **Input**: Upload a standard audio/video file (mp3, wav, mp4).
2.  **Process**:
    -   Transcribe audio to text (ASR).
    -   Extract:
        -   **Decision**: What was agreed upon?
        -   **Owner**: Who is responsible?
        -   **Deadline**: When is it due? (if mentioned)
3.  **Output**:
    -   A structured UI showing the extracted items.
    -   Confidence scores for each item.
    -   Ability to edit/correct items.
    -   "One-click" export (JSON or Copy to Clipboard).
4.  **Performance**:
    -   90% extraction accuracy on clear speech.
    -   Process a 20-min meeting in < 2 mins.

## 3. Future Scope (Stretch)
- Calendar integration to auto-find meetings.
- Direct integration with Jira/Asana/Notion.
- Voice identification (Speaker Diarization).
