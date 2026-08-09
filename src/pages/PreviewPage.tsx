import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  previewMeta,
  groupBlocks,
  previewDisclaimer
} from '../data/previewData';
import {
  changes2028General,
  changes2028Narrative,
  schools2028,
  preview2028DetailDisclaimer,
  type EssayType2028
} from '../data/preview2028Details';
import { KeyChangeCards } from '../components/preview/KeyChangeCards';
import { System2028 } from '../components/preview/System2028';
import { GroupBlock } from '../components/preview/GroupBlock';
import { ActionChecklist } from '../components/preview/ActionChecklist';
import { School2028Card } from '../components/preview/School2028Card';
import { DataTable } from '../components/DataTable';

const renderMultiline = (val: string) =>
  val
    ? val.split('\n').map((line, i) => <div key={i}>{line}</div>)
    : '—';

export const PreviewPage: React.FC = () => {
  useScrollReveal();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'전체' | EssayType2028>('전체');

  const query = searchTerm.trim().toLowerCase();

  const filteredGeneral = query
    ? changes2028General.filter(d => d.school.toLowerCase().includes(query))
    : changes2028General;
  const filteredNarrative = query
    ? changes2028Narrative.filter(d => d.school.toLowerCase().includes(query))
    : changes2028Narrative;

  const filteredSchools = schools2028.filter(s => {
    if (typeFilter !== '전체' && s.type !== typeFilter) return false;
    if (query && !s.name.toLowerCase().includes(query)) return false;
    return true;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 4rem' }}>
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

      {/* 제도 편 — 수능·내신 자체의 변화 (교육부·평가원 확정 사항) */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          먼저, 수능과 내신이 이렇게 바뀝니다
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          교육부·한국교육과정평가원이 확정 발표한 내용입니다 — 추측이 아닌 확정 사항만 정리했습니다.
        </p>
        <System2028 />
      </section>

      <section className="scroll-reveal" style={{ marginBottom: '3.5rem' }}>
        <h2
          className="section-title"
          style={{ marginBottom: '1.5rem' }}
        >
          그래서 논술전형은, 무엇이 달라지나
        </h2>
        <KeyChangeCards />
      </section>

      <section className="scroll-reveal" style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
          계열별 정리
        </h2>
        {groupBlocks.map(block => (
          <GroupBlock key={block.id} block={block} />
        ))}
      </section>

      {/* 2028 모집요강 요약 — 대학별 DATA (출처: 프린키피아 수학연구소) */}
      {/* 주의: 이 섹션은 매우 길어서 scroll-reveal(요소 15% 노출 시 표시)을 걸면 영영 나타나지 않음 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          2028 모집요강 요약 — 대학별 DATA
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          자연 계열 + 자유전공 계열 + MEDICAL 계열 + 약술형 · 시험일자는 작년 기준
        </p>

        {/* 대학 검색 */}
        <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="목표 대학을 검색해 보세요 (예: 중앙대)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem',
              fontSize: '1.2rem',
              border: '2px solid var(--primary-forest)',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              outline: 'none',
              color: 'var(--text-dark)'
            }}
          />
          <svg style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-forest)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>

        {filteredGeneral.length > 0 && (
          <DataTable
            key={`general-${query}`}
            title="2028 주요 변화 — 일반형 논술"
            subtitle="시험 범위 및 2027 대비 변경 사항 (출처: 프린키피아 수학연구소, 2026.05 기준)"
            columns={[
              { key: 'school', label: '대학' },
              { key: 'scope', label: '시험 범위', render: renderMultiline },
              { key: 'change', label: '주요 변화', render: renderMultiline }
            ]}
            data={filteredGeneral}
            mobileTitleKey="school"
          />
        )}

        {filteredNarrative.length > 0 && (
          <DataTable
            key={`narrative-${query}`}
            title="2028 주요 변화 — 약술형 논술"
            subtitle="시험 범위 및 2027 대비 변경 사항 (출처: 프린키피아 수학연구소, 2026.05 기준)"
            columns={[
              { key: 'school', label: '대학' },
              { key: 'scope', label: '시험 범위', render: renderMultiline },
              { key: 'change', label: '주요 변화', render: renderMultiline }
            ]}
            data={filteredNarrative}
            mobileTitleKey="school"
          />
        )}

        {/* 대학별 상세 카드 */}
        <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-deep-forest)', fontWeight: 800, margin: '3rem 0 0.75rem' }}>
          대학별 전형 상세 ({filteredSchools.length}개교)
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          시험일자 · 전형방법 · 모집인원 · 수능최저조건 — 카드를 검색·필터로 좁혀 보세요.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['전체', '일반형', '약술형'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '999px',
                border: '2px solid var(--primary-forest)',
                background: typeFilter === t ? 'var(--primary-forest)' : 'var(--bg-white)',
                color: typeFilter === t ? 'var(--bg-cream)' : 'var(--primary-forest)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {filteredSchools.map(s => (
          <School2028Card key={s.name} data={s} />
        ))}
        {filteredSchools.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
            검색 결과가 없습니다.
          </p>
        )}
        <p
          style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-cream)',
            borderRadius: '8px',
            lineHeight: 1.6
          }}
        >
          ※ {preview2028DetailDisclaimer}
        </p>
      </section>

      <div className="scroll-reveal">
        <ActionChecklist />
      </div>

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
