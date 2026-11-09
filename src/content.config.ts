import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const team = z.array(z.object({ name: z.string(), avatar: z.string().optional(), role: z.string().optional() }));

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
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
});

const postSchema = z.object({
  title: z.string(),
  summary: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  publishedAt: z.coerce.date(),
  type: z.enum(["note", "article"]).default("article"),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  draft: z.boolean().default(false),
});

// Anglais : langue par défaut. Français : même nom de fichier dans projects-fr / posts-fr.
const projects = defineCollection({ loader: glob({ pattern: "*.mdx", base: "./src/content/projects" }), schema: projectSchema });
const projects_fr = defineCollection({ loader: glob({ pattern: "*.mdx", base: "./src/content/projects-fr" }), schema: projectSchema });
const posts = defineCollection({ loader: glob({ pattern: "*.mdx", base: "./src/content/posts" }), schema: postSchema });
const posts_fr = defineCollection({ loader: glob({ pattern: "*.mdx", base: "./src/content/posts-fr" }), schema: postSchema });

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

export const collections = { projects, projects_fr, posts, posts_fr, photos };
