# Project Brief: Vibe Coding Resource Directory - MVP 1.0

## Project Overview
Building a centralized, private directory to organize and manage curated web resources for "Vibe Coding" content creation. This is a personal productivity tool designed to solve the problem of scattered bookmarks and resources.

## Core Problem
- Resources are scattered across browser bookmarks, tabs, and social media saves
- Hard to find and utilize curated content efficiently
- Need a centralized, filterable system for resource management

## Target User
**Primary:** The Admin (content creator) - tech-savvy individual who needs efficient resource organization and retrieval

## Solution Approach
An automated pipeline that:
1. Takes a URL input
2. Enriches it with AI-generated metadata (via Gemini API)
3. Stores it in a filterable, private dashboard
4. Provides quick search and categorization

## Success Criteria
- Successfully add and categorize 50 resources within first week
- Find any specific, categorized resource in under 15 seconds
- End-to-end process (URL to approved list) in under 2 minutes

## Core User Flow
1. Admin accesses protected `/admin/add` page
2. Pastes URL and clicks "Analyze URL"
3. System processes URL → fetches metadata → calls Gemini API → returns structured data
4. Admin reviews and edits auto-generated data in review form
5. Admin approves and saves to database
6. Resource appears in main dashboard with filtering capabilities

## Tech Stack Decision
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL, Auth, Edge Functions)
- **AI Processing:** Google Gemini API
- **Deployment:** Vercel

## Key Constraints
- Private/admin-only access (authenticated sessions required)
- Manual review step for all resources before approval
- Predefined categories and resource types for consistency
- Focus on automation to minimize manual data entry 
