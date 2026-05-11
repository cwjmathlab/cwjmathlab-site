import React from 'react';
import { keyChanges } from '../../data/previewData';

export const KeyChangeCards: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}
    >
      {keyChanges.map((c, idx) => (
        <article
          key={c.id}
          style={{
            backgroundColor: 'var(--bg-cream)',
            border: '1px solid var(--bg-beige)',
            borderRadius: '14px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'relative'
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary-forest)',
              letterSpacing: '0.05em'
            }}
          >
            ISSUE 0{idx + 1}
          </span>
          <span
            style={{
              alignSelf: 'flex-start',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.25rem 0.7rem',
              borderRadius: '999px',
              backgroundColor: 'var(--primary-deep-forest)',
              color: 'var(--bg-cream)'
            }}
          >
            {c.stat}
          </span>
          <h3
            style={{
              margin: 0,
              fontSize: '1.25rem',
              color: 'var(--primary-deep-forest)',
              fontWeight: 800,
              lineHeight: 1.35
            }}
          >
            {c.headline}
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            {c.body}
          </p>
        </article>
      ))}
    </div>
  );
};
