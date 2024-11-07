import React, { useEffect, useRef } from 'react';
import WorkTimelineItem from './WorkExperience/WorkTimelineItem';
import ProjectCard from './Projects/ProjectCard';
import BlogCard from './Blog/BlogCard';
import './shared/animations.css';

const ContentList = ({ type, items, onItemClick }) => {
  const listRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe title
    if (titleRef.current) {
      titleRef.current.classList.add('initially-hidden');
      observer.observe(titleRef.current);
    }

    // Observe grid items or timeline items
    const elements = listRef.current?.querySelectorAll('.grid-item, .timeline-item');
    elements?.forEach((element, index) => {
      element.classList.add('initially-hidden');
      // Add a small delay to each item for a staggered effect
      element.style.animationDelay = `${index * 0.1}s`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

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
      <h2 ref={titleRef}>{sectionTitles[type] || type}</h2>
      <div ref={listRef}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentList;
