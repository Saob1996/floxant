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
import { PsychologicalCleaningInternalLinks } from "@/components/PsychologicalCleaningLandingRoute";
import { EffortFactorsPanel } from "@/components/EffortFactorsPanel";
import { ServiceFitGuide } from "@/components/ServiceFitGuide";
import { ServicePackageSelector } from "@/components/ServicePackageSelector";
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
    title: "Umzug Regensburg + Einsatzgebiet bis 75 km | FLOXANT",
    description:
      "Umzug in Regensburg und im Einsatzgebiet bis 75 km anfragen. Weiter entfernte Orte sind nur mögliche Fernziele einer konkreten Anfrage.",
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
      q: "Was umfasst ein Umzug mit FLOXANT?",
      a: "FLOXANT plant Transport, Tragewege, Zeitfenster und Zusatzmodule wie Montage, Reinigung, Rest-Entrümpelung oder Schlüsselübergabe in einem klaren Ablauf.",
    },
    {
      q: "Für wen ist der Service gedacht?",
      a: "Der Umzugsservice eignet sich für Privatkunden, Familien und Unternehmen in Regensburg und im verifizierten Einsatzgebiet bis 75 km. Ein weiter entfernter Ort kann Ziel einer konkreten Umzugsanfrage sein.",
    },
    {
      q: "Wann ist ein Umzugsunternehmen sinnvoll?",
      a: "Besonders sinnvoll ist es bei größerem Volumen, engen Zeitfenstern, schwierigen Tragewegen, Firmenumzügen oder wenn Umzug, Reinigung, Restmengen und Übergabe zusammenhängen.",
    },
    {
      q: "Wie startet die Anfrage?",
      a: "Am schnellsten über den FLOXANT Rechner oder die Buchungsseite. Dort erfassen Sie Strecke, Volumen, Zugang, Termin und Zusatzleistungen, damit der Fall realistisch geprüft werden kann.",
    },
    {
      q: "Warum kalkuliert FLOXANT nicht einfach den billigsten Umzugspreis?",
      a: "Weil ein vorschnell niedriger Preis am Einsatztag oft zu Problemen führt: zu wenig Zeit, zu wenig Fahrzeugkapazität, ungeklärte Laufwege oder Zusatzleistungen. FLOXANT kalkuliert lieber realistisch, damit Durchführung und Erwartung zusammenpassen.",
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
        name: "Umzug in Regensburg und im Einsatzgebiet bis 75 km",
        description:
          "Planbare Privat- und Firmenumzüge mit FLOXANT im verifizierten Einsatzgebiet bis 75 km um Regensburg.",
        path: "/umzug",
        areaServed: ["Regensburg", "Einsatzgebiet bis 75 km um Regensburg"],
      }),
      buildWebPageJsonLd({
        name: "Umzug in Regensburg und im Einsatzgebiet bis 75 km | FLOXANT",
        description:
          "Service-Definition, Ablauf, Kostenfaktoren und direkte Anfrage für Umzüge mit FLOXANT.",
        path: "/umzug",
        about: ["Umzug", "Regensburg", "Einsatzgebiet bis 75 km", "Fernziel-Anfrage", "Privatumzug", "Firmenumzug"],
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
        heroBadge="Umzug ab Regensburg im Einsatzgebiet bis 75 km"
        heroTitle="Umzugsunternehmen für Regensburg und das verifizierte Einsatzgebiet"
        heroIntro="FLOXANT organisiert Privat- und Firmenumzüge in Regensburg und im verifizierten Einsatzgebiet bis 75 km. Weiter entfernte Orte können als Ziel einer konkreten Anfrage angegeben werden, sind aber keine lokale oder flächendeckende Verfügbarkeitszusage."
        heroImageSrc="/assets/service-moving.webp"
        heroImageAlt="FLOXANT Umzug im Einsatzgebiet bis 75 km um Regensburg"
        heroCards={[
          { label: "Planung", value: "Route, Volumen und Zugang sauber erfasst" },
          { label: "Ehrlich", value: "Orientierungsrahmen mit Kontext" },
          { label: "Regional", value: "Regensburg + verifiziertes Einsatzgebiet bis 75 km" },
        ]}
        visualVariant="moving"
        definitionCards={[
          {
            icon: Package,
            title: "Was ist das?",
            text: "Ein geplanter Umzugsservice für Wohnungen, Häuser und Unternehmen mit klarer Einsatzplanung statt improvisiertem Transport.",
          },
          {
            icon: ShieldCheck,
            title: "Für wen?",
            text: "Für Privatkunden, Familien, Firmen und Hausverwaltungen in Regensburg und im Einsatzgebiet bis 75 km.",
          },
          {
            icon: Clock,
            title: "Wann sinnvoll?",
            text: "Wenn Volumen, Tragewege, Zeitfenster, Schlüssel, Reinigung oder Übergabe sauber koordiniert werden müssen.",
          },
          {
            icon: Banknote,
            title: "Wie läuft es ab?",
            text: "Erst die wichtigsten Eckdaten, dann ein realistischer Preisrahmen und danach die konkrete Planung mit Transport, Team und Zusatzleistungen.",
          },
        ]}
        differenceTitle="Was FLOXANT beim Umzug vom Standard unterscheidet"
        differenceCards={[
          {
            icon: Sparkles,
            title: "Durchführung statt Schnellpreis",
            text: "FLOXANT kalkuliert nicht nur Kilometer und Möbel, sondern die tatsächliche Durchführung: Volumen, Laufwege, Etagen, Fahrzeug, Team, Zeitfenster und Zusatzaufgaben.",
          },
          {
            icon: MapPin,
            title: "Übergabe mitgedacht",
            text: "Auf Wunsch greifen Planung, Tragearbeit, Schutzmaterial, Montage, Reinigung, Rest-Entrümpelung und Schlüsselübergabe in einer sauberen Reihenfolge ineinander.",
          },
        ]}
        costTitle="Kostenfaktoren, die für den Preisrahmen zählen"
        costIntro="Entscheidend sind die Punkte, die Aufwand und Zeit wirklich verändern. Genau diese Faktoren fragt FLOXANT ab, damit aus einem Bauchgefühl eine belastbare erste Einordnung wird."
        costFactors={[
          "Volumen und Objektgröße",
          "Strecke zwischen Start und Ziel",
          "Stockwerke, Aufzug und Tragewege",
          "Montage, Verpackung und Zugang",
        ]}
        calculatorTitle="Warum der Rechner hier wichtig ist"
        calculatorText="Der FLOXANT Rechner liefert eine Orientierung. Verbindlich wird ein Auftrag erst, wenn Volumen, Etagen, Laufwege, Parkmöglichkeit, Zusatzleistungen und Zeitfenster eingeordnet sind."
        faqTitle="Häufige Fragen zum Umzug"
        faqItems={faqItems}
        bookingTitle="Umzug im Regensburger Einsatzgebiet oder mit Fernziel anfragen"
        bookingText="Nutzen Sie den Rechner für einen klaren Preisrahmen und eine saubere Einsatzvorbereitung. Fernziele außerhalb von 75 km werden nur als Ziel der konkreten Anfrage eingeordnet."
        serviceLinksTitle="Wichtige klare Kontaktmöglichkeiten rund um den Umzug"
        serviceLinks={[
          { href: "/rechner", label: "Umzug direkt kalkulieren" },
          { href: "/beiladung", label: "Beiladung für Einzelmöbel prüfen" },
          { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
          { href: "/urlaubsretter", label: "Urlaubsretter vor Reise oder Übergabe" },
          { href: "/business-errand-service", label: "Erledigungsservice für Schlüssel und Dokumente" },
          { href: "/property-operations", label: "Immobilienbetreuung mit Übergaben und Objektstatus" },
          { href: "/express-anfrage", label: "Express-Anfrage für kurzfristige Umzüge" },
          { href: "/anfrage-mit-preisrahmen", label: "Umzug mit Preisrahmen planen" },
          { href: "/regensburg", label: "Regensburg-Bereich ansehen" },
        ]}
        cityLinksTitle="Lokaler Start und mögliche Ziele einer Anfrage"
        cityLinks={[
          { href: "/regensburg/umzug", label: "Umzug Regensburg" },
          { href: "/umzug-muenchen", label: "Fernziel München anfragen" },
          { href: "/umzug-nuernberg", label: "Fernziel Nürnberg anfragen" },
          { href: "/umzug-augsburg", label: "Fernziel Augsburg anfragen" },
          { href: "/umzug-ingolstadt", label: "Ziel Ingolstadt anfragen" },
          { href: "/region-regensburg", label: "Startort im 75-km-Einsatzgebiet prüfen" },
        ]}
      />
      <ServicePackageSelector groups="umzug" limit={7} />
      <EffortFactorsPanel group="umzug" />
      <ServiceFitGuide
        group="umzug"
        title="Vom Mini-Transport bis Plan B: welcher Umzugspfad passt?"
        intro="Volumen, Etagen, Zeitfenster und Sonderstuecke entscheiden, ob kleiner Umzug, Privatumzug, Beiladung oder Plan B der bessere Start ist."
      />
      <PsychologicalCleaningInternalLinks
        title="Reinigung und Übergabe nach dem Umzug"
        intro="Wenn Transport, Schlüssel, alte Wohnung und Restpunkte zusammenkommen, führen diese Spezialseiten zu weniger Stress vor der Übergabe."
        focusSlugs={[
          "schluesselruhe-service",
          "vermieter-schockschutz-reinigung",
          "panikfrei-in-24h",
          "sichtbar-sauber-protokoll",
          "mama-kommt-morgen-service",
          "reset-reinigung",
        ]}
      />
    </>
  );
}
