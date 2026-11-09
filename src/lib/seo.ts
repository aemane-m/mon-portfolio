const SUFFIX = " — Aemane Mouteirou";

const cut = (s: string, max: number) => {
  if (s.length <= max) return s;
  const head = s.slice(0, max - 1);
  const i = head.lastIndexOf(" ");
  return (i > max * 0.6 ? head.slice(0, i) : head).replace(/[\s,:;—–-]+$/, "") + "…";
};

/** Titre de page ≤ 60 caractères : ajoute le nom s'il tient, sinon tronque proprement. */
export const fitTitle = (base: string, max = 60) => {
  const t = base.trim();
  if (/aemane/i.test(t)) return cut(t, max);
  return t.length + SUFFIX.length <= max ? t + SUFFIX : cut(t, max);
};

/** Description ≤ 155 caractères, coupée à un mot. */
export const fitDesc = (d: string, max = 155) => cut(d.trim(), max);
