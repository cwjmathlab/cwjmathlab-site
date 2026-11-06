// 가천대(의한약)·삼육대(약학) 실전모의논술: 11/7에 1회, 이후 하루에 한 회씩 10회까지 공개, 11/20까지만 공개
export const MOCK_TOTAL = 10;
const FIRST_RELEASE = [2026, 10, 7] as const; // 2026-11-07 (월은 0부터)
const CLOSE_DAY = 14; // 1회 공개일 + 13일 = 11/20(금)이 마지막 공개일
export const MOCK_CLOSE_LABEL = '11/20(금)';
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const releaseDate = (n: number) => new Date(FIRST_RELEASE[0], FIRST_RELEASE[1], FIRST_RELEASE[2] + n - 1);

/** 오늘(방문자 기기 날짜) 기준 공개된 회차 수 0~10. 공개 전·마감 후는 0 */
export function releasedMockCount(today: Date = new Date()): number {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const days = Math.floor((start - releaseDate(1).getTime()) / 86400000);
  if (days + 1 > CLOSE_DAY) return 0;
  return Math.max(0, Math.min(MOCK_TOTAL, days + 1));
}

/** 예: 8 → "11/14(토)" */
export function mockReleaseLabel(n: number): string {
  const d = releaseDate(n);
  return `${d.getMonth() + 1}/${d.getDate()}(${DAYS[d.getDay()]})`;
}

export function mockFiles(n: number) {
  const nn = String(n).padStart(2, '0');
  return [
    { label: `${n}회 문제지`, href: `/medical/mock${nn}-problems.pdf`, name: `가천대(의한약) 삼육대(약학) 실전모의논술 ${nn}회 문제지.pdf`, primary: true },
    { label: `${n}회 해설지`, href: `/medical/mock${nn}-solutions.pdf`, name: `가천대(의한약) 삼육대(약학) 실전모의논술 ${nn}회 해설지.pdf`, primary: false },
  ];
}
