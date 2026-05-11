# School Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "학교별 상세" section with a school list page and per-school detail pages. Sungkyunkwan University fully built from PDF content; all other universities present as "준비 중" skeletons.

**Architecture:** Hybrid data-driven approach. Each school has a metadata entry plus an optional `SchoolData` with a typed `sections[]` array. A single `SchoolDetailPage` dispatches each section to the appropriate component. `CustomSection` slot allows school-specific JSX. Routing uses the existing `useState`-based path pattern in `App.tsx`.

**Tech Stack:** React 19 + TypeScript, Vite, no test framework (project has none), no git (project not initialized as repo). Verification is visual via `npm run dev`.

**Notes for the implementer:**
- This codebase has **no tests** and is **not a git repo**. Tasks omit test/commit steps and use **visual checkpoints** (start dev server, open browser, confirm rendering) instead.
- Follow the existing patterns: functional components, TypeScript, inline styles using CSS variables from `src/index.css` (`--primary-deep-forest`, `--primary-forest`, `--accent-gold`, `--bg-cream`, `--bg-beige`, `--text-dark`, `--text-muted`, `--border-color`).
- Keep all UI strings in Korean to match the rest of the site.
- Reuse `useScrollReveal` hook for scroll-triggered fade-ins.

---

## File Structure

**Create:**
- `src/data/schools/types.ts` — TypeScript types for school meta + section union
- `src/data/schools/index.ts` — `schoolMetas` array (all universities, only sungkyunkwan ready) + helper functions
- `src/data/schools/sungkyunkwan.ts` — Full Sungkyunkwan data (10 sections)
- `src/pages/SchoolListPage.tsx` — `/schools` grid page
- `src/pages/SchoolDetailPage.tsx` — `/schools/:id` page (renders sections)
- `src/components/schools/SchoolHero.tsx`
- `src/components/schools/ChangeComparison.tsx`
- `src/components/schools/MinReqPyramid.tsx`
- `src/components/schools/CompetitionFunnel.tsx`
- `src/components/schools/TamguCalculation.tsx`
- `src/components/schools/SupportMatrix.tsx`
- `src/components/schools/WarningBox.tsx`
- `src/components/schools/TieBreakSection.tsx`
- `src/components/schools/CaseStudy.tsx`
- `src/components/schools/StrategyPillars.tsx`

**Modify:**
- `src/App.tsx` — Add nav item, parse `/schools` and `/schools/:id` paths
- `src/pages/DataPage.tsx` — Wrap school names in clickable spans for ready schools

---

## Task 1: School types and metadata

**Files:**
- Create: `src/data/schools/types.ts`
- Create: `src/data/schools/index.ts`

- [ ] **Step 1: Define section types**

Create `src/data/schools/types.ts`:

```ts
import type React from 'react';

export type SchoolMeta = {
  id: string;
  name: string;
  tagline: string;
  ready: boolean;
};

export type ChangeBlock = {
  label: string;
  items: string[];
  summary: string;
};

export type MinReqTier = {
  rule: string;
  scope: string;
  highlight?: boolean;
};

export type FunnelStage = {
  label: string;
  value: string;
  caption?: string;
};

export type TamguRule = {
  title: string;
  body: string;
};

export type MatrixCell = {
  label: string;
  count?: number | string;
};

export type MatrixRow = {
  rowLabel: string;
  cells: MatrixCell[][];
};

export type Callout = {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  text: string;
};

export type CaseBlock = {
  heading: string;
  body: string;
  result: '합격' | '불합격';
};

export type StrategyPillar = {
  title: string;
  body: string;
  warning?: string;
};

export type SchoolSection =
  | { type: 'hero'; title: string; subtitle: string }
  | { type: 'change'; oldBlock: ChangeBlock; newBlock: ChangeBlock; note: string }
  | { type: 'minReq'; tiers: MinReqTier[]; note?: string }
  | { type: 'funnel'; stages: FunnelStage[]; insight: string }
  | { type: 'tamgu'; baseCondition: string; rules: TamguRule[]; hidden?: TamguRule }
  | { type: 'matrix'; columns: string[]; rows: MatrixRow[]; callouts?: Callout[] }
  | { type: 'warning'; title: string; body: string; footnote?: string }
  | { type: 'tieBreak'; primary: string; primaryNote: string; secondary: string[] }
  | { type: 'caseStudy'; title: string; subtitle: string; statsLabels: string[]; statsValues: number[]; oldCase: CaseBlock; newCase: CaseBlock }
  | { type: 'strategy'; pillars: StrategyPillar[] }
  | { type: 'custom'; component: React.ComponentType };

export type SchoolData = {
  meta: SchoolMeta;
  sections: SchoolSection[];
};
```

