import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  Phone,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

import { OfferComparisonAdsForm } from "@/components/OfferComparisonAdsForm";
import { OfferCheckAuthoritySections, OfferCheckFormIntro } from "@/components/offer-check";
import { company, duesseldorfCompany } from "@/lib/company";
import { getServiceVisual } from "@/lib/service-visuals";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/angebot-vergleichen-duesseldorf";
const canonical = `${company.url}${path}`;
const title = "Reinigungsangebot prüfen Düsseldorf | Angebot Reinigung vergleichen | FLOXANT";
const description =
  "Angebot für Reinigungsarbeiten in Düsseldorf prüfen: Reinigungsfirma Angebote, Putzfirma Angebot und Gebäudereinigung sachlich vergleichen.";
const heroVisual = getServiceVisual({
  region: "duesseldorf",
  slug: "angebot-vergleichen",
  path,
  serviceLabel: "Angebotsprüfung",
});
const heroImage = heroVisual.src;
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich habe ein Reinigungsangebot für Düsseldorf erhalten und möchte Umfang, Turnus und offene Punkte prüfen lassen.",
    "Objektart, Stadtteil, Fläche, Turnus, Angebot oder Eckdaten kann ich senden.",
  ].join("\n"),
);

const trustItems = [
  "Unverbindliche Einordnung",
  "Keine Preisgarantie",
  "Keine Unterbietungszusage",
  "Prüfung nach Objekt und Umfang",
  "WhatsApp oder Upload möglich",
  "Für Düsseldorfer Reinigungsangebote",
] as const;

const processSteps = [
  {
    title: "Angebot oder Eckdaten senden",
    text: "PDF, JPG, PNG oder eine kurze Beschreibung reichen für den Start.",
  },
  {
    title: "Umfang und Turnus prüfen",
    text: "FLOXANT betrachtet Objektart, Fläche, Reinigungsumfang, Turnus, Zeitfenster, Zugang und offene Punkte.",
  },
  {
    title: "Rückmeldung erhalten",
    text: "Sie erfahren, ob Angaben fehlen und ob FLOXANT für die Reinigungsanfrage eine passende Alternative anbieten kann.",
  },
  {
    title: "Nächsten Schritt klären",
    text: "Sie erhalten eine Rückmeldung, welche Angaben fehlen und ob FLOXANT eine passende Alternative prüfen kann.",
  },
];

const faqItems = [
  {
    q: "Was passiert nach dem Absenden?",
    a: "FLOXANT prüft Objektart, Umfang, Fläche, Turnus, Zeitfenster, Zugang, Fotos und offene Punkte. Eine verbindliche Leistung entsteht erst nach separater Abstimmung.",
  },
  {
    q: "Muss ich bereits ein Angebot haben?",
    a: "Nein. Sie können ein Angebot hochladen, Eckdaten eintragen oder auch ohne vorhandenes Angebot eine erste Einschätzung anfragen.",
  },
  {
    q: "Wird FLOXANT das bestehende Angebot garantiert unterbieten?",
    a: "Nein. FLOXANT gibt keine Preisgarantie und verspricht kein Unterbieten. Jede Anfrage wird individuell nach Objekt, Umfang, Turnus und Rahmenbedingungen bewertet.",
  },
  {
    q: "Welche Leistungen kann FLOXANT prüfen?",
    a: "Auf dieser Seite geht es um Reinigungsangebote in Düsseldorf: Putzfirma, Wohnungsreinigung, Gewerbereinigung, Büroreinigung, Praxisreinigung, Gebäudereinigung, Unterhaltsreinigung, Treppenhausreinigung, Endreinigung und Grundreinigung.",
  },
  {
    q: "Kann ich ein Putzfirma- oder Gebäudereinigungsangebot prüfen lassen?",
    a: "Ja. Senden Sie Angebot, Umfang, Fläche, Stadtteil, Turnus, Fotos und Zusatzpositionen. FLOXANT prüft sachlich, ob die Angaben vergleichbar sind und ob eine passende Alternative möglich ist.",
  },
  {
    q: "Gilt diese Seite nur für Düsseldorf?",
    a: "Ja. Diese Seite ist für Düsseldorfer Reinigungsangebote gedacht. Andere Angebotsprüfungen laufen über die separate allgemeine Angebotsprüfung.",
  },
  {
    q: "Kann ich auch ohne fertiges Angebot anfragen?",
    a: "Ja. Dann reichen Stadtteil, Objektart, Fläche, gewünschter Turnus, Fotos, Zeitfenster und ein kurzer Preisrahmen für die erste Einordnung.",
  },
];

