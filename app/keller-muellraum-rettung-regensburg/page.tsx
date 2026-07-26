import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  DoorOpen,
  FileCheck2,
  KeyRound,
  MapPin,
  ShieldAlert,
  Sparkles,
  Trash2,
  UsersRound,
  Warehouse,
} from "lucide-react";

import { CellarTrashroomRescueForm } from "@/components/CellarTrashroomRescueForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/keller-muellraum-rettung-regensburg";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Keller- & Müllraum-Rettung Regensburg | FLOXANT",
  description:
    "Keller, Müllraum, Garage oder Nebenflaeche zugestellt? FLOXANT prüft Räumung, Entsorgung und Reinigung für Hausverwaltungen, Vermieter und Gewerbe im Raum Regensburg.",
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20eine%20Keller-%2FMuellraum-Raeumung%20anfragen.%20Es%20geht%20um%20%5BKeller%2FMuellraum%2FGarage%2FNebenflaeche%5D%20in%20%5BOrt%5D.%20Fotos%2C%20Zugang%20und%20Umfang%20kann%20ich%20senden.%20Bitte%20pruefen%2C%20ob%20Raeumung%2FEntsorgung%2FReinigung%20moeglich%20ist.";

const statusSteps = ["Fotos", "Umfang", "Zugang", "Freigabe", "Räumung prüfen"];

const problemCards = [
  {
    title: "Müllraum ist blockiert",
    text: "Sperrmuell, Kartons oder falsch abgestellte Gegenstände stoeren Nutzung und Reinigung.",
    Icon: Trash2,
  },
  {
    title: "Keller oder Abteil voll",
    text: "Mieterreste, Regale oder Hausrat müssen erst freigegeben und dann realistisch eingeordnet werden.",
    Icon: DoorOpen,
  },
  {
    title: "Nebenflaeche zugestellt",
    text: "Treppenhaus, Lagerraum, Garage oder Gemeinschaftsflaeche brauchen klare Zugaenge und eine saubere Freigabe.",
    Icon: Warehouse,
  },
  {
    title: "Reinigung danach nötig",
    text: "Nach der Räumung kann eine Reinigung sinnvoll sein, damit der Bereich wieder nutzbarer wird.",
    Icon: Sparkles,
  },
  {
    title: "Freigabe oder Eigentum unklar",
    text: "FLOXANT räumt nicht rechtlich unklare Gegenstände ohne Auftraggeberfreigabe.",
    Icon: ShieldAlert,
  },
  {
    title: "Kurzfristig vor Übergabe",
    text: "Wenn Objekttermin, Mieterwechsel oder Besichtigung naht, helfen Fotos, Deadline und Ansprechpartner.",
    Icon: KeyRound,
  },
];

const serviceBlocks = [
  "Keller räumen",
  "Kellerabteile / Nebenraeume freimachen",
  "Müllraum aufraeumen / Sperrmuell entfernen nach Absprache",
  "Garage oder Lagerraum räumen",
  "Möbel / Gegenstände entfernen",
  "Entsorgung normaler Gegenstände nach Absprache",
  "Reinigung nach Räumung",
  "Fotoeinschaetzung",
  "Zugang / Etage / Trageweg prüfen",
  "Übergabeakte / Foto-Dokumentation als Zusatz",
  "Mieterwechsel-Service verknuepfen",
  "Wohnung wieder vermietbar verknuepfen",
];

const audiences = [
  {
    title: "Für Hausverwaltungen",
    text:
      "Wenn Müllraum, Keller oder Nebenflaeche blockiert sind, zählen Fotos, Zugang, Freigabe, Ansprechpartner und eine schnelle Einordnung der Räumung.",
    cta: "Objektflaeche für Hausverwaltung prüfen lassen",
    Icon: Building2,
  },
  {
    title: "Für Vermieter",
    text:
      "Nach Auszug bleiben Keller, Garage oder Sperrmuell oft offen. FLOXANT prüft Räumung, Entsorgung und Reinigung nach Absprache.",
    cta: "Keller oder Nebenflaeche räumen lassen",
    Icon: KeyRound,
  },
  {
    title: "Für Eigentuemergemeinschaften / WEG",
    text:
      "Gemeinschaftsflächen brauchen klare Freigabe, Fotos und Zugaenge. FLOXANT hilft bei der praktischen Vorprüfung.",
    cta: "Gemeinschaftsflaeche prüfen lassen",
    Icon: UsersRound,
  },
  {
    title: "Für Gewerbekunden",
    text:
      "Lagerraum, Nebenraum oder kleine Gewerbefläche können nach Absprache geraeumt, entsorgt und gereinigt werden.",
    cta: "Gewerbefläche räumen lassen",
    Icon: Warehouse,
  },
  {
    title: "Für Privatkunden",
    text:
      "Wenn Keller, Garage oder Abstellraum voll sind, helfen Fotos, Umfang, Materialart und Termin für eine realistische Einschätzung.",
    cta: "Keller mit Fotos anfragen",
    Icon: DoorOpen,
  },
];

