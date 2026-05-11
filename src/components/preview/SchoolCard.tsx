import React from 'react';
import type { SchoolCardData, SchoolBadge } from '../../data/previewData';

const badgeStyles: Record<SchoolBadge, { bg: string; color: string; label: string }> = {
  NEW:     { bg: 'var(--accent-gold)',          color: '#3a2b00', label: 'NEW' },
  REVIVED: { bg: 'var(--primary-forest)',       color: '#fff',    label: 'REVIVED' },
  CLOSED:  { bg: '#9ca3af',                     color: '#fff',    label: 'CLOSED' }
};

export const SchoolCard: React.FC<{ data: SchoolCardData }> = ({ data }) => {
  const delta = data.quotaDelta;
  const deltaText =
    typeof delta === 'number' && delta !== 0 ? (delta > 0 ? `+${delta}` : `${delta}`) : null;

  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid var(--bg-beige)',
        borderRadius: '12px',
        padding: '1.25rem 1.25rem 1rem',
        backgroundColor: 'var(--bg-white)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        height: '100%'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          gap: '0.35rem',
          alignItems: 'center'
        }}
      >
        {deltaText && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              backgroundColor: delta! > 0 ? '#dcfce7' : '#fee2e2',
              color: delta! > 0 ? '#14532d' : '#7f1d1d'
            }}
          >
            {deltaText}
          </span>
        )}
        {data.badge && (
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '0.2rem 0.55rem',
              borderRadius: '999px',
              backgroundColor: badgeStyles[data.badge].bg,
              color: badgeStyles[data.badge].color
            }}
          >
            {badgeStyles[data.badge].label}
          </span>
        )}
      </div>

      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-deep-forest)', fontWeight: 700, paddingRight: '5rem' }}>
        {data.name}
      </h4>

      <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '0.75rem', rowGap: '0.3rem', fontSize: '0.9rem' }}>
        <dt style={{ color: 'var(--text-muted)' }}>시험범위</dt>
        <dd style={{ margin: 0 }}>{data.scope}</dd>
        <dt style={{ color: 'var(--text-muted)' }}>수능최저</dt>
        <dd style={{ margin: 0 }}>{data.minReq}</dd>
        <dt style={{ color: 'var(--text-muted)' }}>정원</dt>
        <dd style={{ margin: 0 }}>{data.quota}</dd>
      </dl>

      {data.note && (
        <p
          style={{
            margin: 0,
            marginTop: '0.25rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            borderTop: '1px dashed var(--bg-beige)',
            paddingTop: '0.5rem'
          }}
        >
          {data.note}
        </p>
      )}
    </div>
  );
};
