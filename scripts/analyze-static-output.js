const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const outDir = path.join(root, "out");
const artifactPath = path.join(root, "artifacts", "static-output-analysis.json");
const baselinePath = path.join(root, "artifacts", "market-growth-baseline.json");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const videoExtensions = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }
  return files;
}

function relative(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function groupBy(items, keyFor) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFor(item);
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }
  return groups;
}

if (!fs.existsSync(outDir)) throw new Error("out/ fehlt. Zuerst npm run build ausführen.");
const baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, "utf8")) : null;
const files = walk(outDir).map((file) => ({ file, path: relative(file), bytes: fs.statSync(file).size, extension: path.extname(file).toLowerCase() || "[none]" }));
const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
const extensionGroups = {};
for (const [extension, group] of groupBy(files, (file) => file.extension)) {
  extensionGroups[extension] = { files: group.length, bytes: group.reduce((sum, file) => sum + file.bytes, 0) };
}

const sameSizeCandidates = [...groupBy(files, (file) => file.bytes).values()].filter((group) => group.length > 1 && group[0].bytes > 0);
const hashGroups = new Map();
for (const candidates of sameSizeCandidates) {
  for (const file of candidates) {
    const key = `${file.bytes}:${sha256(file.file)}`;
    const group = hashGroups.get(key) || [];
    group.push(file);
    hashGroups.set(key, group);
  }
}
const exactDuplicateGroups = [...hashGroups.entries()]
  .filter(([, group]) => group.length > 1)
  .map(([key, group]) => ({ sha256: key.split(":")[1], bytesEach: group[0].bytes, recoverableBytes: group[0].bytes * (group.length - 1), files: group.map((file) => file.path) }))
  .sort((a, b) => b.recoverableBytes - a.recoverableBytes);

const publicFiles = walk(path.join(root, "public"));
const sourceFiles = ["app", "components", "lib", "styles"].flatMap((directory) => walk(path.join(root, directory))).filter((file) => /\.(?:css|js|jsx|mjs|ts|tsx)$/i.test(file));
const sourceText = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const unreferencedPublicAssets = publicFiles
  .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()) || videoExtensions.has(path.extname(file).toLowerCase()))
  .filter((file) => {
    const publicPath = `/${path.relative(path.join(root, "public"), file).replaceAll("\\", "/")}`;
    return !sourceText.includes(publicPath) && !sourceText.includes(path.basename(file));
  })
  .map((file) => ({ path: relative(file), bytes: fs.statSync(file).size }));

const imageFiles = files.filter((file) => imageExtensions.has(file.extension));
const imageDuplicateGroups = exactDuplicateGroups.filter((group) => group.files.every((file) => imageExtensions.has(path.extname(file).toLowerCase())));
const baselineNearDuplicates = baseline?.images?.nearDuplicateAnalysis || baseline?.assets?.nearDuplicateImages || null;
const beforeBytes = baseline?.output?.totalBytes ?? null;
const reductionPercent = beforeBytes ? ((beforeBytes - totalBytes) / beforeBytes) * 100 : null;
const result = {
  generatedAt: new Date().toISOString(),
  methodology: {
    identicalFiles: "SHA-256 only after grouping files with identical byte size.",
    unusedAssets: "Conservative source-reference heuristic; candidates are not deleted automatically.",
    nearDuplicateImages: "Baseline dHash result reused; no visual asset was removed automatically.",
  },
  before: beforeBytes === null ? null : { totalBytes: beforeBytes, fileCount: baseline.output.fileCount },
  after: { totalBytes, fileCount: files.length, largestFileBytes: Math.max(...files.map((file) => file.bytes)) },
  change: beforeBytes === null ? null : { bytes: totalBytes - beforeBytes, reductionPercent },
  extensionGroups,
  largestFiles: [...files].sort((a, b) => b.bytes - a.bytes).slice(0, 30).map(({ path: filePath, bytes, extension }) => ({ path: filePath, bytes, extension })),
  html: {
    count: files.filter((file) => file.extension === ".html").length,
    bytes: files.filter((file) => file.extension === ".html").reduce((sum, file) => sum + file.bytes, 0),
    overOneMiB: files.filter((file) => file.extension === ".html" && file.bytes > 1024 ** 2).sort((a, b) => b.bytes - a.bytes).map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  },
  reactServerPayloads: {
    count: files.filter((file) => file.extension === ".txt").length,
    bytes: files.filter((file) => file.extension === ".txt").reduce((sum, file) => sum + file.bytes, 0),
  },
  exactDuplicates: {
    groups: exactDuplicateGroups.length,
    recoverableBytesIfAllButOneCouldBeRemoved: exactDuplicateGroups.reduce((sum, group) => sum + group.recoverableBytes, 0),
    largestGroups: exactDuplicateGroups.slice(0, 200),
    note: "Next.js route payload duplicates can be required by static routing and are not safe deletion candidates by hash alone.",
  },
  images: {
    count: imageFiles.length,
    bytes: imageFiles.reduce((sum, file) => sum + file.bytes, 0),
    exactDuplicateGroups: imageDuplicateGroups,
    nearDuplicateBaseline: baselineNearDuplicates,
  },
  metadataImages: files.filter((file) => /(?:opengraph|twitter|og)[^/]*\.(?:png|jpe?g|webp)$/i.test(file.path)).map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  json: files.filter((file) => file.extension === ".json").map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  sourceMaps: files.filter((file) => file.extension === ".map").map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  fonts: files.filter((file) => fontExtensions.has(file.extension)).map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  videos: files.filter((file) => videoExtensions.has(file.extension)).map(({ path: filePath, bytes }) => ({ path: filePath, bytes })),
  unreferencedPublicAssetCandidates: unreferencedPublicAssets,
  safeAutomaticRemovalsApplied: [],
  conclusion: reductionPercent !== null && reductionPercent >= 20
    ? "The measured export reduction reached the 20% target."
    : "A safe 20% reduction was not demonstrated. The dominant HTML and Next.js route payload files are required for the current static route set and were not deleted.",
};

fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
fs.writeFileSync(artifactPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ totalBytes, fileCount: files.length, reductionPercent, exactDuplicateGroups: exactDuplicateGroups.length, images: imageFiles.length, report: relative(artifactPath) }, null, 2));
