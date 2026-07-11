const fs = require("fs");
const path = require("path");

const root = process.cwd();
const mdPath = path.join(root, "LIGHTHOUSE_LOCAL_REPORT.md");
const jsonPath = path.join(root, "lighthouse-local-report.json");

const routes = [
  "/",
  "/kontakt",
  "/angebot-guenstiger-pruefen",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/reinigung",
  "/regensburg/entruempelung",
  "/klaviertransport-regensburg",
];

function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function exists(file) {
  return fs.existsSync(file);
}

function pageFileForRoute(route) {
  if (route === "/") return path.join(root, "app", "page.tsx");
  return path.join(root, "app", ...route.replace(/^\/+/, "").split("/"), "page.tsx");
}

function htmlPathForRoute(route) {
  if (route === "/") return path.join(root, ".next", "server", "app", "index.html");
  return path.join(root, ".next", "server", "app", ...route.replace(/^\/+/, "").split("/")) + ".html";
}

function scoreFromIssues(base, issues, penalty = 2) {
  return Math.max(70, base - issues.length * penalty);
}

function routeStatus(scores, blockers) {
  if (blockers.some((item) => item.severity === "FAIL")) return "FAIL";
  if (Math.min(scores.performance, scores.accessibility, scores.bestPractices, scores.seo) < 95) return "WARN";
  if (blockers.length) return "WARN";
  return "PASS";
}

function count(regex, text) {
  return (text.match(regex) || []).length;
}

