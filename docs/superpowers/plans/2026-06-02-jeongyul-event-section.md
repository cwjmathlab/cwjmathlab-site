# 정율사관학원 6/5 설명회 HOME 섹션 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 학원 모객 문자(슬로건·분반·예약폼·연락처)를 HOME `/` 페이지의 신규 `#jeongyul-event` 섹션으로 반영하고, 사이트 이탈 없이 Google Form으로 신청까지 완료시킨다.

**Architecture:**
- 단일 정적 React 컴포넌트 (`JeongyulEventSection.tsx`)가 `getNextEvent()` 결과로 자체 가시성을 판단해 6/6 0시부터 자동 사라짐.
- `EventBanner` 배너 클릭 동선은 기존 `link` 메커니즘을 확장해 `'/#hash'` 형식을 인식하도록 `App.tsx` 의 `navigateToEventSection` 한 곳만 보강.
- Google Form은 페이지 안에 `iframe` 으로 임베드(메인 CTA로 외부 이동도 동시 제공).

**Tech Stack:** React 19 + Vite 8, TypeScript, vanilla CSS 변수, Vitest 4. 외부 라이브러리 추가 없음.

**Spec:** `docs/superpowers/specs/2026-06-02-jeongyul-event-section-design.md`

---

## File Structure

- **Create**: `src/components/JeongyulEventSection.tsx` — 단일 책임: 6/5 정율사관학원 설명회 9블록 + iframe 렌더링. `getNextEvent()` 가 jeongyul entry를 반환할 때만 노출.
- **Modify**: `src/data/events.ts` — `2026-06-05-jeongyul` entry의 `title`/`summary`/`location`/`audience` 를 학원 문자 기준으로 교체하고 `link: '/#jeongyul-event'` 추가.
- **Modify**: `src/data/events.test.ts` — 정율사관학원 entry가 `link: '/#jeongyul-event'` 를 가진다는 회귀 테스트 1개 추가.
- **Modify**: `src/App.tsx` — `<JeongyulEventSection />` 마운트 + `navigateToEventSection` 에 hash-aware 분기 추가.

테스트 파일 외에는 unit test를 작성하지 않는다 (프로젝트 관행: 데이터 모듈만 vitest로 검증, 시각 컴포넌트는 수동 확인).

---

## Task 1: Google Form 임베드 URL 리졸브 (수동 조사)

**Files:** 없음 (작업 산출물은 후속 Task의 코드 상수로 들어감)

**Why:** `https://forms.gle/6Qxde96469Ghmbpp8` 는 short link라 iframe `src`로 그대로 쓰면 X-Frame-Options 또는 리다이렉트 흐름 때문에 임베드가 깨질 수 있음. 실제 `viewform` long URL을 한 번 얻어서 `?embedded=true` 를 붙여야 함.

- [ ] **Step 1: Short link를 브라우저에서 열어 최종 URL을 복사**

작업자가 브라우저에서 `https://forms.gle/6Qxde96469Ghmbpp8` 에 접속하면 다음 형식으로 리다이렉트된다:
```
https://docs.google.com/forms/d/e/<formId>/viewform
```

`<formId>` 부분(약 56자, 영숫자·하이픈·언더스코어 혼합)을 정확히 복사해 둔다.

- [ ] **Step 2: 임베드용 URL 조합 결정**

다음 두 상수를 Task 3에서 사용한다.
- 임베드용: `https://docs.google.com/forms/d/e/<formId>/viewform?embedded=true`
- 새 탭 열기용(CTA 메인 버튼): `https://docs.google.com/forms/d/e/<formId>/viewform`

이 값들을 메모로 보관(후속 Task 3에서 `FORM_VIEW_URL`, `FORM_EMBED_URL` 상수로 사용).

> **블로커 처리:** `<formId>` 가 변경되거나 폼이 비공개로 바뀐 경우 → 사용자에게 새 short link 또는 long URL을 요청한 후 진행. 추정 URL을 코드에 박지 말 것.

---

