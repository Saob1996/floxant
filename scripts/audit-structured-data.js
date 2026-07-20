#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { htmlFileToRoute, normalizeText, walk, writeCsv } = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const reportFile = path.join(root, "artifacts", "structured-data-audit.csv");

if (!fs.existsSync(outRoot)) {
  console.error("Structured-data audit requires an existing out/ build.");
  process.exit(1);
}

function graphNodes(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(graphNodes);
  const graph = Array.isArray(value["@graph"]) ? value["@graph"] : null;
  const nodes = graph ? [] : [value];
  if (graph) nodes.push(...graph.flatMap(graphNodes));
  return nodes;
}

const rows = [];
let blocks = 0;
let invalidJson = 0;
let invisibleFaq = 0;
let prohibitedClaimSchemas = 0;

for (const file of walk(outRoot, (entry) => entry.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const route = htmlFileToRoute(outRoot, file);
  const visible = normalizeText(html);
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, blockIndex) => {
    blocks += 1;
    let parsed;
    try {
      parsed = JSON.parse(match[1].replace(/&quot;/g, '"'));
    } catch (error) {
      invalidJson += 1;
      rows.push({ route, block: blockIndex + 1, type: "UNKNOWN", issue: "INVALID_JSON", severity: "error", detail: String(error.message || error).slice(0, 180) });
      return;
    }
    for (const node of graphNodes(parsed)) {
      const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]].filter(Boolean);
      const typeText = types.join("|") || "UNKNOWN";
      if (types.some((type) => ["AggregateRating", "Review", "Offer"].includes(type)) || Object.hasOwn(node, "aggregateRating") || Object.hasOwn(node, "review")) {
        prohibitedClaimSchemas += 1;
        rows.push({ route, block: blockIndex + 1, type: typeText, issue: "CLAIM_SCHEMA_REVIEW", severity: "warning", detail: "Rating, review or offer data requires an explicit evidence review." });
      }
      if (types.includes("FAQPage")) {
        const questions = Array.isArray(node.mainEntity) ? node.mainEntity : [];
        for (const question of questions) {
          const questionText = normalizeText(question?.name || "");
          const answerText = normalizeText(question?.acceptedAnswer?.text || "");
          if (!questionText || !answerText || !visible.includes(questionText) || !visible.includes(answerText)) {
            invisibleFaq += 1;
            rows.push({ route, block: blockIndex + 1, type: "FAQPage", issue: "SCHEMA_NOT_VISIBLE", severity: "error", detail: String(question?.name || "unnamed question").slice(0, 180) });
          }
        }
      }
      if (!types.length) rows.push({ route, block: blockIndex + 1, type: typeText, issue: "MISSING_TYPE", severity: "warning", detail: "JSON-LD node has no @type." });
    }
  });
}

writeCsv(reportFile, ["route", "block", "type", "issue", "severity", "detail"], rows);
console.log(JSON.stringify({ passed: invalidJson === 0 && invisibleFaq === 0, htmlFiles: walk(outRoot, (entry) => entry.endsWith(".html")).length, jsonLdBlocks: blocks, invalidJson, invisibleFaq, claimSchemaReview: prohibitedClaimSchemas, findings: rows.length, report: path.relative(root, reportFile) }, null, 2));
if (invalidJson || invisibleFaq) process.exit(1);
