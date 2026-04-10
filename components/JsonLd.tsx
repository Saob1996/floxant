import { company } from "@/lib/company";
import type { Locale } from "@/i18n-config";

const LANGUAGE_LABELS: Record<Locale, string> = {
    de: "de",
    en: "en",
    ru: "ru",
};

const LOCALIZED_DESCRIPTIONS: Record<Locale, string> = {
    de: "Professionelles Umzugsunternehmen für Bayern mit Schwerpunkt Regensburg. Leistungen rund um Umzug, Entrümpelung und Reinigung.",
    en: "Professional moving company for Bavaria with a focus on Regensburg. Services for moving, clearance and cleaning.",
    ru: "Профессиональная компания по переездам в Баварии с фокусом на Регенсбург. Услуги по переезду, очистке и вывозу вещей.",
};

const LOCALIZED_CATALOG_NAMES: Record<Locale, string> = {
    de: "Umzugs-, Reinigungs- und Entrümpelungsleistungen",
    en: "Moving, cleaning and clearance services",
    ru: "Услуги по переезду, уборке и вывозу вещей",
};

const LOCALIZED_SLOGANS: Record<Locale, string> = {
    de: "Umzug, Reinigung und Entrümpelung in Bayern",
    en: "Moving, cleaning and clearance in Bavaria",
    ru: "Переезд, уборка и вывоз вещей в Баварии",
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
        "Офисный переезд",
        "Междугородний переезд",
        "Вывоз вещей",
        "Уборка",
        "Освобождение квартиры",
        "24-часовой сервис переезда",
    ],
};

export function JsonLd({ lang }: { lang: Locale }) {
    const canonicalBaseUrl = `${company.url}/${lang}`;
    const organizationId = `${company.url}/#organization`;
    const websiteId = `${company.url}/#website`;
    const movingCompanyId = `${canonicalBaseUrl}/#moving-company`;
    const logoUrl = `${company.url}/logo_v10.png`;

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: company.name,
                url: company.url,
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
                        availableLanguage: [LANGUAGE_LABELS[lang]],
                    },
                ],
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: company.url,
                name: company.name,
                inLanguage: LANGUAGE_LABELS[lang],
                publisher: {
                    "@id": organizationId,
                },
            },
            {
                "@type": "MovingCompany",
                "@id": movingCompanyId,
                name: company.name,
                url: canonicalBaseUrl,
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
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: 49.0134,
                    longitude: 12.1016,
                },
                areaServed: [
                    { "@type": "City", name: "Regensburg" },
                    { "@type": "AdministrativeArea", name: "Oberpfalz" },
                    { "@type": "State", name: "Bayern" },
                    { "@type": "Country", name: "Deutschland" },
                ],
                serviceArea: [
                    { "@type": "City", name: "Regensburg" },
                    { "@type": "City", name: "München" },
                    { "@type": "City", name: "Nürnberg" },
                    { "@type": "City", name: "Augsburg" },
                    { "@type": "City", name: "Passau" },
                    { "@type": "City", name: "Landshut" },
                    { "@type": "City", name: "Straubing" },
                    { "@type": "City", name: "Schwandorf" },
                    { "@type": "City", name: "Amberg" },
                ],
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: LOCALIZED_CATALOG_NAMES[lang],
                    itemListElement: LOCALIZED_SERVICE_NAMES[lang].map((serviceName) => ({
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: serviceName,
                        },
                    })),
                },
                paymentAccepted: "Bar, Überweisung, PayPal",
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
                    "https://maps.google.com/?q=FLOXANT+Regensburg+Johanna-Kinkel-Stra%C3%9Fe+1",
                slogan: LOCALIZED_SLOGANS[lang],
                availableLanguage: [LANGUAGE_LABELS[lang]],
                parentOrganization: {
                    "@id": organizationId,
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}