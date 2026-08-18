import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Phone, Sparkles } from "lucide-react";

import { company, duesseldorfCompany } from "@/lib/company";
import { buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/duesseldorf";
const canonical = `${company.url}${path}`;
const contactHref =
  "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=location";
const offerCheckHref = "/angebot-guenstiger-pruefen";

type CleaningService = {
  title: string;
  text: string;
  href: string;
};

const businessCleaningServices: readonly CleaningService[] = [
  {
    title: "Büroreinigung",
    text: "Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche mit passendem Turnus.",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    title: "Praxisreinigung",
    text: "Praxisräume, besondere Vorgaben und Zeitfenster außerhalb des laufenden Betriebs abstimmen.",
    href: "/duesseldorf/praxisreinigung",
  },
  {
    title: "Gewerbereinigung",
    text: "Läden, Studios und andere Gewerbeflächen passend zu Nutzung und Öffnungszeiten reinigen.",
    href: "/duesseldorf/gewerbereinigung",
  },
  {
    title: "Unterhaltsreinigung",
    text: "Wiederkehrende Aufgaben mit Räumen, Häufigkeit und festen Zeitfenstern festlegen.",
    href: "/duesseldorf/unterhaltsreinigung",
  },
];

const objectCleaningServices: readonly CleaningService[] = [
  {
    title: "Reinigung",
    text: "Wohnung, Büro, Praxis oder Gewerbe nach Objektart, Fläche, Umfang und Termin einordnen.",
    href: "/duesseldorf/reinigung",
  },
  {
    title: "Fensterreinigung",
    text: "Glasflächen, gewünschte Seiten, Rahmen und sichere Erreichbarkeit vorab klären.",
    href: "/duesseldorf/fensterreinigung",
  },
  {
    title: "Grundreinigung",
    text: "Einmalige Intensivreinigung nach Zustand, Oberfläche und gewünschtem Ergebnis planen.",
    href: "/duesseldorf/grundreinigung",
  },
  {
    title: "Baureinigung",
    text: "Zwischen- oder Endreinigung passend zu Bauphase, Rückständen und Übergabetermin.",
    href: "/duesseldorf/baureinigung",
  },
];

const faqItems = [
  {
    q: "Welche Reinigungsleistungen bietet FLOXANT in Düsseldorf an?",
    a: "Sie können Büro-, Praxis-, Fenster-, Gewerbe-, Grund-, Unterhalts- und Baureinigung anfragen. Die einzelnen Seiten zeigen, welche Angaben für die jeweilige Leistung wichtig sind.",
  },
  {
    q: "Übernimmt FLOXANT auch regelmäßige Reinigung für Unternehmen?",
    a: "Ja, Büro-, Praxis-, Gewerbe- und Unterhaltsreinigung können auch wiederkehrend angefragt werden. Nennen Sie dafür die Räume, den gewünschten Turnus und mögliche Zeitfenster.",
  },
  {
    q: "Welche Angaben werden für eine erste Einschätzung benötigt?",
    a: "Hilfreich sind Objektart, ungefähre Fläche, gewünschter Umfang, Zustand und Termin. Fotos können besondere Flächen oder Verschmutzungen leichter verständlich machen.",
  },
  {
    q: "Kann ich ein vorhandenes Reinigungsangebot prüfen lassen?",
    a: "Ja. Über die Angebotsprüfung können Sie Leistungsumfang, Turnus und offene Punkte eines vorhandenen Angebots einordnen lassen.",
  },
  {
    q: "Ist meine Anfrage bereits verbindlich?",
    a: `Nein. Wir prüfen zuerst die Angaben und klären offene Fragen. Sie erreichen FLOXANT Düsseldorf auch telefonisch unter ${duesseldorfCompany.phone}.`,
  },
] as const;

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
    description:
      "Reinigungsleistung auswählen, Eckdaten senden und den weiteren Ablauf abstimmen.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Düsseldorf",
        description:
          "Reinigungsleistungen in Düsseldorf für Wohnung, Büro, Praxis und Gewerbe mit direktem Anfrageweg.",
        path,
        about: [
          "FLOXANT Düsseldorf",
          "Reinigungsservice Düsseldorf",
          "Gebäudereinigung Düsseldorf",
        ],
        potentialActions: [
          { name: "Reinigung anfragen", target: contactHref, type: "ContactAction" },
        ],
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function CleaningCards({ services }: { services: readonly CleaningService[] }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="group flex min-h-48 flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
        >
          <h3 className="text-xl font-black text-slate-950">{service.title}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
            {service.text}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-blue-700">
            Mehr erfahren
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
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
              Reinigungsservice in Düsseldorf für Büro, Praxis und Objekt.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-100 sm:text-lg">
              Wählen Sie die Reinigung, die zu Ihrem Objekt passt. Mit Fläche,
              gewünschtem Umfang und Termin können wir Ihre Anfrage gezielt einordnen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={contactHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Reinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={offerCheckHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                Angebot prüfen
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Standort Düsseldorf
            </p>
            <p className="mt-4 text-xl font-black">{duesseldorfCompany.name}</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
              {duesseldorfCompany.streetAddress}
              <br />
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

      <section
        id="leistungen"
        className="scroll-mt-24 border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Reinigung in Düsseldorf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Reinigung für Unternehmen.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Für regelmäßig oder einmalig genutzte Arbeits- und Gewerberäume.
            </p>
          </div>
          <CleaningCards services={businessCleaningServices} />

          <div className="mt-12 max-w-3xl border-t border-slate-200 pt-10">
            <h2 className="text-3xl font-black tracking-normal sm:text-4xl">
              Weitere Reinigung für Wohnung und Objekt.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Wählen Sie die passende Leistung und lesen Sie, welche Angaben für
              eine erste Einschätzung hilfreich sind.
            </p>
          </div>
          <CleaningCards services={objectCleaningServices} />
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Vorhandenes Angebot
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal">
              Leistungsumfang und offene Punkte prüfen.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              Senden Sie ein vorhandenes Reinigungsangebot mit Objekt, Turnus und
              gewünschtem Ergebnis. Wir melden uns nach der Durchsicht bei Ihnen.
            </p>
          </div>
          <Link
            href={offerCheckHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
          >
            Angebot prüfen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Häufige Fragen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Kurz erklärt für Düsseldorf.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Ihre Anfrage
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
              Objekt und gewünschte Reinigung kurz beschreiben.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              Eine Anfrage ist noch keine Buchung. Wir stimmen Umfang und Termin
              nach Prüfung Ihrer Angaben mit Ihnen ab.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={contactHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
            >
              Reinigung anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${duesseldorfCompany.phoneRaw}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
