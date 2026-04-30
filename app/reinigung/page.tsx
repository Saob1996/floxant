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
    title: "Reinigung Regensburg & Bayern | Übergabe & Endreinigung",
    description:
      "Fachgerechte Reinigung für Wohnung, Haus und Gewerbe in Regensburg und Bayern: Übergabe, Endreinigung, Extras und klare Vorprüfung.",
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
      a: "FLOXANT fokussiert sichtbare Übergabefähigkeit, klare Leistungsgrenzen und eine planbare Abstimmung statt einer offenen Alltagsreinigung ohne definierte Zielqualität.",
    },
    {
      q: "Wie starte ich die Anfrage?",
      a: "Über den FLOXANT Rechner. Dort lassen sich Flächen, Objekttyp und Reinigungsbedarf direkt erfassen und als Preisrahmen vorbereiten.",
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
        heroIntro="FLOXANT bietet Endreinigung, Gebäudereinigung und Objektservice für saubere Übergaben, Wohnungswechsel und laufende Objektbetreuung. Diese Seite erklärt klar, was der Service ist, für wen er gedacht ist und wie er vom Standardfall abweicht."
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
            text: "Ein planbarer Reinigungsservice für Wohnungen, Häuser, Büros und Gewerbeflächen.",
          },
          {
            icon: Home,
            title: "Für wen?",
            text: "Für Mieter, Vermieter, Hausverwaltungen und Unternehmen mit klarer Ergebnis-Erwartung.",
          },
          {
            icon: Droplets,
            title: "Wann sinnvoll?",
            text: "Vor Übergaben, nach Auszug, vor Wiedervermietung oder bei sensiblen Gewerbeflächen.",
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
            text: "Bei Büros, Praxen und Objektbetreuung zählen klare Leistungsverzeichnisse, feste Ansprechpartner und nachvollziehbare Terminplanung.",
          },
          {
            icon: Home,
            title: "Auszug und Übergabe",
            text: "Vor Wohnungsübergaben oder Wiedervermietung muss Reinigung nicht nur sauber wirken, sondern praktisch und terminsicher erledigt sein.",
          },
        ]}
        costTitle="Wie sich der Service vom Standard unterscheidet"
        costIntro="FLOXANT definiert vorab Flächen, Leistungsumfang, Termin und Besonderheiten. Das vermeidet Missverständnisse und macht Ergebnisse besser vergleichbar."
        costFactors={[
          "Fläche und Objektart",
          "Zustand der Räume",
          "Küche, Bad, Fenster und Extras",
          "Terminlage und Zugang zum Objekt",
        ]}
        calculatorTitle="Regionale Einordnung mit echter Vorprüfung"
        calculatorText="Der Fokus auf Regensburg und Bayern macht Anfahrt, Einsatzplanung und Kombinationen mit Umzug oder Entrümpelung sinnvoller und realistischer."
        faqTitle="Häufige Fragen zur Reinigung"
        faqItems={faqItems}
        bookingTitle="Reinigung in Regensburg oder Bayern anfragen"
        bookingText="Nutzen Sie den Rechner für einen klaren Preisrahmen und eine saubere Einsatzvorbereitung. So bleibt es verständlich, freundlich und terminsicher."
        serviceLinksTitle="Wichtige interne Einstiege rund um Reinigung"
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
