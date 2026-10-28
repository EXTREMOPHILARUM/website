# Content Guide

All site copy lives in one module: `src/content/site.js`. There is no markdown pipeline; edit the data and the pages pick it up.

## Rules

- Every claim must trace to a public source linked next to it (a public repo, live site or public API docs).
- Figures are quoted from the project's own README or public docs. Do not add usage, traction or uptime numbers that aren't published.
- Never name Dvaita Technologies clients.
- Don't copy details from private repositories into the site.

## What's in `site.js`

| Export | Used for |
| --- | --- |
| `PROFILE` | Name, hero line, sub-heading, email, contact links |
| `GLANCE` | "At a glance" rows on the homepage. An optional third item makes the value a link (`[label, value, '/work/slug']`) |
| `STELLAROS`, `DVAITA` | The two "What I'm building now" tiles |
| `PROJECTS` | Projects with a detail page at `/work/:slug`. They appear as Featured cards unless `featured: false` |
| `INDEX` | The grouped work index. Items take `to` (internal page) or `href` (external, opens in a new tab) |

### Adding a project page

Add an entry to `PROJECTS`:

```js
{
  slug: 'my-project',            // URL: /work/my-project
  name: 'My Project',
  kind: 'Dataset',               // small label above the title
  year: '2026',
  oneLiner: 'One sentence on what it is.',
  image: 'https://…/og.png',     // or `stat: { value, caption }` for a text panel
  imageAlt: 'Describe the image',
  live: 'https://…',             // optional; `liveLabel` renames the button
  source: 'https://github.com/…', // optional; omit for private repos
  stack: ['Python'],
  tags: ['Python'],              // shown on the Featured card
  problem: 'The problem in two sentences.',
  built: ['What you built, one item per line.'],
  facts: ['Short facts from the README'],
  figuresNote: 'Optional: where the figures come from.',
}
```

Then add the URL to `public/sitemap.xml`. If you rename a slug, add a redirect in `src/routes.js` so old links keep working.
