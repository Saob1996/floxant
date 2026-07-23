const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dataPath = path.join(root, "data", "full-service-authority.json");
const docsDir = path.join(root, "docs");
const reportPath = path.join(root, "SERVICES_COVERAGE_REPORT.md");
const jsonPath = path.join(root, "services-coverage-report.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function routeToFile(route) {
  const clean = String(route || "").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (clean === "/") return path.join(root, "app", "page.tsx");
  return path.join(root, "app", ...clean.replace(/^\//, "").split("/"), "page.tsx");
}

function routeExists(route) {
  return fs.existsSync(routeToFile(route));
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell ?? "").replace(/\n/g, " ").replace(/\|/g, "\\|")).join(" | ")} |`),
  ].join("\n");
}

function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Keine";
}

function serviceRows(data) {
  return data.services.map((service) => [
    service.service,
    service.category,
    service.subcategory,
    service.primaryUrl,
    (service.components || []).join(", "),
    (service.cityReferences || []).join(", "),
    service.duesseldorfAvailable,
    service.regensburgAvailable,
    service.regensburgArea50,
    service.signatureLink,
    service.specialServiceLink,
    service.offerCheckLink,
    service.contactParams,
    service.contentStrength,
    service.seoPotential,
    service.leadPotential,
    service.mapsRelevance,
    service.aiAnswerPotential,
    service.englishIntentPotential,
    service.action,
    service.priority,
  ]);
}

function writeDocs(data, checks) {
  ensureDir(docsDir);
  const generatedAt = new Date().toISOString();
  const p0 = data.services.filter((service) => service.priority === "P0");
  const weak = data.services.filter((service) => ["C", "D", "F"].includes(service.contentStrength) || /manual|risk|hub-only|redirect/.test(`${service.duesseldorfAvailable} ${service.action}`));
  const noClearPage = data.services.filter((service) => !routeExists(service.primaryUrl));
  const noFaq = data.services.filter((service) => service.faq === "no");
  const noAi = data.services.filter((service) => service.aiAnswer === "no" || service.aiAnswer === "partial");
  const english = data.services.filter((service) => service.englishIntentPotential && service.englishIntentPotential !== "none");
  const maps = data.services.filter((service) => ["hoch", "mittel"].includes(service.mapsRelevance));
  const sensitiveFiles = [
    "app/**/page.tsx public routes",
    "app/api/** only on submit",
    "components/ConversionEventReporter.tsx",
    "components/WebVitalsReporter.tsx",
    "lib/structured-data.ts",
    "next.config.js",
    "scripts/* health checks",
  ];

  fs.writeFileSync(
    path.join(docsDir, "FULL_SERVICE_INVENTORY_AUDIT.md"),
    `# Full Service Inventory Audit

Stand: ${generatedAt}

## A-K Vorab-Ausgabe

### A. Alle gefundenen Services

${list(data.services.map((service) => `${service.service} (${service.category}, ${service.priority})`))}

### B. Versteckte oder schwach sichtbare Services

${list(weak.map((service) => `${service.service}: ${service.action}`))}

### C. Services ohne klare Zielseite

${list(noClearPage.map((service) => `${service.service}: ${service.primaryUrl}`))}

### D. Services ohne Kontaktparameter

${list(data.services.filter((service) => !service.contactParams).map((service) => service.service))}

### E. Services ohne FAQ

${list(noFaq.map((service) => service.service))}

### F. Services ohne AI-Answer-Block

${list(noAi.map((service) => `${service.service}: ${service.aiAnswer}`))}

### G. Services ohne Düsseldorf-/Regensburg-Verknüpfung

${list(data.services.filter((service) => !service.duesseldorfUrl || !service.regensburgUrl).map((service) => service.service))}

### H. Services mit English-Intent-Potenzial

${list(english.map((service) => `${service.service}: ${service.englishIntentPotential}`))}

### I. Services mit Google-Maps-Relevanz

