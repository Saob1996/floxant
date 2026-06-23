const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "COPY_QUALITY_REPORT.md");
const jsonPath = path.join(root, "copy-quality-report.json");

const priorityFiles = [
  "app/page.tsx",
  "app/kontakt/page.tsx",
  "components/ContactPathChooser.tsx",
  "components/LeadTrustBlock.tsx",
  "components/RequestTypeCards.tsx",
  "components/ServiceIntentSelector.tsx",
  "app/leistungen/page.tsx",
  "app/angebot-guenstiger-pruefen/page.tsx",
  "app/angebotscheck/page.tsx",
  "app/anbieter-vergleichen/page.tsx",
  "app/duesseldorf/page.tsx",
  "app/duesseldorf/reinigung/page.tsx",
  "app/duesseldorf/bueroreinigung/page.tsx",
  "app/duesseldorf/gewerbereinigung/page.tsx",
  "app/duesseldorf/praxisreinigung/page.tsx",
  "app/duesseldorf/fensterreinigung/page.tsx",
  "app/duesseldorf/umzug/page.tsx",
  "app/duesseldorf/entruempelung/page.tsx",
  "app/duesseldorf/haushaltsaufloesung/page.tsx",
  "app/regensburg/page.tsx",
  "app/regensburg/reinigung/page.tsx",
  "app/regensburg/umzug/page.tsx",
  "app/regensburg/entruempelung/page.tsx",
  "app/regensburg/gewerbereinigung/page.tsx",
  "app/regensburg/bueroreinigung/page.tsx",
  "app/klaviertransport-regensburg/page.tsx",
  "app/regensburg/wohnungsaufloesung/page.tsx",
  "app/signature-services/page.tsx",
  "app/spezialreinigung/page.tsx",
  "app/solarreinigung/page.tsx",
  "app/pv-anlagen-reinigung/page.tsx",
  "app/duesseldorf/solarreinigung/page.tsx",
  "app/regensburg/solarreinigung/page.tsx",
  "components/ProfessionalHero.tsx",
  "components/CustomerProblemSection.tsx",
  "components/ServiceClarityPanel.tsx",
  "components/ProfessionalTrustPanel.tsx",
  "components/CustomerNextStepPanel.tsx",
  "components/CleanFaqSection.tsx",
  "components/OfferCheckInlineCTA.tsx",
  "components/LocationClarityPanel.tsx",
  "components/SignatureServiceClarityGrid.tsx",
  "components/SeoLeadForm.tsx",
  "components/LocalServiceSeoPage.tsx",
  "components/regensburg/RegensburgServicePage.tsx",
  "components/seo/SearchDominanceExperience.tsx",
  "components/seo/LocalSeoSignalPanel.tsx",
  "components/SpecialtyPageLayout.tsx",
  "lib/professional-copy.ts",
  "lib/german-text.ts",
  "lib/lead-intents.ts",
  "lib/floxant-locations.ts",
  "docs/FLOXANT_COPY_STYLE_GUIDE.md",
  "docs/PROFESSIONAL_KEYWORD_AND_INTENT_MAP.md",
  "docs/CUSTOMER_LANGUAGE_KEYWORD_BANK.md",
];

const forbiddenPatterns = [
  { label: "Ihr zuverlaessiger Partner", pattern: /Ihr\s+zuverl[aä]ssiger\s+Partner/i },
  { label: "massgeschneiderte Loesungen", pattern: /ma[ßs]geschneiderte\s+L[oö]sungen/i },
  { label: "hoechste Qualitaet", pattern: /h[oö]chste\s+Qualit[aä]t/i },
  { label: "Nummer-1 Claim", pattern: /(Nr\.?\s*1|Nummer\s+1)/i },
  { label: "100 Prozent Zufriedenheit", pattern: /100\s*%?\s*Zufriedenheit/i },
  { label: "garantiert guenstig", pattern: /garantiert\s+g[üu]nstig/i },
  { label: "Soforttermin garantiert", pattern: /Soforttermin\s+garantiert/i },
  { label: "rechtssicher geprueft", pattern: /rechtssicher\s+gepr[uü]ft/i },
  { label: "Top-Service garantiert", pattern: /Top[-\s]?Service\s+garantiert/i },
];

