import { describe, expect, it } from 'vitest';
import { releasedMockCount, mockReleaseLabel, mockFiles } from './mockExams';

describe('실전모의논술 하루 한 회 공개', () => {
  it('공개 회차 수', () => {
    expect(releasedMockCount(new Date(2026, 10, 6, 23, 59))).toBe(0);
    expect(releasedMockCount(new Date(2026, 10, 7, 0, 0))).toBe(1);
    expect(releasedMockCount(new Date(2026, 10, 8, 9, 0))).toBe(2);
    expect(releasedMockCount(new Date(2026, 10, 16))).toBe(10);
    expect(releasedMockCount(new Date(2026, 10, 20, 23, 59))).toBe(10);
    expect(releasedMockCount(new Date(2026, 10, 21))).toBe(0);
  });
  it('공개일 표기와 파일 경로', () => {
    expect(mockReleaseLabel(2)).toBe('11/8(일)');
    expect(mockReleaseLabel(10)).toBe('11/16(월)');
    expect(mockFiles(10)[0].href).toBe('/medical/mock10-problems.pdf');
  });
});
