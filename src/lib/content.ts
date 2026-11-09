import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n";

export type Resolved<K extends "projects" | "posts"> = { entry: CollectionEntry<K>; fallback: boolean };

/**
 * Projets dans la langue demandée. Si une traduction française manque,
 * on retombe sur la version anglaise (fallback = true) pour ne jamais casser une page.
 */
export async function projectsFor(lang: Lang): Promise<Resolved<"projects">[]> {
  const en = (await getCollection("projects", (p) => !p.data.draft)).sort((a, b) => +b.data.publishedAt - +a.data.publishedAt);
  if (lang === "en") return en.map((entry) => ({ entry, fallback: false }));
  const fr = new Map((await getCollection("projects_fr", (p) => !p.data.draft)).map((e) => [e.id, e as unknown as CollectionEntry<"projects">]));
  return en.map((e) => (fr.has(e.id) ? { entry: fr.get(e.id)!, fallback: false } : { entry: e, fallback: true }));
}

export async function postsFor(lang: Lang): Promise<Resolved<"posts">[]> {
  const en = (await getCollection("posts", (p) => !p.data.draft)).sort((a, b) => +b.data.publishedAt - +a.data.publishedAt);
  if (lang === "en") return en.map((entry) => ({ entry, fallback: false }));
  const fr = new Map((await getCollection("posts_fr", (p) => !p.data.draft)).map((e) => [e.id, e as unknown as CollectionEntry<"posts">]));
  return en.map((e) => (fr.has(e.id) ? { entry: fr.get(e.id)!, fallback: false } : { entry: e, fallback: true }));
}
