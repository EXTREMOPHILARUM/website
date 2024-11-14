import React from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const WorkModal = ({ isOpen, onClose, work }) => {
  if (!work) return null;

  const formatDate = (date) => {
    if (!date || date === 'Present') return 'Present';
    const [year, month] = date.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let duration = '';
    if (years > 0) duration += `${years} year${years > 1 ? 's' : ''}`;
    if (remainingMonths > 0) {
      if (duration) duration += ' ';
      duration += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
    return duration;
  };

  const bulletPoints = work.content
    .split('\n')
    .filter(point => point.trim())
    .map(point => point.trim().replace(/^[•-]\s*/, ''));

  const { position, company, location, type, startDate, endDate, tags, overview, technologies } = work;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{position}</DialogTitle>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">{company}</h3>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{location}</span>
                  {type && <span>· {type}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    {formatDate(startDate)} - {formatDate(endDate)}
                  </span>
                  <span>
                    ({getDuration(startDate, endDate || 'Present')})
                  </span>
                </div>
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </DialogHeader>

        <motion.div
          className="space-y-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {overview && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="text-sm text-muted-foreground">{overview}</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Key Responsibilities & Achievements</h3>
            <ul className="space-y-2">
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-sm text-muted-foreground flex items-start"
                >
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {technologies && technologies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkModal;
