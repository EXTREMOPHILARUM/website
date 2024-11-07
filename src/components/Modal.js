import React from 'react';
import MarkdownContent from './MarkdownContent';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