- [ ] **Step 2: Create the school index with all universities**

Create `src/data/schools/index.ts`. Include every university appearing in `ratioData` (from `src/data/nonsulData.ts`). Only `sungkyunkwan` has `ready: true`.

```ts
import type { SchoolMeta, SchoolData } from './types';
import { sungkyunkwanData } from './sungkyunkwan';

export const schoolMetas: SchoolMeta[] = [
  { id: 'sungkyunkwan', name: '성균관대', tagline: '룰의 변화와 합격의 설계도', ready: true },
  { id: 'gachon', name: '가천대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'catholic', name: '가톨릭대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'konkuk', name: '건국대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kyunghee', name: '경희대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'korea', name: '고려대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'korea-sejong', name: '고려대(세종캠)', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kookmin', name: '국민대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'duksung', name: '덕성여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'dongduk', name: '동덕여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'samyook', name: '삼육대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'sogang', name: '서강대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'seokyeong', name: '서경대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'sungshin', name: '성신여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'yonsei', name: '연세대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'yonsei-mirae', name: '연세대(미래캠)', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'ewha', name: '이화여대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kut', name: '한국기술교육대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'hufs', name: '한국외대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'hufs-global', name: '한국외대(글로벌캠)', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'kau', name: '한국항공대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'hanyang', name: '한양대', tagline: '논술 100% 반영 대학', ready: false },
  { id: 'gyeonggi', name: '경기대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'sangmyung', name: '상명대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'sookmyung', name: '숙명여대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'soongsil', name: '숭실대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'shinhan', name: '신한대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'hongik', name: '홍익대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'hongik-sejong', name: '홍익대(세종캠)', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'dankook', name: '단국대', tagline: '논술 90% + 교과 10%', ready: false },
  { id: 'kangnam', name: '강남대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'kwangwoon', name: '광운대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'pusan', name: '부산대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'uos', name: '서울시립대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'swu', name: '서울여대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'sejong', name: '세종대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'ajou', name: '아주대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'eulji', name: '을지대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'inha', name: '인하대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'tukorea', name: '한국공학대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'hanshin', name: '한신대', tagline: '논술 80% + 교과 20%', ready: false },
  { id: 'suwon', name: '수원대', tagline: '논술 75% + 교과 25%', ready: false },
  { id: 'knu', name: '경북대', tagline: '논술 70% + 교과 30%', ready: false },
  { id: 'seoultech', name: '서울과학기술대', tagline: '논술 70% + 교과 30%', ready: false },
  { id: 'dongguk', name: '동국대', tagline: '논술 70% + 교과 20% + 출결 10%', ready: false },
  { id: 'cau', name: '중앙대', tagline: '논술 70% + 교과 20% + 출결 10%', ready: false },
];

const schoolDataMap: Record<string, SchoolData> = {
  sungkyunkwan: sungkyunkwanData,
};

export const getSchoolMeta = (id: string): SchoolMeta | undefined =>
  schoolMetas.find(m => m.id === id);

export const getSchoolMetaByName = (name: string): SchoolMeta | undefined =>
  schoolMetas.find(m => m.name === name);

export const getSchoolData = (id: string): SchoolData | undefined =>
  schoolDataMap[id];
```

- [ ] **Step 3: Create a temporary stub for sungkyunkwan**

Create `src/data/schools/sungkyunkwan.ts` with a placeholder (will be filled in Task 9):

```ts
import type { SchoolData } from './types';

export const sungkyunkwanData: SchoolData = {
  meta: { id: 'sungkyunkwan', name: '성균관대', tagline: '룰의 변화와 합격의 설계도', ready: true },
  sections: [],
};
```

- [ ] **Step 4: Visual checkpoint — verify TypeScript compiles**

Run: `cd "C:/Users/PC/개발/NONSUL" && npx tsc --noEmit`
Expected: No errors.

---

## Task 2: SchoolListPage

**Files:**
- Create: `src/pages/SchoolListPage.tsx`

- [ ] **Step 1: Build the page with search and grid**

