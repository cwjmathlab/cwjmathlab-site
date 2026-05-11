# 2028 PREVIEW 카테고리 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 조우제수리논술LAB 사이트에 새 카테고리 `2028 PREVIEW` 페이지(`/2028`)를 추가해, 고1·고2 대상의 2028학년도 자연계열 논술전형 변화를 강사 관점으로 정리해 보여준다.

**Architecture:** 정적 React 페이지. 5개의 새 파일(데이터 모듈 1 + 컴포넌트 4 + 페이지 1)을 만들고 `App.tsx` 라우팅에 한 줄 분기를 추가한다. 기존 `DataPage`/`nonsulData.ts`/`schools/`는 변경하지 않는다 (2027 데이터 무손상).

**Tech Stack:** React 19 + TypeScript + Vite 8 (인라인 스타일, CSS 변수 기반 — 기존 코드 컨벤션 유지).

**프로젝트 컨벤션 메모:**
- 테스트 프레임워크가 설치되어 있지 않다 (`package.json`에 jest/vitest 없음). 따라서 각 태스크는 **`npm run build`로 TypeScript 컴파일 검증 + `npm run dev`로 시각 확인**으로 검증한다.
- 이 프로젝트는 git 저장소가 아니다. 따라서 커밋 단계는 생략한다.
- 모든 스타일은 인라인 + CSS 변수(`--primary-deep-forest` 등)로 작성한다 (기존 `App.tsx`/`DataPage.tsx`와 동일 패턴).

---

## File Structure

| 파일 | 역할 |
|---|---|
| `src/data/previewData.ts` (신규) | 페이지의 모든 정적 콘텐츠와 타입 정의 |
| `src/components/preview/SchoolCard.tsx` (신규) | 학교 1개를 카드로 렌더 (5필드 + 뱃지/정원 칩) |
| `src/components/preview/KeyChangeCards.tsx` (신규) | 3대 변화 카드 그리드 (3열 / 모바일 1열) |
| `src/components/preview/GroupBlock.tsx` (신규) | 계열 그룹 1개의 헤더 + 학교 카드 그리드 |
| `src/components/preview/ActionChecklist.tsx` (신규) | 행동 가이드 5개 체크리스트 |
| `src/pages/PreviewPage.tsx` (신규) | 페이지 셸 (히어로/인트로/3대카드/그룹×5/체크리스트/면책) |
| `src/App.tsx` (수정) | nav 항목 + `/2028` 라우트 분기 추가 |

---

## Task 1: 데이터 모듈 (`previewData.ts`)

**Files:**
- Create: `src/data/previewData.ts`

페이지의 모든 텍스트와 학교 데이터를 한 파일에 두는 게 사이트의 기존 컨벤션(`nonsulData.ts`, `aboutData.ts`, `curriculumData.ts`)과 일치한다.

- [ ] **Step 1: 새 파일 생성하고 타입과 메타 정보 작성**

```ts
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
```

- [ ] **Step 2: 3대 변화 카드 데이터 추가**

파일 끝에 이어서 작성:

```ts
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
```

- [ ] **Step 3: 5개 그룹 블록 데이터 추가**

파일 끝에 이어서 작성:

```ts
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
```

- [ ] **Step 4: 행동 가이드와 면책 문구 추가**

파일 끝에 이어서 작성:

```ts
export const actionChecklist: string[] = [
  '목표 대학의 최저 등급 라인을 확정하고, 그 라인을 기준으로 수능 학습량을 역산할 것',
  '출제 범위가 미발표된 대학은 전범위 + 확률과통계 포함 시나리오를 기본으로 잡고 학습할 것',
  '학생부 출결(특히 무단결석)을 점검할 것 — 일부 대학은 출결을 별도 반영함',
  '신설·부활 전형(대전대 한의예 / 한양대 에리카)은 첫 회 변동성을 감안해 안전지원 카드로만 활용할 것',
  '2027학년도 결과(현 고3) 발표 후 5~6월에 다시 점검할 것 — 이 시점에 시험범위 확정 발표가 나올 가능성이 높음'
];

export const previewDisclaimer =
  '본 자료는 2026년 5월 시점 각 대학 발표·계획안 기준이며, 실제 모집요강은 2027년 4월 이후 확정됩니다. 변경 가능성을 전제로 활용하십시오.';
```

