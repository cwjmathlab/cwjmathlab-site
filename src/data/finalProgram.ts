// 조우제 수리논술 FINAL 2026 — 파이널 안내서(Q.E.D.) 확정본 기준
// 시험일은 사이트 2027 DATA 시험일정표(examSchedule.ts)와 동일한 학원 정리본 기준이며, 최종 확인은 각 대학 입학처 공지.

export type FinalSession = { date: string; label?: string; special?: boolean };

export type FinalProgram = {
  no: number;
  stage: 1 | 2 | 3;
  name: string;
  sub?: string;
  kind: string;
  day: string;
  time: string;
  period: string;
  sessions?: FinalSession[];
  live?: { date: string; time: string };
  examDate?: string;
  note?: string;
  done?: boolean;
  highlight?: boolean;
};

export const finalMeta = {
  year: '2026 FINAL',
  range: '2026년 8월 — 12월',
  universities: 15,
  programs: 16,
  slogan: '증명을 완료하다.',
  latin: 'Quod Erat Demonstrandum.',
  intro:
    '조우제 수리논술 FINAL은 각 대학의 실제 응시환경을 그대로 재현하여 실전 감각을 완성하고, 시험지 · 시험시간 · 답안지까지 실전 그대로 진행합니다. 학교별 출제 특징을 최종 재정립하여 출제 예상 문제를 총정리하는 프로그램입니다.',
  qed: '“증명되어야 할 것이었다” — 유클리드 이래 수학 증명의 종결을 알리는 표식. 각 대학에 대한 학생 스스로의 증명을 완결한다는 뜻.',
  suneung: '2026-11-19',
};

export const finalStages = [
  { stage: 1 as const, roman: 'I', title: '1단계 · 수능 전 파이널', headline: '수능 전 실전 감각 완성', range: '08.02 → 10.04', count: '6개 과정', goal: '수능 전, 각 학교 실제 응시환경을 그대로 재현하여 실전 감각과 시간 관리 능력을 완성한다.' },
  { stage: 2 as const, roman: 'II', title: '2단계 · 수능 후 시험 대학', headline: '직전 FINAL', range: '10.11 → 11.20', count: '4개 과정 · 7개 대학 · 실전 11.20(금)', goal: '수능 직전, 실전 그 자체. 시험 전날 마지막 실전으로 감각을 고정한다.' },
  { stage: 3 as const, roman: 'III', title: '3단계 · 논술주간 · 최종 파이널', headline: '최종 마감 프로그램', range: '11.23 → 12.05', count: '6개 과정 · 최종 마감', goal: '수능 이후, 실전 그 자체. 지원 대학에 대한 자신의 증명을 완결한다.' },
];

