import { Metadata } from "next";
import {
  Building2,
  Home,
  Leaf,
  MapPin,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { PillarServicePage } from "@/components/PillarServicePage";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "entruempelung",
    title: "Entrümpelung Regensburg | Räumung & Entsorgung Bayern",
    description:
      "Entrümpelung, Wohnungsauflösung und Entsorgung in Regensburg und Bayern. FLOXANT prüft Volumen, Zugang, Material und Übergabezustand.",
    keywords: [
      "Entrümpelung Regensburg",
      "Wohnungsauflösung Regensburg",
      "Entsorgung Regensburg",
      "Keller entrümpeln Regensburg",
      "Räumung Bayern",
      "Entrümpelung Kosten Regensburg",
      "Besenreine Übergabe",
    ],
  });
}

export default async function EntruempelungPillarPage() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Entrümpelung" },
  ];

  const faqItems = [
    {
      q: "Was umfasst eine Entrümpelung mit FLOXANT?",
      a: "FLOXANT übernimmt Sichtung, Tragearbeit, Abtransport, Sortierung und fachgerechte Entsorgung für Wohnungen, Keller, Häuser und gewerbliche Flächen.",
    },
    {
      q: "Für wen ist der Service sinnvoll?",
      a: "Die Leistung ist für Haushalte, Vermieter, Erbfälle und Unternehmen gedacht, die Räume schnell, diskret und besenrein freibekommen müssen. Besonders sinnvoll ist sie vor Umzug, Verkauf, Renovierung oder Wohnungsübergabe.",
    },
    {
      q: "Wovon hängt der Preisrahmen ab?",
      a: "Entscheidend sind Volumen, Materialarten, Zugangswege, Laufstrecken, Demontage, Dringlichkeit und Sonderaufwand. Genau diese Punkte fließen in die Vorprüfung ein, damit es nicht am Einsatztag zu Nachforderungen kommt.",
    },
    {
      q: "Was bedeutet Entrümpelung als Übergabevorbereitung?",
      a: "Entrümpelung bedeutet nicht nur Wegtragen. Es geht darum, Räume wieder entscheidbar zu machen: trennen, tragen, entsorgen und die Fläche so hinterlassen, dass Reinigung, Renovierung oder Übergabe möglich werden.",
    },
    {
      q: "Wie starte ich die Anfrage?",
      a: "Über den FLOXANT Rechner oder die passende Zusatzseite. So entsteht direkt ein klares Bild von Volumen, Zugangswegen und dem unverbindlichen Orientierungsrahmen.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Entrümpelung", item: "/entruempelung" },
      ]),
      buildServiceJsonLd({
        name: "Entrümpelung in Regensburg und Bayern",
        description:
          "Wohnungsauflösungen, Räumungen und fachgerechte Entsorgung mit FLOXANT in Regensburg und Bayern.",
        path: "/entruempelung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Entrümpelung in Regensburg und Bayern | FLOXANT",
        description:
          "Service-Definition, Ablauf, Einsatzbereiche und direkte Anfrage für Entrümpelung mit FLOXANT.",
        path: "/entruempelung",
        about: ["Entrümpelung", "Wohnungsauflösung", "Regensburg", "Bayern", "Entsorgung"],
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PillarServicePage
        dict={dict}
        breadcrumbs={breadcrumbs}
        heroBadge="Entrümpelung mit Schwerpunkt Regensburg und Bayern"
        heroTitle="Entrümpelung und Wohnungsauflösung in Regensburg und Bayern"
        heroIntro="FLOXANT organisiert Räumungen für Wohnungen, Häuser, Keller und Gewerbeflächen. Entrümpelung bedeutet dabei nicht nur Wegtragen, sondern Räume wieder entscheidbar machen: trennen, tragen, entsorgen und den nächsten Schritt ermöglichen."
        heroImageSrc="/assets/service-clearance.png"
        heroImageAlt="FLOXANT Entrümpelung in Regensburg und Bayern"
        heroCards={[
          { label: "Volumen", value: "Umfang und Materialarten sichtbar bewertet" },
          { label: "Zugang", value: "Laufwege, Demontage und Aufwand im Blick" },
          { label: "Ergebnis", value: "Besenrein und geordnet übergeben" },
        ]}
        visualVariant="clearance"
        definitionCards={[
          {
            icon: Trash2,
            title: "Was ist das?",
            text: "Ein Service für Sichtung, Räumung, Tragearbeit, Abtransport und geregelte Entsorgung mit klarer Übergabelogik.",
          },
          {
            icon: Home,
            title: "Für wen?",
            text: "Für Haushalte, Vermieter, Nachlassfälle und Unternehmen mit klarer Räumungsaufgabe.",
          },
          {
            icon: Building2,
            title: "Wann sinnvoll?",
            text: "Vor Umzug, Verkauf, Sanierung, Übergabe, Neuvermietung oder wenn Keller und Nebenräume systematisch leer werden müssen.",
          },
          {
            icon: ShieldCheck,
            title: "Wie läuft es ab?",
            text: "Volumen und Zugangswege aufnehmen, Materialarten klären, Abtransport planen und Räume besenrein übergeben.",
          },
        ]}
        differenceTitle="Was FLOXANT bei der Entrümpelung vom Standard unterscheidet"
        differenceCards={[
          {
            icon: Leaf,
            title: "Fachgerechte Entsorgung",
            text: "Es geht nicht nur um das Wegtragen. FLOXANT trennt Materialien, organisiert Transport und denkt Entsorgungswege und Flächenzustand im Ablauf mit.",
          },
          {
            icon: Home,
            title: "Diskretion und Übergabe",
            text: "Gerade bei Nachlässen, Vermietung oder schwierigen Objektlagen zählen ruhige Kommunikation, klare Grenzen und ein Zustand, der Reinigung oder Übergabe ermöglicht.",
          },
        ]}
        costTitle="Regionale und operative Einordnung"
        costIntro="Der Fokus auf Regensburg und Bayern hilft bei realistischer Terminierung, kurzen Wegen und einer sinnvollen Kombination mit Reinigung, Umzug oder Schlüsselübergabe."
        costFactors={[
          "Volumen und Materialarten",
          "Zugang, Laufwege und Stockwerke",
          "Demontage und Sonderaufwand",
          "Dringlichkeit und Terminfenster",
        ]}
        calculatorTitle="Direkter Einstieg mit echter Datenbasis"
        calculatorText="Über den Rechner oder die passende Zusatzseite für Kleinmengen lässt sich der Bedarf schnell und sauber eingrenzen. Der Preisrahmen bleibt Orientierung, bis Volumen, Zugang, Materialarten und Termin geprüft sind."
        faqTitle="Häufige Fragen zur Entrümpelung"
        faqItems={faqItems}
        bookingTitle="Entrümpelung in Regensburg oder Bayern anfragen"
        bookingText="Nutzen Sie den Rechner für einen klaren Orientierungsrahmen und eine saubere Einsatzvorbereitung. Beschreiben Sie kurz, was weg muss und welcher nächste Schritt danach ansteht: Übergabe, Verkauf, Renovierung oder Umzug."
        serviceLinksTitle="Wichtige passende Einstiege rund um Räumung und Entsorgung"
        serviceLinks={[
          { href: "/rechner", label: "Entrümpelung direkt einordnen" },
          { href: "/firmenentsorgung", label: "Firmenentsorgung für Büros und Gewerbe" },
          { href: "/kleinmengen-entsorgung", label: "Kleinmengen-Entsorgung prüfen" },
          { href: "/umzug-mit-reinigung", label: "Räumung mit Reinigung kombinieren" },
          { href: "/entruempelung-kosten-regensburg", label: "Kosten in Regensburg einordnen" },
          { href: "/umzug", label: "Umzug und Räumung zusammen planen" },
        ]}
        cityLinksTitle="Entrümpelung lokal in wichtigen Regionen"
        cityLinks={[
          { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
          { href: "/entruempelung-muenchen", label: "Entrümpelung München" },
          { href: "/entruempelung-nuernberg", label: "Entrümpelung Nürnberg" },
          { href: "/entruempelung-augsburg", label: "Entrümpelung Augsburg" },
          { href: "/entruempelung-landshut", label: "Entrümpelung Landshut" },
          { href: "/entruempelung-passau", label: "Entrümpelung Passau" },
        ]}
      />
    </>
  );
}
