# 설명회 안내 시스템 + 모바일 반응형 — Design Spec

작성일: 2026-05-12
대상 사이트: 조우제수리논술LAB (`cwjmathlab.co.kr`)
저장소: cwjmathlab/cwjmathlab-site

---

## 1. 목적

두 가지 결의 다른 작업을 한 번의 변경 사이클로 처리한다.

1. **설명회 안내 시스템** — 사이트가 다음 회차 설명회를 자동으로 노출/숨김 한다. 첫 회차는 2026-06-05(금) 19:30, 정율사관학원 6층 대강당. 운영자는 다음 회차를 데이터 파일 한 줄 추가로 게시할 수 있어야 한다.
2. **모바일 반응형** — 현재 사이트는 데스크톱 픽셀 고정 스타일이 많아 모바일에서 레이아웃이 깨진다. 학생·학부모가 폰으로 접속해도 이탈 없이 핵심 정보를 읽을 수 있어야 한다.

설명회는 **현장에서만** 진행한다. 사이트는 라이브 송출/녹화/신청 폼/Zoom 링크를 제공하지 않는다. 사이트의 역할은 "있다는 것을 알리는 것"뿐이다.

## 2. 비목표 (Non-goals)

- 신청 폼·신청자 DB·관리자 화면 — 만들지 않는다. 문의는 기존 FloatingContact(전화/카톡)로 흡수한다.
- Zoom·YouTube Live 등 외부 송출 — 만들지 않는다.
- 기존 inline 스타일을 CSS/Tailwind로 전면 리팩토링 — 하지 않는다. 깨지는 부분만 글로벌 미디어쿼리로 보강한다.
- 다국어/SEO 메타데이터 — 별도 작업.

## 3. 사용자 흐름

### 3.1 학생/학부모

- 어떤 페이지든 들어오면 **상단 nav 바로 아래에 띠 배너**가 보인다: `📢 6/5(금) 19:30 · 정율사관학원 6층 대강당  [설명회 안내 →]`.
- 배너를 누르면 **About 페이지의 "다음 설명회" 섹션**으로 이동/스크롤된다.
- 그 섹션에서 일자, 시간, 장소, 대상, 내용 요약, 문의 안내(FloatingContact 활용)를 확인한다.
- 설명회 일자가 지나면 배너와 섹션이 **자동으로 사라진다**.

### 3.2 운영자 (조우제 선생님)

- 다음 회차 설명회가 정해지면 `src/data/events.ts`에 한 줄 객체를 추가한다.
- 배포되면 자동으로 사이트 전반에 다음 회차가 노출된다.
- 별도 관리자 화면이나 로그인은 없다.

## 4. 데이터 모델

### `src/data/events.ts`

```ts
export type Event = {
  id: string;              // slug, 예: "2026-06-05-jeongyul"
  title: string;           // 정식 명칭
  date: string;            // ISO 'YYYY-MM-DD'
  time: string;            // 'HH:MM' (24h)
  location: string;        // '정율사관학원 6층 대강당'
  audience: string;        // '고3 · 재수생 / 학부모'
  summary: string;         // 한두 문장. About 섹션 본문에 노출
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

// 헬퍼: 오늘 이후의 가장 가까운 설명회 1건 반환. 없으면 null.
export function getNextEvent(today: Date = new Date()): Event | null { ... }
```

핵심 규칙:
- `getNextEvent`는 `date` ≥ 오늘(자정 기준)인 이벤트 중 가장 빠른 것을 반환.
- 모든 컴포넌트는 이 헬퍼만 호출. 직접 `events` 배열을 비교하지 않는다.

## 5. 컴포넌트

### 5.1 `EventBanner` — `src/components/EventBanner.tsx`

- 위치: `App.tsx`의 nav `</nav>` 직후, `<main>` 위.
- 동작: `getNextEvent()` null이면 렌더하지 않음(=완전 미노출).
- 표시: 한 줄. 예: `📢 6/5(금) 19:30 · 정율사관학원 6층 대강당 · 설명회 안내 →`
- 클릭 동작: 현재 라우팅은 `useState` 기반이라 해시 라우팅이 없다. 따라서 `setCurrentPath('/about')` 호출 후 다음 tick에 `document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' })`로 스크롤. 구현 시 작은 헬퍼(`navigateToEventSection`)로 캡슐화.
- 디자인: 짙은 배경(`--primary-deep-forest`) + `--accent-gold` 강조, 작은 텍스트.
- 모바일: 폰트/패딩 축소, 날짜/장소 중 길면 줄바꿈 허용.

### 5.2 About 페이지의 "다음 설명회" 섹션

- 위치: `AboutPage.tsx` 상단 (강사 소개 위 또는 바로 아래). 단, 다음 이벤트가 있을 때만 렌더.
- 앵커: `id="event"` (배너 클릭 스크롤 타겟).
- 내용: 정식 명칭 / 일자(요일 포함) · 시간 / 장소 / 대상 / summary / "문의" 문구 + FloatingContact 안내.
- 디자인: 크림 배경 카드, gold 포인트.

