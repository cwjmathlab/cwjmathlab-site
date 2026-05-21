import React, { useState } from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const CompetitionInsight: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { overall, byUnit, year } = skkuSpecial.competition;

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        표면 경쟁률 vs <span style={{ color: 'var(--accent-gold)' }}>실질 경쟁률</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 3rem',
      }}>
        {year}학년도 입시결과 기준
      </p>

      {/* 큰 숫자 3개 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto 3rem',
      }}>
        {[
          { value: overall.capacity.toLocaleString(), label: '모집인원', sub: '명' },
          { value: overall.applicants.toLocaleString(), label: '지원자', sub: '명' },
          { value: overall.ratio.toFixed(2), label: '표면 경쟁률', sub: ': 1' },
        ].map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            background: 'var(--bg-white)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '2.75rem',
              fontWeight: 900,
              color: 'var(--primary-deep-forest)',
              lineHeight: 1,
            }}>
              {stat.value}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
                {stat.sub}
              </span>
            </div>
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 반전 인사이트 박스 */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 3rem',
        background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
        color: 'var(--bg-cream)',
        borderRadius: '16px',
        padding: '2.5rem',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          marginBottom: '1.5rem',
          color: 'var(--accent-gold)',
        }}>
          경쟁률 127.95는 <u>허수</u>입니다
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
          <li>▸ 실제 시험장 응시율: 약 <strong style={{ color: 'var(--accent-gold)' }}>44.7~46.5%</strong></li>
          <li>▸ 그 중 수능최저 통과자: 약 <strong style={{ color: 'var(--accent-gold)' }}>28%</strong></li>
          <li>▸ <strong>실질 경쟁률 = 약 <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>16 : 1</span></strong> (표면의 1/8)</li>
        </ul>
      </div>

      {/* 학과별 미니 표 */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'var(--bg-beige)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontWeight: 600,
            color: 'var(--primary-deep-forest)',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          aria-expanded={expanded}
        >
          <span>모집단위별 경쟁률 (전체 {byUnit.length}개) {expanded ? '접기' : '펼치기'}</span>
          <span style={{ fontSize: '1.2rem' }}>{expanded ? '▴' : '▾'}</span>
        </button>
        {expanded && (
          <div style={{
            marginTop: '1rem',
            overflowX: 'auto',
            background: 'var(--bg-white)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.92rem',
            }}>
              <thead>
                <tr style={{ background: 'var(--bg-cream)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>모집단위</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>모집</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>지원</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>경쟁률</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>충원율</th>
                </tr>
              </thead>
              <tbody>
                {byUnit.map((u, i) => {
                  const isAlert = u.ratio > 200;
                  return (
                    <tr key={u.name} style={{
                      borderTop: i === 0 ? 'none' : '1px solid var(--border-color)',
                      color: isAlert ? 'var(--accent-red, #dc2626)' : 'var(--text-dark)',
                      fontWeight: isAlert ? 600 : 400,
                    }}>
                      <td style={{ padding: '0.6rem 1rem' }}>{u.name}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.capacity}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.applicants.toLocaleString()}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.ratio.toFixed(2)}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.fillRate.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
