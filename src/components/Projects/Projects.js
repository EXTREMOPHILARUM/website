import React, { useState, useEffect } from 'react';
import ProjectGridItem from './ProjectGridItem';
import ProjectModal from './ProjectModal';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { loadAllContent } from '../../utils/contentLoader';
import '../shared/animations.css';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [titleRef, isTitleVisible] = useIntersectionObserver();

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
    <section id="projects" className="projects-section">
      <h2 ref={titleRef} className={`section-title initially-hidden ${isTitleVisible ? 'visible' : ''}`}>
        Featured Projects
      </h2>
      <div className="content-grid projects-grid">
        {projects.map((item, index) => (
          <ProjectGridItem
            key={item.slug}
            item={item}
            index={index}
            onItemClick={() => handleProjectClick(item)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
