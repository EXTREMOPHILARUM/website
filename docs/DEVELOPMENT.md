# Development Guide

## Setup

1. **Prerequisites**
   - Node.js (LTS version)
   - npm

2. **Environment Setup**
   ```bash
   npm install
   npm start
   ```

## Project Structure

### Key Directories

- `src/components/` - React components organized by feature
- `src/contexts/` - React context providers
- `src/utils/` - Helper functions and utilities
- `public/content/` - Markdown content files

### Component Guidelines

- Use functional components with hooks
- Keep components focused and single-responsibility
- Place shared components in `src/components/shared/`
- UI components go in `src/components/ui/`

## Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Create production build

## Styling

- Uses Tailwind CSS for styling
- Custom utilities in `src/lib/utils.js`
- Theme configuration in `tailwind.config.js`

## Content Management

Content is managed through markdown files with frontmatter:

```md
---
title: Title
date: YYYY-MM-DD
---
Content
```

Content is loaded dynamically using the utilities in `src/utils/contentLoader.js`
