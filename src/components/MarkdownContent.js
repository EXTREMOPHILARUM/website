import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim());
      } else {
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
      <div className="markdown-body w-full max-w-full overflow-hidden">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius: '0.375rem',
                    margin: '1.5rem 0',
                    overflowX: 'auto',
                    maxWidth: '100%',
                    fontSize: '0.9em'
                  }}
                  codeTagProps={{
                    style: {
                      fontSize: 'inherit',
                      whiteSpace: 'pre',
                      padding: 0,
                      margin: 0
                    }
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            p: ({node, ...props}) => (
              <p className="whitespace-normal break-words" {...props} />
            ),
            pre: ({node, ...props}) => (
              <pre className="whitespace-pre-wrap overflow-x-auto max-w-full" {...props} />
            ),
            img: ({node, ...props}) => (
              <img className="max-w-full h-auto" alt={props.alt || "Markdown content image"} {...props} />
            ),
            a: ({node, children, ...props}) => (
              <a className="break-words" {...props}>
                {children || props.href}
              </a>
            )
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownContent;
