// Après le build : calcule l'empreinte SHA-256 de chaque script intégré (non JSON-LD) présent dans dist/**/*.html
// et remplace __SCRIPT_HASHES__ dans dist/_headers. Résultat : script-src sans 'unsafe-inline'.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const DIST = new URL("../dist", import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const hashes = new Set();
for (const f of walk(DIST).filter((x) => x.endsWith(".html"))) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1];
    if (/\bsrc=/.test(attrs) || /type="(application\/ld\+json|application\/json|importmap)"/.test(attrs)) continue; // externes ou données : non concernés
    hashes.add("'sha256-" + createHash("sha256").update(m[2]).digest("base64") + "'");
  }
}
const file = join(DIST, "_headers");
const txt = readFileSync(file, "utf8");
if (!txt.includes("__SCRIPT_HASHES__")) { console.error("csp: marqueur __SCRIPT_HASHES__ introuvable dans dist/_headers"); process.exit(1); }
writeFileSync(file, txt.replace("__SCRIPT_HASHES__", [...hashes].join(" ")));
console.log(`csp: ${hashes.size} empreinte(s) de script écrites dans dist/_headers`);
