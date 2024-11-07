import React from 'react';
import './Skills.css';
import { 
  SiAmazon, SiGooglecloud, SiMicrosoftazure, SiKubernetes, 
  SiTerraform, SiJenkins, SiPython, SiJavascript, 
  SiReact, SiNodedotjs, SiGo, SiPostman
} from 'react-icons/si';
import { BiShield, BiLock, BiBug, BiCodeAlt, BiServer, BiGitBranch } from 'react-icons/bi';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'AWS (EC2, S3, Lambda, ECS)', icon: <SiAmazon /> },
        { name: 'Google Cloud Platform', icon: <SiGooglecloud /> },
        { name: 'Microsoft Azure', icon: <SiMicrosoftazure /> },
        { name: 'Kubernetes & Docker', icon: <SiKubernetes /> },
        { name: 'Terraform & Infrastructure as Code', icon: <SiTerraform /> },
        { name: 'CI/CD Pipelines', icon: <SiJenkins /> }
      ]
    },
    {
      title: 'Security',
      skills: [
        { name: 'DevSecOps Implementation', icon: <BiShield /> },
        { name: 'Cloud Security Posture Management', icon: <BiServer /> },
        { name: 'Vulnerability Assessment', icon: <BiBug /> },
        { name: 'Security Architecture Design', icon: <BiCodeAlt /> },
        { name: 'Identity & Access Management', icon: <BiLock /> },
        { name: 'Security Automation', icon: <BiGitBranch /> }
      ]
    },
    {
      title: 'Development',
      skills: [
        { name: 'Python & Django', icon: <SiPython /> },
        { name: 'JavaScript/TypeScript', icon: <SiJavascript /> },
        { name: 'React & Next.js', icon: <SiReact /> },
        { name: 'Node.js & Express', icon: <SiNodedotjs /> },
        { name: 'Go Programming', icon: <SiGo /> },
        { name: 'RESTful APIs', icon: <SiPostman /> }
      ]
    }
  ];

  return (
    <section className="skills-section">
      <h2 className="section-title">Skills & Expertise</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
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
        ))}
      </div>
    </section>
  );
};

export default Skills;
