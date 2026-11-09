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
    impact: z.string().optional(),
    status: z.enum(["completed", "in_progress"]).default("completed"),
    kind: z.enum(["personal", "academic", "internship"]).default("personal"),
    stack: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    team: team.optional(),
    link: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
