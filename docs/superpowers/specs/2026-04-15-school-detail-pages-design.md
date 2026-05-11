# 학교별 상세 페이지 (School Detail Pages)

## 목적

DATA 자료실의 요약 테이블을 깔끔하게 유지하면서, 학교별 논술전형 심층 정보를 별도 페이지로 제공한다. 첫 학교는 성균관대(2027학년도)이며, 나머지 주요 대학은 "준비 중" 스켈레톤으로 노출하여 향후 점진적으로 확장한다.

## 사용자 진입 경로

1. 네비게이션 바의 새 메뉴 **"학교별 상세"** → 학교 목록 페이지(`/schools`)
2. DATA 자료실(`/data`)의 테이블 셀에서 학교명 클릭 → 해당 학교 상세 페이지(`/schools/:id`)

준비 중인 학교는 두 경로 모두에서 클릭이 비활성화된다.

## 라우팅

외부 라우팅 라이브러리 없이 기존 `useState('/data')` 패턴을 확장한다.

- `App.tsx`에서 `currentPath`가 `/schools/...` 형태일 경우 학교 ID를 파싱하여 `<SchoolDetailPage schoolId={id} />` 렌더
- `currentPath === '/schools'`이면 `<SchoolListPage />` 렌더
- 네비게이션 항목에 `{ path: '/schools', label: '학교별 상세' }` 추가
- 학교 카드/링크 클릭 시 `setCurrentPath('/schools/sungkyunkwan')` 호출

## 파일 구조

```
src/
  data/
    schools/
      index.ts              학교 메타 리스트 (id, 이름, 설명, 준비완료 여부)
      sungkyunkwan.ts       성균관대 상세 데이터 (섹션 배열)
  pages/
    SchoolListPage.tsx      /schools 목록 페이지
    SchoolDetailPage.tsx    /schools/:id 상세 페이지 (id로 데이터 조회 후 섹션 렌더)
  components/
    schools/
      SchoolHero.tsx
      ChangeComparison.tsx  2026 vs 2027 비교
      MinReqPyramid.tsx     수능 최저 등급합 피라미드
      CompetitionFunnel.tsx 실질 경쟁률 깔때기
      TamguCalculation.tsx  탐구 영역 계산법 (일반/특권/히든)
      SupportMatrix.tsx     언어형/수리형 × 인문/자연 매트릭스
      WarningBox.tsx        경고/주의 박스
      TieBreakSection.tsx   동점자 처리 기준
      CaseStudy.tsx         케이스 스터디
      StrategyPillars.tsx   3대 합격 전략 (3-pillar 레이아웃)
      CustomSection.tsx     학교별 커스텀 콘텐츠 슬롯 (하이브리드 슬롯)
```

## 데이터 모델

각 학교 데이터는 메타정보와 섹션 배열로 구성된다.

```ts
export type SchoolMeta = {
  id: string;             // URL slug, e.g. 'sungkyunkwan'
  name: string;           // 표시명, e.g. '성균관대'
  tagline: string;        // 한 줄 설명 (목록 카드에 표시)
  ready: boolean;         // 상세 페이지 준비 완료 여부
};

export type SchoolSection =
  | { type: 'hero'; title: string; subtitle: string }
  | { type: 'change'; oldYear: ChangeBlock; newYear: ChangeBlock; note: string }
  | { type: 'minReq'; tiers: MinReqTier[]; note?: string }
  | { type: 'funnel'; stages: FunnelStage[]; insight: string }
  | { type: 'tamgu'; baseCondition: string; rules: TamguRule[]; hidden?: string }
  | { type: 'matrix'; columns: string[]; rows: MatrixRow[]; callouts?: Callout[] }
  | { type: 'warning'; title: string; body: string; footnote?: string }
  | { type: 'tieBreak'; primary: string; secondary: string[] }
  | { type: 'caseStudy'; title: string; subtitle: string; stats: number[]; oldCase: CaseBlock; newCase: CaseBlock }
  | { type: 'strategy'; pillars: StrategyPillar[] }
  | { type: 'custom'; component: React.ComponentType };

export type SchoolData = {
  meta: SchoolMeta;
  sections: SchoolSection[];
};
```

`SchoolDetailPage`는 `sections` 배열을 순회하며 `type`에 맞는 컴포넌트로 디스패치한다 (스위치 매핑). `type: 'custom'`은 학교별 자유 표현을 위한 슬롯이다 (하이브리드 설계).

