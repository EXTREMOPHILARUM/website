import React from 'react';
import { formatDate } from '../../utils/dateUtils';

const WorkTimelineItem = ({ item, onItemClick }) => {
  return (
    <div className="timeline-item" onClick={() => onItemClick && onItemClick(item)}>
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-header">
          <div className="timeline-details">
            <h3>{item.position}</h3>
            <p className="company-name">{item.company}</p>
            <p className="company-location">{item.location}</p>
            <p className="timeline-date">
              {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
            </p>
          </div>
        </div>
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

export default WorkTimelineItem;