export const finalPrograms: FinalProgram[] = [
  // ───────── I. 수능 전 ─────────
  {
    no: 1, stage: 1, name: '단국대', kind: '파이널 · 총 5회', day: '토요일 오전', time: '09:00 — 12:00 (180분)', period: '09.05 → 10.03',
    sessions: [{ date: '09.05 토' }, { date: '09.12 토' }, { date: '09.19 토' }, { date: '09.26 토' }, { date: '10.03 토' }],
    examDate: '10.17(토)',
  },
  {
    no: 2, stage: 1, name: '시립대', kind: '파이널 · 총 4회 + 추석특강 1회', day: '일요일 저녁', time: '19:00 — 22:00 (180분)', period: '09.06 → 09.27',
    sessions: [{ date: '09.06 일' }, { date: '09.13 일' }, { date: '09.20 일' }, { date: '09.24 목 15시', label: '추석특강', special: true }, { date: '09.27 일' }],
    note: '+ 09.24(목) 15:00 — 18:00 추석특강', examDate: '10.03(토)',
  },
  {
    no: 3, stage: 1, name: '가톨릭대', kind: '추석특강 · 2회', day: '목 · 금 오후', time: '12:00 — 15:00 (180분)', period: '09.24 목 · 09.25 금',
    sessions: [{ date: '09.24 목' }, { date: '09.25 금' }], examDate: '10.11(일) · 의예/약학 11.22(일)',
  },
  {
    no: 4, stage: 1, name: '홍익대', kind: '추석특강 · 2회', day: '목 · 금 오전', time: '09:00 — 12:00 (180분)', period: '09.24 목 · 09.25 금',
    sessions: [{ date: '09.24 목' }, { date: '09.25 금' }], examDate: '10.03(토)',
  },
  {
    no: 5, stage: 1, name: '성균관대', kind: 'Pre-Final · 총 4회', day: '일요일 오후', time: '13:00 — 16:00 (180분)', period: '08.02 → 08.23',
    sessions: [{ date: '08.02 일' }, { date: '08.09 일' }, { date: '08.16 일' }, { date: '08.23 일' }],
    note: '실전 파이널 11.20(금) 12시 · 2단계', examDate: '11.22(일)', done: true,
  },
  {
    no: 6, stage: 1, name: '중앙대', sub: '창의형', kind: 'Final · 총 5회', day: '일요일 오후', time: '13:00 — 16:00 (180분)', period: '09.06 → 10.04',
    sessions: [{ date: '09.06 일' }, { date: '09.13 일' }, { date: '09.20 일' }, { date: '09.27 일' }, { date: '10.04 일' }],
    examDate: '10.11(일)',
  },
  // ───────── II. 수능 후 시험 대학 · 직전 FINAL ─────────
  {
    no: 7, stage: 2, name: '숭실 · 항공대', sub: '공학', kind: '파이널 · 5회 + 실전', day: '토요일 오전', time: '09:00 — 12:00 (180분)', period: '10.17 → 11.14',
    sessions: [{ date: '10.17 토' }, { date: '10.24 토' }, { date: '10.31 토' }, { date: '11.07 토' }, { date: '11.14 토' }],
    live: { date: '11.20 금', time: '오전 9시' }, examDate: '11.21(토)',
  },
  {
    no: 8, stage: 2, name: '고려 · 서강대', kind: '파이널 · 5회 + 실전', day: '일요일 저녁', time: '19:00 — 22:00 (180분)', period: '10.11 → 11.08',
    sessions: [{ date: '10.11 일' }, { date: '10.18 일' }, { date: '10.25 일' }, { date: '11.01 일' }, { date: '11.08 일' }],
    live: { date: '11.20 금', time: '저녁 19시' }, examDate: '11.21(토)',
  },
  {
    no: 9, stage: 2, name: '경희 · 동국대', kind: '파이널 · 5회 + 실전', day: '일요일 오후', time: '16:00 — 19:00 (180분)', period: '10.11 → 11.08',
    sessions: [{ date: '10.11 일' }, { date: '10.18 일' }, { date: '10.25 일' }, { date: '11.01 일' }, { date: '11.08 일' }],
    live: { date: '11.20 금', time: '오후 16시' }, examDate: '경희 11.21(토)·11.22(일) · 동국 11.22(일)',
  },
  {
    no: 10, stage: 2, name: '성균관대', kind: '실전 파이널 · 1회', day: '금요일 낮', time: '12:00 — 15:00 (180분)', period: '11.20 금',
    live: { date: '11.20 금', time: '낮 12시' }, note: '8월 Pre-Final 수강생 대상', examDate: '11.22(일)',
  },
  // ───────── III. 논술주간 · 최종 파이널 ─────────
  { no: 11, stage: 3, name: '세종대', kind: '파이널', day: '5일간 실전', time: '오전 09:00 — 12:00', period: '11.23 → 11.27', examDate: '11.28(토) 자유전공 · 11.29(일) 자연' },
  { no: 12, stage: 3, name: '중앙대', sub: '일반', kind: '파이널', day: '5일간 실전', time: '오전 09:00 — 12:00', period: '11.23 → 11.27', examDate: '11.28(토)' },
  { no: 13, stage: 3, name: '한양대', kind: '파이널', day: '5일간 실전', time: '낮 12:00 — 15:00', period: '11.23 → 11.27', examDate: '11.29(일)' },
  { no: 14, stage: 3, name: '논술 미적분', sub: '압축특강', kind: '압축특강', day: '5일간 · 미적분 총정리', time: '오후 15:00 — 18:00', period: '11.23 → 11.27', highlight: true },
  { no: 15, stage: 3, name: '인하대', sub: '프리', kind: '프리 파이널', day: '5일간 실전 · 라스트로 연계', time: '저녁 19:00 — 22:00', period: '11.23 → 11.27', examDate: '12.06(일)' },
  { no: 16, stage: 3, name: '인하대', sub: '라스트', kind: '★ 라스트 파이널', day: '총 6회 · 수능 후 최종 마감', time: '오후 16:00 — 19:00', period: '11.30 → 12.05', examDate: '12.06(일)', highlight: true },
];

/** 논술주간 하루 시간표 (11.23 월 → 11.27 금, 매일 동일) */
export const finalWeekTimetable = [
  { slot: '09:00 — 12:00', programs: ['세종대', '중앙대(일반)'] },
  { slot: '12:00 — 15:00', programs: ['한양대'] },
  { slot: '15:00 — 18:00', programs: ['논술 미적분 압축특강'] },
  { slot: '19:00 — 22:00', programs: ['인하대(프리)'] },
];

export const finalLastWeek = { range: '11.30(월) → 12.05(토) · 총 6회', slot: '16:00 — 19:00', program: '★ 인하대(라스트)' };

export const finalContact = { phone: '0323219937', kakaoOpenChat: 'https://open.kakao.com/o/gtz16Omh', desk: '수강 신청·문의 → 학원 데스크' };
