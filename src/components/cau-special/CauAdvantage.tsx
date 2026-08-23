import React from 'react';
import { cauSpecial } from '../../data/cauSpecial';

export const CauAdvantage: React.FC = () => (
  <div style={{ background: 'var(--bg-white)' }}>
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        창의형이 <span style={{ color: 'var(--accent-gold)' }}>특별한 이유</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
        같은 중앙대 논술이지만, 창의형은 일반형과 전혀 다른 트랙입니다.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto 3rem',
        }}
      >
        {cauSpecial.advantages.map(a => (
          <article
            key={a.tag}
            style={{
              background: 'var(--bg-cream)',
              border: '1px solid var(--border-color)',
              borderTop: '5px solid var(--accent-gold)',
              borderRadius: '14px',
              padding: '1.75rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '0.25rem 0.7rem',
                borderRadius: '999px',
                background: 'var(--primary-deep-forest)',
                color: 'var(--bg-cream)',
                marginBottom: '0.85rem',
              }}
            >
              {a.tag}
            </span>
            <h3 style={{ margin: '0 0 0.7rem', fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-deep-forest)', lineHeight: 1.35 }}>
              {a.headline}
            </h3>
            <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>{a.body}</p>
          </article>
        ))}
      </div>

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          background: 'var(--bg-cream)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.5rem 1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '1.25rem',
        }}
      >
        {[
          { label: '전형방법', value: cauSpecial.method.ratio },
          { label: '수능최저', value: cauSpecial.method.minReq },
          { label: '지원자격', value: cauSpecial.method.eligibility },
        ].map(r => (
          <div key={r.label}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.3rem' }}>
              {r.label}
            </div>
            <div style={{ fontSize: '0.98rem', color: 'var(--text-dark)', lineHeight: 1.6, fontWeight: 600 }}>{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
