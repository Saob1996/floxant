#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexFile = path.join(root, "public", "search-index.json");
const appDirectory = path.join(root, "app");
const errors = [];

const allowedRootKeys = new Set(["version", "source", "entries"]);
const allowedEntryKeys = new Set([
  "id",
  "title",
  "description",
  "url",
  "locale",
  "type",
  "regions",
  "serviceIds",
  "keywords",
]);
const allowedLocales = new Set(["de", "en"]);
const allowedTypes = new Set([
  "service",
  "signature",
  "special_solution",
  "faq",
  "article",
  "location",
  "guide",
]);
const forbiddenRouteSegments = new Set(["api", "dashboard", "admin"]);
const forbiddenPublicServiceIds = new Set([
  "uebergabe-sprint",
  "glasreinigung",
  "solarreinigung",
  "pv-anlagen-reinigung",
  "mini-umzug",
  "express-umzug",
  "fairpreis-check",
  "rueckfahrt-radar",
  "vermieter-ready-service",
  "buero-startklar-service",
  "pv-sichtklar-service",
]);

function addError(location, message) {
  errors.push(`${location}: ${message}`);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateString(value, location) {
  if (typeof value !== "string" || value.trim() === "") {
    addError(location, "must be a non-empty string");
    return false;
  }
  if (value !== value.trim()) {
    addError(location, "must not contain leading or trailing whitespace");
  }
  return true;
}

function validateStringArray(value, location) {
  if (!Array.isArray(value)) {
    addError(location, "must be an array of strings");
    return;
  }

  const seen = new Set();
  value.forEach((item, index) => {
    const itemLocation = `${location}[${index}]`;
    if (!validateString(item, itemLocation)) return;
    const normalized = item.trim().toLocaleLowerCase("de");
    if (seen.has(normalized)) {
      addError(itemLocation, "duplicates an earlier value");
    }
    seen.add(normalized);
  });
}

function hasPageFile(directory) {
  return ["page.tsx", "page.ts", "page.jsx", "page.js"].some((file) =>
    fs.existsSync(path.join(directory, file)),
  );
}

function hasLocalPage(pathname) {
  if (pathname === "/") return hasPageFile(appDirectory);

  const segments = pathname.split("/").filter(Boolean);
  if (hasPageFile(path.join(appDirectory, ...segments))) return true;

  if (
    segments.length === 2 &&
    segments[0] === "blog" &&
    hasPageFile(path.join(appDirectory, "blog", "[slug]"))
  ) {
    return true;
  }

  if (
    segments.length === 3 &&
    segments[0] === "en" &&
    segments[1] === "blog" &&
    hasPageFile(path.join(appDirectory, "en", "blog", "[slug]"))
  ) {
    return true;
  }

  if (
    segments.length === 3 &&
    segments[0] === "en" &&
    hasPageFile(
      path.join(appDirectory, "en", "[regionSlug]", "[englishServiceSlug]"),
    )
  ) {
    return true;
  }

  if (
    segments.length === 1 &&
    hasPageFile(path.join(appDirectory, "[serviceSlug]"))
  ) {
    return true;
  }

  return false;
}

function validatePublicLocalUrl(value, location) {
  if (!validateString(value, location)) return;
  if (!value.startsWith("/") || value.startsWith("//")) {
    addError(location, "must be a root-relative local URL");
    return;
  }
  if (value.includes("\\")) {
    addError(location, "must use URL path separators");
  }
  if (value.includes("?") || value.includes("#")) {
    addError(location, "query strings and fragments are not allowed");
  }

  let decoded;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    addError(location, "contains invalid percent encoding");
    return;
  }

  const decodedSegments = decoded.toLocaleLowerCase("en").split("/").filter(Boolean);
  if (decodedSegments.some((segment) => segment === "." || segment === "..")) {
    addError(location, "path traversal segments are not allowed");
  }
  const forbiddenSegment = decodedSegments.find((segment) =>
    forbiddenRouteSegments.has(segment),
  );
  if (forbiddenSegment) {
    addError(location, `must not target the private /${forbiddenSegment} area`);
  }

  let parsed;
  try {
    parsed = new URL(value, "https://www.floxant.de");
  } catch {
    addError(location, "is not a valid URL");
    return;
  }

  if (parsed.origin !== "https://www.floxant.de") {
    addError(location, "must stay on the FLOXANT origin");
  }
  if (parsed.pathname !== value) {
    addError(location, "must contain a normalized pathname only");
  }
  if (!hasLocalPage(parsed.pathname)) {
    addError(location, `has no matching public page in app${parsed.pathname}`);
  }
}

