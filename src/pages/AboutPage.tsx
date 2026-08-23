import React from 'react';
import { reviewData, caseStudyData } from '../data/aboutData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getNextEvent, formatEventDate } from '../data/events';

type SummerCourse = {
  tag: string;
  title: string;
  schedule: string[];
  hook: string;
  /** 클릭 시 이동할 상세 페이지 (없으면 카드가 링크로 동작하지 않음) */
  path?: string;
};

const summerCourses: SummerCourse[] = [
  {
    tag: '압축 · 7회',
    title: '수리논술 압축특강',
    schedule: ['7/23(목) 개강', '매주 화·목 15:00~18:00', '총 7회 · 회당 3시간'],
    hook: '기본 증명법과 부등식 작성법 — 논술 답안의 뼈대를 세우는 고강도 훈련.',
  },
  {
    tag: '인하대 · 집중',
    title: '인하대 집중반',
    schedule: ['9/6(일) 개강', '매주 일요일 09:00~12:00', 'PRE-FINAL → LAST-FINAL'],
    hook: '시험 직전까지 실전 감각을 끌어올리는 단계별 집중 과정.',
  },
  {
    tag: '중앙대 · 창의형 FINAL',
    title: '중앙대(창의형) FINAL',
    path: '/cau-special',
    schedule: ['9/6(일) 개강', '매주 일요일 13:00~16:00', '9/6 ~ 10/4 · 총 5회'],
    hook: '10/11 창의형 시험까지 5주 완성 — 수능 전에 치르는 시험, 수능최저 없이 현역만 겨루는 트랙입니다.',
  },
  {
    tag: '고2 · 정규반',
    title: '고2 수리논술 정규반',
    schedule: ['8/9(일) 개강', '매주 일요일 16:00~19:00', '개강 후 연중 계속 진행'],
    hook: '고2부터 미리 시작하는 수리논술 — 기초부터 실전까지 이어지는 정규 과정.',
  },
  {
    tag: '정규반 · 과목별',
    title: '수리논술 정규반',
    schedule: [
      '수학Ⅰ·수학Ⅱ·미적분(개념반) — 매주 토 19:00~22:00',
      '수학Ⅰ·수학Ⅱ반 — 매주 토 19:00~22:00',
      '미적분(심화반) — 매주 일 08:00~11:00',
    ],
    hook: '개념부터 심화까지 — 과목별로 골라 듣는 수리논술 정규 과정.',
  },
  {
    tag: '개념 압축 · 화목',
    title: '확통·기하 개념 압축특강',
    schedule: [
      '확통 — 화·목 08:00~09:30 문제풀이·피드백 / 09:30~11:00 개념정리',
      '기하 — 화·목 08:00~09:30 개념정리 / 09:30~11:00 문제풀이·피드백',
    ],
    hook: '기본개념 압축정리 + 문제풀이 및 피드백(해설영상 제공) — 쉬운 난이도부터 어려운 난이도까지.',
  },
];

type Props = {
  onNavigate?: (path: string) => void;
};