const offerAreas = [
  ["Putzfirma", "Für Wohnung, Büro, Praxis, Auszug, Übergabe oder Alltagsreinigung, wenn ein Putzfirma-Angebot schwer vergleichbar ist."],
  ["Wohnungsreinigung", "Für bewohnte oder leere Wohnungen, Grundreinigung, Reinigung nach Auszug und Vorbereitung vor Wohnungsübergabe."],
  ["Gewerbereinigung", "Für Firmenflächen, Ladenflächen, Gewerbeobjekte, Sanitärbereiche und laufende Reinigungspläne."],
  ["Büroreinigung", "Für Büros, Agenturen, Kanzleien, Küchen, Besprechungsräume und Reinigung nach Feierabend."],
  ["Praxisreinigung", "Für Praxisflächen, Wartebereiche, Nebenräume und allgemeine Flächen ohne pauschale Spezialdesinfektion."],
  ["Unterhaltsreinigung", "Für regelmäßige Reinigung mit Turnus, Raumliste, Schlüsselweg und klarer Zuständigkeit."],
  ["Treppenhausreinigung", "Für Eingang, Treppenhaus, Kellerflur, Aufzug und Hausverwaltungsobjekte."],
  ["Endreinigung und Grundreinigung", "Für Auszug, Leerstand, Übergabe, starke Verschmutzung oder gründliche Vorbereitung."],
] as const;

const checkedPoints = [
  "Leistungsumfang",
  "Objektart",
  "Fläche",
  "Termin und Dringlichkeit",
  "Zusatzleistungen",
  "Zugang und Schlüsselweg",
  "Reinigungsintervall",
  "Stadtteil oder PLZ",
  "Fotos und vorhandener Preisrahmen",
] as const;

