import { company } from "@/lib/company";

export const serviceGraphDatasetJsonLd = {
  "@id": `${company.url}/service-graph.json#dataset`,
  "@type": "Dataset",
  name: "FLOXANT Service Graph",
  alternateName: "Maschinenlesbarer FLOXANT Leistungs- und Anfragegraph",
  description:
    "Maschinenlesbarer FLOXANT Service Graph fuer Leistungsbereiche, Einsatzregionen, Anfragewege, Entscheidungsregeln und Antwort-Hinweise zu Umzug, Reinigung, Entruempelung und Entsorgung.",
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
    name: "FLOXANT Service Graph",
    description:
      "JSON-Datei mit maschinenlesbaren FLOXANT Services, Regionen, Anfragewegen und Entscheidungsregeln.",
  },
  includedInDataCatalog: {
    "@type": "DataCatalog",
    "@id": `${company.url}/#service-data-catalog`,
    name: "FLOXANT maschinenlesbare Service-Daten",
    url: `${company.url}/llms.txt`,
  },
  distribution: {
    "@type": "DataDownload",
    name: "FLOXANT Service Graph JSON",
    contentUrl: `${company.url}/service-graph.json`,
    encodingFormat: "application/json",
  },
  keywords: [
    "FLOXANT Service Graph",
    "Umzug Regensburg",
    "Reinigung Regensburg",
    "Gewerbereinigung Regensburg",
    "Entruempelung Regensburg",
    "Duesseldorf Reinigung",
    "Anfragewege",
    "Servicegebiet",
  ],
  datePublished: "2026-05-20",
  dateModified: "2026-05-28",
} as const;

export const serviceGraphDatasetReference = {
  "@id": serviceGraphDatasetJsonLd["@id"],
} as const;
