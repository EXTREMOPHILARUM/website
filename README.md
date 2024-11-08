# Personal Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring a dark/light theme, animated components, and markdown-based content management.

## Features

- 🎨 Dark/Light Theme Support
- 📱 Fully Responsive Design
- ✨ Smooth Animations with Framer Motion
- 📝 Blog Section with Markdown Support
- 💼 Work Experience Timeline
- 🚀 Projects Showcase
- 💪 Skills Section
- 📬 Contact Form
- 🔄 Dynamic Content Loading

## Tech Stack

- React.js
- Tailwind CSS
- Framer Motion
- React Router
- Radix UI Components
- Gray Matter & Remark for Markdown
- Context API for State Management

## Documentation

- [Development Guide](docs/DEVELOPMENT.md) - Setup and development workflow
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute to the project
- [Content Management](docs/CONTENT.md) - How to manage blog posts, projects, and work experience

## Project Structure

```
src/
├── components/         # React components
│   ├── Blog/          # Blog components
│   ├── Contact/       # Contact form
│   ├── Footer/        # Footer component
│   ├── Hero/          # Hero section
│   ├── Loading/       # Loading states
│   ├── Modal/         # Reusable modal
│   ├── Projects/      # Projects section
│   ├── Skills/        # Skills showcase
│   ├── WorkExperience/# Work history
│   ├── shared/        # Shared components
│   └── ui/            # UI components
├── config/            # Configuration files
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── lib/              # Utility libraries
├── utils/            # Utility functions
└── public/
    └── content/      # Markdown content
        ├── blog/     # Blog posts
        ├── projects/ # Project details
        └── work/     # Work experience
```

## Quick Start

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

## License

This project is open source and available under the [MIT License](LICENSE).
