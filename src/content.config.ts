import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const team = z.array(z.object({ name: z.string(), avatar: z.string().optional(), role: z.string().optional() }));

const projects = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    name: z.string().optional(),
    room: z.enum(["data", "infra", "darkroom", "foundations"]).default("foundations"),
    impact: z.string().optional(),
    status: z.enum(["completed", "in_progress"]).default("completed"),
    kind: z.enum(["personal", "academic", "internship", "workstudy"]).default("personal"),
    stack: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    team: team.optional(),
    link: z.string().optional(),
    updates: z.array(z.object({ date: z.coerce.date(), text: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    type: z.enum(["note", "article"]).default("article"),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/photos" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    film: z.string().optional(),
    camera: z.string().optional(),
    developer: z.string().optional(),
    scan: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts, photos };
