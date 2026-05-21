import { describe, it, expect } from 'vitest';
import { skkuSpecial } from './skkuSpecial';

describe('skkuSpecial 데이터', () => {
  it('course.sessions는 4개의 ISO 날짜 (일요일)를 가진다', () => {
    expect(skkuSpecial.course.sessions).toHaveLength(4);
    for (const date of skkuSpecial.course.sessions) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const [y, m, d] = date.split('-').map(Number);
      expect(new Date(y, m - 1, d).getDay()).toBe(0); // 일요일
    }
  });

  it('exam.scope에는 미적분·확통·기하가 포함되지 않는다', () => {
    expect(skkuSpecial.exam.scope).toEqual(['수학', '수학Ⅰ', '수학Ⅱ']);
    expect(skkuSpecial.exam.excludedScope).toEqual(['미적분', '확률과 통계', '기하']);
  });

  it('competition.overall은 모집·지원·경쟁률·충원율을 가진다', () => {
    const { capacity, applicants, ratio, fillRate } = skkuSpecial.competition.overall;
    expect(capacity).toBe(204);
    expect(applicants).toBe(26_101);
    expect(ratio).toBe(127.95);
    expect(fillRate).toBe(15.7);
  });

  it('competition.byUnit는 최소 19개 이상의 모집단위를 가진다', () => {
    expect(skkuSpecial.competition.byUnit.length).toBeGreaterThanOrEqual(19);
    for (const unit of skkuSpecial.competition.byUnit) {
      expect(unit.name.length).toBeGreaterThan(0);
      expect(unit.capacity).toBeGreaterThan(0);
      expect(unit.ratio).toBeGreaterThan(0);
    }
  });

  it('contact는 phone과 kakaoOpenChat을 가진다', () => {
    expect(skkuSpecial.contact.phone).toBe('0323219937');
    expect(skkuSpecial.contact.kakaoOpenChat).toBe('https://open.kakao.com/o/gtz16Omh');
  });

  it('faq는 최소 4개 이상의 Q&A를 가진다', () => {
    expect(skkuSpecial.faq.length).toBeGreaterThanOrEqual(4);
    for (const item of skkuSpecial.faq) {
      expect(item.q.length).toBeGreaterThan(0);
      expect(item.a.length).toBeGreaterThan(0);
    }
  });

  it('sessionArchive는 빈 배열로 시작 (사진 추가되면 채워짐)', () => {
    expect(Array.isArray(skkuSpecial.sessionArchive)).toBe(true);
  });
});
