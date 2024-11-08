import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGridItem = ({ item, index, onItemClick }) => {
  return (
    <div className="grid-item">
      <ProjectCard 
        item={item}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default ProjectGridItem;