function validateEntry(entry, index, seenIds) {
  const location = `entries[${index}]`;
  if (!isPlainObject(entry)) {
    addError(location, "must be an object");
    return;
  }

  Object.keys(entry).forEach((key) => {
    if (!allowedEntryKeys.has(key)) {
      addError(`${location}.${key}`, "is not part of the public search-index schema");
    }
  });
  allowedEntryKeys.forEach((key) => {
    if (!Object.hasOwn(entry, key)) {
      addError(`${location}.${key}`, "is required");
    }
  });

  if (validateString(entry.id, `${location}.id`)) {
    const normalizedId = entry.id.trim().toLocaleLowerCase("en");
    if (seenIds.has(normalizedId)) {
      addError(`${location}.id`, `duplicates the ID from entries[${seenIds.get(normalizedId)}]`);
    } else {
      seenIds.set(normalizedId, index);
    }
  }

  validateString(entry.title, `${location}.title`);
  validateString(entry.description, `${location}.description`);
  validatePublicLocalUrl(entry.url, `${location}.url`);

  const hasValidLocale = validateString(entry.locale, `${location}.locale`) && allowedLocales.has(entry.locale);
  if (!hasValidLocale) {
    if (typeof entry.locale === "string" && entry.locale.trim() !== "") {
      addError(`${location}.locale`, `must be one of: ${[...allowedLocales].join(", ")}`);
    }
  } else if (typeof entry.url === "string") {
    const targetsEnglishSection = entry.url === "/en" || entry.url.startsWith("/en/");
    if (entry.locale === "en" && !targetsEnglishSection) {
      addError(`${location}.url`, "English entries must target the /en section");
    }
    if (entry.locale === "de" && targetsEnglishSection) {
      addError(`${location}.url`, "German entries must not target the /en section");
    }
  }
  if (validateString(entry.type, `${location}.type`) && !allowedTypes.has(entry.type)) {
    addError(`${location}.type`, `must be one of: ${[...allowedTypes].join(", ")}`);
  }

  validateStringArray(entry.regions, `${location}.regions`);
  validateStringArray(entry.serviceIds, `${location}.serviceIds`);
  if (Array.isArray(entry.serviceIds)) {
    entry.serviceIds.forEach((serviceId, serviceIdIndex) => {
      if (
        typeof serviceId === "string" &&
        forbiddenPublicServiceIds.has(serviceId.toLocaleLowerCase("de"))
      ) {
        addError(
          `${location}.serviceIds[${serviceIdIndex}]`,
          "must not expose a MANUAL_REVIEW service",
        );
      }
    });
  }
  validateStringArray(entry.keywords, `${location}.keywords`);
}

function validateSearchIndex(document) {
  if (!isPlainObject(document)) {
    addError("search-index.json", "root value must be an object");
    return;
  }

  Object.keys(document).forEach((key) => {
    if (!allowedRootKeys.has(key)) {
      addError(key, "is not part of the public search-index schema");
    }
  });
  allowedRootKeys.forEach((key) => {
    if (!Object.hasOwn(document, key)) addError(key, "is required");
  });

  if (!Number.isInteger(document.version) || document.version !== 1) {
    addError("version", "must be the integer 1");
  }
  validateString(document.source, "source");

  if (!Array.isArray(document.entries)) {
    addError("entries", "must be an array");
    return;
  }
  if (document.entries.length === 0) {
    addError("entries", "must contain at least one public entry");
  }

  const seenIds = new Map();
  document.entries.forEach((entry, index) => validateEntry(entry, index, seenIds));
}

if (!fs.existsSync(indexFile)) {
  addError("public/search-index.json", "file does not exist");
} else {
  try {
    const document = JSON.parse(fs.readFileSync(indexFile, "utf8"));
    validateSearchIndex(document);
  } catch (error) {
    addError(
      "public/search-index.json",
      `is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (errors.length > 0) {
  console.error(`Public search-index validation failed with ${errors.length} error(s):`);
  errors.sort().forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("Public search-index validation passed.");
}
