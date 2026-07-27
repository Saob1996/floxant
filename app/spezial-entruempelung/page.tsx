import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Home } from "lucide-react";

import { AiAnswerCard } from "@/components/AiAnswerCard";
import { ChecklistBlock, QuickDecisionBox } from "@/components/ai-answer";
import {
  LocalServiceBridge,
  OfferCheckCTA,
  RelatedSpecialServices,
  ServiceClusterLinks,
  SignatureServicesGrid,
} from "@/components/conversion";
import { company } from "@/lib/company";
import {
  signatureServiceLinks,
  specialClearanceLinks,
} from "@/lib/signature-special-services";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/spezial-entruempelung";
const canonical = `${company.url}${path}`;

const situations = [
  "Keller, Garage, Dachboden oder Lager muss raus, aber Menge, Zugang und Entsorgung sind unklar.",
  "Wohnungsauflösung, Haushaltsauflösung oder Nachlass braucht ruhige Abstimmung mit Freigabe und Ansprechpartner.",
  "Vor Übergabe, Verkauf oder Neuvermietung haengen Räumung, Reinigung, Fotos und Restpunkte zusammen.",
  "Sensible Situationen brauchen würdevolle Sprache, klare Grenzen und keine abwertenden Etiketten.",
] as const;

const process = [
  "Ort, Objektart, Zugang, Etage, Aufzug und Ansprechpartner nennen.",
  "Fotos von Räumen, Mengen, sperrigen Teilen, Schadstoffen und Restpunkten senden.",
  "Freigabe, Frist, Zielzustand, Schlüsselweg und Reinigung danach ergaenzen.",
  "FLOXANT trennt Räumung, Entsorgung, Übergabe, Reinigung und offene Rückfragen.",
] as const;

const boundaries = [
  "Keine Entsorgungszusage ohne Material, Menge, Zugang und Fotos.",
  "Keine Bewertung sensibler Wohn- oder Nachlasssituationen.",
  "Keine Festpreise ohne Freigabe, Umfang, Etage, Laufweg und Zielzustand.",
  "Keine Vermieter-, Rechts- oder Schadensberatung als Räumungsversprechen.",
] as const;

const clearanceAnswerPoints = [
  "Keller, Garage, Dachboden und Lager brauchen Fotos, Menge, Material und Zugang.",
  "Wohnungs- und Haushaltsauflösung brauchen Freigabe, Ansprechpartner, Zielzustand und oft Reinigung danach.",
  "Sensible Faelle werden sachlich beschrieben; FLOXANT verspricht keine Rechtsberatung und nutzt keine abwertende Sprache.",
] as const;

const clearanceChecklist = [
  "Ort, Objektart, Räume und grobe Menge nennen.",
  "Fotos von Mengen, sperrigen Teilen, Zugang und Restpunkten senden.",
  "Freigabe, Ansprechpartner und Zielzustand klären.",
  "Reinigung danach oder Übergabetermin markieren.",
  "Sensible Lage nur so weit beschreiben, wie für die Einordnung nötig.",
] as const;

const faqItems = [
  {
    q: "Was zählt bei FLOXANT als Spezial-Entrümpelung?",
    a: "Spezial-Entrümpelung umfasst Keller, Garage, Dachboden, Lager, Nachlass, Wohnungsauflösung, Haushaltsauflösung, diskrete Fälle und Räumung vor Übergabe.",
  },
  {
    q: "Welche Angaben helfen für eine realistische Einschätzung?",
    a: "Ort, Objektart, Fotos, Menge, Material, Etage, Zugang, Freigabe, Frist, Zielzustand und Ansprechpartner reichen für den Start.",
  },
  {
    q: "Kann Reinigung nach der Entrümpelung mitgedacht werden?",
    a: "Ja. Wenn der Zielzustand Übergabe, Besichtigung, Neuvermietung oder Verkauf ist, können Räumung, Restpunkte, Reinigung und Fotos zusammen eingeordnet werden.",
  },
  {
    q: "Wie geht FLOXANT mit sensiblen Faellen um?",
    a: "FLOXANT nutzt ruhige, sachliche Sprache und fragt nach Freigabe, Ziel, Ansprechpartner und Grenzen. Abwertende Begriffe werden vermieden.",
  },
] as const;

