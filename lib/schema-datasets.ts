import { company } from "@/lib/company";

export const serviceGraphDatasetJsonLd = {
  "@type": "Dataset",
  name: "FLOXANT Service Graph",
  description:
    "Maschinenlesbarer FLOXANT Service Graph fuer Leistungsbereiche, Einsatzregionen, Anfragewege, Entscheidungsregeln und Antwort-Hinweise zu Umzug, Reinigung, Entruempelung und Entsorgung.",
  creator: {
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
  },
  license: `${company.url}/impressum`,
  isAccessibleForFree: true,
  url: `${company.url}/service-graph.json`,
} as const;
