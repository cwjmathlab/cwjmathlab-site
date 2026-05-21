export type Event = {
  id: string;
  title: string;
  date: string;     // 'YYYY-MM-DD'
  time: string;     // 'HH:MM' 24h
  location: string;
  audience: string;
  summary: string;
  link?: string;    // 클릭 시 이동할 경로. 없으면 #event 스크롤
};

export const events: Event[] = [
  {
    id: '2026-08-02-skku-special',
    title: '성균관대 수리논술 대비특강 (4회) — 8/2 개강',
    date: '2026-08-02',
    time: '13:00',
    location: '문의 시 안내',
    audience: '고3 · N수생',
    summary:
      '수학·수학Ⅰ·수학Ⅱ — 선택과목 무관. ' +
      '성균관대 동문 강사가 4회에 걸쳐 압축 지도하는 단기 특강입니다.',
    link: '/sungkyunkwan-special',
  },
  {
    id: '2026-06-05-jeongyul',
    title: '2027 6월 모의평가 결과 분석 + 수리논술 지원 전략 설명회',
    date: '2026-06-05',
    time: '19:30',
    location: '정율사관학원 6층 대강당',
    audience: '고3 · 재수생 / 학부모',
    summary:
      '2027학년도 6월 모의평가 결과를 토대로 수리논술 학습 방향을 진단하고, ' +
      '올해 지원 전략을 함께 점검합니다.',
  },
];

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseISO(date: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getNextEvent(
  today: Date = new Date(),
  source: Event[] = events,
): Event | null {
  const todayStart = startOfDay(today);
  const upcoming = source
    .filter(e => parseISO(e.date) >= todayStart)
    .sort((a, b) => a.date.localeCompare(b.date));
  return upcoming[0] ?? null;
}

export function formatEventDate(date: string): string {
  const d = parseISO(date);
  return `${d.getMonth() + 1}/${d.getDate()}(${DAYS[d.getDay()]})`;
}
