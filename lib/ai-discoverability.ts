import { publicFacts } from "@/lib/entities/public-facts";
import { publicServices } from "@/lib/services/service-registry";
import { publicSignatureSolutions } from "@/lib/services/signature-solutions";

function uniqueSortedStrings(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right, "de"),
  );
}

function absolutePublicUrl(route: string | null): string | null {
  if (!route) return null;
  const origin = publicFacts.canonicalDomain.replace(/\/+$/, "");
  const pathname = route.startsWith("/") ? route : `/${route}`;
  return `${origin}${pathname}`;
}

const verifiedPublicServiceIds = new Set(
  publicFacts.verifiedServices.map(({ id }) => id),
);

const visibleServices = publicServices
  .filter(
    (service) =>
      service.publicVisible && verifiedPublicServiceIds.has(service.id),
  )
  .slice()
  .sort((left, right) => left.id.localeCompare(right.id, "de"));

const visibleServiceIds = new Set(visibleServices.map(({ id }) => id));

const visibleSignatureSolutions = publicSignatureSolutions
  .filter(({ publicAllowed }) => publicAllowed)
  .slice()
  .sort((left, right) => left.id.localeCompare(right.id, "de"));

/**
 * Public, deterministic service data for machine-readable discovery surfaces.
 * Internal evidence paths, owners, hidden services and unverified solutions are
 * deliberately excluded from this representation.
 */
export const serviceGraph = {
  version: 1,
  reviewedAt: publicFacts.reviewedAt,
  source: "FLOXANT publicFacts, publicServices and publicSignatureSolutions",
  organization: {
    name: publicFacts.organizationName,
    canonicalDomain: publicFacts.canonicalDomain,
    languages: uniqueSortedStrings(publicFacts.languages),
    addresses: publicFacts.verifiedAddresses
      .map(({ id, streetAddress, postalCode, city, state, country }) => ({
        id,
        streetAddress,
        postalCode,
        city,
        state,
        country,
      }))
      .sort((left, right) => left.id.localeCompare(right.id, "de")),
    phone: {
      display: publicFacts.verifiedPhone.display,
      e164: publicFacts.verifiedPhone.e164,
    },
    email: publicFacts.verifiedEmail.address,
    regions: publicFacts.verifiedRegions
      .map(({ id, name, kind }) => ({ id, name, kind }))
      .sort((left, right) => left.id.localeCompare(right.id, "de")),
    contactMethods: publicFacts.contactMethods
      .map(({ type, label, href }) => ({ type, label, href }))
      .sort(
        (left, right) =>
          left.type.localeCompare(right.type, "de") ||
          left.href.localeCompare(right.href, "de"),
      ),
    businessProfiles: publicFacts.businessProfiles
      .map(({ type, href }) => ({ type, href }))
      .sort((left, right) => left.type.localeCompare(right.type, "de")),
  },
  services: visibleServices.map((service) => ({
    id: service.id,
    slug: service.slug,
    status: service.status,
    category: service.category,
    cadence: service.cadence,
    locales: uniqueSortedStrings(service.locale),
    audienceTypes: uniqueSortedStrings(service.audienceTypes),
    names: {
      de: service.germanName,
      en: service.englishName,
    },
    title: service.shortTitle,
    headline: service.headline,
    summary: service.shortDescription,
    description: service.detailedDescription,
    problem: service.problemStatement,
    regions: uniqueSortedStrings(service.regions),
    targetAudiences: uniqueSortedStrings(service.targetAudiences),
    objectTypes: uniqueSortedStrings(service.objectTypes),
    scope: {
      included: uniqueSortedStrings(service.includedServices),
      optional: uniqueSortedStrings(service.optionalAddOns),
      excluded: uniqueSortedStrings(service.excludedServices),
    },
    request: {
      requiredDetails: uniqueSortedStrings(service.requiredDetails),
      effortDrivers: uniqueSortedStrings(service.effortDrivers),
      process: [...service.process],
    },
    cta: {
      label: service.cta.label,
      href: service.cta.href,
    },
    canonicalUrl: absolutePublicUrl(service.canonicalRoute),
    englishAlternativeUrl: absolutePublicUrl(service.englishAlternativeRoute),
    additionalUrls: uniqueSortedStrings(service.additionalRoutes)
      .map(absolutePublicUrl)
      .filter((url): url is string => Boolean(url)),
    hubUrls: uniqueSortedStrings(service.hubRoutes)
      .map(absolutePublicUrl)
      .filter((url): url is string => Boolean(url)),
    relatedServiceIds: uniqueSortedStrings(service.relatedServiceIds).filter(
      (id) => visibleServiceIds.has(id),
    ),
    signature: service.signature,
    specialSolution: service.specialSolution,
    evidenceStatus: service.evidenceStatus,
    lastReviewedAt: service.lastReviewedAt,
  })),
  signatureSolutions: visibleSignatureSolutions.map((solution) => ({
    id: solution.id,
    name: solution.name,
    kind: solution.kind,
    actualFunction: solution.actualFunction,
    targetGroups: uniqueSortedStrings(solution.targetGroups),
    problem: solution.problem,
    result: solution.result,
    process: [...solution.process],
    boundaries: uniqueSortedStrings(solution.boundaries),
    requiredDetails: uniqueSortedStrings(solution.requiredDetails),
    regions: uniqueSortedStrings(solution.regions),
    serviceIds: uniqueSortedStrings(solution.serviceIds).filter((id) =>
      visibleServiceIds.has(id),
    ),
    cta: {
      label: solution.cta.label,
      href: solution.cta.href,
    },
    canonicalUrl: absolutePublicUrl(solution.canonicalRoute),
    evidenceStatus: solution.evidenceStatus,
    lastReviewedAt: solution.lastReviewedAt,
  })),
  publicationPolicy: {
    publicOnly: true,
    includesPrivateData: false,
    rankingGuarantee: false,
    priceGuarantee: false,
    availabilityGuarantee: false,
  },
} as const;

