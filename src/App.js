import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import { loadAllContent } from './utils/contentLoader';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllContents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [blogs, projs, work] = await Promise.all([
          loadAllContent('blog'),
          loadAllContent('projects'),
          loadAllContent('work')
        ]);
        
        setBlogPosts(blogs);
        setProjects(projs);
        setWorkExperience(work);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllContents();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <Loading />
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider>
        <div className="error">
          <h2>Error Loading Content</h2>
          <p>{error}</p>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="App">
        <main>
          <Hero />
          <Skills />
          <Projects projects={projects} />
          <WorkExperience workExperience={workExperience} />
          <Blog blogPosts={blogPosts} />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
