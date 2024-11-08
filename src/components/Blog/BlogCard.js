import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const item = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.1
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

const BlogCard = ({ item: post, onItemClick, index }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow h-full"
        onClick={() => onItemClick && onItemClick(post)}
      >
        <CardHeader className="pb-3">
          <motion.div variants={contentVariants}>
            <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
            {post.date && (
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </p>
            )}
          </motion.div>
        </CardHeader>
        <CardContent>
          {post.description && (
            <motion.p 
              variants={contentVariants}
              className="text-sm text-muted-foreground mb-4"
            >
              {post.description}
            </motion.p>
          )}
          {post.tags && (
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={tagContainer}
            >
              {post.tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${post.slug}-tag-${tagIndex}`}
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

export default BlogCard;
