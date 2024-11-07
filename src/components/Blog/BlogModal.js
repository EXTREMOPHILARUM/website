import React from 'react';
import MarkdownContent from '../MarkdownContent';
import './BlogModal.css';

const BlogModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content blog-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="blog-modal-header">
          <h2 className="blog-modal-title">{post.title}</h2>
          <div className="blog-modal-date">{post.date}</div>
          <div className="blog-modal-tags">
            {post.tags && post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="blog-modal-body">
          <MarkdownContent content={post.content} />
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
