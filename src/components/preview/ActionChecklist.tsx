import React from 'react';
import { actionChecklist } from '../../data/previewData';

export const ActionChecklist: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--bg-beige)',
        borderRadius: '14px',
        padding: '2rem',
        marginTop: '1rem'
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--primary-deep-forest)', fontWeight: 800 }}>
        고1·고2가 지금 해야 할 일
      </h2>
      <p style={{ marginTop: '0.4rem', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        체크리스트 다섯 개로 정리한 행동 가이드입니다.
      </p>
      <ol
        style={{
          margin: 0,
          paddingLeft: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem'
        }}
      >
        {actionChecklist.map((item, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              fontSize: '1rem',
              lineHeight: 1.55
            }}
          >
            <span
              aria-hidden
              style={{
                flex: '0 0 1.6rem',
                height: '1.6rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-deep-forest)',
                color: 'var(--bg-cream)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginTop: '0.05rem'
              }}
            >
              {idx + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};
