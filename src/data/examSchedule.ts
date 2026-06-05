// 2027학년도 수시 논술 시험 일정 (출처: 정율사관학원 정리본 이미지 3장, 2026-06-05)
// 자연·인문 모두 수록. 시간/모집단위가 PDF 또는 출처에 없는 경우 빈 값.

export type ExamGroup = {
  time?: string; // 'HH:MM' 24h, 미명시는 undefined
  units?: string; // 콤마 구분 모집단위 텍스트 (대표 그룹명 사용)
  track?: '자연' | '인문' | '의약학' | '체육' | '예체능' | '통합' | '기타';
};

export type ExamEntry = {
  id: string;
  date: string; // 'YYYY-MM-DD'
  schoolName: string;
  schoolId?: string; // src/data/schools 와 매칭
  campus?: string;
  groups: ExamGroup[];
  isCsat?: boolean;
  note?: string;
};

// === 시험 일정 데이터 ===========================================================
// 사용자 정리본 이미지 1·2(학교별 시간표) 기준. 이미지 3(달력형)도 동일 데이터.
// "확인 필요" 표시는 출처에 시간이 명시되지 않은 항목.

export const examSchedule: ExamEntry[] = [
  // === 10월 ===
  {
    id: '2026-10-03-uos',
    date: '2026-10-03',
    schoolName: '서울시립대',
    schoolId: 'uos',
    groups: [{ time: '10:00' }],
  },
  {
    id: '2026-10-03-sungshin',
    date: '2026-10-03',
    schoolName: '성신여대',
    schoolId: 'sungshin',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-10-03-hongik',
    date: '2026-10-03',
    schoolName: '홍익대',
    schoolId: 'hongik',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-10-10-yonsei',
    date: '2026-10-10',
    schoolName: '연세대',
    schoolId: 'yonsei',
    campus: '본교(신촌)',
    groups: [{ time: '10:30' }],
  },
  {
    id: '2026-10-11-catholic',
    date: '2026-10-11',
    schoolName: '가톨릭대',
    schoolId: 'catholic',
    groups: [{ time: '09:30', units: '자연, 간호', track: '자연' }],
  },
  {
    id: '2026-10-11-cau-changui',
    date: '2026-10-11',
    schoolName: '중앙대(창의형)',
    schoolId: 'cau',
    groups: [{ time: '14:00', units: '창의형', track: '자연' }],
  },
  {
    id: '2026-10-16-yonsei-mirae',
    date: '2026-10-16',
    schoolName: '연세대',
    schoolId: 'yonsei-mirae',
    campus: '미래캠(원주)',
    groups: [{}],
    note: '시간 정보 출처에 미명시 (원본 정리본에서는 10/11로 표기되어 있으나 실제 일정은 10/16)',
  },
  {
    id: '2026-10-16-eulji',
    date: '2026-10-16',
    schoolName: '을지대',
    schoolId: 'eulji',
    groups: [
      { time: '10:00', units: '간호학과(성남, 의정부)', track: '자연' },
      {
        time: '15:00',
        units: '자유전공학부, 첨단학부, 자연계열학부, 인문사회계열학부',
        track: '통합',
      },
    ],
  },
  {
    id: '2026-10-17-dankook',
    date: '2026-10-17',
    schoolName: '단국대',
    schoolId: 'dankook',
    groups: [
      {
        time: '09:30',
        units:
          '퇴계인문칼리지(공학계열), 소프트웨어학과, 컴퓨터공학과, 통계데이터사이언스학과, 사이버보안학과, 인공지능학과, AI건축융합학과',
        track: '자연',
      },
      {
        time: '15:00',
        units:
          '퇴계인문칼리지(광역), 전자전기공학과, 융합반도체공학과, 고분자공학전공, 융합소재공학전공, 인프라건설공학과, 기계공학과, 화학공학과, 건축학전공(5년제), 건축공학전공, 수학교육과, 과학교육과',
        track: '자연',
      },
    ],
  },
  {
    id: '2026-10-17-eulji',
    date: '2026-10-17',
    schoolName: '을지대',
    schoolId: 'eulji',
    groups: [
      {
        time: '10:00',
        units: '임상병리학과(성남, 의정부), 방사선학과, 물리치료학과',
        track: '자연',
      },
      {
        time: '15:00',
        units: '안경광학과, 응급구조학과, 치위생학과, 의료경영학과, 사회기여 및 배려대상자',
        track: '자연',
      },
    ],
  },
  {
    id: '2026-10-18-eulji',
    date: '2026-10-18',
    schoolName: '을지대',
    schoolId: 'eulji',
    groups: [{}],
    note: '시간/모집단위 정보 출처에 미명시 (Theme 02 캘린더 기준 추가)',
  },
  {
    id: '2026-10-30-sangmyung-humanities',
    date: '2026-10-30',
    schoolName: '상명대',
    schoolId: 'sangmyung',
    groups: [{ units: '인문계열', track: '인문' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-10-31-sangmyung-natural',
    date: '2026-10-31',
    schoolName: '상명대',
    schoolId: 'sangmyung',
    groups: [{ units: '자연계열', track: '자연' }],
    note: '시간 정보 출처에 미명시',
  },

  // === 11월 ===
  {
    id: '2026-11-01-seokyeong',
    date: '2026-11-01',
    schoolName: '서경대',
    schoolId: 'seokyeong',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-19-csat',
    date: '2026-11-19',
    schoolName: '대학수학능력시험',
    groups: [{}],
    isCsat: true,
  },
  {
    id: '2026-11-21-konkuk',
    date: '2026-11-21',
    schoolName: '건국대',
    schoolId: 'konkuk',
    groups: [
      { time: '09:20', units: 'KU자유전공학부', track: '통합' },
      { time: '14:00', units: '자연, 수의예', track: '자연' },
    ],
  },
  {
    id: '2026-11-21-kyunghee-med',
    date: '2026-11-21',
    schoolName: '경희대',
    schoolId: 'kyunghee',
    groups: [{ units: '의약학계 (의예/한의예 자연/치의예/약학)', track: '의약학' }],
    note: '시간 정보 출처에 미명시 (PDF: 15:00~17:00)',
  },
  {
    id: '2026-11-21-korea',
    date: '2026-11-21',
    schoolName: '고려대',
    schoolId: 'korea',
    campus: '본교(서울)',
    groups: [
      {
        time: '08:30',
        units:
          '데이터과학과, 물리학과, 바이오시스템의과학부, 바이오의공학부, 보건환경융합과학부, 생명공학부, 생명과학부, 수학과, 스마트보안학부, 식품공학과, 인공지능학과, 지구환경과학과, 컴퓨터학과, 화학과, 환경생태공학부',
        track: '자연',
      },
      {
        time: '12:30',
        units:
          '가정교육과, 간호학과, 건축사회환경공학부, 건축학과, 기계공학부, 산업경영공학부, 수학교육과, 신소재공학부, 융합에너지공학과, 전기전자공학부, 학부대학(자연), 화공생명공학과',
        track: '자연',
      },
    ],
    note: '원본 이미지에 17:00 그룹(융합전자공학부·컴퓨터소프트웨어학부·미래자동차공학과·반도체공학과·의예과)이 함께 표기되어 있으나, 해당 모집단위는 한양대 11/29 17:00 그룹과 동일하므로 라벨링 오류로 판단해 본 데이터에서는 제외',
  },
  {
    id: '2026-11-21-sogang',
    date: '2026-11-21',
    schoolName: '서강대',
    schoolId: 'sogang',
    groups: [
      {
        time: '15:30',
        units: '수학과, 전자공학과, 기계공학과, 인공지능학과',
        track: '자연',
      },
      {
        time: '18:30',
        units: '물리학과, 화공생명공학과, 컴퓨터공학과, 시스템반도체공학과',
        track: '자연',
      },
    ],
  },
  {
    id: '2026-11-21-swu',
    date: '2026-11-21',
    schoolName: '서울여대',
    schoolId: 'swu',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-21-suwon-natural',
    date: '2026-11-21',
    schoolName: '수원대',
    schoolId: 'suwon',
    groups: [{ units: '자연계열', track: '자연' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-21-sookmyung',
    date: '2026-11-21',
    schoolName: '숙명여대',
    schoolId: 'sookmyung',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-21-soongsil',
    date: '2026-11-21',
    schoolName: '숭실대',
    schoolId: 'soongsil',
    groups: [{ time: '09:30' }],
  },
  {
    id: '2026-11-21-kau',
    date: '2026-11-21',
    schoolName: '한국항공대',
    schoolId: 'kau',
    groups: [
      { time: '10:00', units: '공학계열', track: '자연' },
      { time: '15:00', units: '이학계열', track: '자연' },
    ],
  },

  {
    id: '2026-11-22-catholic-pharm',
    date: '2026-11-22',
    schoolName: '가톨릭대',
    schoolId: 'catholic',
    groups: [{ time: '09:30', units: '약학, 의예', track: '의약학' }],
  },
  {
    id: '2026-11-22-kyunghee-natural',
    date: '2026-11-22',
    schoolName: '경희대',
    schoolId: 'kyunghee',
    groups: [{ time: '09:00', units: '자연계', track: '자연' }],
  },
  {
    id: '2026-11-22-dongguk',
    date: '2026-11-22',
    schoolName: '동국대',
    schoolId: 'dongguk',
    groups: [{ time: '09:30' }],
  },
  {
    id: '2026-11-22-skku',
    date: '2026-11-22',
    schoolName: '성균관대',
    schoolId: 'sungkyunkwan',
    groups: [
      {
        time: '08:00',
        units:
          '건설환경공학부, 글로벌바이오메디컬공학부, 반도체시스템공학과, 수학교육과, 에너지학과, 인공지능학과, 전자전기공학부, 지능형소프트웨어학과',
        track: '자연',
      },
      {
        time: '12:30',
        units: '글로벌융합학부, 자연과학계열, 전자전기공학부(추가)',
        track: '자연',
      },
      {
        time: '16:30',
        units: '글로벌경영학과, 글로벌리더학부, 의예과, 자유전공계열, 사회과학계열, 경영학과',
        track: '의약학',
      },
    ],
    note: '성균관대는 자연/인문/의예가 시간대별로 분리. 원본 이미지에 모집단위가 시간대별로 다소 혼재되어 보이므로 정확한 시간 매칭은 성균관대 홈페이지 재확인 권장',
  },
  {
    id: '2026-11-22-suwon-humanities',
    date: '2026-11-22',
    schoolName: '수원대',
    schoolId: 'suwon',
    groups: [{ units: '인문계열', track: '인문' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-22-tukorea',
    date: '2026-11-22',
    schoolName: '한국공학대',
    schoolId: 'tukorea',
    groups: [
      {
        time: '10:00',
        units: '사회융합 자율전공, 경영 자율전공, 자유전공학부',
        track: '통합',
      },
      {
        time: '14:30',
        units: 'IT반도체융합 자율전공, 스마트기계융합전공, 첨단융합전공',
        track: '자연',
      },
    ],
  },
  {
    id: '2026-11-22-hongik-sejong',
    date: '2026-11-22',
    schoolName: '홍익대',
    schoolId: 'hongik-sejong',
    campus: '세종캠',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },

  {
    id: '2026-11-23-samyook',
    date: '2026-11-23',
    schoolName: '삼육대',
    schoolId: 'samyook',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-23-seoultech',
    date: '2026-11-23',
    schoolName: '서울과학기술대',
    schoolId: 'seoultech',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-24-samyook',
    date: '2026-11-24',
    schoolName: '삼육대',
    schoolId: 'samyook',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-25-kut',
    date: '2026-11-25',
    schoolName: '한국기술교육대',
    schoolId: 'kut',
    groups: [
      { time: '09:40', units: '공학융합계열', track: '자연' },
      { time: '13:40', units: 'ICT융합계열', track: '자연' },
    ],
  },
  {
    id: '2026-11-27-gyeonggi',
    date: '2026-11-27',
    schoolName: '경기대',
    schoolId: 'gyeonggi',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },

  {
    id: '2026-11-28-kangnam',
    date: '2026-11-28',
    schoolName: '강남대',
    schoolId: 'kangnam',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-28-knu',
    date: '2026-11-28',
    schoolName: '경북대',
    schoolId: 'knu',
    groups: [
      { time: '09:00', units: '자유전공', track: '통합' },
      { time: '15:00', units: '자연Ⅰ (의약학계 제외)', track: '자연' },
      { time: '16:00', units: '자연Ⅱ (의약학계)', track: '의약학' },
    ],
  },
  {
    id: '2026-11-28-korea-sejong',
    date: '2026-11-28',
    schoolName: '고려대',
    schoolId: 'korea-sejong',
    campus: '세종캠',
    groups: [
      { time: '09:00', units: '자연', track: '자연' },
      { time: '14:30', units: '약학과', track: '의약학' },
    ],
  },
  {
    id: '2026-11-28-kwangwoon',
    date: '2026-11-28',
    schoolName: '광운대',
    schoolId: 'kwangwoon',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-28-pusan',
    date: '2026-11-28',
    schoolName: '부산대',
    schoolId: 'pusan',
    groups: [{ time: '09:00' }],
  },
  {
    id: '2026-11-28-sejong',
    date: '2026-11-28',
    schoolName: '세종대(자유전공)',
    schoolId: 'sejong',
    groups: [
      { time: '09:00', units: '인공지능융합대학', track: '통합' },
      { time: '14:00', units: '자연계 나머지 학과', track: '통합' },
    ],
    note: '자유전공 학부 통합형 시험 (인문+수리 같이)',
  },
  {
    id: '2026-11-28-cau-ilban',
    date: '2026-11-28',
    schoolName: '중앙대(일반형)',
    schoolId: 'cau',
    groups: [{ units: '일반형', track: '자연' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-29-sejong',
    date: '2026-11-29',
    schoolName: '세종대(자연)',
    schoolId: 'sejong',
    groups: [{ track: '자연' }],
    note: '시간 정보 출처에 미명시 (Theme 02 캘린더 기준)',
  },

  {
    id: '2026-11-29-gachon-uiye',
    date: '2026-11-29',
    schoolName: '가천대(의예)',
    schoolId: 'gachon',
    groups: [{ units: '의예', track: '의약학' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-29-duksung',
    date: '2026-11-29',
    schoolName: '덕성여대',
    schoolId: 'duksung',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-29-shinhan',
    date: '2026-11-29',
    schoolName: '신한대',
    schoolId: 'shinhan',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-29-ewha',
    date: '2026-11-29',
    schoolName: '이화여대',
    schoolId: 'ewha',
    groups: [
      { time: '08:30', units: '자연계열', track: '자연' },
      { time: '14:00', units: '의예과, 약학전공', track: '의약학' },
    ],
  },
  {
    id: '2026-11-29-hufs',
    date: '2026-11-29',
    schoolName: '한국외대',
    schoolId: 'hufs',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-11-29-hanyang',
    date: '2026-11-29',
    schoolName: '한양대',
    schoolId: 'hanyang',
    campus: '서울캠',
    groups: [
      {
        time: '09:30',
        units:
          '건축학부(5년제), 건축공학부, 건설환경공학과, 도시공학과, 간호학과, 식품영양학과, 한양인터칼리지학부(자연)',
        track: '자연',
      },
      {
        time: '13:30',
        units:
          '전기·생체공학부(전기공학전공), 신소재공학부, 화학공학과, 기계공학부, 산업공학과, 수학과, 물리학과, 화학과, 생명과학과, 수학교육과',
        track: '자연',
      },
      {
        time: '17:00',
        units:
          '융합전자공학부, 컴퓨터소프트웨어학부, 미래자동차공학과, 반도체공학과, 의예과',
        track: '자연',
      },
    ],
    note: '한양대 PDF p139 표 기준 시간 그룹 명시 (오전·오후1·오후2)',
  },

  {
    id: '2026-11-30-gachon',
    date: '2026-11-30',
    schoolName: '가천대',
    schoolId: 'gachon',
    groups: [
      {
        units: '인문계열, 간호, 바이오로직스, 화공생명배터리공학부',
        track: '통합',
      },
    ],
    note: '시간 정보 출처에 미명시',
  },

  // === 12월 ===
  {
    id: '2026-12-01-gachon-natural',
    date: '2026-12-01',
    schoolName: '가천대',
    schoolId: 'gachon',
    groups: [{ units: '자연', track: '자연' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-12-05-kookmin-humanities',
    date: '2026-12-05',
    schoolName: '국민대',
    schoolId: 'kookmin',
    groups: [{ units: '인문', track: '인문' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-12-05-ajou',
    date: '2026-12-05',
    schoolName: '아주대(자연·의예)',
    schoolId: 'ajou',
    groups: [
      { time: '09:00', units: '공학계열, 자유전공학부(자연)', track: '자연' },
      { time: '14:00', units: '첨단신산업공학(자연), 소프트웨어융합대학', track: '자연' },
      { units: '의예', track: '의약학' },
    ],
  },
  {
    id: '2026-12-05-hanshin',
    date: '2026-12-05',
    schoolName: '한신대',
    schoolId: 'hanshin',
    groups: [{ time: '10:00', units: '인문, 자유전공 → 자연', track: '통합' }],
  },
  {
    id: '2026-12-06-kookmin-natural',
    date: '2026-12-06',
    schoolName: '국민대',
    schoolId: 'kookmin',
    groups: [{ units: '자연', track: '자연' }],
    note: '시간 정보 출처에 미명시',
  },
  {
    id: '2026-12-06-ajou-pharm',
    date: '2026-12-06',
    schoolName: '아주대',
    schoolId: 'ajou',
    groups: [{ time: '14:00', units: '약학과', track: '의약학' }],
  },
  {
    id: '2026-12-06-inha',
    date: '2026-12-06',
    schoolName: '인하대',
    schoolId: 'inha',
    groups: [{}],
    note: '시간 정보 출처에 미명시',
  },
];

// === Helpers =================================================================

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function formatDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return `${m}/${d}(${WEEKDAYS[dt.getDay()]})`;
}

export function weekdayOf(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
}

export function allTracks(entry: ExamEntry): ExamGroup['track'][] {
  return Array.from(new Set(entry.groups.map(g => g.track).filter((x): x is NonNullable<typeof x> => !!x)));
}

export function hasTrack(entry: ExamEntry, track: ExamGroup['track']): boolean {
  if (!track) return true;
  return entry.groups.some(g => g.track === track);
}
