# Personal Portfolio Website

A modern, responsive portfolio website built with React, featuring a dark/light theme, animated components, and markdown-based content management.

## Features

- 🎨 Dark/Light Theme Support
- 📱 Fully Responsive Design
- ✨ Smooth Animations and Transitions
- 📝 Blog Section with Markdown Support
- 💼 Work Experience Timeline
- 🚀 Projects Showcase
- 💪 Skills Section
- 📬 Contact Form
- 🔄 Dynamic Content Loading

## Tech Stack

- React.js
- CSS3 with Modern Features
- Context API for State Management
- Custom Hooks for Animations and Intersection Observer
- Markdown Processing for Content

## Project Structure

```
src/
├── components/         # React components
│   ├── Blog/          # Blog related components
│   ├── Contact/       # Contact form
│   ├── Hero/          # Hero section
│   ├── Modal/         # Reusable modal
│   ├── Projects/      # Projects section
│   ├── Skills/        # Skills showcase
│   └── WorkExperience/# Work history
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── utils/             # Utility functions
└── public/content/    # Markdown content
    ├── blog/          # Blog posts
    ├── projects/      # Project details
    └── work/          # Work experience
```

## Getting Started

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

## Content Management

Content is managed through markdown files located in the `public/content` directory:

- `blog/`: Blog post markdown files
- `projects/`: Project details and descriptions
- `work/`: Work experience entries

Each content type follows a specific markdown structure for consistent rendering.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the [MIT License](LICENSE).
