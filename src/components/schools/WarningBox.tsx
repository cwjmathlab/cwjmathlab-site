import React from 'react';

type Props = { title: string; body: string; footnote?: string };

export const WarningBox: React.FC<Props> = ({ title, body, footnote }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <div
      style={{
        background: '#7a1f1f',
        color: 'white',
        padding: '1rem 1.5rem',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        fontWeight: 700,
        fontSize: '1.1rem',
      }}
    >
      ⚠ {title}
    </div>
    <div
      style={{
        background: '#fdf2f2',
        border: '1px solid #f0c4c4',
        borderTop: 'none',
        padding: '2rem',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#7a1f1f', margin: 0, lineHeight: 1.6 }}>
        {body}
      </p>
      {footnote && (
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {footnote}
        </p>
      )}
    </div>
  </div>
);
