import React from 'react';
import { getNextEvent } from '../data/events';

const JEONGYUL_EVENT_ID = '2026-06-05-jeongyul';

const FORM_VIEW_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScH0HpuRt_pjSLxZ9SWTGbd2NnGV-7kiHlJoD6ZbP_qV_gHaw/viewform';
const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScH0HpuRt_pjSLxZ9SWTGbd2NnGV-7kiHlJoD6ZbP_qV_gHaw/viewform?embedded=true';

const KEY_POINTS: string[] = [
  '대학별 수리논술 출제 경향 분석',
  '학생 수준별 맞춤 준비 전략',
  '실제 합격 사례 공개',
];

export const JeongyulEventSection: React.FC = () => {
  const next = getNextEvent();
  if (!next || next.id !== JEONGYUL_EVENT_ID) return null;

  return (
    <section
      id="jeongyul-event"
      style={{
        backgroundColor: 'var(--bg-beige)',
        padding: '4rem 1.5rem',
        scrollMarginTop: '80px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* (a) Eyebrow chip */}
        <div
          style={{
            display: 'inline-block',
            padding: '0.45rem 1.1rem',
            backgroundColor: 'var(--primary-deep-forest)',
            color: 'var(--accent-gold)',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '1.25rem',
          }}
        >
          📢 6/5(금) 19:30 · 정율사관학원 설명회
        </div>

        {/* (b) Hook headline */}
        <h2
          style={{
            fontSize: '2.5rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 1rem',
          }}
        >
          수학의 반전,<br />대학 라인 역전의 기회
        </h2>

        {/* (c) Lead copy */}
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          수능까지 이제 6개월도 남지 않았습니다. 정시와 내신, 둘 다 챙기기엔
          불안하시다면 주목해 주세요.
        </p>

        {/* (d) Pain → strategy copy */}
        <div
          style={{
            backgroundColor: 'var(--bg-white)',
            padding: '1.75rem 2rem',
            borderRadius: '12px',
            marginBottom: '2.5rem',
            borderLeft: '4px solid var(--accent-gold)',
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--primary-deep-forest)',
              margin: '0 0 0.75rem',
            }}
          >
            어머니, 다른 건 몰라도 우리 아이 '수학'은 좀 하지 않나요?
          </p>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-dark)',
              lineHeight: 1.75,
              margin: '0 0 0.75rem',
            }}
          >
            자연계 입시는 이 '수학 경쟁력' 하나로 대학 라인이 완전히 달라질
            수 있습니다.
          </p>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-dark)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            수리논술은 정시·학생부 외에 대학 결과를 바꿀 수 있는 또 하나의
            강력한 전략입니다.
          </p>
        </div>

        {/* (e) Class type 2-cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '5px solid var(--primary-forest)',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                color: 'var(--primary-deep-forest)',
                marginBottom: '0.5rem',
                fontSize: '1.15rem',
              }}
            >
              개념반
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              기초를 탄탄하게 완성
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '5px solid var(--accent-gold)',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                color: 'var(--primary-deep-forest)',
                marginBottom: '0.5rem',
                fontSize: '1.15rem',
              }}
            >
              심화반
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              상위권 대학 합격 목표
            </div>
          </div>
        </div>

        {/* (f) Key content 3-bullet */}
        <h3
          style={{
            fontSize: '1.35rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          설명회 핵심 내용
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
          {KEY_POINTS.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.5rem 0',
                fontSize: '1.05rem',
                color: 'var(--text-dark)',
              }}
            >
              <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>▷</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* (g) Schedule / speaker / venue box */}
        <div
          style={{
            backgroundColor: 'var(--primary-deep-forest)',
            color: 'var(--bg-cream)',
            padding: '1.75rem 2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: '1rem',
              rowGap: '0.6rem',
              fontSize: '1rem',
            }}
          >
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>일시</span>
            <span>6월 5일(금) 19:30</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>연사</span>
            <span>조우제 수리논술 대표강사</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>장소</span>
            <span>상동역 5번 출구 비잔티움 6층 정율사관학원</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>전화</span>
            <span>032-321-9937</span>
          </div>
        </div>

        {/* (h) CTA 3 buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <a
            href={FORM_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 240px',
              textAlign: 'center',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            🔗 지금 예약하기
          </a>
          <a
            href="tel:0323219937"
            style={{
              flex: '1 1 180px',
              textAlign: 'center',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--bg-white)',
              color: 'var(--primary-deep-forest)',
              fontWeight: 700,
              fontSize: '1.05rem',
              borderRadius: '8px',
              border: '2px solid var(--primary-deep-forest)',
              textDecoration: 'none',
            }}
          >
            📞 032-321-9937
          </a>
          <a
            href="https://pf.kakao.com/_xiqxhxlxb/chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 180px',
              textAlign: 'center',
              padding: '1rem 1.5rem',
              backgroundColor: '#FEE500',
              color: '#3C1E1E',
              fontWeight: 700,
              fontSize: '1.05rem',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            💬 카카오톡 상담
          </a>
        </div>

        {/* (i) Google Form iframe embed */}
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}
        >
          아래에서 바로 예약하실 수 있습니다.
        </p>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <iframe
            src={FORM_EMBED_URL}
            width="100%"
            height={900}
            title="6/5 설명회 예약 폼"
            style={{
              border: 0,
              display: 'block',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
        </div>
      </div>
    </section>
  );
};
