import { company } from "@/lib/company";

export function OrganizationJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        logo: `${company.url}/logo-dark.png`,
        email: company.email,
        telephone: company.phoneRaw,
        address: {
            "@type": "PostalAddress",
            streetAddress: company.streetAddress,
            addressLocality: company.city,
            postalCode: company.postalCode,
            addressCountry: company.countryCode,
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: company.phoneRaw,
            contactType: "customer service",
            areaServed: "DE",
            availableLanguage: ["de"],
        },
        description:
            "FLOXANT organisiert Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung und Private-Client-Services mit Schwerpunkt Regensburg, Bayern und ausgewählten Einsätzen in Baden-Württemberg.",
        areaServed: [
            { "@type": "City", name: "Regensburg" },
            { "@type": "State", name: "Bayern" },
            { "@type": "State", name: "Baden-Württemberg" },
        ],
        knowsAbout: [
            "Umzug",
            "Reinigung",
            "Entrümpelung",
            "Büroumzug",
            "Firmenentsorgung",
            "FLOXANT Private Client",
            "Wohnungsauflösung",
            "Endreinigung",
            "Beiladung",
            "Umzug mit Reinigung",
            "Express-Anfrage",
            "Preisvorstellung",
            "Preisrahmen",
            "Regensburg",
            "Bayern",
            "Baden-Württemberg",
        ],
        subjectOf: [
            { "@type": "WebPage", name: "FLOXANT Fakten", url: `${company.url}/floxant-fakten` },
            { "@type": "CreativeWork", name: "FLOXANT llms.txt", url: `${company.url}/llms.txt` },
        ],
        sameAs: [
            "https://www.instagram.com/floxant_logistik",
            "https://www.facebook.com/floxant",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
