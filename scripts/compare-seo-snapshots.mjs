#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [beforePath, afterPath, outputArg] = process.argv.slice(2);
if (!beforePath || !afterPath) {
  console.error("Usage: node scripts/compare-seo-snapshots.mjs <before.json> <after.json> [output.json]");
  process.exit(2);
}

const before = JSON.parse(fs.readFileSync(beforePath, "utf8"));
const after = JSON.parse(fs.readFileSync(afterPath, "utf8"));
const outputPath = path.resolve(outputArg || "artifacts/seo-snapshot-comparison.json");
const fields = [
  "status",
  "title",
  "metaDescription",
  "canonical",
  "robots",
  "h1",
  "internalLinkCount",
  "uniqueInternalLinkCount",
  "structuredDataTypes",
  "htmlBytes",
  "inSitemap",
];
const beforeRoutes = new Map(before.routes.map((route) => [new URL(route.url).pathname, route]));
const afterRoutes = new Map(after.routes.map((route) => [new URL(route.url).pathname, route]));
const changes = [];

for (const route of new Set([...beforeRoutes.keys(), ...afterRoutes.keys()])) {
  const left = beforeRoutes.get(route);
  const right = afterRoutes.get(route);
  if (!left || !right) {
    let kind = left ? "missing-after" : "new-after";
    if (left && (
      !Array.isArray(left.h1) || left.h1.length !== 1
      || (left.canonical && new URL(left.canonical).pathname !== route)
    )) {
      kind = "removed-noncanonical";
    }
    changes.push({ route, kind });
    continue;
  }
  for (const field of fields) {
    if (JSON.stringify(left[field]) !== JSON.stringify(right[field])) {
      changes.push({ route, field, before: left[field], after: right[field] });
    }
  }
}

const regressions = changes.filter((change) => (
  change.kind === "missing-after"
  || (change.field === "status" && change.after !== 200)
  || (change.field === "robots" && !/noindex/i.test(change.before || "") && /noindex/i.test(change.after || ""))
  || (["title", "metaDescription", "canonical"].includes(change.field) && change.before && !change.after)
  || (change.field === "h1" && Array.isArray(change.after) && change.after.length !== 1)
  || (change.field === "structuredDataTypes" && change.after?.includes("INVALID_JSON_LD"))
));
const output = {
  generatedAt: new Date().toISOString(),
  counts: { before: beforeRoutes.size, after: afterRoutes.size, changes: changes.length, regressions: regressions.length },
  regressions,
  changes,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Routes before/after: ${beforeRoutes.size}/${afterRoutes.size}`);
console.log(`Changes: ${changes.length}; regressions: ${regressions.length}`);
console.log(`Comparison: ${path.relative(process.cwd(), outputPath)}`);
process.exit(regressions.length ? 1 : 0);
