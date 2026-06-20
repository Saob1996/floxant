const fs = require("fs");
const path = require("path");

const root = process.cwd();
const docsDir = path.join(root, "docs");
const briefsDir = path.join(docsDir, "page-briefs");

const P0_ROUTES = [
  "/",
  "/kontakt",
  "/leistungen",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/anbieter-vergleichen",
  "/duesseldorf",
  "/regensburg",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/umzug",
  "/duesseldorf/entruempelung",
  "/duesseldorf/haushaltsaufloesung",
  "/umzug-regensburg",
  "/reinigung-regensburg",
  "/entruempelung-regensburg",
  "/gewerbereinigung-regensburg",
  "/bueroreinigung-regensburg",
  "/klaviertransport-regensburg",
  "/wohnungsaufloesung-regensburg",
  "/diskreter-umzug-trennung-scheidung",
  "/b2b-bueroreinigung",
];

const P1_ROUTES = [
  "/solarreinigung",
  "/pv-anlagen-reinigung",
  "/signature-services",
  "/spezialreinigung",
  "/fernumzug-muenchen",
  "/seniorenumzug-bayern",
  "/angebot-vergleichen-duesseldorf",
  "/angebot-vergleichen-regensburg",
  "/reinigungsfirma-angebot",
  "/regensburg/wohnungsaufloesung",
  "/regensburg/bueroreinigung",
  "/regensburg/umzugsunternehmen",
  "/duesseldorf/reinigungsfirma",
  "/duesseldorf/gewerbeflaechen-reinigung",
];

const EDITED_THIS_ROUND = new Set([
  "/leistungen",
  "/kontakt",
  "/anbieter-vergleichen",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/umzug",
  "/duesseldorf/entruempelung",
  "/duesseldorf/haushaltsaufloesung",
  "/regensburg",
  "/umzug-regensburg",
  "/reinigung-regensburg",
  "/entruempelung-regensburg",
  "/bueroreinigung-regensburg",
  "/gewerbereinigung-regensburg",
  "/klaviertransport-regensburg",
  "/diskreter-umzug-trennung-scheidung",
  "/solarreinigung",
  "/pv-anlagen-reinigung",
]);

const QUALITY_TERMS = [
  "zuverlaessiger partner",
  "beste qualitaet",
  "premium service",
  "rundum sorglos",
  "guenstigster garantiert",
  "100 % zufriedenheit",
  "nr. 1",
  "billig",
];

const CUSTOMER_WORDS = [
  "anfragen",
  "angebot",
  "umfang",
  "termin",
  "fotos",
  "zugang",
  "objekt",
  "flaeche",
  "raumliste",
  "etage",
  "kontakt",
  "einordnen",
  "klaeren",
  "pruefen",
];

const SERVICE_PATTERNS = [
  ["bueroreinigung", "Bueroreinigung"],
  ["gewerbereinigung", "Gewerbereinigung"],
  ["praxisreinigung", "Praxisreinigung"],
  ["fensterreinigung", "Fensterreinigung"],
  ["reinigung", "Reinigung"],
  ["umzug", "Umzug"],
  ["umzugs", "Umzug"],
  ["klaviertransport", "Klaviertransport"],
  ["entruempelung", "Entruempelung"],
  ["haushaltsaufloesung", "Haushaltsaufloesung"],
  ["wohnungsaufloesung", "Wohnungsaufloesung"],
  ["solarreinigung", "Solarreinigung"],
  ["pv-anlagen-reinigung", "PV-Anlagen-Reinigung"],
  ["angebot", "Angebot pruefen"],
  ["anbieter", "Anbieter vergleichen"],
  ["diskret", "Diskret-Service"],
  ["signature", "Signature Service"],
  ["spezial", "Spezialservice"],
];

function read(file) {
  try {
    return fs.readFileSync(path.join(root, file), "utf8");
  } catch {
    return "";
  }
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function routeToPageFile(route) {
  if (route === "/") return "app/page.tsx";
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return `app/${clean}/page.tsx`;
}

function extractSitemapRoutes() {
  const source = read("lib/sitemap-routes.ts");
  const routes = [];
  const regex = /"([^"]+)"/g;
  let match;
  while ((match = regex.exec(source))) {
    const value = match[1];
    if (value.startsWith("/")) routes.push(value);
  }
  return Array.from(new Set(routes)).sort((a, b) => a.localeCompare(b));
}

function allPageFiles() {
  const results = [];
  function walk(dir) {
    const full = path.join(root, dir);
    if (!fs.existsSync(full)) return;
    for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(rel);
      if (entry.isFile() && entry.name === "page.tsx") results.push(rel.replace(/\\/g, "/"));
    }
  }
  walk("app");
  return results.sort();
}

