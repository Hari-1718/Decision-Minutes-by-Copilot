# Decision-Minutes Copilot 🎙️✅

> Turn chaotic meeting transcripts into verifiable decisions and action items in seconds.

Decision-Minutes Copilot is an AI-powered system designed to extract high-confidence **Decisions**, **Action Items**, and **Owners** from meeting transcripts. Unlike generic summarizers, this tool focuses on structured, auditable outputs that can be directly piped into project management tools.

## ✨ Features

- **Strict Schema Enforcement**: Uses Zod to guarantee JSON output matches the expected format. No more broken integrations.
- **Confidence Scoring**: Every extracted item comes with a confidence score (0.0 - 1.0).
- **Abstain Logic**: The AI explicitly flags ambiguous items as `needs_clarification` rather than guessing.
- **Human-in-the-Loop**: A premium UI for reviewing and correcting the AI's predictions.
- **Full Stack Architecture**: Built with Node.js/Express (Backend) and Next.js (Frontend).

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Hari-1718/Decision-Minutes-Copilot.git
    cd Decision-Minutes-Copilot
    ```

2.  Install dependencies (Root + Client):
    ```bash
    npm install
    cd client && npm install && cd ..
    ```

### Running the App

To start both the Backend API and the Frontend UI concurrently:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🛠️ Architecture

### Core Extraction Logic (`src/`)

The heart of the system is the `DecisionExtractor` class. It uses a 3-step process:
1.  **Prompt Engineering**: A carefully crafted system prompt (`src/prompts.ts`) enforces the "Extraction Rules".
2.  **LLM Generation**: The system calls an LLM (currently a Mock Service for demo purposes) to process the transcript.
3.  **Validation**: The raw output is parsed and validated against strict Zod schemas (`src/schemas.ts`). If the LLM hallucinates an invalid field, the system catches it immediately.

### Frontend (`client/`)

A modern Next.js 14 application using the App Router.
- **Glassmorphism Design**: Custom CSS in `globals.css` provides a premium look.
- **Review Dashboard**: Parses the JSON response and visualizes confidence scores with color-coded badges.

## 🤝 Contributing

1.  Fork the repo
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
