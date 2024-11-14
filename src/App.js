import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load components
const Hero = lazy(() => import('./components/Hero/Hero'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const WorkExperience = lazy(() => import('./components/WorkExperience/WorkExperience'));
const Blog = lazy(() => import('./components/Blog/Blog'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Pricing = lazy(() => import('./components/Pricing/Pricing'));

function App() {
  const { slug } = useParams();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<Loading />}>
            <Hero />
            <Skills />
            <Projects />
            <Pricing />
            <WorkExperience />
            <Blog initialSlug={slug} />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
