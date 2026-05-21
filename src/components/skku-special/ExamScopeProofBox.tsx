import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const ExamScopeProofBox: React.FC = () => {
  const { exam } = skkuSpecial;

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        공식 모집요강 <span style={{ color: 'var(--accent-gold)' }}>그대로</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '700px',
        margin: '0 auto 3rem',
        fontSize: '1.05rem',
      }}>
        성균관대학교 입학처가 공식 발표한 시험 구성을 그대로 옮긴 것입니다.
      </p>

      {/* 모집요강 인용 카드 */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto 2.5rem',
        background: 'var(--bg-white)',
        border: '2px solid var(--primary-deep-forest)',
        borderRadius: '12px',
        padding: '2rem 2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      }}>
        <div style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px dashed var(--border-color)',
        }}>
          성균관대학교 수시모집 요강 — 4. 논술시험 안내
        </div>
        <dl style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: '1.5rem',
          rowGap: '0.75rem',
          margin: 0,
          fontSize: '1.05rem',
        }}>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>시험형식</dt>
          <dd style={{ color: 'var(--text-dark)', margin: 0 }}>논술</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>평가시간</dt>
          <dd style={{ color: 'var(--text-dark)', margin: 0 }}>{exam.duration}분</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>시험내용</dt>
          <dd style={{ color: 'var(--primary-deep-forest)', margin: 0, fontWeight: 700 }}>
            {exam.scope.join(', ')} — {exam.questions}문제
          </dd>
        </dl>
        <div style={{
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontFamily: 'inherit',
        }}>
          {exam.sourceNote}
        </div>
      </div>

      {/* 제외 강조 */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto 1.5rem',
        textAlign: 'center',
        padding: '1.5rem',
        background: 'var(--bg-beige)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--accent-red, #dc2626)',
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
          {exam.excludedScope.map(s => `❌ ${s}`).join(' · ')}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          출제 범위에 <strong>없습니다.</strong>
        </div>
      </div>

      {/* 결론 */}
      <p style={{
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--primary-deep-forest)',
        lineHeight: 1.5,
      }}>
        선택과목과 무관하게,<br/>
        <span style={{ color: 'var(--accent-gold)' }}>모든 응시자가 같은 시험을 봅니다.</span>
      </p>
    </div>
  );
};
