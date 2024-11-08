import React from 'react';
import BlogCard from './BlogCard';

const BlogGridItem = ({ item, index, onItemClick }) => {
  return (
    <div className="grid-item">
      <BlogCard 
        item={item}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default BlogGridItem;
