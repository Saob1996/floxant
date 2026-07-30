#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

const ROOT = process.cwd();
const BASE_URL = (process.env.BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const CHROME_PATH =
  process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "compact", width: 1024, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];
const ROUTES = [
  "/",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
  "/duesseldorf/gewerbereinigung",
  "/regensburg",
  "/regensburg/umzug",
  "/umzugsunternehmen-regensburg",
  "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung",
  "/klaviertransport-regensburg",
  "/reinigungsfirma-angebot",
  "/duesseldorf/reinigung/anfrage",
  "/umzug-regensburg/anfrage",
  "/suche",
  "/service-finder",
  "/fragen",
  "/blog",
  "/kontakt",
  "/dashboard/login",
];

class CdpClient {
  constructor(url) {
    this.nextId = 1;
    this.pending = new Map();
    this.eventListeners = new Map();
    this.socket = new WebSocket(url);
  }

  async connect() {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("CDP connection timed out")), 10_000);
      this.socket.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.socket.addEventListener("error", (event) => {
        clearTimeout(timeout);
        reject(new Error(`CDP connection failed: ${event.message || "unknown error"}`));
      });
      this.socket.addEventListener("message", (event) => this.handleMessage(event.data));
    });
  }

  handleMessage(raw) {
    const message = JSON.parse(String(raw));
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
      return;
    }

    const listeners = this.eventListeners.get(message.method) || [];
    for (const listener of listeners) listener(message.params || {});
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.eventListeners.get(method) || [];
    listeners.push(listener);
    this.eventListeners.set(method, listeners);
  }

  waitFor(method, timeoutMs = 20_000, predicate = () => true) {
    return new Promise((resolve, reject) => {
      const listener = (params) => {
        if (!predicate(params)) return;
        clearTimeout(timeout);
        const listeners = this.eventListeners.get(method) || [];
        this.eventListeners.set(
          method,
          listeners.filter((candidate) => candidate !== listener),
        );
        resolve(params);
      };
      const timeout = setTimeout(() => {
        const listeners = this.eventListeners.get(method) || [];
        this.eventListeners.set(
          method,
          listeners.filter((candidate) => candidate !== listener),
        );
        reject(new Error(`${method} timed out`));
      }, timeoutMs);
      this.on(method, listener);
    });
  }

  close() {
    this.socket.close();
  }
}

