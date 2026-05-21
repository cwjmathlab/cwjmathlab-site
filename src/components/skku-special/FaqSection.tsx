import React, { useState } from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        자주 묻는 <span style={{ color: 'var(--accent-gold)' }}>질문</span>
      </h2>

      <div style={{
        maxWidth: '760px',
        margin: '3rem auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {skkuSpecial.faq.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={i} style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--primary-deep-forest)',
                }}
              >
                <span>Q. {item.q}</span>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-gold)' }}>
                  {open ? '−' : '+'}
                </span>
              </button>
              {open && (
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '0.25rem',
                }}>
                  <strong style={{ color: 'var(--text-dark)' }}>A. </strong>{item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
