# Technical Context: Vibe Coding Resource Directory

## Technology Stack

### Frontend Framework
- **Next.js 15+** with App Router
- **React 18+** with Server/Client Components
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling

### Backend & Database
- **Supabase** as Backend-as-a-Service
  - PostgreSQL database
  - Authentication system
  - Row Level Security (RLS)
  - Edge Functions for serverless API
- **Alternative:** Next.js API Routes if Supabase Edge Functions aren't used

### AI Integration
- **Google Gemini API** for content analysis
  - Official Google AI SDK
  - Structured JSON response parsing
  - Content summarization and categorization

### Web Scraping
- **metascraper** library for URL metadata extraction
  - Title, description, image extraction
  - Content scraping for AI analysis
  - Handle various website formats

## Development Environment

### Required Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret (if using NextAuth alternative)
NEXTAUTH_URL=http://localhost:3000 (development)
```

### Package Dependencies
**Core Dependencies:**
```json
{
  "next": "^15.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "@supabase/supabase-js": "^2.0.0",
  "@google/generative-ai": "^0.1.0",
  "metascraper": "^5.0.0",
  "metascraper-description": "^5.0.0",
  "metascraper-image": "^5.0.0",
  "metascraper-title": "^5.0.0"
}
```

**Development Dependencies:**
```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^15.0.0",
  "tailwindcss": "^4.0.0",
  "postcss": "^8.0.0",
  "autoprefixer": "^10.0.0"
}
```

## Database Schema

### Resources Table Structure
```sql
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  thumbnail_url TEXT,
  categories TEXT[] DEFAULT '{}',
  resource_type TEXT NOT NULL CHECK (resource_type IN ('Tool', 'Official Docs', 'Article')),
  language TEXT NOT NULL CHECK (language IN ('Korean', 'English')),
  status TEXT DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'archived')),
  raw_content TEXT,
  user_id UUID REFERENCES auth.users(id)
);
```

### Row Level Security Policies
```sql
-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can view all resources
CREATE POLICY "Admin can view all resources" ON resources
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Policy: Admin can insert resources
CREATE POLICY "Admin can insert resources" ON resources
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admin can update own resources
CREATE POLICY "Admin can update own resources" ON resources
  FOR UPDATE USING (auth.uid() = user_id);
```

## API Architecture

### Endpoint Design
```typescript
// /api/analyze - POST
interface AnalyzeRequest {
  url: string;
}

interface AnalyzeResponse {
  title: string;
  summary: string;
  thumbnail_url?: string;
  suggested_categories: string[];
  resource_type: 'Tool' | 'Official Docs' | 'Article';
  language: 'Korean' | 'English';
}
```

### Gemini API Prompt Template
```typescript
const ANALYSIS_PROMPT = `
You are an expert content curator. Analyze the following web page content and return a JSON object.
Do not include any explanatory text before or after the JSON.
The JSON object must have the following keys:
- "summary": A concise, 3-sentence summary in English.
- "suggested_categories": An array of strings. Choose the most relevant categories from this list: ["Planning", "Design", "Implementation", "Test & Deploy", "Operations", "Marketing", "Vibe Coding General", "Prompt Engineering General"].
- "resource_type": A single string. Choose one from: "Tool", "Official Docs", "Article".
- "language": A single string. Choose one from: "Korean", "English".

Here is the content:
Title: {title}
Description: {description}
Content: {content_truncated_to_4000_chars}
`;
```

## File Structure Conventions

### Next.js App Router Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── admin/
│   │   ├── layout.tsx       # Admin layout with auth
│   │   ├── add/
│   │   │   └── page.tsx     # URL input page
│   │   └── dashboard/
│   │       └── page.tsx     # Resource dashboard
│   ├── login/
│   │   └── page.tsx         # Authentication page
│   └── api/
│       └── analyze/
│           └── route.ts     # URL analysis endpoint
├── components/
│   ├── AdminLayout.tsx
│   ├── URLInputForm.tsx
│   ├── ReviewForm.tsx
│   ├── ResourceCard.tsx
│   └── ResourceDashboard.tsx
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── gemini.ts            # Gemini API client
│   └── types.ts             # TypeScript definitions
└── hooks/
    └── useAuth.ts           # Authentication hook
```

## Development Workflow

### Local Development Setup
1. **Clone and Install**
   ```bash
   npm install
   # or yarn install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Configure Supabase and Gemini API keys

3. **Database Setup**
   - Create Supabase project
   - Run database migrations
   - Set up authentication

4. **Development Server**
   ```bash
   npm run dev
   # or yarn dev
   ```

### Testing Strategy
- **Unit Tests:** Vitest/Jest for utility functions
- **Integration Tests:** React Testing Library for components
- **E2E Tests:** Playwright for full user flows
- **API Tests:** Test `/api/analyze` endpoint with mock data

## Deployment Configuration

### Vercel Deployment
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Environment Variables:** Set in Vercel dashboard
- **Domain Configuration:** Custom domain setup

### Performance Considerations
- **Image Optimization:** Next.js Image component for thumbnails
- **Bundle Size:** Dynamic imports for heavy components
- **Caching:** Next.js static generation where possible
- **API Rate Limiting:** Implement for Gemini API calls

## Security Requirements

### Environment Security
- **API Keys:** Server-side only, never exposed to client
- **HTTPS:** Required for production
- **CORS:** Restrict API access to authorized domains

### Data Security
- **Input Validation:** Sanitize all user inputs
- **SQL Injection Prevention:** Use Supabase parameterized queries
- **XSS Prevention:** Sanitize rendered content
- **Authentication:** Secure session management via Supabase Auth 
