import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const artifactsDir = path.join(root, "artifacts");
const docsDir = path.join(root, "docs");
const baseUrl = "https://www.floxant.de";

const p0Routes = new Set([
  "/", "/duesseldorf", "/regensburg", "/kontakt", "/leistungen",
  "/angebot-guenstiger-pruefen", "/reinigungsfirma-angebot",
  "/duesseldorf/reinigung", "/duesseldorf/bueroreinigung", "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung", "/duesseldorf/fensterreinigung",
  "/regensburg/umzug", "/regensburg/reinigung", "/regensburg/bueroreinigung",
  "/regensburg/gewerbereinigung", "/regensburg/endreinigung", "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung", "/klaviertransport-regensburg", "/leerfahrt-rueckfahrt",
]);

const legalRoutes = new Set(["/impressum", "/datenschutz", "/agb", "/widerruf", "/buchungsbedingungen"]);
const formSignals = ["kontakt", "buchung", "rechner", "angebot", "objektbrief", "anfrage"];
const serviceSignals = ["reinigung", "umzug", "entruempel", "auflösung", "aufloesung", "transport", "entsorgung", "räumung", "raeumung"];
const inputSignals = ["fotos", "fläche", "flaeche", "umfang", "zugang", "etage", "termin", "turnus", "start", "ziel", "räume", "raeume"];
const processSignals = ["ablauf", "schritt", "zuerst", "danach", "prüfung", "pruefung", "anfrage", "rückmeldung", "rueckmeldung"];
const boundarySignals = ["nicht enthalten", "nicht zugesagt", "keine garantie", "ohne garantie", "nach prüfung", "nach pruefung", "erst nach", "separat"];

function decode(value = "") {
  return value
    .replace(/&auml;/gi, "ä").replace(/&ouml;/gi, "ö").replace(/&uuml;/gi, "ü")
    .replace(/&Auml;/g, "Ä").replace(/&Ouml;/g, "Ö").replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/gi, "ß").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function text(value = "") {
  return decode(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function stripNonContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ");
}

function mainHtml(html) {
  const match = stripNonContent(html).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return match?.[1] || stripNonContent(html).replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, " ").replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, " ");
}

function matches(value, regex, group = 1) {
  return [...value.matchAll(regex)].map((match) => text(match[group])).filter(Boolean);
}

function tagAttribute(html, tagName, attributeName, attributeValue, targetAttribute) {
  for (const match of html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))) {
    const tag = match[0];
    const selector = tag.match(new RegExp(`${attributeName}=["']([^"']*)["']`, "i"))?.[1] || "";
    if (selector.toLowerCase() !== attributeValue.toLowerCase()) continue;
    return decode(tag.match(new RegExp(`${targetAttribute}=["']([^"']*)["']`, "i"))?.[1] || "");
  }
  return "";
}

