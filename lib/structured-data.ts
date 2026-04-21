import { company } from "@/lib/company";

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
};

type WebPageJsonLdInput = {
    name: string;
    description: string;
    path: string;
    about?: string[];
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

export function buildBreadcrumbJsonLd(items: BreadcrumbEntry[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.item ? { item: absoluteUrl(item.item) } : {}),
        })),
    };
}

export function buildFaqJsonLd(items: FaqEntry[]) {
    const faqItems = items
        .map((item) => {
            const question = item.q || item.question || "";
            const answer = item.a || item.answer || "";

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
    areaServed = ["Regensburg", "Bayern"],
}: ServiceJsonLdInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: serviceType || name,
        url: absoluteUrl(path),
        areaServed: areaServed.map((area) => ({
            "@type": area === "Bayern" || area === "Baden-Württemberg" ? "State" : "City",
            name: area,
        })),
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
}: WebPageJsonLdInput) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        name,
        description,
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
            name: entry,
        })),
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
        headline,
        description,
        url: absoluteUrl(path),
        datePublished,
        dateModified: dateModified || datePublished,
        inLanguage: "de",
        author: {
            "@type": "Organization",
            name: company.name,
            url: company.url,
        },
        publisher: {
            "@type": "Organization",
            name: company.name,
            url: company.url,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${absoluteUrl(path)}#webpage`,
        },
    };
}
