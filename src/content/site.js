// Every claim here should trace to a public source linked alongside it.
// Figures come from each project's own README and are not independent measurements.
// Dvaita client work stays private: describe the company, never name clients.

const gh = (repo) => `https://github.com/EXTREMOPHILARUM/${repo}`;

export const PROFILE = {
  name: 'Saurabh Nandedkar',
  initials: 'SN',
  tagline: 'Founder · Builder · Mumbai',
  location: 'Mumbai, India',
  heroLead: 'I build software that turns ',
  heroEmphasis: 'messy public data',
  heroTail: ' into tools people can use, and I run the cloud it sits on.',
  sub: 'Founder of StellarOS and Dvaita Technologies. Security engineer by background. I ship products, data pipelines, desktop apps, hardware teardowns and the odd ML competition entry, and I publish most of it.',
  email: 'me@saurabhn.com',
  contactLinks: [
    { label: 'GitHub · EXTREMOPHILARUM', href: 'https://github.com/EXTREMOPHILARUM' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/extremophilarum' },
    { label: 'Photography · saurabh.photos', href: 'https://saurabh.photos' },
  ],
};

export const GLANCE = [
  ['Building', 'StellarOS'],
  ['Company', 'Dvaita Technologies'],
  ['Open source', 'GSoC 2021 · OWASP OWTF'],
  ['Community', 'afrost.org · fossevents.in'],
  ['On GitHub since', '2018'],
  ['Latest public ship', 'Wakefield · 2026', '/work/wakefield'],
];

export const STELLAROS = {
  name: 'StellarOS',
  role: 'Founder · building now',
  href: 'https://stellarosapp.com',
  summary:
    'An operating system for building an EB-1A or O-1A case. It maps your evidence, finds verified opportunities that fit your field, drafts outreach and organizes a counsel-ready record.',
  tags: ['Evidence map', 'Opportunity finder', 'stellarosapp.com'],
  image: 'https://stellarosapp.com/og-image.png',
};

export const DVAITA = {
  name: 'Dvaita Technologies',
  role: 'Founder · service company',
  href: 'https://dvaitatech.com',
  summary: 'My Mumbai software studio. We build products, public data systems and the cloud they run on.',
  offers: ['Products and internal tools', 'Public data systems', 'Cloud setup and upkeep'],
  image: 'https://dvaitatech.com/og.png',
};

// Every project gets a detail page at /work/:slug; `featured: false` keeps it off the Featured cards.
export const PROJECTS = [
  {
    slug: 'wakefield',
    name: 'Wakefield',
    kind: 'Public data · live API',
    year: '2026',
    featured: false,
    oneLiner: 'An API for live and historical AIS ship positions.',
    stat: { value: 'v0.3.0', caption: '15 public endpoints · OpenAPI spec at api.saurabhn.com' },
    live: 'https://api.saurabhn.com/docs',
    liveLabel: 'Open API docs',
    stack: ['REST', 'OpenAPI 3.1', 'API-key auth'],
    problem:
      'Ships broadcast their position, identity and voyage over AIS radio. Turning that stream into something you can query by vessel, area, port or time window takes ingest, storage and an API.',
    built: [
      'Endpoints for latest positions (with bounding-box and age filters), vessel lookup by MMSI or IMO, and tracks between two timestamps.',
      'Endpoints for vessel events, port calls, ports, sanctions lists and sightings of listed vessels, and PSIX lookup.',
      'A public health check and interactive docs. The /v1 routes need an API key.',
    ],
    facts: ['Live at api.saurabhn.com', 'API key required', 'Source is private'],
    figuresNote: 'Endpoint count and version come from the public OpenAPI spec at api.saurabhn.com/openapi.json.',
  },
  {
    slug: 'newsglobe',
    name: 'NewsGlobe',
    kind: 'Public data · live',
    year: '2026',
    oneLiner: 'Trending headlines from 148 countries, pulled from publishers’ own RSS feeds and plotted on an interactive 3D globe.',
    image: 'https://newsglobe.saurabhn.com/og-image.jpg',
    imageAlt: 'NewsGlobe: news plotted on a 3D globe',
    live: 'https://newsglobe.saurabhn.com',
    source: gh('newsglobe'),
    stack: ['Next.js', 'MapLibre GL', 'Cloudflare Workers'],
    tags: ['TypeScript', 'RSS', 'newsglobe.saurabhn.com'],
    problem:
      'News coverage is local, but most readers only see their own country’s feeds. There was no quick way to look at what the whole world is reading right now.',
    built: [
      'Direct publisher RSS feeds for 148 countries (about 720 feeds), parsed in the browser.',
      'Client-side geocoding against a database of 7,000+ cities, to place each article.',
      'Country selection by polygon, category filters and search that flies the globe to the result.',
      'Incremental loading and a slide-up mobile sheet, cached at the edge with a 5-minute TTL.',
    ],
    facts: ['148 countries', '~720 RSS feeds', 'Inspired by Polyglobe'],
  },
  {
    slug: 'yc-dataset',
    name: 'YC Startup Dataset',
    kind: 'Dataset',
    year: '2026',
    oneLiner: 'Every Y Combinator company, merged from scattered sources into markdown that AI agents can browse.',
    stat: { value: '5,762', caption: 'YC companies · 173 post-mortems · 2005–2026' },
    source: gh('yc-dataset'),
    stack: ['Python', 'Markdown', 'JSON'],
    tags: ['Python', 'Scraping', 'Agent-ready'],
    problem:
      'Information about YC companies is spread across launch posts, founder pages, press and post-mortems. None of it is in a shape an agent can browse.',
    built: [
      'Scraped and merged company, founder, news and launch data into one folder per company, grouped by batch.',
      'Added post-mortem reports and rebuild notes for companies that shut down or were acquired.',
      'Added a lightweight index.json for lookups by slug, batch and status.',
    ],
    facts: ['5,762 companies, 2005–2026', '173 with post-mortems'],
  },
  {
    slug: 'prc-data-challenge-2026',
    name: 'PRC Data Challenge 2026',
    kind: 'ML competition',
    year: '2026',
    oneLiner: 'Taxi-out time prediction for ten European airports, with a log of more than 2,500 lines covering every experiment, including the failures.',
    stat: { value: '240.51', caption: 'public-board RMSE · solo · rank unknown' },
    source: gh('prc-2026-dynamic-lobster'),
    stack: ['Python', 'ML', 'OpenSky data'],
    tags: ['Python', 'OpenSky', 'GPLv3'],
    problem:
      'Predict, in seconds, how long departures from ten European airports take to taxi out. Scored by RMSE on withheld January and July 2026 movements (EUROCONTROL PRC / OpenSky Network challenge).',
    built: [
      'An experiment log of more than 2,500 lines, recording every experiment and the measurement that settled it, including the ideas that failed.',
      'An audit of the project’s own foundational assumptions, which overrides older notes where they disagree.',
      'A reproducible end-to-end rebuild of the final submission.',
    ],
    facts: ['Public-board RMSE 240.51', 'Solo entry (team name dynamic-lobster)', 'Final rank not known'],
  },
];

// Homepage work index. `to` is an internal detail page; `href` is external.
export const INDEX = [
  {
    title: 'Public data → tools',
    lede: 'Scrape it, structure it, make it queryable.',
    items: [
      { name: 'Wakefield', year: '2026', to: '/work/wakefield', note: 'An API for live and historical AIS ship positions, queryable by vessel, area and time window.' },
      { name: 'Insurance Helper', year: '2025', href: gh('insurance-helper'), note: 'Indexes 8,500+ products from India’s insurance regulator (IRDAI) and answers questions across them with RAG.' },
      { name: 'NewsGlobe', year: '2026', to: '/work/newsglobe', note: 'News from 148 countries on a 3D globe.' },
      { name: 'YC Startup Dataset', year: '2026', to: '/work/yc-dataset', note: '5,762 companies, structured for agents.' },
      { name: 'Flight Tracker', year: '2025', href: 'https://flight-track.saurabhn.com', note: 'Historical flight tracks from the OpenSky API on a Leaflet map.' },
      { name: 'Google Timeline Analyzer', year: '2025', href: gh('google_timeline_analyzer'), note: 'Trip detection and insights from 10+ years of location history.' },
    ],
  },
  {
    title: 'Apps & products',
    lede: 'Shipped software for desktop, mobile and the web.',
    items: [
      { name: 'Distill', year: '2026', href: gh('distill-releases'), note: 'An AI-native, local-first photo manager for macOS. Analysis runs on-device, and the AI is the interface.' },
      { name: 'Zephyr API', year: '2025', href: gh('zephyr-api'), note: 'A cross-platform REST client for desktop and mobile, built with Tauri.' },
      { name: 'Marauders Money', year: '2024', href: gh('marauders-money'), note: 'An offline-first personal finance app built with React Native.' },
      { name: 'LexiVox', year: '2025', href: 'https://lexivox.dvaitatech.com', note: 'Reads EPUB and PDF files aloud in the browser. Adapted from xenova’s Kokoro TTS demo.' },
      { name: 'Court allocation', year: '2024', href: gh('court_allocation'), note: 'Court scheduling for pickleball tournaments.' },
    ],
  },
  {
    title: 'Security',
    lede: 'Where I started, and still how I think.',
    dark: true,
    items: [
      { name: 'GSoC 2021 · OWASP OWTF', year: '2021', href: gh('gsoc_final_submission'), note: 'Stability work, a CI migration from Travis to GitHub Actions, and new features.' },
      { name: 'eBPFerret', year: '2024', href: gh('eBPFerret'), note: 'eBPF monitoring of process, file and network activity, with threat detection.' },
      { name: 'MCP Bug Bounty Server', year: '2025', href: gh('mcp-bug-bounty-server'), note: 'Runs bug bounty CLI tools behind one API with standardized JSON output.' },
      { name: 'W47cH3R', year: '2018', href: gh('W47cH3R'), note: 'ARP attack detection, co-built with shelbygtbayes.' },
      { name: 'Katacoda scenarios', year: '2022', href: gh('katacoda-scenarios'), note: 'Interactive teaching scenarios.' },
    ],
  },
  {
    title: 'ML & algorithms',
    lede: 'Measured, logged and reproducible.',
    items: [
      { name: 'PRC Data Challenge 2026', year: '2026', to: '/work/prc-data-challenge-2026', note: 'Solo entry. Public-board RMSE of 240.51.' },
      { name: 'Semantle solver', year: '2026', href: gh('semantle'), note: 'Information-theoretic word elimination. A mean of 3.9 guesses on a 30-word benchmark.' },
    ],
  },
  {
    title: 'Hardware',
    lede: 'Taking real machines apart.',
    items: [
      { name: 'JACK sewing controller', year: '2026', href: gh('jack-sewing-controller'), note: 'Teardown and reverse-engineering notes for computerized sewing-machine controllers, aimed at repair and cheaper replacement boards.' },
      { name: 'aqui', year: '2025', href: gh('aqui'), note: 'Reads SDS011/SDS021 particulate sensors over USB serial.' },
    ],
  },
  {
    title: 'Agent tooling & community',
    lede: 'Plugins I use daily, and FOSS I help run.',
    items: [
      { name: 'slacker', year: '2026', href: gh('slacker'), note: 'A Claude Code plugin that writes slack_sdk code on the fly.' },
      { name: 'mac-shortcuts-plugin', year: '2026', href: gh('mac-shortcuts-plugin'), note: 'Mac Shortcuts management from Claude Code.' },
      { name: 'afrost.org', year: '2025', href: 'https://afrost.org', note: 'The website of the Association for the promotion of Free and Open Source Technologies.' },
      { name: 'fossevents.in', year: '—', href: 'https://fossevents.in', note: 'A listing of upcoming FOSS events in India.' },
    ],
  },
];
