# 성균관대 수리논술 특강 랜딩페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 2026-08-02 개강 성균관대 수리논술 4회 특강을 위한 단일 랜딩페이지(`/sungkyunkwan-special`)와 진입 경로(EventBanner, Home Hero) 구현.

**Architecture:** 기존 사이트의 path-state 라우팅(`useState` for `currentPath`) 패턴을 그대로 따르며, 11개 섹션을 독립 컴포넌트로 분리해 `src/components/skku-special/` 디렉터리에 모은다. 데이터는 단일 모듈 `src/data/skkuSpecial.ts`로 집중하여 모집요강 변경 시 한 파일만 수정하면 되게 한다. EventBanner는 `Event.link?` 필드를 통해 분기하여 향후 다른 이벤트와도 공존 가능하게 한다.

**Tech Stack:** React 19 + Vite 8 + TypeScript, vitest + jsdom (테스트), 인라인 스타일 + 전역 CSS 변수(`--primary-deep-forest`, `--accent-gold` 등).

**Spec reference:** `docs/superpowers/specs/2026-05-21-skku-special-landing-design.md`

---

## File Structure (전체 작업 범위)

**Create (15 files):**
- `src/data/skkuSpecial.ts` — 데이터 단일 모듈 (course, exam, competition, slogan, contact, faq, sessionArchive)
- `src/data/skkuSpecial.test.ts` — 데이터 형상 검증 테스트
- `src/pages/SkkuSpecialPage.tsx` — 페이지 컨테이너
- `src/components/skku-special/SkkuSpecialHero.tsx` — ① Hero
- `src/components/skku-special/ExamScopeProofBox.tsx` — ② 출제범위 박제
- `src/components/skku-special/KeyDatesTimeline.tsx` — ③ 시험·전형 일정
- `src/components/skku-special/CompetitionInsight.tsx` — ④ 경쟁률 반전
- `src/components/skku-special/SpecialCourseCard.tsx` — ⑤ 특강 정보 + CTA
- `src/components/skku-special/InstructorSection.tsx` — ⑥ 강사 동문
- `src/components/skku-special/TeachingApproach.tsx` — ⑦ 수업 방식
- `src/components/skku-special/ReviewsSection.tsx` — ⑧ 후기
- `src/components/skku-special/SessionArchive.tsx` — ⑨ 진행 기록 (조건부)
- `src/components/skku-special/FaqSection.tsx` — ⑩ FAQ
- `src/components/skku-special/FinalCta.tsx` — ⑪ 최종 CTA

**Modify (4 files):**
- `src/data/events.ts` — `Event.link?: string` 필드 추가 + 8/2 특강 이벤트 등록
- `src/data/events.test.ts` — link 필드 테스트 추가
- `src/App.tsx` — 라우트 추가, EventBanner 클릭 분기, 홈 Hero 보조 CTA
- `index.html` — OG 메타 태그 추가/갱신

---

## Pre-flight Checklist (구현 시작 전)

작업 시작 전 반드시 확인:

- [ ] **현재 브랜치 확인**: `git status` 및 `git branch` — main 브랜치 깨끗한 상태인지
- [ ] **테스트 환경 작동 확인**: `npm test` 실행 → 기존 테스트 모두 통과해야 함
- [ ] **개발 서버 작동 확인**: `npm run dev` 실행 → http://localhost:5173 에서 사이트가 정상 로드되는지

문제가 있으면 진행 전 사용자에게 보고.

---

### Task 1: skkuSpecial 데이터 모듈 작성

**Goal:** 페이지의 모든 정적 데이터를 단일 모듈에 모은다. 모집요강 변경 시 이 파일만 수정.

**Files:**
- Create: `src/data/skkuSpecial.ts`
- Create: `src/data/skkuSpecial.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/data/skkuSpecial.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { skkuSpecial } from './skkuSpecial';

describe('skkuSpecial 데이터', () => {
  it('course.sessions는 4개의 ISO 날짜 (일요일)를 가진다', () => {
    expect(skkuSpecial.course.sessions).toHaveLength(4);
    for (const date of skkuSpecial.course.sessions) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const [y, m, d] = date.split('-').map(Number);
      expect(new Date(y, m - 1, d).getDay()).toBe(0); // 일요일
    }
  });

  it('exam.scope에는 미적분·확통·기하가 포함되지 않는다', () => {
    expect(skkuSpecial.exam.scope).toEqual(['수학', '수학Ⅰ', '수학Ⅱ']);
    expect(skkuSpecial.exam.excludedScope).toEqual(['미적분', '확률과 통계', '기하']);
  });

  it('competition.overall은 모집·지원·경쟁률·충원율을 가진다', () => {
    const { capacity, applicants, ratio, fillRate } = skkuSpecial.competition.overall;
    expect(capacity).toBe(204);
    expect(applicants).toBe(26_101);
    expect(ratio).toBe(127.95);
    expect(fillRate).toBe(15.7);
  });

  it('competition.byUnit는 최소 19개 이상의 모집단위를 가진다', () => {
    expect(skkuSpecial.competition.byUnit.length).toBeGreaterThanOrEqual(19);
    for (const unit of skkuSpecial.competition.byUnit) {
      expect(unit.name.length).toBeGreaterThan(0);
      expect(unit.capacity).toBeGreaterThan(0);
      expect(unit.ratio).toBeGreaterThan(0);
    }
  });

  it('contact는 phone과 kakaoOpenChat을 가진다', () => {
    expect(skkuSpecial.contact.phone).toBe('0323219937');
    expect(skkuSpecial.contact.kakaoOpenChat).toBe('https://open.kakao.com/o/gtz16Omh');
  });

  it('faq는 최소 4개 이상의 Q&A를 가진다', () => {
    expect(skkuSpecial.faq.length).toBeGreaterThanOrEqual(4);
    for (const item of skkuSpecial.faq) {
      expect(item.q.length).toBeGreaterThan(0);
      expect(item.a.length).toBeGreaterThan(0);
    }
  });

  it('sessionArchive는 빈 배열로 시작 (사진 추가되면 채워짐)', () => {
    expect(Array.isArray(skkuSpecial.sessionArchive)).toBe(true);
  });
});
```

- [ ] **Step 2: 테스트 실행 (실패 확인)**

Run: `npm test src/data/skkuSpecial.test.ts`
Expected: FAIL with module not found

- [ ] **Step 3: 데이터 모듈 작성**

`src/data/skkuSpecial.ts`:

```typescript
export type CompetitionUnit = {
  name: string;
  capacity: number;
  applicants: number;
  ratio: number;
  fillRate: number;
};

export type SessionArchiveEntry = {
  session: number;
  date: string;
  images: string[];
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
    date: '2025-11-16',
    venueAnnounceDate: '2025-10-28',
    sourceNote: '2025학년도 모집요강 기준 (2026 일정은 5월 30일경 공식 발표 예정)',
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
      a: '모집단위별로 3합 5/6 기준이며, 탐구 2과목 평균 또는 과탐 상위 1과목 반영 등 룰이 복잡합니다. 자세한 내용은 성균관대 학교 페이지에서 확인하실 수 있습니다.',
    },
    {
      q: '언어형/수리형 교차 지원 가능한가요?',
      a: '가능합니다. 두 전형은 별개로 운영되며 중복 지원 가능합니다. 단, 이과생이 언어형을 지원하는 경우 수학 영역 의무 반영 함정이 있으니 주의가 필요합니다.',
    },
    {
      q: '수업 장소는 어디인가요?',
      a: '문의 시 안내드립니다. 우측 하단 전화 또는 카톡으로 연락 주세요.',
    },
  ],
  sessionArchive: [] as SessionArchiveEntry[],
};
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test src/data/skkuSpecial.test.ts`
Expected: PASS (7 passing)

