import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  CalendarClock,
  Camera,
  CheckCircle2,
  FileCheck2,
  Home,
  KeyRound,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { DiscreetMoveForm } from "@/components/DiscreetMoveForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/diskreter-umzug-trennung-scheidung";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Diskreter Umzug bei Trennung oder Scheidung | FLOXANT",
  description:
    "FLOXANT prueft diskrete Umzuege und sensible Auszuege in Regensburg und Umgebung: Transport, Reinigung, Schluesseluebergabe und Uebergabeakte nach Absprache.",
  keywords: [
    "diskreter umzug regensburg",
    "trennungsumzug regensburg",
    "scheidungsumzug regensburg",
    "auszug nach trennung",
    "umzug bei trennung",
    "diskreter auszug",
    "privater umzug diskret",
    "umzug sensible situation",
    "auszug aus gemeinsamer wohnung",
    "moebel abholen nach trennung",
    "reinigung nach trennungsauszug",
    "schluesseluebergabe nach auszug",
    "premium umzug diskret",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20eine%20diskrete%20Anfrage%20stellen.%20Es%20geht%20um%20einen%20Auszug%20%2F%20Transport%20%2F%20Reinigung%20in%20%5BOrt%5D.%20Ich%20moechte%20Details%20ruhig%20abstimmen.%20Rueckruf%20oder%20WhatsApp%20ist%20moeglich.";
const callbackWhatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20einen%20diskreten%20Rueckruf%20fuer%20eine%20sensible%20Auszugssituation%20anfragen.%20Ort%20und%20Zeitraum%20kann%20ich%20nennen.";
const phoneHref = "tel:+4915771105087";

const statusSteps = ["Rueckruf", "Zeitfenster", "Umfang", "Transport", "Reinigung", "Uebergabe"];

const discretionBlocks = [
  {
    title: "Rueckruf statt langer Erklaerung",
    text: "Die erste Anfrage darf kurz bleiben. Details koennen telefonisch ruhiger geklaert werden.",
    Icon: Phone,
  },
  {
    title: "Klares Zeitfenster",
    text: "FLOXANT prueft Zeitfenster, Ort, Zugang und Umfang statt eine Sofortzusage zu versprechen.",
    Icon: CalendarClock,
  },
  {
    title: "Umfang vorab klaeren",
    text: "Moebel, Kartons, persoenliche Gegenstaende und Fotos helfen bei einer realistischen Einschaetzung.",
    Icon: Box,
  },
  {
    title: "Transport / Umzug",
    text: "Diskreter Transport im Raum Regensburg und Bayern nach Verfuegbarkeit, keine Duesseldorf-Umzug-Logik.",
    Icon: Truck,
  },
  {
    title: "Reinigung nach Auszug",
    text: "Endreinigung, sichtbare Flaechen oder Uebergabevorbereitung koennen nach Absprache ergaenzt werden.",
    Icon: Sparkles,
  },
  {
    title: "Schluessel & Uebergabe",
    text: "Schluesselstatus, Uebergabeakte und Foto-Dokumentation sind Zusatzoptionen nach Absprache.",
    Icon: KeyRound,
  },
  {
    title: "Sichere Kontaktmethode",
    text: "Telefon, WhatsApp, E-Mail oder nur bestimmte Uhrzeiten koennen angegeben werden.",
    Icon: ShieldCheck,
  },
  {
    title: "Fotos optional",
    text: "Fotos sind hilfreich, aber nicht Pflicht. Sensible private Details gehoeren nicht in Events oder URLs.",
    Icon: Camera,
  },
];

const packages = [
  {
    title: "Diskreter Auszug",
    forWhom: "Wenn ein Auszug aus einer gemeinsamen Wohnung ruhig geplant werden muss.",
    includes: ["Transport / Umzug", "Zeitfenster", "Umfang / Fotos", "Rueckruf"],
    cta: "Diskreten Auszug pruefen",
    Icon: Home,
  },
  {
    title: "Moebel & persoenliche Gegenstaende",
    forWhom: "Wenn einzelne Moebel, Kartons oder private Gegenstaende abgeholt werden sollen.",
    includes: ["Transport", "Zugang / Etage", "Gegenstandsliste", "Zeitfenster"],
    cta: "Abholung pruefen",
    Icon: Box,
  },
  {
    title: "Auszug + Reinigung",
    forWhom: "Wenn nach dem Auszug Reinigung oder Uebergabevorbereitung offen ist.",
    includes: ["Transport", "Endreinigung", "Uebergabevorbereitung", "Fotos optional"],
    cta: "Auszug + Reinigung anfragen",
    Icon: Sparkles,
  },
  {
    title: "Schluessel & Uebergabe",
    forWhom: "Wenn Schluessel, Uebergabetermin oder Dokumentation relevant sind.",
    includes: ["Schluesseluebergabe nach Absprache", "Uebergabeakte", "Foto-Dokumentation nach Absprache"],
    cta: "Uebergabe abstimmen",
    Icon: KeyRound,
  },
  {
    title: "Premium/Diskret",
    forWhom: "Wenn die Situation hochwertig, sensibel oder komplex abgestimmt werden soll.",
    includes: ["Rueckruf", "Planung", "Zusatzservices", "diskrete Abstimmung"],
    cta: "Premium-Rueckruf anfragen",
    Icon: ShieldCheck,
  },
];

const notIncluded = [
  "keine Rechtsberatung oder Scheidungsberatung",
  "keine Mediation oder Konfliktloesung",
  "keine psychologische Beratung",
  "keine Sicherheitsdienstleistung und kein Schutzversprechen",
  "keine Unterstuetzung bei heimlichem oder rechtswidrigem Entfernen fremder Gegenstaende",
  "keine Gewalt- oder Gefahrensituation als Erstkontakt",
  "keine Garantie fuer Soforteinsatz",
  "keine Kautions-, Uebergabe- oder Abnahmegarantie",
];

const relatedLinks = [
  { href: "/private-client-service", label: "Premium-/Diskret-Service" },
  { href: "/umzug-regensburg", label: "Umzug Regensburg" },
  { href: "/reinigung-regensburg", label: "Reinigung nach Auszug" },
  { href: "/uebergabeakte", label: "Uebergabeakte ergaenzen" },
  { href: "/schluesseluebergabe", label: "Schluesseluebergabe abstimmen" },
  { href: "/schadensbegrenzung", label: "Wenn der Plan bereits gekippt ist" },
  { href: "/plan-b-service", label: "Plan B pruefen lassen" },
  { href: "/immobilie-verkaufsbereit-machen", label: "Objekt nach Auszug vorbereiten" },
  { href: "/buchung", label: "Anfrage starten" },
  { href: "/rechner", label: "Preisrahmen einschaetzen" },
  { href: "/einsatzgebiet-regensburg-200km", label: "Servicegebiet Regensburg" },
];

const faqItems = [
  {
    q: "Was ist ein diskreter Umzug?",
    a: "Ein diskreter Umzug ist eine ruhig abgestimmte Auszugs- oder Transportanfrage, bei der Kontaktweg, Zeitfenster, Umfang, Fotos und Zusatzleistungen sensibel behandelt werden.",
  },
  {
    q: "Ist das fuer Trennung oder Scheidung geeignet?",
    a: "Ja, wenn es um praktische und organisatorische Leistungen wie Transport, Reinigung, Schluesseluebergabe oder Uebergabeakte geht. FLOXANT uebernimmt keine rechtlichen oder persoenlichen Konfliktfragen.",
  },
  {
    q: "Muss ich Details zur privaten Situation erklaeren?",
    a: "Nein. Fuer die erste Anfrage reichen Ort, Zeitraum, grober Umfang und gewuenschte Kontaktmethode. Details koennen spaeter telefonisch geklaert werden.",
  },
  {
    q: "Kann ich Rueckruf statt Formular waehlen?",
    a: "Ja. Das Formular fragt bewusst nach Rueckrufzeitfenster und sicherer Kontaktmethode, damit nicht alles schriftlich erklaert werden muss.",
  },
  {
    q: "Kann FLOXANT Moebel oder persoenliche Gegenstaende abholen?",
    a: "Ja, nach Absprache und nur wenn Berechtigung, Zugang, Eigentumsfragen, Umfang und Termin geklaert sind.",
  },
  {
    q: "Muss ich berechtigt sein, die Gegenstaende abzuholen?",
    a: "Ja. FLOXANT unterstuetzt keine heimliche oder rechtswidrige Abholung und prueft keine Eigentumsstreitigkeiten.",
  },
  {
    q: "Uebernimmt FLOXANT rechtliche Fragen?",
    a: "Nein. FLOXANT bietet keine Rechtsberatung, Scheidungsberatung, Mediation oder Konfliktloesung.",
  },
  {
    q: "Ist FLOXANT ein Sicherheitsdienst?",
    a: "Nein. Bei Gefahr, Gewalt, Bedrohung oder akutem Sicherheitsrisiko sind Polizei, Notruf oder geeignete Beratungsstellen der richtige Erstkontakt.",
  },
  {
    q: "Kann Reinigung nach dem Auszug ergaenzt werden?",
    a: "Ja. Reinigung, Endreinigung oder Uebergabevorbereitung koennen nach Ort, Zustand, Zeitfenster und Verfuegbarkeit geprueft werden.",
  },
  {
    q: "Kann Schluesseluebergabe ergaenzt werden?",
    a: "Ja, Schluesseluebergabe kann nach Absprache organisatorisch abgestimmt werden, sofern Zugang, Berechtigung und Empfaenger klar sind.",
  },
  {
    q: "Kann eine Uebergabeakte ergaenzt werden?",
    a: "Ja. Eine Uebergabeakte kann Leistungen, Fotos, Schluesselstatus und Hinweise nach Absprache organisatorisch buendeln.",
  },
  {
    q: "In welchem Gebiet ist das moeglich?",
    a: "Regensburg ist der Kern. Umgebung Regensburg und Bayern werden nach Verfuegbarkeit geprueft. Fuer Duesseldorf prueft FLOXANT nur Reinigung und Entsorgung, keine Umzugsleistung.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Diskreter Umzug bei Trennung oder Scheidung",
      description:
        "Diskrete Auszugs-, Transport-, Reinigungs- und Uebergabeanfrage fuer sensible private Situationen im Raum Regensburg.",
      path,
      about: [
        "diskreter Umzug Regensburg",
        "Trennungsumzug",
        "Scheidungsumzug",
        "sensibler Auszug",
        "Auszug mit Reinigung und Uebergabe",
      ],
      potentialActions: [
        { name: "Diskreten Rueckruf anfragen", target: `${path}#diskret-form` },
        { name: "Diskret per WhatsApp anfragen", target: callbackWhatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Diskret-Modus fuer sensible Auszuege",
      description:
        "Praktische und organisatorische Unterstuetzung fuer diskreten Auszug, Transport, Reinigung, Schluesseluebergabe und Uebergabeakte nach Absprache. Keine Rechtsberatung, keine Sicherheitsdienstleistung und keine Konfliktloesung.",
      path,
      serviceType: "Diskreter Auszug, Umzug, Transport, Reinigung und Uebergabe nach Absprache",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfuegbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Diskreter Umzug", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function DiskreterUmzugTrennungScheidungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main
        className="overflow-hidden bg-[radial-gradient(circle_at_16%_2%,#f5f5f4_0,transparent_30rem),radial-gradient(circle_at_86%_0%,#e7e5e4_0,transparent_28rem),linear-gradient(180deg,#fafaf9_0%,#ffffff_48%,#f5f5f4_100%)] text-stone-950"
        data-event="view_discreet_move"
      >
        <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-stone-600 shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                FLOXANT Diskret-Modus
              </div>
              <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-stone-500">
                Diskreter Auszug, ruhig abgestimmt
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-6xl">
                Diskreter Umzug bei Trennung oder Scheidung
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
                Wenn ein Auszug ruhig, vertraulich und klar abgestimmt werden muss, prueft FLOXANT Transport,
                Reinigung, Entruempelung, Schluesseluebergabe und Uebergabeakte nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#diskret-form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-sm font-black text-white transition hover:bg-stone-800"
                  data-event="start_discreet_move_lead"
                >
                  Diskreten Rueckruf anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
                  data-event="click_discreet_whatsapp"
                >
                  <MessageCircle className="h-4 w-4" />
                  Diskret schreiben
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 text-sm font-black text-stone-800 transition hover:bg-stone-50"
                  data-event="click_discreet_phone"
                >
                  <Phone className="h-4 w-4" />
                  Anrufen
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-stone-600">
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Regensburg und Umgebung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Rueckruf-First</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Keine Rechtsberatung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Berechtigung muss geklaert sein</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-stone-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-950/10">
                <div className="rounded-[1.5rem] bg-stone-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">Diskretionslogik</div>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">Ruhige Anfrage, klare naechste Schritte</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    FLOXANT prueft praktische Machbarkeit: Ort, Zeitfenster, Umfang, Kontaktweg, Transport, Reinigung,
                    Schluessel und Uebergabe. Persoenliche Konfliktfragen bleiben bewusst ausserhalb des Services.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-stone-200 bg-stone-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.08em] text-stone-700">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Sichere Kontaktmethode und Rueckrufzeitfenster koennen angegeben werden.",
                    "Kurze Anfrage reicht; keine sensiblen Details im Freitext noetig.",
                    "Reinigung, Schluesseluebergabe und Uebergabeakte koennen ergaenzt werden.",
                    "Keine heimliche Abholung, keine Rechts- oder Sicherheitsberatung.",
                  ].map((item) => (
                    <div key={item} className="rounded-[1rem] border border-stone-200 bg-stone-50 p-4 text-sm font-bold leading-6 text-stone-700">
                      <CheckCircle2 className="mb-2 h-5 w-5 text-stone-700" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Diskretions-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">
                Was bei einem diskreten Auszug wichtig sein kann
              </h2>
              <p className="mt-3 text-base leading-8 text-stone-700">
                Manche Auszuege brauchen nicht mehr Laerm, sondern mehr Ruhe, klare Abstimmung und wenig unnoetige
                Erklaerungen.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {discretionBlocks.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                    <Icon className="h-6 w-6 text-stone-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] bg-stone-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">Rueckruf-First</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Sie moechten nicht alles schriftlich erklaeren?</h2>
              <p className="mt-4 text-base leading-8 text-stone-300">
                Sensible Auszuege brauchen oft ruhige Abstimmung. Nennen Sie nur Kontaktweg, Ort, Zeitraum und groben
                Anlass. FLOXANT klaert Details ueber den gewuenschten sicheren Kontaktweg.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="#diskret-form" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-stone-950" data-event="start_discreet_move_lead">
                  Diskreten Rueckruf anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={callbackWhatsappHref} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-200/50 bg-emerald-400/10 px-4 text-sm font-black text-emerald-50" data-event="click_discreet_whatsapp">
                  Rueckruf per WhatsApp anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "nur noetigste Angaben im Formular",
                "Rueckrufzeitfenster und Kontaktmethode angeben",
                "Details muessen nicht per E-Mail erklaert werden",
                "kurzer Anlass reicht: diskreter Auszug, private Trennung, sensible Situation oder Premium-Abstimmung",
                "Fotos optional, wenn sie die Einschaetzung erleichtern",
                "keine sensiblen Details in URL-Parametern oder Analytics-Events",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-stone-200 bg-white p-4 text-sm font-bold leading-6 text-stone-700">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-stone-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Service-Pakete</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Diskrete Pakete ohne Festpreis- oder Sofortgarantie</h2>
              <p className="mt-3 text-base leading-8 text-stone-700">
                Jede Anfrage wird nach Ort, Termin, Umfang, Fotos, Zugang und Kapazitaet geprueft.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {packages.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                    <Icon className="h-6 w-6 text-stone-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-bold leading-7 text-stone-700">{item.forWhom}</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-stone-600">
                      {item.includes.map((entry) => (
                        <li key={entry} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-stone-700" />
                          {entry}
                        </li>
                      ))}
                    </ul>
                    <Link href="#diskret-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-stone-800 transition hover:text-stone-950" data-event="select_discreet_request_type">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-200 bg-amber-50/80 p-7 lg:p-9">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Wichtig bei akuten Konflikten oder Gefahr</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">FLOXANT ist kein Sicherheitsdienst</h2>
              </div>
              <div className="space-y-4 text-sm font-bold leading-7 text-stone-800">
                <p>
                  Wenn Gefahr, Gewalt, Bedrohung oder ein akutes Sicherheitsrisiko besteht, kontaktieren Sie bitte
                  Polizei, Notruf oder geeignete Beratungsstellen. FLOXANT kann nur die praktische Machbarkeit von
                  Transport, Reinigung, Entruempelung, Entsorgung, Schluesseluebergabe und organisatorischer Abstimmung
                  pruefen.
                </p>
                <p>
                  Gegenstaende duerfen nur abgeholt werden, wenn Berechtigung und Eigentumsfragen geklaert sind. FLOXANT
                  unterstuetzt keine heimliche oder rechtswidrige Abholung.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Anfrage starten</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">
                Rueckruf, Kontaktweg, Zeitraum und Umfang senden
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Das Formular ist bewusst kurz. Es erzwingt keine privaten Details und fragt Berechtigung sowie
                Datenschutz klar ab.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <Phone className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="text-sm leading-7 text-stone-700">
                    Rueckrufzeitfenster und Kontakt-Hinweise helfen, die Abstimmung diskret zu halten.
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <FileCheck2 className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="text-sm leading-7 text-stone-700">
                    Berechtigung muss geklaert sein. FLOXANT prueft keine Eigentumsstreitigkeiten und keine rechtlichen
                    Fragen.
                  </p>
                </div>
              </div>
            </div>
            <DiscreetMoveForm />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Grenzen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Was FLOXANT nicht uebernimmt</h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Der Diskret-Modus bleibt ein praktischer Service fuer Auszug, Transport, Reinigung und Uebergabe. Er ist
                keine Beratung, keine Konfliktloesung und kein Sicherheitsangebot.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {notIncluded.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 text-sm font-bold leading-6 text-stone-700">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-stone-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Verknuepfte FLOXANT Wege</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Wenn der Fall anders gelagert ist</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Diese Links fuehren zu verwandten, aber klar getrennten Services. Kein Footer-Spam, keine aggressive
                Scheidungs-Optik.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-black text-stone-800 transition hover:border-stone-400 hover:bg-white">
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Haeufige Fragen zum diskreten Auszug</h2>
            </div>
            <div className="mt-7 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-base font-black text-stone-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-8 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-stone-950 p-7 text-white lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">FLOXANT Diskret-Modus</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Diskrete Anfrage ruhig starten</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
                  Senden Sie Ort, Zeitraum, Kontaktweg und groben Umfang. FLOXANT prueft nach Absprache, was praktisch
                  machbar ist.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="#diskret-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-stone-950" data-event="start_discreet_move_lead">
                  Rueckruf anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200/50 bg-emerald-400/10 px-6 text-sm font-black text-emerald-50" data-event="click_discreet_whatsapp">
                  Diskret schreiben
                </a>
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200/40 bg-white/5 px-6 text-sm font-black text-white" data-event="click_discreet_phone">
                  Anrufen
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-stone-200 bg-white/95 p-2 shadow-2xl shadow-stone-950/20 backdrop-blur md:hidden">
          <Link href="#diskret-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 text-xs font-black text-white" data-event="start_discreet_move_lead">
            Rueckruf
          </Link>
          <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-xs font-black text-emerald-800" data-event="click_discreet_whatsapp">
            WhatsApp
          </a>
          <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 text-xs font-black text-stone-800" data-event="click_discreet_phone">
            Anrufen
          </a>
        </div>
      </main>
    </>
  );
}
