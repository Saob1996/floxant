import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  Home,
  KeyRound,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { HandoverFileForm } from "@/components/HandoverFileForm";
import { HandoverDossierDemo } from "@/components/HandoverDossierDemo";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/uebergabeakte";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "FLOXANT Übergabeakte – Auszug, Reinigung & Schlüssel dokumentieren",
  description:
    "Die FLOXANT Übergabeakte bündelt nach Absprache erledigte Leistungen, Fotos, Schlüsselstatus und Hinweise rund um Auszug, Reinigung, Entrümpelung und Wohnungsübergabe.",
  keywords: [
    "Übergabeakte Wohnung",
    "Wohnungsübergabe Dokumentation",
    "Schlüsselübergabe mit Protokoll",
    "Auszug Dokumentation",
    "Foto Dokumentation Reinigung",
    "Übergabeakte Regensburg",
  ],
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20m%C3%B6chte%20eine%20%C3%9Cbergabeakte%20anfragen.%20Es%20geht%20um%20ein%20Objekt%20in%20%5BOrt%5D.%20Gew%C3%BCnscht%20sind%20Dokumentation%2C%20Fotos%2FSchl%C3%BCsselstatus%2FEndreinigung%2F%C3%9Cbergabevorbereitung%20nach%20Absprache.%20Termin%20und%20Details%20kann%20ich%20senden.";

const statusSteps = ["Objekt", "Leistungen", "Fotos", "Schlüssel", "Hinweise", "Übergabe"];

const dossierParts = [
  "Objektart und Zeitraum",
  "Erledigte FLOXANT-Leistungen",
  "Fotos nach Absprache",
  "Schlüsselstatus",
  "Räume und Nebenräume",
  "Offene Hinweise",
  "Ansprechpartner",
  "Grenzhinweis: keine rechtliche Abnahme",
];

const dossierStructure = [
  {
    title: "A. Objekt",
    text: "Objektart, Objektlabel, Ort/PLZ, zusätzliche Adresse optional, Etage, Räume, Nebenräume und Zugangshinweise.",
  },
  {
    title: "B. Auftraggeber",
    text: "Name, Kontakt und Rolle wie Privatkunde, Vermieter, Hausverwaltung, Makler, Eigentümer oder Unternehmen.",
  },
  {
    title: "C. Leistungen",
    text: "Reinigung, Endreinigung, Umzug, Entrümpelung, Entsorgung, Schlüsselübergabe, Mieterwechsel oder eine sensible Abstimmung.",
  },
  {
    title: "D. Fotos",
    text: "Fotodokumentation nach Absprache mit Bereichen wie Küche, Bad, Böden, Räume, Keller, Garage, Zugang oder Gegenstände.",
  },
  {
    title: "E. Schlüsselstatus",
    text: "Nicht relevant, beim Kunden, bei FLOXANT übernommen, übergeben, geplant oder unklar inklusive Empfänger und Termin.",
  },
  {
    title: "F. Hinweise",
    text: "Sichtbare Hinweise, offene Punkte, Kundennotizen, Teamnotizen und eine öffentliche Zusammenfassung.",
  },
  {
    title: "G. Rechtlicher Hinweis",
    text: "Organisatorische Dokumentation. Keine rechtliche Abnahme. Keine Garantie für Vermieterentscheidung.",
  },
];

const productParts = [
  {
    title: "Leistungen nachvollziehbar bündeln",
    text: "Umzug, Endreinigung, Entrümpelung, Entsorgung, Schlüsselübergabe oder Übergabevorbereitung werden als vereinbarte Punkte sichtbar gemacht.",
    Icon: ClipboardList,
  },
  {
    title: "Fotos nach Absprache einordnen",
    text: "Fotos können Räume, Nebenflächen, Zugang oder sichtbare Punkte dokumentieren. Es werden keine Fake-Vorher-Nachher-Bilder genutzt.",
    Icon: Camera,
  },
  {
    title: "Schlüsselstatus festhalten",
    text: "Ob Schlüssel beim Kunden, bei Verwaltung oder zur Übergabe vorgesehen sind, kann organisatorisch aufgenommen werden.",
    Icon: KeyRound,
  },
  {
    title: "Grenzen klar benennen",
    text: "Die Übergabeakte ist keine Rechtsberatung, keine offizielle Wohnungsabnahme und keine Garantie für Vermieterentscheidungen.",
    Icon: ShieldAlert,
  },
];

