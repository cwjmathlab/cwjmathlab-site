import { useState } from 'react';
import { DataPage } from './pages/DataPage';
import { AboutPage } from './pages/AboutPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { SchoolListPage } from './pages/SchoolListPage';
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { LecturesPage } from './pages/LecturesPage';
import { PreviewPage } from './pages/PreviewPage';
import { FloatingContact } from './components/FloatingContact';
import { EventBanner } from './components/EventBanner';
import { MobileNav } from './components/MobileNav';
import { schoolMetas } from './data/schools';
import { lectures } from './data/lectures';
import './index.css';

function App() {
  const [currentPath, setCurrentPath] = useState('/data');

  const navigateToEventSection = () => {
    setCurrentPath('/about');
    setTimeout(() => {
      document.getElementById('event')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
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
          <div style={{ fontSize: '1.5rem', fontWeight: '700', cursor: 'pointer' }} onClick={() => setCurrentPath('/')}>
            조우제수리논술LAB
          </div>
          <div className="desktop-nav-items" style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => setCurrentPath(item.path)}
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
            <MobileNav items={navItems} currentPath={currentPath} onNavigate={setCurrentPath} />
          </div>
        </div>
      </nav>

      <EventBanner onClick={navigateToEventSection} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentPath === '/' && (
          <div className="bg-math-pattern">
            <div className="container animate-fade-in scroll-reveal" style={{ padding: '4rem 1.5rem 0', position: 'relative', zIndex: 10 }}>
              <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {/* Text Section */}
                <div style={{ flex: '1 1 480px', minWidth: '300px', paddingBottom: '4rem' }}>
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
                  <h1 style={{ fontSize: '3.2rem', color: 'var(--primary-deep-forest)', marginBottom: '1.25rem', fontWeight: 800, lineHeight: 1.2 }}>
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
                      onClick={() => setCurrentPath('/about')}
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
                      onClick={() => setCurrentPath('/curriculum')}
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
                  </div>
                </div>

                {/* Profile Photo - 크게, 배경 제거 */}
                <div style={{
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
            <div style={{
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
                    className="scroll-reveal"
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
        
        {currentPath === '/about' && <AboutPage />}

        {currentPath === '/curriculum' && <CurriculumPage />}

        {currentPath === '/lectures' && <LecturesPage />}
        {currentPath === '/data' && <DataPage onNavigate={setCurrentPath} />}
        {currentPath === '/2028' && <PreviewPage />}
        {currentPath === '/schools' && <SchoolListPage onNavigate={setCurrentPath} />}
        {currentPath.startsWith('/schools/') && (
          <SchoolDetailPage
            schoolId={currentPath.slice('/schools/'.length)}
            onNavigate={setCurrentPath}
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
