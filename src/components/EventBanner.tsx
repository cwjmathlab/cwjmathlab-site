import React from 'react';
import { getNextEvent, formatEventDate } from '../data/events';

type Props = {
  onClick: () => void;
};

export const EventBanner: React.FC<Props> = ({ onClick }) => {
  const next = getNextEvent();
  if (!next) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="event-banner"
      style={{
        width: '100%',
        background: 'var(--primary-deep-forest)',
        color: 'var(--bg-cream)',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: `2px solid var(--accent-gold)`,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        fontWeight: 500,
        textAlign: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
        📢 다음 설명회
      </span>
      <span>
        {formatEventDate(next.date)} {next.time} · {next.location}
      </span>
      <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
        자세히 보기 →
      </span>
    </button>
  );
};