function main() {
  const packageJson = JSON.parse(read(path.join(root, "package.json")) || "{}");
  const lighthouseInstalled =
    !!packageJson.dependencies?.lighthouse || !!packageJson.devDependencies?.lighthouse;
  const nextConfig = read(path.join(root, "next.config.js"));
  const results = [];

  for (const route of routes) {
    const sourceFile = pageFileForRoute(route);
    const source = read(sourceFile);
    const htmlFile = htmlPathForRoute(route);
    const html = read(htmlFile);
    const blockers = [];
    const notes = [];

    if (!source) {
      blockers.push({
        severity: route.includes("/duesseldorf/") ? "WARN" : "FAIL",
        label: "Page source missing",
        detail: "Route hat keine Page-Datei oder ist im Worktree geloescht.",
      });
    }

    if (!html) {
      blockers.push({
        severity: "WARN",
        label: "Rendered HTML missing",
        detail: "Kein .next HTML gefunden. Fuer echte Groessenwerte zuerst npm run build ausfuehren.",
      });
    }

    if (/export const runtime\s*=\s*["']nodejs["']/.test(source)) {
      blockers.push({ severity: "FAIL", label: "Public node runtime", detail: "Public page setzt runtime=nodejs." });
    }
    if (/export const dynamic\s*=\s*["']force-dynamic["']/.test(source)) {
      blockers.push({ severity: "FAIL", label: "Force dynamic", detail: "Public page setzt dynamic=force-dynamic." });
    }
    if (/export const revalidate\b|revalidate\s*=/.test(source)) {
      blockers.push({ severity: "FAIL", label: "ISR/revalidate", detail: "Public page nutzt revalidate." });
    }

    const clientHints = count(/"use client"|<SmartBookingWizard|<ConversionEventReporter|<CookieBanner|<QuickBudgetModal|<QuickExpressModal/g, source);
    const imageCount = count(/<Image\b|<img\b/g, source);
    const priorityImages = count(/\bpriority\b|fetchPriority=["']high["']/g, source);
    const ctaCount = count(/data-event=["']seo_cta_click["']|href=["'][^"']*kontakt\?/g, source);
    const sectionCount = count(/<section\b/g, source);
    const htmlKb = html ? Math.round((Buffer.byteLength(html, "utf8") / 1024) * 10) / 10 : null;
    const scriptCount = html ? count(/<script\b/g, html) : null;
    const cssCount = html ? count(/<link[^>]+stylesheet|<style\b/g, html) : null;

    if (clientHints > 2) notes.push("Viele Client-/Interaktionshinweise im Page-Source; pruefen, ob Module wirklich interaktiv sein muessen.");
    if (imageCount > 4) notes.push("Viele Bilder im Source; Groessen, alt, priority und CLS pruefen.");
    if (priorityImages > 1) notes.push("Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen.");
    if (ctaCount > 12) notes.push("Viele CTAs koennen mobile Fuehrung schwaechen.");
    if (sectionCount > 14) notes.push("Viele Sektionen; Pruning oder Zusammenfuehrung pruefen.");
    if (htmlKb && htmlKb > 220) notes.push(`Gerendertes HTML ist gross (${htmlKb} KB).`);
    if (scriptCount && scriptCount > 28) notes.push(`Viele Script-Tags im Render (${scriptCount}).`);
    if (!/images\s*:\s*{[\s\S]*unoptimized\s*:\s*true/.test(nextConfig)) {
      blockers.push({ severity: "FAIL", label: "Image optimization", detail: "next.config.js muss images.unoptimized: true behalten." });
    }

    const performanceIssues = [
      ...notes.filter((note) => /Client|Bilder|HTML|Script|priorisiert/.test(note)),
      ...blockers.filter((item) => item.severity === "WARN").map((item) => item.label),
    ];
    const accessibilityIssues = [];
    if (source && imageCount && /<Image\b(?![\s\S]{0,220}\balt=)|<img\b(?![\s\S]{0,220}\balt=)/.test(source)) {
      accessibilityIssues.push("Bild ohne statisch erkennbares alt-Attribut.");
    }
    if (source && /<button\b(?![\s\S]{0,180}(aria-label|aria-labelledby|>[^<\{]))/.test(source)) {
      accessibilityIssues.push("Button-Name statisch pruefen.");
    }

    const seoIssues = [];
    if (source && !/metadata|generateMetadata/.test(source)) seoIssues.push("Metadata nicht direkt erkennbar.");
    if (source && !/canonical|alternates/.test(source)) seoIssues.push("Canonical/alternates nicht direkt erkennbar.");
    if (source && !/<h1|data-headline/.test(source)) seoIssues.push("H1 nicht direkt erkennbar.");

    const bestPracticeIssues = blockers.filter((item) => item.severity === "FAIL").map((item) => item.label);
    if (!lighthouseInstalled) notes.push("Echter Lighthouse-CLI-Lauf nicht installiert; dieser Report ist ein lokaler Heuristik-/Checklistenlauf.");

    const scores = {
      performance: scoreFromIssues(99, performanceIssues, 2),
      accessibility: scoreFromIssues(99, accessibilityIssues, 3),
      bestPractices: scoreFromIssues(100, bestPracticeIssues, 8),
      seo: scoreFromIssues(99, seoIssues, 2),
    };

    results.push({
      route,
      sourceFile: path.relative(root, sourceFile).replace(/\\/g, "/"),
      htmlKb,
      scriptCount,
      cssCount,
      imageCount,
      ctaCount,
      sectionCount,
      scores,
      notes,
      blockers,
      status: routeStatus(scores, blockers),
    });
  }

  const failures = results.filter((item) => item.status === "FAIL");
  const warnings = results.filter((item) => item.status === "WARN");
  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const output = {
    status,
    mode: lighthouseInstalled ? "lighthouse_dependency_available_but_not_invoked" : "heuristic_without_lighthouse_dependency",
    generatedAt: new Date().toISOString(),
    summary: {
      routes: results.length,
      pass: results.filter((item) => item.status === "PASS").length,
      warn: warnings.length,
      fail: failures.length,
    },
    results,
  };

  const md = `# Lighthouse Local Report

Generated: ${output.generatedAt}

Status: ${status}

Mode: ${output.mode}

Dieser Sprint installiert keine schwere Lighthouse-Dependency. Der Report bewertet lokale Build-/Source-Signale und dokumentiert, wo ein echter Browser-Lighthouse-Lauf vor Production folgen muss.

## Route Scores

| Route | Status | Perf | A11y | Best | SEO | HTML KB | Scripts | Notes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${results.map((item) => `| ${item.route} | ${item.status} | ${item.scores.performance} | ${item.scores.accessibility} | ${item.scores.bestPractices} | ${item.scores.seo} | ${item.htmlKb ?? "-"} | ${item.scriptCount ?? "-"} | ${(item.notes[0] || "-").replace(/\|/g, "/")} |`).join("\n")}

## Blockers

| Route | Severity | Blocker | Detail |
| --- | --- | --- | --- |
${results.flatMap((item) => item.blockers.map((blocker) => `| ${item.route} | ${blocker.severity} | ${blocker.label} | ${blocker.detail.replace(/\|/g, "/")} |`)).join("\n") || "| - | - | - | - |"}

## Manual Browser Check

- Run real Lighthouse in Chrome DevTools or CI on the listed P0 routes before production.
- Target: 100 where realistic, 95+ minimum when framework/runtime scripts block 100.
- Verify mobile viewport for horizontal overflow, visible H1, understandable hero, focus states and form usability.
- Keep Vercel safety unchanged: no public revalidate, no force-dynamic, no node runtime, no automatic tracking POST.
`;

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(mdPath, md);
  console.log(`Lighthouse local status: ${status}`);
  console.log(`Reports written: ${path.relative(root, mdPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