- [ ] **Step 5: 커밋**

```bash
git add src/data/skkuSpecial.ts src/data/skkuSpecial.test.ts
git commit -m "feat(data): skkuSpecial 모듈 신설 — 일정·시험·경쟁률·FAQ 데이터 집중

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: events.ts 에 link 필드 추가 + 8/2 특강 이벤트 등록

**Goal:** EventBanner가 클릭 시 특강 페이지로 이동할 수 있도록 Event 데이터에 옵셔널 `link` 필드를 추가한다.

**Files:**
- Modify: `src/data/events.ts`
- Modify: `src/data/events.test.ts`

- [ ] **Step 1: events.test.ts에 link 필드 테스트 추가**

`src/data/events.test.ts` 의 `describe('events 데이터', ...)` 블록 안 마지막에 다음 테스트를 추가 (기존 테스트들 아래):

```typescript
  it('link 필드는 옵셔널이고, 있으면 슬래시로 시작하거나 외부 URL이다', () => {
    for (const ev of events) {
      if (ev.link !== undefined) {
        expect(typeof ev.link).toBe('string');
        expect(ev.link.startsWith('/') || ev.link.startsWith('http')).toBe(true);
      }
    }
  });

  it('id "2026-08-02-skku-special" 이벤트가 존재하고 /sungkyunkwan-special로 링크된다', () => {
    const ev = events.find(e => e.id === '2026-08-02-skku-special');
    expect(ev).toBeDefined();
    expect(ev?.link).toBe('/sungkyunkwan-special');
  });
```

- [ ] **Step 2: 테스트 실행 (실패 확인)**

Run: `npm test src/data/events.test.ts`
Expected: FAIL (link 이벤트 없음)

- [ ] **Step 3: Event 타입에 link 추가 + 8/2 이벤트 등록**

`src/data/events.ts`:

기존 `Event` 타입에 `link?: string` 추가:

```typescript
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
```

`events` 배열에 새 이벤트 추가 (기존 정율사관학원 설명회 위에):

```typescript
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
    title: '2027 6월 모의평가 결과 분석 + 수리논술 지원 전략 설명회',
    date: '2026-06-05',
    time: '19:30',
    location: '정율사관학원 6층 대강당',
    audience: '고3 · 재수생 / 학부모',
    summary:
      '2027학년도 6월 모의평가 결과를 토대로 수리논술 학습 방향을 진단하고, ' +
      '올해 지원 전략을 함께 점검합니다.',
  },
];
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test src/data/events.test.ts`
Expected: PASS (모두 통과, 새 테스트 2개 포함)

- [ ] **Step 5: 커밋**

```bash
git add src/data/events.ts src/data/events.test.ts
git commit -m "feat(events): Event.link 옵셔널 필드 추가 + 8/2 성균관대 특강 이벤트 등록

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: App.tsx 에 라우트 추가 + EventBanner 클릭 분기

**Goal:** `/sungkyunkwan-special` 라우트를 등록하고, EventBanner 클릭 시 다음 이벤트의 `link` 필드에 따라 페이지 이동 또는 스크롤 분기.

**Files:**
- Modify: `src/App.tsx`

먼저 이 시점에는 `SkkuSpecialPage` 컴포넌트가 아직 없으므로, **Task 4 에서 페이지 스텁을 만든 뒤** 이 Task를 진행하는 것이 자연스럽지만, 이 Plan 에서는 `SkkuSpecialPage`를 lazy하게 import 하지 않고 빈 컴포넌트로 먼저 만든 다음 진행한다.

- [ ] **Step 1: 빈 SkkuSpecialPage 스텁 생성 (라우트 검증용)**

`src/pages/SkkuSpecialPage.tsx`:

```tsx
import React from 'react';

export const SkkuSpecialPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1>성균관대 수리논술 특강 (구현 중)</h1>
    </div>
  );
};
```

- [ ] **Step 2: App.tsx 에 페이지 import + 라우트 추가**

`src/App.tsx` 상단 import 블록에 추가:

```tsx
import { SkkuSpecialPage } from './pages/SkkuSpecialPage';
import { getNextEvent } from './data/events';
```

`navigateToEventSection` 함수를 다음과 같이 수정 — `link` 있으면 페이지 이동, 없으면 기존 스크롤:

```tsx
  const navigateToEventSection = () => {
    const next = getNextEvent();
    if (next?.link) {
      setCurrentPath(next.link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPath('/about');
    setTimeout(() => {
      document.getElementById('event')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };
```

라우트 분기 추가 — 기존 `{currentPath === '/2028' && <PreviewPage />}` 줄 아래에 추가:

```tsx
        {currentPath === '/sungkyunkwan-special' && <SkkuSpecialPage />}
```

- [ ] **Step 3: 개발 서버에서 라우트 동작 검증**

Run: `npm run dev` (이미 실행 중이면 자동 HMR)
브라우저에서 확인:
1. http://localhost:5173 접속 → EventBanner 클릭 → `/sungkyunkwan-special`로 이동하고 "구현 중" 메시지 노출되는지
2. 페이지 상단으로 자동 스크롤되는지

브라우저 콘솔에 에러 없어야 함.

- [ ] **Step 4: 기존 테스트 회귀 확인**

Run: `npm test`
Expected: 모든 기존 테스트 + Task 1, 2의 테스트 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/App.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(routing): /sungkyunkwan-special 라우트 + EventBanner 클릭 분기

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: SkkuSpecialPage 컨테이너 골격 + 11 섹션 슬롯

**Goal:** 페이지 컨테이너에 11개 섹션 자리를 잡는다. 각 섹션은 이 Task 이후 개별 Task에서 채움.

**Files:**
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: SkkuSpecialPage를 섹션 슬롯으로 재구성**

`src/pages/SkkuSpecialPage.tsx` 전체 교체:

```tsx
import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const SkkuSpecialPage: React.FC = () => {
  useScrollReveal();

  // 페이지 진입 시 항상 최상단부터 (path 변경 후 스크롤 위치 리셋)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* ① Hero */}
      <section data-section="hero" />

      {/* ② 출제범위 박제 */}
      <section data-section="exam-scope" />

      {/* ③ 시험·전형 일정 */}
      <section data-section="key-dates" />

      {/* ④ 경쟁률 반전 */}
      <section data-section="competition" />

      {/* ⑤ 특강 정보 + CTA */}
      <section data-section="course" id="course" />

      {/* ⑥ 강사 동문 */}
      <section data-section="instructor" />

      {/* ⑦ 수업 방식 */}
      <section data-section="approach" />

      {/* ⑧ 후기 */}
      <section data-section="reviews" />

      {/* ⑨ 진행 기록 (조건부) */}
      <section data-section="archive" />

      {/* ⑩ FAQ */}
      <section data-section="faq" />

      {/* ⑪ 최종 CTA */}
      <section data-section="final-cta" />
    </div>
  );
};
```

