#!/usr/bin/env node

const assert = require("node:assert/strict");
const path = require("node:path");

const {
  analyzeHtmlDocument,
  analyzeHtmlDocuments,
  parseRedirectSourceRoutes,
  scanPublicSource,
} = require("./structured-data-policy.cjs");

const root = path.resolve(__dirname, "..");

function page({ schema, body = "", lang = "de", title = "FLOXANT", description = "Klare Leistungsbeschreibung", canonical = "" }) {
  const scripts = (Array.isArray(schema) ? schema : [schema])
    .map((value) => `<script type="application/ld+json">${typeof value === "string" ? value : JSON.stringify(value)}</script>`)
    .join("");
  const canonicalLink = canonical ? `<link rel="canonical" href="${canonical}">` : "";
  return `<!doctype html><html lang="${lang}"><head><title>${title}</title><meta name="description" content="${description}">${canonicalLink}${scripts}</head><body>${body}</body></html>`;
}

function schemaGraph(nodes) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function issueCodes(result) {
  return result.findings.map((item) => item.issue);
}

function expectIssue(name, input, expectedIssue) {
  const result = analyzeHtmlDocument(input);
  assert.ok(
    issueCodes(result).includes(expectedIssue),
    `${name}: expected ${expectedIssue}, received ${issueCodes(result).join(", ") || "no findings"}`,
  );
}

function expectClean(name, input) {
  const result = analyzeHtmlDocument(input);
  assert.deepEqual(result.findings, [], `${name}: ${JSON.stringify(result.findings, null, 2)}`);
}

const organization = {
  "@type": "Organization",
  "@id": "https://www.floxant.de/#organization",
  name: "FLOXANT",
  url: "https://www.floxant.de",
  sameAs: ["https://www.instagram.com/floxant_logistik"],
};

const localBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.floxant.de/#localbusiness",
  name: "FLOXANT",
  url: "https://www.floxant.de",
  telephone: "+4915771105087",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Johanna-Kinkel-Straße 1 + 2",
    postalCode: "93049",
    addressLocality: "Regensburg",
    addressCountry: "DE",
  },
};

expectClean("valid Organization and LocalBusiness", {
  route: "/leistung",
  html: page({ schema: schemaGraph([organization, localBusiness]), body: "<h1>FLOXANT Leistung</h1>" }),
});

expectClean("valid Service, WebPage, BreadcrumbList and WebSite", {
  route: "/leistung",
  html: page({
    schema: schemaGraph([
      {
        "@type": "Service",
        name: "Reinigung",
        description: "Reinigung passend zum Objekt anfragen.",
        url: "https://www.floxant.de/leistung",
        provider: { "@id": "https://www.floxant.de/#organization" },
        areaServed: [{ "@type": "City", name: "Regensburg" }],
      },
      {
        "@type": "WebPage",
        name: "Reinigung anfragen",
        description: "Reinigung passend zum Objekt anfragen.",
        url: "https://www.floxant.de/leistung",
        inLanguage: "de-DE",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: "https://www.floxant.de/" },
          { "@type": "ListItem", position: 2, name: "Leistung", item: "https://www.floxant.de/leistung" },
        ],
      },
      { "@type": "WebSite", name: "FLOXANT", url: "https://www.floxant.de" },
    ]),
    body: "<h1>Reinigung anfragen</h1><p>Reinigung passend zum Objekt anfragen.</p>",
  }),
});

for (const type of ["Article", "BlogPosting"]) {
  expectClean(`valid ${type}`, {
    route: "/ratgeber",
    html: page({
      schema: {
        "@context": "https://schema.org",
        "@type": type,
        headline: "Ratgeber für eine klare Anfrage",
        description: "Benötigte Angaben verständlich zusammenstellen.",
        url: "https://www.floxant.de/ratgeber",
        inLanguage: "de",
        datePublished: "2026-08-11",
        author: { "@type": "Organization", name: "FLOXANT" },
        publisher: { "@type": "Organization", name: "FLOXANT" },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.floxant.de/ratgeber#webpage" },
      },
      body: "<h1>Ratgeber für eine klare Anfrage</h1><p>Benötigte Angaben verständlich zusammenstellen.</p>",
    }),
  });
}

expectIssue("self-referential AggregateRating property", {
  route: "/",
  html: page({
    schema: {
      "@context": "https://schema.org",
      ...organization,
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "99" },
    },
  }),
}, "SELF_REFERENTIAL_REVIEW_SCHEMA");

