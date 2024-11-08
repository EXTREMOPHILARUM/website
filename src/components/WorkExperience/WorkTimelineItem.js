import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardContent } from '../ui/card';

const getItemVariants = (isEven) => ({
  hidden: { 
    opacity: 0, 
    x: isEven ? -50 : 50,
    y: 20
  },
  show: { 
    opacity: 1, 
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren"
    }
  }
});

const dotVariants = {
  hidden: { 
    scale: 0,
    opacity: 0 
  },
  show: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const tagContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const WorkTimelineItem = ({ item: workItem, onItemClick }) => {
  const isEven = workItem.index % 2 === 0;

  return (
    <motion.div
      variants={getItemVariants(isEven)}
      className="relative mb-8 md:mb-0 md:grid md:grid-cols-[1fr,auto,1fr] md:gap-8 md:items-center"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Timeline dot */}
      <motion.div 
        className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        variants={dotVariants}
      >
        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
      </motion.div>

      {/* Content card */}
      <Card 
        className={`cursor-pointer hover:shadow-lg transition-shadow ${isEven ? 'md:col-start-1' : 'md:col-start-3'}`}
        onClick={() => onItemClick && onItemClick(workItem)}
      >
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">{workItem.position}</h3>
            <p className="text-base font-medium">{workItem.company}</p>
            <p className="text-sm text-muted-foreground">{workItem.location}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(workItem.startDate)} - {workItem.endDate ? formatDate(workItem.endDate) : 'Present'}
            </p>
          </div>
          
          {workItem.tags && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-4"
              variants={tagContainer}
            >
              {workItem.tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${workItem.slug}-tag-${tagIndex}`}
                  variants={tagItem}
                  className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorkTimelineItem;
