import React from 'react';
import { cauSpecial } from '../../data/cauSpecial';

function daysUntil(isoDate: string, today: Date = new Date()): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round((target - todayStart) / (1000 * 60 * 60 * 24));
}

type Props = { onApply: () => void };

export const CauSpecialHero: React.FC<Props> = ({ onApply }) => {
  const { exam, course } = cauSpecial;
  const d = daysUntil(exam.date);

  return (
    <div
      style={{
        background: 'linear-gradient(to right bottom, var(--primary-deep-forest), var(--primary-forest))',
        color: 'var(--bg-cream)',
        padding: '5rem 1.5rem',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            background: 'var(--accent-gold)',
            color: '#3a2b00',
            fontWeight: 800,
            fontSize: '0.9rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            marginBottom: '1.5rem',
          }}
        >
          2027학년도 · 9/6 개강 · 총 {course.sessions.length}회
        </span>

        <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.3, margin: '0 0 1.25rem' }}>
          수능 전에 끝내는 합격,
          <br />
          중앙대 창의형 FINAL
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            opacity: 0.92,
          }}
        >
          수능최저 없이, 현역끼리만 겨루는 전형입니다. 10월 11일 시험까지 남은 5주를 실전 답안으로 채웁니다.
        </p>

        {d > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.35rem' }}>창의형 논술시험까지</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-gold)', lineHeight: 1 }}>D-{d}</div>
          </div>
        )}

        <button
          onClick={onApply}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.15rem',
            fontWeight: 700,
            background: 'var(--accent-gold)',
            color: '#3a2b00',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          특강 안내 보기
        </button>
      </div>
    </div>
  );
};
