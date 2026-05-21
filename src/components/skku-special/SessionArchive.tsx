import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

function formatKDate(iso: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = iso.split('-').map(Number);
  const day = DAYS[new Date(y, m - 1, d).getDay()];
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}(${day})`;
}

export const SessionArchive: React.FC = () => {
  const { sessionArchive } = skkuSpecial;

  // 사진이 한 장이라도 있는 회차만 노출. 모두 비어 있으면 섹션 전체 미렌더.
  const entriesWithImages = sessionArchive.filter(e => e.images.length > 0);
  if (entriesWithImages.length === 0) return null;

  return (
    <div style={{ background: 'var(--bg-cream)', padding: '5rem 1.5rem' }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          특강 <span style={{ color: 'var(--accent-gold)' }}>진행 기록</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
        }}>
          지난 회차 수업 현장입니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {entriesWithImages.map(entry => (
            <div key={entry.session}>
              <h3 style={{
                fontSize: '1.2rem',
                color: 'var(--primary-deep-forest)',
                fontWeight: 700,
                marginBottom: '1rem',
              }}>
                {entry.session}회차 — <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{formatKDate(entry.date)}</span>
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
              }}>
                {entry.images.map((src, i) => (
                  <div className="hover-card" key={i} style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    background: 'var(--bg-white)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
                  }}>
                    <img
                      src={src}
                      alt={`${entry.session}회차 ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
