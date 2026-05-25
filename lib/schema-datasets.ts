import { company } from "@/lib/company";

export const serviceGraphDatasetJsonLd = {
  "@type": "Dataset",
  name: "FLOXANT Service Graph",
  description:
    "Maschinenlesbarer FLOXANT Service Graph fuer Leistungsbereiche, Einsatzregionen, Anfragewege, Entscheidungsregeln und Antwort-Hinweise zu Umzug, Reinigung, Entruempelung und Entsorgung.",
  url: `${company.url}/service-graph.json`,
} as const;