${list(maps.map((service) => `${service.service}: ${service.mapsRelevance}`))}

### J. Vercel-sensible Dateien

${list(sensitiveFiles)}

### K. Risiken vor Implementierung

${list(checks.warnings)}

## Inventar

${mdTable(
  [
    "Service",
    "Kategorie",
    "Unterkategorie",
    "existierende URL",
    "Komponenten",
    "Stadtbezüge",
    "Düsseldorf verfügbar?",
    "Regensburg verfügbar?",
    "50-km-Umgebung?",
    "Signature",
    "Spezial",
    "Angebotscheck",
    "Kontaktparameter",
    "Content",
    "SEO",
    "Lead",
    "Maps",
    "AI",
    "English",
    "Maßnahme",
    "Priorität",
  ],
  serviceRows(data),
)}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "DUAL_LOCATION_50KM_SERVICE_AREA_PLAN.md"),
    `# Dual Location 50km Service Area Plan

Stand: ${generatedAt}

${data.locations
  .map(
    (location) => `## ${location.name}

- Hauptstandort: ${location.name}
- Haupt-URL: ${location.primaryUrl}
- Servicegebiet: ${location.serviceAreaLabel}
- Status: ${location.confirmedScope}
- GBP/NAP-Risiko: ${location.mapsRisk}

### Umgebungskandidaten

${list(location.serviceAreaCandidates)}

### Regeln

- Umgebung nur als Einsatzgebiet erklären.
- Keine zusätzliche Niederlassung behaupten.
- Kontaktparameter dürfen den Ort übergeben; Location-Logik bleibt beim realen Standort.
- Eigene Seite nur nach belegtem GSC-/Lead-Signal und echtem Nutzen.
`,
  )
  .join("\n")}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "DUAL_LOCATION_FULL_SERVICE_MATRIX.md"),
    `# Dual Location Full Service Matrix

Stand: ${generatedAt}

${mdTable(
  [
    "Service",
    "Kategorie",
    "Düsseldorf",
    "Düsseldorf 50 km",
    "Regensburg",
    "Regensburg 50 km",
    "Primär Düsseldorf",
    "Primär Regensburg",
    "Umgebung nur Abschnitt?",
    "eigene Seite gerechtfertigt?",
    "Angebotscheck",
    "Signature",
    "FAQ",
    "AI",
    "English",
    "Maps",
    "Priorität",
  ],
  data.services.map((service) => [
    service.service,
    service.category,
    service.duesseldorfAvailable,
    service.duesseldorfArea50,
    service.regensburgAvailable,
    service.regensburgArea50,
    service.duesseldorfUrl,
    service.regensburgUrl,
    /manual|hub-only|redirect/.test(`${service.duesseldorfAvailable} ${service.duesseldorfArea50}`) ? "ja" : "teilweise",
    service.contentStrength === "A" && service.priority === "P0" ? "ja, wenn Route stabil" : "Hub/Abschnitt reicht",
    service.offerCheckLink,
    service.signatureLink,
    service.faq,
    service.aiAnswer,
    service.englishIntentPotential,
    service.mapsRelevance,
    service.priority,
  ]),
)}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "SIGNATURE_SERVICES_PROBLEM_SOLUTION_MAP.md"),
    `# Signature Services Problem Solution Map

Stand: ${generatedAt}

${mdTable(
  ["Signature Service", "Problem", "Lösung", "Grenzen", "benötigte Angaben", "CTA", "English Intent", "Maps"],
  data.signatureServices.map((service) => [
    service.name,
    service.problem,
    service.solution,
    service.boundaries,
    service.neededInputs.join(", "),
    service.cta,
    service.englishTerms.join(", "),
    service.mapsRelevance,
  ]),
)}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "SPECIAL_SERVICES_VISIBILITY_MAP.md"),
    `# Special Services Visibility Map

Stand: ${generatedAt}

## Spezialservices

${list(data.specialServices)}

