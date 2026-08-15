import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Phone, Sparkles } from "lucide-react";

import { company, duesseldorfCompany } from "@/lib/company";
import { buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/duesseldorf";
const canonical = `${company.url}${path}`;
const contactHref = "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=location";

const cleaningServices = [
  {
    title: "Reinigung",
    text: "Wohnung, Büro, Praxis oder Gewerbe nach Objektart, Fläche, Umfang und Termin einordnen.",
    href: "/duesseldorf/reinigung",
  },
  {
    title: "Büroreinigung",
    text: "Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche mit passendem Turnus.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Praxisreinigung",
    text: "Praxisräume, eigene Vorgaben und Zeitfenster außerhalb des laufenden Betriebs abstimmen.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Fensterreinigung",
    text: "Glasflächen, gewünschte Seiten, Rahmen und sichere Erreichbarkeit vorab klären.",
    href: "/duesseldorf/fensterreinigung",
  },
  {
    title: "Gewerbereinigung",
    text: "Läden, Studios und gemischt genutzte Flächen passend zu Nutzung und Öffnungszeiten reinigen.",
    href: "/duesseldorf/gewerbereinigung",
  },
  {
    title: "Grundreinigung",
    text: "Einmalige Intensivreinigung nach Zustand, Oberfläche und gewünschtem Ergebnis planen.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Unterhaltsreinigung",
    text: "Wiederkehrende Aufgaben mit Raumplan, Häufigkeiten und festen Zeitfenstern festlegen.",
    href: "/duesseldorf/unterhaltsreinigung",
  },
  {
    title: "Baureinigung",
    text: "Zwischen- oder Endreinigung passend zu Bauphase, Rückständen und Übergabetermin.",
    href: "/duesseldorf/baureinigung",
  },
] as const;

const faqItems = [
  {
    q: "Welche Reinigungsleistungen bietet FLOXANT in Düsseldorf an?",
    a: "Sie können Büro-, Praxis-, Fenster-, Gewerbe-, Grund-, Unterhalts- und Baureinigung anfragen. Die einzelnen Seiten zeigen, welche Angaben für den jeweiligen Service wichtig sind.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für eine erste Einschätzung?",
    a: "Nennen Sie Objektart, Stadtteil, ungefähre Fläche, gewünschte Leistung und Termin. Bei regelmäßiger Reinigung helfen zusätzlich Turnus und mögliche Zeitfenster.",
  },
  {
    q: "Kann ich zuerst telefonisch klären, welche Reinigung passt?",
    a: `Ja. Sie erreichen FLOXANT Düsseldorf unter ${duesseldorfCompany.phone}. Alternativ können Sie die Eckdaten über das Kontaktformular senden.`,
  },
  {
    q: "Ist eine Anfrage bereits verbindlich?",
    a: "Nein. Wir prüfen zuerst Umfang, Zugang und Termin. Die konkrete Abstimmung erfolgt anschließend über den von Ihnen gewählten Kontaktweg.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Düsseldorf | Reinigung für Büro, Praxis & Objekt",
  description:
    "Reinigungsservice in Düsseldorf für Büro, Praxis, Gewerbe, Fenster, Grund-, Unterhalts- und Baureinigung. Leistung auswählen und Eckdaten senden.",
  alternates: {
    canonical,
    languages: { "de-DE": path, "x-default": path },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "FLOXANT Düsseldorf für passende Reinigungsleistungen",
    description: "Reinigungsleistung auswählen, Eckdaten senden und den weiteren Ablauf abstimmen.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Düsseldorf",
        description: "Reinigungsleistungen in Düsseldorf für Wohnung, Büro, Praxis und Gewerbe mit direktem Anfrageweg.",
        path,
        about: ["FLOXANT Düsseldorf", "Reinigungsservice Düsseldorf", "Gebäudereinigung Düsseldorf"],
        potentialActions: [{ name: "Reinigung anfragen", target: contactHref, type: "ContactAction" }],
      }),
      {
        "@type": "LocalBusiness",
        "@id": `${canonical}#localbusiness`,
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
        areaServed: "Düsseldorf",
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export default function DuesseldorfHubPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_15%,rgba(37,99,235,0.28),transparent_36%),linear-gradient(135deg,#020617_0%,#0f172a_62%,#164e63_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              FLOXANT Düsseldorf
            </p>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Reinigungsservice in Düsseldorf – klar zur passenden Leistung.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-100 sm:text-lg">
              Wählen Sie die Reinigung, die zu Ihrem Objekt passt. Mit Fläche, gewünschtem Umfang und Termin können wir Ihre Anfrage gezielt einordnen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={contactHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                data-event="seo_cta_click"
                data-service="reinigung"
                data-city="duesseldorf"
                data-page-intent="reinigung-duesseldorf"
                data-destination={contactHref}
              >
                Reinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/angebot-guenstiger-pruefen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                data-event="seo_cta_click"
                data-service="angebot-pruefen"
                data-city="duesseldorf"
                data-page-intent="angebot-pruefen-duesseldorf"
                data-destination="/angebot-guenstiger-pruefen"
              >
                Angebot prüfen
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Standort
            </p>
            <p className="mt-4 text-xl font-black">{duesseldorfCompany.name}</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
              {duesseldorfCompany.streetAddress}<br />
              {duesseldorfCompany.postalCode} {duesseldorfCompany.city}
            </p>
            <a
              href={`tel:${duesseldorfCompany.phoneRaw}`}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {duesseldorfCompany.phone}
            </a>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Reinigung in Düsseldorf
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            Welche Reinigung benötigen Sie?
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Wählen Sie die passende Reinigungsart und erfahren Sie, welche Angaben für eine erste Einschätzung hilfreich sind.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cleaningServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex min-h-48 flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-xl font-black text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{service.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-blue-700">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Ablauf</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">In drei Schritten zur Rückmeldung.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Passende Reinigungsleistung auswählen.",
              "Objekt, Fläche, Umfang und Termin beschreiben.",
              "Wir prüfen die Angaben und melden uns zum weiteren Ablauf.",
            ].map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Kurz erklärt für Düsseldorf.</h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Ihre Anfrage</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">Objekt und gewünschte Reinigung kurz beschreiben.</h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              Eine Anfrage ist noch keine Buchung. Wir stimmen Umfang und Termin nach Prüfung Ihrer Angaben mit Ihnen ab.
            </p>
          </div>
          <Link
            href={contactHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
            data-event="seo_cta_click"
            data-service="reinigung"
            data-city="duesseldorf"
            data-page-intent="reinigung-duesseldorf"
            data-destination={contactHref}
          >
            Reinigung anfragen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
