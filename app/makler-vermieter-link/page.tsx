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
  title: "Für Makler & Vermieter - Objekt vorbereiten lassen | FLOXANT",
  description:
    "Direkter Objekt-Link für Makler, Vermieter und Eigentuemer: Wohnung nach Auszug räumen, reinigen, entsorgen und für Besichtigung oder Übergabe vorbereiten lassen.",
});

const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20einen%20Objektfall%20als%20Makler%2FVermieter%2FEigentuemer%20senden.%20Es%20geht%20um%20ein%20Objekt%20in%20%5BOrt%5D.%20Benoetigt%20werden%20Raeumung%2FReinigung%2FEntsorgung%2FUebergabevorbereitung%20nach%20Absprache.%20Fotos%20und%20Termin%20kann%20ich%20senden.";

const statusSteps = ["Objekt", "Zustand", "Termin", "Fotos", "Rückmeldung"];

const objectCases = [
  {
    title: "Wohnung nach Auszug",
    text: "Wenn Reinigung, Möbel, Keller oder Übergabe noch offen sind.",
    link: "/wohnung-wieder-vermietbar",
    cta: "Objekt-Ready ansehen",
    Icon: Home,
  },
  {
    title: "Besichtigung vorbereiten",
    text: "Für Makler, wenn Objekt, Fotos oder Termin einen besseren ersten Eindruck brauchen.",
    link: "/immobilie-verkaufsbereit-machen",
    cta: "Immobilie verkaufsbereit machen",
    Icon: Camera,
  },
  {
    title: "Keller / Garage voll",
    text: "Nebenflächen, Müllraum oder Garage mit Fotos, Zugang und Freigabe prüfen.",
    link: "/keller-muellraum-rettung-regensburg",
    cta: "Keller/Müllraum prüfen",
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
    title: "Schlüssel / Übergabe offen",
    text: "Schlüsselkoordination und Übergabeakte nach Absprache mitdenken.",
    link: "/uebergabeakte",
    cta: "Übergabeakte ergaenzen",
    Icon: KeyRound,
  },
  {
    title: "Mehrere Objektfaelle",
    text: "Hausverwaltungen und Vermieter können den Link für wiederkehrende Faelle nutzen.",
    link: "/mieterwechsel-service-regensburg",
    cta: "Mieterwechsel-Service",
    Icon: Building2,
  },
];

const serviceBlocks = [
  "Wohnung räumen",
  "Möbel / Sperrmuell entfernen",
  "Keller / Garage / Nebenraeume räumen",
  "Endreinigung / Auszugsreinigung",
  "Grundreinigung nach Absprache",
  "Entsorgung normaler Gegenstände nach Absprache",
  "Reinigung vor Besichtigung",
  "Foto-Dokumentation nach Absprache",
  "Übergabeakte",
  "Schlüsselkoordination nach Absprache",
  "Mieterwechsel-Service",
  "Wohnung wieder vermietbar-Service",
];

const audiences = [
  {
    title: "Für Makler",
    text:
      "Wenn eine Wohnung vor Besichtigung, Fototermin oder Vermarktung aufgeraeumter und praesentierbarer wirken soll.",
    cta: "Objekt für Besichtigung vorbereiten",
    Icon: Camera,
  },
  {
    title: "Für Vermieter",
    text:
      "Wenn nach Auszug Reinigung, Möbel, Keller, Entsorgung oder Übergabe gebuendelt werden müssen.",
    cta: "Wohnung nach Auszug vorbereiten",
    Icon: KeyRound,
  },
  {
    title: "Für Eigentuemer",
    text:
      "Wenn Wohnung, Haus oder Nebenraeume nach Leerstand, Erbfall, Auszug oder Verkaufsvorbereitung nutzbarer werden sollen.",
    cta: "Objektfall senden",
    Icon: Home,
  },
  {
    title: "Für Hausverwaltungen",
    text:
      "Wenn wiederkehrende Mieterwechsel, Keller, Müllraum oder Objektzustaende schnell als Fall gesendet werden sollen.",
    cta: "Wiederkehrende Objektfaelle anfragen",
    Icon: Building2,
  },
];

