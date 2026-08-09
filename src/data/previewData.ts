// src/data/previewData.ts

export const previewMeta = {
  title: '2028학년도 자연계열 논술전형 PREVIEW',
  subtitle: '고1·고2를 위한 이슈 브리핑',
  publishedAt: '2026.08',
  intro: [
    '2028학년도는 수능 체제 자체가 바뀌고, 그 위에서 대학별 논술전형까지 함께 흔들리는 해입니다. 수능은 선택과목이 사라지고 전원이 같은 시험을 치르며, 내신은 5등급제가 처음 적용됩니다. 동시에 한동안 없었던 수능최저가 일부 대학에서 되살아나고, 학생부의 영향력은 줄어드는 방향으로 가고 있습니다.',
    '이 페이지는 두 부분으로 나뉩니다. 앞부분은 교육부·평가원이 이미 확정 발표한 제도의 변화이고, 뒷부분은 대학들이 내놓은 2028학년도 전형계획에서 읽히는 논술전형의 변화입니다. 확정된 것과 아직 발표되지 않은 것을 구분해 표기했으니, 그 경계를 함께 봐 주세요.'
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
    body: '그동안 수능최저가 없던 연세대·서울시립대·인하대 세 곳에 최저가 새로 생겼고, 가천대는 1개 영역 3등급에서 2개 영역 합 6으로 기준을 올렸습니다. 상위권 대학은 사실상 모두 최저가 있으며, 논술 점수가 아무리 높아도 최저를 충족하지 못하면 채점 대상에서 빠집니다. 안정적인 최저 확보가 합격 조건의 절반입니다.',
    stat: '신설 3개교 · 강화 다수'
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
      { name: '연세대', scope: '전범위+통합과학', minReq: '3합6(국수포함), 영3, 한4', quota: '334명', note: '수능최저 신설 · 자연계 논술에 과학 제시문 도입', quotaDelta: 49 },
      { name: '고려대', scope: '미발표', minReq: '4합8, 한4', quota: '367명', note: '', quotaDelta: 18 },
      { name: '서강대', scope: '미발표', minReq: '3합7, 한4', quota: '170명', note: '논80+교10+출10', quotaDelta: -1 },
      { name: '성균관대', scope: '미발표', minReq: '3합5~6(탐구 분리)', quota: '371명', note: '중복지원 불가', quotaDelta: -5 },
      { name: '한양대', scope: '고교 교육과정 내', minReq: '3합7 (2027부터 유지)', quota: '289명', note: '논90+출10', quotaDelta: 57 },
      { name: '중앙대', scope: '미발표', minReq: '3합6, 한4', quota: '330명', note: '다전공 모집', quotaDelta: 17 },
      { name: '경희대', scope: '전범위', minReq: '2합4, 한5', quota: '410명', note: '', quotaDelta: -2 },
      { name: '서울시립대', scope: '미발표', minReq: '3합7, 한4', quota: '86명', note: '수능최저 부활', quotaDelta: 6 },
      { name: '이화여대', scope: '미발표', minReq: '3합5(스크랜튼 3합5)', quota: '286명', note: '', quotaDelta: 0 },
      { name: '건국대', scope: '통합논술(국어·통합사회 1문항 + 수학 3문항)', minReq: '5개영역중 3개합8', quota: '327명', note: '한국사도 1개 영역으로 포함 · 미적분Ⅱ·기하 제외', quotaDelta: 2 },
      { name: '동국대', scope: '전범위', minReq: '2합5, 한4', quota: '286명', note: '논70+교20+출10', quotaDelta: 8 },
      { name: '홍익대', scope: '미발표', minReq: '2합5, 한4', quota: '384명', note: '', quotaDelta: 0 },
      { name: '숙명여대', scope: '미발표', minReq: '2합5', quota: '210명', note: '논85+교15', quotaDelta: 0 },
      { name: '숭실대', scope: '미발표', minReq: '2합6', quota: '240명', note: '', quotaDelta: -6 },
      { name: '인하대', scope: '미발표', minReq: '2합6', quota: '449명', note: '수능최저 신설 · 논·서술형으로 유형 전환', quotaDelta: -8 },
      { name: '아주대', scope: '미발표', minReq: '없음(의·약만 적용)', quota: '224명', note: '시험시간 90분으로 단축 · 논90+교10', quotaDelta: 47 }
    ]
  },
  {
    id: 'movement',
    label: '신설 · 부활 · 폐지',
    summary: '2028의 지형을 바꾸는 세 가지 움직임입니다.',
    schools: [
      { name: '대전대(한의예)', scope: '수리논술', minReq: '3합5(수학필수,탐평균), 한5', quota: '7명', note: '한의예에 논술 통로 신규 개설', badge: 'NEW', quotaDelta: 7 },
      { name: '한양대(에리카)', scope: '미발표(모집요강에서 안내)', minReq: '2합6', quota: '203명', note: '논술 100% · 학생부 미반영으로 재가동', badge: 'REVIVED', quotaDelta: 203 },
      { name: '한성대', scope: '약술형', minReq: '없음', quota: '99명', note: '논80+교과20 · 수능최저 없는 신설 통로', badge: 'NEW', quotaDelta: 99 },
      { name: '부산대', scope: '—', minReq: '—', quota: '363명 → 0명', note: '지방 거점 한 곳이 빠지며 비수도권 논술 정원이 급감', badge: 'CLOSED', quotaDelta: -363 }
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
  '본 자료는 각 대학이 2026년 4월 30일 공개한 「2028학년도 대학입학전형시행계획」 원문과 한국대학교육협의회 취합 자료를 대조해 정리했습니다(2026년 8월 확인). 다만 논술 시험일·문항 수·시험 시간처럼 시행계획에 담기지 않는 항목은 2027년 발표되는 각 대학 수시 모집요강에서 최종 확정되므로, 그때 반드시 다시 확인하십시오.';
