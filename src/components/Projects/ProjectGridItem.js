import React from 'react';
import ProjectCard from './ProjectCard';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../shared/animations.css';

const ProjectGridItem = ({ item, index, onItemClick }) => {
  const [itemRef, isItemVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div 
      ref={itemRef}
      className={`grid-item initially-hidden ${isItemVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <ProjectCard 
        item={item}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default ProjectGridItem;
