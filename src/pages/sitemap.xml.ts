import type { APIRoute } from 'astro';
import { getAllPosts, type Post } from '../utils/blog';
import { blogCategories, type BlogLang } from '../data/blog-categories';
import { routes, blogLangs } from '../data/blog-i18n';
import { site } from '../config/site';

/**
 * ─────────────────────────────────────────────────────────────
 *  Sitemap — tuned for Google Search Console
 * ─────────────────────────────────────────────────────────────
 *
 *  Enriched over the vanilla Astro sitemap in three ways:
 *
 *  1. Stable per-URL `<lastmod>`. Listing pages (blog hub, category,
 *     archive) inherit the newest post date in their scope, not
 *     `new Date()` — so an unchanged sitemap doesn't churn on every
 *     rebuild and Google's crawl-budget heuristic stays honest.
 *
 *  2. `<xhtml:link rel="alternate" hreflang>` pairing on every
 *     bilingual URL. Both language pages point at each other AND
 *     declare an x-default so Google doesn't file them as duplicates.
 *
 *  3. `<image:image>` entries per post surface the cover art in
 *     GSC's Images tab, with the post title as the caption. The
 *     landing page ships its Open Graph image the same way.
 *
 *  All 49 URLs fit in one file (spec caps at 50k / 50 MB), so no
 *  sitemap index is needed. If the blog grows past that, split
 *  into /sitemap-id.xml / /sitemap-en.xml / /sitemap-images.xml
 *  behind a /sitemap.xml index.
 */

interface ImageEntry {
  loc: string;
  title?: string;
  caption?: string;
}

interface Entry {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  lastmod: string;
  alternates?: { hreflang: string; path: string }[];
  images?: ImageEntry[];
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const abs = (origin: string, path: string) => `${origin}${path}`;

/** Pick the freshest post date in a set — used for hub/category lastmod. */
function freshest(posts: Post[]): Date {
  if (posts.length === 0) return new Date();
  return posts.reduce((max, p) => {
    const d = p.data.updatedDate ?? p.data.publishDate;
    return d > max ? d : max;
  }, new Date(0));
}

async function buildEntries(origin: string): Promise<Entry[]> {
  const allPosts = await getAllPosts();
  const byLang: Record<BlogLang, Post[]> = { id: [], en: [] };
  for (const p of allPosts) byLang[p.data.lang].push(p);

  // Site-wide freshness — the newest date across everything. Used for the
  // landing page and static blog pages (tools/about) that don't have a
  // natural "last updated" of their own.
  const siteFresh = freshest(allPosts);

  const entries: Entry[] = [];

  // ── Landing page ─────────────────────────────────────────────
  const landingImages: ImageEntry[] = [];
  if (site.ogImage) {
    landingImages.push({
      loc: site.ogImage.startsWith('http') ? site.ogImage : abs(origin, site.ogImage),
      title: site.name,
      caption: site.description,
    });
  }
  entries.push({
    path: '/',
    changefreq: 'monthly',
    priority: '1.0',
    lastmod: iso(siteFresh),
    images: landingImages,
  });

  // ── Blog hubs — freshness of newest post per language ────────
  for (const lang of blogLangs) {
    const langFresh = freshest(byLang[lang]);

    entries.push({
      path: routes.home(lang),
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: iso(langFresh),
      alternates: blogLangs.map((l) => ({ hreflang: l, path: routes.home(l) })),
    });
    entries.push({
      path: routes.archive(lang),
      changefreq: 'weekly',
      priority: '0.6',
      lastmod: iso(langFresh),
      alternates: blogLangs.map((l) => ({ hreflang: l, path: routes.archive(l) })),
    });
    entries.push({
      path: routes.about(lang),
      changefreq: 'yearly',
      priority: '0.5',
      lastmod: iso(siteFresh),
      alternates: blogLangs.map((l) => ({ hreflang: l, path: routes.about(l) })),
    });
    entries.push({
      path: routes.tools(lang),
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: iso(siteFresh),
      alternates: blogLangs.map((l) => ({ hreflang: l, path: routes.tools(l) })),
    });
  }

  // ── Category archives — freshness of newest post in category ──
  for (const cat of blogCategories) {
    for (const lang of blogLangs) {
      const inCat = byLang[lang].filter((p) => p.data.category === cat.slug);
      entries.push({
        path: routes.category(lang, cat.slug),
        changefreq: 'weekly',
        priority: '0.7',
        lastmod: iso(freshest(inCat)),
        alternates: blogLangs.map((l) => ({ hreflang: l, path: routes.category(l, cat.slug) })),
      });
    }
  }

  // ── Articles — siblings paired via translationKey ────────────
  for (const post of allPosts) {
    const siblings = allPosts.filter(
      (p) => p.data.translationKey === post.data.translationKey
    );
    const cover = post.data.cover;
    const images: ImageEntry[] = cover
      ? [
          {
            loc: cover.startsWith('http') ? cover : abs(origin, cover),
            title: post.data.title,
            caption: post.data.description,
          },
        ]
      : [];
    entries.push({
      path: routes.post(post.data.lang, post.data.slug),
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: iso(post.data.updatedDate ?? post.data.publishDate),
      alternates: siblings.map((p) => ({
        hreflang: p.data.lang,
        path: routes.post(p.data.lang, p.data.slug),
      })),
      images,
    });
  }

  return entries;
}

/** XML-safe: sitemap image titles/captions can carry any user text. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site: astroSite }) => {
  const origin = (astroSite?.origin ?? site.url).replace(/\/$/, '');
  const entries = await buildEntries(origin);

  const urls = entries
    .map((e) => {
      const alts = e.alternates ?? [];
      // Emit the canonical set plus x-default → Indonesian (the site's
      // primary market). Matches BlogLayout's own hreflang tags exactly.
      const altXml = alts.length
        ? [
            ...alts.map(
              (a) =>
                `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${origin}${a.path}" />`
            ),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${
              (alts.find((a) => a.hreflang === 'id') ?? alts[0]).path
            }" />`,
          ].join('\n')
        : '';

      const imgXml = (e.images ?? [])
        .map((img) => {
          const parts = [`      <image:loc>${esc(img.loc)}</image:loc>`];
          if (img.title) parts.push(`      <image:title>${esc(img.title)}</image:title>`);
          if (img.caption) parts.push(`      <image:caption>${esc(img.caption)}</image:caption>`);
          return `    <image:image>\n${parts.join('\n')}\n    </image:image>`;
        })
        .join('\n');

      return [
        '  <url>',
        `    <loc>${origin}${e.path}</loc>`,
        `    <lastmod>${e.lastmod}</lastmod>`,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        altXml,
        imgXml,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Search engines re-fetch sitemaps periodically; a modest cache
      // keeps traffic reasonable without stopping fresh crawls.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
