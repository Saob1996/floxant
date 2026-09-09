#!/usr/bin/env node

import { access, readFile, rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const exportRoot = path.resolve(projectRoot, "out");
const redirectsPath = path.join(exportRoot, "_redirects");

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function exactRedirectSources(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/, 3)[0])
    .filter((source) => source !== "/" && !/[\*:]/.test(source));
}

const redirects = await readFile(redirectsPath, "utf8");
const removed = [];

for (const encodedSource of exactRedirectSources(redirects)) {
  const source = decodeURIComponent(encodedSource).replace(/^\/+|\/+$/g, "");
  if (!source) continue;

  const relative = source.split("/").join(path.sep);
  const candidates = [
    path.join(exportRoot, `${relative}.html`),
    path.join(exportRoot, `${relative}.txt`),
    path.join(exportRoot, relative, "index.html"),
    path.join(exportRoot, relative, "index.txt"),
  ];

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (!resolved.startsWith(`${exportRoot}${path.sep}`) || !(await exists(resolved))) continue;
    await rm(resolved, { force: true });
    removed.push(path.relative(exportRoot, resolved).replaceAll(path.sep, "/"));
  }
}

console.log(`[redirect-prune] Removed ${removed.length} static files that would shadow permanent redirects.`);
