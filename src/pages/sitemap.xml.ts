import type { APIRoute } from 'astro';

const routes = ['/'];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://giattech.com';
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = routes
    .map(
      (path) =>
        `  <url>\n    <loc>${origin}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
