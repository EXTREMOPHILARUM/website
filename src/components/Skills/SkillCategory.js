import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../shared/animations.css';

const SkillCategory = ({ category, index }) => {
  const [itemRef, isItemVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div 
      ref={itemRef}
      className={`skill-category initially-hidden ${isItemVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h3>{category.title}</h3>
      <ul>
        {category.skills.map((skill, skillIndex) => (
          <li key={skillIndex}>
            <span className="skill-icon">{skill.icon}</span>
            <span className="skill-name">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCategory;
