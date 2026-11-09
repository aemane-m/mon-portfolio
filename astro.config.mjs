import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.aemanemouteirou.com",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [mdx(), sitemap()],
  // Pas de polices ni d'images intégrées en data: URI (bloquées par la CSP font-src 'self').
  vite: { build: { assetsInlineLimit: 0 } },
  markdown: {
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid"] },
    shikiConfig: { theme: "tokyo-night" },
  },
});
