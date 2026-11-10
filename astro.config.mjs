import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import remarkMermaidStatic from "./src/plugins/remark-mermaid-static.mjs";
import { readdirSync, readFileSync } from "node:fs";

// Date de dernière modification des pages de contenu (sitemap) : la date de publication.
const lastmod = new Map();
for (const [dir, route, prefix] of [["projects", "work", ""], ["projects-fr", "work", "/fr"], ["posts", "blog", ""], ["posts-fr", "blog", "/fr"]]) {
  for (const f of readdirSync(`./src/content/${dir}`).filter((x) => x.endsWith(".mdx"))) {
    const d = readFileSync(`./src/content/${dir}/${f}`, "utf8").match(/^publishedAt: "?([\d-]+)"?/m)?.[1];
    if (d && !/^draft: true/m.test(readFileSync(`./src/content/${dir}/${f}`, "utf8"))) lastmod.set(`${prefix}/${route}/${f.replace(".mdx", "")}`, new Date(d).toISOString());
  }
}

export default defineConfig({
  site: "https://www.aemanemouteirou.com",
  trailingSlash: "never",
  // CSS intégré dans le HTML (≈ 9 Ko au total) : plus de feuilles de style qui bloquent le rendu.
  build: { format: "file", inlineStylesheets: "always" },
  integrations: [mdx(), sitemap({
    i18n: { defaultLocale: "en", locales: { en: "en-US", fr: "fr-FR" } },
    serialize(item) { const path = new URL(item.url).pathname.replace(/\/$/, ""); if (lastmod.has(path)) item.lastmod = lastmod.get(path); return item; },
  })],
  // Pas de polices ni d'images intégrées en data: URI (bloquées par la CSP font-src 'self').
  // Les petits scripts (< 8 Ko) sont intégrés au HTML, ce qui évite une chaîne de requêtes ; les polices restent des fichiers.
  vite: { build: { assetsInlineLimit: (file, content) => (/\.(woff2?|ttf|otf|eot)$/.test(file) ? false : (content?.length ?? 0) < 8192) } },
  markdown: {
    // Le processeur par défaut d'Astro 7 n'exécute pas les plugins remark : on utilise unified pour le remplacement statique des diagrammes.
    processor: unified({ remarkPlugins: [remarkMermaidStatic] }),
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid"] },
    shikiConfig: { theme: "tokyo-night" },
  },
});
