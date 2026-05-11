// src/data/previewData.ts

export const previewMeta = {
  title: '2028학년도 자연계열 논술전형 PREVIEW',
  subtitle: '고1·고2를 위한 이슈 브리핑',
  publishedAt: '2026.05',
  intro: [
    '2028학년도 입시는 그동안 안정세였던 흐름이 한꺼번에 흔들리는 해입니다. 시험 범위가 5월 시점에도 발표되지 않은 대학이 다수이고, 한동안 사라졌던 수능최저가 일부 대학에서 부활하며, 학생부의 영향력은 점차 약화되는 방향으로 가고 있습니다.',
    '지금 고1·고2가 해야 할 일은 흔들림 자체를 두려워하는 게 아니라, 흔들림을 전제로 학습 전략을 짜는 것입니다. 이 페이지는 변화의 핵심 세 가지와 계열별로 주의해야 할 포인트를 강사 관점에서 정리한 것입니다.'
  ]
};

export type KeyChange = {
  id: 'scope' | 'minreq' | 'record';
  headline: string;
  body: string;
  stat: string;
};

export type SchoolBadge = 'NEW' | 'REVIVED' | 'CLOSED';

export type SchoolCardData = {
  name: string;
  scope: string;
  minReq: string;
  quota: string;
  note: string;
  badge?: SchoolBadge;
  quotaDelta?: number;
};

export type GroupBlock = {
  id: 'medical' | 'dental_oriental' | 'pharmacy' | 'top_science' | 'movement';
  label: string;
  summary: string;
  schools: SchoolCardData[];
};

export const keyChanges: KeyChange[] = [
  {
    id: 'scope',
    headline: '시험 범위가 5월에도 미공개',
    body: '전체 30여 개 논술 실시 대학 중 출제 범위를 명확히 발표한 곳은 일부에 불과합니다. 최상위권 일부는 전범위, 그 외 다수는 "공통수학 + 대수 + 미적분Ⅰ + 확률과통계" 묶음이 유력하지만 확정은 아닙니다. 학습 전략은 전범위 시나리오를 기본값으로 두고, 이후 발표가 나오면 축소 조정하는 방향이 안전합니다.',
    stat: '30개 중 25개교 미발표'
  },
  {
    id: 'minreq',
    headline: '수능최저, 다시 돌아왔다',
    body: '연세대(자연), 인하대, 서울시립대 등에서 수능최저가 부활하거나 강화되고 있습니다. 상위권 대학은 사실상 모두 최저가 존재하며, 논술 점수가 아무리 높아도 최저를 충족하지 못하면 합격은 불가능합니다. 안정적인 최저 확보가 합격 조건의 절반을 차지하는 시기입니다.',
    stat: '부활·강화 4~5개교'
  },
  {
    id: 'record',
    headline: '학생부 영향력은 약화 흐름',
    body: '전반적으로 학생부 반영 비율은 유지되거나 줄어드는 방향입니다. 다만 출결을 별도 항목으로 보는 일부 대학(서강대·동국대·중앙대 등)에서는 무단결석이 직접적인 감점 요인이 됩니다. 결국 합격을 가르는 두 축은 논술과 수능최저이며, 학생부는 보조축으로 자리잡고 있습니다.',
    stat: '출결 별도 반영 4개교'
  }
];

