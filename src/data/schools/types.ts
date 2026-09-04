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

export type DataTableSection = {
  type: 'dataTable';
  title: string;
  subtitle?: string;
  columns: string[];
  rows: (string | number)[][];
  note?: string;
};

export type KeyPoint = {
  label: string;
  body: string;
  accent?: string;
};

export type KeyPointsSection = {
  type: 'keyPoints';
  title: string;
  subtitle?: string;
  points: KeyPoint[];
};

export type TimelineStep = {
  period: string;
  name: string;
  detail: string;
  accent?: boolean;
};

export type TimelineSection = {
  type: 'timeline';
  title: string;
  subtitle?: string;
  steps: TimelineStep[];
};

export type Results3YSectionData = {
  type: 'results3y';
  /** results3y 데이터 키 (예: 'khu', 'hyu') */
  uid: string;
  note?: string;
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
  | DataTableSection
  | Results3YSectionData
  | KeyPointsSection
  | TimelineSection
  | { type: 'custom'; component: React.ComponentType };

export type SchoolData = {
  meta: SchoolMeta;
  sections: SchoolSection[];
};
