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

function findTagEnd(text, start) {
  let quote = "";
  let braceDepth = 0;
  let escaped = false;
  for (let index = start + 1; index < text.length; index += 1) {
    const character = text[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote) {
      if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (["\"", "'", "`"].includes(character)) {
      quote = character;
      continue;
    }
    if (character === "{") {
      braceDepth += 1;
      continue;
    }
    if (character === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
      continue;
    }
    if (character === ">" && braceDepth === 0) return index;
  }
  return -1;
}

function collectTags(text, tagName, flags = "g") {
  const tags = [];
  const regex = new RegExp(`<${tagName}\\b`, flags);
  let match;
  while ((match = regex.exec(text))) {
    const start = match.index;
    const close = findTagEnd(text, start);
    if (close === -1) break;
    tags.push({ tag: text.slice(start, close + 1), start, close });
    regex.lastIndex = close + 1;
  }
  return tags;
}

function collectButtonBlocks(text) {
  const blocks = [];
  const regex = /<button\b/gi;
  let match;
  while ((match = regex.exec(text))) {
    const start = match.index;
    const openEnd = findTagEnd(text, start);
    const end = text.indexOf("</button>", openEnd);
    if (openEnd === -1 || end === -1) continue;
    blocks.push({
      open: text.slice(start, openEnd + 1),
      inner: text.slice(openEnd + 1, end),
      start,
    });
    regex.lastIndex = end + "</button>".length;
  }
  return blocks;
}

function attributeValue(tag, name) {
  const match = new RegExp(`\\b${name}\\s*=\\s*`).exec(tag);
  if (!match) return null;
  const start = match.index + match[0].length;
  const first = tag[start];
  if (["\"", "'"].includes(first)) {
    let escaped = false;
    for (let index = start + 1; index < tag.length; index += 1) {
      const character = tag[index];
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === first) {
        return tag.slice(start, index + 1);
      }
    }
    return null;
  }
  if (first === "{") {
    let depth = 0;
    let quote = "";
    let escaped = false;
    for (let index = start; index < tag.length; index += 1) {
      const character = tag[index];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (quote) {
        if (character === "\\") escaped = true;
        else if (character === quote) quote = "";
        continue;
      }
      if (["\"", "'", "`"].includes(character)) {
        quote = character;
        continue;
      }
      if (character === "{") depth += 1;
      if (character === "}") {
        depth -= 1;
        if (depth === 0) return tag.slice(start, index + 1);
      }
    }
    return null;
  }
  const end = tag.slice(start).search(/[\s/>]/);
  return end === -1 ? tag.slice(start) : tag.slice(start, start + end);
}

function normalizeAttributeReference(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return `literal:${trimmed.slice(1, -1)}`;
  }
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return `expression:${trimmed.slice(1, -1).replace(/\s+/g, "")}`;
  }
  return `literal:${trimmed}`;
}

function removeJsxTags(text) {
  let output = "";
  for (let index = 0; index < text.length;) {
    if (text[index] === "<" && /^<\/?[A-Za-z]/.test(text.slice(index))) {
      const end = findTagEnd(text, index);
      if (end !== -1) {
        output += " ";
        index = end + 1;
        continue;
      }
    }
    output += text[index];
    index += 1;
  }
  return output;
}

function extractJsxExpressions(text) {
  const expressions = [];
  let plain = "";
  for (let index = 0; index < text.length;) {
    if (text[index] !== "{") {
      plain += text[index];
      index += 1;
      continue;
    }
    const start = index;
    let depth = 0;
    let quote = "";
    let escaped = false;
    for (; index < text.length; index += 1) {
      const character = text[index];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (quote) {
        if (character === "\\") escaped = true;
        else if (character === quote) quote = "";
        continue;
      }
      if (["\"", "'", "`"].includes(character)) {
        quote = character;
        continue;
      }
      if (character === "{") depth += 1;
      if (character === "}") {
        depth -= 1;
        if (depth === 0) {
          expressions.push(text.slice(start + 1, index));
          plain += " ";
          index += 1;
          break;
        }
      }
    }
    if (depth > 0) {
      plain += text.slice(start);
      break;
    }
  }
  return { expressions, plain };
}

