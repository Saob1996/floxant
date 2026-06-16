import { company } from "@/lib/company";

export const serviceGraphDatasetJsonLd = {
  "@id": `${company.url}/service-graph.json#dataset`,
  "@type": "Dataset",
  name: "FLOXANT Leistungsübersicht",
  alternateName: "Strukturierte FLOXANT Übersicht für Leistungen, Regionen und Kontaktwege",
  description:
    "Strukturierte FLOXANT Übersicht für Leistungen, Einsatzregionen, Kontaktwege und passende nächste Schritte zu Umzug, Reinigung, Entrümpelung und Entsorgung.",
  identifier: "floxant-service-graph",
  inLanguage: "de",
  creator: {
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
  },
  license: `${company.url}/impressum`,
  usageInfo: `${company.url}/impressum`,
  isAccessibleForFree: true,
  url: `${company.url}/service-graph.json`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${company.url}/service-graph.json`,
    url: `${company.url}/service-graph.json`,
    name: "FLOXANT Leistungsübersicht",
    description:
      "Übersicht mit FLOXANT Leistungen, Regionen, Kontaktwegen und passenden nächsten Schritten.",
  },
  includedInDataCatalog: {
    "@type": "DataCatalog",
    "@id": `${company.url}/#service-data-catalog`,
    name: "FLOXANT Service-Übersicht",
    url: `${company.url}/llms.txt`,
  },
  distribution: {
    "@type": "DataDownload",
    name: "FLOXANT Leistungsübersicht",
    contentUrl: `${company.url}/service-graph.json`,
    encodingFormat: "application/json",
  },
  keywords: [
    "FLOXANT Leistungsübersicht",
    "Umzug Regensburg",
    "Reinigung Regensburg",
    "Gewerbereinigung Regensburg",
    "Entruempelung Regensburg",
    "Duesseldorf Reinigung",
    "Kontaktwege",
    "Servicegebiet",
  ],
  datePublished: "2026-05-20",
  dateModified: "2026-05-29",
} as const;

export const serviceGraphDatasetReference = {
  "@id": serviceGraphDatasetJsonLd["@id"],
  "@type": serviceGraphDatasetJsonLd["@type"],
  name: serviceGraphDatasetJsonLd.name,
  description: serviceGraphDatasetJsonLd.description,
  creator: serviceGraphDatasetJsonLd.creator,
  publisher: serviceGraphDatasetJsonLd.publisher,
  license: serviceGraphDatasetJsonLd.license,
  url: serviceGraphDatasetJsonLd.url,
  isAccessibleForFree: serviceGraphDatasetJsonLd.isAccessibleForFree,
} as const;
