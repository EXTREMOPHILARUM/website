import React from 'react';
import { motion } from 'framer-motion';
import MarkdownContent from '../MarkdownContent';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <div className="flex flex-col space-y-2">
            {project.date && (
              <p className="text-sm text-muted-foreground">{project.date}</p>
            )}
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
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
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-sm dark:prose-invert max-w-none mt-4"
        >
          <MarkdownContent content={project.content} />
        </motion.div>

        {project.links && (
          <DialogFooter className="mt-6 flex-wrap gap-4">
            {project.links.github && (
              <Button
                variant="outline"
                onClick={() => window.open(project.links.github, '_blank')}
                className="flex-1 sm:flex-none"
              >
                View on GitHub
              </Button>
            )}
            {project.links.demo && (
              <Button
                onClick={() => window.open(project.links.demo, '_blank')}
                className="flex-1 sm:flex-none"
              >
                Live Demo
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
