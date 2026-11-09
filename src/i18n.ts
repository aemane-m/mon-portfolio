export type Lang = "en" | "fr";

/** Chemin propre : sans .html (le build produit des fichiers), sans /index, sans slash final. */
export const cleanPath = (url: URL | string) => {
  const p = typeof url === "string" ? url : url.pathname;
  return p.replace(/\.html$/, "").replace(/\/index$/, "").replace(/\/$/, "") || "/";
};

/** Langue déduite de l'adresse : tout ce qui commence par /fr est en français. */
export const langOf = (url: URL | string): Lang => {
  const p = cleanPath(url);
  return p === "/fr" || p.startsWith("/fr/") ? "fr" : "en";
};

/** Raccourci de traduction : const tr = mk(lang); tr("Hello", "Bonjour"). */
export const mk = (lang: Lang) => (en: string, fr: string) => (lang === "fr" ? fr : en);

/** Chemin interne préfixé selon la langue. */
export const lp = (lang: Lang, path: string) => (lang === "fr" ? (path === "/" ? "/fr" : `/fr${path}`) : path);

/** Même page dans l'autre langue. */
export const altPath = (pathname: string) => {
  const clean = cleanPath(pathname);
  if (clean === "/fr") return "/";
  if (clean.startsWith("/fr/")) return clean.slice(3);
  return clean === "/" ? "/fr" : `/fr${clean}`;
};

export const dateLocale = (lang: Lang) => (lang === "fr" ? "fr-FR" : "en-US");