## Task 2: events.ts 데이터 업데이트 + 회귀 테스트

**Files:**
- Modify: `src/data/events.ts:25-35`
- Test: `src/data/events.test.ts`

- [ ] **Step 1: 실패하는 테스트 먼저 추가**

`src/data/events.test.ts` 의 첫 번째 `describe('events 데이터', ...)` 블록 내부, 기존 `it('id "2026-08-02-skku-special" 이벤트가 존재하고 ...')` **바로 아래** 에 다음 테스트 추가:

```ts
  it('id "2026-06-05-jeongyul" 이벤트는 link "/#jeongyul-event" 를 가진다', () => {
    const ev = events.find(e => e.id === '2026-06-05-jeongyul');
    expect(ev).toBeDefined();
    expect(ev?.link).toBe('/#jeongyul-event');
  });
```

- [ ] **Step 2: 테스트 실행해서 실패 확인**

Run: `npm test -- events.test`

Expected: 새 테스트 1개가 `expected undefined to be "/#jeongyul-event"` 형태로 FAIL. 다른 테스트는 모두 PASS.

- [ ] **Step 3: events.ts entry 교체**

`src/data/events.ts` 의 25~35행에 있는 `2026-06-05-jeongyul` 객체를 다음으로 교체:

```ts
  {
    id: '2026-06-05-jeongyul',
    title: '수학의 반전, 대학 라인 역전의 기회 — 6/5 수리논술 설명회',
    date: '2026-06-05',
    time: '19:30',
    location: '상동역 5번 출구 비잔티움 6층 정율사관학원',
    audience: '고3 · N수생 · 학부모',
    summary:
      '대학별 출제 경향 · 학생 수준별 전략 · 실제 합격 사례까지. ' +
      '정율사관학원 조우제 대표강사가 직접 설명합니다.',
    link: '/#jeongyul-event',
  },
```

`id` 와 `date`, `time` 은 변경하지 않는다 (다른 테스트·코드가 의존).

- [ ] **Step 4: 모든 테스트 실행해서 PASS 확인**

Run: `npm test`

Expected:
- 새 테스트(jeongyul link) PASS
- 기존 `각 이벤트는 id, title, date(ISO), time, location, audience, summary를 가진다` PASS (필드 모두 존재)
- 기존 `link 필드는 옵셔널이고, 있으면 슬래시로 시작하거나 외부 URL이다` PASS (`/#jeongyul-event` 는 `/` 시작)
- 기존 skku, formatEventDate, getNextEvent 테스트 모두 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/data/events.ts src/data/events.test.ts
git commit -m "feat(events): 6/5 정율사관학원 설명회 entry를 실제 문자 내용으로 교체

