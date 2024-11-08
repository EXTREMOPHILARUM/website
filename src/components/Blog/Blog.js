import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';
import { loadAllContent } from '../../utils/contentLoader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await loadAllContent('blog');
        setPosts(postsData);
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-[400px] text-destructive">
      Error loading blog posts: {error}
    </div>
  );

  return (
    <section id="blog" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tight mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog Posts
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {posts.map((item, index) => (
            <BlogCard
              key={item.slug}
              item={item}
              index={index}
              onItemClick={() => handlePostClick(item)}
            />
          ))}
        </motion.div>

        <BlogModal
          isOpen={selectedPost !== null}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      </div>
    </section>
  );
};

export default Blog;
