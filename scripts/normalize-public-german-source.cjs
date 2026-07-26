#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const write = process.argv.includes("--write");
const requestedFiles = process.argv.slice(2).filter((value) => value !== "--write");

if (!requestedFiles.length) {
  console.error("Usage: node scripts/normalize-public-german-source.cjs [--write] <tsx-file> [...]");
  process.exit(2);
}

function loadGermanizer() {
  const file = path.join(root, "lib", "german-text.ts");
  const source = fs.readFileSync(file, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: file,
  }).outputText;
  const loadedModule = { exports: {} };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports,__filename,__dirname){${output}\n})`,
    { filename: file },
  );
  wrapper(require, loadedModule, loadedModule.exports, file, path.dirname(file));
  return loadedModule.exports.germanizeText;
}

const germanizeText = loadGermanizer();
const publicJsxAttributes = new Set([
  "alt",
  "answer",
  "aria-description",
  "aria-label",
  "badge",
  "cta",
  "description",
  "emptyText",
  "errorMessage",
  "eyebrow",
  "headline",
  "heading",
  "helperText",
  "intro",
  "label",
  "placeholder",
  "question",
  "subtitle",
  "successMessage",
  "text",
  "title",
]);
const machinePropertyNames = new Set([
  "@id",
  "canonical",
  "canonicalPage",
  "canonicalPages",
  "canonicalRoute",
  "category",
  "cityKey",
  "className",
  "contactParams",
  "expectedRelatedLinks",
  "group",
  "href",
  "htmlFor",
  "icon",
  "id",
  "intent",
  "key",
  "lang",
  "language",
  "locale",
  "locationKey",
  "locationKeys",
  "market",
  "method",
  "name",
  "path",
  "priority",
  "priorityPath",
  "query",
  "recommendedRoute",
  "rel",
  "route",
  "routes",
  "schemaVersion",
  "service",
  "serviceId",
  "serviceIds",
  "serviceKey",
  "serviceKeys",
  "relatedServices",
  "relatedSignatureServices",
  "slug",
  "slugs",
  "source",
  "src",
  "status",
  "target",
  "trackingCity",
  "trackingIntent",
  "trackingService",
  "type",
  "url",
  "urls",
  "value",
  "variant",
]);
const machineVariablePattern =
  /alias|canonical|category|city|class|group|href|html|icon|intent|key|lang|locale|location|method|path|priority|region|route|schema|service|slug|source|src|status|target|tracking|type|url|value|variant/i;

function germanizeJsxText(value) {
  return value
    .split(/(\r?\n)/)
    .map((line) => {
      if (/^\r?\n$/.test(line) || !line.trim()) return line;
      const leading = line.match(/^\s*/)?.[0] || "";
      const trailing = line.match(/\s*$/)?.[0] || "";
      return `${leading}${germanizeText(line.trim())}${trailing}`;
    })
    .join("");
}

function propertyName(node) {
  if (!node) return "";
  if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) return node.text;
  return "";
}

function isImportOrModulePath(node) {
  return (
    (ts.isImportDeclaration(node.parent) && node.parent.moduleSpecifier === node) ||
    (ts.isExportDeclaration(node.parent) && node.parent.moduleSpecifier === node)
  );
}

function shouldNormalizeLiteral(node) {
  if (isImportOrModulePath(node)) return false;
  if (
    ts.isPropertyAssignment(node.parent) && node.parent.name === node ||
    ts.isPropertyAccessExpression(node.parent) && node.parent.name === node ||
    ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node ||
    ts.isCaseClause(node.parent) ||
    ts.isLiteralTypeNode(node.parent)
  ) {
    return false;
  }

  if (ts.isJsxAttribute(node.parent)) {
    return publicJsxAttributes.has(propertyName(node.parent.name));
  }

  let current = node.parent;
  while (current && !ts.isSourceFile(current)) {
    if (ts.isJsxAttribute(current)) {
      return publicJsxAttributes.has(propertyName(current.name));
    }
    if (ts.isCallExpression(current)) {
      if (ts.isPropertyAccessExpression(current.expression) && current.expression.name.text === "map") {
        const mappedValue = current.expression.expression;
        let ancestor = node.parent;
        while (ancestor && ancestor !== current) {
          if (ancestor === mappedValue) return true;
          ancestor = ancestor.parent;
        }
      }
      return false;
    }
    if (ts.isNewExpression(current)) {
      return false;
    }
    if (
      ts.isBinaryExpression(current) ||
      ts.isSwitchStatement(current) ||
      ts.isImportDeclaration(current) ||
      ts.isExportDeclaration(current)
    ) {
      return false;
    }
    if (ts.isPropertyAssignment(current)) {
      return !machinePropertyNames.has(propertyName(current.name));
    }
    if (ts.isVariableDeclaration(current)) {
      const name = propertyName(current.name);
      return !machineVariablePattern.test(name);
    }
    if (ts.isJsxExpression(current)) {
      if (ts.isJsxAttribute(current.parent)) {
        return publicJsxAttributes.has(propertyName(current.parent.name));
      }
      return true;
    }
    if (ts.isReturnStatement(current)) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

function normalizeFile(requestedFile) {
  const file = path.resolve(root, requestedFile);
  if (!fs.existsSync(file)) {
    throw new Error(`File not found: ${requestedFile}`);
  }

  const source = fs.readFileSync(file, "utf8");
  const tree = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const replacements = [];

  function addReplacement(start, end, value) {
    if (start >= end || source.slice(start, end) === value) return;
    replacements.push({ start, end, value });
  }

  function visit(node) {
    if (ts.isJsxText(node)) {
      addReplacement(node.getStart(tree), node.end, germanizeJsxText(node.getText(tree)));
    } else if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      shouldNormalizeLiteral(node)
    ) {
      addReplacement(node.getStart(tree) + 1, node.end - 1, germanizeText(node.text));
    }
    ts.forEachChild(node, visit);
  }

  visit(tree);
  let normalized = source;
  for (const replacement of replacements.sort((left, right) => right.start - left.start)) {
    normalized =
      normalized.slice(0, replacement.start) +
      replacement.value +
      normalized.slice(replacement.end);
  }

  if (write && normalized !== source) {
    fs.writeFileSync(file, normalized, "utf8");
  }
  return { file: path.relative(root, file), replacements: replacements.length };
}

const results = requestedFiles.map(normalizeFile);
console.log(
  JSON.stringify(
    {
      mode: write ? "write" : "check",
      files: results.length,
      replacements: results.reduce((sum, item) => sum + item.replacements, 0),
      results,
    },
    null,
    2,
  ),
);
