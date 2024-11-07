import React, { useState, useEffect } from 'react';
import WorkTimelineItem from './WorkTimelineItem';
import WorkModal from './WorkModal';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { loadAllContent } from '../../utils/contentLoader';
import '../shared/animations.css';
import './WorkExperience.css';

const WorkExperience = () => {
  const [workExperience, setWorkExperience] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titleRef, isTitleVisible] = useIntersectionObserver();

  useEffect(() => {
    const loadWork = async () => {
      try {
        setLoading(true);
        const workData = await loadAllContent('work');
        setWorkExperience(workData);
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
    <section className="work-section">
      <h2 ref={titleRef} className={`section-title initially-hidden ${isTitleVisible ? 'visible' : ''}`}>
        Work Experience
      </h2>
      <div className="timeline">
        {workExperience.map((item, index) => (
          <WorkTimelineItem
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
