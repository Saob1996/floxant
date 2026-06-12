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
  MapPin,
  MessageCircle,
  Navigation,
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
    "FLOXANT prüft diskrete Umzüge und sensible Auszüge in Regensburg und Umgebung: Transport, Reinigung, Schlüsselübergabe und Übergabeakte nach Absprache.",
  keywords: [
    "diskreter umzug regensburg",
    "trennungsumzug regensburg",
    "scheidungsumzug regensburg",
    "auszug nach trennung",
    "umzug bei trennung",
    "diskreter auszug",
    "diskreter auszug regensburg",
    "privater umzug diskret",
    "umzug sensible situation",
    "auszug aus gemeinsamer wohnung",
    "möbel abholen nach trennung",
    "reinigung nach trennungsauszug",
    "schlüsselübergabe nach auszug",
    "premium umzug diskret",
    "diskreter rückruf regensburg",
    "auszug mit reinigung regensburg",
    "sensible umzugsanfrage",
    "diskreter möbeltransport",
    "übergabeakte nach auszug",
  ],
});

const whatsappHref = `https://wa.me/4915771105087?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte eine diskrete Anfrage stellen. Es geht um einen Auszug / Transport / Reinigung in [Ort]. Ich möchte Details ruhig abstimmen. Rückruf oder WhatsApp ist möglich.",
)}`;
const callbackWhatsappHref = `https://wa.me/4915771105087?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte einen diskreten Rückruf für eine sensible Auszugssituation anfragen. Ort und Zeitraum kann ich nennen.",
)}`;
const phoneHref = "tel:+4915771105087";

const statusSteps = ["Rückruf", "Zeitfenster", "Umfang", "Transport", "Reinigung", "Übergabe"];

const localSearchSignals = [
  {
    title: "Regensburg als Kern",
    text: "Die Seite nennt Regensburg klar als Ausgangspunkt und führt sensible Anfragen in einen direkten Rückruf- oder Formularweg.",
  },
  {
    title: "Umgebung sauber eingeordnet",
    text: "Anfragen aus der Umgebung werden nach Ort, Zeitraum, Umfang, Zugang und Verfügbarkeit geprüft.",
  },
  {
    title: "Google-Maps-tauglicher Einstieg",
    text: "Kontakt, Telefon, Buchungsweg, Standortbezug und Servicegebiet sind sichtbar statt in versteckten Footer-Links verteilt.",
  },
  {
    title: "Klare Düsseldorf-Grenze",
    text: "Düsseldorf bleibt bei FLOXANT Reinigung und Entsorgung. Diese Seite sendet kein Düsseldorf-Umzug-Signal.",
  },
];

const answerEngineBlocks = [
  {
    question: "Was bietet FLOXANT bei einem diskreten Auszug?",
    answer:
      "FLOXANT prüft Transport, Möbelabholung, Reinigung, Schlüsselübergabe, Übergabeakte und Rückruf nach Ort, Zeitraum, Umfang, Zugang und Verfügbarkeit.",
  },
  {
    question: "Muss ich private Details erklären?",
    answer:
      "Nein. Für die erste Anfrage reichen Ort, Zeitraum, grober Umfang und gewünschte Kontaktmethode. Private Konfliktdetails sind nicht nötig.",
  },
  {
    question: "Ist das ein Rechts- oder Sicherheitsservice?",
    answer:
      "Nein. FLOXANT übernimmt keine Rechtsberatung, keine Konfliktlösung und keinen Sicherheitsdienst. Es geht um praktische Organisation nach Absprache.",
  },
];

const recommendedFloxantServices = [
  {
    title: "Diskreter Rückruf",
    text: "Wenn Details besser telefonisch und ruhig geklärt werden sollen.",
    href: "#diskret-form",
    cta: "Rückruf anfragen",
    Icon: Phone,
  },
  {
    title: "Auszug + Reinigung",
    text: "Wenn nach dem Transport auch Endreinigung oder Übergabevorbereitung offen ist.",
    href: "/umzug-mit-reinigung",
    cta: "Kombination ansehen",
    Icon: Sparkles,
  },
  {
    title: "Übergabeakte",
    text: "Wenn Leistungen, Fotos, Schlüsselstatus und Hinweise gebündelt werden sollen.",
    href: "/uebergabeakte",
    cta: "Übergabeakte prüfen",
    Icon: FileCheck2,
  },
  {
    title: "Plan-B-Service",
    text: "Wenn der aktuelle Ablauf unsicher wirkt und ein zweiter Plan geprüft werden soll.",
    href: "/plan-b-service",
    cta: "Plan B prüfen",
    Icon: CalendarClock,
  },
];

