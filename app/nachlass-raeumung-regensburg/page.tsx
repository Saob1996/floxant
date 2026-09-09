import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  FileCheck2,
  Home,
  KeyRound,
  Phone,
  ShieldCheck,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";

import { EstateClearanceForm } from "@/components/EstateClearanceForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/nachlass-raeumung-regensburg";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Nachlass-Räumung Regensburg - Wohnung diskret räumen lassen | FLOXANT",
  description:
    "FLOXANT unterstützt Angehörige, Erben und Eigentuemer bei Nachlass-Räumung, Entsorgung, Reinigung und Objektvorbereitung in Regensburg und Umgebung.",
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20eine%20Nachlass-%2FWohnungsraeumung%20anfragen.%20Es%20geht%20um%20ein%20Objekt%20in%20%5BOrt%5D.%20Benoetigt%20werden%20Raeumung%2FEntsorgung%2FReinigung%20nach%20Absprache.%20Fotos%2C%20Zugang%20und%20Zeitraum%20kann%20ich%20senden.%20Bitte%20um%20diskrete%20Rueckmeldung.";
const phoneHref = "tel:+4915771105087";

const statusSteps = ["Fotos", "Umfang", "Freigabe", "Räumung", "Reinigung", "Übergabe"];

const processSteps = [
  {
    title: "Situation kurz schildern",
    text: "Objektart, Ort, Zeitraum und wer beauftragen darf helfen bei einer ruhigen ersten Einordnung.",
  },
  {
    title: "Fotos oder Beschreibung senden",
    text: "Räume, Möbel, Keller, Garage, Dachboden, Zugang und grobe Menge können ohne Druck beschrieben werden.",
  },
  {
    title: "Freigabe klären",
    text: "Eigentums- und Berechtigungsfragen müssen durch Erben, Bevollmaechtigte oder Eigentuemer geklaert sein.",
  },
  {
    title: "Umfang prüfen",
    text: "FLOXANT prüft Räumung, Entsorgung, Reinigung, Nebenraeume, Schlüssel und Termin nach Absprache.",
  },
  {
    title: "Angebot oder Rückfrage",
    text: "Wenn Angaben fehlen, meldet sich FLOXANT mit Rückfragen statt vorschnell etwas zu versprechen.",
  },
  {
    title: "Durchfuehrung nach Auftrag",
    text: "Räumung, Entsorgung und Reinigung erfolgen nur nach Auftrag, Machbarkeit, Freigabe und vereinbartem Umfang.",
  },
  {
    title: "Dokumentation optional",
    text: "Übergabeakte, Fotos, Schlüsselstatus oder Hinweise können nach Absprache organisatorisch gebuendelt werden.",
  },
];

const serviceBlocks = [
  "Wohnung räumen",
  "Haus oder einzelne Räume räumen",
  "Keller / Garage / Dachboden räumen",
  "Möbel und Gegenstände entfernen",
  "Entsorgung normaler Gegenstände nach Absprache",
  "Reinigung nach Räumung",
  "Objekt für Übergabe, Verkauf oder Vermietung vorbereiten",
  "Fotoeinschaetzung",
  "Übergabeakte / Foto-Dokumentation nach Absprache",
  "Schlüsselkoordination nach Absprache",
  "Diskreter Rückruf",
  "Verbindung zu Immobilie verkaufsbereit-Service",
  "Verbindung zu Wohnung wieder vermietbar-Service",
];

