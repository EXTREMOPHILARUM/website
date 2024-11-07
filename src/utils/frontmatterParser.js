/**
 * @typedef {Object} ParsedContent
 * @property {Object} data - Frontmatter data
 * @property {string} content - Markdown content
 */

/**
 * Parses frontmatter and content from markdown text
 * @param {string} content - Raw markdown content with frontmatter
 * @returns {ParsedContent} Parsed frontmatter data and content
 */
export const parseFrontmatter = (content) => {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string');
  }

  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, markdownContent] = match;
  const data = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueArr] = line.split(':');
    if (key && valueArr.length) {
      let value = valueArr.join(':').trim();
      value = value.replace(/^["'](.*)["']$/, '$1');
      
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^["'](.*)["']$/, '$1'));
      }
      
      data[key.trim()] = value;
    }
  });

  return { 
    data, 
    content: markdownContent.trim() 
  };
};
