import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle2,
  DoorOpen,
  Home,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { DuesseldorfApartmentCleaningForm } from "@/components/DuesseldorfApartmentCleaningForm";
import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningMetadata,
} from "@/lib/duesseldorf-cleaning";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/reinigung-moeblierte-wohnung-duesseldorf";
const whatsappHref =
  "https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20moechte%20eine%20Reinigung%20fuer%20eine%20moeblierte%20Wohnung%20%2F%20ein%20Apartment%20in%20Duesseldorf%20anfragen.%20Es%20geht%20um%20%5BGaestewechsel%2FEndreinigung%2Fregelmaessige%20Reinigung%5D.%20Termin%2C%20Fotos%20und%20Objektangaben%20kann%20ich%20senden.";
const bookingHref =
  "/buchung?service=reinigung&region=duesseldorf&utm_source=apartment_reset#buchungssystem";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Reinigung moeblierte Wohnung Duesseldorf - Kurzzeitvermietung & Apartment | FLOXANT",
    description:
      "FLOXANT reinigt moeblierte Wohnungen, Apartments und Kurzzeitvermietungen in Duesseldorf. Gaestewechsel, Endreinigung, Fotoeinschaetzung und wiederkehrende Reinigung nach Absprache.",
  });
}

const statusSteps = ["Check-out", "Reinigung", "Sichtpruefung", "Foto", "naechster Gast"];

const objectTypes = [
  "moeblierte Wohnung",
  "Apartment",
  "Kurzzeitvermietung",
  "Ferienwohnung",
  "Business Apartment",
];

const serviceBlocks = [
  "Reinigung nach Gaestewechsel",
  "Endreinigung moeblierter Wohnungen",
  "Reinigung vor Check-in",
  "Reinigung nach Check-out",
  "Kueche, Bad, Boeden und sichtbare Flaechen",
  "Grundreinigung nach Absprache",
  "Fotoeinschaetzung oder Fotos nach Absprache",
  "kleiner Inventarhinweis nach Absprache",
  "Waeschewechsel nur falls operativ verfuegbar",
  "Schluesselkoordination nur nach Absprache",
  "Entsorgung kleiner Gegenstaende nach Absprache",
  "wiederkehrende Reinigung nach Terminplan",
];

const targetGroups = [
  {
    title: "Fuer private Hosts",
    text: "Zwischen Check-out und naechstem Gast bleibt oft wenig Zeit. FLOXANT prueft Reinigung nach Terminfenster, Fotos und klaren Objektangaben.",
    cta: "Gaestewechsel-Reinigung anfragen",
    Icon: DoorOpen,
  },
  {
    title: "Fuer Vermieter moeblierter Wohnungen",
    text: "Wenn eine Wohnung nach Nutzung oder vor Neuvermietung sauber und praesentierbar sein soll: Endreinigung, regelmaessige Reinigung und Fotoeinschaetzung nach Absprache.",
    cta: "Moeblierte Wohnung reinigen lassen",
    Icon: Home,
  },
  {
    title: "Fuer Eigentuemer und Betreiber",
    text: "Mehrere Apartments oder wiederkehrende Reinigungen brauchen Objektdaten, Frequenz, Zugang und ein realistisches Zeitfenster.",
    cta: "Apartment-Reinigung fuer Betreiber anfragen",
    Icon: Building2,
  },
  {
    title: "Fuer Business Apartments / B2B",
    text: "Moeblierte Einheiten fuer Mitarbeiter, Projektgaeste oder kleine Betreiber werden nach Flaeche, Frequenz und Objektart eingeordnet.",
    cta: "B2B Apartment-Reinigung pruefen lassen",
    Icon: BedDouble,
  },
  {
    title: "Fuer Auszug / Endreinigung",
    text: "Wenn eine moeblierte Wohnung nach Auszug, Nutzung oder vor Uebergabe gereinigt werden soll.",
    cta: "Endreinigung moeblierte Wohnung anfragen",
    Icon: Sparkles,
  },
];

