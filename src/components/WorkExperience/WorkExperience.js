import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WorkTimelineItem from './WorkTimelineItem';
import WorkModal from './WorkModal';
import { loadAllContent } from '../../utils/contentLoader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-[400px] text-destructive">
      Error loading work experience: {error}
    </div>
  );

  return (
    <section id="work" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Work Experience
        </h2>
        <motion.div 
          className="relative"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
          
          <div className="space-y-12 md:space-y-24">
            {workExperiences.map((item, index) => (
              <WorkTimelineItem
                key={item.slug}
                item={{ ...item, index }}
                onItemClick={() => handleWorkClick(item)}
              />
            ))}
          </div>
        </motion.div>

        <WorkModal
          isOpen={selectedWork !== null}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
        />
      </div>
    </section>
  );
};

export default WorkExperience;
