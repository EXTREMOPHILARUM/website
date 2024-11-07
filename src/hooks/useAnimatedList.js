import { useEffect, useRef } from 'react';

const useAnimatedList = () => {
  const listRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe title
    if (titleRef.current) {
      titleRef.current.classList.add('initially-hidden');
      observer.observe(titleRef.current);
    }

    // Observe grid items or timeline items
    const elements = listRef.current?.querySelectorAll('.grid-item, .timeline-item');
    elements?.forEach((element, index) => {
      element.classList.add('initially-hidden');
      // Add a small delay to each item for a staggered effect
      element.style.animationDelay = `${index * 0.1}s`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return { listRef, titleRef };
};

export default useAnimatedList;
