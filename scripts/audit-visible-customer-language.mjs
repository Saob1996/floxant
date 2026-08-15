import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, process.env.PUBLIC_OUTPUT_DIR || "out");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const OUTPUT_FILE = path.join(ARTIFACT_DIR, "visible-customer-language-audit.csv");

const REQUIRED_ROUTES = [
  "/",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
  "/duesseldorf/gewerbereinigung",
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung",
  "/klaviertransport-regensburg",
  "/kontakt",
  "/leistungen",
  "/fragen",
  "/rechner",
  "/umzug-kosten-rechner",
  "/reinigung-preis-rechner",
  "/duesseldorf/reinigung/anfrage",
  "/umzug-regensburg/anfrage",
  "/dashboard/login",
];

const DUESSELDORF_ROUTES = new Set([
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/reinigung/anfrage",
]);

const REGENSBURG_ROUTES = new Set([
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung",
  "/klaviertransport-regensburg",
  "/umzug-regensburg/anfrage",
]);

// Every match in customer-visible copy is release-blocking. These expressions
// intentionally do not inspect JavaScript, CSS, code examples or JSON-LD.
const CUSTOMER_LANGUAGE_RULES = [
  {
    id: "internal-project-language",
    pattern: /\b(?:SEO|Ranking|Keyword(?:-Cluster)?|Search[- ]Intent|Query|Conversion|Lead|Funnel|Payload|Mapping|Routing|Registry|Audit|QA|Proof|Visual[- ]Proof|Local[- ]Proof|Service-?fit|Content[- ]Cluster|Canonical[- ]Mapping|Opportunity|Page[- ]Intent|Service[- ]Intent|Manual[- ]Review|Service[- ]Key|Intent[- ]Key|Location[- ]Key|Anfragebriefing|Kontaktfluss|Quick[- ]Answer|AI-Antwort|Tracking|MANUAL_REVIEW|MERGE_CANDIDATE|REDIRECT_CANDIDATE|REWRITE_FOR_CUSTOMER|DELETE_DUPLICATE|CONSOLIDATION_CANDIDATE|MOVE_TO_HUB|MOVE_TO_SPECIALIST_PAGE)\b/giu,
  },
  {
    id: "internal-priority-or-package",
    pattern: /\b(?:P[0-2]|Signature-Paket(?:e|en)?|interne Priorit(?:ä|ae)t|Template-Logik|offer-check|local)\b/giu,
  },
  {
    id: "developer-language",
    pattern: /\b(?:Entwicklerhinweis|interne Notiz|technische Validierung|Der Button öffnet|API(?: Route)?|Server Function|Function Invocation|Runtime|Node\.js|Client Component|Server Component|ISR|SSR|SSG|Hydration|Validation Error|Database Error|Request failed|Internal Server Error|Vercel|Supabase|Resend|Worktree|Health Check|Backlog|Ticket|Tracking-ID)\b/giu,
  },
  {
    id: "seo-implementation-language",
    pattern: /\b(?:SERP|GSC|CTR|LLM|GEO|AEO|Search Console|noindex|Canonical|hreflang|Indexierung|indexierbar|Sitemap|Structured Data|Schema|JSON-LD|LocalBusiness|Core Web Vitals|Lighthouse|Money-Page|Doorway(?: Page)?|AI Visibility|KI-Ranking|Conversion Rate)\b/giu,
  },
  {
    id: "internal-id-or-form-name",
    pattern: /\b(?:internalId|serviceId|relatedServiceIds?|intentId|locationId|requestId|bookingId|leadId|serviceKey|intentKey|locationKey|sourcePage|requestSummary|trackingIntent|manualReview|seo_quick_lead_form|ProfessionalRequestForm|CleaningRequestForm|MovingRequestForm)\b/giu,
  },
  {
    id: "placeholder-or-test-copy",
    pattern: /\b(?:Lorem ipsum|TODO|FIXME|Platzhaltertext|Testinhalt|Testtext|Max Mustermann|test@example\.com)\b/giu,
  },
];

const MOJIBAKE_PATTERN = /(?:\uFFFD|ï¿½|Ãƒ|Ã[\u0080-\u00ff]|Â[\u0080-\u00ff ]|â(?:€|‚|„|“|”|€™|€“|€”|ˆ|†)|ðŸ)/gu;

