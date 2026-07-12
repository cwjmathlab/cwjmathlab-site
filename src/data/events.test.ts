import { describe, it, expect } from 'vitest';
import {
  events,
  getNextEvent,
  formatEventDate,
  type Event,
} from './events';

describe('events 데이터', () => {
  it('각 이벤트는 id, title, date(ISO), time, location, audience, summary를 가진다', () => {
    for (const ev of events) {
      expect(ev.id).toMatch(/^[a-z0-9-]+$/);
      expect(ev.title.length).toBeGreaterThan(0);
      expect(ev.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(ev.time).toMatch(/^\d{2}:\d{2}$/);
      expect(ev.location.length).toBeGreaterThan(0);
      expect(ev.audience.length).toBeGreaterThan(0);
      expect(ev.summary.length).toBeGreaterThan(0);
    }
  });

  it('id는 중복되지 않는다', () => {
    const ids = events.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('link 필드는 옵셔널이고, 있으면 슬래시로 시작하거나 외부 URL이다', () => {
    for (const ev of events) {
      if (ev.link !== undefined) {
        expect(typeof ev.link).toBe('string');
        expect(ev.link.startsWith('/') || ev.link.startsWith('http')).toBe(true);
      }
    }
  });
});

describe('getNextEvent', () => {
  const sample: Event[] = [
    { id: 'a', title: 'A', date: '2026-06-05', time: '19:30',
      location: 'X', audience: 'Y', summary: 'Z' },
    { id: 'b', title: 'B', date: '2026-07-10', time: '14:00',
      location: 'X', audience: 'Y', summary: 'Z' },
    { id: 'c', title: 'C', date: '2026-04-01', time: '10:00',
      location: 'X', audience: 'Y', summary: 'Z' },
  ];

  it('오늘이 6/5 자정 이전이면 6/5 회차를 반환한다', () => {
    const today = new Date('2026-06-04T23:59:59');
    expect(getNextEvent(today, sample)?.id).toBe('a');
  });

  it('6/5 당일 0시에도 6/5 회차를 반환한다 (당일은 표시)', () => {
    const today = new Date('2026-06-05T00:00:00');
    expect(getNextEvent(today, sample)?.id).toBe('a');
  });

  it('6/5 종일 23:59에도 6/5 회차를 반환한다', () => {
    const today = new Date('2026-06-05T23:59:59');
    expect(getNextEvent(today, sample)?.id).toBe('a');
  });

  it('6/6 0시부터는 6/5 회차가 사라지고 다음 회차를 반환한다', () => {
    const today = new Date('2026-06-06T00:00:00');
    expect(getNextEvent(today, sample)?.id).toBe('b');
  });

  it('모든 회차가 지났으면 null을 반환한다', () => {
    const today = new Date('2027-01-01T00:00:00');
    expect(getNextEvent(today, sample)).toBeNull();
  });

  it('인자 없이 호출 가능 (기본값 = 오늘 + 모듈 events)', () => {
    expect(() => getNextEvent()).not.toThrow();
  });
});

describe('formatEventDate', () => {
  it("'2026-06-05'를 '6/5(금)'으로 포맷한다", () => {
    expect(formatEventDate('2026-06-05')).toBe('6/5(금)');
  });

  it("'2026-12-31'를 '12/31(목)'으로 포맷한다", () => {
    expect(formatEventDate('2026-12-31')).toBe('12/31(목)');
  });

  it("'2026-01-01'를 '1/1(목)'으로 포맷한다", () => {
    expect(formatEventDate('2026-01-01')).toBe('1/1(목)');
  });
});
