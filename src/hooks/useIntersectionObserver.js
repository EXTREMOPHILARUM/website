import { useEffect, useRef, useState } from 'react';
import { ANIMATION_CONFIG } from '../config/settings';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // For section titles, we want to keep observing to handle scroll up/down
          if (!entry.target.classList.contains('section-title')) {
            observer.unobserve(ref.current);
          }
        } else {
          // Only reset visibility for section titles
          if (entry.target.classList.contains('section-title')) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: options.threshold || ANIMATION_CONFIG.INTERSECTION_THRESHOLD,
        rootMargin: options.rootMargin || ANIMATION_CONFIG.INTERSECTION_ROOT_MARGIN,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

export default useIntersectionObserver;
