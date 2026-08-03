import type { Metadata } from "next";

import {
  SeniorMovePageSections,
  seniorMoveFaqItems,
} from "@/components/seniorenumzug/SeniorMoveSections";
import { PhotoGuidanceBlock } from "@/components/PhotoGuidanceBlock";
import { RequestChecklistBlock } from "@/components/RequestChecklistBlock";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/seniorenumzug-bayern";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Seniorenumzug anfragen - Umzug, Umfang und Übergabe klären",
  description:
    "Seniorenumzug geplant? Start, Ziel, Umfang, Termin und Zusatzleistungen wie Entrümpelung oder Reinigung beschreiben. FLOXANT prüft die Anfrage anhand der genannten Eckdaten.",
  keywords: [
    "seniorenumzug",
    "seniorenumzug bayern",
    "umzug im alter",
    "umzugshilfe für senioren",
    "senior moving service Germany",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Seniorenumzug Bayern mit konkreten Eckdaten anfragen",
      description:
        "Kanonische FLOXANT-Seite für Seniorenumzug, Umzug im Alter, Angehörigenkoordination, Entrümpelung, Reinigung, Übergabe und Angebotsprüfung.",
      path,
      about: [
        "Seniorenumzug",
        "Umzug im Alter",
        "Umzugshilfe für Senioren",
        "Seniorenumzug mit Entrümpelung",
        "Seniorenumzug mit Reinigung",
        "diskreter Seniorenumzug",
        "senior moving service Germany",
      ],
      potentialActions: [
        { name: "Seniorenumzug anfragen", target: "/kontakt?mode=neutral&source=seo" },
        { name: "Seniorenumzug-Angebot prüfen", target: "/kontakt?mode=neutral&source=seo" },
        { name: "Diskreten Fall beschreiben", target: "/kontakt?mode=neutral&source=seo" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Seniorenumzug und Umzug im Alter",
      description:
        "Praktische Einordnung für Seniorenumzug, Umzug im Alter, Angehörigenkoordination, Entrümpelung, Reinigung und Übergabe-Vorbereitung ohne Pflege-, Preis- oder Sofortterminversprechen.",
      path,
      serviceType: "Seniorenumzug, Umzug im Alter, Umzugshilfe für Senioren",
      areaServed: ["Regensburg", "Bayern", "Deutschland nach Machbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Leistungen", item: "/leistungen" },
      { name: "Seniorenumzug Bayern", item: path },
    ]),
    buildFaqJsonLd(seniorMoveFaqItems),
    {
      "@type": "ItemList",
      name: "Seniorenumzug Support-Services",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Entrümpelung nach Seniorenumzug", url: `${company.url}/regensburg/entruempelung` },
        { "@type": "ListItem", position: 2, name: "Reinigung nach Seniorenumzug", url: `${company.url}/regensburg/reinigung` },
        { "@type": "ListItem", position: 3, name: "Diskret-Service", url: `${company.url}/diskreter-umzug-trennung-scheidung` },
        { "@type": "ListItem", position: 4, name: "Objektbrief", url: `${company.url}/objektbrief` },
        { "@type": "ListItem", position: 5, name: "Übergabeakte", url: `${company.url}/uebergabeakte` },
        { "@type": "ListItem", position: 6, name: "Angebotscheck", url: `${company.url}/angebotscheck` },
      ],
    },
  ],
};

export default function SeniorenumzugBayernPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeniorMovePageSections />
      <RequestChecklistBlock
        serviceKey="seniorenumzug"
        ctaHref="/kontakt?mode=neutral&source=seo"
        ctaLabel="Seniorenumzug-Eckdaten vorbereiten"
        compact
      />
      <PhotoGuidanceBlock serviceKey="seniorenumzug" compact />
    </main>
  );
}
