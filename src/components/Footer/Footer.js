import React from 'react';
import './Footer.css';
import '../shared/animations.css';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Footer = () => {
  const [footerRef, isFooterVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <footer className={`App-footer initially-hidden ${isFooterVisible ? 'visible' : ''}`} ref={footerRef}>
      <p>© {new Date().getFullYear()} Saurabh Nandedkar. All rights reserved.</p>
      <p>This site is open source. You can use it as a template on <a href="https://github.com/EXTREMOPHILARUM/website" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    </footer>
  );
};

export default Footer;
