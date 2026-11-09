# aemanemouteirou.com

Personal portfolio of Aemane Mouteirou: data engineering, homelab and analogue film. A static, bilingual (English / French) site built with **Astro 7**, MDX content collections and almost no client-side JavaScript. The goal is the lightest and fastest site possible, with projects explained in plain language.

- Live: <https://www.aemanemouteirou.com>
- English at `/`, French under `/fr`
- Hosted on Cloudflare Pages (static output, security headers in `public/_headers`)

## Quick start

Requires Node 22 (see `.node-version`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + astro build → dist/
npm run preview    # serve dist/ locally
```

| Command | What it does |
| --- | --- |
| `npm run new -- project "Name"` | Scaffold a project page (rooms: data, infra, darkroom, foundations) |
| `npm run new -- note "Title"` | Scaffold a journal entry |
| `npm run new -- photo <file> "Title" --film … --camera … --dev … --scan …` | Add a film photo (published immediately) |
| `npm run diagrams` | Pre-render Mermaid blocks to static SVG (light + dark) |
| `npm run og` | Generate the 1200×630 share images |
| `npm run icons` | Regenerate PNG icons from `public/favicon.svg` |

`diagrams`, `og` and `icons` need a local Chromium (Playwright). Pass `--all` to `npm run og -- --all` to regenerate everything.

## Project layout

```
src/
  content/            projects, posts, photos (+ projects-fr, posts-fr for French)
  views/              page templates shared by both languages (they take a `lang` prop)
  pages/              thin route files: English at /, French under /fr
  layouts/Base.astro  SEO head, JSON-LD, theme toggle, language switch, footer
  components/mdx/     components usable inside MDX (Callout, Table, Media, Diagram…)
  data/               profile (bilingual), per-project dot shapes, related links
  scripts/dots.ts     the dot engine used by the home page (canvas)
  plugins/            remark plugin that turns ```mermaid blocks into static diagrams
  diagrams/           generated SVGs (committed)
  lib/                SEO helpers (title/description fitting), RSS, content helpers
  styles/global.css   design tokens and shared classes
scripts/              new / diagrams / og / icons
public/               images, share images (og/), _headers, _redirects, icons
```

## Content

- **Projects** live in `src/content/projects/*.mdx`. Frontmatter: `title`, `name`, `room`, `impact`, `status` (`in_progress` or `completed`), `kind`, `stack`, `summary`, `publishedAt`, optional `images`, `link`, `seoTitle`, `seoDescription`, `draft`.
- **Articles** live in `src/content/posts/*.mdx`.
- Each command from `npm run new` creates a file with `draft: true`. Edit it, set `draft: false`, commit and push.
- `src/content/posts/exemple-article.mdx` shows what an article can contain (callouts, code, images, tables).
- MDX components: `<Callout tone="brand|neutral">`, `<Table data={{ headers, rows }} />`, `<Media src alt aspectRatio />`, `<Button variant label href />`, `<Tldr>`.
- Cross-links between a project and its articles are declared in `src/data/related.ts`.
- Each project has a dot shape (layout and a one-line note, in both languages) in `src/data/shapes.ts`. It drives the home animation and the share images.

## Languages

English is the default, French lives under `/fr`. Content is bilingual through pairs of folders with the **same file name**: `projects` + `projects-fr`, `posts` + `posts-fr`. A page with no French file falls back to English with a notice. UI strings are in the views and in `src/data`, written with the `tr("English", "Français")` helper (`src/i18n.ts`). Pages carry `hreflang`, a language switch and a localised sitemap.

## Design

- **Default theme: full black with an orange accent.** The cream + orange light theme is available through the toggle in the header; the choice is stored in the browser.
- All colours are tokens in `src/styles/global.css` (`--bg`, `--text`, `--accent`, `--accent-text`, …). The light theme uses a darker orange for small text to keep contrast above 4.5:1.
- Fraunces (variable) is the only web font, preloaded. Everything else uses system fonts.
- The header height is a CSS variable (`--hh`) so sticky elements stay below it on every screen size.

If you change the accent colour, update the tokens, then regenerate what bakes colours in: `npm run diagrams` (delete `src/diagrams/*.svg` first), `npm run og -- --all` and `npm run icons`. The `classDef accent` lines in the Mermaid blocks also carry the accent.

## Diagrams (Mermaid, pre-rendered)

Write diagrams as fenced ` ```mermaid ` blocks in any MDX file. To keep pages light they are turned into static SVG (light + dark) **before** deployment, so visitors download no JavaScript for them:

```bash
npm run diagrams
```

Commit the generated `src/diagrams/*.svg`. If a diagram has not been generated, the build prints a warning and falls back to client-side rendering (about 2 MB of JavaScript), so run the command before you publish.

## Share images

Every page, project and article has a dedicated 1200×630 preview image (title + the project's dot shape) in both languages, in `public/og/<lang>/`. Generate the missing ones with `npm run og` and commit them. A page without one falls back to the portrait.

## SEO

- Titles are kept to 60 characters and descriptions to 155 automatically (`src/lib/seo.ts`). For a project or article, `seoTitle` and `seoDescription` in the frontmatter let you word them for search engines; otherwise the title and summary are used and trimmed.
- Structured data (JSON-LD): `WebSite` on the home page, `BlogPosting` on articles, `CreativeWork` on projects, `BreadcrumbList` on content pages.
- RSS feeds: `/rss.xml` (English) and `/fr/rss.xml` (French).
- Sitemap: `/sitemap-index.xml` (generated at build, with `lastmod` and `hreflang`); `/sitemap.xml` redirects to it. `robots.txt` points to it.
- The 404 page is `noindex`.

## Email and contact

The email address is never written in the HTML: it is stored as a reversed base64 token (`contactToken` in `src/data/profile.ts`) and decoded in the browser. The footer link copies the address on click; the legal notice reveals it on demand. The "Get in touch" buttons go to LinkedIn.

## Deployment

Cloudflare Pages builds the site on every push to `main`:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (`.node-version`)
- Headers (CSP, cache) in `public/_headers`; redirects for old URLs in `public/_redirects`

Before publishing: run `npm run build`, and regenerate diagrams and share images if you changed any diagram, title or colour.

## Security notes

- No secrets in the repository. The newsletter form posts to Substack (allowed by `form-action` in the CSP).
- The CSP allows inline scripts and styles (`'unsafe-inline'`) because of the small theme and email scripts; everything else is restricted to the site itself.

## License

Copyright © 2026 Aemane Mouteirou. All rights reserved. The code and the content are published to be read, not to be reused: see [LICENSE](LICENSE). Third-party dependencies and credited material keep their own licences.
