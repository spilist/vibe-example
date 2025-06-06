/**
 * Application Constants
 * Centralized location for all magic numbers and configuration values
 */

// API Configuration
export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
} as const

// UI Configuration
export const UI_CONFIG = {
  RESOURCES_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 300,
  LOADING_TIMEOUT_MS: 30000,
  MAX_URL_LENGTH: 2048,
  MAX_TITLE_LENGTH: 200,
  MAX_SUMMARY_LENGTH: 500,
} as const

// File Paths
export const PATHS = {
  ADMIN_ROOT: '/admin',
  ADMIN_ADD: '/admin/add',
  ADMIN_DASHBOARD: '/admin/dashboard',
  LOGIN: '/login',
  HOME: '/',
} as const

// Gemini API Configuration
export const GEMINI_CONFIG = {
  MAX_CONTENT_LENGTH: 4000,
  MODEL_NAME: 'gemini-pro',
  TEMPERATURE: 0.3,
  MAX_OUTPUT_TOKENS: 1000,
} as const

// Validation Rules
export const VALIDATION = {
  URL_PATTERN: /^https?:\/\/.+/,
  REQUIRED_CATEGORIES_MIN: 1,
  REQUIRED_CATEGORIES_MAX: 3,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_URL: 'Please enter a valid URL starting with http:// or https://',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  UNAUTHORIZED: 'You must be logged in to access this page.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
  ANALYSIS_FAILED: 'Failed to analyze URL. Please try again.',
  SAVE_FAILED: 'Failed to save resource. Please try again.',
  LOAD_FAILED: 'Failed to load resources. Please refresh the page.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  RESOURCE_SAVED: 'Resource saved successfully!',
  RESOURCE_UPDATED: 'Resource updated successfully!',
  RESOURCE_DELETED: 'Resource deleted successfully!',
} as const 
