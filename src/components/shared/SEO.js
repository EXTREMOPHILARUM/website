import { useEffect } from 'react';

const SEO = ({ 
  title,
  description,
  type = 'article',
  image,
  author,
  date,
  tags,
  isReset = false
}) => {
  useEffect(() => {
    // Update meta tags
    if (isReset) {
      // Reset to default values
      document.title = 'Saurabh Nandedkar - Full-Stack Engineer & Tech Polymath';
      updateMetaTag('description', 'Professional portfolio and technical blog by Saurabh Nandedkar. Expertise in cloud architecture, AI systems, distributed computing, and full-stack development.');
      updateMetaTag('og:title', 'Saurabh Nandedkar - Full-Stack Engineer & Tech Polymath');
      updateMetaTag('og:description', 'Professional portfolio showcasing expertise in cloud architecture, AI systems, distributed computing, and full-stack development.');
      updateMetaTag('og:type', 'website');
      updateMetaTag('twitter:title', 'Saurabh Nandedkar - Full-Stack Engineer & Tech Polymath');
      updateMetaTag('twitter:description', 'Professional portfolio showcasing expertise in cloud architecture, AI systems, distributed computing, and full-stack development.');
      return;
    }

    // Update with provided values
    if (title) {
      document.title = `${title} | Saurabh Nandedkar`;
      updateMetaTag('og:title', title);
      updateMetaTag('twitter:title', title);
    }

    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description);
      updateMetaTag('twitter:description', description);
    }

    if (type) {
      updateMetaTag('og:type', type);
    }

    if (image) {
      updateMetaTag('og:image', image);
      updateMetaTag('twitter:image', image);
    }

    if (author) {
      updateMetaTag('author', author);
    }

    if (tags) {
      updateMetaTag('keywords', tags.join(', '));
    }

    if (date) {
      updateMetaTag('article:published_time', date);
    }

    // Update structured data
    if (type === 'article' && title) {
      const articleStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        author: {
          '@type': 'Person',
          name: author || 'Saurabh Nandedkar'
        },
        datePublished: date,
        keywords: tags?.join(', '),
        publisher: {
          '@type': 'Person',
          name: 'Saurabh Nandedkar',
          url: 'https://saurabhn.com'
        }
      };

      updateStructuredData(articleStructuredData);
    }

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      if (!isReset) {
        resetMetaTags();
      }
    };
  }, [title, description, type, image, author, date, tags, isReset]);

  return null; // This component doesn't render anything
};

// Helper functions
const updateMetaTag = (name, content) => {
  if (!content) return;

  // Handle both name and property meta tags
  let element = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const updateStructuredData = (data) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

const resetMetaTags = () => {
  // Reset to default values by rendering SEO component with isReset=true
  const seo = document.createElement('div');
  document.body.appendChild(seo);
  const cleanup = () => seo.remove();
  
  // Use React to render the reset SEO component
  const React = require('react');
  const ReactDOM = require('react-dom');
  ReactDOM.render(<SEO isReset={true} />, seo);
  
  // Cleanup after reset
  setTimeout(cleanup, 0);
};

export default SEO;
