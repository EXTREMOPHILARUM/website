import { DEFAULT_WORK_VALUES } from '../contentTypes';

/**
 * Maps work experience data to a consistent format
 * @param {Object} data - Raw work experience data
 * @param {string} content - Markdown content
 * @param {string} slug - Content slug
 * @returns {Object} Formatted work experience data
 */
export const mapWorkExperience = (data, content, slug) => ({
  ...DEFAULT_WORK_VALUES,
  ...data,
  title: data.position || data.title,
  content: content.trim(),
  slug
});
