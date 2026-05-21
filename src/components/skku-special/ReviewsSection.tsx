import React from 'react';
import { reviewData } from '../../data/aboutData';

const FEATURED_COUNT = 3;

export const ReviewsSection: React.FC = () => {
  const featured = reviewData.slice(0, FEATURED_COUNT);

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        조우제 선생님 <span style={{ color: 'var(--accent-gold)' }}>수강평</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 3rem',
        lineHeight: 1.6,
      }}>
        지난 수강생들이 직접 남긴 수업 후기입니다.
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
              color: 'var(--text-dark)',
              fontWeight: 600,
              fontSize: '1rem',
            }}>
              — {review.name} 학생
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
