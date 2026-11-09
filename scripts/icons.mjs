#!/usr/bin/env node
// Génère les icônes PNG (favicon 48 px, icône tactile 180 px) à partir de public/favicon.svg. Nécessite un Chromium local.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { homedir } from "node:os";
import { chromium } from "playwright-core";
const ROOT = resolve(import.meta.dirname, "..");
const svg = readFileSync(join(ROOT, "public/favicon.svg"), "utf8");
const findExe = () => { const base = join(homedir(), "Library/Caches/ms-playwright"); if (!existsSync(base)) return; const st = readdirSync(base).filter((d) => d.startsWith("chromium")).map((d) => join(base, d)); while (st.length) { const p = st.pop(); if (statSync(p).isDirectory()) { st.push(...readdirSync(p).map((f) => join(p, f))); continue; } if (/(chrome-headless-shell|Chromium)$/.test(p)) return p; } };
const exe = process.env.CHROME_PATH || findExe();
if (!exe) { console.error("Chromium introuvable : définissez CHROME_PATH."); process.exit(1); }
const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
for (const [file, size] of [["favicon-48.png", 48], ["apple-touch-icon.png", 180], ["icon-192.png", 192], ["icon-512.png", 512]]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  writeFileSync(join(ROOT, "public", file), await page.screenshot({ type: "png" }));
  await page.close();
}
await browser.close();
console.log("icônes générées.");