const audiences = [
  {
    title: "Für Angehörige",
    problem: "Wohnung oder Haus muss geraeumt werden, waehrend die Situation emotional und organisatorisch belastet.",
    benefit: "Ruhige Anfrage, Fotos, Rückruf und klare nächste Schritte.",
    cta: "Diskrete Rückfrage anfragen",
    Icon: UsersRound,
  },
  {
    title: "Für Erben / Erbengemeinschaften",
    problem: "Mehrere Personen müssen Freigabe, Umfang, Zugang und nächste Nutzung klären.",
    benefit: "Fotos, Objektstatus, Leistungen und optionale Dokumentation werden konkret abgefragt.",
    cta: "Nachlass-Objekt prüfen lassen",
    Icon: FileCheck2,
  },
  {
    title: "Für Eigentuemer / Vermieter",
    problem: "Eine Wohnung muss nach Nachlass wieder nutzbar, vermietbar oder verkaufsbereit werden.",
    benefit: "Räumung, Reinigung, Entsorgung und Objektvorbereitung nach Absprache.",
    cta: "Objekt vorbereiten lassen",
    Icon: Home,
  },
  {
    title: "Für Makler",
    problem: "Ein Objekt soll nach Nachlass für Besichtigung oder Expose praesentierbarer werden.",
    benefit: "Räumung, Reinigung, Fotoeinschaetzung und diskrete Abstimmung.",
    cta: "Objekt für Besichtigung vorbereiten",
    Icon: Camera,
  },
  {
    title: "Für Hausverwaltungen",
    problem: "Wohnung, Keller oder Nebenraeume müssen nach Nachlass geklaert und vorbereitet werden.",
    benefit: "Klare Anfrage mit Freigabehinweis, Fotos, Zugang und Rückfragen.",
    cta: "Fall für Hausverwaltung senden",
    Icon: Building2,
  },
];

const objectStatusCards = [
  {
    title: "Wohnung räumen",
    text: "Wohnung, Zimmer oder einzelne Bereiche sollen schrittweise geklaert werden.",
    recommendation: "Räumung, Entsorgung, Fotos",
    Icon: Home,
  },
  {
    title: "Haus teilweise räumen",
    text: "Nicht jeder Bereich muss sofort betroffen sein; Teilbereiche können priorisiert werden.",
    recommendation: "Umfang, Etagen, Zugang",
    Icon: Building2,
  },
  {
    title: "Keller / Garage / Dachboden",
    text: "Nebenraeume werden oft vergessen, sind aber für Übergabe, Verkauf oder Vermietung wichtig.",
    recommendation: "Nebenraeume prüfen",
    Icon: KeyRound,
  },
  {
    title: "Möbel / Hausrat entfernen",
    text: "Normale Gegenstände können nach Materialart, Menge, Zugang und Freigabe geprüft werden.",
    recommendation: "Entsorgung nach Absprache",
    Icon: Trash2,
  },
  {
    title: "Reinigung nach Räumung",
    text: "Nach dem Leeren kann Reinigung die Fläche nutzbarer und besser übergabefaehig machen.",
    recommendation: "Reinigung danach",
    Icon: Sparkles,
  },
  {
    title: "Diskreter Rückruf",
    text: "Wenn ein Formular zu viel ist, reicht eine kurze Nachricht und ein ruhiger Rückrufwunsch.",
    recommendation: "Rückruf",
    Icon: Phone,
  },
];

const boundaries = [
  "keine Rechtsberatung",
  "keine Erbberatung",
  "keine Nachlassbewertung",
  "keine Wertgegenstaende- oder Antiquitaetenbewertung",
  "keine Nachlassverwaltung",
  "keine psychologische Beratung",
  "keine Räumung ohne Freigabe",
  "keine gefaehrliche Entsorgung oder Sonderstoffzusage",
  "keine Sofortgarantie",
];

const relatedLinks = [
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/immobilie-verkaufsbereit-machen", label: "Nachlass-Objekt vorbereiten" },
  { href: "/wohnung-wieder-vermietbar", label: "Wohnung wieder vermietbar machen" },
  { href: "/uebergabeakte", label: "Übergabeakte ergaenzen" },
  { href: "/private-client-service", label: "Diskrete Abstimmung" },
  { href: "/keller-muellraum-rettung-regensburg", label: "Keller, Garage oder Nebenraeume klären" },
  { href: "/makler-vermieter-link", label: "Makler-/Vermieter-Fall senden" },
  { href: "/mieterwechsel-service-regensburg", label: "Mieterwechsel-Service" },
  { href: "/regensburg/reinigung", label: "Reinigung nach Räumung" },
  { href: "/regensburg", label: "Regensburg-Bereich" },
  { href: "/buchung", label: "Buchung / Anfrage starten" },
  { href: "/rechner", label: "Preisrahmen einschätzen" },
];

