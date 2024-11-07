import React, { useState } from 'react';
import ContentList from '../ContentList';
import ProjectModal from './ProjectModal';
import { loadProject } from '../../utils/contentLoader';
import './Projects.css';

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = async (slug) => {
    try {
      const projectContent = await loadProject(slug);
      setSelectedProject(projectContent);
      setModalOpen(true);
    } catch (err) {
      console.error('Error loading project:', err);
    }
  };

  return (
    <section id="projects" className="projects-section">
      <ContentList 
        type="Projects" 
        items={projects} 
        onItemClick={handleProjectClick}
      />

      <ProjectModal 
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