## 학교 목록 페이지

- 카드 그리드 (3열, 모바일 1열)
- 카드 구성: 학교명 + tagline + "상세 보기" 버튼 또는 "준비 중" 뱃지
- 준비 완료 카드는 사이트 메인 컬러(다크그린/골드)
- 준비 중 카드는 회색조 + opacity 0.6 + cursor: not-allowed
- 상단에 검색창 (DATA 페이지의 검색 UI 재사용)

초기 학교 메타 리스트는 DATA 자료실의 `ratioData`에 등장하는 모든 대학을 포함하되, `ready: true`는 성균관대만.

## DATA 페이지 통합

`DataPage.tsx`에서 학교명 문자열을 렌더할 때, 각 학교명을 `SchoolMeta`와 매핑하여:
- 매핑된 학교가 `ready: true`이면 `<a>` 또는 `<button>`으로 감싸 클릭 시 상세 페이지로 이동
- 그 외는 일반 텍스트

## 성균관대 페이지 섹션 (10개)

PDF "2027학년도 성균관대 논술전형 핵심 분석" 내용을 그대로 구조화:

1. **Hero** — "2027학년도 성균관대 논술전형 핵심 분석" / 부제 "룰의 변화와 합격의 설계도"
2. **2026 vs 2027 변화** — 탐구 영역이 5개→4개로, 2과목 평균(또는 과탐 1개) 단일 영역화
3. **수능 최저학력 기준** — 3단 피라미드: 의예과(4합5) / 자유전공·경영 등(3합5) / 인문·자연·공학 등(3합6). 일괄 합산 100% 반영, 최저 통과 후 채점.
4. **실질 경쟁률 깔때기** — 원서 접수 100% → 실제 응시 44.7~46.5% → 최저 통과 24%(인문)/28%(자연). "최저만 맞추면 합격 확률 급상승" 인사이트.
5. **탐구 영역 계산법** — 기본 조건(2과목 응시) / 일반 로직(2과목 평균) / 과탐 응시자 특권(과탐 상위 1과목 자동 반영) / 히든 카드(제2외국어/한문 대체).
6. **논술 지원 매트릭스** — 언어형/수리형 × 인문/자연 4사분면. 학과별 모집 인원 표시. "문과생의 수리형 공략 가능", "이과생의 언어형 공략 가능" 콜아웃.
7. **경고: 교차 지원 함정** — 자연 모집단위가 언어형 논술 지원 시, 수능 최저 적용에서 수학영역 의무 반영. (수학 제외 조합 절대 불가)
8. **동점자 처리 기준** — 1순위: 논술 우선순위 문항 평가점수. 2순위: 학생부 과목별 석차등급 (수학 > 국어 > 사/과 > 영어 > 한국사).
9. **케이스 스터디 2건**:
   - Case 1: 자유전공/사회과학(수리형) 지원자, 과탐 1과목의 위력으로 합격
   - Case 2: 전자전기공학(언어형) 지원자, 강화된 룰 + 수학 의무 반영 함정으로 불합격
10. **3대 합격 전략** — 수능 최저가 곧 1차 합격 / 교차 지원의 틈새 공략 / 대체·상위 과목의 극대화

## 디자인 톤

- 색감: 사이트 기존 다크그린(`--primary-deep-forest`), 포레스트(`--primary-forest`), 골드(`--accent-gold`), 크림(`--bg-cream`) — PDF 톤과 일치
- 카드 기반 레이아웃, 둥근 모서리, 가벼운 그림자
- 섹션마다 번호 + 큰 제목 + 시각적 요소(피라미드/깔때기/매트릭스 등)
- 모바일 반응형 (단일 컬럼으로 자연스럽게 무너짐)

## 범위 외 (Out of Scope)

- 다른 학교의 실제 콘텐츠 작성 (스켈레톤만)
- PDF 다운로드/임베드 기능
- 학교 검색 외 필터링(계열별, 지역별 등)
- 백엔드/데이터베이스 연동 (모든 데이터는 정적)

## 성공 기준

- 네비게이션과 DATA 테이블 양쪽에서 성균관대 상세 페이지 진입 가능
- 성균관대 페이지에 PDF의 10개 섹션이 시각적으로 잘 전달됨
- DATA 자료실의 다른 학교명은 비활성화 표시 (호버 시 "준비 중" 툴팁 가능)
- 새 학교 데이터 파일 추가만으로 새 상세 페이지 활성화 가능
