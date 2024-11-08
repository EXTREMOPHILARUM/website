/**
 * Global application settings and configuration values
 */

// Theme settings
export const THEME_CONFIG = {
  STORAGE_KEY: 'theme',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  DEFAULT_MEDIA_QUERY: '(prefers-color-scheme: dark)'
};

// Content types
export const CONTENT_TYPES = {
  BLOG: 'blog',
  PROJECTS: 'projects',
  WORK: 'work'
};

// Content structure mapping
export const CONTENT_STRUCTURE = {
  [CONTENT_TYPES.BLOG]: [
    'automated-security-pipeline',
    'high-availability-email-infrastructure',
    'multi-cloud-trading-architecture'
  ],
  [CONTENT_TYPES.PROJECTS]: [
    'confidential-trading-platform',
    'flipkart-health-plus',
    'password-manager'
  ],
  [CONTENT_TYPES.WORK]: [
    'Turing',
    'Safe',
    'Prismberry',
    'Navy',
    'Afrost'
  ]
};

// Content paths
export const CONTENT_PATHS = {
  BASE: '/content',
  INDEX_FILE: 'index.md'
};

// Default content values
export const DEFAULT_VALUES = {
  WORK: {
    type: 'Full-time',
    overview: '',
    technologies: [],
    achievements: [],
    tags: []
  },
  BLOG: {
    title: '',
    date: '',
    description: '',
    author: 'Saurabh Nandedkar',
    tags: [],
    readTime: '5 min',
    image: '',
    keywords: [],
    canonicalUrl: '',
    lastModified: ''
  },
  PROJECT: {
    title: '',
    description: '',
    technologies: [],
    tags: [],
    github: '',
    demo: '',
    featured: false
  }
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CONTENT_TYPE: 'Invalid content type:',
  CONTENT_NOT_FOUND: 'Content not found:',
  MISSING_CONTENT_TYPE_SLUG: 'Content type and slug are required',
  THEME_CONTEXT_ERROR: 'useTheme must be used within a ThemeProvider'
};
