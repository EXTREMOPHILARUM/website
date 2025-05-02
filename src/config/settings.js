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
    'multi-cloud-trading-architecture',
    'trading-news-chatbot'
  ],
  [CONTENT_TYPES.PROJECTS]: [
    'confidential-trading-platform',
    'flipkart-health-plus',
    'password-manager',
    'ai-trading-rag-chatbot',
    'tax-helper-rag-system',
    'semiconductor-manufacturing-llm',
    'educational-local-llm-system'
  ],
  [CONTENT_TYPES.WORK]: [
    'Turing',
    'Safe',
    'Prismberry',
    'Freelance'
  ]
};

// Pricing data
export const PRICING_DATA = [
  // {
  //   title: "Basic Consultation",
  //   price: "$100/hr",
  //   features: [
  //     "Technical architecture review",
  //     "Code review",
  //     "Best practices guidance",
  //     "1-on-1 consultation"
  //   ],
  //   emailSubject: "Basic Consultation Inquiry",
  //   emailBody: "Hi Saurabh, I'm interested in the Basic Consultation service. Please let me know your availability for a discussion."
  // },
  {
    title: "Project Development",
    price: "Custom",
    features: [
      "Full-stack development",
      "Cloud infrastructure setup",
      "CI/CD implementation",
      "Technical documentation"
    ],
    emailSubject: "Project Development Inquiry",
    emailBody: "Hi Saurabh, I'm interested in the Project Development service. I'd like to discuss my project requirements with you."
  },
  {
    title: "Enterprise Solutions",
    price: "Contact",
    features: [
      "Scalable architecture design",
      "High-availability systems",
      "Security implementation",
      "24/7 support available"
    ],
    emailSubject: "Enterprise Solutions Inquiry",
    emailBody: "Hi Saurabh, I'm interested in the Enterprise Solutions service. I'd like to discuss how we can implement this for our organization."
  }
];

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
