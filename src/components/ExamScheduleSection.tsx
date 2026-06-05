import React, { useMemo, useState } from 'react';
import { examSchedule, formatDate, type ExamEntry, type ExamGroup } from '../data/examSchedule';

type TrackFilter = '전체' | '자연' | '의약학' | '인문' | '통합';

const TRACK_FILTERS: TrackFilter[] = ['전체', '자연', '의약학', '인문', '통합'];

const TRACK_COLORS: Record<NonNullable<ExamGroup['track']>, string> = {
  자연: '#2b4a8a',
  인문: '#7c6e36',
  의약학: '#a8324a',
  체육: '#5a7050',
  예체능: '#7a4a8a',
  통합: '#3a6d6d',
  기타: '#6b6b6b',
};

function trackBadge(track?: ExamGroup['track']): React.ReactNode {
  if (!track) return null;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.1rem 0.5rem',
        fontSize: '0.72rem',
        fontWeight: 700,
        color: '#fff',
        backgroundColor: TRACK_COLORS[track],
        borderRadius: '999px',
        marginRight: '0.4rem',
        verticalAlign: 'middle',
      }}
    >
      {track}
    </span>
  );
}

function entryMatchesTrack(entry: ExamEntry, filter: TrackFilter): boolean {
  if (filter === '전체') return true;
  return entry.groups.some(g => g.track === filter);
}