```tsx
import React, { useState } from 'react';
import { schoolMetas } from '../data/schools';
import { useScrollReveal } from '../hooks/useScrollReveal';

type Props = {
  onNavigate: (path: string) => void;
};

export const SchoolListPage: React.FC<Props> = ({ onNavigate }) => {
  useScrollReveal();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = schoolMetas.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 className="section-title scroll-reveal">학교별 상세</h1>

      <p className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        대학별 논술전형의 핵심 정보를 분석한 자료입니다.
      </p>

      <div className="scroll-reveal" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', position: 'relative' }}>
        <input
          type="text"
          placeholder="대학명을 검색해 보세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1.25rem 1.5rem',
            fontSize: '1.1rem',
            border: '2px solid var(--primary-forest)',
            borderRadius: '12px',
            outline: 'none',
            color: 'var(--text-dark)',
          }}
        />
      </div>

      <div
        className="scroll-reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filtered.map(meta => {
          const isReady = meta.ready;
          return (
            <div
              key={meta.id}
              onClick={isReady ? () => onNavigate(`/schools/${meta.id}`) : undefined}
              style={{
                background: isReady ? 'var(--bg-white)' : 'var(--bg-beige)',
                border: `1px solid ${isReady ? 'var(--primary-forest)' : 'var(--border-color)'}`,
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: isReady ? 'pointer' : 'not-allowed',
                opacity: isReady ? 1 : 0.55,
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: isReady ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (isReady) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (isReady) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--primary-deep-forest)', fontSize: '1.25rem' }}>{meta.name}</h3>
                {!isReady && (
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: 'var(--text-muted)',
                    color: 'white',
                    fontWeight: 600,
                  }}>준비 중</span>
                )}
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{meta.tagline}</p>
              {isReady && (
                <div style={{ marginTop: '1rem', color: 'var(--primary-forest)', fontWeight: 600, fontSize: '0.9rem' }}>
                  상세 보기 →
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

- [ ] **Step 2: Visual checkpoint — verify file compiles**

Run: `cd "C:/Users/PC/개발/NONSUL" && npx tsc --noEmit`
Expected: No errors.

---

## Task 3: Routing in App.tsx + nav item

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add SchoolListPage and SchoolDetailPage imports**

At the top of `App.tsx`, add:

```tsx
import { SchoolListPage } from './pages/SchoolListPage';
import { SchoolDetailPage } from './pages/SchoolDetailPage';
```

- [ ] **Step 2: Add nav item**

Replace the `navItems` array (around line 11):

```tsx
const navItems = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/curriculum', label: 'CURRICULUM' },
  { path: '/schools', label: '학교별 상세' },
  { path: '/data', label: '2027 DATA' }
];
```

- [ ] **Step 3: Update nav highlight to include detail subpaths**

In the `<button>` mapping for nav items, change the active check so `/schools/...` keeps the "학교별 상세" item highlighted. Replace each `currentPath === item.path` check inside the button's `style` object (3 occurrences: `color`, `fontWeight`, `borderBottom`) with:

```tsx
(item.path === '/schools' ? currentPath.startsWith('/schools') : currentPath === item.path)
```

- [ ] **Step 4: Add route handlers in main**

After the existing `{currentPath === '/data' && <DataPage />}` line, add:

```tsx
{currentPath === '/schools' && <SchoolListPage onNavigate={setCurrentPath} />}
{currentPath.startsWith('/schools/') && (
  <SchoolDetailPage
    schoolId={currentPath.slice('/schools/'.length)}
    onNavigate={setCurrentPath}
  />
)}
```

- [ ] **Step 5: Visual checkpoint — start dev server, click nav**

Run: `cd "C:/Users/PC/개발/NONSUL" && npm run dev` (in background if needed)
Open `http://localhost:5173/`. Click "학교별 상세" in the nav. Confirm the school list page renders with all university cards. Click 성균관대 card — page should change (404-style empty since SchoolDetailPage doesn't exist yet, but no crash). Stop the server.

Note: This step depends on Task 4 creating `SchoolDetailPage`. Do them in order; the import in Step 1 will fail to compile until Task 4 Step 1 is done. If working strictly task-by-task, complete Task 4 Step 1 first, then return.

---

## Task 4: SchoolDetailPage shell with section dispatcher

**Files:**
- Create: `src/pages/SchoolDetailPage.tsx`

- [ ] **Step 1: Build the dispatcher shell**

