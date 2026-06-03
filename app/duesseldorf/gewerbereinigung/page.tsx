import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { DuesseldorfB2BCleaningForm } from "@/components/DuesseldorfB2BCleaningForm";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { company, duesseldorfCompany } from "@/lib/company";
import { floxantServices } from "@/lib/floxant-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/duesseldorf/gewerbereinigung";
const canonical = `${company.url}${path}`;
const heroImage = "/assets/gewerbereinigung/gewerbliche-reinigung-duesseldorf-hero.webp";
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Reinigung Düsseldorf,",
    "ich möchte eine Gewerbereinigung in Düsseldorf anfragen.",
    "Objektart, Ort, Fläche, Turnus, Zeitfenster und Fotos kann ich senden.",
  ].join("\n"),
);

const serviceCards = floxantServices.filter(
  (service) =>
    service.region === "duesseldorf" &&
    ["duesseldorf-gewerbereinigung", "duesseldorf-bueroreinigung", "duesseldorf-praxisreinigung", "duesseldorf-unterhaltsreinigung", "duesseldorf-treppenhausreinigung", "duesseldorf-angebot-vergleichen"].includes(service.id),
);

const requestHints = [
  "Objektart: Büro, Praxis, Kanzlei, Treppenhaus oder Gewerbeobjekt",
  "Ort oder PLZ in Düsseldorf, nahe Umgebung und Zugang",
  "Fläche, Räume, Sanitärbereiche und gewünschter Turnus",
  "Zeitfenster, Fotos und besondere Anforderungen",
];

const processSteps = [
  {
    title: "Anfrage senden",
    text: "Sie nennen Objekt, Ort, Fläche, Turnus und Kontaktweg. Fotos sind hilfreich, aber nicht zwingend.",
  },
  {
    title: "Objekt einordnen",
    text: "FLOXANT prüft, welche Reinigung zu Objekt, Ablauf und Bedarf passt.",
  },
  {
    title: "Rückmeldung erhalten",
    text: "Sie erhalten Rückfragen, einen Besichtigungsvorschlag oder ein unverbindliches Angebot.",
  },
  {
    title: "In Ruhe entscheiden",
    text: "Die Anfrage bleibt unverbindlich, bis Umfang, Termin und nächster Schritt klar sind.",
  },
];

const trustItems = [
  {
    title: "Büros und Unternehmen",
    text: "Arbeitsplätze, Besprechungsräume, Küchen, Sanitärbereiche und Eingänge werden nach Nutzung und Zeitfenster geplant.",
    Icon: Building2,
  },
  {
    title: "Praxen nach Absprache",
    text: "Allgemeine Praxisflächen können geprüft werden. Medizinische Spezialdesinfektion wird nicht pauschal zugesagt.",
    Icon: Stethoscope,
  },
  {
    title: "Regelmäßige Reinigung",
    text: "Unterhaltsreinigung wird nach Raumliste, Turnus, Zugang und Ansprechpartner abgestimmt.",
    Icon: Clock3,
  },
  {
    title: "Klare Grenzen",
    text: "Leistungsumfang, Zusatzpunkte und besondere Anforderungen werden vor einer Zusage verständlich geklärt.",
    Icon: ShieldCheck,
  },
];

