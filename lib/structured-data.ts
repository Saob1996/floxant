import { company } from "@/lib/company";
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
  areaServed?: string[];
  availableLanguage?: string[];
};

type WebPageJsonLdInput = {
  name: string;
  description: string;
  path: string;
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
      const question = clean(item.q || item.question || "");
      const answer = clean(item.a || item.answer || "");

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
  areaServed = ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern"],
  availableLanguage = ["de"],
}: ServiceJsonLdInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: clean(name),
    description: clean(description),
    serviceType: clean(serviceType || name),
    url,
    areaServed: areaServed.map((area) => ({
      "@type": schemaPlaceType(area),
      name: clean(area),
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: company.phoneRaw,
      },
      availableLanguage,
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": `${company.url}/#localbusiness`,
      name: company.name,
      url: company.url,
      telephone: company.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.streetAddress,
        addressLocality: company.city,
        postalCode: company.postalCode,
        addressCountry: company.countryCode,
      },
    },
  };
}

export function buildWebPageJsonLd({
  name,
  description,
  path,
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
    inLanguage: "de",
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
    inLanguage: "de",
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
