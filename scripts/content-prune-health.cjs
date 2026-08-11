const fs = require("fs");
const path = require("path");

const root = process.cwd();
const mdPath = path.join(root, "CONTENT_PRUNE_HEALTH_REPORT.md");
const jsonPath = path.join(root, "content-prune-health-report.json");

const routes = [
  "/",
  "/kontakt",
  "/leistungen",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/anbieter-vergleichen",
  "/duesseldorf",
  "/regensburg",
  "/duesseldorf/umzug",
  "/duesseldorf/entruempelung",
  "/duesseldorf/haushaltsaufloesung",
  "/regensburg/umzug",
  "/regensburg/reinigung",
  "/regensburg/entruempelung",
  "/regensburg/gewerbereinigung",
  "/regensburg/bueroreinigung",
  "/klaviertransport-regensburg",
  "/signature-services",
  "/solarreinigung",
  "/pv-anlagen-reinigung",
];

const fillerPatterns = [
  ["Ihr zuverlässiger Partner", /Ihr\s+zuverl[aä]ssiger\s+Partner/i],
  ["maßgeschneiderte Lösungen", /ma[ßs]geschneiderte\s+L[oö]sungen/i],
  ["höchste Qualität", /h[oö]chste\s+Qualit[aä]t/i],
  ["Top Service", /Top[-\s]?Service/i],
  ["Rundum-sorglos ohne Konkretisierung", /Rundum[-\s]?sorglos/i],
  ["schnell und günstig", /schnell\s+und\s+g[üu]nstig/i],
  ["Nummer 1", /\b(?:Nr\.?\s*1|Nummer\s+1)\b/i],
  ["100 Prozent Zufriedenheit", /100\s*%?\s+Zufriedenheit/i],
];

const unsafeClaimPatterns = [
  ["Ranking-Garantie", /(?:Google|Maps|AI|KI)[-\s\w]*(?:Ranking|Platzierung)[-\s\w]*garant/i],
  ["Preis-/Ersparnisgarantie", /(?:Preis|Ersparnis)[-\s]?garantie|garantiert\s+g[üu]nstig/i],
  ["Rechtsberatung", /\bRechtsberatung\b|rechtliche\s+Beratung/i],
  ["Unbelegte Zertifizierung", /\bzertifiziert\b/i],
];

const safeBoundary =
  /(keine|kein|nicht|ohne|unbelegt|falls kein beleg|wenn unbelegt|nicht garantiert|keine garantie|keine rechtsberatung|keine rechtliche beratung|ist das eine|wird nicht behauptet)/i;

function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function pageFileForRoute(route) {
  if (route === "/") return path.join(root, "app", "page.tsx");
  return path.join(root, "app", ...route.replace(/^\/+/, "").split("/"), "page.tsx");
}

function htmlPathForRoute(route) {
  if (route === "/") return path.join(root, ".next", "server", "app", "index.html");
  return path.join(root, ".next", "server", "app", ...route.replace(/^\/+/, "").split("/")) + ".html";
}

