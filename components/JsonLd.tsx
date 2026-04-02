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
            { "@type": "State", "name": "Bavaria" },
            { "@type": "AdministrativeArea", "name": "Oberpfalz" },
            { "@type": "AdministrativeArea", "name": "Niederbayern" },
            { "@type": "AdministrativeArea", "name": "Oberbayern" },
            { "@type": "AdministrativeArea", "name": "Mittelfranken" },
            { "@type": "AdministrativeArea", "name": "Schwaben" },
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
            { "@type": "City", "name": "Kelheim" },
            { "@type": "City", "name": "Cham" },
            { "@type": "City", "name": "Weiden in der Oberpfalz" },
            { "@type": "City", "name": "Ingolstadt" },
            { "@type": "City", "name": "Erlangen" },
            { "@type": "City", "name": "Fürth" },
            { "@type": "City", "name": "Dachau" },
            { "@type": "City", "name": "Freising" },
            { "@type": "City", "name": "Erding" },
            { "@type": "City", "name": "Deggendorf" },
            { "@type": "City", "name": "Neutraubling" },
            { "@type": "City", "name": "Lappersdorf" },
            { "@type": "City", "name": "Regenstauf" },
            { "@type": "City", "name": "Hemau" },
            { "@type": "City", "name": "Parsberg" },
            { "@type": "City", "name": "Burglengenfeld" },
            { "@type": "City", "name": "Maxhütte-Haidhof" },
            { "@type": "City", "name": "Nittendorf" },
            { "@type": "City", "name": "Schierling" },
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
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Dr. Michael M." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Top organisiert! Der Büroumzug lief absolut reibungslos. Das Team war pünktlich, professionell und hat unsere sensiblen Akten perfekt behandelt.",
                "datePublished": "2026-03-15"
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Sabine T." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Kurzfristige Entrümpelung unseres Hauses nach einem Trauerfall. Die Mitarbeiter waren extrem empathisch, diskret und der Festpreis wurde exakt eingehalten.",
                "datePublished": "2026-02-20"
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Thomas Berger" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Wahnsinnig schnell und sauber. Die gebuchte Endreinigung mit Abnahmegarantie hat mir bei der Wohnungsübergabe extrem viel Stress erspart.",
                "datePublished": "2025-12-10"
            }
        ],
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
                "opens": "07:00",
                "closes": "21:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "08:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "09:00",
                "closes": "18:00",
                "description": "Notfall-Service und geplante Umzüge"
            }
        ],
        "hasMap": "https://maps.google.com/?q=FLOXANT+Regensburg+Johanna-Kinkel-Straße+1",
        "slogan": "Die Architekten Ihrer Veränderung – Umzug, Reinigung & Entrümpelung in Bayern",
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
                    "text": "Ja, wir betreuen ganz Bayern. Unser Fokus liegt auf der Oberpfalz (Regensburg), aber unsere Teams fahren regelmäßig nach München, Nürnberg, Augsburg, Passau, Landshut, Straubing, Schwandorf, Amberg und in alle weiteren Städte Bayerns."
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
            },
            {
                "@type": "Question",
                "name": "Was kostet ein Umzug in Regensburg?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ein lokaler Umzug in Regensburg kostet zwischen 400 und 2.500 Euro je nach Wohnungsgröße, Etage und Entfernung. Nach einer kostenlosen Besichtigung erhalten Sie ein verbindliches Festpreisangebot."
                }
            },
            {
                "@type": "Question",
                "name": "Bietet FLOXANT auch Reinigung und Entrümpelung an?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja. FLOXANT bietet Umzug, professionelle Endreinigung und fachgerechte Entrümpelung aus einer Hand in ganz Bayern. Ideal für Wohnungsübergaben, Nachlassräumungen und Komplettsanierungen."
                }
            },
            {
                "@type": "Question",
                "name": "Ist mein Umzugsgut bei FLOXANT versichert?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja. Jeder Transport ist über unsere Betriebshaftpflicht und die gesetzliche Verkehrshaftung nach §451g HGB vollständig abgesichert. Zusätzlich bieten wir erweiterbare Versicherungsoptionen."
                }
            }
        ]
    };

    // Service-specific schemas for better SERP coverage
    const umzugService = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Umzugsservice",
        "name": "Professioneller Umzugsservice in Bayern",
        "description": "Privatumzug, Büroumzug, Fernumzug, Seniorenumzug und Studentenumzug in Regensburg und ganz Bayern. Festpreisgarantie und Vollversicherung.",
        "provider": { "@type": "MovingCompany", "name": "FLOXANT" },
        "areaServed": { "@type": "State", "name": "Bayern" },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Umzugsleistungen",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug" }, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "ab 79", "description": "Festpreis nach Besichtigung" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Büroumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fernumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seniorenumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Studentenumzug" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24h Notfall-Umzug" } },
            ]
        }
    };

    const reinigungService = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Reinigungsservice",
        "name": "Professionelle Reinigung in Bayern",
        "description": "Endreinigung, Grundreinigung, Büroreinigung und Baureinigung in Regensburg und ganz Bayern. Abnahmegarantie für die Wohnungsübergabe.",
        "provider": { "@type": "ProfessionalService", "name": "FLOXANT" },
        "areaServed": { "@type": "State", "name": "Bayern" }
    };

    const entruempelungService = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Entrümpelungsservice",
        "name": "Fachgerechte Entrümpelung in Bayern",
        "description": "Haushaltsauflösung, Wohnungsauflösung, Keller- und Dachbodenräumung in Regensburg und ganz Bayern. Umweltgerechte Entsorgung mit Nachweis.",
        "provider": { "@type": "ProfessionalService", "name": "FLOXANT" },
        "areaServed": { "@type": "State", "name": "Bayern" }
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(umzugService) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reinigungService) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(entruempelungService) }}
            />
        </>
    );
}
