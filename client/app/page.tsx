
"use client";

import { useState } from "react";
import { analyzeTranscript, ExtractionResult } from "./api";

/**
 * Main Application Component
 * Displays the input interface for transcripts and renders the extraction results.
 */
export default function Home() {
  // --- State Management ---
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles the API call to analyze the transcript.
   */
  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeTranscript(transcript);
      setResult(data);
    } catch (err: any) {
      console.error("UI Error:", err);
      setError(err.message || "Failed to analyze. Please check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (score: number) => {
    if (score >= 0.9) return "badge high";
    if (score >= 0.7) return "badge medium";
    return "badge low";
  };

  return (
    <main className="container">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1>Decision-Minutes Copilot 🎙️</h1>
          <p>Turn chaotic meeting transcripts into verifiable decisions and action items.</p>
        </div>

        {/* Input Section */}
        <div className="glass-card animate-fade-in">
          {/* File Upload Placeholder */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Upload Meeting Recording/Transcript (Optional)
            </label>
            <input
              type="file"
              accept=".txt,.mp3,.wav"
              className="input-area"
              style={{ padding: "0.5rem", height: "auto", minHeight: "auto", cursor: "pointer" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.type === "text/plain") {
                  const reader = new FileReader();
                  reader.onload = (e) => setTranscript(e.target?.result as string);
                  reader.readAsText(file);
                } else if (file) {
                  setTranscript(`[File Uploaded: ${file.name}] \n(ASR Processing... Mocking audio-to-text conversion)\n\nOkay team, let's start...`);
                }
              }}
            />
          </div>
          <textarea
            className="input-area"
            placeholder="Or paste your transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleAnalyze}
              disabled={loading || !transcript.trim()}
              className="btn-primary"
            >
              {loading ? "Analyzing..." : "Extract Insights ✨"}
            </button>
          </div>
          {error && (
            <div style={{ marginTop: "1rem", color: "var(--accent-danger)", padding: "0.5rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px" }}>
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div style={{ marginTop: "3rem", display: "grid", gap: "2rem" }} className="animate-fade-in">

            {/* Metrics Dashboard */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center", background: "rgba(59, 130, 246, 0.1)" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>AVG CONFIDENCE</div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>
                  {result.decisions.length + result.action_items.length > 0
                    ? Math.round(([...result.decisions, ...result.action_items].reduce((acc, curr) => acc + curr.confidence, 0) / (result.decisions.length + result.action_items.length)) * 100)
                    : 0}%
                </div>
              </div>
              <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center", background: "rgba(16, 185, 129, 0.1)" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>TIME SAVED (EST)</div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-success)" }}>
                  {Math.round((result.decisions.length + result.action_items.length) * 5)} min
                </div>
              </div>
            </div>

            {/* Decisions */}
            <div>
              <h2>✅ Decisions</h2>
              {result.decisions.length === 0 ? (
                <p style={{ fontStyle: "italic", opacity: 0.6 }}>No decisions detected.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {result.decisions.map((item, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "1rem" }}>
                        <span style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>{item.content}</span>
                        <span className={getBadgeClass(item.confidence)}>
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Items */}
            <div>
              <h2>🚀 Action Items</h2>
              {result.action_items.length === 0 ? (
                <p style={{ fontStyle: "italic", opacity: 0.6 }}>No action items detected.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {result.action_items.map((item, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span className={getBadgeClass(item.confidence)}>
                          {Math.round(item.confidence * 100)}%
                        </span>
                        {item.deadline && (
                          <span style={{ fontSize: "0.85rem", color: "var(--accent-warning)" }}>
                            ⏰ {item.deadline}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "0.5rem" }}>
                        {item.content}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                        <span>👤 Owner:</span>
                        <span style={{ color: "var(--text-main)" }}>
                          {item.owner || "Unassigned"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