```tsx
import React from 'react';
import { getSchoolData, getSchoolMeta } from '../data/schools';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SchoolHero } from '../components/schools/SchoolHero';
import { ChangeComparison } from '../components/schools/ChangeComparison';
import { MinReqPyramid } from '../components/schools/MinReqPyramid';
import { CompetitionFunnel } from '../components/schools/CompetitionFunnel';
import { TamguCalculation } from '../components/schools/TamguCalculation';
import { SupportMatrix } from '../components/schools/SupportMatrix';
import { WarningBox } from '../components/schools/WarningBox';
import { TieBreakSection } from '../components/schools/TieBreakSection';
import { CaseStudy } from '../components/schools/CaseStudy';
import { StrategyPillars } from '../components/schools/StrategyPillars';

type Props = {
  schoolId: string;
  onNavigate: (path: string) => void;
};

export const SchoolDetailPage: React.FC<Props> = ({ schoolId, onNavigate }) => {
  useScrollReveal();
  const meta = getSchoolMeta(schoolId);
  const data = getSchoolData(schoolId);

  if (!meta) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-deep-forest)' }}>존재하지 않는 학교입니다.</h1>
        <button
          onClick={() => onNavigate('/schools')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            background: 'var(--primary-deep-forest)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          학교 목록으로
        </button>
      </div>
    );
  }

  if (!meta.ready || !data) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-deep-forest)' }}>{meta.name}</h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          상세 분석 자료를 준비 중입니다.
        </p>
        <button
          onClick={() => onNavigate('/schools')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            background: 'var(--primary-deep-forest)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          학교 목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem' }}>
      <button
        onClick={() => onNavigate('/schools')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary-forest)',
          cursor: 'pointer',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          padding: 0,
        }}
      >
        ← 학교 목록
      </button>

      {data.sections.map((section, idx) => {
        switch (section.type) {
          case 'hero':
            return <SchoolHero key={idx} {...section} />;
          case 'change':
            return <ChangeComparison key={idx} {...section} />;
          case 'minReq':
            return <MinReqPyramid key={idx} {...section} />;
          case 'funnel':
            return <CompetitionFunnel key={idx} {...section} />;
          case 'tamgu':
            return <TamguCalculation key={idx} {...section} />;
          case 'matrix':
            return <SupportMatrix key={idx} {...section} />;
          case 'warning':
            return <WarningBox key={idx} {...section} />;
          case 'tieBreak':
            return <TieBreakSection key={idx} {...section} />;
          case 'caseStudy':
            return <CaseStudy key={idx} {...section} />;
          case 'strategy':
            return <StrategyPillars key={idx} {...section} />;
          case 'custom': {
            const Component = section.component;
            return <Component key={idx} />;
          }
          default:
            return null;
        }
      })}
    </div>
  );
};
```

- [ ] **Step 2: Visual checkpoint — verify imports resolve after Task 5+ complete**

This file imports 10 components that don't exist yet. TS will error until Tasks 5–8 are done. Move on to Task 5; come back to verify only after all section components exist.

---

## Task 5: Simple text/box section components

**Files:**
- Create: `src/components/schools/SchoolHero.tsx`
- Create: `src/components/schools/StrategyPillars.tsx`
- Create: `src/components/schools/TieBreakSection.tsx`
- Create: `src/components/schools/WarningBox.tsx`

- [ ] **Step 1: SchoolHero**

```tsx
import React from 'react';

type Props = { title: string; subtitle: string };

export const SchoolHero: React.FC<Props> = ({ title, subtitle }) => (
  <div
    className="scroll-reveal"
    style={{
      background: 'linear-gradient(135deg, var(--primary-deep-forest), var(--primary-forest))',
      color: 'var(--bg-cream)',
      padding: '3.5rem 2rem',
      borderRadius: '16px',
      textAlign: 'center',
      marginBottom: '2.5rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    }}
  >
    <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{title}</h1>
    <div
      style={{
        marginTop: '1.25rem',
        display: 'inline-block',
        padding: '0.5rem 1.25rem',
        border: '1px solid var(--accent-gold)',
        borderRadius: '999px',
        color: 'var(--accent-gold)',
        fontSize: '1rem',
        fontWeight: 500,
      }}
    >
      {subtitle}
    </div>
  </div>
);
```

- [ ] **Step 2: WarningBox**

