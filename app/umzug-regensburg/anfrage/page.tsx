import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Route,
  Sofa,
  Sparkles,
  Wrench,
} from "lucide-react";

import { RegensburgMovingAdsForm } from "@/components/forms/RegensburgMovingAdsForm";
import { company } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/umzug-regensburg/anfrage";
const canonical = `${company.url}/regensburg/umzug`;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte einen Umzug mit Start oder Ziel im Regensburger Gebiet anfragen.",
    "Start:",
    "Ziel:",
    "Zeitraum:",
    "Umfang:",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Umzug Regensburg unkompliziert anfragen | FLOXANT",
  description:
    "Start, Ziel, Zeitraum und Umfang in zwei klaren Schritten senden. Für Umzüge innerhalb, aus oder nach Regensburg und längere Strecken.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${company.url}${path}`,
    title: "Umzug in Regensburg unkompliziert anfragen",
    description: "Start, Ziel, Zeitraum und Umfang kurz beschreiben und persönlich abstimmen.",
  },
};

const services = [
  ["Privat- und Wohnungsumzug", "Vom kleinen Haushalt bis zum vollständigen Wohnungswechsel.", Boxes],
  ["Möbeltransport", "Einzelne Möbel, Kartons oder klar beschriebene Teilmengen.", Sofa],
  ["Demontage und Montage", "Nur nach Angabe der betroffenen Möbel und des gewünschten Umfangs.", Wrench],
  ["Verpackungshilfe", "Verpackungsbedarf und Eigenleistung vorab voneinander abgrenzen.", PackageCheck],
  ["Räumung und Reinigung", "Als getrennte Zusatzleistungen mit eigener Umfangsbeschreibung.", Sparkles],
] as const;

const facts = [
  "Anfrage ist noch keine Buchung",
  "Termin nach persönlicher Prüfung",
  "Fotos sind optional",
  "Keine Preisberechnung ohne Eckdaten",
] as const;

const faq = [
  {
    q: "Welche Angaben braucht FLOXANT für eine Umzugsanfrage?",
    a: "Benötigt werden Start, Ziel, Zeitraum, Zimmer oder Wohnfläche, beide Etagen und Angaben zu den Aufzügen. Möbel, Zusatzleistungen, Fotos und eine Nachricht können ergänzt werden.",
  },
  {
    q: "Sind Umzüge innerhalb Regensburgs möglich?",
    a: "Ja. Beschreiben Sie beide Adressen oder PLZ, Etagen, Aufzüge, Umfang und Zeitraum. FLOXANT prüft anschließend den konkreten Umzug.",
  },
  {
    q: "Sind Umzüge aus oder nach Regensburg möglich?",
    a: "Ja. Umzüge mit Start oder Ziel im bedienten Regensburger Gebiet können angefragt werden. Die konkrete Strecke und Umsetzbarkeit werden persönlich geprüft.",
  },
  {
    q: "Können längere Strecken angefragt werden?",
    a: "Ja. Nennen Sie Start, Ziel, Umfang und Zeitraum. FLOXANT prüft die konkrete Route zusammen mit Zugängen, Möbelmenge und gewünschten Zusatzleistungen.",
  },
  {
    q: "Können Fotos gesendet werden?",
    a: "Ja. Fotos können im Formular ergänzt werden. Hilfreich sind Bilder von größeren Möbeln, Treppen, Engstellen, Aufzügen und Zugängen.",
  },
  {
    q: "Können Demontage und Montage ergänzt werden?",
    a: "Ja. Markieren Sie die gewünschte Leistung und beschreiben Sie die betroffenen Möbel. Anschlüsse oder Arbeiten außerhalb der Möbelmontage sind nicht automatisch enthalten.",
  },
  {
    q: "Können Entrümpelung und Reinigung kombiniert werden?",
    a: "Ja. Beide Leistungen können als Zusatz ausgewählt werden. Umfang, Reihenfolge und Termin werden getrennt geprüft und abgestimmt.",
  },
  {
    q: "Kann ein kurzfristiger Termin angefragt werden?",
    a: "Senden Sie den gewünschten Zeitraum. FLOXANT prüft anschließend, ob Termin und Umfang umsetzbar sind.",
  },
] as const;

export default function RegensburgMovingAdsPage() {
  return (
    <main className="overflow-x-clip bg-slate-50 text-slate-950">
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.22),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_56%,#172554_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-sm font-black text-cyan-100">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Umzug mit Start oder Ziel im Regensburger Gebiet
            </p>
            <h1 className="mt-6 text-4xl font-black leading-[1.03] sm:text-5xl lg:text-6xl">
              Umzug in Regensburg unkompliziert anfragen
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
              Senden Sie Start, Ziel, gewünschten Zeitraum und die wichtigsten Angaben zum
              Umfang. Auch Umzüge aus oder nach Regensburg über längere Strecken können
              angefragt werden.
            </p>
            <p className="mt-5 text-base font-black text-cyan-100">In 2 Schritten Umzug anfragen</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#umzug-anfragen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white">
                Umzug anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-black text-white outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Anrufen
              </a>
              <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-black text-white outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Per WhatsApp fragen
              </a>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-2 text-sm font-bold text-slate-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <RegensburgMovingAdsForm />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-900">Was angefragt werden kann</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Passende Leistungen klar voneinander abgrenzen.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {services.map(([title, text, Icon]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-cyan-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl rounded-2xl border border-blue-200 bg-blue-50 p-5 font-semibold leading-7 text-blue-950">
            Klaviertransport kann angefragt werden, wenn Instrumentart, Maße, Gewicht,
            Etagen, Aufzug, Treppen und Zugänge vorab beschrieben werden.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-200">Strecke vorbereiten</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Die fünf Angaben, die eine Strecke verständlich machen.</h2>
            <p className="mt-4 font-medium leading-7 text-slate-300">
              Umzüge mit Start oder Ziel im bedienten Regensburger Gebiet können auch über
              längere Strecken angefragt werden. FLOXANT prüft die konkrete Route zusammen mit Umfang, Zugängen und Zeitraum.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-5">
            {[
              ["1", "Start", "Ort oder PLZ"],
              ["2", "Ziel", "Ort oder PLZ"],
              ["3", "Etagen", "Start und Ziel"],
              ["4", "Aufzug", "je Gebäude"],
              ["5", "Zeitraum", "Wunsch oder Spanne"],
            ].map(([number, title, text], index) => (
              <li key={title} className="relative rounded-2xl border border-white/15 bg-white/5 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300 font-black text-slate-950">{number}</span>
                <p className="mt-3 font-black">{title}</p>
                <p className="mt-1 text-sm font-medium text-slate-300">{text}</p>
                {index < 4 ? <Route className="absolute -right-5 top-5 z-10 hidden h-5 w-5 text-cyan-200 sm:block" aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-900">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Vor der Umzugsanfrage kurz geklärt.</h2>
          </div>
          <div className="grid gap-3">
            {faq.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-2xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer font-black text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">{item.q}</summary>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-5 rounded-3xl bg-cyan-300 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-2xl font-black">Lieber erst die organische Leistungsseite ansehen?</h2>
            <p className="mt-2 font-medium leading-7">Dort finden Sie mehr Informationen zu Ablauf, Aufwandstreibern und kombinierten Leistungen.</p>
          </div>
          <Link href="/regensburg/umzug" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">
            Umzug Regensburg ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