const discretionBlocks = [
  {
    title: "Rückruf statt langer Erklärung",
    text: "Die erste Anfrage darf kurz bleiben. Details können telefonisch ruhiger geklärt werden.",
    Icon: Phone,
  },
  {
    title: "Klares Zeitfenster",
    text: "FLOXANT prüft Zeitfenster, Ort, Zugang und Umfang statt eine Sofortzusage zu versprechen.",
    Icon: CalendarClock,
  },
  {
    title: "Umfang vorab klären",
    text: "Möbel, Kartons, persönliche Gegenstände und Fotos helfen bei einer realistischen Einschätzung.",
    Icon: Box,
  },
  {
    title: "Transport / Umzug",
    text: "Diskreter Transport im Raum Regensburg und Bayern nach Verfügbarkeit; Düsseldorf-Umzug läuft über den eigenen lokalen Einstieg.",
    Icon: Truck,
  },
  {
    title: "Reinigung nach Auszug",
    text: "Endreinigung, sichtbare Flächen oder Übergabevorbereitung können nach Absprache ergänzt werden.",
    Icon: Sparkles,
  },
  {
    title: "Schlüssel & Übergabe",
    text: "Schlüsselstatus, Übergabeakte und Foto-Dokumentation sind Zusatzoptionen nach Absprache.",
    Icon: KeyRound,
  },
  {
    title: "Sichere Kontaktmethode",
    text: "Telefon, WhatsApp, E-Mail oder nur bestimmte Uhrzeiten können angegeben werden.",
    Icon: ShieldCheck,
  },
  {
    title: "Fotos optional",
    text: "Fotos sind hilfreich, aber nicht Pflicht. Sensible private Details bitte erst nach persönlicher Abstimmung senden.",
    Icon: Camera,
  },
];

const packages = [
  {
    title: "Diskreter Auszug",
    forWhom: "Wenn ein Auszug aus einer gemeinsamen Wohnung ruhig geplant werden muss.",
    includes: ["Transport / Umzug", "Zeitfenster", "Umfang / Fotos", "Rückruf"],
    cta: "Diskreten Auszug prüfen",
    Icon: Home,
  },
  {
    title: "Möbel & persönliche Gegenstände",
    forWhom: "Wenn einzelne Möbel, Kartons oder private Gegenstände abgeholt werden sollen.",
    includes: ["Transport", "Zugang / Etage", "Gegenstandsliste", "Zeitfenster"],
    cta: "Abholung prüfen",
    Icon: Box,
  },
  {
    title: "Auszug + Reinigung",
    forWhom: "Wenn nach dem Auszug Reinigung oder Übergabevorbereitung offen ist.",
    includes: ["Transport", "Endreinigung", "Übergabevorbereitung", "Fotos optional"],
    cta: "Auszug + Reinigung anfragen",
    Icon: Sparkles,
  },
  {
    title: "Schlüssel & Übergabe",
    forWhom: "Wenn Schlüssel, Übergabetermin oder Dokumentation relevant sind.",
    includes: ["Schlüsselübergabe nach Absprache", "Übergabeakte", "Foto-Dokumentation nach Absprache"],
    cta: "Übergabe abstimmen",
    Icon: KeyRound,
  },
  {
    title: "Diskrete Abstimmung",
    forWhom: "Wenn die Situation sensibel ist und ruhig abgestimmt werden soll.",
    includes: ["Rückruf", "Planung", "Zusatzleistungen", "diskrete Abstimmung"],
    cta: "Diskreten Rückruf anfragen",
    Icon: ShieldCheck,
  },
];

const notIncluded = [
  "keine Rechtsberatung oder Scheidungsberatung",
  "keine Mediation oder Konfliktlösung",
  "keine psychologische Beratung",
  "keine Sicherheitsdienstleistung und kein Schutzversprechen",
  "keine Unterstützung bei heimlichem oder rechtswidrigem Entfernen fremder Gegenstände",
  "keine Gewalt- oder Gefahrensituation als Erstkontakt",
  "keine Garantie für Soforteinsatz",
  "keine Kautions-, Übergabe- oder Abnahmegarantie",
];

