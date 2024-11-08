import React from 'react';
import { motion } from 'framer-motion';
import MarkdownContent from '../MarkdownContent';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const BlogModal = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
          <div className="flex flex-col space-y-2">
            {post.date && (
              <p className="text-sm text-muted-foreground">{post.date}</p>
            )}
            {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
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
          <MarkdownContent content={post.content} />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
