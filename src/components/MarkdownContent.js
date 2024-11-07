import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      // Handle arrays in frontmatter (e.g., tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim());
      } else {
        // Remove quotes if present
        value = value.replace(/^["'](.*)["']$/, '$1');
      }
      data[key.trim()] = value;
    }
  });

  return { data, content: markdownContent.trim() };
};

const MarkdownContent = ({ content }) => {
  const { data: frontmatter, content: markdownContent } = parseFrontmatter(content);

  return (
    <div className="markdown-content">
      <div className="frontmatter">
        <h1>{frontmatter.title}</h1>
        {frontmatter.date && <p className="date">Published on: {frontmatter.date}</p>}
        {frontmatter.author && <p className="author">By: {frontmatter.author}</p>}
        {frontmatter.tags && (
          <div className="tags">
            {frontmatter.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        {frontmatter.description && <p className="description">{frontmatter.description}</p>}
      </div>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownContent;
