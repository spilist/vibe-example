# Product Requirements Document (PRD): Vibe Coding Resource Directory - MVP 1.0

**Author:** [Your Name]
**Status:** In Definition
**Date:** [Current Date]
**Target Agent:** Cursor, Lovable, or similar AI Coding Agent

## 1. Overview & Problem Statement

As a content creator and educator for "Vibe Coding," I curate many valuable online resources. These resources are currently scattered across browser bookmarks, tabs, and social media saves, making them hard to find and utilize. This project aims to build a centralized, private directory to solve my own problem first. The core of the MVP is an automated pipeline that takes a URL, enriches it with AI-generated metadata, and stores it in a filterable, private dashboard.

## 2. Target Audience

- **Primary:** The Admin (myself). A tech-savvy content creator who needs an efficient way to organize and retrieve curated web resources.

## 3. Goals & Success Metrics

- **Goal:** Build a functional, private tool to automate the organization of web resources.
- **Success Metrics:**
    - Successfully add and categorize 50 resources within the first week of use.
    - The admin must be able to find any specific, categorized resource in under 15 seconds.
    - The end-to-end process from pasting a URL to seeing it in the approved list should take less than 2 minutes (including manual review).

## 4. Core User Flow (MVP)

1.  **Navigate:** The admin accesses a protected admin page (e.g., `/admin/add`).
2.  **Input:** The admin pastes a single URL into a text input and clicks an "Analyze URL" button.
3.  **Process & Display:** The system displays a loading state. In the background, it calls an API that fetches the URL's metadata, sends it to the Gemini API for analysis (summary, categorization), and receives the structured data back. The page then displays a "Review Form" pre-filled with this data.
4.  **Review & Edit:** The admin reviews the auto-generated title, summary, categories, etc. They can edit any field.
5.  **Approve:** The admin clicks "Approve & Save". The data is saved to the database with an `approved` status.
6.  **View:** The admin is redirected to the main dashboard (`/admin/dashboard`), where the newly added resource is visible at the top of the list.
7.  **Filter:** The admin can use dropdown filters on the dashboard to view resources by category or type.

## 5. Detailed Feature Specifications

### 5.1. Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database / Backend:** Supabase (PostgreSQL DB, Auth for admin access, Edge Functions for API)
- **AI:** Google Gemini API (via official SDK)
- **Deployment:** Vercel

### 5.2. Database Schema (Supabase)

Create a table named `resources`.

