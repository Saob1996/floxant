import { publicFacts } from "@/lib/entities/public-facts";
import {
  publicServices,
  selectPublicServiceFields,
} from "@/lib/services/service-registry";
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

const verifiedPublicServiceRoutes = new Set(
  publicFacts.verifiedServices.map(({ canonicalRoute }) => canonicalRoute),
);

const visibleServices = publicServices
  .filter(
    (service) =>
      service.publicVisible && verifiedPublicServiceRoutes.has(service.canonicalRoute),
  )
  .map((service) => selectPublicServiceFields(service))
  .slice()
  .sort((left, right) => left.publicRoute.localeCompare(right.publicRoute, "de"));

const visibleSignatureSolutions = publicSignatureSolutions
  .filter(({ publicAllowed }) => publicAllowed)
  .slice()
  .sort((left, right) => left.name.localeCompare(right.name, "de"));

/**
 * Public, deterministic service data for machine-readable discovery surfaces.
 * Internal evidence paths, owners, hidden services and unverified solutions are
 * deliberately excluded from this representation.
 */
export const serviceGraph = {
  version: 1,
  organization: {
    name: publicFacts.organizationName,
    canonicalDomain: publicFacts.canonicalDomain,
    languages: uniqueSortedStrings(publicFacts.languages),
    addresses: publicFacts.verifiedAddresses
      .map(({ streetAddress, postalCode, city, state, country }) => ({
        streetAddress,
        postalCode,
        city,
        state,
        country,
      }))
      .sort((left, right) => left.city.localeCompare(right.city, "de")),
    phone: {
      display: publicFacts.verifiedPhone.display,
      e164: publicFacts.verifiedPhone.e164,
    },
    email: publicFacts.verifiedEmail.address,
    regions: publicFacts.verifiedRegions
      .map(({ name }) => name)
      .sort((left, right) => left.localeCompare(right, "de")),
    contactMethods: publicFacts.contactMethods
      .map(({ label, href }) => ({ label, href }))
      .sort(
        (left, right) =>
          left.label.localeCompare(right.label, "de") ||
          left.href.localeCompare(right.href, "de"),
      ),
    businessProfiles: publicFacts.businessProfiles
      .map(({ type, href }) => ({ label: type === "instagram" ? "Instagram" : "Facebook", href }))
      .sort((left, right) => left.label.localeCompare(right.label, "de")),
  },
  services: visibleServices.map((service) => ({
    names: {
      de: service.publicTitle,
      en: service.publicEnglishTitle,
    },
    title: service.publicLabel,
    headline: service.publicHeadline,
    description: service.publicDescription,
    regions: uniqueSortedStrings(service.publicRegions),
    suitableFor: uniqueSortedStrings(service.publicTargetAudiences),
    benefits: uniqueSortedStrings(service.publicBenefits),
    requiredDetails: uniqueSortedStrings(service.publicRequirements),
    cta: {
      label: service.publicCta.label,
      href: service.publicCta.href,
    },
    url: absolutePublicUrl(service.publicRoute),
    englishUrl: absolutePublicUrl(service.publicEnglishRoute),
  })),
  signatureSolutions: visibleSignatureSolutions.map((solution) => ({
    name: solution.name,
    description: solution.actualFunction,
    targetGroups: uniqueSortedStrings(solution.targetGroups),
    problem: solution.problem,
    result: solution.result,
    process: [...solution.process],
    boundaries: uniqueSortedStrings(solution.boundaries),
    requiredDetails: uniqueSortedStrings(solution.requiredDetails),
    regions: uniqueSortedStrings(solution.regions),
    cta: {
      label: solution.cta.label,
      href: solution.cta.href,
    },
    url: absolutePublicUrl(solution.canonicalRoute),
  })),
} as const;

export type ServiceGraph = typeof serviceGraph;

const organizationLines = [
  `# ${serviceGraph.organization.name}`,
  "",
  `Website: ${serviceGraph.organization.canonicalDomain}`,
  `Languages: ${serviceGraph.organization.languages.join(", ")}`,
  `Verified service regions: ${serviceGraph.organization.regions.join(", ")}`,
  "",
  "## Public contact",
  ...serviceGraph.organization.contactMethods.map(
    ({ label, href }) => `- ${label}: ${href}`,
  ),
];

const serviceLines = serviceGraph.services.flatMap((service) => [
  `### ${service.names.de} / ${service.names.en}`,
  service.description,
  `Regions: ${service.regions.join(", ") || "not region-specific"}`,
  `Public URL: ${service.url}`,
  `Request details: ${service.requiredDetails.join("; ")}`,
  "",
]);

const solutionLines = serviceGraph.signatureSolutions.flatMap((solution) => [
  `### ${solution.name}`,
  solution.description,
  `Result: ${solution.result}`,
  `Regions: ${solution.regions.join(", ") || "not region-specific"}`,
  `Boundaries: ${solution.boundaries.join("; ")}`,
  `Public URL: ${solution.url}`,
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
  "## Service limits",
  "Prices, availability and results are confirmed only after the supplied details have been checked.",
  "",
].join("\n");
