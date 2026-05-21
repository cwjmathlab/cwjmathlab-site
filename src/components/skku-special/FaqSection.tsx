import React, { useState } from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

type Props = {
  onNavigate: (path: string) => void;
};

export const FaqSection: React.FC<Props> = ({ onNavigate }) => {
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
                  padding: '1rem 1.5rem 1.5rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                  borderTop: '1px dashed var(--border-color)',
                }}>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: 'var(--text-dark)' }}>A. </strong>{item.a}
                  </p>
                  {item.action && (
                    <button
                      onClick={() => onNavigate(item.action!.path)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.6rem 1.25rem',
                        background: 'var(--primary-deep-forest)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      }}
                    >
                      {item.action.label} →
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
