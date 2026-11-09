import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import remarkMermaidStatic from "./src/plugins/remark-mermaid-static.mjs";

export default defineConfig({
  site: "https://www.aemanemouteirou.com",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: "en", locales: { en: "en-US", fr: "fr-FR" } } })],
  // Pas de polices ni d'images intégrées en data: URI (bloquées par la CSP font-src 'self').
  vite: { build: { assetsInlineLimit: 0 } },
  markdown: {
    // Le processeur par défaut d'Astro 7 n'exécute pas les plugins remark : on utilise unified pour le remplacement statique des diagrammes.
    processor: unified({ remarkPlugins: [remarkMermaidStatic] }),
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid"] },
    shikiConfig: { theme: "tokyo-night" },
  },
});
