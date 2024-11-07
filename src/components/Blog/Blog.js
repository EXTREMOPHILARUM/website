import React from 'react';
import BlogCard from './BlogCard';
import useAnimatedList from '../../hooks/useAnimatedList';
import '../shared/animations.css';
import './Blog.css';

const Blog = ({ blogPosts, onItemClick }) => {
  const { listRef, titleRef } = useAnimatedList();

  return (
    <div className="content-list">
      <h2 ref={titleRef}>Latest Articles</h2>
      <div ref={listRef} className="content-grid blog-grid">
        {blogPosts.map((item) => (
          <div key={item.slug} className="grid-item">
            <BlogCard 
              item={item}
              onItemClick={onItemClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
