import React from 'react';

const SkillCategory = ({ category, index }) => {
  return (
    <div className="skill-category">
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