```tsx
import React from 'react';

type Props = { title: string; body: string; footnote?: string };

export const WarningBox: React.FC<Props> = ({ title, body, footnote }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <div
      style={{
        background: '#7a1f1f',
        color: 'white',
        padding: '1rem 1.5rem',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        fontWeight: 700,
        fontSize: '1.1rem',
      }}
    >
      ⚠ {title}
    </div>
    <div
      style={{
        background: '#fdf2f2',
        border: '1px solid #f0c4c4',
        borderTop: 'none',
        padding: '2rem',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#7a1f1f', margin: 0, lineHeight: 1.6 }}>
        {body}
      </p>
      {footnote && (
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {footnote}
        </p>
      )}
    </div>
  </div>
);
```

- [ ] **Step 3: TieBreakSection**

```tsx
import React from 'react';

type Props = { primary: string; primaryNote: string; secondary: string[] };

export const TieBreakSection: React.FC<Props> = ({ primary, primaryNote, secondary }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.25rem' }}>
      동점자 처리 기준
    </h2>
    <div
      style={{
        background: 'var(--primary-deep-forest)',
        color: 'var(--accent-gold)',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        fontWeight: 700,
        fontSize: '1.1rem',
        textAlign: 'center',
      }}
    >
      1순위: {primary}
    </div>
    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
      {primaryNote}
    </p>
    <div style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
      <div style={{ fontWeight: 700, color: 'var(--text-dark)', marginBottom: '1rem', textAlign: 'center' }}>
        2순위: 학생부 과목별 석차등급 상위자
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {secondary.map((subject, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                padding: '0.6rem 1.25rem',
                background: i === 0 ? '#c4584c' : `rgba(196, 88, 76, ${0.85 - i * 0.15})`,
                color: 'white',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              {subject}
            </div>
            {i < secondary.length - 1 && (
              <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>›</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);
```

- [ ] **Step 4: StrategyPillars**

```tsx
import React from 'react';
import type { StrategyPillar } from '../../data/schools/types';

type Props = { pillars: StrategyPillar[] };

export const StrategyPillars: React.FC<Props> = ({ pillars }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
      합격 설계도
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {pillars.map((p, i) => (
        <div
          key={i}
          style={{
            background: 'var(--bg-white)',
            border: '2px solid var(--primary-forest)',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            전략 {i + 1}
          </div>
          <h3 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'center' }}>
            {p.title}
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
            {p.body}
          </p>
          {p.warning && (
            <p
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fdf2f2',
                color: '#7a1f1f',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              ⚠ {p.warning}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);
```

- [ ] **Step 5: Visual checkpoint — TS compile**

Run: `cd "C:/Users/PC/개발/NONSUL" && npx tsc --noEmit`
Expected: Errors only for the still-missing components from Tasks 6–8 (no errors for the four files just created).

---

## Task 6: Comparison and pyramid sections

**Files:**
- Create: `src/components/schools/ChangeComparison.tsx`
- Create: `src/components/schools/MinReqPyramid.tsx`
- Create: `src/components/schools/CompetitionFunnel.tsx`

- [ ] **Step 1: ChangeComparison**

```tsx
import React from 'react';
import type { ChangeBlock } from '../../data/schools/types';

type Props = { oldBlock: ChangeBlock; newBlock: ChangeBlock; note: string };

const Block: React.FC<{ block: ChangeBlock; isNew: boolean }> = ({ block, isNew }) => (
  <div
    style={{
      flex: 1,
      background: isNew ? 'var(--bg-beige)' : 'var(--bg-white)',
      border: `2px solid ${isNew ? 'var(--accent-gold)' : 'var(--border-color)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        background: 'var(--primary-deep-forest)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        marginBottom: '1.25rem',
        fontWeight: 700,
      }}
    >
      {block.label}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
      {block.items.map((item, i) => (
        <span
          key={i}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--primary-deep-forest)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
          }}
        >
          {item}
        </span>
      ))}
    </div>
    <p
      style={{
        textAlign: 'center',
        margin: 0,
        color: isNew ? '#7a1f1f' : 'var(--text-muted)',
        fontWeight: 600,
      }}
    >
      {block.summary}
    </p>
  </div>
);

export const ChangeComparison: React.FC<Props> = ({ oldBlock, newBlock, note }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      2026 vs 2027 변화
    </h2>
    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
      <Block block={oldBlock} isNew={false} />
      <Block block={newBlock} isNew={true} />
    </div>
    <div
      style={{
        marginTop: '1.25rem',
        background: 'var(--primary-deep-forest)',
        color: 'var(--bg-cream)',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        textAlign: 'center',
        fontWeight: 600,
      }}
    >
      {note}
    </div>
  </div>
);
```

- [ ] **Step 2: MinReqPyramid**

```tsx
import React from 'react';
import type { MinReqTier } from '../../data/schools/types';

