import { company } from "@/lib/company";

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.url}/#website`,
    url: company.url,
    name: company.name,
    alternateName: "FLOXANT Regensburg",
    inLanguage: "de-DE",
    publisher: {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
    },
    about: company.coreServices.map((service) => ({
      "@type": "Thing",
      name: service,
    })),
    hasPart: [
      {
        "@type": "WebPage",
        name: "Buchung",
        url: company.bookingUrl,
      },
      {
        "@type": "WebPage",
        name: "Kontakt",
        url: company.contactUrl,
      },
      {
        "@type": "WebPage",
        name: "Standorte",
        url: company.locationsUrl,
      },
      {
        "@type": "WebPage",
        name: "Servicegebiet Bayern",
        url: company.serviceAreaUrl,
      },
      {
        "@type": "WebPage",
        name: "Einsatzgebiet Regensburg ca. 200 km",
        url: `${company.url}/einsatzgebiet-regensburg-200km`,
      },
      {
        "@type": "WebPage",
        name: "Umzug Regensburg",
        url: `${company.url}/umzug-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Reinigung Regensburg",
        url: `${company.url}/reinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Entrümpelung Regensburg",
        url: `${company.url}/entruempelung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Schlüsselübergabe",
        url: `${company.url}/schluesseluebergabe`,
      },
      {
        "@type": "WebPage",
        name: "Übergabeakte",
        url: `${company.url}/uebergabeakte`,
      },
    ],
    potentialAction: [
      {
        "@type": "CommunicateAction",
        name: "Kontakt aufnehmen",
        target: company.contactUrl,
      },
      {
        "@type": "ReserveAction",
        name: "Buchung oder Anfrage starten",
        target: company.bookingUrl,
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
