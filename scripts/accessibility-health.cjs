const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonPath = path.join(root, "accessibility-health-report.json");
const mdPath = path.join(root, "ACCESSIBILITY_HEALTH_REPORT.md");

const ignoreDirs = new Set([".git", ".next", "node_modules", "out", "dist", "coverage"]);
const sourceDirs = ["app", "components"];

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full, predicate));
    } else if (predicate(full)) {
      files.push(full);
    }
  }

  return files;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function lineFor(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function collectTags(text, tagName) {
  const tags = [];
  const regex = new RegExp(`<${tagName}\\b`, "gi");
  let match;
  while ((match = regex.exec(text))) {
    const start = match.index;
    const close = text.indexOf(">", start);
    if (close === -1) break;
    tags.push({ tag: text.slice(start, close + 1), start, close });
  }
  return tags;
}

function collectButtonBlocks(text) {
  const blocks = [];
  const regex = /<button\b/gi;
  let match;
  while ((match = regex.exec(text))) {
    const start = match.index;
    const openEnd = text.indexOf(">", start);
    const end = text.indexOf("</button>", openEnd);
    if (openEnd === -1 || end === -1) continue;
    blocks.push({
      open: text.slice(start, openEnd + 1),
      inner: text.slice(openEnd + 1, end),
      start,
    });
  }
  return blocks;
}

function visibleText(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function item(status, label, detail, file, line = "") {
  return { status, label, detail, file, line };
}

function main() {
  const files = sourceDirs.flatMap((dir) =>
    walk(path.join(root, dir), (file) => /\.(tsx|jsx)$/.test(file)),
  );
  const layoutPath = path.join(root, "app", "layout.tsx");
  const siteChromePath = path.join(root, "components", "layout", "SiteChrome.tsx");
  const cssPath = path.join(root, "app", "globals.css");
  const layout = fs.existsSync(layoutPath) ? read(layoutPath) : "";
  const siteChrome = fs.existsSync(siteChromePath) ? read(siteChromePath) : "";
  const css = fs.existsSync(cssPath) ? read(cssPath) : "";

  const findings = [];
  const warnings = [];
  const stats = {
    files: files.length,
    imageTags: 0,
    imagesMissingAlt: 0,
    buttonTags: 0,
    unnamedButtons: 0,
    inputTags: 0,
    unlabeledInputs: 0,
    nonInteractiveClickHandlers: 0,
    hrefHash: 0,
    blankTargetsWithoutRel: 0,
    formsWithStatusSignals: 0,
  };

  if (!/href="#main-content"/.test(layout) || !/skip-to-content/.test(layout)) {
    findings.push(item("FAIL", "Skip link", "Root layout braucht Skip-Link zu #main-content.", "app/layout.tsx"));
  }
  if (!/id="main-content"[\s\S]*tabIndex=\{-1\}|id="main-content"[\s\S]*tabIndex="-1"/.test(siteChrome)) {
    findings.push(item("FAIL", "Focusable main target", "#main-content muss fuer Skip-Link fokussierbar sein.", "components/layout/SiteChrome.tsx"));
  }
  if (!/\.flox-mobile-action:focus-visible/.test(css)) {
    warnings.push(item("WARN", "Mobile CTA focus", "Mobile CTA braucht sichtbaren focus-visible Stil.", "app/globals.css"));
  }
  if (!/\.flox-mobile-action[\s\S]*overflow-wrap:\s*anywhere/.test(css)) {
    warnings.push(item("WARN", "Mobile CTA wrapping", "Mobile CTA sollte lange Labels umbrechen duerfen.", "app/globals.css"));
  }

  for (const file of files) {
    const text = read(file);
    const relative = rel(file);
    const images = [...collectTags(text, "img"), ...collectTags(text, "Image")];
    stats.imageTags += images.length;
    for (const tag of images) {
      if (!/\balt=/.test(tag.tag) && !/aria-hidden=["']true["']/.test(tag.tag)) {
        stats.imagesMissingAlt += 1;
        warnings.push(item("WARN", "Image alt", "Bild ohne alt-Attribut gefunden.", relative, lineFor(text, tag.start)));
      }
    }

    const buttons = collectButtonBlocks(text);
    stats.buttonTags += buttons.length;
    for (const button of buttons) {
      const hasName = /\baria-label=|\baria-labelledby=|\btitle=/.test(button.open) || visibleText(button.inner).length > 0;
      if (!hasName) {
        stats.unnamedButtons += 1;
        warnings.push(item("WARN", "Button name", "Button ohne erkennbaren Namen.", relative, lineFor(text, button.start)));
      }
    }

    const inputs = collectTags(text, "input");
    stats.inputTags += inputs.length;
    for (const input of inputs) {
      if (/type=["']?(hidden|checkbox|radio|file)/i.test(input.tag)) continue;
      if (/tabIndex=\{-1\}|tabIndex="-1"|name=["']website["']/.test(input.tag)) continue;
      const idMatch = input.tag.match(/\bid=["']([^"']+)["']/);
      const hasProgrammaticName =
        /\baria-label=|\baria-labelledby=/.test(input.tag) ||
        (idMatch && new RegExp(`htmlFor=["']${idMatch[1]}["']`).test(text));
      if (!hasProgrammaticName) {
        stats.unlabeledInputs += 1;
        warnings.push(item("WARN", "Input label", "Input ohne label/aria-label gefunden.", relative, lineFor(text, input.start)));
      }
    }

    const nonInteractive = [...text.matchAll(/<(div|span|li|section)\b[^>]*\bonClick=/g)];
    stats.nonInteractiveClickHandlers += nonInteractive.length;
    for (const match of nonInteractive.slice(0, 4)) {
      warnings.push(item("WARN", "Non-interactive click", `onClick auf <${match[1]}> gefunden.`, relative, lineFor(text, match.index)));
    }

    const hashLinks = [...text.matchAll(/href=["']#["']/g)];
    stats.hrefHash += hashLinks.length;
    for (const match of hashLinks.slice(0, 4)) {
      warnings.push(item("WARN", "Hash href", "href=\"#\" gefunden.", relative, lineFor(text, match.index)));
    }

    const blankTarget = [...text.matchAll(/<a\b(?=[^>]*target=["']_blank["'])(?![^>]*rel=)[^>]*>/g)];
    stats.blankTargetsWithoutRel += blankTarget.length;
    for (const match of blankTarget.slice(0, 4)) {
      warnings.push(item("WARN", "Blank target rel", "target=_blank ohne rel gefunden.", relative, lineFor(text, match.index)));
    }

    if (/<form\b/.test(text) && (/aria-invalid|aria-describedby|role=["']alert["']|aria-live/.test(text))) {
      stats.formsWithStatusSignals += 1;
    }
  }

  const status = findings.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const checks = [
    item("PASS", "Skip link present", "Skip-Link ist im Root Layout vorhanden.", "app/layout.tsx"),
    item("PASS", "Main target focus", "#main-content ist fokussierbar.", "components/layout/SiteChrome.tsx"),
    ...warnings,
    ...findings,
  ];

  const output = {
    status,
    generatedAt: new Date().toISOString(),
    stats,
    checks,
  };

  const topWarnings = warnings.slice(0, 80);
  const md = `# Accessibility Health Report

Generated: ${output.generatedAt}

Status: ${status}

## Summary

- Files scanned: ${stats.files}
- Image tags: ${stats.imageTags}
- Images missing alt: ${stats.imagesMissingAlt}
- Buttons: ${stats.buttonTags}
- Unnamed buttons: ${stats.unnamedButtons}
- Inputs: ${stats.inputTags}
- Inputs without label/aria-label: ${stats.unlabeledInputs}
- Non-interactive click handlers: ${stats.nonInteractiveClickHandlers}
- Forms with status signals: ${stats.formsWithStatusSignals}

## Checks

| Status | Check | Detail | File |
| --- | --- | --- | --- |
${checks.map((entry) => `| ${entry.status} | ${entry.label} | ${entry.detail.replace(/\|/g, "/")} | ${entry.file || "-"}${entry.line ? `:${entry.line}` : ""} |`).join("\n")}

## First Warnings

| Check | File | Detail |
| --- | --- | --- |
${topWarnings.length ? topWarnings.map((entry) => `| ${entry.label} | \`${entry.file}${entry.line ? `:${entry.line}` : ""}\` | ${entry.detail.replace(/\|/g, "/")} |`).join("\n") : "| - | - | - |"}

## Recommendations

- Keep the skip target focusable.
- Give icon-only buttons explicit labels.
- Prefer visible labels or aria-labels for form fields, especially on lead forms.
- Keep mobile CTA labels wrapping and focus-visible outlines.
`;

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(mdPath, md);
  console.log(`Accessibility health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, mdPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(findings.length ? 1 : 0);
}

main();
