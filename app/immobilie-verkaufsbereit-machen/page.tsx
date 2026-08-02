import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Home,
  KeyRound,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";

import { PropertyReadyForm } from "@/components/PropertyReadyForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/immobilie-verkaufsbereit-machen";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Immobilie verkaufsbereit machen - Räumung, Reinigung & Entsorgung | FLOXANT",
  description:
    "FLOXANT unterstützt Eigentuemer, Makler und Erbengemeinschaften: Wohnung oder Haus vor Verkauf, Besichtigung oder Expose räumen, entsorgen und reinigen lassen.",
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20eine%20Immobilie%20vor%20Verkauf%2FBesichtigung%20vorbereiten%20lassen.%20Es%20geht%20um%20%5BWohnung%2FHaus%2FKeller%2FGarage%5D%20in%20%5BOrt%5D.%20Benoetigt%20werden%20Raeumung%2FReinigung%2FEntsorgung%20nach%20Absprache.%20Fotos%20und%20Termin%20kann%20ich%20senden.";
const phoneHref = "tel:+4915771105087";

const statusSteps = ["Räumen", "Entsorgen", "Reinigen", "Dokumentieren", "Praesentieren"];

const statusCards = [
  {
    title: "Wohnung oder Haus ist noch moebliert",
    text: "Möbel, Kartons oder Hausrat lenken von Raumwirkung, Zustand und Besichtigung ab.",
    services: ["Räumung", "Entsorgung", "Reinigung danach"],
    Icon: Home,
  },
  {
    title: "Keller / Garage / Dachboden ist voll",
    text: "Nebenflächen können Verkauf, Besichtigung oder Übergabe schlechter wirken lassen.",
    services: ["Nebenflächen", "Fotoeinschaetzung", "Reinigung optional"],
    Icon: Building2,
  },
  {
    title: "Sperrmuell oder alte Möbel müssen weg",
    text: "Normale Gegenstände können nach Umfang, Zugang und Materialart geprüft werden.",
    services: ["Entsorgung", "Zugang", "Materialart"],
    Icon: Trash2,
  },
  {
    title: "Reinigung vor Besichtigung fehlt",
    text: "Küche, Bad, Böden und sichtbare Flächen brauchen vor Termin oft Priorität.",
    services: ["Reinigung", "Grundreinigung", "Fotos"],
    Icon: Sparkles,
  },
  {
    title: "Expose-Fotos stehen bald an",
    text: "FLOXANT kann offene Punkte nach Terminfenster und Fotoeinschaetzung priorisieren.",
    services: ["Besichtigungs-Ready", "Fototermin", "Rückruf"],
    Icon: Camera,
  },
  {
    title: "Eigentuemer wohnt nicht vor Ort",
    text: "Fotos, Zugang, Schlüsselstatus und Rückmeldung machen den Fall besser steuerbar.",
    services: ["Schlüsselstatus", "Dokumentation", "Diskrete Abstimmung"],
    Icon: KeyRound,
  },
  {
    title: "Erbfall / Nachlass muss vorbereitet werden",
    text: "Sensible Räumung, Entsorgung und Reinigung können diskret abgestimmt werden.",
    services: ["Nachlass", "Diskret", "Räumung"],
    Icon: UsersRound,
  },
  {
    title: "Makler braucht schnelle Objektvorbereitung",
    text: "Objektstatus, Fotos, Termin und passende Bausteine können kurz gebuendelt werden.",
    services: ["Makler-Fall", "Besichtigung", "Objekt-Link"],
    Icon: ClipboardList,
  },
];

const serviceBlocks = [
  "Wohnung oder Haus räumen",
  "Möbel und Gegenstände entfernen",
  "Keller / Garage / Dachboden räumen",
  "Sperrmuell / normale Gegenstände nach Absprache entsorgen",
  "Reinigung vor Besichtigung",
  "Endreinigung / Grundreinigung nach Absprache",
  "Reinigung nach Entrümpelung",
  "Fotoeinschaetzung",
  "Foto-Dokumentation nach Absprache",
  "Übergabeakte als Zusatz",
  "Schlüsselkoordination nach Absprache",
  "Diskrete Abstimmung",
  "Makler-/Vermieter-Link verknuepfen",
  "Mieterwechsel-Service verknuepfen",
  "Wohnung wieder vermietbar verknuepfen",
];

