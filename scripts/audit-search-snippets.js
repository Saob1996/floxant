const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const artifactsDir = path.join(root, "artifacts");
const docsDir = path.join(root, "docs");
const baseUrl = "https://www.floxant.de";

const priorityMetadata = {
  "/": ["de-DE", "FLOXANT Dienstleistungen", "FLOXANT", "FLOXANT | Reinigung Düsseldorf & Services Regensburg"],
  "/duesseldorf/reinigung": ["de-DE", "reinigung düsseldorf", "Reinigung Düsseldorf", "Reinigung Düsseldorf | Büro, Praxis & Wohnung"],
  "/duesseldorf/bueroreinigung": ["de-DE", "büroreinigung düsseldorf", "Büroreinigung Düsseldorf", "Büroreinigung Düsseldorf: Turnus & Angebot | FLOXANT"],
  "/duesseldorf/gewerbereinigung": ["de-DE", "gewerbereinigung düsseldorf", "Gewerbereinigung Düsseldorf", "Gewerbereinigung Düsseldorf: Objekt & Turnus | FLOXANT"],
  "/duesseldorf/praxisreinigung": ["de-DE", "praxisreinigung düsseldorf", "Praxisreinigung Düsseldorf", "Praxisreinigung Düsseldorf: Räume & Turnus | FLOXANT"],
  "/duesseldorf/fensterreinigung": ["de-DE", "fensterreinigung düsseldorf", "Fensterreinigung Düsseldorf", "Fensterreinigung Düsseldorf: Glasflächen & Angebot"],
  "/reinigungsfirma-angebot": ["de-DE", "angebot reinigungsfirma", "Reinigungsangebot anfragen", "Reinigungsfirma-Angebot: 7 Angaben vor der Anfrage"],
  "/angebot-vergleichen-duesseldorf": ["de-DE", "reinigungsangebot prüfen düsseldorf", "Angebote Düsseldorf prüfen", "Reinigungsangebote Düsseldorf: 10 Punkte vergleichen"],
  "/en": ["en", "FLOXANT English services", "Services in English", "FLOXANT Services in English | Düsseldorf & Regensburg"],
  "/en/duesseldorf/cleaning": ["en", "cleaning service düsseldorf", "Cleaning Düsseldorf", "Cleaning Service Düsseldorf | English Request | FLOXANT"],
  "/en/duesseldorf/office-cleaning": ["en", "office cleaning düsseldorf", "Office Cleaning Düsseldorf", "Office Cleaning Düsseldorf | Schedule & Quote | FLOXANT"],
  "/en/duesseldorf/commercial-cleaning": ["en", "commercial cleaning düsseldorf", "Commercial Cleaning Düsseldorf", "Commercial Cleaning Düsseldorf | Scope & Quote | FLOXANT"],
  "/en/duesseldorf/apartment-cleaning": ["en", "apartment cleaning düsseldorf", "Apartment Cleaning Düsseldorf", "Apartment Cleaning Düsseldorf | English Request | FLOXANT"],
  "/en/duesseldorf/deep-cleaning": ["en", "deep cleaning düsseldorf", "Deep Cleaning Düsseldorf", "Deep Cleaning Düsseldorf | Condition & Scope | FLOXANT"],
  "/en/duesseldorf/move-out-cleaning": ["en", "move-out cleaning düsseldorf", "Move-Out Cleaning Düsseldorf", "Move-Out Cleaning Düsseldorf | Handover | FLOXANT"],
  "/en/duesseldorf/window-cleaning": ["en", "window cleaning düsseldorf", "Window Cleaning Düsseldorf", "Window Cleaning Düsseldorf | Glass & Access | FLOXANT"],
  "/en/duesseldorf/cleaning-quote-review": ["en", "cleaning quote review düsseldorf", "Cleaning Quote Review", "Cleaning Quote Review Düsseldorf | Scope Check | FLOXANT"],
};

