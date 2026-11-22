# The Referee Project

A Next.js 16 web application. Blog posts and site metadata come from a WordPress export; the other pages are hand-written.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **React**: v19.2
- **Styling**: Tailwind CSS v4 with typography plugin, on top of a design-token layer in `src/app/globals.css`
- **Animation**: CSS only (one hero entrance, disabled under "reduce motion")
- **Fonts**: Inter (interface and body), Source Serif 4 (display) and IBM Plex Mono (data only)

## Design System

The look follows the v1 brand kit in `public/referee-brand-kit/` (see its `README.txt`): ink navy, sky, slate and pale blue on a paper background, with the square bracket from the [R] logo as a recurring motif.

All tokens and component styles live in `src/app/globals.css`; its header comment explains how the file is organised. In short: use the role tokens (`--fg`, `--fg-heading`, `--btn-*`) rather than raw palette steps, because navy sections flip those roles for everything inside them. `CLAUDE.md` lists the details that are easy to get wrong.

## Content Management

Blog posts and site metadata are stored in `content/content.json` and accessed via `src/lib/content.ts`. The Home, About, FAQ and Talks pages are written directly in `src/app/*/page.tsx`; the `pages` array in `content.json` is not rendered.

## Environment Variables

Copy `.env.example` to `.env.local`. The `/api/newsletter` endpoint needs `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX` and `MAILCHIMP_AUDIENCE_ID`. `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics and `NEXT_PUBLIC_SITE_URL` sets the metadata base URL.

## Commands

```bash
npm run dev     # development server
npm run build   # production build (includes type-check)
npm run lint    # eslint
npm start       # serve the production build
```

## Markdown Endpoints

The site also serves static markdown versions of key pages from `public/`:

- `/index.md`
- `/about.md`
- `/blog.md`
- `/faq.md`
- `/talks.md`
- `/blog/<slug>.md` for current published posts

These files are static and are not generated from `content.json`. If a new blog post is published, add a matching file under `public/blog/*.md` and add it to the lists in `public/blog.md` and `public/llms-full.txt`.

## Agent Discovery Endpoint

- `/.well-known/agent-card.json`

## Content-Signal Header

Key public HTML and machine-readable endpoints emit:

- `Content-Signal: machine-consumable`

This includes `/`, `/about`, `/blog`, `/blog/<slug>`, `/faq`, `/talks`, plus `/llms*.txt`, `/robots.txt`, `/.well-known/agent-card.json`, and the public markdown endpoints.

## Deployment

The site is deployed on Vercel via `.github/workflows/vercel-deploy.yml`: pushes to `main` deploy to production and pull requests get preview deployments.

### Vercel Project
- Project ID: `prj_r8I7pZwl0G8dMOniXeKJnet7YwYQ`
- Repository: `github.com/RefereeProject/referee-website`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
