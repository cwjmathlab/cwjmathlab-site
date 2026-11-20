import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  finalMeta,
  finalStages,
  finalPrograms,
  finalWeekTimetable,
  finalLastWeek,
  finalContact,
  finalPassSchools,
  finalPassCases,
  finalPassCerts,
  type FinalProgram,
} from '../data/finalProgram';

type Props = { onNavigate: (path: string) => void };

const gold = 'var(--accent-gold)';
const navy = 'var(--primary-deep-forest)';
const red = 'var(--accent-red)';

function daysUntil(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  const t = new Date(y, m - 1, d).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((t - today) / 86400000);
}

const Chip: React.FC<{ children: React.ReactNode; tone?: 'gold' | 'red' | 'muted' | 'navy'; big?: boolean }> = ({ children, tone = 'gold', big }) => (
  <span
    style={{
      display: 'inline-block',
      fontSize: big ? '1.05rem' : '0.75rem',
      fontWeight: 800,
      padding: big ? '0.3rem 0.95rem' : '0.25rem 0.65rem',
      borderRadius: '999px',
      background: tone === 'red' ? red : tone === 'navy' ? navy : tone === 'muted' ? 'rgba(255,255,255,0.14)' : gold,
      color: tone === 'gold' ? '#3a2b00' : '#fff',
    }}
  >
    {children}
  </span>
);

// 수능 후: 진행 중인 세종대·인하대만 노출 (끝난·마감된 과정은 데이터에 보관)
const showProgram = (p: FinalProgram) => p.stage === 3 && !p.closed;

