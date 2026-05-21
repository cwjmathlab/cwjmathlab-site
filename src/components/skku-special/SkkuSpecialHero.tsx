import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

type Props = {
  onCtaClick: () => void;
};

export const SkkuSpecialHero: React.FC<Props> = ({ onCtaClick }) => {
  return (
    <div className="scroll-reveal" style={{
      background: 'linear-gradient(135deg, #002418 0%, #003F2D 50%, #066147 100%)',
      color: 'white',
      padding: '4rem 1.5rem 5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 미묘한 글로우 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at top, rgba(255,199,44,0.10), transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
      }}>
        {/* 상단 배지 */}
        <div style={{
          display: 'inline-block',
          padding: '0.45rem 1.25rem',
          background: 'rgba(255,199,44,0.15)',
          border: '1px solid rgba(255,199,44,0.4)',
          color: 'var(--accent-gold)',
          borderRadius: '999px',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '2.5rem',
          letterSpacing: '0.02em',
        }}>
          2026학년도 · 8/2 개강 · 4회 압축 특강
        </div>

        {/* 메인 비주얼: 성균관대 슬로건 + 로고 (크게 가운데) */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 30px 80px -15px rgba(0,0,0,0.5)',
          maxWidth: '640px',
          margin: '0 auto 3rem',
        }}>
          <img
            src="/skku-slogan.png"
            alt={`성균관대학교 — ${skkuSpecial.slogan}`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '8px',
            }}
            loading="eager"
          />
        </div>

        {/* 메인 카피 */}
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          lineHeight: 1.25,
          marginBottom: '1.5rem',
          color: 'var(--bg-cream)',
          letterSpacing: '-0.01em',
        }} className="skku-hero-h1">
          확통이든 미적분이든,<br/>
          성균관대 수리논술은 <span style={{ color: 'var(--accent-gold)' }}>같은 시험입니다.</span>
        </h1>

        {/* 보조 카피 */}
        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.75,
          opacity: 0.92,
          marginBottom: '2.5rem',
          maxWidth: '720px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          출제범위는 <strong style={{ color: 'var(--accent-gold)' }}>수학·수학Ⅰ·수학Ⅱ</strong>. 선택과목으로 갈리지 않습니다.<br/>
          성균관대 동문 강사가 직접 지도하는 <strong>4회 압축 특강</strong>.
        </p>

        {/* CTA */}
        <button
          onClick={onCtaClick}
          style={{
            padding: '1.15rem 3rem',
            fontSize: '1.2rem',
            fontWeight: 800,
            backgroundColor: 'var(--accent-gold)',
            color: '#002418',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255,199,44,0.35)',
            letterSpacing: '0.01em',
          }}
        >
          📅 신청·문의하기
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skku-hero-h1 {
            font-size: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .skku-hero-h1 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};
