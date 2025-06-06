/**
 * Utility Functions
 * Common helper functions used throughout the application
 */

import { VALIDATION } from './constants'
import type { ResourceCategory, ResourceType, Language } from '@/types'

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return VALIDATION.URL_PATTERN.test(url)
  } catch {
    return false
  }
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Formats a date string to a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

/**
 * Extracts domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return ''
  }
}

/**
 * Generates a slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Validates resource category
 */
export function isValidCategory(category: string): category is ResourceCategory {
  const validCategories: ResourceCategory[] = [
    'Planning',
    'Design',
    'Implementation',
    'Test & Deploy',
    'Operations',
    'Marketing',
    'Vibe Coding General',
    'Prompt Engineering General'
  ]
  return validCategories.includes(category as ResourceCategory)
}

/**
 * Validates resource type
 */
export function isValidResourceType(type: string): type is ResourceType {
  const validTypes: ResourceType[] = ['Tool', 'Official Docs', 'Article']
  return validTypes.includes(type as ResourceType)
}

/**
 * Validates language
 */
export function isValidLanguage(language: string): language is Language {
  const validLanguages: Language[] = ['Korean', 'English']
  return validLanguages.includes(language as Language)
}

/**
 * Debounce function for search and input handling
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a delay for testing loading states
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Handles async operations with error catching
 */
export async function safeAsync<T>(
  asyncFn: () => Promise<T>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await asyncFn()
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Combines class names conditionally
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
} 
