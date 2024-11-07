import React from 'react';

const ContentList = ({ type, items, onItemClick }) => {
  const sectionTitles = {
    'Blog': 'Latest Articles',
    'Projects': 'Featured Projects',
    'Work': 'Work Experience'
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderWorkTimeline = (items) => (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.slug} className="timeline-item" onClick={() => onItemClick && onItemClick(item.slug)}>
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
      ))}
    </div>
  );

  const renderProjectCard = (item) => (
    <div 
      className="content-card project no-image"
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

  const renderBlogCard = (item) => (
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

  const renderContent = () => {
    switch(type) {
      case 'Work':
        return renderWorkTimeline(items);
      case 'Projects':
        return (
          <div className={`content-grid ${type.toLowerCase()}-grid`}>
            {items.map((item) => (
              <div key={item.slug} className="grid-item">
                {renderProjectCard(item)}
              </div>
            ))}
          </div>
        );
      case 'Blog':
        return (
          <div className={`content-grid ${type.toLowerCase()}-grid`}>
            {items.map((item) => (
              <div key={item.slug} className="grid-item">
                {renderBlogCard(item)}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="content-list">
      <h2>{sectionTitles[type] || type}</h2>
      {renderContent()}
    </div>
  );
};

export default ContentList;
