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

// 당분간 설명회 없음 — 재개 시 아래 배열에 이벤트를 추가하면 배너·About 섹션이 자동 표시됨
export const events: Event[] = [];

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