| Column Name     | Type                | Constraints / Notes                                                                                                                                                                                                                         |
| :-------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`            | `uuid`              | Primary Key, `default: gen_random_uuid()`                                                                                                                                                                                                   |
| `created_at`    | `timestamp with tz` | `default: now()`                                                                                                                                                                                                                            |
| `url`           | `text`              | Not Null, Unique                                                                                                                                                                                                                            |
| `title`         | `text`              | Not Null                                                                                                                                                                                                                                    |
| `summary`       | `text`              | Nullable. AI-generated summary.                                                                                                                                                                                                             |
| `thumbnail_url` | `text`              | Nullable. URL for the resource's image.                                                                                                                                                                                                     |
| `categories`    | `text[]`            | Array of text. Pre-defined list: `Planning`, `Design`, `Implementation`, `Test & Deploy`, `Operations`, `Marketing`, `Vibe Coding General`, `Prompt Engineering General`.                                                                      |
| `resource_type` | `text`              | Pre-defined enum-like values: `Tool`, `Official Docs`, `Article`.                                                                                                                                                                             |
| `language`      | `text`              | Pre-defined enum-like values: `Korean`, `English`.                                                                                                                                                                                            |
| `status`        | `text`              | `default: 'pending_review'`. Other values: `approved`, `archived`. Use Row Level Security to ensure only authenticated admins can see `pending_review` items.                                                                                 |
| `raw_content`   | `text`              | Nullable. The scraped text content of the page, used for the AI prompt.                                                                                                                                                                       |
| `user_id`       | `uuid`              | Foreign Key to `auth.users`. To associate the resource with the admin who added it.                                                                                                                                                             |


### 5.3. Admin Authentication

- Use Supabase Auth to implement a simple email/password login for the admin.
- All `/admin/*` routes must be protected and require an authenticated session.

### 5.4. API Endpoint (`/api/analyze` or Supabase Edge Function)

- **Method:** `POST`
- **Request Body:** `{ "url": "https://..." }`
- **Logic:**
    1.  Validate the input URL.
    2.  Use a library like `metascraper` to fetch the URL's metadata (title, image, description, author) and main content.
    3.  Construct a prompt for the Gemini API.
        ```
        You are an expert content curator. Analyze the following web page content and return a JSON object.
        Do not include any explanatory text before or after the JSON.
        The JSON object must have the following keys:
        - "summary": A concise, 3-sentence summary in English.
        - "suggested_categories": An array of strings. Choose the most relevant categories from this list: ["Planning", "Design", "Implementation", "Test & Deploy", "Operations", "Marketing", "Vibe Coding General", "Prompt Engineering General"].
        - "resource_type": A single string. Choose one from: "Tool", "Official Docs", "Article".
        - "language": A single string. Choose one from: "Korean", "English".

        Here is the content:
        Title: [scraped title]
        Description: [scraped description]
        Content: [scraped body text, truncated to first 4000 characters]
        ```
    4.  Call the Gemini API with the prompt.
    5.  Parse the JSON response from Gemini.
    6.  Return a JSON object to the client containing the scraped `title`, `thumbnail_url` and the AI-generated `summary`, `suggested_categories`, `resource_type`, and `language`.

### 5.5. UI Components

- **`AdminLayout`:** A layout component that wraps all `/admin/*` pages and checks for authentication.
- **`URLInputForm` (`/admin/add`):** A client component with a single text input for the URL and a submit button. Manages form state (URL, loading, error). On submit, it calls the `/api/analyze` endpoint.
- **`ReviewForm` (`/admin/add`):** A form component that is displayed after the API call succeeds. It's pre-filled with the data from the API. It should have editable fields for `title`, `summary`, and multi-select/checkboxes for `categories`. `resource_type` and `language` can be dropdowns. It has a "Approve & Save" button that, on click, inserts/updates the record in the `resources` table in Supabase with `status: 'approved'`.
- **`ResourceCard`:** A component to display a single resource with its thumbnail, title, summary, and tags (categories, type, language).
- **`ResourceDashboard` (`/admin/dashboard`):** The main view. It fetches all resources where `status = 'approved'` from Supabase. It displays them in a grid of `ResourceCard` components. It includes dropdowns to filter the displayed resources by `category` and `resource_type`.

## 6. Testing Plan

The AI agent should generate tests for the following scenarios.

- **Unit Tests (e.g., using Vitest or Jest):**
    - **`analyze` API function:**
        - Given a valid URL, mock the `metascraper` and `Gemini` API calls. Assert that the function returns a correctly structured JSON object.
        - Given an invalid URL, assert that it returns an appropriate error.
        - Given a Gemini API failure, assert that the function handles the error gracefully.
- **Integration Tests (e.g., using React Testing Library):**
    - Test the `URLInputForm` and `ReviewForm` flow.
        - Simulate a user typing a URL and clicking "Analyze".
        - Mock the API response.
        - Assert that the `ReviewForm` is rendered and populated with the mock data.
        - Simulate a user clicking "Approve & Save" and assert that the Supabase client's `insert` method is called with the correct payload.
- **End-to-End Tests (e.g., using Playwright or Cypress):**
    - **Full happy path:**
        1.  Login as admin.
        2.  Navigate to `/admin/add`.
        3.  Paste a real, public URL.
        4.  Click "Analyze".
        5.  Wait for the review form to appear.
        6.  Make a small edit to the summary.
        7.  Click "Approve & Save".
        8.  Assert that the user is on the `/admin/dashboard` page.
        9.  Assert that the new resource card is visible on the dashboard with the edited summary.
        10. Assert that filtering by the resource's category shows the card.
        11. Assert that filtering by a different category hides the card.

## 7. Future Work (Post-MVP)

### Iteration 2: Public Directory & Community Features

- **Goal:** Open the directory to the public and add user engagement features.
- **Input:**
    - Guest users view data.
    - Logged-in users generate `Like` and `Save` events.
- **Processing:**
    - Implement public-facing pages that are server-side rendered (SSR) or statically generated (SSG) for SEO and performance.
    - Add user authentication (e.g., social logins via Supabase Auth).
    - Create `likes` and `saves` tables in the database, linking `user_id` and `resource_id`.
- **Output:**
    - A public, searchable, and filterable resource list.
    - A "Popular" section sorted by `like` counts.
    - A "/saved" page for authenticated users to see their saved items.
    - Like and Save buttons on resource cards (interactive for logged-in users).
    - Social share buttons that use a well-formatted URL for rich previews.
- **Testing:**
    - Verify that non-logged-in users can view but not like/save.
    - Verify that logged-in users' likes/saves are persisted.
    - Verify OG tags for social sharing are correctly generated.

### Iteration 3: Scale & Monetization

- **Goal:** Enhance admin efficiency, add internationalization (i18n), and introduce revenue streams.
- **Input:**
    - Admin can submit a list of URLs (e.g., from a textarea or CSV upload) for bulk processing.
- **Processing:**
    - Implement a background job queue (e.g., using Vercel Cron Jobs or Supabase pg_cron) to process bulk submissions without blocking the UI or causing server timeouts.
    - Integrate an i18n library (e.g., `next-intl`) to manage English and Korean translations.
    - Add a `is_sponsored` boolean field to the `resources` table.
- **Output:**
    - A bulk-add UI in the admin panel with a status monitor for jobs.
    - A language switcher (EN/KR) in the site's header/footer.
    - Sponsored posts are visually highlighted in the resource list.
    - Google AdSense ad slots are placed in non-intrusive locations.
- **Testing:**
    - Verify that submitting 10 URLs in bulk results in 10 new items in the review queue.
    - Verify that the UI text correctly switches between English and Korean.
    - Verify that a resource marked as `is_sponsored` has a distinct visual style.
