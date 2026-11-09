#!/usr/bin/env node
// Génère une image de partage (1200x630) par page, projet et article, en EN et FR.
//   npm run og            -> génère ce qui manque
//   npm run og -- --all   -> régénère tout
// Résultat dans public/og/<langue>/<clé>.jpg. Nécessite un Chromium local (comme les diagrammes).
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { homedir } from "node:os";
import { chromium } from "playwright-core";
import { layoutPoints } from "../src/scripts/dots.ts";
import { shapes, roomLabel } from "../src/data/shapes.ts";

const ROOT = resolve(import.meta.dirname, "..");
const force = process.argv.includes("--all");
const font = readFileSync(join(ROOT, "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-standard-normal.woff2")).toString("base64");

const fm = (file) => {
  const t = readFileSync(file, "utf8"); const m = t.match(/^---\n([\s\S]*?)\n---/); const get = (k) => { const r = m[1].match(new RegExp(`^${k}: (.*)$`, "m")); return r ? JSON.parse(r[1]) : undefined; };
  return { title: get("title"), room: get("room"), draft: /^draft: true/m.test(m[1]) };
};
const dir = (d) => readdirSync(join(ROOT, d)).filter((f) => f.endsWith(".mdx")).map((f) => [f.replace(/\.mdx$/, ""), join(ROOT, d, f)]).filter(([, file]) => !fm(file).draft);

const postLayout = { "kubernetes-talos-homelab": "cluster", "proxmox-terraform-gitlab-ci": "grid", "backups-microserver-truenas-ilo": "bars", "home-network-vlans-unifi": "network", "mon-portfolio": "scatter" };
const pages = {
  en: { home: ["Data, infrastructure and film — built by hand.", "Aemane Mouteirou", "scatter"], about: ["About", "Aemane Mouteirou", "clusters"], work: ["Projects", "What I've built, explained simply", "grid"], blog: ["Journal", "Notes from the lab, as they happen", "bars"], legal: ["Legal notice", "aemanemouteirou.com", "scatter"] },
  fr: { home: ["Données, infrastructure et pellicule — faits main.", "Aemane Mouteirou", "scatter"], about: ["À propos", "Aemane Mouteirou", "clusters"], work: ["Projets", "Ce que j'ai construit, expliqué simplement", "grid"], blog: ["Journal", "Notes du labo, au fil de l'eau", "bars"], legal: ["Mentions légales", "aemanemouteirou.com", "scatter"] },
};

const jobs = [];
for (const lang of ["en", "fr"]) {
  for (const [key, [title, sub, layout]] of Object.entries(pages[lang])) jobs.push({ lang, key, title, sub, layout, eyebrow: lang === "fr" ? "Portfolio" : "Portfolio" });
  for (const [slug, file] of dir(lang === "en" ? "src/content/projects" : "src/content/projects-fr")) {
    const { title, room } = fm(file); const [name, ...rest] = title.split(/ [—:] /);
    jobs.push({ lang, key: `work-${slug}`, title: name, sub: rest.join(" — "), layout: shapes[slug]?.layout ?? "scatter", eyebrow: roomLabel[lang][room] ?? "" });
  }
  for (const [slug, file] of dir(lang === "en" ? "src/content/posts" : "src/content/posts-fr")) {
    const { title } = fm(file);
    jobs.push({ lang, key: `blog-${slug}`, title, sub: "", layout: postLayout[slug] ?? "scatter", eyebrow: "Journal" });
  }
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function dots(layout, size) {
  const L = layoutPoints(layout), pad = 20, S = size - pad * 2, unit = size / 70;
  let out = "";
  const links = (L.links ?? []).filter(([a, b]) => L.a[a] > 0.3 && L.a[b] > 0.3);
  if (links.length) out += `<path d="${links.map(([a, b]) => `M${pad + L.x[a] * S} ${pad + L.y[a] * S}L${pad + L.x[b] * S} ${pad + L.y[b] * S}`).join("")}" stroke="#17150f" stroke-opacity=".3" stroke-width="1.2" fill="none"/>`;
  for (let i = 0; i < L.x.length; i++) {
    if (L.a[i] < 0.3 || L.x[i] < -0.02 || L.x[i] > 1.02) continue;
    out += `<circle cx="${(pad + L.x[i] * S).toFixed(1)}" cy="${(pad + L.y[i] * S).toFixed(1)}" r="${(unit * L.r[i]).toFixed(1)}" fill="${L.acc[i] > 0.5 ? "#0d7a4b" : "#17150f"}" fill-opacity="${Math.min(1, L.a[i] + 0.1).toFixed(2)}"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${out}</svg>`;
}
const html = (j) => {
  const long = j.title.length > 34, size = j.sub ? (j.title.length > 18 ? 96 : 128) : long ? 62 : 84;
  return `<!doctype html><meta charset="utf-8"><style>
  @font-face{font-family:F;src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:100 900}
  *{box-sizing:border-box;margin:0} body{width:1200px;height:630px;background:#f4efe5;color:#17150f;font-family:F,Georgia,serif;position:relative;overflow:hidden}
  .t{position:absolute;left:72px;top:150px;width:640px}
  .e{position:absolute;left:72px;top:64px;font:600 22px ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#0d7a4b}
  h1{font-weight:500;font-size:${size}px;line-height:1.02;letter-spacing:-.03em}
  .s{margin-top:26px;font-size:34px;line-height:1.2;color:#6c6657}
  .u{position:absolute;left:72px;bottom:58px;font:500 24px ui-monospace,Menlo,monospace;color:#6c6657}
  .d{position:absolute;right:56px;top:95px} .b{position:absolute;right:72px;bottom:58px;width:26px;height:26px;border-radius:50%;background:#0d7a4b}
  </style><div class="e">${esc(j.eyebrow)}</div><div class="t"><h1>${esc(j.title)}</h1>${j.sub ? `<p class="s">${esc(j.sub)}</p>` : ""}</div><div class="d">${dots(j.layout, 440)}</div><div class="u">aemanemouteirou.com</div><div class="b"></div>`;
};

const todo = jobs.filter((j) => force || !existsSync(join(ROOT, `public/og/${j.lang}/${j.key}.jpg`)));
console.log(`${jobs.length} image(s) possibles, ${todo.length} à générer.`);
if (!todo.length) process.exit(0);
const findExe = () => { const base = join(homedir(), "Library/Caches/ms-playwright"); if (!existsSync(base)) return; const st = readdirSync(base).filter((d) => d.startsWith("chromium")).map((d) => join(base, d)); while (st.length) { const p = st.pop(); if (statSync(p).isDirectory()) { st.push(...readdirSync(p).map((f) => join(p, f))); continue; } if (/(chrome-headless-shell|Chromium)$/.test(p)) return p; } };
const exe = process.env.CHROME_PATH || findExe();
if (!exe) { console.error("Chromium introuvable : définissez CHROME_PATH."); process.exit(1); }
const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const j of todo) {
  await page.setContent(html(j)); await page.evaluate(() => document.fonts.ready);
  mkdirSync(join(ROOT, `public/og/${j.lang}`), { recursive: true });
  await page.screenshot({ path: join(ROOT, `public/og/${j.lang}/${j.key}.jpg`), type: "jpeg", quality: 82 });
}
await browser.close();
console.log("terminé.");
