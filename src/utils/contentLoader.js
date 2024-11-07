const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return { data: {}, content };
  
  const [, frontmatter, markdownContent] = match;
  const data = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueArr] = line.split(':');
    if (key && valueArr.length) {
      let value = valueArr.join(':').trim();
      // Remove quotes if present
      value = value.replace(/^["'](.*)["']$/, '$1');
      
      // Handle arrays in frontmatter (e.g., tags, technologies)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^["'](.*)["']$/, '$1'));
      }
      
      data[key.trim()] = value;
    }
  });

  return { data, content: markdownContent.trim() };
};

const loadContent = async (contentType, slug) => {
  try {
    const response = await fetch(`/content/${contentType}/${slug}/index.md`);
    if (!response.ok) throw new Error('Content not found');
    const text = await response.text();
    const { data, content } = parseFrontmatter(text);
    
    // For work experience, map the frontmatter fields correctly
    if (contentType === 'work') {
      return {
        ...data,
        title: data.position || data.title,
        company: data.company,
        location: data.location,
        type: data.type || 'Full-time', // e.g., Remote, On-site, Hybrid
        startDate: data.startDate,
        endDate: data.endDate,
        overview: data.overview || '',
        technologies: data.technologies || [],
        achievements: data.achievements || [],
        tags: data.tags || [],
        content: content.trim(),
        slug
      };
    }
    
    // For other content types
    return {
      ...data,
      content,
      slug
    };
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
};

// Content directory structure
const contentStructure = {
  blog: ['automated-security-pipeline', 'high-availability-email-infrastructure', 'multi-cloud-trading-architecture'],
  projects: ['confidential-trading-platform', 'flipkart-health-plus', 'password-manager'],
  work: ['Turing', 'Safe', 'Prismberry', 'Navy', 'Afrost']
};

export const loadAllContent = async (type) => {
  const slugs = contentStructure[type] || [];
  const contents = await Promise.all(
    slugs.map(slug => loadContent(type, slug))
  );
  return contents.filter(content => content !== null);
};

export const loadBlogPost = (slug) => loadContent('blog', slug);
export const loadProject = (slug) => loadContent('projects', slug);
export const loadWork = (slug) => loadContent('work', slug);