const fakeClaimPatterns = [
  { label: "Preisgarantie", pattern: /Preisgarantie|Ersparnisgarantie|garantiert\s+g[üu]nstig/i },
  { label: "Rechtsberatung", pattern: /rechtliche\s+Beratung|Rechtsberatung/i },
  { label: "Fake Zahlen", pattern: /\b\d{3,}\s+(Kunden|Bewertungen|Projekte|Auftr[aä]ge)\b/i },
  { label: "Ranking Garantie", pattern: /Google[-\s]?(Maps)?[-\s]?Ranking.*garant/i },
];

const safeBoundary =
  /(keine|kein|nicht|ohne|Nein\.|erwartet wird|gesucht wird|muss eigenstaendig|muessen eigenstaendig|müssen eigenständig|keine.*Garantie|keine.*Rechtsberatung|keine.*Rechts|kein.*Preisversprechen|keine.*Ersparnis)/i;

const renderedCopyRoutes = [
  "/",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/hausverwaltung-reinigung",
  "/duesseldorf/reinigung-stadtteile-umgebung",
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/reinigung",
  "/regensburg/entruempelung",
  "/regensburg/gewerbereinigung",
  "/regensburg/bueroreinigung",
  "/regensburg/wohnungsaufloesung",
  "/angebot-vergleichen-duesseldorf",
  "/angebot-vergleichen-regensburg",
  "/angebot-guenstiger-pruefen",
  "/kontakt",
  "/seniorenumzug-landshut",
];

const renderedAsciiPatterns = [
  { label: "pruefen/prueft/geprueft", pattern: /\b(?:Pruefen|pruefen|prueft|geprueft|Pruefgrund|pruefbar)\b/ },
  { label: "fuer/Fuer", pattern: /\b(?:fuer|Fuer)\b/ },
  { label: "Flaeche/flaeche", pattern: /\b(?:Flaeche|flaeche|Flaechen|flaechen)\b/ },
  { label: "Duesseldorf", pattern: /\bDuesseldorf\b/ },
  { label: "koennen/Koennen", pattern: /\b(?:koennen|Koennen)\b/ },
  { label: "zurueck/Zurueck", pattern: /\b(?:zurueck|Zurueck)\b/ },
  { label: "Uebergabe", pattern: /\bUebergabe\b/ },
  { label: "Bueros/Buero", pattern: /\b(?:Bueros|Buero)\b/ },
  { label: "Raeume", pattern: /\bRaeume\b/ },
  { label: "Entruempelung", pattern: /\bEntruempelung\b/ },
  { label: "Haushaltsaufloesung/Wohnungsaufloesung", pattern: /\b(?:Haushaltsaufloesung|Wohnungsaufloesung)\b/ },
];

const contactBlockerPatterns = [
  { label: "Gewuenschten", pattern: /\bGewuenschten\b/ },
  { label: "Verfuegbarkeit", pattern: /\bVerfuegbarkeit\b/ },
  { label: "abhaengig", pattern: /\babhaengig\b/ },
  { label: "Entruempelung Regensburg", pattern: /\bEntruempelung\s+Regensburg\b/ },
  { label: "Bueroumzug Regensburg", pattern: /\bBueroumzug\s+Regensburg\b/ },
];

const contactVisibleSourceFiles = [
  "app/kontakt/page.tsx",
  "components/ContactPathChooser.tsx",
  "components/LeadTrustBlock.tsx",
  "components/RequestTypeCards.tsx",
  "components/SeoLeadForm.tsx",
  "components/ServiceIntentSelector.tsx",
  "lib/lead-intents.ts",
  "lib/floxant-locations.ts",
];

const contactVisibleExactSourceFiles = [
  "components/NoFakeClaimsNotice.tsx",
  "lib/bavaria-coverage.ts",
  "lib/service-effort-factors.ts",
];

const renderedDilutionPatterns = [
  { label: "200-km claim", pattern: /\b(?:ca\.\s*)?200\s?-?\s?km\b/i },
  { label: "Bayern-wide claim", pattern: /\b(?:bayernweit|ganz Bayern|Bayern nach Verf(?:ü|ue)gbarkeit|Regensburg\/Bayern|Bayern-Strecken|Bayern-Reichweite)\b/i },
];

