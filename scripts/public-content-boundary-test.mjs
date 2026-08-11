#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { sanitizePublicContent } from "../lib/content/public-content.ts";
import { prioritySeoMetaRegistry } from "../lib/content/seo-meta-registry.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sanitized = sanitizePublicContent({
  publicTitle: "Öffentlicher Titel",
  internalId: "internal-1",
  status: "MANUAL_REVIEW",
  nested: {
    publicLabel: "Öffentliche Bezeichnung",
    owner: "Internal owner",
    evidenceStatus: "PARTIALLY_VERIFIED",
  },
  list: [
    { publicDescription: "Öffentliche Beschreibung", priority: "P0" },
    undefined,
  ],
  callback: () => "not serializable",
});

assert.deepEqual(sanitized, {
  publicTitle: "Öffentlicher Titel",
  nested: {
    publicLabel: "Öffentliche Bezeichnung",
  },
  list: [
    { publicDescription: "Öffentliche Beschreibung" },
  ],
});

for (const [route, model] of Object.entries(prioritySeoMetaRegistry)) {
  assert.deepEqual(model.rollbackValue, model.variants.direct, `${route}: rollbackValue must preserve the direct variant`);
  assert.equal(model.seoTitle, model.variants[model.activeVariant].title, `${route}: active title mismatch`);
  assert.equal(model.description, model.variants[model.activeVariant].description, `${route}: active description mismatch`);
}

for (const relativePath of [
  "lib/services/service-registry.ts",
  "lib/content/page-intent-registry.ts",
]) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  assert.match(source, /sanitizePublicContent\(/u, `${relativePath}: public selector lacks runtime sanitization`);
}

console.log(`PUBLIC_CONTENT_BOUNDARY_TEST_PASS meta_routes=${Object.keys(prioritySeoMetaRegistry).length} internal_keys_leaked=0`);
