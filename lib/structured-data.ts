import { company, duesseldorfCompany } from "@/lib/company";
import { germanizeText } from "@/lib/german-text";

type BreadcrumbEntry = {
  name: string;
  item?: string;
};

type FaqEntry = {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
};

type ServiceJsonLdInput = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: Array<string | Record<string, unknown>>;
  availableLanguage?: string[];
  provider?: {
    name: string;
    url: string;
    phoneRaw: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    state?: string;
    countryCode: string;
    geo?: { lat: number; lng: number };
  };
};

type WebPageJsonLdInput = {
  name: string;
  description: string;
  path: string;
  inLanguage?: "de" | "en";
  about?: string[];
  potentialActions?: Array<{
    name: string;
    target: string;
    type?: "Action" | "ContactAction";
  }>;
};

type ArticleJsonLdInput = {
  headline: string;
  description: string;
  path: string;
  inLanguage?: "de" | "en";
  datePublished: string;
  dateModified?: string;
};

function absoluteUrl(path: string) {
  if (!path) {
    return company.url;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${company.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function clean(value: string) {
  return germanizeText(value || "").replace(/\s+/g, " ").trim();
}

function exactFaqText(value: string) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function schemaPlaceType(area: string) {
  const normalized = clean(area).toLowerCase();

  if (normalized === "bayern" || normalized === "baden-württemberg") {
    return "State";
  }

  if (
    normalized.includes("oberpfalz") ||
    normalized.includes("niederbayern") ||
    normalized.includes("umgebung") ||
    normalized.includes("200 km") ||
    normalized.includes("nahbereich") ||
    normalized.includes("servicegebiet") ||
    normalized.includes("einsatzgebiet") ||
    normalized.includes("nach verfügbarkeit") ||
    normalized.includes("nach verfuegbarkeit")
  ) {
    return "AdministrativeArea";
  }

  return "City";
}

export function buildBreadcrumbJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: clean(item.name),
      ...(item.item ? { item: absoluteUrl(item.item) } : {}),
    })),
  };
}

export function buildFaqJsonLd(items: readonly FaqEntry[]) {
  const faqItems = items
    .map((item, index) => {
      const question = exactFaqText(item.q || item.question || "");
      const answer = exactFaqText(item.a || item.answer || "");

      if (!question.trim() || !answer.trim()) {
        return null;
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        name: question,
        description: answer,
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Häufige Fragen",
    itemListElement: faqItems,
  };
}

export function buildServiceJsonLd({
  name,
  description,
  path,
  serviceType,
  areaServed,
  availableLanguage = ["de"],
  provider,
}: ServiceJsonLdInput) {
  const url = absoluteUrl(path);
  const isDuesseldorf = path.toLowerCase().includes("duesseldorf");
  const defaultProvider = isDuesseldorf ? duesseldorfCompany : company;
  const serviceProvider = provider || defaultProvider;
  const resolvedAreas =
    areaServed ||
    (isDuesseldorf
      ? ["Düsseldorf", "Verifiziertes 75-km-Einsatzgebiet um Düsseldorf"]
      : ["Regensburg", "Verifiziertes 75-km-Einsatzgebiet um Regensburg"]);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: clean(name),
    description: clean(description),
    serviceType: clean(serviceType || name),
    url,
    areaServed: resolvedAreas.map((area) =>
      typeof area === "string"
        ? {
            "@type": schemaPlaceType(area),
            name: clean(area),
          }
        : area,
    ),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: serviceProvider.phoneRaw,
      },
      availableLanguage,
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": `${serviceProvider.url}#localbusiness`,
      name: serviceProvider.name,
      url: serviceProvider.url,
      telephone: serviceProvider.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: serviceProvider.streetAddress,
        addressLocality: serviceProvider.city,
        ...(serviceProvider.state ? { addressRegion: serviceProvider.state } : {}),
        postalCode: serviceProvider.postalCode,
        addressCountry: serviceProvider.countryCode,
      },
      ...(serviceProvider.geo
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: serviceProvider.geo.lat,
              longitude: serviceProvider.geo.lng,
            },
          }
        : {}),
    },
  };
}

export function buildWebPageJsonLd({
  name,
  description,
  path,
  inLanguage = "de",
  about = [],
  potentialActions = [],
}: WebPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name: clean(name),
    description: clean(description),
    url: absoluteUrl(path),
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${company.url}/#website`,
      name: company.name,
      url: company.url,
    },
    about: about.map((entry) => ({
      "@type": "Thing",
      name: clean(entry),
    })),
    ...(potentialActions.length
      ? {
         potentialAction: potentialActions.map((action) => ({
           "@type": action.type || "Action",
           name: clean(action.name),
           target: absoluteUrl(action.target),
         })),
       }
      : {}),
  };
}

export function buildArticleJsonLd({
  headline,
  description,
  path,
  inLanguage = "de",
  datePublished,
  dateModified,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: clean(headline),
    description: clean(description),
    url: absoluteUrl(path),
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage,
    image: `${company.url}/opengraph-image`,
    author: {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
      name: company.name,
      url: company.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
      name: company.name,
      url: company.url,
      logo: {
        "@type": "ImageObject",
        url: `${company.url}/logo_v10.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
    },
  };
}
