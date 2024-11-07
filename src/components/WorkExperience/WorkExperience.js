import React from 'react';
import WorkTimelineItem from './WorkTimelineItem';
import useAnimatedList from '../../hooks/useAnimatedList';
import '../shared/animations.css';
import './WorkExperience.css';

const WorkExperience = ({ workExperience, onItemClick }) => {
  const { listRef, titleRef } = useAnimatedList();

  return (
    <div className="content-list">
      <h2 ref={titleRef}>Work Experience</h2>
      <div ref={listRef} className="timeline">
        {workExperience.map((item) => (
          <WorkTimelineItem 
            key={item.slug}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