### 5.3 (선택) 요일 포맷팅 헬퍼

`formatEventDate(date: string): string` → `'6/5(금)'`, `'2026-06-05(금)'` 등. 한국어 요일 매핑. `src/data/events.ts` 또는 `src/utils/date.ts`에 둔다. 작은 함수라 `events.ts` 옆에 두는 게 가깝다.

## 6. 모바일 반응형 전략

### 6.1 원칙

- inline style을 모두 교체하지 않는다. **글로벌 미디어쿼리로 깨지는 부분만 덮어쓴다.**
- 브레이크포인트: `768px` (태블릿/폰 경계), 보조로 `480px` (작은 폰).
- 새 컴포넌트(`EventBanner`, About 섹션)는 처음부터 반응형으로 짠다.

### 6.2 `src/index.css`에 추가할 미디어쿼리 항목

> 정확한 셀렉터는 구현 단계에서 inline 요소에 className을 부여하면서 확정한다. 아래는 작업 단위 목록이다.

- **Nav (≤768px)**: 가로 메뉴 숨김, 햄버거 버튼 노출, 클릭 시 드로어/펼침 메뉴.
- **홈 hero (≤768px)**: `display: flex` → 세로 스택, 사진 폭 100% / 최대 320px, h1 폰트 `clamp(2rem, 8vw, 3.2rem)`, 버튼 가로 폭 100%.
- **Stats 섹션 (≤768px)**: `border-right` 제거, 폰트 축소(value 2rem, label 0.95rem), padding 축소.
- **About 후기 카드 (≤768px)**: 1열 스택. 현재 그리드 폭만 줄어들면 1열로 떨어지는지 구현 시 확인 후 보강.
- **학교 상세 페이지 큰 표/그리드 (≤768px)**: 표는 `overflow-x: auto` 컨테이너로 감싸기. 카드형 컴포넌트(SchoolHero, StrategyPillars 등)는 padding/fontSize 축소.
- **CurriculumPage / DataPage / PreviewPage (≤768px)**: 큰 inline padding/fontSize 살펴서 축소. 페이지별로 한 번 훑기.
- **FloatingContact / Footer**: 폰에서도 콘텐츠와 겹치지 않게 위치/크기 조정.

### 6.3 햄버거 메뉴 구현

- App.tsx 안에 `mobileNavOpen` 상태 추가.
- ≤768px에서만 햄버거 버튼 보이고, 데스크톱에서는 가로 메뉴.
- 메뉴 항목 클릭 → 라우트 변경 + `mobileNavOpen=false`.
- 드로어/펼침 형태 중 펼침이 단순(아래로 펼치는 박스). 첫 구현은 펼침으로 간다.

### 6.4 검증

- Chrome DevTools mobile 시뮬레이터(iPhone 12, Galaxy S20 등)에서 모든 라우트 1회씩 확인.
- 실제 폰에서 cwjmathlab.co.kr 접속해 핵심 페이지(홈, About, 학교, 자료) 확인.

## 7. 영향 받는 파일

신규
- `src/data/events.ts`
- `src/components/EventBanner.tsx`

수정
- `src/App.tsx` — events import, banner 렌더, nav className 부여 + 햄버거 상태
- `src/pages/AboutPage.tsx` — "다음 설명회" 섹션 추가
- `src/index.css` — 글로벌 미디어쿼리 블록 추가
- 일부 페이지/컴포넌트 — 모바일에서 깨지는 부분에 className 부여 (구현 단계에서 확정)

## 8. 위험 및 완화

| 위험 | 완화 |
|------|------|
| inline style이 많아 CSS 미디어쿼리로 덮어쓰기 어려운 경우 발생 | 해당 요소에 className을 새로 부여하고, 미디어쿼리에서 `style` override(필요 시 `!important`)로 처리 |
| 햄버거 메뉴 추가가 App.tsx 비대화 | 분량이 늘면 `Nav.tsx`로 분리. 일단 App.tsx 안에서 시작 |
| 배너 + About 섹션에서 동일 정보 중복 | 배너는 축약(요일·시간·장소), 섹션은 상세. 의도된 중복으로 둔다 |
| 설명회가 끝나는 순간 자동 숨김 처리 — 시점 경계 | `date` 자정(00:00 KST) 기준으로 비교. 6/5 종일은 표시, 6/6 00:00부터 숨김 |

## 9. 일정

- 6월 5일까지 배너·About 섹션은 반드시 라이브.
- 모바일 반응형은 햄버거+홈+About 우선, 학교/자료 페이지는 뒤이어 정리.

## 10. 후속 (Out of scope, 메모용)

- 설명회 신청 폼 + 명단 관리: 향후 필요해지면 별도 spec.
- 설명회 회차별 사진/후기 아카이브 페이지.
- 푸시 알림(예: 카톡 채널) 자동 연동.
