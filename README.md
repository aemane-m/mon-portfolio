# aemanemouteirou.com

Portfolio data / MLOps — Astro (static), MDX content collections, zéro framework JS côté client.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + build → dist/
```

- Contenu : `src/content/projects/*.mdx`, `src/content/posts/*.mdx` (frontmatter : `stack`, `status`, `kind`, `name`)
- Profil / expérience / stack : `src/data/profile.ts`
- Le graphe de lineage de l'accueil est généré au build depuis le champ `stack` de chaque projet.
- Déploiement : Cloudflare Pages — build `npm run build`, sortie `dist`. En-têtes dans `public/_headers`.

## Publishing

```bash
npm run new -- project "Project name"     # a project page (data / infra / darkroom / foundations)
npm run new -- note "Short note"          # a journal entry
npm run new -- photo ~/scans/frame.tiff "Title" --film "Ilford HP5" --camera "Pentax K1000" --dev "Rodinal 1+50" --scan "Epson V600"
```

Each command creates a file with `draft: true` (photos are published immediately). Edit it, set `draft: false`, commit and push: Cloudflare Pages rebuilds the site.
`src/content/posts/exemple-article.mdx` shows what an article can contain (callouts, code, images, tables).

## Diagrams (Mermaid, pre-rendered)

Write diagrams as fenced ```mermaid blocks in any MDX file. To keep pages light, they are turned into static SVG (light + dark) **before** deployment, so visitors download no JavaScript for them:

```bash
npm run diagrams     # generates the missing SVGs in src/diagrams (needs a local Chromium)
```

Commit the generated `src/diagrams/*.svg`. If a diagram has not been generated, the build prints a warning and falls back to client-side rendering (about 2 MB of JavaScript), so run the command before you publish.

## Languages

English is the default (`/`), French lives under `/fr`. UI strings are in the views (`src/views`) and `src/data`; content is bilingual through `src/content/projects` + `projects-fr` and `posts` + `posts-fr` (same file name). A page with no French file falls back to English with a notice.

## Share images

Every page, project and article has a dedicated 1200×630 preview image (title + the project's dot shape), in English and French:

```bash
npm run og           # generates the missing ones into public/og/<lang>/ (needs a local Chromium)
```

Commit the generated images. A page without one falls back to the portrait.

## SEO

- Titles are kept to 60 characters and descriptions to 155 automatically (`src/lib/seo.ts`). For a project or article you can set `seoTitle` and `seoDescription` in the frontmatter to word them for search engines; otherwise the title and summary are used and trimmed.
- Structured data: `WebSite` on the home page, `BlogPosting` on articles, `CreativeWork` on projects, `BreadcrumbList` on every content page.
- RSS feeds: `/rss.xml` (English) and `/fr/rss.xml` (French). The sitemap carries the publication date of each project and article.
- Icons: `npm run icons` regenerates the PNG icons from `public/favicon.svg`.
- Cross-links between a project and its articles are declared in `src/data/related.ts`.
