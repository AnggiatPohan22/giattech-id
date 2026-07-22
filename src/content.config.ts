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
    accent: z.enum(['sage', 'stone', 'clay', 'ocean']).default('sage'),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
};