- [ ] **Step 5: TypeScript 컴파일 검증**

Run: `npm run build`
Expected: 빌드 성공. 신규 의존성 없음. 오류 없음.

---

## Task 2: `SchoolCard` 컴포넌트

**Files:**
- Create: `src/components/preview/SchoolCard.tsx`

학교 1개를 카드 한 장으로 렌더한다. 5필드(name/scope/minReq/quota/note) + 선택적 뱃지(NEW/REVIVED/CLOSED) + 선택적 정원 증감 칩(+33 등).

- [ ] **Step 1: 컴포넌트 파일 작성**

```tsx
// src/components/preview/SchoolCard.tsx
import React from 'react';
import type { SchoolCardData, SchoolBadge } from '../../data/previewData';

const badgeStyles: Record<SchoolBadge, { bg: string; color: string; label: string }> = {
  NEW:     { bg: 'var(--accent-gold)',          color: '#3a2b00', label: 'NEW' },
  REVIVED: { bg: 'var(--primary-forest)',       color: '#fff',    label: 'REVIVED' },
  CLOSED:  { bg: '#9ca3af',                     color: '#fff',    label: 'CLOSED' }
};

export const SchoolCard: React.FC<{ data: SchoolCardData }> = ({ data }) => {
  const delta = data.quotaDelta;
  const deltaText =
    typeof delta === 'number' && delta !== 0 ? (delta > 0 ? `+${delta}` : `${delta}`) : null;

  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid var(--bg-beige)',
        borderRadius: '12px',
        padding: '1.25rem 1.25rem 1rem',
        backgroundColor: 'var(--bg-white)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        height: '100%'
      }}
    >
      {/* 우상단 칩 영역 */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          gap: '0.35rem',
          alignItems: 'center'
        }}
      >
        {deltaText && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              backgroundColor: delta! > 0 ? '#dcfce7' : '#fee2e2',
              color: delta! > 0 ? '#14532d' : '#7f1d1d'
            }}
          >
            {deltaText}
          </span>
        )}
        {data.badge && (
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '0.2rem 0.55rem',
              borderRadius: '999px',
              backgroundColor: badgeStyles[data.badge].bg,
              color: badgeStyles[data.badge].color
            }}
          >
            {badgeStyles[data.badge].label}
          </span>
        )}
      </div>

      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-deep-forest)', fontWeight: 700, paddingRight: '5rem' }}>
        {data.name}
      </h4>

      <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '0.75rem', rowGap: '0.3rem', fontSize: '0.9rem' }}>
        <dt style={{ color: 'var(--text-muted)' }}>시험범위</dt>
        <dd style={{ margin: 0 }}>{data.scope}</dd>
        <dt style={{ color: 'var(--text-muted)' }}>수능최저</dt>
        <dd style={{ margin: 0 }}>{data.minReq}</dd>
        <dt style={{ color: 'var(--text-muted)' }}>정원</dt>
        <dd style={{ margin: 0 }}>{data.quota}</dd>
      </dl>

      {data.note && (
        <p
          style={{
            margin: 0,
            marginTop: '0.25rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            borderTop: '1px dashed var(--bg-beige)',
            paddingTop: '0.5rem'
          }}
        >
          {data.note}
        </p>
      )}
    </div>
  );
};
```

- [ ] **Step 2: TypeScript 컴파일 검증**

Run: `npm run build`
Expected: 성공. `SchoolCard` 의존성이 데이터 모듈 타입을 정확히 가져오는지 확인.

---

## Task 3: `KeyChangeCards` 컴포넌트

**Files:**
- Create: `src/components/preview/KeyChangeCards.tsx`

3대 변화 카드 그리드. 데스크탑 3열, 모바일 1열. 각 카드는 stat 칩 + 헤드라인 + 본문.

- [ ] **Step 1: 컴포넌트 파일 작성**