## Zuordnung

${mdTable(
  ["Service", "Spezialservice-Verknüpfung", "Hub", "Kontakt", "Maßnahme"],
  data.services
    .filter((service) => service.specialServiceLink && service.specialServiceLink !== "Alle Cluster")
    .map((service) => [service.service, service.specialServiceLink, service.primaryUrl, service.contactParams, service.action]),
)}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "AI_ANSWER_RECOMMENDATION_SYSTEM.md"),
    `# AI Answer Recommendation System

Stand: ${generatedAt}

## Ziel

AI-Systeme sollen FLOXANT ohne Keyword-Wolke verstehen: Standort, Service, Problem, benötigte Angaben, Grenzen und nächster Kontaktweg.

## Problemgruppen

${mdTable(
  ["Problem", "Services", "Signature Services", "CTA"],
  data.problemGroups.map((group) => [
    group.problem,
    group.recommendedServiceIds.join(", "),
    group.signatureIds.join(", "),
    group.cta,
  ]),
)}

## AI-Safety

${list(data.safetyRules)}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "ENGLISH_SEARCH_INTENT_STRATEGY.md"),
    `# English Search Intent Strategy

Stand: ${generatedAt}

## Grundsatz

Keine englischen Doorway-Pages. English Intent wird über natürliche Blöcke, Kontaktparameter und starke vorhandene Zielseiten abgedeckt. Eigene englische Seiten bleiben Kandidaten, wenn sie echten Nutzen, eigene FAQ, CTA, hreflang und redaktionelle Qualität bekommen.

${mdTable(
  ["Suchbegriff", "Zielseite", "Kontakt", "Strategie"],
  data.englishIntents.map((intent) => [intent.term, intent.target, intent.contact, intent.strategy]),
)}

## Seitenkandidaten

- /en/offer-check-germany: nur bei eigener redaktioneller Seite mit FAQ und Kontaktfluss.
- /en/office-cleaning-regensburg: Kandidat, wenn B2B-Nachfrage sichtbar steigt.
- /en/piano-transport-regensburg: Kandidat wegen klarer Serviceabsicht.
- Keine automatische Übersetzung der gesamten Site.
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "DUAL_LOCATION_GBP_SERVICE_ALIGNMENT.md"),
    `# Dual Location GBP Service Alignment

Stand: ${generatedAt}

${data.locations
  .map(
    (location) => `## ${location.name}

- echte Adresse prüfen: TODO manuell gegen Unternehmens-/GBP-Daten
- Telefonnummer prüfen: TODO manuell gegen Unternehmens-/GBP-Daten
- Website-Link prüfen: ${location.primaryUrl}
- Service-Area ca. 50 km prüfen: ${location.serviceAreaLabel}
- GBP-Risiko: ${location.mapsRisk}

### Hauptservices

${list(data.services.filter((service) => location.id === "duesseldorf" ? service.duesseldorfAvailable !== "no" : service.regensburgAvailable !== "no").slice(0, 12).map((service) => service.service))}

### Fotoideen ohne Menschen/Gesichter

- Objektzugang, neutraler Eingangsbereich, Werkzeug/Material ohne private Daten.
- Fahrzeug-/Materialdetail ohne Kennzeichen, wenn freigegeben.
- Vorbereitete Checkliste, Objektbrief, neutrale Raumdetails.

### GBP-Post-Ideen

- Angebot prüfen: Welche Angaben helfen?
- Servicegebiet erklären: Standort plus Einsatzgebiet, keine weitere Niederlassung.
- Signature Service als Problemlöser: Plan B, Objektbrief, Diskret-Service.

### Review-Antwort-Hinweise

