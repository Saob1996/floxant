#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const {
  decodeHtml,
  staticHtmlPath,
  writeCsv,
} = require("./growth-audit-utils.cjs");

const root = process.cwd();
const outRoot = path.join(root, "out");
const outputFile = path.join(root, "artifacts", "meta-uniqueness.csv");

function text(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1] || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function meta(html, property, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) =>
    new RegExp(`\\b${property}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(candidate),
  );
  return decodeHtml(tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "");
}

function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => /\brel=["']canonical["']/i.test(candidate));
  return decodeHtml(tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || "");
}

async function main() {
  const moduleUrl = pathToFileURL(
    path.join(root, "lib", "content", "seo-meta-registry.ts"),
  ).href;
  const { prioritySeoMetaRegistry } = await import(moduleUrl);
  const pages = [];

  for (const route of Object.keys(prioritySeoMetaRegistry)) {
    const file = staticHtmlPath(outRoot, route);
    const html = file ? fs.readFileSync(file, "utf8") : "";
    pages.push({
      route,
      file,
      title: text(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i),
      description: meta(html, "name", "description"),
      h1: text(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i),
      ogTitle: meta(html, "property", "og:title"),
      ogDescription: meta(html, "property", "og:description"),
      canonical: canonical(html),
      robots: meta(html, "name", "robots"),
    });
  }

  const duplicateMaps = {};
  for (const field of ["title", "description", "h1", "ogTitle", "ogDescription"]) {
    const groups = new Map();
    for (const page of pages) {
      const key = page[field].toLocaleLowerCase("de-DE");
      if (!key) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(page.route);
    }
    duplicateMaps[field] = groups;
  }

  const rows = [];
  function add(route, field, value, duplicateOf, status, note) {
    rows.push({
      route,
      field,
      value,
      length: value.length,
      duplicateOf,
      status,
      note,
    });
  }

  for (const page of pages) {
    if (!page.file) add(page.route, "static", "", "", "FAIL", "Static HTML is missing.");
    for (const field of ["title", "description", "h1", "ogTitle", "ogDescription"]) {
      const duplicates = (duplicateMaps[field].get(page[field].toLocaleLowerCase("de-DE")) || [])
        .filter((route) => route !== page.route);
      const missing = !page[field];
      const invalidLength =
        (field === "title" && (page[field].length < 15 || page[field].length > 70)) ||
        ((field === "description" || field === "ogDescription") &&
          (page[field].length < 70 || page[field].length > 220));
      add(
        page.route,
        field,
        page[field],
        duplicates.join("|"),
        missing || duplicates.length || invalidLength ? "FAIL" : "PASS",
        missing
          ? "Missing value."
          : duplicates.length
            ? "Duplicate within the GSC priority registry."
            : invalidLength
              ? "Outside the review length range."
              : "Unique and within the review range.",
      );
    }
    const expectedCanonical = `https://www.floxant.de${page.route}`;
    add(
      page.route,
      "canonical",
      page.canonical,
      "",
      page.canonical === expectedCanonical ? "PASS" : "FAIL",
      `Expected ${expectedCanonical}`,
    );
    add(
      page.route,
      "robots",
      page.robots,
      "",
      /index/i.test(page.robots) && !/noindex/i.test(page.robots) ? "PASS" : "FAIL",
      "Priority public route must be indexable.",
    );
  }

  writeCsv(
    outputFile,
    ["route", "field", "value", "length", "duplicateOf", "status", "note"],
    rows,
  );
  const failures = rows.filter((row) => row.status === "FAIL");
  console.log(
    JSON.stringify(
      {
        status: failures.length ? "FAIL" : "PASS",
        routes: pages.length,
        checks: rows.length,
        failures: failures.length,
        output: path.relative(root, outputFile),
      },
      null,
      2,
    ),
  );
  if (failures.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
