import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// 출처: THE GATE 의약계열 약술형 논술 기출 분석(2026~2027) 3·4쪽
const quota = [
  { univ: '가천대', unit: '의예', n: 6, min: '3개 영역 각 1등급' },
  { univ: '가천대', unit: '한의예 (신설)', n: 7, min: '2개 영역 각 1등급' },
  { univ: '가천대', unit: '약학 (신설)', n: 6, min: '3개 영역 합 5' },
  { univ: '삼육대', unit: '약학 (신설)', n: 5, min: '3개 영역 합 5' },
];

const exam = [
  { item: '전형', gachon: '논술 100%', sahmyook: '논술 100%' },
  { item: '시험', gachon: '수학 8문항 · 80분 · 약술형', sahmyook: '수학 단일 8문항 · 80분 · 약술형' },
  { item: '출제범위', gachon: '수학Ⅰ · 수학Ⅱ · 미적분', sahmyook: '2027 논술 가이드북 공지 확인' },
  { item: '시험일', gachon: '2026년 11월 29일(일)', sahmyook: '모집요강 확인' },
];

const gachonPoints = [
  '교점·실근·미분 불가능한 점의 개수로 정의된 함수가 세 시험 연속 출제 (2025 기출 6번, 2026 기출 6번, 2025 모의 3번)',
  '등비급수가 매년 출제 — 도형 반복형과 탄젠트 덧셈정리 망원합형 (2025 기출 1번, 2026 기출 2·4번)',
  '정적분의 활용이 매년 2~3문항 — 구분구적법, 입체의 부피, 대칭을 이용한 적분 (2025 기출 2·5·8번, 2026 기출 3번)',
  '역함수의 미분과 미분가능성 해석이 변별 문항 (2025 기출 5번, 2026 기출 4번, 2025 모의 4번)',
  '2026부터 수학Ⅰ 수열(교대합, 점화식과 보조수열)이 2문항으로 증가 (2026 기출 5·7번)',
];

const sahmyookPoints = [
  '삼각함수 7회 출제 — 그래프와 직선의 교점 개수, 삼각방정식, 사인법칙·코사인법칙',
  '미분계수의 정의를 이용한 극한 3년 연속 — 문제에 "로피탈 정리는 사용할 수 없다" 명시',
  '속도와 거리 3년 연속 — 원 위를 도는 두 점, 절댓값이 들어간 속도',
  '구간별로 정의된 함수의 연속과 주기 조건 4회 출제',
];

const gateContents = [
  { title: '2026 가천대 의예 기출 8문항', desc: '전 문항 문제 · 정답과 해설' },
  { title: '가천 의약형 예상문제 5문항', desc: '매년 나온 4가지 유형 + 늘어난 수열의 합' },
  { title: '삼육 약학형 예상문제 3문항', desc: '미분계수의 정의 · 삼각함수의 그래프 · 속도와 거리' },
];

const downloads = [
  { label: '문제편', href: '/medical/the-gate-medical-problems.pdf', name: 'THE GATE 의약계열 약술형 논술 기출 분석 문제편.pdf', primary: true },
  { label: '정답과 해설', href: '/medical/the-gate-medical-solutions.pdf', name: 'THE GATE 의약계열 약술형 논술 기출 분석 정답과 해설.pdf', primary: false },
];

function daysUntil(y: number, m: number, d: number): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((new Date(y, m - 1, d).getTime() - today) / 86400000);
}

