import { DEFAULT_BLOG_VALUES } from '../contentTypes';

/**
 * Maps blog data to a consistent format with enhanced SEO metadata
 * @param {Object} data - Raw blog data
 * @param {string} content - Markdown content
 * @param {string} slug - Content slug
 * @returns {Object} Formatted blog data with SEO metadata
 */
export const mapBlogPost = (data, content, slug) => {
  // Format the date in ISO format for SEO
  const formattedDate = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
  
  // Generate canonical URL if not provided
  const canonicalUrl = data.canonicalUrl || `https://saurabhn.com/blog/${slug}`;
  
  // Extract first image from content as fallback for og:image if not specified
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const defaultImage = imageMatch ? imageMatch[1] : '/icons/icon-512x512.png';
  
  // Combine tags and keywords for better SEO
  const keywords = [...new Set([
    ...(data.tags || []),
    ...(data.keywords || [])
  ])];

  // Get reading time estimate
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / wordsPerMinute))} min`;

  return {
    ...DEFAULT_BLOG_VALUES,
    ...data,
    content: content.trim(),
    slug,
    date: formattedDate,
    lastModified: data.lastModified || formattedDate,
    canonicalUrl,
    image: data.image || defaultImage,
    keywords,
    readTime,
    // Ensure these fields are never undefined
    title: data.title || '',
    description: data.description || '',
    author: data.author || DEFAULT_BLOG_VALUES.author,
    tags: data.tags || []
  };
};
