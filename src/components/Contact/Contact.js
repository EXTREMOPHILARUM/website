import React from 'react';
import './Contact.css';
import '../shared/animations.css';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Contact = () => {
  const titleRef = useIntersectionObserver();
  const contentRef = useIntersectionObserver({ threshold: 0.2 });
  const linksRef = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="contact" className="contact-section">
      <h2 className="initially-hidden" ref={titleRef}>Get in Touch</h2>
      <div className="contact-content">
        <p className="initially-hidden" ref={contentRef}>
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        <div className="contact-links initially-hidden" ref={linksRef}>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:your.email@example.com">Email</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
