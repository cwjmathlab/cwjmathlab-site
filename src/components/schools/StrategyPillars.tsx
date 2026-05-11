import React from 'react';
import type { StrategyPillar } from '../../data/schools/types';

type Props = { pillars: StrategyPillar[] };

export const StrategyPillars: React.FC<Props> = ({ pillars }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
      합격 설계도
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {pillars.map((p, i) => (
        <div
          key={i}
          style={{
            background: 'var(--bg-white)',
            border: '2px solid var(--primary-forest)',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            전략 {i + 1}
          </div>
          <h3 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'center' }}>
            {p.title}
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
            {p.body}
          </p>
          {p.warning && (
            <p
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fdf2f2',
                color: '#7a1f1f',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              ⚠ {p.warning}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);
