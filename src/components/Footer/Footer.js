import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 px-4 mt-16 border-t border-border bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Saurabh Nandedkar. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          This site is open source. You can use it as a template on{' '}
          <a 
            href="https://github.com/EXTREMOPHILARUM/website" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
