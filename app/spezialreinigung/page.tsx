import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, ShieldCheck } from "lucide-react";

import { AiAnswerCard } from "@/components/AiAnswerCard";
import { ChecklistBlock, ComparisonAnswerTable } from "@/components/ai-answer";
import {
  LocalServiceBridge,
  OfferCheckCTA,
  RelatedSpecialServices,
  ServiceClusterLinks,
  SignatureServicesGrid,
} from "@/components/conversion";
import { OfferCheckInlineCTA } from "@/components/OfferCheckInlineCTA";
import { ServiceClarityPanel } from "@/components/ServiceClarityPanel";
import { company } from "@/lib/company";
import {
  offerCheckLinks,
  signatureServiceLinks,
  specialCleaningLinks,
} from "@/lib/signature-special-services";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildRegensburgCleaningAreaServedJsonLd } from "@/lib/regensburg-cleaning-service-area";

const path = "/spezialreinigung";
const canonical = `${company.url}${path}`;

const situations = [
  "Glas, Fassade, Boden oder Außenfläche ist sichtbar verschmutzt, aber Zugang und Material sind unklar.",
  "Vor Übergabe, Besichtigung, Gewerbestart oder Veranstaltung muss Reinigung priorisiert werden.",
  "Ein vorhandenes Reinigungsangebot wirkt teuer, lückenhaft oder schwer vergleichbar.",
  "Büros, Praxen, Hausverwaltungen oder Hotels brauchen keine Keywordliste, sondern eine klare Objektbeschreibung.",
] as const;

const process = [
  "Ort, Objektart, Fläche oder Modul-/Glasfläche nennen.",
  "Fotos von Verschmutzung, Zugang, Höhe und besonderen Risiken senden.",
  "Zeitfenster, Übergabeziel oder vorhandenes Angebot ergaenzen.",
  "FLOXANT trennt machbare Reinigung, offene Rückfragen und klare Grenzen.",
] as const;

const specialCleaningClarityItems = [
  {
    title: "Was der Service ist",
    text: "Spezialreinigung ist ein Prüfweg für Glas, Fassade, Boden, Event, Büro, Praxis oder Übergabe, wenn Zugang, Material oder Zielzustand genauer beschrieben werden müssen.",
  },
  {
    title: "Wann er passt",
    text: "Wenn Fotos, Ort, Fläche, Höhe, Zugang, Wasseranschluss, Zeitfenster oder ein vorhandenes Angebot vorliegen.",
  },
  {
    title: "Wann ein anderer Weg besser ist",
    text: "Wenn es um normale Unterhaltsreinigung, Umzug, Räumung oder reine Angebotsprüfung geht, führt FLOXANT auf die passende Seite.",
  },
  {
    title: "Was FLOXANT braucht",
    text: "Uebersichtsfotos, Nahbilder, Objektart, Ort, Terminwunsch, besondere Risiken und vorhandene Unterlagen.",
  },
] as const;

const boundaries = [
  "Keine pauschale Ergebnis- oder Fleckentfernungsgarantie.",
  "Keine Dach-, Elektro- oder Schadensanierungsarbeiten als Reinigungsversprechen.",
  "Keine Festpreise ohne Zugang, Fotos, Umfang und Terminlage.",
  "Keine medizinische Spezialdesinfektion oder erfundene Zertifikate.",
] as const;

const cleaningAnswerPoints = [
  "Spezialreinigung passt, wenn Zugang, Material, Höhe, Fotos oder Zielzustand vor der Zusage geklaert werden müssen.",
  "Normale Reinigung passt eher, wenn Fläche, Räume, Zustand und Termin ohne besondere Risiken beschreibbar sind.",
  "Angebot prüfen passt, wenn schon Preis, PDF, Screenshot oder Leistungsumfang vorliegt.",
] as const;

const cleaningChecklist = [
  "Objektart und Ort nennen.",
  "Fotos von Zugang, Verschmutzung, Glas, Fassade, Boden oder Übergabeziel senden.",
  "Fläche, Höhe, Etage, Wasseranschluss und Zeitfenster beschreiben.",
  "Vorhandenes Angebot oder Preisrahmen separat markieren.",
  "Keine Ertrags-, Dach-, Elektro- oder Abnahmegarantie erwarten.",
] as const;

