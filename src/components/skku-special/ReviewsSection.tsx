import React from 'react';
import { reviewData } from '../../data/aboutData';

const FEATURED_COUNT = 3;

export const ReviewsSection: React.FC = () => {
  const featured = reviewData.slice(0, FEATURED_COUNT);

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        이런 학생들이 <span style={{ color: 'var(--accent-gold)' }}>합격합니다</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 3rem',
        lineHeight: 1.6,
      }}>
        지난 합격생들의 학습 후기입니다. 학교가 달라도 <strong>답안을 논리적으로 쓰는 방법</strong>은 같습니다.<br/>
        성균관대 수리논술도 동일한 원리로 준비합니다.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {featured.map((review, idx) => (
          <div className="hover-card" key={idx} style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3 style={{
              color: 'var(--primary-deep-forest)',
              fontSize: '1.15rem',
              fontWeight: 700,
              marginBottom: '1rem',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}>
              "{review.title}"
            </h3>
            <p style={{
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              marginBottom: '1.5rem',
              flex: 1,
            }}>
              {review.content}
            </p>
            <div style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1rem',
            }}>
              <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                {review.name}
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary-light)' }}>
                {review.school} → {review.university}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
