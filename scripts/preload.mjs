// Après le build : ajoute <link rel="modulepreload"> pour les modules que chaque script de page importe,
// afin de les télécharger en parallèle du script lui-même (évite la chaîne HTML → script → module).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const DIST = new URL("../dist", import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let pages = 0, links = 0;
for (const f of walk(DIST).filter((x) => x.endsWith(".html"))) {
  let html = readFileSync(f, "utf8");
  const wanted = new Set();
  for (const m of html.matchAll(/<script[^>]*type="module"[^>]*src="([^"]+)"/g)) {
    const file = join(DIST, m[1]);
    if (!existsSync(file)) continue;
    const js = readFileSync(file, "utf8");
    for (const d of js.matchAll(/(?:from|import)\s*["'](\.\/[^"']+\.js)["']/g)) wanted.add(join(dirname(m[1]), d[1]).replace(/\\/g, "/"));
  }
  const add = [...wanted].filter((h) => !html.includes(`href="${h}"`)).map((h) => `<link rel="modulepreload" href="${h}">`).join("");
  if (!add) continue;
  html = html.replace("</head>", add + "</head>");
  writeFileSync(f, html); pages++; links += add.split("<link").length - 1;
}
console.log(`preload: ${links} lien(s) modulepreload ajoutés sur ${pages} page(s)`);
