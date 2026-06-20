const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "ENCODING_MOJIBAKE_REPORT.md");
const jsonPath = path.join(root, "encoding-mojibake-report.json");
const scanRoots = ["app", "components", "lib", "docs"];
const extensions = new Set([".tsx", ".ts", ".md"]);
const ignoreDirs = new Set(["node_modules", ".next", "dist", "build", ".git"]);
const patterns = [
  "ÃƒÂ¤",
  "ÃƒÂ¶",
  "ÃƒÂ¼",
  "ÃƒÅ¸",
  "Ãƒâ€ž",
  "Ãƒâ€“",
  "ÃƒÅ“",
  "Ã¢â‚¬â€œ",
  "Ã¢â‚¬Å“",
  "Ã¢â‚¬Â",
  "ï¿½",
  "Ã¤",
  "Ã¶",
  "Ã¼",
  "ÃŸ",
  "Ã„",
  "Ã–",
  "Ãœ",
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (path.resolve(fullPath) === path.resolve(reportPath)) continue;
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function lineColumn(text, index) {
  const before = text.slice(0, index);
  const lines = before.split(/\r?\n/);
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

fs.mkdirSync(path.join(root, "docs"), { recursive: true });

const files = scanRoots.flatMap((dir) => walk(path.join(root, dir)));
const findings = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of patterns) {
    let index = text.indexOf(pattern);
    while (index !== -1) {
      const location = lineColumn(text, index);
      findings.push({
        file: path.relative(root, file).replace(/\\/g, "/"),
        pattern,
        line: location.line,
        column: location.column,
        excerpt: text.slice(Math.max(0, index - 40), Math.min(text.length, index + pattern.length + 40)).replace(/\s+/g, " "),
      });
      index = text.indexOf(pattern, index + pattern.length);
    }
  }
}

const grouped = new Map();
for (const item of findings) {
  const current = grouped.get(item.file) || { file: item.file, count: 0, samples: [] };
  current.count += 1;
  if (current.samples.length < 5) current.samples.push(item);
  grouped.set(item.file, current);
}

const groupedList = [...grouped.values()].sort((a, b) => b.count - a.count);
const status = findings.length ? "WARN" : "PASS";
const result = {
  status,
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  findings: findings.length,
  files: groupedList,
};

const report = `# Encoding Mojibake Report

Stand: ${new Date().toISOString()}

Status: ${status}

## Ergebnis

${findings.length ? "Mojibake-Muster wurden gefunden. Wegen breitem dirty Worktree wurden keine globalen Ersetzungen vorgenommen." : "Keine bekannten Mojibake-Muster gefunden."}

## Scope

- Gescannt: app/**/*.tsx, components/**/*.tsx, lib/**/*.ts, docs/**/*.md
- Ausgeschlossen: node_modules, .next, dist, build, .git
- Regel: nicht blind global ersetzen.

## Treffer nach Datei

| Datei | Treffer | Beispiele |
| --- | ---: | --- |
${groupedList.length ? groupedList.slice(0, 80).map((file) => `| ${file.file} | ${file.count} | ${file.samples.map((sample) => `${sample.pattern} @ ${sample.line}:${sample.column}`).join(", ")} |`).join("\n") : "| - | 0 | - |"}

## Entscheidung

- Eindeutige neue Risk-Closure-Dateien bleiben ASCII.
- Bestehende Mojibake-Faelle werden als WARN dokumentiert.
- Korrekturen sollten spaeter dateiweise erfolgen, nicht per globalem Replace.
`;

fs.writeFileSync(reportPath, report);
fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
console.log(`Encoding check status: ${status}`);
console.log(`Findings: ${findings.length}`);
console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
