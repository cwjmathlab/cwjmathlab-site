import React, { useMemo } from 'react';
import { examSchedule, formatDate, type ExamEntry } from '../data/examSchedule';

const TRACK_COLORS: Record<string, string> = {
  자연: '#2b4a8a',
  인문: '#7c6e36',
  의약학: '#a8324a',
  통합: '#3a6d6d',
  체육: '#5a7050',
  예체능: '#7a4a8a',
  기타: '#6b6b6b',
};

export const ExamTimetableSection: React.FC = () => {
  const groupedByDate = useMemo(() => {
    const m = new Map<string, ExamEntry[]>();
    for (const e of examSchedule) {
      if (!m.has(e.date)) m.set(e.date, []);
      m.get(e.date)!.push(e);
    }
    return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  return (
    <section
      id="exam-timetable"
      style={{
        marginBottom: '4rem',
        scrollMarginTop: '80px',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            backgroundColor: 'var(--bg-beige)',
            color: 'var(--primary-deep-forest)',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: '0.75rem',
          }}
        >
          ⏰ Theme 01-B · 학교별 시험 날짜 + 시간 (2027학년도)
        </div>
        <h2
          style={{
            fontSize: '1.6rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800,
            margin: '0 0 0.5rem',
            lineHeight: 1.25,
          }}
        >
          시간별 시험 표 — 같은 날 시간 충돌 확인용
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          같은 날 여러 학교 응시 가능 여부를 시간으로 가늠해 보세요. 한 학교의 시험이
          다른 학교의 시험과 시간이 겹치면 동시 응시 불가입니다.
        </p>
      </div>

      <div
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            backgroundColor: 'var(--bg-beige)',
            padding: '0.75rem 1rem',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--primary-deep-forest)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div>시험일</div>
          <div>대학 (시간 · 모집단위)</div>
        </div>
        {groupedByDate.map(([date, entries]) => {
          const isCsat = entries.some(e => e.isCsat);
          return (
            <div
              key={date}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                padding: '0.85rem 1rem',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: isCsat ? '#fff5f5' : 'var(--bg-white)',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: isCsat ? 'var(--accent-red)' : 'var(--primary-deep-forest)',
                  lineHeight: 1.5,
                }}
              >
                {formatDate(date)}
              </div>
              <div>
                {entries.map(entry => (
                  <SchoolRow key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const SchoolRow: React.FC<{ entry: ExamEntry }> = ({ entry }) => {
  if (entry.isCsat) {
    return (
      <div
        style={{
          fontWeight: 800,
          color: 'var(--accent-red)',
          textAlign: 'center',
          padding: '0.5rem 0',
          fontSize: '1.05rem',
        }}
      >
        🔴 {entry.schoolName}
      </div>
    );
  }

  const tracks = entry.groups.map(g => g.track).filter(Boolean);
  const primary = tracks[0];
  const labelColor = primary ? TRACK_COLORS[primary] : 'var(--primary-deep-forest)';

  return (
    <div style={{ marginBottom: '0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem 0.6rem', alignItems: 'baseline' }}>
      <strong
        style={{
          color: labelColor,
          fontSize: '0.98rem',
          minWidth: '110px',
          fontWeight: 700,
        }}
      >
        {entry.schoolName}
        {entry.campus && entry.campus !== '본교(서울)' && entry.campus !== '본교(신촌)' && (
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '0.3rem' }}>
            {entry.campus.includes('(') ? entry.campus.replace(/.*\(/, '(') : entry.campus}
          </span>
        )}
      </strong>
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        {entry.groups.length === 0 || (entry.groups.length === 1 && !entry.groups[0].time && !entry.groups[0].units) ? (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>—</span>
        ) : (
          entry.groups.map((g, i) => (
            <div key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
              {g.time && (
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    fontVariantNumeric: 'tabular-nums',
                    marginRight: '0.4rem',
                  }}
                >
                  {g.time}
                </span>
              )}
              {g.units && <span>{g.units}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
