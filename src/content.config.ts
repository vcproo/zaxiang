import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    tags: z.array(z.string()).default([]), level: z.string().default('入门'),
    featured: z.boolean().default(false), draft: z.boolean().default(false),
    series: z.string().optional(), order: z.number().optional(), kicker: z.string().optional(),
    locale: z.enum(['zh', 'en']).optional(),
  }),
});
export const collections = { tutorials };
