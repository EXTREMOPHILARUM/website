# saurabhn.com

Personal site of Saurabh Nandedkar: a homepage plus a few project pages, built with React, React Router and Tailwind CSS.

## Documentation

- [Development Guide](docs/DEVELOPMENT.md) - Setup and development workflow
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute to the project
- [Content Guide](docs/CONTENT.md) - How to edit copy and add project pages

## Project Structure

```
src/
├── App.js            # Layout: header, skip link, footer
├── routes.js         # Route table (/, /work/:slug, redirects)
├── routes.test.js    # Navigation tests
├── content/site.js   # All site copy and project data
├── pages/
│   ├── Home.js       # Homepage
│   └── Project.js    # /work/:slug detail page
└── index.css         # Theme tokens and shared component classes
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