const faqItems = [
  {
    q: "Was ist eine Nachlass-Räumung?",
    a: "Gemeint ist praktische und organisatorische Unterstützung, wenn nach einem Erbfall Wohnung, Haus, Keller, Garage oder Dachboden geraeumt, entsorgt, gereinigt oder vorbereitet werden sollen.",
  },
  {
    q: "Für wen ist der Service geeignet?",
    a: "Für Angehörige, Erben, Erbengemeinschaften, Eigentuemer, Bevollmaechtigte, Vermieter, Makler und Hausverwaltungen im Raum Regensburg.",
  },
  {
    q: "Muss die Freigabe vorab geklaert sein?",
    a: "Ja. Rechtliche Eigentums-, Erb- und Freigabefragen müssen vorab durch Erben, Bevollmaechtigte oder Eigentuemer geklaert sein.",
  },
  {
    q: "Uebernimmt FLOXANT rechtliche Nachlassfragen?",
    a: "Nein. FLOXANT ersetzt keine rechtliche Nachlassklaerung, keine Erbberatung und keine Entscheidung der Beteiligten.",
  },
  {
    q: "Kann FLOXANT Wertgegenstaende bewerten?",
    a: "Nein. FLOXANT bietet keine Wertgegenstaende-, Antiquitaeten- oder Nachlassbewertung und keinen Ankauf als Versprechen an.",
  },
  {
    q: "Kann nach der Räumung gereinigt werden?",
    a: "Ja, Reinigung nach Räumung kann nach Zustand, Fläche, Termin, Zugang und Fotos geprüft werden.",
  },
  {
    q: "Kann eine Übergabeakte ergaenzt werden?",
    a: "Ja. Eine Übergabeakte oder Foto-Dokumentation kann Leistungen, Fotos, Schlüsselstatus und Hinweise nach Absprache organisatorisch buendeln.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Räumen, Möbeln, Keller, Garage, Dachboden und Zugang helfen bei Umfang und Rückfragen.",
  },
  {
    q: "Ist diskrete Abstimmung möglich?",
    a: "Ja. Die Anfrage kann mit Rückrufwunsch, WhatsApp oder E-Mail gestartet werden. FLOXANT kommuniziert sachlich und ohne Druck.",
  },
  {
    q: "Funktioniert das für Erbengemeinschaften?",
    a: "Ja, wenn Zustaendigkeit, Freigabe, Zugang und Ansprechpartner geklaert sind oder als offene Punkte benannt werden.",
  },
  {
    q: "Welche Stoffe werden nicht uebernommen?",
    a: "Gefahrstoffe, Asbest, Chemikalien, Oele, Farben, kontaminierte Materialien und rechtlich unklare Stoffe werden nicht ungeprueft zugesagt.",
  },
  {
    q: "In welchem Gebiet ist der Service möglich?",
    a: "Regensburg ist der feste Ausgangspunkt. Reinigung wird nur in Regensburg und im Umkreis bis 75 km geprüft; weitere Leistungen werden nach Verfügbarkeit getrennt bewertet.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Nachlass-Raeumung Regensburg",
      description:
        "Diskrete Nachlass-Räumung für Angehörige, Erben, Eigentuemer und Bevollmaechtigte: Räumung, Entsorgung, Reinigung und Objektvorbereitung nach Absprache.",
      path,
      about: [
        "Nachlass-Räumung Regensburg",
        "Wohnung nach Erbfall räumen",
        "Diskrete Wohnungsauflösung",
        "Reinigung nach Nachlass",
        "Objektvorbereitung nach Erbfall",
      ],
      potentialActions: [
        { name: "Nachlass-Objekt senden", target: `${path}#nachlass-form` },
        { name: "Diskret per WhatsApp anfragen", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Nachlass-Raeumung light",
      description:
        "Praktische und organisatorische Unterstützung bei Räumung, Entsorgung, Reinigung und Objektvorbereitung nach Erbfall oder Nachlass. Keine Rechtsberatung, keine Nachlassbewertung und keine Nachlassverwaltung.",
      path,
      serviceType: "Nachlass-Räumung, Wohnungsauflösung und Reinigung nach Absprache",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfügbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Nachlass-Raeumung Regensburg", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function NachlassRaeumungRegensburgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_16%_2%,#f5f5f4_0,transparent_30rem),radial-gradient(circle_at_86%_0%,#e7e5e4_0,transparent_28rem),linear-gradient(180deg,#fafaf9_0%,#ffffff_46%,#f5f5f4_100%)] text-stone-950">
        <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-stone-600 shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                FLOXANT Diskret-Modus
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-6xl">
                Nachlass-Räumung in Regensburg - diskret, ruhig und mit klaren Angaben
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
                Wenn nach einem Erbfall eine Wohnung, ein Haus, Keller oder Nebenraeume geraeumt und gereinigt werden müssen,
                prüft FLOXANT Umfang, Fotos, Zugang, Termin und gewuenschte Leistungen nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#nachlass-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-sm font-black text-white transition hover:bg-stone-800" data-event="service_card_click">
                  Nachlass-Objekt senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Diskret per WhatsApp anfragen
                </a>
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 text-sm font-black text-stone-800 transition hover:bg-stone-50" data-event="phone_click">
                  Rückruf
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-stone-600">
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Regensburg und Umgebung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Angehörige / Erben / Bevollmaechtigte</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Keine Rechts- oder Erbberatung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Freigabe muss geklaert sein</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-stone-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-950/10">
                <div className="rounded-[1.5rem] bg-stone-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">Ruhiger Ablauf</div>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">Nachlass oder Wohnung ruhig klären</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    FLOXANT arbeitet praktisch und organisatorisch: Fotos, Umfang, Freigabe, Zugang, Räumung, Reinigung und optionale Dokumentation.
                    Keine Nachlassverwaltung, keine Bewertung und keine juristische Prüfung.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-stone-200 bg-stone-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.08em] text-stone-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Fotos helfen, ohne sofort vor Ort alles erklären zu müssen.",
                    "Freigabe und Berechtigung werden als eigener Punkt behandelt.",
                    "Räumung und Reinigung können kombiniert werden.",
                    "Übergabeakte oder Foto-Dokumentation nur nach Absprache.",
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Ablauf</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">So laeuft eine Nachlass-Räumung mit FLOXANT ab</h2>
              <p className="mt-3 text-base leading-8 text-stone-700">
                Die Anfrage soll keine Huerde sein. FLOXANT sammelt die praktischen Punkte, die für Machbarkeit, Umfang und Rückfragen wichtig sind.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((item, index) => (
                <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-950 text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 text-sm font-bold leading-7 text-stone-700">
              FLOXANT ersetzt keine rechtliche Nachlassklaerung. Rechtliche Fragen, Eigentumsfreigaben und Nachlassentscheidungen müssen vorab durch Erben, Bevollmaechtigte oder Eigentuemer geklaert sein.
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] bg-stone-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-300">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Was FLOXANT nach einem Erbfall prüfen kann</h2>
              <p className="mt-4 text-base leading-8 text-stone-300">
                Der Service ist kein Ankauf, keine Wertbewertung und keine Nachlassverwaltung. Geprüft werden praktische Bausteine rund um Räumung, Entsorgung, Reinigung, Zugang, Schlüssel und Dokumentation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/immobilie-verkaufsbereit-machen" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-stone-950">
                  Objekt verkaufsbereit machen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/uebergabeakte" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-black text-white">
                  Übergabeakte ergaenzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-stone-200 bg-white p-4 text-sm font-bold leading-6 text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-stone-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Für Angehörige, Erben, Eigentuemer, Makler und Hausverwaltungen</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                    <Icon className="h-6 w-6 text-stone-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-bold leading-7 text-stone-700">{item.problem}</p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{item.benefit}</p>
                    <Link href="#nachlass-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-stone-800 transition hover:text-stone-950" data-event="service_card_click">
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
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Objektstatus-Terminal</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Was muss geklaert werden?</h2>
              <p className="mt-3 text-base leading-8 text-stone-700">
                Die Karten führen nicht in einen lauten Notfallmodus, sondern in eine ruhige Vorprüfung mit Ort, Fotos, Zugang, Freigabe und Umfang.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {objectStatusCards.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                    <Icon className="h-6 w-6 text-stone-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                    <span className="mt-4 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-black text-stone-700">{item.recommendation}</span>
                    <Link href="#nachlass-form" className="mt-5 flex items-center gap-2 text-sm font-black text-stone-800 transition hover:text-stone-950" data-event="service_card_click">
                      Passenden Fall senden
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Anfrage starten</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Fotos, Zeitraum, Freigabe und Rückrufwunsch senden</h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Es reicht eine erste Beschreibung. FLOXANT prüft Objektart, Ort, Umfang, Fotos, Zugang, Freigabe und gewuenschte Leistungen.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <Camera className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="text-sm leading-7 text-stone-700">Fotos helfen, ohne sofort alles vor Ort erklären zu müssen. Sensible Familien- oder Nachlassdetails bitte erst nach persönlicher Abstimmung senden.</p>
                </div>
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-stone-700" />
                  <p className="text-sm leading-7 text-stone-700">FLOXANT räumt nicht ohne klare Berechtigung oder Freigabe und ersetzt keine Nachlass-, Rechts- oder Wertpruefung.</p>
                </div>
              </div>
            </div>
            <EstateClearanceForm />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Grenzen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Was FLOXANT nicht uebernimmt</h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Damit die Kommunikation sicher und würdevoll bleibt, trennt FLOXANT praktische Räumung klar von rechtlichen, fachlichen oder emotionalen Beratungsleistungen.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {boundaries.map((item) => (
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Passende Verknuepfung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Verwandte FLOXANT Wege</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Wenn der Fall eher allgemeine Entrümpelung, Verkaufsvorbereitung, Vermietung oder Dokumentation betrifft, führen diese Seiten in passende Spezialpfade.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} prefetch={false} className="inline-flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-black text-stone-800 transition hover:border-stone-400 hover:bg-white">
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Häufige Fragen zur Nachlass-Räumung</h2>
            </div>
            <div className="mt-7 grid gap-3">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-[1.25rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-base font-black text-stone-950">
                    {item.q}
                  </summary>
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
                <h2 className="mt-3 text-3xl font-black tracking-tight">Nachlass-Objekt ruhig prüfen lassen</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
                  Senden Sie Ort, Zeitraum, Fotos, Zugang, Freigabe-Status und offene Bereiche. FLOXANT prüft Räumung, Entsorgung, Reinigung und Dokumentation nach Absprache.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="#nachlass-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-stone-950" data-event="service_card_click">
                  Nachlass-Objekt senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200/50 bg-emerald-400/10 px-6 text-sm font-black text-emerald-50" data-event="whatsapp_click">
                  WhatsApp senden
                </a>
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200/40 bg-white/5 px-6 text-sm font-black text-white" data-event="phone_click">
                  Rückruf
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#nachlass-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Diskret anfragen
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <a href={phoneHref} className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
            Rückruf
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
