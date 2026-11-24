import React from 'react';

/** 사이트 전 페이지 상단 — 인하대 파이널 집중 홍보 띠 */
export function daysToInha(now = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((new Date(2026, 11, 6).getTime() - today) / 86400000);
}

export const InhaFinalBar: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const d = daysToInha();
  if (d < 0) return null;
  return (
    <button type="button" onClick={onClick} style={{
      width: '100%', border: 'none', cursor: 'pointer', background: 'var(--accent-red)', color: '#fff',
      padding: '0.7rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
      gap: '0.3rem 0.8rem', fontSize: '0.95rem', fontWeight: 700, textAlign: 'center', wordBreak: 'keep-all',
    }}>
      <span style={{ background: '#fff', color: 'var(--accent-red)', borderRadius: '999px', padding: '0.1rem 0.6rem', fontWeight: 900 }}>
        인하대 논술 {d === 0 ? 'D-DAY' : `D-${d}`}
      </span>
      <span>인하대 파이널 · 라스트 11.30(월) 개강 · 학과별 합격 예상점수·등수 제공</span>
      <span style={{ textDecoration: 'underline' }}>자세히 보기 →</span>
    </button>
  );
};
