# 설명회 안내 시스템 + 모바일 반응형 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사이트가 다음 회차 설명회를 자동 노출/숨김 하는 데이터 기반 안내 시스템을 추가하고, 데스크톱 픽셀 고정 스타일을 글로벌 미디어쿼리로 보강해 모바일에서도 깨지지 않게 한다.

**Architecture:** 헬퍼(`getNextEvent`)가 `events.ts`에서 오늘 이후 가장 가까운 회차 1건을 반환. 모든 페이지의 `<nav>` 아래에 배치되는 `EventBanner`와 About 페이지의 "다음 설명회" 섹션이 이 헬퍼만 호출. 일자가 지나면 두 곳 모두 자동 숨김. 모바일 보정은 기존 inline style을 갈아엎지 않고 `index.css`의 `@media (max-width: 768px)` 블록과 새 className으로 덮어쓴다. 햄버거 메뉴는 `App.tsx`에 `mobileNavOpen` 상태 추가로 처리.

**Tech Stack:** React 19 + Vite 8 + TypeScript, vitest (신규), 글로벌 CSS, inline style.

**Spec:** `docs/superpowers/specs/2026-05-12-events-and-mobile-responsive-design.md`

---

## File Structure

신규
- `src/data/events.ts` — Event 타입, events 배열, `getNextEvent`, `formatEventDate`
- `src/data/events.test.ts` — 위 헬퍼들의 단위 테스트
- `src/components/EventBanner.tsx` — 모든 페이지 공통 띠 배너
- `src/components/MobileNav.tsx` — 햄버거 메뉴 + 펼침 메뉴 (App.tsx 비대화 방지)
- `vitest.config.ts` — vitest 설정

수정
- `package.json` — vitest devDependency, `test` script 추가
- `src/App.tsx` — events import, EventBanner 렌더, MobileNav 통합, navigateToEventSection 헬퍼
- `src/pages/AboutPage.tsx` — `<section id="event">` 추가 (페이지 최상단)
- `src/index.css` — `@media (max-width: 768px)` 블록에 반응형 보정 추가

각 파일은 한 가지 역할만 한다. `events.ts`는 데이터+헬퍼만 (UI 의존성 없음), `EventBanner`는 표시 전용 (데이터는 prop), `MobileNav`는 모바일 전용 메뉴.

---

## Phase A — 설명회 안내 시스템

### Task 1: vitest 도입

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: vitest와 jsdom 설치**

Run (PowerShell):
```powershell
npm install --save-dev vitest @vitest/ui jsdom
```

Expected: `package.json`의 `devDependencies`에 vitest, @vitest/ui, jsdom 추가됨.

- [ ] **Step 2: `package.json` scripts에 test 명령 추가**

`package.json`의 `scripts` 블록을 다음과 같이 수정:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: `vitest.config.ts` 생성**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

- [ ] **Step 4: 동작 확인용 더미 테스트로 셋업 검증**

임시 파일 `src/__sanity__.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('vitest sanity', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run:
```powershell
npm test
```

Expected: 1 passed.

- [ ] **Step 5: 더미 테스트 삭제**

```powershell
Remove-Item src/__sanity__.test.ts
```

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: vitest 도입 (jsdom 환경, npm test 스크립트)"
```

---

### Task 2: `events.ts` 데이터/헬퍼 — 실패하는 테스트 먼저

**Files:**
- Create: `src/data/events.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

`src/data/events.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  events,
  getNextEvent,
  formatEventDate,
  type Event,
} from './events';