const cleaningComparisonRows = [
  {
    topic: "Standardfall",
    left: "Normale Reinigung mit Räumen, Fläche und Termin.",
    right: "Spezialreinigung mit Zugang, Material, Höhe oder Sicherheitsgrenze.",
    decision: "Bei unsicherem Zugang oder Spezialmaterial zuerst Spezialreinigung anfragen.",
  },
  {
    topic: "Vorhandenes Angebot",
    left: "Direkte Anfrage, wenn noch kein Preis oder Anbieter vorliegt.",
    right: "Angebotsprüfung, wenn PDF, Screenshot, Preis oder Leistungsumfang vorhanden ist.",
    decision: "Mit Angebot immer den Prüfpfad nutzen.",
  },
] as const;

const faqItems = [
  {
    q: "Was zählt bei FLOXANT als Spezialreinigung?",
    a: "Spezialreinigung sind Reinigungsfaelle mit besonderem Zugang, Material, Zeitdruck, Objektbezug oder Risiko: Fenster, Fassade, Event, Bauendreinigung, Praxis, Hotel, Hausverwaltung oder Reinigung vor Übergabe.",
  },
  {
    q: "Wie finde ich die passende Spezialreinigung?",
    a: "Beschreiben Sie Objekt, Fläche, Material, Zustand, Zugang und Termin. FLOXANT ordnet die Anfrage der passenden Reinigungsart zu und klärt offene Punkte direkt mit Ihnen.",
  },
  {
    q: "Kann ich ein vorhandenes Reinigungsangebot prüfen lassen?",
    a: "Ja. Umfang, Fläche, Turnus, Zusatzpositionen, Fotos, Zugang und Termin können sachlich eingeordnet werden. FLOXANT verspricht dabei keinen besseren Preis.",
  },
  {
    q: "Welche Angaben helfen für Spezialreinigung?",
    a: "Objektart, Adresse oder Stadt, Fläche, Verschmutzung, Fotos, Zugang, Höhe, Wasseranschluss, Terminfenster, Übergabeziel und ein Kontaktweg reichen für den Start.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Spezialreinigung mit Fotos, Zugang und Ziel klären",
  description:
    "FLOXANT ordnet Spezialreinigung für Glas, Fassade, Boden, Event, Büro, Praxis und Übergabe nach Fotos, Zugang und Material ein.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Spezialreinigung mit Fotos und klarer Machbarkeitspruefung",
    description:
      "Glas, Fassade, Boden, Event, Büro, Praxis und Übergabe sinnvoll einordnen, ohne falsche Garantien.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Spezialreinigung",
        description:
          "FLOXANT Spezialreinigung für Glas, Fassade, Boden, Event, Bauendreinigung, Praxis, Hotel, Hausverwaltung und Reinigung vor Übergabe.",
        path,
        about: specialCleaningLinks.map((item) => item.title),
        potentialActions: [
          { name: "Spezialreinigung anfragen", target: "/kontakt#direktanfrage", type: "ContactAction" },
          { name: "Angebot pruefen lassen", target: "/angebot-guenstiger-pruefen#guenstiger-form" },
        ],
      }),
      buildServiceJsonLd({
        name: "Spezialreinigung",
        description:
          "Praktische Machbarkeitspruefung für Spezialreinigung mit Fotos, Zugang, Material, Termin und klaren Grenzen.",
        path,
        serviceType: "Spezialreinigung",
        areaServed: buildRegensburgCleaningAreaServedJsonLd(),
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: "/leistungen" },
        { name: "Spezialreinigung", item: path },
      ]),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

