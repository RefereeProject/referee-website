# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Next.js 15 project called "The Referee Project".

Key architecture components:
- **Content Management**: JSON-based content store (`content/content.json`) with pages and posts
- **Styling**: Tailwind CSS v4 with custom typography plugin
- **Fonts**: Inter (display) and JetBrains Mono (monospace)

## Development Commands

All commands should be run from the repository root:

```bash
# Development server
pnpm dev

# Build production
pnpm build

# Lint code
pnpm run lint

# Production server
pnpm start
```

## Content Architecture

The project uses a simple JSON-based content system:

- **Content Store**: Pre-generated `content/content.json` contains all site content (migrated from WordPress)
- **Content Library**: `src/lib/content.ts` provides typed access to pages and posts

### Content Types
- `WPEntry`: WordPress pages/posts with id, title, slug, status, date, link, content, excerpt
- `SiteInfo`: Site metadata (title, link, description)  
- `ContentStore`: Complete content structure with site info, pages, and posts

### Content Functions
- `getContent()`: Returns full content store with caching (checks both `./content/content.json` and `./referee-next/content/content.json` paths)
- `getSite()`: Returns site metadata
- `getPages()`: Returns published pages only
- `getPosts()`: Returns published posts only
- `findPostBySlug(slug)`: Finds specific post by slug

## Build Process

Standard Next.js build process:
- `pnpm build` - Builds the Next.js application
- Content is pre-generated and committed in `content/content.json`

## File Structure

```
/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog listing and individual posts
│   │   ├── faq/            # FAQ page
│   │   ├── layout.tsx      # Root layout with Navbar/Footer
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── Navbar.tsx      # Site navigation
│   │   ├── Footer.tsx      # Site footer  
│   │   ├── Hero.tsx        # Homepage hero section
│   │   ├── ColourfulText.tsx # Animated text component
│   │   ├── CardStack.tsx   # Card animation component
│   │   └── aurora-background.tsx # Aurora effect background
│   └── lib/
│       ├── content.ts      # Content access layer
│       └── utils.ts        # Utility functions (cn helper)
├── content/
│   └── content.json        # Pre-generated content (migrated from WordPress)
└── public/                 # Static assets
```

## Content Management

Content is stored in `content/content.json` (pre-migrated from WordPress). To update content, manually edit this JSON file.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **React**: v19.1.0
- **Styling**: Tailwind CSS v4 with typography plugin
- **Animation**: Framer Motion v12
- **Content**: HTML sanitization (sanitize-html)
- **TypeScript**: Full type coverage
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js presets
- **Utilities**: class-variance-authority, clsx, tailwind-merge, lucide-react

## Font Configuration

The project uses two Google Fonts configured in `src/app/layout.tsx`:
- **Inter**: Display font (weights 300-900) via `--font-display` CSS variable
- **JetBrains Mono**: Monospace font via `--font-mono` CSS variable