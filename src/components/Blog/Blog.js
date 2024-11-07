import React, { useState, useEffect } from 'react';
import BlogGridItem from './BlogGridItem';
import BlogModal from './BlogModal';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { loadAllContent } from '../../utils/contentLoader';
import '../shared/animations.css';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [titleRef, isTitleVisible] = useIntersectionObserver();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogData = await loadAllContent('blog');
        setPosts(blogData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  if (loading) return <div>Loading blog posts...</div>;
  if (error) return <div>Error loading blog posts: {error}</div>;

  return (
    <section className="blog-section">
      <h2 ref={titleRef} className={`section-title initially-hidden ${isTitleVisible ? 'visible' : ''}`}>
        Latest Articles
      </h2>
      <div className="content-grid blog-grid">
        {posts.map((item, index) => (
          <BlogGridItem
            key={item.slug}
            item={item}
            index={index}
            onItemClick={() => handlePostClick(item)}
          />
        ))}
      </div>

      <BlogModal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </section>
  );
};

export default Blog;
