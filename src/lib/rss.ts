import { postsFor } from "./content";
import type { Lang } from "../i18n";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function rss(lang: Lang, site: URL) {
  const base = site.href.replace(/\/$/, "");
  const home = lang === "fr" ? `${base}/fr` : `${base}/`;
  const posts = (await postsFor(lang)).map((x) => x.entry);
  const items = posts.map((p) => {
    const url = `${base}${lang === "fr" ? "/fr" : ""}/blog/${p.id}`;
    return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${p.data.publishedAt.toUTCString()}</pubDate><description>${esc(p.data.summary)}</description>${p.data.tags.map((t) => `<category>${esc(t)}</category>`).join("")}</item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Aemane Mouteirou — Journal</title><link>${home}</link><description>${lang === "fr" ? "Notes et articles sur la donnée, l'infrastructure et la photo argentique." : "Notes and write-ups on data, infrastructure and analogue film."}</description><language>${lang}</language><atom:link href="${base}${lang === "fr" ? "/fr" : ""}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
