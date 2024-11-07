import React from 'react';
import MarkdownContent from '../MarkdownContent';
import './BlogModal.css';

const BlogModal = ({ isOpen, onClose, blog }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content blog-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="blog-modal-header">
          <h2 className="blog-modal-title">{blog.title}</h2>
          <div className="blog-modal-date">{blog.date}</div>
          <div className="blog-modal-tags">
            {blog.tags && blog.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="blog-modal-body">
          <MarkdownContent content={blog.content} />
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
