import React from 'react';
import type { TimelineSection as TimelineProps } from '../../data/schools/types';

export const TimelineSection: React.FC<Omit<TimelineProps, 'type'>> = ({ title, subtitle, steps }) => (
  <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-deep-forest)', margin: '0 0 0.4rem', lineHeight: 1.35 }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{subtitle}</p>
    )}
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', columnGap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: s.accent ? 'var(--accent-red)' : 'var(--primary-deep-forest)',
                  border: '3px solid var(--bg-white)',
                  boxShadow: '0 0 0 2px var(--border-color)',
                  flex: 'none',
                  marginTop: '0.35rem',
                }}
              />
              {!last && <span style={{ flex: 1, width: 2, background: 'var(--border-color)', marginTop: 4 }} />}
            </div>
            <div
              style={{
                background: s.accent ? 'var(--bg-cream)' : 'var(--bg-white)',
                border: `1px solid ${s.accent ? 'var(--accent-red)' : 'var(--border-color)'}`,
                borderRadius: '12px',
                padding: '1rem 1.2rem',
                marginBottom: last ? 0 : '0.9rem',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: s.accent ? 'var(--accent-red)' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                {s.period}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-deep-forest)', marginBottom: '0.4rem' }}>{s.name}</div>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{s.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);
