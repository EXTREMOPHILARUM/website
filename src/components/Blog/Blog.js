import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';
import useAnimatedList from '../../hooks/useAnimatedList';
import { loadAllContent } from '../../utils/contentLoader';
import '../shared/animations.css';
import './Blog.css';

const Blog = () => {
  const { listRef, titleRef } = useAnimatedList();
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const blogData = await loadAllContent('blog');
        setBlogPosts(blogData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, []);

  const handleBlogClick = (post) => {
    setSelectedPost(post);
  };

  if (loading) return <div>Loading blog posts...</div>;
  if (error) return <div>Error loading blog posts: {error}</div>;

  return (
    <div className="content-list">
      <h2 ref={titleRef}>Blog Posts</h2>
      <div ref={listRef} className="content-grid blog-grid">
        {blogPosts.map((item) => (
          <div key={item.slug} className="grid-item">
            <BlogCard 
              item={item}
              onItemClick={() => handleBlogClick(item)}
            />
          </div>
        ))}
      </div>

      <BlogModal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </div>
  );
};

export default Blog;
