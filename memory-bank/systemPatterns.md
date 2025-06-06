# System Patterns: Vibe Coding Resource Directory

## Architecture Overview
This is a Next.js App Router application with Supabase backend, following a client-server pattern with AI integration.

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Supabase       │    │   Gemini API    │
│   Frontend      │◄──►│   Backend        │    │   AI Service    │
│   - Admin UI    │    │   - Database     │    │   - Analysis    │
│   - Forms       │    │   - Auth         │    │   - Metadata    │
│   - Dashboard   │    │   - Edge Funcs   │    │   - Summary     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Database Design Patterns

### Resource Entity Model
**Table:** `resources`
- **Identity:** `id` (UUID), `created_at` (timestamp)
- **Content:** `url` (unique), `title`, `summary`, `raw_content`
- **Metadata:** `categories` (text[]), `resource_type`, `language`
- **Media:** `thumbnail_url`
- **State:** `status` (pending_review, approved, archived)
- **Ownership:** `user_id` (foreign key to auth.users)

### Data Flow Patterns
1. **URL Input** → **Metadata Extraction** → **AI Analysis** → **Human Review** → **Approved Storage**
2. **Row Level Security** ensures admin-only access to pending_review items
3. **Unique URL constraint** prevents duplicate resources

## Component Architecture Patterns

### Layout Hierarchy
```
AdminLayout (auth wrapper)
├── URLInputForm (client component)
├── ReviewForm (client component)
├── ResourceDashboard (server component)
│   └── ResourceCard[] (display components)
└── FilterControls (client component)
```

### Component Responsibilities
- **AdminLayout:** Authentication boundary and navigation
- **URLInputForm:** URL input, loading states, API communication
- **ReviewForm:** Data editing, validation, submission
- **ResourceDashboard:** Data fetching, grid display
- **ResourceCard:** Individual resource presentation
- **FilterControls:** Client-side filtering logic

## API Integration Patterns

### Analyze Endpoint (`/api/analyze`)
**Pattern:** Sequential Processing Pipeline
1. **Input Validation** → URL format check
2. **Metadata Scraping** → metascraper extraction
3. **Content Processing** → truncate to 4000 chars
4. **AI Prompt Construction** → structured prompt for Gemini
5. **AI API Call** → Gemini analysis
6. **Response Parsing** → JSON validation
7. **Return Structured Data** → client consumption

### Gemini API Integration Pattern
**Prompt Template:**
```
System: Expert content curator
Task: Analyze web content → return JSON
Schema: {summary, suggested_categories, resource_type, language}
Constraints: No explanatory text, predefined options only
Input: {title, description, content_truncated}
```

## Authentication Patterns

### Supabase Auth Integration
- **Email/Password** authentication for admin
- **Route Protection** via middleware or layout-level checks
- **Session Management** using Supabase client
- **RLS Policies** for data access control

### Route Protection Pattern
```typescript
// All /admin/* routes require authentication
if (!session) {
  redirect('/login')
}
```

## State Management Patterns

### Form State (Client Components)
- **URLInputForm:** URL, loading, error states
- **ReviewForm:** Editable fields, validation, submission state
- **FilterControls:** Selected filters, filtered results

### Server State (Database)
- **Single Source of Truth:** Supabase resources table
- **Optimistic Updates:** Client-side state updates before server confirmation
- **Real-time Sync:** Optional Supabase real-time subscriptions

## Error Handling Patterns

### API Error Handling
```typescript
try {
  // API operation
} catch (error) {
  // Log for debugging
  // Return user-friendly error
  // Maintain app stability
}
```

### UI Error Boundaries
- **Form-level:** Invalid inputs, API failures
- **Page-level:** Authentication errors, data loading failures
- **Global:** Unexpected errors with fallback UI

## Performance Optimization Patterns

### Next.js Optimizations
- **Server Components** for data fetching and static content
- **Client Components** only for interactivity
- **Image Optimization** using Next.js Image component
- **Route Caching** for static admin pages

### Data Loading Patterns
- **Server-side Rendering** for admin dashboard
- **Progressive Enhancement** for form interactions
- **Lazy Loading** for resource thumbnails
- **Pagination** for large resource lists (future enhancement)

## Security Patterns

### Data Protection
- **Input Sanitization** for all user inputs
- **URL Validation** before processing
- **Content Truncation** to prevent large payloads
- **Rate Limiting** on API endpoints (recommended)

### Authentication Security
- **Secure Session Management** via Supabase
- **HTTPS Only** for production
- **Environment Variables** for API keys
- **Row Level Security** for database access 
