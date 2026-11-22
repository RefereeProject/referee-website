/**
 * Brand assets shared by route metadata.
 *
 * Next.js merges metadata shallowly: a route that sets its own `openGraph`
 * replaces the root layout's `openGraph` object entirely, images included.
 * Any route that defines `openGraph` or `twitter` therefore has to pass the
 * image itself. Import it from here so every route points at the same file.
 */

/** 1200 x 630 link preview from the brand kit (LinkedIn, Slack, X). */
export const SOCIAL_IMAGE = {
  url: "/referee-brand-kit/og-image.png",
  width: 1200,
  height: 630,
  alt: "Referee — The Referee Project",
} as const;

/**
 * Browser chrome colour (mobile address bar). Matches the paper background
 * of the sticky header, which is the surface that touches the browser UI.
 * Keep in sync with --brand-paper in src/app/globals.css.
 */
export const THEME_COLOR = "#F7F5F0";
