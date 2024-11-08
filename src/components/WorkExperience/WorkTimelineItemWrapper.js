import React from 'react';
import WorkTimelineItem from './WorkTimelineItem';

const WorkTimelineItemWrapper = ({ item, index, onItemClick }) => {
  return (
    <div className="timeline-item">
      <WorkTimelineItem
        item={item}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default WorkTimelineItemWrapper;
