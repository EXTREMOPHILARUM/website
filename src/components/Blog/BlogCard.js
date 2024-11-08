import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const item = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: 0.1
    }
  }
};

const tagContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const BlogCard = ({ item: post, onItemClick, index }) => {
  const [showCopied, setShowCopied] = useState(false);

  const getShareUrl = useCallback(() => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/blog/${post.slug}`;
  }, [post.slug]);

  const copyToClipboard = useCallback(async () => {
    const shareUrl = getShareUrl();
    await navigator.clipboard.writeText(shareUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }, [getShareUrl]);

  const handleShare = useCallback(async (e) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          await copyToClipboard();
        }
      }
    } else {
      await copyToClipboard();
    }
  }, [post.title, post.description, getShareUrl, copyToClipboard]);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    
    // Remove any existing context menus
    const existingMenu = document.getElementById('context-menu');
    if (existingMenu) {
      document.body.removeChild(existingMenu);
    }
    
    const menu = document.createElement('div');
    menu.id = 'context-menu';
    menu.className = 'fixed bg-popover text-popover-foreground shadow-md rounded-md py-1 z-50';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'w-full px-4 py-2 text-sm text-left hover:bg-secondary transition-colors';
    copyButton.textContent = 'Copy link';
    copyButton.onclick = async () => {
      await copyToClipboard();
      const menuToRemove = document.getElementById('context-menu');
      if (menuToRemove) {
        document.body.removeChild(menuToRemove);
      }
    };
    
    menu.appendChild(copyButton);
    document.body.appendChild(menu);
    
    const handleClickOutside = () => {
      const menuToRemove = document.getElementById('context-menu');
      if (menuToRemove && document.body.contains(menuToRemove)) {
        document.body.removeChild(menuToRemove);
      }
      document.removeEventListener('click', handleClickOutside);
    };
    
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
  }, [copyToClipboard]);

  return (
    <motion.div
      variants={item}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow h-full relative"
        onClick={() => onItemClick && onItemClick(post)}
        onContextMenu={handleContextMenu}
      >
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-secondary-foreground transition-colors relative group"
            aria-label="Share post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {navigator.share ? 'Share post' : 'Copy link'}
            </span>
          </button>
          {showCopied && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
              Link copied!
            </div>
          )}
        </div>
        <CardHeader className="pb-3">
          <motion.div variants={contentVariants}>
            <CardTitle className="text-xl font-bold pr-8">{post.title}</CardTitle>
            {post.date && (
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </p>
            )}
          </motion.div>
        </CardHeader>
        <CardContent>
          {post.description && (
            <motion.p 
              variants={contentVariants}
              className="text-sm text-muted-foreground mb-4"
            >
              {post.description}
            </motion.p>
          )}
          {post.tags && (
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={tagContainer}
            >
              {post.tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${post.slug}-tag-${tagIndex}`}
                  variants={tagItem}
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
