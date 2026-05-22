import { Metadata } from "next";
import {
  Building,
  Droplets,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
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
    path: "reinigung",
    title: "Reinigung Regensburg | Wohnung, Büro & Übergabe",
    description:
      "Reinigung in Regensburg und Bayern für Wohnung, Büro, Endreinigung und Übergabe. FLOXANT prüft Fläche, Zustand, Termin und Umfang realistisch.",
    keywords: [
      "Reinigung Regensburg",
      "Reinigungsfirma Regensburg",
      "Endreinigung Regensburg",
      "Wohnungsreinigung Regensburg",
      "Büroreinigung Regensburg",
      "Übergabereinigung Bayern",
      "Reinigung Kosten Regensburg",
    ],
  });
}

export default async function ReinigungPillarPage() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Reinigung" },
  ];

  const faqItems = [
    {
      q: "Welche Reinigungsleistungen bietet FLOXANT an?",
      a: "FLOXANT bietet Endreinigung, Wohnungsreinigung, Gebäudereinigung sowie Reinigungslösungen für Büros und gewerbliche Objekte in Regensburg und Bayern.",
    },
    {
      q: "Für wen ist die Reinigung sinnvoll?",
      a: "Der Service ist für Mieter, Vermieter, Hausverwaltungen, Gewerbekunden und alle relevant, die vor Übergabe oder Wiedervermietung ein klares Reinigungsergebnis brauchen.",
    },
    {
      q: "Was unterscheidet die Leistung von normaler Unterhaltsreinigung?",
      a: "Reinigung nach dem Umzug ist keine normale Unterhaltsreinigung. Es geht um Abnahme, Eindruck, Details und oft um die Kaution. FLOXANT reinigt mit Blick auf Übergabe, nicht nur auf Oberfläche.",
    },
    {
      q: "Wie starte ich die Anfrage?",
      a: "Über den FLOXANT Rechner oder die Buchungsseite. Dort lassen sich Flächen, Objekttyp, Zustand, Extras und Terminwunsch erfassen, damit der Aufwand realistisch geprüft werden kann.",
    },
    {
      q: "Warum ist eine Wohnungsübergabe mehr als nur Reinigung?",
      a: "Weil bei einer Übergabe nicht nur Sauberkeit zählt. Auch Restgegenstände, Schlüssel, Zustand, Fotos, Zeitfenster und Kommunikation mit Vermieter oder Hausverwaltung können entscheidend sein.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
      ]),
      buildServiceJsonLd({
        name: "Reinigung in Regensburg und Bayern",
        description:
          "Endreinigung, Gebäudereinigung und Objektservice mit FLOXANT in Regensburg und Bayern.",
        path: "/reinigung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Reinigung in Regensburg und Bayern | FLOXANT",
        description:
          "Service-Definition, Einsatzbereiche, Ablauf und direkte Anfrage für Reinigung mit FLOXANT.",
        path: "/reinigung",
        about: ["Reinigung", "Endreinigung", "Gebäudereinigung", "Regensburg", "Bayern"],
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
        heroBadge="Reinigung mit Schwerpunkt Regensburg und Bayern"
        heroTitle="Reinigung in Regensburg und Bayern"
        heroIntro="FLOXANT bietet Endreinigung, Gebäudereinigung und Objektservice für saubere Übergaben, Wohnungswechsel und laufende Objektbetreuung. Der Fokus liegt nicht auf einer vagen Oberflächenreinigung, sondern auf einem Ergebnis, das vor Schlüsselübergabe, Wohnungsabnahme oder Neuvermietung planbar ist."
        heroImageSrc="/assets/service-cleaning.png"
        heroImageAlt="FLOXANT Reinigung in Regensburg und Bayern"
        heroCards={[
          { label: "Objekt", value: "Fläche, Zustand und Extras definiert" },
          { label: "Ablauf", value: "Übergabeorientiert statt vage" },
          { label: "Region", value: "Stark in Regensburg und ganz Bayern" },
        ]}
        visualVariant="cleaning"
        definitionCards={[
          {
            icon: Sparkles,
            title: "Was ist das?",
            text: "Ein planbarer Reinigungsservice für Wohnungen, Häuser, Büros und Gewerbeflächen mit klarem Abnahme- und Übergabefokus.",
          },
          {
            icon: Home,
            title: "Für wen?",
            text: "Für Mieter, Vermieter, Hausverwaltungen und Unternehmen mit klarer Ergebnis-Erwartung.",
          },
          {
            icon: Droplets,
            title: "Wann sinnvoll?",
            text: "Vor Schlüsselübergabe, Wohnungsabnahme, Wiedervermietung, Verkauf oder bei sensiblen Gewerbeflächen.",
          },
          {
            icon: ShieldCheck,
            title: "Wie läuft es ab?",
            text: "Objekt aufnehmen, Leistungsumfang definieren, Termin planen und Ergebnis sauber dokumentiert abarbeiten.",
          },
        ]}
        differenceTitle="Wann FLOXANT als Reinigungsfirma besonders relevant ist"
        differenceCards={[
          {
            icon: Building,
            title: "Gewerbe und Verwaltung",
            text: "Bei Büros, Praxen und Objektbetreuung zählen klare Leistungsverzeichnisse, feste Ansprechpartner, nachvollziehbare Terminplanung und weniger Reibung mit Verwaltung oder Nutzern.",
          },
          {
            icon: Home,
            title: "Auszug und Übergabe",
            text: "Vor Wohnungsübergaben oder Wiedervermietung muss Reinigung nicht nur sauber wirken, sondern praktisch, terminsicher und für den nächsten Schritt nachvollziehbar erledigt sein.",
          },
        ]}
        costTitle="Wie sich der Service vom Standard unterscheidet"
        costIntro="FLOXANT definiert vorab Flächen, Leistungsumfang, Termin, Zustand und Besonderheiten. Das vermeidet Missverständnisse, schützt vor falschen Erwartungen und macht Ergebnisse besser vergleichbar."
        costFactors={[
          "Fläche und Objektart",
          "Zustand der Räume",
          "Küche, Bad, Fenster und Extras",
          "Terminlage und Zugang zum Objekt",
        ]}
        calculatorTitle="Regionale Einordnung mit echter Vorprüfung"
        calculatorText="Der Rechner liefert Orientierung statt Festpreisversprechen. Der finale Rahmen entsteht erst, wenn Fläche, Zustand, Küche, Bad, Fenster, Zugang und Termin geprüft sind."
        faqTitle="Häufige Fragen zur Reinigung"
        faqItems={faqItems}
        bookingTitle="Reinigung in Regensburg oder Bayern anfragen"
        bookingText="Nutzen Sie den Rechner für einen klaren Preisrahmen und eine saubere Einsatzvorbereitung. Beschreiben Sie kurz, ob es um Übergabe, Auszug, Neuvermietung oder laufende Objektbetreuung geht."
        serviceLinksTitle="Wichtige passende Einstiege rund um Reinigung"
        serviceLinks={[
          { href: "/rechner", label: "Reinigung direkt kalkulieren" },
          { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
          { href: "/express-anfrage", label: "Kurzfristige Reinigung anfragen" },
          { href: "/anfrage-mit-preisrahmen", label: "Reinigung mit Preisrahmen planen" },
          { href: "/service-area-bayern", label: "Servicegebiet Bayern ansehen" },
          { href: "/umzug", label: "Umzug und Reinigung zusammen denken" },
        ]}
        cityLinksTitle="Reinigung lokal in wichtigen Regionen"
        cityLinks={[
          { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
          { href: "/reinigung-muenchen", label: "Reinigung München" },
          { href: "/reinigung-nuernberg", label: "Reinigung Nürnberg" },
          { href: "/reinigung-augsburg", label: "Reinigung Augsburg" },
          { href: "/reinigung-landshut", label: "Reinigung Landshut" },
          { href: "/reinigung-passau", label: "Reinigung Passau" },
        ]}
      />
    </>
  );
}
