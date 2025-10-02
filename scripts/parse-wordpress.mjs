import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getArgPathOrDefault() {
  const passed = process.argv[2];
  if (passed) return path.resolve(process.cwd(), passed);
  return path.resolve(__dirname, '..', '..', 'therefereeproject.WordPress.2025-09-12.xml');
}

function pickFirst(value) {
  if (value == null) return '';
  if (Array.isArray(value)) return pickFirst(value[0]);
  if (typeof value === 'object' && value !== null) {
    if ('#cdata' in value) return value['#cdata'] ?? '';
    if ('_' in value) return value['_'] ?? '';
  }
  return String(value ?? '');
}

function sanitizeSlug(slug) {
  return slug?.toString().trim().replace(/\/+$/g, '') || '';
}

async function main() {
  const xmlPath = getArgPathOrDefault();
  const xml = await readFile(xmlPath, 'utf8');
  const data = await parseStringPromise(xml, {
    explicitArray: true,
    explicitRoot: false,
    trim: false,
    normalize: false,
    normalizeTags: false,
    mergeAttrs: true,
    cdata: true,
    explicitChildren: false,
  });

  const channel = data?.channel?.[0] ?? {};
  const site = {
    title: pickFirst(channel.title),
    link: pickFirst(channel.link),
    description: pickFirst(channel.description),
  };

  const items = channel.item || [];
  const pages = [];
  const posts = [];

  for (const item of items) {
    const postType = pickFirst(item['wp:post_type']);
    if (!postType) continue;
    const entry = {
      id: pickFirst(item['wp:post_id']),
      title: pickFirst(item.title),
      slug: sanitizeSlug(pickFirst(item['wp:post_name'])),
      status: pickFirst(item['wp:status']),
      date: pickFirst(item['wp:post_date']),
      link: pickFirst(item.link),
      content: pickFirst(item['content:encoded']),
      excerpt: pickFirst(item['excerpt:encoded']),
    };

    if (postType === 'page') pages.push(entry);
    if (postType === 'post') posts.push(entry);
  }

  const outDir = path.resolve(__dirname, '..', 'content');
  await mkdir(outDir, { recursive: true });
  const output = { site, pages, posts };
  const outFile = path.join(outDir, 'content.json');
  await writeFile(outFile, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Parsed: ${pages.length} pages, ${posts.length} posts -> ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

