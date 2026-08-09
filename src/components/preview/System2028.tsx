import React from 'react';
import {
  suneung2028Meta,
  suneung2028Areas,
  systemChanges2028,
  scopeGap2028,
  scopeGapInsight,
  admission2028Ratio,
  essayMarket2028,
  essayMarketInsight,
  rumorNote,
  system2028Source,
} from '../../data/system2028';

const verdictColor: Record<string, string> = {
  '수능 범위 초과': 'var(--accent-red)',
  '수능 범위와 동일': 'var(--primary-forest)',
  '수능 범위 일부': 'var(--text-muted)',
};

export const System2028: React.FC = () => {
  return (
    <div>
      {/* 시행일 + 요약 배너 */}
      <div
        style={{
          background: 'var(--primary-deep-forest)',
          color: 'var(--bg-cream)',
          borderRadius: '14px',
          padding: '1.5rem 1.75rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem 2.5rem',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '0.2rem' }}>
            2028학년도 수능일
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>{suneung2028Meta.examDate}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '0.2rem' }}>
            성적 통지
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>{suneung2028Meta.scoreDate}</div>
        </div>
        <p style={{ margin: 0, flex: '1 1 260px', fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.9 }}>
          {suneung2028Meta.note}
        </p>
      </div>

      {/* 핵심 변화 4가지 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {systemChanges2028.map(c => (
          <article
            key={c.tag}
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderTop: '4px solid var(--accent-gold)',
              borderRadius: '12px',
              padding: '1.4rem 1.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                background: 'var(--bg-beige)',
                color: 'var(--primary-deep-forest)',
                marginBottom: '0.6rem',
              }}
            >
              {c.tag}
            </span>
            <h3
              style={{
                margin: '0 0 0.6rem',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--primary-deep-forest)',
                lineHeight: 1.35,
              }}
            >
              {c.headline}
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{c.body}</p>
          </article>
        ))}
      </div>

      {/* 영역별 출제범위 표 */}
      <h3
        style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'var(--primary-deep-forest)',
          margin: '0 0 0.75rem',
        }}
      >
        2028 수능 영역별 출제범위
      </h3>
      <div
        style={{
          overflowX: 'auto',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          marginBottom: '2.5rem',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', minWidth: '620px' }}>
          <thead>
            <tr style={{ background: 'var(--primary-deep-forest)', color: 'var(--bg-cream)' }}>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>영역</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>출제범위</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>문항 / 시간</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>성적 산출</th>
            </tr>
          </thead>
          <tbody>
            {suneung2028Areas.map(a => (
              <tr
                key={a.area}
                style={{
                  borderTop: '1px solid var(--border-color)',
                  background: a.highlight ? 'var(--bg-cream)' : 'transparent',
                }}
              >
                <td
                  style={{
                    padding: '0.75rem 1rem',
                    fontWeight: 700,
                    color: a.highlight ? 'var(--primary-deep-forest)' : 'var(--text-dark)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.area}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-dark)' }}>{a.scope}</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.format}</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.grading}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 수능 범위 vs 논술 범위 */}
      <h3
        style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'var(--primary-deep-forest)',
          margin: '0 0 0.5rem',
        }}
      >
        수능에서 빠진 범위가, 논술에는 남아 있습니다
      </h3>
      <p style={{ margin: '0 0 1.25rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
        {scopeGapInsight}
      </p>
      <div
        style={{
          overflowX: 'auto',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          marginBottom: '2.5rem',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', minWidth: '620px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-beige)', color: 'var(--primary-deep-forest)' }}>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>대학</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>2028 논술 출제범위</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>수능 범위 대비</th>
            </tr>
          </thead>
          <tbody>
            {scopeGap2028.map(r => (
              <tr key={r.school} style={{ borderTop: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-dark)', whiteSpace: 'nowrap' }}>
                  {r.school}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>{r.scope}</td>
                <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                  <span style={{ color: verdictColor[r.verdict], fontWeight: 700 }}>{r.verdict}</span>
                  {r.detail && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {r.detail}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 수시·정시 규모 */}
      <h3
        style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'var(--primary-deep-forest)',
          margin: '0 0 0.75rem',
        }}
      >
        수시가 처음으로 80%를 넘었습니다
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {admission2028Ratio.map(r => (
          <div
            key={r.label}
            style={{
              background: 'var(--bg-cream)',
              border: '1px solid var(--bg-beige)',
              borderRadius: '12px',
              padding: '1.25rem 1.4rem',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
              {r.label}
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-deep-forest)' }}>{r.value}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--primary-forest)', fontWeight: 700, marginTop: '0.3rem' }}>
              {r.delta}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{r.caption}</div>
          </div>
        ))}
      </div>

      {/* 논술 정원 지형 */}
      <h3
        style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'var(--primary-deep-forest)',
          margin: '0 0 0.5rem',
        }}
      >
        논술 정원은 그대로인데, 지도는 바뀌었습니다
      </h3>
      <p style={{ margin: '0 0 1.25rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
        {essayMarketInsight}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {essayMarket2028.map(r => (
          <div
            key={r.label}
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderLeft: `5px solid ${r.warn ? 'var(--accent-red)' : 'var(--accent-gold)'}`,
              borderRadius: '12px',
              padding: '1.25rem 1.4rem',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
              {r.label}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-deep-forest)' }}>{r.value}</div>
            <div
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                marginTop: '0.3rem',
                color: r.warn ? 'var(--accent-red)' : 'var(--primary-forest)',
              }}
            >
              {r.delta}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{r.caption}</div>
          </div>
        ))}
      </div>

      {/* 미확정 이슈 주의 */}
      <div
        style={{
          background: 'var(--bg-white)',
          border: '2px dashed var(--border-color)',
          borderRadius: '12px',
          padding: '1.4rem 1.6rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3
          style={{
            margin: '0 0 0.6rem',
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--primary-deep-forest)',
            lineHeight: 1.4,
          }}
        >
          {rumorNote.title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{rumorNote.body}</p>
      </div>

      <p
        style={{
          margin: 0,
          padding: '0.9rem 1.15rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-cream)',
          borderRadius: '8px',
          lineHeight: 1.6,
        }}
      >
        ※ 출처: {system2028Source} 대학별 논술 출제범위는 각 대학이 발표한 2028학년도 전형계획 기준이며, 세부 사항은 2027년
        발표되는 <strong>수시 모집요강</strong>에서 최종 확인해야 합니다.
      </p>
    </div>
  );
};
