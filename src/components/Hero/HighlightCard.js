import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../shared/animations.css';

const HighlightCard = ({ highlight, index }) => {
  const [itemRef, isItemVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div 
      ref={itemRef}
      className={`highlight-card initially-hidden ${isItemVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="highlight-number">{highlight.number}</span>
      <span className="highlight-label">{highlight.label}</span>
    </div>
  );
};

export default HighlightCard;
