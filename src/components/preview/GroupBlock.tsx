import React from 'react';
import type { GroupBlock as GroupBlockData } from '../../data/previewData';
import { SchoolCard } from './SchoolCard';

export const GroupBlock: React.FC<{ block: GroupBlockData }> = ({ block }) => {
  const isDense = block.id === 'top_science';
  const minColWidth = isDense ? '320px' : '360px';

  return (
    <section style={{ marginBottom: '3rem' }}>
      <header style={{ marginBottom: '1.25rem' }}>
        <h2
          style={{
            margin: 0,
            fontSize: '1.5rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800
          }}
        >
          {block.label}
        </h2>
        <p
          style={{
            margin: '0.4rem 0 0',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.55
          }}
        >
          {block.summary}
        </p>
      </header>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${minColWidth}, 100%), 1fr))`,
          gap: '1rem'
        }}
      >
        {block.schools.map((s, idx) => (
          <SchoolCard key={`${block.id}-${idx}`} data={s} />
        ))}
      </div>
    </section>
  );
};
