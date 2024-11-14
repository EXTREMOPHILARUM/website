import React, { useState, useCallback, lazy, Suspense } from 'react';
import SEO from '../shared/SEO';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

// Lazy load components
const MarkdownContent = lazy(() => import('../MarkdownContent'));
const MotionSpan = lazy(() => 
  import('framer-motion').then(mod => {
    const { motion } = mod;
    return { default: motion.span };
  })
);

const MotionDiv = lazy(() => 
  import('framer-motion').then(mod => {
    const { motion } = mod;
    return { default: motion.div };
  })
);

const BlogModal = ({ isOpen, onClose, post }) => {
  const [showCopied, setShowCopied] = useState(false);

  const getShareUrl = useCallback(() => {
    if (!post) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/blog/${post.slug}`;
  }, [post]);

  const copyToClipboard = useCallback(async () => {
    if (!post) return;
    const shareUrl = getShareUrl();
    await navigator.clipboard.writeText(shareUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }, [post, getShareUrl]);

  const handleShare = useCallback(async () => {
    if (!post) return;
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
  }, [post, getShareUrl, copyToClipboard]);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    if (!post) return;
    
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
  }, [post, copyToClipboard]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) return null;

  const TagSpan = ({ tag, index }) => (
    <Suspense fallback={
      <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary">
        {tag}
      </span>
    }>
      <MotionSpan
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary"
      >
        {tag}
      </MotionSpan>
    </Suspense>
  );

  return (
    <>
      {isOpen && (
        <SEO
          title={post.title}
          description={post.description}
          type="article"
          author={post.author}
          date={post.date}
          tags={post.tags}
        />
      )}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start" onContextMenu={handleContextMenu}>
              <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-secondary-foreground transition-colors group"
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
            </div>
            <div className="flex flex-col space-y-2">
              {post.author && (
                <p className="text-sm text-muted-foreground">By {post.author}</p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
              )}
              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <TagSpan key={index} tag={tag} index={index} />
                  ))}
                </div>
              )}
              {post.description && (
                <p className="text-sm text-muted-foreground mt-2">{post.description}</p>
              )}
            </div>
          </DialogHeader>

          <Suspense fallback={<div className="prose prose-sm dark:prose-invert max-w-none mt-4">Loading...</div>}>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-sm dark:prose-invert max-w-none mt-4"
            >
              <MarkdownContent content={post.content} />
            </MotionDiv>
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogModal;
