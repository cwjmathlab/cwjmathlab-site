import React from 'react';
import type { MinReqTier } from '../../data/schools/types';

type Props = { tiers: MinReqTier[]; note?: string };

export const MinReqPyramid: React.FC<Props> = ({ tiers, note }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      수능 최저학력 기준
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      {tiers.map((tier, i) => {
        const widthPct = 60 + i * 20;
        return (
          <div
            key={i}
            style={{
              width: `${widthPct}%`,
              minHeight: '100px',
              background: tier.highlight ? 'var(--accent-gold)' : 'var(--primary-forest)',
              color: tier.highlight ? 'var(--primary-deep-forest)' : 'var(--bg-cream)',
              padding: '1rem 1.5rem',
              borderRadius: '6px',
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.1rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '1rem' }}>
              {tier.rule}
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
              {tier.scope}
            </div>
          </div>
        );
      })}
    </div>
    {note && (
      <p
        style={{
          marginTop: '1.25rem',
          padding: '1rem 1.25rem',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderLeft: '4px solid var(--accent-gold)',
          borderRadius: '6px',
          color: 'var(--text-dark)',
          fontSize: '0.95rem',
          margin: '1.25rem 0 0',
        }}
      >
        {note}
      </p>
    )}
  </div>
);
