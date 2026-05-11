import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ratioData, periodData, timeScopeData, minReqData, changeGeneralData, changeNarrativeData } from '../data/nonsulData';
import { getSchoolMetaByName } from '../data/schools';

type Props = { onNavigate: (path: string) => void };

export const DataPage: React.FC<Props> = ({ onNavigate }) => {
  useScrollReveal();
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 로직
  const filterData = (data: any[]) => {
    if (!searchTerm.trim()) return data;
    const lowSearch = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(lowSearch))
    );
  };

  const renderUniversities = (val: string) => {
    if (!val || val === '-') return val;
    const parts = val.split(/,\s*/);
    return (
      <span>
        {parts.map((name, i) => {
          const meta = getSchoolMetaByName(name.trim());
          const isReady = meta?.ready === true;
          const node = isReady ? (
            <button
              key={i}
              onClick={() => onNavigate(`/schools/${meta!.id}`)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--primary-forest)',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                font: 'inherit',
              }}
            >
              {name}
            </button>
          ) : (
            <span key={i}>{name}</span>
          );
          return (
            <React.Fragment key={i}>
              {node}
              {i < parts.length - 1 && <span>, </span>}
            </React.Fragment>
          );
        })}
      </span>
    );
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 className="section-title scroll-reveal">2027 DATA 자료실</h1>
      
      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        조우제수학LAB에서 제공하는 최신 수리논술 전형 정보입니다.
      </p>

      {/* 실시간 대학 검색 창 */}
      <div className="scroll-reveal" style={{ maxWidth: '600px', margin: '0 auto 4rem auto', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="목표 대학을 검색해 보세요 (예: 중앙대)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1.25rem 1.5rem',
            fontSize: '1.2rem',
            border: '2px solid var(--primary-forest)',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            outline: 'none',
            color: 'var(--text-dark)'
          }}
        />
        <svg style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-forest)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>

      <div className="scroll-reveal">
      <DataTable
        title="Theme 01. 논술전형 반영 비율별 분류 (2027 기준)"
        columns={[
          { key: 'category', label: '논술반영 비율' },
          { key: 'details', label: '추가 사항' },
          { key: 'universities', label: '대학', render: renderUniversities }
        ]}
        data={filterData(ratioData)}
        mobileTitleKey="category"
      />
      </div>

      <div className="scroll-reveal">

      <DataTable 
        title="Theme 02. 논술전형 실시 시기별 분류 (2026 기준)"
        subtitle="2026 대학수학능력시험 : 2025년 11월 13일 목요일"
        columns={[
          { key: 'period', label: '시기' },
          { key: 'date', label: '일정' },
          { key: 'universities', label: '대학', render: renderUniversities }
        ]}
        data={filterData(periodData)}
        mobileTitleKey="period"
      />
      </div>

      <div className="scroll-reveal">

      <DataTable 
        title="Theme 03. 논술전형 출제 범위 + 시험시간별 분류 (2027 변경 중)"
        subtitle="공통과목 : 수학(상/하), 수학 1, 수학 2"
        columns={[
          { key: 'scope', label: '출제범위' },
          { key: 'time60', label: '60분' },
          { key: 'time70', label: '70분' },
          { key: 'time80', label: '80분' },
          { key: 'time90', label: '90분' },
          { key: 'time100', label: '100분' },
          { key: 'time120', label: '120분' }
        ]}
        data={filterData(timeScopeData)}
        mobileTitleKey="scope"
      />
      </div>

      <div className="scroll-reveal">

      <DataTable
        title="Theme 04. 논술전형 수능 최저학력 기준별 분류 (2027)"
        subtitle="MEDICAL 제외"
        columns={[
          { key: 'req', label: '수능최저기준' },
          { key: 'universities', label: '대학 (학과)', render: renderUniversities }
        ]}
        data={filterData(minReqData)}
        mobileTitleKey="req"
      />
      </div>

      <div className="scroll-reveal">

      <DataTable
        title="Theme 05. 2027학년도 주요 변화 — 일반형 논술"
        subtitle="2026 대비 변경 사항 (출처: 프린키피아 수학연구소)"
        columns={[
          { key: 'school', label: '대학', render: renderUniversities },
          { key: 'change', label: '변화 항목' },
          { key: 'detail', label: '내용 (변화 전 → 변화 후)' }
        ]}
        data={filterData(changeGeneralData)}
        mobileTitleKey="school"
      />
      </div>

      <div className="scroll-reveal">

      <DataTable
        title="Theme 06. 2027학년도 주요 변화 — 약술형 논술"
        subtitle="2026 대비 변경 사항 (출처: 프린키피아 수학연구소)"
        columns={[
          { key: 'school', label: '대학', render: renderUniversities },
          { key: 'change', label: '변화 항목' },
          { key: 'detail', label: '내용 (변화 전 → 변화 후)' }
        ]}
        data={filterData(changeNarrativeData)}
        mobileTitleKey="school"
      />
      </div>

    </div>
  );
};
