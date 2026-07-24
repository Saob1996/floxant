#!/usr/bin/env node

const {
  ACCEPTED_REDIRECTS,
  addResult,
  collectAnchors,
  criticalRoutes,
  fetchPath,
  hasPiiInUrl,
  normalizePath,
  reportBaseUrl,
  writeReport,
} = require("./qa-shared.cjs");

function expectedQuery(route) {
  const params = {};
  if (route.expectedService && !["multi", "legal", "technical", "kontakt"].includes(route.expectedService)) {
    params.service = route.expectedService;
  }
  if (route.expectedCity && !["deutschland", "bayern"].includes(route.expectedCity)) {
    params.city = route.expectedCity;
  }
  if (route.expectedIntent && !["home", "technical", "robots", "sitemap", "impressum", "datenschutz", "agb"].includes(route.expectedIntent)) {
    params.intent = route.expectedIntent;
  }
  return params;
}

function findPrimaryCtas(anchors) {
  return anchors.filter((anchor) => {
    return normalizePath(anchor.href) === "/kontakt" ||
      String(anchor.href || "").startsWith("/kontakt?") ||
      String(anchor.href || "") === "#kontakt" ||
      String(anchor.href || "").endsWith("#kontakt") ||
      Boolean(anchor.attrs["data-event"]);
  });
}

function queryParam(href, key) {
  try {
    return new URL(href, "https://www.floxant.de").searchParams.get(key) || "";
  } catch {
    return "";
  }
}

function hasExpectedParam(cta, key, value) {
  if (!value) return true;
  const fromHref = queryParam(cta.href, key);
  const attrKey = key === "intent" ? "data-page-intent" : `data-${key}`;
  const fromData = cta.attrs[attrKey] || "";
  if (fromHref === value || fromData === value) return true;
  if (key === "intent" && (fromHref || fromData)) return true;
  if (key === "service" && (fromHref || fromData)) return true;
  if (key === "service" && value === "angebot-pruefen") return ["angebot_pruefen", "offer-check"].includes(fromHref) || ["angebot_pruefen", "offer-check"].includes(fromData);
  return false;
}

function scoreContactCta(cta, expected) {
  if (normalizePath(cta.href) !== "/kontakt") return -1;
  return Object.entries(expected).reduce(
    (score, [key, value]) => score + (hasExpectedParam(cta, key, value) ? 2 : 0),
    String(cta.href || "").includes("?") ? 1 : 0,
  );
}

async function fetchRouteHtml(baseUrl, route) {
  const first = await fetchPath(baseUrl, route.path, { redirect: "manual" });
  if (ACCEPTED_REDIRECTS.has(first.status) && route.allowRedirect) {
    const target = normalizePath(first.location);
    const second = await fetchPath(baseUrl, target || first.location, { redirect: "manual" });
    return { response: second, html: second.body || "", finalPath: target || route.path };
  }
  return { response: first, html: first.body || "", finalPath: route.path };
}

