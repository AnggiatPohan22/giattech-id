import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().int(),
    order: z.number().int(),
    tags: z.array(z.string()).min(1),
    role: z.string().optional(),
    client: z.string().optional(),
    url: z.url().optional(),
    thumbnail: z.string().optional(),
    /** Optional looping background video (mp4/webm) — takes priority over thumbnail */
    video: z.string().optional(),
    accent: z.enum(['sage', 'stone', 'clay', 'ocean']).default('sage'),
    featured: z.boolean().default(false),
  }),
});

/**
 * Blog — bilingual. Files live in `src/content/blog/<lang>/<slug>.md`
 * so the entry id is `id/my-slug` / `en/my-slug`. `translationKey`
 * pairs the two language versions of the same article for the
 * language switcher and hreflang tags.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Meta description — keep to ~150-160 chars for SERP display */
    description: z.string(),
    lang: z.enum(['id', 'en']),
    /** URL slug, WITHOUT the language prefix. Must be unique per language. */
    slug: z.string(),
    /** Same value on the id/en pair of one article — used for hreflang */
    translationKey: z.string(),
    category: z.enum([
      'tutorial-panduan',
      'tips-bisnis-digital',
      'teknologi-tools',
      'portofolio',
      'opini-insight',
    ]),
    tags: z.array(z.string()).default([]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Giattech'),
    /** Optional real cover image (from public/). Falls back to generated CoverArt. */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Slug of an entry in the `projects` collection to cross-link */
    relatedProject: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  blog,
};
