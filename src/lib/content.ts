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

export async function getPosts(): Promise<WPEntry[]> {
  const content = await getContent();
  return content.posts.filter((p) => p.status === 'publish' || p.status === '');
}

/** Finds a post by slug or id to handle both URL patterns consistently */
export async function findPostBySlug(slugOrId: string): Promise<WPEntry | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slugOrId || p.id === slugOrId);
}
