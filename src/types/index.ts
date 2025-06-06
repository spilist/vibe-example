/**
 * Type definitions for Vibe Coding Resource Directory
 * Based on Supabase database schema and API responses
 */

// Database Schema Types
export interface Resource {
  id: string
  created_at: string
  url: string
  title: string
  summary: string | null
  thumbnail_url: string | null
  categories: string[]
  resource_type: ResourceType
  language: Language
  status: ResourceStatus
  raw_content: string | null
  user_id: string
}

// Enum Types
export type ResourceType = 'Tool' | 'Official Docs' | 'Article'

export type Language = 'Korean' | 'English'

export type ResourceStatus = 'pending_review' | 'approved' | 'archived'

export type ResourceCategory = 
  | 'Planning'
  | 'Design'
  | 'Implementation'
  | 'Test & Deploy'
  | 'Operations'
  | 'Marketing'
  | 'Vibe Coding General'
  | 'Prompt Engineering General'

// API Response Types
export interface AnalyzeApiResponse {
  title: string
  summary: string
  thumbnail_url?: string
  suggested_categories: ResourceCategory[]
  resource_type: ResourceType
  language: Language
}

export interface AnalyzeApiRequest {
  url: string
}

// Form Types
export interface ResourceFormData {
  url: string
  title: string
  summary: string
  thumbnail_url?: string
  categories: ResourceCategory[]
  resource_type: ResourceType
  language: Language
}

// Filter Types
export interface ResourceFilters {
  categories: ResourceCategory[]
  resource_types: ResourceType[]
  languages: Language[]
  status: ResourceStatus[]
}

// Component Props Types
export interface ResourceCardProps {
  resource: Resource
  onEdit?: (resource: Resource) => void
  onDelete?: (id: string) => void
}

export interface FilterControlsProps {
  filters: ResourceFilters
  onFiltersChange: (filters: ResourceFilters) => void
}

// Constants
export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'Planning',
  'Design', 
  'Implementation',
  'Test & Deploy',
  'Operations',
  'Marketing',
  'Vibe Coding General',
  'Prompt Engineering General'
]

export const RESOURCE_TYPES: ResourceType[] = [
  'Tool',
  'Official Docs', 
  'Article'
]

export const LANGUAGES: Language[] = [
  'Korean',
  'English'
]

export const RESOURCE_STATUSES: ResourceStatus[] = [
  'pending_review',
  'approved',
  'archived'
] 