// Deliberately vocabulary-based: matching every "ae/oe/ue" sequence would
// also flag valid names and English words. This fallback covers release
// examples that are not represented by the shared copy normalizer below.
const ASCII_UMLAUT_FALLBACK_PATTERN = /\b(?:Duesseldorf|Dusseldorf|Bueroreinigung|Gebaeudereinigung|Gebaeudeservice|Entruempelung|Wohnungsaufloesung|Raeumung|Raeume|Rueckmeldung|Rueckfragen|Rueckfahrt|Moeglichkeit(?:en)?|Aenderung(?:en)?|vollstaendig|Flexibilitaet|Haltemoeglichkeit(?:en)?|fuer|ueber|Uebergabe(?:termin)?|Oberflaeche(?:n)?|Zugaenglichkeit|Zugaenge?|gewuenscht(?:e|en|er|es)?|waehlen|waehrend|koennen|moechten|haeufig|zusaetzlich(?:e|en|er|es)?|persoenlich(?:e|en|er|es)?|zuverlaessig(?:e|en|er|es)?|Pruefung|pruefen|ausserhalb|Kueche|Boeden|Tueren|groesser(?:e|en|er|es)?|Groesse|Strasse|Muenchen|Nuernberg|frueh(?:e|en|er|es)?|zunaechst|oeffnen|schliessen|verfuegbar(?:e|en|er|es)?|regelmaessig(?:e|en|er|es)?|selbststaendig(?:e|en|er|es)?|unabhaengig(?:e|en|er|es)?|massgeblich(?:e|en|er|es)?)\b/giu;

// Keep the release gate aligned with the public-copy normalizer. Extracting
// these literal patterns avoids a second, incomplete word list while still
// keeping the audit independent from TypeScript execution.
function regexSourcesFromGermanText(arrayName) {
  const sourceFile = path.join(ROOT, "lib", "german-text.ts");
  const source = fs.readFileSync(sourceFile, "utf8");
  const declaration = source.indexOf(`const ${arrayName}:`);
  const assignment = source.indexOf("= [", declaration);
  const blockStart = assignment + 2;
  const blockEnd = source.indexOf("\n];", blockStart);
  if (declaration < 0 || assignment < 0 || blockEnd < 0) {
    throw new Error(`Cannot read ${arrayName} from ${relativeFile(sourceFile)}.`);
  }

  const patterns = [];
  for (const line of source.slice(blockStart + 1, blockEnd).split(/\r?\n/gu)) {
    const literal = line.match(/^\s*\[\/((?:\\.|[^/])+)\/[a-z]*,/u);
    if (literal) patterns.push(literal[1]);
  }
  if (!patterns.length) throw new Error(`No patterns found in ${arrayName}.`);
  return patterns;
}

function combinedPattern(sources, flags = "giu") {
  return new RegExp([...new Set(sources)].map((source) => `(?:${source})`).join("|"), flags);
}

const ASCII_UMLAUT_PATTERN = combinedPattern([
  ASCII_UMLAUT_FALLBACK_PATTERN.source,
  ...regexSourcesFromGermanText("transliterationReplacements"),
]);
const BROKEN_UMLAUT_PATTERN = combinedPattern([
  // A question mark can replace a damaged umlaut at the start or inside a
  // word. Do not treat URL path/query boundaries (for example
  // `/buchung?ref=...`) as customer-copy corruption.
  String.raw`(?:(?<![\p{L}\p{N}./\\:_-])\?+\p{L}{2,}\b(?!\s*=)|(?<![/\\])\b\p{L}+\?+[\p{L}?]+\b(?!\s*=))`,
  ...regexSourcesFromGermanText("brokenWordReplacements"),
], "gu");

const WRONG_DUESSELDORF_CONTEXT = /\b(?:Regensburg(?:er|s)?|Bayern|Oberpfalz|Straubing|Landshut)\b/giu;
const WRONG_REGENSBURG_CONTEXT = /\b(?:Düsseldorf(?:er|s)?|Duesseldorf(?:er|s)?|Dusseldorf(?:er|s)?|Nordrhein-Westfalen|NRW|Rheinland)\b/giu;

const EXCLUDED_BLOCK_TAGS = ["script", "style", "template", "noscript", "code", "pre"];
const LOCATION_CHROME_TAGS = ["header", "nav", "footer"];

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}

function relativeFile(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function normalizeRoute(route) {
  if (!route || route === "/") return "/";
  return `/${route.replace(/^\/+|\/+$/g, "")}`;
}

function routeFromHtmlFile(file) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return normalizeRoute(relative.slice(0, -"/index.html".length));
  return normalizeRoute(relative.replace(/\.html$/iu, ""));
}

