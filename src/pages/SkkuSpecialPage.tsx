import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SkkuSpecialHero } from '../components/skku-special/SkkuSpecialHero';
import { ExamScopeProofBox } from '../components/skku-special/ExamScopeProofBox';

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
      <ExamScopeProofBox />

      {/* ③ ~ ⑪ : 후속 Task 에서 채움 */}
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
