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
  Link2,
  Mail,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";

import { RealtorLandlordLinkForm } from "@/components/RealtorLandlordLinkForm";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/makler-vermieter-link";

export const metadata: Metadata = generatePageSEO({
  lang: "de",
  path,
  title: "Fuer Makler & Vermieter - Objekt vorbereiten lassen | FLOXANT",
  description:
    "Direkter Objekt-Link fuer Makler, Vermieter und Eigentuemer: Wohnung nach Auszug raeumen, reinigen, entsorgen und fuer Besichtigung oder Uebergabe vorbereiten lassen.",
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20einen%20Objektfall%20als%20Makler%2FVermieter%2FEigentuemer%20senden.%20Es%20geht%20um%20ein%20Objekt%20in%20%5BOrt%5D.%20Benoetigt%20werden%20Raeumung%2FReinigung%2FEntsorgung%2FUebergabevorbereitung%20nach%20Absprache.%20Fotos%20und%20Termin%20kann%20ich%20senden.";

const statusSteps = ["Objekt", "Zustand", "Termin", "Fotos", "Rueckmeldung"];

const objectCases = [
  {
    title: "Wohnung nach Auszug",
    text: "Wenn Reinigung, Moebel, Keller oder Uebergabe noch offen sind.",
    link: "/wohnung-wieder-vermietbar",
    cta: "Objekt-Ready ansehen",
    Icon: Home,
  },
  {
    title: "Besichtigung vorbereiten",
    text: "Fuer Makler, wenn Objekt, Fotos oder Termin einen besseren ersten Eindruck brauchen.",
    link: "/immobilie-verkaufsbereit-machen",
    cta: "Immobilie verkaufsbereit machen",
    Icon: Camera,
  },
  {
    title: "Keller / Garage voll",
    text: "Nebenflaechen, Muellraum oder Garage mit Fotos, Zugang und Freigabe pruefen.",
    link: "/keller-muellraum-rettung-regensburg",
    cta: "Keller/Muellraum pruefen",
    Icon: Trash2,
  },
  {
    title: "Nachlass-Objekt",
    text: "Wenn Wohnung, Haus oder Nebenraeume nach Erbfall diskret vorbereitet werden sollen.",
    link: "/nachlass-raeumung-regensburg",
    cta: "Nachlass-Fall senden",
    Icon: ShieldCheck,
  },
  {
    title: "Reinigung fehlt",
    text: "Endreinigung, Auszugsreinigung oder Reinigung vor Besichtigung nach Zustand einordnen.",
    link: "/regensburg/reinigung",
    cta: "Reinigung Regensburg",
    Icon: Sparkles,
  },
  {
    title: "Schluessel / Uebergabe offen",
    text: "Schluesselkoordination und Uebergabeakte nach Absprache mitdenken.",
    link: "/uebergabeakte",
    cta: "Uebergabeakte ergaenzen",
    Icon: KeyRound,
  },
  {
    title: "Mehrere Objektfaelle",
    text: "Hausverwaltungen und Vermieter koennen den Link fuer wiederkehrende Faelle nutzen.",
    link: "/mieterwechsel-service-regensburg",
    cta: "Mieterwechsel-Service",
    Icon: Building2,
  },
];

const serviceBlocks = [
  "Wohnung raeumen",
  "Moebel / Sperrmuell entfernen",
  "Keller / Garage / Nebenraeume raeumen",
  "Endreinigung / Auszugsreinigung",
  "Grundreinigung nach Absprache",
  "Entsorgung normaler Gegenstaende nach Absprache",
  "Reinigung vor Besichtigung",
  "Foto-Dokumentation nach Absprache",
  "Uebergabeakte",
  "Schluesselkoordination nach Absprache",
  "Mieterwechsel-Service",
  "Wohnung wieder vermietbar-Service",
];

const audiences = [
  {
    title: "Fuer Makler",
    text:
      "Wenn eine Wohnung vor Besichtigung, Fototermin oder Vermarktung aufgeraeumter und praesentierbarer wirken soll.",
    cta: "Objekt fuer Besichtigung vorbereiten",
    Icon: Camera,
  },
  {
    title: "Fuer Vermieter",
    text:
      "Wenn nach Auszug Reinigung, Moebel, Keller, Entsorgung oder Uebergabe gebuendelt werden muessen.",
    cta: "Wohnung nach Auszug vorbereiten",
    Icon: KeyRound,
  },
  {
    title: "Fuer Eigentuemer",
    text:
      "Wenn Wohnung, Haus oder Nebenraeume nach Leerstand, Erbfall, Auszug oder Verkaufsvorbereitung nutzbarer werden sollen.",
    cta: "Objektfall senden",
    Icon: Home,
  },
  {
    title: "Fuer Hausverwaltungen",
    text:
      "Wenn wiederkehrende Mieterwechsel, Keller, Muellraum oder Objektzustaende schnell als Fall gesendet werden sollen.",
    cta: "Wiederkehrende Objektfaelle anfragen",
    Icon: Building2,
  },
];

const faqItems = [
  {
    q: "Fuer wen ist der Makler-/Vermieter-Link gedacht?",
    a: "Der Link ist fuer Makler, Vermieter, Eigentuemer und Hausverwaltungen gedacht, die einen konkreten Objektfall schnell an FLOXANT senden wollen.",
  },
  {
    q: "Kann ich als Makler ein Objekt direkt senden?",
    a: "Ja. Senden Sie Objektort, Termin, Fotos und offene Punkte. FLOXANT prueft Raeumung, Reinigung, Entsorgung oder Uebergabevorbereitung nach Absprache.",
  },
  {
    q: "Kann FLOXANT eine Wohnung vor Besichtigung reinigen?",
    a: "Ja, Reinigung vor Besichtigung kann nach Flaeche, Zustand, Termin und Zugang geprueft werden. Fotos helfen bei der Einschaetzung.",
  },
  {
    q: "Kann FLOXANT Raeumung und Reinigung kombinieren?",
    a: "Ja. Raeumung, Entsorgung und Reinigung koennen kombiniert werden, wenn Umfang, Zugang, Materialart und Termin passen.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos koennen im Formular hochgeladen oder per WhatsApp gesendet werden. Sie helfen, Rueckfragen zu reduzieren.",
  },
  {
    q: "Kann eine Uebergabeakte ergaenzt werden?",
    a: "Ja. Die FLOXANT Uebergabeakte kann nach Absprache Fotos, erledigte Leistungen, Schluesselstatus und Hinweise dokumentieren.",
  },
  {
    q: "Unterstuetzt FLOXANT Hausverwaltungen?",
    a: "Ja. Fuer wiederkehrende Objektfaelle ist der Mieterwechsel-Service passender, dieser Link kann aber als schneller Startpunkt genutzt werden.",
  },
  {
    q: "Garantiert FLOXANT eine Vermietung?",
    a: "Nein. FLOXANT unterstuetzt praktisch und organisatorisch, garantiert aber keine Vermietung, Abnahme oder Vermieterentscheidung.",
  },
  {
    q: "Werden Renovierungen uebernommen?",
    a: "Nur Leistungen, die FLOXANT wirklich anbietet und einplanen kann, werden geprueft. Diese Seite behauptet keine Renovierungs-, Reparatur- oder Maklerleistungen.",
  },
  {
    q: "In welchem Gebiet ist der Service moeglich?",
    a: "Regensburg ist der feste Ausgangspunkt. Umgebung und Bayern werden nach Verfuegbarkeit geprueft. Fuer Duesseldorf klar getrennt ueber klare lokale Kontaktmöglichkeiten zuordnen.",
  },
  {
    q: "Kann der Link wiederholt genutzt werden?",
    a: "Ja. Der Link ist bewusst fuer E-Mail-Signatur, WhatsApp, QR-Code, Flyer und wiederkehrende Objektfaelle vorbereitet.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT fuer Makler, Vermieter und Eigentuemer",
      description:
        "Direkter Objekt-Link fuer Makler, Vermieter, Eigentuemer und Hausverwaltungen zur Anfrage von Raeumung, Reinigung, Entsorgung und Uebergabevorbereitung nach Absprache.",
      path,
      about: [
        "Service fuer Makler Regensburg",
        "Service fuer Vermieter Regensburg",
        "Wohnung vor Besichtigung vorbereiten",
        "Wohnung nach Auszug reinigen",
        "Objektfall senden",
      ],
      potentialActions: [
        { name: "Objektfall senden", target: `${path}#objektfall-form` },
        { name: "Objektfall per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    buildServiceJsonLd({
      name: "FLOXANT Objekt-Link fuer Makler und Vermieter",
      description:
        "Praktische und organisatorische Unterstuetzung fuer Objektfaelle: Raeumung, Reinigung, Entsorgung, Schluesselkoordination und Uebergabevorbereitung nach Absprache. Keine Maklerleistung und keine Vermietungsgarantie.",
      path,
      serviceType: "Objektvorbereitung fuer Makler, Vermieter, Eigentuemer und Hausverwaltungen",
      areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern nach Verfuegbarkeit"],
    }),
    buildBreadcrumbJsonLd([
      { name: "Startseite", item: "/" },
      { name: "Makler-/Vermieter-Link", item: path },
    ]),
    buildFaqJsonLd(faqItems),
  ],
};

export default function MaklerVermieterLinkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_10%_0%,#dbeafe_0,transparent_33rem),radial-gradient(circle_at_90%_8%,#fef3c7_0,transparent_30rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f8fafc_100%)] text-slate-950">
        <section className="relative px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                <Link2 className="h-4 w-4" />
                FLOXANT Objekt-Link
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                FLOXANT fuer Makler, Vermieter und Eigentuemer
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Ein direkter Link fuer Objektfaelle: Wohnung, Keller oder Nebenflaeche nach Auszug, Leerstand
                oder Mieterwechsel raeumen, reinigen, entsorgen und nach Absprache dokumentieren lassen.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#objektfall-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800" data-event="service_card_click">
                  Objektfall direkt senden
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Objektfall per WhatsApp senden
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                {["Regensburg als Kern", "Makler / Vermieter / Eigentuemer", "Fotos + Termin helfen", "Keine Maklerleistung"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
              <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,#3b82f6_0,transparent_23rem),linear-gradient(145deg,#1e293b,#020617)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Direktlink-freundlich</div>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">Objektfall statt langer Erklaerung</h2>
                  </div>
                  <QrCode className="h-10 w-10 text-amber-200" />
                </div>
                <div className="mt-7 grid gap-3">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-xs font-black text-slate-950">{index + 1}</span>
                      <span className="text-sm font-black">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-7 text-slate-200">
                  Nutzbar fuer E-Mail-Signatur, WhatsApp, GBP-Posts, QR-Code, Flyer und Partnerkommunikation.
                  UTM-Parameter duerfen Quelle und Kampagne enthalten, aber keine personenbezogenen Daten.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Objektfall-Schnelllogik</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Welcher Fall soll an FLOXANT?</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Die Seite ist bewusst kurz: sie sammelt die entscheidenden Objektangaben und fuehrt dann in die passende FLOXANT-Leistung.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {objectCases.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <Icon className="mb-4 h-6 w-6 text-blue-700" />
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <Link href={item.link} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click">
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
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was FLOXANT fuer Makler und Vermieter pruefen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                FLOXANT uebernimmt keine Maklerleistung und gibt keine Vermietungsgarantie. Geprueft werden praktische
                Leistungen rund um Raeumung, Entsorgung, Reinigung, Schluessel und Uebergabevorbereitung.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/mieterwechsel-service-regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                  Mieterwechsel-Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/wohnung-wieder-vermietbar" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Wohnung vorbereiten
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/uebergabeakte" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Uebergabeakte ergaenzen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Ein Link fuer konkrete Immobilien-Situationen</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audiences.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                    <Icon className="mb-4 h-6 w-6 text-blue-700" />
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <Link href="#objektfall-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-950" data-event="service_card_click">
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
            <div className="space-y-5">
              <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Share- und QR-Strategie</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Kurz, merkbar und UTM-kompatibel</h2>
                <p className="mt-4 text-sm leading-7 text-blue-950">
                  Nutzen Sie die kurze URL in Signaturen, WhatsApp, QR-Codes, Angeboten, Rechnungen oder GBP-Posts.
                  Die Canonical-URL bleibt ohne UTM. UTM darf nur Quelle und Kampagne enthalten, niemals Objektadresse oder Kundendaten.
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    "/makler-vermieter-link?utm_source=email_signature&utm_medium=direct_b2b&utm_campaign=makler_vermieter_link",
                    "/makler-vermieter-link?utm_source=whatsapp&utm_medium=direct_message&utm_campaign=makler_vermieter_link",
                    "/makler-vermieter-link?utm_source=qr_flyer&utm_medium=offline&utm_campaign=makler_vermieter_link",
                  ].map((item) => (
                    <code key={item} className="block overflow-x-auto rounded-xl bg-white px-4 py-3 text-xs font-bold text-slate-700">{item}</code>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-amber-200 bg-white p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Grenzen</div>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                  {[
                    "Keine Maklerleistung, keine Vermarktung und keine Verkaufszusage.",
                    "Keine Vermietungsgarantie, keine Abnahmegarantie und keine Rechtsberatung.",
                    "Keine Renovierung, Reparatur, Malerarbeit oder Gefahrstoffentsorgung als pauschales Versprechen.",
                    "Duesseldorf klar getrennt ueber klare lokale Kontaktmöglichkeiten.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-xl bg-amber-50 px-4 py-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <RealtorLandlordLinkForm />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Region und Verknuepfung</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Regensburg als Kern, Bayern nach Verfuegbarkeit</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Objekt-Link ist fuer Regensburg und Umgebung gebaut. Bayern wird nach Termin, Umfang, Zugang und Verfuegbarkeit geprueft.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                  Servicegebiet ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/regensburg/entruempelung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Entruempelung Regensburg
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/private-client-service" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Diskrete Abstimmung
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Reinigung Duesseldorf", "Nur Reinigung, Endreinigung, B2B-Reinigung und Objektvorbereitung ohne Umzugssprache.", "/duesseldorf/reinigung"],
                ["Moeblierte Wohnung Duesseldorf", "Apartment-Reset fuer Hosts, Vermieter und Kurzzeitvermietung in Duesseldorf.", "/reinigung-moeblierte-wohnung-duesseldorf"],
                ["Entsorgung Duesseldorf", "Entsorgung und Reinigungskombination; Umzug separat ueber /duesseldorf/umzug.", "/entsorgung-duesseldorf"],
                ["Buchung/Rechner", "Falls ein Objektfall doch breiter eingeordnet werden muss.", "/buchung"],
                ["Angebotscheck", "Wenn bereits ein Fremdangebot vorliegt und Umfang oder Zusatzleistungen unklar sind.", "/angebotscheck"],
              ].map(([title, text, href]) => (
                <Link key={title} href={href} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                  <MapPin className="mb-4 h-5 w-5 text-blue-700" />
                  <h3 className="text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Haeufige Fragen zum Makler-/Vermieter-Link</h2>
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
          <Link href="#objektfall-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
            Objektfall
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
