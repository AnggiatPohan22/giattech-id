import type { APIRoute } from 'astro';
import { getAllPosts } from '../utils/blog';
import { blogCategories } from '../data/blog-categories';
import { routes, blogLangs } from '../data/blog-i18n';

interface Entry {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  lastmod?: string;
  /** hreflang alternates for this URL, including itself */
  alternates?: { hreflang: string; path: string }[];
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Sitemap covering the landing page and the full bilingual blog.
 * Every blog URL carries xhtml:link alternates so Google pairs the
 * id/en versions instead of treating them as duplicates.
 */
async function buildEntries(): Promise<Entry[]> {
  const today = iso(new Date());
  const entries: Entry[] = [
    { path: '/', changefreq: 'monthly', priority: '1.0', lastmod: today },
  ];

  // Blog hubs, in both languages
  const hubs = [
    { kind: 'home' as const,    priority: '0.9', changefreq: 'weekly' as const },
    { kind: 'archive' as const, priority: '0.6', changefreq: 'weekly' as const },
    { kind: 'tools' as const,   priority: '0.6', changefreq: 'monthly' as const },
    { kind: 'about' as const,   priority: '0.5', changefreq: 'yearly' as const },
  ];

  for (const hub of hubs) {
    for (const lang of blogLangs) {
      entries.push({
        path: routes[hub.kind](lang),
        changefreq: hub.changefreq,
        priority: hub.priority,
        lastmod: today,
        alternates: blogLangs.map((l) => ({
          hreflang: l,
          path: routes[hub.kind](l),
        })),
      });
    }
  }

  // Category archives
  for (const cat of blogCategories) {
    for (const lang of blogLangs) {
      entries.push({
        path: routes.category(lang, cat.slug),
        changefreq: 'weekly',
        priority: '0.7',
        lastmod: today,
        alternates: blogLangs.map((l) => ({
          hreflang: l,
          path: routes.category(l, cat.slug),
        })),
      });
    }
  }

  // Articles — alternates resolved through translationKey so a post
  // without a translation simply lists itself.
  const posts = await getAllPosts();
  for (const post of posts) {
    const siblings = posts.filter(
      (p) => p.data.translationKey === post.data.translationKey
    );
    entries.push({
      path: routes.post(post.data.lang, post.data.slug),
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: iso(post.data.updatedDate ?? post.data.publishDate),
      alternates: siblings.map((p) => ({
        hreflang: p.data.lang,
        path: routes.post(p.data.lang, p.data.slug),
      })),
    });
  }

  return entries;
}

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? 'https://giattech.com').replace(/\/$/, '');
  const entries = await buildEntries();

  const urls = entries
    .map((e) => {
      const alt = (e.alternates ?? [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${origin}${a.path}" />`
        )
        .join('\n');
      return [
        '  <url>',
        `    <loc>${origin}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : '',
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        alt,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
