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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm Saurabh{' '}
              <motion.span
                className="inline-block waving-hand"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              >
                👋
              </motion.span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
              Full-Stack Engineer & Tech Polymath
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              I'm a versatile engineer crafting solutions across cloud architecture, AI systems, 
              distributed computing, and full-stack development. From building secure trading platforms 
              to implementing AI-powered applications, I thrive on mastering diverse technologies 
              to solve complex challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-base"
              >
                <a href="#projects">View My Work</a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="text-base"
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