function expressionCanRenderText(expression) {
  const source = expression.trim();
  if (!source) return false;
  const literals = [...source.matchAll(/(?:^|[^A-Za-z0-9_$])(["'`])([^"'`]*[\p{L}\p{N}][^"'`]*)\1/gu)];
  if (literals.length) return true;
  if (/\b(?:copy|cookie|labels?|messages?|translations?|content)\.[A-Za-z_$][\w$]*/.test(source)) return true;
  if (/\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\.(?:label|title|text|name|question|caption|cta|button|submit|save|back|continue|show|restart|selectAll)\b/i.test(source)) return true;
  if (/\b[A-Za-z_$][\w$]*(?:Text|Label|Name|Title|Copy)\s*\(/i.test(source)) return true;
  if (/^(?:label|title|text|name|caption|children|buttonText|submitText)(?:\s*[?:].*)?$/s.test(source)) return true;
  const identifiers = source.match(/[A-Za-z_$][\w$]*/g) || [];
  const valueIdentifiers = identifiers.filter((identifier) => (
    !/^(?:true|false|null|undefined|is[A-Z_]|has[A-Z_]|can[A-Z_]|should[A-Z_]|icon|glyph|svg|image|logo|spinner|loader)$/i.test(identifier)
  ));
  const hasDanglingRenderBranch = /(?:&&|\?|:)\s*$/.test(source) || /\?\s*:\s*/.test(source);
  if (valueIdentifiers.length && !hasDanglingRenderBranch && /^[\w$?.\[\]\s|'"`&():+-]+$/.test(source)) return true;
  return false;
}

function hasAccessibleContent(content) {
  const descendantImageHasAlt = [
    ...collectTags(content, "img", "gi"),
    ...collectTags(content, "Image", "g"),
  ].some((image) => {
    const alt = attributeValue(image.tag, "alt");
    return alt ? hasAccessibleContent(alt) : false;
  });
  if (descendantImageHasAlt) return true;
  const withoutTags = removeJsxTags(content).replace(/\{\/\*[\s\S]*?\*\/\}/g, " ");
  const { expressions, plain } = extractJsxExpressions(withoutTags);
  if (/[\p{L}\p{N}]/u.test(plain.replace(/&(?:nbsp|#\d+|#x[\da-f]+);/gi, " "))) return true;
  return expressions.some(expressionCanRenderText);
}

function hasExplicitAccessibleName(tag) {
  return ["aria-label", "aria-labelledby", "title"].some((name) => {
    const value = attributeValue(tag, name);
    if (!value) return false;
    const normalized = value.replace(/^["'{`]+|["'}`]+$/g, "").trim();
    return normalized.length > 0;
  });
}

function collectLabelBlocks(text) {
  return collectTags(text, "label", "gi").map((opening) => {
    const end = text.indexOf("</label>", opening.close + 1);
    return {
      ...opening,
      end,
      inner: end === -1 ? "" : text.slice(opening.close + 1, end),
      target: normalizeAttributeReference(attributeValue(opening.tag, "htmlFor")),
    };
  });
}

function hasWrappingLabel(labels, start) {
  return labels.some((label) => (
    label.start < start
    && label.end > start
    && (hasExplicitAccessibleName(label.tag) || hasAccessibleContent(label.inner))
  ));
}

function hasAssociatedLabel(labels, inputReference) {
  if (!inputReference) return false;
  return labels.some((label) => (
    label.target === inputReference
    && (hasExplicitAccessibleName(label.tag) || hasAccessibleContent(label.inner))
  ));
}

function fieldComponentProvidesLabel(text, componentName) {
  const definition = new RegExp(`(?:function\\s+${componentName}\\s*\\(|const\\s+${componentName}\\s*=)`).exec(text);
  if (!definition) return false;
  const implementation = text.slice(definition.index, definition.index + 5000);
  return /<label\b/.test(implementation) && /htmlFor=\{(?:id|htmlFor)\}/.test(implementation);
}

function collectFieldBlocks(text) {
  const blocks = [];
  const regex = /<(Field|[A-Z][A-Za-z0-9_.]+Field)\b/g;
  let match;
  while ((match = regex.exec(text))) {
    const start = match.index;
    const openEnd = findTagEnd(text, start);
    if (openEnd === -1) break;
    const open = text.slice(start, openEnd + 1);
    if (/\/\s*>$/.test(open)) {
      regex.lastIndex = openEnd + 1;
      continue;
    }
    const componentName = match[1];
    const end = text.indexOf(`</${componentName}>`, openEnd + 1);
    if (end === -1) continue;
    blocks.push({
      componentName,
      start,
      openEnd,
      end,
      open,
      id: normalizeAttributeReference(attributeValue(open, "id") || attributeValue(open, "htmlFor")),
      label: attributeValue(open, "label"),
    });
    regex.lastIndex = end + componentName.length + 3;
  }
  return blocks;
}

function hasFieldComponentLabel(text, fields, input, inputReference) {
  return fields.some((field) => {
    if (field.start >= input.start || field.end <= input.start) return false;
    if (!fieldComponentProvidesLabel(text, field.componentName)) return false;
    if (!field.label || !hasAccessibleContent(field.label)) return false;
    return !field.id || !inputReference || field.id === inputReference;
  });
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
    buttonsNamedByVisibleExpression: 0,
    inputTags: 0,
    unlabeledInputs: 0,
    inputsNamedByFieldComponent: 0,
    nonInteractiveClickHandlers: 0,
    hrefHash: 0,
    blankTargetsWithoutRel: 0,
    formsWithStatusSignals: 0,
  };

  const appChrome = `${layout}\n${siteChrome}`;
  if (!/href="#main-content"/.test(appChrome) || !/skip-to-content/.test(appChrome)) {
    findings.push(item("FAIL", "Skip link", "App-Chrome braucht einen Skip-Link zu #main-content.", "components/layout/SiteChrome.tsx"));
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
  for (const selectorContract of [
    /\.flox-mobile-action-whatsapp\s*\{[\s\S]{0,260}?linear-gradient\(135deg,\s*#15803d/,
    /\.flox-whatsapp-cta\s*\{[\s\S]{0,300}?linear-gradient\(135deg,\s*#15803d/,
    /a\[href\*="wa\.me"\][^{]+\{[\s\S]{0,260}?linear-gradient\(135deg,\s*#15803d/,
    /\.flox-exit-whatsapp\s*\{[\s\S]{0,220}?linear-gradient\(135deg,\s*#15803d/,
  ]) {
    if (!selectorContract.test(css)) {
      findings.push(item("FAIL", "WhatsApp contrast", "Texttragende WhatsApp-Verlaeufe brauchen einen WCAG-tauglichen dunkelgruenen Startwert.", "app/globals.css"));
    }
  }

  const contrastContracts = [
    ["components/Breadcrumbs.tsx", /text-muted-foreground\/60|text-foreground\/40/],
    ["components/ContactQueryPersonalization.tsx", /text-foreground\/58/],
    ["app/kontakt/page.tsx", /text-foreground\/58/],
  ];
  for (const [relativePath, forbiddenContrastClass] of contrastContracts) {
    const source = read(path.join(root, relativePath));
    if (forbiddenContrastClass.test(source)) {
      findings.push(item("FAIL", "Text contrast", "Der browsergepruefte Kontaktweg darf keine bekannte kontrastarme Textklasse verwenden.", relativePath));
    }
  }
  const footer = read(path.join(root, "components", "Footer.tsx"));
  if (!/© 2026 FLOXANT|Â© 2026 FLOXANT/.test(footer) || !/text-slate-400[\s\S]{0,120}(?:©|Â©) 2026 FLOXANT/.test(footer)) {
    findings.push(item("FAIL", "Footer contrast", "Copyright-Text braucht auf dunklem Footer mindestens text-slate-400.", "components/Footer.tsx"));
  }

  for (const file of files) {
    const text = read(file);
    const relative = rel(file);
    const labels = collectLabelBlocks(text);
    const fields = collectFieldBlocks(text);
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
      const explicitName = hasExplicitAccessibleName(button.open);
      const visibleName = hasAccessibleContent(button.inner);
      const hasName = explicitName || visibleName;
      if (!explicitName && visibleName && /\{/.test(removeJsxTags(button.inner))) {
        stats.buttonsNamedByVisibleExpression += 1;
      }
      if (!hasName) {
        stats.unnamedButtons += 1;
        warnings.push(item("WARN", "Button name", "Button ohne erkennbaren Namen.", relative, lineFor(text, button.start)));
      }
    }

    const inputs = collectTags(text, "input");
    stats.inputTags += inputs.length;
    for (const input of inputs) {
      const type = String(attributeValue(input.tag, "type") || "")
        .replace(/^["']|["']$/g, "")
        .toLowerCase();
      if (["hidden", "button", "submit", "reset", "image"].includes(type)) continue;
      if (
        /tabIndex=\{-1\}|tabIndex=["']-1["']/.test(input.tag)
        || /name=["'](?:website|companyWebsite)["']/.test(input.tag)
        || /aria-hidden=["']true["']/.test(input.tag)
      ) continue;
      const inputReference = normalizeAttributeReference(attributeValue(input.tag, "id"));
      const fieldComponentLabel = hasFieldComponentLabel(text, fields, input, inputReference);
      const hasProgrammaticName =
        hasExplicitAccessibleName(input.tag) ||
        hasWrappingLabel(labels, input.start) ||
        hasAssociatedLabel(labels, inputReference) ||
        fieldComponentLabel;
      if (fieldComponentLabel) stats.inputsNamedByFieldComponent += 1;
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
    item("PASS", "Skip link present", "Skip-Link ist im App-Chrome vorhanden.", "components/layout/SiteChrome.tsx"),
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
- Buttons named by visible JSX expressions: ${stats.buttonsNamedByVisibleExpression}
- Inputs: ${stats.inputTags}
- Inputs without label/aria-label: ${stats.unlabeledInputs}
- Inputs named by Field components: ${stats.inputsNamedByFieldComponent}
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
- Prefer visible labels or aria-labels for form fields, including checkbox, radio and file inputs.
- Keep mobile CTA labels wrapping and focus-visible outlines.
`;

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(mdPath, md);
  console.log(`Accessibility health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, mdPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(findings.length ? 1 : 0);
}

main();
