import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import useAnimatedList from '../../hooks/useAnimatedList';
import { loadAllContent } from '../../utils/contentLoader';
import '../shared/animations.css';
import './Projects.css';

const Projects = () => {
  const { listRef, titleRef } = useAnimatedList();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await loadAllContent('projects');
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error}</div>;

  return (
    <div className="content-list">
      <h2 ref={titleRef}>Featured Projects</h2>
      <div ref={listRef} className="content-grid projects-grid">
        {projects.map((item) => (
          <div key={item.slug} className="grid-item">
            <ProjectCard 
              item={item}
              onItemClick={() => handleProjectClick(item)}
            />
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
};

export default Projects;
