import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

type Props = {
  onNavigateToSchool: () => void;
};

function daysUntil(isoDate: string, today: Date = new Date()): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round((target - todayStart) / (1000 * 60 * 60 * 24));
}

function formatKDate(isoDate: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}(${DAYS[date.getDay()]})`;
}

export const KeyDatesTimeline: React.FC<Props> = ({ onNavigateToSchool }) => {
  const { exam } = skkuSpecial;
  const dDay = daysUntil(exam.date);
  const dDayLabel = dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : `D+${-dDay}`;

  return (
    <div style={{
      background: 'var(--bg-cream)',
      padding: '5rem 1.5rem',
    }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          시험·전형 <span style={{ color: 'var(--accent-gold)' }}>핵심 일정</span>
        </h2>

        {/* D-Day */}
        <div style={{
          textAlign: 'center',
          margin: '2rem auto 3rem',
        }}>
          <div style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>
            논술시험까지
          </div>
          <div style={{
            fontSize: '4rem',
            fontWeight: 900,
            color: 'var(--primary-deep-forest)',
            lineHeight: 1,
          }}>
            {dDayLabel}
          </div>
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}>
            ※ {exam.sourceNote}
          </div>
        </div>

        {/* 일정 카드 2장 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '720px',
          margin: '0 auto 4rem',
        }}>
          <div className="hover-card" style={{
            background: 'var(--bg-white)',
            padding: '1.75rem',
            borderRadius: '12px',
            borderLeft: '4px solid var(--primary-deep-forest)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>논술시험</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-deep-forest)' }}>
              {formatKDate(exam.date)}
            </div>
          </div>
          <div className="hover-card" style={{
            background: 'var(--bg-white)',
            padding: '1.75rem',
            borderRadius: '12px',
            borderLeft: '4px solid var(--accent-gold)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>시험장 발표</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-deep-forest)' }}>
              {exam.venueAnnounceDate ? formatKDate(exam.venueAnnounceDate) : '추후 공지'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              성균관대 입학안내 홈페이지
            </div>
          </div>
        </div>

        {/* 수능최저 요약 */}
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 700,
            marginBottom: '1rem',
            textAlign: 'center',
          }}>
            수능 최저학력기준 요약
          </h3>
          <div style={{
            background: 'var(--bg-white)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
          }}>
            <dl style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: '1.5rem',
              rowGap: '1rem',
              margin: 0,
              fontSize: '0.95rem',
            }}>
              <dt style={{ fontWeight: 700, color: 'var(--accent-red, #dc2626)' }}>의예과</dt>
              <dd style={{ margin: 0, color: 'var(--text-dark)' }}>4개 영역 중 3합 4</dd>
              <dt style={{ fontWeight: 700, color: 'var(--primary-deep-forest)' }}>자유전공·반도체·약학 등</dt>
              <dd style={{ margin: 0, color: 'var(--text-dark)' }}>5개 영역 중 3합 5</dd>
              <dt style={{ fontWeight: 700, color: 'var(--primary-forest)' }}>자연과학·공학·건설환경 등</dt>
              <dd style={{ margin: 0, color: 'var(--text-dark)' }}>5개 영역 중 3합 6</dd>
            </dl>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onNavigateToSchool}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-deep-forest)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              수능최저·교차지원 함정 자세히 보기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