const faqItems = [
  {
    q: "Für wen ist der Makler-/Vermieter-Link gedacht?",
    a: "Der Link ist für Makler, Vermieter, Eigentuemer und Hausverwaltungen gedacht, die einen konkreten Objektfall schnell an FLOXANT senden wollen.",
  },
  {
    q: "Kann ich als Makler ein Objekt direkt senden?",
    a: "Ja. Senden Sie Objektort, Termin, Fotos und offene Punkte. FLOXANT prüft Räumung, Reinigung, Entsorgung oder Übergabevorbereitung nach Absprache.",
  },
  {
    q: "Kann FLOXANT eine Wohnung vor Besichtigung reinigen?",
    a: "Ja, Reinigung vor Besichtigung kann nach Fläche, Zustand, Termin und Zugang geprüft werden. Fotos helfen bei der Einschätzung.",
  },
  {
    q: "Kann FLOXANT Räumung und Reinigung kombinieren?",
    a: "Ja. Räumung, Entsorgung und Reinigung können kombiniert werden, wenn Umfang, Zugang, Materialart und Termin passen.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos können im Formular hochgeladen oder per WhatsApp gesendet werden. Sie helfen, Rückfragen zu reduzieren.",
  },
  {
    q: "Kann eine Übergabeakte ergaenzt werden?",
    a: "Ja. Die FLOXANT Übergabeakte kann nach Absprache Fotos, erledigte Leistungen, Schlüsselstatus und Hinweise dokumentieren.",
  },
  {
    q: "Unterstuetzt FLOXANT Hausverwaltungen?",
    a: "Ja. Für wiederkehrende Objektfaelle ist der Mieterwechsel-Service passender, dieser Link kann aber als schneller Startpunkt genutzt werden.",
  },
  {
    q: "Garantiert FLOXANT eine Vermietung?",
    a: "Nein. FLOXANT unterstützt praktisch und organisatorisch, garantiert aber keine Vermietung, Abnahme oder Vermieterentscheidung.",
  },
  {
    q: "Werden Renovierungen uebernommen?",
    a: "Nur Leistungen, die FLOXANT wirklich anbietet und einplanen kann, werden geprüft. Diese Seite behauptet keine Renovierungs-, Reparatur- oder Maklerleistungen.",
  },
  {
    q: "In welchem Gebiet ist der Service möglich?",
    a: "Regensburg ist der feste Ausgangspunkt. Umgebung und Bayern werden nach Verfügbarkeit geprüft. Für Düsseldorf klar getrennt über klare lokale Kontaktmöglichkeiten zuordnen.",
  },
  {
    q: "Kann der Link wiederholt genutzt werden?",
    a: "Ja. Der Link ist bewusst für E-Mail-Signatur, WhatsApp, QR-Code, Flyer und wiederkehrende Objektfaelle vorbereitet.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildWebPageJsonLd({
      name: "FLOXANT fuer Makler, Vermieter und Eigentuemer",
      description:
        "Direkter Objekt-Link für Makler, Vermieter, Eigentuemer und Hausverwaltungen zur Anfrage von Räumung, Reinigung, Entsorgung und Übergabevorbereitung nach Absprache.",
      path,
      about: [
        "Service für Makler Regensburg",
        "Service für Vermieter Regensburg",
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
        "Praktische und organisatorische Unterstützung für Objektfaelle: Räumung, Reinigung, Entsorgung, Schlüsselkoordination und Übergabevorbereitung nach Absprache. Keine Maklerleistung und keine Vermietungsgarantie.",
      path,
      serviceType: "Objektvorbereitung für Makler, Vermieter, Eigentuemer und Hausverwaltungen",
      areaServed: ["Regensburg", "Verifiziertes 75-km-Einsatzgebiet um Regensburg", "Bayern nach Verfügbarkeit"],
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
                FLOXANT für Makler, Vermieter und Eigentuemer
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Ein direkter Link für Objektfaelle: Wohnung, Keller oder Nebenflaeche nach Auszug, Leerstand
                oder Mieterwechsel räumen, reinigen, entsorgen und nach Absprache dokumentieren lassen.
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
                    <h2 className="mt-2 text-3xl font-black tracking-tight">Objektfall statt langer Erklärung</h2>
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
                  Sie können den Link in E-Mails, WhatsApp, QR-Codes, Flyern und Partnernachrichten teilen.
                  Fügen Sie dabei keine personenbezogenen Daten in den Link ein.
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
                Die Seite ist bewusst kurz: sie sammelt die entscheidenden Objektangaben und führt dann in die passende FLOXANT-Leistung.
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was FLOXANT für Makler und Vermieter prüfen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                FLOXANT uebernimmt keine Maklerleistung und gibt keine Vermietungsgarantie. Geprüft werden praktische
                Leistungen rund um Räumung, Entsorgung, Reinigung, Schlüssel und Übergabevorbereitung.
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
                  Übergabeakte ergaenzen
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Ein Link für konkrete Immobilien-Situationen</h2>
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
                  Nutzen Sie den kurzen Link in Signaturen, WhatsApp, QR-Codes, Angeboten oder Rechnungen.
                  Teilen Sie im Link niemals Objektadressen oder Kundendaten.
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
                    "Düsseldorf klar getrennt über klare lokale Kontaktmöglichkeiten.",
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Regensburg als Kern, Bayern nach Verfügbarkeit</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Der Objekt-Link ist für Regensburg und Umgebung gebaut. Bayern wird nach Termin, Umfang, Zugang und Verfügbarkeit geprüft.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/regensburg" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                  Servicegebiet ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/regensburg/entruempelung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800">
                  Entrümpelung Regensburg
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
                ["Reinigung Regensburg", "Nur Reinigung, Endreinigung, B2B-Reinigung und Objektvorbereitung ohne Umzugssprache.", "/regensburg/reinigung"],
                ["Möblierte Wohnung Regensburg", "Apartment-Reset für Hosts, Vermieter und Kurzzeitvermietung in Regensburg.", "/reinigung-moeblierte-wohnung-regensburg"],
                ["Entrümpelung Regensburg", "Räumungsumfang und Entsorgung im Regensburger Leistungsbereich einordnen.", "/regensburg/entruempelung"],
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
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Häufige Fragen zum Makler-/Vermieter-Link</h2>
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
