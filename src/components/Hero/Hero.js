import React from 'react';
import './Hero.css';
import { useTheme } from '../../contexts/ThemeContext';
import HighlightCard from './HighlightCard';

const Hero = () => {
  const { theme, toggleTheme } = useTheme();

  const highlights = [
    { number: '5+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Delivered' },
    { number: '3+', label: 'Cloud Platforms' }
  ];

  return (
    <section className="hero-section">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-text">
            <h1 className="hero-title">Hi, I'm Saurabh <span className="wave">👋</span></h1>
            <h2 className="hero-subtitle">Software Engineer & Cloud Architect</h2>
            <p className="hero-description">
              I'm a passionate software engineer specializing in building secure, scalable systems 
              and infrastructure. With expertise in cloud architecture, DevSecOps, and distributed systems,
              I help organizations build robust and efficient solutions.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="cta-button">View My Work</a>
              <a href="#contact" className="cta-button secondary">Get in Touch</a>
            </div>
          </div>
        </div>

        <div className="hero-highlights">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              highlight={highlight}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
