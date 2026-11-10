// Nombre de mots et temps de lecture d'un article MDX (texte réellement lu : sans code, sans diagrammes, sans balises).
const WPM = 200;

export function readingStats(body = "") {
  let s = body;
  s = s.replace(/^---[\s\S]*?---\n/, "");                       // frontmatter éventuel
  s = s.replace(/```[\s\S]*?```/g, " ");                        // blocs de code et diagrammes Mermaid
  // Tableaux MDX : on garde le texte des cellules, pas les clés techniques
  s = s.replace(/<Table[\s\S]*?\/>/g, (t) => (t.replace(/key:\s*"[^"]*"/g, "").match(/"([^"]+)"/g) ?? []).map((x) => x.slice(1, -1)).join(" "));
  s = s.replace(/<[^>]+>/g, " ");                               // balises JSX / HTML (et leurs attributs)
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");                  // images
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");                // liens : on garde le texte
  s = s.replace(/^\s{0,3}(#{1,6}|[-*+]|\d+\.)\s+/gm, " ");      // titres, puces, numéros
  s = s.replace(/[*_`>|~]/g, " ");                              // marques de mise en forme
  const words = s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return { words, minutes: Math.max(1, Math.round(words / WPM)) };
}
