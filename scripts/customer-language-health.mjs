import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SOURCE_ROOTS = ["app", "components", "lib", "data", "dictionaries"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".mdx"]);
const EXCLUDED_PARTS = [
  `${path.sep}app${path.sep}api${path.sep}`,
  `${path.sep}app${path.sep}admin${path.sep}`,
  `${path.sep}app${path.sep}dashboard${path.sep}`,
  `${path.sep}components${path.sep}dashboard${path.sep}`,
];

const INTERNAL_ONLY_FILES = new Set([
  "data/full-service-authority.json",
  "app/llms.txt/route.ts",
  "app/robots.ts",
  "app/seo-gone/route.ts",
  "app/service-graph.json/route.ts",
  "app/sitemap.xml/route.ts",
  "app/umzug-duesseldorf/route.ts",
  "components/ConversionEventReporter.tsx",
  "components/authority/FullServiceAuthorityExperience.tsx",
  "lib/conversion-events.ts",
  "lib/google-ads-conversions.ts",
  "lib/gsc-click-priorities.ts",
  "lib/indexnow.ts",
  "lib/lead-normalization.ts",
  "lib/lead-operations.ts",
  "lib/lead-priority.ts",
  "lib/lead-routing.ts",
  "lib/lead-summary.ts",
  "lib/lead-types.ts",
  "lib/lead-validation.ts",
  "lib/market-intelligence.ts",
  "lib/lead-reactivation.ts",
  "lib/local-seo/districts.ts",
  "lib/local-seo/keywordStrategy.ts",
  "lib/mail.ts",
  "lib/mail/notifications.ts",
  "lib/reputation-engine.ts",
  "lib/search-intent-aliases.ts",
  "lib/search-intent-keywords.ts",
  "lib/sitemap-xml.ts",
  "lib/supabase-admin.ts",
  "lib/supabase.ts",
]);

const visibleProps = new Set([
  "a",
  "alt",
  "answer",
  "aria-label",
  "badge",
  "body",
  "cta",
  "ctaLabel",
  "description",
  "directAnswer",
  "eyebrow",
  "headline",
  "heading",
  "intro",
  "label",
  "metaDescription",
  "placeholder",
  "promise",
  "q",
  "question",
  "seoTitle",
  "shortDescription",
  "subheadline",
  "subtitle",
  "text",
  "title",
]);

const internalProps = new Set([
  "@id",
  "canonical",
  "city",
  "cityKey",
  "className",
  "contactService",
  "dataAttributes",
  "defaultCity",
  "defaultIntent",
  "destination",
  "entryPoint",
  "event",
  "href",
  "id",
  "intent",
  "intentKey",
  "key",
  "locationKey",
  "name",
  "path",
  "priority",
  "query",
  "route",
  "service",
  "serviceKey",
  "slug",
  "source",
  "src",
  "url",
  "value",
  "passedChecks",
  "forbiddenClaims",
]);

