import React from 'react';

export const InstructorSection: React.FC = () => {
  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 280px) 1fr',
        gap: '3rem',
        alignItems: 'center',
      }} className="instructor-grid">
        <div style={{
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          background: 'var(--bg-cream)',
        }}>
          <img
            src="/profile.png"
            alt="조우제 선생님"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--primary-deep-forest)',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
          }}>
            내가 다닌 학교,<br/>
            <span style={{ color: 'var(--accent-gold)' }}>후배에게 직접 길을 보입니다.</span>
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            color: 'var(--text-dark)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
          }}>
            <li>▸ <strong>조우제</strong> · 성균관대학교 동문</li>
            <li>▸ 수리논술 전문 강사 <strong>10년차</strong></li>
            <li>▸ 의대·인서울 합격생 다수 배출</li>
            <li>▸ 1:1 답안 첨삭 · 매 수업 직접 손으로 코칭</li>
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .instructor-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .instructor-grid > div:first-child {
            max-width: 240px;
            margin: 0 auto;
          }
          .instructor-grid ul {
            text-align: left;
            max-width: 360px;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
};
