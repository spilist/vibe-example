# Product Context: Vibe Coding Resource Directory

## Why This Project Exists
As a content creator and educator for "Vibe Coding," the admin curates many valuable online resources that are currently scattered and difficult to manage. This creates inefficiency in content creation workflows and resource utilization.

## Problems Being Solved
1. **Resource Fragmentation:** Bookmarks, tabs, and social media saves are scattered across multiple platforms
2. **Discovery Friction:** Finding previously saved resources takes too long
3. **Manual Overhead:** Categorizing and organizing resources is time-consuming
4. **Context Loss:** Resources lose context over time without proper metadata

## User Experience Goals

### Primary User Journey (Admin)
**Add Resource Flow:**
- Navigate to `/admin/add`
- Paste URL → Click "Analyze URL"
- Review auto-generated metadata (title, summary, categories, type, language)
- Edit/refine as needed
- Approve & Save
- Redirect to dashboard with new resource visible

**Browse & Filter Flow:**
- Access `/admin/dashboard`
- View resources in grid layout with thumbnails
- Filter by categories: `Planning`, `Design`, `Implementation`, `Test & Deploy`, `Operations`, `Marketing`, `Vibe Coding General`, `Prompt Engineering General`
- Filter by resource type: `Tool`, `Official Docs`, `Article`
- Filter by language: `Korean`, `English`

### AI-Enhanced Experience
The Gemini API provides intelligent analysis:
- **Automated Summarization:** 3-sentence concise summaries in English
- **Smart Categorization:** Suggests relevant categories from predefined list
- **Content Classification:** Determines resource type and language
- **Metadata Extraction:** Pulls title, description, and thumbnail automatically

## Quality Standards
- **Speed:** 15-second resource discovery target
- **Accuracy:** AI suggestions should be 80%+ accurate to reduce manual editing
- **Completeness:** All resources must have title, summary, and at least one category
- **Consistency:** Standardized categories and types for reliable filtering

## Content Management Philosophy
- **Curation Over Collection:** Focus on high-quality, relevant resources
- **Context Preservation:** Rich metadata ensures resources remain useful over time
- **Private First:** Admin-only access ensures focused, personal organization
- **Review Required:** Human oversight maintains quality control

## Future Vision Hints
While MVP is private and admin-only, the architecture should support:
- Public viewing capabilities
- User engagement features (likes, saves)
- Community contributions
- Bulk processing workflows
- Multi-language support expansion 
