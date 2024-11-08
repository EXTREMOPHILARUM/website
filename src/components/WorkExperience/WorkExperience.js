import React, { useState, useEffect } from 'react';
import WorkTimelineItemWrapper from './WorkTimelineItemWrapper';
import WorkModal from './WorkModal';
import { loadAllContent } from '../../utils/contentLoader';
import './WorkExperience.css';

const WorkExperience = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWork = async () => {
      try {
        setLoading(true);
        const workData = await loadAllContent('work');
        setWorkExperiences(workData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWork();
  }, []);

  const handleWorkClick = (work) => {
    setSelectedWork(work);
  };

  if (loading) return <div>Loading work experience...</div>;
  if (error) return <div>Error loading work experience: {error}</div>;

  return (
    <section id="work" className="work-section">
      <h2 className="section-title">Work Experience</h2>
      <div className="timeline">
        {workExperiences.map((item, index) => (
          <WorkTimelineItemWrapper
            key={item.slug}
            item={item}
            index={index}
            onItemClick={() => handleWorkClick(item)}
          />
        ))}
      </div>

      <WorkModal
        isOpen={selectedWork !== null}
        onClose={() => setSelectedWork(null)}
        work={selectedWork}
      />
    </section>
  );
};

export default WorkExperience;
