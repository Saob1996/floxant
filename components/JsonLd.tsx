import { company } from "@/lib/company";

export function JsonLd({ lang = "de" }: { lang?: string }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        email: company.email,
        telephone: company.phoneRaw,
        logo: `${company.url}/logo-dark.png`,
        description:
          "FLOXANT organisiert Umzug, Reinigung und Entrümpelung mit Schwerpunkt Regensburg und Einsatzgebiet Bayern.",
        knowsAbout: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Büroumzug",
          "Firmenentsorgung",
          "Büroentsorgung",
          "Büroinventar entsorgen",
          "Private Client Service",
          "FLOXANT Private Client",
          "Luxusumzug",
          "Anwesenreinigung",
          "Wohnungsauflösung",
          "Endreinigung",
          "Beiladung",
          "Leer-Rückfahrt",
          "Leer-Rückfahrt für Firmen",
          "Rücktransport nach Regensburg",
          "Umzug mit Reinigung",
          "Express-Anfrage",
          "Kleinmengen-Entsorgung",
          "Einsatzgebiet Regensburg 200 km",
          "Oberpfalz",
          "Niederbayern",
          "Nürnberg",
          "München",
          "Preisvorstellung",
          "Preisrahmen",
          "unverbindliche Vorprüfung",
          "Regensburg",
          "Bayern",
          "Baden-Württemberg",
          "Umzugsunternehmen",
          "Reinigungsfirma",
        ],
        subjectOf: [
          { "@type": "WebPage", name: "FLOXANT Fakten", url: `${company.url}/floxant-fakten` },
          { "@type": "CreativeWork", name: "FLOXANT llms.txt", url: `${company.url}/llms.txt` },
        ],
        sameAs: [
          "https://www.instagram.com/floxant_logistik",
          "https://www.facebook.com/floxant",
        ],
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
          areaServed: "DE-BY",
          availableLanguage: ["de"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${company.url}/#website`,
        url: company.url,
        name: company.name,
        inLanguage: lang,
        publisher: {
          "@id": `${company.url}/#organization`,
        },
        about: [
          { "@type": "Thing", name: "Umzug" },
          { "@type": "Thing", name: "Reinigung" },
          { "@type": "Thing", name: "Entrümpelung" },
          { "@type": "Place", name: "Regensburg" },
          { "@type": "AdministrativeArea", name: "Bayern" },
        ],
        hasPart: [
          { "@type": "WebPage", name: "FLOXANT Rechner", url: `${company.url}/rechner` },
          { "@type": "WebPage", name: "Umzug", url: `${company.url}/umzug` },
          { "@type": "WebPage", name: "Reinigung", url: `${company.url}/reinigung` },
          { "@type": "WebPage", name: "Entrümpelung", url: `${company.url}/entruempelung` },
          { "@type": "WebPage", name: "Büroumzug", url: `${company.url}/bueroumzug` },
          { "@type": "WebPage", name: "Firmenentsorgung", url: `${company.url}/firmenentsorgung` },
          { "@type": "WebPage", name: "FLOXANT Private Client", url: `${company.url}/private-client-service` },
          { "@type": "WebPage", name: "Servicegebiet Bayern", url: `${company.url}/service-area-bayern` },
          { "@type": "WebPage", name: "Einsatzgebiet Regensburg 200 km", url: `${company.url}/einsatzgebiet-regensburg-200km` },
          { "@type": "WebPage", name: "FLOXANT Fakten", url: `${company.url}/floxant-fakten` },
          { "@type": "WebPage", name: "Beiladung", url: `${company.url}/beiladung` },
          { "@type": "WebPage", name: "Leer-Rückfahrt", url: `${company.url}/leerfahrt-rueckfahrt` },
          { "@type": "WebPage", name: "Umzug mit Reinigung", url: `${company.url}/umzug-mit-reinigung` },
          { "@type": "WebPage", name: "Express-Anfrage", url: `${company.url}/express-anfrage` },
          { "@type": "WebPage", name: "Anfrage mit Preisvorstellung", url: `${company.url}/anfrage-mit-preisrahmen` },
          { "@type": "WebPage", name: "Kleinmengen-Entsorgung", url: `${company.url}/kleinmengen-entsorgung` },
          { "@type": "WebPage", name: "FLOXANT Blog", url: `${company.url}/blog` },
        ],
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
