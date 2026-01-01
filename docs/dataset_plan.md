# Dataset & Inputs Plan

## 1. Data Requirements
To test the "Decision-Minutes Copilot" effectively, we need a diverse set of meeting inputs.

### Primary Dataset (Synthetic/Public)
Since we cannot use private internal meetings for public demos, we will use:
1.  **Tech Talks/Panels**: YouTube videos of engineering discussions (high clarity).
2.  **Mock Meetings**: We will record 3-5 distinct 5-minute mock meetings with scripts designed to test extraction.
    -   *Scenario A*: Status update (clear decisions).
    -   *Scenario B*: Brainstorming (ambiguous outcome).
    -   *Scenario C*: Conflict resolution (changed decisions).

## 2. Privacy & Data Handling
**Privacy First Policy**:
-   **Local Processing**: Ideally, run ASR locally if possible (e.g., Whisper).
-   **Zero Retention**: If using cloud APIs (OpenAI), data is sent only for processing and immediately discarded. No training on user data.
-   **User Consent**: Explicit warning before uploading audio to any cloud service.

## 3. Inputs for Acceptance Testing
We will define 5 "Golden Records":
1.  `standup_clear.mp3` -> Expect: 3 routine updates, 0 decisions.
2.  `planning_meeting.mp3` -> Expect: 5 action items, distinct owners.
3.  `review_bad_audio.mp3` -> Expect: Lower confidence scores, "needs clarification" tags.
