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

      <section className="scroll-reveal" style={{ marginBottom: '3.5rem' }}>
        <h2
          className="section-title"
          style={{ marginBottom: '1.5rem' }}
        >
          2028, 무엇이 달라지나
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