- [ ] **Step 2: 라우트 진입 시 페이지 골격 노출 확인**

Run: `npm run dev` (HMR)
브라우저에서 `/sungkyunkwan-special` 접속 → 빈 페이지지만 에러 없이 렌더되어야 함. DevTools Elements 에서 `data-section` 11개 보이면 OK.

- [ ] **Step 3: 커밋**

```bash
git add src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): 페이지 컨테이너 + 11 섹션 슬롯 골격

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: ① SkkuSpecialHero 컴포넌트

**Goal:** 페이지 최상단 Hero — 슬로건 인용 + 메인 카피 + 강사 사진 + 신청 버튼.

**Files:**
- Create: `src/components/skku-special/SkkuSpecialHero.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: SkkuSpecialHero 컴포넌트 작성**

`src/components/skku-special/SkkuSpecialHero.tsx`:

```tsx
import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

type Props = {
  onCtaClick: () => void;
};

export const SkkuSpecialHero: React.FC<Props> = ({ onCtaClick }) => {
  return (
    <div className="bg-math-pattern scroll-reveal" style={{
      background: 'linear-gradient(to right bottom, var(--primary-deep-forest), var(--primary-forest))',
      color: 'white',
      padding: '5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ flex: '1 1 480px', minWidth: '300px' }}>
          {/* 성균관대 슬로건 인용 */}
          <div style={{
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
            borderLeft: '3px solid var(--accent-gold)',
            paddingLeft: '1rem',
          }}>
            "{skkuSpecial.slogan}"
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
              — 성균관대학교
            </div>
          </div>

          {/* 메인 카피 */}
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: '1.5rem',
            color: 'var(--bg-cream)',
          }}>
            확통이든 미적분이든,<br/>
            성균관대 수리논술은<br/>
            <span style={{ color: 'var(--accent-gold)' }}>같은 시험입니다.</span>
          </h1>

          {/* 보조 카피 */}
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            opacity: 0.9,
            marginBottom: '2.5rem',
            maxWidth: '560px',
          }}>
            출제범위는 <strong>수학·수학Ⅰ·수학Ⅱ</strong>. 선택과목으로 갈리지 않습니다.<br/>
            성균관대 동문 강사가 직접 지도하는 <strong>4회 압축 특강</strong>.
          </p>

          {/* CTA */}
          <button
            onClick={onCtaClick}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.15rem',
              fontWeight: 700,
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            📅 신청·문의
          </button>
        </div>

        {/* 강사 사진 */}
        <div style={{
          flex: '0 0 auto',
          width: '340px',
          height: '420px',
          position: 'relative',
        }}>
          <img
            src="/profile.png"
            alt="조우제 선생님"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 Hero 연결**

`src/pages/SkkuSpecialPage.tsx`:

import 추가:
```tsx
import { SkkuSpecialHero } from '../components/skku-special/SkkuSpecialHero';
```

`scrollToCourse` 헬퍼 추가 + Hero 슬롯 채우기:

```tsx
export const SkkuSpecialPage: React.FC = () => {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const scrollToCourse = () => {
    document.getElementById('course')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="animate-fade-in">
      <SkkuSpecialHero onCtaClick={scrollToCourse} />

      {/* ② ~ ⑪ : 후속 Task 에서 채움 */}
      <section data-section="exam-scope" />
      <section data-section="key-dates" />
      <section data-section="competition" />
      <section data-section="course" id="course" />
      <section data-section="instructor" />
      <section data-section="approach" />
      <section data-section="reviews" />
      <section data-section="archive" />
      <section data-section="faq" />
      <section data-section="final-cta" />
    </div>
  );
};
```

- [ ] **Step 3: 브라우저 확인**

Run: `npm run dev` (HMR)
브라우저 `/sungkyunkwan-special`:
- Hero 노출, 슬로건·메인 카피·강사 사진·CTA 모두 보임
- CTA 클릭 시 `#course` 로 스크롤 (현재는 빈 섹션이라 페이지 끝 가까이로 이동)
- 모바일 폭(DevTools 360px)에서 세로 스택으로 깨지지 않고 정렬되는지

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/SkkuSpecialHero.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ① Hero — 슬로건·메인카피·강사사진·CTA

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: ② ExamScopeProofBox — 출제범위 박제

**Goal:** 모집요강 원문 인용 카드로 "선택과목 무관"임을 시각적으로 박는다. 페이지 전체의 핵심 무기.

**Files:**
- Create: `src/components/skku-special/ExamScopeProofBox.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/ExamScopeProofBox.tsx`:

```tsx
import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const ExamScopeProofBox: React.FC = () => {
  const { exam } = skkuSpecial;

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        공식 모집요강 <span style={{ color: 'var(--accent-gold)' }}>그대로</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '700px',
        margin: '0 auto 3rem',
        fontSize: '1.05rem',
      }}>
        성균관대학교 입학처가 공식 발표한 시험 구성을 그대로 옮긴 것입니다.
      </p>

      {/* 모집요강 인용 카드 */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto 2.5rem',
        background: 'var(--bg-white)',
        border: '2px solid var(--primary-deep-forest)',
        borderRadius: '12px',
        padding: '2rem 2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      }}>
        <div style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px dashed var(--border-color)',
        }}>
          성균관대학교 수시모집 요강 — 4. 논술시험 안내
        </div>
        <dl style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: '1.5rem',
          rowGap: '0.75rem',
          margin: 0,
          fontSize: '1.05rem',
        }}>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>시험형식</dt>
          <dd style={{ color: 'var(--text-dark)', margin: 0 }}>논술</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>평가시간</dt>
          <dd style={{ color: 'var(--text-dark)', margin: 0 }}>{exam.duration}분</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>시험내용</dt>
          <dd style={{ color: 'var(--primary-deep-forest)', margin: 0, fontWeight: 700 }}>
            {exam.scope.join(', ')} — {exam.questions}문제
          </dd>
        </dl>
        <div style={{
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontFamily: 'inherit',
        }}>
          {exam.sourceNote}
        </div>
      </div>

      {/* 제외 강조 */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto 1.5rem',
        textAlign: 'center',
        padding: '1.5rem',
        background: 'var(--bg-beige)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--accent-red, #dc2626)',
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
          {exam.excludedScope.map(s => `❌ ${s}`).join(' · ')}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          출제 범위에 <strong>없습니다.</strong>
        </div>
      </div>

      {/* 결론 */}
      <p style={{
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--primary-deep-forest)',
        lineHeight: 1.5,
      }}>
        선택과목과 무관하게,<br/>
        <span style={{ color: 'var(--accent-gold)' }}>모든 응시자가 같은 시험을 봅니다.</span>
      </p>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import 추가:
```tsx
import { ExamScopeProofBox } from '../components/skku-special/ExamScopeProofBox';
```

`<section data-section="exam-scope" />` 자리에 `<ExamScopeProofBox />` 로 교체.

- [ ] **Step 3: 브라우저 확인**

`/sungkyunkwan-special` 새로고침:
- Hero 아래에 모집요강 인용 카드 노출
- 미적분·확통·기하 ❌ 강조 박스 노출
- 결론 문구 노출
- 모바일 폭에서 인용 카드가 깨지지 않는지

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/ExamScopeProofBox.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ② 출제범위 박제 박스

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: ③ KeyDatesTimeline — 시험·전형 핵심 일정

**Goal:** D-Day 카운터 + 일정 카드 3장 + 수능최저 요약 + 학교 페이지 링크.

**Files:**
- Create: `src/components/skku-special/KeyDatesTimeline.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/KeyDatesTimeline.tsx`:

```tsx
import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

