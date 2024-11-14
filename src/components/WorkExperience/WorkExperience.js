import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WorkTimelineItem from './WorkTimelineItem';
import WorkModal from './WorkModal';
import { loadAllContent } from '../../utils/contentLoader';
import { Button } from '../ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const lineVariant = {
  hidden: { scaleY: 0, originY: 0 },
  show: { 
    scaleY: 1,
    transition: {
      duration: 1,
      ease: "easeOut"
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
        <div className="flex items-center justify-center gap-4 mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Work Experience
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/Resume.pdf', '_blank')}
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"
            variants={lineVariant}
          />
          
          <div className="space-y-8">
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
