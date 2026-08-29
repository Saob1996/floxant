#!/usr/bin/env node

import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.cwd(), "out");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

if (!existsSync(root)) {
  console.error("out/ fehlt. Bitte zuerst npm run build ausfuehren.");
  process.exit(1);
}

const redirectRules = readFileSync(path.join(root, "_redirects"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => {
    const [source, destination, status = "302"] = line.split(/\s+/);
    const names = [];
    let pattern = source.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    pattern = pattern.replace(/\\\*/g, "(.*)");
    pattern = pattern.replace(/:([A-Za-z][A-Za-z0-9_]*)/g, (_, name) => {
      names.push(name);
      return "([^/]+)";
    });
    return { source, destination, status: Number(status), regex: new RegExp(`^${pattern}$`), names };
  });

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".avif", "image/avif"],
  [".ico", "image/x-icon"],
  [".woff2", "font/woff2"],
]);

function redirectFor(pathname, search) {
  for (const rule of redirectRules) {
    const match = pathname.match(rule.regex);
    if (!match) continue;
    let destination = rule.destination;
    const captures = match.slice(1);
    if (destination.includes(":splat")) destination = destination.replace(":splat", captures[0] || "");
    rule.names.forEach((name, index) => {
      destination = destination.replace(`:${name}`, captures[index] || "");
    });
    if (search && !destination.includes("?")) destination += search;
    return { ...rule, destination };
  }
  return null;
}

function assetPath(pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  const relative = decoded.replace(/^\/+/, "");
  const candidates = relative
    ? [relative, `${relative}.html`, path.join(relative, "index.html")]
    : ["index.html"];

  // Next's static export flattens the requested RSC prefetch filename, while
  // the actual __PAGE__.txt payload is stored in a nested directory. Mirror
  // the Cloudflare Pages proxy rules locally so Lighthouse/browser checks see
  // the same successful response as production.
  const rscMatch = relative.match(/^(.*)\/__next\.([^.\/]+(?:\.[^.\/]+)*)\.__PAGE__\.txt$/);
  if (rscMatch) {
    const routeDirectory = rscMatch[1];
    const routeSegments = rscMatch[2].split(".");
    candidates.unshift(
      path.join(
        routeDirectory,
        `__next.${routeSegments[0]}`,
        ...routeSegments.slice(1),
        "__PAGE__.txt",
      ),
    );
  }

  for (const candidate of candidates) {
    const absolute = path.resolve(root, candidate);
    if (!absolute.startsWith(`${root}${path.sep}`) && absolute !== root) continue;
    if (existsSync(absolute) && statSync(absolute).isFile()) return absolute;
  }
  return null;
}

const gonePaths = new Set([
  "/seo-gone",
  "/umzug-duesseldorf",
  "/duesseldorf/umzug",
  "/duesseldorf/entruempelung",
  "/duesseldorf/haushaltsaufloesung",
]);

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || `${host}:${port}`}`);
  const redirect = redirectFor(url.pathname, url.search);
  if (redirect && redirect.status !== 200) {
    response.writeHead(redirect.status, { Location: redirect.destination, "Cache-Control": "no-store" });
    response.end();
    return;
  }

  const effectivePathname = redirect?.status === 200
    ? new URL(redirect.destination, url).pathname
    : url.pathname;

  if (gonePaths.has(effectivePathname)) {
    response.writeHead(410, { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" });
    response.end("Diese URL ist nicht mehr verfuegbar.");
    return;
  }

  if (effectivePathname === "/api/bookings" || effectivePathname === "/api/intake") {
    response.writeHead(501, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    response.end(JSON.stringify({ success: false, error: "Pages Functions werden mit Wrangler oder im direkten Funktionstest geprueft." }));
    return;
  }

  const file = assetPath(effectivePathname);
  if (!file) {
    const notFound = path.join(root, "404.html");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(notFound).pipe(response);
    return;
  }

  const type = contentTypes.get(path.extname(file).toLowerCase()) || "application/octet-stream";
  response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`FLOXANT static export: http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
