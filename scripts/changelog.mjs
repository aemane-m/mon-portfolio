// Instantané de l'historique git → src/data/changelog.json (lu au build, donc indépendant de la profondeur du clone sur l'hébergeur).
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const out = execFileSync("git", ["log", "--no-merges", "--author=aemane", "--since=2026-11-01", "--date=short", "--format=%h%x09%ad%x09%s", "-n", "300"], { encoding: "utf8" });
const rows = out.split("\n").filter(Boolean).map((l) => {
  const [hash, date, ...rest] = l.split("\t");
  const subject = rest.join("\t");
  const m = subject.match(/^(\w+)(?:\(([^)]*)\))?:\s*(.*)$/);
  return { hash, date, type: m ? m[1] : "other", scope: m?.[2] ?? "", subject: m ? m[3] : subject };
});
writeFileSync(new URL("../src/data/changelog.json", import.meta.url), JSON.stringify(rows, null, 1) + "\n");
console.log(rows.length + " commits écrits dans src/data/changelog.json");
