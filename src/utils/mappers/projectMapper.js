import { DEFAULT_PROJECT_VALUES } from '../contentTypes';

/**
 * Maps project data to a consistent format
 * @param {Object} data - Raw project data
 * @param {string} content - Markdown content
 * @param {string} slug - Content slug
 * @returns {Object} Formatted project data
 */
export const mapProject = (data, content, slug) => ({
  ...DEFAULT_PROJECT_VALUES,
  ...data,
  content: content.trim(),
  slug
});
