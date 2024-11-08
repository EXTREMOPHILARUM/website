import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="App-footer">
      <p>© {new Date().getFullYear()} Saurabh Nandedkar. All rights reserved.</p>
      <p>This site is open source. You can use it as a template on <a href="https://github.com/EXTREMOPHILARUM/website" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    </footer>
  );
};

export default Footer;
