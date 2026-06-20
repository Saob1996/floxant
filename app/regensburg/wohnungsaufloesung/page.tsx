import type { Metadata } from "next";

import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { RegensburgServicePage } from "@/components/regensburg/RegensburgServicePage";
import { company } from "@/lib/company";
import { getRegensburgServicePage } from "@/lib/regensburg-service-pages";
import { getServiceVisual } from "@/lib/service-visuals";

const config = getRegensburgServicePage("wohnungsaufloesung");
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
    images: [{ url: socialVisual.src, width: 1200, height: 630, alt: socialVisual.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.metaTitle,
    description: config.metaDescription,
    images: [socialVisual.src],
  },
};

export default function RegensburgWohnungsaufloesungPage() {
  return (
    <>
      <RegensburgServicePage config={config} />
      <GscOpportunitySection
        eyebrow="Wohnungsauflösung Regensburg"
        title="Wohnungsauflösung ruhig nach Freigabe, Räumen und Zielzustand klären."
        intro="Eine Wohnungsauflösung in Regensburg braucht ruhige Vorprüfung: Räume, Keller, Möbel, persönliche Gegenstände, Freigabe, Ansprechpartner, Fotos, Entsorgung und mögliche Reinigung danach werden getrennt betrachtet."
        proofTitle="Ruhig und prüfbar"
        proofItems={[
          "Bei Nachlass, Auszug oder Leerstand helfen Ansprechpartner, Freigabe, Schlüsselweg und gewünschter Umgang mit persönlichen Dingen.",
          "Fotos von Räumen, Keller, Möbeln, Laufwegen und Zugang machen Menge und Trageaufwand realistischer.",
          "Räumung, Entsorgung, Reinigung und Übergabe werden nicht vermischt, sondern einzeln eingeordnet.",
        ]}
        cards={[
          {
            title: "Nachlass oder Auszug",
            text: "Räume, Freigabe, Ansprechpartner, Termin und sensible Punkte ruhig vor der Anfrage sortieren.",
            href: "/buchung?region=regensburg&service=wohnungsaufloesung#buchungssystem",
            cta: "Auflösung anfragen",
          },
          {
            title: "Entrümpelung als Teilauftrag",
            text: "Wenn vor allem Menge, Keller, Garage oder Reststücke im Vordergrund stehen.",
            href: "/regensburg/entruempelung",
            cta: "Entrümpelung öffnen",
          },
          {
            title: "Endreinigung danach",
            text: "Wenn die Wohnung nach Räumung übergeben, verkauft oder wieder genutzt werden soll.",
            href: "/regensburg/endreinigung",
            cta: "Reinigung prüfen",
          },
          {
            title: "Bestehende Auflösungsseite",
            text: "Für Nutzer, die direkt nach Wohnungsauflösung Regensburg suchen, bleibt die vertraute Einstiegsseite erreichbar.",
            href: "/wohnungsaufloesung-regensburg",
            cta: "Auflösungsseite öffnen",
          },
        ]}
        checklistTitle="Diese Angaben helfen bei Wohnungsauflösung in Regensburg"
        checklist={[
          "Adresse oder Stadtteil, Räume, Keller, Etage, Zugang und gewünschter Zielzustand.",
          "Fotos von Menge, Möbeln, persönlichen Gegenständen, Laufwegen und Schlüsselweg.",
          "Freigabe, Ansprechpartner, sensible Gegenstände und spätester Termin.",
          "Ob Endreinigung, Übergabe, Entsorgung oder Angebotseinordnung nötig ist.",
        ]}
        combinationsTitle="Häufige nächste Schritte"
        combinations={[
          {
            title: "Wohnungsauflösung + Entrümpelung",
            text: "Räume frei bekommen und Menge realistisch einordnen.",
            href: "/regensburg/entruempelung",
          },
          {
            title: "Wohnungsauflösung + Reinigung",
            text: "Nach der Räumung Übergabe oder Nachnutzung vorbereiten.",
            href: "/regensburg/endreinigung",
          },
          {
            title: "Nachlass + Rückruf",
            text: "Sensible Abstimmung über Ansprechpartner, Freigabe und Kontaktweg.",
            href: "/nachlass-raeumung-regensburg",
          },
          {
            title: "Angebot prüfen",
            text: "Vorhandenes Angebot mit Fotos, Menge, Entsorgung und Zielzustand vergleichen.",
            href: "/angebot-vergleichen-regensburg",
          },
        ]}
        primaryHref="/buchung?region=regensburg&service=wohnungsaufloesung#buchungssystem"
        primaryLabel="Wohnungsauflösung Regensburg anfragen"
        secondaryHref="/angebot-vergleichen-regensburg"
        secondaryLabel="Angebot prüfen"
        trackingService="wohnungsaufloesung"
        trackingCity="regensburg"
        trackingPageIntent="wohnungsaufloesung-regensburg"
        trackingPriority="p3"
      />
    </>
  );
}