const ruleGroups = [
  {
    category: "interner Begriff",
    severity: "HIGH",
    replacement: "Mit einer verständlichen Kundenbezeichnung ersetzen.",
    patterns: [
      /\bLead(?:\s+(?:Quality|Routing|Priority|Score))?\b/gi,
      /\b(?:Page|Service|Kunden|Anfrage)[ -]?Intent\b/gi,
      /\b(?:Service|Anfrage)[ -]?Routing\b/gi,
      /\b(?:Request )?Payload\b/gi,
      /\b(?:Request Summary|Manual Review|Service Key|Intent Key|Location Key|City Key)\b/gi,
      /\bKontaktparameter\b/gi,
      /\binterne (?:Einordnung|Priorisierung)\b/gi,
      /\b(?:Conversion|Funnel|Mapping|Routing|Tracking|Priority|Health Check|Backlog|Ticket)\b/gi,
      /\b(?:Trust Proof|Local Proof|Local Hub|Knowledge Hub|Content Authority|manuell offen)\b/gi,
      /\bP[0-3]\b/g,
    ],
  },
  {
    category: "Entwicklerbegriff",
    severity: "HIGH",
    replacement: "Technische Abläufe nicht erklären; die Kundenhandlung nennen.",
    patterns: [
      /\bAPI(?: Route)?\b/gi,
      /\b(?:Server|Client) Component\b/gi,
      /\b(?:Server Function|Function Invocation|Runtime|Node\.js|ISR|SSR|SSG|Hydration)\b/gi,
      /\b(?:Validation Error|Database Error|Request failed|Internal Server Error|Submit Error)\b/gi,
      /\b(?:Vercel|Supabase|Resend)\b/gi,
    ],
  },
  {
    category: "Suchmaschinen-Fachsprache",
    severity: "HIGH",
    replacement: "Leistung, Ort und konkrete Kundensituation nennen.",
    patterns: [
      /\b(?:SEO|SERP|GSC|CTR|LLM|GEO|AEO)\b/gi,
      /\b(?:Keyword(?:-Cluster)?|Money-Page|Search Intent|Landingpage|AI Answer|Quick Answer)\b/gi,
      /\b(?:Indexierung|indexierbar|noindex|Canonical|hreflang|Sitemap|Structured Data|JSON-LD|Core Web Vitals|Lighthouse)\b/gi,
      /\b(?:AI Visibility|KI-Ranking|Conversion Rate)\b/gi,
      /\b(?:Ranking|Short-Tail|Long-Tail|Search Console|Suchphrase|Doorway(?: Page)?|Worktree)\b/gi,
      /\b(?:GBP|LocalBusiness)\b/g,
    ],
  },
  {
    category: "roher Schlüssel oder Slug",
    severity: "HIGH",
    replacement: "Den internen Wert über ein deutsches Display-Label ausgeben.",
    patterns: [
      /\b(?:serviceKey|intentKey|locationKey|sourcePage|requestSummary|trackingIntent|manualReview)\b/g,
      /\b(?:angebot-pruefen|bueroreinigung|gewerbereinigung|klaviertransport|entruempelung|duesseldorf|pv-anlagen-reinigung|diskret-service)\b/g,
      /\b(?:city|service|intent|source|priority)=[a-z0-9_-]+\b/gi,
    ],
  },
  {
    category: "Encoding-Fehler",
    severity: "HIGH",
    replacement: "Die betroffene Textquelle gezielt als UTF-8 korrigieren.",
    patterns: [/ï¿½|Ãƒ|Ã¢|DÃ|BÃ|â€|\uFFFD/g],
  },
  {
    category: "abstrakte Formulierung",
    severity: "MEDIUM",
    replacement: "Konkret sagen, welche Angaben geprüft werden oder was als Nächstes passiert.",
    patterns: [
      /\b(?:strukturiert(?:e|en|er|es)?|Aufwandstreiber|Service-?Cluster(?:n)?|Serviceweg(?:e|en)?)\b/gi,
      /\b(?:nächster sinnvoller Schritt|passender nächster Schritt)\b/gi,
    ],
  },
  {
    category: "unzulässiges Versprechen",
    severity: "HIGH",
    replacement: "Als unverbindliche Prüfung ohne Garantie formulieren.",
    patterns: [
      /\b(?:Soforttermin garantiert|Kautionsgarantie|Übergabegarantie|Ersparnis garantiert|Ranking garantiert)\b/gi,
      /\b(?:garantiert günstiger|garantiert verfügbar|100 Prozent Zufriedenheit)\b/gi,
      /\b(?:Abnahmegarantie|100\s*%\s*Abnahmegarantie|garantieren (?:Ihnen )?Verfügbarkeit|garantieren die Akzeptanz)\b/gi,
      /\b(?:sichern Sie sich Ihre Mietkaution|Rund um die Uhr verfügbar|rund um die Uhr einsatzbereit)\b/gi,
      /\b(?:[A-Za-zÄÖÜäöüß-]*garantie[A-Za-zÄÖÜäöüß-]*|garantier[A-Za-zÄÖÜäöüß]*)\b/gi,
    ],
  },
  {
    category: "unbelegte Preis-, Zeit- oder Leistungsangabe",
    severity: "HIGH",
    replacement: "Nur nachweisbare Angaben verwenden und Preis oder Termin von den konkreten Eckdaten abhängig machen.",
    patterns: [
      /\b\d{2,}\s*(?:€|Euro)\b/gi,
      /\b(?:24|48)\s*(?:bis|-)\s*(?:48|72)\s*Stunden\b/gi,
      /\binnerhalb von 24 Stunden\b/gi,
      /\bJeder Transport ist\b/gi,
      /\bkostenlose Besichtigung\b/gi,
      /\bkostenlose Nachreinigung\b/gi,
      /\b(?:24h|24\/7|Sofortpreis)\b/gi,
      /\b(?:zertifiziert(?:e|en|er|es)?|voll(?:umfänglich)? versichert|volle Versicherung)\b/gi,
      /\borganisieren wir die offizielle Beantragung\b/gi,
    ],
  },
];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(absolute));
      continue;
    }
    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

