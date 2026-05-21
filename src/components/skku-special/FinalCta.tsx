import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const FinalCta: React.FC = () => {
  const { course, contact } = skkuSpecial;
  const startDate = course.sessions[0];
  const [, month, day] = startDate.split('-');
  const startLabel = `${parseInt(month)}/${parseInt(day)}(일)`;

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
      color: 'white',
      padding: '5rem 1.5rem',
    }}>
      <div className="container scroll-reveal" style={{ textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--bg-cream)',
          marginBottom: '1.5rem',
          lineHeight: 1.4,
        }}>
          지금 신청하세요
        </h2>

        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}>
          {startLabel} 개강 · 매주 일요일 4회 · {course.timeRange}
        </p>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--accent-gold)',
          marginBottom: '2.5rem',
          fontWeight: 700,
        }}>
          {course.fee.toLocaleString()}원 (+ 교재비 {course.materialFee.toLocaleString()}원)
        </p>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <a
            href={`tel:${contact.phone}`}
            style={{
              flex: '1 1 200px',
              padding: '1.1rem 1.5rem',
              background: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            📞 전화로 신청·문의
          </a>
          <a
            href={contact.kakaoOpenChat}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 200px',
              padding: '1.1rem 1.5rem',
              background: '#FEE500',
              color: '#191919',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            💬 카톡으로 문의
          </a>
        </div>

        <p style={{
          marginTop: '2rem',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.7)',
          fontStyle: 'italic',
        }}>
          ※ 정원 제한으로 조기 마감될 수 있습니다.
        </p>
      </div>
    </div>
  );
};