export default function SpezialreinigungPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              FLOXANT Spezialreinigung
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Spezialreinigung mit Fotos, Zugang und Ziel klar einordnen.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
              Spezialreinigung braucht mehr als ein Stichwort. FLOXANT prüft Fotos,
              Zugang, Material, Zeitfenster, Risiko und Zielzustand, bevor aus einer
              Anfrage eine realistische Leistung wird.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/kontakt#direktanfrage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
              >
                Spezialreinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/angebot-guenstiger-pruefen#guenstiger-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
              >
                Angebot prüfen lassen
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {situations.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/12 bg-white/[0.06] p-4 text-sm font-bold leading-6 text-slate-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceClarityPanel
        title="Spezialreinigung braucht erst Machbarkeit, dann Zusage."
        intro="Glas, Fassade, Boden, Event, Praxis, Hotel oder Übergabe können sehr unterschiedliche Anforderungen haben. FLOXANT trennt deshalb normale Reinigung, Spezialfall und Angebotsprüfung sauber."
        items={specialCleaningClarityItems}
      />

      <OfferCheckInlineCTA
        title="Schon ein Spezialreinigungs-Angebot erhalten?"
        text="Wenn Preis, Zugang, Material, Termin oder Zusatzpositionen unklar wirken, kann FLOXANT das Angebot praktisch einordnen. Keine Ertrags-, Preis- oder Machbarkeitsgarantie."
      />

      <RelatedSpecialServices
        title="Welche Spezialreinigung passt zum Fall?"
        intro="Diese Services sind nur dann hilfreich, wenn Zugang, Material, Zeitfenster und Ziel klar genug beschrieben sind."
        services={specialCleaningLinks}
        limit={8}
      />

      <AiAnswerCard
        title="Spezialreinigung beginnt mit Zugang, Fotos und Zielzustand."
        answer="FLOXANT trennt normale Reinigung, Spezialreinigung und Angebotsprüfung, damit Glas, Fassade, Boden, Praxis, Hotel, Bauendreinigung oder Übergabe nicht als pauschaler Standardfall behandelt werden."
        points={cleaningAnswerPoints}
        nextStep="Naechster Schritt: Fotos, Objektart, Ort, Termin und vorhandenes Angebot mitsenden."
      />

      <ComparisonAnswerTable
        title="Reinigung, Spezialreinigung oder Angebotsprüfung?"
        intro="Der richtige Weg haengt davon ab, ob nur gereinigt werden soll, ob technische Grenzen offen sind oder ob bereits ein Angebot vorliegt."
        leftLabel="Direkte Reinigung"
        rightLabel="Spezial-/Pruefpfad"
        rows={cleaningComparisonRows}
      />

      <ChecklistBlock
        title="Checkliste für Spezialreinigung"
        intro="Diese Angaben reichen für eine serioese Vorprüfung, ohne Preise oder Verfügbarkeit zu erfinden."
        items={cleaningChecklist}
        columns={3}
      />

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Camera className="h-4 w-4" aria-hidden="true" />
              Anfragefuehrung
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Was FLOXANT für eine serioese Einschätzung braucht.
            </h2>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {process.map((item, index) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceClusterLinks
        eyebrow="Grenzen und Sicherheit"
        title="Was bei Spezialreinigung nicht versprochen wird."
        intro="Klare Grenzen schützen Erwartungen und Ausführung. FLOXANT trennt Reinigungsarbeiten von Technik, Sanierung und rechtlicher Haftungsbewertung."
        links={boundaries.map((text) => ({
          title: text,
          text: "Diese Grenze wird vor einer Zusage sichtbar gemacht, damit aus der Anfrage kein falsches Versprechen wird.",
          href: "/kontakt#direktanfrage",
          cta: "Fall klären",
        }))}
      />

      <SignatureServicesGrid
        title="Welche Signature Services zu Spezialreinigung passen."
        intro="Angebotscheck, Objektbrief, Übergabeakte und Plan B helfen, wenn die Reinigung Teil einer größeren Entscheidung ist."
        services={signatureServiceLinks.filter((item) =>
          ["FLOXANT Angebotscheck", "FLOXANT Objektbrief", "FLOXANT Uebergabeakte", "FLOXANT Plan-B-Service"].includes(item.title),
        )}
      />

      <LocalServiceBridge
        serviceLabel="Spezialreinigung"
        regensburgHref="/regensburg/reinigung"
      />

      <OfferCheckCTA />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Häufige Fragen zur Spezialreinigung.</h2>
          </article>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white px-5 py-4">
                <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ServiceClusterLinks
        eyebrow="Angebot und Entscheidung"
        title="Wenn schon ein Angebot, Preis oder Anbieter im Raum steht."
        intro="Spezialreinigung wird oft falsch verglichen, wenn Zugang, Material, Zeitfenster oder Zusatzleistungen fehlen."
        links={offerCheckLinks}
      />
    </main>
  );
}
