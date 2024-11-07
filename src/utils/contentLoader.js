import { CONTENT_TYPES, CONTENT_STRUCTURE, CONTENT_PATHS, ERROR_MESSAGES } from '../config/settings';
import { parseFrontmatter } from './frontmatterParser';
import { mapWorkExperience } from './mappers/workMapper';
import { mapBlogPost } from './mappers/blogMapper';
import { mapProject } from './mappers/projectMapper';

/**
 * Maps content based on type
 * @param {string} contentType - Type of content
 * @param {Object} data - Raw content data
 * @param {string} content - Markdown content
 * @param {string} slug - Content slug
 * @returns {Object} Formatted content data
 */
const mapContent = (contentType, data, content, slug) => {
  switch (contentType) {
    case CONTENT_TYPES.WORK:
      return mapWorkExperience(data, content, slug);
    case CONTENT_TYPES.BLOG:
      return mapBlogPost(data, content, slug);
    case CONTENT_TYPES.PROJECTS:
      return mapProject(data, content, slug);
    default:
      throw new Error(`${ERROR_MESSAGES.INVALID_CONTENT_TYPE} ${contentType}`);
  }
};

/**
 * Loads content from markdown file
 * @param {string} contentType - Type of content to load
 * @param {string} slug - Content slug
 * @returns {Promise<Object|null>} Loaded and parsed content
 */
const loadContent = async (contentType, slug) => {
  if (!contentType || !slug) {
    throw new Error(ERROR_MESSAGES.MISSING_CONTENT_TYPE_SLUG);
  }

  if (!Object.values(CONTENT_TYPES).includes(contentType)) {
    throw new Error(`${ERROR_MESSAGES.INVALID_CONTENT_TYPE} ${contentType}`);
  }

  try {
    const response = await fetch(
      `${CONTENT_PATHS.BASE}/${contentType}/${slug}/${CONTENT_PATHS.INDEX_FILE}`
    );
    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.CONTENT_NOT_FOUND} ${contentType}/${slug}`);
    }

    const text = await response.text();
    const { data, content } = parseFrontmatter(text);
    
    return mapContent(contentType, data, content, slug);
  } catch (error) {
    console.error(`Error loading ${contentType}/${slug}:`, error);
    return null;
  }
};

/**
 * Loads all content of a specific type
 * @param {string} type - Type of content to load
 * @returns {Promise<Array>} Array of loaded content
 */
export const loadAllContent = async (type) => {
  if (!type || !CONTENT_STRUCTURE[type]) {
    throw new Error(`${ERROR_MESSAGES.INVALID_CONTENT_TYPE} ${type}`);
  }

  const slugs = CONTENT_STRUCTURE[type];
  const contents = await Promise.all(
    slugs.map(slug => loadContent(type, slug))
  );
  return contents.filter(Boolean);
};

// Convenience methods for loading specific content types
export const loadBlogPost = (slug) => loadContent(CONTENT_TYPES.BLOG, slug);
export const loadProject = (slug) => loadContent(CONTENT_TYPES.PROJECTS, slug);
export const loadWork = (slug) => loadContent(CONTENT_TYPES.WORK, slug);
