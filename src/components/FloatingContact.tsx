import React, { useState } from 'react';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '1rem'
    }}>
      {/* Contact Bubble */}
      <div style={{
        background: 'var(--bg-white)',
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        border: '1px solid var(--border-color)',
        display: isOpen ? 'block' : 'none',
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        opacity: isOpen ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transformOrigin: 'bottom right',
        minWidth: '280px'
      }}>
        <h4 style={{ color: 'var(--primary-deep-forest)', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
          신규 수강 / 상담 문의
        </h4>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>
          <strong>📞 032-321-9937</strong><br/>
          <span style={{ fontSize: '0.85rem' }}>부천시 길주로 91번길 6층 정율사관학원</span>
        </p>
        <button 
          onClick={() => window.location.href = 'tel:0323219937'}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--primary-forest)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          바로 전화연결
        </button>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary-deep-forest)',
          color: 'var(--bg-beige)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};
