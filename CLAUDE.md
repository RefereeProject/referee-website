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

- `src/components/shared/` holds the reusable page-section components, re-exported through `shared/index.ts`. `SectionHead` is the standard opener for a page section. `cn()` in `src/lib/utils.ts` merges class names.
- Shell: `Navbar` is a Server Component; only `NavLinks` (active-link state) and `MobileNav` (menu below 1024px) are Client Components. The 1024px breakpoint is written twice, in `MobileNav.tsx` and in `globals.css`; change both together. `PageIntro` is the navy title band that opens every interior page.

### Design system (`src/app/globals.css`)

Built on the v1 brand kit (`public/referee-brand-kit/README.txt`): ink navy, sky, slate and pale blue on paper. The file's header comment explains its structure; the points that are easy to get wrong:

- **Palette vs role tokens.** `--brand-*` are the kit colours. `--primary-*` is the navy-to-sky scale (the names predate the kit, when they were greens). Do not use palette steps for component colours: use the role tokens (`--fg`, `--fg-heading`, `--fg-muted`, `--fg-link`, `--ring`, `--btn-*`, `--chip-*`). Navy surfaces (`.hero`, `.page-intro`, `.cta-block`, `.site-footer`, `.on-navy`) flip the roles once, so buttons and text inside adapt on their own; cards (`.card-flat`, `.score-card`, `.content-card`, `.on-light`) reset them to light.
- **Layers.** Base and component rules are in `@layer base` / `@layer components`, so Tailwind utilities override them. Two rules are deliberately unlayered, with the reason in a comment: `.container` (must beat Tailwind's own `container` utility) and `.prose-referee` (must beat the typography plugin).
- **Score colours** (`--score-high/medium/low`, `--success/--warning/--error`) are the only non-blue colours. Keep them for data and status.
- **Brand motif: the square bracket** from the [R] logo, used in three places only: `.cite` (the `[1]` markers, via `SectionHead`'s `index` prop), `.bracket-frame` (around the hero score card), and one faint bracket behind navy bands. Use sparingly.
- **Do not hand-write vendor prefixes** next to the standard property (`-webkit-backdrop-filter` beside `backdrop-filter`). The CSS pipeline adds prefixes itself and drops the standard declaration if both are present.
- Fonts (`src/app/layout.tsx`): next/font sets `--font-inter`, `--font-source-serif` and `--font-plex-mono` on `<html>` (not `<body>`: the stylesheet reads them on `:root`). The stacks built from them are `--font-body`, `--font-display` and `--font-mono-stack`. Source Serif 4 is for display, Inter for interface and body, Plex Mono for real data only (IDs, hashes, scores).
- Icons use the App Router file conventions: `src/app/favicon.ico`, `icon.svg` and `apple-icon.png` are copies of the brand-kit files. The shared link-preview image is `SOCIAL_IMAGE` in `src/lib/brand.ts`; a route that sets its own `openGraph` or `twitter` metadata must pass it again, because Next.js merges metadata shallowly.

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
