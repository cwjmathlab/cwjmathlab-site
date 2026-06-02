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
    title: '수학의 반전, 대학 라인 역전의 기회 — 6/5 수리논술 설명회',
    date: '2026-06-05',
    time: '19:30',
    location: '상동역 5번 출구 비잔티움 6층 정율사관학원',
    audience: '고3 · N수생 · 학부모',
    summary:
      '대학별 출제 경향 · 학생 수준별 전략 · 실제 합격 사례까지. ' +
      '정율사관학원 조우제 대표강사가 직접 설명합니다.',
    link: '/#jeongyul-event',
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