function visibleText(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function add(rows, severity, route, file, section, problemType, recommendation, reason, implemented = "teilweise") {
  rows.push({ severity, route, file, section, problemType, recommendation, reason, implemented });
}

function count(regex, text) {
  return (text.match(regex) || []).length;
}

function extractLiteral(text, regex) {
  const match = text.match(regex);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function main() {
  const rows = [];
  const h1Map = new Map();
  const descriptionMap = new Map();

  for (const route of routes) {
    const file = pageFileForRoute(route);
    const source = read(file);
    const relative = rel(file);
    const htmlFile = htmlPathForRoute(route);
    const html = read(htmlFile);
    const rendered = html ? visibleText(html) : "";
    const scanText = `${source}\n${rendered}`;

    if (!source) {
      add(rows, "WARN", route, relative, "route", "missing_or_redirect", "manual_review", "Page source fehlt oder ist durch vorherige Worktree-Aenderung geloescht.", "nein");
      continue;
    }

    const h1 = extractLiteral(source, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const description = extractLiteral(source, /description\s*:\s*["`]([^"`]+)["`]/);
    if (h1) {
      const normalized = h1.toLowerCase();
      h1Map.set(normalized, [...(h1Map.get(normalized) || []), route]);
    }
    if (description) {
      const normalized = description.toLowerCase();
      descriptionMap.set(normalized, [...(descriptionMap.get(normalized) || []), route]);
    }

    for (const [label, pattern] of fillerPatterns) {
      const match = pattern.exec(scanText);
      if (match) {
        add(rows, "WARN", route, relative, label, "generic", "delete_or_rewrite", `Floskel-Kandidat gefunden: ${label}.`, "nein");
      }
    }

    for (const [label, pattern] of unsafeClaimPatterns) {
      const match = pattern.exec(scanText);
      if (match) {
        const start = Math.max(0, match.index - 90);
        const context = scanText.slice(start, match.index + 140).toLowerCase();
        if (!safeBoundary.test(context)) {
          add(rows, "FAIL", route, relative, label, "fake_claim_risk", "rewrite", `Potentiell unbelegter Claim ohne Schutzkontext: ${label}.`, "nein");
        }
      }
    }

    const ctaCount = count(/data-event=["']request_cta_click["']|href=["'][^"']*kontakt\?/g, source);
    if (ctaCount > 12) {
      add(rows, "WARN", route, relative, "CTA", "too_many_ctas", "shorten", `${ctaCount} SEO-/Kontakt-CTA-Signale koennen die Seite unruhig machen.`, "teilweise");
    }
    if (ctaCount === 0 && !/impressum|datenschutz|agb/.test(route)) {
      add(rows, "WARN", route, relative, "CTA", "unclear_cta", "add_clear_cta", "Kein klarer Kontakt-CTA im Source erkennbar.", "nein");
    }

    if (!/buildFaqJsonLd|faqItems|FAQ|Faq|CleanFaqSection/.test(source)) {
      add(rows, "WARN", route, relative, "FAQ", "weak_faq", "move_to_faq", "Keine klare FAQ-Struktur im Source erkennbar.", "nein");
    }

    if (/duesseldorf/.test(route) && /city:\s*["']regensburg["']|Region:\s*Regensburg|\/regensburg\/reinigung#preisvorschlag/.test(source)) {
      add(rows, "WARN", route, relative, "Standort", "confusing", "rewrite", "Düsseldorf-Seite enthaelt Regensburg-Parameter oder Regensburg-Kontext.", "teilweise");
    }

    const sectionCount = count(/<section\b/g, source);
    const cardCount = count(/rounded-(?:lg|xl|\[)/g, source);
    if (sectionCount > 14 || cardCount > 70) {
      add(rows, "WARN", route, relative, "Layout", "visual_noise", "shorten", `Viele Sektionen/Cards erkannt (${sectionCount} Sections, ${cardCount} Card-Stile).`, "teilweise");
    }

    if (source.length < 1800 && !/redirect|notFound|permanentRedirect|seo-gone/i.test(source)) {
      add(rows, "WARN", route, relative, "Content", "low_value", "rewrite", "Sehr kurzer Page-Source fuer P0/P1-Kontext.", "nein");
    }
  }

  for (const [h1, h1Routes] of h1Map.entries()) {
    if (h1 && h1Routes.length > 1) {
      for (const route of h1Routes) {
        add(rows, "WARN", route, rel(pageFileForRoute(route)), "H1", "duplicated", "rewrite", `H1 wird mehrfach genutzt: ${h1Routes.join(", ")}`, "nein");
      }
    }
  }

  for (const [description, descriptionRoutes] of descriptionMap.entries()) {
    if (description && descriptionRoutes.length > 1) {
      for (const route of descriptionRoutes) {
        add(rows, "WARN", route, rel(pageFileForRoute(route)), "Meta Description", "duplicated", "rewrite", `Meta Description wird mehrfach genutzt: ${descriptionRoutes.join(", ")}`, "nein");
      }
    }
  }

  const failures = rows.filter((row) => row.severity === "FAIL");
  const warnings = rows.filter((row) => row.severity === "WARN");
  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const output = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      routesChecked: routes.length,
      warnings: warnings.length,
      failures: failures.length,
    },
    rows,
  };

  const md = `# Content Prune Health Report

Generated: ${output.generatedAt}

Status: ${status}

## Summary

- Routes checked: ${routes.length}
- Warnings: ${warnings.length}
- Failures: ${failures.length}

## Findings

| Status | Route | Section | Problemtyp | Empfehlung | Umgesetzt | Begruendung |
| --- | --- | --- | --- | --- | --- | --- |
${rows.length ? rows.map((row) => `| ${row.severity} | ${row.route} | ${row.section} | ${row.problemType} | ${row.recommendation} | ${row.implemented} | ${row.reason.replace(/\|/g, "/")} |`).join("\n") : "| PASS | - | - | - | - | ja | Keine Pruning-Probleme in den priorisierten Routen erkannt. |"}

## Guardrails

- Keine Rechts-, Preis-, Ranking- oder Verfuegbarkeitsgarantien ergaenzen.
- Doppelte oder generische Inhalte zuerst kuerzen, nicht durch neue SEO-Masse ersetzen.
- Geloeschte oder kritische Duesseldorf-Unterseiten nicht blind wiederherstellen.
- Formular- und Kontakttexte muessen konkrete Angaben nennen: Ort, Service, Umfang, Fotos, Termin, Kontaktweg.
`;

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(mdPath, md);
  console.log(`Content prune health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, mdPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
