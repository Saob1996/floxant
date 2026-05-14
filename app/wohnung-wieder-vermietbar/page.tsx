import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  Home,
  KeyRound,
  PackageCheck,
  ShieldAlert,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";

import { RentalReadyForm } from "@/components/RentalReadyForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/wohnung-wieder-vermietbar";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Wohnung wieder vermietbar machen – Räumung, Reinigung & Entsorgung | FLOXANT",
  description:
    "FLOXANT unterstützt Vermieter, Eigentümer, Makler und Hausverwaltungen: Wohnung nach Auszug räumen, entsorgen, reinigen und für Besichtigung oder Vermietung vorbereiten.",
  keywords: [
    "Wohnung wieder vermietbar machen",
    "Wohnung nach Auszug vorbereiten",
    "Wohnung für Vermietung vorbereiten",
    "Vermieter Reinigung Regensburg",
    "Wohnung entrümpeln und reinigen Regensburg",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20m%C3%B6chte%20eine%20Wohnung%20nach%20Auszug%2FLeerstand%20wieder%20vorbereiten%20lassen.%20Es%20geht%20um%20ein%20Objekt%20in%20%5BOrt%5D.%20Ben%C3%B6tigt%20werden%20R%C3%A4umung%2FReinigung%2FEntsorgung%2F%C3%9Cbergabevorbereitung%20nach%20Absprache.%20Fotos%20und%20Termin%20kann%20ich%20senden.";

const statusSteps = ["Leerstand", "Räumung", "Entsorgung", "Reinigung", "Präsentierbar"];

const objectCards = [
  {
    title: "Wohnung nicht leer",
    text: "Möbel, Kartons oder Restgegenstände verhindern Reinigung, Besichtigung oder Übergabe.",
    Icon: Home,
  },
  {
    title: "Keller oder Nebenräume voll",
    text: "Keller, Garage, Dachboden oder Müllraum können den nächsten Nutzungsschritt blockieren.",
    Icon: Building2,
  },
  {
    title: "Möbel/Sperrmüll vorhanden",
    text: "Entsorgung wird erst nach Umfang, Zugang, Etage, Fotos und Materialart geprüft.",
    Icon: Trash2,
  },
  {
    title: "Reinigung fehlt",
    text: "Bad, Küche, Böden und sichtbare Übergabepunkte brauchen eine klare Vorbereitung.",
    Icon: Sparkles,
  },
  {
    title: "Besichtigung steht an",
    text: "Wenn Fotos, Exposé oder Termine näher rücken, zählt ein geordneter, präsentierbarer Zustand.",
    Icon: Camera,
  },
  {
    title: "Schlüssel/Übergabe offen",
    text: "Schlüsselstatus, Übergabeakte und Ansprechpartner sollten vorab abgestimmt werden.",
    Icon: KeyRound,
  },
];

const serviceBlocks = [
  "Wohnung räumen / leeren",
  "Möbel und Gegenstände entfernen",
  "Sperrmüll / Entsorgung nach Absprache",
  "Keller / Garage / Nebenräume räumen",
  "Endreinigung / Auszugsreinigung",
  "Grundreinigung nach Absprache",
  "sichtbare Übergabepunkte reinigen",
  "Entsorgung und Reinigung kombinieren",
  "Foto-Dokumentation nach Absprache",
  "FLOXANT Übergabeakte als Zusatzprodukt",
  "Schlüsselkoordination nach Absprache",
  "Mieterwechsel-Service als B2B-Verknüpfung",
];

const audiences = [
  {
    title: "Für Vermieter",
    text:
      "Wenn die Wohnung nach Auszug nicht im gewünschten Zustand ist, bündelt FLOXANT Räumung, Entsorgung, Reinigung und Vorbereitung für Besichtigung oder Vermietung.",
    cta: "Wohnung nach Auszug vorbereiten lassen",
    Icon: Home,
  },
  {
    title: "Für Hausverwaltungen",
    text:
      "Bei wiederkehrenden Objektfällen helfen Fotos, Objektstatus, Termin, Einheiten und klare Bausteine, damit nicht jeder Mieterwechsel neu improvisiert wird.",
    cta: "Objektfall für Hausverwaltung anfragen",
    Icon: Building2,
  },
  {
    title: "Für Makler",
    text:
      "Vor Besichtigungen oder Objektfotos kann FLOXANT Räumung, Reinigung, Entsorgung und Foto-Dokumentation nach Absprache vorbereiten.",
    cta: "Wohnung für Besichtigung vorbereiten",
    Icon: BadgeCheck,
  },
  {
    title: "Für Eigentümer",
    text:
      "Nach Leerstand, Auszug oder Erbfall können Wohnung, Haus und Nebenräume wieder nutzbarer und übersichtlicher vorbereitet werden.",
    cta: "Objekt wieder nutzbar machen",
    Icon: UsersRound,
  },
  {
    title: "Für private Ausziehende",
    text:
      "Wenn Auszug, Keller, Reinigung, Schlüssel und Übergabe zusammenfallen, können Endreinigung, Entrümpelung, Schlüsselübergabe und Übergabeakte kombiniert werden.",
    cta: "Auszug und Übergabe vorbereiten",
    Icon: PackageCheck,
  },
];

const boundaryItems = [
  "keine Vermietungsgarantie",
  "keine rechtliche Prüfung",
  "keine offizielle Wohnungsabnahme",
  "keine Renovierungs-, Elektro-, Sanitär- oder Malerarbeiten als Pauschalversprechen",
  "keine gefährlichen Stoffe, Asbest oder Sondermüll ohne rechtlich geklärte Grundlage",
];

const faqItems = [
  {
    q: "Was bedeutet „Wohnung wieder vermietbar machen“?",
    a: "FLOXANT unterstützt organisatorisch und praktisch dabei, eine Wohnung nach Auszug, Leerstand oder Mieterwechsel durch Räumung, Entsorgung, Reinigung und Dokumentation wieder nutzbarer und präsentierbarer vorzubereiten.",
  },
  {
    q: "Garantiert FLOXANT, dass die Wohnung vermietet wird?",
    a: "Nein. FLOXANT kann Räumung, Reinigung, Entsorgung und Vorbereitung unterstützen, garantiert aber keine Vermietung, Abnahme oder Entscheidung durch Vermieter, Makler oder Hausverwaltung.",
  },
  {
    q: "Für wen ist der Service geeignet?",
    a: "Für Vermieter, Eigentümer, Makler, Hausverwaltungen und private Ausziehende, wenn ein Objekt nach Auszug, Leerstand, Entrümpelung oder Mieterwechsel vorbereitet werden soll.",
  },
  {
    q: "Kann FLOXANT Möbel und Sperrmüll entfernen?",
    a: "Ja, nach Prüfung von Umfang, Zugang, Etage, Fotos und Materialart. Gefährliche oder rechtlich unklare Entsorgungsleistungen werden nicht pauschal zugesagt.",
  },
  {
    q: "Kann FLOXANT nach der Entrümpelung reinigen?",
    a: "Ja. Gerade die Kombination aus erst räumen, dann reinigen ist sinnvoll, wenn eine Wohnung wieder nutzbarer, präsentierbarer oder übergabefähiger vorbereitet werden soll.",
  },
  {
    q: "Kann eine Übergabeakte erstellt werden?",
    a: "Ja, nach Absprache. Die FLOXANT Übergabeakte kann Fotos, erledigte Leistungen, Schlüsselstatus und Hinweise organisatorisch dokumentieren, ersetzt aber keine rechtliche Abnahme.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Räumen, Restgegenständen, Keller, Zugang, Etage oder Verschmutzung helfen, Umfang und Priorität schneller einzuschätzen.",
  },
  {
    q: "Kann ich einen Besichtigungstermin angeben?",
    a: "Ja. Besichtigungs- oder Übergabetermine helfen bei der Priorisierung. Eine kurzfristige Umsetzung bleibt abhängig von Kapazität, Ort und Umfang.",
  },
  {
    q: "Unterstützt FLOXANT Hausverwaltungen?",
    a: "Ja. Für wiederkehrende Fälle passt oft der Mieterwechsel-Service. Diese Seite fokussiert zusätzlich das konkrete Ziel: Das Objekt soll wieder nutzbarer und präsentierbarer vorbereitet werden.",
  },
  {
    q: "Was wird nicht übernommen?",
    a: "FLOXANT verspricht keine Renovierung, keine Rechtsberatung, keine Maklerleistung, keine Abnahmegarantie und keine gefährliche Entsorgung wie Asbest oder Sondermüll.",
  },
  {
    q: "In welchem Gebiet ist der Service möglich?",
    a: "Regensburg ist der operative Kern. Anfragen aus der Umgebung und Bayern werden nach Verfügbarkeit, Termin, Umfang und Fotos geprüft.",
  },
  {
    q: "Kann das kurzfristig geprüft werden?",
    a: "Ja, kurzfristige Anfragen werden geprüft. Je klarer Objektort, Zustand, Fotos, Termin und gewünschte Bausteine sind, desto schneller kann FLOXANT reagieren.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Wohnung wieder vermietbar machen",
      description:
        "Objekt-Ready-Service für Vermieter, Eigentümer, Makler und Hausverwaltungen: Räumung, Entsorgung, Reinigung und Dokumentation nach Absprache.",
      path,
      about: [
        "Wohnung nach Auszug vorbereiten",
        "Endreinigung",
        "Entrümpelung",
        "Entsorgung",
        "Objektvorbereitung",
        "Regensburg",
      ],
      potentialActions: [
        { name: "Objektfall senden", target: `${path}#wohnung-ready-form` },
        { name: "WhatsApp Anfrage senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "Wohnung wieder vermietbar machen",
      description:
        "Organisatorische und praktische Vorbereitung von Wohnungen nach Auszug, Leerstand oder Mieterwechsel durch Räumung, Entsorgung, Reinigung und Dokumentation nach Absprache.",
      path,
      serviceType: "Objekt-Ready-Service für Wohnung nach Auszug, Leerstand oder Mieterwechsel",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfügbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Wohnung wieder vermietbar", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function WohnungWiederVermietbarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#fed7aa_0,transparent_32rem),linear-gradient(180deg,#fff7ed_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950" data-event="view_rental_ready_service">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700 shadow-sm">
                <ClipboardList className="h-4 w-4" />
                FLOXANT Objekt-Ready-System
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Wohnung wieder vermietbar machen nach Auszug oder Leerstand
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Wenn eine Wohnung nach Mieterwechsel, Auszug oder Entrümpelung wieder nutzbar und präsentierbar werden soll,
                bündelt FLOXANT Räumung, Entsorgung, Reinigung und Dokumentation nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#wohnung-ready-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-orange-700" data-event="start_rental_ready_lead">
                  Objektfall senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="click_rental_ready_whatsapp">
                  Wohnung per WhatsApp vorbereiten lassen
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg als Kernmarkt</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Umgebung/Bayern nach Verfügbarkeit</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Vermietungs- oder Abnahmegarantie</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-orange-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
                <div className="grid grid-cols-5 gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[11px] font-black text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">Objektstatus</div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">Von offen zu prüfbar</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    FLOXANT macht keine Renovierungs- oder Vermietungsversprechen. Der Nutzen liegt in einem praktisch vorbereiteten Zustand:
                    leerer, sauberer, dokumentierter und besser einschätzbar.
                  </p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Fotos helfen bei Aufwand und Priorität.",
                    "Budget kann als Preisrahmen genannt werden.",
                    "Übergabeakte und Schlüsselkoordination nach Absprache.",
                    "Mieterwechsel-Service für wiederkehrende Fälle.",
                  ].map((item) => (
                    <div key={item} className="rounded-[1rem] border border-orange-100 bg-orange-50 p-4 text-sm font-bold leading-6 text-orange-950">
                      <CheckCircle2 className="mb-2 h-5 w-5 text-orange-700" />
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
              <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">Problem nach Auszug</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Eine Wohnung ist selten sofort wieder präsentierbar</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Nach Auszug, Leerstand oder Mieterwechsel bleiben oft Möbel, Keller, Sperrmüll, verschmutzte Räume, Schlüsselthemen oder offene Übergabepunkte.
                FLOXANT prüft, welche Kombination aus Räumung, Entsorgung, Reinigung und Dokumentation sinnvoll ist.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {objectCards.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-orange-700" />
                    <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Was FLOXANT vorbereiten kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Jeder Objektfall wird nach Zustand, Ort, Termin, Zugang, Fotos und Ziel geprüft. FLOXANT behauptet keine Renovierung und keine gefährliche Entsorgung, sondern realistische praktische Vorbereitung.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/mieterwechsel-service-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-slate-950" data-event="start_tenant_turnover_lead">
                  Mieterwechsel-Service ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/makler-vermieter-link" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200/40 bg-blue-950/20 px-4 text-sm font-black text-blue-50" data-event="start_object_case_lead">
                  Makler-/Vermieter-Link nutzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/immobilie-verkaufsbereit-machen" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200/40 bg-amber-950/20 px-4 text-sm font-black text-amber-50" data-event="start_property_ready_lead">
                  Immobilie verkaufsbereit machen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/nachlass-raeumung-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-200/40 bg-stone-950/20 px-4 text-sm font-black text-stone-50" data-event="start_estate_clearance_lead">
                  Nachlass-Objekt vorbereiten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/uebergabeakte" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-black text-white" data-event="start_handover_file_lead">
                  Übergabeakte ergänzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/keller-muellraum-rettung-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200/30 bg-amber-950/20 px-4 text-sm font-black text-amber-50" data-event="start_cellar_trashroom_lead">
                  Keller/Muellraum pruefen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/schadensbegrenzung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-200/30 bg-red-950/20 px-4 text-sm font-black text-red-50" data-event="start_damage_control_lead">
                  Wenn der Objektplan kippt
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Für Vermieter, Makler, Eigentümer, Hausverwaltungen und Ausziehende</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-orange-700" />
                    <h3 className="mt-4 text-lg font-black tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    <Link href="#wohnung-ready-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-700 transition hover:text-orange-950" data-event="start_rental_ready_lead">
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
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">Anfrage starten</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Objektzustand mit Fotos, Ziel und Termin prüfen lassen</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Je klarer Rolle, Objektart, Ziel, Zustand, Fotos, Termin und Budget sind, desto schneller kann FLOXANT prüfen, welche Bausteine sinnvoll sind.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <Camera className="mb-2 h-5 w-5 text-orange-700" />
                  <p className="text-sm leading-7 text-slate-700">Fotos von Räumen, Restmengen, Keller, Zugang oder Verschmutzung helfen bei Aufwand, Priorität und Preisrahmen.</p>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <ShieldAlert className="mb-2 h-5 w-5 text-orange-700" />
                  <p className="text-sm leading-7 text-slate-700">FLOXANT unterstützt organisatorisch und praktisch. Vermietung, Abnahme, Rechtsfragen oder Renovierung werden nicht garantiert.</p>
                </div>
              </div>
            </div>
            <RentalReadyForm />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">Abgrenzung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Objekt-Ready ist nicht dasselbe wie Mieterwechsel</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Mieterwechsel-Service ist der Prozess für Vermieter, Hausverwaltungen und wiederkehrende Fälle. Wohnung wieder vermietbar fokussiert das Ergebnis:
                Eine konkrete Wohnung soll nach Auszug, Leerstand oder Entrümpelung wieder nutzbarer und präsentierbarer vorbereitet werden.
              </p>
              <Link href="/mieterwechsel-service-regensburg" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-700 transition hover:text-orange-950">
                Prozessseite Mieterwechsel ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">Was nicht versprochen wird</div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {boundaryItems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 p-4 text-sm font-bold leading-6 text-slate-200">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-orange-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zum Objekt-Ready-Service</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#wohnung-ready-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-orange-700" data-event="start_rental_ready_lead">
                Wohnung vorbereiten lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/reinigung-regensburg" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-orange-200 hover:bg-orange-50">
                Endreinigung Regensburg ansehen
              </Link>
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#wohnung-ready-form" className="flox-mobile-action flox-mobile-action-primary" data-event="start_rental_ready_lead">
            Objekt
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="click_rental_ready_whatsapp">
            WhatsApp
          </a>
          <a href="tel:+4915771105087" className="flox-mobile-action flox-mobile-action-light" data-event="click_rental_ready_phone">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