function entryMatchesQuery(entry: ExamEntry, q: string): boolean {
  if (!q) return true;
  const hay = [
    entry.schoolName,
    entry.campus ?? '',
    ...entry.groups.map(g => g.units ?? ''),
    entry.note ?? '',
  ]
    .join(' ')
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

type ViewMode = 'list' | 'calendar';

export const ExamScheduleSection: React.FC = () => {
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('전체');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'school'>('date');
  const [view, setView] = useState<ViewMode>('calendar');

  const filtered = useMemo(() => {
    const result = examSchedule
      .filter(e => entryMatchesTrack(e, trackFilter))
      .filter(e => entryMatchesQuery(e, query));
    if (sortBy === 'date') {
      return result.sort((a, b) => a.date.localeCompare(b.date) || a.schoolName.localeCompare(b.schoolName));
    }
    return result.sort((a, b) => a.schoolName.localeCompare(b.schoolName) || a.date.localeCompare(b.date));
  }, [trackFilter, query, sortBy]);

  // Group by date for display
  const groupedByDate = useMemo(() => {
    if (sortBy !== 'date') return null;
    const map = new Map<string, ExamEntry[]>();
    for (const e of filtered) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date)!.push(e);
    }
    return Array.from(map.entries());
  }, [filtered, sortBy]);

  return (
    <section id="exam-schedule" style={{ marginBottom: '4rem', scrollMarginTop: '80px' }}>
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
          📅 시험 일정 캘린더 · 2027학년도
        </div>
        <h2
          style={{
            fontSize: '1.8rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800,
            margin: '0 0 0.5rem',
            lineHeight: 1.25,
          }}
        >
          한눈에 보는 논술 시험 일정표
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          전국 주요 대학 논술 시험 일정을 날짜순/학교순으로 정리한 표입니다. 시간·모집단위 매핑은
          학원 자체 정리본 기준이며, 실제 수험표 정보와 다를 수 있으니{' '}
          <strong>응시 전 각 대학 입학처 공지로 최종 확인하세요.</strong>
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'var(--bg-cream)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {TRACK_FILTERS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTrackFilter(t)}
              style={{
                padding: '0.4rem 0.9rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: trackFilter === t ? '#fff' : 'var(--primary-deep-forest)',
                backgroundColor:
                  trackFilter === t ? 'var(--primary-deep-forest)' : 'var(--bg-white)',
                border: '1px solid var(--primary-deep-forest)',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="학교명·모집단위 검색"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            flex: '1 1 200px',
            padding: '0.5rem 0.9rem',
            fontSize: '0.95rem',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '0.3rem', marginLeft: 'auto' }}>
          <button
            type="button"
            onClick={() => setView('calendar')}
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: view === 'calendar' ? '#fff' : 'var(--primary-deep-forest)',
              backgroundColor: view === 'calendar' ? 'var(--accent-gold)' : 'var(--bg-white)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            📅 달력
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: view === 'list' ? '#fff' : 'var(--primary-deep-forest)',
              backgroundColor: view === 'list' ? 'var(--accent-gold)' : 'var(--bg-white)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            📋 목록
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center' }}>정렬:</span>
          <button
            type="button"
            onClick={() => setSortBy('date')}
            style={{
              padding: '0.3rem 0.7rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: sortBy === 'date' ? 'var(--primary-deep-forest)' : 'var(--text-muted)',
              backgroundColor: sortBy === 'date' ? 'var(--bg-beige)' : 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            날짜순
          </button>
          <button
            type="button"
            onClick={() => setSortBy('school')}
            style={{
              padding: '0.3rem 0.7rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: sortBy === 'school' ? 'var(--primary-deep-forest)' : 'var(--text-muted)',
              backgroundColor: sortBy === 'school' ? 'var(--bg-beige)' : 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            학교순
          </button>
        </div>
      )}

      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        총 <strong>{filtered.length}</strong>건 표시
      </div>

      {/* Calendar view */}
      {view === 'calendar' && <CalendarView entries={filtered} />}

      {/* List view */}
      {view === 'list' && sortBy === 'date' && groupedByDate ? (
        <div>
          {groupedByDate.map(([date, entries]) => {
            const isCsat = entries.some(e => e.isCsat);
            return (
              <div
                key={date}
                style={{
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  borderLeft: `5px solid ${isCsat ? 'var(--accent-red)' : 'var(--primary-deep-forest)'}`,
                }}
              >
                <div
                  style={{
                    padding: '0.75rem 1.25rem',
                    backgroundColor: isCsat ? '#fff5f5' : 'var(--bg-beige)',
                    color: 'var(--primary-deep-forest)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  {formatDate(date)}
                  {isCsat && (
                    <span style={{ color: 'var(--accent-red)', marginLeft: '0.75rem' }}>
                      🔴 수능일
                    </span>
                  )}
                </div>
                <div>
                  {entries.map(entry => (
                    <EntryRow key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : view === 'list' ? (
        <div
          style={{
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {filtered.map(entry => (
            <EntryRow key={entry.id} entry={entry} showDate />
          ))}
        </div>
      ) : null}

      <div
        style={{
          marginTop: '2rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-cream)',
          borderRadius: '12px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
        }}
      >
        <strong>출처 및 주의사항</strong>
        <br />
        • 본 표는 정율사관학원 자체 정리본(2026-06-05 기준)을 데이터화한 결과입니다.
        <br />
        • 시간이 빈 항목은 원 출처에 시간 정보가 명시되지 않은 경우로, 응시 전 각 대학 입학처
        공지로 직접 확인 필요합니다.
        <br />
        • 일부 학교의 모집단위 그룹/시간 매핑에는 추정이 포함되어 있을 수 있습니다 (각 항목의 '비고' 참고).
        <br />
        • 변경/오류 발견 시 학원으로 알려주시면 빠르게 수정됩니다.
      </div>
    </section>
  );
};

const EntryRow: React.FC<{ entry: ExamEntry; showDate?: boolean }> = ({ entry, showDate }) => {
  return (
    <div
      style={{
        padding: '0.9rem 1.25rem',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-white)',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.5rem 1rem' }}>
        {showDate && (
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--primary-deep-forest)',
              minWidth: '95px',
            }}
          >
            {formatDate(entry.date)}
          </div>
        )}
        <div
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--primary-deep-forest)',
          }}
        >
          {entry.schoolName}
          {entry.campus && (
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                marginLeft: '0.4rem',
              }}
            >
              {entry.campus}
            </span>
          )}
        </div>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        {entry.groups.length === 0 || (entry.groups.length === 1 && !entry.groups[0].time && !entry.groups[0].units) ? (
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>시간 정보 미명시</div>
        ) : (
          entry.groups.map((g, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                padding: '0.3rem 0',
                fontSize: '0.95rem',
                color: 'var(--text-dark)',
                lineHeight: 1.6,
              }}
            >
              {g.time && (
                <span
                  style={{
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    minWidth: '60px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {g.time}
                </span>
              )}
              <span style={{ flex: '1 1 200px' }}>
                {trackBadge(g.track)}
                {g.units ?? <em style={{ color: 'var(--text-muted)' }}>(모집단위 미명시)</em>}
              </span>
            </div>
          ))
        )}
      </div>
      {entry.note && (
        <div
          style={{
            marginTop: '0.4rem',
            padding: '0.4rem 0.7rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-cream)',
            borderRadius: '6px',
          }}
        >
          ※ {entry.note}
        </div>
      )}
    </div>
  );
};

// === Calendar view ============================================================

const WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarView: React.FC<{ entries: ExamEntry[] }> = ({ entries }) => {
  // Group entries by date
  const byDate = useMemo(() => {
    const m = new Map<string, ExamEntry[]>();
    for (const e of entries) {
      if (!m.has(e.date)) m.set(e.date, []);
      m.get(e.date)!.push(e);
    }
    return m;
  }, [entries]);

  // Compute months covered by any entry (always at minimum 2026-10 ~ 2026-12)
  const months = useMemo(() => {
    const ms = new Set<string>(['2026-10', '2026-11', '2026-12']);
    for (const e of entries) ms.add(e.date.slice(0, 7));
    return Array.from(ms)
      .sort()
      .map(s => {
        const [y, m] = s.split('-').map(Number);
        return { year: y, month: m };
      });
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        조건에 해당하는 시험 일정이 없습니다.
      </div>
    );
  }

  return (
    <div>
      {months.map(({ year, month }) => (
        <MonthCalendar
          key={`${year}-${month}`}
          year={year}
          month={month}
          entriesByDate={byDate}
        />
      ))}
    </div>
  );
};

const MonthCalendar: React.FC<{
  year: number;
  month: number;
  entriesByDate: Map<string, ExamEntry[]>;
}> = ({ year, month, entriesByDate }) => {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; iso: string } | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, iso });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  // Filter weeks that contain at least one cell with data OR are within Oct-Dec range
  const weeks: Array<Array<typeof cells[number]>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 800,
          color: 'var(--primary-deep-forest)',
          marginBottom: '0.5rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'var(--bg-beige)',
          borderRadius: '8px',
          display: 'inline-block',
        }}
      >
        {year}년 {month}월
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '4px',
          backgroundColor: 'var(--bg-white)',
        }}
      >
        {WEEK_LABELS.map((w, i) => (
          <div
            key={w}
            style={{
              textAlign: 'center',
              padding: '0.4rem 0',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: i === 0 ? '#d33' : i === 6 ? '#36c' : 'var(--text-muted)',
              backgroundColor: 'var(--bg-beige)',
              borderRadius: '4px',
            }}
          >
            {w}
          </div>
        ))}
        {cells.map((cell, i) => {
          if (!cell) {
            return (
              <div
                key={i}
                style={{ minHeight: '80px', backgroundColor: 'var(--bg-cream)', borderRadius: '4px' }}
              />
            );
          }
          const entriesForDay = entriesByDate.get(cell.iso) ?? [];
          const isCsat = entriesForDay.some(e => e.isCsat);
          const weekday = new Date(cell.iso).getDay();
          const dateColor = isCsat
            ? '#fff'
            : weekday === 0
              ? '#d33'
              : weekday === 6
                ? '#36c'
                : 'var(--text-dark)';
          return (
            <div
              key={cell.iso}
              style={{
                minHeight: '80px',
                padding: '4px 6px',
                backgroundColor: isCsat
                  ? 'var(--accent-red)'
                  : entriesForDay.length > 0
                    ? '#fafbff'
                    : 'var(--bg-white)',
                border: `1px solid ${entriesForDay.length > 0 ? 'var(--primary-light)' : 'var(--border-color)'}`,
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: dateColor,
                  marginBottom: '2px',
                }}
              >
                {cell.day}
                {isCsat && (
                  <span style={{ fontSize: '0.65rem', marginLeft: '4px', fontWeight: 700 }}>수능</span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {entriesForDay.map(e => (
                  <SchoolChip key={e.id} entry={e} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SchoolChip: React.FC<{ entry: ExamEntry }> = ({ entry }) => {
  // Determine primary track for color + inline label
  const tracks = entry.groups.map(g => g.track).filter(Boolean) as NonNullable<ExamGroup['track']>[];
  const uniqueTracks = Array.from(new Set(tracks));
  const primary = uniqueTracks[0];
  const color = primary ? TRACK_COLORS[primary] : 'var(--primary-deep-forest)';

  // Short school name
  const shortName = entry.schoolName
    .replace(/학교$/, '')
    .replace(/대학교$/, '대')
    .replace(/여자대학교$/, '여대');
  const nameHasParens = /[()()]/.test(shortName);

  // Suffix priority: existing parens > campus mark > track label
  const campusMark = entry.campus?.includes('미래') ? '(미)'
    : entry.campus?.includes('세종') ? '(세)'
    : entry.campus?.includes('국제') ? '(국)'
    : entry.campus?.includes('ERICA') ? '(E)'
    : entry.campus?.includes('다빈치') ? '(다)'
    : '';
  let suffix = '';
  if (nameHasParens) suffix = '';
  else if (campusMark) suffix = campusMark;
  else if (primary) suffix = `(${primary})`;

  return (
    <div
      title={`${entry.schoolName}${entry.campus ? ' ' + entry.campus : ''}${
        uniqueTracks.length ? ' / ' + uniqueTracks.join('·') : ''
      }${
        entry.groups[0]?.time ? ' / ' + entry.groups.map(g => g.time).filter(Boolean).join(', ') : ''
      }`}
      style={{
        fontSize: '0.7rem',
        lineHeight: 1.2,
        padding: '1px 4px',
        color: '#fff',
        backgroundColor: color,
        borderRadius: '3px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {shortName}
      {suffix}
    </div>
  );
};
