# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"The Referee Project" marketing/content site (Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict). Deployed to Vercel. There is no test suite; `npm run lint` and `npm run build` (which type-checks) are the checks.

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build (also runs the TypeScript check)
npm run lint    # eslint (flat config: next core-web-vitals + typescript)
npm start       # serve the production build
npx tsc --noEmit  # type-check only
```

Node is managed by [mise](https://mise.jdx.dev/) (not nvm); CI uses Node 20. Path alias: `@/*` → `src/*`.

## Architecture

### Where page content actually lives

Content is split, which is easy to get wrong:

- **Blog posts and site metadata** come from `content/content.json` (a one-time WordPress export) through `src/lib/content.ts` (`getSite`, `getPosts`, `findPostBySlug`; filters to `status === 'publish'`). `getContent` is wrapped in `React.cache` for per-request dedup and reads `content/content.json` from `process.cwd()` (it also checks `referee-next/content/` as a legacy path). Only `blog/`, `blog/[slug]/`, `faq/` and the root layout read from it.
- **Home, About, FAQ, Talks pages are hand-written TSX** in `src/app/*/page.tsx`. The `pages` array in `content.json` is leftover WordPress data and is not rendered; editing it changes nothing on the site.
- Blog post HTML is rendered with `dangerouslySetInnerHTML` only after passing through `sanitize-html` with an explicit tag/attribute allowlist (`src/app/blog/[slug]/page.tsx`). Extend that allowlist rather than bypassing it.

### Copy and brand voice

`src/lib/copy.ts` centralises preferred terminology, banned hero terms (e.g. "founder-led", "pre-seed", "startup") and tone rules (clinical, restrained, no hype). It is imported by the home, talks, Hero and Footer code. Check it before writing user-facing copy.

### SEO / machine-readable surface (duplicated by hand)

The site deliberately serves content to agents as well as browsers. These are static files in `public/` and are **not generated** from `content.json` or the TSX pages, so they must be updated manually when content changes:

- `public/{index,about,blog,faq,talks}.md` and `public/blog/<slug>.md`: markdown mirrors of pages. **Publishing a new post requires adding a matching `public/blog/<slug>.md`.**
- `public/llms.txt`, `public/llms-full.txt`, `public/robots.txt`, `public/.well-known/agent-card.json`.
- `next.config.ts` adds a `Content-Signal: machine-consumable` header to an explicit list of routes. A new public route or markdown endpoint needs adding to `contentSignalSources` there.
- JSON-LD is built in `src/lib/structuredData.ts` (Organization, Article, FAQ) and injected via `serializeJsonLd` in the layout, blog post page and FAQ page.

### Components and styling

- `src/components/shared/` holds the reusable page-section components, re-exported through `shared/index.ts`.
- Styling is Tailwind v4 plus a large hand-written design-token layer in `src/app/globals.css` (CSS variables such as `--primary-*`, `--ink`, `--surface-*`, `--score-*`). Prefer these tokens over new hard-coded colours. `cn()` in `src/lib/utils.ts` merges class names.
- Fonts (`src/app/layout.tsx`): Inter (`--font-sans`), Source Serif 4 (`--font-serif`, used for display), IBM Plex Mono (`--font-mono`).

### API

`POST /api/newsletter` (`src/app/api/newsletter/route.ts`) validates input and subscribes to Mailchimp with `status: "pending"` (double opt-in). Requires `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_AUDIENCE_ID`; see `.env.example`. `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics and `NEXT_PUBLIC_SITE_URL` sets `metadataBase` (defaults to `https://referee-project.com`).

### Deployment

`.github/workflows/vercel-deploy.yml` builds with the Vercel CLI (`vercel pull`, `vercel build`, `vercel deploy --prebuilt`) on push to `main` (production) and on PRs (preview).

## Git push auth recovery

This repo pushes to **RefereeProject/** on github.com. If `git push`, `gh pr create`,
`gh pr merge`, `gh api`, or any remote write fails with an authentication
error — `403`, `401`, `Permission denied`, `Permission to ... denied`,
`could not read Username`, `Resource not accessible by integration`, or
`The requested URL returned error: 40[13]` — the active `gh` account is
wrong. **Do not stop.** Recover automatically:

1. `gh auth status --hostname github.com` — note the active account.
2. If it is not `RefereeProject`, run `gh auth switch --user RefereeProject`.
3. Re-run the failed command exactly once.
4. Only if it still fails after the switch, surface the error to the user.

Never ask the user to switch accounts manually — just switch. The same
rule applies to SSH-origin pushes (`git@github.com:RefereeProject/...`); `gh auth
switch` also rewrites the ssh key gh wraps around.

## Beads → GitHub backup

bd v1.0.3 auto-backs-up issue state to GitHub. Every `bd` write command exports `.beads/issues.jsonl` and stages it (throttled). When a git remote is configured, bd also auto-pushes the export every ~15min. Git hooks (`bd hooks list`) ensure consistency on commit/pull/push.

**At session close:** just `git add .beads && git commit && git push` — there is no `bd sync` step; that command was removed in v1.0.x.