const ProgramCard: React.FC<{ p: FinalProgram; onNavigate: Props['onNavigate'] }> = ({ p, onNavigate }) => {
  const dark = p.stage !== 2;
  const bg = p.highlight ? red : dark ? navy : 'var(--bg-white)';
  const fg = dark || p.highlight ? '#fff' : 'var(--text-dark)';
  const muted = dark || p.highlight ? 'rgba(255,255,255,0.78)' : 'var(--text-muted)';
  const linkable = p.name === '중앙대' && p.sub === '창의형' ? '/cau-special' : p.name === '인하대' ? '/schools/inha' : p.name === '성균관대' ? '/sungkyunkwan-special' : null;
  return (
    <article
      style={{
        background: bg,
        color: fg,
        border: dark || p.highlight ? 'none' : `1.5px solid ${navy}`,
        borderRadius: '14px',
        padding: '1.4rem 1.4rem 1.1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        opacity: p.done ? 0.85 : 1,
      }}
    >
      <span style={{ position: 'absolute', right: '1rem', top: '0.7rem', fontSize: '1.6rem', fontWeight: 800, opacity: 0.14, fontStyle: 'italic' }}>
        {String(p.no).padStart(2, '0')}
      </span>
      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: dark || p.highlight ? (p.highlight ? '#FFD9A8' : gold) : red }}>{p.kind}</div>
      <h3 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
        {p.name}
        {p.sub && <small style={{ fontSize: '0.85rem', fontWeight: 600, marginLeft: '0.35rem', opacity: 0.85 }}>({p.sub})</small>}
        {p.done && <span style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }}><Chip tone="muted">진행 완료</Chip></span>}
        {p.closed && !p.done && <span style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }}><Chip big tone={dark || p.highlight ? 'muted' : 'navy'}>마감</Chip></span>}
        {p.cap && !p.done && !p.closed && <span style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }}><Chip tone={p.highlight ? 'gold' : 'red'}>정원 {p.cap}명</Chip></span>}
      </h3>
      <div style={{ width: 28, height: 3, background: p.highlight ? '#fff' : red, margin: '0.1rem 0 0.3rem' }} />
      <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '3.2rem 1fr', rowGap: '0.4rem', columnGap: '0.6rem', fontSize: '0.92rem' }}>
        <dt style={{ color: dark || p.highlight ? (p.highlight ? '#FFD9A8' : gold) : red, fontWeight: 700, fontSize: '0.78rem' }}>요일</dt>
        <dd style={{ margin: 0, fontWeight: 600 }}>{p.day}</dd>
        <dt style={{ color: dark || p.highlight ? (p.highlight ? '#FFD9A8' : gold) : red, fontWeight: 700, fontSize: '0.78rem' }}>시간</dt>
        <dd style={{ margin: 0, fontWeight: 700 }}>{p.time}</dd>
        <dt style={{ color: dark || p.highlight ? (p.highlight ? '#FFD9A8' : gold) : red, fontWeight: 700, fontSize: '0.78rem' }}>기간</dt>
        <dd style={{ margin: 0, fontWeight: 600 }}>
          {p.period}
          {p.note && <div style={{ fontSize: '0.8rem', color: dark || p.highlight ? gold : red, marginTop: '0.2rem', fontWeight: 600 }}>{p.note}</div>}
        </dd>
      </dl>
      {p.sessions && (
        <div style={{ borderTop: `1px dashed ${dark ? 'rgba(255,255,255,0.25)' : 'var(--border-color)'}`, paddingTop: '0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem 0.6rem', fontSize: '0.83rem' }}>
          {p.sessions.map((s, i) => (
            <span key={i} style={{ fontWeight: 600, color: s.special ? (dark ? gold : red) : fg }}>
              <span style={{ fontWeight: 800, color: dark ? gold : red, marginRight: '0.25rem' }}>{s.label ?? `${p.sessions!.filter(x => !x.special).indexOf(s) + 1}회`}</span>
              {s.date}
            </span>
          ))}
        </div>
      )}
      {p.live && (
        <div style={{ background: red, color: '#fff', fontWeight: 800, padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.92rem' }}>
          {p.live.label ?? '실전'} {p.live.date} · {p.live.time}
        </div>
      )}
      <div style={{ marginTop: 'auto', paddingTop: '0.6rem', borderTop: `1px solid ${dark || p.highlight ? 'rgba(255,255,255,0.18)' : 'var(--border-color)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: muted }}>
        <span>{p.examDate ? `시험 ${p.examDate}` : '조우제 수리논술'}</span>
        {linkable ? (
          <button
            onClick={() => onNavigate(linkable)}
            style={{ background: 'none', border: 'none', color: dark || p.highlight ? '#fff' : navy, fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', padding: 0, textDecoration: 'underline' }}
          >
            상세 보기 →
          </button>
        ) : (
          <span style={{ fontWeight: 800, color: dark || p.highlight ? (p.highlight ? '#fff' : red) : red, letterSpacing: '0.05em' }}>Q.E.D.</span>
        )}
      </div>
    </article>
  );
};

export const FinalProgramPage: React.FC<Props> = ({ onNavigate }) => {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const d = daysUntil(finalMeta.suneung);

  return (
    <div className="animate-fade-in">
      {/* 히어로 */}
      <div style={{ background: `linear-gradient(to right bottom, ${navy}, var(--primary-forest))`, color: 'var(--bg-cream)', padding: '4.5rem 1.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Chip>{finalMeta.year} · {finalMeta.range}</Chip>
          <div style={{ fontSize: '0.9rem', color: gold, fontWeight: 700, margin: '1.4rem 0 0.4rem' }}>— 수능 이후 최종 파이널 · 세종대 · 인하대</div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 7vw, 4.2rem)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 0.4rem', letterSpacing: '-0.03em' }}>
            증명을 <span style={{ color: gold }}>완료하다.</span>
          </h1>
          <div style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: gold, marginBottom: '1.6rem' }}>{finalMeta.latin}</div>
          <p style={{ maxWidth: '760px', margin: '0 auto 1.6rem', lineHeight: 1.8, fontSize: '1.02rem', opacity: 0.92 }}>{finalMeta.intro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '760px', margin: '0 auto 1.6rem' }}>
            {finalMeta.perks.map(t => <Chip key={t} tone="muted">✔ {t}</Chip>)}
          </div>
          {d > 0 && (
            <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>
              수능(11/19)까지 <strong style={{ color: gold, fontSize: '1.4rem' }}>D-{d}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Q.E.D. */}
      <div style={{ background: 'var(--bg-cream)' }}>
        <div className="container" style={{ padding: '2.2rem 1.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '2.2rem', color: red, letterSpacing: '0.06em' }}>Q.E.D.</div>
          <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{finalMeta.qed}</p>
        </div>
      </div>

      {/* 단계별 */}
      {finalStages.filter(st => finalPrograms.some(p => p.stage === st.stage && showProgram(p))).map(st => {
        const items = finalPrograms.filter(p => p.stage === st.stage && showProgram(p));
        const cols = st.stage === 2 ? 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))' : 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))';
        return (
          <div key={st.stage} style={{ background: st.stage === 2 ? 'var(--bg-cream)' : 'var(--bg-white)' }}>
            <div className="container scroll-reveal" style={{ padding: '4rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.8rem 1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.9rem' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: '3rem', lineHeight: 0.85, color: red }}>{st.roman}.</span>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: red, marginBottom: '0.3rem' }}>{st.title}</div>
                    <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 900, color: navy, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{st.headline}</h2>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: '1.5rem', color: red }}>{st.range}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: navy }}>{st.count}</div>
                </div>
              </div>
              {st.stage === 3 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '1.8rem' }}>
                  {[{ k: 'sejong', n: '세종대' }, { k: 'inha', n: '인하대' }].map(v => (
                    <figure key={v.k} style={{ margin: 0, flex: '0 1 300px', minWidth: 0, textAlign: 'center' }}>
                      <video src={`/final/${v.k}-final.mp4`} poster={`/final/${v.k}-final-poster.jpg`} controls playsInline preload="none"
                        aria-label={`${v.n} 파이널 안내 영상`}
                        style={{ width: '100%', aspectRatio: '9 / 16', borderRadius: '12px', background: '#000', display: 'block' }} />
                      <figcaption style={{ marginTop: '0.5rem', fontWeight: 800, color: navy, fontSize: '0.95rem' }}>{v.n} 파이널 영상</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1rem' }}>
                {items.map(p => <ProgramCard key={p.no} p={p} onNavigate={onNavigate} />)}
              </div>

              {st.stage === 3 && (
                <div style={{ marginTop: '1.5rem', background: 'var(--bg-cream)', border: `1.5px solid ${navy}`, borderRadius: '14px', padding: '1.4rem 1.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.4rem 1rem', borderBottom: `1px solid ${navy}`, paddingBottom: '0.6rem', marginBottom: '0.8rem' }}>
                    <strong style={{ fontSize: '1.1rem', color: navy }}>논술주간 시간표</strong>
                    <span style={{ fontStyle: 'italic', color: red, fontSize: '0.9rem', fontWeight: 700 }}>11.23(월) → 11.27(금) · 매일 동일</span>
                  </div>
                  {finalWeekTimetable.filter(r => !r.programs.every(n => n.includes('마감'))).map(r => (
                    <div key={r.slot} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 8rem) 1fr', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px dashed var(--border-color)', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: navy, fontSize: '0.92rem' }}>{r.slot}</span>
                      <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {r.programs.map(n => (
                          <span key={n} style={{ background: n.includes('압축') ? '#4A3A63' : navy, color: '#fff', fontSize: '0.85rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '6px' }}>{n}</span>
                        ))}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 8rem) 1fr', gap: '0.6rem', padding: '0.7rem 0 0', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: navy, fontSize: '0.92rem' }}>{finalLastWeek.slot}</span>
                    <span>
                      <span style={{ background: red, color: '#fff', fontSize: '0.85rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '6px' }}>{finalLastWeek.program}</span>
                      <span style={{ marginLeft: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{finalLastWeek.range}</span>
                      {finalLastWeek.note && (
                        <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.82rem', fontWeight: 700, color: red }}>{finalLastWeek.note}</span>
                      )}
                    </span>
                  </div>
                </div>
              )}

              <p style={{ margin: '1.6rem 0 0', fontStyle: 'italic', color: navy, fontSize: '1rem', lineHeight: 1.6 }}>
                <span style={{ color: red, fontWeight: 800, fontStyle: 'normal', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem' }}>— {st.title.split(' · ')[0]}의 목표</span>
                “{st.goal}”
              </p>
            </div>
          </div>
        );
      })}

      {/* 합격 실적 · 합격증 (이름·수험번호 블러본) */}
      <div style={{ background: 'var(--bg-cream)' }}>
        <div className="container scroll-reveal" style={{ padding: '4rem 1.5rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: red, marginBottom: '0.3rem' }}>조우제 수리논술 합격 실적</div>
          <h2 style={{ margin: '0 0 1.2rem', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 900, color: navy, letterSpacing: '-0.02em', lineHeight: 1.2, wordBreak: 'keep-all' }}>한양대부터 인하대까지, 논술로 합격했습니다</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '2rem' }}>
            {finalPassSchools.map(n => (
              <span key={n} style={{ background: navy, color: '#fff', fontWeight: 900, fontSize: 'clamp(0.95rem, 2.6vw, 1.15rem)', padding: '0.45rem 0.95rem', borderRadius: '8px' }}>{n}</span>
            ))}
            <span style={{ fontWeight: 900, color: red, fontSize: 'clamp(0.95rem, 2.6vw, 1.15rem)', marginLeft: '0.2rem' }}>등 다수 합격</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '0.9rem', marginBottom: '2.4rem' }}>
            {finalPassCases.map((c, i) => (
              <div key={i} style={{ background: c.accent ? red : navy, color: '#fff', borderRadius: '14px', padding: '1.1rem 1.2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: c.accent ? '#FFD9A8' : gold }}>{c.head}</div>
                {c.sub && <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>{c.sub}</div>}
                <div style={{ fontSize: '1.2rem', fontWeight: 900, marginTop: '0.5rem', wordBreak: 'keep-all' }}>→ {c.result}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: navy, marginBottom: '0.8rem' }}>2026학년도 인하대 논술우수자 합격통지서</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.8rem', justifyContent: 'center', padding: '0.5rem 0 1rem' }}>
            {finalPassCerts.map((c, i) => (
              <a key={c.src} href={c.src} target="_blank" rel="noopener noreferrer" title={`인하대 ${c.dept}`}
                style={{ flex: '0 0 clamp(80px, 24%, 140px)', marginLeft: i ? '-4%' : 0, transform: `rotate(${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg)`, zIndex: i, background: '#fff', borderRadius: '6px', boxShadow: '0 6px 18px rgba(0,0,0,0.18)', overflow: 'hidden', display: 'block' }}>
                <img src={c.src} alt={`인하대 ${c.dept} 합격통지서 (이름·수험번호 가림)`} loading="lazy" style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              </a>
            ))}
          </div>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>※ 합격통지서의 이름·수험번호는 가렸습니다. 사진을 누르면 크게 볼 수 있습니다.</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${navy}, var(--primary-forest))`, color: 'var(--bg-cream)', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.7rem', fontWeight: 800 }}>수강 신청 · 문의</h2>
          <p style={{ margin: '0 0 1.4rem', opacity: 0.85 }}>{finalContact.desk} · 시험지 · 시험시간 · 답안지까지 실전 그대로</p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a href={`tel:${finalContact.phone}`} style={{ padding: '0.9rem 1.8rem', background: gold, color: '#3a2b00', borderRadius: '8px', fontWeight: 800, textDecoration: 'none' }}>전화 문의</a>
            <a href={finalContact.kakaoOpenChat} target="_blank" rel="noopener noreferrer" style={{ padding: '0.9rem 1.8rem', background: 'rgba(255,255,255,0.14)', color: '#fff', borderRadius: '8px', fontWeight: 800, textDecoration: 'none' }}>카톡 상담</a>
          </div>
          <p style={{ margin: '1.4rem 0 0', fontSize: '0.8rem', opacity: 0.7 }}>※ 시험일은 학원 정리본 기준이며 각 대학 입학처 공지로 최종 확인하세요.</p>
        </div>
      </div>
    </div>
  );
};
