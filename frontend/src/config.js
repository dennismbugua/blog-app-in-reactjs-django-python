// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:8000';

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,
    BLOG_LIST: `${API_BASE_URL}/api/blog/`,
    BLOG_DETAIL: (slug) => `${API_BASE_URL}/api/blog/${slug}`,
    BLOG_FEATURED: `${API_BASE_URL}/api/blog/featured`,
    BLOG_CATEGORY: `${API_BASE_URL}/api/blog/category`,
};

export default API_BASE_URL;