import React from 'react';
import WorkTimelineItem from './WorkTimelineItem';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../shared/animations.css';

const WorkTimelineItemWrapper = ({ item, index, onItemClick }) => {
  const [itemRef, isItemVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div 
      ref={itemRef}
      className={`timeline-item initially-hidden ${isItemVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <WorkTimelineItem
        item={item}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default WorkTimelineItemWrapper;
