import { company } from "@/lib/company";

export function LocalBusinessJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${company.url}/#localbusiness`,
        name: "FLOXANT",
        description:
            "FLOXANT bietet Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und Private-Client-Services mit Schwerpunkt Regensburg, Bayern und ausgewählten Einsätzen in Baden-Württemberg.",
        image: [
            `${company.url}/og.jpg`,
            `${company.url}/opengraph-image`,
            `${company.url}/logo_v10.png`,
        ],
        url: company.url,
        telephone: company.phoneRaw,
        email: company.email,
        priceRange: "$$",
        slogan: "Umzug, Reinigung und Entrümpelung mit klarer Vorprüfung.",
        address: {
            "@type": "PostalAddress",
            streetAddress: company.streetAddress,
            addressLocality: company.city,
            addressRegion: "Bayern",
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
            { "@type": "State", name: "Baden-Württemberg" },
        ],
        knowsAbout: [
            "Umzug Regensburg",
            "Reinigung Regensburg",
            "Entrümpelung Regensburg",
            "Büroumzug",
            "Firmenentsorgung",
            "Private Client Service",
            "Anwesenumzug",
            "Umzug Bayern",
            "Endreinigung",
            "Wohnungsauflösung",
            "Beiladung",
        ],
        makesOffer: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Umzug",
                    url: `${company.url}/umzug`,
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Reinigung",
                    url: `${company.url}/reinigung`,
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Entrümpelung",
                    url: `${company.url}/entruempelung`,
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Firmenentsorgung",
                    url: `${company.url}/firmenentsorgung`,
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "FLOXANT Private Client",
                    url: `${company.url}/private-client-service`,
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Leer-Rückfahrt und Beiladung Richtung Regensburg",
                    url: `${company.url}/leerfahrt-rueckfahrt`,
                },
            },
        ],
        department: [
            {
                "@type": "LocalBusiness",
                name: "FLOXANT Umzug",
                url: `${company.url}/umzug`,
                telephone: company.phoneRaw,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: company.streetAddress,
                    addressLocality: company.city,
                    addressRegion: "Bayern",
                    postalCode: company.postalCode,
                    addressCountry: company.countryCode,
                },
            },
            {
                "@type": "LocalBusiness",
                name: "FLOXANT Reinigung",
                url: `${company.url}/reinigung`,
                telephone: company.phoneRaw,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: company.streetAddress,
                    addressLocality: company.city,
                    addressRegion: "Bayern",
                    postalCode: company.postalCode,
                    addressCountry: company.countryCode,
                },
            },
            {
                "@type": "LocalBusiness",
                name: "FLOXANT Entrümpelung",
                url: `${company.url}/entruempelung`,
                telephone: company.phoneRaw,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: company.streetAddress,
                    addressLocality: company.city,
                    addressRegion: "Bayern",
                    postalCode: company.postalCode,
                    addressCountry: company.countryCode,
                },
            },
        ],
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "14:00",
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
