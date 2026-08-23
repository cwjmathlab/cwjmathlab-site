export type CompetitionUnit = {
  name: string;
  capacity: number;
  applicants: number;
  ratio: number;
  fillRate: number;
};

export type CutUnit = {
  name: string;
  ratio: number;
  cut: number;
};

export type CutSession = {
  session: string;
  units: CutUnit[];
};

export type CutYear = {
  year: number;
  sessions: CutSession[];
};

export type MinReqTier = '3합4' | '3합5' | '3합6';

export type AvgScoreUnit = {
  name: string;
  avg: number;
  tier: MinReqTier;
};

export type AvgScoreSession = {
  session: string;
  units: AvgScoreUnit[];
};

export type AvgScoreYear = {
  year: number;
  sessions: AvgScoreSession[];
};

export type SessionArchiveEntry = {
  session: number;
  date: string;
  images: string[];
};

export type FaqItem = {
  q: string;
  a: string;
  action?: { label: string; path: string };
};

export const skkuSpecial = {
  course: {
    sessions: [
      '2026-08-02',
      '2026-08-09',
      '2026-08-16',
      '2026-08-23',
    ],
    timeRange: '13:00 – 16:00',
    fee: 320_000,
    materialFee: 40_000,
    target: '고3 · N수생',
  },
  exam: {
    date: '2026-11-22',
    venueAnnounceDate: null as string | null,
    sourceNote: '2027학년도 기준 · 시험장 발표일은 성균관대 입학처 공지 예정',
    duration: 100,
    questions: 3,
    scope: ['수학', '수학Ⅰ', '수학Ⅱ'] as const,
    excludedScope: ['미적분', '확률과 통계', '기하'] as const,
  },
  competition: {
    year: 2025,
    overall: { capacity: 204, applicants: 26_101, ratio: 127.95, fillRate: 15.7 },
    byUnit: [
      { name: '자유전공계열', capacity: 15, applicants: 1_747, ratio: 116.47, fillRate: 13.3 },
      { name: '사회과학계열', capacity: 5, applicants: 674, ratio: 134.80, fillRate: 0.0 },
      { name: '경영학과', capacity: 5, applicants: 624, ratio: 124.80, fillRate: 20.0 },
      { name: '글로벌리더학부', capacity: 5, applicants: 401, ratio: 80.20, fillRate: 20.0 },
      { name: '글로벌경제학과', capacity: 5, applicants: 413, ratio: 82.60, fillRate: 20.0 },
      { name: '글로벌경영학과', capacity: 5, applicants: 469, ratio: 93.80, fillRate: 0.0 },
      { name: '자연과학계열', capacity: 25, applicants: 3_085, ratio: 123.40, fillRate: 28.0 },
      { name: '전자전기공학부', capacity: 25, applicants: 2_558, ratio: 102.32, fillRate: 20.0 },
      { name: '공학계열', capacity: 45, applicants: 5_563, ratio: 123.62, fillRate: 11.1 },
      { name: '소프트웨어학과', capacity: 10, applicants: 800, ratio: 80.00, fillRate: 30.0 },
      { name: '반도체시스템공학과', capacity: 10, applicants: 1_062, ratio: 106.20, fillRate: 0.0 },
      { name: '지능형소프트웨어학과', capacity: 5, applicants: 425, ratio: 85.00, fillRate: 0.0 },
      { name: '글로벌바이오메디컬공학과', capacity: 10, applicants: 814, ratio: 81.40, fillRate: 10.0 },
      { name: '반도체융합공학과', capacity: 5, applicants: 404, ratio: 80.80, fillRate: 0.0 },
      { name: '에너지학과', capacity: 5, applicants: 372, ratio: 74.40, fillRate: 0.0 },
      { name: '약학과', capacity: 5, applicants: 2_577, ratio: 515.40, fillRate: 20.0 },
      { name: '의예과', capacity: 5, applicants: 2_835, ratio: 567.00, fillRate: 20.0 },
      { name: '건설환경공학부', capacity: 10, applicants: 892, ratio: 89.20, fillRate: 40.0 },
      { name: '글로벌융합학부', capacity: 4, applicants: 386, ratio: 96.50, fillRate: 0.0 },
    ] satisfies CompetitionUnit[],
  },
  cutHistory: [
    {
      year: 2025,
      sessions: [
        {
          session: '1교시',
          units: [
            { name: '소프트웨어학과', ratio: 83.7, cut: 67 },
            { name: '반도체시스템공학과', ratio: 104.8, cut: 77 },
            { name: '약학과', ratio: 475.2, cut: 86.5 },
            { name: '공학계열', ratio: 104.45, cut: 69 },
          ],
        },
        {
          session: '2교시',
          units: [
            { name: '반도체융합공학과', ratio: 66.6, cut: 56 },
            { name: '에너지학과', ratio: 71, cut: 59 },
            { name: '글로벌바이오메디컬공학과', ratio: 70.1, cut: 63.5 },
            { name: '지능형소프트웨어학과', ratio: 87.6, cut: 74.5 },
            { name: '건설환경공학부', ratio: 51.72, cut: 56 },
            { name: '자연과학계열', ratio: 99, cut: 66.5 },
            { name: '전자전기공학부', ratio: 93.07, cut: 68.5 },
          ],
        },
        {
          session: '3교시',
          units: [
            { name: '의예과', ratio: 412.4, cut: 89.5 },
            { name: '자유전공계열', ratio: 95.73, cut: 58 },
            { name: '글로벌융합학부', ratio: 101.13, cut: 56.5 },
          ],
        },
      ],
    },
    {
      year: 2024,
      sessions: [
        {
          session: '1교시',
          units: [
            { name: '전자전기공학부', ratio: 76.14, cut: 46 },
            { name: '공학계열', ratio: 93.56, cut: 44 },
            { name: '자연과학계열', ratio: 86.1, cut: 44 },
            { name: '글로벌융합학부', ratio: 74.4, cut: 44 },
          ],
        },
        {
          session: '2교시',
          units: [
            { name: '의예과', ratio: 631.4, cut: 91.5 },
            { name: '약학과', ratio: 580, cut: 78.5 },
            { name: '지능형소프트웨어학과', ratio: 111.6, cut: 72.5 },
            { name: '반도체시스템공학과', ratio: 140.7, cut: 71 },
            { name: '소프트웨어학과', ratio: 122.9, cut: 67.5 },
            { name: '글로벌바이오메디컬공학과', ratio: 104.5, cut: 66 },
            { name: '반도체융합공학과', ratio: 73.8, cut: 62.5 },
            { name: '에너지학과', ratio: 68, cut: 57 },
            { name: '건설환경공학부', ratio: 54.24, cut: 50.5 },
          ],
        },
      ],
    },
  ] satisfies CutYear[],
  // 2026학년도 학과별 수리논술 평균점수 (성균관대 입학처 설명회 자료)
  // 합격컷이 아니라 응시자 평균이며, 막대 색상은 해당 모집단위의 수능최저 기준입니다.
  avgScoreHistory: [
    {
      year: 2026,
      sessions: [
        {
          session: '1교시',
          units: [
            { name: '반도체시스템공학과', avg: 64, tier: '3합5' },
            { name: '지능형소프트웨어학과', avg: 58, tier: '3합5' },
            { name: '에너지학과', avg: 58, tier: '3합5' },
            { name: '반도체융합공학과', avg: 57, tier: '3합5' },
            { name: '글로벌리더학부', avg: 56, tier: '3합5' },
            { name: '컴퓨터공학과', avg: 55, tier: '3합5' },
            { name: '글로벌바이오메디컬공학과', avg: 48, tier: '3합5' },
            { name: '글로벌경제학과', avg: 47, tier: '3합5' },
            { name: '사회과학계열', avg: 52, tier: '3합6' },
            { name: '글로벌AI융합학부', avg: 50, tier: '3합6' },
            { name: '건설환경공학부', avg: 46, tier: '3합6' },
          ],
        },
        {
          session: '2교시',
          units: [
            { name: '공학계열', avg: 58, tier: '3합6' },
            { name: '전자전기정보공학부', avg: 56, tier: '3합6' },
            { name: '자연과학계열', avg: 53, tier: '3합6' },
          ],
        },
        {
          session: '3교시',
          units: [
            { name: '의예과', avg: 87, tier: '3합4' },
            { name: '약학과', avg: 69, tier: '3합5' },
            { name: '자유전공계열', avg: 56, tier: '3합5' },
            { name: '글로벌경영학과', avg: 55, tier: '3합5' },
            { name: '경영학과', avg: 52, tier: '3합6' },
          ],
        },
      ],
    },
  ] satisfies AvgScoreYear[],
  slogan: '예로부터 나라의 인재는 성균에 모여 왔으니, 그대 머묾이 우연이겠는가',
  contact: {
    phone: '0323219937',
    kakaoOpenChat: 'https://open.kakao.com/o/gtz16Omh',
  },
  faq: [
    {
      q: '확통 선택자도 정말 동일한 시험인가요?',
      a: '네. 성균관대 모집요강의 출제범위는 "수학, 수학Ⅰ, 수학Ⅱ"로 명시되어 있으며, 선택과목(미적분·확률과 통계·기하)은 출제 범위에 포함되지 않습니다.',
    },
    {
      q: '수능 최저는 어떻게 맞추나요?',
      a: '모집단위별로 3합 5/6 기준이며, 탐구 2과목 평균 또는 과탐 상위 1과목 반영 등 룰이 복잡합니다.',
      action: { label: '자세한 내용 확인하기', path: '/schools/sungkyunkwan' },
    },
    {
      q: '언어형/수리형 교차 지원 가능한가요?',
      a: '가능합니다. 두 전형은 별개로 운영되며 중복 지원 가능합니다. 단, 이과생이 언어형을 지원하는 경우 수학 영역 의무 반영 함정이 있으니 주의가 필요합니다.',
    },
    {
      q: '수업 장소는 어디인가요?',
      a: '문의 시 안내드립니다. 우측 하단 전화 또는 카톡으로 연락 주세요.',
    },
  ] as FaqItem[],
  sessionArchive: [] as SessionArchiveEntry[],
};
