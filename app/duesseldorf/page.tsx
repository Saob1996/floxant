import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, FileSearch, MapPin, ShieldCheck } from "lucide-react";
import { ToolJourneyPanel } from "@/components/conversion/ToolJourneyPanel";
import { company, duesseldorfCompany } from "@/lib/company";
import { buildLeadHref } from "@/lib/lead-intents";
import { buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/duesseldorf";
const canonical = `${company.url}${path}`;

const offerHref = buildLeadHref({
  service: "angebot-pruefen",
  city: "duesseldorf",
  intent: "angebot-vergleichen-duesseldorf",
  priority: "p0",
});

const cleaningHref = buildLeadHref({
  service: "reinigung",
  city: "duesseldorf",
  intent: "reinigung-duesseldorf",
  priority: "p0",
});

const duesseldorfCleaningLinks = [
  {
    title: "Reinigung Düsseldorf",
    text: "Objektart, Fläche, Zielzustand, Termin und Fotos für private oder gewerbliche Reinigungsanfragen.",
    href: "/duesseldorf/reinigung",
    cta: "Reinigung öffnen",
  },
  {
    title: "Büroreinigung Düsseldorf",
    text: "Turnus, Räume, Reinigungszeiten, Sanitär/Küche, Ansprechpartner und vorhandenes Angebot.",
    href: "/duesseldorf/bueroreinigung",
    cta: "Büroreinigung öffnen",
  },
  {
    title: "Gewerbereinigung Düsseldorf",
    text: "Gewerbeflächen, Nutzungszeiten, Leistungsumfang, Sonderflächen und Angebotsprüfung.",
    href: "/duesseldorf/gewerbereinigung",
    cta: "Gewerbereinigung öffnen",
  },
  {
    title: "Angebot prüfen Düsseldorf",
    text: "Bestehendes Reinigungsangebot, Umfang, Turnus und offene Punkte sachlich einordnen.",
    href: "/angebot-vergleichen-duesseldorf",
    cta: "Angebot prüfen",
  },
  {
    title: "Premium-Reinigung Düsseldorf",
    text: "Diskrete Reinigung für anspruchsvolle private oder hochwertige Objekte abstimmen.",
    href: "/duesseldorf/luxusreinigung",
    cta: "Premium-Reinigung öffnen",
  },
  {
    title: "Praxisreinigung Düsseldorf",
    text: "Praxisräume, sensible Bereiche, Zeitfenster, Turnus und sachliche Ablaufklärung.",
    href: "/duesseldorf/praxisreinigung",
    cta: "Praxisreinigung öffnen",
  },
  {
    title: "Fensterreinigung Düsseldorf",
    text: "Fensterzahl, Glasflächen, Erreichbarkeit, Rahmen/Falze, Etage und Terminlogik.",
    href: "/duesseldorf/fensterreinigung",
    cta: "Fensterreinigung öffnen",
  },
];

const faqItems = [
  {
    q: "Wie erreiche ich FLOXANT in Düsseldorf?",
    a: "FLOXANT ist in Düsseldorf unter Breite Str. 22, 40213 Düsseldorf geführt. Für eine Reinigungsanfrage können Sie Telefon, WhatsApp oder das Formular nutzen.",
  },
  {
    q: "Gibt es eine 75-km-Umgebung um Düsseldorf?",
    a: "Die Umgebung wird nur als möglicher Servicebereich erklärt. Orte wie Neuss, Ratingen, Meerbusch, Hilden, Erkrath, Krefeld, Mettmann oder Duisburg sind keine zusätzlichen Niederlassungen.",
  },
  {
    q: "Welche Düsseldorfer Reinigungsseiten sind jetzt direkt verlinkt?",
    a: "Reinigung, Büroreinigung, Gewerbereinigung, Praxisreinigung und Fensterreinigung sind direkt erreichbar. Zusätzliche Stadtteilseiten werden nicht künstlich vervielfacht.",
  },
  {
    q: "Können englischsprachige Kunden anfragen?",
    a: "Ja. Eine Anfrage kann auf Englisch starten, wenn Service, Ort, Umfang, Fotos, Termin und bevorzugter Kontaktweg klar genannt werden.",
  },
  {
    q: "Welche Angaben braucht eine Reinigungsanfrage in Düsseldorf?",
    a: "Nennen Sie Stadtteil oder PLZ, Objektart, Fläche, gewünschten Umfang, aktuellen Zustand, Turnus oder Termin, Zugang und möglichst passende Fotos.",
  },
  {
    q: "Kann FLOXANT ein vorhandenes Reinigungsangebot prüfen?",
    a: "Ja. Senden Sie das Angebot zusammen mit Raumliste, Fläche, Turnus, Zeitfenster und offenen Fragen. Die Prüfung verspricht weder einen niedrigeren Preis noch einen Termin.",
  },
  {
    q: "Sind Grundreinigung und Baureinigung eigene Düsseldorfer Seiten?",
    a: "Nein. Diese Leistungen werden auf der Reinigungsseite als prüfbare Einsatzfälle erklärt, damit keine nahezu identischen Ortsseiten entstehen. Umfang, Zustand und Ziel müssen vor einer Zusage geklärt werden.",
  },
  {
    q: "Wie entsteht ein verbindlicher Termin?",
    a: "Erst nachdem Ort, Leistung, Umfang, Zugang und Zeitfenster geprüft und von beiden Seiten bestätigt wurden. Das Absenden einer Anfrage reserviert noch keinen Termin.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Düsseldorf | Reinigung für Büro, Praxis & Objekt",
  description:
    "FLOXANT Düsseldorf für Reinigung von Wohnung, Büro, Praxis, Gewerbe und Glas. Fläche, Turnus, Zugang, Termin oder vorhandenes Angebot senden.",
  alternates: {
    canonical,
    languages: {
      "de-DE": path,
      "x-default": path,
    },
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Düsseldorf",
        description:
          "Düsseldorfer Übersicht für Reinigung von Wohnung, Büro, Praxis, Gewerbe und Glas sowie die Prüfung vorhandener Reinigungsangebote.",
        path,
        about: [
          "FLOXANT Düsseldorf",
          "Angebot prüfen Düsseldorf",
          "Reinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Gewerbereinigung Düsseldorf",
          "Praxisreinigung Düsseldorf",
          "Fensterreinigung Düsseldorf",
          "Düsseldorf 75 km Servicegebiet",
        ],
        potentialActions: [
          { name: "Angebot prüfen", target: offerHref, type: "ContactAction" },
          { name: "Reinigung Düsseldorf anfragen", target: "/duesseldorf/reinigung", type: "Action" },
          { name: "Büroreinigung Düsseldorf anfragen", target: "/duesseldorf/bueroreinigung", type: "Action" },
          { name: "Reinigung Düsseldorf anfragen", target: cleaningHref, type: "ContactAction" },
        ],
      }),
      {
        "@type": "LocalBusiness",
        "@id": `${canonical}#localbusiness`,
        name: duesseldorfCompany.name,
        url: canonical,
        telephone: duesseldorfCompany.phoneRaw,
        email: duesseldorfCompany.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: duesseldorfCompany.streetAddress,
          postalCode: duesseldorfCompany.postalCode,
          addressLocality: duesseldorfCompany.city,
          addressCountry: duesseldorfCompany.countryCode,
        },
        parentOrganization: { "@id": `${company.url}/#organization` },
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Hilden", "Erkrath", "Krefeld", "Mettmann"],
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export default function DuesseldorfHubPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/floxant-hero-neu-gedacht.webp"
          alt="FLOXANT Düsseldorf Servicehub"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.84)_58%,rgba(15,23,42,0.42)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100 backdrop-blur">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              FLOXANT Düsseldorf
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              FLOXANT Düsseldorf für Reinigung von Büro, Praxis und Objekt.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
              Wählen Sie die passende Reinigungsleistung und senden Sie Stadtteil, Objektart, Fläche,
              Turnus, Zugang, Termin und bei Bedarf Fotos oder ein vorhandenes Angebot.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={cleaningHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                data-event="seo_cta_click"
                data-region="duesseldorf"
                data-service="reinigung"
                data-city="duesseldorf"
                data-cta-label="Reinigung anfragen"
                data-destination={cleaningHref}
              >
                Reinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={offerHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                data-event="seo_cta_click"
                data-region="duesseldorf"
                data-service="angebot-pruefen"
                data-city="duesseldorf"
                data-cta-label="Angebot prüfen"
                data-destination={offerHref}
              >
                Angebot prüfen
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              "Reinigung für Wohnung, Büro, Praxis, Gewerbe und Glas klar auswählen.",
              "Grund-, Bauend-, Unterhalts- und Treppenhausreinigung im Reinigungsbereich einordnen.",
              "Stadtteil, Fläche, Turnus, Zugang, Termin und Fotos reduzieren Rückfragen.",
              "Vorhandene Reinigungsangebote anhand von Umfang und offenen Positionen prüfen.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/15 bg-slate-950/70 p-4 text-sm font-semibold leading-6 text-slate-100 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Reinigung Düsseldorf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Reinigungsleistungen im direkten Überblick.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Die Reinigungsthemen sind auf wenige klare Zielseiten verteilt. Jede Seite führt zu einer Anfrage mit Stadtparameter und zur Angebotsprüfung, ohne Preis-, Termin- oder Verfügbarkeitsgarantie.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {duesseldorfCleaningLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[13rem] flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                data-event="service_card_click"
                data-city="duesseldorf"
                data-source="duesseldorf_hub_cleaning_cluster"
                data-destination={item.href}
              >
                <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              75-km-Umgebung
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Umgebung als Einsatzgebiet, nicht als neue Niederlassung.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              FLOXANT kann Orte im Düsseldorfer Umkreis prüfen, wenn Service, Strecke, Umfang,
              Fotos, Termin und Kapazität zusammenpassen. Eine eigene Ortsseite entsteht erst,
              wenn echter Nutzen und echte Abdeckung belegt sind.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Neuss", "Ratingen", "Meerbusch", "Hilden", "Erkrath", "Krefeld", "Mettmann", "Duisburg"].map((city) => (
              <div key={city} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-black text-slate-950">{city}</div>
                <div className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                  Einsatz je nach Auftrag, Umfang und Termin prüfen.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Sichere Anfrage
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
              Angebot, Fotos oder kurze Beschreibung reichen für den ersten Schritt.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              FLOXANT verspricht keine festen Preise oder Sofortverfügbarkeit ohne Prüfung Ihrer Angaben.
              Für den ersten Schritt reichen Leistung, Ort, Umfang und gewünschter Termin.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={cleaningHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              data-event="seo_cta_click"
              data-region="duesseldorf"
              data-service="reinigung"
              data-city="duesseldorf"
              data-cta-label="Reinigung anfragen"
              data-destination={cleaningHref}
            >
              Reinigung anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/en"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              Services in English
            </Link>
          </div>
        </div>
      </section>

      <ToolJourneyPanel intent="cleaning" region="duesseldorf" />

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Düsseldorf bleibt klar und vorsichtig erklärt.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
