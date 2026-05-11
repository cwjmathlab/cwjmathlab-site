import React, { useState } from 'react';
import { schoolMetas } from '../data/schools';
import { useScrollReveal } from '../hooks/useScrollReveal';

type Props = {
  onNavigate: (path: string) => void;
};

export const SchoolListPage: React.FC<Props> = ({ onNavigate }) => {
  useScrollReveal();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = schoolMetas.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 className="section-title scroll-reveal">학교별 상세</h1>

      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        대학별 논술전형의 핵심 정보를 분석한 자료입니다.
      </p>

      <div className="scroll-reveal" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', position: 'relative' }}>
        <input
          type="text"
          placeholder="대학명을 검색해 보세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1.25rem 1.5rem',
            fontSize: '1.1rem',
            border: '2px solid var(--primary-forest)',
            borderRadius: '12px',
            outline: 'none',
            color: 'var(--text-dark)',
          }}
        />
      </div>

      <div
        className="scroll-reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filtered.map(meta => {
          const isReady = meta.ready;
          return (
            <div
              key={meta.id}
              onClick={isReady ? () => onNavigate(`/schools/${meta.id}`) : undefined}
              style={{
                background: isReady ? 'var(--bg-white)' : 'var(--bg-beige)',
                border: `1px solid ${isReady ? 'var(--primary-forest)' : 'var(--border-color)'}`,
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: isReady ? 'pointer' : 'not-allowed',
                opacity: isReady ? 1 : 0.55,
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: isReady ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (isReady) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (isReady) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--primary-deep-forest)', fontSize: '1.25rem' }}>{meta.name}</h3>
                {!isReady && (
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: 'var(--text-muted)',
                    color: 'white',
                    fontWeight: 600,
                  }}>준비 중</span>
                )}
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{meta.tagline}</p>
              {isReady && (
                <div style={{ marginTop: '1rem', color: 'var(--primary-forest)', fontWeight: 600, fontSize: '0.9rem' }}>
                  상세 보기 →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
