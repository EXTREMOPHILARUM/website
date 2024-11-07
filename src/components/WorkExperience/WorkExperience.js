import React, { useState, useEffect } from 'react';
import WorkTimelineItem from './WorkTimelineItem';
import WorkModal from './WorkModal';
import useAnimatedList from '../../hooks/useAnimatedList';
import { loadAllContent } from '../../utils/contentLoader';
import '../shared/animations.css';
import './WorkExperience.css';

const WorkExperience = () => {
  const { listRef, titleRef } = useAnimatedList();
  const [workExperience, setWorkExperience] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="content-list">
      <h2 ref={titleRef}>Work Experience</h2>
      <div ref={listRef} className="timeline">
        {workExperience.map((item) => (
          <WorkTimelineItem
            key={item.slug}
            item={item}
            onItemClick={() => handleWorkClick(item)}
          />
        ))}
      </div>

      <WorkModal
        isOpen={selectedWork !== null}
        onClose={() => setSelectedWork(null)}
        work={selectedWork}
      />
    </div>
  );
};

export default WorkExperience;