type Props = { tiers: MinReqTier[]; note?: string };

export const MinReqPyramid: React.FC<Props> = ({ tiers, note }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      수능 최저학력 기준
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      {tiers.map((tier, i) => {
        const widthPct = 60 + i * 20;
        return (
          <div
            key={i}
            style={{
              width: `${widthPct}%`,
              minHeight: '100px',
              background: tier.highlight ? 'var(--accent-gold)' : 'var(--primary-forest)',
              color: tier.highlight ? 'var(--primary-deep-forest)' : 'var(--bg-cream)',
              padding: '1rem 1.5rem',
              borderRadius: '6px',
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.1rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '1rem' }}>
              {tier.rule}
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
              {tier.scope}
            </div>
          </div>
        );
      })}
    </div>
    {note && (
      <p
        style={{
          marginTop: '1.25rem',
          padding: '1rem 1.25rem',
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          borderLeft: '4px solid var(--accent-gold)',
          borderRadius: '6px',
          color: 'var(--text-dark)',
          fontSize: '0.95rem',
          margin: '1.25rem 0 0',
        }}
      >
        {note}
      </p>
    )}
  </div>
);
```

- [ ] **Step 3: CompetitionFunnel**

```tsx
import React from 'react';
import type { FunnelStage } from '../../data/schools/types';

type Props = { stages: FunnelStage[]; insight: string };