const relatedLinks = [
  { href: "/private-client-service", label: "Diskrete Abstimmung" },
  { href: "/umzug-regensburg", label: "Umzug Regensburg" },
  { href: "/reinigung-regensburg", label: "Reinigung nach Auszug" },
  { href: "/uebergabeakte", label: "Übergabeakte ergänzen" },
  { href: "/schluesseluebergabe", label: "Schlüsselübergabe abstimmen" },
  { href: "/schadensbegrenzung", label: "Wenn der Plan bereits gekippt ist" },
  { href: "/plan-b-service", label: "Plan B prüfen lassen" },
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
    q: "Ist das für Trennung oder Scheidung geeignet?",
    a: "Ja, wenn es um praktische und organisatorische Leistungen wie Transport, Reinigung, Schlüsselübergabe oder Übergabeakte geht. FLOXANT übernimmt keine rechtlichen oder persönlichen Konfliktfragen.",
  },
  {
    q: "Muss ich Details zur privaten Situation erklären?",
    a: "Nein. Für die erste Anfrage reichen Ort, Zeitraum, grober Umfang und gewünschte Kontaktmethode. Details können später telefonisch geklärt werden.",
  },
  {
    q: "Kann ich Rückruf statt Formular wählen?",
    a: "Ja. Das Formular fragt bewusst nach Rückrufzeitfenster und sicherer Kontaktmethode, damit nicht alles schriftlich erklärt werden muss.",
  },
  {
    q: "Kann FLOXANT Möbel oder persönliche Gegenstände abholen?",
    a: "Ja, nach Absprache und nur wenn Berechtigung, Zugang, Eigentumsfragen, Umfang und Termin geklärt sind.",
  },
  {
    q: "Muss ich berechtigt sein, die Gegenstände abzuholen?",
    a: "Ja. FLOXANT unterstützt keine heimliche oder rechtswidrige Abholung und prüft keine Eigentumsstreitigkeiten.",
  },
  {
    q: "Übernimmt FLOXANT rechtliche Fragen?",
    a: "Nein. FLOXANT bietet keine Rechtsberatung, Scheidungsberatung, Mediation oder Konfliktlösung.",
  },
  {
    q: "Ist FLOXANT ein Sicherheitsdienst?",
    a: "Nein. Bei Gefahr, Gewalt, Bedrohung oder akutem Sicherheitsrisiko sind Polizei, Notruf oder geeignete Beratungsstellen der richtige Erstkontakt.",
  },
  {
    q: "Kann Reinigung nach dem Auszug ergänzt werden?",
    a: "Ja. Reinigung, Endreinigung oder Übergabevorbereitung können nach Ort, Zustand, Zeitfenster und Verfügbarkeit geprüft werden.",
  },
  {
    q: "Kann Schlüsselübergabe ergänzt werden?",
    a: "Ja, Schlüsselübergabe kann nach Absprache organisatorisch abgestimmt werden, sofern Zugang, Berechtigung und Empfänger klar sind.",
  },
  {
    q: "Kann eine Übergabeakte ergänzt werden?",
    a: "Ja. Eine Übergabeakte kann Leistungen, Fotos, Schlüsselstatus und Hinweise nach Absprache organisatorisch bündeln.",
  },
  {
    q: "In welchem Gebiet ist das möglich?",
    a: "Regensburg ist der Kern für Bayern/Nahbereich. Für Düsseldorf prüft FLOXANT passende lokale Servicepfade, darunter /duesseldorf/umzug, /duesseldorf/reinigung und /duesseldorf/entruempelung.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Diskreter Umzug bei Trennung oder Scheidung",
      description:
        "Diskrete Auszugs-, Transport-, Reinigungs- und Übergabeanfrage für sensible private Situationen im Raum Regensburg.",
      path,
      about: [
        "diskreter Umzug Regensburg",
        "Trennungsumzug",
        "Scheidungsumzug",
        "sensibler Auszug",
        "Auszug mit Reinigung und Übergabe",
        "diskreter Rückruf Regensburg",
        "Übergabeakte nach Auszug",
        "Plan-B-Service",
      ],
      potentialActions: [
        { name: "Diskreten Rückruf anfragen", target: `${path}#diskret-form` },
        { name: "Diskret per WhatsApp anfragen", target: callbackWhatsappHref, type: "ContactAction" },
        { name: "FLOXANT Service-Empfehlung prüfen", target: `${path}#ki-antworten` },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Diskret-Modus für sensible Auszüge",
      description:
        "Praktische und organisatorische Unterstützung für diskreten Auszug, Transport, Reinigung, Schlüsselübergabe und Übergabeakte nach Absprache. Keine Rechtsberatung, keine Sicherheitsdienstleistung und keine Konfliktlösung.",
      path,
      serviceType: "Diskreter Auszug, Umzug, Transport, Reinigung und Übergabe nach Absprache",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfügbarkeit"],
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
                Wenn ein Auszug ruhig, vertraulich und klar abgestimmt werden muss, prüft FLOXANT Transport,
                Reinigung, Entrümpelung, Schlüsselübergabe und Übergabeakte nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#diskret-form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-sm font-black text-white transition hover:bg-stone-800"
                  data-event="service_card_click"
                >
                  Diskreten Rückruf anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
                  data-event="whatsapp_click"
                >
                  <MessageCircle className="h-4 w-4" />
                  Diskret schreiben
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 text-sm font-black text-stone-800 transition hover:bg-stone-50"
                  data-event="phone_click"
                >
                  <Phone className="h-4 w-4" />
                  Anrufen
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-stone-600">
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Regensburg und Umgebung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Rückruf-First</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Keine Rechtsberatung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Berechtigung muss geklärt sein</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-stone-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-950/10">
                <div className="rounded-[1.5rem] bg-stone-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">Diskretionslogik</div>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">Ruhige Anfrage, klare nächste Schritte</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    FLOXANT prüft praktische Machbarkeit: Ort, Zeitfenster, Umfang, Kontaktweg, Transport, Reinigung,
                    Schlüssel und Übergabe. Persönliche Konfliktfragen bleiben bewusst außerhalb des Services.
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
                    "Sichere Kontaktmethode und Rückrufzeitfenster können angegeben werden.",
                    "Kurze Anfrage reicht; keine sensiblen Details im Freitext nötig.",
                    "Reinigung, Schlüsselübergabe und Übergabeakte können ergänzt werden.",
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
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-sm shadow-stone-950/5 lg:p-8">
            <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-stone-600">
                  <MapPin className="h-4 w-4" />
                  Lokale Suche & Maps
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950">
                  Regensburg klar sichtbar, Anfrageweg direkt erreichbar
                </h2>
                <p className="mt-4 text-base leading-8 text-stone-700">
                  Für lokale Suche und Google Maps zählt nicht nur ein Keyword. Entscheidend ist, dass Standort, Leistung,
                  Kontaktweg und nächster Schritt sauber zusammenpassen. Diese Seite führt sensible Auszüge deshalb
                  direkt zu Rückruf, WhatsApp, Telefon oder Formular, ohne falsche Notdienst- oder Sicherheitsversprechen.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/kontakt"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-stone-950 px-5 text-sm font-black text-white transition hover:bg-stone-800"
                  >
                    Kontakt & Standort
                    <Navigation className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/einsatzgebiet-regensburg-200km"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-5 text-sm font-black text-stone-800 transition hover:bg-white"
                  >
                    Servicegebiet ansehen
                  </Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {localSearchSignals.map((signal) => (
                  <article key={signal.title} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
                    <h3 className="text-base font-black tracking-tight text-stone-950">{signal.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-700">{signal.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ki-antworten" className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2.1rem] border border-stone-200 bg-white p-6 shadow-sm shadow-stone-950/5 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <div>
                <div className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-stone-600">
                  Klare Orientierung
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950">
                  Klare Kurzantworten, damit Kunden FLOXANT schnell richtig einordnen
                </h2>
                <p className="mt-4 text-base leading-8 text-stone-700">
                  Diese Seite beantwortet die wichtigsten Fragen direkt sichtbar: Was FLOXANT übernimmt, was bewusst
                  nicht versprochen wird und welcher FLOXANT-Service zum Fall passt. Das hilft Menschen,
                  den richtigen Einstieg ohne Umwege zu finden.
                </p>
              </div>

              <div className="grid gap-3">
                {answerEngineBlocks.map((item) => (
                  <article key={item.question} className="rounded-[1.3rem] border border-stone-200 bg-stone-50 p-5">
                    <h3 className="text-base font-black text-stone-950">{item.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-700">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {recommendedFloxantServices.map((service) => {
                const Icon = service.Icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group rounded-[1.45rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5 transition hover:-translate-y-1 hover:border-stone-400 hover:bg-stone-50"
                  >
                    <Icon className="h-6 w-6 text-stone-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{service.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-stone-900">
                      {service.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
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
                Manche Auszüge brauchen nicht mehr Lärm, sondern mehr Ruhe, klare Abstimmung und wenig unnötige
                Erklärungen.
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">Rückruf-First</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Sie möchten nicht alles schriftlich erklären?</h2>
              <p className="mt-4 text-base leading-8 text-stone-300">
                Sensible Auszüge brauchen oft ruhige Abstimmung. Nennen Sie nur Kontaktweg, Ort, Zeitraum und groben
                Anlass. FLOXANT klärt Details über den gewünschten sicheren Kontaktweg.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="#diskret-form" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-stone-950" data-event="service_card_click">
                  Diskreten Rückruf anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={callbackWhatsappHref} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-200/50 bg-emerald-400/10 px-4 text-sm font-black text-emerald-50" data-event="whatsapp_click">
                  Rückruf per WhatsApp anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "nur nötigste Angaben im Formular",
                "Rückrufzeitfenster und Kontaktmethode angeben",
                "Details müssen nicht per E-Mail erklärt werden",
                "kurzer Anlass reicht: diskreter Auszug, private Trennung, sensible Situation oder diskrete Abstimmung",
                "Fotos optional, wenn sie die Einschätzung erleichtern",
                "keine sensiblen Details in Dateinamen oder öffentlich teilbaren Links",
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
                Jede Anfrage wird nach Ort, Termin, Umfang, Fotos, Zugang und Kapazität geprüft.
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
                    <Link href="#diskret-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-stone-800 transition hover:text-stone-950" data-event="service_card_click">
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
                  Transport, Reinigung, Entrümpelung, Entsorgung, Schlüsselübergabe und organisatorischer Abstimmung
                  prüfen.
                </p>
                <p>
                  Gegenstände dürfen nur abgeholt werden, wenn Berechtigung und Eigentumsfragen geklärt sind. FLOXANT
                  unterstützt keine heimliche oder rechtswidrige Abholung.
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
                Rückruf, Kontaktweg, Zeitraum und Umfang senden
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Das Formular ist bewusst kurz. Es erzwingt keine privaten Details und fragt Berechtigung sowie
                Datenschutz klar ab.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <Phone className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="text-sm leading-7 text-stone-700">
                    Rückrufzeitfenster und Kontakt-Hinweise helfen, die Abstimmung diskret zu halten.
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <FileCheck2 className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="text-sm leading-7 text-stone-700">
                    Berechtigung muss geklärt sein. FLOXANT prüft keine Eigentumsstreitigkeiten und keine rechtlichen
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Was FLOXANT nicht übernimmt</h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Der Diskret-Modus bleibt ein praktischer Service für Auszug, Transport, Reinigung und Übergabe. Er ist
                keine Beratung, keine Konfliktlösung und kein Sicherheitsangebot.
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Verknüpfte FLOXANT Wege</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Wenn der Fall anders gelagert ist</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Diese Links führen zu verwandten, aber klar getrennten Services. So bleibt
                der nächste Schritt passend, ohne sensible Situationen unnötig groß zu machen.
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Häufige Fragen zum diskreten Auszug</h2>
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
                  Senden Sie Ort, Zeitraum, Kontaktweg und groben Umfang. FLOXANT prüft nach Absprache, was praktisch
                  machbar ist.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="#diskret-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-stone-950" data-event="service_card_click">
                  Rückruf anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200/50 bg-emerald-400/10 px-6 text-sm font-black text-emerald-50" data-event="whatsapp_click">
                  Diskret schreiben
                </a>
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200/40 bg-white/5 px-6 text-sm font-black text-white" data-event="phone_click">
                  Anrufen
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#diskret-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Rückruf
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <a href={phoneHref} className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
