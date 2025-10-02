# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Next.js 15 project called "The Referee Project" that converts WordPress content into a modern web application. The main application lives in the `referee-next/` directory.

Key architecture components:
- **Content Pipeline**: WordPress XML export → parsed JSON → Next.js static content
- **Content Management**: JSON-based content store with pages and posts from WordPress
- **Styling**: Tailwind CSS v4 with custom typography plugin
- **Fonts**: Inter (display) and Geist Mono (monospace)

## Development Commands

All commands should be run from the `referee-next/` directory:

```bash
# Development server
pnpm dev

# Content pipeline (parse WordPress XML and build)
pnpm run content:build

# Parse WordPress XML manually
pnpm run parse:wp "../therefereeproject.WordPress.2025-09-12.xml"

# Build production
pnpm build

# Lint code
pnpm run lint

# Production server
pnpm start
```

## Content Architecture

The project uses a two-phase content system:

1. **WordPress Parser**: `scripts/parse-wordpress.mjs` converts WordPress XML exports to structured JSON
2. **Content Library**: `src/lib/content.ts` provides typed access to pages and posts

Content flow: WordPress XML → `content/content.json` → Next.js pages

### Content Types
- `WPEntry`: WordPress pages/posts with id, title, slug, status, date, link, content, excerpt
- `SiteInfo`: Site metadata (title, link, description)  
- `ContentStore`: Complete content structure with site info, pages, and posts

### Content Functions
- `getContent()`: Returns full content store with caching
- `getSite()`: Returns site metadata
- `getPages()`: Returns published pages only
- `getPosts()`: Returns published posts only
- `findPostBySlug(slug)`: Finds specific post by slug

## Build Process

The build process requires content generation before Next.js build:
1. `pnpm run content:build` - Parses WordPress XML into JSON
2. `next build` - Builds Next.js application with content

The build command in package.json chains these: `pnpm run content:build && next build`

## File Structure

```
referee-next/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── blog/           # Blog listing and individual posts
│   │   ├── faq/            # FAQ page
│   │   ├── layout.tsx      # Root layout with Navbar/Footer
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── Navbar.tsx      # Site navigation
│   │   ├── Footer.tsx      # Site footer  
│   │   ├── Hero.tsx        # Homepage hero section
│   │   ├── ColourfulText.tsx # Animated text component
│   │   └── CardStack.tsx   # Card animation component
│   └── lib/
│       ├── content.ts      # Content access layer
│       └── utils.ts        # Utility functions
├── content/
│   └── content.json        # Generated content from WordPress
├── scripts/
│   └── parse-wordpress.mjs # WordPress XML parser
└── public/                 # Static assets
```

## WordPress Integration

The site consumes content from a WordPress XML export located at the repository root (`therefereeproject.WordPress.2025-09-12.xml`). The parser handles:
- CDATA extraction from WordPress XML
- Post type filtering (pages vs posts)  
- Status filtering (published content only)
- Slug sanitization
- Content and excerpt extraction

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **React**: v19.1.0
- **Styling**: Tailwind CSS v4 with typography plugin
- **Animation**: Framer Motion v12
- **Content**: XML parsing (xml2js), HTML sanitization (sanitize-html)
- **TypeScript**: Full type coverage
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js presets