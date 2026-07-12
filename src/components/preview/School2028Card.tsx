import React from 'react';
import type { School2028 } from '../../data/preview2028Details';

const labelCellStyle: React.CSSProperties = {
  flex: '0 0 110px',
  padding: '0.75rem 0.9rem',
  background: 'var(--bg-beige)',
  color: 'var(--primary-deep-forest)',
  fontWeight: 700,
  fontSize: '0.9rem',
};

const valueCellStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.75rem 0.9rem',
  fontSize: '0.95rem',
  color: 'var(--text-dark)',
  lineHeight: 1.6,
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', borderTop: '1px solid var(--border-color)' }}>
    <div style={labelCellStyle}>{label}</div>
    <div style={valueCellStyle}>{children}</div>
  </div>
);

export const School2028Card: React.FC<{ data: School2028 }> = ({ data }) => {
  return (
    <div
      style={{
        background: 'var(--bg-white)',
        border: '2px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1.25rem',
      }}
    >
      {/* 헤더: 대학명 + 유형 + 반영비율 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.85rem 1rem',
          background: 'var(--primary-deep-forest)',
        }}
      >
        <strong style={{ color: 'var(--bg-cream)', fontSize: '1.15rem', fontWeight: 800 }}>
          {data.name}
        </strong>
        <span
          style={{
            background: data.type === '약술형' ? 'var(--accent-gold)' : 'var(--bg-beige)',
            color: '#3a2b00',
            fontWeight: 700,
            fontSize: '0.75rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
          }}
        >
          {data.type}
        </span>
        <span style={{ marginLeft: 'auto', color: 'var(--bg-cream)', fontWeight: 600, fontSize: '0.95rem' }}>
          {data.ratio}
        </span>
      </div>

      <Row label="시험일자 (작년 기준)">
        {data.examDate.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </Row>

      <Row label="전형방법">
        {data.method.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </Row>

      {data.quota && (
        <Row label="모집인원">
          {data.quota.map((q, i) => (
            <div key={i}>{q}</div>
          ))}
        </Row>
      )}

      <Row label={data.quota ? '수능최저' : '모집인원 · 수능최저'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {data.minReqs.map((r, i) => (
            <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--primary-forest)' }}>{r.target}</span>
              <span style={{ color: 'var(--text-muted)' }}>—</span>
              <span>{r.req}</span>
            </div>
          ))}
        </div>
      </Row>

      {data.notes && (
        <Row label="비고">
          {data.notes.map((n, i) => (
            <div key={i} style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              ※ {n}
            </div>
          ))}
        </Row>
      )}
    </div>
  );
};