const queryMapping = [
  ["Düsseldorf Reinigung Hub", "/duesseldorf/reinigung", "/duesseldorf/bueroreinigung; /duesseldorf/praxisreinigung; /duesseldorf/fensterreinigung", "Der Hub rankt für mehrere allgemeine Begriffe und hatte bei Position 7,58 nur 0,36 % CTR.", "Allgemeine Reinigungswahl bündeln; spezialisierte Leistungen kontextuell abgeben."],
  ["Büroreinigung", "/duesseldorf/bueroreinigung", "/duesseldorf/reinigung; /reinigungsfirma-angebot", "Schreibvarianten mit und ohne Umlaut verteilen Signale.", "Eine spezialisierte B2B-Zielseite mit Raumliste, Turnus und Zugang stärken."],
  ["Praxisreinigung", "/duesseldorf/praxisreinigung", "/duesseldorf/reinigung", "Allgemeiner Hub nennt Praxisreinigung unterstützend.", "Praxisräume, Zeiten und sachliche Grenzen auf der Fachseite vertiefen."],
  ["Fenster- und Glasreinigung", "/duesseldorf/fensterreinigung", "/duesseldorf/reinigung", "Fenster- und Glasbegriffe können zwischen Hub und Fachseite überlappen.", "Glasflächen, Rahmen und Zugang auf der Fachseite; Hub nur als Auswahl."],
  ["Grundreinigung", "/duesseldorf/reinigung#grundreinigung-bauendreinigung", "/reinigungsfirma-angebot", "Keine eigenständige, belegbar starke Düsseldorfer URL vorhanden.", "Substanziellen Hub-Abschnitt ausbauen; keine dünne neue URL erzeugen."],
  ["Bau- und Endreinigung", "/duesseldorf/reinigung#grundreinigung-bauendreinigung", "/reinigungsfirma-angebot", "Mehrere Begriffsvarianten, aber keine gleichwertige bestehende Zielseite.", "Bauphase, Oberflächen, Restmaterial und Übergabetermin im Hub erklären."],
  ["Unterhalts- und Treppenreinigung", "/duesseldorf/reinigung#hausverwaltung-reinigung", "/duesseldorf/bueroreinigung; /duesseldorf/gewerbereinigung", "Turnusbegriffe werden auf mehreren B2B-Seiten unterstützend genannt.", "Hausverwaltungsabschnitt als primären Einstieg nutzen und Fachseiten klar abgrenzen."],
  ["Neues Reinigungsangebot", "/reinigungsfirma-angebot", "/duesseldorf/reinigung", "Informations- und Transaktionsabsicht waren nicht klar getrennt.", "Exakt sieben benötigte Angaben mit Nutzen und Risiko erklären."],
  ["Düsseldorfer Angebotsvergleich", "/angebot-vergleichen-duesseldorf", "/reinigungsfirma-angebot; /en/duesseldorf/cleaning-quote-review", "Mehrere Angebotsseiten können dieselbe Formulierung verwenden.", "Vorhandene Angebote anhand von exakt zehn Vergleichspunkten prüfen."],
  ["English Düsseldorf cleaning", "/en/duesseldorf/cleaning", "/en/duesseldorf/office-cleaning; /en/duesseldorf/commercial-cleaning; /en/duesseldorf/apartment-cleaning", "Bisher fehlte eine konsequente lokale englische Struktur.", "Englischen Hub als Auswahlseite nutzen; Fachseiten nach Objektart trennen."],
  ["English Regensburg moving", "/en/regensburg/moving", "/en/regensburg/moving-company; /en/regensburg/moving-costs; /en/regensburg/moving-quote-review", "Nahe englische Umzugsbegriffe benötigen eindeutige Rollen.", "Service-Hub, Firmenauswahl, Kosteninformation und Angebotsprüfung getrennt halten."],
];

