import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

function formatSessionDate(iso: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = iso.split('-').map(Number);
  const day = DAYS[new Date(y, m - 1, d).getDay()];
  return `${m}/${d}(${day})`;
}

export const SpecialCourseCard: React.FC = () => {
  const { course, contact } = skkuSpecial;
  const sessionDates = course.sessions.map(formatSessionDate).join(' · ');

  return (
    <div style={{
      background: 'var(--bg-cream)',
      padding: '5rem 1.5rem',
    }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          성균관대 수리논술 <span style={{ color: 'var(--accent-gold)' }}>4회 압축 특강</span>
        </h2>

        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--text-muted)',
            color: 'var(--bg-cream)',
            fontWeight: 800,
            fontSize: '0.85rem',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
          }}>
            2026년 8월 과정 모집 종료
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.85rem auto 0', maxWidth: '620px', lineHeight: 1.7 }}>
            아래는 종료된 과정의 안내입니다. 현재는 <strong style={{ color: 'var(--accent-red)' }}>중앙대(창의형) FINAL 특강</strong>이
            9/6 개강으로 진행됩니다. 성균관대 준비 상담은 전화·카톡으로 문의해 주세요.
          </p>
        </div>

        <div style={{
          maxWidth: '720px',
          margin: '2rem auto 0',
          background: 'var(--bg-white)',
          borderRadius: '16px',
          padding: '2.5rem',
          border: `2px solid var(--primary-deep-forest)`,
          borderLeft: '8px solid var(--accent-gold)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '1.5rem',
            rowGap: '1rem',
            margin: 0,
            marginBottom: '2rem',
            fontSize: '1.05rem',
          }}>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>일정</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)', fontWeight: 600 }}>
              {sessionDates}<br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                (매주 일요일, 총 {course.sessions.length}회)
              </span>
            </dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>시간</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)' }}>{course.timeRange}</dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>수강료</dt>
            <dd style={{ margin: 0, color: 'var(--primary-deep-forest)', fontWeight: 700 }}>
              {course.fee.toLocaleString()}원
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                {' '}+ 교재비 {course.materialFee.toLocaleString()}원
              </span>
            </dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>장소</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)' }}>문의 시 안내</dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>대상</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)' }}>{course.target}</dd>
          </dl>

          {/* CTA 버튼 2개 */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}>
            <a
              href={`tel:${contact.phone}`}
              style={{
                flex: '1 1 200px',
                padding: '1rem 1.5rem',
                background: 'var(--primary-deep-forest)',
                color: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              📞 전화로 신청·문의
            </a>
            <a
              href={contact.kakaoOpenChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: '1 1 200px',
                padding: '1rem 1.5rem',
                background: '#FEE500',
                color: '#191919',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              💬 카톡으로 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
