import type { NextConfig } from "next";

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
  async headers() {
    return contentSignalSources.map((source) => ({
      source,
      headers: [CONTENT_SIGNAL_HEADER],
    }));
  },
};

export default nextConfig;