function normalizeRoute(route) {
  const clean = `/${String(route || "").replace(/^\/+|\/+$/g, "")}`;
  return clean === "/" ? "/" : clean.replace(/\/+$/, "");
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFromHtmlFile(file) {
  const relative = path.relative(outDir, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return normalizeRoute(relative.slice(0, -"/index.html".length));
  return normalizeRoute(relative.replace(/\.html$/i, ""));
}

function routeToFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const relative = route.replace(/^\//, "");
  const flat = path.join(outDir, `${relative}.html`);
  const nested = path.join(outDir, relative, "index.html");
  return fs.existsSync(flat) ? flat : nested;
}

function redirectedRoutes() {
  const redirectsFile = path.join(root, "public", "_redirects");
  if (!fs.existsSync(redirectsFile)) return new Set();
  return new Set(fs.readFileSync(redirectsFile, "utf8").split(/\r?\n/)
    .map((line) => line.trim()).filter((line) => line.startsWith("/") && !line.includes(":"))
    .map((line) => normalizeRoute(line.split(/\s+/)[0])));
}

function inferRegion(route, heading) {
  if (route.includes("duesseldorf")) return "Düsseldorf";
  if (route.includes("regensburg")) return "Regensburg";
  if (/bayern/i.test(route)) return "Bayern";
  if (/düsseldorf/i.test(heading) && /regensburg/i.test(heading)) return "Düsseldorf und Regensburg";
  if (/düsseldorf/i.test(heading)) return "Düsseldorf";
  if (/regensburg/i.test(heading)) return "Regensburg";
  return "überregional oder nicht ortsgebunden";
}

function inferPageType(route) {
  if (route === "/") return "Startseite";
  if (legalRoutes.has(route)) return "Recht / Pflichtinformation";
  if (route === "/duesseldorf" || route === "/regensburg" || route === "/standorte" || route.startsWith("/region-")) return "Standort-Hub";
  if (route.startsWith("/blog/") || route.startsWith("/ratgeber/") || route === "/blog" || route === "/ratgeber") return "Blog / Ratgeber";
  if (route === "/kontakt" || route === "/buchung" || route.includes("rechner") || route.includes("objektbrief")) return "Formular / Werkzeug";
  if (route.startsWith("/en")) return "Englische Intent-Seite";
  if (route.includes("duesseldorf") || route.includes("regensburg") || /-(?:muenchen|nuernberg|augsburg|passau|landshut|straubing|bayern)$/.test(route)) return "Lokale Service-Seite";
  if (serviceSignals.some((signal) => route.includes(signal))) return "Service-Seite";
  return "Hub / Information";
}

function inferIntent(route, pageType) {
  if (pageType === "Blog / Ratgeber") return "informieren und nächsten Schritt finden";
  if (pageType === "Recht / Pflichtinformation") return "Pflichtangaben nachlesen";
  if (pageType === "Formular / Werkzeug") return "Angaben erfassen und Anfrage vorbereiten";
  if (route.includes("angebot") || route.includes("vergleich")) return "Angebot und Leistungsumfang prüfen";
  if (pageType.includes("Service")) return "Leistung verstehen und anfragen";
  return "passenden Service und nächsten Schritt wählen";
}

function inferKeyword(route, titleValue, region) {
  const titleBase = titleValue.split(/[|–:]/)[0].trim();
  if (titleBase && !/^floxant$/i.test(titleBase)) return titleBase.toLocaleLowerCase("de-DE");
  const slug = route.split("/").filter(Boolean).at(-1)?.replace(/-/g, " ") || "FLOXANT Dienstleistungen";
  return `${slug}${region === "Düsseldorf" || region === "Regensburg" ? ` ${region}` : ""}`.toLocaleLowerCase("de-DE");
}

function countWords(value) {
  return value.match(/[\p{L}\p{N}][\p{L}\p{N}’-]*/gu)?.length || 0;
}

function qualityLabel(score, goodAt, adequateAt) {
  if (score >= goodAt) return "gut";
  if (score >= adequateAt) return "ausreichend";
  return "schwach";
}

function normalizeDuplicate(value) {
  return value.toLocaleLowerCase("de-DE").replace(/floxant/g, "").replace(/[^a-zäöüß0-9]+/g, " ").trim();
}

function positiveClaimSnippets(value) {
  const sentences = value.split(/(?<=[.!?])\s+/);
  const claim = /\b(?:100\s*%|garantiert|garantie|immer verfügbar|immer verfuegbar|24\s*\/\s*7|sofort verfügbar|sofort verfuegbar|nr\.?\s*1|günstigste|guenstigste|bester anbieter)\b/i;
  const negation = /\b(?:kein\w*|nicht|ohne|weder|nie|niemals|wird nicht|kann nicht)\b/i;
  return sentences.filter((sentence) => !sentence.includes("?") && claim.test(sentence) && !negation.test(sentence)).slice(0, 5);
}

function locationConflicts(route, titleValue, h1) {
  const prominent = `${titleValue} ${h1}`;
  const conflicts = [];
  const mentionsDuesseldorf = /\b(?:düsseldorf|duesseldorf)\b/i.test(prominent);
  const mentionsRegensburg = /\bregensburg\b/i.test(prominent);
  if (route.includes("duesseldorf") && mentionsRegensburg && !mentionsDuesseldorf) conflicts.push("Regensburg statt Düsseldorf in Titel oder H1 einer Düsseldorfer URL");
  if (route.includes("regensburg") && mentionsDuesseldorf && !mentionsRegensburg) conflicts.push("Düsseldorf statt Regensburg in Titel oder H1 einer Regensburger URL");
  return conflicts;
}

function priority(route, pageType) {
  if (p0Routes.has(route)) return "P0";
  if (pageType === "Lokale Service-Seite" || pageType === "Service-Seite") return "P1";
  if (pageType === "Blog / Ratgeber") return "P2";
  return "P2";
}

function csv(value) {
  const serialized = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${serialized.replace(/"/g, '""')}"`;
}

if (!fs.existsSync(path.join(outDir, "sitemap.xml"))) {
  console.error("out/sitemap.xml fehlt. Zuerst npm run build ausführen.");
  process.exit(1);
}

fs.mkdirSync(artifactsDir, { recursive: true });
fs.mkdirSync(docsDir, { recursive: true });

const sitemapXml = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
const sitemapRoutes = new Set([...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizeRoute(new URL(decode(match[1])).pathname)));
const redirects = redirectedRoutes();
const htmlRouteFiles = new Map();
for (const file of walk(outDir).filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}_next${path.sep}`))) {
  const route = routeFromHtmlFile(file);
  if (/^\/(?:404|500|seo-image|opengraph-image|twitter-image)/.test(route)) continue;
  if (!htmlRouteFiles.has(route) || file.endsWith(`${path.sep}index.html`)) htmlRouteFiles.set(route, file);
}
for (const route of sitemapRoutes) if (!htmlRouteFiles.has(route)) htmlRouteFiles.set(route, routeToFile(route));

const excluded = { redirected: 0, noindex: 0, nonPage: 0 };
const pages = [];
for (const [route, file] of [...htmlRouteFiles.entries()].sort(([a], [b]) => a.localeCompare(b, "de"))) {
  if (redirects.has(route)) { excluded.redirected += 1; continue; }
  if (/^\/google[a-z0-9_-]+$/i.test(route)) { excluded.nonPage += 1; continue; }
  if (!fs.existsSync(file)) {
    pages.push({ url: route, outputFound: false, inSitemap: sitemapRoutes.has(route), grade: "D", issues: ["gebautes HTML fehlt"], changePriority: "P0" });
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const robots = tagAttribute(html, "meta", "name", "robots", "content");
  if (/noindex/i.test(robots)) { excluded.noindex += 1; continue; }
  const titleValue = text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = tagAttribute(html, "meta", "name", "description", "content");
  const canonical = tagAttribute(html, "link", "rel", "canonical", "href");
  const contentHtml = mainHtml(html);
  const visible = text(contentHtml);
  const h1s = matches(contentHtml, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  const h2s = matches(contentHtml, /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi);
  const summaries = matches(contentHtml, /<summary\b[^>]*>([\s\S]*?)<\/summary>/gi);
  const questionHeadings = matches(contentHtml, /<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/gi)
    .filter((heading) => /\?$/.test(heading));
  const faqQuestions = [...new Set([...summaries, ...questionHeadings])];
  const links = [...contentHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ href: decode(match[1]), label: text(match[2]) }))
    .filter((link) => link.href.startsWith("/") && !link.href.startsWith("//"));
  const uniqueLinks = [...new Map(links.map((link) => [`${link.href}|${link.label}`, link])).values()];
  const buttons = matches(contentHtml, /<button\b[^>]*>([\s\S]*?)<\/button>/gi)
    .map((label) => ({ href: "Schaltfläche", label }));
  const actionPattern = /angebot|anfrag|kontakt|termin|whatsapp|prüfen|pruefen|starten|buchen|absenden|berechnen|erfassen|weiter|vergleich|wählen|waehlen|request|quote|send|check|compare|choose|get|submit|calculate|continue/i;
  const cta = [...uniqueLinks, ...buttons].find((link) => actionPattern.test(link.label));
  const pageType = inferPageType(route);
  const region = inferRegion(route, `${titleValue} ${h1s[0] || ""}`);
  const lower = visible.toLocaleLowerCase("de-DE");
  const firstParagraph = matches(contentHtml, /<p\b[^>]*>([\s\S]*?)<\/p>/gi).find((paragraph) => paragraph.length >= 80) || "";
  const introScore = Math.min(firstParagraph.length / 80, 2) + inputSignals.filter((signal) => firstParagraph.toLocaleLowerCase("de-DE").includes(signal)).length * 0.3;
  const serviceScore = serviceSignals.filter((signal) => lower.includes(signal)).length + inputSignals.filter((signal) => lower.includes(signal)).length * 0.35 + boundarySignals.filter((signal) => lower.includes(signal)).length * 0.45;
  const storyScore = processSignals.filter((signal) => lower.includes(signal)).length * 0.5 + h2s.filter((heading) => /ablauf|schritt|beispiel|fall|so geht|danach|vorher|praxis/i.test(heading)).length;
  const placeholders = [...new Set([...(visible.match(/\b(?:lorem ipsum|generic service|placeholder|\[location\]|\{city\}|\{location\}|your city)\b/gi) || [])])];
  const falseClaims = positiveClaimSnippets(visible);
  const conflicts = locationConflicts(route, titleValue, h1s[0] || "");
  const expectedCanonical = `${baseUrl}${route === "/" ? "" : route}`;
  const canonicalMismatch = Boolean(canonical && canonical.replace(/\/$/, "") !== expectedCanonical.replace(/\/$/, ""));
  const mainWords = countWords(visible);
  const paragraphs = matches(contentHtml, /<p\b[^>]*>([\s\S]*?)<\/p>/gi)
    .filter((paragraph) => paragraph.length >= 120 && paragraph.length <= 1200)
    .map((paragraph) => normalizeDuplicate(paragraph));
  const issues = [];
  const minorIssues = [];

  if (!titleValue) issues.push("Title fehlt");
  if (!description) issues.push("Meta-Description fehlt");
  if (h1s.length !== 1) issues.push(`H1-Anzahl ${h1s.length}`);
  if (!canonical) issues.push("Canonical fehlt");
  if (canonicalMismatch) issues.push(`Canonical verweist auf ${canonical}`);
  if (!sitemapRoutes.has(route) && !legalRoutes.has(route)) issues.push("indexierbare HTML-Seite fehlt in Sitemap");
  if (placeholders.length) issues.push(`Platzhalter: ${placeholders.join(", ")}`);
  if (falseClaims.length) issues.push(`unbelegte positive Aussage: ${falseClaims[0]}`);
  if (conflicts.length) issues.push(...conflicts);
  if (titleValue.length > 70) minorIssues.push(`Title zu lang (${titleValue.length})`);
  if (description.length > 230) minorIssues.push(`Meta-Description zu lang (${description.length})`);
  if (description && description.length < 70) minorIssues.push(`Meta-Description kurz (${description.length})`);

  const requiresMainFaq = p0Routes.has(route) && !legalRoutes.has(route) && pageType !== "Formular / Werkzeug";
  const requiresLocalFaq = pageType === "Lokale Service-Seite";
  if (requiresMainFaq && faqQuestions.length < 8) minorIssues.push(`wichtige Seite hat nur ${faqQuestions.length} sichtbare FAQs`);
  if (requiresLocalFaq && faqQuestions.length < 4) minorIssues.push(`lokale Seite hat nur ${faqQuestions.length} sichtbare FAQs`);
  if (pageType === "Blog / Ratgeber" && mainWords < 120) minorIssues.push(`Ratgeber kritisch kurz (${mainWords} Wörter)`);
  if ((pageType === "Lokale Service-Seite" || pageType === "Service-Seite") && mainWords < 180) minorIssues.push(`Service-Seite kritisch kurz (${mainWords} Wörter)`);
  if (!cta && !legalRoutes.has(route) && pageType !== "Blog / Ratgeber") minorIssues.push("keine klare Haupt-CTA im Hauptinhalt");

  pages.push({
    url: route,
    absoluteUrl: expectedCanonical,
    outputFound: true,
    inSitemap: sitemapRoutes.has(route),
    pageType,
    region,
    primaryIntent: inferIntent(route, pageType),
    primaryKeyword: inferKeyword(route, titleValue, region),
    h1: h1s[0] || "",
    h1Count: h1s.length,
    title: titleValue,
    titleLength: titleValue.length,
    metaDescription: description,
    descriptionLength: description.length,
    mainWordCount: mainWords,
    faqCount: faqQuestions.length,
    faqQuestions,
    internalLinkCount: new Set(uniqueLinks.map((link) => link.href.split("#")[0])).size,
    internalLinks: uniqueLinks.slice(0, 120),
    primaryCta: cta || null,
    introQuality: qualityLabel(introScore, 2.3, 1.2),
    serviceDescriptionQuality: qualityLabel(serviceScore, 5.5, 2.5),
    storyStructureQuality: qualityLabel(storyScore, 3, 1),
    paragraphKeys: [...new Set(paragraphs)],
    possibleTextDuplicates: [],
    possibleLocationConflicts: conflicts,
    possibleCannibalization: [],
    indexStatus: "index, follow",
    canonical,
    changePriority: priority(route, pageType),
    placeholders,
    falseClaims,
    issues,
    minorIssues,
    grade: "B",
  });
}

const duplicateGroups = [];
for (const field of ["title", "h1", "metaDescription"]) {
  const groups = new Map();
  for (const page of pages.filter((page) => page.outputFound)) {
    const key = normalizeDuplicate(page[field] || "");
    if (!key) continue;
    groups.set(key, [...(groups.get(key) || []), page.url]);
  }
  for (const [normalizedValue, urls] of groups) {
    if (urls.length > 1) duplicateGroups.push({ type: field, normalizedValue, urls });
  }
}

const paragraphGroups = new Map();
for (const page of pages.filter((page) => page.outputFound)) {
  for (const paragraph of page.paragraphKeys) paragraphGroups.set(paragraph, [...(paragraphGroups.get(paragraph) || []), page.url]);
}
const repeatedParagraphGroups = [...paragraphGroups.entries()]
  .filter(([, urls]) => new Set(urls).size >= 3)
  .map(([paragraph, urls]) => ({ excerpt: paragraph.slice(0, 180), urls: [...new Set(urls)] }))
  .sort((a, b) => b.urls.length - a.urls.length);

const faqGroups = new Map();
for (const page of pages.filter((page) => page.faqQuestions?.length >= 4)) {
  const key = page.faqQuestions.map(normalizeDuplicate).sort().join(" || ");
  faqGroups.set(key, [...(faqGroups.get(key) || []), page.url]);
}
const repeatedFaqSets = [...faqGroups.entries()].filter(([, urls]) => urls.length >= 2).map(([set, urls]) => ({ questionSet: set, urls }));

for (const group of duplicateGroups) {
  for (const route of group.urls) {
    const page = pages.find((candidate) => candidate.url === route);
    if (!page) continue;
    page.possibleCannibalization.push(`${group.type} identisch mit ${group.urls.filter((url) => url !== route).join(", ")}`);
  }
}

const metadataPairGroups = new Map();
for (const page of pages.filter((candidate) => candidate.outputFound)) {
  const key = `${normalizeDuplicate(page.title || "")} || ${normalizeDuplicate(page.metaDescription || "")}`;
  metadataPairGroups.set(key, [...(metadataPairGroups.get(key) || []), page.url]);
}
for (const urls of metadataPairGroups.values()) {
  if (urls.length < 2) continue;
  for (const route of urls) {
    const page = pages.find((candidate) => candidate.url === route);
    if (page) page.minorIssues.push(`identische Title-Description-Kombination mit ${urls.filter((url) => url !== route).join(", ")}`);
  }
}
for (const group of repeatedParagraphGroups) {
  for (const route of group.urls) {
    const page = pages.find((candidate) => candidate.url === route);
    if (!page) continue;
    page.possibleTextDuplicates.push({ excerpt: group.excerpt, sharedBy: group.urls.length });
  }
}
for (const group of repeatedFaqSets) {
  for (const route of group.urls) {
    const page = pages.find((candidate) => candidate.url === route);
    if (page) page.possibleTextDuplicates.push({ faqSetSharedWith: group.urls.filter((url) => url !== route) });
  }
}

for (const page of pages) {
  if (!page.outputFound || page.issues.length) {
    page.grade = "D";
    continue;
  }
  if (page.minorIssues.length) {
    page.grade = "C";
    continue;
  }
  const strongContent = page.mainWordCount >= (page.pageType === "Blog / Ratgeber" ? 500 : 650);
  const strongFaq = legalRoutes.has(page.url) || page.pageType === "Blog / Ratgeber" || page.pageType === "Formular / Werkzeug" || page.faqCount >= (p0Routes.has(page.url) ? 8 : 4);
  const strongLinks = legalRoutes.has(page.url) || page.internalLinkCount >= (p0Routes.has(page.url) ? 8 : 4);
  const strongStructure = page.introQuality !== "schwach" && page.storyStructureQuality !== "schwach";
  page.grade = strongContent && strongFaq && strongLinks && strongStructure ? "A" : "B";
}

const cleanPages = pages.map(({ paragraphKeys, ...page }) => page);
const grades = Object.fromEntries(["A", "B", "C", "D"].map((grade) => [grade, cleanPages.filter((page) => page.grade === grade).length]));
const report = {
  generatedAt: new Date().toISOString(),
  basis: "gebautes statisches HTML und out/sitemap.xml",
  indexablePageCount: cleanPages.length,
  sitemapPageCount: sitemapRoutes.size,
  excluded,
  grades,
  duplicateGroups,
  repeatedParagraphGroups,
  repeatedFaqSets,
  pages: cleanPages,
};

fs.writeFileSync(path.join(artifactsDir, "content-inventory-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
const columns = ["url", "pageType", "region", "primaryIntent", "primaryKeyword", "h1", "title", "metaDescription", "mainWordCount", "faqCount", "internalLinkCount", "primaryCta", "introQuality", "serviceDescriptionQuality", "storyStructureQuality", "possibleTextDuplicates", "possibleLocationConflicts", "possibleCannibalization", "indexStatus", "changePriority", "grade", "issues", "minorIssues"];
const rows = cleanPages.map((page) => columns.map((column) => {
  const value = column === "primaryCta" ? (page.primaryCta ? `${page.primaryCta.label} -> ${page.primaryCta.href}` : "") : page[column];
  return csv(typeof value === "object" && !Array.isArray(value) ? JSON.stringify(value) : value);
}).join(","));
fs.writeFileSync(path.join(artifactsDir, "content-inventory-audit.csv"), `${columns.map(csv).join(",")}\n${rows.join("\n")}\n`);

const problemPages = cleanPages.filter((page) => page.grade === "C" || page.grade === "D");
const markdown = [
  "# FLOXANT Content-Inventar und Qualitätsaudit",
  "",
  `Erstellt: ${report.generatedAt}`,
  "",
  "Verbindliche Basis ist das gebaute statische HTML. Weiterleitungsziele und `noindex`-Seiten zählen nicht als indexierbare Seiten.",
  "",
  "## Bestand und Noten",
  "",
  `- Indexierbare Seiten: **${cleanPages.length}**`,
  `- Sitemap-URLs: **${sitemapRoutes.size}**`,
  `- Ausgeschlossene Weiterleitungen: **${excluded.redirected}**`,
  `- Ausgeschlossene noindex-Seiten: **${excluded.noindex}**`,
  `- A: **${grades.A}**, B: **${grades.B}**, C: **${grades.C}**, D: **${grades.D}**`,
  "",
  "## C- und D-Seiten",
  "",
  ...(problemPages.length ? ["| URL | Note | Priorität | Befund |", "|---|---:|---:|---|", ...problemPages.map((page) => `| ${page.url} | ${page.grade} | ${page.changePriority} | ${[...page.issues, ...page.minorIssues].join("; ").replace(/\|/g, "\\|")} |`)] : ["Keine C- oder D-Seite im gebauten indexierbaren Bestand."]),
  "",
  "## Exakte Metadaten- und H1-Duplikate",
  "",
  ...(duplicateGroups.length ? duplicateGroups.map((group) => `- ${group.type}: ${group.urls.join(", ")}`) : ["Keine exakten Title-, H1- oder Description-Duplikate."]),
  "",
  "## Wiederholte Text- und FAQ-Sets",
  "",
  `- Wiederholte längere Absätze auf mindestens drei Seiten: ${repeatedParagraphGroups.length}`,
  `- Identische FAQ-Sets auf mindestens zwei Seiten: ${repeatedFaqSets.length}`,
  "",
  "Die vollständige zeilenweise Inventarliste mit URL, Typ, Region, Intent, Keyword, H1, Title, Description, Wortzahl, FAQ-Zahl, internen Links, CTA, Qualitätsmerkmalen, Konflikten, Indexstatus, Priorität und Note liegt in `artifacts/content-inventory-audit.csv`; die vollständigen Link-, FAQ- und Duplikatdetails stehen in der JSON-Datei.",
  "",
];
fs.writeFileSync(path.join(docsDir, "CONTENT_INVENTORY_AUDIT.md"), markdown.join("\n"));

console.log(`CONTENT INVENTORY: ${cleanPages.length} indexierbare Seiten | A ${grades.A} | B ${grades.B} | C ${grades.C} | D ${grades.D}`);
console.log(`Artefakte: artifacts/content-inventory-audit.{json,csv}, docs/CONTENT_INVENTORY_AUDIT.md`);
if (grades.C || grades.D) process.exit(1);
