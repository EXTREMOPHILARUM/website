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

### Key Files

- `src/routes.js` - Route table; unknown and retired URLs redirect to `/`
- `src/pages/` - Homepage and project detail page
- `src/content/site.js` - All copy and project data (see [CONTENT.md](CONTENT.md))

### Component Guidelines

- Use functional components with hooks
- Keep components focused and single-responsibility

## Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Create production build. With `CI=true` (set by most CI hosts), lint warnings fail the build.

## Styling

- Uses Tailwind CSS for styling
- Colour and radius tokens are CSS variables in `src/index.css`; fonts and extra colours are in `tailwind.config.js`
