#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const moduleCache = new Map();

function absolute(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const filePath = absolute(relativePath);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function resolveProjectModule(specifier, parentFile) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return "";
  const base = specifier.startsWith("@/")
    ? path.join(root, specifier.slice(2))
    : path.resolve(path.dirname(parentFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.json`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.js"),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || "";
}

function loadProjectModule(relativePath) {
  const filePath = absolute(relativePath);
  if (moduleCache.has(filePath)) return moduleCache.get(filePath).exports;

  const loadedModule = { exports: {} };
  moduleCache.set(filePath, loadedModule);
  const compiled = ts.transpileModule(read(relativePath), {
    fileName: filePath,
    compilerOptions: {
      allowJs: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.ES2022,
    },
    reportDiagnostics: true,
  });
  const diagnostics = (compiled.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (diagnostics.length > 0) {
    const details = diagnostics
      .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
      .join("; ");
    throw new Error(`${relativePath} konnte nicht geladen werden: ${details}`);
  }

  const localRequire = (specifier) => {
    const resolved = resolveProjectModule(specifier, filePath);
    return resolved
      ? loadProjectModule(path.relative(root, resolved))
      : require(specifier);
  };
  const execute = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    compiled.outputText,
  );
  execute(localRequire, loadedModule, loadedModule.exports, filePath, path.dirname(filePath));
  return loadedModule.exports;
}

function parseSource(relativePath, scriptKind = ts.ScriptKind.TSX) {
  return ts.createSourceFile(
    relativePath,
    read(relativePath),
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
}

function stringVariable(sourceFile, variableName) {
  let value = "";
  function visit(node) {
    if (
      ts.isVariableDeclaration(node)
      && ts.isIdentifier(node.name)
      && node.name.text === variableName
      && node.initializer
      && ts.isStringLiteralLike(node.initializer)
    ) {
      value = node.initializer.text;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return value;
}

function contactUrls(sourceFile) {
  const urls = new Set();
  function visit(node) {
    if (ts.isStringLiteralLike(node) && node.text.startsWith("/kontakt?")) {
      urls.add(node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return [...urls];
}

function bookingFetchOwners(sourceFile) {
  const owners = [];
  function visit(node) {
    if (
      ts.isCallExpression(node)
      && ts.isIdentifier(node.expression)
      && node.expression.text === "bookingFetch"
    ) {
      let current = node.parent;
      let owner = "";
      while (current && !ts.isSourceFile(current)) {
        if (ts.isFunctionDeclaration(current) && current.name) {
          owner = current.name.text;
          break;
        }
        if (
          (ts.isArrowFunction(current) || ts.isFunctionExpression(current))
          && ts.isVariableDeclaration(current.parent)
          && ts.isIdentifier(current.parent.name)
        ) {
          owner = current.parent.name.text;
          break;
        }
        current = current.parent;
      }
      owners.push(owner || "<unbekannt>");
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return owners;
}

function sameValues(actual, expected) {
  return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
}

function escapeCell(value) {
  return String(value || "").replace(/\n/g, " ").replace(/\|/g, "\\|");
}

const checks = [];

function add(id, label, status, details = "") {
  checks.push({ id, label, status, details });
}

function check(id, label, run) {
  try {
    const details = run();
    add(id, label, "PASS", typeof details === "string" ? details : "");
  } catch (error) {
    add(id, label, "FAIL", error instanceof Error ? error.message : String(error));
  }
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

let policy = {};
let registry = {};
let resolver = {};
check("architecture:load", "Registry, Anfrage-Policy und Resolver sind ausführbar", () => {
  policy = loadProjectModule("lib/booking/request-service-policy.js");
  registry = loadProjectModule("lib/services/service-registry.ts");
  resolver = loadProjectModule("lib/lead-intents/resolve-request-context.ts");
  expect(Array.isArray(policy.REQUEST_SERVICE_POLICY), "REQUEST_SERVICE_POLICY fehlt.");
  expect(Array.isArray(registry.serviceRegistry), "serviceRegistry fehlt.");
  expect(typeof resolver.resolveRequestContext === "function", "resolveRequestContext fehlt.");
});

const allowedLocations = ["duesseldorf", "regensburg"];
const expectedRegions = ["Düsseldorf", "Regensburg"];
const diskretPolicy = policy.REQUEST_SERVICE_POLICY?.find((entry) => entry.id === "diskret-service");
const diskretRegistry = registry.serviceRegistry?.find((entry) => entry.id === "diskret-service");

check("registry:active", "Diskret-Service ist ein öffentlich aktiver Registry-Eintrag", () => {
  expect(diskretRegistry, "diskret-service fehlt in der Service-Registry.");
  expect(
    registry.PUBLIC_SERVICE_STATUSES?.includes(diskretRegistry.status),
    `Status ${diskretRegistry.status} ist nicht öffentlich aktiv.`,
  );
  expect(diskretRegistry.publicVisible === true, "publicVisible muss true sein.");
  expect(diskretRegistry.specialSolution === true, "SPECIAL_SOLUTION muss als specialSolution markiert sein.");
  expect(diskretRegistry.canonicalRoute === "/diskret-service", "Canonical Route ist nicht /diskret-service.");
  return `Status ${diskretRegistry.status}, Route ${diskretRegistry.canonicalRoute}`;
});

check("registry:regions", "Registry und Policy erlauben dieselben belegten Standorte", () => {
  expect(diskretRegistry, "Registry-Eintrag fehlt.");
  expect(diskretPolicy, "Policy-Eintrag fehlt.");
  expect(
    sameValues(diskretRegistry.regions, expectedRegions),
    `Registry-Regionen sind ${diskretRegistry.regions.join(", ")} statt ${expectedRegions.join(", ")}.`,
  );
  expect(
    sameValues(diskretPolicy.locations, allowedLocations),
    `Policy-Standorte sind ${diskretPolicy.locations.join(", ")} statt ${allowedLocations.join(", ")}.`,
  );
  return `${diskretPolicy.locations.join(", ")}`;
});

check("policy:general-profile", "Diskret-Service nutzt ausschließlich das zentrale General-Profil", () => {
  expect(diskretPolicy, "Policy-Eintrag fehlt.");
  expect(diskretPolicy.formProfile === "general", `formProfile ist ${diskretPolicy.formProfile}.`);
  const generalProfile = policy.REQUEST_FORM_PROFILES?.[diskretPolicy.formProfile];
  expect(generalProfile, "General-Profil fehlt.");
  expect(generalProfile.analyticsServiceType === "general", `analyticsServiceType ist ${generalProfile.analyticsServiceType}.`);
  expect(
    generalProfile.confirmationEmailVariant === "general",
    `confirmationEmailVariant ist ${generalProfile.confirmationEmailVariant}.`,
  );
});

for (const location of allowedLocations) {
  check(
    `policy:location:${location}`,
    `Diskret-Service wird in ${location} als gültige General-Anfrage aufgelöst`,
    () => {
      expect(
        policy.isAllowedRequestCombination(location, "diskret-service") === true,
        "Policy lehnt die Kombination ab.",
      );
      const entry = policy.getRequestService(location, "diskret-service");
      expect(entry?.id === "diskret-service", "Policy löst nicht auf diskret-service auf.");
      const context = resolver.resolveRequestContext({
        location,
        service: "diskret-service",
        intent: "diskret-service-anfrage",
        source: "seo",
      });
      expect(context.valid === true && context.neutral === false, "Resolver erzeugt keinen gültigen Kontext.");
      expect(context.serviceKey === "diskret-service", `Resolver liefert ${context.serviceKey || "keinen Service"}.`);
      expect(context.location === location, `Resolver ändert den Standort zu ${context.location || "leer"}.`);
      expect(context.formVariant === "general", `Resolver liefert Profil ${context.formVariant}.`);
    },
  );
}

check("policy:no-broad-location", "Nicht belegte breite Standortwerte werden nicht freigeschaltet", () => {
  for (const location of ["deutschland", "bayern", "muenchen"]) {
    expect(
      policy.isAllowedRequestCombination(location, "diskret-service") === false,
      `${location} wird unerwartet als konkrete Service-Kombination akzeptiert.`,
    );
  }
});

const pageFile = "app/diskret-service/page.tsx";
const panelFile = "components/DiscreetRequestPanel.tsx";
const formFile = "components/ProfessionalRequestForm.tsx";
const contactBridgeFile = "components/ContactQueryPersonalization.tsx";
const pageSource = read(pageFile);
const panelSource = read(panelFile);
const formSource = read(formFile);
const contactBridgeSource = read(contactBridgeFile);
const pageAst = parseSource(pageFile);
const panelAst = parseSource(panelFile);
const formAst = parseSource(formFile);

const diskretContactUrls = [
  ...contactUrls(pageAst).map((href) => ({ file: pageFile, href })),
  ...contactUrls(panelAst).map((href) => ({ file: panelFile, href })),
];

check("cta:present", "Diskret-Einstiege verwenden zentrale /kontakt-URLs", () => {
  expect(pageSource.length > 0, `${pageFile} fehlt.`);
  expect(diskretContactUrls.length > 0, "Keine zentrale Kontakt-CTA gefunden.");
  return `${diskretContactUrls.length} eindeutige Kontakt-URLs geprüft`;
});

for (const [index, candidate] of diskretContactUrls.entries()) {
  check(`cta:contract:${index + 1}`, `${candidate.file}: gültige Kontakt-CTA`, () => {
    const url = new URL(candidate.href, "https://www.floxant.de");
    for (const piiKey of ["name", "email", "phone", "address", "message", "scope"]) {
      expect(!url.searchParams.has(piiKey), `PII-Feld ${piiKey} steht in der URL ${candidate.href}.`);
    }

    const params = Object.fromEntries(url.searchParams);
    const service = url.searchParams.get("service") || "";
    const location = url.searchParams.get("location") || url.searchParams.get("city") || "";
    const mode = url.searchParams.get("mode") || "";
    const context = resolver.resolveRequestContext(params);
    if (service) {
      expect(allowedLocations.includes(location), `Standort ${location || "fehlt"} ist nicht erlaubt: ${candidate.href}`);
      expect(context.valid === true && context.neutral === false, `Resolver lehnt ${candidate.href} ab.`);
      expect(context.location === location, `Resolver ändert ${location} zu ${context.location || "leer"}.`);
      expect(context.serviceKey === service, `Service ${service} wird als ${context.serviceKey || "leer"} aufgelöst.`);
      return `${service}@${location}`;
    }
    expect(mode === "neutral", `CTA ohne Service muss mode=neutral setzen: ${candidate.href}`);
    expect(!location, `Neutrale CTA darf keinen Standort vorgeben: ${candidate.href}`);
    expect(context.neutral === true && context.serviceKey === "", `Neutrale CTA wird nicht neutral aufgelöst.`);
    return "neutral";
  });
}

check("cta:no-pii-tracking", "Diskret-Seite legt keine Kontaktdaten in URL oder Tracking-Dataset", () => {
  const publicSource = `${pageSource}\n${panelSource}`;
  expect(
    !/data-(?:name|email|phone|address|message|scope)\s*=/.test(publicSource),
    "Personenbezogene data-Attribute gefunden.",
  );
  expect(
    !/[?&](?:name|email|phone|address|message|scope)=/i.test(publicSource),
    "Personenbezogene Query-Parameter gefunden.",
  );
});

check("offer-check:separate-policy", "Angebotscheck bleibt ein eigener aktiver Offer-Check-Service", () => {
  const offerPolicy = policy.REQUEST_SERVICE_POLICY?.find((entry) => entry.id === "angebotscheck");
  expect(offerPolicy, "angebotscheck fehlt in der Anfrage-Policy.");
  expect(offerPolicy.id !== diskretPolicy?.id, "Angebotscheck und Diskret-Service sind derselbe Policy-Eintrag.");
  expect(offerPolicy.formProfile === "offer_check", `Angebotscheck nutzt ${offerPolicy.formProfile}.`);
  expect(sameValues(offerPolicy.locations, allowedLocations), "Angebotscheck ist nicht an beiden belegten Standorten aktiv.");
});

check("offer-check:separate-cta", "Angebotsprüfungs-CTA löst den Angebotscheck statt General aus", () => {
  const offerHref = stringVariable(pageAst, "offerHref");
  expect(offerHref, "offerHref fehlt.");
  const url = new URL(offerHref, "https://www.floxant.de");
  const context = resolver.resolveRequestContext(Object.fromEntries(url.searchParams));
  expect(
    url.searchParams.get("service") === "angebotscheck",
    `offerHref verwendet ${url.searchParams.get("service") || "keinen Service"} statt angebotscheck.`,
  );
  expect(context.valid === true && context.serviceKey === "angebotscheck", "offerHref wird nicht als Angebotscheck aufgelöst.");
  expect(context.formVariant === "offer_check", `offerHref öffnet Profil ${context.formVariant}.`);
  return offerHref;
});

check("form:general-fields", "General-Profil und sichtbare Mindestfelder stimmen überein", () => {
  const profile = policy.REQUEST_FORM_PROFILES?.general;
  expect(profile, "REQUEST_FORM_PROFILES.general fehlt.");
  expect(
    sameValues(profile.coreFields, ["cityOrZip", "scope"]),
    `General-Kernfelder sind ${profile.coreFields.join(", ")}.`,
  );
  expect(
    ["desiredDate", "message", "files"].every((field) => profile.optionalFields.includes(field)),
    `General-Optionen sind unvollständig: ${profile.optionalFields.join(", ")}.`,
  );
  expect(
    /\["offer_check",\s*"general"\]\.includes\(group\)/.test(formSource),
    "ProfessionalRequestForm hat keinen gemeinsamen General/Offer-Check-Zweig.",
  );
  expect(/name="cityOrZip"/.test(formSource), "Sichtbares Feld cityOrZip fehlt.");
  expect(/name="scope"/.test(formSource), "Sichtbares Feld scope fehlt.");
});

check("form:central-mount", "Kontaktseite mountet ausschließlich den zentralen ProfessionalRequestForm", () => {
  expect(
    /import\s*\{\s*ProfessionalRequestForm\s*\}/.test(contactBridgeSource),
    "ProfessionalRequestForm wird nicht importiert.",
  );
  expect(/<ProfessionalRequestForm\b/.test(contactBridgeSource), "ProfessionalRequestForm wird nicht gerendert.");
  expect(!/<form\b/.test(contactBridgeSource), "ContactQueryPersonalization enthält ein paralleles Formular.");
});

check("form:canonical-submit", "General-Anfrage nutzt den kanonischen Payload- und Kontaktvertrag", () => {
  expect(/validateRequestContact\s*\(/.test(formSource), "Gemeinsame Kontaktvalidierung fehlt.");
  expect(
    /appendBookingPayloadToFormData\(new FormData\(\), requestFields\)/.test(formSource),
    "Kanonischer FormData-Builder fehlt.",
  );
  expect(/cityOrZip:\s*\["cleaning",\s*"clearance",\s*"offer_check",\s*"general"\]/.test(formSource), "General-Payload enthält cityOrZip nicht.");
  expect(/scope:\s*\["moving",\s*"cleaning",\s*"clearance",\s*"offer_check",\s*"general"\]/.test(formSource), "General-Payload enthält scope nicht.");
});

check("submit:no-load-submit", "Öffentliche Diskret-Komponenten senden nicht beim Laden", () => {
  const publicSource = `${pageSource}\n${panelSource}`;
  expect(!/\b(?:fetch|bookingFetch|sendBeacon)\s*\(/.test(publicSource), "Netzwerk-Submit in öffentlicher Diskret-Komponente gefunden.");
  expect(!/\/api\/(?:bookings|leads|conversion-events)/.test(publicSource), "API-Endpunkt in öffentlicher Diskret-Komponente gefunden.");
  const owners = bookingFetchOwners(formAst);
  expect(owners.length === 1, `${owners.length} bookingFetch-Aufrufe im zentralen Formular gefunden.`);
  expect(owners[0] === "handleSubmit", `bookingFetch läuft in ${owners[0]} statt handleSubmit.`);
  expect(/<form\b[^>]*\bonSubmit=\{handleSubmit\}/.test(formSource), "Formular ist nicht an handleSubmit gebunden.");
});

check("claims:no-false-promise", "Diskret-Komponenten enthalten keine positive Garantie oder Beratungszusage", () => {
  const publicSource = `${pageSource}\n${panelSource}`;
  const forbidden = [
    /\b(?:wir|floxant)\s+garantier\w*/i,
    /\b100\s*%\s*(?:diskret|vertraulich|anonym|verfügbar|verfuegbar)/i,
    /\b(?:absolute|vollständige|vollstaendige)\s+(?:anonymität|anonymitaet|vertraulichkeit|diskretion)\b/i,
    /\b(?:preis|ersparnis|termin|verfügbarkeit|verfuegbarkeit)\s+(?:ist|wird)\s+garantiert\b/i,
    /\b(?:rechts|pflege|medizinische|psychologische)beratung\s+(?:durch|von)\s+floxant\b/i,
  ];
  const violation = forbidden.find((pattern) => pattern.test(publicSource));
  expect(!violation, `Unzulässiges Zusagemuster gefunden: ${violation}`);
});

check("package:script", "npm script diskret-service:health verweist auf diesen Check", () => {
  const packageJson = JSON.parse(read("package.json"));
  expect(
    packageJson.scripts?.["diskret-service:health"] === "node scripts/diskret-service-health.cjs",
    "package.json verweist nicht auf scripts/diskret-service-health.cjs.",
  );
});

const totals = {
  pass: checks.filter((item) => item.status === "PASS").length,
  warn: checks.filter((item) => item.status === "WARN").length,
  fail: checks.filter((item) => item.status === "FAIL").length,
};
const overallStatus = totals.fail > 0 ? "FAIL" : totals.warn > 0 ? "WARN" : "PASS";
const generatedAt = new Date().toISOString();
const rows = checks
  .map((item) => `| ${item.status} | ${item.id} | ${escapeCell(item.label)} | ${escapeCell(item.details)} |`)
  .join("\n");

const markdown = `# Diskret-Service Health Report

Stand: ${generatedAt}

Gesamtstatus: ${overallStatus}

| Status | Check | Ergebnis | Details |
| --- | --- | --- | --- |
${rows}

## Zusammenfassung

- PASS: ${totals.pass}
- WARN: ${totals.warn}
- FAIL: ${totals.fail}

## Prüfumfang

- Aktiver Registry-/Policy-Vertrag für den Diskret-Service an den belegten Standorten
- Auflösbare zentrale Kontakt-CTAs ohne personenbezogene Query- oder Tracking-Daten
- Zentrales ProfessionalRequestForm mit General-Profil und kanonischem Submit-Vertrag
- Kein automatischer Submit beim Laden und keine positive Garantie- oder Beratungszusage
- Eigener Angebotscheck-Service und getrennte Angebotscheck-CTA

Historische Copy-Snapshots, Assets und nicht ausführbare Konzeptdokumente sind bewusst keine Release-Pflichten dieses Checks.
`;

const json = {
  generatedAt,
  status: overallStatus,
  totals,
  scope: {
    registryPolicy: true,
    contactCtas: true,
    centralGeneralForm: true,
    noPiiOrLoadSubmit: true,
    offerCheckSeparated: true,
    legacyCopyAndDocs: false,
  },
  checks,
};

fs.writeFileSync(absolute("DISKRET_SERVICE_HEALTH_REPORT.md"), markdown, "utf8");
fs.writeFileSync(
  absolute("diskret-service-health-report.json"),
  `${JSON.stringify(json, null, 2)}\n`,
  "utf8",
);

console.log(
  `Diskret-Service health: ${overallStatus} (${totals.pass} PASS, ${totals.warn} WARN, ${totals.fail} FAIL)`,
);
for (const failure of checks.filter((item) => item.status === "FAIL")) {
  console.error(`- ${failure.id}: ${failure.details}`);
}

if (totals.fail > 0) process.exitCode = 1;
