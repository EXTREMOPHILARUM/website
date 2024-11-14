import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const ProjectCard = ({ item, onItemClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-[300px]"
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
        onClick={() => onItemClick && onItemClick(item)}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
          {item.date && (
            <p className="text-sm text-muted-foreground">
              {formatDate(item.date)}
            </p>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          {item.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
          )}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <span 
                  key={`${item.slug}-tag-${tagIndex}`} 
                  className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
