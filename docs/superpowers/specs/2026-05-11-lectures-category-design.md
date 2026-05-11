# 기출 해설강의 카테고리 설계

## 목적

조우제 강사의 YouTube 기출문제 해설강의 영상을 사이트에서 모아 보여주는 카테고리 페이지를 추가한다. SNS·카페에서 "조우제수리논술LAB 해설강의"를 검색해 들어오는 학생/학부모에게 콘텐츠 허브 역할.

## 범위

- 영상 종류: **기출문제 해설강의만** (커리큘럼 영상, 인사 영상 등은 포함하지 않음)
- 모든 영상은 특정 학교 + 특정 연도와 연결됨

## 사이트 구조

Nav에 새 메뉴 "기출 해설" 추가. 위치: `학교별 상세` 다음, `2027 DATA` 앞.

라우트: `/lectures`

## 페이지 레이아웃

```
┌──────────────────────────────────────────────┐
│ 기출문제 해설강의                              │
│ 조우제 강사가 직접 풀이한 학교별 기출문제 영상   │
│                                              │
│ [전체] [중앙대] [성균관대]  ←학교 필터 칩      │
│                                              │
│ ┌────────┐ ┌────────┐ ┌────────┐            │
│ │ thumb  │ │ thumb  │ │ thumb  │            │
│ │ ▶      │ │ ▶      │ │ ▶      │            │
│ ├────────┤ ├────────┤ ├────────┤            │
│ │ 제목    │ │ 제목    │ │ 제목    │            │
│ │ [중앙대]│ │[성균관대]│ │ [중앙대]│            │
│ │ 2026   │ │ 2025   │ │ 2026   │            │
│ └────────┘ └────────┘ └────────┘            │
└──────────────────────────────────────────────┘
```

- 그리드: desktop 3열, tablet 2열, mobile 1열 (CSS `auto-fill` + `minmax`)
- 필터 칩: 영상이 존재하는 학교만 동적으로 노출 (학교 ID → `schoolMetas`에서 이름 조회)
- 정렬: 연도 내림차순, 같은 연도면 학교 가나다순
- 카드 클릭 → `window.open('https://youtu.be/{videoId}', '_blank')` 새 탭

## 데이터 모델

`src/data/lectures.ts`:

```ts
import { schoolMetas } from './schools';

export type Lecture = {
  videoId: string;     // YouTube 11자리 ID (예: 'jsBXLSTfEtg')
  title: string;       // 강의 제목 (한글)
  schoolId: string;    // 'cau', 'sungkyunkwan' — schoolMetas의 id와 매칭
  year: number;        // 기출 연도 (예: 2026)
};

export const lectures: Lecture[] = [
  // 첫 영상: jsBXLSTfEtg (강사님이 학교/연도/제목 제공 예정)
];

export const getLecturesSortedByYearDesc = (): Lecture[] => { ... };
export const getSchoolIdsWithLectures = (): string[] => { ... };
```

썸네일 URL: `https://img.youtube.com/vi/{videoId}/hqdefault.jpg` (YouTube가 무료로 제공, API 키 불필요)

## 새 파일/수정 파일

| 파일 | 변경 |
|------|------|
| `src/data/lectures.ts` | 신규 |
| `src/components/LectureCard.tsx` | 신규 (썸네일+제목+학교 뱃지+연도 카드) |
| `src/pages/LecturesPage.tsx` | 신규 (그리드 + 필터 chip 상태) |
| `src/App.tsx` | nav 배열 1줄, route 분기 1줄 추가 |

새 컴포넌트 디자인은 기존 사이트의 컬러 토큰(`var(--primary-deep-forest)`, `var(--bg-cream)`, `var(--accent-gold)`)을 그대로 사용해 톤 통일.

## 확장 여지 (지금은 안 함, 나중에 필요시)

- 학교 상세 페이지 하단에 해당 학교 영상 자동 임베드 (현재 design 도구 옵션 C — YAGNI로 보류)
- 영상 검색
- 연도 필터
- 영상 내 시간 마커 / 챕터

## 첫 영상 데이터

예시 영상 `jsBXLSTfEtg` — 강사님이 schoolId, year, title 알려주시면 첫 데이터 entry 작성.

## 비목적 (Non-goals)

- iframe 임베드 (의도적으로 안 함 — 채널 트래픽으로 보내는 게 더 유리)
- YouTube API 연동 (정적 데이터로 충분, 영상 추가 시 코드 수정 + 푸시)
- 댓글/좋아요 등 상호작용 (YouTube에서 처리)
