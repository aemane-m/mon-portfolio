// Remplace un bloc ```mermaid par <Diagram hash="…" /> quand les SVG pré-générés existent
// (voir scripts/diagrams.mjs). Sinon le bloc reste tel quel et sera rendu côté navigateur.
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const DIR = fileURLToPath(new URL("../diagrams/", import.meta.url));
const hashOf = (src) => createHash("sha1").update(src.trim()).digest("hex").slice(0, 12);

function visit(node, fn) {
  if (!node.children) return;
  node.children = node.children.map((child) => fn(child) ?? child);
  node.children.forEach((c) => visit(c, fn));
}

export default function remarkMermaidStatic() {
  console.log("[mermaid-static] plugin chargé");
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "code" || node.lang !== "mermaid") return;
      const h = hashOf(node.value);
      if (!existsSync(join(DIR, `${h}.light.svg`)) || !existsSync(join(DIR, `${h}.dark.svg`))) {
        console.warn(`[mermaid] diagramme ${h} non pré-généré : il sera rendu côté navigateur (≈2 Mo de JS). Lancez « npm run diagrams ».`);
        return;
      }
      return { type: "mdxJsxFlowElement", name: "Diagram", attributes: [{ type: "mdxJsxAttribute", name: "hash", value: h }], children: [] };
    });
  };
}