```tsx
// src/components/preview/KeyChangeCards.tsx
import React from 'react';
import { keyChanges } from '../../data/previewData';

export const KeyChangeCards: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}
    >
      {keyChanges.map((c, idx) => (
        <article
          key={c.id}
          style={{
            backgroundColor: 'var(--bg-cream)',
            border: '1px solid var(--bg-beige)',
            borderRadius: '14px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'relative'
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary-forest)',
              letterSpacing: '0.05em'
            }}
          >
            ISSUE 0{idx + 1}
          </span>
          <span
            style={{
              alignSelf: 'flex-start',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.25rem 0.7rem',
              borderRadius: '999px',
              backgroundColor: 'var(--primary-deep-forest)',
              color: 'var(--bg-cream)'
            }}
          >
            {c.stat}
          </span>
          <h3
            style={{
              margin: 0,
              fontSize: '1.25rem',
              color: 'var(--primary-deep-forest)',
              fontWeight: 800,
              lineHeight: 1.35
            }}
          >
            {c.headline}
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            {c.body}
          </p>
        </article>
      ))}
    </div>
  );
};
```

- [ ] **Step 2: 컴파일 검증**

Run: `npm run build`
Expected: 성공.

---

## Task 4: `GroupBlock` 컴포넌트

**Files:**
- Create: `src/components/preview/GroupBlock.tsx`

그룹 1개의 헤더(label + summary) + 학교 카드 그리드. `top_science` 블록은 학교가 16개라 더 조밀한 그리드, 나머지는 더 큰 그리드.

- [ ] **Step 1: 컴포넌트 파일 작성**

```tsx
// src/components/preview/GroupBlock.tsx
import React from 'react';
import type { GroupBlock as GroupBlockData } from '../../data/previewData';
import { SchoolCard } from './SchoolCard';

export const GroupBlock: React.FC<{ block: GroupBlockData }> = ({ block }) => {
  const isDense = block.id === 'top_science';
  // 컨테이너 폭 ~1100px 기준: 320px → 데스크탑 3열, 태블릿 2열, 모바일 1열 (top_science)
  // 360px → 일반 그룹은 학교 수가 적어 데스크탑 2~3열로 자연스럽게 표시
  const minColWidth = isDense ? '320px' : '360px';

  return (
    <section style={{ marginBottom: '3rem' }}>
      <header style={{ marginBottom: '1.25rem' }}>
        <h2
          style={{
            margin: 0,
            fontSize: '1.5rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800
          }}
        >
          {block.label}
        </h2>
        <p
          style={{
            margin: '0.4rem 0 0',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.55
          }}
        >
          {block.summary}
        </p>
      </header>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))`,
          gap: '1rem'
        }}
      >
        {block.schools.map((s, idx) => (
          <SchoolCard key={`${block.id}-${idx}`} data={s} />
        ))}
      </div>
    </section>
  );
};
```

- [ ] **Step 2: 컴파일 검증**

Run: `npm run build`
Expected: 성공. `SchoolCard` 임포트 경로 일치 확인.

---

## Task 5: `ActionChecklist` 컴포넌트

**Files:**
- Create: `src/components/preview/ActionChecklist.tsx`

행동 가이드 5개 항목을 체크박스가 있는 리스트로. (기능적 체크는 아니고 시각용)

- [ ] **Step 1: 컴포넌트 파일 작성**

```tsx
// src/components/preview/ActionChecklist.tsx
import React from 'react';
import { actionChecklist } from '../../data/previewData';