type Props = {
  onNavigateToSchool: () => void;
};

function daysUntil(isoDate: string, today: Date = new Date()): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round((target - todayStart) / (1000 * 60 * 60 * 24));
}

function formatKDate(isoDate: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}(${DAYS[date.getDay()]})`;
}

export const KeyDatesTimeline: React.FC<Props> = ({ onNavigateToSchool }) => {
  const { exam } = skkuSpecial;
  const dDay = daysUntil(exam.date);
  const dDayLabel = dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : `D+${-dDay}`;

  return (
    <div style={{
      background: 'var(--bg-cream)',
      padding: '5rem 1.5rem',
    }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          시험·전형 <span style={{ color: 'var(--accent-gold)' }}>핵심 일정</span>
        </h2>

        {/* D-Day */}
        <div style={{
          textAlign: 'center',
          margin: '2rem auto 3rem',
        }}>
          <div style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>
            논술시험까지
          </div>
          <div style={{
            fontSize: '4rem',
            fontWeight: 900,
            color: 'var(--primary-deep-forest)',
            lineHeight: 1,
          }}>
            {dDayLabel}
          </div>
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}>
            ※ {exam.sourceNote}
          </div>
        </div>

        {/* 일정 카드 2장 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '720px',
          margin: '0 auto 4rem',
        }}>
          <div className="hover-card" style={{
            background: 'var(--bg-white)',
            padding: '1.75rem',
            borderRadius: '12px',
            borderLeft: '4px solid var(--primary-deep-forest)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>논술시험</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-deep-forest)' }}>
              {formatKDate(exam.date)}
            </div>
          </div>
          <div className="hover-card" style={{
            background: 'var(--bg-white)',
            padding: '1.75rem',
            borderRadius: '12px',
            borderLeft: '4px solid var(--accent-gold)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>시험장 발표</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-deep-forest)' }}>
              {formatKDate(exam.venueAnnounceDate)}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              성균관대 입학안내 홈페이지
            </div>
          </div>
        </div>

        {/* 수능최저 요약 */}
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 700,
            marginBottom: '1rem',
            textAlign: 'center',
          }}>
            수능 최저학력기준 요약
          </h3>
          <div style={{
            background: 'var(--bg-white)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
          }}>
            <dl style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: '1.5rem',
              rowGap: '1rem',
              margin: 0,
              fontSize: '0.95rem',
            }}>
              <dt style={{ fontWeight: 700, color: 'var(--accent-red, #dc2626)' }}>의예과</dt>
              <dd style={{ margin: 0, color: 'var(--text-dark)' }}>4개 영역 중 3합 4</dd>
              <dt style={{ fontWeight: 700, color: 'var(--primary-deep-forest)' }}>자유전공·반도체·약학 등</dt>
              <dd style={{ margin: 0, color: 'var(--text-dark)' }}>5개 영역 중 3합 5</dd>
              <dt style={{ fontWeight: 700, color: 'var(--primary-forest)' }}>자연과학·공학·건설환경 등</dt>
              <dd style={{ margin: 0, color: 'var(--text-dark)' }}>5개 영역 중 3합 6</dd>
            </dl>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onNavigateToSchool}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-deep-forest)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              수능최저·교차지원 함정 자세히 보기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결 (네비게이션 prop 전달)**

`src/pages/SkkuSpecialPage.tsx` props 변경 필요. App.tsx에서 `setCurrentPath`를 prop으로 받도록 함:

```tsx
type Props = {
  onNavigate: (path: string) => void;
};

export const SkkuSpecialPage: React.FC<Props> = ({ onNavigate }) => {
  // ...
  return (
    <div className="animate-fade-in">
      <SkkuSpecialHero onCtaClick={scrollToCourse} />
      <ExamScopeProofBox />
      <KeyDatesTimeline onNavigateToSchool={() => onNavigate('/schools/sungkyunkwan')} />
      {/* ④ ~ ⑪ 후속 Task */}
      <section data-section="competition" />
      <section data-section="course" id="course" />
      <section data-section="instructor" />
      <section data-section="approach" />
      <section data-section="reviews" />
      <section data-section="archive" />
      <section data-section="faq" />
      <section data-section="final-cta" />
    </div>
  );
};
```

import 추가:
```tsx
import { KeyDatesTimeline } from '../components/skku-special/KeyDatesTimeline';
```

- [ ] **Step 3: App.tsx 에서 onNavigate 전달**

`{currentPath === '/sungkyunkwan-special' && <SkkuSpecialPage />}` 부분을:

```tsx
        {currentPath === '/sungkyunkwan-special' && <SkkuSpecialPage onNavigate={setCurrentPath} />}
```

- [ ] **Step 4: 브라우저 확인**

`/sungkyunkwan-special` 새로고침:
- D-Day 카운터 노출 (오늘이 2026-05-21이고 시험일이 2025-11-16이면 음수 표시 `D+186` 정도)
- 일정 카드 2장 노출
- 수능최저 요약 표 노출
- "자세히 보기" 클릭 시 `/schools/sungkyunkwan` 으로 이동하는지

- [ ] **Step 5: 커밋**

```bash
git add src/components/skku-special/KeyDatesTimeline.tsx src/pages/SkkuSpecialPage.tsx src/App.tsx
git commit -m "feat(skku-special): ③ 시험·전형 일정 + 학교 페이지 링크

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: ④ CompetitionInsight — 경쟁률 반전

**Goal:** 표면 127.95 경쟁률의 충격 + 실질 경쟁률 반전 인사이트 + 학과별 미니 표 (접기/펼치기).

**Files:**
- Create: `src/components/skku-special/CompetitionInsight.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/CompetitionInsight.tsx`:

