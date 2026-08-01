/**
 * ─────────────────────────────────────────────────────────────
 *  Blog query helpers
 * ─────────────────────────────────────────────────────────────
 *
 * Everything that touches the `blog` content collection funnels
 * through here so pages stay thin and the draft filter can never
 * be forgotten on one route.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { BlogLang } from '../data/blog-categories';

export type Post = CollectionEntry<'blog'>;

const isPublished = (p: Post) => import.meta.env.DEV || !p.data.draft;

/** All posts for one language, newest first. */
export async function getPosts(lang: BlogLang): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => p.data.lang === lang && isPublished(p));
  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

/** Every post in every language — used by the sitemap. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', isPublished);
  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

export async function getPostsByCategory(
  lang: BlogLang,
  category: string
): Promise<Post[]> {
  return (await getPosts(lang)).filter((p) => p.data.category === category);
}

/**
 * Same article in the other language, matched on `translationKey`.
 * Returns undefined when a translation hasn't been written yet, so
 * callers can hide the switcher instead of linking to a 404.
 */
export async function getTranslation(
  post: Post,
  target: BlogLang
): Promise<Post | undefined> {
  const posts = await getCollection(
    'blog',
    (p) => p.data.lang === target && p.data.translationKey === post.data.translationKey
  );
  return posts[0];
}

/**
 * Up to `limit` posts related to `post`: same category first, then
 * anything sharing a tag, then newest — never including itself.
 */
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const pool = (await getPosts(post.data.lang)).filter((p) => p.id !== post.id);
  const score = (p: Post) => {
    let s = p.data.category === post.data.category ? 100 : 0;
    s += p.data.tags.filter((tag) => post.data.tags.includes(tag)).length * 10;
    return s;
  };
  return pool
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.data.publishDate.getTime() - a.p.data.publishDate.getTime())
    .slice(0, limit)
    .map((x) => x.p);
}

/** Previous / next by publish date within the same language. */
export async function getNeighbours(post: Post) {
  const posts = await getPosts(post.data.lang);
  const i = posts.findIndex((p) => p.id === post.id);
  return {
    // posts[] is newest-first, so the *newer* article sits at i-1
    next: i > 0 ? posts[i - 1] : undefined,
    prev: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

/** ~200 wpm for Indonesian/English prose, minimum 1 minute. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Tag cloud across a language, most-used first. */
export function collectTags(posts: Post[], limit = 14): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

/** Group posts by "Month Year" for the archive page, newest group first. */
export function groupByMonth(posts: Post[]): { key: string; date: Date; posts: Post[] }[] {
  const groups = new Map<string, { key: string; date: Date; posts: Post[] }>();
  for (const p of posts) {
    const d = p.data.publishDate;
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        date: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)),
        posts: [],
      });
    }
    groups.get(key)!.posts.push(p);
  }
  return [...groups.values()].sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Pull `## ` headings out of raw markdown to build the article's
 * table of contents. Astro's own `headings` from render() is richer,
 * but this keeps the ToC available before render for the sidebar.
 */
export function extractHeadings(body: string): { depth: number; text: string; slug: string }[] {
  const out: { depth: number; text: string; slug: string }[] = [];
  const fence = /^```/;
  let inCode = false;
  for (const line of body.split('\n')) {
    if (fence.test(line.trim())) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, '');
    out.push({ depth: m[1].length, text, slug: slugifyHeading(text) });
  }
  return out;
}

/** Matches Astro/GitHub heading anchor generation closely enough for a ToC. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}
