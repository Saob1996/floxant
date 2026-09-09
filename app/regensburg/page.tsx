import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";

import { company } from "@/lib/company";
import { buildRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/regensburg";
const canonical = `${company.url}${path}`;
const requestHref = buildRequestHref({
  location: "regensburg",
  source: "location_hub",
  entryPage: path,
  ctaComponent: "regensburg_hub",
  ctaPosition: "hero",
});
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  "Hallo FLOXANT, ich möchte eine Leistung in Regensburg anfragen.",
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Regensburg: Umzug, Reinigung & Räumung",
  description:
    "Umzug, Reinigung, Entrümpelung und Wohnungsauflösung in Regensburg anfragen. Umfang, Zugang, Termin und Ziel werden vorab abgestimmt.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    title: "FLOXANT Regensburg: Leistungen direkt anfragen",
    description: "Umzug, Reinigung und Räumung mit vorab abgestimmtem Umfang und einem direkten Kontaktweg.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "FLOXANT Regensburg" }],
  },
};

const services = [
  {
    href: "/regensburg/umzug",
    title: "Umzug",
    text: "Start, Ziel, Etagen, Aufzug, Montage, Strecke und gewünschter Termin werden vor dem Umzugstag abgestimmt.",
  },
  {
    href: "/regensburg/reinigung",
    title: "Reinigung",
    text: "Für Wohnungen und definierte Objektbereiche: Fläche, Zustand, Aufgaben und gewünschter Zielzustand bilden den Umfang.",
  },
  {
    href: "/regensburg/bueroreinigung",
    title: "Büroreinigung",
    text: "Raumgruppen, Turnus, Zugang und Zeitfenster werden so geplant, dass der Büroalltag weiterlaufen kann.",
  },
  {
    href: "/regensburg/gewerbereinigung",
    title: "Gewerbereinigung",
    text: "Nutzung, Flächen, sensible Bereiche, Reinigungszeiten und feste Zuständigkeiten werden objektbezogen erfasst.",
  },
  {
    href: "/regensburg/entruempelung",
    title: "Entrümpelung",
    text: "Vor Beginn wird festgehalten, was bleibt, was entfernt wird und in welchem Zustand die Fläche übergeben werden soll.",
  },
  {
    href: "/regensburg/wohnungsaufloesung",
    title: "Wohnungsauflösung",
    text: "Persönliche Gegenstände, Freigaben, Räumung und eine mögliche Reinigung werden respektvoll voneinander getrennt.",
  },
  {
    href: "/klaviertransport-regensburg",
    title: "Klaviertransport",
    text: "Instrument, Maße, Gewicht, Treppen, Laufweg und Zufahrt entscheiden über die sichere Vorbereitung des Transports.",
  },
] as const;

const faqs = [
  {
    q: "Welche Angaben braucht FLOXANT für eine erste Einschätzung?",
    a: "Benötigt werden die gewünschte Leistung, der Einsatzort, ein Termin oder Zeitraum und die wichtigsten Eckdaten. Bei Umzügen sind Start und Ziel getrennt wichtig; bei Reinigung oder Räumung helfen Fläche, Zustand und Fotos.",
  },
  {
    q: "Kann ich Fotos oder ein vorhandenes Angebot mitsenden?",
    a: "Ja. Fotos und Dokumente können im Anfrageformular hochgeladen oder per WhatsApp gesendet werden. Bitte übermitteln Sie keine Ausweise, Zugangscodes oder unnötigen persönlichen Unterlagen.",
  },
  {
    q: "Sind kombinierte Leistungen möglich?",
    a: "Umzug, Reinigung oder Räumung können gemeinsam angefragt werden. Ob die Kombination zum gewünschten Termin machbar ist, hängt von Umfang, Zugang und verfügbarer Kapazität ab.",
  },
  {
    q: "Ist die Anfrage bereits eine Buchung?",
    a: "Nein. Zuerst werden Umfang und Machbarkeit abgestimmt. Ein Auftrag entsteht erst durch eine gesonderte Bestätigung.",
  },
] as const;

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Regensburg",
        description: metadata.description as string,
        path,
        about: ["Umzug", "Reinigung", "Entrümpelung", "Wohnungsauflösung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Regensburg", item: path },
      ]),
      buildFaqJsonLd(faqs),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export default function RegensburgHubPage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <JsonLd />
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-cyan-300">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Regensburg
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Umzug, Reinigung und Räumung in Regensburg
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            FLOXANT stimmt Leistung, Zugang, Termin und gewünschten Endzustand vorab mit Ihnen ab. So entsteht ein belastbarer Umfang für den Umzugstag, die Reinigung oder die Räumung – ohne unklare Pauschalen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={requestHref} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-cyan-400 px-5 text-sm font-black text-slate-950 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
              Leistung anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-black text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
          </div>
          <ul className="mt-8 grid max-w-4xl gap-3 text-sm font-semibold text-slate-200 sm:grid-cols-3">
            {[
              "Direkter Kontakt mit FLOXANT",
              "Upload für Fotos und Dokumente",
              "Standort in Regensburg mit vollständigem Impressum",
            ].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section id="leistungen" className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="regensburg-services">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-blue-700">Leistung auswählen</p>
          <h2 id="regensburg-services" className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Der passende Weg für Ihr Vorhaben</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Wählen Sie die Leistung, die Ihr gewünschtes Ergebnis am besten beschreibt. Die jeweilige Seite führt mit Regensburg und der Leistung vorausgefüllt direkt in die Anfrage.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.href} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                <Link href={service.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  {service.title} ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="regensburg-process">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-700">Vom Problem zum Ergebnis</p>
            <h2 id="regensburg-process" className="mt-3 text-3xl font-black">Vorher festhalten, was am Ende erreicht sein soll</h2>
            <p className="mt-5 leading-8 text-slate-600">Bei einem Umzug zählt ein planbarer Ablauf ohne überraschende Nachverhandlung. Bei einer Räumung zählt wieder nutzbarer Raum. Bei einer Reinigung zählt ein vereinbarter Zustand statt einer vagen Erwartung. FLOXANT erfasst deshalb die entscheidenden Angaben passend zur Leistung.</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["1", "Eckdaten senden", "Ort, Leistung, Termin und Umfang im kurzen Anfrageweg angeben."],
              ["2", "Details abstimmen", "Zugang, Etagen, Flächen, Fotos oder besondere Aufgaben ergänzen."],
              ["3", "Umfang bestätigen", "Leistung, Termin und Preis werden vor einem Auftrag gesondert bestätigt."],
            ].map(([number, title, text]) => (
              <li key={number} className="rounded-xl border border-slate-200 bg-white p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{number}</span>
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10" aria-labelledby="regensburg-faq">
        <div className="mx-auto max-w-4xl">
          <h2 id="regensburg-faq" className="text-3xl font-black">Häufige Fragen</h2>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">{faq.q}</summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-800 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-3xl font-black">Ihr Vorhaben in Regensburg besprechen</h2><p className="mt-3 max-w-2xl text-blue-100">Wählen Sie die Leistung und senden Sie die entscheidenden Eckdaten. Die Vorauswahl bleibt im Formular editierbar.</p></div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href={requestHref} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-blue-900">Anfrage starten <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/35 px-5 text-sm font-black"><Phone className="h-4 w-4" /> Anrufen</a>
          </div>
        </div>
      </section>
    </main>
  );
}
