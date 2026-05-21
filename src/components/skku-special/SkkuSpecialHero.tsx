import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

type Props = {
  onCtaClick: () => void;
};

export const SkkuSpecialHero: React.FC<Props> = ({ onCtaClick }) => {
  return (
    <div className="bg-math-pattern scroll-reveal" style={{
      background: 'linear-gradient(to right bottom, var(--primary-deep-forest), var(--primary-forest))',
      color: 'white',
      padding: '5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ flex: '1 1 480px', minWidth: '300px' }}>
          {/* 성균관대 슬로건 인용 */}
          <div style={{
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
            borderLeft: '3px solid var(--accent-gold)',
            paddingLeft: '1rem',
          }}>
            "{skkuSpecial.slogan}"
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
              — 성균관대학교
            </div>
          </div>

          {/* 메인 카피 */}
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: '1.5rem',
            color: 'var(--bg-cream)',
          }}>
            확통이든 미적분이든,<br/>
            성균관대 수리논술은<br/>
            <span style={{ color: 'var(--accent-gold)' }}>같은 시험입니다.</span>
          </h1>

          {/* 보조 카피 */}
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            opacity: 0.9,
            marginBottom: '2.5rem',
            maxWidth: '560px',
          }}>
            출제범위는 <strong>수학·수학Ⅰ·수학Ⅱ</strong>. 선택과목으로 갈리지 않습니다.<br/>
            성균관대 동문 강사가 직접 지도하는 <strong>4회 압축 특강</strong>.
          </p>

          {/* CTA */}
          <button
            onClick={onCtaClick}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.15rem',
              fontWeight: 700,
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            📅 신청·문의
          </button>
        </div>

        {/* 강사 사진 */}
        <div style={{
          flex: '0 0 auto',
          width: '340px',
          height: '420px',
          position: 'relative',
        }}>
          <img
            src="/profile.png"
            alt="조우제 선생님"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
