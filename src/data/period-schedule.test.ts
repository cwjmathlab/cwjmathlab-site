import { describe, it, expect } from 'vitest';
import { periodData } from './nonsulData';
import { examSchedule } from './examSchedule';

// Theme 02(시기별 분류)는 시험일정표(examSchedule)와 같은 사실을 다르게 보여주는 표다.
// 두 데이터가 어긋나면 사이트 안에서 서로 모순된 날짜를 말하게 되므로 여기서 막는다.

const WD = ['일', '월', '화', '수', '목', '금', '토'];
const DAY = 864e5;
const utc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};
/** '11/28(토)' → '2026-11-28' */
const toIso = (label: string) => {
  const m = label.match(/^(\d{1,2})\/(\d{1,2})\((.)\)$/);
  if (!m) throw new Error(`시험일 표기 형식이 아님: ${label}`);
  const [, mm, dd, wd] = m;
  const iso = `2026-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  const actual = WD[new Date(utc(iso)).getUTCDay()];
  if (actual !== wd) throw new Error(`${label} 의 요일이 틀렸다 — 실제 ${actual}요일`);
  return iso;
};
/** 금요일 시작 주(금~목)의 금요일 — 주말 앵커 묶음의 키 */
const friOf = (iso: string) => {
  const t = utc(iso);
  return t - ((new Date(t).getUTCDay() + 2) % 7) * DAY;
};
/** '고려대(세종캠)' → '고려대', '세종대(자유전공학부)' → '세종대' */
const base = (name: string) => name.trim().replace(/\([^()]*\)$/, '').trim();

const scheduleByDate = new Map<string, Set<string>>();
for (const e of examSchedule) {
  if (e.isCsat) continue;
  if (!scheduleByDate.has(e.date)) scheduleByDate.set(e.date, new Set());
  scheduleByDate.get(e.date)!.add(base(e.schoolName));
}

describe('Theme 02 시기별 분류 (주말 앵커 기준)', () => {
  it('모든 행의 시험일 표기가 유효하고 요일이 실제 달력과 맞는다', () => {
    for (const row of periodData) expect(() => toIso(row.date)).not.toThrow();
  });

  it('시험일이 중복되지 않고 날짜순으로 정렬돼 있다', () => {
    const isos = periodData.map(r => toIso(r.date));
    expect(new Set(isos).size).toBe(isos.length);
    expect([...isos].sort()).toEqual(isos);
  });

  it('같은 주말 묶음에 속한 행은 모두 같은 주(금~목)에 있다', () => {
    const weekByPeriod = new Map<string, number>();
    for (const row of periodData) {
      const fri = friOf(toIso(row.date));
      const seen = weekByPeriod.get(row.period);
      if (seen === undefined) weekByPeriod.set(row.period, fri);
      else expect(fri, `${row.period} 의 ${row.date}`).toBe(seen);
    }
    // 서로 다른 묶음은 서로 다른 주여야 한다
    const weeks = [...weekByPeriod.values()];
    expect(new Set(weeks).size).toBe(weeks.length);
  });

  it('묶음 이름의 주말 날짜가 실제 그 주의 토요일과 일치한다', () => {
    for (const row of periodData) {
      const sat = new Date(friOf(toIso(row.date)) + DAY);
      const label = `${sat.getUTCMonth() + 1}/${sat.getUTCDate()} 주말`;
      expect(row.period, `${row.date} 의 묶음 이름`).toContain(label);
    }
  });

  it('수능(2026-11-19) 기준 묶음 이름의 전/후·주차가 맞는다', () => {
    const csatFri = friOf('2026-11-19');
    for (const row of periodData) {
      const i = Math.round((friOf(toIso(row.date)) - csatFri) / (7 * DAY));
      const expected = i < 0 ? '수능 전' : i === 1 ? '수능 직후' : `수능 ${i - 1}주 후`;
      expect(row.period, `${row.date}`).toContain(expected);
    }
  });

  it('모든 날짜의 대학 목록이 시험일정표와 정확히 일치한다', () => {
    for (const row of periodData) {
      const iso = toIso(row.date);
      const mine = new Set(row.universities.split(/,\s*/).map(base));
      const theirs = scheduleByDate.get(iso);
      expect(theirs, `${row.date} 가 시험일정표에 없다`).toBeDefined();
      expect([...mine].sort(), `${row.date} 대학 목록`).toEqual([...theirs!].sort());
    }
  });

  it('시험일정표의 모든 시험일이 표에 빠짐없이 실려 있다', () => {
    const covered = new Set(periodData.map(r => toIso(r.date)));
    expect([...scheduleByDate.keys()].filter(d => !covered.has(d))).toEqual([]);
  });

  it('각 날짜의 대학은 가나다순으로 정렬돼 있다', () => {
    for (const row of periodData) {
      const list = row.universities.split(/,\s*/);
      expect([...list].sort((a, b) => a.localeCompare(b, 'ko')), `${row.date}`).toEqual(list);
    }
  });
});
