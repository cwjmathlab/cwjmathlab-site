import { useState, useEffect } from 'react';
import { DataPage } from './pages/DataPage';
import { AboutPage } from './pages/AboutPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { SchoolListPage } from './pages/SchoolListPage';
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { LecturesPage } from './pages/LecturesPage';
import { PreviewPage } from './pages/PreviewPage';
import { SkkuSpecialPage } from './pages/SkkuSpecialPage';
import { useScrollReveal } from './hooks/useScrollReveal';
import { CauSpecialPage } from './pages/CauSpecialPage';
import { FinalProgramPage } from './pages/FinalProgramPage';
import { FloatingContact } from './components/FloatingContact';
import { EventBanner } from './components/EventBanner';
import { MobileNav } from './components/MobileNav';
import { schoolMetas } from './data/schools';
import { lectures } from './data/lectures';
import { getNextEvent } from './data/events';
import './index.css';

/** 주소창에서 바로 열 수 있는 화면 목록 (학교 상세는 /schools/:id 로 별도 처리) */
const KNOWN_PATHS = [
  '/', '/about', '/curriculum', '/lectures', '/data', '/2028',
  '/sungkyunkwan-special', '/cau-special', '/final', '/schools',
];

/** 주소창 경로 → 화면 경로. 끝의 슬래시는 떼고, 모르는 주소는 홈으로 보낸다. */
function normalizePath(raw: string): string {
  const path = raw.replace(/\/+$/, '') || '/';
  if (KNOWN_PATHS.includes(path) || path.startsWith('/schools/')) return path;
  return '/';
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  useScrollReveal(currentPath);

  // 주소창과 화면을 맞춘다 — 링크로 바로 열기, 뒤로/앞으로 가기 지원
  useEffect(() => {
    const normalized = normalizePath(window.location.pathname);
    if (normalized !== window.location.pathname) {
      window.history.replaceState({}, '', normalized);
    }
    const onPopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    const target = normalizePath(path);
    if (target !== window.location.pathname) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
  };

  const navigateToEventSection = () => {
    const next = getNextEvent();
    if (next?.link) {
      const hashIndex = next.link.indexOf('#');
      if (hashIndex >= 0) {
        const path = next.link.slice(0, hashIndex) || '/';
        const elementId = next.link.slice(hashIndex + 1);
        navigate(path);
        setTimeout(() => {
          document
            .getElementById(elementId)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
        return;
      }
      navigate(next.link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/about');
    setTimeout(() => {
      document.getElementById('event')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const readySchoolCount = schoolMetas.filter(m => m.ready).length;
  const lectureCount = lectures.length;

  const statsCards: { value: string; label: string; sub: string }[] = [
    { value: '10년', label: '수리논술 강사', sub: '논술 분야 한 우물' },
    { value: '1:1', label: '맞춤 답안 첨삭', sub: '학생 답안 직접 코칭' },
    { value: `${readySchoolCount}개`, label: '학교 심층 분석', sub: '공식 입시자료 기반' },
    { value: `${lectureCount}개`, label: '기출 해설 영상', sub: 'YouTube 직강' },
  ];

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/curriculum', label: 'CURRICULUM' },
    { path: '/final', label: 'FINAL 특강' },
    { path: '/schools', label: '학교별 상세' },
    { path: '/lectures', label: '기출 해설' },
    { path: '/data', label: '2027 DATA' },
    { path: '/2028', label: '2028 PREVIEW' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'var(--primary-deep-forest)',
        color: 'var(--bg-cream)',
        padding: '1.25rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', cursor: 'pointer' }} onClick={() => navigate('/')}>
            조우제수리논술LAB
          </div>
          <div className="desktop-nav-items" style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: (item.path === '/schools' ? currentPath.startsWith('/schools') : currentPath === item.path) ? 'var(--accent-gold)' : 'var(--bg-cream)',
                  fontSize: '1rem',
                  fontWeight: (item.path === '/schools' ? currentPath.startsWith('/schools') : currentPath === item.path) ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: '0.5rem 0',
                  borderBottom: (item.path === '/schools' ? currentPath.startsWith('/schools') : currentPath === item.path) ? '2px solid var(--accent-gold)' : '2px solid transparent'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mobile-nav-wrapper" style={{ display: 'none' }}>
            <MobileNav items={navItems} currentPath={currentPath} onNavigate={navigate} />
          </div>
        </div>
      </nav>

      <EventBanner onClick={navigateToEventSection} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentPath === '/' && (
          <div className="bg-math-pattern">
            <div className="container animate-fade-in scroll-reveal" style={{ padding: '4rem 1.5rem 0', position: 'relative', zIndex: 10 }}>
              <div className="home-hero" style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {/* Text Section */}
                <div className="home-hero-text" style={{ flex: '1 1 480px', minWidth: '300px', paddingBottom: '4rem' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    backgroundColor: 'var(--bg-beige)',
                    color: 'var(--primary-forest)',
                    borderRadius: '999px',
                    fontWeight: 600,
                    marginBottom: '1.5rem'
                  }}>
                    2027학년도 대개강
                  </div>
                  <h1 className="home-hero-h1" style={{ fontSize: '3.2rem', color: 'var(--primary-deep-forest)', marginBottom: '1.25rem', fontWeight: 800, lineHeight: 1.2 }}>
                    완벽한 증명의 시작,<br/>답안이 완성되는 수업
                  </h1>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    조우제 · 수리논술 전문 강사
                  </p>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                    2등급도 의대를, 4등급도 인서울을 합격하는 비결.<br/>
                    조우제수리논술LAB에서 수리논술의 해답을 찾으십시오.
                  </p>

                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => navigate('/about')}
                      style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--primary-deep-forest)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      합격 전략 보기
                    </button>
                    <button
                      onClick={() => navigate('/curriculum')}
                      style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--bg-white)',
                        color: 'var(--primary-deep-forest)',
                        border: '2px solid var(--primary-deep-forest)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                      }}
                    >
                      Q.E.D. 커리큘럼
                    </button>
                    <button
                      onClick={() => navigate('/cau-special')}
                      style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--accent-gold)',
                        color: 'var(--primary-deep-forest)',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      🆕 중앙대 창의형 특강
                    </button>
                  </div>
                </div>

                {/* Profile Photo - 크게, 배경 제거 */}
                <div className="home-hero-photo" style={{
                  flex: '0 0 auto',
                  width: '420px',
                  height: '520px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src="/profile.png"
                    alt="조우제 선생님"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      mixBlendMode: 'multiply',
                      filter: 'contrast(1.05)'
                    }}
                  />
                  {/* 하단 그라데이션 페이드 */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'linear-gradient(to top, var(--bg-cream), transparent)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="home-stats" style={{
              backgroundColor: 'var(--primary-deep-forest)',
              padding: '3rem 1.5rem',
            }}>
              <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
              }}>
                {statsCards.map((stat, i) => (
                  <div
                    key={i}
                    className="scroll-reveal home-stat-card"
                    style={{
                      textAlign: 'center',
                      padding: '1.5rem 1rem',
                      borderRight: i < statsCards.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    }}
                  >
                    <div style={{
                      fontSize: '2.75rem',
                      fontWeight: 800,
                      color: 'var(--accent-gold)',
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--bg-cream)',
                      marginBottom: '0.25rem',
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.7)',
                    }}>
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {currentPath === '/about' && <AboutPage onNavigate={navigate} />}

        {currentPath === '/curriculum' && <CurriculumPage />}

        {currentPath === '/lectures' && <LecturesPage />}
        {currentPath === '/data' && <DataPage onNavigate={navigate} />}
        {currentPath === '/2028' && <PreviewPage />}
        {currentPath === '/sungkyunkwan-special' && <SkkuSpecialPage onNavigate={navigate} />}
        {currentPath === '/cau-special' && <CauSpecialPage />}
        {currentPath === '/final' && <FinalProgramPage onNavigate={navigate} />}
        {currentPath === '/schools' && <SchoolListPage onNavigate={navigate} />}
        {currentPath.startsWith('/schools/') && (
          <SchoolDetailPage
            schoolId={currentPath.slice('/schools/'.length)}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: 'var(--primary-forest)', 
        color: 'var(--bg-beige)', 
        padding: '2rem', 
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
          &copy; 조우제수리논술LAB. All rights reserved.
        </p>
      </footer>

      {/* Global Components */}
      <FloatingContact />
    </div>
  );
}

export default App;
