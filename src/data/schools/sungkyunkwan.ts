import type { SchoolData } from './types';

export const sungkyunkwanData: SchoolData = {
  meta: { id: 'sungkyunkwan', name: '성균관대', tagline: '룰의 변화와 합격의 설계도', ready: true },
  sections: [
    {
      type: 'hero',
      title: '2027학년도 성균관대 논술전형 핵심 분석',
      subtitle: '룰의 변화와 합격의 설계도',
    },
    {
      type: 'change',
      oldBlock: {
        label: '2026학년도 - The Old Way',
        items: ['국', '수', '영', '탐1', '탐2'],
        summary: '5개 영역 중 3개 합 (선택의 여유)',
      },
      newBlock: {
        label: '2027학년도 - The New Reality',
        items: ['국', '수', '영', '탐'],
        summary: '4개 영역 중 3개 합 (안전망의 제거)',
      },
      note: '탐구 영역이 2과목 개별 반영에서 "탐구 2과목 평균(또는 과탐 1개)"로 단일 영역화되었습니다. 삐끗할 수 있는 1과목의 여유가 사라졌습니다.',
    },
    {
      type: 'minReq',
      tiers: [
        { rule: '4개 영역 등급합 5', scope: '의예과', highlight: true },
        { rule: '3개 영역 등급합 5', scope: '자유전공, 글로벌(리더, 경제, 경영), 전자전기공학, 반도체시스템, 소프트웨어, 지능형SW, 글로벌바이오메디컬, 반도체융합, 약학, 에너지' },
        { rule: '3개 영역 등급합 6', scope: '인문과학, 사회과학, 경영, 자연과학, 공학, 건설환경공학, 글로벌융합' },
      ],
      note: '논술 성적은 "일괄 합산 100%" 반영. 수능 최저를 통과해야만 논술 채점의 자격이 주어집니다.',
    },
    {
      type: 'tamgu',
      baseCondition: '탐구 영역은 반드시 2개 과목 응시 (직업탐구 제외)',
      rules: [
        { title: '일반 로직', body: '탐구 2과목 평균 등급 반영' },
        { title: '과탐 응시자 특권', body: '과탐 1과목 이상 응시 시, "2과목 평균"과 "과탐 상위 1과목" 중 우수한 등급을 자동 반영' },
      ],
      hidden: { title: '히든 카드', body: '제2외국어 / 한문을 탐구영역 1개 과목으로 대체 가능' },
    },
    {
      type: 'matrix',
      columns: ['언어형 논술', '수리형 논술'],
      rows: [
        {
          rowLabel: '인문 계열',
          cells: [
            [
              { label: '인문과학', count: 38 },
              { label: '사회과학', count: 40 },
              { label: '경영', count: 20 },
            ],
            [
              { label: '자유전공', count: 20 },
              { label: '글로벌경제', count: 5 },
              { label: '경영', count: 5 },
              { label: '인문과학', count: 5 },
            ],
          ],
        },
        {
          rowLabel: '자연 계열',
          cells: [
            [
              { label: '전자전기공학', count: 5 },
              { label: '소프트웨어', count: 5 },
              { label: '공학계열', count: 10 },
              { label: '건설환경공학', count: 5 },
            ],
            [
              { label: '전자전기공학', count: 25 },
              { label: '공학계열', count: 40 },
              { label: '자연과학', count: 25 },
              { label: '약학/의예 등' },
            ],
          ],
        },
      ],
      callouts: [
        { position: 'topRight', text: '문과생의 수리형 공략 가능' },
        { position: 'bottomLeft', text: '이과생의 언어형 공략 가능' },
      ],
    },
    {
      type: 'warning',
      title: '치명적인 함정: 언어형 교차 지원의 대가',
      body: '자연과학·공학·건설환경·전자전기·소프트웨어 모집단위 지원자가 언어형 논술에 지원할 경우, 수능 최저학력기준 적용 시 "수학영역"을 반드시 의무로 반영해야 합니다.',
      footnote: '(수학을 제외한 나머지 조합으로 최저를 맞추는 것 절대 불가) * 모집 요강 최종 발표 시 변경 여부 재확인 필수',
    },
    {
      type: 'tieBreak',
      primary: '논술 우선순위 문항 평가점수 상위자',
      primaryNote: '특정 핵심 문항의 배점이 결정적',
      secondary: ['수학', '국어', '사회/과학', '영어', '한국사'],
    },
    {
      type: 'caseStudy',
      title: 'Case Study 1: 과탐 1과목의 위력이 만든 생존',
      subtitle: '자유전공계열 & 사회과학계열 지원자 (수리형 논술 응시)',
      statsLabels: ['국어', '수학', '영어', '탐구1', '탐구2(과탐)'],
      statsValues: [3, 4, 1, 4, 1],
      oldCase: {
        heading: '3합 5 (탐구 1과목 별도 반영)',
        body: '영어 1 + 탐구2 1 + 국어 3 = 5',
        result: '합격',
      },
      newCase: {
        heading: '자유전공 최저: 3합 5 (탐구 평균 또는 과탐 상위 1과목)',
        body: '만약 탐구2가 사탐이었다면 평균 2.5 적용으로 불합격. 하지만 과탐 상위 1과목 룰 적용! 영어(1) + 국어(3) + 과탐(1) = 5 → 최종 합격',
        result: '합격',
      },
    },
    {
      type: 'caseStudy',
      title: 'Case Study 2: 강화된 룰과 함정에 빠진 희생양',
      subtitle: '전자전기공학부 지원자 (언어형 논술 응시)',
      statsLabels: ['국어', '수학', '영어', '탐구1', '탐구2'],
      statsValues: [6, 3, 2, 1, 3],
      oldCase: {
        heading: '3합 6 (탐구 1과목 별도 반영)',
        body: '영어 2 + 수학 3 + 탐구1 1 = 6',
        result: '합격',
      },
      newCase: {
        heading: '27년도 전자전기 최저 강화: 3합 5 / 언어형 교차 지원 함정 발동: 수학(3) 의무 반영 고정',
        body: '수학(3) + 영어(2) + 탐구상위(1) = 6 → 3합 5 미충족',
        result: '불합격',
      },
    },
    {
      type: 'strategy',
      pillars: [
        {
          title: '수능 최저가 곧 1차 합격',
          body: '탐구 1과목의 핑계가 사라졌습니다. 논술 실력 이전에 수능 3합(5/6) 완성이 절대적인 최우선 과제입니다.',
        },
        {
          title: '교차 지원의 틈새 공략',
          body: '자신의 두뇌 타입(언어/수리)에 맞춰 계열의 틀을 깨십시오.',
          warning: '단, 이과생의 언어형 "수학 필수" 함정을 반드시 피해야 합니다.',
        },
        {
          title: '대체/상위 과목의 극대화',
          body: '과탐 상위 1과목 룰과 제2외국어/한문 대체 카드를 수학적으로 계산하여, 자신에게 가장 유리한 최저 등급 조합을 설계하십시오.',
        },
      ],
    },
  ],
};