function extractTitle(source) {
  const direct = source.match(/title:\s*["'`]([^"'`]+)["'`]/);
  if (direct) return squash(direct[1]);
  const meta = source.match(/<title[^>]*>([^<]+)<\/title>/i);
  return meta ? squash(meta[1]) : "";
}

function extractDescription(source) {
  const direct = source.match(/description:\s*["'`]([^"'`]+)["'`]/);
  if (direct) return squash(direct[1]);
  return "";
}

function extractH1(source) {
  const match = source.match(/<h1[^>]*>([\s\S]{0,800}?)<\/h1>/i);
  if (!match) return "";
  return squash(match[1].replace(/<[^>]+>/g, " "));
}

function squash(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function norm(value) {
  return squash(value).toLowerCase();
}

function inferCity(route) {
  if (/duesseldorf/.test(route)) return "Duesseldorf";
  if (/regensburg/.test(route)) return "Regensburg";
  if (/muenchen/.test(route)) return "Muenchen";
  if (/landshut/.test(route)) return "Landshut";
  if (/nuernberg/.test(route)) return "Nuernberg";
  if (/bayern/.test(route)) return "Bayern";
  return "-";
}

function inferService(route) {
  for (const [needle, label] of SERVICE_PATTERNS) {
    if (route.includes(needle)) return label;
  }
  if (route === "/") return "Hub";
  if (route === "/kontakt") return "Kontakt";
  if (route === "/leistungen") return "Leistungsuebersicht";
  if (["/impressum", "/datenschutz", "/agb"].includes(route)) return "Recht/Organisation";
  return "Allgemein";
}

function inferType(route) {
  if (["/impressum", "/datenschutz", "/agb"].includes(route)) return "Recht/Organisation";
  if (route.startsWith("/blog")) return "Blog/Ratgeber";
  if (route === "/" || route === "/leistungen" || route === "/kontakt") return "Core";
  if (route.includes("angebot") || route.includes("anbieter") || route.includes("angebotscheck")) return "Angebotspruefung";
  if (route === "/duesseldorf" || route === "/regensburg" || route.startsWith("/region-")) return "Standortseite";
  if (route.includes("signature") || route.includes("diskret") || route.includes("plan-b") || route.includes("spezial")) return "Signature/Spezial";
  if (inferCity(route) !== "-") return "Lokale Service-Seite";
  return "Service-Seite";
}

function primaryKeyword(route) {
  const city = inferCity(route);
  const service = inferService(route);
  if (route === "/") return "FLOXANT Anfrage";
  if (route === "/kontakt") return "FLOXANT Kontakt";
  if (route === "/leistungen") return "FLOXANT Leistungen";
  if (city !== "-" && service !== "Allgemein") return `${service} ${city}`;
  return service;
}

function targetCustomer(route) {
  const type = inferType(route);
  if (type === "Blog/Ratgeber") return "Informationssuchende vor Anfrage";
  if (type === "Recht/Organisation") return "Besucher mit Pflichtinformationen";
  if (type === "Angebotspruefung") return "Kunden mit vorhandenem Angebot oder Unsicherheit";
  if (route.includes("buer") || route.includes("gewerbe") || route.includes("praxis")) return "B2B, Praxis, Buero, Verwaltung";
  if (route.includes("diskret") || route.includes("nachlass") || route.includes("senior")) return "Kunden mit sensibler Situation";
  return "Privat- oder Geschaeftskunden mit konkretem Bedarf";
}

function searchIntent(route) {
  const service = inferService(route);
  const city = inferCity(route);
  if (inferType(route) === "Blog/Ratgeber") return "Frage klaeren und passenden naechsten Schritt finden";
  if (inferType(route) === "Recht/Organisation") return "Pflichtangaben nachlesen";
  if (inferType(route) === "Angebotspruefung") return "Angebot, Umfang oder Anbieter sachlich einordnen";
  if (city !== "-") return `${service} in ${city} mit Umfang, Termin und Zugang anfragen`;
  return `${service} verstehen und Anfrage vorbereiten`;
}

function priorityFor(route) {
  if (P0_ROUTES.includes(route)) return "P0";
  if (P1_ROUTES.includes(route)) return "P1";
  if (route.startsWith("/blog")) return "P2";
  if (["/impressum", "/datenschutz", "/agb"].includes(route)) return "P2";
  if (inferCity(route) !== "-" || inferType(route) === "Signature/Spezial") return "P2";
  return "P3";
}

function leadValue(route) {
  const p = priorityFor(route);
  if (p === "P0") return "hoch";
  if (p === "P1") return "mittel bis hoch";
  if (inferType(route) === "Blog/Ratgeber") return "mittel";
  if (inferType(route) === "Recht/Organisation") return "niedrig";
  return "mittel";
}

function longTail(route) {
  const city = inferCity(route);
  const service = inferService(route);
  const tails = [];
  if (service !== "Allgemein") tails.push(`${service.toLowerCase()} angebot pruefen`);
  if (city !== "-") tails.push(`${service.toLowerCase()} ${city.toLowerCase()} mit fotos`);
  if (/reinigung/.test(route)) tails.push("reinigung vor uebergabe", "reinigung mit termin und objekt");
  if (/umzug/.test(route)) tails.push("umzug mit etage zugang volumen", "umzugsangebot pruefen");
  if (/entruempelung|aufloesung/.test(route)) tails.push("raeume menge zugang fotos", "entruempelungsangebot pruefen");
  return tails.slice(0, 3).join("; ") || "kundensituation, umfang, termin";
}

function analyzeRoute(route) {
  const file = routeToPageFile(route);
  const source = read(file);
  const directFileExists = Boolean(source);
  const title = extractTitle(source);
  const description = extractDescription(source);
  const h1 = extractH1(source);
  const sourceNorm = norm(source);
  const issues = [];
  const wins = [];

  if (!directFileExists) issues.push("programmatic_or_dynamic_route_manual_review");
  if (directFileExists && !h1) issues.push("h1_not_detected");
  if (h1 && h1.length > 92) issues.push("h1_too_long");
  if (h1 && /(\||,).*(\||,)/.test(h1)) issues.push("h1_keyword_chain_risk");
  if (title && title.length > 68) issues.push("title_long");
  if (title && /(\|).*(\|)/.test(title)) issues.push("title_keyword_chain_risk");
  if (description && description.length > 165) issues.push("description_long");
  if (description && description.length > 0 && description.length < 80) issues.push("description_short");
  if (route.includes("duesseldorf") && h1 && !/duesseldorf/i.test(h1)) issues.push("local_h1_missing_city");
  if (route.includes("regensburg") && h1 && !/regensburg/i.test(h1)) issues.push("local_h1_missing_city");
  if (inferType(route) !== "Recht/Organisation" && directFileExists && !/(kontakt|anfrag|angebot|whatsapp|formular)/i.test(source)) issues.push("cta_weak_or_missing");
  if (directFileExists && !/(faq|haeufige fragen|fragen)/i.test(source) && ["P0", "P1"].includes(priorityFor(route))) issues.push("faq_missing_or_not_visible");
  if (QUALITY_TERMS.some((term) => sourceNorm.includes(term))) issues.push("floskel_or_claim_risk");
  if (CUSTOMER_WORDS.filter((word) => sourceNorm.includes(word)).length >= 5) wins.push("customer_words_present");
  if (/(ablauf|schritt|fotos|umfang|termin|zugang)/i.test(source)) wins.push("process_and_effort_present");
  if (/(angebot-guenstiger-pruefen|angebotscheck|anbieter-vergleichen)/i.test(source)) wins.push("offercheck_link_present");

  let score = 82;
  if (!directFileExists) score -= 12;
  score -= issues.length * 5;
  score += wins.length * 4;
  if (priorityFor(route) === "P0" && wins.length >= 2) score += 3;
  score = Math.max(25, Math.min(100, score));

  return {
    url: route,
    file,
    directFileExists,
    pageType: inferType(route),
    service: inferService(route),
    city: inferCity(route),
    targetCustomer: targetCustomer(route),
    intent: searchIntent(route),
    primaryKeyword: primaryKeyword(route),
    longTail: longTail(route),
    title,
    description,
    h1,
    qualityStatus: score >= 86 ? "gut" : score >= 72 ? "feinschliff" : score >= 58 ? "schwach" : "kritisch",
    leadValue: leadValue(route),
    rankingPotential: priorityFor(route) === "P0" ? "hoch" : priorityFor(route) === "P1" ? "mittel bis hoch" : "mittel",
    conversionPotential: leadValue(route),
    risk: riskFor(route, issues),
    recommendation: recommendationFor(route, issues),
    priority: priorityFor(route),
    manualReview: issues.includes("programmatic_or_dynamic_route_manual_review") || /P[01]/.test(priorityFor(route)) ? "Ja" : "Nein",
    score,
    grade: grade(score),
    issues,
    wins,
    autoChanged: "Nein",
  };
}

function riskFor(route, issues) {
  if (issues.includes("floskel_or_claim_risk")) return "Claim/Floskel";
  if (issues.includes("programmatic_or_dynamic_route_manual_review")) return "Dynamisch/Thin-Content manuell pruefen";
  if (route.startsWith("/blog")) return "niedrig bis mittel";
  if (/duesseldorf|regensburg|muenchen|landshut|nuernberg|bayern/.test(route) && priorityFor(route) !== "P0") return "Ort-/Doorway-Risiko pruefen";
  return "niedrig";
}

function recommendationFor(route, issues) {
  if (priorityFor(route) === "P0") return "individuell pruefen und redaktionell schaerfen";
  if (priorityFor(route) === "P1") return "Page Brief und gezielte Nachbearbeitung";
  if (issues.includes("programmatic_or_dynamic_route_manual_review")) return "Template/Substanz manuell bewerten";
  if (route.startsWith("/blog")) return "als Ratgeber intern verlinken oder konsolidieren";
  return "dokumentieren, nicht blind umschreiben";
}

function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 68) return "C";
  if (score >= 55) return "D";
  return "F";
}

function mdEscape(value) {
  return squash(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .replace(/`/g, "'");
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`),
  ].join("\n");
}

function topRows(items, count) {
  return [...items].sort((a, b) => a.score - b.score || a.url.localeCompare(b.url)).slice(0, count);
}

function bestRows(items, count) {
  return [...items].sort((a, b) => b.score - a.score || a.url.localeCompare(b.url)).slice(0, count);
}

function problemFrequency(items) {
  const map = new Map();
  for (const item of items) {
    for (const issue of item.issues) map.set(issue, (map.get(issue) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function buildInventory(items, generatedAt) {
  const rows = items.map((item) => [
    item.url,
    item.pageType,
    item.service,
    item.city,
    item.targetCustomer,
    item.intent,
    item.primaryKeyword,
    item.longTail,
    item.qualityStatus,
    item.leadValue,
    item.rankingPotential,
    item.conversionPotential,
    item.risk,
    item.recommendation,
    item.priority,
    item.manualReview,
  ]);
  return [
    "# Editorial Site Inventory",
    "",
    `Stand: ${generatedAt}`,
    "",
    `Gepruefte oeffentliche Sitemap-Routen: ${items.length}`,
    "",
    "Dieses Inventar bewertet alle Sitemap-Routen. Dynamische oder programmatisch erzeugte Seiten werden nicht erfunden, sondern fuer manuelle Review markiert.",
    "",
    table(
      [
        "URL",
        "Seitentyp",
        "Service",
        "Stadt",
        "Zielkunde",
        "Suchintention",
        "primaeres Keyword",
        "Long-Tail-Chancen",
        "aktueller Qualitaetsstatus",
        "Lead-Wert",
        "Ranking-Potenzial",
        "Conversion-Potenzial",
        "Risiko",
        "empfohlene Massnahme",
        "Prioritaet",
        "manuelle Pruefung",
      ],
      rows,
    ),
    "",
  ].join("\n");
}

function buildPriorityQueue(items, generatedAt) {
  const selected = items
    .filter((item) => ["P0", "P1"].includes(item.priority))
    .concat(topRows(items.filter((item) => item.priority === "P2"), 25))
    .concat(topRows(items.filter((item) => item.priority === "P3"), 20));
  const rows = selected.map((item) => [
    item.priority,
    item.url,
    `${item.service}, ${item.city}`,
    item.issues.slice(0, 3).join("; ") || "Substanz erhalten",
    item.recommendation,
    item.primaryKeyword,
    item.intent,
    ctaFor(item),
    linksFor(item).join("; "),
    item.priority === "P0" ? "mittel" : "klein",
    EDITED_THIS_ROUND.has(item.url) ? "Ja" : "Nein",
  ]);
  return [
    "# Editorial Priority Queue",
    "",
    `Stand: ${generatedAt}`,
    "",
    "P0/P1 werden redaktionell priorisiert. P2/P3 bleiben Queue, nicht Massen-Umschreibung.",
    "",
    table(
      [
        "Prioritaet",
        "URL",
        "Warum wichtig?",
        "Was ist das Problem?",
        "Welche Verbesserung ist noetig?",
        "Welche Keywords?",
        "Welche Kundensituation?",
        "Welche CTA?",
        "Welche internen Links?",
        "Aufwand",
        "Umsetzung in dieser Runde",
      ],
      rows,
    ),
    "",
  ].join("\n");
}

function ctaFor(item) {
  if (item.pageType === "Angebotspruefung") return "Angebot pruefen lassen";
  if (item.service.includes("Bueroreinigung")) return "Bueroreinigung anfragen";
  if (item.service.includes("Gewerbereinigung")) return "Objekt und Raumliste senden";
  if (item.service.includes("Umzug")) return "Umzug vorbereiten";
  if (item.service.includes("Entruempelung") || item.service.includes("Aufloesung")) return "Raeume und Fotos senden";
  if (item.service.includes("Diskret")) return "Diskreten Fall beschreiben";
  return "Anfrage mit Ort und Umfang starten";
}

function linksFor(item) {
  const links = ["/kontakt", "/angebot-guenstiger-pruefen"];
  if (item.city === "Duesseldorf") links.push("/duesseldorf");
  if (item.city === "Regensburg") links.push("/regensburg");
  if (item.service.includes("Reinigung")) links.push("/leistungen", "/reinigungsfirma-angebot");
  if (item.service.includes("Umzug")) links.push("/umzug-regensburg", "/anbieter-vergleichen");
  return Array.from(new Set(links)).slice(0, 5);
}

function buildBriefs(items, generatedAt) {
  const p0 = items.filter((item) => item.priority === "P0");
  const sections = p0.map((item) => {
    const local = item.city !== "-" ? `Lokale Differenzierung: ${item.city} klar nennen, keine Stadttexte kopieren.` : "Lokale Differenzierung: nicht lokal oder Hub-Funktion.";
    return [
      `## ${item.url}`,
      "",
      `1. URL: ${item.url}`,
      `2. Seitentyp: ${item.pageType}`,
      `3. Zielkunde: ${item.targetCustomer}`,
      `4. Hauptproblem des Kunden: ${item.intent}`,
      `5. Suchintention: ${item.intent}`,
      `6. Primaeres Keyword: ${item.primaryKeyword}`,
      `7. Sekundaere Keywords: ${item.longTail}`,
      `8. Long-Tail-Keywords: ${item.longTail}`,
      `9. Aktuelle Schwaeche: ${item.issues.join("; ") || "nur Feinschliff"}`,
      `10. Gewuenschte H1: konkret, kundennahe Formulierung mit ${item.primaryKeyword}`,
      "11. Gewuenschtes Hero-Intro: 2-4 Saetze zu Situation, Angaben, Einordnung und naechstem Schritt.",
      "12. Wichtigste H2-Themen: Kundensituation, Ablauf, Aufwandstreiber, Grenzen, FAQ.",
      "13. Kundensituationen: unsichere Anfrage, vorhandenes Angebot, Termin-/Zugangsfrage, Fotos vorhanden.",
      "14. Aufwandstreiber: Objekt, Flaeche/Volumen, Zugang, Etage, Termin, Dringlichkeit, Fotos.",
      "15. FAQ-Fragen: Was muss ich senden? Kann ein Angebot geprueft werden? Gibt es Garantien? Was passiert nach Anfrage?",
      `16. CTA: ${ctaFor(item)}`,
      `17. Interne Links: ${linksFor(item).join(", ")}`,
      "18. Nicht versprechen: keine Preisgarantie, keine Rechtsberatung, keine Ranking-/Maps-Garantie, keine erfundenen Standortdaten.",
      `19. ${local}`,
      "20. Ranking-Ziel: richtige Zielseite fuer den Suchintent staerken.",
      "21. Conversion-Ziel: qualifizierte Anfrage mit Ort, Umfang, Fotos und Kontaktweg.",
      "",
    ].join("\n");
  });
  return [
    "# P0 Page Briefs",
    "",
    `Stand: ${generatedAt}`,
    "",
    "Diese Briefs sind Grundlage fuer individuelle Redaktion. Sie sind bewusst keine Template-Formel.",
    "",
    ...sections,
  ].join("\n");
}

function buildWordingPlaybook(generatedAt) {
  return `# Customer Wording Playbook

Stand: ${generatedAt}

## Reinigung

Kunden sagen: Reinigung anfragen, Wohnung reinigen lassen, Buero reinigen lassen, Praxis reinigen lassen, Reinigung vor Uebergabe, Reinigung nach Entruempelung, regelmaessige Reinigung, kurzfristige Reinigung, Angebot Reinigung pruefen.

## Umzug

Kunden sagen: Umzug anfragen, Umzugsangebot pruefen, kleiner Umzug, Umzug im Alter, Seniorenumzug, Klavier transportieren, Moebeltransport, Rueckfahrt nutzen, Beiladung pruefen.

## Entruempelung

Kunden sagen: Keller leerraeumen, Wohnung aufloesen, Haushalt aufloesen, Nachlass raeumen, Garage entruempeln, diskret entruempeln, Entruempelung vor Uebergabe, Angebot Entruempelung pruefen.

## B2B

Kunden sagen: Bueroreinigung fuer Firmen, Gewerbeflaeche reinigen, Turnus festlegen, Reinigung ausserhalb Geschaeftszeiten, Ansprechpartner, Leistungsumfang vergleichen, Angebot pruefen.

## Angebot pruefen

Kunden sagen: Angebot wirkt zu teuer, Leistungsumfang unklar, Anbieter vergleichen, Zweitmeinung, Preispositionen verstehen, Zusatzkosten unklar, mehrere Angebote vergleichen.

## Diskrete Faelle

Kunden sagen: sensibler Fall, bevorzugter Kontaktweg, diskrete Anfrage, zurueckhaltende Kommunikation, Nachlass, Trennung, Todesfall, Seniorenumzug.

## Duesseldorf

Kunden sagen: Reinigung in Duesseldorf anfragen, Bueroreinigung Duesseldorf, Praxisreinigung Duesseldorf, Fensterreinigung Duesseldorf, Umzug Duesseldorf, Entruempelung Duesseldorf.

## Regensburg

Kunden sagen: Umzug Regensburg, Reinigung Regensburg, Entruempelung Regensburg, Klaviertransport Regensburg, Gewerbereinigung Regensburg, Seniorenumzug Regensburg.

## Woerter vermeiden

- billig
- guenstigster garantiert
- Soforttermin garantiert
- rechtssicher geprueft
- beste Qualitaet
- Rundum-sorglos ohne Erklaerung
- Premium-Service ohne Substanz
- Nr. 1
- 100 % garantiert
`;
}

function buildGoogleRules(generatedAt) {
  return `# Google Friendly Content Rules

Stand: ${generatedAt}

## Helpful Content fuer FLOXANT

Eine gute Seite beantwortet eine echte Kundenfrage, erklaert Aufwandstreiber, hat eine klare naechste Handlung, sichtbare FAQ, sinnvolle interne Links und unterscheidet Service und Ort sauber.

## Riskant fuer FLOXANT

- Seiten mit nur geaendertem Stadtnamen
- gleiche H1 oder Meta Description auf vielen Seiten
- gleiche FAQ auf vielen Seiten
- lokale Seiten ohne lokalen Nutzen
- Keyword-Listen statt hilfreichem Text
- leere Doorway-Pages
- lange generische Absaetze
- nicht bediente Orte

## Gute Seite

Konkrete H1, kurze Intro, Kundensituationen, Ablauf, Aufwandstreiber, FAQ, CTA, interne Links, klare Grenzen und lokale Besonderheit, wenn die Seite lokal ist.

## Angebotspruefung

Als hilfreiche Option einbauen: Umfang, offene Punkte, Fotos, Termin und Preislogik einordnen. Keine Ersparnisgarantie, keine Rechtsberatung, kein Preisversprechen.

## Duesseldorf und Regensburg

Eigene lokale Services, eigene Kontaktlogik, keine kopierten Stadttexte und keine falschen Standortdaten.
`;
}

function buildMetadataReport(items, generatedAt) {
  const rows = items
    .filter((item) => ["P0", "P1"].includes(item.priority))
    .map((item) => [
      item.url,
      item.title || "nicht direkt ermittelbar",
      suggestedTitle(item),
      item.description || "nicht direkt ermittelbar",
      suggestedDescription(item),
      item.primaryKeyword,
      item.intent,
      EDITED_THIS_ROUND.has(item.url) ? "in dieser Runde redaktionell geprueft" : "Queue/Monitoring",
      item.risk,
      "Ja",
    ]);
  return [
    "# P0/P1 Metadata Edit Report",
    "",
    `Stand: ${generatedAt}`,
    "",
    table(
      ["URL", "alter Title", "neuer Title", "alte Description", "neue Description", "Zielkeyword", "Suchintention", "Begruendung", "Risiko", "nach 28 Tagen pruefen"],
      rows,
    ),
    "",
  ].join("\n");
}

function suggestedTitle(item) {
  if (item.city !== "-" && item.service !== "Allgemein") return `${item.service} ${item.city} mit Umfang und Termin klaeren`;
  if (item.pageType === "Angebotspruefung") return `${item.service}: Umfang, Termin und offene Punkte klaeren`;
  return `${item.primaryKeyword} klar und ohne leere Versprechen`;
}

function suggestedDescription(item) {
  if (item.city !== "-") return `${item.primaryKeyword} anfragen: Objekt, Umfang, Zugang, Fotos und Termin senden. FLOXANT klaert den naechsten sinnvollen Schritt ohne Garantieversprechen.`;
  return `${item.primaryKeyword} einordnen: Situation, Umfang, Fotos, Termin und offene Fragen klaeren, bevor Sie vorschnell zusagen.`;
}

function buildFaqReport(items, generatedAt) {
  const rows = items
    .filter((item) => ["P0", "P1"].includes(item.priority))
    .map((item) => [
      item.url,
      item.issues.includes("faq_missing_or_not_visible") ? "FAQ/Quick Answer nacharbeiten" : "FAQ/Quick Answer vorhanden oder im Layout erkennbar",
      quickAnswerFor(item),
      "Was muss ich senden?; Kann FLOXANT ein Angebot pruefen?; Was beeinflusst den Aufwand?; Gibt es Garantien?",
      EDITED_THIS_ROUND.has(item.url) ? "Ja" : "Nein",
    ]);
  return [
    "# P0/P1 FAQ Quick Answer Report",
    "",
    `Stand: ${generatedAt}`,
    "",
    table(["URL", "Status", "Quick Answer", "empfohlene FAQ", "in dieser Runde geprueft"], rows),
    "",
  ].join("\n");
}

function quickAnswerFor(item) {
  if (item.city !== "-") return `${item.primaryKeyword} sollte mit Objekt, Umfang, Zugang, Fotos und Termin beschrieben werden. FLOXANT ordnet die Anfrage und offene Punkte ein.`;
  return `${item.primaryKeyword} hilft, wenn Umfang, Termin oder Zusatzpunkte unklar sind. FLOXANT klaert naechste Schritte ohne Garantieversprechen.`;
}

function buildExperienceReport(items, generatedAt) {
  const rows = items
    .filter((item) => ["P0", "P1"].includes(item.priority))
    .map((item) => [
      item.url,
      item.h1 || "H1 nicht direkt ermittelt",
      item.wins.join("; ") || "Substanz manuell pruefen",
      item.issues.slice(0, 4).join("; ") || "keine harten Probleme erkannt",
      EDITED_THIS_ROUND.has(item.url) ? "Hero/CTA/Trust redaktionell nachziehen" : "Queue",
    ]);
  return [
    "# P0/P1 Professional Experience Report",
    "",
    `Stand: ${generatedAt}`,
    "",
    table(["URL", "H1", "Staerken", "Experience-Probleme", "Massnahme"], rows),
    "",
  ].join("\n");
}

function buildInternalLinkReport(items, generatedAt) {
  const rows = items
    .filter((item) => ["P0", "P1"].includes(item.priority))
    .map((item) => [
      item.url,
      linksFor(item).join("; "),
      ctaFor(item),
      item.wins.includes("offercheck_link_present") ? "Angebotspruefung verlinkt" : "Angebotspruefung passend einbauen",
      EDITED_THIS_ROUND.has(item.url) ? "Ja" : "Nein",
    ]);
  return [
    "# P0/P1 Internal Link Edit Report",
    "",
    `Stand: ${generatedAt}`,
    "",
    table(["URL", "empfohlene interne Links", "CTA-Linktext", "Angebotspruefung", "in dieser Runde geprueft"], rows),
    "",
  ].join("\n");
}

function buildQualityReport(items, generatedAt, pageFileCount) {
  const counts = gradeCounts(items);
  const problems = problemFrequency(items).slice(0, 12);
  const rows = topRows(items, 80).map((item) => [
    item.url,
    item.score,
    item.grade,
    item.issues.slice(0, 5).join("; ") || "keine Hauptprobleme",
    item.recommendation,
    item.priority,
    item.autoChanged,
  ]);
  return [
    "# Editorial Quality Report",
    "",
    `Stand: ${generatedAt}`,
    "",
    `Gepruefte Sitemap-Routen: ${items.length}`,
    `Physische page.tsx-Dateien: ${pageFileCount}`,
    "",
    `Grades: A=${counts.A || 0}, B=${counts.B || 0}, C=${counts.C || 0}, D=${counts.D || 0}, F=${counts.F || 0}`,
    "",
    "## Haeufigste Probleme",
    "",
    table(["Problem", "Anzahl"], problems),
    "",
    "## Schwache/zu pruefende Seiten",
    "",
    table(["URL", "Score", "Grade", "wichtigste Probleme", "empfohlene Massnahme", "Prioritaet", "automatisch geaendert"], rows),
    "",
  ].join("\n");
}

function gradeCounts(items) {
  const counts = {};
  for (const item of items) counts[item.grade] = (counts[item.grade] || 0) + 1;
  return counts;
}

function buildScoreboard(items, generatedAt) {
  const counts = gradeCounts(items);
  const p0 = items.filter((item) => item.priority === "P0");
  const p1 = items.filter((item) => item.priority === "P1");
  return [
    "# Editorial Content Scoreboard",
    "",
    `Stand: ${generatedAt}`,
    "",
    `- Anzahl gepruefter Seiten: ${items.length}`,
    `- A/B/C/D/F: A=${counts.A || 0}, B=${counts.B || 0}, C=${counts.C || 0}, D=${counts.D || 0}, F=${counts.F || 0}`,
    "",
    "## P0-Seiten mit Score",
    "",
    table(["URL", "Score", "Grade", "Status"], p0.map((item) => [item.url, item.score, item.grade, item.qualityStatus])),
    "",
    "## P1-Seiten mit Score",
    "",
    table(["URL", "Score", "Grade", "Status"], p1.map((item) => [item.url, item.score, item.grade, item.qualityStatus])),
    "",
    "## Schlimmste 50 Seiten",
    "",
    table(["URL", "Score", "Grade", "Problem"], topRows(items, 50).map((item) => [item.url, item.score, item.grade, item.issues.slice(0, 3).join("; ")])),
    "",
    "## Beste 50 Seiten",
    "",
    table(["URL", "Score", "Grade", "Staerken"], bestRows(items, 50).map((item) => [item.url, item.score, item.grade, item.wins.join("; ")])),
    "",
    "## Haeufigste Probleme",
    "",
    table(["Problem", "Anzahl"], problemFrequency(items).slice(0, 20)),
    "",
    "## Empfohlene naechste Redaktionsrunde",
    "",
    "- Echte GSC CSV-Daten importieren und Scoreboard mit Klick/Impression abgleichen.",
    "- P0/P1-Seiten mit Score C oder schlechter einzeln bearbeiten.",
    "- P3-Orts-/Longtail-Seiten nur konsolidieren oder verbessern, wenn echte Nachfrage/Substanz belegt ist.",
    "- Angebotspruefung als hilfreiche Option weiter sichtbar halten, ohne Preis- oder Rechtsversprechen.",
    "",
  ].join("\n");
}

function writeBriefIndex() {
  write(
    "docs/page-briefs/README.md",
    "# Page Briefs\n\nDie Sammeldatei liegt in `docs/P0_PAGE_BRIEFS.md`. Einzelbriefs koennen spaeter daraus ausgeschnitten werden, wenn eine Seite in die naechste Redaktionsrunde geht.\n",
  );
}

function main() {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.mkdirSync(briefsDir, { recursive: true });
  const generatedAt = new Date().toISOString();
  const routes = extractSitemapRoutes();
  const pageFiles = allPageFiles();
  const items = routes.map(analyzeRoute);

  write("docs/EDITORIAL_SITE_INVENTORY.md", buildInventory(items, generatedAt));
  write("docs/EDITORIAL_PRIORITY_QUEUE.md", buildPriorityQueue(items, generatedAt));
  write("docs/P0_PAGE_BRIEFS.md", buildBriefs(items, generatedAt));
  write("docs/CUSTOMER_WORDING_PLAYBOOK.md", buildWordingPlaybook(generatedAt));
  write("docs/GOOGLE_FRIENDLY_CONTENT_RULES.md", buildGoogleRules(generatedAt));
  write("docs/P0_P1_METADATA_EDIT_REPORT.md", buildMetadataReport(items, generatedAt));
  write("docs/P0_P1_FAQ_QUICKANSWER_REPORT.md", buildFaqReport(items, generatedAt));
  write("docs/P0_P1_PROFESSIONAL_EXPERIENCE_REPORT.md", buildExperienceReport(items, generatedAt));
  write("docs/P0_P1_INTERNAL_LINK_EDIT_REPORT.md", buildInternalLinkReport(items, generatedAt));
  write("EDITORIAL_QUALITY_REPORT.md", buildQualityReport(items, generatedAt, pageFiles.length));
  write("docs/EDITORIAL_CONTENT_SCOREBOARD.md", buildScoreboard(items, generatedAt));
  writeBriefIndex();
  write(
    "editorial-quality-report.json",
    `${JSON.stringify(
      {
        status: "WARN",
        generatedAt,
        routes: routes.length,
        pageFiles: pageFiles.length,
        gradeCounts: gradeCounts(items),
        p0: items.filter((item) => item.priority === "P0").length,
        p1: items.filter((item) => item.priority === "P1").length,
        editedThisRound: Array.from(EDITED_THIS_ROUND),
        topProblems: problemFrequency(items).slice(0, 20).map(([problem, count]) => ({ problem, count })),
        worst: topRows(items, 50),
        best: bestRows(items, 50),
      },
      null,
      2,
    )}\n`,
  );

  const failures = items.filter((item) => item.grade === "F").length;
  const warnings = items.filter((item) => ["C", "D"].includes(item.grade)).length;
  console.log(`EDITORIAL_QUALITY_WARN routes=${routes.length} pageFiles=${pageFiles.length} warnings=${warnings} failures=${failures}`);
  console.log("Reports written: EDITORIAL_QUALITY_REPORT.md, editorial-quality-report.json, docs/EDITORIAL_*");
}

main();
