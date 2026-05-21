import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const SkkuSpecialPage: React.FC = () => {
  useScrollReveal();

  // 페이지 진입 시 항상 최상단부터 (path 변경 후 스크롤 위치 리셋)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* ① Hero */}
      <section data-section="hero" />

      {/* ② 출제범위 박제 */}
      <section data-section="exam-scope" />

      {/* ③ 시험·전형 일정 */}
      <section data-section="key-dates" />

      {/* ④ 경쟁률 반전 */}
      <section data-section="competition" />

      {/* ⑤ 특강 정보 + CTA */}
      <section data-section="course" id="course" />

      {/* ⑥ 강사 동문 */}
      <section data-section="instructor" />

      {/* ⑦ 수업 방식 */}
      <section data-section="approach" />

      {/* ⑧ 후기 */}
      <section data-section="reviews" />

      {/* ⑨ 진행 기록 (조건부) */}
      <section data-section="archive" />

      {/* ⑩ FAQ */}
      <section data-section="faq" />

      {/* ⑪ 최종 CTA */}
      <section data-section="final-cta" />
    </div>
  );
};
