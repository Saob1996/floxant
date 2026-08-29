#!/usr/bin/env node

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const AUDIT_PATH = path.join(ROOT, "artifacts", "search-authority-audit.json");
const OUTPUT_PATH = path.join(ROOT, "artifacts", "market-growth-baseline.json");
const REPORT_PATH = path.join(ROOT, "docs", "market-growth-baseline.md");
const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const SOURCE_EXTENSIONS = new Set([".js", ".jsx", ".mjs", ".ts", ".tsx"]);

function walk(directory, shouldEnter = () => true) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (shouldEnter(absolute)) stack.push(absolute);
      } else if (entry.isFile()) {
        files.push(absolute);
      }
    }
  }
  return files;
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function bytesLabel(bytes) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GiB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KiB`;
  return `${bytes} B`;
}

function csvCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function outputPathForUrl(urlPath) {
  if (urlPath === "/") return path.join(OUT_DIR, "index.html");
  return path.join(OUT_DIR, `${urlPath.replace(/^\//, "")}.html`);
}

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value) {
  return value
    .toLocaleLowerCase("de-DE")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hashFile(file) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(file));
  return hash.digest("hex");
}

function routeCategory(page) {
  const url = page.url;
  if (url === "/") return "Homepage";
  if (/^\/(blog|ratgeber)(\/|$)/.test(url)) return "Ratgeber";
  if (/angebot|quote-check|angebotscheck|offer-check/i.test(url)) return "Angebot";
  if (/kontakt|buchung|express-anfrage|objektbrief|anfrage/i.test(url)) return "Anfrage/Kontakt";
  if (/impressum|datenschutz|agb|buchungsbedingungen|widerruf/i.test(url)) return "Rechtliches";
  if (page.pageType === "city-hub" || /^\/(duesseldorf|regensburg)$/.test(url)) return "Standort-Hub";
  if (page.pageType?.includes("service") || /reinigung|umzug|entruempelung|räumung|raumung|transport|entsorgung|aufloesung|clearance|moving|cleaning/i.test(`${url} ${page.primaryIntent}`)) return "Leistung";
  return "Sonstige";
}

async function analyzeImageSimilarity(images) {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    return { available: false, threshold: null, pairs: [] };
  }

  const rasterImages = images.filter((file) => path.extname(file).toLowerCase() !== ".svg");
  const hashes = [];
  for (const file of rasterImages) {
    try {
      const data = await sharp(file).rotate().resize(9, 8, { fit: "fill" }).greyscale().raw().toBuffer();
      let bits = "";
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          bits += data[row * 9 + col] > data[row * 9 + col + 1] ? "1" : "0";
        }
      }
      hashes.push({ file, bits });
    } catch {
      // Invalid or unsupported images stay part of the exact-file inventory.
    }
  }

  const pairs = [];
  for (let index = 0; index < hashes.length; index += 1) {
    for (let other = index + 1; other < hashes.length; other += 1) {
      let distance = 0;
      for (let bit = 0; bit < 64; bit += 1) {
        if (hashes[index].bits[bit] !== hashes[other].bits[bit]) distance += 1;
      }
      if (distance <= 6) {
        pairs.push({
          first: relative(hashes[index].file),
          second: relative(hashes[other].file),
          hammingDistance: distance,
        });
      }
    }
  }
  return { available: true, threshold: 6, pairs };
}

