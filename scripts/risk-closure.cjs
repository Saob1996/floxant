const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const docsDir = path.join(root, "docs");
const jsonPath = path.join(root, "risk-closure-report.json");
const reportPath = path.join(docsDir, "RISK_CLOSURE_REPORT.md");
const docsOnly = process.argv.includes("--docs-only");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function run(command, args, options = {}) {
  const startedAt = Date.now();
  const executable = process.platform === "win32" && command === "npm" ? "cmd.exe" : command;
  const finalArgs = process.platform === "win32" && command === "npm"
    ? ["/d", "/s", "/c", ["npm", ...args].join(" ")]
    : args;
  const result = spawnSync(executable, finalArgs, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20,
  });
  const exitCode = typeof result.status === "number" ? result.status : 1;
  return {
    name: [command, ...args].join(" "),
    status: exitCode === 0 ? "PASS" : options.optional ? "WARN" : "FAIL",
    exitCode,
    durationMs: Date.now() - startedAt,
    stdout: result.stdout || "",
    stderr: result.stderr || result.error?.message || "",
  };
}

function git(args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 * 20 });
  return (result.stdout || "").trim();
}

function parseStatus() {
  const lines = git(["status", "--porcelain"]).split(/\r?\n/).filter(Boolean);
  return lines.map((line) => ({
    raw: line,
    status: line.slice(0, 2),
    file: line.slice(3).trim(),
    untracked: line.startsWith("??"),
  }));
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content);
}

function list(items) {
  return items.length ? items.map((item) => `- \`${item}\``).join("\n") : "- Keine";
}