export const ActionChecklist: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--bg-beige)',
        borderRadius: '14px',
        padding: '2rem',
        marginTop: '1rem'
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--primary-deep-forest)', fontWeight: 800 }}>
        고1·고2가 지금 해야 할 일
      </h2>
      <p style={{ marginTop: '0.4rem', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        체크리스트 다섯 개로 정리한 행동 가이드입니다.
      </p>
      <ol
        style={{
          margin: 0,
          paddingLeft: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem'
        }}
      >
        {actionChecklist.map((item, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              fontSize: '1rem',
              lineHeight: 1.55
            }}
          >
            <span
              aria-hidden
              style={{
                flex: '0 0 1.6rem',
                height: '1.6rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-deep-forest)',
                color: 'var(--bg-cream)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginTop: '0.05rem'
              }}
            >
              {idx + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};
```

- [ ] **Step 2: 컴파일 검증**

Run: `npm run build`
Expected: 성공.

---

## Task 6: `PreviewPage` 페이지

**Files:**
- Create: `src/pages/PreviewPage.tsx`

페이지 셸: 히어로 → 인트로 → 3대 변화 → 그룹 5개 → 체크리스트 → 면책. 기존 `DataPage`/`AboutPage`와 동일한 컨테이너/패딩 스타일.

- [ ] **Step 1: 페이지 파일 작성**

```tsx
// src/pages/PreviewPage.tsx
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  previewMeta,
  groupBlocks,
  previewDisclaimer
} from '../data/previewData';
import { KeyChangeCards } from '../components/preview/KeyChangeCards';
import { GroupBlock } from '../components/preview/GroupBlock';
import { ActionChecklist } from '../components/preview/ActionChecklist';

export const PreviewPage: React.FC = () => {
  useScrollReveal();

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 4rem' }}>
      {/* 히어로 */}
      <header
        className="scroll-reveal"
        style={{
          marginBottom: '2.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '2px solid var(--bg-beige)',
          position: 'relative'
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          Updated {previewMeta.publishedAt}
        </span>
        <span
          style={{
            display: 'inline-block',
            padding: '0.3rem 0.85rem',
            borderRadius: '999px',
            backgroundColor: 'var(--accent-gold)',
            color: '#3a2b00',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}
        >
          FOR 고1 · 고2
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: '2.2rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800,
            lineHeight: 1.25
          }}
        >
          {previewMeta.title}
        </h1>
        <p
          style={{
            margin: '0.5rem 0 0',
            fontSize: '1.1rem',
            color: 'var(--text-muted)'
          }}
        >
          {previewMeta.subtitle}
        </p>
      </header>

      {/* 인트로 */}
      <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
        {previewMeta.intro.map((para, idx) => (
          <p
            key={idx}
            style={{
              margin: idx === 0 ? '0 0 1rem' : 0,
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'var(--text-default, #1f2937)'
            }}
          >
            {para}
          </p>
        ))}
      </section>

      {/* 3대 변화 카드 */}
      <section className="scroll-reveal" style={{ marginBottom: '3.5rem' }}>
        <h2
          className="section-title"
          style={{ marginBottom: '1.5rem' }}
        >
          2028, 무엇이 달라지나
        </h2>
        <KeyChangeCards />
      </section>

      {/* 계열 그룹 */}
      <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
          계열별 정리
        </h2>
        {groupBlocks.map(block => (
          <GroupBlock key={block.id} block={block} />
        ))}
      </section>

      {/* 행동 가이드 */}
      <div className="scroll-reveal">
        <ActionChecklist />
      </div>

      {/* 면책 */}
      <p
        style={{
          marginTop: '2.5rem',
          padding: '1rem 1.25rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-cream)',
          borderRadius: '8px',
          lineHeight: 1.6
        }}
      >
        {previewDisclaimer}
      </p>
    </div>
  );
};
```

**참고:** `useScrollReveal`은 기존 파일 `src/hooks/useScrollReveal.ts`을 그대로 사용. `section-title`/`scroll-reveal`/`animate-fade-in`/`container` 클래스는 기존 `index.css`에 정의되어 있다.

- [ ] **Step 2: 컴파일 검증**

Run: `npm run build`
Expected: 성공. 모든 임포트 경로 정확. 신규 의존성 없음.

---

## Task 7: 라우팅 연결 (`App.tsx`)

**Files:**
- Modify: `src/App.tsx`

3개 위치만 수정한다 (import + navItems + main 분기). 다른 라우팅 로직은 변경하지 않는다.

- [ ] **Step 1: 임포트 추가**

`src/App.tsx`의 import 블록 (현재 1~8행)에서 `SchoolDetailPage` 임포트 바로 아래에 한 줄 추가:

기존:
```tsx
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { FloatingContact } from './components/FloatingContact';
```

변경:
```tsx
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { PreviewPage } from './pages/PreviewPage';
import { FloatingContact } from './components/FloatingContact';
```

- [ ] **Step 2: 네비게이션 항목 추가**

`navItems` 배열 (현재 13~19행) 끝에 한 줄 추가:

기존:
```tsx
const navItems = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/curriculum', label: 'CURRICULUM' },
  { path: '/schools', label: '학교별 상세' },
  { path: '/data', label: '2027 DATA' }
];
```

변경:
```tsx
const navItems = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/curriculum', label: 'CURRICULUM' },
  { path: '/schools', label: '학교별 상세' },
  { path: '/data', label: '2027 DATA' },
  { path: '/2028', label: '2028 PREVIEW' }
];
```

- [ ] **Step 3: 라우트 분기 추가**

`main` 안에서 (현재 178행 부근, `currentPath === '/data'` 분기 직후) `/2028` 분기를 추가한다:

기존:
```tsx
{currentPath === '/data' && <DataPage onNavigate={setCurrentPath} />}
{currentPath === '/schools' && <SchoolListPage onNavigate={setCurrentPath} />}
```

변경:
```tsx
{currentPath === '/data' && <DataPage onNavigate={setCurrentPath} />}
{currentPath === '/2028' && <PreviewPage />}
{currentPath === '/schools' && <SchoolListPage onNavigate={setCurrentPath} />}
```

- [ ] **Step 4: 컴파일 검증**

Run: `npm run build`
Expected: 성공. 빌드 결과물 크기가 약간 증가하지만 신규 의존성은 없다.

---

## Task 8: 시각 검증 (개발 서버)

**Files:** (변경 없음 — 검증만)

- [ ] **Step 1: 개발 서버 실행**

Run: `npm run dev`
Expected: Vite가 `http://localhost:5173` (혹은 비슷한 포트)에서 실행됨.

