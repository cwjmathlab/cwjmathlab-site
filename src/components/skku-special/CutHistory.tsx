import React, { useState } from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

const CUT_MAX = 100;

export const CutHistory: React.FC = () => {
  const { cutHistory } = skkuSpecial;
  const [yearIdx, setYearIdx] = useState(0);
  const current = cutHistory[yearIdx];

  return (
    <div style={{ background: 'var(--bg-cream)' }}>
      <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          역대 <span style={{ color: 'var(--accent-gold)' }}>합격컷</span> 공개
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          maxWidth: '720px',
          margin: '0 auto 2.5rem',
        }}>
          100점 만점 기준, 교시별 모집단위 경쟁률과 합격 커트라인
        </p>

        {/* 연도 탭 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}>
          {cutHistory.map((y, i) => {
            const active = i === yearIdx;
            return (
              <button
                key={y.year}
                onClick={() => setYearIdx(i)}
                style={{
                  padding: '0.6rem 1.6rem',
                  borderRadius: '999px',
                  border: active ? '1px solid var(--primary-deep-forest)' : '1px solid var(--border-color)',
                  background: active ? 'var(--primary-deep-forest)' : 'var(--bg-white)',
                  color: active ? 'var(--bg-cream)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {y.year}학년도
              </button>
            );
          })}
        </div>

        {/* 교시별 카드 */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          {current.sessions.map(sess => (
            <div key={sess.session} style={{
              background: 'var(--bg-white)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.85rem 1.25rem',
                background: 'var(--primary-deep-forest)',
                color: 'var(--bg-cream)',
                fontWeight: 700,
                fontSize: '1.05rem',
              }}>
                자연 {sess.session}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', textAlign: 'left', fontSize: '0.85rem' }}>
                      <th style={{ padding: '0.75rem 1.25rem', fontWeight: 600 }}>모집단위</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, whiteSpace: 'nowrap' }}>경쟁률</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, minWidth: '180px' }}>합격컷 (100점 만점)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sess.units.map(u => {
                      const isTop = u.cut >= 85;
                      return (
                        <tr key={u.name} style={{ borderTop: '1px solid var(--border-color)' }}>
                          <td style={{
                            padding: '0.7rem 1.25rem',
                            fontWeight: isTop ? 700 : 500,
                            color: 'var(--text-dark)',
                            whiteSpace: 'nowrap',
                          }}>
                            {u.name}
                          </td>
                          <td style={{
                            padding: '0.7rem 1rem',
                            textAlign: 'right',
                            color: u.ratio > 200 ? 'var(--accent-red, #dc2626)' : 'var(--text-muted)',
                            fontWeight: u.ratio > 200 ? 600 : 400,
                            whiteSpace: 'nowrap',
                          }}>
                            {u.ratio} : 1
                          </td>
                          <td style={{ padding: '0.7rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                flex: 1,
                                height: '8px',
                                background: 'var(--bg-cream)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                minWidth: '80px',
                              }}>
                                <div style={{
                                  width: `${(u.cut / CUT_MAX) * 100}%`,
                                  height: '100%',
                                  borderRadius: '4px',
                                  background: isTop
                                    ? 'linear-gradient(90deg, var(--primary-forest), var(--accent-gold))'
                                    : 'var(--primary-forest)',
                                }} />
                              </div>
                              <span style={{
                                fontWeight: 700,
                                color: 'var(--primary-deep-forest)',
                                minWidth: '3.2rem',
                                textAlign: 'right',
                                fontVariantNumeric: 'tabular-nums',
                              }}>
                                {u.cut}점
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* 인사이트 박스 */}
        <div style={{
          maxWidth: '900px',
          margin: '2.5rem auto 0',
          background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
          color: 'var(--bg-cream)',
          borderRadius: '16px',
          padding: '2.5rem',
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
            color: 'var(--accent-gold)',
          }}>
            컷은 매년 출렁입니다 — 기준은 &ldquo;점수&rdquo;가 아니라 &ldquo;상대 위치&rdquo;
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            lineHeight: 1.7,
            fontSize: '1.05rem',
          }}>
            <li>▸ 공학계열 컷: 2024학년도 <strong style={{ color: 'var(--accent-gold)' }}>44점</strong> → 2025학년도 <strong style={{ color: 'var(--accent-gold)' }}>69점</strong>. 시험 난이도에 따라 컷은 크게 움직입니다.</li>
            <li>▸ 의예·약학을 제외하면 대부분 <strong style={{ color: 'var(--accent-gold)' }}>50~70점대</strong>에서 합격선이 형성됩니다. 3문항 중 <strong>2문항을 확실히</strong> 잡으면 합격권입니다.</li>
            <li>▸ 절대 점수를 좇기보다, 기출 훈련으로 <strong style={{ color: 'var(--accent-gold)' }}>상위권의 답안 완성도</strong>를 만드는 것이 핵심입니다.</li>
          </ul>
        </div>

        <p style={{
          maxWidth: '900px',
          margin: '1.5rem auto 0',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          ※ 합격컷은 자체 조사 기준의 추정치이며, 대학 공식 발표 수치가 아닙니다.
        </p>
      </div>
    </div>
  );
};