const safetyItems = [
  "Wer darf die Räumung beauftragen?",
  "Sind Eigentums- und Freigabefragen geklaert?",
  "Gibt es problematische oder gefaehrliche Stoffe?",
  "Ist Zugang zu Keller, Müllraum oder Nebenflaeche möglich?",
  "Sind Fotos vorhanden?",
  "Gibt es eine Deadline oder einen Übergabetermin?",
];

const exclusionItems = [
  "Gefahrstoffe",
  "Asbest",
  "Chemikalien",
  "Oel, Farben oder Lacke",
  "Schimmel-Sanierung",
  "Schaedlingsbekaempfung",
  "rechtsunklare Räumungen ohne Freigabe",
  "verschlossene Bereiche ohne Berechtigung",
];

const faqItems = [
  {
    q: "Für wen ist die Keller-/Müllraum-Rettung gedacht?",
    a: "Für Hausverwaltungen, Vermieter, Eigentuemergemeinschaften, kleinere Gewerbekunden und Privatkunden, wenn Keller, Müllraum, Garage, Lagerraum oder Nebenflaeche praktisch geprüft werden sollen.",
  },
  {
    q: "Kann FLOXANT Müllraeume für Hausverwaltungen räumen?",
    a: "Ja, nach Prüfung von Fotos, Umfang, Zugang, Freigabe, Materialart und Termin. Es gibt keine pauschale Sofortzusage.",
  },
  {
    q: "Kann FLOXANT Kellerabteile räumen?",
    a: "Ja, wenn Auftrag, Zugang und Freigabe geklaert sind. FLOXANT bewertet keine Eigentumsfragen und räumt keine unklaren Gegenstände ohne Freigabe.",
  },
  {
    q: "Reichen Fotos für eine erste Einschätzung?",
    a: "Oft ja. Fotos von Menge, Zugang, Trageweg, Gegenstandsarten und problematischen Punkten helfen, Rückfragen zu reduzieren.",
  },
  {
    q: "Muss die Freigabe vor der Räumung geklaert sein?",
    a: "Ja. Eigentums- und Freigabefragen müssen vorab durch Auftraggeber, Hausverwaltung oder Eigentuemer geklaert sein.",
  },
  {
    q: "Was wird nicht entsorgt?",
    a: "FLOXANT sagt keine Gefahrstoff-, Asbest-, Chemie-, Oel-, Farben-, Batterie-, Schimmel- oder Schaendlingsleistungen pauschal zu.",
  },
  {
    q: "Kann nach der Räumung gereinigt werden?",
    a: "Ja, Reinigung nach Räumung kann als Baustein geprüft werden, wenn die Fläche und der Zustand passend sind.",
  },
  {
    q: "Ist der Service kurzfristig möglich?",
    a: "Kurzfristige Anfragen werden nach Verfügbarkeit, Ort, Umfang, Zugang und Materialart geprüft. Es gibt keine Soforteinsatzgarantie.",
  },
  {
    q: "Funktioniert das auch für WEG oder Gewerbe?",
    a: "Ja. Gerade bei WEG, Hausverwaltung und Gewerbe helfen klare Rolle, Ansprechpartner, Freigabe, Fotos und Zugangsinformationen.",
  },
  {
    q: "In welchem Gebiet arbeitet FLOXANT?",
    a: "Regensburg ist der feste Ausgangspunkt. Anfragen aus der Umgebung und Bayern werden nach Verfügbarkeit, Umfang und Termin geprüft.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "Keller- und Muellraum-Rettung Regensburg",
      description:
        "FLOXANT prüft Räumung, Entsorgung und Reinigung von Keller, Müllraum, Garage, Lagerraum und Nebenflächen für Hausverwaltungen, Vermieter, WEG und Gewerbe.",
      path,
      about: [
        "Keller räumen Regensburg",
        "Müllraum Räumung",
        "Hausverwaltung Entrümpelung",
        "Sperrmuell Keller",
        "Nebenflächen Reinigung",
      ],
      potentialActions: [
        { name: "Objektflaeche pruefen lassen", target: `${path}#keller-muellraum-form` },
        { name: "Fotos per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "Keller- und Muellraum-Rettung Regensburg",
      description:
        "Praktische Räumung, Entsorgung und Reinigung von Kellerbereichen, Müllraeumen und Nebenflächen nach Absprache. Keine Gefahrstoff- oder Rechtspruefung.",
      path,
      serviceType: "Keller-/Müllraum-Räumung, Entsorgung und Reinigung nach Absprache",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfügbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Keller-/Muellraum-Rettung", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function KellerMuellraumRettungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#fde68a_0,transparent_34rem),linear-gradient(180deg,#fffbeb_0%,#ffffff_42%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700 shadow-sm">
                <Warehouse className="h-4 w-4" />
                FLOXANT Objektflaechen-Rettung
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Keller- und Müllraum-Rettung für Hausverwaltungen in Regensburg
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Wenn Keller, Müllraeume oder Nebenflächen blockiert sind, prüft FLOXANT Räumung, Entsorgung,
                Reinigung und Fotoeinschaetzung nach Absprache.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#keller-muellraum-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-amber-700" data-event="service_card_click">
                  Objektflaeche prüfen lassen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Fotos per WhatsApp senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                {["Regensburg als Kern", "Hausverwaltung / WEG / Gewerbe", "Fotos + Freigabe wichtig", "Keine Gefahrstoff-Zusage"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-200 bg-slate-950 p-5 text-white shadow-2xl shadow-amber-950/20">
              <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,#f59e0b_0,transparent_24rem),linear-gradient(145deg,#1e293b,#0f172a)] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Objektstatus</div>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">Blockierte Fläche wird prüfbar</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <Trash2 className="h-7 w-7 text-amber-200" />
                  </div>
                </div>
                <div className="mt-7 grid gap-3">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-xs font-black text-slate-950">{index + 1}</span>
                      <span className="text-sm font-black">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-200">
                  Keine Ekelbild-Optik, keine Rechtsbewertung: FLOXANT fragt die Punkte ab, die für Hausverwaltung,
                  Vermieter oder Gewerbe wirklich entscheidend sind.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Typische Objektflaechen-Probleme</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Wenn Keller, Müllraum oder Nebenflaeche den Ablauf blockieren</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Bei Hausverwaltungen und Vermietern geht es selten nur um Wegtragen. Entscheidend sind Freigabe, Zugang,
                Materialart, Deadline und ob danach Reinigung oder Dokumentation gebraucht wird.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {problemCards.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <Icon className="mb-4 h-6 w-6 text-amber-700" />
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was FLOXANT bei Keller, Müllraum und Nebenflächen prüfen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Fokus liegt auf praktischer Räumung, regulärer Entsorgung geeigneter Gegenstände, Reinigung nach
                Räumung und klarer Fotoeinschaetzung. Rechtliche Freigaben bleiben beim Auftraggeber.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/mieterwechsel-service-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white" data-event="service_card_click">
                  Mieterwechsel-Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/wohnung-wieder-vermietbar" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800" data-event="service_card_click">
                  Objekt-Ready verbinden
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/immobilie-verkaufsbereit-machen" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-black text-amber-800" data-event="service_card_click">
                  Nebenflaeche vor Verkauf vorbereiten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/makler-vermieter-link" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-black text-blue-800" data-event="service_card_click">
                  Objekt-Link für Makler/Vermieter
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/nachlass-raeumung-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm font-black text-stone-800" data-event="service_card_click">
                  Nachlass-Nebenraeume klären
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/uebergabeakte" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800" data-event="service_card_click">
                  Foto-Dokumentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Gebaut für Hausverwaltung, Vermieter, WEG, Gewerbe und klare Privatfaelle</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                    <Icon className="mb-4 h-6 w-6 text-amber-700" />
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <Link href="#keller-muellraum-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-700 transition hover:text-amber-950" data-event="service_card_click">
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
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Was vorab geklaert sein muss</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Räumung braucht Freigabe, Zugang und Materialklarheit</h2>
                <div className="mt-6 grid gap-3">
                  {safetyItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700">
                      <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-[2rem] border border-red-200 bg-white p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-red-700">Was FLOXANT nicht ungeprueft uebernimmt</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exclusionItems.map((item) => (
                    <span key={item} className="rounded-full border border-red-100 bg-red-50 px-3 py-2 text-xs font-black text-red-800">{item}</span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-700">
                  Wenn unklar ist, was dort steht, senden Sie Fotos. FLOXANT prüft, ob und wie eine Anfrage möglich ist.
                </p>
              </div>
            </div>
            <CellarTrashroomRescueForm />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Region und Abgrenzung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Regensburg als Kern, keine allgemeine Sperrmuell-Behauptung</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                FLOXANT prüft Objektflaechen im Raum Regensburg und Umgebung. Bayern ist nach Verfügbarkeit möglich.
                Diese Seite ist keine Sondermuell- oder Gefahrstoff-Seite und keine rechtliche Räumungsfreigabe.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/regensburg/entruempelung" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                  Entrümpelung Regensburg
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Servicegebiet ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/schadensbegrenzung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-black text-red-800" data-event="service_card_click">
                  Wenn es schon akut ist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Kellerentrümpelung Regensburg", "Für private und objektbezogene Keller mit Fotos, Zugang und Umfang."],
                ["Hausverwaltung / WEG", "Für wiederkehrende oder gemeinschaftliche Flächen mit Freigabe und Ansprechpartner."],
                ["Räumung + Reinigung", "Erst Fläche freimachen, dann Reinigung nach Räumung prüfen."],
                ["Entsorgung Regensburg getrennt", "Regensburg bleibt eigene Entsorgungs-, Reinigungs- und Umzugslogik über separate Seiten."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <MapPin className="mb-4 h-5 w-5 text-amber-700" />
                  <h3 className="text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zur Keller- und Müllraum-Rettung</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-black text-slate-950">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
          <Link href="#keller-muellraum-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Prüfen
          </Link>
          <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
            WhatsApp
          </a>
          <a href="tel:+4915771105087" className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
            Anrufen
          </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
