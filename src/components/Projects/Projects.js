import React from 'react';
import ProjectCard from './ProjectCard';
import useAnimatedList from '../../hooks/useAnimatedList';
import '../shared/animations.css';
import './Projects.css';

const Projects = ({ projects, onItemClick }) => {
  const { listRef, titleRef } = useAnimatedList();

  return (
    <div className="content-list">
      <h2 ref={titleRef}>Featured Projects</h2>
      <div ref={listRef} className="content-grid projects-grid">
        {projects.map((item) => (
          <div key={item.slug} className="grid-item">
            <ProjectCard 
              item={item}
              onItemClick={onItemClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
