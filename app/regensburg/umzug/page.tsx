import type { Metadata } from "next";

import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { RegensburgServicePage } from "@/components/regensburg/RegensburgServicePage";
import { company } from "@/lib/company";
import { getRegensburgServicePage } from "@/lib/regensburg-service-pages";
import { getServiceVisual } from "@/lib/service-visuals";

const config = getRegensburgServicePage("umzug");
const socialVisual = getServiceVisual({
  region: "regensburg",
  slug: config.slug,
  path: config.path,
  serviceLabel: config.serviceType,
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: config.path,
    languages: {
      "de-DE": config.path,
      "x-default": config.path,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: config.path,
    title: config.metaTitle,
    description: config.metaDescription,
    images: [
      {
        url: socialVisual.src,
        width: 1200,
        height: 630,
        alt: socialVisual.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.metaTitle,
    description: config.metaDescription,
    images: [socialVisual.src],
  },
};

export default function RegensburgUmzugPage() {
  return (
    <>
      <RegensburgServicePage config={config} />
      <GscOpportunitySection
        eyebrow="Umzug Regensburg sauber vorbereiten"
        title="Ein guter Umzug beginnt mit klaren Eckdaten und einer ruhigen Vorbereitung."
        intro="FLOXANT prüft Umzüge in Regensburg nach Start, Ziel, Etage, Laufweg, Möbelmenge, Termin und Fotos. Wenn Reinigung, Entrümpelung, Restmengen oder Übergabe dazukommen, wird das direkt getrennt und sauber eingeplant."
        proofTitle="Wichtig für die Planung"
        proofItems={[
          "Fotos von Treppenhaus, Aufzug, Hauseingang, Laufweg und großen Möbeln machen den Aufwand realistischer.",
          "Start- und Zieladresse, Etage, Haltemöglichkeit, Terminfenster und grobe Möbelmenge reichen für eine erste Einordnung.",
          "Abbau, Packhilfe, Entsorgung, Reinigung und Schlüsselübergabe sollten früh genannt werden, wenn sie dazugehören.",
        ]}
        cards={[
          {
            title: "Privatumzug in Regensburg",
            text: "Für Wohnung, Apartment oder WG helfen Möbelmenge, Kartons, Etagen, Aufzug, Laufweg und Fotos.",
            href: "/regensburg/umzug",
            cta: "Umzug anfragen",
          },
          {
            title: "Umzug mit Reinigung",
            text: "Wenn die alte Wohnung danach sauber übergeben werden soll, zählen Deadline, Schlüsselweg, Räume und Restpunkte.",
            href: "/regensburg/umzug-reinigung",
            cta: "Kombination prüfen",
          },
          {
            title: "Entrümpelung vor dem Umzug",
            text: "Alles, was nicht mit soll, sollte vorher sichtbar werden: Keller, Garage, alte Möbel, Sperrgut oder Restmengen.",
            href: "/regensburg/entruempelung",
            cta: "Restmengen klären",
          },
          {
            title: "Seniorenumzug mit Angehörigen",
            text: "Wenn Angehörige mitorganisieren, helfen klare Freigaben, Rückruf, Packhilfe, Übergabe und ein ruhiger Ablauf.",
            href: "/seniorenumzug-regensburg",
            cta: "Ruhig planen",
          },
          {
            title: "Umzugsangebot prüfen",
            text: "Vorhandenes Angebot, Fotos, Strecke, Etage, Volumen und Budget können für eine zweite Einschätzung gesendet werden.",
            href: "/angebot-guenstiger-pruefen",
            cta: "Angebot prüfen",
          },
          {
            title: "Kurzfristiger Termin",
            text: "Wenn der Termin drückt, zählen Prioritäten: was zwingend mit muss, welche Zugänge frei sind und welche Fotos Engstellen zeigen.",
            href: "/notfall-umzug-bayern",
            cta: "Machbarkeit prüfen",
          },
        ]}
        checklistTitle="Diese Angaben beschleunigen die Rückmeldung"
        checklist={[
          "Start, Ziel, Etage, Aufzug, Laufweg und Parkmöglichkeit.",
          "Grobe Möbelmenge, Kartons, große Einzelstücke und Fotos.",
          "Terminfenster, gewünschte Zusatzleistungen und Ansprechpartner.",
          "Budget oder vorhandenes Angebot, wenn Sie eine Einordnung wünschen.",
        ]}
        combinationsTitle="Wenn mehr als Tragen dazugehört"
        combinations={[
          {
            title: "Umzug + Reinigung",
            text: "Alte Wohnung, Übergabetermin und Schlüsselweg direkt mitplanen.",
            href: "/regensburg/umzug-reinigung",
          },
          {
            title: "Umzug + Entrümpelung",
            text: "Nicht alles muss mit. Restmengen vorher sichtbar machen.",
            href: "/regensburg/entruempelung",
          },
          {
            title: "Seniorenumzug + Übergabe",
            text: "Ruhige Abstimmung mit Angehörigen, Packhilfe und Rückmeldung.",
            href: "/seniorenumzug-regensburg",
          },
          {
            title: "Angebot prüfen",
            text: "Vorhandenes Angebot mit Fotos und Eckdaten sachlich einordnen.",
            href: "/angebot-guenstiger-pruefen",
          },
        ]}
        primaryHref="/buchung?service=umzug#buchungssystem"
        primaryLabel="Umzug Regensburg anfragen"
        secondaryHref="/angebot-guenstiger-pruefen"
        secondaryLabel="Angebot prüfen"
        trackingService="umzug"
        trackingCity="regensburg"
        trackingPageIntent="umzug-regensburg"
        trackingPriority="p3"
      />
    </>
  );
}
