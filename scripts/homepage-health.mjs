import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = (process.env.HOMEPAGE_HEALTH_URL || "http://localhost:3000").replace(/\/$/, "");
const reportJsonPath = path.join(root, "homepage-health-report.json");
const reportMarkdownPath = path.join(root, "HOMEPAGE_HEALTH_REPORT.md");

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const pageSource = read("app/page.tsx");
const menuSource = read("components/FloxServicesMegaMenu.tsx");
const headerSource = read("components/FloxNavigation.tsx");
const safetySource = [
  pageSource,
  headerSource,
  menuSource,
  read("components/DeferredSiteWidgets.tsx"),
  read("components/MobileFloatingContact.tsx"),
  read("components/layout/SiteChrome.tsx"),
  read("app/layout.tsx"),
].join("\n");

let statusCode = 0;
let html = "";
let fetchError = "";

try {
  const response = await fetch(`${baseUrl}/`, { redirect: "manual" });
  statusCode = response.status;
  html = await response.text();
} catch (error) {
  fetchError = error instanceof Error ? error.message : String(error);
}

const decodeEntities = (value) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

const visibleText = decodeEntities(
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
);
const renderedMarkup = html
  .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[\s\S]*?<\/style>/gi, " ");

const countMatches = (value, pattern) => (value.match(pattern) || []).length;
const homeCardCount = countMatches(html, /\sdata-home-card(?:="[^"]*")?/g);
const attributeValues = (attribute) =>
  [...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => decodeEntities(match[1]));

const mainServices = attributeValues("data-home-main-service");
const specialServices = attributeValues("data-home-special");
const forbiddenTerms = [
  "Visual Proof",
  "Projektlogik",
  "Servicefit",
  "Signature-Empfehlung",
  "Servicegebiet-Kandidat",
  "kuratierter Hub",
  "Inventur",
  "Fake-Claims",
  "Fake-Cases",
  "Privacy-Check",
  "neutral-before-after",
  "offer-check",
];
const visibleForbidden = forbiddenTerms.filter((term) => visibleText.toLowerCase().includes(term.toLowerCase()));
const bannedRuntimePatterns = [
  /export\s+const\s+revalidate\s*=/,
  /export\s+const\s+runtime\s*=\s*["']nodejs["']/,
  /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/,
  /fetch\s*\(\s*["']\/api\/(?:vitals|conversion-events)/,
  /supabase\./,
  /resend\./,
  /sharp\s*\(/,
];
const runtimeHits = bannedRuntimePatterns.filter((pattern) => pattern.test(safetySource)).map(String);

const checks = [];
const addCheck = (name, pass, detail, severity = "FAIL") => {
  checks.push({ name, status: pass ? "PASS" : severity, detail });
};

addCheck("Startseite Status 200", statusCode === 200, statusCode ? `HTTP ${statusCode}` : `Nicht erreichbar: ${fetchError}`);
addCheck("Genau eine H1", countMatches(html, /<h1\b/gi) === 1, `${countMatches(html, /<h1\b/gi)} H1`);
addCheck("Hero-CTA vorhanden", html.includes("data-home-hero-primary"), "Anfrage senden im Hero");
addCheck("Angebot-prüfen-CTA vorhanden", html.includes("data-home-offer-cta"), "Angebotsprüfung im Hero und eigener Sektion");
addCheck("Navigation initial geschlossen", !renderedMarkup.includes("data-desktop-mega-menu"), "Kein Desktopmenü im initialen HTML");
addCheck("Kein automatisch geöffnetes Standortmenü", !renderedMarkup.includes('id="locations-menu"'), "Standortmenü wird nur nach Klick gerendert");
addCheck("Keine interne Desktop-Menü-Scrollfläche", !/overflow-y-auto|max-h-\[calc\(100vh/.test(menuSource), "Kompaktes Menü ohne max-height/overflow-y-auto");
addCheck("Maximal 12 Startseitenkarten", homeCardCount <= 12, `${homeCardCount} Karten`);
addCheck("Maximal 6 Hauptservicekarten", mainServices.length <= 6, `${mainServices.length} Hauptservicekarten`);
addCheck("Maximal 4 besondere Lösungen", specialServices.length <= 4, `${specialServices.length} besondere Lösungen`);
addCheck("Keine doppelten Hauptservicekarten", new Set(mainServices).size === mainServices.length, mainServices.join(", "));
addCheck("Kein wiederholtes Rubriklabel", countMatches(visibleText, /Häufig angefragte Leistungen/gi) <= 1, `${countMatches(visibleText, /Häufig angefragte Leistungen/gi)} Vorkommen`);
addCheck("Kein sichtbares Verfügbarkeitslabel", !/\bverfügbar\b/i.test(visibleText), "Kein Statuslabel ‚verfügbar‘");
addCheck("Kein sichtbares ‚2 Wege‘", !/\b2 Wege\b/i.test(visibleText), "Kein Paket-/Variantenlabel");
addCheck("Keine sichtbaren internen Begriffe", visibleForbidden.length === 0, visibleForbidden.length ? visibleForbidden.join(", ") : "Keine Treffer");
addCheck("Kein sichtbarer Debug-Text", !/\b(?:TODO|DEBUG|undefined|NaN)\b/i.test(visibleText), "Keine Debug-Platzhalter");
addCheck("Keine sichtbaren Rohschlüssel", !/\b(?:serviceKey|intentKey)\b/.test(visibleText), "Keine serviceKey-/intentKey-Ausgabe");
addCheck("Kein Menü über dem Hero beim Laden", !renderedMarkup.includes("data-desktop-mega-menu"), "Hero startet frei");
addCheck("Horizontaler Overflow geschützt", pageSource.includes("overflow-x-clip"), "Homepage begrenzt horizontalen Überlauf");
addCheck("Keine Vercel-Usage-Rückkehr", runtimeHits.length === 0, runtimeHits.length ? runtimeHits.join(", ") : "Keine dynamischen Laufzeit-/Besuchsaufrufe in der öffentlichen Renderkette");
addCheck("Genau sieben Homepage-Abschnitte", countMatches(html, /data-home-section=/g) === 7, `${countMatches(html, /data-home-section=/g)} Abschnitte`);
addCheck("Mobile Navigation maximal zwei Ebenen", countMatches(headerSource + menuSource, /<details\b/g) === 3 && !/\sopen=/.test(headerSource + menuSource), "Drei unabhängige, initial geschlossene Accordions", "WARN");

const totals = {
  pass: checks.filter((check) => check.status === "PASS").length,
  warn: checks.filter((check) => check.status === "WARN").length,
  fail: checks.filter((check) => check.status === "FAIL").length,
};
const overall = totals.fail > 0 ? "FAIL" : totals.warn > 0 ? "WARN" : "PASS";
const result = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  overall,
  totals,
  metrics: {
    statusCode,
    h1: countMatches(html, /<h1\b/gi),
    sections: countMatches(html, /data-home-section=/g),
    cards: homeCardCount,
    mainServiceCards: mainServices.length,
    specialSolutionCards: specialServices.length,
    visibleWords: visibleText ? visibleText.split(/\s+/).length : 0,
  },
  checks,
};

const rows = checks.map((check) => `| ${check.status} | ${check.name} | ${check.detail.replace(/\|/g, "\\|")} |`).join("\n");
const markdown = `# Homepage Health Report

Stand: ${result.generatedAt}

Gesamtergebnis: **${overall}**
Prüfziel: \`${baseUrl}/\`

## Kennzahlen

- HTTP-Status: ${statusCode || "nicht erreichbar"}
- Homepage-Abschnitte: ${result.metrics.sections}
- gezählte Karten: ${result.metrics.cards}
- Hauptservicekarten: ${result.metrics.mainServiceCards}
- besondere Lösungen: ${result.metrics.specialSolutionCards}
- sichtbare Wörter im Server-HTML: ${result.metrics.visibleWords}

## Prüfungen

| Status | Prüfung | Ergebnis |
| --- | --- | --- |
${rows}

## Einordnung

Der automatisierte Check prüft das initiale Server-HTML und die für Homepage, Navigation und globale Floating-Aktionen verantwortlichen Quellen. Interaktionsverhalten, tatsächlicher horizontaler Overflow und Console-/Hydration-Fehler werden zusätzlich im Browser geprüft.
`;

fs.writeFileSync(reportJsonPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
fs.writeFileSync(reportMarkdownPath, markdown, "utf8");

console.log(`homepage:health ${overall} — ${totals.pass} PASS, ${totals.warn} WARN, ${totals.fail} FAIL`);
console.log(`Berichte: ${path.relative(root, reportMarkdownPath)}, ${path.relative(root, reportJsonPath)}`);
for (const check of checks.filter((item) => item.status !== "PASS")) {
  console.log(`${check.status}: ${check.name} — ${check.detail}`);
}

if (totals.fail > 0) process.exitCode = 1;
