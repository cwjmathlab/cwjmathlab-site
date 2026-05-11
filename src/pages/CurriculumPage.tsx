import React from 'react';
import { roadmapData, weeklyCurriculumData, classInfo } from '../data/curriculumData';
import { DataTable } from '../components/DataTable';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CurriculumPage: React.FC = () => {
  useScrollReveal();

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 className="section-title scroll-reveal">2027 연간 Q.E.D. 로드맵</h1>
      
      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--text-muted)' }}>
        수리논술은 핵심 개념을 아는 것에서 끝나지 않습니다.<br/>
        개념을 논리적인 문장으로 바꾸고 채점 가능한 답안 구조로 정리하는 훈련을 단계별로 설계합니다.
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

      <h1 className="section-title">수업 운영 및 클리닉</h1>
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

      <h1 className="section-title">Q.E.D. 진도표 (1월 ~ 10월)</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        상세한 주차별 강의 주제입니다. 실전 모의논술은 7월부터 시작됩니다.
      </p>

      {/* Reusing DataTable component for Curriculum UI, flattening for Mobile Accordion support */}
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {weeklyCurriculumData.map((monthData, idx) => (
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
                  <span style={{ color: 'var(--text-dark)' }}>{week.topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
