import React from 'react';
import type { KeyPointsSection as KeyPointsProps } from '../../data/schools/types';

export const KeyPointsSection: React.FC<Omit<KeyPointsProps, 'type'>> = ({ title, subtitle, points }) => (
  <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-deep-forest)', margin: '0 0 0.4rem', lineHeight: 1.35 }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ margin: '0 0 1.1rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{subtitle}</p>
    )}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${points.length >= 4 ? 260 : 300}px, 100%), 1fr))`,
        gap: '1rem',
      }}
    >
      {points.map((p, i) => (
        <article
          key={i}
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-color)',
            borderLeft: '5px solid var(--accent-gold)',
            borderRadius: '12px',
            padding: '1.2rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--primary-deep-forest)', lineHeight: 1.4 }}>{p.label}</div>
          <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{p.body}</p>
          {p.accent && (
            <span
              style={{
                alignSelf: 'flex-start',
                marginTop: 'auto',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--accent-red)',
                background: 'rgba(181,18,27,0.07)',
                padding: '0.3rem 0.7rem',
                borderRadius: '999px',
              }}
            >
              {p.accent}
            </span>
          )}
        </article>
      ))}
    </div>
  </section>
);
