const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
const registryFile = path.join(root, "lib", "content", "faq-registry.ts");
const outputFile = path.join(root, "artifacts", "faq-quality.csv");

const findings = [];

function addFinding(severity, check, detail, context = {}) {
  findings.push({
    severity,
    check,
    faqId: context.faqId || "",
    route: context.route || "",
    locale: context.locale || "",
    detail,
    recommendation: context.recommendation || "",
  });
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function wordSet(value) {
  const stopWords = new Set([
    "a", "an", "and", "are", "at", "be", "bei", "can", "der", "die", "das", "does", "ein", "eine",
    "einer", "einem", "einen", "for", "für", "fuer", "how", "i", "in", "ist", "mit", "of", "oder",
    "the", "to", "und", "was", "what", "which", "wie", "wird", "werden", "zu",
  ]);
  return new Set(normalizeText(value).split(" ").filter((word) => word.length > 2 && !stopWords.has(word)));
}

function jaccardSimilarity(left, right) {
  const a = wordSet(left);
  const b = wordSet(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection);
}

function normalizeRoute(value) {
  if (!value || !String(value).startsWith("/")) return null;
  const pathname = String(value).split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return pathname;
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

function walkFiles(directory, fileName) {
  if (!fs.existsSync(directory)) return [];
  const matches = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) matches.push(...walkFiles(fullPath, fileName));
    else if (!fileName || entry.name === fileName) matches.push(fullPath);
  }
  return matches;
}

function routeFromPageFile(file) {
  const relative = path.relative(path.join(root, "app"), path.dirname(file)).replace(/\\/g, "/");
  const segments = relative
    .split("/")
    .filter(Boolean)
    .filter((segment) => !/^\(.+\)$/.test(segment));
  if (!segments.length) return "/";
  return `/${segments.join("/")}`;
}

