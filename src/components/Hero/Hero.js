import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import HighlightCard from './HighlightCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Hero = () => {
  const { theme, toggleTheme } = useTheme();

  const highlights = [
    { number: '5+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Delivered' },
    { number: '8+', label: 'Tech Domains' }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 relative">
      <button 
        className="fixed top-4 right-4 p-2 rounded-full bg-background hover:bg-accent transition-colors"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="text-xl">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
      </button>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4"> {/* Typography should be handled by base h1 style */}
              Hi, I'm Saurabh{' '}
              <motion.span
                className="inline-block waving-hand" // Class for potential specific styling if needed
                animate={{ rotate: [0, 10, -5, 10, 0] }} // Reduced rotation
                transition={{ duration: 1.5, repeat: 1, repeatDelay: 2, ease: "easeInOut" }} // Adjusted transition
              >
                👋
              </motion.span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6"> {/* Typography should be handled by base h2 style, removed text-muted-foreground */}
              Full-Stack Engineer & Tech Polymath
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-8"> {/* Typography should be handled by base p style, removed text-muted-foreground */}
              I'm a versatile engineer crafting solutions across cloud architecture, AI systems, 
              distributed computing, and full-stack development. From building secure trading platforms 
              to implementing AI-powered applications, I thrive on mastering diverse technologies 
              to solve complex challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg" // Retained size
                className="text-base btn-primary" // Ensured btn-primary for correct styling
              >
                <a href="#projects">View My Work</a>
              </Button>
              <Button
                asChild
                variant="secondary" // This will now use the simpler secondary button style
                size="lg" // Retained size
                className="text-base btn-secondary" // Ensured btn-secondary for correct styling
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={index}
                highlight={highlight}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
