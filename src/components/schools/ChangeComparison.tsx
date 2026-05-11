import React from 'react';
import type { ChangeBlock } from '../../data/schools/types';

type Props = { oldBlock: ChangeBlock; newBlock: ChangeBlock; note: string };

const Block: React.FC<{ block: ChangeBlock; isNew: boolean }> = ({ block, isNew }) => (
  <div
    style={{
      flex: 1,
      background: isNew ? 'var(--bg-beige)' : 'var(--bg-white)',
      border: `2px solid ${isNew ? 'var(--accent-gold)' : 'var(--border-color)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        background: 'var(--primary-deep-forest)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        marginBottom: '1.25rem',
        fontWeight: 700,
      }}
    >
      {block.label}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
      {block.items.map((item, i) => (
        <span
          key={i}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--primary-deep-forest)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
          }}
        >
          {item}
        </span>
      ))}
    </div>
    <p
      style={{
        textAlign: 'center',
        margin: 0,
        color: isNew ? '#7a1f1f' : 'var(--text-muted)',
        fontWeight: 600,
      }}
    >
      {block.summary}
    </p>
  </div>
);

export const ChangeComparison: React.FC<Props> = ({ oldBlock, newBlock, note }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      2026 vs 2027 변화
    </h2>
    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
      <Block block={oldBlock} isNew={false} />
      <Block block={newBlock} isNew={true} />
    </div>
    <div
      style={{
        marginTop: '1.25rem',
        background: 'var(--primary-deep-forest)',
        color: 'var(--bg-cream)',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        textAlign: 'center',
        fontWeight: 600,
      }}
    >
      {note}
    </div>
  </div>
);