- [ ] **Step 2: 네비게이션에 `2028 PREVIEW` 노출 확인**

브라우저에서 사이트를 열고:
- 상단 네비에 `HOME · ABOUT · CURRICULUM · 학교별 상세 · 2027 DATA · 2028 PREVIEW` 6개가 보이는지 확인
- `2028 PREVIEW`를 클릭하면 새 페이지로 이동하는지 확인

- [ ] **Step 3: 페이지 섹션 6개 모두 렌더링되는지 확인**

페이지에서 위에서 아래로 다음이 모두 보이는지 확인:
1. 히어로 ("FOR 고1·고2" 칩 + 제목 + 부제 + 우상단 "Updated 2026.05")
2. 인트로 단락 2개
3. 3대 변화 카드 3개 (ISSUE 01/02/03 + stat 칩 + 헤드라인 + 본문)
4. 계열 그룹 5개 블록 (의예과 / 치·한의예 / 약학 / 주요 자연계 / 신설·부활·폐지)
5. "고1·고2가 지금 해야 할 일" 체크리스트 5개
6. 하단 면책 문구

- [ ] **Step 4: 뱃지와 정원 칩 확인**

- "신설·부활·폐지" 블록에서 대전대(한의예)에 `NEW`(gold), 한양대(에리카)에 `REVIVED`(forest), 부산대에 `CLOSED`(gray) 뱃지가 보이는지
- "주요 자연계" 블록에서 학교 카드 우상단에 `+33`, `+57`, `+47`, `-8` 같은 정원 증감 칩이 보이는지 (양수는 녹색 배경, 음수는 적색 배경)

- [ ] **Step 5: 모바일 뷰포트 확인**

브라우저 개발자 도구로 폭을 360~480px로 줄이고:
- 3대 변화 카드가 1열로 세로 스택되는지
- 학교 카드 그리드가 1열이 되는지
- 텍스트나 칩이 잘리지 않는지

- [ ] **Step 6: 기존 페이지가 그대로 동작하는지 회귀 확인**

`HOME`, `ABOUT`, `CURRICULUM`, `학교별 상세`, `2027 DATA` 다섯 탭을 모두 클릭해서 기존과 동일하게 렌더링되는지 확인. (특히 `2027 DATA`의 표가 변경 없이 동일해야 함.)

- [ ] **Step 7: 최종 production 빌드**

Run: `npm run build`
Expected: 빌드 성공. 출력물 크기가 기존(~230KB) 대비 합리적인 범위 내(추가 데이터/컴포넌트 ~10~20KB 증가) 인지 확인.

---

## 완료 조건 체크리스트

스펙의 "성공 기준"과 1:1 매칭:

- [ ] `/2028` 진입 시 6개 섹션이 모두 렌더링된다
- [ ] 모바일 뷰포트(360~480px)에서 카드가 세로 스택으로 깨지지 않는다
- [ ] 기존 `2027 DATA` 페이지/데이터는 변경 전과 100% 동일하게 동작한다
- [ ] `npm run build` 통과, 신규 의존성 없음
- [ ] 페이지 어디에도 외부 출처(메가스터디·김종두 등)가 노출되지 않으며, 콘텐츠는 강사 본인 명의 분석으로만 구성된다
