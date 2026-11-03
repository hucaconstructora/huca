import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Project image paths in Markdown are relative to that Markdown file. For
 * example: ../../assets/projects/<slug>/cover.jpg. Astro resolves these with
 * the content image helper, so new CMS-uploaded files are discovered at build
 * time without one-off imports in application code.
 */
const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.md',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().trim().min(1).max(140),
      slug: z
        .string()
        .trim()
        .max(80)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa minúsculas, números y guiones.'),
      summary: z.string().trim().min(1).max(320),
      description: z.string().trim().min(1),
      challenge: z.string().trim().nullish(),
      approach: z.string().trim().nullish(),
      cover: image(),
      coverAlt: z.string().trim().min(1),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().trim().min(1),
          }),
        )
        .min(1),
      location: z.string().trim().min(1),
      region: z.string().trim().nullish(),
      city: z.string().trim().nullish(),
      projectType: z.string().trim().min(1),
      year: z.coerce.number().int().min(1900).max(2100),
      builtAreaM2: z.number().positive().nullish(),
      client: z.string().trim().nullish(),
      budget: z.string().trim().nullish(),
      sector: z.string().trim().nullish(),
      subSector: z.string().trim().nullish(),
      status: z.enum(['draft', 'published', 'archived']).default('draft'),
      featured: z.boolean().default(false),
      order: z.coerce.number().int().default(0),
      seoTitle: z.string().trim().max(70).nullish(),
      seoDescription: z.string().trim().max(160).nullish(),
    }),
});

const services = defineCollection({
  loader: glob({
    base: './src/content/services',
    pattern: '**/*.md',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().trim().min(1).max(120),
      slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa minúsculas, números y guiones.'),
      tagline: z.string().trim().min(1),
      description: z.string().trim().min(1),
      details: z.string().trim().min(1),
      includes: z.array(z.string().trim().min(1)).min(1),
      cover: image(),
      coverAlt: z.string().trim().min(1),
      order: z.coerce.number().int().default(0),
    }),
});

const partners = defineCollection({
  loader: glob({
    base: './src/content/partners',
    pattern: '**/*.md',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().trim().min(1).max(120),
      logo: image(),
      logoAlt: z.string().trim().min(1).max(180),
      order: z.coerce.number().int().default(0),
      featured: z.boolean().default(true),
    }),
});

export const collections = { projects, services, partners };
