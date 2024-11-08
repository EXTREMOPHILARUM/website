# Content Management Guide

## Content Types

### Blog Posts
Location: `public/content/blog/`

```md
---
title: Your Blog Title
date: YYYY-MM-DD
description: Brief description of the post
tags: [tag1, tag2]
---

Content in markdown format
```

### Projects
Location: `public/content/projects/`

```md
---
title: Project Name
description: Project description
tech: [Tech1, Tech2]
github: repository-url (optional)
demo: live-demo-url (optional)
---

Project details in markdown
```

### Work Experience
Location: `public/content/work/`

```md
---
company: Company Name
role: Your Role
period: Start Date - End Date
location: City, Country
---

Work description in markdown
```

## Adding Images

1. Create a folder with same name as markdown file
2. Place images in that folder
3. Reference in markdown: `![alt text](./image.png)`

## Markdown Features

- Headers (h1-h6)
- Lists (ordered/unordered)
- Code blocks with syntax highlighting
- Tables
- Links
- Images
- Blockquotes
- Bold/Italic text

## Content Loading

Content is loaded dynamically using:
- `contentLoader.js` - Core loading logic
- `frontmatterParser.js` - Parses frontmatter
- Mapper utilities for each content type