```tsx
import React, { useState } from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const CompetitionInsight: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { overall, byUnit, year } = skkuSpecial.competition;

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        표면 경쟁률 vs <span style={{ color: 'var(--accent-gold)' }}>실질 경쟁률</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 3rem',
      }}>
        {year}학년도 입시결과 기준
      </p>

      {/* 큰 숫자 3개 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto 3rem',
      }}>
        {[
          { value: overall.capacity.toLocaleString(), label: '모집인원', sub: '명' },
          { value: overall.applicants.toLocaleString(), label: '지원자', sub: '명' },
          { value: overall.ratio.toFixed(2), label: '표면 경쟁률', sub: ': 1' },
        ].map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            background: 'var(--bg-white)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '2.75rem',
              fontWeight: 900,
              color: 'var(--primary-deep-forest)',
              lineHeight: 1,
            }}>
              {stat.value}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
                {stat.sub}
              </span>
            </div>
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 반전 인사이트 박스 */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 3rem',
        background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
        color: 'var(--bg-cream)',
        borderRadius: '16px',
        padding: '2.5rem',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          marginBottom: '1.5rem',
          color: 'var(--accent-gold)',
        }}>
          경쟁률 127.95는 <u>허수</u>입니다
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          lineHeight: 1.7,
          fontSize: '1.05rem',
        }}>
          <li>▸ 실제 시험장 응시율: 약 <strong style={{ color: 'var(--accent-gold)' }}>44.7~46.5%</strong></li>
          <li>▸ 그 중 수능최저 통과자: 약 <strong style={{ color: 'var(--accent-gold)' }}>28%</strong></li>
          <li>▸ <strong>실질 경쟁률 = 약 <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>16 : 1</span></strong> (표면의 1/8)</li>
        </ul>
      </div>

      {/* 학과별 미니 표 */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'var(--bg-beige)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontWeight: 600,
            color: 'var(--primary-deep-forest)',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          aria-expanded={expanded}
        >
          <span>모집단위별 경쟁률 (전체 {byUnit.length}개) {expanded ? '접기' : '펼치기'}</span>
          <span style={{ fontSize: '1.2rem' }}>{expanded ? '▴' : '▾'}</span>
        </button>
        {expanded && (
          <div style={{
            marginTop: '1rem',
            overflowX: 'auto',
            background: 'var(--bg-white)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.92rem',
            }}>
              <thead>
                <tr style={{ background: 'var(--bg-cream)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>모집단위</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>모집</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>지원</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>경쟁률</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>충원율</th>
                </tr>
              </thead>
              <tbody>
                {byUnit.map((u, i) => {
                  const isAlert = u.ratio > 200; // 약학·의예
                  return (
                    <tr key={u.name} style={{
                      borderTop: i === 0 ? 'none' : '1px solid var(--border-color)',
                      color: isAlert ? 'var(--accent-red, #dc2626)' : 'var(--text-dark)',
                      fontWeight: isAlert ? 600 : 400,
                    }}>
                      <td style={{ padding: '0.6rem 1rem' }}>{u.name}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.capacity}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.applicants.toLocaleString()}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.ratio.toFixed(2)}</td>
                      <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{u.fillRate.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import 추가:
```tsx
import { CompetitionInsight } from '../components/skku-special/CompetitionInsight';
```

`<section data-section="competition" />` 자리에 `<CompetitionInsight />` 로 교체.

- [ ] **Step 3: 브라우저 확인**

- 큰 숫자 3개 노출 (204 / 26,101 / 127.95)
- 반전 인사이트 박스 노출
- "펼치기" 버튼 클릭 시 19개 모집단위 표 노출, 약학·의예는 빨간색
- 다시 누르면 접힘

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/CompetitionInsight.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ④ 경쟁률 반전 + 모집단위별 표 (접기/펼치기)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: ⑤ SpecialCourseCard — 특강 정보 + 신청 CTA

**Goal:** 페이지의 핵심 컨버전 섹션. 일정·수강료·CTA 버튼 2개.

**Files:**
- Create: `src/components/skku-special/SpecialCourseCard.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/SpecialCourseCard.tsx`:

```tsx
import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

function formatSessionDate(iso: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = iso.split('-').map(Number);
  const day = DAYS[new Date(y, m - 1, d).getDay()];
  return `${m}/${d}(${day})`;
}

