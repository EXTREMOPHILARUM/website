import React from 'react';
import { formatDate } from '../../utils/dateUtils';

const BlogCard = ({ item, onItemClick }) => {
  return (
    <div 
      className="content-card blog no-image"
      onClick={() => onItemClick && onItemClick(item.slug)}
    >
      <div className="card-content">
        <h3>{item.title}</h3>
        {item.date && (
          <p className="card-date">
            {formatDate(item.date)}
          </p>
        )}
        {item.description && (
          <p className="card-description">{item.description}</p>
        )}
        {item.tags && (
          <div className="card-tags">
            {item.tags.map((tag, tagIndex) => (
              <span key={`${item.slug}-tag-${tagIndex}`} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