const audiences = [
  {
    title: "Für Privatkunden",
    text:
      "Wenn Auszug, Zeitdruck, Reinigung, Schlüssel und Vermietertermin zusammenfallen, schafft die Übergabeakte mehr Überblick über erledigte und offene Punkte.",
    cta: "Übergabeakte zum Auszug anfragen",
    Icon: Home,
  },
  {
    title: "Für Vermieter",
    text:
      "Nach Auszug, Räumung oder Reinigung können Leistungen, Fotos und Schlüsselstatus als organisatorische Übersicht angefragt werden.",
    cta: "Übergabeakte für Objekt anfragen",
    Icon: BadgeCheck,
  },
  {
    title: "Für Hausverwaltungen",
    text:
      "Bei wiederkehrenden Mieterwechseln hilft eine strukturierte Erfassung von Objekt, Leistungen, Fotos, Schlüsselstatus und Hinweisen.",
    cta: "Übergabeakte für Mieterwechsel anfragen",
    Icon: Building2,
  },
  {
    title: "Für Makler und Eigentümer",
    text:
      "Wenn ein Objekt nach Auszug, Räumung oder Reinigung geordnet vorbereitet werden soll, kann die Dokumentation die Abstimmung vereinfachen.",
    cta: "Objektvorbereitung dokumentieren lassen",
    Icon: UsersRound,
  },
  {
    title: "Für sensible Fälle",
    text:
      "Bei sensiblen Abläufen können Rückruf, Planung, Schlüsselkoordination und Dokumentationsumfang ruhiger abgestimmt werden.",
    cta: "Ruhige Abstimmung anfragen",
    Icon: LockKeyhole,
  },
];

const combinations = [
  { href: "/reinigung-regensburg", title: "Mit Endreinigung", text: "Wenn Bad, Küche, Böden und Übergabepunkte nach Absprache dokumentiert werden sollen." },
  { href: "/schluesseluebergabe", title: "Mit Schlüsselübergabe", text: "Wenn Schlüsselstatus, Termin und Zugang sauberer abgestimmt werden müssen." },
  { href: "/entruempelung-regensburg", title: "Mit Entrümpelung", text: "Wenn erst Restmengen oder Nebenräume geklärt werden müssen, bevor Reinigung oder Übergabe Sinn ergeben." },
  { href: "/mieterwechsel-service-regensburg", title: "Im Mieterwechsel-Service", text: "Für Hausverwaltungen, Vermieter und Makler, wenn ein Objekt nach Auszug vorbereitet wird." },
  { href: "/wohnung-wieder-vermietbar", title: "Mit Objekt-Ready-Service", text: "Wenn eine Wohnung nach Auszug, Leerstand oder Mieterwechsel wieder nutzbarer und präsentierbarer vorbereitet werden soll." },
  { href: "/immobilie-verkaufsbereit-machen", title: "Mit Property-Ready-Service", text: "Wenn Wohnung, Haus oder Nebenflaechen vor Verkauf, Besichtigung oder Expose dokumentiert vorbereitet werden sollen." },
  { href: "/nachlass-raeumung-regensburg", title: "Mit Nachlass-Raeumung", text: "Wenn Wohnung, Haus, Keller oder Garage nach einem Erbfall diskret geraeumt, gereinigt und optional dokumentiert werden sollen." },
  { href: "/diskreter-umzug-trennung-scheidung", title: "Mit diskretem Auszug", text: "Wenn eine sensible private Auszugssituation mit Rueckruf, Schluesselstatus, Reinigung und Uebergabeakte ruhig abgestimmt werden soll." },
  { href: "/makler-vermieter-link", title: "Mit Makler-/Vermieter-Link", text: "Wenn ein Objektfall direkt mit Fotos, Termin und Empfänger der Akte übermittelt werden soll." },
  { href: "/keller-muellraum-rettung-regensburg", title: "Mit Keller-/Müllraum-Rettung", text: "Wenn Nebenflächen, Keller oder Müllraum nach Freigabe geräumt und dokumentiert werden sollen." },
  { href: "/schadensbegrenzung", title: "Mit Schadensbegrenzung", text: "Wenn kurz vor Übergabe noch Reinigung, Räumung, Schlüssel oder Fotos offen sind." },
  { href: "/angebotscheck", title: "Mit Angebotscheck", text: "Wenn vor Auftragserteilung geklärt werden soll, ob Dokumentation oder Übergabeakte sinnvoll ist." },
  { href: "/private-client-service", title: "Mit diskreter Abstimmung", text: "Für sensible Objekt- oder Auszugssituationen mit mehr Abstimmung und Rückrufwunsch." },
];

