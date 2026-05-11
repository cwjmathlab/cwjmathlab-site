import React from 'react';

type Props = { title: string; subtitle: string };

export const SchoolHero: React.FC<Props> = ({ title, subtitle }) => (
  <div
    className="scroll-reveal"
    style={{
      background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
      color: 'var(--bg-cream)',
      padding: '3.5rem 2rem',
      borderRadius: '16px',
      textAlign: 'center',
      marginBottom: '2.5rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    }}
  >
    <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{title}</h1>
    <div
      style={{
        marginTop: '1.25rem',
        display: 'inline-block',
        padding: '0.5rem 1.25rem',
        border: '1px solid var(--accent-gold)',
        borderRadius: '999px',
        color: 'var(--accent-gold)',
        fontSize: '1rem',
        fontWeight: 500,
      }}
    >
      {subtitle}
    </div>
  </div>
);