export type ServiceGraph = typeof serviceGraph;

const organizationLines = [
  `# ${serviceGraph.organization.name}`,
  "",
  `Canonical: ${serviceGraph.organization.canonicalDomain}`,
  `Languages: ${serviceGraph.organization.languages.join(", ")}`,
  `Verified service regions: ${serviceGraph.organization.regions
    .map(({ name }) => name)
    .join(", ")}`,
  "",
  "## Public contact",
  ...serviceGraph.organization.contactMethods.map(
    ({ label, href }) => `- ${label}: ${href}`,
  ),
];

const serviceLines = serviceGraph.services.flatMap((service) => [
  `### ${service.names.de} / ${service.names.en}`,
  service.summary,
  `Regions: ${service.regions.join(", ") || "not region-specific"}`,
  `Public URL: ${service.canonicalUrl}`,
  `Request details: ${service.request.requiredDetails.join("; ")}`,
  `Boundaries: ${service.scope.excluded.join("; ")}`,
  "",
]);

const solutionLines = serviceGraph.signatureSolutions.flatMap((solution) => [
  `### ${solution.name}`,
  solution.actualFunction,
  `Result: ${solution.result}`,
  `Regions: ${solution.regions.join(", ") || "not region-specific"}`,
  `Boundaries: ${solution.boundaries.join("; ")}`,
  `Public URL: ${solution.canonicalUrl}`,
  "",
]);

/**
 * Human-readable companion to serviceGraph. It is generated only from the
 * already-filtered graph so its public scope cannot drift from the JSON data.
 */
export const llmsText = [
  ...organizationLines,
  "",
  "## Public services",
  ...serviceLines,
  "## Public signature solutions",
  ...solutionLines,
  "## Publication limits",
  "This document contains public business information only. It makes no ranking, price, availability or outcome guarantee.",
  "",
].join("\n");
