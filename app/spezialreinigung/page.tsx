import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, ShieldCheck } from "lucide-react";

import {
  LocalServiceBridge,
  OfferCheckCTA,
  RelatedSpecialServices,
  ServiceClusterLinks,
  SignatureServicesGrid,
} from "@/components/conversion";
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

const path = "/spezialreinigung";
const canonical = `${company.url}${path}`;

const situations = [
  "PV-Anlage, Glas, Fassade oder Aussenflaeche ist sichtbar verschmutzt, aber Zugang und Risiko sind unklar.",
  "Vor Uebergabe, Besichtigung, Gewerbestart oder Veranstaltung muss Reinigung priorisiert werden.",
  "Ein vorhandenes Reinigungsangebot wirkt teuer, lueckenhaft oder schwer vergleichbar.",
  "Bueros, Praxen, Hausverwaltungen oder Hotels brauchen keine Keywordliste, sondern eine klare Objektbeschreibung.",
] as const;

const process = [
  "Ort, Objektart, Flaeche oder Modul-/Glasflaeche nennen.",
  "Fotos von Verschmutzung, Zugang, Hoehe und besonderen Risiken senden.",
  "Zeitfenster, Uebergabeziel oder vorhandenes Angebot ergaenzen.",
  "FLOXANT trennt machbare Reinigung, offene Rueckfragen und klare Grenzen.",
] as const;

const boundaries = [
  "Keine Ertragsgarantie bei PV-Anlagen.",
  "Keine Dach-, Elektro- oder Schadensanierungsarbeiten als Reinigungsversprechen.",
  "Keine Festpreise ohne Zugang, Fotos, Umfang und Terminlage.",
  "Keine medizinische Spezialdesinfektion oder erfundene Zertifikate.",
] as const;

const faqItems = [
  {
    q: "Was zaehlt bei FLOXANT als Spezialreinigung?",
    a: "Spezialreinigung sind Reinigungsfaelle mit besonderem Zugang, Material, Zeitdruck, Objektbezug oder Risiko: Solar/PV, Glas, Fassade, Event, Bauendreinigung light, Praxis, Hotel, Hausverwaltung oder Reinigung vor Uebergabe.",
  },
  {
    q: "Warum gibt es nicht fuer jede Reinigungsart eine eigene lokale Seite?",
    a: "FLOXANT erstellt nur eigene Seiten, wenn Suchintention, Kundennutzen und Inhalt genug Substanz haben. Sonst wird der Service als Abschnitt, FAQ oder interner Link gefuehrt.",
  },
  {
    q: "Kann ich ein vorhandenes Reinigungsangebot pruefen lassen?",
    a: "Ja. Umfang, Flaeche, Turnus, Zusatzpositionen, Fotos, Zugang und Termin koennen sachlich eingeordnet werden. FLOXANT verspricht dabei keinen besseren Preis.",
  },
  {
    q: "Welche Angaben helfen fuer Spezialreinigung?",
    a: "Objektart, Adresse oder Stadt, Flaeche, Verschmutzung, Fotos, Zugang, Hoehe, Wasseranschluss, Terminfenster, Uebergabeziel und ein Kontaktweg reichen fuer den Start.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Spezialreinigung | PV, Glas, Fassade & Uebergabe | FLOXANT",
  description:
    "Spezialreinigung fuer PV, Glas, Fassade, Event, Buero, Praxis und Uebergabe: Fotos, Zugang, Risiko und Angebot sauber pruefen lassen.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Spezialreinigung mit Fotos und klarer Machbarkeitspruefung",
    description:
      "PV, Glas, Fassade, Event, Buero, Praxis und Uebergabe sinnvoll einordnen, ohne falsche Garantien.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Spezialreinigung",
        description:
          "FLOXANT Spezialreinigung fuer PV, Glas, Fassade, Event, Bauendreinigung light, Praxis, Hotel, Hausverwaltung und Reinigung vor Uebergabe.",
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
          "Praktische Machbarkeitspruefung fuer Spezialreinigung mit Fotos, Zugang, Material, Termin und klaren Grenzen.",
        path,
        serviceType: "Spezialreinigung",
        areaServed: ["Duesseldorf", "Regensburg", "Bayern nach Pruefung"],
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
              Spezialreinigung fuer PV, Glas, Fassade, Buero und Uebergabe.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
              Spezialreinigung braucht mehr als ein Stichwort. FLOXANT prueft Fotos,
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
                Angebot pruefen lassen
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

      <RelatedSpecialServices
        title="Welche Spezialreinigung passt zum Fall?"
        intro="Diese Services sind nur dann hilfreich, wenn Zugang, Material, Zeitfenster und Ziel klar genug beschrieben sind."
        services={specialCleaningLinks}
        limit={8}
      />

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Camera className="h-4 w-4" aria-hidden="true" />
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
        eyebrow="Grenzen und Sicherheit"
        title="Was bei Spezialreinigung nicht versprochen wird."
        intro="Klare Grenzen schuetzen Kundenerwartung und Ausfuehrung. FLOXANT trennt Reinigung von Technik, Sanierung, Garantie und Haftungsversprechen."
        links={boundaries.map((text) => ({
          title: text,
          text: "Diese Grenze wird vor einer Zusage sichtbar gemacht, damit aus der Anfrage kein falsches Versprechen wird.",
          href: "/kontakt#direktanfrage",
          cta: "Fall klaeren",
        }))}
      />

      <SignatureServicesGrid
        title="Welche Signature Services zu Spezialreinigung passen."
        intro="Angebot, Objektbrief, Plan B, PV-Sichtklar und Uebergabe-Sprint helfen, wenn die Reinigung Teil einer groesseren Entscheidung ist."
        services={signatureServiceLinks.filter((item) =>
          ["FLOXANT Fairpreis-Check", "FLOXANT Objektbrief", "FLOXANT Uebergabe-Sprint", "FLOXANT Plan-B-Service", "FLOXANT PV-Sichtklar-Service"].includes(item.title),
        )}
      />

      <LocalServiceBridge
        serviceLabel="Spezialreinigung"
        duesseldorfHref="/duesseldorf/reinigung"
        regensburgHref="/regensburg/reinigung"
      />

      <OfferCheckCTA />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Haeufige Fragen zur Spezialreinigung.</h2>
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