describe('events 데이터', () => {
  it('각 이벤트는 id, title, date(ISO), time, location, audience, summary를 가진다', () => {
    expect(events.length).toBeGreaterThan(0);
    for (const ev of events) {
      expect(ev.id).toMatch(/^[a-z0-9-]+$/);
      expect(ev.title.length).toBeGreaterThan(0);
      expect(ev.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(ev.time).toMatch(/^\d{2}:\d{2}$/);
      expect(ev.location.length).toBeGreaterThan(0);
      expect(ev.audience.length).toBeGreaterThan(0);
      expect(ev.summary.length).toBeGreaterThan(0);
    }
  });

  it('id는 중복되지 않는다', () => {
    const ids = events.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getNextEvent', () => {
  const sample: Event[] = [
    { id: 'a', title: 'A', date: '2026-06-05', time: '19:30',
      location: 'X', audience: 'Y', summary: 'Z' },
    { id: 'b', title: 'B', date: '2026-07-10', time: '14:00',
      location: 'X', audience: 'Y', summary: 'Z' },
    { id: 'c', title: 'C', date: '2026-04-01', time: '10:00',
      location: 'X', audience: 'Y', summary: 'Z' },
  ];

  it('오늘이 6/5 자정 이전이면 6/5 회차를 반환한다', () => {
    const today = new Date('2026-06-04T23:59:59');
    expect(getNextEvent(today, sample)?.id).toBe('a');
  });

  it('6/5 당일 0시에도 6/5 회차를 반환한다 (당일은 표시)', () => {
    const today = new Date('2026-06-05T00:00:00');
    expect(getNextEvent(today, sample)?.id).toBe('a');
  });

  it('6/5 종일 23:59에도 6/5 회차를 반환한다', () => {
    const today = new Date('2026-06-05T23:59:59');
    expect(getNextEvent(today, sample)?.id).toBe('a');
  });

  it('6/6 0시부터는 6/5 회차가 사라지고 다음 회차를 반환한다', () => {
    const today = new Date('2026-06-06T00:00:00');
    expect(getNextEvent(today, sample)?.id).toBe('b');
  });

  it('모든 회차가 지났으면 null을 반환한다', () => {
    const today = new Date('2027-01-01T00:00:00');
    expect(getNextEvent(today, sample)).toBeNull();
  });

  it('인자 없이 호출 가능 (기본값 = 오늘 + 모듈 events)', () => {
    expect(() => getNextEvent()).not.toThrow();
  });
});

describe('formatEventDate', () => {
  it("'2026-06-05'를 '6/5(금)'으로 포맷한다", () => {
    expect(formatEventDate('2026-06-05')).toBe('6/5(금)');
  });

  it("'2026-12-31'를 '12/31(목)'으로 포맷한다", () => {
    expect(formatEventDate('2026-12-31')).toBe('12/31(목)');
  });

  it("'2026-01-01'를 '1/1(목)'으로 포맷한다", () => {
    expect(formatEventDate('2026-01-01')).toBe('1/1(목)');
  });
});
```

- [ ] **Step 2: 테스트 실행해 실패 확인**

Run:
```powershell
npm test
```

Expected: FAIL — `Cannot find module './events'`.

---

### Task 3: `events.ts` 구현

**Files:**
- Create: `src/data/events.ts`

- [ ] **Step 1: 구현**

`src/data/events.ts`:

```ts
export type Event = {
  id: string;
  title: string;
  date: string;     // 'YYYY-MM-DD'
  time: string;     // 'HH:MM' 24h
  location: string;
  audience: string;
  summary: string;
};

export const events: Event[] = [
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
```

- [ ] **Step 2: 테스트 실행해 통과 확인**

Run:
```powershell
npm test
```

Expected: All tests pass (events 데이터 3개 + getNextEvent 6개 + formatEventDate 3개 = 12 passed).

- [ ] **Step 3: Commit**

```powershell
git add src/data/events.ts src/data/events.test.ts
git commit -m "feat(events): 설명회 데이터 + getNextEvent/formatEventDate 헬퍼

- 오늘(자정 기준) 이후 가장 가까운 회차 자동 반환
- 첫 회차: 2026-06-05(금) 19:30 정율사관학원 6층 대강당"
```

---

### Task 4: `EventBanner` 컴포넌트

**Files:**
- Create: `src/components/EventBanner.tsx`

- [ ] **Step 1: 구현**

```tsx
import React from 'react';
import { getNextEvent, formatEventDate } from '../data/events';

type Props = {
  onClick: () => void;
};

export const EventBanner: React.FC<Props> = ({ onClick }) => {
  const next = getNextEvent();
  if (!next) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="event-banner"
      style={{
        width: '100%',
        background: 'var(--primary-deep-forest)',
        color: 'var(--bg-cream)',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: `2px solid var(--accent-gold)`,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        fontWeight: 500,
        textAlign: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
        📢 다음 설명회
      </span>
      <span>
        {formatEventDate(next.date)} {next.time} · {next.location}
      </span>
      <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
        자세히 보기 →
      </span>
    </button>
  );
};
```

- [ ] **Step 2: 임시로 App.tsx에 import해 dev 서버에서 시각 확인**

(이 단계는 다음 task에서 정식 통합되니 생략 가능. dev 서버는 `npm run dev`로 띄워서 빈 페이지가 아닌지만 확인.)

Run:
```powershell
npm run build
```

Expected: 빌드 에러 없음 (타입 OK).

- [ ] **Step 3: Commit**

```powershell
git add src/components/EventBanner.tsx
git commit -m "feat(EventBanner): 다음 설명회 알림 띠 컴포넌트

- getNextEvent 결과가 null이면 자체 미렌더
- nav 아래 띠 형태, gold 강조, 클릭 시 onClick prop 호출"
```

---

### Task 5: `App.tsx`에 EventBanner 통합 + 스크롤 헬퍼

**Files:**
- Modify: `src/App.tsx` (line 1-15 import 영역, line 78 `</nav>` 직후)

- [ ] **Step 1: import 추가**

`src/App.tsx` line 9 (FloatingContact import 뒤)에 추가:

```tsx
import { EventBanner } from './components/EventBanner';
```

- [ ] **Step 2: 스크롤 + 라우트 헬퍼 함수 추가**

`src/App.tsx`의 `function App() {` 본문 안, `const [currentPath, setCurrentPath] = useState('/data');` 바로 아래에 추가:

```tsx
const navigateToEventSection = () => {
  setCurrentPath('/about');
  // setCurrentPath 후 React가 About을 렌더할 시간을 준다
  setTimeout(() => {
    document.getElementById('event')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
};
```

- [ ] **Step 3: nav `</nav>` 직후에 EventBanner 삽입**

`src/App.tsx`에서 `</nav>` 라인 뒤, `{/* Main Content Area */}` 라인 앞에 추가:

```tsx
      </nav>

      <EventBanner onClick={navigateToEventSection} />

      {/* Main Content Area */}
```

- [ ] **Step 4: dev 서버에서 시각 확인**

Run:
```powershell
npm run dev
```

브라우저에서 `http://localhost:5173/` 열고:
- nav 아래에 배너가 띠 형태로 보이는지
- 배너 클릭 시 About 페이지로 이동하는지 (스크롤 타겟 #event는 다음 task에서 추가하므로 일단 About 이동만 확인)

- [ ] **Step 5: Commit**

```powershell
git add src/App.tsx
git commit -m "feat(App): EventBanner를 nav 아래 노출 + #event 스크롤 헬퍼"
```

---

### Task 6: AboutPage에 "다음 설명회" 섹션 추가

**Files:**
- Modify: `src/pages/AboutPage.tsx` (line 1-3 import, line 9 컨테이너 시작 직후)

- [ ] **Step 1: import 추가**

`src/pages/AboutPage.tsx` line 3 (`useScrollReveal` import 뒤) 추가:

```tsx
import { getNextEvent, formatEventDate } from '../data/events';
```

- [ ] **Step 2: 컴포넌트 본문 시작에 next 변수 + 섹션 렌더 추가**

`AboutPage` 컴포넌트의 `useScrollReveal();` 줄 뒤에:

```tsx
  const nextEvent = getNextEvent();
```

`return (` 직후의 `<div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>` 바로 안쪽 (Intro Hero Section 위)에 다음 블록 추가:

```tsx
      {/* Next Event Section */}
      {nextEvent && (
        <section
          id="event"
          className="scroll-reveal"
          style={{
            background: 'var(--bg-white)',
            border: `2px solid var(--primary-deep-forest)`,
            borderLeft: `8px solid var(--accent-gold)`,
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            marginBottom: '4rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            📢 다음 설명회
          </div>
          <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.4 }}>
            {nextEvent.title}
          </h2>
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '1.5rem',
            rowGap: '0.75rem',
            marginBottom: '1.5rem',
            fontSize: '1.05rem',
          }}>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>일시</dt>
            <dd style={{ color: 'var(--text-dark)' }}>
              {formatEventDate(nextEvent.date)} · {nextEvent.time}
            </dd>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>장소</dt>
            <dd style={{ color: 'var(--text-dark)' }}>{nextEvent.location}</dd>
            <dt style={{ color: 'var(--text-muted)', fontWeight: 600 }}>대상</dt>
            <dd style={{ color: 'var(--text-dark)' }}>{nextEvent.audience}</dd>
          </dl>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
            {nextEvent.summary}
          </p>
          <p style={{ color: 'var(--primary-forest)', fontWeight: 600, fontSize: '0.95rem' }}>
            참석/문의는 우측 하단 카톡·전화로 연락 주세요.
          </p>
        </section>
      )}

      {/* Intro Hero Section */}
```

(기존 `{/* Intro Hero Section */}` 줄을 위 블록 뒤에 그대로 둔다.)

- [ ] **Step 3: dev 서버에서 시각 확인**

Run:
```powershell
npm run dev
```

확인 항목:
- About 페이지에 새 섹션이 보이는지
- 홈에서 배너 클릭 → About 페이지 → 자동으로 #event 섹션까지 스크롤되는지
- 다른 페이지(자료 등)에서도 배너 클릭 시 같은 동작인지

- [ ] **Step 4: Commit**

```powershell
git add src/pages/AboutPage.tsx
git commit -m "feat(About): 다음 설명회 섹션 추가 (id=event, 배너 스크롤 타겟)"
```

---

### Task 7: Phase A 푸시 (설명회 시스템 라이브)

- [ ] **Step 1: 빌드 검증**

Run:
```powershell
npm run build
```

Expected: 빌드 성공, 타입 에러 없음.

- [ ] **Step 2: 테스트 검증**

Run:
```powershell
npm test
```

Expected: 12 passed.

- [ ] **Step 3: 푸시**

```powershell
git push origin main
```

이 시점부터 cwjmathlab.co.kr에 6/5 설명회 안내가 라이브된다.

---

## Phase B — 모바일 반응형

### Task 8: 글로벌 미디어쿼리 베이스 추가

**Files:**
- Modify: `src/index.css`

기존 `@media (max-width: 768px)` 블록(line 158-165)은 desktop-only/mobile-only 토글만 정의되어 있다. 그 블록 뒤(line 165 직후, `@media (min-width: 769px)` 앞)에 새 미디어쿼리 블록을 추가해 페이지 전반에 깨지는 부분을 보강한다.

이 task에서는 **베이스만** — 햄버거/홈/About 페이지별 보정은 후속 task에서 점진 추가.

- [ ] **Step 1: index.css 끝에 새 블록 추가**

`src/index.css` 맨 아래에 추가:

```css
/* ========== Mobile Responsive Overrides ========== */

@media (max-width: 768px) {
  /* 컨테이너 좌우 패딩 축소 */
  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  /* EventBanner — 폰트/패딩 축소 */
  .event-banner {
    font-size: 0.85rem !important;
    padding: 0.6rem 1rem !important;
    gap: 0.4rem !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
}
```

- [ ] **Step 2: dev 서버에서 폰 시뮬레이터로 확인**

Run:
```powershell
npm run dev
```

Chrome DevTools → Toggle device toolbar → iPhone 12 Pro로 보고:
- 컨테이너가 좌우 여백 줄어 깨끗한지
- 배너가 줄바꿈하면서도 정보가 다 보이는지

- [ ] **Step 3: Commit**

```powershell
git add src/index.css
git commit -m "style(mobile): 글로벌 미디어쿼리 베이스 (container/section-title/event-banner)"
```

---

### Task 9: 햄버거 메뉴 — `MobileNav` 컴포넌트 신설

**Files:**
- Create: `src/components/MobileNav.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

App.tsx 비대화 방지를 위해 햄버거 메뉴는 별도 컴포넌트로 분리한다.

- [ ] **Step 1: `MobileNav.tsx` 생성**

```tsx
import React, { useState } from 'react';

type NavItem = { path: string; label: string };

type Props = {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
};

export const MobileNav: React.FC<Props> = ({ items, currentPath, onNavigate }) => {
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/schools' ? currentPath.startsWith('/schools') : currentPath === path;

  return (
    <div className="mobile-nav">
      <button
        type="button"
        aria-label="메뉴"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--bg-cream)',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <span style={{ width: 24, height: 2, background: 'currentColor', display: 'block' }} />
        <span style={{ width: 24, height: 2, background: 'currentColor', display: 'block' }} />
        <span style={{ width: 24, height: 2, background: 'currentColor', display: 'block' }} />
      </button>

      {open && (
        <div
          className="mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--primary-deep-forest)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
          }}
        >
          {items.map(item => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isActive(item.path) ? 'var(--accent-gold)' : 'var(--bg-cream)',
                fontSize: '1rem',
                fontWeight: isActive(item.path) ? 600 : 400,
                textAlign: 'left',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: `App.tsx` 수정 — MobileNav import + 데스크톱/모바일 분기**

`src/App.tsx` import 영역에 추가:

```tsx
import { MobileNav } from './components/MobileNav';
```

`<nav>` 안의 메뉴 버튼 컨테이너 (`<div style={{ display: 'flex', gap: '2rem' }}>...{navItems.map...}</div>`)를 다음과 같이 감싼다 — **기존 가로 메뉴는 유지**하되 className을 부여:

```tsx
          <div className="desktop-nav-items" style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              {/* ...기존 buttons 그대로... */}
            ))}
          </div>
          <div className="mobile-nav-wrapper" style={{ display: 'none' }}>
            <MobileNav items={navItems} currentPath={currentPath} onNavigate={setCurrentPath} />
          </div>
```

또한 `<nav>` 자체 style에 `position: 'relative'` 추가 (드로어가 absolute로 깔리려면 부모가 relative여야 함):

`backgroundColor: 'var(--primary-deep-forest)',` 줄이 있는 nav style 객체에 `position: 'relative',` 한 줄 추가.

- [ ] **Step 3: `index.css` 미디어쿼리에 토글 추가**

Phase B Task 8에서 만든 `@media (max-width: 768px)` 블록 안에 추가:

```css
@media (max-width: 768px) {
  /* ... 기존 ... */

  /* Nav: 데스크톱 가로메뉴 숨김, 모바일 햄버거 표시 */
  .desktop-nav-items {
    display: none !important;
  }
  .mobile-nav-wrapper {
    display: block !important;
  }
}
```

- [ ] **Step 4: dev 서버에서 확인**

Run:
```powershell
npm run dev
```

DevTools 모바일 시뮬레이터:
- 햄버거 버튼이 nav 우측에 보이는지
- 클릭 시 메뉴가 펼쳐지는지
- 메뉴 항목 클릭 시 라우팅되고 메뉴가 닫히는지

데스크톱 (창 폭 ≥ 769px):
- 기존 가로 메뉴가 그대로 보이는지

- [ ] **Step 5: Commit**

```powershell
git add src/components/MobileNav.tsx src/App.tsx src/index.css
git commit -m "feat(mobile): 햄버거 메뉴 (≤768px) — MobileNav 컴포넌트 + nav 토글"
```

---

### Task 10: 홈 hero / Stats 모바일 보정

**Files:**
- Modify: `src/App.tsx` (홈 hero 영역에 className 부여)
- Modify: `src/index.css`

홈 hero(line 84-186)의 inline style을 그대로 두고 className을 추가해 미디어쿼리로 덮어쓴다.

- [ ] **Step 1: App.tsx 홈 hero 컨테이너에 className 부여**

App.tsx에서 다음 4개 요소에 className 추가:

1. hero flex 컨테이너 (line 85-93의 `<div style={{ maxWidth: '1100px', ... display: 'flex', alignItems: 'flex-end', ...}}>`):

   `<div className="home-hero" style={{...}}>`

2. 텍스트 섹션 (line 95 `<div style={{ flex: '1 1 480px', ...}}>`):

   `<div className="home-hero-text" style={{...}}>`

3. 사진 섹션 (line 155 `<div style={{ flex: '0 0 auto', width: '420px', ...}}>`):

   `<div className="home-hero-photo" style={{...}}>`

4. h1 (line 107 `<h1 style={{ fontSize: '3.2rem', ...}}>`):

   `<h1 className="home-hero-h1" style={{...}}>`

5. Stats 컨테이너 (line 189 `<div style={{ backgroundColor: 'var(--primary-deep-forest)', padding: '3rem 1.5rem' }}>`):

   `<div className="home-stats" style={{...}}>`

6. Stats 카드 wrapper (line 200-209 `<div key={i} className="scroll-reveal" style={{ ... borderRight: ...}}>`):

   `className="scroll-reveal home-stat-card"` (추가)

- [ ] **Step 2: index.css 모바일 블록에 보정 추가**

기존 `@media (max-width: 768px)` 블록 안에 추가:

```css
@media (max-width: 768px) {
  /* ... 기존 ... */

  /* 홈 hero — 세로 스택 + 폰트 축소 */
  .home-hero {
    flex-direction: column !important;
    align-items: center !important;
    gap: 1.5rem !important;
  }
  .home-hero-text {
    flex: 1 1 100% !important;
    min-width: 0 !important;
    padding-bottom: 1rem !important;
    text-align: center;
  }
  .home-hero-h1 {
    font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
  }
  .home-hero-photo {
    width: 280px !important;
    height: 350px !important;
  }

  /* Stats — border-right 제거, 폰트/패딩 축소 */
  .home-stats {
    padding: 2rem 1rem !important;
  }
  .home-stat-card {
    border-right: none !important;
    padding: 1rem 0.5rem !important;
  }
  .home-stat-card > div:first-child {
    font-size: 2rem !important;
  }
  .home-stat-card > div:nth-child(2) {
    font-size: 0.95rem !important;
  }
  .home-stat-card > div:nth-child(3) {
    font-size: 0.8rem !important;
  }
}
```

- [ ] **Step 3: dev 서버에서 확인**

Run:
```powershell
npm run dev
```

DevTools iPhone 12 Pro:
- hero가 텍스트 위 / 사진 아래로 세로 스택
- h1이 화면을 넘기지 않음
- Stats 카드가 자동 줄바꿈되며 border-right 없음

데스크톱 ≥769px:
- 기존 가로 배치 유지

- [ ] **Step 4: Commit**

```powershell
git add src/App.tsx src/index.css
git commit -m "style(mobile): 홈 hero 세로 스택 + Stats 카드 보정 (≤768px)"
```

---

### Task 11: AboutPage 모바일 보정

**Files:**
- Modify: `src/pages/AboutPage.tsx` (Hero h1, case-study row에 className)
- Modify: `src/index.css`

- [ ] **Step 1: AboutPage 핵심 요소에 className 부여**

`src/pages/AboutPage.tsx`에서:

1. Intro Hero h1 (line 23 `<h1 style={{ fontSize: '3rem', ...}}>`):

   `<h1 className="about-hero-h1" style={{...}}>`

2. Intro Hero 컨테이너 (line 12-22의 `<div className="bg-math-pattern scroll-reveal" style={{ ...padding: '5rem 2rem', ...}}>`):

   className에 추가: `className="bg-math-pattern scroll-reveal about-hero"`

3. Case study row (line 146-158 `<div className="hover-card" key={idx} style={{ display: 'flex', ... padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap', ...}}>`):

   className에 추가: `className="hover-card about-case-row"`

4. Case study 첫 컬럼 (등급) (line 159 `<div style={{ width: '80px', ...}}>`):

   `<div className="about-case-grade" style={{...}}>`

5. Case study 두 번째 컬럼 (이름/결과) (line 162 `<div style={{ width: '200px', fontWeight: 600 }}>`):

   `<div className="about-case-name" style={{...}}>`

- [ ] **Step 2: index.css 모바일 블록에 보정 추가**

```css
@media (max-width: 768px) {
  /* ... 기존 ... */

  /* AboutPage hero */
  .about-hero {
    padding: 2.5rem 1rem !important;
    margin-bottom: 3rem !important;
  }
  .about-hero-h1 {
    font-size: clamp(1.6rem, 6vw, 2.2rem) !important;
  }
  .about-hero + p,
  .about-hero p {
    font-size: 1rem !important;
  }

  /* Case study row — 세로 스택 */
  .about-case-row {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.5rem !important;
    padding: 1rem !important;
  }
  .about-case-grade,
  .about-case-name {
    width: 100% !important;
  }
}
```

- [ ] **Step 3: dev 서버에서 확인**

Run:
```powershell
npm run dev
```

About 페이지 모바일:
- Hero가 화면 폭에 맞고 글자 안 잘림
- 후기/사례 카드가 1열로 펼쳐짐
- Case study row가 등급 → 이름 → 설명 세로 스택

- [ ] **Step 4: Commit**

```powershell
git add src/pages/AboutPage.tsx src/index.css
git commit -m "style(mobile): AboutPage hero/case-study 보정 (≤768px)"
```

---

### Task 12: 학교 상세 페이지 큰 표/그리드 보정

**Files:**
- Modify: `src/index.css` (셀렉터 추가만)

학교 상세 페이지(`/schools/:id`)는 `SchoolHero`, `StrategyPillars`, `CompetitionFunnel`, `ChangeComparison`, `MinReqPyramid`, `TamguCalculation`, `SupportMatrix`, `TieBreakSection`, `CaseStudy`, `WarningBox` 등이 inline style 위주라 페이지에 직접 className을 다 부여하긴 비용이 크다. 대신 표는 `.table-wrapper`가 이미 `overflow-x: auto`로 정의되어 있으니 학교 컴포넌트들이 표를 직접 쓰는 곳은 이미 안전하다. 추가로 큰 inline grid는 `flex-wrap: wrap`이 대부분이라 자동 줄바꿈된다.

이 task에서는 **공통 컨테이너 패딩만** 줄여 작은 폰에서 가로 스크롤이 발생하지 않게 한다.

- [ ] **Step 1: index.css 모바일 블록에 학교 페이지 보정 추가**

```css
@media (max-width: 768px) {
  /* ... 기존 ... */

  /* 학교 상세 페이지의 큰 카드들이 화면을 넘지 않도록
     공통 컨테이너 안의 직접 자식 div들 padding 보강 */
  .container > div {
    max-width: 100%;
  }

  /* DataTable (자료 페이지) — 셀 패딩 축소, 폰트 축소 */
  .custom-table th,
  .custom-table td {
    padding: 0.5rem 0.6rem;
    font-size: 0.85rem;
  }
  .data-table-header {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
}
```

- [ ] **Step 2: dev 서버에서 모든 학교 페이지 확인**

Run:
```powershell
npm run dev
```

DevTools 모바일 시뮬레이터에서:
- `/schools` 학교 목록 — 카드 깨짐 없는지
- `/schools/sungkyunkwan` — 모든 섹션 가로 스크롤 없음
- `/schools/cau` — 동일
- `/data` — 표가 가로 스크롤로 들어가는지 (이미 .table-wrapper로 OK)
- `/lectures` — 카드 1열 자동 정리 OK인지
- `/curriculum`, `/2028` — 깨지는 부분 없는지

깨지는 부분 발견 시 해당 컴포넌트에 className 부여 + 미디어쿼리 추가 (이 task 안에서 inline 보강).

- [ ] **Step 3: Commit**

```powershell
git add src/index.css
git commit -m "style(mobile): 학교/자료 페이지 패딩·폰트 보정 (≤768px)"
```

---

### Task 13: 실기 검증 (DevTools + 실제 폰)

- [ ] **Step 1: 빌드 + 프리뷰로 프로덕션 빌드 확인**

Run:
```powershell
npm run build
npm run preview
```

브라우저 `http://localhost:4173/`에서 프로덕션 번들로 모든 페이지 1회씩 확인.

- [ ] **Step 2: DevTools 시뮬레이터로 가로/세로 모두 확인**

iPhone 12 Pro / Galaxy S20 / iPad Mini 각 1회씩 다음 라우트:
- `/` — 배너 + hero + Stats
- `/about` — 다음 설명회 섹션 + 후기
- `/curriculum`
- `/schools`, `/schools/sungkyunkwan`, `/schools/cau`
- `/lectures`
- `/data`
- `/2028`

깨지는 부분 발견 시 → 해당 task로 돌아가 추가 className/미디어쿼리.

- [ ] **Step 3: 푸시 후 실제 폰으로 cwjmathlab.co.kr 확인**

```powershell
git push origin main
```

실제 폰(iOS Safari, Android Chrome)에서 cwjmathlab.co.kr 접속해 핵심 4페이지 확인.

- [ ] **Step 4: 발견된 추가 보정이 있으면 별도 커밋**

발견 시 해당 셀렉터를 `index.css`에 추가하고:

```powershell
git add src/index.css
git commit -m "style(mobile): 실기 확인 후 추가 보정 (<영역>)"
git push origin main
```

---

## Done 정의

- [ ] `npm test` 12개 통과
- [ ] `npm run build` 에러 없이 성공
- [ ] cwjmathlab.co.kr에 6/5(금) 19:30 정율사관학원 6층 대강당 설명회 안내가 모든 페이지 nav 아래 배너로 노출
- [ ] About 페이지에 설명회 상세 섹션 노출
- [ ] 2026-06-06 0시부터 배너/섹션 자동 숨김 (코드 자동 처리, 별도 작업 불필요)
- [ ] iPhone 12 Pro DevTools 시뮬레이터에서 모든 라우트 깨짐 없음
- [ ] 실제 폰에서 홈/About/학교/자료 페이지 깨짐 없음

---

## Self-Review 결과

**1. Spec coverage**
- 데이터 구조 (§4): Task 3 ✓
- EventBanner (§5.1): Task 4 + 5 ✓
- About 섹션 (§5.2): Task 6 ✓
- 요일 포맷팅 (§5.3): Task 3 (`formatEventDate` 동일 파일) ✓
- 모바일 원칙 (§6.1): Task 8 베이스 ✓
- 모바일 항목별 (§6.2): Nav=Task 9, hero/Stats=Task 10, About=Task 11, 학교/자료=Task 12 ✓
- 햄버거 (§6.3): Task 9 ✓
- 검증 (§6.4): Task 13 ✓

**2. Placeholder scan**
- "TBD"/"TODO" 없음. 모든 코드 블록 완전. 명령어 모두 PowerShell 형식 명시.
- Task 12에 "깨지는 부분 발견 시 해당 컴포넌트에 className 부여" 문구는 검증 절차의 일부로 의도된 가변 작업. 발견 안 되면 작업 없음, 발견 시 같은 패턴으로 반복.

**3. Type consistency**
- `Event` 타입 필드 (id/title/date/time/location/audience/summary): events.ts → events.test.ts → EventBanner → AboutPage 모두 동일.
- `getNextEvent` 시그니처 `(today?, source?)`: 테스트와 구현 일치.
- `formatEventDate(date: string)`: 사용처 모두 ISO 문자열 전달.
- App ↔ MobileNav prop: `items: NavItem[]`, `currentPath`, `onNavigate(path)` — 일관.
