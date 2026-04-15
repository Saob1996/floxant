import { company } from "@/lib/company";
import type { Locale } from "@/i18n-config";

const LANGUAGE_LABELS: Record<Locale, string> = {
    de: "de",
    en: "en",
    ru: "ru",
    bg: "bg",
};

const LOCALIZED_DESCRIPTIONS: Record<Locale, string> = {
    de: "Professionelles Umzugsunternehmen für Bayern mit Schwerpunkt Regensburg. Leistungen rund um Umzug, Entrümpelung und Reinigung.",
    en: "Professional moving company for Bavaria with a focus on Regensburg. Services for moving, clearance and cleaning.",
    ru: "Профессиональная компания по переездам в Баварии с фокусом на Регенсбург. Услуги по переезду, очистке и вывозу вещей.",
    bg: "Професионална фирма за преместване в Бавария с фокус върху Регенсбург. Услуги за преместване, почистване и разчистване.",
};

const LOCALIZED_CATALOG_NAMES: Record<Locale, string> = {
    de: "Umzugs-, Reinigungs- und Entrümpelungsleistungen",
    en: "Moving, cleaning and clearance services",
    ru: "Услуги по переезду, уборке и вывозу вещей",
    bg: "Услуги за преместване, почистване и разчистване",
};

const LOCALIZED_SLOGANS: Record<Locale, string> = {
    de: "Umzug, Reinigung und Entrümpelung in Bayern",
    en: "Moving, cleaning and clearance in Bavaria",
    ru: "Переезд, уборка и вывоз вещей в Баварии",
    bg: "Преместване, почистване и разчистване в Бавария",
};

const LOCALIZED_SERVICE_NAMES: Record<
    Locale,
    readonly string[]
> = {
    de: [
        "Privatumzug",
        "Büroumzug",
        "Fernumzug",
        "Entrümpelung",
        "Reinigung",
        "Wohnungsauflösung",
        "24h Umzugsservice",
    ],
    en: [
        "Residential moving",
        "Office moving",
        "Long-distance moving",
        "Clearance",
        "Cleaning",
        "Apartment clearance",
        "24h moving service",
    ],
    ru: [
        "Частный переезд",
        "Переезд офиса",
        "Междугородний переезд",
        "Вывоз мусора",
        "Уборка",
        "Освобождение квартиры",
        "24-часовой сервис",
    ],
    bg: [
        "Частно преместване",
        "Офис преместване",
        "Преместване на дълги разстояния",
        "Разчистване",
        "Почистване",
        "Разчистване на жилища",
        "24-часов логистичен сервиз",
    ],
};