export const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  useScrollReveal();
  const nextEvent = getNextEvent();

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Next Event Section */}
      {nextEvent && (
        <section
          id="event"
          className="scroll-reveal"
          style={{
            background: 'var(--bg-white)',
            border: `2px solid var(--primary-deep-forest)`,
            borderLeft: `8px solid var(--accent-gold)`,
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            marginBottom: '4rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            📢 다음 설명회
          </div>
          <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.4 }}>
            {nextEvent.title}
          </h2>
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '1.5rem',
            rowGap: '0.75rem',
            marginBottom: '1.5rem',
            fontSize: '1.05rem',
          }}>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>일시</dt>
            <dd style={{ color: 'var(--text-dark)' }}>
              {formatEventDate(nextEvent.date)} · {nextEvent.time}
            </dd>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>장소</dt>
            <dd style={{ color: 'var(--text-dark)' }}>{nextEvent.location}</dd>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>대상</dt>
            <dd style={{ color: 'var(--text-dark)' }}>{nextEvent.audience}</dd>
          </dl>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
            {nextEvent.summary}
          </p>
          <p style={{ color: 'var(--primary-forest)', fontWeight: 600, fontSize: '0.95rem' }}>
            참석/문의는 우측 하단 카톡·전화로 연락 주세요.
          </p>
        </section>
      )}

      {/* 2026 특강 일정 */}
      <section className="scroll-reveal" style={{ marginBottom: '5rem' }}>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          2026 여름·가을 특강 일정
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          학교별 출제 경향에 맞춘 단기 집중 과정 — 정원 마감 전 문의 주세요.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {summerCourses.map((c, idx) => (
            <div
              className="hover-card"
              key={idx}
              onClick={c.path && onNavigate ? () => onNavigate(c.path!) : undefined}
              role={c.path && onNavigate ? 'button' : undefined}
              tabIndex={c.path && onNavigate ? 0 : undefined}
              onKeyDown={
                c.path && onNavigate
                  ? e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate(c.path!);
                      }
                    }
                  : undefined
              }
              style={{
              cursor: c.path && onNavigate ? 'pointer' : 'default',
              background: 'var(--bg-white)',
              border: '2px solid var(--border-color)',
              borderTop: '5px solid var(--accent-gold)',
              borderRadius: '14px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <span style={{
                alignSelf: 'flex-start',
                background: 'var(--bg-beige)',
                color: 'var(--primary-deep-forest)',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
              }}>{c.tag}</span>
              <h3 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
                {c.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0, padding: 0 }}>
                {c.schedule.map((s, i) => (
                  <li key={i} style={{
                    color: i === 0 && s.includes('개강') ? 'var(--accent-red)' : 'var(--text-muted)',
                    fontWeight: i === 0 && s.includes('개강') ? 700 : 500,
                    fontSize: '1rem',
                    display: 'flex',
                    gap: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--accent-gold)' }}>•</span>{s}
                  </li>
                ))}
              </ul>
              <p style={{
                marginTop: 'auto',
                color: 'var(--primary-light)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '0.85rem',
                marginBottom: 0,
              }}>
                {c.hook}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Hero Section */}
      <div className="bg-math-pattern scroll-reveal about-hero" style={{
        textAlign: 'center',
        marginBottom: '6rem',
        background: 'linear-gradient(to right bottom, var(--primary-deep-forest), var(--primary-forest))',
        padding: '5rem 2rem',
        borderRadius: '16px',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1 className="about-hero-h1" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--bg-cream)', position: 'relative', zIndex: 10 }}>
          수리논술, 선택이 아닌 필수인 이유
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9, position: 'relative', zIndex: 10 }}>
          N수생 강세 심화와 불수능 환경에서, 수리논술은 정시 전형을 보완하는 가장 확실한 '합격 열쇠'입니다.
        </p>
      </div>

      {/* Logic vs Problem Solving Section */}
      <h2 className="section-title scroll-reveal">문제풀이 vs 논리적 작성 <span style={{color: 'var(--accent-gold)'}}>— 요리와 레시피의 차이</span></h2>
      <div className="scroll-reveal" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginBottom: '6rem'
      }}>
        <div className="hover-card" style={{ 
          background: 'var(--bg-white)', 
          padding: '3rem 2rem', 
          borderRadius: '16px', 
          border: '2px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="9" y1="12" x2="15" y2="12"></line></svg>
            수능 수학 (문제풀이)
          </h3>
          <p style={{ color: 'var(--primary-light)', fontWeight: 600, marginBottom: '2rem' }}>"맛있는 요리를 완성하는 것"</p>
          <ul style={{ listStyle: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <li>✖ 정답(결과)만 맞추면 점수 획득</li>
            <li>✖ 풀이 과정의 비약이나 생략 가능</li>
            <li>✖ 직관적 해결, '감'에 의존해도 무방</li>
          </ul>
        </div>
        <div className="hover-card" style={{ 
          background: 'var(--bg-beige)', 
          padding: '3rem 2rem', 
          borderRadius: '16px', 
          border: '2px solid var(--primary-deep-forest)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h3 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            수리 논술 (논리적 작성)
          </h3>
          <p style={{ color: 'var(--primary-forest)', fontWeight: 600, marginBottom: '2rem' }}>"정확한 레시피를 기록하는 것"</p>
          <ul style={{ listStyle: 'none', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--primary-deep-forest)', fontWeight: 500 }}>
            <li>✔ 가정·정의 명시, 단계별 근거 제시 필수</li>
            <li>✔ 비약 없는 타당한 논리적 흐름 전개</li>
            <li>✔ 수학적 기호와 표현의 적절한 활용</li>
          </ul>
        </div>
      </div>

      {/* Teaching Gallery */}
      <h2 className="section-title scroll-reveal">수업 현장 <span style={{color: 'var(--accent-gold)'}}>— 강의실과 1:1 첨삭</span></h2>
      <p className="scroll-reveal" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
        매 수업은 강의로 끝나지 않습니다. 학생 한 명 한 명의 답안을 직접 손으로 첨삭하며 논리의 빈틈을 메웁니다.
      </p>

      <div className="scroll-reveal" style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-deep-forest)', marginBottom: '1.5rem', fontWeight: 700 }}>
          강의 현장
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {['수업강의3.jpg', '수업강의4.jpg', '수업강의2.jpg'].map((file, idx) => (
            <div className="hover-card" key={idx} style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              aspectRatio: '4 / 3',
              background: 'var(--bg-cream)'
            }}>
              <img
                src={`/teaching/${encodeURIComponent(file)}`}
                alt={`강의 현장 ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-reveal" style={{ marginBottom: '6rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-deep-forest)', marginBottom: '1.5rem', fontWeight: 700 }}>
          1:1 직접 첨삭
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {['첨삭.jpg', '서면첨삭8.jpg', '서면첨삭5.jpg', '서면첨삭.jpg'].map((file, idx) => (
            <div className="hover-card" key={idx} style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              aspectRatio: '4 / 3',
              background: 'var(--bg-cream)'
            }}>
              <img
                src={`/teaching/${encodeURIComponent(file)}`}
                alt={`첨삭 현장 ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="scroll-reveal" style={{ background: 'var(--bg-white)', padding: '4rem 0', borderRadius: '16px', marginBottom: '6rem', borderTop: '4px solid var(--primary-deep-forest)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 className="section-title">수능 등급별 합격 사례</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>낮은 등급도 논리적 서술 훈련으로 합격할 수 있습니다.</p>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 2rem' }}>
          {caseStudyData.map((caseItem, idx) => (
            <div className="hover-card about-case-row" key={idx} style={{
              display: 'flex',
              borderBottom: idx !== caseStudyData.length - 1 ? '1px dashed var(--border-color)' : 'none',
              padding: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              borderRadius: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-cream)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div className="about-case-grade" style={{ width: '80px', color: 'var(--accent-red)', fontSize: '1.5rem', fontWeight: 800 }}>
                {caseItem.grade}
              </div>
              <div className="about-case-name" style={{ width: '200px', fontWeight: 600 }}>
                <span style={{ fontSize: '1.1rem' }}>{caseItem.name}</span><br/>
                <span style={{ color: 'var(--primary-light)' }}>{caseItem.result}</span>
              </div>
              <div style={{ flex: 1, color: 'var(--text-muted)' }}>
                {caseItem.point}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <h2 className="section-title scroll-reveal">합격생 생생 후기</h2>
      <div className="scroll-reveal" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        {reviewData.map((review, idx) => (
          <div className="hover-card" key={idx} style={{ 
            background: 'var(--bg-white)', 
            padding: '2.5rem', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.25rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                "{review.title}"
              </h4>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {review.content}
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>{review.name}</strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary-light)' }}>{review.school} ➔ {review.university}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
