import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const BlogCard = ({ item: post, onItemClick, index }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow h-full"
        onClick={() => onItemClick && onItemClick(post)}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
          {post.date && (
            <p className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {post.description && (
            <p className="text-sm text-muted-foreground mb-4">
              {post.description}
            </p>
          )}
          {post.tags && (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {post.tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${post.slug}-tag-${tagIndex}`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 }
                  }}
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
