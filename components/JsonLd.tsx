import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";

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
        logo: `${company.url}/logo_v10.png`,
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
          "Umzugsunternehmen",
          "Reinigungsfirma",
          "Angebot anderer Firma prüfen",
          "Umzugsangebot prüfen",
          "Reinigungsangebot prüfen",
          "Entsorgungsangebot prüfen",
          "B2B-Reinigung Düsseldorf",
          "Google Maps Buchung",
          "KI-Antworten für lokale Dienstleistungen",
        ],
        slogan: "Umzug, Reinigung, Entrümpelung und Angebotsprüfung direkt anfragen.",
        keywords:
          "Umzug Regensburg, Reinigung Regensburg, Entrümpelung Regensburg, Angebot prüfen lassen, FLOXANT, Bayern, Düsseldorf Reinigung",
        knowsLanguage: ["de"],
        areaServed: [
          { "@type": "City", name: "Regensburg" },
          { "@type": "AdministrativeArea", name: "Landkreis Regensburg" },
          { "@type": "State", name: "Bayern" },
          {
            "@type": "City",
            name: "Düsseldorf",
            description: "Nur Reinigung und Entsorgung, keine Umzüge.",
          },
        ],
        subjectOf: [
          { "@type": "WebPage", name: "FLOXANT Fakten", url: `${company.url}/floxant-fakten` },
          { "@type": "Dataset", name: "FLOXANT Service Graph", url: `${company.url}/service-graph.json` },
          { "@type": "WebPage", name: "Angebot anderer Firma prüfen", url: `${company.url}/angebot-guenstiger-pruefen` },
          { "@type": "WebPage", name: "Plan-B-Service", url: `${company.url}/plan-b-service` },
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
        potentialAction: [
          {
            "@type": "ContactAction",
            name: "FLOXANT direkt anfragen",
            target: company.businessProfilePreferredUrl,
          },
          {
            "@type": "Action",
            name: "Preisrahmen prüfen",
            target: `${company.url}/rechner`,
          },
          {
            "@type": "Action",
            name: "Angebot anderer Firma prüfen",
            target: `${company.url}/angebot-guenstiger-pruefen`,
          },
        ],
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
        potentialAction: [
          {
            "@type": "Action",
            name: "Buchung starten",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${company.url}/buchung`,
            },
          },
          {
            "@type": "Action",
            name: "Kostenrahmen prüfen",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${company.url}/rechner`,
            },
          },
          {
            "@type": "Action",
            name: "Angebot prüfen und Alternative anfragen",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${company.url}/angebot-guenstiger-pruefen`,
            },
          },
        ],
        about: [
          { "@type": "Thing", name: "Umzug" },
          { "@type": "Thing", name: "Reinigung" },
          { "@type": "Thing", name: "Angebotsprüfung" },
          { "@type": "Thing", name: "Preisrahmen" },
          { "@type": "Thing", name: "Google Maps Buchung" },
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
          { "@type": "WebPage", name: "Reinigung Düsseldorf", url: `${company.url}/duesseldorf/reinigung` },
          { "@type": "WebPage", name: "Büroreinigung Düsseldorf", url: `${company.url}/duesseldorf/bueroreinigung` },
          { "@type": "WebPage", name: "Entsorgung Düsseldorf", url: `${company.url}/entsorgung-duesseldorf` },
          { "@type": "WebPage", name: "FLOXANT Blog", url: `${company.url}/blog` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(graph)) }}
    />
  );
}
