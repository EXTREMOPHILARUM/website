import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiAmazon, SiGooglecloud, SiMicrosoftazure, SiKubernetes, 
  SiTerraform, SiJenkins, SiPython, SiJavascript, 
  SiReact, SiNodedotjs, SiGo, SiPostman
} from 'react-icons/si';
import { BiShield, BiLock, BiBug, BiCodeAlt, BiServer, BiGitBranch } from 'react-icons/bi';
import SkillCategory from './SkillCategory';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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
    <section id="skills" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tight mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
