// Moteur de points : ~300 points qui passent d'une disposition à l'autre.
export type LayoutName = "scatter" | "grid" | "clusters" | "bars" | "tsp" | "shelves" | "network" | "series" | "cluster" | "film";
type Layout = { x: number[]; y: number[]; a: number[]; r: number[]; acc: number[]; links?: [number, number][]; linkAlpha?: number; labels?: { x: number; y: number; t: string }[] };

const N = 300;
const rng = (seed: number) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const R = rng(42);
const gauss = () => (R() + R() + R() + R() - 2) / 2;

const sizes = [0.3, 0.22, 0.19, 0.17, 0.12];
const cat: number[] = []; sizes.forEach((s, c) => { for (let i = 0; i < Math.round(N * s); i++) cat.push(c); });
while (cat.length < N) cat.push(4);
const noise = Array.from({ length: N }, () => R() < 0.12);
const base = Array.from({ length: N }, () => [0.05 + R() * 0.9, 0.05 + R() * 0.9]);
const blank = (): Layout => ({ x: Array(N).fill(0), y: Array(N).fill(0), a: Array(N).fill(1), r: Array(N).fill(1), acc: Array(N).fill(0) });

function build(name: LayoutName): Layout {
  const L = blank();
  const r = rng(7);
  switch (name) {
    case "scatter":
      for (let i = 0; i < N; i++) { [L.x[i], L.y[i]] = base[i]; L.a[i] = noise[i] ? 0.9 : 0.55; L.acc[i] = noise[i] ? 0 : 0; }
      break;
    case "grid": {
      let k = 0;
      for (let i = 0; i < N; i++) {
        if (noise[i]) { L.x[i] = base[i][0] < 0.5 ? -0.1 : 1.1; L.y[i] = base[i][1]; L.a[i] = 0; L.r[i] = 0.2; continue; }
        const c = k % 22, row = Math.floor(k / 22); k++;
        L.x[i] = 0.08 + (c / 21) * 0.84; L.y[i] = 0.14 + (row / 11) * 0.72; L.a[i] = 0.8;
      }
      break;
    }
    case "clusters": {
      const C = [[0.3, 0.3], [0.72, 0.3], [0.26, 0.7], [0.58, 0.66], [0.84, 0.72]];
      for (let i = 0; i < N; i++) {
        if (noise[i]) { L.x[i] = base[i][0] < 0.5 ? -0.1 : 1.1; L.y[i] = base[i][1]; L.a[i] = 0; L.r[i] = 0.2; continue; }
        const [cx, cy] = C[cat[i]], s = 0.035 + Math.sqrt(sizes[cat[i]]) * 0.07;
        L.x[i] = cx + gauss() * s * 1.6; L.y[i] = cy + gauss() * s * 1.6; L.a[i] = 0.8; L.acc[i] = cat[i] === 0 ? 1 : 0;
      }
      break;
    }
    case "bars": {
      const cnt = Array(5).fill(0);
      const bw = 4;
      for (let i = 0; i < N; i++) {
        if (noise[i]) { L.x[i] = base[i][0] < 0.5 ? -0.1 : 1.1; L.y[i] = base[i][1]; L.a[i] = 0; L.r[i] = 0.2; continue; }
        const c = cat[i], k = cnt[c]++;
        L.x[i] = 0.1 + c * 0.18 + (k % bw) * 0.032; L.y[i] = 0.86 - Math.floor(k / bw) * 0.034; L.a[i] = 0.85; L.acc[i] = c === 0 ? 1 : 0;
      }
      L.labels = [0, 1, 2, 3, 4].map((c) => ({ x: 0.1 + c * 0.18 + 0.048, y: 0.95, t: `theme ${c + 1}` }));
      break;
    }
    case "tsp": {
      const pts = Array.from({ length: 42 }, () => [0.1 + r() * 0.8, 0.1 + r() * 0.8]);
      const order = [0]; const left = new Set(pts.keys()); left.delete(0);
      while (left.size) { const [lx, ly] = pts[order[order.length - 1]]; let best = -1, bd = 9; left.forEach((j) => { const d = (pts[j][0] - lx) ** 2 + (pts[j][1] - ly) ** 2; if (d < bd) { bd = d; best = j; } }); order.push(best); left.delete(best); }
      for (let i = 0; i < N; i++) {
        if (i < 42) { const p = pts[order[i]]; L.x[i] = p[0]; L.y[i] = p[1]; L.a[i] = 1; L.r[i] = 1.5; L.acc[i] = i === 0 ? 1 : 0; }
        else { [L.x[i], L.y[i]] = base[i]; L.a[i] = 0.1; }
      }
      L.links = Array.from({ length: 42 }, (_, i) => [i, (i + 1) % 42] as [number, number]); L.linkAlpha = 0.7;
      break;
    }
    case "shelves": {
      for (let i = 0; i < N; i++) {
        const row = Math.floor(i / 50), c = i % 50;
        L.x[i] = 0.07 + (c / 49) * 0.86 + Math.floor(c / 10) * 0.0; L.y[i] = 0.14 + row * 0.15; L.a[i] = 0.8; L.r[i] = 0.9;
        L.acc[i] = r() < 0.07 ? 1 : 0;
      }
      L.links = []; for (let row = 0; row < 6; row++) L.links.push([row * 50, row * 50 + 49]); L.linkAlpha = 0.25;
      break;
    }
    case "network": {
      const CL = 14;
      L.x[0] = 0.5; L.y[0] = 0.5; L.r[0] = 3; L.acc[0] = 1; L.a[0] = 1;
      for (let i = 1; i < N; i++) {
        if (i <= CL) { const t = ((i - 1) / CL) * Math.PI * 2; L.x[i] = 0.5 + Math.cos(t) * 0.34; L.y[i] = 0.5 + Math.sin(t) * 0.34; L.a[i] = 1; L.r[i] = 1.7; }
        else { [L.x[i], L.y[i]] = base[i]; L.a[i] = 0.1; }
      }
      L.links = Array.from({ length: CL }, (_, i) => [0, i + 1] as [number, number]); L.linkAlpha = 0.45;
      break;
    }
    case "cluster": {
      // 3 nœuds de cluster, chacun entouré de ses pods, reliés entre eux.
      const nodes = [[0.5, 0.2], [0.2, 0.74], [0.8, 0.74]];
      const PER = 22, hubs = [0, 1, 2];
      let k = 3;
      for (let h = 0; h < 3; h++) { L.x[h] = nodes[h][0]; L.y[h] = nodes[h][1]; L.r[h] = 3.2; L.acc[h] = 1; L.a[h] = 1; }
      const links: [number, number][] = [[0, 1], [1, 2], [2, 0]];
      for (let h = 0; h < 3; h++) for (let j = 0; j < PER; j++, k++) {
        const t = (j / PER) * Math.PI * 2 + h, rad = 0.1 + (j % 2) * 0.035;
        L.x[k] = nodes[h][0] + Math.cos(t) * rad; L.y[k] = nodes[h][1] + Math.sin(t) * rad; L.a[k] = 0.95; L.r[k] = 1.1;
        links.push([hubs[h], k]);
      }
      for (; k < N; k++) { [L.x[k], L.y[k]] = base[k]; L.a[k] = 0.08; }
      L.links = links; L.linkAlpha = 0.28;
      break;
    }
    case "film": {
      // Six photogrammes (2 x 3) dessinés par leur contour ; un balayage de scan en couleur d'accent.
      const fw = 0.25, fh = 0.17; let k = 0;
      for (let row = 0; row < 3; row++) for (let col = 0; col < 2; col++) {
        const x0 = 0.15 + col * 0.37, y0 = 0.1 + row * 0.28, per = 44;
        for (let j = 0; j < per && k < N; j++, k++) {
          const t = j / per, side = Math.floor(t * 4), u = t * 4 - side;
          const [px, py] = side === 0 ? [u, 0] : side === 1 ? [1, u] : side === 2 ? [1 - u, 1] : [0, 1 - u];
          L.x[k] = x0 + px * fw; L.y[k] = y0 + py * fh; L.a[k] = 0.9; L.r[k] = 0.9;
          L.acc[k] = row === 1 && col === 0 && (j % 4 === 0) ? 1 : 0;
        }
      }
      for (; k < N; k++) { L.x[k] = 0.5 + (k % 2 ? 0.43 : -0.43); L.y[k] = 0.05 + ((k * 13) % 90) / 100; L.a[k] = 0.35; L.r[k] = 0.6; }
      break;
    }
    case "series": {
      let v = 0.62; const sig: number[] = [];
      for (let i = 0; i < N; i++) {
        v += (r() - 0.5) * 0.045 - (v - 0.5) * 0.004 - 0.0009; v = Math.min(0.9, Math.max(0.12, v));
        L.x[i] = 0.06 + (i / (N - 1)) * 0.88; L.y[i] = v; L.a[i] = 0.9; L.r[i] = 0.7;
      }
      for (let k = 0; k < 7; k++) { const i = 20 + Math.floor(r() * 270); L.acc[i] = 1; L.r[i] = 2.2; sig.push(i); }
      L.links = Array.from({ length: N - 1 }, (_, i) => [i, i + 1] as [number, number]); L.linkAlpha = 0.45;
      break;
    }
  }
  return L;
}

