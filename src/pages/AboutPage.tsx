import React from 'react';
import { reviewData, caseStudyData } from '../data/aboutData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutPage: React.FC = () => {
  useScrollReveal();

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      
      {/* Intro Hero Section */}
      <div className="bg-math-pattern scroll-reveal" style={{ 
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
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--bg-cream)', position: 'relative', zIndex: 10 }}>
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
            <div className="hover-card" key={idx} style={{ 
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
              <div style={{ width: '80px', color: 'var(--accent-red)', fontSize: '1.5rem', fontWeight: 800 }}>
                {caseItem.grade}
              </div>
              <div style={{ width: '200px', fontWeight: 600 }}>
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
