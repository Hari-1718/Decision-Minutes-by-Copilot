'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          context: {
            project_name: "Demo Project",
            meeting_type: "planning"
          }
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();

      // Store result in localStorage for the review page to pick up
      localStorage.setItem('analysisResult', JSON.stringify(data));
      router.push('/review');
    } catch (error) {
      console.error(error);
      alert('Failed to analyze meeting. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container animate-fade-in" style={{ paddingTop: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ background: 'linear-gradient(to right, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Decision-Minutes Copilot
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Turn chaotic meeting transcripts into verifiable decisions and action items in seconds.
        </p>
      </div>

      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
          Paste Meeting Transcript
        </label>
        <textarea
          className="input-area"
          placeholder="[00:00:00] Alice: We need to decide on the database context..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button
            className="btn-primary"
            onClick={handleAnalyze}
            disabled={loading || !transcript}
          >
            {loading ? 'Analyzing...' : 'Generate Minutes →'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <FeatureCard
          title="Reliable Extraction"
          desc="Strict JSON schemas ensure you get structured data, not hallucinated summaries."
        />
        <FeatureCard
          title="Confidence Scoring"
          desc="Know exactly when the AI is unsure. Low confidence items are flagged for review."
        />
        <FeatureCard
          title="Human-in-the-Loop"
          desc="Review and correct extracted decisions to improve accuracy over time."
        />
      </div>
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{desc}</p>
    </div>
  );
}