function buildKnownRoutes() {
  const routes = new Set(walkFiles(path.join(root, "app"), "page.tsx").map(routeFromPageFile));
  const routeSources = [
    path.join(root, "lib", "sitemap-routes.ts"),
    path.join(root, "lib", "local-seo", "englishLocalSeoPages.ts"),
    path.join(root, "lib", "local-seo", "hreflangMap.ts"),
  ];
  for (const sourceFile of routeSources) {
    if (!fs.existsSync(sourceFile)) continue;
    const source = fs.readFileSync(sourceFile, "utf8");
    for (const match of source.matchAll(/["'`]((?:\/en)?\/[a-z0-9][a-z0-9\-\/]*?)["'`]/gi)) {
      const route = normalizeRoute(match[1]);
      if (route) routes.add(route);
    }
  }
  return routes;
}

function routeExists(route, knownRoutes) {
  const normalized = normalizeRoute(route);
  if (!normalized) return true;
  if (knownRoutes.has(normalized)) return true;

  for (const candidate of knownRoutes) {
    if (!candidate.includes("[")) continue;
    const pattern = candidate
      .split("/")
      .map((segment) => (segment.startsWith("[") && segment.endsWith("]") ? "[^/]+" : segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
      .join("/");
    if (new RegExp(`^${pattern}$`).test(normalized)) return true;
  }
  return false;
}

function sourcePathExists(reference) {
  if (!reference || /^https?:\/\//i.test(reference)) return true;
  if (reference.startsWith("/")) return true;
  const withoutAnchor = reference.split("#", 1)[0];
  return fs.existsSync(path.join(root, withoutAnchor));
}

function hasUnsupportedPositiveClaim(faq) {
  const sentences = `${faq.shortAnswer} ${faq.detailedAnswer}`.split(/[.!?]+/).filter(Boolean);
  const risky = [
    /\b(marktfuehrer|marktführer|nummer\s*1|nr\.?\s*1|bester anbieter|market leader|best provider)\b/i,
    /\b(always available|sofort verfuegbar|sofort verfügbar|guaranteed availability)\b/i,
    /\b\d+(?:[.,]\d+)?\s*(?:€|eur|euro)\b/i,
    /\b(?:garantiert|guarantees?)\s+(?:einen?|a|an|innerhalb|within|unter|lower|billiger|guenstiger|günstiger)\b/i,
  ];
  const negation = /\b(keine?|keinen|keiner|nicht|ohne|no|not|does not|doesn['’]t|is not|isn['’]t|without)\b/i;
  return sentences.some((sentence) => risky.some((pattern) => pattern.test(sentence)) && !negation.test(sentence));
}

function htmlFileForRoute(route) {
  const relative = route === "/" ? "index.html" : `${route.replace(/^\//, "")}\index.html`;
  const windowsPath = path.join(root, "out", relative);
  if (fs.existsSync(windowsPath)) return windowsPath;
  const flatPath = path.join(root, "out", `${route.replace(/^\//, "")}.html`);
  return fs.existsSync(flatPath) ? flatPath : null;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function main() {
  if (!fs.existsSync(registryFile)) throw new Error(`FAQ registry not found: ${registryFile}`);
  const registryModule = await import(`${pathToFileURL(registryFile).href}?audit=${Date.now()}`);
  const faqRegistry = registryModule.faqRegistry || [];
  const assignments = registryModule.priorityFaqAssignments || [];
  const knownRoutes = buildKnownRoutes();
  const ids = new Map();

  for (const faq of faqRegistry) {
    if (ids.has(faq.id)) {
      addFinding("ERROR", "DUPLICATE_ID", `FAQ-ID ist mehrfach vorhanden: ${faq.id}`, { faqId: faq.id, locale: faq.locale });
    }
    ids.set(faq.id, faq);

    if (!faq.question?.trim() || !faq.shortAnswer?.trim() || !faq.detailedAnswer?.trim()) {
      addFinding("ERROR", "MISSING_CONTENT", "Frage, Kurzantwort oder Detailantwort fehlt.", { faqId: faq.id, locale: faq.locale });
    }
    if (!Array.isArray(faq.serviceIds) || faq.serviceIds.length === 0) {
      addFinding("ERROR", "MISSING_SERVICE", "FAQ besitzt keinen Servicebezug.", { faqId: faq.id, locale: faq.locale });
    }
    if (!Array.isArray(faq.region) || faq.region.length === 0) {
      addFinding("ERROR", "MISSING_REGION", "FAQ besitzt keine Region.", { faqId: faq.id, locale: faq.locale });
    }
    if (normalizeText(faq.shortAnswer).length < 35 || normalizeText(faq.detailedAnswer).length < 100) {
      addFinding("WARNING", "GENERIC_ANSWER", "Antwort ist sehr kurz und sollte auf konkreten Nutzwert geprüft werden.", {
        faqId: faq.id,
        locale: faq.locale,
        recommendation: "Mit konkreten Angaben, Grenzen oder einem nächsten Schritt präzisieren.",
      });
    }
    if (/^(das ist eine gute frage|gute frage|it is a good question|that is a good question)\b/i.test(faq.shortAnswer.trim())) {
      addFinding("ERROR", "INDIRECT_ANSWER", "Antwort beginnt mit einer leeren Einleitung.", { faqId: faq.id, locale: faq.locale });
    }
    if (hasUnsupportedPositiveClaim(faq)) {
      addFinding("ERROR", "UNSUPPORTED_CLAIM", "Mögliche unbelegte Preis-, Ranking-, Termin- oder Verfügbarkeitsaussage.", {
        faqId: faq.id,
        locale: faq.locale,
        recommendation: "Beleg ergänzen oder Aussage als Grenze bzw. Einzelfallprüfung formulieren.",
      });
    }
    for (const reference of faq.evidenceSource || []) {
      if (!sourcePathExists(reference)) {
        addFinding("ERROR", "BROKEN_EVIDENCE_SOURCE", `Belegquelle fehlt: ${reference}`, { faqId: faq.id, locale: faq.locale });
      }
    }
    for (const link of [faq.relatedArticle, faq.relatedService, faq.CTA?.href].filter(Boolean)) {
      if (!routeExists(link, knownRoutes)) {
        addFinding("ERROR", "BROKEN_INTERNAL_LINK", `Interner Link ist nicht als Route belegt: ${link}`, {
          faqId: faq.id,
          locale: faq.locale,
        });
      }
    }
  }

  for (const locale of ["de", "en"]) {
    const localized = faqRegistry.filter((faq) => faq.locale === locale);
    for (let index = 0; index < localized.length; index += 1) {
      for (let otherIndex = index + 1; otherIndex < localized.length; otherIndex += 1) {
        const left = localized[index];
        const right = localized[otherIndex];
        if (normalizeText(left.question) === normalizeText(right.question)) {
          addFinding("ERROR", "DUPLICATE_QUESTION", `${left.id} und ${right.id} verwenden dieselbe Frage.`, { locale });
        } else {
          const similarity = jaccardSimilarity(left.question, right.question);
          if (similarity >= 0.84) {
            addFinding("WARNING", "NEAR_DUPLICATE_QUESTION", `${left.id} und ${right.id} sind zu ${Math.round(similarity * 100)} % ähnlich.`, {
              locale,
              recommendation: "Suchintention und Seitenbezug redaktionell trennen oder zusammenführen.",
            });
          }
        }
        if (normalizeText(left.detailedAnswer) === normalizeText(right.detailedAnswer)) {
          addFinding("ERROR", "DUPLICATE_ANSWER", `${left.id} und ${right.id} verwenden dieselbe Detailantwort.`, { locale });
        }
      }
    }
  }

  for (const faq of faqRegistry.filter((entry) => entry.locale === "de" && entry.publicAllowed)) {
    const alternate = ids.get(faq.alternateLocaleId);
    if (!alternate || alternate.locale !== "en" || alternate.alternateLocaleId !== faq.id) {
      addFinding("ERROR", "MISSING_ENGLISH_ALTERNATIVE", "Englische Alternative fehlt oder verweist nicht zurück.", {
        faqId: faq.id,
        locale: faq.locale,
      });
    }
  }

  const activeAssignments = assignments.filter((assignment) => assignment.status === "ACTIVE");
  const visibleIds = new Set(activeAssignments.flatMap((assignment) => assignment.faqIds));
  for (const faq of faqRegistry.filter((entry) => entry.publicAllowed && !visibleIds.has(entry.id))) {
    addFinding("WARNING", "FAQ_WITHOUT_ACTIVE_OUTPUT", "Öffentliche FAQ ist derzeit nur vorbereitet und keiner aktiven Ausgabe zugeordnet.", {
      faqId: faq.id,
      locale: faq.locale,
      recommendation: "Erst nach passender Seitenintegration aktivieren oder publicAllowed überprüfen.",
    });
  }

  const usage = new Map();
  for (const assignment of assignments) {
    const faqLimit = assignment.pageType === "home" || assignment.pageType.endsWith("hub") ? 10 : 8;
    const uniqueFaqIds = new Set(assignment.faqIds);
    if (uniqueFaqIds.size !== assignment.faqIds.length) {
      addFinding("ERROR", "DUPLICATE_ASSIGNMENT", "Eine FAQ ist innerhalb derselben Seite mehrfach zugeordnet.", { route: assignment.route, locale: assignment.locale });
    }
    if (assignment.faqIds.length > faqLimit) {
      addFinding("ERROR", "TOO_MANY_FAQS", `${assignment.faqIds.length} FAQ überschreiten das Seitenlimit ${faqLimit}.`, {
        route: assignment.route,
        locale: assignment.locale,
      });
    }
    for (const faqId of assignment.faqIds) {
      const faq = ids.get(faqId);
      if (!faq) {
        addFinding("ERROR", "UNKNOWN_FAQ_ASSIGNMENT", `Unbekannte FAQ-ID: ${faqId}`, { route: assignment.route, locale: assignment.locale });
        continue;
      }
      if (faq.locale !== assignment.locale) {
        addFinding("ERROR", "LOCALE_MISMATCH", `${faqId} passt nicht zur Seitensprache ${assignment.locale}.`, {
          faqId,
          route: assignment.route,
          locale: assignment.locale,
        });
      }
      if (assignment.status === "ACTIVE") {
        const routes = usage.get(faqId) || [];
        routes.push(assignment.route);
        usage.set(faqId, routes);
      }
    }
    for (const schemaFaqId of assignment.schemaFaqIds) {
      if (!uniqueFaqIds.has(schemaFaqId)) {
        addFinding("ERROR", "SCHEMA_VISIBLE_MISMATCH", `Schema-FAQ ${schemaFaqId} ist nicht im sichtbaren Set enthalten.`, {
          faqId: schemaFaqId,
          route: assignment.route,
          locale: assignment.locale,
        });
      }
    }

    if (assignment.status === "ACTIVE" && !routeExists(assignment.route, knownRoutes)) {
      addFinding("ERROR", "ACTIVE_ROUTE_MISSING", "Aktive FAQ-Zuordnung verweist auf keine belegte Route.", {
        route: assignment.route,
        locale: assignment.locale,
      });
    }
    if (assignment.status === "PLANNED") {
      addFinding("INFO", "PLANNED_ASSIGNMENT", assignment.note || "FAQ-Zuordnung ist vorbereitet, aber nicht aktiv.", {
        route: assignment.route,
        locale: assignment.locale,
      });
    }

    const renderedFile = assignment.status === "ACTIVE" ? htmlFileForRoute(assignment.route) : null;
    if (renderedFile) {
      const html = fs.readFileSync(renderedFile, "utf8");
      for (const faqId of assignment.faqIds) {
        const faq = ids.get(faqId);
        if (faq && !html.includes(faq.question)) {
          addFinding("WARNING", "FAQ_NOT_IN_RENDERED_HTML", "Zugeordnete Frage fehlt im vorhandenen statischen HTML.", {
            faqId,
            route: assignment.route,
            locale: assignment.locale,
            recommendation: "Static Export nach Integration neu bauen und erneut auditieren.",
          });
        }
      }
      for (const schemaFaqId of assignment.schemaFaqIds) {
        const faq = ids.get(schemaFaqId);
        if (faq && !html.includes(faq.question)) {
          addFinding("ERROR", "SCHEMA_VISIBLE_MISMATCH", "Schema-FAQ ist nicht als sichtbare Frage im statischen HTML belegt.", {
            faqId: schemaFaqId,
            route: assignment.route,
            locale: assignment.locale,
          });
        }
      }
    }
  }

  for (const [faqId, routes] of usage) {
    if (routes.length > 4) {
      addFinding("WARNING", "FAQ_USED_ON_TOO_MANY_PAGES", `FAQ wird auf ${routes.length} aktiven Seiten verwendet: ${routes.join(", ")}`, {
        faqId,
        recommendation: "Seitenspezifische Frage kuratieren oder Nutzung auf die passendsten Seiten begrenzen.",
      });
    }
  }

  if (!fs.existsSync(path.join(root, "out"))) {
    addFinding("INFO", "RENDER_AUDIT_SKIPPED", "Kein out/-Verzeichnis vorhanden; sichtbarer HTML- und Schema-Abgleich wird nach dem Static Export vollständig.");
  }

  const header = ["severity", "check", "faqId", "route", "locale", "detail", "recommendation"];
  const rows = [header, ...findings.map((finding) => header.map((key) => finding[key]))];
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`, "utf8");

  const counts = findings.reduce((summary, finding) => {
    summary[finding.severity] = (summary[finding.severity] || 0) + 1;
    return summary;
  }, {});
  console.log(`FAQ registry: ${faqRegistry.length} entries (${faqRegistry.filter((faq) => faq.locale === "de").length} DE / ${faqRegistry.filter((faq) => faq.locale === "en").length} EN)`);
  console.log(`Priority assignments: ${activeAssignments.length} active / ${assignments.length - activeAssignments.length} planned`);
  console.log(`Audit findings: ${counts.ERROR || 0} errors, ${counts.WARNING || 0} warnings, ${counts.INFO || 0} info`);
  console.log(`CSV: ${path.relative(root, outputFile)}`);

  if (counts.ERROR) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
