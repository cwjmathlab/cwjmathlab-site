import React from 'react';
import type { CaseBlock } from '../../data/schools/types';

type Props = {
  title: string;
  subtitle: string;
  statsLabels: string[];
  statsValues: number[];
  oldCase: CaseBlock;
  newCase: CaseBlock;
};

const CasePanel: React.FC<{ heading: string; block: CaseBlock; isFail: boolean }> = ({ heading, block, isFail }) => (
  <div
    style={{
      flex: 1,
      background: isFail ? '#fdf2f2' : 'var(--bg-white)',
      border: `2px solid ${isFail ? '#c4584c' : 'var(--primary-forest)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        fontWeight: 700,
        color: isFail ? '#7a1f1f' : 'var(--primary-deep-forest)',
        marginBottom: '1rem',
        fontSize: '1.05rem',
      }}
    >
      {heading}
    </div>
    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
      {block.heading}
    </p>
    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
      {block.body}
    </p>
    <div
      style={{
        marginTop: '1rem',
        textAlign: 'center',
        padding: '0.75rem',
        background: isFail ? '#c4584c' : 'var(--primary-forest)',
        color: 'white',
        borderRadius: '6px',
        fontWeight: 700,
      }}
    >
      {block.result}
    </div>
  </div>
);

export const CaseStudy: React.FC<Props> = ({ title, subtitle, statsLabels, statsValues, oldCase, newCase }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
      {title}
    </h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{subtitle}</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      {statsLabels.map((label, i) => (
        <div
          key={i}
          style={{
            width: '70px',
            background: 'var(--bg-white)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '8px',
            padding: '0.75rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-deep-forest)' }}>
            {statsValues[i]}
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <CasePanel heading="2026 기준" block={oldCase} isFail={oldCase.result === '불합격'} />
      <CasePanel heading="2027 시뮬레이션" block={newCase} isFail={newCase.result === '불합격'} />
    </div>
  </div>
);