function decodeHtml(value) {
  const named = {
    amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
    auml: "ä", Auml: "Ä", ouml: "ö", Ouml: "Ö", uuml: "ü", Uuml: "Ü", szlig: "ß",
  };
  return String(value ?? "")
    .replace(/&#(\d+);/gu, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/giu, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/giu, (match, name) => named[name] ?? named[name.toLowerCase()] ?? match);
}

function cleanText(value) {
  return decodeHtml(value).replace(/\s+/gu, " ").trim();
}

function removeBlockTags(html, tags) {
  let output = String(html ?? "");
  for (const tag of tags) {
    output = output.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "giu"), " ");
  }
  return output;
}

function removeHiddenElements(html) {
  return html
    .replace(/<([a-z0-9:-]+)\b[^>]*(?:\shidden(?:\s|=|>)|aria-hidden\s*=\s*["']true["'])[^>]*>[\s\S]*?<\/\1>/giu, " ")
    .replace(/<!--([\s\S]*?)-->/gu, " ");
}

function visibleTextFromHtml(html, { mainOnly = false, excludeChrome = false } = {}) {
  let fragment = String(html ?? "");
  const body = fragment.match(/<body\b[^>]*>([\s\S]*?)<\/body>/iu);
  if (body) fragment = body[1];
  if (mainOnly) {
    const main = fragment.match(/<main\b[^>]*>([\s\S]*?)<\/main>/iu);
    if (main) fragment = main[1];
  }
  fragment = removeBlockTags(fragment, EXCLUDED_BLOCK_TAGS);
  if (excludeChrome) fragment = removeBlockTags(fragment, LOCATION_CHROME_TAGS);
  fragment = removeHiddenElements(fragment);
  return cleanText(fragment.replace(/<[^>]+>/gu, " "));
}

function attributeMap(tag) {
  const attributes = new Map();
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gu)) {
    attributes.set(match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return attributes;
}

function customerMetadata(html) {
  const values = [];
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/iu)?.[1];
  if (title) values.push({ sourceType: "metaTitle", value: cleanText(title) });
  for (const tag of html.match(/<meta\b[^>]*>/giu) ?? []) {
    const attributes = attributeMap(tag);
    const name = (attributes.get("name") ?? "").toLowerCase();
    const property = (attributes.get("property") ?? "").toLowerCase();
    const content = attributes.get("content") ?? "";
    const keys = new Set([name, property].filter(Boolean));
    if (keys.has("description")) values.push({ sourceType: "metaDescription", value: content });
    if (keys.has("dc.title") || keys.has("dcterms.title")) values.push({ sourceType: "dcTitle", value: content });
    if (keys.has("dc.description") || keys.has("dcterms.description")) values.push({ sourceType: "dcDescription", value: content });
    if (keys.has("dc.subject") || keys.has("dcterms.subject")) values.push({ sourceType: "dcSubject", value: content });
    if (keys.has("dc.coverage") || keys.has("dcterms.coverage")) values.push({ sourceType: "dcCoverage", value: content });
    if (keys.has("og:title") || keys.has("og:description")) values.push({ sourceType: "openGraph", value: content });
    if (keys.has("og:image:alt")) values.push({ sourceType: "openGraphImageAlt", value: content });
    if (keys.has("twitter:title") || keys.has("twitter:description")) values.push({ sourceType: "twitterMeta", value: content });
    if (keys.has("twitter:image:alt")) values.push({ sourceType: "twitterImageAlt", value: content });
  }
  return values.filter((item) => cleanText(item.value));
}

function customerAttributes(html) {
  const withoutNonCustomerSources = removeBlockTags(html, EXCLUDED_BLOCK_TAGS);
  const values = [];
  for (const tag of withoutNonCustomerSources.match(/<[a-z0-9:-]+\b[^>]*>/giu) ?? []) {
    const attributes = attributeMap(tag);
    for (const name of ["alt", "aria-label", "aria-description", "placeholder", "title"]) {
      const value = attributes.get(name);
      if (value) values.push({ sourceType: name === "alt" ? "alt" : name.startsWith("aria") ? "aria" : "uiAttribute", value });
    }
  }
  return values;
}

function contextFor(text, index, length) {
  const start = Math.max(0, index - 80);
  const end = Math.min(text.length, index + length + 100);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

const findings = [];
const seen = new Set();

function addFinding({ route, file, sourceType, ruleId, term, context, status = "BLOCK" }) {
  const normalizedContext = cleanText(context).slice(0, 360);
  const key = [route, sourceType, ruleId, term.toLowerCase(), normalizedContext].join("\u0000");
  if (seen.has(key)) return;
  seen.add(key);
  findings.push({ route, file, source_type: sourceType, rule_id: ruleId, term, context: normalizedContext, blocking: "yes", status });
}

function scanPattern({ route, file, sourceType, text, ruleId, pattern }) {
  pattern.lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    addFinding({
      route,
      file,
      sourceType,
      ruleId,
      term: match[0],
      context: contextFor(text, match.index ?? 0, match[0].length),
    });
  }
}

function scanCustomerValue({ route, file, sourceType, value, language }) {
  const text = cleanText(value);
  if (!text) return;
  for (const rule of CUSTOMER_LANGUAGE_RULES) scanPattern({ route, file, sourceType, text, ruleId: rule.id, pattern: rule.pattern });
  scanPattern({ route, file, sourceType, text, ruleId: "mojibake", pattern: MOJIBAKE_PATTERN });
  scanPattern({ route, file, sourceType, text, ruleId: "broken-umlaut", pattern: BROKEN_UMLAUT_PATTERN });
  if (language === "de" && !route.startsWith("/en")) {
    scanPattern({ route, file, sourceType, text, ruleId: "ascii-umlaut", pattern: ASCII_UMLAUT_PATTERN });
  }
}

function scanLocationMix({ route, file, html, metadata }) {
  const mainText = visibleTextFromHtml(html, { mainOnly: true, excludeChrome: true });
  const locationText = cleanText(`${metadata.map((item) => item.value).join(" ")} ${mainText}`);
  const pattern = DUESSELDORF_ROUTES.has(route)
    ? WRONG_DUESSELDORF_CONTEXT
    : REGENSBURG_ROUTES.has(route)
      ? WRONG_REGENSBURG_CONTEXT
      : null;
  if (!pattern) return;
  scanPattern({ route, file, sourceType: "pageLocation", text: locationText, ruleId: "location-mix", pattern });
}

function scanHtmlDocument({ route, file, html }) {
  // Authenticated dashboard pages may retain internal operational labels. The
  // public login page remains in scope, as required by the release matrix.
  if ((route === "/dashboard" || route.startsWith("/dashboard/")) && route !== "/dashboard/login") return;

  const language = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/iu)?.[1]?.toLowerCase().startsWith("de") ? "de" : "other";
  const metadata = customerMetadata(html);
  const sources = [
    { sourceType: "visibleText", value: visibleTextFromHtml(html) },
    ...metadata,
    ...customerAttributes(html),
  ];
  for (const source of sources) scanCustomerValue({ route, file, ...source, language });
  scanLocationMix({ route, file, html, metadata });
}

function runParserFixtures() {
  findings.length = 0;
  seen.clear();
  const html = `<!doctype html>
    <html lang="de"><head>
      <meta name="dc.subject" content="Buero" />
      <meta name="dc.coverage" content="Bueroflaeche Oberpfalz" />
      <meta property="og:image:alt" content="Muessen" />
      <meta property="twitter:image:alt" content="Muell" />
      <script type="application/ld+json">{"name":"Bueroreinigung"}</script>
      <style>.fixture::after { content: "Moebel"; }</style>
    </head><body><main>
      <aside>Regensburg</aside>
      <form><span>Bayern</span></form>
      <svg aria-label="Grafik"><path d="Dusseldorf" />
        <title>Schluessel</title><desc>Wohnungs?bergabe und F?r</desc>
        <text>Moebel, Flaeche, Bestaetigung und Wuerzburg</text>
      </svg>
      <code>Entruempelung</code><p>kaputt ï¿½, Kumpfm?hl. Empfehlung: /buchung?ref=FLOXANT50</p>
    </main></body></html>`;
  scanHtmlDocument({ route: "/duesseldorf", file: "fixture.html", html });

  const expected = [
    ["dcSubject", "ascii-umlaut", "Buero"],
    ["dcCoverage", "ascii-umlaut", "Bueroflaeche"],
    ["openGraphImageAlt", "ascii-umlaut", "Muessen"],
    ["twitterImageAlt", "ascii-umlaut", "Muell"],
    ["visibleText", "ascii-umlaut", "Schluessel"],
    ["visibleText", "ascii-umlaut", "Moebel"],
    ["visibleText", "ascii-umlaut", "Flaeche"],
    ["visibleText", "ascii-umlaut", "Bestaetigung"],
    ["visibleText", "ascii-umlaut", "Wuerzburg"],
    ["visibleText", "broken-umlaut", "Wohnungs?bergabe"],
    ["visibleText", "broken-umlaut", "F?r"],
    ["visibleText", "broken-umlaut", "Kumpfm?hl"],
    ["visibleText", "mojibake", "ï¿½"],
    ["pageLocation", "location-mix", "Regensburg"],
    ["pageLocation", "location-mix", "Bayern"],
    ["pageLocation", "location-mix", "Oberpfalz"],
  ];
  const missing = expected.filter(([sourceType, ruleId, term]) => !findings.some((finding) =>
    finding.source_type === sourceType && finding.rule_id === ruleId && finding.term === term));
  if (missing.length) throw new Error(`Parser fixture missed ${JSON.stringify(missing)}.`);
  if (findings.some((finding) => ["Dusseldorf", "Entruempelung", "buchung?ref", "?ref"].includes(finding.term))) {
    throw new Error("Parser fixture treated technical SVG/path, code content or a URL query separator as customer copy.");
  }
  console.log(`VISIBLE_CUSTOMER_LANGUAGE_PARSER_FIXTURES PASS assertions=${expected.length + 1}`);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(rows) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  const headers = ["route", "file", "source_type", "rule_id", "term", "context", "blocking", "status"];
  const lines = [headers.join(","), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))];
  fs.writeFileSync(OUTPUT_FILE, `${lines.join("\n")}\n`, "utf8");
}

