import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SkkuSpecialHero } from '../components/skku-special/SkkuSpecialHero';
import { ExamScopeProofBox } from '../components/skku-special/ExamScopeProofBox';
import { KeyDatesTimeline } from '../components/skku-special/KeyDatesTimeline';
import { CompetitionInsight } from '../components/skku-special/CompetitionInsight';
import { SpecialCourseCard } from '../components/skku-special/SpecialCourseCard';
import { InstructorSection } from '../components/skku-special/InstructorSection';
import { TeachingApproach } from '../components/skku-special/TeachingApproach';
import { ReviewsSection } from '../components/skku-special/ReviewsSection';
import { SessionArchive } from '../components/skku-special/SessionArchive';

type Props = {
  onNavigate: (path: string) => void;
};

export const SkkuSpecialPage: React.FC<Props> = ({ onNavigate }) => {
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
      <KeyDatesTimeline onNavigateToSchool={() => onNavigate('/schools/sungkyunkwan')} />
      <CompetitionInsight />
      <section id="course"><SpecialCourseCard /></section>
      <InstructorSection />
      <TeachingApproach />
      <ReviewsSection />
      <SessionArchive />

      {/* ⑩ ~ ⑪ : 후속 Task 에서 채움 */}
      <section data-section="faq" />
      <section data-section="final-cta" />
    </div>
  );
};
