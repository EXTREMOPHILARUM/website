import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2>Get in Touch</h2>
      <div className="contact-content">
        <p>
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        <div className="contact-links">
          <a href="https://github.com/EXTREMOPHILARUM" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/extremophilarum" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:me@saurabhn.com">Email</a>
          <a href="tel:+919892356631">Phone</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