function runAudit() {
  writeCsv([]);
  if (!fs.existsSync(OUT_DIR)) {
    console.error("VISIBLE_CUSTOMER_LANGUAGE_AUDIT_ERROR out/ is missing; run the production build first.");
    process.exitCode = 1;
    return;
  }

  const htmlFiles = walkFiles(OUT_DIR).filter((file) => file.toLowerCase().endsWith(".html"));
  const routeFiles = new Map();
  const excluded = { scriptBlocks: 0, styleBlocks: 0, codeBlocks: 0, jsonLdBlocks: 0 };

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const route = routeFromHtmlFile(file);
    const relative = relativeFile(file);
    routeFiles.set(route, relative);
    excluded.scriptBlocks += (html.match(/<script\b/giu) ?? []).length;
    excluded.styleBlocks += (html.match(/<style\b/giu) ?? []).length;
    excluded.codeBlocks += (html.match(/<(?:code|pre)\b/giu) ?? []).length;
    excluded.jsonLdBlocks += (html.match(/<script\b[^>]*type=["']application\/ld\+json["']/giu) ?? []).length;
    scanHtmlDocument({ route, file: relative, html });
  }

  for (const route of REQUIRED_ROUTES) {
    if (routeFiles.has(route)) continue;
    addFinding({
      route,
      file: "",
      sourceType: "requiredRoute",
      ruleId: "required-route-missing",
      term: route,
      context: "No built HTML file was found for this required release route.",
      status: "MISSING",
    });
  }

  findings.sort((left, right) =>
    left.route.localeCompare(right.route, "de")
    || left.source_type.localeCompare(right.source_type, "de")
    || left.rule_id.localeCompare(right.rule_id, "de")
    || left.term.localeCompare(right.term, "de"));
  writeCsv(findings);

  const ruleCounts = Object.fromEntries([...new Set(findings.map((item) => item.rule_id))].sort().map((rule) => [rule, findings.filter((item) => item.rule_id === rule).length]));
  console.log(`VISIBLE_CUSTOMER_LANGUAGE_AUDIT scannedHtml=${htmlFiles.length} requiredRoutes=${REQUIRED_ROUTES.length} findings=${findings.length}`);
  console.log(`VISIBLE_CUSTOMER_LANGUAGE_AUDIT excluded script=${excluded.scriptBlocks} style=${excluded.styleBlocks} code=${excluded.codeBlocks} jsonLd=${excluded.jsonLdBlocks}`);
  console.log(`VISIBLE_CUSTOMER_LANGUAGE_AUDIT rules=${JSON.stringify(ruleCounts)}`);
  console.log(`VISIBLE_CUSTOMER_LANGUAGE_AUDIT output=${relativeFile(OUTPUT_FILE)} status=${findings.length ? "FAIL" : "PASS"}`);
  if (findings.length) process.exitCode = 1;
}

if (process.argv.includes("--parser-fixtures")) runParserFixtures();
else runAudit();
