import React from 'react';
import type { FunnelStage } from '../../data/schools/types';

type Props = { stages: FunnelStage[]; insight: string };

export const CompetitionFunnel: React.FC<Props> = ({ stages, insight }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      실질 경쟁률 분석
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
        gap: '0.5rem',
        alignItems: 'center',
        background: 'var(--bg-white)',
        padding: '2rem 1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
      }}
    >
      {stages.map((stage, i) => {
        const heightPct = 100 - i * 22;
        return (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                margin: '0 auto',
                width: '90%',
                height: `${heightPct}px`,
                background: i === stages.length - 1 ? 'var(--accent-gold)' : 'var(--primary-forest)',
                opacity: 0.4 + i * 0.15,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              {stage.value}
            </div>
            <div style={{ marginTop: '0.75rem', fontWeight: 700, color: 'var(--primary-deep-forest)' }}>
              {stage.label}
            </div>
            {stage.caption && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {stage.caption}
              </div>
            )}
          </div>
        );
      })}
    </div>
    <div
      style={{
        marginTop: '1.25rem',
        background: '#fdf2f2',
        border: '1px solid #f0c4c4',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        color: '#7a1f1f',
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      {insight}
    </div>
  </div>
);
