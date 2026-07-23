const fs = require("node:fs");
const path = require("node:path");

function walk(root, predicate = () => true) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  const queue = [root];
  while (queue.length) {
    const directory = queue.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (predicate(absolute)) files.push(absolute);
    }
  }
  return files;
}

function ensureDirectory(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function writeCsv(file, headers, rows) {
  ensureDirectory(file);
  const quote = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.map(quote).join(","), ...rows.map((row) => headers.map((header) => quote(row[header])).join(","))];
  fs.writeFileSync(file, `${lines.join("\n")}\n`, "utf8");
}

function stripHtml(value) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value) {
  return stripHtml(String(value || ""))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function htmlFileToRoute(outRoot, file) {
  const relative = path.relative(outRoot, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\/index\.html$/, "").replace(/\.html$/, "")}`;
}

function routeCandidates(outRoot, route) {
  const clean = route === "/" ? "" : route.replace(/^\//, "").replace(/\/$/, "");
  return clean
    ? [path.join(outRoot, `${clean}.html`), path.join(outRoot, clean, "index.html")]
    : [path.join(outRoot, "index.html")];
}

function decodeXml(value) {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

module.exports = { decodeXml, ensureDirectory, htmlFileToRoute, normalizeText, routeCandidates, stripHtml, walk, writeCsv };
