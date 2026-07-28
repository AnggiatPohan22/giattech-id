// Astro / Vite config runs in Node — dropping @ts-check keeps the
// file working without an @types/node dependency just to type
// `process.env` and `process.cwd()`.
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

// Astro config runs in Node before Vite starts, so import.meta.env
// isn't populated yet. Use Vite's loadEnv() to read .env directly so
// PUBLIC_SITE_URL becomes the canonical `site:` value used by
// Astro.site, sitemap generators, and canonical link tags.
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const siteUrl = env.PUBLIC_SITE_URL || 'https://giattech.com';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4321,
  },
});