const faqItems = [
  {
    q: "Was ist die FLOXANT Übergabeakte?",
    a: "Die Übergabeakte ist eine organisatorische Dokumentation nach Absprache. Sie kann erledigte Leistungen, Fotos, Schlüsselstatus, Objektangaben und Hinweise enthalten.",
  },
  {
    q: "Wann ist eine Übergabeakte sinnvoll?",
    a: "Sinnvoll ist sie bei Auszug, Endreinigung, Entrümpelung, Mieterwechsel, Schlüsselübergabe oder wenn mehrere Beteiligte den Ablauf nachvollziehen möchten.",
  },
  {
    q: "Ist die Übergabeakte ein rechtliches Dokument?",
    a: "Nein. Sie ersetzt keine Rechtsberatung, keine offizielle Wohnungsabnahme und keine Entscheidung von Vermieter, Hausverwaltung oder Käufer.",
  },
  {
    q: "Kann die Übergabeakte Fotos enthalten?",
    a: "Ja, nach Absprache. Fotos können Räume, Nebenräume, Zugang, Restpunkte oder erledigte Leistungen dokumentieren, wenn dies Teil der Vereinbarung ist.",
  },
  {
    q: "Kann sie mit Endreinigung kombiniert werden?",
    a: "Ja. Besonders bei Auszug und Wohnungsübergabe kann Endreinigung mit Fotos, Hinweisen und Schlüsselstatus kombiniert angefragt werden.",
  },
  {
    q: "Kann sie mit Schlüsselübergabe kombiniert werden?",
    a: "Ja, wenn Verantwortlichkeiten, Termin, Zugang und Empfänger vorher klar abgestimmt werden. Es bleibt eine organisatorische Unterstützung.",
  },
  {
    q: "Ist die Übergabeakte für Vermieter oder Hausverwaltungen geeignet?",
    a: "Ja. Gerade bei Mieterwechseln kann sie helfen, Leistungen, Objektstatus, Fotos und offene Punkte strukturierter zu kommunizieren.",
  },
  {
    q: "Garantiert FLOXANT damit die Wohnungsübergabe?",
    a: "Nein. FLOXANT kann den Ablauf vorbereiten und dokumentieren, aber keine Abnahme, Kautionsentscheidung oder Vermieterentscheidung garantieren.",
  },
  {
    q: "Wer bekommt die Übergabeakte?",
    a: "Der Empfänger wird vorab abgestimmt. Möglich sind nur Kunde, Vermieter, Hausverwaltung, Makler oder eine noch offene Empfängerklärung nach Absprache.",
  },
  {
    q: "Welche Angaben braucht FLOXANT?",
    a: "Wichtig sind Ort/PLZ, Objektart, Zeitraum, gewünschte Leistungen, Schlüsselstatus, Empfänger der Akte, Fotos nach Möglichkeit und eine kurze Beschreibung.",
  },
  {
    q: "Ist eine kurzfristige Anfrage möglich?",
    a: "Kurzfristige Anfragen werden nach Kapazität geprüft. Je klarer Termin, Ort, Umfang und Fotos sind, desto schneller kann FLOXANT reagieren.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT Übergabeakte 2.0",
      description:
        "Organisatorische Übergabeakte für Auszug, Reinigung, Entrümpelung, Schlüsselstatus, Fotos und Hinweise nach Absprache.",
      path,
      about: [
        "Übergabeakte",
        "Wohnungsübergabe",
        "Schlüsselübergabe",
        "Foto-Dokumentation",
        "Endreinigung",
        "Mieterwechsel",
        "Übergabeakte",
      ],
      potentialActions: [
        { name: "Übergabeakte anfragen", target: `${path}#uebergabeakte-form` },
        { name: "Beispielakte ansehen", target: `${path}#uebergabeakte-demo` },
        { name: "WhatsApp Anfrage senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Übergabeakte",
      description:
        "Organisatorische Dokumentation nach Absprache für erledigte Leistungen, Fotos, Schlüsselstatus und Hinweise rund um Auszug und Übergabe.",
      path,
      serviceType: "Übergabeakte und organisatorische Wohnungsübergabe-Dokumentation",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern", "Düsseldorf Reinigung und Entsorgung"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Übergabeakte", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function UebergabeaktePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#fde68a_0,transparent_30rem),linear-gradient(180deg,#fff7ed_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700 shadow-sm">
                <FileText className="h-4 w-4" />
                FLOXANT Übergabeakte
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                FLOXANT Übergabeakte: Auszug, Reinigung und Schlüsselstatus dokumentieren
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Für Kunden, Vermieter, Hausverwaltungen und Makler: FLOXANT kann nach Absprache Leistungen,
                Fotos, Schlüsselstatus und offene Hinweise in einer organisatorischen Übergabeakte bündeln.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#uebergabeakte-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-amber-700" data-event="service_card_click">
                  Übergabeakte anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Übergabeakte per WhatsApp
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Regensburg als Kernmarkt</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Düsseldorf servicebezogen</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Rechts- oder Abnahmegarantie</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-amber-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-center">
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                      <span className="mt-2 block text-[11px] font-black text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[1.5rem] border border-amber-100 bg-amber-50/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Beispiel-Vorschau</p>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">FLOXANT Übergabeakte</h2>
                      <p className="mt-1 text-sm font-semibold text-slate-600">Objekt: Wohnung / Regensburg</p>
                    </div>
                    <ClipboardList className="h-8 w-8 text-amber-700" />
                  </div>
                  <div className="mt-5 grid gap-2">
                    {["Endreinigung", "Keller geräumt", "Schlüsselübergabe nach Absprache"].map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-xl border border-white bg-white/80 px-3 py-2 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="h-4 w-4 text-amber-700" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 rounded-xl border border-amber-200 bg-white px-3 py-3 text-xs leading-5 text-amber-900">
                    Beispielhafte Darstellung. Inhalt abhängig vom Auftrag und der Vereinbarung. Keine echten Kundendaten, keine rechtliche Abnahme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Problem beim Abschluss</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Beim Auszug bleibt oft unklar, was wirklich erledigt wurde</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Reinigung, Restmengen, Schlüssel, Fotos, Nebenräume und Übergabetermin laufen häufig nebeneinander. Die Übergabeakte bündelt diese Punkte als organisatorisches Dossier nach Absprache.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {productParts.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-amber-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <HandoverDossierDemo />

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Produktlogik</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was eine Übergabeakte enthalten kann</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Der genaue Umfang wird vorher vereinbart. FLOXANT dokumentiert keine juristische Abnahme, sondern organisierte Leistungspunkte, Fotos und Hinweise, die für den Ablauf wichtig sind.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dossierParts.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1rem] border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm font-bold leading-6 text-amber-950">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Datenstruktur</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Klare Bausteine, damit die Übergabe nachvollziehbar bleibt</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Die Uebergabeakte buendelt Objekt, Leistungen, Fotos, Schluesselstatus und Hinweise so, dass alle Beteiligten den Stand leichter nachvollziehen koennen.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dossierStructure.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Für Kunden, die Kontrolle statt Bauchgefühl wollen</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                    <Icon className="h-6 w-6 text-amber-700" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    <Link href="#uebergabeakte-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-700 transition hover:text-amber-950" data-event="service_card_click">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Kombinationen</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Die Übergabeakte wird stark, wenn sie mit echten Leistungen verbunden ist</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  Nicht als Papierprodukt ohne Substanz, sondern als Zusatz zu Reinigung, Entrümpelung, Schlüsselübergabe, Mieterwechsel oder sensibler Abstimmung.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {combinations.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 transition hover:bg-white/10">
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-slate-300">{item.text}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Anfrage starten</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Übergabeakte mit Objekt, Termin und Leistungsumfang anfragen</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Je klarer Objektart, Ort, Zeitraum, gewünschte Leistungen, Schlüsselstatus und Fotos sind, desto schneller kann FLOXANT den Dokumentationsumfang prüfen.
              </p>
              <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-700">
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <Camera className="mb-2 h-5 w-5 text-amber-700" />
                  Fotos helfen, Räume, Nebenflächen, offene Punkte und erledigte Leistungen besser einzuordnen.
                </div>
                <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-amber-700" />
                  Die Übergabeakte unterstützt Übersicht und Kommunikation. Sie ersetzt keine rechtliche Prüfung.
                </div>
              </div>
            </div>
            <HandoverFileForm />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zur FLOXANT Übergabeakte</h2>
            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">{item.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#uebergabeakte-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-amber-700" data-event="service_card_click">
                Übergabe dokumentieren lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-amber-200 hover:text-amber-700" data-event="phone_click">
                Rückruf zur Übergabeakte
              </a>
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#uebergabeakte-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Akte
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <a href={`tel:${company.phoneRaw}`} className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
