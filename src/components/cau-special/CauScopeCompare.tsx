import React from 'react';
import { cauSpecial } from '../../data/cauSpecial';

const ALL_SUBJECTS = ['수학', '수학Ⅰ', '수학Ⅱ', '미적분', '확률과 통계', '기하'];

export const CauScopeCompare: React.FC = () => (
  <div style={{ background: 'var(--bg-cream)' }}>
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        창의형과 일반형은 <span style={{ color: 'var(--accent-gold)' }}>출제범위가 다릅니다</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '760px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
        {cauSpecial.scopeInsight}
      </p>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto 1.25rem',
          overflowX: 'auto',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', minWidth: '640px' }}>
          <thead>
            <tr style={{ background: 'var(--primary-deep-forest)', color: 'var(--bg-cream)' }}>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>전형</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>계열</th>
              {ALL_SUBJECTS.map(s => (
                <th key={s} style={{ padding: '0.8rem 0.5rem', textAlign: 'center', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cauSpecial.scope.map(row => {
              const isChangui = row.track === '창의형';
              return (
                <tr
                  key={`${row.track}-${row.target}`}
                  style={{
                    borderTop: '1px solid var(--border-color)',
                    background: isChangui ? 'var(--bg-cream)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 800, whiteSpace: 'nowrap', color: isChangui ? 'var(--accent-red)' : 'var(--text-muted)' }}>
                    {row.track}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text-dark)' }}>
                    {row.target}
                  </td>
                  {ALL_SUBJECTS.map(s => {
                    const included = row.subjects.includes(s);
                    return (
                      <td
                        key={s}
                        style={{
                          padding: '0.75rem 0.5rem',
                          textAlign: 'center',
                          fontWeight: 800,
                          fontSize: '1.05rem',
                          color: included ? 'var(--primary-forest)' : 'var(--border-color)',
                        }}
                      >
                        {included ? '●' : '—'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0.9rem 1.15rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          lineHeight: 1.6,
        }}
      >
        ※ 2027학년도 논술가이드북 기준. 응시 전 중앙대 입학처의 수시 모집요강으로 최종 확인하세요.
      </p>
    </div>
  </div>
);