expectIssue("Review schema", {
  route: "/",
  html: page({
    schema: schemaGraph([
      organization,
      { "@type": "Review", itemReviewed: { "@id": "https://www.floxant.de/#organization" }, reviewBody: "Sehr gut" },
    ]),
  }),
}, "SELF_REFERENTIAL_REVIEW_SCHEMA");

expectIssue("QAPage used for static FAQ", {
  route: "/fragen",
  html: page({ schema: { "@context": "https://schema.org", "@type": "QAPage", mainEntity: [] } }),
}, "QAPAGE_STATIC_FAQ");

const visibleFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Angaben werden benötigt?",
      acceptedAnswer: { "@type": "Answer", text: "Ort, Umfang und Terminwunsch helfen bei der Einordnung." },
    },
  ],
};

expectClean("visible matching FAQPage", {
  route: "/fragen",
  html: page({
    schema: visibleFaq,
    body: "<h1>Fragen</h1><h2>Welche Angaben werden benötigt?</h2><p>Ort, Umfang und Terminwunsch helfen bei der Einordnung.</p>",
  }),
});

expectClean("keyboard-expandable FAQ answer is user-visible server content", {
  route: "/fragen",
  html: page({
    schema: visibleFaq,
    body: '<h1>Fragen</h1><button aria-expanded="false" aria-controls="faq-answer">Welche Angaben werden benötigt?</button><div id="faq-answer" aria-hidden="true">Ort, Umfang und Terminwunsch helfen bei der Einordnung.</div>',
  }),
});

expectIssue("FAQ answer only in hidden content", {
  route: "/fragen",
  html: page({
    schema: visibleFaq,
    body: "<h1>Fragen</h1><h2>Welche Angaben werden benötigt?</h2><div hidden>Ort, Umfang und Terminwunsch helfen bei der Einordnung.</div>",
  }),
}, "FAQ_CONTENT_NOT_VISIBLE");

expectIssue("FAQ schema/content mismatch", {
  route: "/fragen",
  html: page({
    schema: visibleFaq,
    body: "<h1>Fragen</h1><h2>Welche Angaben werden benötigt?</h2><p>Eine andere Antwort steht sichtbar auf der Seite.</p>",
  }),
}, "FAQ_CONTENT_NOT_VISIBLE");

expectIssue("duplicate FAQ entry on one page", {
  route: "/fragen",
  html: page({
    schema: { ...visibleFaq, mainEntity: [...visibleFaq.mainEntity, ...visibleFaq.mainEntity] },
    body: "<h1>Fragen</h1><h2>Welche Angaben werden benötigt?</h2><p>Ort, Umfang und Terminwunsch helfen bei der Einordnung.</p>",
  }),
}, "FAQ_DUPLICATE_ENTRY");

expectIssue("star glyph in title", {
  route: "/",
  html: page({ schema: schemaGraph([organization]), title: "FLOXANT ★ 5 Sterne" }),
}, "STAR_RATING_IN_METADATA");

expectIssue("numeric star claim in description", {
  route: "/",
  html: page({ schema: schemaGraph([organization]), description: "FLOXANT mit 4,9 von 5 Sternen" }),
}, "STAR_RATING_IN_METADATA");

expectIssue("invalid JSON-LD", {
  route: "/",
  html: page({ schema: '{"@context":"https://schema.org","@type":"Organization",}' }),
}, "INVALID_JSON");

expectIssue("supported schema missing fields", {
  route: "/leistung",
  html: page({
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Reinigung",
      description: "Beschreibung",
      url: "https://www.floxant.de/leistung",
    },
  }),
}, "INVALID_SUPPORTED_SCHEMA");

expectIssue("service points at another route", {
  route: "/leistung",
  html: page({
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Reinigung",
      description: "Beschreibung",
      url: "https://www.floxant.de/andere-leistung",
      provider: { "@id": "https://www.floxant.de/#organization" },
      areaServed: "Regensburg",
    },
  }),
}, "SCHEMA_ROUTE_MISMATCH");

expectClean("schema follows an explicit canonical route", {
  route: "/alte-leistung",
  html: page({
    canonical: "https://www.floxant.de/leistung",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Reinigung",
      description: "Beschreibung",
      url: "https://www.floxant.de/leistung",
      provider: { "@id": "https://www.floxant.de/#organization" },
      areaServed: "Regensburg",
    },
  }),
});