export function JsonLd({ lang }: { lang: Locale }) {
    const baseUrl = company.url;
    const localizedUrl = `${baseUrl}/${lang}`;
    const organizationId = `${baseUrl}/#organization`;
    const websiteId = `${baseUrl}/#website`;
    const movingCompanyId = `${localizedUrl}/#moving-company`;
    const logoUrl = `${baseUrl}/logo_v10.png`;

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: company.name,
                url: baseUrl,
                logo: {
                    "@type": "ImageObject",
                    url: logoUrl,
                    width: 600,
                    height: 200,
                },
                image: logoUrl,
                sameAs: ["https://www.instagram.com/floxant"],
                contactPoint: [
                    {
                        "@type": "ContactPoint",
                        telephone: company.phoneRaw,
                        contactType: "customer support",
                        areaServed: "DE",
                        availableLanguage: ["German", "English", "Russian", "Bulgarian"],
                    },
                ],
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: baseUrl,
                name: company.name,
                inLanguage: lang,
                publisher: {
                    "@id": organizationId,
                },
            },
            {
                "@type": "MovingCompany",
                "@id": movingCompanyId,
                name: company.name,
                url: localizedUrl,
                image: logoUrl,
                logo: logoUrl,
                description: LOCALIZED_DESCRIPTIONS[lang],
                telephone: company.phoneRaw,
                email: company.email,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: company.streetAddress,
                    addressLocality: company.city,
                    postalCode: company.postalCode,
                    addressCountry: company.countryCode,
                },
                review: [
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "Sabine T." },
                        "datePublished": "2026-03-24",
                        reviewBody: lang === "de" ? "Top Umzugsservice in München!" : lang === "bg" ? "Топ услуга за преместване в Мюнхен!" : "Top moving service in Munich!",
                        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
                    },
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "Thomas Berger" },
                        "datePublished": "2026-04-01",
                        reviewBody: lang === "de" ? "Sehr professionelle Reinigung." : lang === "bg" ? "Много професионално почистване." : "Very professional cleaning.",
                        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
                    }
                ],
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "135",
                    bestRating: "5",
                    worstRating: "1",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: 49.0134,
                    longitude: 12.1016,
                },
                areaServed: [
                    { "@type": "City", "name": "Regensburg" },
                    { "@type": "City", "name": "München" },
                    { "@type": "City", "name": "Nürnberg" },
                    { "@type": "AdministrativeArea", "name": "Oberpfalz" },
                    { "@type": "State", "name": "Bayern" },
                    { "@type": "Country", "name": "Deutschland" },
                ],
                serviceArea: [
                    { "@type": "City", "name": "Regensburg" },
                    { "@type": "City", "name": "München" },
                    { "@type": "City", "name": "Nürnberg" },
                    { "@type": "City", "name": "Augsburg" },
                    { "@type": "City", "name": "Passau" },
                    { "@type": "Landshut" },
                ],
                knowsAbout: [
                    "Relocation Logistics",
                    "Industrial Cleaning",
                    "Waste Management",
                    "Furniture Assembly"
                ],
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: LOCALIZED_CATALOG_NAMES[lang],
                    itemListElement: LOCALIZED_SERVICE_NAMES[lang].map((serviceName) => ({
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: serviceName,
                            "areaServed": "DE"
                        },
                    })),
                },
                paymentAccepted: "Bar, Überweisung, PayPal, Rechnung",
                currenciesAccepted: "EUR",
                priceRange: "$$",
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                        ],
                        opens: "07:00",
                        closes: "21:00",
                    },
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: "Saturday",
                        opens: "08:00",
                        closes: "20:00",
                    },
                ],
                hasMap:
                    "https://maps.app.goo.gl/3fX3X3X3X3X3X3X3X", // Example Maps Link
                slogan: LOCALIZED_SLOGANS[lang],
                availableLanguage: ["German", "English", "Russian", "Bulgarian"],
                parentOrganization: {
                    "@id": organizationId,
                },
            },
            {
                "@type": "WebApplication",
                "@id": `${localizedUrl}/#calculator`,
                "name": lang === "de" ? "Umzugskosten Rechner Bayern" : lang === "ru" ? "Калькулятор стоимости переезда" : lang === "bg" ? "Калкулатор за разходи за преместване Бавария" : "Moving Cost Calculator Bavaria",
                "url": `${localizedUrl}/#contact`,
                "applicationCategory": "BusinessApplication, Calculator",
                "operatingSystem": "All",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "EUR"
                },
                "browserRequirements": "requires HTML5 support",
                "description": lang === "de" 
                    ? "Kostenloser Online-Rechner für Umzüge, Reinigung und Entrümpelung in Bayern. Erhalten Sie sofort eine präzise Preiskalkulation."
                    : lang === "ru"
                    ? "Бесплатный онлайн-калькулятор переездов, уборки и вывоза мусора в Баварии. Получите мгновенную оценку стоимости."
                    : lang === "bg"
                    ? "Безплатен онлайн калкулатор за преместване, почистване и разчистване в Бавария. Получете веднага точна калкулация."
                    : "Free online calculator for moving, cleaning and clearance in Bavaria. Get an instant price estimate."
            }
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}