import type { NextConfig } from "next";
import { SOCIAL_IMAGE } from "./src/lib/brand";

const CONTENT_SIGNAL_HEADER = {
  key: "Content-Signal",
  value: "machine-consumable",
} as const;

const contentSignalSources = [
  "/",
  "/about",
  "/blog",
  "/blog/:slug",
  "/faq",
  "/talks",
  "/llms.txt",
  "/llms-full.txt",
  "/robots.txt",
  "/.well-known/agent-card.json",
  "/index.md",
  "/about.md",
  "/blog.md",
  "/blog/:slug.md",
  "/faq.md",
  "/talks.md",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The pre-refresh link-preview image. LinkedIn, Slack and X cache
        // og:image URLs for months, so old shares still request this path.
        // Sending them to the current image keeps those previews from
        // breaking now that the original file is gone.
        source: "/Referee_new_logo.png",
        destination: SOCIAL_IMAGE.url,
        permanent: true,
      },
    ];
  },
  async headers() {
    return contentSignalSources.map((source) => ({
      source,
      headers: [CONTENT_SIGNAL_HEADER],
    }));
  },
};

export default nextConfig;
