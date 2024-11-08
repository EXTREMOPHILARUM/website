import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProjectGridItem = ({ item: projectItem, onItemClick }) => {
  return (
    <motion.div
      variants={item}
      className="grid-item"
    >
      <ProjectCard 
        item={projectItem}
        onItemClick={onItemClick}
      />
    </motion.div>
  );
};

export default ProjectGridItem;
