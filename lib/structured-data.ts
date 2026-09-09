import { company, duesseldorfCompany } from "@/lib/company";
import { germanizeText } from "@/lib/german-text";
import { LOCAL_SERVICE_RADIUS_KM } from "@/lib/service-area-policy";
import { getPublicRouteContext } from "@/lib/public-route-context";

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
    countryCode: string;
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
    /\d+\s*km/.test(normalized) ||
    normalized.includes("landkreis") ||
    normalized.includes("nahbereich") ||
    normalized.includes("servicegebiet") ||
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
    .map((item) => {
      const question = exactFaqText(item.q || item.question || "");
      const answer = exactFaqText(item.a || item.answer || "");

      if (!question.trim() || !answer.trim()) {
        return null;
      }

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
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
  const { location } = getPublicRouteContext(path);
  const regionalCompany = location === "duesseldorf" ? duesseldorfCompany : company;
  const serviceAreas = areaServed || (location
    ? [regionalCompany.city, `${regionalCompany.city} plus ${LOCAL_SERVICE_RADIUS_KM} km`]
    : ["Düsseldorf", "Regensburg"]);
  const serviceProvider = provider || {
    name: regionalCompany.name,
    url: regionalCompany.url,
    phoneRaw: regionalCompany.phoneRaw,
    streetAddress: regionalCompany.streetAddress,
    postalCode: regionalCompany.postalCode,
    city: regionalCompany.city,
    countryCode: regionalCompany.countryCode,
  };
  const providerEntity = provider
    ? {
        "@id": `${serviceProvider.url}#localbusiness`,
      }
    : {
        "@id": `${company.url}/#organization`,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: clean(name),
    description: clean(description),
    serviceType: clean(serviceType || name),
    url,
    areaServed: serviceAreas.map((area) =>
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
    provider: providerEntity,
  };
}

export function buildWebPageJsonLd({
  name,
  description,
  path,
  inLanguage = "de",
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
      "@id": `${company.url}/#website`,
    },
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
      "@id": `${company.url}/#organization`,
    },
    publisher: {
      "@id": `${company.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
    },
  };
}
