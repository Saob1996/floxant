const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = process.cwd();
const appRoot = path.join(root, "app");
const outputPath = path.join(root, "artifacts", "service-visibility.csv");
const pageNames = ["page.tsx", "page.ts", "page.jsx", "page.js"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const ignoredSegments = new Set(["blog", "ratgeber", "wissen", "dashboard", "api", "impressum", "datenschutz", "agb"]);
const serviceRoutePattern = /(reinigung|cleaning|umzug|moving|transport|entruempelung|clearance|aufloesung|angebot|quote|uebergabe|handover|beiladung|rueckfahrt)/i;

function walkFiles(directory, predicate, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".next", "out", ".git"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(absolute, predicate, files);
    else if (predicate(absolute)) files.push(absolute);
  }
  return files;
}

function normalizeRoute(route) {
  const pathname = String(route || "").split(/[?#]/, 1)[0];
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`.replace(/^\/$/, "/");
}

function routeToStaticPage(route) {
  const normalized = normalizeRoute(route);
  const segments = normalized === "/" ? [] : normalized.slice(1).split("/");
  const directory = path.join(appRoot, ...segments);
  for (const pageName of pageNames) {
    const candidate = path.join(directory, pageName);
    if (fs.existsSync(candidate)) return candidate;
  }

  if (segments[0] === "en" && segments.length === 3) {
    const dynamicEnglish = path.join(appRoot, "en", "[regionSlug]", "[englishServiceSlug]", "page.tsx");
    if (fs.existsSync(dynamicEnglish)) return dynamicEnglish;
  }
  return null;
}

function staticAppRoutes() {
  return walkFiles(appRoot, (file) => pageNames.includes(path.basename(file))).map((file) => {
    const relative = path.relative(appRoot, path.dirname(file));
    const segments = relative
      .split(path.sep)
      .filter(Boolean)
      .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
    return normalizeRoute(segments.join("/"));
  });
}

function read(file) {
  return file && fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function fold(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "")
    .toLowerCase();
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function addFinding(findings, finding) {
  findings.push({
    issueCode: finding.issueCode,
    severity: finding.severity,
    status: finding.status || "OPEN",
    serviceId: finding.serviceId || "",
    serviceName: finding.serviceName || "",
    route: finding.route || "",
    details: finding.details,
    recommendation: finding.recommendation,
  });
}

async function main() {
  const registryUrl = pathToFileURL(path.join(root, "lib", "services", "service-registry.ts")).href;
  const { serviceRegistry, publicServices } = await import(registryUrl);
  const sourceFiles = walkFiles(root, (file) => sourceExtensions.has(path.extname(file)));
  const sourceCache = new Map(sourceFiles.map((file) => [file, read(file)]));
  const findings = [];

  const routesByService = new Map(
    serviceRegistry.map((service) => [
      service.id,
      [service.canonicalRoute, service.englishAlternativeRoute, ...service.additionalRoutes]
        .filter(Boolean)
        .map(normalizeRoute),
    ]),
  );
  const registeredRoutes = new Set(Array.from(routesByService.values()).flat());
  const legacyRouteMatchers = serviceRegistry.flatMap((service) =>
    service.legacyRoutePatterns.map((source) => {
      try {
        return { service, pattern: new RegExp(source, "i") };
      } catch (error) {
        throw new Error(`Ungültiges legacyRoutePattern für ${service.id}: ${source}`, { cause: error });
      }
    }),
  );

  function legacyRouteOwner(route) {
    return legacyRouteMatchers.find(({ pattern }) => pattern.test(route))?.service ?? null;
  }

  function referenceCount(routes, excludedFile) {
    return sourceFiles.filter((file) => {
      if (file === excludedFile || file.endsWith("service-registry.ts") || file.endsWith("audit-service-visibility.js")) return false;
      const content = sourceCache.get(file) || "";
      return routes.some((route) => route !== "/" && content.includes(route));
    }).length;
  }

  for (const service of publicServices) {
    const serviceRoutes = routesByService.get(service.id) || [];
    const pageFile = routeToStaticPage(service.canonicalRoute);
    if (!pageFile) {
      addFinding(findings, {
        issueCode: "PUBLIC_SERVICE_WITHOUT_PAGE", severity: "HIGH", serviceId: service.id, serviceName: service.germanName,
        route: service.canonicalRoute, details: "Für die kanonische Route wurde keine statische oder belegte dynamische Seite gefunden.",
        recommendation: "Route bestätigen, eine echte Seite zuordnen oder den Service bis zur Klärung auf MANUAL_REVIEW setzen.",
      });
    }

    const visibleOnHub = service.hubRoutes.some((hubRoute) => {
      const hubFile = routeToStaticPage(hubRoute);
      const content = read(hubFile);
      const registryBackedCatalog = content.includes("ServiceCatalog") && content.includes("publicServices");
      return registryBackedCatalog
        || serviceRoutes.some((route) => content.includes(route))
        || fold(content).includes(fold(service.germanName.replace(/^FLOXANT\s+/i, "")));
    });
    if (!visibleOnHub) {
      addFinding(findings, {
        issueCode: "PUBLIC_SERVICE_WITHOUT_HUB", severity: "HIGH", serviceId: service.id, serviceName: service.germanName,
        route: service.canonicalRoute, details: `Keiner der deklarierten Hubs (${service.hubRoutes.join(", ")}) enthält einen direkten Nachweis für diesen Service.`,
        recommendation: "Service auf einem sichtbaren, passenden Hub direkt verlinken.",
      });
    }

    if (referenceCount(serviceRoutes, pageFile) === 0) {
      addFinding(findings, {
        issueCode: "PUBLIC_SERVICE_WITHOUT_INTERNAL_LINKS", severity: "HIGH", serviceId: service.id, serviceName: service.germanName,
        route: service.canonicalRoute, details: "Außerhalb der Registry und der eigenen Seite wurde kein interner Routenverweis gefunden.",
        recommendation: "Von einem relevanten Hub oder einer verwandten Leistungsseite intern verlinken.",
      });
    }

    if (!service.cta?.href) {
      addFinding(findings, {
        issueCode: "PUBLIC_SERVICE_WITHOUT_CTA", severity: "HIGH", serviceId: service.id, serviceName: service.germanName,
        route: service.canonicalRoute, details: "Im Registry-Eintrag fehlt ein Anfrageweg.", recommendation: "Einen realen Kontakt- oder Anfrageweg hinterlegen.",
      });
    }
    if (!service.regions.length) {
      addFinding(findings, {
        issueCode: "PUBLIC_SERVICE_WITHOUT_REGION", severity: "HIGH", serviceId: service.id, serviceName: service.germanName,
        route: service.canonicalRoute, details: "Der öffentliche Service besitzt keine bestätigte Zielregion.", recommendation: "Region belegen oder Service nicht öffentlich führen.",
      });
    }
    if (!service.englishAlternativeRoute || !routeToStaticPage(service.englishAlternativeRoute)) {
      addFinding(findings, {
        issueCode: "PUBLIC_SERVICE_WITHOUT_ENGLISH_MAPPING", severity: "MEDIUM", status: "MANUAL_REVIEW",
        serviceId: service.id, serviceName: service.germanName, route: service.canonicalRoute,
        details: "Keine vorhandene englische Alternativroute ist eindeutig zugeordnet.",
        recommendation: "Vorhandene echte englische Seite zuordnen; keine dünne Übersetzungs- oder Doorway-Seite erzeugen.",
      });
    }

    if (pageFile) {
      const content = fold(read(pageFile));
      const expected = fold(service.germanName.replace(/^FLOXANT\s+/i, ""));
      if (expected && !content.includes(expected) && !content.includes(fold(service.slug))) {
        addFinding(findings, {
          issueCode: "INCONSISTENT_SERVICE_NAME", severity: "LOW", status: "MANUAL_REVIEW",
          serviceId: service.id, serviceName: service.germanName, route: service.canonicalRoute,
          details: "Die kanonische Seitenquelle enthält die Registry-Bezeichnung nicht direkt; bei Wrapper-Seiten kann sie aus einer Konfiguration stammen.",
          recommendation: "Gerendertes H1, Title und sichtbare Servicebezeichnung manuell gegen die Registry prüfen.",
        });
      }
    }
  }

  const inactiveStatuses = new Set(["INTERNAL_ONLY", "NOT_CURRENTLY_OFFERED"]);
  const reviewStatuses = new Set(["MANUAL_REVIEW", "ACTIVE_SUPPORTING"]);
  for (const service of serviceRegistry.filter(({ publicVisible }) => !publicVisible)) {
    const pageFile = routeToStaticPage(service.canonicalRoute);
    const routes = routesByService.get(service.id) || [];
    if (pageFile || referenceCount(routes, null) > 0) {
      if (inactiveStatuses.has(service.status)) {
        addFinding(findings, {
          issueCode: "INACTIVE_SERVICE_ADVERTISED", severity: "HIGH", status: "MANUAL_REVIEW",
          serviceId: service.id, serviceName: service.germanName, route: service.canonicalRoute,
          details: `Status ${service.status}, aber Route oder öffentliche Referenz ist im Repository vorhanden.`,
          recommendation: "Öffentliche Referenz entfernen/umleiten oder reale Verfügbarkeit, Abgrenzung und Route manuell bestätigen.",
        });
      } else if (reviewStatuses.has(service.status)) {
        addFinding(findings, {
          issueCode: "UNREVIEWED_SERVICE_REFERENCE", severity: "MEDIUM", status: "MANUAL_REVIEW",
          serviceId: service.id, serviceName: service.germanName, route: service.canonicalRoute,
          details: `Status ${service.status}; Route oder öffentliche Referenz ist vorhanden, die Leistungsfreigabe aber noch nicht abschließend geprüft.`,
          recommendation: "Reale Verfügbarkeit, Abgrenzung und öffentliche Einordnung manuell bestätigen.",
        });
      }
    }
  }

  const candidateRoutes = staticAppRoutes().filter((route) => {
    const segments = route.slice(1).split("/");
    if (segments.some((segment) => ignoredSegments.has(segment) || segment.startsWith("["))) return false;
    return serviceRoutePattern.test(route) && !["/leistungen", "/signature-services", "/standorte"].includes(route);
  });

  for (const route of candidateRoutes) {
    if (!registeredRoutes.has(route) && !legacyRouteOwner(route)) {
      addFinding(findings, {
        issueCode: "PAGE_WITHOUT_REGISTRY_ENTRY", severity: "MEDIUM", status: "MANUAL_REVIEW", route,
        details: "Die serviceähnliche statische Seite ist keiner kanonischen Leistung oder zusätzlichen Route zugeordnet.",
        recommendation: "Als echte Route einem Kernservice zuordnen oder als Keyword-/Altvariante redaktionell prüfen.",
      });
    }
    const pageFile = routeToStaticPage(route);
    if (referenceCount([route], pageFile) === 0) {
      addFinding(findings, {
        issueCode: "ORPHANED_SERVICE_PAGE", severity: "MEDIUM", status: "MANUAL_REVIEW", route,
        details: "Für diese serviceähnliche Seite wurde außerhalb ihrer eigenen Quelle kein interner Link gefunden.",
        recommendation: "Nur bei realem Nutzwert einem Hub zuordnen; andernfalls Konsolidierung manuell bewerten.",
      });
    }
  }

  if (findings.length === 0) {
    addFinding(findings, {
      issueCode: "NO_FINDINGS", severity: "INFO", status: "PASS", details: "Keine Sichtbarkeitsprobleme erkannt.", recommendation: "Keine Aktion erforderlich.",
    });
  }

  const columns = ["issueCode", "severity", "status", "serviceId", "serviceName", "route", "details", "recommendation"];
  const output = [columns.join(","), ...findings.map((finding) => columns.map((column) => csv(finding[column])).join(","))].join("\n") + "\n";
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf8");

  const summary = findings.reduce((result, finding) => {
    result[finding.issueCode] = (result[finding.issueCode] || 0) + 1;
    return result;
  }, {});
  const violations = findings.filter(
    (finding) => finding.severity === "HIGH" && finding.status === "OPEN",
  );
  console.log(JSON.stringify({ status: violations.length ? "FAIL" : "PASS", services: serviceRegistry.length, publicServices: publicServices.length, findings: findings.length, violations: violations.length, summary, output: path.relative(root, outputPath) }, null, 2));
  if (violations.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
