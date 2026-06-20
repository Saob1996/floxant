const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

const files = {
  keywordStrategy: path.join(root, "lib", "local-seo", "keywordStrategy.ts"),
  hreflang: path.join(root, "lib", "local-seo", "hreflangMap.ts"),
  englishPages: path.join(root, "lib", "local-seo", "englishLocalSeoPages.ts"),
  localMetadata: path.join(root, "lib", "local-seo", "seoMetadata.ts"),
  globalSeo: path.join(root, "lib", "seo.ts"),
  duesseldorfMetadata: path.join(root, "lib", "duesseldorf-cleaning.ts"),
};

const issues = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function fail(message) {
  issues.push(message);
}

function extractStrings(source, regex) {
  const values = [];
  let match;
  while ((match = regex.exec(source))) values.push(match[1]);
  return values;
}

function ensureNoMetadataKeywords() {
  const metadataFiles = [
    files.localMetadata,
    files.globalSeo,
    files.duesseldorfMetadata,
    files.englishPages,
  ];

  for (const file of metadataFiles) {
    const source = read(file);
    if (/keywords:\s*(\[[\s\S]*?\]|[a-zA-Z0-9_.$[\]]+)/.test(source)) {
      fail(`Metadata keyword output still present in ${path.relative(root, file)}`);
    }
    if (/meta\s+name=["']keywords["']/i.test(source)) {
      fail(`Explicit meta keywords tag found in ${path.relative(root, file)}`);
    }
  }
}

function ensureKeywordStrategies() {
  const source = read(files.keywordStrategy);
  const paths = extractStrings(source, /path:\s*"([^"]+)"/g);
  const primaryKeywords = extractStrings(source, /primaryKeyword:\s*"([^"]+)"/g);
  const duplicatePaths = findDuplicates(paths);
  const missingPrimary = paths.length - primaryKeywords.length;

  for (const duplicate of duplicatePaths) {
    fail(`Duplicate keyword strategy path: ${duplicate}`);
  }

  if (missingPrimary !== 0) {
    fail(`Keyword strategy path/primary count mismatch: ${paths.length} paths vs ${primaryKeywords.length} primary keywords`);
  }

  const requiredPaths = [
    "/duesseldorf/reinigungsfirma",
    "/duesseldorf/gewerbereinigung",
    "/duesseldorf/praxisreinigung",
    "/duesseldorf/bueroreinigung",
    "/duesseldorf/grundreinigung",
    "/duesseldorf/putzfirma",
    "/duesseldorf/wohnungsreinigung",
    "/duesseldorf/treppenhausreinigung",
    "/duesseldorf/gebaeudereinigung",
    "/duesseldorf/gewerbeflaechen-reinigung",
    "/duesseldorf/angebot-vergleichen",
    "/angebot-vergleichen-duesseldorf",
    "/regensburg/bueroreinigung",
    "/regensburg/wohnungsaufloesung",
    "/regensburg/umzugsunternehmen",
    "/regensburg/reinigungsfirma",
    "/regensburg/angebot-vergleichen",
    "/en/duesseldorf/cleaning",
    "/en/duesseldorf/odor-removal",
    "/en/duesseldorf/cleaning-quote-review",
    "/en/koeln/cleaning",
    "/en/neuss/cleaning",
    "/en/meerbusch/cleaning",
    "/en/duisburg/cleaning",
    "/en/regensburg/moving",
    "/en/regensburg/apartment-clearance",
    "/en/regensburg/moving-quote-review",
  ];

  for (const route of requiredPaths) {
    if (!paths.includes(route)) fail(`Missing priority keyword strategy: ${route}`);
  }
}

function ensureEnglishPagesAndHreflang() {
  const englishSource = read(files.englishPages);
  const hreflangSource = read(files.hreflang);
  const englishPaths = new Set(extractStrings(englishSource, /path:\s*"([^"]+)"/g));
  const dePairs = extractStrings(hreflangSource, /de:\s*"([^"]+)"/g);
  const enPairs = extractStrings(hreflangSource, /en:\s*"([^"]+)"/g);

  if (!englishPaths.has("/en/duesseldorf/cleaning")) fail("Missing English Düsseldorf cleaning page");
  if (!englishPaths.has("/en/regensburg/moving")) fail("Missing English Regensburg moving page");
  if (!englishPaths.has("/en/duesseldorf/odor-removal")) fail("Missing English Dusseldorf odor-removal page");
  if (!englishPaths.has("/en/regensburg/apartment-clearance")) fail("Missing English Regensburg apartment-clearance page");

  for (const englishPath of enPairs) {
    if (!englishPaths.has(englishPath)) fail(`Hreflang EN target has no English page config: ${englishPath}`);
  }

  if (dePairs.length !== enPairs.length) {
    fail(`Hreflang pair count mismatch: ${dePairs.length} DE vs ${enPairs.length} EN`);
  }

  const duplicateEnTargets = findDuplicates(enPairs);
  const allowedSharedEnglishTargets = new Set([
    "/en/duesseldorf/cleaning",
    "/en/duesseldorf/office-cleaning",
    "/en/duesseldorf/cleaning-quote-review",
    "/en/regensburg/moving",
    "/en/regensburg/cleaning-after-moving",
    "/en/regensburg/moving-quote-review",
  ]);
  for (const duplicate of duplicateEnTargets) {
    // Several German cleaning pages may legitimately point to one broader English equivalent.
    if (!allowedSharedEnglishTargets.has(duplicate)) {
      fail(`Suspicious duplicate EN hreflang target: ${duplicate}`);
    }
  }
}

function ensureNoDoorwayLanguage() {
  const checkedFiles = [files.keywordStrategy, files.englishPages, files.hreflang];
  const forbidden = [
    /filiale\s+in/i,
    /branch\s+in/i,
    /guaranteed\s+lowest\s+price/i,
    /garantiert\s+günstigster\s+preis/i,
    /meta\s+keywords/i,
  ];

  for (const file of checkedFiles) {
    const source = read(file);
    for (const pattern of forbidden) {
      if (pattern.test(source)) fail(`Forbidden doorway/claim language in ${path.relative(root, file)}: ${pattern}`);
    }
  }
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return Array.from(duplicates);
}

ensureNoMetadataKeywords();
ensureKeywordStrategies();
ensureEnglishPagesAndHreflang();
ensureNoDoorwayLanguage();

if (issues.length) {
  console.error("Local SEO strategy validation failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Local SEO strategy validation passed.");
