import { i18n } from "../i18n-config";
import { company } from "@/lib/company";

export function JsonLd({ lang }: { lang: string }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "name": "FLOXANT",
        "image": "https://floxant.de/logo.png",
        "description": "Professionelles Umzugsunternehmen für Bayern. Spezialisiert auf Privatumzüge, Firmenumzüge, Entrümpelungen und Reinigungen. Operativer Schwerpunkt Regensburg & Oberpfalz.",
        "url": `https://floxant.de/${lang}`,
        "telephone": "+4915771105087",
        "email": company.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Breite Straße 22",
            "addressLocality": "Düsseldorf",
            "postalCode": "40213",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 49.0134,
            "longitude": 12.1016
        },
        "areaServed": [
            { "@type": "State", "name": "Bayern" },
            { "@type": "AdministrativeArea", "name": "Oberpfalz" },
            { "@type": "Country", "name": "Germany" }
        ],
        "serviceArea": [
            { "@type": "City", "name": "Regensburg" },
            { "@type": "City", "name": "Nürnberg" },
            { "@type": "City", "name": "München" },
            { "@type": "City", "name": "Augsburg" },
            { "@type": "City", "name": "Feucht" },
            { "@type": "City", "name": "Ingolstadt" },
            { "@type": "City", "name": "Düsseldorf" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Umzugs- und Reinigungsdienstleistungen",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Büroumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fernumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Entrümpelung" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reinigung" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wohnungsauflösung" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24h Umzugsservice" } },
            ]
        },
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/floxant"
        ],
        "availableLanguage": i18n.locales.map(locale => ({
            "@type": "Language",
            "name": locale,
            "alternateName": locale
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
