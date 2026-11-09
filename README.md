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
