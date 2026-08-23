import { useEffect } from 'react';

/**
 * .scroll-reveal 요소를 화면에 들어올 때 나타나게 한다.
 * 페이지 전환으로 요소가 새로 생겨도 관찰되도록 key를 받는다.
 * (key를 넘기지 않으면 마운트 시점의 요소만 관찰된다)
 */
export const useScrollReveal = (key?: unknown) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    };

    // 렌더 직후 DOM이 반영된 뒤 관찰 시작
    observeAll();
    const raf = requestAnimationFrame(observeAll);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [key]);
};
