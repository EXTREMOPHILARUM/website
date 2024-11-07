import React, { useState } from 'react';
import ContentList from '../ContentList';
import WorkModal from './WorkModal';
import { loadWork } from '../../utils/contentLoader';
import './WorkExperience.css';

const WorkExperience = ({ workExperience }) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleWorkClick = async (slug) => {
    try {
      const workContent = await loadWork(slug);
      setSelectedWork(workContent);
      setModalOpen(true);
    } catch (err) {
      console.error('Error loading work experience:', err);
    }
  };

  return (
    <section className="work-experience-section">
      <ContentList 
        type="Work" 
        items={workExperience} 
        onItemClick={handleWorkClick}
      />

      <WorkModal 
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedWork(null);
        }}
        work={selectedWork}
      />
    </section>
  );
};

export default WorkExperience;
