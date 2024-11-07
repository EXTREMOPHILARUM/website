import { useEffect, useRef, useState } from 'react';
import { ANIMATION_CONFIG } from '../config/settings';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once element is visible, stop observing
          if (ref.current) {
            observer.unobserve(ref.current);
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