function propertyName(node) {
  if (!node) return "";
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return "";
}

function isInternalPropertyName(name) {
  return internalProps.has(name)
    || name.startsWith("data-")
    || /(?:href|url|path|slug|key|source|intent|priority|route|event|tracking|canonical|target|params|keywords|aliases|components|schema|version|indexStatus)$/i.test(name);
}

function looksLikeMachineValue(value) {
  const trimmed = value.trim();
  return /^(?:https?:|mailto:|tel:|sms:|whatsapp:|\/|#)/i.test(trimmed)
    || /[?&](?:service|city|intent|source|priority)=/i.test(trimmed)
    || (!/\s/.test(trimmed) && /^[a-z0-9_./:@?#=&-]+$/i.test(trimmed));
}

function routeForFile(relativeFile) {
  const normalized = relativeFile.replaceAll("\\", "/");
  if (!normalized.startsWith("app/") || !/\/page\.[jt]sx?$/.test(normalized)) return "gemeinsam genutzt";
  const route = normalized.replace(/^app/, "").replace(/\/page\.[jt]sx?$/, "");
  return route || "/";
}

function locationForNode(sourceFile, node) {
  const start = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return { line: start.line + 1, column: start.character + 1 };
}

function jsxAttributeClassification(attribute) {
  const name = attribute.name.getText();
  if (isInternalPropertyName(name) || name === "class") return "internal_only";
  if (visibleProps.has(name)) return "customer_visible";
  return "uncertain";
}

function classifyStringNode(node) {
  const parent = node.parent;
  if (!parent) return "uncertain";
  if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) || ts.isExternalModuleReference(parent)) {
    return "internal_only";
  }
  if (ts.isJsxAttribute(parent)) return jsxAttributeClassification(parent);
  if (ts.isJsxExpression(parent)) {
    if (parent.parent && ts.isJsxAttribute(parent.parent)) return jsxAttributeClassification(parent.parent);
    return "customer_visible";
  }
  if (ts.isPropertyAssignment(parent)) {
    const name = propertyName(parent.name);
    if (isInternalPropertyName(name)) return "internal_only";
    if (visibleProps.has(name)) return "customer_visible";
  }
  if (ts.isArrayLiteralExpression(parent)) {
    const owner = parent.parent;
    if (ts.isPropertyAssignment(owner)) {
      const name = propertyName(owner.name);
      if (isInternalPropertyName(name)) return "internal_only";
      if (visibleProps.has(name)) return "customer_visible";
    }
    if (ts.isVariableDeclaration(owner) && owner.name && /(?:routes|paths|slugs|keys|keywords|aliases|ids)$/i.test(owner.name.getText())) {
      return "internal_only";
    }
    return "uncertain";
  }
  if (ts.isCallExpression(parent)) {
    const callee = parent.expression.getText();
    if (/^(?:console\.|dispatch|logger|fetch|Error)/i.test(callee)) return "internal_only";
  }
  return "uncertain";
}

function extractTsText(absoluteFile, relativeFile) {
  const source = fs.readFileSync(absoluteFile, "utf8");
  const kind = relativeFile.endsWith(".tsx") || relativeFile.endsWith(".jsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(relativeFile, source, ts.ScriptTarget.Latest, true, kind);
  const entries = [];

  function add(node, text, classification) {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized || normalized.length < 2) return;
    const resolvedClassification = classification === "uncertain" && looksLikeMachineValue(normalized)
      ? "internal_only"
      : classification;
    entries.push({
      text: normalized,
      classification: INTERNAL_ONLY_FILES.has(relativeFile.replaceAll("\\", "/")) ? "internal_only" : resolvedClassification,
      ...locationForNode(sourceFile, node),
    });
  }

  function visit(node) {
    if (ts.isJsxText(node)) {
      add(node, node.getText(sourceFile), "customer_visible");
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      add(node, node.text, classifyStringNode(node));
    } else if (ts.isTemplateExpression(node)) {
      const staticText = `${node.head.text} ${node.templateSpans.map((span) => span.literal.text).join(" ")}`;
      add(node, staticText, classifyStringNode(node));
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return entries;
}

function extractJsonText(absoluteFile, relativeFile) {
  const parsed = JSON.parse(fs.readFileSync(absoluteFile, "utf8"));
  const entries = [];
  const publicDictionary = relativeFile.replaceAll("\\", "/") === "dictionaries/de.json";
  function visit(value, key = "", pathParts = []) {
    if (typeof value === "string") {
      const classification = isInternalPropertyName(key)
        ? "internal_only"
        : publicDictionary || visibleProps.has(key)
          ? "customer_visible"
          : "uncertain";
      entries.push({ text: value.replace(/\s+/g, " ").trim(), classification, line: 1, column: 1, jsonPath: pathParts.join(".") });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, key, [...pathParts, String(index)]));
      return;
    }
    if (value && typeof value === "object") {
      Object.entries(value).forEach(([nestedKey, nested]) => visit(nested, nestedKey, [...pathParts, nestedKey]));
    }
  }
  visit(parsed);
  return entries;
}

function isAllowedFinding(relativeFile, match) {
  const normalized = relativeFile.replaceAll("\\", "/");
  if (normalized === "app/datenschutz/page.tsx" && /^(?:Vercel|Supabase|Resend)$/i.test(match)) return true;
  if (
    /^50\s*Euro$/i.test(match)
    && /^(?:app\/empfehlen\/page\.tsx|components\/ReferralPartnerCodeForm\.tsx|lib\/seo-dominance\.ts)$/.test(normalized)
  ) return true;
  if (normalized.startsWith("app/en/") && /^(?:SEO|hreflang)$/i.test(match)) return false;
  return false;
}

function snippet(text, match) {
  const index = text.toLowerCase().indexOf(match.toLowerCase());
  const start = Math.max(0, index - 80);
  const end = Math.min(text.length, index + match.length + 100);
  return text.slice(start, end).replaceAll("|", "\\|");
}

function scanEntry(entry, context) {
  const findings = [];
  const seen = new Set();
  for (const group of ruleGroups) {
    for (const pattern of group.patterns) {
      pattern.lastIndex = 0;
      for (const match of entry.text.matchAll(pattern)) {
        if (isAllowedFinding(context.file, match[0])) continue;
        if (group.category === "unzulässiges Versprechen" || group.category === "unbelegte Preis-, Zeit- oder Leistungsangabe") {
          const before = entry.text.slice(Math.max(0, match.index - 60), match.index).toLowerCase();
          const after = entry.text.slice(match.index, Math.min(entry.text.length, match.index + 100)).toLowerCase();
          if (/\b(?:kein(?:e|en|er|es)?|nicht|nie|niemals|niemand|ohne|statt)\b/.test(before) || /\b(?:kein(?:e|en|er|es)?|nicht|nie|niemals)\b/.test(after) || entry.text.trim().endsWith("?")) continue;
        }
        const findingKey = `${group.category}:${match.index}:${match[0].toLowerCase()}`;
        if (seen.has(findingKey)) continue;
        seen.add(findingKey);
        findings.push({
          file: context.file,
          route: context.route,
          line: entry.line,
          term: match[0],
          excerpt: snippet(entry.text, match[0]),
          classification: entry.classification,
          severity: group.severity,
          category: group.category,
          recommendation: group.replacement,
          status: entry.classification === "customer_visible" ? "offen" : entry.classification === "uncertain" ? "prüfen" : "zulässig",
        });
      }
    }
  }

  if (entry.text.length > 500 && entry.classification !== "internal_only") {
    findings.push({
      file: context.file,
      route: context.route,
      line: entry.line,
      term: "sehr langer Text",
      excerpt: `${entry.text.slice(0, 180).replaceAll("|", "\\|")} …`,
      classification: entry.classification,
      severity: "LOW",
      category: "sehr langer Absatz",
      recommendation: "In kürzere Absätze mit jeweils einem Gedanken aufteilen.",
      status: entry.classification === "customer_visible" ? "offen" : "prüfen",
    });
  }
  return findings;
}

const files = SOURCE_ROOTS.flatMap((root) => walk(path.join(ROOT, root)))
  .filter((file) => !EXCLUDED_PARTS.some((part) => file.includes(part)))
  .filter((file) => path.relative(ROOT, file).replaceAll("\\", "/") !== "data/bookings.json")
  .sort();

const findings = [];
const visibleTextCounts = new Map();
let visibleTextEntries = 0;

for (const absoluteFile of files) {
  const relativeFile = path.relative(ROOT, absoluteFile);
  let entries = [];
  try {
    entries = relativeFile.endsWith(".json") ? extractJsonText(absoluteFile, relativeFile) : extractTsText(absoluteFile, relativeFile);
  } catch (error) {
    findings.push({
      file: relativeFile,
      route: routeForFile(relativeFile),
      line: 1,
      term: "Datei nicht analysierbar",
      excerpt: error instanceof Error ? error.message.replaceAll("|", "\\|") : "Unbekannter Lesefehler",
      classification: "uncertain",
      severity: "MEDIUM",
      category: "Scanfehler",
      recommendation: "Datei manuell prüfen.",
      status: "prüfen",
    });
    continue;
  }

  for (const entry of entries) {
    if (INTERNAL_ONLY_FILES.has(relativeFile.replaceAll("\\", "/"))) {
      entry.classification = "internal_only";
    }
    if (entry.classification === "customer_visible") {
      visibleTextEntries += 1;
      const count = visibleTextCounts.get(entry.text) || 0;
      visibleTextCounts.set(entry.text, count + 1);
    }
    findings.push(...scanEntry(entry, { file: relativeFile, route: routeForFile(relativeFile) }));
  }
}

for (const [text, count] of visibleTextCounts) {
  if (count < 8 || text.length < 24) continue;
  findings.push({
    file: "mehrere Quellen",
    route: "mehrere Seiten",
    line: 0,
    term: `${count} Wiederholungen`,
    excerpt: text.slice(0, 220).replaceAll("|", "\\|"),
    classification: "uncertain",
    severity: "LOW",
    category: "häufig wiederholter Text",
    recommendation: "Prüfen, ob der Text service-spezifischer formuliert werden sollte.",
    status: "prüfen",
  });
}

findings.sort((a, b) => {
  const classificationOrder = { customer_visible: 0, uncertain: 1, internal_only: 2 };
  const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  return classificationOrder[a.classification] - classificationOrder[b.classification]
    || severityOrder[a.severity] - severityOrder[b.severity]
    || a.file.localeCompare(b.file, "de")
    || a.line - b.line;
});

const summary = {
  scannedFiles: files.length,
  scannedRoutes: new Set(files.map((file) => routeForFile(path.relative(ROOT, file))).filter((route) => route !== "gemeinsam genutzt")).size,
  visibleTextEntries,
  customerVisible: findings.filter((item) => item.classification === "customer_visible").length,
  uncertain: findings.filter((item) => item.classification === "uncertain").length,
  internalOnly: findings.filter((item) => item.classification === "internal_only").length,
  high: findings.filter((item) => item.severity === "HIGH").length,
  medium: findings.filter((item) => item.severity === "MEDIUM").length,
  low: findings.filter((item) => item.severity === "LOW").length,
};

const blocking = findings.filter((item) => item.classification === "customer_visible" && item.severity !== "LOW");
const status = blocking.length > 0 ? "FAIL" : "PASS";
const generatedAt = new Date().toISOString();
const report = { status, generatedAt, summary, findings };

const markdownRows = findings.filter((item) => item.classification !== "internal_only").map((item) =>
  `| ${item.file}:${item.line || "-"} | ${item.route} | ${item.term.replaceAll("|", "\\|")} | ${item.excerpt} | ${item.classification} | ${item.severity} | ${item.recommendation} | ${item.status} |`,
);

const markdown = `# Customer Language Health Report

Stand: ${generatedAt}

Status: **${status}**

## Zusammenfassung

- Geprüfte Textquellen: ${summary.scannedFiles}
- Ableitbare öffentliche Routen: ${summary.scannedRoutes}
- Erkannte sichtbare Texteinträge: ${summary.visibleTextEntries}
- Kundensichtbare Funde: ${summary.customerVisible}
- Unsichere Funde: ${summary.uncertain}
- Als intern erkannte Funde: ${summary.internalOnly}
- HIGH / MEDIUM / LOW: ${summary.high} / ${summary.medium} / ${summary.low}

Nur 'customer_visible' mit HIGH oder MEDIUM löst FAIL aus. Interne Props, Links, Routingwerte und 'data-*'-Attribute bleiben zulässig.

## Funde

| Datei | Route | Begriff | Textausschnitt | Klassifikation | Schweregrad | Empfehlung | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
${markdownRows.length ? markdownRows.join("\n") : "| – | – | – | Keine Funde | – | – | – | erledigt |"}
`;

fs.writeFileSync(path.join(ROOT, "CUSTOMER_LANGUAGE_HEALTH_REPORT.md"), markdown, "utf8");
fs.writeFileSync(path.join(ROOT, "customer-language-health-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`Customer language health: ${status}`);
console.log(`Scanned files: ${summary.scannedFiles}; routes: ${summary.scannedRoutes}; visible findings: ${summary.customerVisible}; uncertain: ${summary.uncertain}`);
process.exitCode = status === "FAIL" ? 1 : 0;