const faqItems = [
  {
    q: "Für wen ist die Gewerbereinigung in Düsseldorf gedacht?",
    a: "Für Unternehmen, Büros, Praxen nach Absprache, Kanzleien, Studios, Treppenhäuser, Hausverwaltungen und Gewerbeobjekte in Düsseldorf und direkter Umgebung.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für eine Rückmeldung?",
    a: "Hilfreich sind Objektart, Stadtteil oder PLZ, Fläche, Räume, Sanitärbereiche, gewünschter Turnus, Zeitfenster, Zugang, Fotos und ein Ansprechpartner.",
  },
  {
    q: "Kann die Reinigung außerhalb der Öffnungszeiten stattfinden?",
    a: "Zeitfenster vor Arbeitsbeginn, nach Feierabend oder am Wochenende können nach Objekt, Umfang, Zugang und Verfügbarkeit geprüft werden.",
  },
  {
    q: "Ist die Anfrage kostenlos und unverbindlich?",
    a: "Ja. Sie erhalten eine Rückmeldung oder ein unverbindliches Angebot. Eine verbindliche Planung entsteht erst nach Abstimmung von Umfang, Termin und Leistung.",
  },
  {
    q: "Kann FLOXANT ein bestehendes Angebot prüfen?",
    a: "Ja. Sie können ein vorhandenes Reinigungsangebot kostenlos und unverbindlich prüfen lassen. FLOXANT verspricht kein Unterbieten, sondern bewertet jede Anfrage individuell.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Gewerbereinigung Düsseldorf | Büro, Praxis & Gewerbe | FLOXANT",
  description:
    "Gewerbereinigung in Düsseldorf für Unternehmen, Praxen und Büros. FLOXANT prüft Objekt, Ablauf und Bedarf individuell. Kostenlos und unverbindlich anfragen.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Gewerbereinigung in Düsseldorf für Unternehmen, Praxen und Büros",
    description:
      "Reinigungslösungen für gewerbliche Kunden in Düsseldorf: Objekt, Turnus, Zeitfenster und Bedarf klar abstimmen.",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: "Gewerbliche Reinigung in Düsseldorf",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gewerbereinigung Düsseldorf | FLOXANT",
    description:
      "Kostenlos Gewerbereinigung in Düsseldorf anfragen: Büro, Praxis, Unterhaltsreinigung und Treppenhausreinigung.",
    images: [heroImage],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Gewerbereinigung Düsseldorf",
        description:
          "Gewerbereinigung in Düsseldorf für Unternehmen, Praxen und Büros mit Formular, WhatsApp und individueller Rückmeldung.",
        path,
        about: ["Gewerbereinigung Düsseldorf", "Büroreinigung Düsseldorf", "Praxisreinigung Düsseldorf", "Unterhaltsreinigung Düsseldorf"],
        potentialActions: [
          { name: "Kostenlos anfragen", target: `${path}#kontakt`, type: "ContactAction" },
          { name: "Per WhatsApp Kontakt aufnehmen", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": "LocalBusiness",
        "@id": `${company.url}/duesseldorf#localbusiness`,
        name: duesseldorfCompany.name,
        url: canonical,
        telephone: duesseldorfCompany.phoneRaw,
        email: duesseldorfCompany.email,
        image: `${company.url}${heroImage}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: duesseldorfCompany.streetAddress,
          postalCode: duesseldorfCompany.postalCode,
          addressLocality: duesseldorfCompany.city,
          addressCountry: duesseldorfCompany.countryCode,
        },
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann"].map((name) => ({
          "@type": "City",
          name,
        })),
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Gewerbereinigung Düsseldorf",
        serviceType: "Gewerbereinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung",
        provider: { "@id": `${company.url}/duesseldorf#localbusiness` },
        areaServed: "Düsseldorf und Umgebung",
        url: canonical,
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Düsseldorf", item: "/duesseldorf" },
        { name: "Gewerbereinigung", item: path },
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

export default function GewerbereinigungDuesseldorfPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950" data-event="view_gewerbereinigung_duesseldorf_page">
      <JsonLd />

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt="Gepflegter gewerblicher Raum für Gewerbereinigung in Düsseldorf"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[62%_50%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(15,23,42,0.82)_52%,rgba(15,23,42,0.38)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-16 lg:pt-40">
          <div className="self-center">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              FLOXANT Düsseldorf
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Gewerbereinigung in Düsseldorf für Unternehmen, Praxen und Büros
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              FLOXANT unterstützt gewerbliche Kunden in Düsseldorf mit Reinigungslösungen,
              die zu Objekt, Ablauf und Bedarf passen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#kontakt"
                data-event="hero_cta_click"
                data-contact-channel="form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-300"
              >
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-contact-channel="whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/40 bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Per WhatsApp Kontakt aufnehmen
              </a>
              <a
                href={`tel:${duesseldorfCompany.phoneRaw}`}
                data-event="phone_click"
                data-contact-channel="phone"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {duesseldorfCompany.phone}
              </a>
            </div>
          </div>

          <div id="kontakt" className="scroll-mt-32">
            <DuesseldorfB2BCleaningForm context="gewerbereinigung" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Was wir vorab wissen sollten
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Gute Reinigung beginnt mit den richtigen Eckdaten.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Sie müssen kein langes Leistungsverzeichnis erstellen. Eine kurze, konkrete Beschreibung
              macht die Rückmeldung schneller und belastbarer.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {requestHints.map((hint) => (
              <div key={hint} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                {hint}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Leistungen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Reinigung für gewerbliche Flächen in Düsseldorf.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service) => (
              <FloxServiceCard key={service.id} service={service} source="gewerbereinigung_page" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Vertrauen im Alltag
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Keine Standardsprache. Klare Abstimmung für Ihr Objekt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
              FLOXANT prüft, welche Lösung zu Ihrem Objekt und Ihren Abläufen passt. Dabei werden
              Leistungsumfang, Zeitfenster und Grenzen vorab verständlich geklärt.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <item.Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              So läuft die Anfrage ab
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Vom ersten Kontakt zur klaren Rückmeldung.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
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

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Schon ein Angebot?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Reinigungsangebot sachlich prüfen lassen.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Wenn bereits ein Angebot vorliegt, prüft FLOXANT kostenlos und unverbindlich, ob eine
              wirtschaftlich interessante Alternative möglich ist. Ohne Unterbietungsversprechen.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-3">
              {[
                "Keine Preisgarantie und kein pauschales Unterbieten.",
                "Objekt, Umfang, Turnus und Zeitfenster werden individuell bewertet.",
                "Sie erhalten eine klare Rückmeldung, wenn Angaben fehlen oder eine Alternative nicht sinnvoll ist.",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm font-bold leading-6 text-slate-700">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/angebot-vergleichen-duesseldorf"
              data-event="hero_cta_click"
              data-source="gewerbereinigung_offer_check"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Angebot prüfen lassen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
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
              Häufige Fragen zur Gewerbereinigung.
            </h2>
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
