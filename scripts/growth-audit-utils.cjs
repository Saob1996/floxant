const fs = require("node:fs");
const path = require("node:path");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }
  if (value || row.length) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function readCsv(file) {
  const [headers, ...rows] = parseCsv(fs.readFileSync(file, "utf8"));
  return rows
    .filter((row) => row.some(Boolean))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(file, columns, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `${[columns, ...rows.map((row) => columns.map((column) => row[column] ?? ""))]
      .map((row) => row.map(csvCell).join(","))
      .join("\n")}\n`,
    "utf8",
  );
}

function normalizeRoute(value) {
  const pathname = String(value || "/").split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return pathname;
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

function staticHtmlPath(outRoot, route) {
  const normalized = normalizeRoute(route);
  const segments = normalized === "/" ? [] : normalized.slice(1).split("/");
  const candidates =
    normalized === "/"
      ? [path.join(outRoot, "index.html")]
      : [
          path.join(outRoot, ...segments) + ".html",
          path.join(outRoot, ...segments, "index.html"),
        ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

module.exports = {
  decodeHtml,
  normalizeRoute,
  readCsv,
  staticHtmlPath,
  writeCsv,
};
