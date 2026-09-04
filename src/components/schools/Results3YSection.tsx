import React, { useState } from 'react';
import { results3y, type Agg3Y } from '../../data/schools/results3y';

type Props = { uid: string; note?: string };

const navy = 'var(--primary-deep-forest)';
const red = 'var(--accent-red)';
const forest = 'var(--primary-forest)';

const fmt = (v: number | null, digits = 1) => (v === null ? '—' : v.toFixed(digits));
const sign = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toFixed(1)}`;

const DevList: React.FC<{ items: Agg3Y[]; tone: 'low' | 'high' }> = ({ items, tone }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    {items.map(a => (
      <div
        key={a.unit}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '0.5rem 0.9rem',
          alignItems: 'center',
          padding: '0.6rem 0.85rem',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderLeft: `4px solid ${tone === 'low' ? forest : red}`,
          borderRadius: '8px',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.35 }}>{a.unit}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem', fontVariantNumeric: 'tabular-nums' }}>
            {Object.entries(a.devs)
              .sort()
              .map(([y, d]) => `${y.slice(2)} ${sign(d)}`)
              .join(' · ')}
          </div>
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: '1.05rem',
            color: tone === 'low' ? forest : red,
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {sign(a.avgDev)}
        </div>
      </div>
    ))}
  </div>
);

export const Results3YSection: React.FC<Props> = ({ uid, note }) => {
  const data = results3y[uid];
  const analysed = (data?.years ?? []).filter(y => y.base !== null);
  const [tab, setTab] = useState(analysed.length ? analysed[analysed.length - 1].year : '');
  if (!data || !analysed.length) return null;

  const cur = analysed.find(y => y.year === tab) ?? analysed[analysed.length - 1];
  const rows = [...cur.units].sort((a, b) => (a.dev ?? 0) - (b.dev ?? 0));
  const hasMin = rows.some(r => r.min !== null);
  const hasRatio = rows.some(r => r.ratio !== null);

  return (
    <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: navy, margin: '0 0 0.4rem', lineHeight: 1.35 }}>
        3개년 학과별 입시결과 — 그래서 어느 학과를 노릴 것인가
      </h2>
      <p style={{ margin: '0 0 1.1rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        같은 해 같은 시험을 본 학과들의 등록자 논술 평균과 비교합니다. 평균보다 낮은 점수로도 등록된 학과가 요구 점수가 낮았던
        학과입니다. <strong style={{ color: navy }}>{data.scaleLabel}</strong> 기준이며, 연도·시간대가 다르면 점수 자체는 비교할 수 없습니다.
      </p>

      {/* 연도 탭 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {analysed.map(y => {
          const on = y.year === cur.year;
          return (
            <button
              key={y.year}
              onClick={() => setTab(y.year)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                border: on ? `1px solid ${navy}` : '1px solid var(--border-color)',
                background: on ? navy : 'var(--bg-white)',
                color: on ? 'var(--bg-cream)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {y.year}학년도
            </button>
          );
        })}
      </div>

      {/* 연도 요약 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem 1.5rem',
          padding: '0.8rem 1rem',
          background: 'var(--bg-cream)',
          borderRadius: '8px',
          marginBottom: '0.9rem',
          fontSize: '0.88rem',
        }}
      >
        <span>
          <strong style={{ color: navy }}>계열 평균</strong>{' '}
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(cur.base, 2)}</span>
        </span>
        {cur.ratio !== null && (
          <span>
            <strong style={{ color: navy }}>경쟁률</strong>{' '}
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(cur.ratio, 2)} : 1</span>
          </span>
        )}
        {cur.realRatio !== null && (
          <span>
            <strong style={{ color: navy }}>실질경쟁률</strong>{' '}
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(cur.realRatio, 2)} : 1</span>
          </span>
        )}
        {cur.minReqPassRate !== null && (
          <span>
            <strong style={{ color: navy }}>수능최저 충족률</strong>{' '}
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(cur.minReqPassRate, 1)}%</span>
          </span>
        )}
        <span style={{ color: 'var(--text-muted)' }}>학과 {cur.units.length}개 · 편차 낮은 순</span>
      </div>

      {/* 학과 표 */}
      <div style={{ overflowX: 'auto', background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '520px' }}>
          <thead>
            <tr style={{ background: navy, color: 'var(--bg-cream)' }}>
              <th style={{ padding: '0.7rem 0.8rem', textAlign: 'left', fontWeight: 700, fontSize: '0.83rem' }}>모집단위</th>
              {hasRatio && <th style={{ padding: '0.7rem 0.8rem', textAlign: 'right', fontWeight: 700, fontSize: '0.83rem' }}>경쟁률</th>}
              <th style={{ padding: '0.7rem 0.8rem', textAlign: 'right', fontWeight: 700, fontSize: '0.83rem' }}>논술 평균</th>
              {hasMin && <th style={{ padding: '0.7rem 0.8rem', textAlign: 'right', fontWeight: 700, fontSize: '0.83rem' }}>최저점</th>}
              <th style={{ padding: '0.7rem 0.8rem', textAlign: 'right', fontWeight: 700, fontSize: '0.83rem' }}>계열 평균 대비</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.unit + i} style={{ borderTop: '1px solid var(--border-color)', background: i % 2 ? 'var(--bg-cream)' : 'transparent' }}>
                <td style={{ padding: '0.55rem 0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>{r.unit}</td>
                {hasRatio && (
                  <td style={{ padding: '0.55rem 0.8rem', textAlign: 'right', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(r.ratio, 1)}
                  </td>
                )}
                <td style={{ padding: '0.55rem 0.8rem', textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {fmt(r.mean, 2)}
                </td>
                {hasMin && (
                  <td style={{ padding: '0.55rem 0.8rem', textAlign: 'right', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(r.min, 2)}
                  </td>
                )}
                <td
                  style={{
                    padding: '0.55rem 0.8rem',
                    textAlign: 'right',
                    fontWeight: 800,
                    color: (r.dev ?? 0) < 0 ? forest : (r.dev ?? 0) > 0 ? red : 'var(--text-muted)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {r.dev === null ? '—' : sign(r.dev)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3개년 종합 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '1.25rem',
          marginTop: '1.5rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: forest, margin: '0 0 0.3rem' }}>
            요구 점수가 낮았던 학과 — 노려볼 만한 자리
          </h3>
          <p style={{ margin: '0 0 0.7rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
            3개년 평균 편차가 가장 낮은 순. 평균이 낮게 형성된 학과는 부분점수만 챙겨도 승부가 됩니다.
          </p>
          <DevList items={data.low} tone="low" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: red, margin: '0 0 0.3rem' }}>
            평균보다 더 잘 써야 붙는 학과
          </h3>
          <p style={{ margin: '0 0 0.7rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
            위험한 학과가 아니라, 같은 시험에서 몇 점을 더 받아야 하는 학과입니다.
          </p>
          <DevList items={data.high} tone="high" />
        </div>
      </div>

      <p
        style={{
          margin: '1.1rem 0 0',
          padding: '0.85rem 1.1rem',
          fontSize: '0.84rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-cream)',
          borderRadius: '8px',
          lineHeight: 1.65,
        }}
      >
        ※ 편차는 <strong>같은 해</strong> 학과들의 등록자 논술 평균과의 차이입니다. 2개년 이상 자료가 있는 학과만 종합에 넣었고,
        연도별 표는 그 해 자료가 있는 학과 전체를 보여줍니다. 출처는 각 대학 입학처 공개 입시결과·논술가이드북입니다.
        {note ? ` ${note}` : ''}
      </p>
    </section>
  );
};