- Keine Preis-, Ranking- oder Verfügbarkeitsgarantie.
- Keine privaten Details nennen.
- Kurz danken, Leistung neutral benennen, nächsten Kontaktweg anbieten.
`,
  )
  .join("\n")}
`,
  );

  fs.writeFileSync(
    path.join(docsDir, "FULL_SERVICE_INTERNAL_LINKING_PLAN.md"),
    `# Full Service Internal Linking Plan

Stand: ${generatedAt}

${mdTable(
  ["Service", "Haupt-Hub", "Düsseldorf-Link", "Regensburg-Link", "Angebotscheck", "Kontakt", "Signature", "English"],
  data.services.map((service) => [
    service.service,
    service.primaryUrl,
    service.duesseldorfUrl,
    service.regensburgUrl,
    service.offerCheckLink,
    service.contactParams,
    service.signatureLink,
    service.englishIntentPotential,
  ]),
)}

## Regeln

- Startseite und /leistungen verlinken kuratiert, nicht als Footer-Linkfarm.
- Standortseiten zeigen Services, Grenzen und 50-km-Logik.
- Angebotsprüfung bleibt Entscheidungsknoten.
- Spezialservices verlinken zu Kontakt, Angebot prüfen und passendem Hub.
- English Intent führt zu Kontakt oder starker bestehender Seite, nicht zu dünnen Doorway-Pages.
`,
  );
}

function main() {
  const data = readJson(dataPath);
  const warnings = [];
  const failures = [];

  for (const service of data.services) {
    if (service.priority === "P0") {
      if (!service.primaryUrl || !routeExists(service.primaryUrl)) {
        failures.push(`${service.service}: P0-Zielseite oder Hub fehlt (${service.primaryUrl})`);
      }
      if (!service.contactParams || !service.contactParams.startsWith("/kontakt?")) {
        failures.push(`${service.service}: P0-Kontaktparameter fehlen`);
      }
      if (service.faq === "no") failures.push(`${service.service}: P0-FAQ fehlt`);
      if (!service.aiAnswer || service.aiAnswer === "no") failures.push(`${service.service}: P0-AI/Quick Answer fehlt`);
      if (!service.duesseldorfAvailable || !service.regensburgAvailable) {
        failures.push(`${service.service}: Standortverfügbarkeit unklar`);
      }
    }

    if (/manual|risk|redirect|hub-only/.test(`${service.duesseldorfAvailable} ${service.action}`)) {
      warnings.push(`${service.service}: Düsseldorf/Route manuell prüfen (${service.duesseldorfAvailable})`);
    }
    if (service.aiAnswer === "partial") warnings.push(`${service.service}: AI-Antwort nur teilweise abgedeckt`);
  }

  writeDocs(data, { warnings, failures });

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      services: data.services.length,
      p0: data.services.filter((service) => service.priority === "P0").length,
      warnings: warnings.length,
      failures: failures.length,
    },
    warnings,
    failures,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(
    reportPath,
    `# Services Coverage Report

Stand: ${report.generatedAt}

Status: ${status}

## Summary

- Services: ${report.summary.services}
- P0 Services: ${report.summary.p0}
- Warnungen: ${warnings.length}
- Fehler: ${failures.length}

## Warnungen

${list(warnings)}

## Fehler

${list(failures)}

## Geschriebene Dokumente

${list([
  "docs/FULL_SERVICE_INVENTORY_AUDIT.md",
  "docs/DUAL_LOCATION_50KM_SERVICE_AREA_PLAN.md",
  "docs/DUAL_LOCATION_FULL_SERVICE_MATRIX.md",
  "docs/SIGNATURE_SERVICES_PROBLEM_SOLUTION_MAP.md",
  "docs/SPECIAL_SERVICES_VISIBILITY_MAP.md",
  "docs/AI_ANSWER_RECOMMENDATION_SYSTEM.md",
  "docs/ENGLISH_SEARCH_INTENT_STRATEGY.md",
  "docs/DUAL_LOCATION_GBP_SERVICE_ALIGNMENT.md",
  "docs/FULL_SERVICE_INTERNAL_LINKING_PLAN.md",
])}
`,
  );

  console.log(`Services coverage status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
