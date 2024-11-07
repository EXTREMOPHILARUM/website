import React from 'react';
import MarkdownContent from '../MarkdownContent';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content project-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="project-modal-header">
          <h2 className="project-modal-title">{project.title}</h2>
          <div className="project-modal-date">{project.date}</div>
          <div className="project-modal-tags">
            {project.tags && project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="project-modal-body">
          <MarkdownContent content={project.content} />
        </div>
        {project.links && (
          <div className="project-modal-links">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
