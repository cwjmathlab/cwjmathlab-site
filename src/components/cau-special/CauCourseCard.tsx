import React from 'react';
import { cauSpecial } from '../../data/cauSpecial';

function formatSession(iso: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = iso.split('-').map(Number);
  return `${m}/${d}(${DAYS[new Date(y, m - 1, d).getDay()]})`;
}

export const CauCourseCard: React.FC = () => {
  const { course, exam, contact } = cauSpecial;

  const rows = [
    { label: '일정', value: `${course.sessions.map(formatSession).join(' · ')} (매주 일요일, 총 ${course.sessions.length}회)` },
    { label: '시간', value: course.timeRange },
    { label: '대상', value: course.target },
    { label: '수강료', value: course.note },
  ];

  return (
    <div style={{ background: 'var(--bg-white)' }}>
      <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          중앙대(창의형) <span style={{ color: 'var(--accent-gold)' }}>FINAL 특강</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '0 auto 2.5rem' }}>
          시험 1주 전까지, 실전 답안으로 마무리합니다.
        </p>

        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            background: 'var(--bg-cream)',
            border: '2px solid var(--primary-deep-forest)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <div style={{ background: 'var(--primary-deep-forest)', color: 'var(--bg-cream)', padding: '1.25rem 1.75rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>9/6 개강 · 총 {course.sessions.length}회</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: '0.25rem' }}>
              시험일 {exam.date.slice(5).replace('-', '/')} · 마지막 수업 후 1주 뒤
            </div>
          </div>

          <dl style={{ margin: 0, padding: '1.5rem 1.75rem', display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '1.5rem', rowGap: '0.9rem' }}>
            {rows.map(r => (
              <React.Fragment key={r.label}>
                <dt style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.92rem', whiteSpace: 'nowrap' }}>{r.label}</dt>
                <dd style={{ margin: 0, color: 'var(--text-dark)', lineHeight: 1.6 }}>{r.value}</dd>
              </React.Fragment>
            ))}
          </dl>

          <div style={{ padding: '0 1.75rem 1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href={`tel:${contact.phone}`}
              style={{
                flex: '1 1 200px',
                textAlign: 'center',
                padding: '0.9rem 1.5rem',
                background: 'var(--primary-deep-forest)',
                color: 'var(--bg-cream)',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              전화 문의
            </a>
            <a
              href={contact.kakaoOpenChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: '1 1 200px',
                textAlign: 'center',
                padding: '0.9rem 1.5rem',
                background: 'var(--accent-gold)',
                color: '#3a2b00',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              카톡 상담
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
