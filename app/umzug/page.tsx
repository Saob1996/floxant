import { Metadata } from "next";
import {
  Banknote,
  Clock,
  MapPin,
  Package,
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
    path: "umzug",
    title: "Umzug Regensburg & Bayern | Privat, Gewerbe, Planung",
    description:
      "FLOXANT plant Umzüge in Regensburg und Bayern mit klarer Vorprüfung, Transport, Montageoptionen und nachvollziehbarem Preisrahmen.",
  });
}

export default async function UmzugPillarPage() {
  const dict = await getDictionary("de");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Umzug" },
  ];

  const faqItems = [
    {
      q: "Was umfasst ein professioneller Umzug mit FLOXANT?",
      a: "FLOXANT plant Transport, Tragewege, Zeitfenster und zusätzliche Module wie Montage, Reinigung oder Entrümpelung in einem klaren Ablauf.",
    },
    {
      q: "Für wen ist der Service gedacht?",
      a: "Der Umzugsservice eignet sich für Privatkunden, Familien und Unternehmen, die in Regensburg oder Bayern einen planbaren Ortswechsel brauchen.",
    },
    {
      q: "Wann ist ein Umzugsunternehmen sinnvoll?",
      a: "Besonders sinnvoll ist es bei größerem Volumen, engen Zeitfenstern, schwierigen Tragewegen, Firmenumzügen oder wenn mehrere Zusatzleistungen aufeinander abgestimmt werden müssen.",
    },
    {
      q: "Wie startet die Anfrage?",
      a: "Am schnellsten über den FLOXANT Rechner. Dort erfassen Sie Strecke, Volumen und Zusatzleistungen und erhalten einen klaren Preisrahmen für die weitere Planung.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Umzug", item: "/umzug" },
      ]),
      buildServiceJsonLd({
        name: "Umzug in Regensburg und Bayern",
        description:
          "Planbare Privat- und Firmenumzüge mit FLOXANT in Regensburg, der Oberpfalz und ganz Bayern.",
        path: "/umzug",
        areaServed: ["Regensburg", "Bayern"],
      }),
      buildWebPageJsonLd({
        name: "Umzug in Regensburg und Bayern | FLOXANT",
        description:
          "Service-Definition, Ablauf, Kostenfaktoren und direkte Anfrage für Umzüge mit FLOXANT.",
        path: "/umzug",
        about: ["Umzug", "Regensburg", "Bayern", "Privatumzug", "Firmenumzug"],
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
        heroBadge="Umzug mit Fokus auf Regensburg und Bayern"
        heroTitle="Umzugsunternehmen für Regensburg und Bayern"
        heroIntro="FLOXANT organisiert Privat- und Firmenumzüge mit klaren Zuständigkeiten, planbaren Zeitfenstern und sauber abgestimmten Zusatzleistungen. Diese Seite erklärt, für wen der Service gedacht ist, wann er sinnvoll wird und wie der Ablauf funktioniert."
        heroImageSrc="/assets/service-moving.png"
        heroImageAlt="FLOXANT Umzug in Regensburg und Bayern"
        heroCards={[
          { label: "Planung", value: "Route, Volumen und Zugang sauber erfasst" },
          { label: "Ehrlich", value: "Orientierungsrahmen statt Lockpreis" },
          { label: "Regional", value: "Regensburg zuerst, Bayern aktiv" },
        ]}
        visualVariant="moving"
        definitionCards={[
          {
            icon: Package,
            title: "Was ist das?",
            text: "Ein strukturierter Umzugsservice für Wohnungen, Häuser und Unternehmen mit klarer Einsatzplanung.",
          },
          {
            icon: ShieldCheck,
            title: "Für wen?",
            text: "Für Privatkunden, Familien, Firmen und Hausverwaltungen in Regensburg und Bayern.",
          },
          {
            icon: Clock,
            title: "Wann sinnvoll?",
            text: "Wenn Volumen, Tragewege, Zeitfenster oder Zusatzleistungen sauber koordiniert werden müssen.",
          },
          {
            icon: Banknote,
            title: "Wie läuft es ab?",
            text: "Erst Datenaufnahme, dann Preisrahmen, danach konkrete Einsatzplanung mit Transport, Team und optionalen Modulen.",
          },
        ]}
        differenceTitle="Was FLOXANT beim Umzug vom Standard unterscheidet"
        differenceCards={[
          {
            icon: Sparkles,
            title: "Klare Service-Definition",
            text: "FLOXANT ist nicht nur Transport. Auf Wunsch greifen Planung, Tragearbeit, Schutzmaterial, Montage, Reinigung und Entrümpelung in einer sauberen Reihenfolge ineinander.",
          },
          {
            icon: MapPin,
            title: "Regionale Relevanz",
            text: "Der Schwerpunkt liegt auf Regensburg und Bayern. Das hilft bei kurzen Wegen, realistischen Zeitfenstern und sinnvollen Empfehlungen für Standort, Strecke und Zusatzservices.",
          },
        ]}
        costTitle="Kostenfaktoren, die für den Preisrahmen zählen"
        costIntro="Entscheidend sind die Punkte, die den operativen Aufwand wirklich verändern. Genau diese Faktoren fragt FLOXANT ab, damit aus einem Bauchgefühl eine belastbare erste Einordnung wird."
        costFactors={[
          "Volumen und Objektgröße",
          "Strecke zwischen Start und Ziel",
          "Stockwerke, Aufzug und Tragewege",
          "Montage, Verpackung und Halteverbotszonen",
        ]}
        calculatorTitle="Warum der Rechner hier wichtig ist"
        calculatorText="Der FLOXANT Rechner sammelt genau die Informationen, die für einen glaubwürdigen Preisrahmen und die spätere Einsatzplanung wirklich zählen."
        faqTitle="Häufige Fragen zum Umzug"
        faqItems={faqItems}
        bookingTitle="Umzug in Regensburg oder Bayern anfragen"
        bookingText="Nutzen Sie den Rechner für einen klaren Preisrahmen und eine saubere Einsatzvorbereitung. Lieber gscheid planen als später zweimal erklären."
        serviceLinksTitle="Wichtige interne Einstiege rund um den Umzug"
        serviceLinks={[
          { href: "/rechner", label: "Umzug direkt kalkulieren" },
          { href: "/beiladung", label: "Beiladung für Einzelmöbel prüfen" },
          { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
          { href: "/express-anfrage", label: "Express-Anfrage für kurzfristige Umzüge" },
          { href: "/anfrage-mit-preisrahmen", label: "Umzug mit Preisrahmen planen" },
          { href: "/service-area-bayern", label: "Servicegebiet Bayern ansehen" },
        ]}
        cityLinksTitle="Umzug lokal in wichtigen Regionen"
        cityLinks={[
          { href: "/umzug-regensburg", label: "Umzug Regensburg" },
          { href: "/umzug-muenchen", label: "Umzug München" },
          { href: "/umzug-nuernberg", label: "Umzug Nürnberg" },
          { href: "/umzug-augsburg", label: "Umzug Augsburg" },
          { href: "/umzug-ingolstadt", label: "Umzug Ingolstadt" },
          { href: "/umzug-weiden", label: "Umzug Weiden" },
        ]}
      />
    </>
  );
}
