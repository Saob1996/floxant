import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  Phone,
  Sparkles,
  Stethoscope,
  Store,
} from "lucide-react";

import { DuesseldorfCleaningAdsForm } from "@/components/forms/DuesseldorfCleaningAdsForm";
import { company } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/duesseldorf/reinigung/anfrage";
const canonical = `${company.url}/duesseldorf/reinigung`;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte eine Reinigung in Düsseldorf anfragen.",
    "Objektart:",
    "Ort oder PLZ:",
    "Gewünschte Leistung:",
    "Ungefährer Umfang:",
    "Zeitraum:",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Reinigung Düsseldorf direkt anfragen | FLOXANT",
  description:
    "Reinigung in Düsseldorf für Büro, Praxis, Gewerbe oder private Räume in zwei klaren Schritten anfragen.",
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
    title: "Reinigung in Düsseldorf direkt anfragen",
    description: "Objekt, Leistung, Umfang und Zeitraum kurz beschreiben und persönlich abstimmen.",
  },
};

const services = [
  ["Büroreinigung", "Arbeitsplätze, Küche, Sanitär, Empfang, Turnus und Reinigungszeiten.", Building2],
  ["Praxisreinigung", "Räume, sensible Bereiche, Zeiten, Zugang und Ansprechpartner.", Stethoscope],
  ["Gewerbereinigung", "Objektart, Nutzungszeiten, Flächen und besondere Bereiche.", Store],
  ["Private Räume", "Wohnung, Haus oder möbliertes Apartment mit gewünschtem Zielzustand.", Home],
  ["Fensterreinigung", "Glasflächen, Rahmen, Erreichbarkeit und Innen- oder Außenreinigung.", PanelsTopLeft],
] as const;

const effortFactors = [
  ["Objekt", "Büro, Praxis, Gewerbe, Wohnung oder Apartment"],
  ["Fläche", "Quadratmeter, Räume und besondere Bereiche"],
  ["Zustand", "Gewöhnliche oder stärkere Verschmutzung"],
  ["Rhythmus", "Einmalig, wöchentlich oder individuell"],
  ["Zugang", "Etage, Schlüsselweg und mögliche Reinigungszeiten"],
  ["Zeitraum", "Wunschtermin, Frist oder wiederkehrendes Zeitfenster"],
] as const;

const faq = [
  {
    q: "Welche Angaben werden für eine Reinigungsanfrage benötigt?",
    a: "Benötigt werden Objektart, Ort oder PLZ, gewünschte Leistung, ungefährer Umfang, Reinigungsrhythmus und Zeitraum. Fotos und weitere Hinweise sind optional.",
  },
  {
    q: "Ist vor der Reinigung eine Besichtigung erforderlich?",
    a: "Das hängt vom Objekt und Umfang ab. Senden Sie zunächst die Eckdaten. FLOXANT prüft anschließend, ob Fotos genügen oder eine Besichtigung sinnvoll ist.",
  },
  {
    q: "Können Fotos mitgesendet werden?",
    a: "Ja. Fotos können direkt im Formular ergänzt werden. Sie helfen besonders bei stärkerer Verschmutzung, Sonderbereichen, Fenstern oder schwer beschreibbaren Flächen.",
  },
  {
    q: "Sind regelmäßige Reinigungen möglich?",
    a: "Ja. Wählen Sie wöchentlich, mehrfach wöchentlich oder einen individuellen Rhythmus. FLOXANT prüft den gewünschten Turnus zusammen mit Objekt, Umfang und Zeitfenster.",
  },
  {
    q: "Können Büroreinigung und Fensterreinigung kombiniert werden?",
    a: "Ja, beide Leistungen können gemeinsam angefragt werden. Geben Sie Fensterzahl, Rahmen, Erreichbarkeit und gewünschten Rhythmus zusätzlich an.",
  },
  {
    q: "Welche Faktoren beeinflussen den Reinigungsumfang?",
    a: "Wichtig sind Objektart, Fläche, Räume, Zustand, gewünschte Bereiche, Reinigungsrhythmus, Zugang und Zeitraum. Ein verbindlicher Umfang entsteht erst nach Prüfung.",
  },
  {
    q: "Kann ein vorhandenes Reinigungsangebot geprüft werden?",
    a: "Ja. Senden Sie Leistungsumfang, Turnus, Materialregelung, Zusatzkosten und offene Fragen. FLOXANT kann die Angaben strukturieren, ohne eine Ersparnis zu garantieren.",
  },
] as const;

export default function DuesseldorfCleaningAdsPage() {
  return (
    <main className="overflow-x-clip bg-slate-50 text-slate-950">
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_18%,rgba(34,211,238,0.22),transparent_32%),linear-gradient(135deg,#020617_0%,#0f2f45_54%,#172554_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-sm font-black text-cyan-100">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Reinigungsservice in Düsseldorf
            </p>
            <h1 className="mt-6 text-4xl font-black leading-[1.03] sm:text-5xl lg:text-6xl">
              Reinigung in Düsseldorf direkt anfragen
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
              Beschreiben Sie Büro, Praxis, Gewerbefläche, Wohnung oder Apartment. FLOXANT prüft Objekt, gewünschten
              Umfang, Rhythmus und Zeitraum und meldet sich für die persönliche Abstimmung.
            </p>
            <p className="mt-5 text-base font-black text-cyan-100">In 2 Schritten Reinigung anfragen</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#reinigung-anfragen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white">
                Anfrage starten
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-black text-white outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Anrufen
              </a>
              <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-black text-white outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Anfrage ist noch keine Buchung",
                "Termin nach persönlicher Prüfung",
                "Fotos können ergänzt werden",
                "Keine Preisberechnung ohne Eckdaten",
              ].map((fact) => (
                <li key={fact} className="flex gap-2 text-sm font-bold text-slate-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <DuesseldorfCleaningAdsForm />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.1em] text-cyan-900">Passende Reinigungsart</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Ihr Objekt entscheidet, welche Angaben wichtig sind.</h2>
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
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em] text-cyan-200">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Umfang verständlich machen
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">6 Angaben, die den Reinigungsaufwand beeinflussen.</h2>
            <p className="mt-4 font-medium leading-7 text-slate-300">
              Je klarer diese Punkte sind, desto gezielter kann FLOXANT Rückfragen und den nächsten Schritt vorbereiten.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {effortFactors.map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</span>
                <h3 className="mt-3 font-black">{title}</h3>
                <p className="mt-1 text-sm font-medium leading-6 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.1em] text-cyan-900">So geht es weiter</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Von der Anfrage zur persönlichen Rückmeldung.</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["1", "Objekt beschreiben", "Objektart, Ort, Leistung, Umfang, Rhythmus und Zeitraum angeben."],
              ["2", "Kontakt ergänzen", "Kontaktweg wählen und die Anfrage mit Datenschutz-Zustimmung senden."],
              ["3", "Rückmeldung erhalten", "FLOXANT prüft die Angaben und klärt offene Punkte persönlich."],
            ].map(([number, title, text]) => (
              <li key={number} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 font-black text-white">{number}</span>
                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.1em] text-cyan-900">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Vor der Reinigungsanfrage kurz geklärt.</h2>
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
            <h2 className="text-2xl font-black">Mehr über Reinigung in Düsseldorf erfahren?</h2>
            <p className="mt-2 font-medium leading-7">Auf der Leistungsseite finden Sie weitere Informationen zu Reinigungsarten, Ablauf und benötigten Angaben.</p>
          </div>
          <Link href="/duesseldorf/reinigung" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">
            Reinigungsleistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