async function waitForDebugEndpoint(port) {
  const endpoint = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`${endpoint}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const page = targets.find((target) => target.type === "page");
        if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
      }
    } catch {
      // Chrome may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Chrome debugging endpoint did not become available");
}

async function main() {
  if (!fs.existsSync(CHROME_PATH)) {
    throw new Error(`Chrome executable not found: ${CHROME_PATH}`);
  }

  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "floxant-browser-qa-"));
  const port = 9300 + (process.pid % 400);
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-extensions",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      `--window-size=${VIEWPORTS[0].width},${VIEWPORTS[0].height}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"], windowsHide: true },
  );

  const chromeErrors = [];
  chrome.stderr.on("data", (chunk) => {
    const text = chunk.toString("utf8").trim();
    if (text) chromeErrors.push(text);
  });

  let client;
  try {
    client = new CdpClient(await waitForDebugEndpoint(port));
    await client.connect();
    await Promise.all([
      client.send("Page.enable"),
      client.send("Runtime.enable"),
      client.send("Log.enable"),
      client.send("Page.setLifecycleEventsEnabled", { enabled: true }),
    ]);

    const consoleErrors = [];
    client.on("Runtime.exceptionThrown", (event) => {
      consoleErrors.push(event.exceptionDetails?.text || "Runtime exception");
    });
    client.on("Runtime.consoleAPICalled", (event) => {
      if (event.type === "error") {
        consoleErrors.push(
          (event.args || []).map((arg) => arg.value || arg.description || "").join(" "),
        );
      }
    });
    client.on("Log.entryAdded", (event) => {
      if (event.entry?.level === "error") consoleErrors.push(event.entry.text || "Log error");
    });

    const results = [];
    for (const viewport of VIEWPORTS) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        mobile: viewport.name === "mobile",
      });
      for (const route of ROUTES) {
        const errorStart = consoleErrors.length;
        let loaderId = "";
        const loaded = client.waitFor("Page.loadEventFired");
        const networkIdle = client.waitFor(
          "Page.lifecycleEvent",
          20_000,
          (event) => event.name === "networkIdle" && event.loaderId === loaderId,
        );
        const navigation = await client.send("Page.navigate", { url: `${BASE_URL}${route}` });
        if (navigation.errorText) throw new Error(`${route}: ${navigation.errorText}`);
        loaderId = navigation.loaderId || "";
        await loaded;
        await networkIdle;

        const evaluation = await client.send("Runtime.evaluate", {
          expression: `new Promise((resolve) => {
          const started = Date.now();
          const inspect = () => {
            const h1 = document.querySelector("h1");
            if (h1?.getClientRects().length || Date.now() - started > 8000) {
              Promise.all(Array.from(document.images).map((image) => {
                if (image.complete) return Promise.resolve();
                return new Promise((done) => {
                  image.addEventListener("load", done, { once: true });
                  image.addEventListener("error", done, { once: true });
                  setTimeout(done, 3000);
                });
              })).then(() => {
                const h1s = Array.from(document.querySelectorAll("h1"));
                const visibleH1s = h1s.filter((element) => element.getClientRects().length > 0);
                const main = document.querySelector("main");
                const overlay = document.querySelector(
                  "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"
                );
                const brokenImages = Array.from(document.images)
                  .filter((image) => image.complete && image.naturalWidth === 0)
                  .map((image) => image.getAttribute("src") || "")
                  .slice(0, 10);
                const mainText = (main?.innerText || "").trim();
                resolve({
                  finalPath: location.pathname,
                  title: document.title,
                  h1Count: h1s.length,
                  visibleH1Count: visibleH1s.length,
                  h1: (visibleH1s[0]?.textContent || "").trim(),
                  mainVisible: Boolean(main && main.getClientRects().length),
                  mainTextLength: mainText.length,
                  breadcrumbs: document.querySelectorAll(
                    "nav[aria-label*='Breadcrumb'], nav[aria-label*='Brotkr'], [data-breadcrumb]"
                  ).length,
                  links: document.querySelectorAll("a[href]").length,
                  buttons: document.querySelectorAll("button").length,
                  forms: document.querySelectorAll("form").length,
                  overflow:
                    Math.max(
                      document.documentElement.scrollWidth,
                      document.body?.scrollWidth || 0
                    ) > window.innerWidth + 2,
                  brokenImages,
                  frameworkOverlay: Boolean(overlay),
                });
              });
              return;
            }
            requestAnimationFrame(inspect);
          };
          inspect();
        })`,
          awaitPromise: true,
          returnByValue: true,
        });

        const observed = evaluation.result?.value;
        if (!observed) throw new Error(`${route}: browser evaluation returned no result`);
        const routeConsoleErrors = consoleErrors.slice(errorStart).filter(Boolean);
        const pass =
          observed.h1Count === 1 &&
          observed.visibleH1Count === 1 &&
          observed.mainVisible &&
          observed.mainTextLength > 40 &&
          !observed.overflow &&
          observed.brokenImages.length === 0 &&
          !observed.frameworkOverlay &&
          routeConsoleErrors.length === 0 &&
          !/(404|not found|nicht gefunden)/i.test(observed.title);

        results.push({
          viewport,
          route,
          ...observed,
          consoleErrors: routeConsoleErrors,
          pass,
        });
      }
    }

    const screenshotViewport = VIEWPORTS.find((viewport) => viewport.width === 1024);
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: screenshotViewport.width,
      height: screenshotViewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const screenshotLoaded = client.waitFor("Page.loadEventFired");
    await client.send("Page.navigate", { url: `${BASE_URL}/duesseldorf/reinigung` });
    await screenshotLoaded;
    await client.send("Runtime.evaluate", {
      expression: `new Promise((resolve) => {
        const started = Date.now();
        const ready = () => {
          const h1 = document.querySelector("h1");
          if (h1?.getClientRects().length || Date.now() - started > 8000) resolve();
          else requestAnimationFrame(ready);
        };
        ready();
      })`,
      awaitPromise: true,
    });
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(
      path.join(ROOT, "artifacts", "browser-qa-1024-duesseldorf-reinigung.png"),
      Buffer.from(screenshot.data, "base64"),
    );

    const failures = results.filter((result) => !result.pass);
    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      viewports: VIEWPORTS,
      routeCount: ROUTES.length,
      combinations: ROUTES.length * VIEWPORTS.length,
      tested: results.length,
      passed: results.length - failures.length,
      failed: failures.length,
      overflow: results.filter((result) => result.overflow).length,
      brokenImages: results.reduce((sum, result) => sum + result.brokenImages.length, 0),
      consoleErrors: results.reduce((sum, result) => sum + result.consoleErrors.length, 0),
      frameworkOverlays: results.filter((result) => result.frameworkOverlay).length,
      routes: results,
    };
    fs.writeFileSync(
      path.join(ROOT, "artifacts", "browser-qa-2026-07-30.json"),
      `${JSON.stringify(report, null, 2)}\n`,
    );

    console.log(
      JSON.stringify(
        {
          status: failures.length === 0 ? "PASS" : "FAIL",
          viewports: VIEWPORTS.map(
            (viewport) => `${viewport.name}:${viewport.width}x${viewport.height}`,
          ),
          tested: report.tested,
          passed: report.passed,
          failed: report.failed,
          overflow: report.overflow,
          brokenImages: report.brokenImages,
          consoleErrors: report.consoleErrors,
          frameworkOverlays: report.frameworkOverlays,
          failures,
          report: "artifacts/browser-qa-2026-07-30.json",
        },
        null,
        2,
      ),
    );
    process.exitCode = failures.length === 0 ? 0 : 1;
  } finally {
    if (client) client.close();
    chrome.kill();
    await new Promise((resolve) => {
      if (chrome.exitCode !== null) resolve();
      else {
        chrome.once("exit", resolve);
        setTimeout(resolve, 3000);
      }
    });
    const resolvedProfile = path.resolve(profileDir);
    const resolvedTemp = path.resolve(os.tmpdir());
    if (resolvedProfile.startsWith(`${resolvedTemp}${path.sep}`)) {
      fs.rmSync(resolvedProfile, { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
