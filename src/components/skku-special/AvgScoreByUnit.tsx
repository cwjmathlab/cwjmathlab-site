import React from 'react';
import { skkuSpecial, type MinReqTier } from '../../data/skkuSpecial';

const AVG_MAX = 100;

const tierColor: Record<MinReqTier, string> = {
  '3합4': 'var(--accent-gold)',
  '3합5': '#8b7fc4',
  '3합6': '#4fa8b8',
};

const tierLabel: Record<MinReqTier, string> = {
  '3합4': '3과목 합 4',
  '3합5': '3과목 합 5',
  '3합6': '3과목 합 6',
};

export const AvgScoreByUnit: React.FC = () => {
  const year = skkuSpecial.avgScoreHistory[0];
  const all = year.sessions.flatMap(s => s.units);

  const avgOf = (tier: MinReqTier) => {
    const rows = all.filter(u => u.tier === tier);
    if (!rows.length) return null;
    return Math.round((rows.reduce((sum, u) => sum + u.avg, 0) / rows.length) * 10) / 10;
  };

  const avg5 = avgOf('3합5');
  const avg6 = avgOf('3합6');

  return (
    <div style={{ background: 'var(--bg-white)' }}>
      <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {year.year}학년도 <span style={{ color: 'var(--accent-gold)' }}>학과별 논술 평균점수</span>
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            maxWidth: '760px',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}
        >
          100점 만점 기준, 수리논술 응시자의 모집단위별 평균점수입니다. 막대 색은 그 모집단위의 수능최저 기준입니다.
        </p>

        {/* 범례 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem 1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {(['3합4', '3합5', '3합6'] as MinReqTier[]).map(t => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem' }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: tierColor[t],
                  display: 'inline-block',
                }}
              />
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{tierLabel[t]}</span>
            </span>
          ))}
        </div>

        {/* 교시별 카드 */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {year.sessions.map(sess => (
            <div
              key={sess.session}
              style={{
                background: 'var(--bg-cream)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
              }}
            >
              <h3
                style={{
                  margin: '0 0 1.25rem',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--primary-deep-forest)',
                }}
              >
                {sess.session}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {sess.units.map(u => (
                  <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        flex: '0 0 clamp(120px, 34%, 190px)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-dark)',
                        lineHeight: 1.35,
                      }}
                    >
                      {u.name}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 22,
                        background: 'var(--bg-beige)',
                        borderRadius: 999,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${(u.avg / AVG_MAX) * 100}%`,
                          height: '100%',
                          background: tierColor[u.tier],
                          borderRadius: 999,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        flex: '0 0 42px',
                        textAlign: 'right',
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: 'var(--primary-deep-forest)',
                      }}
                    >
                      {u.avg}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 읽는 법 */}
        {avg5 !== null && avg6 !== null && (
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: 'var(--primary-deep-forest)',
              color: 'var(--bg-cream)',
              borderRadius: '14px',
              padding: '2rem',
            }}
          >
            <h3
              style={{
                margin: '0 0 1rem',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--accent-gold)',
              }}
            >
              이 표를 읽는 법
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                lineHeight: 1.75,
                fontSize: '1rem',
              }}
            >
              <li>
                ▸ 수능최저가 높은 모집단위일수록 논술 평균도 높습니다 — 3합 5 단위 평균{' '}
                <strong style={{ color: 'var(--accent-gold)' }}>{avg5}점</strong>, 3합 6 단위 평균{' '}
                <strong style={{ color: 'var(--accent-gold)' }}>{avg6}점</strong>. 최저 문턱이 낮은 곳에는 그만큼
                준비가 덜 된 지원자가 모입니다.
              </li>
              <li>
                ▸ 대부분의 모집단위가 <strong>50점대</strong>에 몰려 있습니다. 100점 만점에서 절반을 조금 넘기는
                수준이 평균이라는 뜻이고, 몇 문제를 끝까지 밀어붙이느냐로 순위가 갈립니다.
              </li>
              <li>
                ▸ 의예과만 <strong style={{ color: 'var(--accent-gold)' }}>87점</strong>으로 다른 차원입니다. 반대로
                건설환경공학부·글로벌AI융합학부처럼 40점대인 곳도 있습니다.
              </li>
            </ul>
          </div>
        )}

        <p
          style={{
            maxWidth: '900px',
            margin: '1.25rem auto 0',
            padding: '0.9rem 1.15rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            background: 'var(--bg-cream)',
            borderRadius: '8px',
            lineHeight: 1.6,
          }}
        >
          ※ 출처: 성균관대학교 입학처 입시 결과 발표 자료. 합격 커트라인이 아니라 <strong>응시자 평균점수</strong>이며,
          모집단위 구성·교시 배치는 학년도마다 달라집니다.
        </p>
      </div>
    </div>
  );
};