const clearanceSignatureServices = signatureServiceLinks.filter((item) =>
  [
    "FLOXANT Fairpreis-Check",
    "FLOXANT Objektbrief",
    "FLOXANT Uebergabeakte",
    "FLOXANT Uebergabe-Sprint",
    "FLOXANT Plan-B-Service",
    "FLOXANT Diskret-Service",
    "FLOXANT Vermieter-Ready-Service",
  ].includes(item.title),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Spezial-Entrümpelung | Keller, Nachlass, Übergabe | FLOXANT",
  description:
    "Spezial-Entrümpelung mit FLOXANT: Keller, Garage, Dachboden, Lager, Nachlass, Wohnungsauflösung und Übergabe mit Fotos und Freigabe klären.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Spezial-Entrümpelung mit sorgfältiger Machbarkeitsprüfung",
    description:
      "Keller, Lager, Nachlass, Wohnungsauflösung und Räumung vor Übergabe anhand von Fotos, Freigabe und Zielzustand einordnen.",
    images: [
      {
        url: "/assets/service-clearance.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Spezial-Entrümpelung und Räumung",
      },
    ],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Spezial-Entrümpelung",
        description:
          "FLOXANT Spezial-Entrümpelung für Keller, Garage, Dachboden, Lager, Nachlass, Wohnungsauflösung, Haushaltsauflösung und Räumung vor Übergabe.",
        path,
        about: specialClearanceLinks.map((item) => item.title),
        potentialActions: [
          { name: "Spezial-Entrümpelung anfragen", target: "/kontakt?service=entruempelung&source=spezial-entruempelung#direktanfrage", type: "ContactAction" },
          { name: "Uebergabe vorbereiten", target: "/uebergabeakte" },
        ],
      }),
      buildServiceJsonLd({
        name: "Spezial-Entrümpelung",
        description:
          "Machbarkeitspruefung für besondere Räumungs- und Aufloesungsfaelle mit Fotos, Freigabe, Zugang, Entsorgung und Zielzustand.",
        path,
        serviceType: "Spezial-Entrümpelung und Auflösung",
        areaServed: ["Regensburg", "Düsseldorf", "Bayern nach Prüfung"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: "/leistungen" },
        { name: "Spezial-Entrümpelung", item: path },
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

export default function SpezialentruempelungPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/service-clearance.webp"
          alt="FLOXANT Spezial-Entrümpelung mit sortierter Räumung"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.86)_58%,rgba(15,23,42,0.48)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100 backdrop-blur">
              <Home className="h-4 w-4" aria-hidden="true" />
              FLOXANT Spezial-Entrümpelung
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Spezial-Entrümpelung für Keller, Nachlass und Lager respektvoll klären.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
              Spezial-Entrümpelung braucht Fotos, Freigabe, Zielzustand und ruhige
              Kommunikation. FLOXANT sortiert Räumung, Entsorgung, Reinigung,
              Übergabe und sensible Grenzen, bevor etwas zugesagt wird.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/kontakt?service=entruempelung&source=spezial-entruempelung#direktanfrage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
              >
                Spezial-Entrümpelung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/uebergabeakte"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
              >
                Übergabe vorbereiten
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {situations.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/12 bg-white/[0.08] p-4 text-sm font-bold leading-6 text-slate-100 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedSpecialServices
        kind="clearance"
        title="Welche Räumungs-Spezialleistung passt zum Fall?"
        intro="Diese Wege helfen, wenn Keller, Nachlass, Lager oder Übergabe mehr Struktur brauchen als eine einfache Entrümpelungsanfrage."
        services={specialClearanceLinks}
        limit={8}
      />

      <AiAnswerCard
        title="Spezial-Entrümpelung braucht Freigabe, Fotos und Zielzustand."
        answer="FLOXANT trennt Räumung, Entsorgung, Reinigung, Übergabe und sensible Kommunikation, damit Nachlass, Keller, Lager oder belastete Räume nicht pauschal behandelt werden."
        points={clearanceAnswerPoints}
        nextStep="Naechster Schritt: Fotos, Ort, Freigabe, Menge, Zugang und Zielzustand mitsenden."
      />

      <QuickDecisionBox
        title="Räumung, Auflösung oder Übergabe-Sprint?"
        fits={[
          "Fotos, Menge, Zugang und Freigabe sind grob beschreibbar.",
          "Räumung und Reinigung haengen mit Übergabe, Verkauf oder Neuvermietung zusammen.",
          "Ein sensibler Fall braucht ruhige Kommunikation und klare Grenzen.",
        ]}
        notFits={[
          "Eigentum, Freigabe oder Berechtigung sind unklar.",
          "Es wird Rechtsberatung, Wertgutachten oder eine verbindliche Abnahmezusage erwartet.",
          "Gefahrstoffe oder Spezialentsorgung sollen ohne Prüfung zugesagt werden.",
        ]}
        nextSteps={[
          "Keller/Garage: Fotos und Menge senden.",
          "Nachlass/Wohnung: Freigabe und Ansprechpartner nennen.",
          "Übergabe naht: Übergabeakte oder Übergabe-Sprint nutzen.",
        ]}
        ctaHref="/kontakt?service=entruempelung&intent=spezial-entruempelung-einordnen&source=spezial-entruempelung#direktanfrage"
        ctaLabel="Raeumung einordnen"
      />

      <ChecklistBlock
        title="Checkliste für Spezial-Entrümpelung"
        intro="Diese Angaben helfen, ohne sensible Details unnoetig breit zu machen."
        items={clearanceChecklist}
        columns={3}
      />

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
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
        eyebrow="Grenzen und Würde"
        title="Was bei Spezial-Entrümpelung nicht pauschal versprochen wird."
        intro="FLOXANT trennt Räumung, Entsorgung, Reinigung, Übergabe und rechtliche Fragen. Sensible Situationen werden sachlich und respektvoll beschrieben."
        links={boundaries.map((text) => ({
          title: text,
          text: "Diese Grenze wird vor einer Zusage sichtbar gemacht, damit Umfang, Zielzustand und Verantwortung nicht geraten werden.",
          href: "/kontakt?service=entruempelung&source=spezial-entruempelung#direktanfrage",
          cta: "Fall klären",
        }))}
      />

      <SignatureServicesGrid
        title="Welche besonderen Leistungen zur Spezial-Entrümpelung passen."
        intro="Objektbrief, Übergabeakte, Übergabe-Sprint, Plan B, Diskret-Service und Vermieter-Ready helfen, wenn Räumung Teil einer größeren Frist ist."
        services={clearanceSignatureServices}
      />

      <LocalServiceBridge
        serviceLabel="Spezial-Entrümpelung"
        duesseldorfHref="/duesseldorf/entsorgung"
        regensburgHref="/regensburg/entruempelung"
      />

      <OfferCheckCTA
        title="Liegt schon ein Räumungs- oder Aufloesungsangebot vor?"
        text="FLOXANT kann Umfang, Zusatzpositionen, Entsorgung, Zugang, Fotos, Zielzustand und Preisrahmen sachlich einordnen. Keine Preisgarantie, keine Abwertung anderer Anbieter."
      />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Häufige Fragen zur Spezial-Entrümpelung.</h2>
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
    </main>
  );
}