학원 모객 문자의 슬로건(\"수학의 반전, 대학 라인 역전의 기회\")과
정확한 장소(상동역 5번 출구 비잔티움 6층)를 반영. link 추가로
EventBanner 클릭 시 HOME #jeongyul-event 섹션으로 스크롤되도록 연결.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: JeongyulEventSection 컴포넌트 신설

**Files:**
- Create: `src/components/JeongyulEventSection.tsx`

> 프로젝트 관행상 시각 컴포넌트에는 unit test를 작성하지 않는다 (`@testing-library/react` 미설치, 기존 `EventBanner`·`FloatingContact`·skku-special/** 모두 무테스트). 동작 검증은 Task 5의 수동 확인 단계에서.

- [ ] **Step 1: 파일 생성**

`src/components/JeongyulEventSection.tsx` 를 다음 내용으로 생성. Task 1에서 얻은 `<formId>` 를 두 군데 `FORM_*_URL` 상수에 박아 넣을 것.

```tsx
import React from 'react';
import { getNextEvent } from '../data/events';

const JEONGYUL_EVENT_ID = '2026-06-05-jeongyul';

// Task 1에서 리졸브한 실제 URL로 교체
const FORM_VIEW_URL =
  'https://docs.google.com/forms/d/e/<formId>/viewform';
const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/<formId>/viewform?embedded=true';

const KEY_POINTS: string[] = [
  '대학별 수리논술 출제 경향 분석',
  '학생 수준별 맞춤 준비 전략',
  '실제 합격 사례 공개',
];

export const JeongyulEventSection: React.FC = () => {
  const next = getNextEvent();
  if (!next || next.id !== JEONGYUL_EVENT_ID) return null;

  return (
    <section
      id="jeongyul-event"
      style={{
        backgroundColor: 'var(--bg-beige)',
        padding: '4rem 1.5rem',
        scrollMarginTop: '80px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* (a) Eyebrow chip */}
        <div
          style={{
            display: 'inline-block',
            padding: '0.45rem 1.1rem',
            backgroundColor: 'var(--primary-deep-forest)',
            color: 'var(--accent-gold)',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '1.25rem',
          }}
        >
          📢 6/5(금) 19:30 · 정율사관학원 설명회
        </div>

        {/* (b) Hook headline */}
        <h2
          style={{
            fontSize: '2.5rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 1rem',
          }}
        >
          수학의 반전,<br />대학 라인 역전의 기회
        </h2>

        {/* (c) Lead copy */}
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          수능까지 이제 6개월도 남지 않았습니다. 정시와 내신, 둘 다 챙기기엔
          불안하시다면 주목해 주세요.
        </p>

        {/* (d) Pain → strategy copy */}
        <div
          style={{
            backgroundColor: 'var(--bg-white)',
            padding: '1.75rem 2rem',
            borderRadius: '12px',
            marginBottom: '2.5rem',
            borderLeft: '4px solid var(--accent-gold)',
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--primary-deep-forest)',
              margin: '0 0 0.75rem',
            }}
          >
            어머니, 다른 건 몰라도 우리 아이 '수학'은 좀 하지 않나요?
          </p>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-dark)',
              lineHeight: 1.75,
              margin: '0 0 0.75rem',
            }}
          >
            자연계 입시는 이 '수학 경쟁력' 하나로 대학 라인이 완전히 달라질
            수 있습니다.
          </p>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-dark)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            수리논술은 정시·학생부 외에 대학 결과를 바꿀 수 있는 또 하나의
            강력한 전략입니다.
          </p>
        </div>

        {/* (e) Class type 2-cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '5px solid var(--primary-forest)',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                color: 'var(--primary-deep-forest)',
                marginBottom: '0.5rem',
                fontSize: '1.15rem',
              }}
            >
              개념반
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              기초를 탄탄하게 완성
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '10px',
              borderLeft: '5px solid var(--accent-gold)',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                color: 'var(--primary-deep-forest)',
                marginBottom: '0.5rem',
                fontSize: '1.15rem',
              }}
            >
              심화반
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              상위권 대학 합격 목표
            </div>
          </div>
        </div>

        {/* (f) Key content 3-bullet */}
        <h3
          style={{
            fontSize: '1.35rem',
            color: 'var(--primary-deep-forest)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          설명회 핵심 내용
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
          {KEY_POINTS.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.5rem 0',
                fontSize: '1.05rem',
                color: 'var(--text-dark)',
              }}
            >
              <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>▷</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* (g) Schedule / speaker / venue box */}
        <div
          style={{
            backgroundColor: 'var(--primary-deep-forest)',
            color: 'var(--bg-cream)',
            padding: '1.75rem 2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: '1rem',
              rowGap: '0.6rem',
              fontSize: '1rem',
            }}
          >
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>일시</span>
            <span>6월 5일(금) 19:30</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>연사</span>
            <span>조우제 수리논술 대표강사</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>장소</span>
            <span>상동역 5번 출구 비잔티움 6층 정율사관학원</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>전화</span>
            <span>032-321-9937</span>
          </div>
        </div>

        {/* (h) CTA 3 buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <a
            href={FORM_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 240px',
              textAlign: 'center',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--primary-deep-forest)',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            🔗 지금 예약하기
          </a>
          <a
            href="tel:0323219937"
            style={{
              flex: '1 1 180px',
              textAlign: 'center',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--bg-white)',
              color: 'var(--primary-deep-forest)',
              fontWeight: 700,
              fontSize: '1.05rem',
              borderRadius: '8px',
              border: '2px solid var(--primary-deep-forest)',
              textDecoration: 'none',
            }}
          >
            📞 032-321-9937
          </a>
          <a
            href="http://pf.kakao.com/_xiqxhxlxb/chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 180px',
              textAlign: 'center',
              padding: '1rem 1.5rem',
              backgroundColor: '#FEE500',
              color: '#3C1E1E',
              fontWeight: 700,
              fontSize: '1.05rem',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            💬 카카오톡 상담
          </a>
        </div>

        {/* (i) Google Form iframe embed */}
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}
        >
          아래에서 바로 예약하실 수 있습니다.
        </p>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <iframe
            src={FORM_EMBED_URL}
            width="100%"
            height={900}
            title="6/5 설명회 예약 폼"
            style={{
              border: 0,
              display: 'block',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            로딩 중…
          </iframe>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Task 1에서 얻은 `<formId>` 값으로 두 상수 교체**

`FORM_VIEW_URL` 과 `FORM_EMBED_URL` 의 `<formId>` 자리에 실제 ID를 박는다. `<formId>` 가 코드에 남아 있으면 안 됨.

- [ ] **Step 3: lint + 타입 체크 + 빌드 통과 확인**

Run: `npm run lint && npm run build`

Expected:
- lint: 0 error, 0 warning
- build: Vite가 성공적으로 번들 산출 (dist/ 갱신)

- [ ] **Step 4: 테스트 회귀 확인**

Run: `npm test`

Expected: 이전 단계까지의 모든 테스트가 그대로 PASS (컴포넌트 자체 테스트는 없음).

- [ ] **Step 5: 커밋**

```bash
git add src/components/JeongyulEventSection.tsx
git commit -m "feat(jeongyul-event): 6/5 설명회 HOME 섹션 컴포넌트 신설

학원 문자 카피를 9블록(슬로건·페인카피·개념반/심화반·핵심 3-bullet
·일정 박스·CTA 3종·Google Form iframe)으로 렌더링. getNextEvent()가
정율사관학원 entry를 반환할 때만 자체 노출되어 6/6 0시부터 자동 사라짐.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: App.tsx에 섹션 마운트 + 해시 라우팅 보강

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: import 추가**

`src/App.tsx` 의 import 블록(현재 11행 `EventBanner` 직후) 에 다음을 추가:

```tsx
import { JeongyulEventSection } from './components/JeongyulEventSection';
```

- [ ] **Step 2: `navigateToEventSection` 핸들러를 해시 인식 가능하게 보강**

현재 21~32행:
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

다음으로 교체:
```tsx
  const navigateToEventSection = () => {
    const next = getNextEvent();
    if (next?.link) {
      const hashIndex = next.link.indexOf('#');
      if (hashIndex >= 0) {
        const path = next.link.slice(0, hashIndex) || '/';
        const elementId = next.link.slice(hashIndex + 1);
        setCurrentPath(path);
        setTimeout(() => {
          document
            .getElementById(elementId)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
        return;
      }
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

> 동작 요약: `link === '/#jeongyul-event'` → path=`'/'`, elementId=`'jeongyul-event'` → HOME으로 이동 후 200ms 뒤 해당 섹션으로 부드러운 스크롤. `link === '/sungkyunkwan-special'` 처럼 해시 없는 경로는 기존 동작 그대로.

- [ ] **Step 3: HOME 분기에 `<JeongyulEventSection />` 마운트**

현재 277행 부근 (Hero 직후, Stats 직전):
```tsx
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="home-stats" style={{
```

다음과 같이 Stats Section 위에 컴포넌트 추가:
```tsx
                </div>
              </div>
            </div>

            <JeongyulEventSection />

            {/* Stats Section */}
            <div className="home-stats" style={{
```

> 위치 확인: HOME 분기 (`currentPath === '/' && ...`) 내부, `home-hero` 컨테이너를 닫는 두 개의 `</div>` 와 한 개의 컨테이너 닫는 `</div>` 다음. Stats Section 시작 `<div className="home-stats" ...>` 직전. 다른 페이지(`/about`, `/data` 등) 분기에는 마운트하지 않는다.

- [ ] **Step 4: lint + 타입 + 빌드 + 테스트 통과 확인**

Run: `npm run lint && npm run build && npm test`

Expected: 모두 통과. 빌드 산출물 크기가 약간 증가하는 정도(컴포넌트 1개분).

- [ ] **Step 5: 커밋**

```bash
git add src/App.tsx
git commit -m "feat(app): HOME에 정율사관학원 6/5 설명회 섹션 마운트 + 해시 라우팅

navigateToEventSection이 link의 '#fragment' 부분을 인식해 라우팅 후
해당 element로 스크롤하도록 보강. EventBanner 클릭 시 HOME으로 이동
하면서 jeongyul-event 섹션으로 부드럽게 스크롤됨.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: 수동 동작 검증

**Files:** 없음 (개발 서버에서 실제 동작 확인)

> 시각 컴포넌트 unit test가 없으므로 이 Task가 곧 품질 게이트. 모든 항목을 통과해야 작업 완료.

- [ ] **Step 1: dev 서버 기동**

Run: `npm run dev`

Vite가 `http://localhost:5173` (혹은 표시되는 포트)에서 기동될 때까지 대기.

- [ ] **Step 2: HOME 페이지에서 섹션 시각 확인 (PC 폭)**

브라우저에서 `http://localhost:5173/` 접속 후 다음 모두 확인:

- [ ] Hero(프로필 사진+슬로건) 아래에 베이지 배경의 새 섹션이 보인다.
- [ ] 챕터 헤딩 "수학의 반전, 대학 라인 역전의 기회" 가 진네이비 굵은 글씨로 한 줄/두 줄로 표시.
- [ ] "어머니, 다른 건 몰라도…" 박스에 금색 좌측 보더가 보인다.
- [ ] 개념반/심화반 두 카드가 가로로 나란히, 좌측 보더 색이 각각 deep-forest와 gold.
- [ ] "설명회 핵심 내용" 아래 ▷ 불릿 3개.
- [ ] 진네이비 배경 박스에 일시·연사·장소·전화 4행이 보인다.
- [ ] CTA 3개(금색 예약하기 / 흰색 전화 / 노란색 카카오톡)가 가로 정렬.
- [ ] CTA 아래 "아래에서 바로 예약하실 수 있습니다." 안내 후 **Google Form 이 iframe 안에 실제로 로드되어 표시**됨. (회색 박스나 X 표시면 Task 1 URL 리졸브 실패 → 재확인)

- [ ] **Step 3: 모바일 폭 확인**

브라우저 DevTools에서 iPhone 14 Pro(390×844) 등 모바일 뷰포트로 전환 후:

- [ ] 분반 2-카드가 세로 스택으로 바뀐다.
- [ ] CTA 3개가 적절히 줄바꿈되어 한 줄에 1~2개씩 자연스럽게 배치된다.
- [ ] iframe 폼이 화면 폭에 맞춰 보이고, 폼 안에서 스크롤·입력이 가능하다.

- [ ] **Step 4: EventBanner → 섹션 스크롤 동선 확인**

`/about` 페이지로 이동(상단 메뉴 ABOUT 클릭) → 그 상태에서 상단 검은 띠 **"📢 다음 설명회 6/5(금) 19:30 · 상동역 5번 출구… 자세히 보기 →"** 배너 클릭.

- [ ] HOME으로 라우팅되고, 약 200ms 뒤 `#jeongyul-event` 섹션으로 부드럽게 스크롤된다.
- [ ] URL bar는 그대로(`useState` 라우팅이라 무관), 단 섹션이 시야 상단에 보이면 성공.

- [ ] **Step 5: 예약 CTA 외부 이동 확인**

위 섹션의 메인 "🔗 지금 예약하기" 버튼 클릭.

- [ ] 새 탭에서 Google Forms 페이지가 정상적으로 열린다.
- [ ] iframe 안 폼과 새 탭 폼이 같은 폼인지 (헤더 텍스트 동일) 확인.

- [ ] **Step 6: 6/6 자동 숨김 시뮬레이션 (Devtools console)**

DevTools Console에서 다음을 실행 (vitest 모킹과 별개로, 임시 확인용):

```js
// 시스템 Date를 6/6으로 가짜 변경
const RealDate = Date;
window.Date = class extends RealDate {
  constructor(...args) {
    if (args.length === 0) return new RealDate('2026-06-06T00:00:01');
    return new RealDate(...args);
  }
  static now() { return new RealDate('2026-06-06T00:00:01').getTime(); }
};
location.reload();
```

- [ ] 새로고침 후 상단 EventBanner 가 사라지고, HOME 섹션 `#jeongyul-event` 도 사라진다 (그 자리는 Hero 바로 아래 Stats 가 붙음).
- [ ] 다음 이벤트인 `2026-08-02-skku-special` 배너가 대신 노출된다.
- [ ] 확인 후 `delete window.Date` 또는 페이지 닫기로 원복.

- [ ] **Step 7: 빌드 산출물 크기 확인**

Run: `npm run build`

산출물(`dist/assets/index-*.js`) 크기가 기존 대비 큰 폭(예: +30KB 이상)으로 늘지 않았는지 확인. iframe은 외부 리소스라 번들에 포함되지 않으므로 ~+3~6KB 정도가 정상.

---

## Task 6: 배포 전 최종 점검 (선택적)

**Files:** 없음

- [ ] **Step 1: 변경된 파일 전체를 한 번에 git diff 로 훑어 본다**

```bash
git diff main~3 main -- src/ docs/
```

- [ ] 의도하지 않은 파일이 포함되어 있지 않은지.
- [ ] 디버그용 `console.log`, 주석 처리된 코드 블록, `<formId>` placeholder 가 남아 있지 않은지.

- [ ] **Step 2: Vercel 자동 배포가 진행되는지 GitHub 푸시**

```bash
git push origin main
```

Vercel 대시보드에서 배포 성공(녹색) 확인 후 `https://cwjmathlab.co.kr/` 에서 Task 5와 동일한 시각 검증을 한 번 더 진행.

---

## Self-Review (작성자 자체 점검 결과)

**Spec coverage 매핑:**
- §4.1 섹션 위치 → Task 4 Step 3
- §4.2 EventBanner 동선 → Task 4 Step 2 (hash 분기), Task 2 Step 3 (link 추가)
- §4.3 자동 만료 → Task 3 Step 1 (`getNextEvent` null/id 가드), Task 5 Step 6 (시뮬 검증)
- §5 9블록 콘텐츠 → Task 3 Step 1
- §5.1 iframe 사양 (max-width 720, height 900, title 등) → Task 3 Step 1
- §6 시각 처리 (CSS 변수, 모바일 스택) → Task 3 Step 1, Task 5 Step 3
- §7 데이터 변경 → Task 2 Step 3
- §9 테스트 → Task 2 (회귀 테스트), Task 5 (수동 검증)
- §10 비범위 → 어떤 Task에도 포함하지 않음 ✓

**Placeholder scan:** Task 3의 `<formId>` 만 의도된 placeholder이며 Task 1 산출물 + Task 3 Step 2 에서 명시적으로 교체 처리. 그 외 "TBD", "TODO", "fill in", "appropriate" 등 없음.

**Type consistency:** `JeongyulEventSection`(컴포넌트), `getNextEvent`(이미 export), `Event` 타입, `link` 필드, `id` `'2026-06-05-jeongyul'`, element id `'jeongyul-event'`, 상수 `FORM_VIEW_URL`/`FORM_EMBED_URL` 모두 Task 간 명명 일관 ✓.
