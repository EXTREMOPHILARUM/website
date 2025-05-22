import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

// Lazy load motion component
const MotionDiv = lazy(() => 
  import('framer-motion').then(mod => {
    const { motion } = mod;
    return { default: motion.div };
  })
);

const MotionH2 = lazy(() => 
  import('framer-motion').then(mod => {
    const { motion } = mod;
    return { default: motion.h2 };
  })
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await loadAllContent('blog');
        const sortedPosts = postsData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setPosts(sortedPosts);

        if (slug) {
          const post = sortedPosts.find(p => p.slug === slug);
          if (post) {
            setSelectedPost(post);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [slug]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/blog/${post.slug}`, { replace: true });
  };

  const handleModalClose = () => {
    setSelectedPost(null);
    navigate('/', { replace: true });
  };

  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  const Title = () => (
    <Suspense fallback={<h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Blog Posts</h2>}>
      <MotionH2 
        className="text-3xl font-bold tracking-tight mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Blog Posts
      </MotionH2>
    </Suspense>
  );

  const PostsGrid = () => (
    <Suspense fallback={
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((item) => (
          <BlogCard
            key={item.slug}
            item={item}
            onItemClick={() => handlePostClick(item)}
          />
        ))}
      </div>
    }>
      <MotionDiv 
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
      </MotionDiv>
    </Suspense>
  );

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
          <Title />

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px] text-destructive">
              Error loading blog posts: {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
              <p className="text-xl mb-4">No blog posts found</p>
              <p className="text-sm max-w-md text-center">Blog posts will appear here when added to the content/blog directory</p>
            </div>
          ) : (
            <PostsGrid />
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
