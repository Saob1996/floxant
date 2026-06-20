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
  "Wohnungsaufloesung, Haushaltsaufloesung oder Nachlass braucht ruhige Abstimmung mit Freigabe und Ansprechpartner.",
  "Vor Uebergabe, Verkauf oder Neuvermietung haengen Raeumung, Reinigung, Fotos und Restpunkte zusammen.",
  "Sensible Situationen brauchen wuerdevolle Sprache, klare Grenzen und keine abwertenden Etiketten.",
] as const;

const process = [
  "Ort, Objektart, Zugang, Etage, Aufzug und Ansprechpartner nennen.",
  "Fotos von Raeumen, Mengen, sperrigen Teilen, Schadstoffen und Restpunkten senden.",
  "Freigabe, Frist, Zielzustand, Schluesselweg und Reinigung danach ergaenzen.",
  "FLOXANT trennt Raeumung, Entsorgung, Uebergabe, Reinigung und offene Rueckfragen.",
] as const;

const boundaries = [
  "Keine Entsorgungszusage ohne Material, Menge, Zugang und Fotos.",
  "Keine Bewertung sensibler Wohn- oder Nachlasssituationen.",
  "Keine Festpreise ohne Freigabe, Umfang, Etage, Laufweg und Zielzustand.",
  "Keine Vermieter-, Rechts- oder Schadensberatung als Raeumungsversprechen.",
] as const;

const clearanceAnswerPoints = [
  "Keller, Garage, Dachboden und Lager brauchen Fotos, Menge, Material und Zugang.",
  "Wohnungs- und Haushaltsaufloesung brauchen Freigabe, Ansprechpartner, Zielzustand und oft Reinigung danach.",
  "Sensible Faelle werden sachlich beschrieben; FLOXANT verspricht keine Rechtsberatung und nutzt keine abwertende Sprache.",
] as const;

const clearanceChecklist = [
  "Ort, Objektart, Raeume und grobe Menge nennen.",
  "Fotos von Mengen, sperrigen Teilen, Zugang und Restpunkten senden.",
  "Freigabe, Ansprechpartner und Zielzustand klaeren.",
  "Reinigung danach oder Uebergabetermin markieren.",
  "Sensible Lage nur so weit beschreiben, wie fuer die Einordnung noetig.",
] as const;