export const SpecialCourseCard: React.FC = () => {
  const { course, contact } = skkuSpecial;
  const sessionDates = course.sessions.map(formatSessionDate).join(' · ');

  return (
    <div style={{
      background: 'var(--bg-cream)',
      padding: '5rem 1.5rem',
    }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          성균관대 수리논술 <span style={{ color: 'var(--accent-gold)' }}>4회 압축 특강</span>
        </h2>

        <div style={{
          maxWidth: '720px',
          margin: '2rem auto 0',
          background: 'var(--bg-white)',
          borderRadius: '16px',
          padding: '2.5rem',
          border: `2px solid var(--primary-deep-forest)`,
          borderLeft: '8px solid var(--accent-gold)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '1.5rem',
            rowGap: '1rem',
            margin: 0,
            marginBottom: '2rem',
            fontSize: '1.05rem',
          }}>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>일정</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)', fontWeight: 600 }}>
              {sessionDates}<br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                (매주 일요일, 총 {course.sessions.length}회)
              </span>
            </dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>시간</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)' }}>{course.timeRange}</dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>수강료</dt>
            <dd style={{ margin: 0, color: 'var(--primary-deep-forest)', fontWeight: 700 }}>
              {course.fee.toLocaleString()}원
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                {' '}+ 교재비 {course.materialFee.toLocaleString()}원
              </span>
            </dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>장소</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)' }}>문의 시 안내</dd>

            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>대상</dt>
            <dd style={{ margin: 0, color: 'var(--text-dark)' }}>{course.target}</dd>
          </dl>

          {/* CTA 버튼 2개 */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}>
            <a
              href={`tel:${contact.phone}`}
              style={{
                flex: '1 1 200px',
                padding: '1rem 1.5rem',
                background: 'var(--primary-deep-forest)',
                color: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              📞 전화로 신청·문의
            </a>
            <a
              href={contact.kakaoOpenChat}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: '1 1 200px',
                padding: '1rem 1.5rem',
                background: '#FEE500',
                color: '#191919',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              💬 카톡으로 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import 추가:
```tsx
import { SpecialCourseCard } from '../components/skku-special/SpecialCourseCard';
```

`<section data-section="course" id="course" />` 자리에 다음으로 교체:

```tsx
<section id="course"><SpecialCourseCard /></section>
```

- [ ] **Step 3: 브라우저 확인**

- 일정 4회차 "8/2(일) · 8/9(일) · 8/16(일) · 8/23(일)" 노출
- 수강료 "320,000원 + 교재비 40,000원" 노출
- 장소 "문의 시 안내" 노출
- 전화 버튼 클릭 시 모바일에선 전화 앱 열림 (데스크탑은 무동작 또는 핸드오프)
- 카톡 버튼 클릭 시 새 탭에서 오픈채팅 링크 열림
- Hero CTA → 이 카드로 스크롤되는지 (anchor `#course` 동작)

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/SpecialCourseCard.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑤ 특강 정보 카드 + 전화·카톡 CTA

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: ⑥ InstructorSection — 강사 동문

**Goal:** 강사 사진 + "모교를 가르치는 동문" 메시지 + 짧은 경력.

**Files:**
- Create: `src/components/skku-special/InstructorSection.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/InstructorSection.tsx`:

```tsx
import React from 'react';

export const InstructorSection: React.FC = () => {
  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 280px) 1fr',
        gap: '3rem',
        alignItems: 'center',
      }} className="instructor-grid">
        <div style={{
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          background: 'var(--bg-cream)',
        }}>
          <img
            src="/profile.png"
            alt="조우제 선생님"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--primary-deep-forest)',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
          }}>
            내가 다닌 학교,<br/>
            <span style={{ color: 'var(--accent-gold)' }}>후배에게 직접 길을 보입니다.</span>
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            color: 'var(--text-dark)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
          }}>
            <li>▸ <strong>조우제</strong> · 성균관대학교 동문</li>
            <li>▸ 수리논술 전문 강사 <strong>10년차</strong></li>
            <li>▸ 의대·인서울 합격생 다수 배출</li>
            <li>▸ 1:1 답안 첨삭 · 매 수업 직접 손으로 코칭</li>
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .instructor-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .instructor-grid > div:first-child {
            max-width: 240px;
            margin: 0 auto;
          }
          .instructor-grid ul {
            text-align: left;
            max-width: 360px;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import 추가 + `<section data-section="instructor" />` 교체:
```tsx
import { InstructorSection } from '../components/skku-special/InstructorSection';
// ...
<InstructorSection />
```

- [ ] **Step 3: 브라우저 확인**

- 강사 사진 + 4개 항목 노출
- 모바일 폭(<640px)에서 사진이 위로 가고 텍스트가 아래로 정렬되는지

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/InstructorSection.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑥ 강사 동문 섹션

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: ⑦ TeachingApproach — 수업 방식

**Goal:** 3개 pillar 카드 — "왜 이 특강인가".

**Files:**
- Create: `src/components/skku-special/TeachingApproach.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/TeachingApproach.tsx`:

```tsx
import React from 'react';

const PILLARS = [
  {
    title: '1:1 답안 첨삭',
    body: '4회 모든 회차에서 학생 답안을 직접 손으로 첨삭합니다. 논리의 비약·풀이 누락·기호 오용 등을 한 명 한 명 짚어 교정합니다.',
  },
  {
    title: '성균관대 기출 직접 풀이',
    body: '최근 5년 성균관대 수리논술 기출을 회차별로 분배해, 출제 패턴을 직접 체득하게 합니다.',
  },
  {
    title: '4회 압축 커리큘럼',
    body: '단답 → 서술 → 모의시험 → 총정리. 4회 안에 답안 작성 기본기부터 실전 감각까지 완성합니다.',
  },
];

export const TeachingApproach: React.FC = () => {
  return (
    <div style={{ background: 'var(--bg-cream)', padding: '5rem 1.5rem' }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          왜 이 <span style={{ color: 'var(--accent-gold)' }}>특강</span>인가
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '3rem auto 0',
        }}>
          {PILLARS.map((p, i) => (
            <div className="hover-card" key={i} style={{
              background: 'var(--bg-white)',
              padding: '2.25rem 1.75rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--primary-deep-forest)',
                color: 'var(--accent-gold)',
                fontWeight: 800,
                fontSize: '1.2rem',
                marginBottom: '1rem',
              }}>
                {i + 1}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                color: 'var(--primary-deep-forest)',
                fontWeight: 700,
                marginBottom: '0.75rem',
              }}>
                {p.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import + `<section data-section="approach" />` 교체:
```tsx
import { TeachingApproach } from '../components/skku-special/TeachingApproach';
// ...
<TeachingApproach />
```

- [ ] **Step 3: 브라우저 확인**

3개 pillar 카드 정상 노출. 모바일에서 세로 스택.

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/TeachingApproach.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑦ 수업 방식 (3 pillar 카드)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: ⑧ ReviewsSection — 지난 합격생들의 학습 후기

**Goal:** 기존 `aboutData.ts` 의 `reviewData` 를 재활용. 톤은 "성균관대 합격생 후기"가 아니라 "이런 학생들이 합격합니다"로.

**Files:**
- Create: `src/components/skku-special/ReviewsSection.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/ReviewsSection.tsx`:

```tsx
import React from 'react';
import { reviewData } from '../../data/aboutData';

const FEATURED_COUNT = 3;

export const ReviewsSection: React.FC = () => {
  const featured = reviewData.slice(0, FEATURED_COUNT);

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        이런 학생들이 <span style={{ color: 'var(--accent-gold)' }}>합격합니다</span>
      </h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 3rem',
        lineHeight: 1.6,
      }}>
        지난 합격생들의 학습 후기입니다. 학교가 달라도 <strong>답안을 논리적으로 쓰는 방법</strong>은 같습니다.<br/>
        성균관대 수리논술도 동일한 원리로 준비합니다.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {featured.map((review, idx) => (
          <div className="hover-card" key={idx} style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3 style={{
              color: 'var(--primary-deep-forest)',
              fontSize: '1.15rem',
              fontWeight: 700,
              marginBottom: '1rem',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}>
              "{review.title}"
            </h3>
            <p style={{
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              marginBottom: '1.5rem',
              flex: 1,
            }}>
              {review.content}
            </p>
            <div style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1rem',
            }}>
              <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                {review.name}
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary-light)' }}>
                {review.school} → {review.university}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import + `<section data-section="reviews" />` 교체:
```tsx
import { ReviewsSection } from '../components/skku-special/ReviewsSection';
// ...
<ReviewsSection />
```

- [ ] **Step 3: 브라우저 확인**

- 후기 카드 3개 노출 (김동흥·윤우성·이세영 — reviewData 첫 3개)
- 각 카드에 합격 대학명 명시 (한양대, 한양대, 인하대)

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/ReviewsSection.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑧ 지난 합격생 후기 (aboutData reviewData 재활용)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: ⑨ SessionArchive — 특강 진행 기록 (조건부 노출)

**Goal:** `sessionArchive` 배열이 비어 있으면 섹션 전체 미렌더. 사진이 추가되면 갤러리 형태로 노출.

**Files:**
- Create: `src/components/skku-special/SessionArchive.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/SessionArchive.tsx`:

```tsx
import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

function formatKDate(iso: string): string {
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const [y, m, d] = iso.split('-').map(Number);
  const day = DAYS[new Date(y, m - 1, d).getDay()];
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}(${day})`;
}

export const SessionArchive: React.FC = () => {
  const { sessionArchive } = skkuSpecial;

  // 사진이 한 장이라도 있는 회차만 노출. 모두 비어 있으면 섹션 전체 미렌더.
  const entriesWithImages = sessionArchive.filter(e => e.images.length > 0);
  if (entriesWithImages.length === 0) return null;

  return (
    <div style={{ background: 'var(--bg-cream)', padding: '5rem 1.5rem' }}>
      <div className="container scroll-reveal">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          특강 <span style={{ color: 'var(--accent-gold)' }}>진행 기록</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
        }}>
          지난 회차 수업 현장입니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {entriesWithImages.map(entry => (
            <div key={entry.session}>
              <h3 style={{
                fontSize: '1.2rem',
                color: 'var(--primary-deep-forest)',
                fontWeight: 700,
                marginBottom: '1rem',
              }}>
                {entry.session}회차 — <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{formatKDate(entry.date)}</span>
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
              }}>
                {entry.images.map((src, i) => (
                  <div className="hover-card" key={i} style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    background: 'var(--bg-white)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
                  }}>
                    <img
                      src={src}
                      alt={`${entry.session}회차 ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import + `<section data-section="archive" />` 교체:
```tsx
import { SessionArchive } from '../components/skku-special/SessionArchive';
// ...
<SessionArchive />
```

- [ ] **Step 3: 브라우저 확인 (현재는 데이터 비어있음)**

`/sungkyunkwan-special` 새로고침:
- ⑨ 섹션이 **렌더되지 않아야 함** (DevTools 에서 "특강 진행 기록" 텍스트 검색해도 없음)
- ⑧ 후기 다음 바로 ⑩ FAQ 자리 (아직 빈)로 연결

- [ ] **Step 4: 조건부 노출 빠른 검증 (임시 데이터 주입)**

`src/data/skkuSpecial.ts` 의 `sessionArchive: []` 를 잠시 다음으로 변경:
```typescript
  sessionArchive: [
    { session: 1, date: '2026-08-02', images: ['/profile.png'] },
  ] as SessionArchiveEntry[],
```

브라우저에서 갤러리가 노출되는지 확인 후 → **반드시 빈 배열로 되돌리기**:
```typescript
  sessionArchive: [] as SessionArchiveEntry[],
```

- [ ] **Step 5: 커밋**

```bash
git add src/components/skku-special/SessionArchive.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑨ 특강 진행 기록 갤러리 (조건부 노출)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: ⑩ FaqSection — FAQ 아코디언

**Goal:** 4개 Q&A 아코디언. 한 번에 하나만 열림 (또는 모두 독립).

**Files:**
- Create: `src/components/skku-special/FaqSection.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/FaqSection.tsx`:

```tsx
import React, { useState } from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="container scroll-reveal" style={{ padding: '5rem 1.5rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        자주 묻는 <span style={{ color: 'var(--accent-gold)' }}>질문</span>
      </h2>

      <div style={{
        maxWidth: '760px',
        margin: '3rem auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {skkuSpecial.faq.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={i} style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--primary-deep-forest)',
                }}
              >
                <span>Q. {item.q}</span>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-gold)' }}>
                  {open ? '−' : '+'}
                </span>
              </button>
              {open && (
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '0.25rem',
                }}>
                  <strong style={{ color: 'var(--text-dark)' }}>A. </strong>{item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import + `<section data-section="faq" />` 교체:
```tsx
import { FaqSection } from '../components/skku-special/FaqSection';
// ...
<FaqSection />
```

- [ ] **Step 3: 브라우저 확인**

- 4개 질문 노출, 첫 번째 기본 펼침
- 다른 항목 클릭 시 그 항목 펼쳐지고 나머지 접힘
- 같은 항목 다시 클릭 시 접힘

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/FaqSection.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑩ FAQ 아코디언

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 15: ⑪ FinalCta — 최종 CTA

**Goal:** 일정·수강료 요약 + 큰 신청 버튼 2개. ⑤ SpecialCourseCard 의 단순화 버전.

**Files:**
- Create: `src/components/skku-special/FinalCta.tsx`
- Modify: `src/pages/SkkuSpecialPage.tsx`

- [ ] **Step 1: 컴포넌트 작성**

`src/components/skku-special/FinalCta.tsx`:

```tsx
import React from 'react';
import { skkuSpecial } from '../../data/skkuSpecial';

export const FinalCta: React.FC = () => {
  const { course, contact } = skkuSpecial;
  const startDate = course.sessions[0];
  const [, month, day] = startDate.split('-');
  const startLabel = `${parseInt(month)}/${parseInt(day)}(일)`;

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
      color: 'white',
      padding: '5rem 1.5rem',
    }}>
      <div className="container scroll-reveal" style={{ textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--bg-cream)',
          marginBottom: '1.5rem',
          lineHeight: 1.4,
        }}>
          지금 신청하세요
        </h2>

        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}>
          {startLabel} 개강 · 매주 일요일 4회 · {course.timeRange}
        </p>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--accent-gold)',
          marginBottom: '2.5rem',
          fontWeight: 700,
        }}>
          {course.fee.toLocaleString()}원 (+ 교재비 {course.materialFee.toLocaleString()}원)
        </p>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <a
            href={`tel:${contact.phone}`}
            style={{
              flex: '1 1 200px',
              padding: '1.1rem 1.5rem',
              background: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            📞 전화로 신청·문의
          </a>
          <a
            href={contact.kakaoOpenChat}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 200px',
              padding: '1.1rem 1.5rem',
              background: '#FEE500',
              color: '#191919',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            💬 카톡으로 문의
          </a>
        </div>

        <p style={{
          marginTop: '2rem',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.7)',
          fontStyle: 'italic',
        }}>
          ※ 정원 제한으로 조기 마감될 수 있습니다.
        </p>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: SkkuSpecialPage 에 연결**

import + `<section data-section="final-cta" />` 교체:
```tsx
import { FinalCta } from '../components/skku-special/FinalCta';
// ...
<FinalCta />
```

- [ ] **Step 3: 브라우저 확인**

- 페이지 최하단 다크 배경 CTA 섹션 노출
- "8/2(일) 개강 · 매주 일요일 4회 · 13:00 – 16:00" 표기
- "320,000원 (+ 교재비 40,000원)" 표기
- 두 버튼 동작

- [ ] **Step 4: 커밋**

```bash
git add src/components/skku-special/FinalCta.tsx src/pages/SkkuSpecialPage.tsx
git commit -m "feat(skku-special): ⑪ 최종 CTA — 일정·수강료 요약 + 신청 버튼

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 16: 홈 Hero 보조 CTA + OG 메타 태그

**Goal:** 사이트 메인 진입점에서도 특강 페이지로 유도 + 외부 공유 미리보기 최적화.

**Files:**
- Modify: `src/App.tsx`
- Modify: `index.html`

- [ ] **Step 1: 홈 Hero 에 보조 CTA 버튼 추가**

`src/App.tsx` 의 홈 Hero 섹션, 기존 "합격 전략 보기" / "Q.E.D. 커리큘럼" 두 버튼 옆에 세 번째 버튼 추가. `display: 'flex', gap: '1.25rem', flexWrap: 'wrap'` div 안 마지막에 다음을 추가:

```tsx
                    <button
                      onClick={() => setCurrentPath('/sungkyunkwan-special')}
                      style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--accent-gold)',
                        color: 'var(--primary-deep-forest)',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      🆕 성균관대 특강
                    </button>
```

- [ ] **Step 2: 브라우저에서 홈 보조 CTA 동작 확인**

홈 → "🆕 성균관대 특강" 버튼 → `/sungkyunkwan-special` 페이지로 이동.

- [ ] **Step 3: OG 메타 태그 추가 (특강 페이지용 별도 태그)**

SPA 라서 라우트별 동적 메타는 불가능. 사이트 전체 OG는 유지하되, 사이트 메인 OG description 에 특강 메시지 1줄 추가하지는 말고 (홈의 브랜드 메시지가 우선), 대신 `<head>` 안에 `<link rel="alternate">` 로 특강 페이지 정보를 약하게 노출.

실용적 결정: **사이트 전체 OG 그대로 유지**. 외부 공유는 카톡·인스타에서 시각적 카드 이미지로 따로 만들거나, EventBanner를 통한 유입에 의존. SPA OG 한계.

`index.html` 변경 없음 — 이 Step은 skip하고 다음 Task 로 이동하기로 결정.

> **사용자 안내사항**: 카톡·인스타에서 `/sungkyunkwan-special` URL을 공유하면 사이트 전체 OG (홈 카드)가 노출됩니다. 특강 전용 카드 이미지가 필요하면 별도로 디자인해서 카톡·인스타 게시물 본문에 이미지 첨부하는 방식을 권장.

- [ ] **Step 4: 커밋**

```bash
git add src/App.tsx
git commit -m "feat(app): 홈 Hero에 성균관대 특강 보조 CTA 버튼 추가

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 17: 전체 검증 — 데스크탑/모바일 시각 검증 + 테스트 회귀

**Goal:** 전체 페이지가 빠짐 없이 동작하는지, 다른 기존 페이지에 회귀가 없는지 확인.

**Files:** 없음 (검증만)

- [ ] **Step 1: 전체 자동 테스트 회귀**

Run: `npm test`
Expected: 모든 테스트 PASS (skkuSpecial 7개 + events 8개 + 기존 테스트)

- [ ] **Step 2: 빌드 성공 확인**

Run: `npm run build`
Expected: 에러 없이 빌드 성공. 번들 크기 확인 (특강 페이지 추가로 약간 증가 — 250KB 미만이면 OK).

- [ ] **Step 3: 데스크탑 시각 검증 (`npm run dev`)**

브라우저에서 `/sungkyunkwan-special` 접속, 다음 11개 섹션이 순서대로 노출되는지:
- [ ] ① Hero — 슬로건 + 메인 카피 + 강사 사진 + CTA
- [ ] ② 출제범위 박스 + 제외 강조 + 결론
- [ ] ③ D-Day + 일정 카드 2장 + 수능최저 요약
- [ ] ④ 큰 숫자 3개 + 반전 박스 + 학과별 표 (펼치기 동작)
- [ ] ⑤ 특강 정보 + 전화/카톡 버튼
- [ ] ⑥ 강사 동문
- [ ] ⑦ 3 pillar 카드
- [ ] ⑧ 후기 카드 3장
- [ ] ⑨ (미렌더 — 갤러리 데이터 없음)
- [ ] ⑩ FAQ 4개
- [ ] ⑪ 최종 CTA

- [ ] **Step 4: 모바일 시각 검증 (DevTools 디바이스 360px)**

- [ ] Hero 세로 스택 (강사 사진 위 또는 아래로 정렬)
- [ ] 강사 섹션 사진 위 / 텍스트 아래로 세로 스택
- [ ] 학과별 표 가로 스크롤 가능
- [ ] CTA 버튼들이 화면 폭 안에 깔끔히 들어감

- [ ] **Step 5: 진입 경로 검증**

홈 (`/`) 진입 후:
- [ ] 상단 EventBanner (8/2 특강) 클릭 → `/sungkyunkwan-special` 이동 + 페이지 최상단
- [ ] 홈 Hero "🆕 성균관대 특강" 버튼 클릭 → `/sungkyunkwan-special` 이동
- [ ] 직접 URL `http://localhost:5173/sungkyunkwan-special` 입력 → 페이지 정상 로드 (단, 새로고침 시 SPA 라우팅 한계로 인덱스로 떨어질 수 있음 — 기존 사이트와 동일한 한계)

- [ ] **Step 6: 다른 페이지 회귀 확인**

다음 페이지들 빠르게 방문해 시각·동작 회귀 없는지:
- [ ] `/` 홈 — Stats, Hero 모두 정상
- [ ] `/about` — 다음 설명회 섹션 (다른 이벤트인 6/5 정율사관학원 설명회) 노출
- [ ] `/schools/sungkyunkwan` — 기존 학교 분석 페이지 정상
- [ ] `/lectures`, `/data`, `/2028` — 회귀 없음

특히 `/about` 의 "다음 설명회" 카드는 이제 8/2 특강이 더 가까운 미래 이벤트이므로 8/2 정보가 노출되어야 함. 6/5 설명회는 다음 이벤트로 밀려나서 EventBanner에는 안 보임. 이 동작이 의도된 것인지 확인 — **사용자에게 보고할 사항.**

> ⚠️ **확인 필요**: 8/2가 EventBanner 와 `/about` 페이지의 "다음 설명회" 자리를 모두 차지하게 됨. 6/5 정율사관학원 설명회는 8/2가 가장 가까운 미래이므로 노출되지 않음. 6/5 이후에는 다시 6/5 가 지나가고 8/2 가 유일하게 남음. 의도된 동작이면 OK, 6/5 설명회도 EventBanner 에 노출시키고 싶으면 사용자에게 정책 확인 필요.

- [ ] **Step 7: 최종 커밋 (검증 결과 기록)**

검증 후 별도 커밋은 만들 필요 없음. 이슈가 발견되면 별도 fix 커밋. 발견된 이슈가 있으면 사용자에게 보고하고 Plan 종료.

만약 EventBanner 가 8/2 만 노출하는 동작에 사용자가 6/5 설명회 노출을 원한다면, 후속 개선 작업이 필요 (예: 가장 가까운 2개 이벤트 슬라이드 노출, 또는 우선순위 필드 추가). 이번 Plan 범위 외.

---

## Self-Review (작성자 검토 결과)

### 1. Spec coverage

스펙의 각 섹션 매핑:

| 스펙 항목 | 구현 Task |
|---|---|
| §1.1 핵심 메시지 (출제범위·경쟁률 반전) | Task 6, 8 |
| §2 라우팅·EventBanner 분기·홈 CTA | Task 3, 16 |
| §2.4 OG 메타 | Task 16 Step 3 (SPA 한계로 사이트 전체 OG 유지 결정, 사용자에게 안내) |
| §3.1 ~ §3.11 (11 섹션) | Task 5 ~ 15 |
| §4.1 ~ §4.3 (데이터·컴포넌트) | Task 1 (데이터), Task 5~15 (컴포넌트) |
| §5 디자인 톤·모바일 | 모든 컴포넌트 Task + Task 17 모바일 검증 |
| §6 엣지 케이스 | Task 13 (조건부 갤러리), Task 17 Step 6 (EventBanner 우선순위 이슈) |
| §7 테스트 전략 | Task 1, 2 (데이터·이벤트 테스트), Task 17 (수동 검증) |
| §8 작업 범위 | Plan 전체가 §8.1 매핑, §8.2 의도적 제외사항 준수 |
| §9 확정 결정사항 | Task 1 데이터 모듈에 모두 반영 (회차 4일자·N수생·카톡 URL·시험일 source 표기) |

### 2. Placeholder scan

- "TBD"·"TODO"·"implement later" 없음
- 모든 step 에 실행 가능한 코드 또는 명령 포함
- "Similar to Task N" 식 회피, 모든 컴포넌트 코드 명시
- "사용자 결정 사항" 표기는 §9 확정 후 거의 없어졌으며, 남은 한 군데 (Task 17 Step 6 EventBanner 우선순위)는 의도적 사용자 보고 사항

### 3. Type consistency

- `Event.link?: string` — Task 2 정의, Task 3 사용 일치
- `skkuSpecial.course.sessions` — Task 1 `string[]`, Task 9·15 에서 동일하게 사용
- `skkuSpecial.contact.phone` / `kakaoOpenChat` — Task 1 정의, Task 9·15 사용 일치
- `SessionArchiveEntry` — Task 1 정의, Task 13 import 사용 일치
- `SkkuSpecialPage` props (`onNavigate`) — Task 4 에 props 없이 정의, Task 7 에서 `onNavigate` prop 추가. 이는 의도된 점진적 확장이며 App.tsx 도 같은 Task에서 함께 수정됨.

이슈 없음.

---

## Plan complete and saved to `docs/superpowers/plans/2026-05-21-skku-special-landing.md`

Two execution options:

**1. Subagent-Driven (recommended for this plan size)** — 각 Task 별로 fresh subagent를 띄워 구현·리뷰·커밋. Task 간 검토 체크포인트 있음. 17개 Task 라 시간이 좀 걸리지만 안정적.

**2. Inline Execution** — 같은 세션에서 일괄 실행. 체크포인트마다 사용자 확인. 빠르지만 컨텍스트 압박.

어떤 방식으로 갈까요?
