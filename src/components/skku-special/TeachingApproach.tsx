import React from 'react';

const PILLARS = [
  {
    title: '1:1 답안 첨삭',
    body: '4회 모든 회차에서 학생 답안을 직접 손으로 첨삭합니다. 논리의 비약·풀이 누락·기호 오용 등을 한 명 한 명 짚어 교정합니다.',
  },
  {
    title: '성균관대 기출 직접 풀이',
    body: '최근 5년 성균관대 수리논술 기출을 회차별로 분배해, 출제 패턴을 직접 체득하게 합니다.',
  },
  {
    title: '4회 압축 커리큘럼',
    body: '단답 → 서술 → 모의시험 → 총정리. 4회 안에 답안 작성 기본기부터 실전 감각까지 완성합니다.',
  },
];

export const TeachingApproach: React.FC = () => {
  return (
    <div style={{ background: 'var(--bg-cream)', padding: '5rem 1.5rem' }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          왜 이 <span style={{ color: 'var(--accent-gold)' }}>특강</span>인가
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '3rem auto 0',
        }}>
          {PILLARS.map((p, i) => (
            <div className="hover-card" key={i} style={{
              background: 'var(--bg-white)',
              padding: '2.25rem 1.75rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--primary-deep-forest)',
                color: 'var(--accent-gold)',
                fontWeight: 800,
                fontSize: '1.2rem',
                marginBottom: '1rem',
              }}>
                {i + 1}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                color: 'var(--primary-deep-forest)',
                fontWeight: 700,
                marginBottom: '0.75rem',
              }}>
                {p.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
