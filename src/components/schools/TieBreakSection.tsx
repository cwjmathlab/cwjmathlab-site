import React from 'react';

type Props = { primary: string; primaryNote: string; secondary: string[] };

export const TieBreakSection: React.FC<Props> = ({ primary, primaryNote, secondary }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.25rem' }}>
      동점자 처리 기준
    </h2>
    <div
      style={{
        background: 'var(--primary-deep-forest)',
        color: 'var(--accent-gold)',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        fontWeight: 700,
        fontSize: '1.1rem',
        textAlign: 'center',
      }}
    >
      1순위: {primary}
    </div>
    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
      {primaryNote}
    </p>
    <div style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
      <div style={{ fontWeight: 700, color: 'var(--text-dark)', marginBottom: '1rem', textAlign: 'center' }}>
        2순위: 학생부 과목별 석차등급 상위자
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {secondary.map((subject, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                padding: '0.6rem 1.25rem',
                background: i === 0 ? '#c4584c' : `rgba(196, 88, 76, ${0.85 - i * 0.15})`,
                color: 'white',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              {subject}
            </div>
            {i < secondary.length - 1 && (
              <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>›</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);