const audiences = [
  {
    title: "Für Eigentuemer",
    text:
      "Wenn ein Objekt vor Verkauf, Besichtigung oder Eigentuemerwechsel geordneter, leerer oder sauberer vorbereitet werden soll.",
    cta: "Objekt vor Verkauf vorbereiten lassen",
    Icon: Home,
  },
  {
    title: "Für Makler",
    text:
      "Wenn Wohnung oder Haus für Besichtigung, Expose-Fotos oder Erstkontakt praesentierbarer vorbereitet werden soll.",
    cta: "Objekt für Besichtigung vorbereiten",
    Icon: Camera,
  },
  {
    title: "Für Erbengemeinschaften",
    text:
      "Wenn Wohnung, Haus, Keller oder Garage nach Nachlass geordnet, geraeumt, entsorgt oder gereinigt werden muss.",
    cta: "Nachlass-Objekt prüfen lassen",
    Icon: UsersRound,
  },
  {
    title: "Für Vermieter",
    text:
      "Wenn nach Auszug Verkauf, Neuvermietung oder Nutzung vorbereitet werden soll und Räumung, Reinigung oder Dokumentation fehlen.",
    cta: "Wohnung nach Auszug vorbereiten",
    Icon: KeyRound,
  },
  {
    title: "Für Hausverwaltungen",
    text:
      "Wenn Objektwechsel, Mieterwechsel, Nebenraeume oder Besichtigungen zusammen mit Fotos und Termin gesendet werden sollen.",
    cta: "Objektfall für Hausverwaltung senden",
    Icon: Building2,
  },
];

const packages = [
  {
    title: "Besichtigungs-Ready",
    forText: "Objekt soll vor Besichtigung sauberer und geordneter wirken.",
    includes: ["Reinigung", "sichtbare Flächen", "Fotoeinschaetzung", "kleine Entsorgung nach Absprache"],
    cta: "Besichtigung vorbereiten",
  },
  {
    title: "Räumen & Reinigen",
    forText: "Wohnung oder Haus enthält noch Möbel, Hausrat oder Gegenstände.",
    includes: ["Räumung", "Entsorgung nach Absprache", "Reinigung danach"],
    cta: "Räumen & Reinigen anfragen",
  },
  {
    title: "Keller/Garage/Dachboden",
    forText: "Nebenflächen stoeren Verkauf, Besichtigung oder Eigentuemerwechsel.",
    includes: ["Räumung", "Entsorgung", "Fotoeinschaetzung", "Reinigung optional"],
    cta: "Nebenflächen prüfen lassen",
  },
  {
    title: "Eigentuemer-/Makler-Fall",
    forText: "Objekt soll schnell eingeschaetzt und priorisiert werden.",
    includes: ["Fotos", "Objektstatus", "Termin", "Rückruf"],
    cta: "Objektfall senden",
  },
  {
    title: "Diskrete Abstimmung",
    forText: "Sensible Eigentuemer-, Verkaufs-, Trennungs- oder Nachlasssituation.",
    includes: ["Rückruf", "diskrete Abstimmung", "Räumung/Reinigung/Entsorgung nach Absprache"],
    cta: "Diskrete Anfrage starten",
  },
];

const boundaries = [
  "keine Verkaufsgarantie",
  "keine Wertsteigerungsgarantie",
  "keine Maklerleistung",
  "keine Immobilienbewertung",
  "keine Rechtsberatung",
  "keine Renovierungs-, Reparatur- oder Malerarbeitszusage",
  "keine Home-Staging-Behauptung",
  "keine gefaehrliche Entsorgung oder Sonderstoffzusage",
  "keine Sofortgarantie",
];