function read(file) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return null;
  return fs.readFileSync(absolute, "utf8");
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function addIssue(issues, severity, file, message, line = null) {
  issues.push({ severity, file, line, message });
}

function renderedHtmlPath(route) {
  if (route === "/") return path.join(root, ".next", "server", "app", "index.html");
  const segments = route.replace(/^\/+/, "").split("/");
  return path.join(root, ".next", "server", "app", ...segments) + ".html";
}

function htmlToVisibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractStringLiterals(content) {
  const literals = [];
  const pattern = /(["'`])((?:\\[\s\S]|(?!\1)[\s\S])*?)\1/g;
  let match;

  while ((match = pattern.exec(content))) {
    literals.push({
      value: match[2],
      line: lineNumber(content, match.index || 0),
    });
  }

  return literals;
}

function isMachineCopyLiteral(value) {
  const trimmed = String(value || "").trim();
  const withoutTemplatePlaceholders = trimmed.replace(/\$\{[^}]+\}/g, "");
  if (!trimmed) return true;
  if (/^(?:https?:|mailto:|tel:|sms:|whatsapp:|\/|#)/i.test(trimmed)) return true;
  if (/(?:^|[?&#])(service|intent|source|priority|city|utm_|data-)=/i.test(trimmed)) return true;
  if (/^[a-z0-9_./:?=&%#+,[\]{}|-]+$/.test(withoutTemplatePlaceholders) && !/\s/.test(withoutTemplatePlaceholders)) return true;
  if (/^[a-z0-9_-]+$/.test(trimmed)) return true;
  return false;
}

function scanContactSourceCopyFallback(issues) {
  for (const file of contactVisibleSourceFiles) {
    const content = read(file);
    if (content === null) {
      addIssue(issues, "WARN", file, "Contact source file for /kontakt fallback copy scan is missing.");
      continue;
    }

    for (const literal of extractStringLiterals(content)) {
      if (isMachineCopyLiteral(literal.value)) continue;

      for (const item of [...renderedAsciiPatterns, ...contactBlockerPatterns]) {
        if (item.pattern.test(literal.value)) {
          addIssue(
            issues,
            "FAIL",
            file,
            `/kontakt source copy contains ASCII umlaut residue (${item.label}) in a visible string literal.`,
            literal.line,
          );
        }
      }
    }
  }

  for (const file of contactVisibleExactSourceFiles) {
    const content = read(file);
    if (content === null) {
      addIssue(issues, "WARN", file, "Contact exact-source file for /kontakt fallback copy scan is missing.");
      continue;
    }

    for (const literal of extractStringLiterals(content)) {
      if (isMachineCopyLiteral(literal.value)) continue;

      for (const item of contactBlockerPatterns) {
        if (item.pattern.test(literal.value)) {
          addIssue(
            issues,
            "FAIL",
            file,
            `/kontakt source copy contains confirmed live ASCII umlaut blocker (${item.label}) in a visible string literal.`,
            literal.line,
          );
        }
      }
    }
  }
}

function scanRenderedHtmlCopy(issues) {
  for (const route of renderedCopyRoutes) {
    const htmlPath = renderedHtmlPath(route);
    const relative = path.relative(root, htmlPath).replace(/\\/g, "/");
    if (!fs.existsSync(htmlPath)) {
      if (route === "/kontakt") {
        scanContactSourceCopyFallback(issues);
        continue;
      }
      addIssue(issues, "WARN", relative, `Rendered HTML for ${route} is missing. Run npm run build before copy:quality for live-copy checks.`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, "utf8");
    const visibleText = htmlToVisibleText(html);

    for (const item of renderedAsciiPatterns) {
      if (item.pattern.test(visibleText)) {
        addIssue(issues, "FAIL", relative, `Rendered visible copy contains ASCII umlaut residue (${item.label}) on ${route}.`);
      }
    }

    if (route === "/kontakt") {
      for (const item of contactBlockerPatterns) {
        if (item.pattern.test(visibleText)) {
          addIssue(issues, "FAIL", relative, `Rendered /kontakt copy contains confirmed live ASCII umlaut blocker (${item.label}).`);
        }
      }
    }

    if (["/", "/angebot-guenstiger-pruefen", "/seniorenumzug-landshut"].includes(route)) {
      for (const item of renderedDilutionPatterns) {
        if (item.pattern.test(visibleText)) {
          addIssue(issues, "FAIL", relative, `Rendered visible copy contains service-area dilution (${item.label}) on ${route}.`);
        }
      }
    }

    if (route === "/angebot-vergleichen-regensburg" && !/<form\b/i.test(html)) {
      addIssue(issues, "FAIL", relative, "Regensburg offer comparison page must render an inline form.");
    }

    if (route === "/seniorenumzug-landshut" && /\bSeniorenumzug in(?:\s*[.!?]|$)/.test(visibleText)) {
      addIssue(issues, "FAIL", relative, "Seniorenumzug Landshut H1 is incomplete.");
    }
  }
}

function scanFile(file, content, issues) {
  const documentsForbiddenLanguage = /^docs\/(FLOXANT_COPY_STYLE_GUIDE|CUSTOMER_LANGUAGE_KEYWORD_BANK|PROFESSIONAL_KEYWORD_AND_INTENT_MAP)\.md$/.test(file);

  for (const item of forbiddenPatterns) {
    const match = content.match(item.pattern);
    if (match) {
      addIssue(
        issues,
        documentsForbiddenLanguage ? "INFO" : "FAIL",
        file,
        documentsForbiddenLanguage ? `Forbidden phrase documented for governance: ${item.label}` : `Forbidden phrase: ${item.label}`,
        lineNumber(content, match.index || 0),
      );
    }
  }

  for (const item of fakeClaimPatterns) {
    const match = content.match(item.pattern);
    if (match) {
      const context = content.slice(Math.max(0, (match.index || 0) - 80), (match.index || 0) + 120);
      if (!safeBoundary.test(context)) {
        addIssue(
          issues,
          documentsForbiddenLanguage ? "INFO" : "FAIL",
          file,
          documentsForbiddenLanguage ? `Risk topic documented for governance: ${item.label}` : `Potential fake/risky claim without clear boundary: ${item.label}`,
          lineNumber(content, match.index || 0),
        );
      }
    }
  }

  if (/Mehr erfahren/.test(content) && /(angebot|anbieter|duesseldorf|regensburg|bueroreinigung|reinigung|umzug|entruempelung)/i.test(file)) {
    addIssue(issues, "WARN", file, "Generic CTA 'Mehr erfahren' found on a priority route.");
  }

  if (/app[\\/].+page\.tsx$|app[\\/]page\.tsx$/.test(file)) {
    const hasTemplateHeadline = /GrowthServiceLandingPage|LocalServiceSeoPage|DuesseldorfServicePage|SpecialtyPageLayout/.test(content);
    const hasH1OrDataHeadline = /<h1\b|headline\s*:|title\s*:/.test(content) || hasTemplateHeadline;
    if (!hasH1OrDataHeadline) addIssue(issues, "WARN", file, "No visible H1 or data headline marker found in source.");

    const hasMetadata = /metadata|generateMetadata|generatePageSEO|metaTitle|metaDescription/.test(content);
    if (!hasMetadata) addIssue(issues, "WARN", file, "No metadata marker found in source.");

    if (/duesseldorf/i.test(file) && !/D[uü]sseldorf|Duesseldorf/i.test(content)) {
      addIssue(issues, "WARN", file, "Duesseldorf route without clear city wording in source.");
    }
    if (/regensburg/i.test(file) && !/Regensburg/i.test(content)) {
      addIssue(issues, "WARN", file, "Regensburg route without clear city wording in source.");
    }
  }

  if (/(reinigung|umzug|entruempelung|bueroreinigung|gewerbereinigung|praxisreinigung|fensterreinigung)/i.test(file)) {
    const hasTemplateOfferBridge = /GrowthServiceLandingPage|LocalServiceSeoPage|DuesseldorfServicePage|RegensburgServicePage|SpecialtyPageLayout/.test(content);
    if (!hasTemplateOfferBridge && !/angebot-guenstiger-pruefen|OfferCheckCTA|OfferCheckInlineCTA|Angebot.*pr[uü]fen|Angebot.*pruefen/i.test(content)) {
      addIssue(issues, "WARN", file, "Service page has no visible offer-check bridge in source.");
    }
  }

  content.split(/\r?\n/).forEach((line, index) => {
    if (line.length > 360 && !/data:image|https?:\/\//.test(line)) {
      addIssue(issues, file.endsWith(".md") ? "INFO" : "WARN", file, `Very long source line (${line.length} chars).`, index + 1);
    }
  });
}

function scanVercelSafety(issues) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      const full = path.join(dir, entry.name);
      const relative = path.relative(root, full).replace(/\\/g, "/");
      if (/^app\/(api|admin|dashboard|login)(\/|$)/.test(relative)) continue;
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        files.push(relative);
      }
    }
  }
  walk(path.join(root, "app"));
  walk(path.join(root, "components"));

  const publicPagePattern = /^app\/(?!api\/|admin\/|dashboard\/|login\/).+page\.tsx$|^app\/page\.tsx$/;
  const risky = [
    { label: "public revalidate", pattern: /export\s+const\s+revalidate\s*=/ },
    { label: "public node runtime", pattern: /export\s+const\s+runtime\s*=\s*["']nodejs["']/ },
    { label: "public force-dynamic", pattern: /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/ },
    { label: "automatic vitals endpoint", pattern: /\/api\/vitals/ },
    { label: "automatic conversion endpoint", pattern: /\/api\/conversion-events/ },
    { label: "fetch to app api", pattern: /fetch\(\s*["']\/api\// },
    { label: "sendBeacon", pattern: /sendBeacon\s*\(/ },
  ];

  for (const file of files) {
    const content = read(file);
    if (!content) continue;
    for (const item of risky) {
      const match = content.match(item.pattern);
      if (!match) continue;
      const isPublicPage = publicPagePattern.test(file);
      const isReporter = /ConversionEventReporter|WebVitalsReporter/.test(file);
      if (item.label === "fetch to app api" && !isPublicPage && !isReporter) continue;
      const severity = isPublicPage || isReporter ? "FAIL" : "WARN";
      addIssue(issues, severity, file, `Vercel usage safety marker: ${item.label}`, lineNumber(content, match.index || 0));
    }
  }
}

function main() {
  const issues = [];
  const scanned = [];
  const missing = [];

  for (const file of priorityFiles) {
    const content = read(file);
    if (content === null) {
      missing.push(file);
      continue;
    }
    scanned.push(file);
    scanFile(file, content, issues);
  }

  scanVercelSafety(issues);
  scanRenderedHtmlCopy(issues);

  const failCount = issues.filter((item) => item.severity === "FAIL").length;
  const warnCount = issues.filter((item) => item.severity === "WARN").length;
  const infoCount = issues.filter((item) => item.severity === "INFO").length;
  const status = failCount > 0 ? "FAIL" : warnCount > 0 ? "WARN" : "PASS";

  const output = {
    status,
    generatedAt: new Date().toISOString(),
    scanned,
    missing,
    summary: { failCount, warnCount, infoCount, scannedCount: scanned.length, missingCount: missing.length },
    issues,
  };

  const lines = [
    "# Copy Quality Report",
    "",
    `Stand: ${output.generatedAt}`,
    "",
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Scanned files: ${scanned.length}`,
    `- Missing optional files: ${missing.length}`,
    `- FAIL: ${failCount}`,
    `- WARN: ${warnCount}`,
    `- INFO: ${infoCount}`,
    "",
    "## Issues",
    "",
    issues.length
      ? issues.map((item) => `- ${item.severity}: \`${item.file}${item.line ? `:${item.line}` : ""}\` - ${item.message}`).join("\n")
      : "- Keine",
    "",
    "## Missing Optional Files",
    "",
    missing.length ? missing.map((file) => `- \`${file}\``).join("\n") : "- Keine",
    "",
    "## Guardrails",
    "",
    "- Keine Fake-Claims",
    "- Keine Preis- oder Ersparnisgarantie",
    "- Keine Keyword-Wolken",
    "- Keine Public-ISR-/force-dynamic-/runtime-node-Rueckkehr",
    "- Keine automatischen Public-API-POSTs beim normalen Seitenbesuch",
  ];

  fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));

  console.log(`Copy quality status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failCount > 0 ? 1 : 0);
}

main();
