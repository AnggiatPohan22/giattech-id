import type { APIRoute } from 'astro';
import { site } from '../config/site';

/**
 * Dynamic robots.txt — the sitemap URL follows PUBLIC_SITE_URL from
 * .env so it stays in sync when the domain changes. Rendered at
 * build time; the request handler is only used in dev.
 */
export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${site.url.replace(/\/$/, '')}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
