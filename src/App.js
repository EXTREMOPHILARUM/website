import React from 'react';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Skills />
          <Projects />
          <WorkExperience />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