const th: React.CSSProperties = { background: 'var(--primary-deep-forest)', color: 'var(--bg-cream)', padding: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid var(--border-color)', textAlign: 'center' };
const card: React.CSSProperties = { background: 'var(--bg-white)', border: '2px solid var(--border-color)', borderTop: '5px solid var(--accent-gold)', borderRadius: '14px', padding: '1.75rem' };

const Points: React.FC<{ title: string; sub: string; points: string[]; foot?: string }> = ({ title, sub, points, foot }) => (
  <div style={card}>
    <h3 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.35rem 0 1.25rem' }}>{sub}</p>
    <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: 1.65 }}>
      {points.map(p => <li key={p}>{p}</li>)}
    </ol>
    {foot && <p style={{ marginTop: '1.25rem', marginBottom: 0, paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', color: 'var(--primary-light)', fontSize: '0.92rem', lineHeight: 1.6 }}>{foot}</p>}
  </div>
);

export const MedicalPage: React.FC = () => {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const d = daysUntil(2026, 11, 29);

  return (
    <div className="animate-fade-in">
      <div style={{ background: 'linear-gradient(to right bottom, var(--primary-deep-forest), var(--primary-forest))', color: 'var(--bg-cream)', padding: '5rem 1.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'var(--accent-gold)', color: '#3a2b00', fontWeight: 800, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '999px', marginBottom: '1.5rem' }}>
            2027학년도 · 의약계열 약술형 논술
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.9rem)', fontWeight: 800, lineHeight: 1.35, margin: '0 0 1.25rem' }}>
            가천대 의예·한의예·약학<br />삼육대 약학 수리논술 전문
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: 1.8, opacity: 0.92 }}>
            수학 8문항 · 80분 약술형. 기출 문항을 하나하나 분석한 <strong>THE GATE</strong>로 준비합니다.
          </p>
          <button onClick={() => document.getElementById('gate')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1rem 2.5rem', fontSize: '1.15rem', fontWeight: 700, background: 'var(--accent-gold)', color: '#3a2b00', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem' }}>
            ⬇ 기출 분석서 THE GATE 받기
          </button>
          {d > 0 && (
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.35rem' }}>가천대 논술시험(11/29)까지</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-gold)', lineHeight: 1 }}>D-{d}</div>
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <section className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
          <h2 className="section-title">시험 한눈에 보기</h2>
          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-white)', minWidth: '480px' }}>
              <thead><tr><th style={th}>대학</th><th style={th}>모집단위</th><th style={th}>인원</th><th style={th}>수능최저</th></tr></thead>
              <tbody>
                {quota.map(r => (
                  <tr key={r.unit + r.univ}><td style={td}>{r.univ}</td><td style={td}>{r.unit}</td><td style={td}>{r.n}</td><td style={td}>{r.min}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-white)', minWidth: '480px' }}>
              <thead><tr><th style={th}>항목</th><th style={th}>가천대 의예·한의예·약학</th><th style={th}>삼육대 약학</th></tr></thead>
              <tbody>
                {exam.map(r => (
                  <tr key={r.item}><td style={{ ...td, fontWeight: 700 }}>{r.item}</td><td style={td}>{r.gachon}</td><td style={td}>{r.sahmyook}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
            가천대 수능최저의 과학탐구는 2과목 반영 — 의예·약학은 2과목 평균(소수점 절사), 한의예는 2과목 모두 1등급. 삼육대는 과학탐구 1과목 반영.
            <br />최종 내용은 각 대학 모집요강·논술 가이드북으로 확인하세요.
          </p>
        </section>

        <section className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
          <h2 className="section-title">기출에서 찾은 공통점</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Points
              title="가천대 의예"
              sub="2025·2026 기출, 2025 모의 · 배점 합 150점, 문항당 약 10분"
              points={gachonPoints}
            />
            <Points
              title="삼육대"
              sub="2024 자연1·2, 2024 모의, 2025 자연 · 27문항 모두 수학Ⅰ·Ⅱ, 전 문항 10점"
              points={sahmyookPoints}
              foot="2027 약학은 일반학과(국어+수학 13문항)와 따로 수학 단일 8문항으로 처음 시행합니다. 기출이 없으므로 반복 유형을 한 단계 깊게 준비합니다."
            />
          </div>
        </section>

        <section id="gate" className="scroll-reveal" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">THE GATE · 의약계열 약술형 논술 기출 분석</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/medical/the-gate-cover.jpg" alt="THE GATE 의약계열 약술형 논술 기출 분석 표지" style={{ width: '260px', maxWidth: '100%', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }} />
            <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {gateContents.map(c => (
                <div key={c.title} style={{ ...card, padding: '1.25rem 1.5rem' }}>
                  <div style={{ color: 'var(--primary-deep-forest)', fontWeight: 800, fontSize: '1.1rem' }}>{c.title}</div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>{c.desc}</div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {downloads.map(f => (
                  <a key={f.href} href={f.href} download={f.name} style={{ flex: '1 1 200px', textAlign: 'center', padding: '1rem 1.5rem', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', background: f.primary ? 'var(--accent-gold)' : 'var(--primary-deep-forest)', color: f.primary ? 'var(--primary-deep-forest)' : 'white' }}>
                    ⬇ {f.label} (PDF)
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-reveal" style={{ margin: '4.5rem 0 2rem' }}>
          <div style={{ background: 'var(--primary-deep-forest)', color: 'var(--bg-cream)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: 'var(--accent-red)', color: 'white', fontWeight: 800, fontSize: '0.85rem', padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.25rem' }}>
              COMING SOON
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, lineHeight: 1.4, margin: '0 0 1rem' }}>
              의약계열 약술형 실전 모의고사 <span style={{ color: 'var(--accent-gold)' }}>10회분</span>
            </h2>
            <p style={{ maxWidth: '640px', margin: '0 auto 1.5rem', lineHeight: 1.8, opacity: 0.92 }}>
              THE GATE에서 정리한 가천대·삼육대 반복 유형을 바탕으로,<br />
              실제 시험과 같은 8문항 · 80분 구성의 모의고사 10회분을 준비하고 있습니다.
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>
              공개 소식 받기 · <a href="https://open.kakao.com/o/gtz16Omh" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }}>카카오 오픈채팅</a> · 032-321-9937
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
