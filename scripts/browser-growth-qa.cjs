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
  { name: "mobile", width: 390, height: 844 },
];
const ROUTES = [
  "/",
  "/duesseldorf",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/praxisreinigung",
  "/regensburg",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/regensburg/wohnungsaufloesung",
  "/regensburg/seniorenumzug",
  "/kontakt",
  "/dashboard",
];
const REPORT_DATE = "2026-08-19";

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
        await client.send("Runtime.evaluate", {
          expression: `(() => {
            const essentialConsent = Array.from(document.querySelectorAll("button")).find(
              (button) => /nur essenzielle/i.test(button.textContent || "")
            );
            essentialConsent?.click();
            window.dispatchEvent(new Event("pointerdown"));
          })()`,
        });

        const evaluation = await client.send("Runtime.evaluate", {
          expression: `(async () => {
            const mobileViewport = ${viewport.width < 768};
            const routePath = location.pathname.toLowerCase();
            const floatingExpected =
              mobileViewport &&
              routePath !== "/kontakt" &&
              !routePath.startsWith("/dashboard") &&
              !routePath.startsWith("/admin") &&
              routePath !== "/login";
            const quickContactSelector = '[aria-label*="Schnellkontakt"]';
            const isVisible = (element) => {
              const style = getComputedStyle(element);
              return element.getClientRects().length > 0 &&
                style.display !== "none" &&
                style.visibility !== "hidden";
            };

            window.dispatchEvent(new Event("pointerdown"));
            window.dispatchEvent(new Event("scroll"));
            const deadline = Date.now() + 8000;
            while (Date.now() < deadline) {
              const h1Ready = Boolean(document.querySelector("h1")?.getClientRects().length);
              const floatingReady =
                !floatingExpected ||
                Array.from(document.querySelectorAll(quickContactSelector)).some(isVisible);
              if (h1Ready && floatingReady) break;
              await new Promise((done) => setTimeout(done, 100));
            }

            await Promise.all(Array.from(document.images).map((image) => {
              if (image.complete) return Promise.resolve();
              return new Promise((done) => {
                image.addEventListener("load", done, { once: true });
                image.addEventListener("error", done, { once: true });
                setTimeout(done, 3000);
              });
            }));

            let maxScroll = 0;
            for (let attempt = 0; attempt < 12; attempt += 1) {
              maxScroll = Math.max(
                document.documentElement.scrollHeight,
                document.body?.scrollHeight || 0
              ) - window.innerHeight;
              window.scrollTo({ top: maxScroll, left: 0, behavior: "instant" });
              await new Promise((done) => setTimeout(done, 50));
              if (Math.abs(window.scrollY - maxScroll) <= 2) break;
            }

            const h1s = Array.from(document.querySelectorAll("h1"));
            const visibleH1s = h1s.filter(isVisible);
            const main = document.querySelector("main");
            const overlay = document.querySelector(
              "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"
            );
            const brokenImages = Array.from(document.images)
              .filter((image) => image.complete && image.naturalWidth === 0)
              .map((image) => image.getAttribute("src") || "")
              .slice(0, 10);
            const mainText = (main?.innerText || "").trim();
            const quickContacts = Array.from(document.querySelectorAll(quickContactSelector));
            const visibleQuickContacts = quickContacts.filter(isVisible);
            const floatingContact = visibleQuickContacts[0] || null;
            const floatingLabels = Array.from(
              floatingContact?.querySelectorAll(".flox-mobile-action-label") || []
            ).map((element) => (element.textContent || "").trim());
            const floatingActionCount = floatingContact
              ? floatingContact.querySelectorAll("a[href], button").length
              : 0;
            const floatingLabelsCorrect =
              floatingLabels.join("|") === "Anfrage|Anrufen|WhatsApp";

            const floatingRect = floatingContact?.getBoundingClientRect() || null;
            const contentSelectors = [
              "main a[href]", "main button", "main input", "main select", "main textarea",
              "main h1", "main h2", "main h3", "main p", "main li",
              "footer a[href]", "footer button", "footer h2", "footer h3", "footer p", "footer li",
            ].join(",");
            const coveredContent = floatingRect
              ? Array.from(document.querySelectorAll(contentSelectors))
                .filter(isVisible)
                .filter((element) => {
                  const rect = element.getBoundingClientRect();
                  return rect.width > 0 && rect.height > 0 &&
                    rect.bottom > floatingRect.top + 2 &&
                    rect.top < floatingRect.bottom - 2 &&
                    rect.right > floatingRect.left + 2 &&
                    rect.left < floatingRect.right - 2;
                })
                .map((element) => (element.textContent || element.getAttribute("aria-label") || "").trim())
                .filter(Boolean)
                .slice(0, 10)
              : [];
            const visibleDeleteControls = Array.from(
              document.querySelectorAll("button, a[href]")
            ).filter(isVisible).filter((element) =>
              /(?:dauerhaft\s+)?löschen/i.test(element.textContent || element.getAttribute("aria-label") || "")
            );

            return {
              finalPath: location.pathname,
              title: document.title,
              h1Count: h1s.length,
              visibleH1Count: visibleH1s.length,
              h1: (visibleH1s[0]?.textContent || "").trim(),
              mainVisible: Boolean(main && isVisible(main)),
              mainTextLength: mainText.length,
              breadcrumbs: document.querySelectorAll(
                "nav[aria-label*='Breadcrumb'], nav[aria-label*='Brotkr'], [data-breadcrumb]"
              ).length,
              links: document.querySelectorAll("a[href]").length,
              buttons: document.querySelectorAll("button").length,
              forms: document.querySelectorAll("form").length,
              overflow:
                Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0) >
                window.innerWidth + 2,
              brokenImages,
              frameworkOverlay: Boolean(overlay),
              floatingExpected,
              floatingContactInDom: quickContacts.length,
              floatingContactVisible: visibleQuickContacts.length,
              floatingActionCount,
              floatingLabels,
              floatingLabelsCorrect,
              coveredContent,
              scrollY: window.scrollY,
              maxScroll,
              viewportHeight: window.innerHeight,
              documentHeight: Math.max(
                document.documentElement.scrollHeight,
                document.body?.scrollHeight || 0
              ),
              dashboardDeleteControlsVisible: routePath.startsWith("/dashboard")
                ? visibleDeleteControls.length
                : null,
            };
          })()`,
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
          (observed.floatingExpected
            ? observed.floatingContactVisible === 1 &&
              observed.floatingActionCount === 3 &&
              observed.floatingLabelsCorrect &&
              observed.coveredContent.length === 0
            : observed.floatingContactVisible === 0) &&
          (observed.dashboardDeleteControlsVisible === null ||
            observed.dashboardDeleteControlsVisible === 0) &&
          (route !== "/kontakt" || observed.forms > 0) &&
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

    const desktopViewport = VIEWPORTS.find((viewport) => viewport.name === "desktop");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: desktopViewport.width,
      height: desktopViewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const flowErrorStart = consoleErrors.length;
    const seniorLoaded = client.waitFor("Page.loadEventFired");
    await client.send("Page.navigate", { url: `${BASE_URL}/regensburg/seniorenumzug` });
    await seniorLoaded;
    const seniorCtaEvaluation = await client.send("Runtime.evaluate", {
      expression: `(async () => {
        const deadline = Date.now() + 8000;
        while (!document.querySelector("h1") && Date.now() < deadline) {
          await new Promise((done) => setTimeout(done, 100));
        }
        const requestLink = Array.from(document.querySelectorAll('a[href*="/kontakt?"]'))
          .map((link) => link.href)
          .find((href) => {
            const url = new URL(href);
            return url.searchParams.get("location") === "regensburg" &&
              url.searchParams.get("service") === "seniorenumzug" &&
              url.searchParams.get("intent") === "seniorenumzug-anfragen";
          }) || "";
        const phoneLink = Array.from(document.querySelectorAll('a[href^="tel:"]'))
          .map((link) => link.getAttribute("href") || "")
          .find(Boolean) || "";
        return { requestLink, phoneLink };
      })()`,
      awaitPromise: true,
      returnByValue: true,
    });
    const seniorCta = seniorCtaEvaluation.result?.value || {};
    let contactSelection = {};
    if (seniorCta.requestLink) {
      const contactLoaded = client.waitFor("Page.loadEventFired");
      await client.send("Page.navigate", { url: seniorCta.requestLink });
      await contactLoaded;
      const contactEvaluation = await client.send("Runtime.evaluate", {
        expression: `(async () => {
          const deadline = Date.now() + 8000;
          let startLocation = document.querySelector("#request-start");
          while (startLocation?.value !== "Regensburg" && Date.now() < deadline) {
            await new Promise((done) => setTimeout(done, 100));
            startLocation = document.querySelector("#request-start");
          }
          const requestForm = document.querySelector("[data-professional-request-form]");
          const submitButton = document.querySelector('form button[type="submit"]');
          const nextButton = Array.from(document.querySelectorAll('form button[type="button"]'))
            .find((button) => /weiter zu kontakt und übersicht/i.test(button.textContent || ""));
          return {
            finalPath: location.pathname,
            search: location.search,
            headline: (document.querySelector("[data-request-headline]")?.textContent || "").trim(),
            badge: (document.querySelector("[data-request-badge]")?.textContent || "").trim(),
            notice: (document.querySelector("#request-context-error")?.textContent || "").trim(),
            location: startLocation?.value || "",
            service: /seniorenumzug/i.test(
              document.querySelector("[data-request-headline]")?.textContent || ""
            ) ? "seniorenumzug" : "",
            requestGroup: requestForm?.getAttribute("data-request-group") || "",
            step: (requestForm?.querySelector("h2")?.textContent || "").trim(),
            formVisible: Boolean(document.querySelector("form")?.getClientRects().length),
            nextVisible: Boolean(nextButton?.getClientRects().length),
            submitVisible: Boolean(submitButton?.getClientRects().length),
            submitDisabled: Boolean(submitButton?.disabled),
          };
        })()`,
        awaitPromise: true,
        returnByValue: true,
      });
      contactSelection = contactEvaluation.result?.value || {};
    }
    const flowConsoleErrors = consoleErrors.slice(flowErrorStart).filter(Boolean);
    const formFlow = {
      seniorRequestHref: seniorCta.requestLink || "",
      seniorPhoneHref: seniorCta.phoneLink || "",
      contactSelection,
      consoleErrors: flowConsoleErrors,
      submitted: false,
      pass:
        Boolean(seniorCta.requestLink) &&
        Boolean(seniorCta.phoneLink) &&
        contactSelection.finalPath === "/kontakt" &&
        contactSelection.location === "Regensburg" &&
        contactSelection.service === "seniorenumzug" &&
        contactSelection.requestGroup === "moving" &&
        contactSelection.step === "Eckdaten zur Leistung" &&
        contactSelection.formVisible === true &&
        contactSelection.nextVisible === true &&
        flowConsoleErrors.length === 0,
    };

    const screenshotCases = [
      {
        viewport: desktopViewport,
        route: "/regensburg/seniorenumzug",
        name: `browser-qa-${REPORT_DATE}-desktop-seniorenumzug.png`,
      },
      {
        viewport: VIEWPORTS.find((viewport) => viewport.name === "mobile"),
        route: "/",
        name: `browser-qa-${REPORT_DATE}-mobile-home.png`,
      },
      {
        viewport: desktopViewport,
        route: "/dashboard",
        name: `browser-qa-${REPORT_DATE}-desktop-dashboard.png`,
      },
    ];
    const screenshots = [];
    for (const screenshotCase of screenshotCases) {
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: screenshotCase.viewport.width,
        height: screenshotCase.viewport.height,
        deviceScaleFactor: 1,
        mobile: screenshotCase.viewport.name === "mobile",
      });
      const screenshotLoaded = client.waitFor("Page.loadEventFired");
      await client.send("Page.navigate", { url: `${BASE_URL}${screenshotCase.route}` });
      await screenshotLoaded;
      await client.send("Runtime.evaluate", {
        expression: `(async () => {
          const mobileViewport = ${screenshotCase.viewport.name === "mobile"};
          window.scrollTo(0, 0);
          const essentialConsent = Array.from(document.querySelectorAll("button")).find(
            (button) => /nur essenzielle/i.test(button.textContent || "")
          );
          essentialConsent?.click();
          const deadline = Date.now() + 8000;
          while (Date.now() < deadline) {
            window.dispatchEvent(new Event("pointerdown"));
            window.dispatchEvent(new Event("scroll"));
            const h1Ready = Boolean(document.querySelector("h1")?.getClientRects().length);
            const quickContactReady = !mobileViewport || Array.from(
              document.querySelectorAll('[aria-label*="Schnellkontakt"]')
            ).some((element) => element.getClientRects().length > 0);
            if (h1Ready && quickContactReady) break;
            await new Promise((done) => setTimeout(done, 100));
          }
          await new Promise((done) => setTimeout(done, 250));
        })()`,
        awaitPromise: true,
      });
      const screenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      fs.writeFileSync(
        path.join(ROOT, "artifacts", screenshotCase.name),
        Buffer.from(screenshot.data, "base64"),
      );
      screenshots.push(`artifacts/${screenshotCase.name}`);
    }

    const failures = results.filter((result) => !result.pass);
    const failed = failures.length + (formFlow.pass ? 0 : 1);
    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      viewports: VIEWPORTS,
      routeCount: ROUTES.length,
      combinations: ROUTES.length * VIEWPORTS.length,
      tested: results.length,
      passed: results.length - failures.length,
      failed,
      overflow: results.filter((result) => result.overflow).length,
      brokenImages: results.reduce((sum, result) => sum + result.brokenImages.length, 0),
      consoleErrors: results.reduce((sum, result) => sum + result.consoleErrors.length, 0),
      frameworkOverlays: results.filter((result) => result.frameworkOverlay).length,
      missingRequiredFloatingContacts: results.filter(
        (result) =>
          result.viewport.name === "mobile" &&
          result.floatingExpected &&
          result.floatingContactVisible !== 1,
      ).length,
      incorrectFloatingActionSets: results.filter(
        (result) => result.floatingExpected &&
          (result.floatingActionCount !== 3 || !result.floatingLabelsCorrect),
      ).length,
      coveredContent: results.reduce(
        (sum, result) => sum + result.coveredContent.length,
        0,
      ),
      formFlow,
      screenshots,
      routes: results,
    };
    fs.writeFileSync(
      path.join(ROOT, "artifacts", `browser-qa-${REPORT_DATE}.json`),
      `${JSON.stringify(report, null, 2)}\n`,
    );

    console.log(
      JSON.stringify(
        {
          status: failed === 0 ? "PASS" : "FAIL",
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
          missingRequiredFloatingContacts: report.missingRequiredFloatingContacts,
          incorrectFloatingActionSets: report.incorrectFloatingActionSets,
          coveredContent: report.coveredContent,
          formFlow,
          failures,
          screenshots,
          report: `artifacts/browser-qa-${REPORT_DATE}.json`,
        },
        null,
        2,
      ),
    );
    process.exitCode = failed === 0 ? 0 : 1;
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
