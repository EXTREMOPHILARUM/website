import React from 'react';
import './Footer.css';
import '../shared/animations.css';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Footer = () => {
  const footerRef = useIntersectionObserver({ threshold: 0.5 });

  return (
    <footer className="App-footer initially-hidden" ref={footerRef}>
      <p>© {new Date().getFullYear()} Saurabh Nandedkar. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
