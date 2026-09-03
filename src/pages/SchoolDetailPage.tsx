import React from 'react';
import { getSchoolData, getSchoolMeta } from '../data/schools';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SchoolHero } from '../components/schools/SchoolHero';
import { ChangeComparison } from '../components/schools/ChangeComparison';
import { MinReqPyramid } from '../components/schools/MinReqPyramid';
import { CompetitionFunnel } from '../components/schools/CompetitionFunnel';
import { TamguCalculation } from '../components/schools/TamguCalculation';
import { SupportMatrix } from '../components/schools/SupportMatrix';
import { WarningBox } from '../components/schools/WarningBox';
import { TieBreakSection } from '../components/schools/TieBreakSection';
import { CaseStudy } from '../components/schools/CaseStudy';
import { StrategyPillars } from '../components/schools/StrategyPillars';
import { DataTableSection } from '../components/schools/DataTableSection';
import { KeyPointsSection } from '../components/schools/KeyPointsSection';
import { TimelineSection } from '../components/schools/TimelineSection';

type Props = {
  schoolId: string;
  onNavigate: (path: string) => void;
};

export const SchoolDetailPage: React.FC<Props> = ({ schoolId, onNavigate }) => {
  useScrollReveal();
  const meta = getSchoolMeta(schoolId);
  const data = getSchoolData(schoolId);

  if (!meta) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-deep-forest)' }}>존재하지 않는 학교입니다.</h1>
        <button
          onClick={() => onNavigate('/schools')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            background: 'var(--primary-deep-forest)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          학교 목록으로
        </button>
      </div>
    );
  }

  if (!meta.ready || !data) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-deep-forest)' }}>{meta.name}</h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          상세 분석 자료를 준비 중입니다.
        </p>
        <button
          onClick={() => onNavigate('/schools')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            background: 'var(--primary-deep-forest)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          학교 목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem' }}>
      <button
        onClick={() => onNavigate('/schools')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary-forest)',
          cursor: 'pointer',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          padding: 0,
        }}
      >
        ← 학교 목록
      </button>

      {data.sections.map((section, idx) => {
        switch (section.type) {
          case 'hero':
            return <SchoolHero key={idx} {...section} />;
          case 'change':
            return <ChangeComparison key={idx} {...section} />;
          case 'minReq':
            return <MinReqPyramid key={idx} {...section} />;
          case 'funnel':
            return <CompetitionFunnel key={idx} {...section} />;
          case 'tamgu':
            return <TamguCalculation key={idx} {...section} />;
          case 'matrix':
            return <SupportMatrix key={idx} {...section} />;
          case 'warning':
            return <WarningBox key={idx} {...section} />;
          case 'tieBreak':
            return <TieBreakSection key={idx} {...section} />;
          case 'caseStudy':
            return <CaseStudy key={idx} {...section} />;
          case 'strategy':
            return <StrategyPillars key={idx} {...section} />;
          case 'dataTable':
            return <DataTableSection key={idx} {...section} />;
          case 'keyPoints':
            return <KeyPointsSection key={idx} {...section} />;
          case 'timeline':
            return <TimelineSection key={idx} {...section} />;
          case 'custom': {
            const Component = section.component;
            return <Component key={idx} />;
          }
          default:
            return null;
        }
      })}

      {schoolId === 'sungkyunkwan' && (
        <div
          style={{
            marginTop: '3rem',
            background: 'var(--bg-cream)',
            border: '2px solid var(--primary-deep-forest)',
            borderLeft: '8px solid var(--accent-gold)',
            borderRadius: '12px',
            padding: '1.75rem',
          }}
        >
          <h3 style={{ margin: '0 0 0.6rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-deep-forest)' }}>
            성균관대 수리논술 심화 자료
          </h3>
          <p style={{ margin: '0 0 1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
            출제범위 근거, 역대 합격컷(2025·2024학년도), 2026학년도 학과별 논술 평균점수를 한곳에 정리했습니다.
          </p>
          <button
            onClick={() => onNavigate('/sungkyunkwan-special')}
            style={{
              padding: '0.85rem 1.75rem',
              background: 'var(--primary-deep-forest)',
              color: 'var(--bg-cream)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            합격컷 · 평균점수 보기 →
          </button>
        </div>
      )}
    </div>
  );
};