async function main() {
  const { baseUrl, explicit } = reportBaseUrl();
  const results = [];
  const ctaRoutes = criticalRoutes.filter((route) => route.mustHaveCta && !route.nonHtml);

  for (const route of ctaRoutes) {
    const { response, html } = await fetchRouteHtml(baseUrl, route);
    if (!response.ok || response.status === 404 || response.status >= 500) {
      addResult(results, route.optional ? "WARN" : "FAIL", "cta", route.path, response.error || `HTTP ${response.status}`, "Route must be reachable before CTA checks can run.", { priority: route.priority });
      continue;
    }

    const anchors = collectAnchors(html);
    const ctas = findPrimaryCtas(anchors);
    if (!ctas.length) {
      addResult(results, route.optional ? "WARN" : "FAIL", "cta", route.path, "No primary CTA anchor found.", "Add a visible anchor CTA with href to /kontakt or an approved offer route.", { priority: route.priority });
      continue;
    }

    addResult(results, "PASS", "cta", route.path, `${ctas.length} CTA-like anchor(s) found.`, "No action.", { priority: route.priority });

    const linkCtas = ctas.filter((cta) => cta.href && cta.href !== "#");
    addResult(results, linkCtas.length ? "PASS" : "FAIL", "cta", route.path, linkCtas.length ? "CTA has real href." : "CTA appears onClick/hash-only.", linkCtas.length ? "No action." : "Use a real href for the primary CTA.", { priority: route.priority });

    const expected = expectedQuery(route);
    const localContactCta = ctas.find((cta) => String(cta.href || "") === "#kontakt" || String(cta.href || "") === `${route.path}#kontakt`);
    const contactCta = ctas
      .filter((cta) => normalizePath(cta.href) === "/kontakt")
      .sort((a, b) => scoreContactCta(b, expected) - scoreContactCta(a, expected))[0];
    if (!contactCta && !localContactCta) {
      addResult(results, "WARN", "cta-routing", route.path, "No direct /kontakt CTA found.", "Confirm the primary CTA reaches the canonical contact flow.", { priority: route.priority });
    } else if (localContactCta) {
      addResult(results, "PASS", "cta-routing", route.path, `Page-local contact target: ${localContactCta.href}`, "No action.", { priority: route.priority });
    } else {
      addResult(results, "PASS", "cta-routing", route.path, `Contact href: ${contactCta.href}`, "No action.", { priority: route.priority });

      for (const [key, value] of Object.entries(expected)) {
        const ok = hasExpectedParam(contactCta, key, value);
        addResult(results, ok ? "PASS" : "WARN", "cta-params", route.path, ok ? `${key}=${value} found.` : `${key}=${value} not found on primary contact CTA.`, ok ? "No action." : "Route through central CTA config or add the missing query/data attribute.", { priority: route.priority, ctaHref: contactCta.href });
      }
    }

    for (const cta of contactCta && !localContactCta ? [contactCta] : []) {
      const attrs = cta.attrs || {};
      const hasDataEvent = Boolean(attrs["data-event"]);
      const hasDataService = Boolean(attrs["data-service"]);
      const hasDataIntent = Boolean(attrs["data-page-intent"] || attrs["data-intent"]);
      const hasDataLabel = Boolean(attrs["data-cta-label"]);

      addResult(results, hasDataEvent || Boolean(cta.href) ? "PASS" : "WARN", "cta-data", route.path, hasDataEvent ? "data-event present." : "CTA uses a real link; tracking metadata is optional.", "No action.", { priority: route.priority, ctaText: cta.text, ctaHref: cta.href });
      const serviceContextOk = !expected.service || hasDataService || Boolean(queryParam(cta.href, "service"));
      addResult(results, serviceContextOk ? "PASS" : "WARN", "cta-data", route.path, hasDataService ? "data-service present." : expected.service ? "Service query parameter present." : "No service parameter required for this route.", serviceContextOk ? "No action." : "Add service context to the primary contact CTA.", { priority: route.priority, ctaText: cta.text, ctaHref: cta.href });
      if (route.expectedCity && !["deutschland", "bayern"].includes(route.expectedCity)) {
        const hasCity = Boolean(attrs["data-city"]) || queryParam(cta.href, "city") === route.expectedCity;
        addResult(results, hasCity ? "PASS" : "WARN", "cta-data", route.path, hasCity ? "data-city/city param present." : "Local route CTA missing city.", hasCity ? "No action." : "Add data-city or city query parameter.", { priority: route.priority, ctaText: cta.text, ctaHref: cta.href });
      }
      const intentContextOk = !expected.intent || hasDataIntent || Boolean(queryParam(cta.href, "intent"));
      addResult(results, intentContextOk ? "PASS" : "WARN", "cta-data", route.path, hasDataIntent ? "data-page-intent present." : expected.intent ? "Intent query parameter present." : "No intent parameter required for this route.", intentContextOk ? "No action." : "Add intent context to the primary contact CTA.", { priority: route.priority, ctaText: cta.text, ctaHref: cta.href });
      addResult(results, hasDataLabel || Boolean(cta.text) ? "PASS" : "WARN", "cta-data", route.path, hasDataLabel ? "data-cta-label present." : "Visible CTA label present.", hasDataLabel || cta.text ? "No action." : "Add a visible CTA label.", { priority: route.priority, ctaText: cta.text, ctaHref: cta.href });

      addResult(results, hasPiiInUrl(cta.href) ? "FAIL" : "PASS", "cta-pii", route.path, hasPiiInUrl(cta.href) ? `PII-like query key found in ${cta.href}` : "No PII-like query keys in CTA href.", hasPiiInUrl(cta.href) ? "Remove personal query parameters from CTA href." : "No action.", { priority: route.priority, ctaText: cta.text, ctaHref: cta.href });
    }

    const fakePhoneOrEmail = ctas.some((cta) => /^(tel:.*(0000|123456)|mailto:.*(test@example|fake|demo))/i.test(String(cta.href || "")));
    addResult(results, fakePhoneOrEmail ? "FAIL" : "PASS", "cta-content", route.path, fakePhoneOrEmail ? "Fake phone/email marker found in CTA." : "No fake phone/email marker in CTA text/href.", fakePhoneOrEmail ? "Remove fake contact detail." : "No action.", { priority: route.priority });
  }

  const output = writeReport({
    markdownPath: "QA_CTA_REPORT.md",
    jsonPath: "qa-cta-report.json",
    title: "QA CTA Report",
    summary: {
      baseUrl,
      baseUrlWasExplicit: explicit,
      routeCount: ctaRoutes.length,
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- Broken or missing primary CTAs on required P0 pages are RED.",
      "- Missing analytics/query attributes are YELLOW unless they break routing.",
      "- CTA hrefs must never carry personal data.",
    ],
  });

  console.log(`QA CTA status: ${output.status}`);
  console.log("Reports written: QA_CTA_REPORT.md, qa-cta-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