const situationCards = [
  "Gaestewechsel steht an",
  "Wohnung soll vor Check-in gereinigt werden",
  "Endreinigung nach Auszug",
  "Regelmaessige Reinigung gesucht",
  "Moeblierte Wohnung vor Neuvermietung",
  "Business Apartment / B2B",
  "Fotos fuer Einschaetzung vorhanden",
  "Waeschewechsel gewuenscht",
  "Schluesselkoordination noetig",
  "kleines Inventar pruefen lassen",
  "Entsorgung kleiner Gegenstaende noetig",
];

const limits = [
  "Keine Verbindung oder Partnerschaft mit Airbnb.",
  "Keine Airbnb-Zertifizierung und kein Plattform-Versprechen.",
  "Kein garantierter Hotelstandard und keine Garantie fuer Gaestebewertungen.",
  "Waeschewechsel, Schluesselkoordination und Inventarhinweis nur nach Absprache.",
  "Keine 24/7 Betreuung, keine Rezeption, keine Gaestekommunikation.",
  "Keine Umzugsleistung als Schwerpunkt fuer Duesseldorf.",
];

const faqs = [
  {
    q: "Reinigt FLOXANT Airbnb-Wohnungen in Duesseldorf?",
    a: "FLOXANT bietet Reinigung fuer moeblierte Wohnungen, Apartments und Kurzzeitvermietung in Duesseldorf an. Es besteht keine Verbindung oder Partnerschaft mit Airbnb.",
  },
  {
    q: "Ist Reinigung nach Gaestewechsel moeglich?",
    a: "Ja, nach Verfuegbarkeit. Wichtig sind Check-out-Zeit, naechster Check-in, Objektumfang, Fotos und ein realistisches Zeitfenster.",
  },
  {
    q: "Kann ich wiederkehrende Reinigung anfragen?",
    a: "Ja. Fuer Betreiber, Hosts oder Vermieter koennen Frequenz, mehrere Einheiten, Zugang und Terminlogik nach Absprache geprueft werden.",
  },
  {
    q: "Gibt es Waeschewechsel?",
    a: "Nur nach Absprache und operativer Verfuegbarkeit. Diese Seite behauptet keinen garantierten Waescheservice.",
  },
  {
    q: "Kann FLOXANT Schluessel koordinieren?",
    a: "Nur nach Absprache. Zugang, Berechtigung und Verantwortlichkeit muessen vorher klar sein. Zugangscodes sollten nicht ungeschuetzt im Formular gesendet werden.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Bad, Kueche, Boeden, sichtbaren Flaechen und Zugang helfen bei der Einschaetzung.",
  },
  {
    q: "Sind B2B-Anfragen moeglich?",
    a: "Ja. Kleine Betreiber, Vermieter und Business-Apartment-Anfragen koennen mit Objektart, Flaeche, Frequenz und Zeitfenster gestellt werden.",
  },
  {
    q: "Was ist nicht enthalten?",
    a: "Nicht automatisch enthalten sind Waeschelogistik, Schluesselverwahrung, Inventarhaftung, Schadenpruefung, Gaestekommunikation, Rezeption oder 24/7-Betreuung.",
  },
  {
    q: "Bietet FLOXANT in Duesseldorf Umzuege an?",
    a: "Nein. Duesseldorf ist bei FLOXANT fuer Reinigung und Entsorgung positioniert, nicht fuer Umzuege.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd([
      { name: "FLOXANT", item: "/" },
      { name: "Reinigung Duesseldorf", item: "/duesseldorf/reinigung" },
      { name: "Reinigung moeblierte Wohnung Duesseldorf", item: path },
    ]),
    buildWebPageJsonLd({
      name: "Reinigung fuer moeblierte Wohnungen in Duesseldorf",
      description:
        "Spezialseite fuer Reinigung moeblierter Wohnungen, Apartments und Kurzzeitvermietung in Duesseldorf mit Gaestewechsel, Endreinigung, Fotos, Zeitfenster und wiederkehrender Anfrage nach Absprache.",
      path,
      about: [
        "Airbnb-aehnliche Vermietung",
        "moeblierte Wohnung Duesseldorf",
        "Apartment Reinigung Duesseldorf",
        "Gaestewechsel Reinigung",
        "Kurzzeitvermietung Reinigung",
      ],
      potentialActions: [
        { name: "Apartment-Reinigung anfragen", target: `${path}#apartment-reinigung-form` },
        { name: "Per WhatsApp anfragen", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    {
      "@type": "CleaningService",
      "@id": `https://www.floxant.de${path}#cleaning-service`,
      name: "FLOXANT Apartment-Reset Duesseldorf",
      url: `https://www.floxant.de${path}`,
      telephone: "+4915771105087",
      email: DUESSELDORF_CLEANING.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: DUESSELDORF_CLEANING.address.streetAddress,
        postalCode: DUESSELDORF_CLEANING.address.postalCode,
        addressLocality: "Duesseldorf",
        addressCountry: "DE",
      },
      areaServed: ["Duesseldorf"],
      serviceType: [
        "Reinigung moeblierter Wohnungen",
        "Apartment-Reinigung",
        "Reinigung nach Gaestewechsel",
        "Endreinigung moeblierter Wohnungen",
        "Reinigung Kurzzeitvermietung",
      ],
      description:
        "Reinigung fuer moeblierte Wohnungen, Apartments und Kurzzeitvermietung in Duesseldorf. Zusatzleistungen wie Waeschewechsel, Schluesselkoordination oder Inventarhinweis nur nach Absprache.",
    },
    buildFaqJsonLd(faqs),
  ],
};

export default function ReinigungMoeblierteWohnungDuesseldorfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="overflow-hidden bg-[radial-gradient(circle_at_12%_0%,#cffafe_0,transparent_31rem),radial-gradient(circle_at_92%_10%,#fef3c7_0,transparent_29rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f1f5f9_100%)] text-slate-950" data-event="view_duesseldorf_apartment_cleaning">
        <section className="px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-800 shadow-sm">
                <RefreshCcw className="h-4 w-4" />
                FLOXANT Apartment-Reset Duesseldorf
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                Reinigung fuer moeblierte Wohnungen in Duesseldorf
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Fuer Vermieter, Hosts, Eigentuemer und kleine Betreiber: FLOXANT prueft Reinigung, Gaestewechsel, Endreinigung und Zusatzleistungen fuer moeblierte Wohnungen und Kurzzeitvermietung in Duesseldorf.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#apartment-reinigung-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-800" data-event="start_apartment_cleaning_lead">
                  Apartment-Reinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="click_apartment_cleaning_whatsapp">
                  Per WhatsApp anfragen
                </a>
                <Link href={bookingHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-cyan-200 hover:bg-cyan-50">
                  Buchung/Rechner
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                {["Duesseldorf Reinigung", "keine Airbnb-Partnerschaft", "Fotos helfen", "Waesche/Schluessel nur nach Absprache"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
              <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,#06b6d4_0,transparent_23rem),linear-gradient(145deg,#1e293b,#020617)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Check-in / Check-out Logik</div>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">Gereinigtes Apartment statt offener Fragen</h2>
                  </div>
                  <BedDouble className="h-10 w-10 text-amber-200" />
                </div>
                <div className="mt-7 grid gap-3">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
                      <span className="text-sm font-black">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-7 text-slate-200">
                  Keine Fake-Live-Verfuegbarkeit, kein Hotelstandard-Versprechen. FLOXANT prueft Zeitfenster, Umfang, Zugang und Zusatzwuensche nach Absprache.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Warum diese Seite existiert</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Bei moeblierten Wohnungen entscheidet nicht nur sauber, sondern Timing.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Bei Kurzzeitvermietung, Airbnb-aehnlicher Nutzung oder Business Apartments sind Zeitfenster, Zustand, Zugang und klare Zusatzwuensche entscheidend. FLOXANT fragt deshalb nicht nur nach Quadratmetern, sondern auch nach Check-out, naechstem Check-in, Fotos, Waeschewunsch und Schluesselkoordination nach Absprache.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {objectTypes.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-900">{item}</span>
                ))}
              </div>
            </article>
            <div className="grid gap-3 sm:grid-cols-2">
              {situationCards.map((item) => (
                <Link key={item} href="#apartment-reinigung-form" className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50" data-event="start_apartment_cleaning_lead">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-cyan-700" />
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Was FLOXANT bei moeblierten Wohnungen pruefen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Alle Zusatzoptionen sind bewusst als Pruefung nach Absprache formuliert. Es gibt keine Plattform-, Hotel- oder Waeschelogistik-Garantie.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Gebaut fuer Hosts, Vermieter, Betreiber und B2B</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {targetGroups.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <Icon className="mb-4 h-6 w-6 text-cyan-700" />
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <Link href="#apartment-reinigung-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-800" data-event="start_apartment_cleaning_lead">
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
              <article className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Duesseldorf-Abgrenzung</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Diese Seite ist nur fuer Reinigung in Duesseldorf.</h2>
                <p className="mt-4 text-sm leading-7 text-cyan-950">
                  Duesseldorf ist bei FLOXANT fuer Reinigung und Entsorgung positioniert. Diese Seite behandelt Reinigung fuer moeblierte Wohnungen, Apartments und Kurzzeitvermietung in Duesseldorf. Keine Umzugsleistung als Schwerpunkt fuer Duesseldorf.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/duesseldorf/reinigung" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                    Reinigung Duesseldorf
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/duesseldorf/bueroreinigung" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-200 bg-white px-4 text-sm font-black text-cyan-900">
                    B2B-Reinigung
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/entsorgung-duesseldorf" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-200 bg-white px-4 text-sm font-black text-cyan-900">
                    Entsorgung ergaenzen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
              <article className="rounded-[2rem] border border-amber-200 bg-white p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Grenzen und Sicherheit</div>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                  {limits.map((item) => (
                    <div key={item} className="flex gap-3 rounded-xl bg-amber-50 px-4 py-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="rounded-[2rem] border border-slate-200 bg-white p-7">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Google Ads / GBP / Vertrieb</div>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">UTM-freundlich vorbereitet</h2>
                <div className="mt-5 grid gap-3">
                  {[
                    "/reinigung-moeblierte-wohnung-duesseldorf?utm_source=google_ads&utm_medium=cpc&utm_campaign=duesseldorf_moeblierte_wohnung",
                    "/reinigung-moeblierte-wohnung-duesseldorf?utm_source=google_business_profile&utm_medium=organic_local&utm_campaign=duesseldorf_apartment_reinigung",
                    "/reinigung-moeblierte-wohnung-duesseldorf?utm_source=direct_sales&utm_medium=b2b_outreach&utm_campaign=duesseldorf_apartment_reinigung",
                    "/reinigung-moeblierte-wohnung-duesseldorf?utm_source=whatsapp&utm_medium=direct_message&utm_campaign=duesseldorf_apartment_reinigung",
                  ].map((item) => (
                    <code key={item} className="block overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700">{item}</code>
                  ))}
                </div>
              </article>
            </div>
            <DuesseldorfApartmentCleaningForm />
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Haeufige Fragen zur Apartment-Reinigung in Duesseldorf</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-black text-slate-950">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-950/15 backdrop-blur md:hidden">
          <Link href="#apartment-reinigung-form" className="rounded-xl bg-slate-950 px-3 py-3 text-center text-xs font-black text-white" data-event="start_apartment_cleaning_lead">
            Anfragen
          </Link>
          <a href={whatsappHref} className="rounded-xl bg-emerald-600 px-3 py-3 text-center text-xs font-black text-white" data-event="click_apartment_cleaning_whatsapp">
            WhatsApp
          </a>
          <a href="tel:+4915771105087" className="rounded-xl bg-cyan-700 px-3 py-3 text-center text-xs font-black text-white" data-event="click_apartment_cleaning_phone">
            Anrufen
          </a>
        </div>
      </main>
    </>
  );
}
