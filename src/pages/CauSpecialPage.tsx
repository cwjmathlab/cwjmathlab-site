import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CauSpecialHero } from '../components/cau-special/CauSpecialHero';
import { CauAdvantage } from '../components/cau-special/CauAdvantage';
import { CauScopeCompare } from '../components/cau-special/CauScopeCompare';
import { CauCourseCard } from '../components/cau-special/CauCourseCard';
import { CauFaq } from '../components/cau-special/CauFaq';

export const CauSpecialPage: React.FC = () => {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToCourse = () => {
    document.getElementById('cau-course')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in">
      <CauSpecialHero onApply={scrollToCourse} />
      <CauAdvantage />
      <CauScopeCompare />
      <section id="cau-course">
        <CauCourseCard />
      </section>
      <CauFaq />
    </div>
  );
};