const answerBlocks = [
  {
    title: "Was passiert mit Ihrem Reinigungsangebot?",
    text: "FLOXANT ordnet Umfang, Turnus, Objektart, Fläche, Zeitfenster, Zugang und Zusatzpunkte ein. Danach erhalten Sie eine klare Rückmeldung, ob eine passende Alternative möglich ist.",
  },
  {
    title: "Welche Düsseldorfer Reinigungsangebote passen?",
    text: "Passend sind Angebote für Gewerbereinigung, Büroreinigung, Praxisreinigung, Treppenhausreinigung, Unterhaltsreinigung, Endreinigung und Grundreinigung.",
  },
  {
    title: "Wie läuft die Prüfung ab?",
    text: "Sie senden Angebot, Fotos oder Eckdaten. FLOXANT prüft die Angaben und meldet sich mit Rückfragen oder einer ersten Einschätzung.",
  },
  {
    title: "Was bedeutet passende Alternative?",
    text: "Gemeint ist eine Lösung, die nach Umfang, Termin, Standort, Zustand und Anforderungen sinnvoll passen kann. Es ist keine Preisgarantie.",
  },
  {
    title: "Warum sollte man ein bestehendes Angebot prüfen lassen?",
    text: "Eine zweite Einschätzung hilft, Leistungen, offene Punkte und mögliche Alternativen vor einer Entscheidung besser zu verstehen.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title,
  description,
  alternates: {
    canonical,
    languages: {
      "de-DE": canonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title,
    description,
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: heroVisual.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImage],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Reinigungsangebot Düsseldorf prüfen",
        description,
        path,
        about: [
          "Reinigungsangebot Düsseldorf prüfen lassen",
          "FLOXANT Angebotsprüfung Düsseldorf",
          "Reinigungsangebot prüfen",
          "Angebot für Reinigungsarbeiten",
          "Reinigungsfirma Angebote",
          "Putzfirma Angebot vergleichen",
          "Gebäudereinigung Angebot prüfen",
          "Gewerbereinigung Düsseldorf Angebot",
          "Büroreinigung Düsseldorf Angebot",
          "Praxisreinigung Düsseldorf Angebot",
          "Unterhaltsreinigung Düsseldorf Angebot",
          "Treppenhausreinigung Düsseldorf Angebot",
          "Endreinigung Düsseldorf Angebot",
        ],
        potentialActions: [
          { name: "Reinigungsangebot Düsseldorf prüfen", target: `${path}#angebot-pruefen`, type: "ContactAction" },
          { name: "Per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": "LocalBusiness",
        "@id": `${company.url}/duesseldorf#localbusiness`,
        name: duesseldorfCompany.name,
        url: canonical,
        telephone: duesseldorfCompany.phoneRaw,
        email: duesseldorfCompany.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: duesseldorfCompany.streetAddress,
          postalCode: duesseldorfCompany.postalCode,
          addressLocality: duesseldorfCompany.city,
          addressCountry: duesseldorfCompany.countryCode,
        },
        areaServed: ["Düsseldorf und Umgebung"],
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "FLOXANT Reinigungsangebot Düsseldorf prüfen",
        serviceType: "Angebotsprüfung für Düsseldorfer Reinigungsangebote",
        provider: { "@id": `${company.url}/duesseldorf#localbusiness` },
        areaServed: ["Düsseldorf und Umgebung"],
        url: canonical,
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Düsseldorf", item: "/duesseldorf" },
        { name: "Angebot prüfen", item: path },
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

export default function AngebotVergleichenDuesseldorfPage() {
  return (
    <main className="bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt={heroVisual.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.9)_44%,rgba(15,23,42,0.72)_100%)]" />

        <div className="mx-auto grid max-w-7xl min-w-0 gap-8 px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:pb-16 lg:pt-36">
          <div className="min-w-0 self-start rounded-lg border border-white/12 bg-slate-950/52 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.24)] backdrop-blur sm:p-6 lg:sticky lg:top-32">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              FLOXANT Angebotsprüfung
            </p>
            <h1 className="mt-6 max-w-full min-w-0 break-words text-4xl font-black leading-[1.04] tracking-normal [overflow-wrap:anywhere] sm:text-5xl lg:max-w-4xl lg:text-[3.55rem]">
              Reinigungsangebot aus Düsseldorf sachlich prüfen lassen.
            </h1>
            <p className="mt-6 max-w-full min-w-0 break-words text-lg leading-8 text-slate-100 [overflow-wrap:anywhere] lg:max-w-2xl">
              Senden Sie uns Ihr bestehendes Reinigungsangebot oder die wichtigsten Eckdaten.
              Wir prüfen Umfang, Turnus, Objektart, Fotos und Preisrahmen und melden zurück,
              ob eine passende Alternative möglich ist.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {processSteps.slice(0, 3).map((step, index) => (
                <div key={step.title} className="rounded-lg border border-white/12 bg-white/10 p-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan-300 text-xs font-black text-slate-950">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-black text-white">{step.title}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#angebot-pruefen"
                data-event="hero_cta_click"
                data-channel="form"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/25 transition hover:bg-cyan-50 sm:w-auto"
              >
                Reinigungsangebot Düsseldorf prüfen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-channel="whatsapp"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Per WhatsApp senden
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <OfferCheckFormIntro className="mb-5" />
            <OfferComparisonAdsForm whatsappHref={whatsappHref} />
          </div>
        </div>
      </section>

      <OfferCheckAuthoritySections />

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Kein Preisversprechen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ihr Reinigungsangebot besser einordnen.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              FLOXANT prüft ein bestehendes Reinigungsangebot aus Düsseldorf nach Umfang,
              Objektart, Fläche, Turnus, Zugang und offenen Punkten. Danach erhalten Sie
              eine klare Rückmeldung, ob Angaben fehlen und ob FLOXANT eine passende
              Reinigungsleistung anbieten kann.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Jede Anfrage wird individuell bewertet.",
              "Die Prüfung ordnet Umfang, Turnus und offene Punkte ein.",
              "Wir sprechen keine Garantie für einen niedrigeren Preis aus.",
              "Sie erhalten eine klare Rückmeldung, wenn Angaben fehlen.",
            ].map((item) => (
              <article key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <ShieldCheck className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Für welche Reinigungsangebote?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Düsseldorf sauber getrennt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Ob Dokument, Screenshot oder nur Eckdaten: Wichtig ist, dass Objektart,
              Stadtteil, Fläche, Turnus, Zeitfenster und gewünschtes Ergebnis verständlich
              werden. Der Upload ist hilfreich, aber nicht Pflicht.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {offerAreas.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <FileSearch className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Was wird geprüft?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Nicht nur der Endpreis zählt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Ein Angebot kann nur fair eingeordnet werden, wenn Leistung, Zugang, Termin,
              Zustand und Zusatzpunkte nachvollziehbar sind.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checkedPoints.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Ablauf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              So läuft die Prüfung ab.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Welche Angaben helfen?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Je klarer die Eckdaten, desto besser die Rückmeldung.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Nützlich sind Objektart, Fläche, gewünschter Zeitraum, Leistungsumfang,
              Stadtteil in Düsseldorf, Zugang, Turnus, Fotos und vorhandene Zusatzpositionen.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-3">
              {["PDF/JPG/PNG hochladen", "Stadtteil und Objektart nennen", "Eckdaten ohne Upload eintragen", "Telefon oder E-Mail für Rückfragen"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  <UploadCloud className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Kurz beantwortet
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Klare Antworten zur Angebotsprüfung.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {answerBlocks.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
            Die Prüfung ersetzt keine rechtliche Beratung und enthält keine Preisgarantie.
            Jede Anfrage wird individuell bewertet. Ob ein alternatives Angebot möglich ist,
            hängt vom Umfang, Standort, Termin und den konkreten Anforderungen ab.
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Häufige Fragen zur Angebotsprüfung.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <summary className="cursor-pointer text-base font-black">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Nächster Schritt
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              Angebot senden, Rückmeldung erhalten und nächsten Schritt klären.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="#angebot-pruefen"
              data-event="hero_cta_click"
              data-source="offer_comparison_bottom"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Reinigungsangebot Düsseldorf prüfen
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              data-source="offer_comparison_bottom"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp senden
            </a>
          </div>
        </div>
        <div className="mx-auto mt-5 flex max-w-7xl flex-wrap gap-4 text-sm font-bold text-slate-600">
          <a href={`tel:${duesseldorfCompany.phoneRaw}`} data-event="phone_click" className="inline-flex items-center gap-2 hover:text-blue-700">
            <Phone className="h-4 w-4" />
            {duesseldorfCompany.phone}
          </a>
          <Link href="/duesseldorf/putzfirma" className="inline-flex items-center gap-2 hover:text-blue-700">
            <ClipboardCheck className="h-4 w-4" />
            Putzfirma Düsseldorf
          </Link>
          <Link href="/duesseldorf/wohnungsreinigung" className="inline-flex items-center gap-2 hover:text-blue-700">
            <ClipboardCheck className="h-4 w-4" />
            Wohnungsreinigung Düsseldorf
          </Link>
          <Link href="/duesseldorf/gewerbereinigung" className="inline-flex items-center gap-2 hover:text-blue-700">
            <ClipboardCheck className="h-4 w-4" />
            Gewerbereinigung Düsseldorf
          </Link>
          <Link href="/duesseldorf/bueroreinigung" className="inline-flex items-center gap-2 hover:text-blue-700">
            <ClipboardCheck className="h-4 w-4" />
            Büroreinigung Düsseldorf
          </Link>
          <Link href="/duesseldorf/praxisreinigung" className="inline-flex items-center gap-2 hover:text-blue-700">
            <ClipboardCheck className="h-4 w-4" />
            Praxisreinigung Düsseldorf
          </Link>
        </div>
      </section>
    </main>
  );
}