const internalTextPatterns = [
  /Suchergebnis-Vorschau/i,
  /Klick-Gründe im Suchergebnis/i,
  /Trust Proof/i,
  /Local Proof/i,
  /Visual Proof/i,
  /Proof-Checkliste/i,
  /Manuell offen/i,
  /Google, Maps\s*&\s*klare Antworten/i,
  /\bSEO\b/,
  /\bQuery\b/i,
  /\bKeyword(?:s)?\b/i,
  /\bRanking(?:s)?\b/i,
  /Kundensuchen/i,
  /GBP-Profil-URL/i,
  /NAP-Abgleich vor GBP-Posts/i,
  /\bP0\b/,
  /\bP1\b/,
  /neutral-before-after/i,
  /Projektstorys nur als gekennzeichnete Ausgangslagen/i,
];

const semanticVocabulary = [
  "Fläche", "Turnus", "Zugang", "Zeitfenster", "Objekt", "Räume", "Fotos", "Angebot",
  "Reinigung", "Umzug", "Entrümpelung", "Übergabe", "property", "scope", "access", "timing", "quote",
];

function decode(value = "") {
  return value
    .replace(/&auml;/gi, "ä").replace(/&ouml;/gi, "ö").replace(/&uuml;/gi, "ü")
    .replace(/&Auml;/g, "Ä").replace(/&Ouml;/g, "Ö").replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/gi, "ß").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function normalizeSpace(value = "") {
  return decode(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function visibleText(html) {
  return normalizeSpace(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " "),
  );
}

function firstMatch(html, regex) {
  const match = html.match(regex);
  return match ? normalizeSpace(match[1]) : "";
}

function allMatches(html, regex, group = 1) {
  return [...html.matchAll(regex)].map((match) => normalizeSpace(match[group])).filter(Boolean);
}

function routeToFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const relative = route.replace(/^\//, "").replace(/\/$/, "");
  const flat = path.join(outDir, `${relative}.html`);
  const nested = path.join(outDir, relative, "index.html");
  return fs.existsSync(flat) ? flat : nested;
}

function inferPageType(route) {
  if (route === "/") return "homepage";
  if (route === "/en" || route === "/duesseldorf" || route === "/regensburg") return "location-or-language-hub";
  if (route.includes("/blog/")) return "guide";
  if (route.includes("angebot") || route.includes("quote")) return "quote-or-comparison";
  if (route.includes("dashboard")) return "private";
  return "service-or-information";
}

function inferRegion(route, text) {
  if (route.includes("duesseldorf")) return "Düsseldorf";
  if (route.includes("regensburg")) return "Regensburg";
  if (/Düsseldorf/i.test(text) && /Regensburg/i.test(text)) return "Düsseldorf und Regensburg";
  if (/Düsseldorf/i.test(text)) return "Düsseldorf";
  if (/Regensburg/i.test(text)) return "Regensburg";
  return "überregional oder nicht eindeutig";
}

function topRepeatedWords(text) {
  const stop = new Set(["aber", "alle", "auch", "dass", "eine", "einem", "einen", "einer", "eines", "fuer", "für", "oder", "sich", "sind", "und", "wenn", "werden", "with", "your", "that", "this", "from", "have", "will", "the", "and", "oder", "der", "die", "das", "den", "dem", "des", "von", "zur", "zum", "bei", "auf", "ist", "im", "in"]);
  const counts = new Map();
  const words = text.toLocaleLowerCase("de-DE").match(/[a-zäöüß][a-zäöüß-]{3,}/g) || [];
  for (const word of words) {
    if (!stop.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count >= 6).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([word, count]) => `${word}:${count}`);
}

function normalizedKey(value) {
  return value.toLocaleLowerCase("de-DE").replace(/floxant/g, "").replace(/[^a-zäöüß0-9]+/g, " ").trim();
}

function csv(value) {
  const string = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${string.replace(/"/g, '""')}"`;
}

function main() {
  if (!fs.existsSync(path.join(outDir, "sitemap.xml"))) {
    throw new Error("out/sitemap.xml is missing. Run npm run build first.");
  }

  fs.mkdirSync(artifactsDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });

  const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
  const routes = [...new Set(urls.map((url) => new URL(url).pathname.replace(/\/$/, "") || "/"))];
  const pages = routes.map((route) => {
    const file = routeToFile(route);
    if (!fs.existsSync(file)) {
      return { url: route, absoluteUrl: `${baseUrl}${route === "/" ? "" : route}`, statusInSitemap: true, outputFound: false, issues: ["static HTML missing"], classification: "MANUAL_REVIEW" };
    }

    const html = fs.readFileSync(file, "utf8");
    const text = visibleText(html);
    const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = decode((html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i) || [])[1] || "");
    const canonical = decode((html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) || html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i) || [])[1] || "");
    const h1s = allMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
    const hreflang = [...html.matchAll(/<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => `${match[1]}:${decode(match[2])}`);
    const internalLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"'#][^"']*)["'][^>]*>/gi)]
      .map((match) => decode(match[1])).filter((href) => href.startsWith("/") && !href.startsWith("//"));
    const structuredData = [...new Set([...html.matchAll(/["']@type["']\s*:\s*["']([^"']+)["']/g)].map((match) => match[1]))];
    const visibleCtas = allMatches(html, /<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/gi).filter((item) => item.length >= 3 && item.length <= 90).slice(0, 30);
    const expectedCanonical = `${baseUrl}${route === "/" ? "" : route}`;
    const locale = route === "/en" || route.startsWith("/en/") ? "en" : "de-DE";
    const internalText = internalTextPatterns.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source);
    const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}-]*/gu) || [];
    const metadata = priorityMetadata[route];
    const primaryQuery = metadata?.[1] || title.split(/[|:–-]/)[0].trim().toLocaleLowerCase(locale === "en" ? "en" : "de-DE");
    const issues = [];

    if (!title) issues.push("title missing");
    if (title.length < 25) issues.push("title short");
    if (title.length > 70) issues.push("title long");
    if ((title.match(/FLOXANT/gi) || []).length > 1) issues.push("brand repeated in title");
    const titleWords = title.toLocaleLowerCase("de-DE").match(/[a-zäöüß]{4,}/g) || [];
    if (titleWords.some((word) => titleWords.filter((item) => item === word).length > 2)) issues.push("possible title stuffing");
    if (h1s.length === 0) issues.push("H1 missing");
    if (h1s.length > 1) issues.push(`multiple H1 (${h1s.length})`);
    if (!description) issues.push("meta description missing");
    if (description.length < 70) issues.push("meta description short");
    if (description.length > 180) issues.push("meta description long");
    if (!canonical) issues.push("canonical missing");
    if (canonical && canonical.replace(/\/$/, "") !== expectedCanonical.replace(/\/$/, "")) issues.push("canonical not self-referencing");
    const htmlLang = (html.match(/<html\b[^>]*lang=["']([^"']+)["']/i) || [])[1] || "";
    const runtimeEnglishLang = /document\.documentElement\.lang=['"]en['"]/.test(html);
    if (locale === "en" && htmlLang !== "en" && !runtimeEnglishLang) issues.push("English language marker missing");
    if (locale === "de-DE" && !/^de\b/i.test(htmlLang)) issues.push("German language marker missing");
    if (locale === "en" && !hreflang.some((entry) => entry.startsWith("en:"))) issues.push("English hreflang missing");
    if (internalText.length) issues.push(`visible internal terminology: ${internalText.join(", ")}`);
    if (words.length < 120) issues.push(`thin visible content (${words.length} words)`);

    const hardFailures = issues.some((issue) => /missing|not self-referencing|multiple H1|internal terminology/.test(issue));
    return {
      url: route,
      absoluteUrl: expectedCanonical,
      pageType: inferPageType(route),
      language: locale,
      region: inferRegion(route, text),
      primaryIntent: primaryQuery,
      title,
      titleLength: title.length,
      h1: h1s[0] || "",
      h1Count: h1s.length,
      metaDescription: description,
      descriptionLength: description.length,
      canonical,
      hreflang,
      wordCount: words.length,
      wordRepetitions: topRepeatedWords(text),
      semanticTerms: semanticVocabulary.filter((term) => new RegExp(`\\b${term}\\b`, "i").test(text)),
      internalLinkCount: internalLinks.length,
      internalLinks: [...new Set(internalLinks)].slice(0, 80),
      structuredData,
      visibleCtas,
      overlapNotes: [],
      cannibalization: [],
      thinContent: words.length < 120,
      genericSections: ["Was ist enthalten", "So funktioniert", "Häufige Fragen"].filter((phrase) => text.includes(phrase)),
      visibleInternalTerminology: internalText,
      statusInSitemap: true,
      outputFound: true,
      issues,
      snippetStatus: hardFailures ? "FAIL" : issues.length ? "WARN" : "PASS",
      classification: hardFailures ? "MANUAL_REVIEW" : words.length < 120 ? "CONSOLIDATION_CANDIDATE" : "KEEP_AND_STRENGTHEN",
      shortTitle: metadata?.[2] || title.split("|")[0].trim(),
    };
  });

  const duplicateGroups = [];
  for (const field of ["title", "h1", "metaDescription"]) {
    const groups = new Map();
    for (const page of pages.filter((item) => item.outputFound)) {
      const key = normalizedKey(page[field] || "");
      if (!key) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(page.url);
    }
    for (const [value, members] of groups) {
      if (members.length > 1) duplicateGroups.push({ type: `duplicate-${field}`, normalizedValue: value, urls: members });
    }
  }

  for (const group of duplicateGroups) {
    for (const route of group.urls) {
      const page = pages.find((item) => item.url === route);
      if (!page) continue;
      page.cannibalization.push(`${group.type}: ${group.urls.filter((url) => url !== route).join(", ")}`);
      page.overlapNotes.push(`Shares ${group.type.replace("duplicate-", "")} with ${group.urls.length - 1} other URL(s).`);
      if (page.classification === "KEEP_AND_STRENGTHEN") page.classification = "CONSOLIDATION_CANDIDATE";
      page.issues.push(group.type);
      if (page.snippetStatus === "PASS") page.snippetStatus = "WARN";
    }
  }

  const csvHeaders = ["URL", "locale", "primaryQuery", "shortTitle", "seoTitle", "titleLength", "headline", "description", "descriptionLength", "canonical", "hreflang", "status", "issues"];
  const csvRows = pages.map((page) => [
    page.absoluteUrl,
    page.language || "",
    page.primaryIntent || "",
    page.shortTitle || "",
    page.title || "",
    page.titleLength || 0,
    page.h1 || "",
    page.metaDescription || "",
    page.descriptionLength || 0,
    page.canonical || "",
    page.hreflang || [],
    page.snippetStatus || "FAIL",
    page.issues || [],
  ].map(csv).join(","));
  fs.writeFileSync(path.join(artifactsDir, "search-snippet-audit.csv"), `${csvHeaders.join(",")}\n${csvRows.join("\n")}\n`, "utf8");

  const audit = {
    generatedAt: new Date().toISOString(),
    source: "Static export and out/sitemap.xml",
    baseline: {
      period: "Last 7 days through 2026-07-17",
      clicks: 15,
      impressions: 3410,
      ctrPercent: 0.44,
      averagePosition: 22.9,
      mobile: { clicks: 13, impressions: 1007, ctrPercent: 1.29 },
      desktop: { clicks: 2, impressions: 2396, ctrPercent: 0.08 },
      priorityPage: { url: "/duesseldorf/reinigung", clicks: 5, impressions: 1400, ctrPercent: 0.36, averagePosition: 7.58 },
    },
    totals: {
      sitemapUrls: routes.length,
      outputFound: pages.filter((page) => page.outputFound).length,
      pass: pages.filter((page) => page.snippetStatus === "PASS").length,
      warn: pages.filter((page) => page.snippetStatus === "WARN").length,
      fail: pages.filter((page) => page.snippetStatus === "FAIL").length,
      classifications: Object.fromEntries(["KEEP_AND_STRENGTHEN", "CONSOLIDATION_CANDIDATE", "REDIRECT_CANDIDATE", "NOINDEX_CANDIDATE", "MANUAL_REVIEW"].map((name) => [name, pages.filter((page) => page.classification === name).length])),
      cannibalizationGroups: duplicateGroups.length,
      visibleInternalTerminologyPages: pages.filter((page) => page.visibleInternalTerminology?.length).length,
    },
    queryMapping: queryMapping.map(([cluster, primaryUrl, supportingUrls, currentProblem, action]) => ({ cluster, primaryUrl, supportingUrls: supportingUrls.split("; "), currentProblem, action })),
    cannibalizations: duplicateGroups,
    pages,
  };
  fs.writeFileSync(path.join(artifactsDir, "search-authority-audit.json"), `${JSON.stringify(audit, null, 2)}\n`, "utf8");

  const mappingRows = queryMapping.map((row) => `| ${row.join(" | ")} |`).join("\n");
  const pageRows = pages.map((page) => `| ${page.url} | ${page.language || "-"} | ${String(page.title || "-").replace(/\|/g, "\\|")} | ${String(page.h1 || "-").replace(/\|/g, "\\|")} | ${page.classification} | ${(page.issues || []).join("; ").replace(/\|/g, "\\|") || "—"} |`).join("\n");
  const markdown = `# FLOXANT Search-Authority-Audit\n\nStand: ${new Date().toISOString()}  \nQuelle: statischer Export und \`out/sitemap.xml\`\n\n## Ausgangslage\n\n- 15 Klicks, 3.410 Impressionen, 0,44 % CTR, durchschnittliche Position 22,9\n- Mobile: 13 Klicks, 1.007 Impressionen, 1,29 % CTR\n- Desktop: 2 Klicks, 2.396 Impressionen, 0,08 % CTR\n- Priorität \`/duesseldorf/reinigung\`: 5 Klicks, 1.400 Impressionen, 0,36 % CTR, Position 7,58\n\n## Audit-Ergebnis\n\n- Geprüfte Sitemap-URLs: ${routes.length}\n- Statisches HTML vorhanden: ${audit.totals.outputFound}\n- PASS: ${audit.totals.pass}\n- WARN: ${audit.totals.warn}\n- FAIL: ${audit.totals.fail}\n- Gefundene Duplikat-/Kannibalisierungsgruppen: ${duplicateGroups.length}\n- Seiten mit sichtbaren internen Begriffen: ${audit.totals.visibleInternalTerminologyPages}\n\nDie Klassifizierung ist eine redaktionelle Arbeitshilfe. Es wurden keine URLs automatisch gelöscht, umgeleitet oder auf \`noindex\` gesetzt.\n\n## Query-zu-URL-Mapping\n\n| Query-Cluster | Primäre URL | Unterstützende URLs | Aktuelles Problem | Maßnahme |\n|---|---|---|---|---|\n${mappingRows}\n\n## Title-Entscheidung für /duesseldorf/reinigung\n\nKandidaten:\n\n1. Kurz und direkt: \`Reinigung Düsseldorf | Büro, Praxis & Wohnung\`\n2. Serviceorientiert: \`Reinigung Düsseldorf für Büro, Praxis und Objekt | FLOXANT\`\n3. Conversionorientiert: \`Reinigung Düsseldorf klar anfragen | FLOXANT\`\n\nAktiv ist Kandidat 1. Der Hauptbegriff steht früh, die drei Objektarten erklären die Breite des Hubs, und spezialisierte Unterseiten behalten eigenständige Titel.\n\n## Vollständige Seitenprüfung\n\nDetailfelder zu Wortwiederholungen, semantischen Begriffen, Links, strukturierten Daten, CTA, Überschneidung und Sitemap-Status stehen vollständig in \`artifacts/search-authority-audit.json\`.\n\n| URL | Sprache | Title | H1 | Klassifizierung | Probleme |\n|---|---|---|---|---|---|\n${pageRows}\n`;
  fs.writeFileSync(path.join(docsDir, "search-authority-audit.md"), markdown, "utf8");

  console.log(JSON.stringify(audit.totals, null, 2));
  if (audit.totals.outputFound !== routes.length) process.exitCode = 1;
}

main();
