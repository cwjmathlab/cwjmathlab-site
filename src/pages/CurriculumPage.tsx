import React, { useState } from 'react';
import { roadmapData, nextYearClasses, classInfo } from '../data/curriculumData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CurriculumPage: React.FC = () => {
  useScrollReveal();
  const [classIdx, setClassIdx] = useState(0);
  const activeClass = nextYearClasses[classIdx];

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>

      {/* Q.E.D. 의미 소개 */}
      <div className="scroll-reveal" style={{
        background: 'var(--bg-white)',
        borderLeft: '6px solid var(--accent-gold)',
        borderRadius: '10px',
        padding: '1.5rem 1.75rem',
        marginBottom: '3rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        maxWidth: '760px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
          Q.E.D.
        </div>
        <p style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
          라틴어 <i>Quod Erat Demonstrandum</i> &mdash; <span style={{ color: 'var(--primary-deep-forest)' }}>&ldquo;이로써 증명되었다.&rdquo;</span>
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          수학자가 증명의 마지막에 적어 논리의 완결을 선언하는 결구입니다.
          본 커리큘럼은 모든 학생이 자신의 답안 끝에 Q.E.D.를 적을 수 있도록 단계별로 훈련합니다.
        </p>
      </div>

      <h1 className="section-title scroll-reveal">2027 연간 Q.E.D. 로드맵</h1>

      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
        수리논술은 핵심 개념을 아는 것에서 끝나지 않습니다.<br/>
        개념을 논리적인 문장으로 바꾸고 채점 가능한 답안 구조로 정리하는 훈련을 단계별로 설계합니다.
      </p>
      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ display: 'inline-block', background: 'rgba(201,169,110,0.15)', color: 'var(--primary-deep-forest)', border: '1px solid var(--accent-gold)', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.9rem', fontWeight: 600 }}>
          2028학년도 대비 · 가안 — 일정과 단원은 변경될 수 있습니다
        </span>
      </p>

      {/* Roadmap Timeline UI */}
      <div className="scroll-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '5rem' }}>
        {roadmapData.map((step, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            minHeight: '180px', /* 모든 카드의 높이를 180px로 통일하여 초록 박스 크기 일치 */
            background: 'var(--bg-white)', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            alignItems: 'stretch'
          }}>
            <div style={{ 
              background: 'var(--primary-forest)', 
              color: 'var(--bg-beige)', 
              padding: '2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              width: '180px',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, opacity: 0.5, lineHeight: 1 }}>{step.phase}</span>
              <span style={{ fontWeight: 600, fontSize: '1.2rem', marginTop: '0.5rem', textAlign: 'center' }}>{step.title}</span>
            </div>
            <div style={{ padding: '2rem', flex: 1 }}>
              <h3 style={{ color: 'var(--primary-deep-forest)', marginBottom: '1rem', fontSize: '1.25rem' }}>{step.period}</h3>
              <div style={{ color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{step.content}</div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="section-title">2027 반 구성 (가안)</h1>
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '1rem' }}>
        {nextYearClasses.map((c) => (
          <div key={c.key} style={{ background: 'var(--bg-white)', borderRadius: '12px', border: '1px solid var(--border-color)', borderTop: '4px solid var(--accent-gold)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>Q.E.D.</div>
            <h3 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.4rem', margin: '0.25rem 0 0.5rem' }}>{c.name}</h3>
            <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>{c.scope}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{c.schedule}<br/>{c.note}</div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginBottom: '5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        미적분Ⅱ · 기하까지 준비하는 학생은 코어반 개념 과정을 마친 뒤 플러스반으로 이어갑니다.
      </p>

      <h1 className="section-title">현재 운영 반 및 클리닉</h1>
      <div style={{ marginBottom: '5rem' }}>
        <table className="custom-table" style={{ background: 'var(--bg-white)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr>
              <th style={{ background: 'var(--primary-deep-forest)', color: 'white' }}>반 단위</th>
              <th style={{ background: 'var(--primary-deep-forest)', color: 'white' }}>시간</th>
              <th style={{ background: 'var(--primary-deep-forest)', color: 'white' }}>권장 대상 및 비고</th>
            </tr>
          </thead>
          <tbody>
            {classInfo.map((info, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600 }}>{info.name}</td>
                <td>{info.schedule}</td>
                <td style={{ color: 'var(--text-muted)' }}>{info.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="section-title">2027 Q.E.D. 진도표 (가안)</h1>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
        반별 주차 강의 주제입니다. 원서접수를 위한 실전모의는 개념 과정이 끝난 다음 주부터 시작됩니다.
      </p>
      <div role="tablist" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {nextYearClasses.map((c, idx) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={idx === classIdx}
            onClick={() => setClassIdx(idx)}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '999px',
              border: '2px solid var(--primary-deep-forest)',
              background: idx === classIdx ? 'var(--primary-deep-forest)' : 'var(--bg-white)',
              color: idx === classIdx ? 'white' : 'var(--primary-deep-forest)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {c.name} · {c.scope}
          </button>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{activeClass.schedule}</p>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {activeClass.months.map((monthData, idx) => (
          <div key={idx} style={{ 
            background: 'var(--bg-white)', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}>
            <h4 style={{ 
              background: 'var(--bg-beige)', 
              color: 'var(--primary-deep-forest)', 
              margin: 0, 
              padding: '1rem', 
              fontSize: '1.2rem',
              borderBottom: '2px solid var(--primary-light)'
            }}>
              {monthData.month}
            </h4>
            <div style={{ padding: '1rem' }}>
              {monthData.weeks.map((week, wIdx) => (
                <div key={wIdx} style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '0.75rem 0',
                  borderBottom: wIdx !== monthData.weeks.length - 1 ? '1px dashed var(--border-color)' : 'none'
                }}>
                  <strong style={{ minWidth: '80px', color: 'var(--primary-light)' }}>{week.date}</strong>
                  <span style={{ color: week.topic.startsWith('휴강') ? 'var(--text-muted)' : 'var(--text-dark)' }}>{week.topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
