import React from 'react';
import { cauSpecial } from '../../data/cauSpecial';

export const CauFaq: React.FC = () => (
  <div style={{ background: 'var(--bg-cream)' }}>
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        자주 묻는 <span style={{ color: 'var(--accent-gold)' }}>질문</span>
      </h2>
      <div style={{ maxWidth: '760px', margin: '2.5rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cauSpecial.faq.map(f => (
          <div
            key={f.q}
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.4rem 1.6rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.6rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-deep-forest)', lineHeight: 1.4 }}>
              Q. {f.q}
            </h3>
            <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
