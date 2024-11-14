import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectGridItem from './ProjectGridItem';
import ProjectModal from './ProjectModal';
import { loadAllContent } from '../../utils/contentLoader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await loadAllContent('projects');
        // Sort projects by date in descending order (newest first)
        const sortedProjects = projectsData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setProjects(sortedProjects);
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-[400px] text-destructive">
      Error loading projects: {error}
    </div>
  );

  return (
    <section id="projects" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Featured Projects
        </h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {projects.map((item, index) => (
            <ProjectGridItem
              key={item.slug}
              item={item}
              index={index}
              onItemClick={() => handleProjectClick(item)}
            />
          ))}
        </motion.div>

        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;
