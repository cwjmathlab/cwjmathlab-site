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
      padding: '6rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 미묘한 패턴 오버레이 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at top right, rgba(255,199,44,0.08), transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }} className="skku-hero-grid">
        {/* 좌측: 텍스트 + CTA */}
        <div>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'rgba(255,199,44,0.15)',
            border: '1px solid rgba(255,199,44,0.4)',
            color: 'var(--accent-gold)',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            letterSpacing: '0.02em',
          }}>
            2026학년도 · 8/2 개강 · 4회 압축 특강
          </div>

          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: 'var(--bg-cream)',
            letterSpacing: '-0.01em',
          }}>
            확통이든 미적분이든,<br/>
            성균관대 수리논술은<br/>
            <span style={{ color: 'var(--accent-gold)' }}>같은 시험입니다.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.75,
            opacity: 0.92,
            marginBottom: '2.5rem',
            maxWidth: '520px',
          }}>
            출제범위는 <strong style={{ color: 'var(--accent-gold)' }}>수학·수학Ⅰ·수학Ⅱ</strong>. 선택과목으로 갈리지 않습니다.<br/>
            성균관대 동문 강사가 직접 지도하는 <strong>4회 압축 특강</strong>.
          </p>

          <button
            onClick={onCtaClick}
            style={{
              padding: '1.1rem 2.75rem',
              fontSize: '1.15rem',
              fontWeight: 800,
              backgroundColor: 'var(--accent-gold)',
              color: '#002418',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(255,199,44,0.3)',
              letterSpacing: '0.01em',
            }}
          >
            📅 신청·문의하기
          </button>
        </div>

        {/* 우측: 성균관대 슬로건 + 로고 이미지 */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          boxShadow: '0 20px 50px -10px rgba(0,0,0,0.4)',
          textAlign: 'center',
        }}>
          <img
            src="/skku-slogan.png"
            alt={`성균관대학교 — ${skkuSpecial.slogan}`}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '420px',
              objectFit: 'contain',
              display: 'block',
            }}
            loading="eager"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skku-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .skku-hero-grid > div:last-child {
            order: -1;
            max-width: 360px;
            margin: 0 auto;
          }
          .skku-hero-grid h1 {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};