async function main() {
  if (!fs.existsSync(AUDIT_PATH)) throw new Error("Search-Authority-Audit fehlt.");
  const audit = JSON.parse(fs.readFileSync(AUDIT_PATH, "utf8"));
  const pages = audit.pages.filter((page) => page.statusInSitemap && page.outputFound);

  const sourceRoots = ["app", "components", "lib", "functions", "scripts"].map((item) => path.join(ROOT, item));
  const sourceFiles = sourceRoots.flatMap((directory) => walk(directory)).filter((file) => SOURCE_EXTENSIONS.has(path.extname(file).toLowerCase()));
  const sourceText = new Map(sourceFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));
  const clientComponents = [...sourceText.entries()]
    .filter(([, content]) => /^\s*["']use client["'];?/m.test(content.slice(0, 500)))
    .map(([file]) => relative(file));
  const formFiles = [...sourceText.entries()]
    .filter(([, content]) => /<form\b/.test(content))
    .map(([file, content]) => ({ file: relative(file), forms: (content.match(/<form\b/g) || []).length }));
  const ctaComponents = sourceFiles
    .filter((file) => file.includes(`${path.sep}components${path.sep}`) && /cta|calltoaction/i.test(path.basename(file)))
    .map(relative);

  const functionFiles = walk(path.join(ROOT, "functions")).map(relative);
  const outFiles = walk(OUT_DIR);
  const outStats = outFiles.map((file) => ({ file, size: fs.statSync(file).size }));
  const outTotalBytes = outStats.reduce((sum, item) => sum + item.size, 0);
  const extensionGroups = new Map();
  for (const item of outStats) {
    const extension = path.extname(item.file).toLowerCase() || "[none]";
    const current = extensionGroups.get(extension) || { count: 0, bytes: 0 };
    current.count += 1;
    current.bytes += item.size;
    extensionGroups.set(extension, current);
  }
  const largestFiles = [...outStats]
    .sort((a, b) => b.size - a.size)
    .slice(0, 30)
    .map((item) => ({ path: relative(item.file), bytes: item.size }));
  const jsBundles = outStats
    .filter((item) => path.extname(item.file).toLowerCase() === ".js")
    .sort((a, b) => b.size - a.size)
    .slice(0, 20)
    .map((item) => ({ path: relative(item.file), bytes: item.size }));

  const images = outFiles.filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));
  const exactHashGroups = new Map();
  for (const image of images) {
    const hash = hashFile(image);
    const group = exactHashGroups.get(hash) || [];
    group.push(relative(image));
    exactHashGroups.set(hash, group);
  }
  const exactDuplicateGroups = [...exactHashGroups.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([sha256, files]) => ({ sha256, files }));
  const nearDuplicates = await analyzeImageSimilarity(images);

  const repeatedBlocks = new Map();
  for (const page of pages) {
    const htmlPath = outputPathForUrl(page.url);
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, "utf8");
    const matches = html.matchAll(/<(p|li|h2|h3)\b[^>]*>([\s\S]*?)<\/\1>/gi);
    const seenOnPage = new Set();
    for (const match of matches) {
      const text = stripHtml(match[2]);
      const normalized = normalizeText(text);
      if (normalized.length < 90 || normalized.length > 500 || seenOnPage.has(normalized)) continue;
      seenOnPage.add(normalized);
      const current = repeatedBlocks.get(normalized) || { text, urls: [] };
      current.urls.push(page.url);
      repeatedBlocks.set(normalized, current);
    }
  }
  const frequentTextBlocks = [...repeatedBlocks.values()]
    .filter((item) => item.urls.length > 1)
    .sort((a, b) => b.urls.length - a.urls.length || b.text.length - a.text.length)
    .slice(0, 30);

  const localeCounts = pages.reduce((counts, page) => {
    const locale = page.language.startsWith("en") ? "en" : "de";
    counts[locale] = (counts[locale] || 0) + 1;
    return counts;
  }, {});
  const categoryCounts = pages.reduce((counts, page) => {
    const category = routeCategory(page);
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
  const pageTypeCounts = pages.reduce((counts, page) => {
    counts[page.pageType] = (counts[page.pageType] || 0) + 1;
    return counts;
  }, {});
  const pagesWithoutClearConversion = pages
    .filter((page) => page.visibleCtas.filter((cta) => !/direkt zum inhalt/i.test(cta)).length === 0)
    .map((page) => page.url);
  const pagesWithoutDifferentiation = pages
    .filter((page) => page.classification === "CONSOLIDATION_CANDIDATE")
    .map((page) => page.url);

  const result = {
    generatedAt: new Date().toISOString(),
    methodology: {
      indexableSource: "artifacts/search-authority-audit.json",
      categoryCounts: "URL- und Audit-basierte Heuristik; keine GSC- oder CRM-Klassifikation.",
      conversionGap: "Keine sichtbare CTA außer Skip-Link im statischen HTML-Audit.",
      differentiationGap: "Search-Authority-Klassifikation CONSOLIDATION_CANDIDATE.",
      nearDuplicateImages: "64-Bit-dHash nach 9x8-Graustufen-Resize; Hamming-Distanz <= 6.",
    },
    pages: {
      indexable: pages.length,
      german: localeCounts.de || 0,
      english: localeCounts.en || 0,
      categories: categoryCounts,
      pageTypes: pageTypeCounts,
      sameIntentGroups: audit.cannibalizations.length,
      withoutClearConversion: pagesWithoutClearConversion,
      withoutDifferentiation: pagesWithoutDifferentiation,
    },
    conversion: {
      formFiles,
      formCount: formFiles.reduce((sum, item) => sum + item.forms, 0),
      reusableCtaComponentFiles: ctaComponents,
      reusableCtaComponentCount: ctaComponents.length,
      clientComponentFiles: clientComponents,
      clientComponentCount: clientComponents.length,
    },
    cloudflareFunctions: { count: functionFiles.length, files: functionFiles },
    output: {
      totalBytes: outTotalBytes,
      totalLabel: bytesLabel(outTotalBytes),
      fileCount: outFiles.length,
      extensionGroups: Object.fromEntries(extensionGroups),
      largestFiles,
      largestJavaScriptBundles: jsBundles,
    },
    images: {
      count: images.length,
      exactDuplicateGroupCount: exactDuplicateGroups.length,
      exactDuplicateGroups,
      nearDuplicatePairCount: nearDuplicates.pairs.length,
      nearDuplicateAnalysis: nearDuplicates,
    },
    repeatedContent: {
      frequentTextBlocks,
      similarStructureGroups: Object.entries(pageTypeCounts)
        .filter(([, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])
        .map(([pageType, count]) => ({ pageType, count })),
      sameIntentGroups: audit.cannibalizations,
    },
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(result, null, 2)}\n`, "utf8");

  const topPageTypes = Object.entries(pageTypeCounts).sort((a, b) => b[1] - a[1]);
  const topRepeated = frequentTextBlocks.slice(0, 10);
  const report = `# Market-Growth-Baseline\n\nStand: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}\n\n## Methodik und Grenzen\n\nDie Messung nutzt den letzten erfolgreichen statischen Export sowie den Search-Authority-Audit. Kategorien wie „Leistungsseite“ werden anhand von URL, Seitentyp und Hauptintention heuristisch bestimmt; sie sind keine CRM- oder Search-Console-Klassifikation. Nahe Bildduplikate sind technische dHash-Kandidaten und keine automatische Löschfreigabe.\n\n## Technische Ausgangslage\n\n- Indexierbare Seiten: **${pages.length}**\n- Deutscher Bereich: **${localeCounts.de || 0}** Seiten\n- Englischer Bereich: **${localeCounts.en || 0}** Seiten\n- Cloudflare Pages Functions: **${functionFiles.length}** Dateien\n- Client-Komponenten: **${clientComponents.length}** Dateien mit \`use client\`\n- Export: **${bytesLabel(outTotalBytes)}** in **${outFiles.length.toLocaleString("de-DE")}** Dateien\n- Größte Exportdatei: **${bytesLabel(largestFiles[0]?.bytes || 0)}** (\`${largestFiles[0]?.path || "–"}\`)\n- JavaScript-Bundles: **${jsBundles.length ? `${bytesLabel(jsBundles[0].bytes)} größtes Bundle` : "keine gefunden"}**\n- Static Export und \`images.unoptimized\` sind aktiv; ISR, Middleware und Next.js Serverless Functions waren im bestätigten Build 0.\n\n## SEO-Ausgangslage\n\n| Seitentyp | Anzahl |\n|---|---:|\n${topPageTypes.map(([type, count]) => `| ${csvCell(type)} | ${count} |`).join("\n")}\n\n- Gefundene Gruppen gleicher Hauptintention beziehungsweise Kannibalisierung: **${audit.cannibalizations.length}**\n- Search-Authority-Kandidaten ohne ausreichende Differenzierung: **${pagesWithoutDifferentiation.length}**\n- Alle **${pages.length}** Sitemap-Seiten waren im letzten Audit als statische Ausgabedatei vorhanden.\n\n## Conversion-Ausgangslage\n\n- Formulare im Quellcode: **${result.conversion.formCount}** in **${formFiles.length}** Dateien\n- Wiederverwendete CTA-Komponentendateien: **${ctaComponents.length}**\n- Seiten ohne sichtbare CTA nach enger Audit-Heuristik: **${pagesWithoutClearConversion.length}**\n- Bestehende Einstiege: Kontakt-Wizard, Angebotscheck, Objektbrief, WhatsApp, Telefon, E-Mail und mehrere spezialisierte Formulare.\n- Schwäche: mehrere parallele Anfrage- und Angebotslogiken verwenden unterschiedliche Begriffe, Scores und Datenschemata.\n\n## Deutsche Seitenstruktur\n\n| Kategorie | Anzahl |\n|---|---:|\n${Object.entries(categoryCounts).map(([category, count]) => `| ${csvCell(category)} | ${count} |`).join("\n")}\n\nDüsseldorf ist in der geprüften Search-Authority-Struktur auf Reinigung ausgerichtet. Regensburg bündelt Umzug, Räumung, Entrümpelung, Reinigung und Übergabe. Eine große Zahl älterer lokaler Seiten bleibt als Konsolidierungskandidat bestehen und wird in dieser Phase nicht automatisch gelöscht.\n\n## Englische Seitenstruktur\n\nDer Export enthält **${localeCounts.en || 0}** indexierbare englische Seiten. Navigation, Cookie-Hinweise, Canonicals, Sprache und die primären Düsseldorfer beziehungsweise Regensburger Serviceseiten wurden in der Vorphase lokalisiert. Interaktive englische Werkzeuge fehlen noch.\n\n## Anfrageprozess\n\nDer Hauptprozess läuft über vorhandene Kontakt-/Buchungsformulare und \`/api/bookings\` zu den bestehenden Cloudflare Pages Functions. Normale Seitenaufrufe benötigen keine Function. Die Baseline zeigt jedoch viele spezialisierte Formulare; Phase 2 soll neue Vorbereitungswerkzeuge deshalb an die bestehende Übertragung anbinden und keine konkurrierende Backend-Logik einführen.\n\n## Angebotsprüfungsprozess\n\n\`/angebotscheck\` besitzt bereits Scanner und bestehendes Angebotsformular. Der Scanner arbeitet derzeit mit vielen einzelnen Red-Flag-Fragen und einem groben Score. \`/reinigungsfirma-angebot\` und die Vergleichsseiten liefern redaktionelle Checklisten. Es fehlt eine zentrale zweisprachige Methodik, die dieselben Begriffe und Ergebnisstufen verwendet.\n\n## Aktuelle Differenzierungsmerkmale\n\n- Trennung von Düsseldorfer Reinigung und Regensburger Umzug/Räumung.\n- Angebotsprüfung ohne Preis- oder Rechtsgarantie.\n- Foto-, Zugangs-, Umfangs- und Terminangaben als wiederkehrende Qualitätsmerkmale.\n- Objektbrief und Kontakt-Wizard als vorhandene Anfragehilfen.\n- Vollständig statischer öffentlicher Seitenaufruf.\n\n## Häufig wiederholte Textabschnitte\n\n| Vorkommen | Textauszug | Beispiel-URLs |\n|---:|---|---|\n${topRepeated.map((item) => `| ${item.urls.length} | ${csvCell(item.text.slice(0, 180))} | ${csvCell(item.urls.slice(0, 4).join(", "))} |`).join("\n") || "| 0 | Keine exakten Wiederholungen nach Heuristik | – |"}\n\n## Bilder und Assets\n\n- Bilder im Export: **${images.length}**\n- Exakte Bildduplikat-Gruppen: **${exactDuplicateGroups.length}**\n- Nahe Bildduplikat-Paare (Prüfkandidaten): **${nearDuplicates.pairs.length}**\n- HTML: **${bytesLabel(extensionGroups.get(".html")?.bytes || 0)}**\n- Next-RSC-Textdateien: **${bytesLabel(extensionGroups.get(".txt")?.bytes || 0)}**\n- JavaScript: **${bytesLabel(extensionGroups.get(".js")?.bytes || 0)}**\n\nDer ungewöhnlich große Export wird fast vollständig durch HTML und statische Next-RSC-Textdateien verursacht, nicht durch Bilder oder JavaScript. Diese Dateien sind Teil der App-Router-Navigation und dürfen nicht pauschal gelöscht werden.\n\n## Aktuelle Schwächen\n\n- **${pagesWithoutDifferentiation.length}** Seiten sind laut Audit Konsolidierungskandidaten.\n- Mehrere vorhandene Angebots- und Anfragewerkzeuge nutzen unterschiedliche Begriffe und Ergebnislogiken.\n- Englische Nutzer haben noch keine gleichwertigen interaktiven Werkzeuge.\n- **${clientComponents.length}** Client-Komponenten erhöhen Hydration und Wartungsaufwand; neue Tools müssen deshalb route-lokal bleiben.\n- Der Export enthält **${extensionGroups.get(".txt")?.count || 0}** RSC-Textdateien und **${extensionGroups.get(".html")?.count || 0}** HTML-Dateien.\n\n## Technische Risiken\n\n- Pauschales Entfernen von RSC-Dateien würde Client-Navigation oder Prefetching beschädigen.\n- Änderungen an den zahlreichen bestehenden Formularen könnten Rückwärtskompatibilität mit \`bookings\` und Dashboard gefährden.\n- Globale Client-Abhängigkeiten würden alle öffentlichen Seiten belasten.\n- Automatische Konsolidierung oder Redirects könnten Rankings und Backlinks verlieren.\n\n## Marktchancen\n\n- Eine zentrale, transparente Klarheitsmethodik statt mehr austauschbarer Landingpages.\n- Drei clientseitige Werkzeuge für Auswahl, Anfragevorbereitung und Angebotsklärung.\n- Vollständige englische Tool-Strecke für reale Servicegebiete in Deutschland.\n- Kontextabhängige CTA statt identischer Abschlussblöcke.\n- Öffentliche Claims nur aus einer verifizierbaren Registry.\n- Messbare Experimente mit zeitlich getrennten Änderungen.\n`;
  fs.writeFileSync(REPORT_PATH, report, "utf8");

  console.log(JSON.stringify({
    indexablePages: pages.length,
    germanPages: localeCounts.de || 0,
    englishPages: localeCounts.en || 0,
    categories: categoryCounts,
    forms: result.conversion.formCount,
    ctaComponents: ctaComponents.length,
    cloudflareFunctions: functionFiles.length,
    outputBytes: outTotalBytes,
    outputFiles: outFiles.length,
    images: images.length,
    exactImageDuplicateGroups: exactDuplicateGroups.length,
    nearImageDuplicatePairs: nearDuplicates.pairs.length,
    clientComponents: clientComponents.length,
    repeatedTextBlocks: frequentTextBlocks.length,
    pagesWithoutClearConversion: pagesWithoutClearConversion.length,
    pagesWithoutDifferentiation: pagesWithoutDifferentiation.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
