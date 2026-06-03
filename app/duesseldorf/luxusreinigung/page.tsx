import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Gem,
  KeyRound,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { DuesseldorfB2BCleaningForm } from "@/components/DuesseldorfB2BCleaningForm";
import { company, duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/duesseldorf/luxusreinigung";
const canonical = `${company.url}${path}`;
const heroImage = "/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp";
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Reinigung Düsseldorf,",
    "ich möchte eine Premium-Reinigung für ein anspruchsvolles Objekt besprechen.",
    "Objektart, Ort, Zeitfenster und gewünschte Abstimmung kann ich senden.",
  ].join("\n"),
);

const fitItems = [
  "Büros, Kanzleien und Beratungsräume",
  "Praxen und Empfangsbereiche nach Absprache",
  "Showrooms, Studios und repräsentative Flächen",
  "Apartments, hochwertige Wohnflächen und Übergaben",
] as const;

const principles = [
  {
    title: "Diskrete Kommunikation",
    text: "Rückfragen, Zugang und sensible Hinweise werden ruhig und mit klarem Ansprechpartner abgestimmt.",
    Icon: ShieldCheck,
  },
  {
    title: "Sorgfältige Vorbereitung",
    text: "Objektart, Material, Zeitfenster, Fotos und Prioritäten werden vor einer Zusage eingeordnet.",
    Icon: ClipboardCheck,
  },
  {
    title: "Gepflegte Räume",
    text: "Im Fokus stehen ein stimmiger Eindruck, saubere sichtbare Bereiche und eine nachvollziehbare Durchführung.",
    Icon: Sparkles,
  },
  {
    title: "Klare Abläufe",
    text: "Leistungsumfang, Zugang, Rückmeldung und Grenzen werden verständlich besprochen.",
    Icon: KeyRound,
  },
];

const processSteps = [
  "Sie beschreiben Objekt, Ort, gewünschtes Ergebnis und Kontaktweg.",
  "FLOXANT prüft, ob eine Premium-Reinigung sinnvoll und realistisch planbar ist.",
  "Offene Punkte wie Zugang, Material, Zeitfenster oder Rückmeldung werden geklärt.",
  "Sie erhalten eine unverbindliche Rückmeldung zum passenden nächsten Schritt.",
] as const;

const faqItems = [
  {
    q: "Was bedeutet Premium-Reinigung bei FLOXANT?",
    a: "Gemeint ist eine besonders sorgfältig abgestimmte Reinigung für anspruchsvolle Objekte. Es geht nicht um laute Luxusversprechen, sondern um ruhige Kommunikation, klare Abläufe und eine passende Durchführung.",
  },
  {
    q: "Für welche Objekte passt die Seite?",
    a: "Für Büros, Praxen nach Absprache, Kanzleien, Showrooms, Studios, Apartments, hochwertige Wohnflächen und repräsentative Bereiche in Düsseldorf.",
  },
  {
    q: "Gibt es eine garantierte Perfektion?",
    a: "Nein. FLOXANT gibt keine pauschale Perfektionsgarantie. Zustand, Material, Umfang und gewünschtes Ergebnis werden vorab geprüft.",
  },
  {
    q: "Kann ich diskret per WhatsApp starten?",
    a: "Ja. Sie können zunächst kurz schreiben, um welches Objekt es geht. Fotos und Details können danach abgestimmt werden.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Premium-Reinigung Düsseldorf | Anspruchsvolle Objekte | FLOXANT",
  description:
    "Premium-Reinigung für anspruchsvolle Objekte in Düsseldorf: Büros, Praxen, Kanzleien, Showrooms und Apartments diskret und sorgfältig abstimmen.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Premium-Reinigung für anspruchsvolle Objekte in Düsseldorf",
    description:
      "Für Kunden, die Wert auf sorgfältige Abstimmung, gepflegte Räume und professionelle Durchführung legen.",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: "Premium-Reinigung in Düsseldorf",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium-Reinigung Düsseldorf | FLOXANT",
    description:
      "Diskret anfragen und Reinigungskonzept für anspruchsvolle Objekte in Düsseldorf besprechen.",
    images: [heroImage],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Premium-Reinigung Düsseldorf",
        description:
          "Premium-Reinigung für anspruchsvolle Objekte in Düsseldorf mit diskreter Anfrage, WhatsApp und Formular.",
        path,
        about: ["Premium-Reinigung Düsseldorf", "Luxusreinigung Düsseldorf", "Showroom Reinigung", "Kanzleireinigung Düsseldorf"],
        potentialActions: [
          { name: "Diskret anfragen", target: `${path}#kontakt`, type: "ContactAction" },
          { name: "Per WhatsApp Kontakt aufnehmen", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Premium-Reinigung Düsseldorf",
        serviceType: "Premium-Reinigung für anspruchsvolle Objekte",
        provider: {
          "@type": "LocalBusiness",
          name: duesseldorfCompany.name,
          telephone: duesseldorfCompany.phoneRaw,
          address: {
            "@type": "PostalAddress",
            streetAddress: duesseldorfCompany.streetAddress,
            postalCode: duesseldorfCompany.postalCode,
            addressLocality: duesseldorfCompany.city,
            addressCountry: duesseldorfCompany.countryCode,
          },
        },
        areaServed: "Düsseldorf und Umgebung",
        url: canonical,
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Düsseldorf", item: "/duesseldorf" },
        { name: "Premium-Reinigung", item: path },
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

export default function LuxusreinigungDuesseldorfPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt="Gepflegter Raum für Premium-Reinigung in Düsseldorf"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[62%_50%] opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.82)_54%,rgba(15,23,42,0.44)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[0.96fr_1.04fr] lg:px-10 lg:pb-16 lg:pt-40">
          <div className="self-center">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <Gem className="h-4 w-4" aria-hidden="true" />
              FLOXANT Signature Düsseldorf
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Premium-Reinigung für anspruchsvolle Objekte in Düsseldorf
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Für Kunden, die Wert auf sorgfältige Abstimmung, gepflegte Räume und eine
              professionelle Durchführung legen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#kontakt"
                data-event="hero_cta_click"
                data-source="premium_cleaning_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/25 transition hover:bg-cyan-50"
              >
                Diskret anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-source="premium_cleaning_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Reinigungskonzept besprechen
              </a>
            </div>
          </div>

          <div id="kontakt" className="scroll-mt-32">
            <DuesseldorfB2BCleaningForm context="premium" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Geeignete Objekte
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Hochwertig heißt hier: gut vorbereitet und klar abgestimmt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              FLOXANT prüft vorab, ob Anspruch, Objektzustand, Material, Zeitfenster und gewünschte
              Rückmeldung realistisch zusammenpassen.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fitItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
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
              Worauf es ankommt
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ruhige Abstimmung, klare Grenzen, sorgfältige Durchführung.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <item.Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Ablauf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Premium-Anfragen brauchen eine saubere Vorbereitung.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <article key={step} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Häufige Fragen zur Premium-Reinigung.
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-source="premium_faq"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                Diskret schreiben
              </a>
              <a
                href={`tel:${duesseldorfCompany.phoneRaw}`}
                data-event="phone_click"
                data-source="premium_faq"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-black text-slate-800"
              >
                <Phone className="h-4 w-4" />
                Anrufen
              </a>
            </div>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
