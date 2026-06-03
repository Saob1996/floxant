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
import { company, duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/angebot-vergleichen-duesseldorf";
const canonical = `${company.url}${path}`;
const title = "Reinigungsangebot prüfen lassen Düsseldorf | FLOXANT";
const description =
  "Reinigungsangebot erhalten? FLOXANT prüft es kostenlos und unverbindlich. Senden Sie Angebot oder Eckdaten und lassen Sie eine mögliche Alternative in Düsseldorf bewerten.";
const heroImage = "/assets/gewerbereinigung/reinigungsanfrage-checkliste-duesseldorf.webp";
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Reinigung Düsseldorf,",
    "ich habe bereits ein Reinigungsangebot erhalten und möchte es kostenlos prüfen lassen.",
    "Angebot, Objektart, Ort und Eckdaten kann ich senden.",
  ].join("\n"),
);

const trustItems = [
  "Kostenlos und unverbindlich",
  "Keine Preisgarantie",
  "Keine Unterbietungszusage",
  "Individuelle Bewertung",
  "WhatsApp oder Upload möglich",
] as const;

const processSteps = [
  {
    title: "Angebot oder Eckdaten senden",
    text: "PDF, JPG, PNG oder eine kurze Beschreibung reichen für den Start.",
  },
  {
    title: "Umfang prüfen",
    text: "FLOXANT betrachtet Leistung, Turnus, Objektart, Zeitfenster und offene Punkte.",
  },
  {
    title: "Alternative bewerten",
    text: "Wir prüfen, ob eine passende und wirtschaftlich interessante Alternative möglich ist.",
  },
  {
    title: "Unverbindlich entscheiden",
    text: "Sie erhalten eine Rückmeldung und entscheiden danach in Ruhe.",
  },
];

const faqItems = [
  {
    q: "Wird FLOXANT das bestehende Angebot garantiert unterbieten?",
    a: "Nein. FLOXANT gibt keine Preisgarantie und verspricht kein Unterbieten. Jede Anfrage wird individuell nach Objekt, Umfang, Turnus und Rahmenbedingungen bewertet.",
  },
  {
    q: "Welche Dateien kann ich hochladen?",
    a: "Sie können PDF, JPG oder PNG hochladen. Alternativ reichen auch die wichtigsten Eckdaten im Formular oder per WhatsApp.",
  },
  {
    q: "Ist die Prüfung kostenlos?",
    a: "Ja. Die Prüfung ist kostenlos und unverbindlich. Eine verbindliche Leistung entsteht erst nach separater Abstimmung.",
  },
  {
    q: "Für welche Leistungen gilt die Seite?",
    a: "Für Reinigungsangebote in Düsseldorf, zum Beispiel Gewerbereinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung oder Premium-Reinigung.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title,
  description,
  alternates: {
    canonical,
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
        alt: "Reinigungsangebot in Düsseldorf prüfen lassen",
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
        name: "Reinigungsangebot prüfen lassen Düsseldorf",
        description,
        path,
        about: [
          "Reinigungsangebot Düsseldorf",
          "Angebot prüfen lassen",
          "Gewerbereinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
        ],
        potentialActions: [
          { name: "Angebot prüfen lassen", target: `${path}#angebot-pruefen`, type: "ContactAction" },
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
        areaServed: "Düsseldorf und Umgebung",
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Reinigungsangebot kostenlos prüfen lassen",
        serviceType: "Angebotsprüfung für Reinigungsleistungen",
        provider: { "@id": `${company.url}/duesseldorf#localbusiness` },
        areaServed: "Düsseldorf und Umgebung",
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
          alt="Checkliste für Reinigungsangebot in Düsseldorf"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.86)_50%,rgba(15,23,42,0.48)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-16 lg:pt-40">
          <div className="self-center">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Düsseldorf und Umgebung
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Reinigungsangebot erhalten? Wir prüfen es kostenlos und unverbindlich.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Senden Sie uns Ihr bestehendes Angebot oder die wichtigsten Eckdaten. Wir prüfen,
              ob wir Ihnen eine wirtschaftlich interessante Alternative anbieten können.
            </p>
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/25 transition hover:bg-cyan-50"
              >
                Angebot prüfen lassen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-channel="whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Per WhatsApp senden
              </a>
            </div>
          </div>

          <OfferComparisonAdsForm whatsappHref={whatsappHref} />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Kein Preisversprechen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Wir prüfen sachlich, ob eine passende Alternative möglich ist.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Ein Vergleich ist nur sinnvoll, wenn Leistungsumfang, Turnus, Zeitfenster,
              Objektart und Zusatzpunkte verständlich sind. Deshalb prüfen wir nicht nur den Preis.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Jede Anfrage wird individuell bewertet.",
              "Die Prüfung ist kostenlos und unverbindlich.",
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
              Nützlich sind Objektart, Fläche, gewünschter Turnus, Zeitfenster, Leistungsumfang,
              Standort in Düsseldorf oder Umgebung und vorhandene Zusatzpositionen.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-3">
              {["PDF/JPG/PNG hochladen", "Ort und Leistung nennen", "Unklarheiten beschreiben", "Telefon oder E-Mail für Rückfragen"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  <UploadCloud className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
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
              Angebot senden, prüfen lassen und danach in Ruhe entscheiden.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="#angebot-pruefen"
              data-event="hero_cta_click"
              data-source="offer_comparison_bottom"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Angebot prüfen lassen
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
          <Link href="/duesseldorf/gewerbereinigung" className="inline-flex items-center gap-2 hover:text-blue-700">
            <ClipboardCheck className="h-4 w-4" />
            Gewerbereinigung Düsseldorf
          </Link>
        </div>
      </section>
    </main>
  );
}
