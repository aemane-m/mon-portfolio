#!/usr/bin/env node
// Publier du contenu en une commande.
//   npm run new -- project "Mon projet"
//   npm run new -- note "Titre de la note"
//   npm run new -- photo ~/scans/frame.tiff "Titre" --film "Ilford HP5" --camera "Pentax K1000" --dev "Rodinal 1+50" --scan "Epson V600"
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename } from "node:path";

const [kind, ...rest] = process.argv.slice(2);
const today = new Date().toISOString().slice(0, 10);
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const flag = (name) => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : undefined; };
const q = (s) => JSON.stringify(s ?? "");
const write = (path, body) => { if (existsSync(path)) { console.error(`Existe déjà : ${path}`); process.exit(1); } writeFileSync(path, body); console.log(`Créé : ${path}`); };

if (kind === "project") {
  const title = rest[0]; if (!title) usage();
  write(`src/content/projects/${slug(title)}.mdx`, `---
title: ${q(title)}
publishedAt: "${today}"
name: ${q(slug(title))}
room: "data"        # data | infra | darkroom | foundations
impact: ""          # une phrase, en langage simple : à quoi ça sert
status: "in_progress"   # in_progress | completed
kind: "personal"    # personal | academic | internship | workstudy
stack: []
summary: ""
images: []          # ex. "/images/projects/${slug(title)}/cover.jpg"
draft: true         # passe à false pour publier
---

## Why

## How it works

## Where it stands
`);
} else if (kind === "note") {
  const title = rest[0]; if (!title) usage();
  write(`src/content/posts/${slug(title)}.mdx`, `---
title: ${q(title)}
publishedAt: "${today}"
type: "note"        # note | article
summary: ""
tags: []
draft: true         # passe à false pour publier
---

`);
} else if (kind === "photo") {
  const [file, title] = rest; if (!file || !title) usage();
  const id = slug(title);
  mkdirSync("public/images/photos", { recursive: true });
  const out = `public/images/photos/${id}.jpg`;
  execFileSync("sips", ["-Z", "2000", "-s", "format", "jpeg", "-s", "formatOptions", "78", file, "--out", out], { stdio: "ignore" });
  const opt = (k, v) => (v ? `${k}: ${q(v)}\n` : "");
  write(`src/content/photos/${id}.md`, `---
title: ${q(title)}
date: "${today}"
image: "/images/photos/${id}.jpg"
${opt("film", flag("film"))}${opt("camera", flag("camera"))}${opt("developer", flag("dev"))}${opt("scan", flag("scan"))}draft: false
---
`);
  console.log(`Image optimisée : ${out}  (source : ${basename(file)})`);
} else usage();

function usage() {
  console.error('Usage:\n  npm run new -- project "Titre"\n  npm run new -- note "Titre"\n  npm run new -- photo <fichier> "Titre" [--film ..] [--camera ..] [--dev ..] [--scan ..]');
  process.exit(1);
}
