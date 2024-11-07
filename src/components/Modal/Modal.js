import React from 'react';
import MarkdownContent from '../MarkdownContent';
import './Modal.css';

const Modal = ({ isOpen, onClose, content, title, date }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          {date && <div className="modal-date">{date}</div>}
        </div>
        <div className="modal-body">
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