const cache = new Map<LayoutName, Layout>();
/** Données brutes d'une disposition (utilisées aussi côté serveur pour les miniatures SVG). */
export const layoutPoints = (n: LayoutName) => get(n);
const get = (n: LayoutName) => { if (!cache.has(n)) cache.set(n, build(n)); return cache.get(n)!; };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function createDots(canvas: HTMLCanvasElement, start: LayoutName = "scatter", opts: { mesh?: boolean } = {}) {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, A: Layout = get(start), B: Layout = A, f = 0, raf = 0, mx = -1, my = -1, praf = 0;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  let ink = "#f2f2f2", acc = "#13c184", dim = "#9c9c9c";
  const readColors = () => { ink = css("--text") || ink; acc = css("--accent") || acc; dim = css("--dim") || dim; };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2), b = canvas.getBoundingClientRect();
    W = b.width; H = b.height; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  };

  function mix(i: number) {
    const e = ease(f), g = (k: number[], l: number[]) => k[i] * (1 - e) + l[i] * e;
    // décalage par point pour un mouvement organique
    const d = (((i * 37) % 100) / 100) * 0.35, p = ease(Math.min(1, Math.max(0, (f - d) / (1 - d))));
    const m = (k: number[], l: number[]) => k[i] * (1 - p) + l[i] * p;
    return { x: m(A.x, B.x), y: m(A.y, B.y), a: g(A.a, B.a), r: m(A.r, B.r), c: g(A.acc, B.acc) };
  }

  function draw() {
    readColors();
    ctx.clearRect(0, 0, W, H);
    const S = Math.min(W, H), ox = (W - S) / 2, oy = (H - S) / 2, px = (x: number) => ox + x * S, py = (y: number) => oy + y * S;
    const pts = Array.from({ length: N }, (_, i) => mix(i));
    if (opts.mesh && mx >= 0) { // la souris écarte les points voisins
      const R = 0.16;
      for (const p of pts) { const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy); if (d < R && d > 0.0001) { const k = (1 - d / R) ** 2 * 0.07; p.x += (dx / d) * k; p.y += (dy / d) * k; } }
    }
    const e = ease(f);
    const links = (L: Layout, alpha: number) => {
      if (!L.links || alpha < 0.02) return;
      ctx.strokeStyle = ink; ctx.lineWidth = 1; ctx.globalAlpha = alpha * (L.linkAlpha ?? 0.4); ctx.beginPath();
      L.links.forEach(([i, j]) => { ctx.moveTo(px(pts[i].x), py(pts[i].y)); ctx.lineTo(px(pts[j].x), py(pts[j].y)); }); ctx.stroke();
    };
    links(A, 1 - e); links(B, e);
    if (opts.mesh) { // maillage : relie les points proches, comme une constellation
      const T = 0.075; ctx.strokeStyle = ink; ctx.lineWidth = 0.8; ctx.beginPath();
      for (let i = 0; i < N; i++) { const a = pts[i]; if (a.a < 0.3) continue; for (let j = i + 1; j < N; j++) { const b = pts[j]; if (b.a < 0.3) continue; const dx = a.x - b.x; if (dx > T || dx < -T) continue; const dy = a.y - b.y; if (dx * dx + dy * dy < T * T) { ctx.moveTo(px(a.x), py(a.y)); ctx.lineTo(px(b.x), py(b.y)); } } }
      ctx.globalAlpha = 0.16; ctx.stroke();
    }
    const unit = Math.max(2.2, S / 150);
    for (const p of pts) {
      const r = unit * p.r; if (p.a < 0.02 || r < 0.3) continue;
      ctx.beginPath(); ctx.arc(px(p.x), py(p.y), r, 0, Math.PI * 2);
      ctx.globalAlpha = p.a * (1 - p.c); ctx.fillStyle = ink; if (ctx.globalAlpha > 0.01) ctx.fill();
      ctx.beginPath(); ctx.arc(px(p.x), py(p.y), r, 0, Math.PI * 2);
      ctx.globalAlpha = Math.min(1, p.a * p.c * 1.2); ctx.fillStyle = acc; if (ctx.globalAlpha > 0.01) ctx.fill();
    }
    ctx.font = `500 ${Math.max(10, S / 48)}px ui-monospace, Menlo, Consolas, monospace`; ctx.textAlign = "center"; ctx.fillStyle = dim;
    const lab = (L: Layout, al: number) => { if (!L.labels || al < 0.05) return; ctx.globalAlpha = al; L.labels.forEach((l) => ctx.fillText(l.t, px(l.x), py(l.y))); };
    lab(A, 1 - e); lab(B, e);
    ctx.globalAlpha = 1;
  }

  const snapshot = (): Layout => { const L = blank(); for (let i = 0; i < N; i++) { const p = mix(i); L.x[i] = p.x; L.y[i] = p.y; L.a[i] = p.a; L.r[i] = p.r; L.acc[i] = p.c; } return L; };

  if (opts.mesh && !reduce) {
    const at = (e: PointerEvent) => { const b = canvas.getBoundingClientRect(), S = Math.min(b.width, b.height); mx = (e.clientX - b.left - (b.width - S) / 2) / S; my = (e.clientY - b.top - (b.height - S) / 2) / S; cancelAnimationFrame(praf); praf = requestAnimationFrame(draw); };
    canvas.addEventListener("pointermove", at); canvas.addEventListener("pointerleave", () => { mx = -1; cancelAnimationFrame(praf); praf = requestAnimationFrame(draw); });
  }
  new ResizeObserver(resize).observe(canvas);
  addEventListener("themechange", () => draw());
  return {
    /** progression pilotée par le scroll : mélange A→B à f ∈ [0,1] */
    blend(a: LayoutName, b: LayoutName, t: number) { A = get(a); B = get(b); f = reduce ? Math.round(t) : t; draw(); },
    /** transition temporelle vers une disposition (survol) */
    to(name: LayoutName, ms = 800) {
      cancelAnimationFrame(raf); const target = get(name);
      if (reduce) { A = B = target; f = 0; draw(); return; }
      A = snapshot(); B = target; f = 0; const t0 = performance.now();
      const step = (now: number) => { f = Math.min(1, (now - t0) / ms); draw(); if (f < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    },
  };
}
