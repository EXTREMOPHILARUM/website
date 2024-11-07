import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="App-footer">
      <p>© {new Date().getFullYear()} Saurabh Nandedkar. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
