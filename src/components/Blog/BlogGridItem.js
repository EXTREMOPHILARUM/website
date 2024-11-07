import React from 'react';
import BlogCard from './BlogCard';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../shared/animations.css';

const BlogGridItem = ({ item, index, onItemClick }) => {
  const [itemRef, isItemVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div 
      ref={itemRef}
      className={`grid-item initially-hidden ${isItemVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <BlogCard 
        item={item}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default BlogGridItem;
