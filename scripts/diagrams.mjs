#!/usr/bin/env node
// Pré-génère les diagrammes Mermaid en SVG statiques (clair + sombre), pour ne livrer aucun JavaScript.
//   npm run diagrams          -> génère ce qui manque
//   npm run diagrams -- --all -> régénère tout
// Nécessite un Chromium local (variable CHROME_PATH, ou le cache Playwright par défaut).
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { homedir } from "node:os";
import { chromium } from "playwright-core";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "src/diagrams");
const force = process.argv.includes("--all");

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith(".mdx") ? [p] : []; });
export const hashOf = (src) => createHash("sha1").update(src.trim()).digest("hex").slice(0, 12);

const sources = new Map();
for (const f of walk(join(ROOT, "src/content"))) {
  for (const m of readFileSync(f, "utf8").matchAll(/```mermaid\n([\s\S]*?)\n```/g)) sources.set(hashOf(m[1]), m[1].trim());
}

const themes = {
  light: { background: "#f4efe5", primaryColor: "#ebe4d4", primaryTextColor: "#17150f", primaryBorderColor: "#6c6657", secondaryColor: "#ebe4d4", tertiaryColor: "#f4efe5", lineColor: "#6c6657", textColor: "#17150f", clusterBkg: "#f4efe5", clusterBorder: "#d8d0bd", edgeLabelBackground: "#f4efe5", actorBkg: "#ebe4d4", actorBorder: "#6c6657", actorTextColor: "#17150f", actorLineColor: "#d8d0bd", signalColor: "#17150f", signalTextColor: "#17150f", noteBkgColor: "#ebe4d4", noteTextColor: "#17150f", noteBorderColor: "#d8d0bd", labelBoxBkgColor: "#ebe4d4", labelBoxBorderColor: "#d8d0bd", labelTextColor: "#17150f", loopTextColor: "#17150f" },
  dark: { background: "#12100d", primaryColor: "#1b1812", primaryTextColor: "#f1ece0", primaryBorderColor: "#9e9684", secondaryColor: "#1b1812", tertiaryColor: "#12100d", lineColor: "#9e9684", textColor: "#f1ece0", clusterBkg: "#12100d", clusterBorder: "#302b22", edgeLabelBackground: "#12100d", actorBkg: "#1b1812", actorBorder: "#9e9684", actorTextColor: "#f1ece0", actorLineColor: "#302b22", signalColor: "#f1ece0", signalTextColor: "#f1ece0", noteBkgColor: "#1b1812", noteTextColor: "#f1ece0", noteBorderColor: "#302b22", labelBoxBkgColor: "#1b1812", labelBoxBorderColor: "#302b22", labelTextColor: "#f1ece0", loopTextColor: "#f1ece0" },
};

const todo = [...sources].filter(([h]) => force || !existsSync(join(OUT, `${h}.light.svg`)) || !existsSync(join(OUT, `${h}.dark.svg`)));
console.log(`${sources.size} diagramme(s) dans le contenu, ${todo.length} à générer.`);
if (!todo.length) process.exit(0);

const findExe = () => {
  const base = join(homedir(), "Library/Caches/ms-playwright");
  if (!existsSync(base)) return undefined;
  const stack = readdirSync(base).filter((d) => d.startsWith("chromium")).map((d) => join(base, d));
  while (stack.length) {
    const p = stack.pop();
    if (statSync(p).isDirectory()) { stack.push(...readdirSync(p).map((f) => join(p, f))); continue; }
    if (/(chrome-headless-shell|Chromium)$/.test(p)) return p;
  }
};
const exe = process.env.CHROME_PATH || findExe();
if (!exe) { console.error("Chromium introuvable : définissez CHROME_PATH."); process.exit(1); }

const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setContent('<html><body><div id="o"></div></body></html>');
await page.addScriptTag({ path: join(ROOT, "node_modules/mermaid/dist/mermaid.min.js") });
for (const [h, src] of todo) {
  for (const mode of ["light", "dark"]) {
    const svg = await page.evaluate(async ({ src, vars, id }) => {
      // @ts-ignore
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", flowchart: { curve: "basis", htmlLabels: true, padding: 14 }, themeVariables: vars });
      // @ts-ignore
      return (await mermaid.render(id, src)).svg;
    }, { src, vars: themes[mode], id: `d${h}${mode[0]}` });
    writeFileSync(join(OUT, `${h}.${mode}.svg`), svg);
  }
  console.log("  ok", h, src.split("\n")[0].slice(0, 40));
}
await browser.close();