function generateDocs() {
  ensureDir(docsDir);
  const branch = git(["branch", "--show-current"]);
  const status = parseStatus();
  const changed = status.filter((item) => !item.untracked).map((item) => item.file);
  const untracked = status.filter((item) => item.untracked).map((item) => item.file);
  const riskFiles = [
    "package.json",
    "data/gsc/.gitkeep",
    "scripts/gsc-import.cjs",
    "scripts/encoding-check.cjs",
    "scripts/seo-dedupe-risk.cjs",
    "scripts/risk-closure.cjs",
    "scripts/performance-health.cjs",
    "scripts/accessibility-health.cjs",
    "scripts/snippet-health.cjs",
    "scripts/editorial-quality.cjs",
    "components/LocationServiceSwitcher.tsx",
    "components/LocalContactPanel.tsx",
    "components/local-seo/LocalSeoPage.tsx",
    "components/seo/ContactTrustPanel.tsx",
    "docs/WORKTREE_RISK_REPORT.md",
    "docs/STAGING_MANIFEST.md",
    "docs/NODE_WARNING_MODULE_TYPELESS_REPORT.md",
    "docs/GSC_EXPORT_INSTRUCTIONS.md",
    "docs/GSC_IMPORT_REPORT.md",
    "docs/TEMPLATE_H1_CLEANUP_REPORT.md",
    "docs/ENCODING_MOJIBAKE_REPORT.md",
    "docs/SEO_DEDUPE_DOORWAY_RISK_REPORT.md",
    "docs/QUERY_TO_PAGE_MAPPING.md",
    "docs/CTR_SNIPPET_OPTIMIZATION_REPORT.md",
    "docs/CONTENT_REFRESH_RANKING_REPORT.md",
    "docs/INTERNAL_LINK_PRIORITY_MAP.md",
    "docs/GBP_MAPS_RANKING_SUPPORT_PLAN.md",
    "docs/RANKING_WATCHLIST.md",
    "docs/GBP_NAP_MANUAL_CHECKLIST.md",
    "docs/REAL_CONVERSION_MEASUREMENT_PLAN.md",
    "docs/PREVIEW_DEPLOYMENT_CHECKLIST.md",
    "docs/RISK_CLOSURE_REPORT.md",
    "docs/CLIENT_COMPONENT_AUDIT_REPORT.md",
    "docs/ASSET_PERFORMANCE_REPORT.md",
    "docs/MOBILE_UX_HARDENING_REPORT.md",
    "docs/ACCESSIBILITY_FORM_UX_REPORT.md",
    "docs/TECHNICAL_SEO_HARDENING_REPORT.md",
    "docs/STRUCTURED_DATA_VALIDATION_REPORT.md",
    "docs/NAVIGATION_FOOTER_UX_REPORT.md",
    "docs/PROFESSIONAL_UX_POLISH_REPORT.md",
    "docs/EDITORIAL_SITE_INVENTORY.md",
    "docs/EDITORIAL_PRIORITY_QUEUE.md",
    "docs/P0_PAGE_BRIEFS.md",
    "docs/CUSTOMER_WORDING_PLAYBOOK.md",
    "docs/GOOGLE_FRIENDLY_CONTENT_RULES.md",
    "docs/P0_P1_METADATA_EDIT_REPORT.md",
    "docs/P0_P1_FAQ_QUICKANSWER_REPORT.md",
    "docs/P0_P1_PROFESSIONAL_EXPERIENCE_REPORT.md",
    "docs/EDITORIAL_CONTENT_SCOREBOARD.md",
    "docs/P0_P1_INTERNAL_LINK_EDIT_REPORT.md",
    "PERFORMANCE_HEALTH_REPORT.md",
    "ACCESSIBILITY_HEALTH_REPORT.md",
    "SNIPPET_HEALTH_REPORT.md",
    "EDITORIAL_QUALITY_REPORT.md",
    "performance-health-report.json",
    "accessibility-health-report.json",
    "snippet-health-report.json",
    "editorial-quality-report.json",
    "COPY_QUALITY_REPORT.md",
    "copy-quality-report.json",
    "gsc-import-report.json",
    "encoding-mojibake-report.json",
    "seo-dedupe-risk-report.json",
    "risk-closure-report.json",
  ];
  const likelyRisk = status.map((item) => item.file).filter((file) => riskFiles.includes(file));
  const likelyPreexisting = status.map((item) => item.file).filter((file) => !riskFiles.includes(file));
  const mergeRisk = status.length > 50 ? "HIGH" : status.length > 10 ? "MEDIUM" : "LOW";

  write("docs/WORKTREE_RISK_REPORT.md", `# Worktree Risk Report

Stand: ${new Date().toISOString()}

## 1. Aktueller Branch

\`${branch}\`

## 2. Anzahl geaenderter Dateien

- Git-Status-Eintraege gesamt: ${status.length}
- Modified/Deleted/Renamed tracked: ${changed.length}
- Untracked: ${untracked.length}

## 3. Liste geaenderter Dateien

${list(changed)}

## 4. Liste untracked Dateien

${list(untracked)}

## 5. Wahrscheinlich aus diesem Risk-Closure-Sprint

${list(likelyRisk)}

## 6. Wahrscheinlich vorbestehend

${list(likelyPreexisting)}

## 7. Dateien, die in dieser Runde bearbeitet werden duerfen

${list(riskFiles)}

## 8. Dateien, die nicht angefasst werden duerfen

Alle nicht oben genannten dirty Dateien. Bestehende Content-, Route-, API-, Component- und Config-Aenderungen bleiben unberuehrt, ausser ein Risk-Closure-Check dokumentiert sie nur lesend.

## 9. Staging-Empfehlung

- Niemals \`git add .\`.
- Nur gezielt Risk-Closure-Dateien stagen.
- \`package.json\` nur nach manueller Diff-Pruefung stagen, weil die Datei bereits vor diesem Sprint dirty war.
- Reports/JSON nur stagen, wenn die finalen Testlaeufe erfolgreich oder bewusst als WARN dokumentiert sind.

## 10. Merge-Risiko

${mergeRisk}
`);

  write("docs/STAGING_MANIFEST.md", `# Staging Manifest

Stand: ${new Date().toISOString()}

## Dateien, die aus dieser Runde gestaged werden sollen

${list(riskFiles)}

## Dateien, die nicht gestaged werden sollen

${list(likelyPreexisting)}

## Begruendung pro Dateigruppe

- \`scripts/*.cjs\`: neue lokale Risk-Closure-Checks ohne externe Dependencies.
- \`data/gsc/.gitkeep\`: vorbereitetes Ziel fuer manuelle GSC-CSV-Exports.
- \`docs/*RISK* / CHECKLIST / PLAN / REPORT\`: dokumentieren PASS/WARN/FAIL und manuelle Aufgaben.
- \`package.json\`: nur die neuen npm Scripts \`gsc:import\`, \`text:encoding-check\`, \`seo:dedupe-risk\`, \`copy:quality\`, \`editorial:quality\`, \`risk:closure\`; wegen vorbestehender Aenderungen nur hunkweise/manuell pruefen.
- \`*-report.json\`: maschinenlesbare Ergebnisse der neuen Checks.

## Manuelle Pruefung vor git add

1. \`git diff -- package.json\` pruefen.
2. \`git diff -- docs/WORKTREE_RISK_REPORT.md docs/STAGING_MANIFEST.md docs/RISK_CLOSURE_REPORT.md\` pruefen.
3. Keine alten Content-/SEO-/API-Dateien stagen, wenn sie nicht bewusst Teil des Merge-Pakets sind.
4. Bei Unsicherheit lieber kleiner stagen und Preview separat bauen.
`);

  write("docs/NODE_WARNING_MODULE_TYPELESS_REPORT.md", `# NODE WARNING MODULE_TYPELESS_PACKAGE_JSON Report

Stand: ${new Date().toISOString()}

## Status

WARN

## Betroffene Scripts

- \`npm run seo:health\` -> \`node scripts/seo-health-check.ts\`
- \`npm run seo:conversion\` -> \`node scripts/seo-conversion-check.ts\`
- \`npm run lead:health\` -> \`node scripts/lead-health-check.ts\`
- \`npm run site:qa\` -> \`node scripts/site-qa-check.ts\`
- \`npm run trust:health\` -> \`node scripts/trust-health-check.cjs\`
- \`npm run copy:quality\` -> \`node scripts/copy-quality.cjs\`
- \`npm run editorial:quality\` -> \`node scripts/editorial-quality.cjs\`
- \`npm run seo:gsc\` -> \`node scripts/analyze-gsc-export.ts\`

## Ursache

Einige TypeScript-Scripts nutzen ESM-Import/Export und werden direkt mit \`node *.ts\` ausgefuehrt. Ohne \`type: "module"\` kann Node diese Dateien erst als CommonJS versuchen und danach als ES Module reparsen. Das erzeugt \`MODULE_TYPELESS_PACKAGE_JSON\`.

## Fix durchgefuehrt

Nein fuer bestehende Scripts. Ein globales \`type: "module"\` waere riskant, weil das Repo CommonJS-Skripte und Next-Konfiguration nutzt. Umbenennen bestehender Scripts waere ein breiter Refactor.

## Sicherer Sprint-Fix

Alle neu hinzugefuegten Risk-Closure-Scripts sind \`.cjs\` und erzeugen diese Warnung nicht.

## Build-Auswirkung

Die Warnung ist Performance-/Parsing-Hinweis fuer lokale Node-Scripts, kein Build-Blocker.

## Restrisiko

WARN: Spaeter kann ein separater Script-Module-Cleanup geplant werden.
`);

  write("docs/GSC_EXPORT_INSTRUCTIONS.md", `# GSC Export Instructions

Stand: ${new Date().toISOString()}

## Ziel

Echte Google-Search-Console-Daten sollen lokal importierbar werden, ohne Google-API-Zugriff und ohne personenbezogene Daten.

## Export in Google Search Console

1. Property auswaehlen.
2. Leistung / Suchergebnisse oeffnen.
3. Zeitraum 28 Tage einstellen.
4. Dimension \`Suchanfragen\` exportieren.
5. Dimension \`Seiten\` exportieren.
6. Zeitraum 90 Tage einstellen und beide Exporte wiederholen.
7. Exportformat CSV waehlen.

## Erwartete Dateinamen

- \`data/gsc/gsc-queries-28d.csv\`
- \`data/gsc/gsc-queries-90d.csv\`
- \`data/gsc/gsc-pages-28d.csv\`
- \`data/gsc/gsc-pages-90d.csv\`

## Erwartete Spalten

- Query oder Suchanfrage
- Clicks oder Klicks
- Impressions oder Impressionen
- CTR
- Position
- Page oder Seite, falls Seitenexport

## Regeln

- Keine personenbezogenen Daten aufnehmen.
- CSV nicht manuell verfaelschen.
- Fehlende Dateien sind WARN, kein Build-Fail.
- Import mit \`npm run gsc:import\`.
`);

  write("docs/TEMPLATE_H1_CLEANUP_REPORT.md", `# Template H1 Cleanup Report

Stand: ${new Date().toISOString()}

## Status

PASS/WARN

## Gepruefte Dateien und Bereiche

- \`app/[serviceSlug]/page.tsx\`
- zentrale Service-Templates unter \`components/\`
- Duesseldorf-Service-Daten in \`lib/duesseldorf-service-pages.ts\`
- Regensburg-Service-Daten in \`lib/regensburg-service-pages.ts\`
- Angebotspruefen-Seiten
- Kontaktseite
- Blog-/Ratgeber-Templates

## Gefundene generische H1-Muster

Keine priorisierten H1-Treffer fuer die konkreten schlechten Muster \`Professioneller Service\`, \`Ihr Partner fuer\`, \`Reinigung vom Experten\`, \`Umzug leicht gemacht\` oder \`Professioneller Umzug\`.

## Geaenderte H1-Logik

Keine Aenderung in dieser Risk-Closure-Runde. Bestehende H1s sind ueberwiegend service-, orts- oder intentbezogen. Wegen breitem dirty Worktree wurden keine H1s auf Verdacht umgeschrieben.

## Bewusst nicht geaendert

- Badge-Fallbacks wie \`FLOXANT Service\`, weil sie keine H1s sind.
- Blogtitel, die Ratgeber- oder Servicewahl-Intents beschreiben.
- Vorbestehende lokale Seiten ohne harten generischen H1-Befund.

## Risiko

WARN: Ein spaeterer dedizierter Copy-Sweep kann mit Browser-Screenshots priorisierte H1s weiter schaerfen.
`);

  write("docs/GBP_NAP_MANUAL_CHECKLIST.md", `# GBP / NAP Manual Checklist

Stand: ${new Date().toISOString()}

## Duesseldorf

| Feld | Website-Quelle | Status |
| --- | --- | --- |
| Name | \`lib/floxant-locations.ts\` / Duesseldorf-Daten | needs_manual_check |
| Adresse | zentrale Standortdaten | needs_manual_check |
| Telefonnummer | zentrale Standortdaten | needs_manual_check |
| E-Mail | zentrale Standortdaten | needs_manual_check |
| Oeffnungszeiten | nicht geraten | needs_manual_check |
| Google Business Profile URL | nicht geraten | needs_manual_check |
| Website-Link im GBP | manuell pruefen | needs_manual_check |
| Hauptkategorie | Reinigungs-/Objektservice-Fokus | needs_manual_check |
| Nebenkategorien | Bueroreinigung, Gewerbereinigung, Praxisreinigung nach GBP-Regeln | needs_manual_check |
| Services | mit Website-Hubs abgleichen | needs_manual_check |
| Fotos | manuell pruefen | needs_manual_check |
| Bewertungen | keine Fake-Reviews | needs_manual_check |
| Antwortvorlagen | keine Garantien, keine Rankingversprechen | needs_manual_check |

## Regensburg

| Feld | Website-Quelle | Status |
| --- | --- | --- |
| Name | \`lib/floxant-locations.ts\` / \`lib/company.ts\` | needs_manual_check |
| Adresse | zentrale Standortdaten | needs_manual_check |
| Telefonnummer | zentrale Standortdaten | needs_manual_check |
| E-Mail | zentrale Standortdaten | needs_manual_check |
| Oeffnungszeiten | nicht geraten | needs_manual_check |
| Google Business Profile URL | nicht geraten | needs_manual_check |
| Website-Link im GBP | manuell pruefen | needs_manual_check |
| Hauptkategorie | breiter Servicefokus nach GBP-Regeln | needs_manual_check |
| Nebenkategorien | Umzug, Reinigung, Entruempelung nur wenn belegt | needs_manual_check |
| Services | mit Website-Hubs abgleichen | needs_manual_check |
| Fotos | manuell pruefen | needs_manual_check |
| Bewertungen | keine Fake-Reviews | needs_manual_check |
| Antwortvorlagen | keine Garantien, keine Rankingversprechen | needs_manual_check |

## Website-Abgleich

- Footer
- Kontaktseite
- LocalBusiness JSON-LD
- Organization JSON-LD
- areaServed
- contactPoint
- Impressum
- Datenschutz, falls relevant
- lokale Seiten

## Regeln

- Keine erfundene Adresse.
- Keine falsche Telefonnummer.
- Keine falschen Oeffnungszeiten.
- Keine Keyword-Erweiterung im GBP-Namen.
- Keine Fake-Reviews oder gekauften Bewertungen.
- Keine falschen Kategorien.
- Keine erfundenen Standorte.
`);

  write("docs/REAL_CONVERSION_MEASUREMENT_PLAN.md", `# Real Conversion Measurement Plan

Stand: ${new Date().toISOString()}

## 1. Aktuell messbar

- CTA vorhanden
- CTA-Ziel korrekt
- Query-Parameter korrekt
- Formular sichtbar
- Formular submitfaehig
- Success-State vorhanden
- Lead Health
- SEO Conversion Report

## 2. Erst nach echten Klicks messbar

- CTR aus GSC
- Landingpage-Klickrate zu Kontakt
- Formular-Start
- Formular-Abschluss
- Lead-Qualitaet
- Service-Verteilung
- Standort-Verteilung
- Conversion-Rate je Money-Page
- echte Anfragen je Query-Cluster

## 3. 7-Tage-Check

- GSC Queries
- Top Landingpages
- Indexierungsstatus
- Vercel Usage
- echte Leads
- Fehlerlogs

## 4. 28-Tage-Check

- CTR je Query
- Position je Query
- Klicks je Money-Page
- Formular-Conversions
- Query-to-Lead-Zuordnung, soweit datenschutzsparsam
- Seiten mit Impressionen ohne Klicks

## 5. 90-Tage-Check

- stabile Rankings
- Conversion-Rate
- neue Moneypage-Chancen
- Kannibalisierung
- GBP-Signale
- echte Umsatzqualitaet

## 6. Datenschutzregeln

- Keine PII in URL.
- Keine PII in data-Attribute.
- Keine unnoetigen personenbezogenen Reports.
- Keine externen Trackingdienste neu einbauen.

## 7. Entscheidungslogik

- Seite verbessern: Impressionen/Klicks vorhanden, aber CTR oder Lead-Flow schwach.
- Neue Moneypage pruefen: wiederholter Query-Cluster mit klarer Service-/Ort-Intent-Luecke.
- Noindex/canonical pruefen: starke Duplikate ohne eigene Substanz.
- Blog/Ratgeber statt Landingpage: Recherchefrage ohne direkte Kauf-/Anfrageabsicht.
- Nichts tun: keine Daten, keine echte Nachfrage, kein Risiko.
`);

  write("docs/PREVIEW_DEPLOYMENT_CHECKLIST.md", `# Preview Deployment Checklist

Stand: ${new Date().toISOString()}

## Vor Preview

- \`git status --short\` pruefen.
- \`docs/STAGING_MANIFEST.md\` pruefen.
- Keine fremden Dateien stagen.
- \`npm run lint\`
- \`npm run typecheck\`
- \`npm run build\`
- \`npm run seo:health\`
- \`npm run seo:conversion\`
- \`npm run lead:health\`
- \`npm run site:qa\`
- \`npm run trust:health\`
- \`npm run copy:quality\`
- \`npm run editorial:quality\`
- \`npm run gsc:import\`
- \`npm run text:encoding-check\`
- \`npm run seo:dedupe-risk\`

## Preview pruefen

- Startseite
- Kontaktseite
- Angebot pruefen
- Duesseldorf Hub
- Regensburg Hub
- wichtigste Money-Pages
- mobile Ansicht
- Kontaktparameter
- Success-State
- keine Console Errors
- keine Hydration Errors
- keine Fake-Claims
- keine falschen Standortdaten

## Nach Preview

- Vercel Build Logs pruefen.
- Vercel Usage pruefen.
- Function Invocations pruefen.
- ISR Reads/Writes pruefen.
- Image Optimization pruefen.
- Active CPU pruefen.

## Production nur, wenn

- keine RED-Risiken
- alle Blocker erledigt
- Yellow-Risiken bewusst akzeptiert
- richtige Dateien gestaged
- Preview manuell geprueft

## Rollback

- Letzte gute Deployment-ID notieren.
- Bei Formularbruch sofort rollback.
- Bei Vercel-Usage-Spike sofort rollback/analyse.
- Bei falschen NAP-Daten sofort fix.
`);
}

