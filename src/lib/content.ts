import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { cache } from 'react';

export type SiteInfo = { title: string; link: string; description: string };
export type WPEntry = {
  id: string;
  title: string;
  slug: string;
  status: string;
  date: string;
  link: string;
  content: string;
  excerpt?: string;
};

export type ContentStore = {
  site: SiteInfo;
  pages: WPEntry[];
  posts: WPEntry[];
};

/** Per-request deduplication via React.cache(); avoids module-global caching pitfalls in serverless */
export const getContent = cache(async (): Promise<ContentStore> => {
  const filePath = path.join(process.cwd(), 'referee-next', 'content', 'content.json');
  const altPath = path.join(process.cwd(), 'content', 'content.json');
  const finalPath = existsSync(filePath) ? filePath : altPath;
  const raw = await readFile(finalPath, 'utf8');
  return JSON.parse(raw) as ContentStore;
});

export async function getSite(): Promise<SiteInfo> {
  const content = await getContent();
  return content.site;
}

export async function getPages(): Promise<WPEntry[]> {
  const content = await getContent();
  return content.pages.filter((p) => p.status === 'publish' || p.status === '');
}

/**
 * Published posts, newest first.
 *
 * Sorted here instead of trusting the order in content.json: the blog index
 * marks the first post as "Latest", so a post added out of order would
 * otherwise take that slot. WordPress exports dates as fixed-width
 * "YYYY-MM-DD HH:MM:SS" strings, which sort correctly as plain text.
 * content.json is not validated when it is read, so a post without a date
 * is treated as "" (sorted last) instead of crashing the comparison.
 */
export async function getPosts(): Promise<WPEntry[]> {
  const content = await getContent();
  return content.posts
    .filter((p) => p.status === 'publish' || p.status === '')
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

/** Finds a post by slug or id to handle both URL patterns consistently */
export async function findPostBySlug(slugOrId: string): Promise<WPEntry | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slugOrId || p.id === slugOrId);
}
