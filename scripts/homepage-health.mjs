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
const mobileFloatingContactSource = read("components/MobileFloatingContact.tsx");
const requestContextSource = read("lib/lead-intents/resolve-request-context.ts");
const safetySource = [
  pageSource,
  headerSource,
  menuSource,
  read("components/DeferredSiteWidgets.tsx"),
  mobileFloatingContactSource,
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
const globalFloatingRequestHrefs = attributeValues("href")
  .filter((href) => href.includes("source=global_floating"));
const globalFloatingRequestsAreNeutral = globalFloatingRequestHrefs.length > 0
  && globalFloatingRequestHrefs.every((href) => {
    const url = new URL(href, baseUrl);
    return url.pathname === "/kontakt"
      && url.searchParams.get("mode") === "neutral"
      && !url.searchParams.has("location")
      && !url.searchParams.has("city")
      && !url.searchParams.has("service");
  });
const deferredGlobalFloatingRequestIsNeutral =
  mobileFloatingContactSource.includes('buildGlobalRequestHref("global_floating")')
  && /export function buildGlobalRequestHref[\s\S]*?return `\/kontakt\?mode=neutral&source=\$\{source\}`;/u.test(requestContextSource);

const mainServices = attributeValues("data-home-main-service");
const homeSections = attributeValues("data-home-section");
const expectedHomeSections = [
  "hero",
  "main-services",
  "locations",
  "about",
  "offer-check",
  "process",
  "faq",
  "contact",
];
const homeSectionMarkup = (section) =>
  renderedMarkup.match(
    new RegExp(`<section\\b[^>]*data-home-section="${section}"[^>]*>([\\s\\S]*?)<\\/section>`, "i"),
  )?.[1] || "";
const visibleSectionText = (section) => decodeEntities(
  homeSectionMarkup(section)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
);
const faqMarkup = homeSectionMarkup("faq");
const faqQuestionCount = countMatches(faqMarkup, /<summary\b/gi);
const aboutText = visibleSectionText("about");
const contactMarkup = homeSectionMarkup("contact");
const contactText = visibleSectionText("contact");
const contactHrefs = [...contactMarkup.matchAll(/\shref="([^"]+)"/g)]
  .map((match) => decodeEntities(match[1]));
const hasRenderedPhoneCta = contactHrefs.some((href) => href.startsWith("tel:"));
const hasRenderedWhatsAppCta = contactHrefs.some((href) => /^https:\/\/wa\.me\//i.test(href));
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
addCheck("Angebot-prüfen-CTA vorhanden", html.includes("data-home-offer-cta"), "Angebotsprüfung in eigener Sektion");
addCheck("Navigation initial geschlossen", !renderedMarkup.includes("data-desktop-mega-menu"), "Kein Desktopmenü im initialen HTML");
addCheck("Kein automatisch geöffnetes Standortmenü", !renderedMarkup.includes('id="locations-menu"'), "Standortmenü wird nur nach Klick gerendert");
addCheck("Keine interne Desktop-Menü-Scrollfläche", !/overflow-y-auto|max-h-\[calc\(100vh/.test(menuSource), "Kompaktes Menü ohne max-height/overflow-y-auto");
addCheck("Maximal 12 Startseitenkarten", homeCardCount <= 12, `${homeCardCount} Karten`);
addCheck("Genau 4 regionale Hauptservicekarten", mainServices.length === 4, `${mainServices.length} Hauptservicekarten`);
addCheck("Keine doppelten Hauptservicekarten", new Set(mainServices).size === mainServices.length, mainServices.join(", "));
addCheck(
  "Menschlicher Über-FLOXANT-Bereich vorhanden",
  aboutText.includes("FLOXANT – persönlich erreichbar, wenn etwas erledigt werden muss"),
  "Persönliche Erreichbarkeit und Auftragsklärung werden sichtbar erklärt",
);
addCheck(
  "Direkter Telefon- und WhatsApp-Kontakt vorhanden",
  contactText.includes("Lieber kurz klären? Rufen Sie uns an.")
    && contactText.includes("Jetzt anrufen")
    && contactText.includes("WhatsApp öffnen")
    && hasRenderedPhoneCta
    && hasRenderedWhatsAppCta,
  "Gerenderter Kontaktbereich enthält Telefon- und WhatsApp-Aktion",
);
addCheck("FAQ auf 4 bis 6 Kundenfragen begrenzt", faqQuestionCount >= 4 && faqQuestionCount <= 6, `${faqQuestionCount} FAQ`);
addCheck("Kein HomepageRequestPlanner", !pageSource.includes("HomepageRequestPlanner"), "Keine interne Anfrageplaner-Logik auf der Startseite");
addCheck("Kein wiederholtes Rubriklabel", countMatches(visibleText, /Häufig angefragte Leistungen/gi) <= 1, `${countMatches(visibleText, /Häufig angefragte Leistungen/gi)} Vorkommen`);
addCheck(
  "Ehrlicher Verfügbarkeitshinweis",
  visibleText.includes("Termine nach Verfügbarkeit") && !/\b(?:sofort|heute|jetzt)\s+verfügbar\b/i.test(visibleText),
  "Termine werden nicht als sofort verfügbar dargestellt",
);
addCheck("Kein sichtbares ‚2 Wege‘", !/\b2 Wege\b/i.test(visibleText), "Kein Paket-/Variantenlabel");
addCheck("Keine sichtbaren internen Begriffe", visibleForbidden.length === 0, visibleForbidden.length ? visibleForbidden.join(", ") : "Keine Treffer");
addCheck("Kein sichtbarer Debug-Text", !/\b(?:TODO|DEBUG|undefined|NaN)\b/i.test(visibleText), "Keine Debug-Platzhalter");
addCheck("Keine sichtbaren Rohschlüssel", !/\b(?:serviceKey|intentKey)\b/.test(visibleText), "Keine serviceKey-/intentKey-Ausgabe");
addCheck(
  "Neutraler Schnellkontakt ohne Standort-Vorbelegung",
  (globalFloatingRequestsAreNeutral || deferredGlobalFloatingRequestIsNeutral)
    && mobileFloatingContactSource.includes("ich möchte eine Anfrage stellen."),
  globalFloatingRequestsAreNeutral
    ? `${globalFloatingRequestHrefs.length} neutraler Anfrage-Link ohne Standort oder Leistung`
    : deferredGlobalFloatingRequestIsNeutral
      ? "Deferred Schnellkontakt nutzt den zentralen mode=neutral-Builder ohne Standort oder Leistung"
      : `Gefundene globale Anfrage-Links: ${globalFloatingRequestHrefs.join(", ") || "keine"}`,
);
addCheck("Kein Menü über dem Hero beim Laden", !renderedMarkup.includes("data-desktop-mega-menu"), "Hero startet frei");
addCheck("Horizontaler Overflow geschützt", pageSource.includes("overflow-x-clip"), "Homepage begrenzt horizontalen Überlauf");
addCheck("Keine Vercel-Usage-Rückkehr", runtimeHits.length === 0, runtimeHits.length ? runtimeHits.join(", ") : "Keine dynamischen Laufzeit-/Besuchsaufrufe in der öffentlichen Renderkette");
addCheck(
  "Genau acht fokussierte Homepage-Abschnitte",
  homeSections.length === expectedHomeSections.length
    && expectedHomeSections.every((section) => homeSections.includes(section)),
  homeSections.join(", "),
);
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
    faqQuestions: faqQuestionCount,
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
- Kunden-FAQ: ${result.metrics.faqQuestions}
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