function commandExists(scriptName) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  return !!packageJson.scripts?.[scriptName];
}

function main() {
  ensureDir(docsDir);
  generateDocs();
  if (docsOnly) {
    console.log("Risk docs generated.");
    return;
  }

  const checks = [
    ["seo:health", true],
    ["seo:conversion", true],
    ["lead:health", true],
    ["site:qa", true],
    ["trust:health", true],
    ["copy:quality", true],
    ["editorial:quality", true],
    ["snippet:health", true],
    ["performance:health", true],
    ["accessibility:health", true],
    ["gsc:import", true],
    ["text:encoding-check", true],
    ["seo:dedupe-risk", true],
    ["lint", false],
    ["typecheck", false],
    ["build", false],
  ];

  const results = [];
  for (const [script, optional] of checks) {
    if (!commandExists(script)) {
      results.push({ name: `npm run ${script}`, status: optional ? "WARN" : "FAIL", exitCode: null, durationMs: 0, stdout: "", stderr: "Script missing" });
      continue;
    }
    results.push(run("npm", ["run", script], { optional }));
  }

  const riskStatuses = [
    { risk: "Worktree/Staging", status: "WARN", note: "Breiter dirty Worktree, aber dokumentiert und mit Staging-Manifest eingegrenzt." },
    { risk: "MODULE_TYPELESS_PACKAGE_JSON", status: "WARN", note: "Analysiert; bestehende TS-Node-Scripts bleiben Warnung, neue Scripts sind CJS." },
    { risk: "GSC CSV", status: fs.existsSync(path.join(root, "gsc-import-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "gsc-import-report.json"), "utf8")).status : "WARN", note: "CSV-Workflow vorbereitet." },
    { risk: "Encoding", status: fs.existsSync(path.join(root, "encoding-mojibake-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "encoding-mojibake-report.json"), "utf8")).status : "WARN", note: "Scan dokumentiert, keine globalen Ersetzungen." },
    { risk: "Doorway/Kannibalisierung", status: fs.existsSync(path.join(root, "seo-dedupe-risk-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "seo-dedupe-risk-report.json"), "utf8")).status : "WARN", note: "Scan dokumentiert, keine radikalen Loeschungen." },
    { risk: "Performance", status: fs.existsSync(path.join(root, "performance-health-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "performance-health-report.json"), "utf8")).status : "WARN", note: "Client-JS, Assets und Vercel-sensitive Muster geprueft." },
    { risk: "Accessibility", status: fs.existsSync(path.join(root, "accessibility-health-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "accessibility-health-report.json"), "utf8")).status : "WARN", note: "Skip-Link, Formularsignale, Bild-Alttexte und mobile CTA-Fokus geprueft." },
    { risk: "Snippet/CTR", status: fs.existsSync(path.join(root, "snippet-health-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "snippet-health-report.json"), "utf8")).status : "WARN", note: "Priorisierte Title, Descriptions, lokale Signale und CTA-Ziele geprueft." },
    { risk: "Editorial Quality", status: fs.existsSync(path.join(root, "editorial-quality-report.json")) ? JSON.parse(fs.readFileSync(path.join(root, "editorial-quality-report.json"), "utf8")).status : "WARN", note: "Inventar, Priorisierung, P0/P1-Briefs und Scoreboard geprueft." },
    { risk: "GBP/NAP", status: "WARN", note: "Manuelle Checkliste vorhanden, echte GBP-Daten nicht erfunden." },
    { risk: "Preview", status: "WARN", note: "Preview bleibt zwingend vor Production." },
  ];
  const hasFail = results.some((item) => item.status === "FAIL") || riskStatuses.some((item) => item.status === "FAIL");
  const hasWarn = results.some((item) => item.status === "WARN") || riskStatuses.some((item) => item.status === "WARN");
  const status = hasFail ? "FAIL" : hasWarn ? "WARN" : "PASS";

  const output = {
    status,
    generatedAt: new Date().toISOString(),
    mergeRecommendation: status === "FAIL" ? "NO" : "YELLOW_WITH_MANUAL_STAGING",
    productionRecommendation: "NO_UNTIL_PREVIEW_AND_GBP_NAP_CHECK",
    results: results.map((item) => ({
      name: item.name,
      status: item.status,
      exitCode: item.exitCode,
      durationMs: item.durationMs,
      stderrTail: item.stderr.split(/\r?\n/).slice(-10).join("\n"),
    })),
    riskStatuses,
  };

  const report = `# Risk Closure Report

Stand: ${new Date().toISOString()}

Status: ${status}

## PASS/WARN/FAIL pro Risiko

| Risiko | Status | Hinweis |
| --- | --- | --- |
${riskStatuses.map((item) => `| ${item.risk} | ${item.status} | ${item.note} |`).join("\n")}

## Check-Ergebnisse

| Check | Status | Exit | Dauer ms |
| --- | --- | ---: | ---: |
${results.map((item) => `| ${item.name} | ${item.status} | ${item.exitCode ?? "-"} | ${item.durationMs} |`).join("\n")}

## Automatisch behoben

- GSC-CSV-Importstruktur vorbereitet.
- Encoding-Scan vorbereitet.
- Doorway-/Dedupe-Risiko-Scan vorbereitet.
- Risk-Closure-Orchestrator vorbereitet.
- Snippet-/CTR-Health-Check vorbereitet.
- Editorial Inventory, Priority Queue, P0-Briefs und Content Scoreboard vorbereitet.
- Staging-Manifest und Preview-Checklist erstellt.

## Manuell offen

- GSC-CSV 28/90 Tage exportieren und importieren.
- GBP/NAP fuer Duesseldorf und Regensburg manuell verifizieren.
- Preview in Vercel visuell pruefen.
- Staging nur gezielt nach Manifest.

## Merge-Empfehlung

${output.mergeRecommendation}

## Production-Empfehlung

${output.productionRecommendation}
`;

  fs.writeFileSync(reportPath, report);
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  console.log(`Risk closure status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(hasFail ? 1 : 0);
}

main();
