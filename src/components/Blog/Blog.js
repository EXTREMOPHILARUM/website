import React, { useState } from 'react';
import ContentList from '../ContentList';
import BlogModal from './BlogModal';
import { loadBlogPost } from '../../utils/contentLoader';
import './Blog.css';

const Blog = ({ blogPosts }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBlogClick = async (slug) => {
    try {
      const blogContent = await loadBlogPost(slug);
      setSelectedBlog(blogContent);
      setModalOpen(true);
    } catch (err) {
      console.error('Error loading blog post:', err);
    }
  };

  return (
    <section className="blog-section">
      <ContentList 
        type="Blog" 
        items={blogPosts} 
        onItemClick={handleBlogClick}
      />

      <BlogModal 
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />
    </section>
  );
};

export default Blog;
