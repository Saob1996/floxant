import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileText,
  Phone,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

import { OfferCheckForm } from "@/components/OfferCheckForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/angebot-guenstiger-pruefen";
const phoneDisplay = "01577 1105087";
const phoneHref = "tel:+4915771105087";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Vorhandenes Angebot prüfen lassen | FLOXANT",
  description:
    "Vorhandenes Angebot für Reinigung, Umzug oder Entrümpelung einreichen. FLOXANT prüft Leistungsumfang, offene Punkte und eine mögliche Alternative in Düsseldorf oder Regensburg.",
});

const steps = [
  {
    title: "Angebot senden",
    text: "Laden Sie ein PDF, einen Screenshot oder ein Foto hoch. Alternativ können Sie die wichtigsten Angaben als Text eintragen.",
    Icon: UploadCloud,
  },
  {
    title: "Umfang einordnen",
    text: "Wir sehen uns Leistung, Ort, Termin, mögliche Zusatzkosten und die von Ihnen genannten offenen Punkte an.",
    Icon: FileCheck2,
  },
  {
    title: "Nächsten Schritt klären",
    text: "Wenn Leistung und Kapazität passen, besprechen wir mit Ihnen eine mögliche FLOXANT-Alternative. Eine Zusage entsteht erst nach Ihrer Bestätigung.",
    Icon: CheckCircle2,
  },
] as const;

const helpfulDetails = [
  "vorhandenes Angebot oder die wichtigsten Angebotsdaten",
  "gewünschte Leistung und Standort",
  "Termin oder Zeitraum",
  "kurze Beschreibung der offenen Punkte",
  "Fotos von Objekt, Zugang oder Umfang, falls vorhanden",
] as const;

const faqItems = [
  {
    q: "Was prüft FLOXANT bei einem vorhandenen Angebot?",
    a: "Wir ordnen den beschriebenen Leistungsumfang, den Termin, den Standort, erkennbare Zusatzleistungen und offene Angaben praktisch ein. Wenn die Anfrage zu unserem Leistungsgebiet passt, prüfen wir außerdem, ob wir eine eigene Alternative anbieten können.",
  },
  {
    q: "Ist ein günstigeres Angebot garantiert?",
    a: "Nein. Preis, Termin und Verfügbarkeit hängen vom tatsächlichen Umfang ab. Die Prüfung ist eine sachliche Einordnung und weder eine Preis- noch eine Ersparnisgarantie.",
  },
  {
    q: "Kann ich die Anfrage ohne Datei senden?",
    a: "Ja. Wählen Sie im Formular „Ohne Upload prüfen“ und tragen Sie Preis, Leistung, Ort, Termin und die wichtigsten offenen Punkte ein.",
  },
  {
    q: "Für welche Standorte kann ich ein Angebot einreichen?",
    a: "In Düsseldorf prüfen wir Angebote für unsere Reinigungsleistungen. In Regensburg können Sie Angebote für Reinigung, Umzug, Entrümpelung und weitere dort verfügbare Leistungen einreichen.",
  },
  {
    q: "Ersetzt die Prüfung eine Rechtsberatung?",
    a: "Nein. Wir bewerten keine Verträge oder rechtlichen Ansprüche. Bei rechtlichen Fragen wenden Sie sich bitte an eine dafür qualifizierte Stelle.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Vorhandenes Angebot prüfen lassen",
      description:
        "FLOXANT ordnet vorhandene Angebote praktisch ein und prüft eine mögliche Alternative für verfügbare Leistungen in Düsseldorf oder Regensburg.",
      path,
      about: ["Angebotsprüfung", "Reinigung", "Umzug", "Entrümpelung"],
      potentialActions: [
        { name: "Angebot einreichen", target: `${path}#guenstiger-form` },
      ],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Angebot prüfen", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function AngebotPruefenPage() {
  return (
    <main className="overflow-hidden bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.72fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">
              Zweite praktische Einschätzung
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
              Vorhandenes Angebot prüfen lassen
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Senden Sie uns Ihr Angebot für eine verfügbare Leistung in Düsseldorf oder Regensburg.
              Wir prüfen Umfang und offene Punkte und klären, ob eine passende FLOXANT-Alternative möglich ist.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#guenstiger-form"
                data-event="seo_cta_click"
                data-service="angebot-pruefen"
                data-city="deutschland"
                data-page-intent="angebot-pruefen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Angebot einreichen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={phoneHref}
                data-event="phone_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phoneDisplay}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-cyan-200" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-black">Klare Grenzen</h2>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  Keine Preis- oder Ersparnisgarantie, keine rechtliche Bewertung und keine Abwertung anderer Anbieter.
                  Wir prüfen Ihre Angaben organisatorisch und praktisch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">So funktioniert es</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              In drei Schritten zu einer klareren Entscheidung
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map(({ title, text, Icon }, index) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-700 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-black text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guenstiger-form" className="scroll-mt-24 border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Angebot einreichen</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Diese Angaben helfen bei der Prüfung
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Je genauer Ort, Leistung und Termin beschrieben sind, desto gezielter können wir Rückfragen stellen.
              Dateien sind hilfreich, aber nicht erforderlich.
            </p>
            <ul className="mt-6 grid gap-3">
              {helpfulDetails.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-blue-950">
              Bitte schwärzen Sie nicht benötigte sensible Angaben in fremden Dokumenten, bevor Sie diese hochladen.
            </div>
          </div>

          <OfferCheckForm />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-start gap-3">
            <FileText className="mt-1 h-7 w-7 shrink-0 text-blue-700" aria-hidden="true" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Häufige Fragen</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Kurz erklärt</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <summary className="cursor-pointer text-base font-black leading-7 text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Noch unsicher, welcher Weg passt?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
              Beschreiben Sie Ihre Situation kurz im Kontaktformular. Wir ordnen die Anfrage dem passenden Standort und der passenden Leistung zu.
            </p>
          </div>
          <Link
            href="/kontakt?service=angebot-pruefen"
            data-event="seo_cta_click"
            data-service="angebot-pruefen"
            data-city="deutschland"
            data-page-intent="angebot-pruefen"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-blue-800 transition hover:bg-blue-50"
          >
            Kontakt aufnehmen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
