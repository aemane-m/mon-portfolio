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
