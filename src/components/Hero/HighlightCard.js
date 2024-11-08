import React from 'react';

const HighlightCard = ({ highlight, index }) => {
  return (
    <div className="highlight-card">
      <span className="highlight-number">{highlight.number}</span>
      <span className="highlight-label">{highlight.label}</span>
    </div>
  );
};

export default HighlightCard;