const faqItems = [
  {
    q: "Was zaehlt bei FLOXANT als Spezialentruempelung?",
    a: "Spezialentruempelung umfasst Keller, Garage, Dachboden, Lager, Nachlass, Wohnungsaufloesung, Haushaltsaufloesung, diskrete Faelle und Raeumung vor Uebergabe.",
  },
  {
    q: "Welche Angaben helfen fuer eine realistische Einschaetzung?",
    a: "Ort, Objektart, Fotos, Menge, Material, Etage, Zugang, Freigabe, Frist, Zielzustand und Ansprechpartner reichen fuer den Start.",
  },
  {
    q: "Kann Reinigung nach der Entruempelung mitgedacht werden?",
    a: "Ja. Wenn der Zielzustand Uebergabe, Besichtigung, Neuvermietung oder Verkauf ist, koennen Raeumung, Restpunkte, Reinigung und Fotos zusammen eingeordnet werden.",
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
  title: "Spezialentruempelung | Keller, Nachlass, Uebergabe | FLOXANT",
  description:
    "Spezialentruempelung mit FLOXANT: Keller, Garage, Dachboden, Lager, Nachlass, Wohnungsaufloesung und Uebergabe mit Fotos und Freigabe klaeren.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Spezialentruempelung mit wuerdevoller Machbarkeitspruefung",
    description:
      "Keller, Lager, Nachlass, Wohnungsaufloesung und Raeumung vor Uebergabe anhand von Fotos, Freigabe und Zielzustand einordnen.",
    images: [
      {
        url: "/assets/service-clearance.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Spezialentruempelung und Raeumung",
      },
    ],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Spezialentruempelung",
        description:
          "FLOXANT Spezialentruempelung fuer Keller, Garage, Dachboden, Lager, Nachlass, Wohnungsaufloesung, Haushaltsaufloesung und Raeumung vor Uebergabe.",
        path,
        about: specialClearanceLinks.map((item) => item.title),
        potentialActions: [
          { name: "Spezialentruempelung anfragen", target: "/kontakt?service=entruempelung&source=spezial-entruempelung#direktanfrage", type: "ContactAction" },
          { name: "Uebergabe vorbereiten", target: "/uebergabeakte" },
        ],
      }),
      buildServiceJsonLd({
        name: "Spezialentruempelung",
        description:
          "Machbarkeitspruefung fuer besondere Raeumungs- und Aufloesungsfaelle mit Fotos, Freigabe, Zugang, Entsorgung und Zielzustand.",
        path,
        serviceType: "Spezialentruempelung und Aufloesung",
        areaServed: ["Regensburg", "Duesseldorf", "Bayern nach Pruefung"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: "/leistungen" },
        { name: "Spezialentruempelung", item: path },
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
          src="/assets/service-clearance.png"
          alt="FLOXANT Spezialentruempelung mit sortierter Raeumung"
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
              FLOXANT Spezialentruempelung
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Keller, Nachlass, Lager, Wohnungsaufloesung und Uebergabe respektvoll klaeren.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
              Spezialentruempelung braucht Fotos, Freigabe, Zielzustand und ruhige
              Kommunikation. FLOXANT sortiert Raeumung, Entsorgung, Reinigung,
              Uebergabe und sensible Grenzen, bevor etwas zugesagt wird.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/kontakt?service=entruempelung&source=spezial-entruempelung#direktanfrage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
              >
                Spezialentruempelung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/uebergabeakte"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
              >
                Uebergabe vorbereiten
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
        title="Welche Raeumungs-Spezialleistung passt zum Fall?"
        intro="Diese Wege helfen, wenn Keller, Nachlass, Lager oder Uebergabe mehr Struktur brauchen als eine einfache Entruempelungsanfrage."
        services={specialClearanceLinks}
        limit={8}
      />

      <AiAnswerCard
        title="Spezialentruempelung braucht Freigabe, Fotos und Zielzustand."
        answer="FLOXANT trennt Raeumung, Entsorgung, Reinigung, Uebergabe und sensible Kommunikation, damit Nachlass, Keller, Lager oder belastete Raeume nicht pauschal behandelt werden."
        points={clearanceAnswerPoints}
        nextStep="Naechster Schritt: Fotos, Ort, Freigabe, Menge, Zugang und Zielzustand mitsenden."
      />

      <QuickDecisionBox
        title="Raeumung, Aufloesung oder Uebergabe-Sprint?"
        fits={[
          "Fotos, Menge, Zugang und Freigabe sind grob beschreibbar.",
          "Raeumung und Reinigung haengen mit Uebergabe, Verkauf oder Neuvermietung zusammen.",
          "Ein sensibler Fall braucht ruhige Kommunikation und klare Grenzen.",
        ]}
        notFits={[
          "Eigentum, Freigabe oder Berechtigung sind unklar.",
          "Es wird Rechtsberatung, Wertgutachten oder eine verbindliche Abnahmezusage erwartet.",
          "Gefahrstoffe oder Spezialentsorgung sollen ohne Pruefung zugesagt werden.",
        ]}
        nextSteps={[
          "Keller/Garage: Fotos und Menge senden.",
          "Nachlass/Wohnung: Freigabe und Ansprechpartner nennen.",
          "Uebergabe naht: Uebergabeakte oder Uebergabe-Sprint nutzen.",
        ]}
        ctaHref="/kontakt?service=entruempelung&intent=spezial-entruempelung-einordnen&source=spezial-entruempelung#direktanfrage"
        ctaLabel="Raeumung einordnen"
      />

      <ChecklistBlock
        title="Checkliste fuer Spezialentruempelung"
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
              Was FLOXANT fuer eine serioese Einschaetzung braucht.
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
        eyebrow="Grenzen und Wuerde"
        title="Was bei Spezialentruempelung nicht pauschal versprochen wird."
        intro="FLOXANT trennt Raeumung, Entsorgung, Reinigung, Uebergabe und rechtliche Fragen. Sensible Situationen werden sachlich und respektvoll beschrieben."
        links={boundaries.map((text) => ({
          title: text,
          text: "Diese Grenze wird vor einer Zusage sichtbar gemacht, damit Umfang, Zielzustand und Verantwortung nicht geraten werden.",
          href: "/kontakt?service=entruempelung&source=spezial-entruempelung#direktanfrage",
          cta: "Fall klaeren",
        }))}
      />

      <SignatureServicesGrid
        title="Welche Signature Services zu Spezialentruempelung passen."
        intro="Objektbrief, Uebergabeakte, Uebergabe-Sprint, Plan B, Diskret-Service und Vermieter-Ready helfen, wenn Raeumung Teil einer groesseren Frist ist."
        services={clearanceSignatureServices}
      />

      <LocalServiceBridge
        serviceLabel="Spezialentruempelung"
        duesseldorfHref="/duesseldorf/entruempelung"
        regensburgHref="/regensburg/entruempelung"
      />

      <OfferCheckCTA
        title="Liegt schon ein Raeumungs- oder Aufloesungsangebot vor?"
        text="FLOXANT kann Umfang, Zusatzpositionen, Entsorgung, Zugang, Fotos, Zielzustand und Preisrahmen sachlich einordnen. Keine Preisgarantie, keine Abwertung anderer Anbieter."
      />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Haeufige Fragen zur Spezialentruempelung.</h2>
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