export const groupBlocks: GroupBlock[] = [
  {
    id: 'medical',
    label: '의예과',
    summary: '최저는 이미 4합 이내가 표준. 1점 차로 합격이 갈리는 그룹입니다.',
    schools: [
      { name: '성균관대(의대)', scope: '언어형/수리형 체계 유지', minReq: '4합5(탐평균)', quota: '5명', note: '중복지원 불가' },
      { name: '한양대(의대)', scope: '미발표', minReq: '3합4(탐평균)', quota: '10명', note: '정원 +57 추세' },
      { name: '중앙대(의대)', scope: '미발표', minReq: '4합5(탐평균), 한4', quota: '13명', note: '논80+교10+출10' },
      { name: '경희대(의예)', scope: '전범위 + 수+과논 선택', minReq: '3합4, 한5', quota: '59명', note: '의·치·한·약 통합 모집(59명)' },
      { name: '이화여대(의대)', scope: '미발표', minReq: '4합7', quota: '5명', note: '최저 부담이 가장 큰 그룹' },
      { name: '인하대(의대)', scope: '논술 유형 변화 예정', minReq: '3합3(탐평균)', quota: '8명', note: '수능최저 부활' },
      { name: '아주대(의대)', scope: '수리+생명과학논술', minReq: '4합6(탐평균)', quota: '10명', note: '시험시간 90분으로 단축' },
      { name: '가톨릭대(의대)', scope: '약술형(수리 100분)', minReq: '3합4(과탐만 인정), 한4', quota: '21명', note: '수능 전 영역 응시 필수' }
    ]
  },
  {
    id: 'dental_oriental',
    label: '치·한의예',
    summary: '선택지가 좁은 만큼 정원 변화에 민감하게 반응하는 그룹입니다.',
    schools: [
      { name: '경희대(치·한)', scope: '전범위 + 수+과논 선택', minReq: '3합4, 한5', quota: '59명', note: '의·치·한·약 통합 모집(59명) 일부' },
      { name: '대전대(한의예)', scope: '수리논술', minReq: '3합5(수학필수,탐평균), 한5', quota: '7명', note: '한의예에 논술 통로 신규 개설', badge: 'NEW' }
    ]
  },
  {
    id: 'pharmacy',
    label: '약학',
    summary: '수능최저 4합~5합대, 시험 시간 단축이 동시에 진행되는 그룹입니다.',
    schools: [
      { name: '연세대(약학)', scope: '전범위+통합과학', minReq: '3합5(국수포함), 영3, 한4', quota: '5명', note: '수능최저 부활' },
      { name: '중앙대(약학)', scope: '미발표', minReq: '4합5, 한4', quota: '16명', note: '논80+교10+출10' },
      { name: '경희대(약)', scope: '전범위 + 수+과논 선택', minReq: '3합4, 한5', quota: '59명', note: '의·치·한·약 통합 모집(59명) 일부' },
      { name: '이화여대(약학)', scope: '미발표', minReq: '4합6', quota: '5명', note: '' },
      { name: '동국대(약학)', scope: '전범위', minReq: '3합4, 한4', quota: '5명', note: '논70+교20+출10' },
      { name: '숙명여대(약학)', scope: '미발표', minReq: '3합4(수 필수)', quota: '4명', note: '논85+교15' },
      { name: '아주대(약학)', scope: '미발표', minReq: '3합5(탐평균)', quota: '5명', note: '시험시간 90분으로 단축' },
      { name: '가톨릭대(약학)', scope: '약술형(수리 90분)', minReq: '3합5(과탐만 인정)', quota: '6명', note: '수능 전 영역 응시 필수' },
      { name: '덕성여대(약학)', scope: '미발표', minReq: '3합5(탐평균)(수 필수)', quota: '5명', note: '' }
    ]
  },
  {
    id: 'top_science',
    label: '주요 자연계',
    summary: '정원 변화와 수능최저 부활을 동시에 살펴야 하는 그룹입니다.',
    schools: [
      { name: '연세대', scope: '전범위+통합과학', minReq: '3합6(국수포함), 영3, 한4', quota: '313명', note: '수능최저 부활/수능 이후로 이동 예정', quotaDelta: 33 },
      { name: '고려대', scope: '미발표', minReq: '4합8, 한4', quota: '367명', note: '', quotaDelta: 18 },
      { name: '서강대', scope: '미발표', minReq: '3합7, 한4', quota: '170명', note: '논80+교10+출10', quotaDelta: -1 },
      { name: '성균관대', scope: '미발표', minReq: '3합5~6(탐구 분리)', quota: '371명', note: '중복지원 불가', quotaDelta: -5 },
      { name: '한양대', scope: '미발표', minReq: '3합7', quota: '279명', note: '논90+출10', quotaDelta: 57 },
      { name: '중앙대', scope: '미발표', minReq: '3합6, 한4', quota: '330명', note: '다전공 모집', quotaDelta: 17 },
      { name: '경희대', scope: '전범위', minReq: '2합4, 한5', quota: '410명', note: '', quotaDelta: -2 },
      { name: '서울시립대', scope: '미발표', minReq: '3합7, 한4', quota: '86명', note: '수능최저 부활', quotaDelta: 6 },
      { name: '이화여대', scope: '미발표', minReq: '3합5(스크랜튼 3합5)', quota: '286명', note: '', quotaDelta: 0 },
      { name: '건국대', scope: '통합논술(언어사회+수리)', minReq: '5개영역중 3개합8', quota: '321명', note: '한국사도 1개 영역으로 포함', quotaDelta: 2 },
      { name: '동국대', scope: '전범위', minReq: '2합5, 한4', quota: '286명', note: '논70+교20+출10', quotaDelta: 8 },
      { name: '홍익대', scope: '미발표', minReq: '2합5, 한4', quota: '384명', note: '', quotaDelta: 0 },
      { name: '숙명여대', scope: '미발표', minReq: '2합5', quota: '210명', note: '논85+교15', quotaDelta: 0 },
      { name: '숭실대', scope: '미발표', minReq: '2합6', quota: '240명', note: '', quotaDelta: -6 },
      { name: '인하대', scope: '미발표', minReq: '2합6', quota: '441명', note: '수능최저 부활', quotaDelta: -8 },
      { name: '아주대', scope: '미발표', minReq: '없음', quota: '209명', note: '시험시간 90분으로 단축', quotaDelta: 47 }
    ]
  },
  {
    id: 'movement',
    label: '신설 · 부활 · 폐지',
    summary: '2028의 지형을 바꾸는 세 가지 움직임입니다.',
    schools: [
      { name: '대전대(한의예)', scope: '수리논술', minReq: '3합5(수학필수,탐평균), 한5', quota: '7명', note: '한의예에 논술 통로 신규 개설', badge: 'NEW', quotaDelta: 7 },
      { name: '한양대(에리카)', scope: '미발표', minReq: '2합6', quota: '203명', note: '정원 +203 규모로 재가동', badge: 'REVIVED', quotaDelta: 203 },
      { name: '부산대', scope: '—', minReq: '—', quota: '—', note: '지방 거점 한 곳이 빠지며 수도권 경쟁 심화', badge: 'CLOSED' }
    ]
  }
];

export const actionChecklist: string[] = [
  '목표 대학의 최저 등급 라인을 확정하고, 그 라인을 기준으로 수능 학습량을 역산할 것',
  '출제 범위가 미발표된 대학은 전범위 + 확률과통계 포함 시나리오를 기본으로 잡고 학습할 것',
  '학생부 출결(특히 무단결석)을 점검할 것 — 일부 대학은 출결을 별도 반영함',
  '신설·부활 전형(대전대 한의예 / 한양대 에리카)은 첫 회 변동성을 감안해 안전지원 카드로만 활용할 것',
  '2027학년도 결과(현 고3) 발표 후 5~6월에 다시 점검할 것 — 이 시점에 시험범위 확정 발표가 나올 가능성이 높음'
];

export const previewDisclaimer =
  '본 자료는 2026년 5월 시점 각 대학 발표·계획안 기준이며, 실제 모집요강은 2027년 4월 이후 확정됩니다. 변경 가능성을 전제로 활용하십시오.';