const relatedLinks = [
  { href: "/nachlass-raeumung-regensburg", label: "Nachlass-Räumung in Regensburg" },
  { href: "/wohnung-wieder-vermietbar", label: "Wohnung wieder vermietbar machen" },
  { href: "/mieterwechsel-service-regensburg", label: "Mieterwechsel-Service" },
  { href: "/makler-vermieter-link", label: "Makler-/Vermieter-Link" },
  { href: "/uebergabeakte", label: "Übergabeakte ergaenzen" },
  { href: "/diskreter-umzug-trennung-scheidung", label: "Diskreten Auszug ruhig klären" },
  { href: "/keller-muellraum-rettung-regensburg", label: "Keller und Garage vor Verkauf räumen" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigung vor Besichtigung" },
  { href: "/private-client-service", label: "Diskrete Objektvorbereitung" },
  { href: "/regensburg", label: "Regensburg-Bereich" },
  { href: "/buchung", label: "Buchung / Anfrage starten" },
  { href: "/rechner", label: "Preisrahmen einschätzen" },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg separat" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg separat" },
];

const faqItems = [
  {
    q: "Was bedeutet Immobilie verkaufsbereit machen?",
    a: "Gemeint ist praktische und organisatorische Vorbereitung vor Verkauf, Besichtigung, Expose-Fotos oder Eigentuemerwechsel: Räumung, Entsorgung, Reinigung, Fotos und Dokumentation nach Absprache.",
  },
  {
    q: "Garantiert FLOXANT einen besseren Verkaufspreis?",
    a: "Nein. FLOXANT unterstützt bei Räumung, Reinigung, Entsorgung und Vorbereitung, garantiert aber keinen Verkaufserfolg, keine Wertsteigerung und keinen besseren Preis.",
  },
  {
    q: "Ist FLOXANT ein Makler?",
    a: "Nein. FLOXANT uebernimmt keine Maklerleistung, keine Vermarktung, keine Immobilienbewertung und keine rechtliche Beratung.",
  },
  {
    q: "Uebernimmt FLOXANT Renovierungen?",
    a: "Diese Seite behauptet keine Renovierung, Reparatur oder Malerarbeiten. Geprüft werden nur Leistungen, die FLOXANT wirklich anbietet und einplanen kann.",
  },
  {
    q: "Kann FLOXANT vor Besichtigung reinigen?",
    a: "Ja, Reinigung vor Besichtigung kann nach Fläche, Zustand, Termin, Zugang und Fotos geprüft werden.",
  },
  {
    q: "Kann FLOXANT Keller, Garage oder Dachboden räumen?",
    a: "Ja, nach Prüfung von Umfang, Zugang, Freigabe, Materialart und Fotos. Gefahrstoffe oder Sondermuell werden nicht pauschal zugesagt.",
  },
  {
    q: "Ist der Service für Erbengemeinschaften geeignet?",
    a: "Ja, wenn Berechtigung, Zugang und Freigabe geklaert sind. FLOXANT kann Räumung, Entsorgung, Reinigung und diskrete Abstimmung nach Absprache prüfen.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Räumen, Möbeln, Nebenflächen, Zugang und Verschmutzung helfen bei Aufwand, Priorität und Rückfragen.",
  },
  {
    q: "Kann eine Übergabeakte ergaenzt werden?",
    a: "Ja. Die FLOXANT Übergabeakte kann nach Absprache Leistungen, Fotos, Schlüsselstatus und Hinweise organisatorisch buendeln.",
  },
  {
    q: "Was wird nicht entsorgt?",
    a: "Gefahrstoffe, Asbest, Chemikalien, Oele, Farben, kontaminierte Materialien und rechtlich unklare Stoffe werden nicht ungeprueft zugesagt.",
  },
  {
    q: "In welchem Gebiet ist der Service möglich?",
    a: "Düsseldorf und Regensburg werden je nach Leistung, Objekt und Verfügbarkeit getrennt geprüft. Senden Sie den Ort direkt mit Ihrer Anfrage.",
  },
  {
    q: "Ist kurzfristige Vorbereitung möglich?",
    a: "Kurzfristige Vorbereitung kann geprüft werden. Machbarkeit haengt von Ort, Termin, Umfang, Zugang, Fotos und Kapazität ab.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Immobilie verkaufsbereit machen",
      description:
        "Objekt-Service für Eigentuemer, Makler, Vermieter, Erbengemeinschaften und Hausverwaltungen: Räumung, Entsorgung, Reinigung und Dokumentation vor Verkauf oder Besichtigung nach Absprache.",
      path,
      about: [
        "Immobilie verkaufsbereit machen",
        "Wohnung für Besichtigung vorbereiten",
        "Räumung vor Verkauf",
        "Reinigung vor Immobilienverkauf",
        "Objektvorbereitung Regensburg",
      ],
      potentialActions: [
        { name: "Verkaufsbereit-Service anfragen", target: `${path}#property-ready-form` },
        { name: "Objekt per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Verkaufsbereit-Service fuer Immobilien",
      description:
        "Praktische und organisatorische Vorbereitung von Wohnungen, Haeusern und Nebenflächen vor Verkauf, Besichtigung, Expose oder Eigentuemerwechsel durch Räumung, Entsorgung, Reinigung und Dokumentation nach Absprache. Keine Maklerleistung, keine Bewertung und keine Verkaufsgarantie.",
      path,
      serviceType: "Objektvorbereitung vor Immobilienverkauf oder Besichtigung",
      areaServed: ["Regensburg", "Verifiziertes 75-km-Einsatzgebiet um Regensburg", "Bayern nach Verfügbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Immobilie verkaufsbereit machen", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function ImmobilieVerkaufsbereitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_12%_0%,#fde68a_0,transparent_32rem),radial-gradient(circle_at_90%_6%,#e7e5e4_0,transparent_28rem),linear-gradient(180deg,#fafaf9_0%,#ffffff_43%,#f5f5f4_100%)] text-stone-950">
        <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-800 shadow-sm">
                <PackageCheck className="h-4 w-4" />
                FLOXANT Property-Ready System
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-6xl">
                Immobilie verkaufsbereit machen vor Besichtigung oder Verkauf
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
                Wenn Wohnung, Haus, Keller oder Garage vor Verkauf, Besichtigung oder Expose vorbereitet werden müssen,
                prüft FLOXANT Räumung, Entsorgung, Reinigung und Dokumentation nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#property-ready-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-sm font-black text-white transition hover:bg-amber-800" data-event="service_card_click">
                  Objektstatus prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Objekt per WhatsApp senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-stone-600">
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Regensburg als Kernmarkt</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Eigentuemer / Makler / Erbengemeinschaft</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Keine Maklerleistung</span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-2">Keine Verkaufsgarantie</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-amber-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-950/10">
                <div className="rounded-[1.5rem] bg-stone-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Objektstatus</div>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">Von "noch offen" zu prüfbar</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    FLOXANT ersetzt keine Maklerleistung, Bewertung oder Renovierung. Der Nutzen liegt in praktischer Vorbereitung:
                    Räume leerer, Flächen sauberer, Nebenbereiche geordneter und der Fall besser dokumentiert.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-stone-200 bg-stone-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-xs font-black text-stone-950">{index + 1}</span>
                      <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.08em] text-stone-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Fotos helfen, Umfang und Priorität schneller zu klären.",
                    "Schlüsselstatus und Zugang werden nicht nebenbei behandelt.",
                    "Übergabeakte und Foto-Dokumentation sind nach Absprache möglich.",
                    "Regensburg bleibt auf Reinigung und Entsorgung begrenzt.",
                  ].map((item) => (
                    <div key={item} className="rounded-[1rem] border border-amber-100 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
                      <CheckCircle2 className="mb-2 h-5 w-5 text-amber-700" />
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Objektstatus-Terminal</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Was muss vor Besichtigung oder Verkauf noch passieren?</h2>
              <p className="mt-3 text-base leading-8 text-stone-700">
                Vor Verkauf oder Besichtigung müssen oft noch Räume, Möbel, Keller, Reinigung, Entsorgung oder Zugang geklaert werden.
                FLOXANT fragt die Punkte ab, die den nächsten Schritt praktisch beeinflussen.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statusCards.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                    <Icon className="h-6 w-6 text-amber-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.services.map((service) => (
                        <span key={service} className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-black text-stone-700">{service}</span>
                      ))}
                    </div>
                    <Link href="#property-ready-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-800 transition hover:text-stone-950" data-event="service_card_click">
                      Objektstatus prüfen lassen
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] bg-stone-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Was FLOXANT vor Verkauf oder Besichtigung prüfen kann</h2>
              <p className="mt-4 text-base leading-8 text-stone-300">
                FLOXANT behauptet keine Renovierung, kein Home Staging, keine Bewertung und keinen Verkaufserfolg.
                Geprüft werden praktische Bausteine rund um Räumung, Entsorgung, Reinigung, Zugang, Fotos und Dokumentation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/makler-vermieter-link" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-stone-950">
                  Makler-/Eigentuemer-Fall senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/uebergabeakte" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-black text-white">
                  Übergabeakte ergaenzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/keller-muellraum-rettung-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200/30 bg-amber-950/20 px-4 text-sm font-black text-amber-50">
                  Nebenflächen prüfen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-stone-200 bg-white p-4 text-sm font-bold leading-6 text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Für Eigentuemer, Makler, Erbengemeinschaften, Vermieter und Hausverwaltungen</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                    <Icon className="h-6 w-6 text-amber-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                    <Link href="#property-ready-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-800 transition hover:text-stone-950" data-event="service_card_click">
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Verkaufsbereit-Pakete</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Pakete ohne Festpreis- oder Verkaufsgarantie</h2>
              <p className="mt-3 text-base leading-8 text-stone-700">
                Die Pakete sind Orientierungen für die Anfrage. Preis, Umfang und Termin werden erst nach Objektangaben, Fotos und Zugang geprüft.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {packages.map((item) => (
                <article key={item.title} className="rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
                  <h3 className="text-lg font-black tracking-tight text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.forText}</p>
                  <ul className="mt-4 grid gap-2 text-xs font-bold text-stone-700">
                    {item.includes.map((include) => (
                      <li key={include} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        {include}
                      </li>
                    ))}
                  </ul>
                  <Link href="#property-ready-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-800 transition hover:text-stone-950" data-event="service_card_click">
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Anfrage starten</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Fotos, Ziel, Termin und offene Bereiche senden</h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Je klarer Objektart, Ziel, Besichtigungstermin, Fototermin, Zugang, Fotos und gewuenschte Bausteine sind,
                desto schneller kann FLOXANT Rückfragen reduzieren und Machbarkeit einordnen.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <Camera className="mb-2 h-5 w-5 text-amber-700" />
                  <p className="text-sm leading-7 text-stone-700">Fotos von Räumen, Keller, Garage, Dachboden, Zugang, Möbeln oder Verschmutzung helfen bei Umfang und Priorität.</p>
                </div>
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-amber-700" />
                  <p className="text-sm leading-7 text-stone-700">FLOXANT übernimmt weder Maklerleistung noch Bewertung, Renovierung oder rechtliche Prüfung. Über Verkauf und Preis entscheiden die dafür verantwortlichen Beteiligten.</p>
                </div>
              </div>
            </div>
            <PropertyReadyForm />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Abgrenzung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Was FLOXANT nicht verspricht</h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Der Verkaufsbereit-Service ist praktische Objektvorbereitung. Er ist bewusst keine Makler-, Bewertungs-, Renovierungs- oder Rechtsleistung.
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Passende nächste Schritte</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Verwandte FLOXANT Wege</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Wenn Ihr Fall eher Vermietung, Mieterwechsel, Übergabe oder Nebenflächen betrifft, führen diese Seiten in die passenden Spezialpfade.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} prefetch={false} className="inline-flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-black text-stone-800 transition hover:border-amber-300 hover:bg-amber-50">
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">Häufige Fragen zum Verkaufsbereit-Service</h2>
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
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">FLOXANT Property-Ready</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Objekt vor Verkauf, Besichtigung oder Expose prüfen lassen</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
                  Senden Sie Ort, Ziel, Termin, Fotos und offene Bereiche. FLOXANT prüft nach Absprache Räumung, Reinigung, Entsorgung und Dokumentation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="#property-ready-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-stone-950" data-event="service_card_click">
                  Verkaufsbereit-Service anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200/50 bg-emerald-400/10 px-6 text-sm font-black text-emerald-50" data-event="whatsapp_click">
                  WhatsApp senden
                </a>
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-200/50 bg-amber-400/10 px-6 text-sm font-black text-amber-50" data-event="phone_click">
                  Anrufen
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#property-ready-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Objekt vorbereiten
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
