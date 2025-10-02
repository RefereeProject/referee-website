import { readFileSync, existsSync } from 'fs';
import path from 'path';

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

let cached: ContentStore | null = null;

export function getContent(): ContentStore {
  if (cached) return cached;
  const filePath = path.join(process.cwd(), 'referee-next', 'content', 'content.json');
  const altPath = path.join(process.cwd(), 'content', 'content.json');
  const finalPath = existsSync(filePath) ? filePath : altPath;
  const raw = readFileSync(finalPath, 'utf8');
  cached = JSON.parse(raw) as ContentStore;
  return cached;
}

export function getSite(): SiteInfo {
  return getContent().site;
}

export function getPages(): WPEntry[] {
  return getContent().pages.filter((p) => p.status === 'publish' || p.status === '');
}

export function getPosts(): WPEntry[] {
  return getContent().posts.filter((p) => p.status === 'publish' || p.status === '');
}

export function findPostBySlug(slug: string): WPEntry | undefined {
  return getPosts().find((p) => p.slug === slug);
}


