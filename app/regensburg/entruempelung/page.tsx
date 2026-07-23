import type { Metadata } from "next";

import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { RegensburgServicePage } from "@/components/regensburg/RegensburgServicePage";
import { company } from "@/lib/company";
import { getRegensburgServicePage } from "@/lib/regensburg-service-pages";
import { getServiceVisual } from "@/lib/service-visuals";

const config = getRegensburgServicePage("entruempelung");
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

export default function RegensburgEntruempelungPage() {
  return (
    <>
      <RegensburgServicePage config={config} />
      <GscOpportunitySection
        eyebrow="Entrümpelung Regensburg"
        title="Räume, Menge und Zielzustand vor dem Angebot sichtbar machen."
        intro="FLOXANT prüft Entrümpelung in Regensburg nach Wohnung, Keller, Garage, Objekt, Menge, Zugang, Freigabe, Fotos und gewünschtem Endzustand. Wenn Reinigung, Wohnungsauflösung oder Übergabe danach eine Rolle spielen, wird das direkt getrennt eingeordnet."
        proofTitle="Wichtig für die Räumung"
        proofItems={[
          "Fotos von Räumen, Keller, Garage, Treppenhaus, Laufwegen und schweren Gegenständen sparen Rückfragen.",
          "Menge, Material, Etage, Aufzug, Parkmöglichkeit und gewünschter Zielzustand bestimmen den realistischen Ablauf.",
          "Gefahrstoffe, Sonderfälle und besondere Entsorgung werden nicht pauschal zugesagt, sondern vorab klar abgegrenzt.",
        ]}
        cards={[
          {
            title: "Wohnung oder Keller räumen",
            text: "Räume, Menge, Möbel, Kartons, Restmengen und Zugang mit Fotos beschreiben.",
            href: "/buchung?region=regensburg&service=entruempelung#buchungssystem",
            cta: "Entrümpelung anfragen",
          },
          {
            title: "Wohnungsauflösung prüfen",
            text: "Wenn Nachlass, Auszug, Leerstand oder Freigabe eine Rolle spielen, ist die Auflösung oft der bessere Rahmen.",
            href: "/regensburg/wohnungsaufloesung",
            cta: "Auflösung öffnen",
          },
          {
            title: "Reinigung danach",
            text: "Wenn Räume danach übergeben, verkauft oder wieder genutzt werden sollen, Reinigung früh mitdenken.",
            href: "/regensburg/endreinigung",
            cta: "Endreinigung prüfen",
          },
          {
            title: "Angebot vergleichen",
            text: "Vorhandenes Angebot, Fotos, Menge, Entsorgungsanteil und Zielzustand sachlich einordnen lassen.",
            href: "/angebot-vergleichen-regensburg",
            cta: "Angebot prüfen",
          },
        ]}
        checklistTitle="Diese Angaben beschleunigen die Rückmeldung"
        checklist={[
          "Ort, Räume, Menge, Fotos, Materialarten und gewünschter Endzustand.",
          "Etage, Aufzug, Laufweg, Parkmöglichkeit und Schlüsselweg.",
          "Freigabe, Ansprechpartner, Terminwunsch und ob danach Reinigung nötig ist.",
          "Vorhandenes Angebot oder Budget, wenn eine Einordnung gewünscht ist.",
        ]}
        combinationsTitle="Häufige Kombinationen in Regensburg"
        combinations={[
          {
            title: "Entrümpelung + Wohnungsauflösung",
            text: "Für Auszug, Nachlass, Leerstand oder Pflegeheimwechsel.",
            href: "/regensburg/wohnungsaufloesung",
          },
          {
            title: "Entrümpelung + Endreinigung",
            text: "Wenn nach der Räumung Küche, Bad, Böden oder Übergabe vorbereitet werden.",
            href: "/regensburg/endreinigung",
          },
          {
            title: "Entrümpelung + Umzug",
            text: "Wenn nicht alles mitzieht und der Ablauf vor dem Transport sortiert werden muss.",
            href: "/regensburg/umzug",
          },
          {
            title: "Angebot prüfen",
            text: "Wenn Preis, Umfang oder Zusatzpositionen eines Angebots unklar sind.",
            href: "/angebot-vergleichen-regensburg",
          },
        ]}
        primaryHref="/buchung?region=regensburg&service=entruempelung#buchungssystem"
        primaryLabel="Entrümpelung Regensburg anfragen"
        secondaryHref="/angebot-vergleichen-regensburg"
        secondaryLabel="Angebot prüfen"
        trackingService="entruempelung"
        trackingCity="regensburg"
        trackingPageIntent="entruempelung-regensburg"
        trackingPriority="p3"
      />
    </>
  );
}
