import React, { useState, useMemo } from 'react';
import {
  getLecturesSortedByYearDesc,
  getSchoolIdsWithLectures,
  getSchoolName,
} from '../data/lectures';
import { LectureCard } from '../components/LectureCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ALL_FILTER = '__all__';

export const LecturesPage: React.FC = () => {
  useScrollReveal();
  const [filter, setFilter] = useState<string>(ALL_FILTER);

  const allLectures = useMemo(() => getLecturesSortedByYearDesc(), []);
  const schoolIds = useMemo(() => getSchoolIdsWithLectures(), []);

  const visible = filter === ALL_FILTER
    ? allLectures
    : allLectures.filter(l => l.schoolId === filter);

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 className="section-title scroll-reveal">기출문제 해설강의</h1>

      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        조우제 강사가 직접 풀이한 학교별 기출문제 해설 영상입니다.
      </p>

      {schoolIds.length > 0 && (
        <div
          className="scroll-reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <FilterChip
            label="전체"
            active={filter === ALL_FILTER}
            onClick={() => setFilter(ALL_FILTER)}
          />
          {schoolIds.map(id => (
            <FilterChip
              key={id}
              label={getSchoolName(id)}
              active={filter === id}
              onClick={() => setFilter(id)}
            />
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
          해당 학교의 영상이 아직 없습니다.
        </p>
      ) : (
        <div
          className="scroll-reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {visible.map(lecture => (
            <LectureCard key={lecture.videoId} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

const FilterChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.5rem 1.25rem',
      border: `2px solid ${active ? 'var(--primary-deep-forest)' : 'var(--border-color)'}`,
      borderRadius: '999px',
      background: active ? 'var(--primary-deep-forest)' : 'var(--bg-white)',
      color: active ? 'var(--bg-cream)' : 'var(--text-dark)',
      fontWeight: active ? 700 : 500,
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.15s',
    }}
  >
    {label}
  </button>
);
