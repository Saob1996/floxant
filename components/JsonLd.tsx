import { i18n } from "../i18n-config";
import { company } from "@/lib/company";

export function JsonLd({ lang }: { lang: string }) {
    // Organization schema — Google uses this for the logo in search results
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "FLOXANT",
        "url": "https://www.floxant.de",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.floxant.de/logo_v10.png",
            "width": 600,
            "height": 200,
        },
        "image": "https://www.floxant.de/logo_v10.png",
        "sameAs": [
            "https://www.instagram.com/floxant"
        ],
    };

    // MovingCompany schema — detailed local business info
    const movingCompany = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "name": "FLOXANT",
        "image": "https://www.floxant.de/logo_v10.png",
        "logo": "https://www.floxant.de/logo_v10.png",
        "description": "Professionelles Umzugsunternehmen für Bayern. Spezialisiert auf Privatumzüge, Firmenumzüge, Entrümpelungen und Reinigungen. Operativer Schwerpunkt Regensburg & Oberpfalz.",
        "url": `https://www.floxant.de/${lang}`,
        "telephone": "+4915771105087",
        "email": company.email,
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+49-1577-1105087",
                "contactType": "customer support",
                "contactOption": ["TollFree"],
                "availableLanguage": ["German", "English", "Arabic", "Turkish"]
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Johanna-Kinkel-Straße 1 + 2",
            "addressLocality": "Regensburg",
            "postalCode": "93049",
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
            { "@type": "City", "name": "Passau" },
            { "@type": "City", "name": "Landshut" },
            { "@type": "City", "name": "Feucht" },
            { "@type": "City", "name": "Straubing" },
            { "@type": "City", "name": "Schwandorf" },
            { "@type": "City", "name": "Amberg" },
            { "@type": "City", "name": "Neumarkt in der Oberpfalz" },
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
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seniorenumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Studentenumzug" } },
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
        },
        "vatID": "DE45971484",
        "taxID": "103/5163/5231",
        "foundingDate": "2022",
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 5,
            "maxValue": 15
        },
        "paymentAccepted": "Bar, Überweisung, PayPal",
        "currenciesAccepted": "EUR",
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
        "availableLanguage": i18n.locales.map(locale => ({
            "@type": "Language",
            "name": locale,
            "alternateName": locale
        }))
    };

    // FAQPage schema - to occupy massive space in search results
    const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Arbeitet FLOXANT in ganz Bayern?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, wir betreuen ganz Bayern. Unser Fokus liegt auf der Oberpfalz (Regensburg), aber unsere Teams fahren regelmäßig nach München, Nürnberg und Augsburg."
                }
            },
            {
                "@type": "Question",
                "name": "Bieten Sie wirklich einen Festpreis?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolut. Nach einer kostenlosen Erstbesichtigung (auch via WhatsApp-Video möglich) erhalten Sie ein garantiertes Festpreisangebot ohne versteckte Nachkalkulationen."
                }
            },
            {
                "@type": "Question",
                "name": "Wie schnell bekommen wir einen Termin?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dank unserer großen Kapazitäten realisieren wir dringende Umzüge und Entrümpelungen oft innerhalb von 48 Stunden. Für reguläre Termine empfehlen wir 2-4 Wochen Vorlauf."
                }
            }
        ]
    };

    // WebSite schema — helps Google understand site structure
    const webSite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "FLOXANT",
        "url": "https://www.floxant.de",
        "inLanguage": lang,
        "publisher": {
            "@type": "Organization",
            "name": "FLOXANT",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.floxant.de/logo_v10.png",
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompany) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
            />
        </>
    );
}
