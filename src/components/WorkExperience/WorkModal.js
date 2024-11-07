import React from 'react';
import './WorkModal.css';

const WorkModal = ({ isOpen, onClose, work }) => {
  if (!isOpen || !work) return null;

  const formatDate = (date) => {
    if (date === 'Present') return date;
    const [year, month] = date.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let duration = '';
    if (years > 0) duration += `${years} year${years > 1 ? 's' : ''}`;
    if (remainingMonths > 0) {
      if (duration) duration += ' ';
      duration += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
    return duration;
  };

  // Parse the content into bullet points
  const bulletPoints = work.content
    .split('\n')
    .filter(point => point.trim())
    .map(point => point.trim().replace(/^[•-]\s*/, ''));

  // Get frontmatter data
  const { position, company, location, type, startDate, endDate, tags, overview, technologies } = work;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content work-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="work-modal-header">
          <div className="work-modal-company">
            <div className="company-info">
              <h2 className="work-modal-title">{position}</h2>
              <h3 className="work-modal-company-name">{company}</h3>
              <div className="work-modal-meta">
                <div className="work-modal-location">
                  <span className="meta-label">Location:</span> {location}
                  {type && <span className="work-type">· {type}</span>}
                </div>
                <div className="work-modal-dates">
                  <span className="meta-label">Duration:</span>
                  <span className="date-range">
                    {formatDate(startDate)} - {formatDate(endDate || 'Present')}
                  </span>
                  <span className="duration">
                    ({getDuration(startDate, endDate || 'Present')})
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {tags && tags.length > 0 && (
            <div className="work-modal-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="work-modal-sections">
          {overview && (
            <div className="work-section">
              <h3 className="section-title">Overview</h3>
              <p className="section-content">{overview}</p>
            </div>
          )}

          <div className="work-section">
            <h3 className="section-title">Key Responsibilities & Achievements</h3>
            <div className="section-content">
              <ul className="achievements-list">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="achievement-item">{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {technologies && technologies.length > 0 && (
            <div className="work-section">
              <h3 className="section-title">Technologies Used</h3>
              <div className="technologies-list">
                {technologies.map((tech, index) => (
                  <span key={index} className="technology-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
