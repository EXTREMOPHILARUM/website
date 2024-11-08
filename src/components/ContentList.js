import React from 'react';
import WorkTimelineItem from './WorkExperience/WorkTimelineItem';
import ProjectCard from './Projects/ProjectCard';
import BlogCard from './Blog/BlogCard';

const ContentList = ({ type, items, onItemClick }) => {
  const sectionTitles = {
    'Blog': 'Latest Articles',
    'Projects': 'Featured Projects',
    'Work': 'Work Experience'
  };

  const renderWorkTimeline = (items) => (
    <div className="timeline">
      {items.map((item) => (
        <WorkTimelineItem 
          key={item.slug}
          item={item}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );

  const renderProjectGrid = (items) => (
    <div className="content-grid projects-grid">
      {items.map((item) => (
        <div key={item.slug} className="grid-item">
          <ProjectCard 
            item={item}
            onItemClick={onItemClick}
          />
        </div>
      ))}
    </div>
  );

  const renderBlogGrid = (items) => (
    <div className="content-grid blog-grid">
      {items.map((item) => (
        <div key={item.slug} className="grid-item">
          <BlogCard 
            item={item}
            onItemClick={onItemClick}
          />
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch(type) {
      case 'Work':
        return renderWorkTimeline(items);
      case 'Projects':
        return renderProjectGrid(items);
      case 'Blog':
        return renderBlogGrid(items);
      default:
        return null;
    }
  };

  return (
    <div className="content-list">
      <h2 className="section-title">{sectionTitles[type] || type}</h2>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentList;
