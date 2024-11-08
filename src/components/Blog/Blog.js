import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';
import SEO from '../shared/SEO';
import { loadAllContent } from '../../utils/contentLoader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const Blog = ({ initialSlug }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await loadAllContent('blog');
        setPosts(postsData);

        // If initialSlug is provided, open that post
        if (initialSlug) {
          const post = postsData.find(p => p.slug === initialSlug);
          if (post) {
            setSelectedPost(post);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [initialSlug]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/blog/${post.slug}`, { replace: true });
  };

  const handleModalClose = () => {
    setSelectedPost(null);
    navigate('/', { replace: true });
  };

  // Get all unique tags from posts for SEO
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  return (
    <>
      <SEO
        title="Blog Posts"
        description="Technical articles on security, DevSecOps, automation, and software development. Featuring in-depth guides and best practices."
        type="website"
        tags={allTags}
      />

      <section id="blog" className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Blog Posts
          </motion.h2>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px] text-destructive">
              Error loading blog posts: {error}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
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
          )}

          <BlogModal
            isOpen={selectedPost !== null}
            onClose={handleModalClose}
            post={selectedPost}
          />
        </div>
      </section>
    </>
  );
};

export default Blog;
