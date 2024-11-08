# Contributing Guidelines

## Getting Started

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## Code Style

- Use consistent indentation (2 spaces)
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## Adding Content

### Blog Posts
Place in `public/content/blog/` with structure:
```md
---
title: Post Title
date: YYYY-MM-DD
description: Brief description
---
Content here
```

### Projects
Place in `public/content/projects/` with structure:
```md
---
title: Project Name
description: Brief description
tech: [Tech1, Tech2]
---
Content here
```

### Work Experience
Place in `public/content/work/` with structure:
```md
---
company: Company Name
role: Your Role
period: Start - End
---
Content here
