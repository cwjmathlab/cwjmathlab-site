import React from 'react';
import type { TamguRule } from '../../data/schools/types';

type Props = { baseCondition: string; rules: TamguRule[]; hidden?: TamguRule };

const RuleBox: React.FC<{ rule: TamguRule; tone: 'forest' | 'gold' | 'red' }> = ({ rule, tone }) => {
  const tones = {
    forest: { bg: 'var(--primary-forest)', color: 'white' },
    gold: { bg: 'var(--accent-gold)', color: 'var(--primary-deep-forest)' },
    red: { bg: '#fdf2f2', color: '#7a1f1f' },
  };
  const t = tones[tone];
  return (
    <div
      style={{
        background: t.bg,
        color: t.color,
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        flex: 1,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{rule.title}</div>
      <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{rule.body}</div>
    </div>
  );
};

export const TamguCalculation: React.FC<Props> = ({ baseCondition, rules, hidden }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      탐구 영역 계산법
    </h2>
    <div
      style={{
        background: 'var(--bg-beige)',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontWeight: 600,
        color: 'var(--primary-deep-forest)',
      }}
    >
      기본 조건: {baseCondition}
    </div>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: hidden ? '1rem' : 0 }}>
      {rules.map((rule, i) => (
        <RuleBox key={i} rule={rule} tone={i === 0 ? 'forest' : 'gold'} />
      ))}
    </div>
    {hidden && <RuleBox rule={hidden} tone="red" />}
  </div>
);
