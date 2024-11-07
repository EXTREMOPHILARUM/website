import { DEFAULT_BLOG_VALUES } from '../contentTypes';

/**
 * Maps blog data to a consistent format
 * @param {Object} data - Raw blog data
 * @param {string} content - Markdown content
 * @param {string} slug - Content slug
 * @returns {Object} Formatted blog data
 */
export const mapBlogPost = (data, content, slug) => ({
  ...DEFAULT_BLOG_VALUES,
  ...data,
  content: content.trim(),
  slug,
  date: data.date || new Date().toISOString().split('T')[0]
});