expectClean("redirect source is excluded from canonical route mismatch", {
  route: "/alte-leistung",
  isRedirectAlias: true,
  html: page({
    canonical: "https://www.floxant.de/neue-leistung",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Reinigung",
      url: "https://www.floxant.de/alte-leistung",
      provider: { "@id": "https://www.floxant.de/#organization" },
      areaServed: "Regensburg",
    },
  }),
});

expectIssue("schema language differs from page", {
  route: "/leistung",
  html: page({
    lang: "de",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Cleaning",
      description: "Description",
      url: "https://www.floxant.de/leistung",
      inLanguage: "en",
    },
  }),
}, "SCHEMA_LANGUAGE_MISMATCH");

expectIssue("unverified positive guarantee", {
  route: "/",
  html: page({ schema: { "@context": "https://schema.org", ...organization, slogan: "Garantiert sofort verfügbar" } }),
}, "UNVERIFIED_GUARANTEE_CLAIM");

expectClean("negated guarantee is not a positive claim", {
  route: "/",
  html: page({ schema: { "@context": "https://schema.org", ...organization, description: "Keine Preis- oder Verfügbarkeitsgarantie." } }),
});

expectClean("negated guarantee verb is not a positive claim", {
  route: "/",
  html: page({ schema: { "@context": "https://schema.org", ...organization, description: "FLOXANT unterstützt organisatorisch, garantiert aber keinen Verkaufserfolg." } }),
});

expectIssue("placeholder sameAs profile", {
  route: "/",
  html: page({ schema: { "@context": "https://schema.org", ...organization, sameAs: ["https://example.com/floxant"] } }),
}, "UNVERIFIED_SAMEAS_PROFILE");

const duplicateBlockResult = analyzeHtmlDocuments([
  {
    route: "/faq-a",
    html: page({ schema: visibleFaq, body: "<h2>Welche Angaben werden benötigt?</h2><p>Ort, Umfang und Terminwunsch helfen bei der Einordnung.</p>" }),
  },
  {
    route: "/faq-b",
    html: page({ schema: visibleFaq, body: "<h2>Welche Angaben werden benötigt?</h2><p>Ort, Umfang und Terminwunsch helfen bei der Einordnung.</p>" }),
  },
]);
assert.ok(issueCodes(duplicateBlockResult).includes("FAQ_BLOCK_DUPLICATED_ACROSS_ROUTES"));

const sharedQuestion = visibleFaq.mainEntity[0];
const massDuplicateResult = analyzeHtmlDocuments(["a", "b", "c"].map((suffix) => ({
  route: `/faq-${suffix}`,
  html: page({
    schema: {
      ...visibleFaq,
      mainEntity: [
        sharedQuestion,
        {
          "@type": "Question",
          name: `Welche Besonderheit gilt für ${suffix.toUpperCase()}?`,
          acceptedAnswer: { "@type": "Answer", text: `Die Antwort ${suffix.toUpperCase()} gilt nur auf dieser Seite.` },
        },
      ],
    },
    body: `<h2>Welche Angaben werden benötigt?</h2><p>Ort, Umfang und Terminwunsch helfen bei der Einordnung.</p><h2>Welche Besonderheit gilt für ${suffix.toUpperCase()}?</h2><p>Die Antwort ${suffix.toUpperCase()} gilt nur auf dieser Seite.</p>`,
  }),
})));
assert.ok(issueCodes(massDuplicateResult).includes("FAQ_ENTRY_MASS_DUPLICATED"));

const redirectSources = parseRedirectSourceRoutes(`
# Cloudflare redirect aliases
/alte-leistung /neue-leistung 308
/erzwungen /ziel 301!
/wildcard/* /ziel/:splat 308
`);
assert.deepEqual([...redirectSources].sort(), ["/alte-leistung", "/erzwungen"]);

const source = scanPublicSource(root);
assert.deepEqual(source.findings, [], `Public-source structured-data policy failed:\n${JSON.stringify(source.findings, null, 2)}`);

console.log(JSON.stringify({
  status: "PASS",
  fixtureAssertions: 27,
  sourceFilesScanned: source.filesScanned,
  selfReferentialAggregateRating: 0,
  qAPageForStaticFaq: 0,
  starsInPublicSource: 0,
  newDirectFaqPageEmitters: 0,
}, null, 2));
