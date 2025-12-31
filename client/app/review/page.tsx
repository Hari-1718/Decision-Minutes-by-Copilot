'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExtractionOutput, Decision, ActionItem } from '../types';

export default function ReviewPage() {
    const [data, setData] = useState<ExtractionOutput | null>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('analysisResult');
        if (stored) {
            setData(JSON.parse(stored));
        } else {
            router.push('/');
        }
    }, [router]);

    if (!data) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <main className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '0.5rem' }}>← Back</button>
                    <h1>Meeting Review</h1>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                        <span>{data.meeting_summary.title}</span>
                        <span>•</span>
                        <span>{data.meeting_summary.date}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div className="glass-card" style={{ padding: '1rem', display: 'inline-block' }}>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Avg Confidence</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: getConfidenceColor(data.metrics.avg_confidence) }}>
                            {(data.metrics.avg_confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <section>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Decisions
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{data.metrics.decisions_count}</span>
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.decisions.map((decision, i) => (
                            <DecisionCard key={i} decision={decision} />
                        ))}
                        {data.decisions.length === 0 && <p>No decisions extracted.</p>}
                    </div>
                </section>

                <section>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Action Items
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{data.metrics.action_items_count}</span>
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.action_items.map((item, i) => (
                            <ActionItemCard key={i} item={item} />
                        ))}
                        {data.action_items.length === 0 && <p>No action items extracted.</p>}
                    </div>
                </section>
            </div>

            {data.open_questions.length > 0 && (
                <section style={{ marginTop: '3rem' }}>
                    <h2>Clarification Needed</h2>
                    <div className="glass-card" style={{ borderColor: 'var(--accent-warning)' }}>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {data.open_questions.map((q, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>{q}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </main>
    );
}

function DecisionCard({ decision }: { decision: Decision }) {
    return (
        <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>DECISION</span>
                <ConfidenceBadge score={decision.confidence} />
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                "{decision.decision_text}"
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <div>Owner: <span style={{ color: 'var(--text-main)' }}>{decision.owner}</span></div>
                <div>Deadline: <span style={{ color: 'var(--text-main)' }}>{decision.deadline}</span></div>
            </div>
        </div>
    );
}

function ActionItemCard({ item }: { item: ActionItem }) {
    return (
        <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--accent-success)' }}>ACTION</span>
                <ConfidenceBadge score={item.confidence} />
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                {item.task}
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <div>Owner: <span style={{ color: 'var(--text-main)' }}>{item.owner}</span></div>
                <div>By: <span style={{ color: 'var(--text-main)' }}>{item.deadline}</span></div>
            </div>
            {item.needs_clarification && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-warning)' }}>
                    ⚠ Needs clarification
                </div>
            )}
        </div>
    );
}

function ConfidenceBadge({ score }: { score: number }) {
    let label = 'Low';
    let className = 'low';
    if (score >= 0.9) { label = 'High'; className = 'high'; }
    else if (score >= 0.7) { label = 'Medium'; className = 'medium'; }

    return (
        <span className={`badge ${className}`}>
            {label} {(score * 100).toFixed(0)}%
        </span>
    );
}

function getConfidenceColor(score: number) {
    if (score >= 0.9) return 'var(--accent-success)';
    if (score >= 0.7) return 'var(--accent-warning)';
    return 'var(--accent-danger)';
}