export const CompetitionFunnel: React.FC<Props> = ({ stages, insight }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      실질 경쟁률 분석
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
        gap: '0.5rem',
        alignItems: 'center',
        background: 'var(--bg-white)',
        padding: '2rem 1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
      }}
    >
      {stages.map((stage, i) => {
        const heightPct = 100 - i * 22;
        return (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                margin: '0 auto',
                width: '90%',
                height: `${heightPct}px`,
                background: i === stages.length - 1 ? 'var(--accent-gold)' : 'var(--primary-forest)',
                opacity: 0.4 + i * 0.15,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              {stage.value}
            </div>
            <div style={{ marginTop: '0.75rem', fontWeight: 700, color: 'var(--primary-deep-forest)' }}>
              {stage.label}
            </div>
            {stage.caption && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {stage.caption}
              </div>
            )}
          </div>
        );
      })}
    </div>
    <div
      style={{
        marginTop: '1.25rem',
        background: '#fdf2f2',
        border: '1px solid #f0c4c4',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        color: '#7a1f1f',
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      [2027 예측 데이터] {insight}
    </div>
  </div>
);
```

- [ ] **Step 4: Visual checkpoint**

Run: `cd "C:/Users/PC/개발/NONSUL" && npx tsc --noEmit`
Expected: Errors only for the missing components from Tasks 7–8.

---

## Task 7: Tamgu calculation and support matrix

**Files:**
- Create: `src/components/schools/TamguCalculation.tsx`
- Create: `src/components/schools/SupportMatrix.tsx`

- [ ] **Step 1: TamguCalculation**

```tsx
import React from 'react';
import type { TamguRule } from '../../data/schools/types';

type Props = { baseCondition: string; rules: TamguRule[]; hidden?: TamguRule };

const RuleBox: React.FC<{ rule: TamguRule; tone: 'forest' | 'gold' | 'red' }> = ({ rule, tone }) => {
  const tones = {
    forest: { bg: 'var(--primary-forest)', color: 'white' },
    gold: { bg: 'var(--accent-gold)', color: 'var(--primary-deep-forest)' },
    red: { bg: '#fdf2f2', color: '#7a1f1f' },
  };
  const t = tones[tone];
  return (
    <div
      style={{
        background: t.bg,
        color: t.color,
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        flex: 1,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{rule.title}</div>
      <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{rule.body}</div>
    </div>
  );
};

export const TamguCalculation: React.FC<Props> = ({ baseCondition, rules, hidden }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      탐구 영역 계산법
    </h2>
    <div
      style={{
        background: 'var(--bg-beige)',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontWeight: 600,
        color: 'var(--primary-deep-forest)',
      }}
    >
      기본 조건: {baseCondition}
    </div>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: hidden ? '1rem' : 0 }}>
      {rules.map((rule, i) => (
        <RuleBox key={i} rule={rule} tone={i === 0 ? 'forest' : 'gold'} />
      ))}
    </div>
    {hidden && <RuleBox rule={hidden} tone="red" />}
  </div>
);
```

- [ ] **Step 2: SupportMatrix**

```tsx
import React from 'react';
import type { MatrixRow, Callout } from '../../data/schools/types';

type Props = { columns: string[]; rows: MatrixRow[]; callouts?: Callout[] };

export const SupportMatrix: React.FC<Props> = ({ columns, rows, callouts }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
      논술 지원 매트릭스
    </h2>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px' }}>
        <thead>
          <tr>
            <th style={{ width: '120px' }}></th>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  background: 'var(--primary-deep-forest)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              <th
                style={{
                  background: 'var(--primary-forest)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  textAlign: 'center',
                  width: '120px',
                  verticalAlign: 'middle',
                }}
              >
                {row.rowLabel}
              </th>
              {row.cells.map((cellList, ci) => (
                <td
                  key={ci}
                  style={{
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '1rem',
                    verticalAlign: 'top',
                  }}
                >
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {cellList.map((c, i) => (
                      <li key={i}>
                        {c.label}{c.count !== undefined ? ` (${c.count})` : ''}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {callouts && callouts.length > 0 && (
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {callouts.map((c, i) => (
          <div
            key={i}
            style={{
              padding: '0.5rem 1rem',
              background: '#fdf2f2',
              color: '#7a1f1f',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            💡 {c.text}
          </div>
        ))}
      </div>
    )}
  </div>
);
```

- [ ] **Step 3: Visual checkpoint**

Run: `cd "C:/Users/PC/개발/NONSUL" && npx tsc --noEmit`
Expected: Only errors for `CaseStudy` (Task 8).

---

## Task 8: CaseStudy section

**Files:**
- Create: `src/components/schools/CaseStudy.tsx`

- [ ] **Step 1: CaseStudy**

```tsx
import React from 'react';
import type { CaseBlock } from '../../data/schools/types';

type Props = {
  title: string;
  subtitle: string;
  statsLabels: string[];
  statsValues: number[];
  oldCase: CaseBlock;
  newCase: CaseBlock;
};

const CasePanel: React.FC<{ heading: string; block: CaseBlock; isFail: boolean }> = ({ heading, block, isFail }) => (
  <div
    style={{
      flex: 1,
      background: isFail ? '#fdf2f2' : 'var(--bg-white)',
      border: `2px solid ${isFail ? '#c4584c' : 'var(--primary-forest)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        fontWeight: 700,
        color: isFail ? '#7a1f1f' : 'var(--primary-deep-forest)',
        marginBottom: '1rem',
        fontSize: '1.05rem',
      }}
    >
      {heading}
    </div>
    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
      {block.heading}
    </p>
    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
      {block.body}
    </p>
    <div
      style={{
        marginTop: '1rem',
        textAlign: 'center',
        padding: '0.75rem',
        background: isFail ? '#c4584c' : 'var(--primary-forest)',
        color: 'white',
        borderRadius: '6px',
        fontWeight: 700,
      }}
    >
      {block.result}
    </div>
  </div>
);

export const CaseStudy: React.FC<Props> = ({ title, subtitle, statsLabels, statsValues, oldCase, newCase }) => (
  <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: 'var(--primary-deep-forest)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
      {title}
    </h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{subtitle}</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      {statsLabels.map((label, i) => (
        <div
          key={i}
          style={{
            width: '70px',
            background: 'var(--bg-white)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '8px',
            padding: '0.75rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-deep-forest)' }}>
            {statsValues[i]}
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <CasePanel heading="2026 기준" block={oldCase} isFail={oldCase.result === '불합격'} />
      <CasePanel heading="2027 시뮬레이션" block={newCase} isFail={newCase.result === '불합격'} />
    </div>
  </div>
);
```

- [ ] **Step 2: Visual checkpoint — full TS compile**

Run: `cd "C:/Users/PC/개발/NONSUL" && npx tsc --noEmit`
Expected: No errors.

---

## Task 9: Sungkyunkwan content

**Files:**
- Modify: `src/data/schools/sungkyunkwan.ts` (replace stub from Task 1)

- [ ] **Step 1: Replace the stub with full content**

Overwrite `src/data/schools/sungkyunkwan.ts`:

```ts
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
      type: 'funnel',
      stages: [
        { label: 'STAGE 1 원서 접수자', value: '100%', caption: 'Initial Applicants' },
        { label: '논술 실제 응시자', value: '44.7~46.5%', caption: '반 이상의 허수가 시험장에 오지 않음' },
        { label: '최종 실질 경쟁자', value: '24% / 28%', caption: '인문 / 자연 (수능 최저 통과)' },
      ],
      insight: '수능 최저 기준이 "4개 중 3개"로 강화됨에 따라, 실질 경쟁률(24%)은 올해 더욱 폭락할 것입니다. 최저만 맞추면 합격 확률은 급상승합니다.',
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
```

- [ ] **Step 2: Visual checkpoint — full render**

Run: `cd "C:/Users/PC/개발/NONSUL" && npm run dev` (background)
Open `http://localhost:5173/`. Click "학교별 상세" in nav → click 성균관대 card. Confirm all 11 sections render top to bottom (Hero, Change, MinReq, Funnel, Tamgu, Matrix, Warning, TieBreak, Case Study 1, Case Study 2, Strategy). Check for layout breaks. Stop the server.

---

## Task 10: Make DataPage school names clickable

**Files:**
- Modify: `src/pages/DataPage.tsx`

- [ ] **Step 1: Add a navigation prop and helper render function**

Currently `DataPage` doesn't take props. Update App.tsx to pass `setCurrentPath`:

In `src/App.tsx`, change:
```tsx
{currentPath === '/data' && <DataPage />}
```
to:
```tsx
{currentPath === '/data' && <DataPage onNavigate={setCurrentPath} />}
```

Then in `src/pages/DataPage.tsx`, change the component signature:

```tsx
type Props = { onNavigate: (path: string) => void };

export const DataPage: React.FC<Props> = ({ onNavigate }) => {
```

- [ ] **Step 2: Add school name renderer and apply to all four tables**

At the top of `DataPage.tsx`, add the import:

```tsx
import { getSchoolMetaByName } from '../data/schools';
```

Inside the component (above the `return`), add a helper:

```tsx
const renderUniversities = (val: string) => {
  if (!val || val === '-') return val;
  // Split on commas while preserving the separators visually
  const parts = val.split(/,\s*/);
  return (
    <span>
      {parts.map((name, i) => {
        const meta = getSchoolMetaByName(name.trim());
        const isReady = meta?.ready === true;
        const node = isReady ? (
          <button
            key={i}
            onClick={() => onNavigate(`/schools/${meta!.id}`)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--primary-forest)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              font: 'inherit',
            }}
          >
            {name}
          </button>
        ) : (
          <span key={i}>{name}</span>
        );
        return (
          <React.Fragment key={i}>
            {node}
            {i < parts.length - 1 && <span>, </span>}
          </React.Fragment>
        );
      })}
    </span>
  );
};
```

Then in **all four `DataTable` calls** that have a `universities` column, set `render: renderUniversities`. Concretely:

- Theme 01 (Theme 01 ratio table): change the `universities` column to `{ key: 'universities', label: '대학', render: renderUniversities }`
- Theme 02: same change
- Theme 04: change `대학 (학과)` column to `{ key: 'universities', label: '대학 (학과)', render: renderUniversities }`

Theme 03 has no `universities` column — skip.

- [ ] **Step 3: Visual checkpoint**

Run: `cd "C:/Users/PC/개발/NONSUL" && npm run dev` (background)
Go to `/data`. Confirm 성균관대 in Theme 01's "논술 100%" row appears as a green underlined link. Click it — should navigate to the detail page. Confirm other school names appear as plain text. Stop the server.

---

## Task 11: Final visual sweep

- [ ] **Step 1: Run the full app and exercise every nav path**

Run: `cd "C:/Users/PC/개발/NONSUL" && npm run dev` (background)
Open `http://localhost:5173/`.

Verify in order:
1. HOME page renders unchanged.
2. ABOUT, CURRICULUM, 2027 DATA all render (regression check).
3. Click "학교별 상세" → list page shows ~46 cards, only 성균관대 is clickable.
4. Search "성균" → only 성균관대 visible.
5. Search "한양" → only 한양대 visible (not clickable).
6. Click 성균관대 → all 11 sections render. Scroll through.
7. Click "← 학교 목록" → back to list.
8. Click "2027 DATA" → table renders. Click 성균관대 in Theme 01 → detail page.
9. Click a non-ready university name in Theme 01 (e.g., 가천대) → renders as plain text, no click.

- [ ] **Step 2: Mobile responsive check**

In browser devtools, toggle to mobile width (~375px). Re-verify the school list grid collapses to one column and the detail page sections remain readable (no horizontal scroll except inside the matrix table).

- [ ] **Step 3: Stop the server**

Stop the dev server.
