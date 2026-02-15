import { i18n } from "../i18n-config";
import { company } from "@/lib/company";

export function JsonLd({ lang }: { lang: string }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "name": "FLOXANT",
        "image": "https://floxant.de/logo.png",
        "description": "Professionelles Umzugsunternehmen für Bayern und deutschlandweite Fernumzüge. Spezialisiert auf Privatumzüge, Firmenumzüge und Entrümpelungen.",
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
            "latitude": 51.2217,
            "longitude": 6.7766
        },
        "areaServed": [
            { "@type": "AdministrativeArea", "name": "Bavaria" },
            { "@type": "AdministrativeArea", "name": "North Rhine-Westphalia" },
            { "@type": "Country", "name": "Germany" }
        ],
        "serviceArea": [
            { "@type": "City", "name": "München" },
            { "@type": "City", "name": "Nürnberg" },
            { "@type": "City", "name": "Augsburg" },
            { "@type": "City", "name": "Regensburg" },
            { "@type": "City", "name": "Ingolstadt" },
            { "@type": "City", "name": "Düsseldorf" },
            { "@type": "City", "name": "Köln" }
        ],
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
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
