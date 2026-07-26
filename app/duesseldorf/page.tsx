import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, FileSearch, MapPin, ShieldCheck } from "lucide-react";

import { ServiceFinder } from "@/components/ContactPathChooser";
import { DuesseldorfCleaningPlanner } from "@/components/dominance/DuesseldorfCleaningPlanner";
import { ServiceAnswerSummary } from "@/components/editorial/ServiceAnswerSummary";
import { DecisionCompassPanel } from "@/components/DecisionCompassPanel";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { NoFakeClaimsNotice } from "@/components/NoFakeClaimsNotice";
import { ServicePackageDecisionExperience } from "@/components/packages/ServicePackageDecisionExperience";
import { ProjectStoryGrid } from "@/components/ProjectStoryGrid";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { ServiceNavigationOverview } from "@/components/ServiceNavigationOverview";
import { TrustProofPanel } from "@/components/TrustProofPanel";
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

const movingHref = buildLeadHref({
  service: "umzug",
  city: "duesseldorf",
  intent: "umzug-duesseldorf",
  priority: "p1",
});

const clearanceHref = buildLeadHref({
  service: "entruempelung",
  city: "duesseldorf",
  intent: "entruempelung-duesseldorf",
  priority: "p1",
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
  {
    title: "Grundreinigung Düsseldorf",
    text: "Intensive Reinigung für Wohnung, Haus, Büro oder Gewerbe mit Schwerpunkten, Fotos und gewünschtem Zielzustand.",
    href: "/duesseldorf/grundreinigung",
    cta: "Grundreinigung öffnen",
  },
  {
    title: "Unterhaltsreinigung Düsseldorf",
    text: "Laufende Reinigung mit Bereichen, Turnus, Zeitfenstern, Zugang und festem Ansprechpartner.",
    href: "/duesseldorf/unterhaltsreinigung",
    cta: "Unterhaltsreinigung öffnen",
  },
  {
    title: "Bauendreinigung Düsseldorf",
    text: "Nach Bau, Umbau oder Renovierung mit Bauphase, Restarbeiten, Oberflächen und Übergabetermin.",
    href: "/duesseldorf/baureinigung",
    cta: "Bauendreinigung öffnen",
  },
];

const faqItems = [
  {
    q: "Ist Düsseldorf ein echter FLOXANT Standort?",
    a: "Ja. Düsseldorf wird als eigener FLOXANT Standort mit einem separaten Kontakt- und Anfrageweg geführt. Leistungen im Umland werden abhängig von Objekt, Strecke, Termin und Kapazität geprüft.",
  },
  {
    q: "Gibt es eine 50-km-Umgebung um Düsseldorf?",
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
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Düsseldorf | Reinigung & Services persönlich anfragen",
  description:
    "FLOXANT Düsseldorf: Reinigung, Büro-, Gewerbe-, Grund-, Unterhalts-, Fenster- und Bauendreinigung sowie besondere Services klar und persönlich anfragen.",
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
          "Düsseldorfer Übersicht für Angebotsprüfung, Umzug, Entrümpelung, Haushaltsauflösung, Entsorgung und Anfragen auf Englisch.",
        path,
        about: [
          "FLOXANT Düsseldorf",
          "Angebot prüfen Düsseldorf",
          "Reinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Gewerbereinigung Düsseldorf",
          "Praxisreinigung Düsseldorf",
          "Fensterreinigung Düsseldorf",
          "Umzug Düsseldorf",
          "Entrümpelung Düsseldorf",
          "Haushaltsauflösung Düsseldorf",
          "Düsseldorf 50 km Servicegebiet",
        ],
        potentialActions: [
          { name: "Angebot prüfen", target: offerHref, type: "ContactAction" },
          { name: "Reinigung Düsseldorf anfragen", target: "/duesseldorf/reinigung", type: "Action" },
          { name: "Büroreinigung Düsseldorf anfragen", target: "/duesseldorf/bueroreinigung", type: "Action" },
          { name: "Umzug Düsseldorf anfragen", target: movingHref, type: "ContactAction" },
          { name: "Entrümpelung Düsseldorf anfragen", target: clearanceHref, type: "ContactAction" },
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
              FLOXANT Düsseldorf: Reinigung und besondere Services klar anfragen.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
              Wählen Sie Reinigung, Büro, Gewerbe, Grundreinigung, Unterhaltsreinigung,
              Bauendreinigung oder einen besonderen Anfrageweg. Wir führen Sie mit wenigen
              verständlichen Angaben zur passenden Leistung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={offerHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                data-event="seo_cta_click"
                data-region="duesseldorf"
                data-service="angebot-pruefen"
                data-city="duesseldorf"
                data-page-intent="angebot-vergleichen-duesseldorf"
                data-priority="p0"
                data-cta-label="Angebot prüfen"
                data-destination={offerHref}
              >
                Angebot prüfen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={movingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                data-event="seo_cta_click"
                data-region="duesseldorf"
                data-service="umzug"
                data-city="duesseldorf"
                data-page-intent="umzug-duesseldorf"
                data-priority="p1"
                data-cta-label="Umzug anfragen"
                data-destination={movingHref}
              >
                Umzug anfragen
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              "Eigener Düsseldorfer Anfrageweg mit klarer Standortzuordnung.",
              "Neuss, Ratingen, Meerbusch und weitere Orte werden nach Machbarkeit geprüft.",
              "Alle wichtigen Reinigungsarten sind übersichtlich und direkt erreichbar.",
              "Für den Start reichen Objekt, Ort, Umfang, Terminwunsch und optional Fotos.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/15 bg-slate-950/70 p-4 text-sm font-semibold leading-6 text-slate-100 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <DuesseldorfCleaningPlanner />
      <ServiceAnswerSummary serviceId="reinigung" region="Düsseldorf" className="border-b border-slate-200" />

      <ServicePackageDecisionExperience
        variant="duesseldorf"
        groups={["angebot-pruefen", "umzug", "entruempelung", "signature"]}
        limitPerGroup={2}
        heading="Düsseldorf-Anfragen ohne ungeprüfte Serviceversprechen sortieren."
        intro="Die Übersicht führt zu Angebotsprüfung, Umzug, Räumung, besonderen Leistungen und den wichtigsten Reinigungsangeboten in Düsseldorf."
      />

      <ServiceFinder
        compact
        currentCity="duesseldorf"
        title="Welche Leistung brauchen Sie in Düsseldorf?"
        intro="Wählen Sie eine Leistung. Ihre Angaben werden erst gesendet, wenn Sie das Formular abschicken."
        source="duesseldorf-service-finder"
      />

      <ServiceNavigationOverview
        location="duesseldorf"
        groups={["umzug_transport", "entruempelung_aufloesung", "angebot_pruefen", "signature"]}
        title="Düsseldorf-Services nach Anfrageziel."
        intro="Düsseldorf führt zu Angebot prüfen, Umzug, Räumung, Haushaltsauflösung und diskreten Sonderwegen. Die wichtigsten Reinigungsseiten sind direkt darunter gebündelt."
      />

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              Reinigung Düsseldorf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Reinigungsleistungen in Düsseldorf im direkten Überblick.
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

      <DecisionCompassPanel
        title="Unsicher in Düsseldorf?"
        intro="Wenn Service, Umfang oder Angebot noch nicht klar sind, führt der Kompass zu einem Kontaktweg mit passenden Parametern."
      />

      <TrustProofPanel
        allowedPage="/duesseldorf"
        locationKey="duesseldorf"
        title="Was Sie bei einer Anfrage in Düsseldorf erwarten können"
        intro="Nennen Sie Leistung, Ort, Umfang und Termin. Wir prüfen die Angaben und melden uns, bevor etwas zugesagt wird."
      />

      <ServiceProofChecklist
        serviceKey="angebot-pruefen"
        title="Was Düsseldorf-Anfragen prüfbarer macht"
        intro="Ein belastbarer erster Schritt entsteht aus Service, Ort, Fotos, Termin, vorhandenen Angeboten und klaren Grenzen."
      />

      <LocalProofPanel location="duesseldorf" />

      <ServiceVisualProofGrid
        serviceKey="angebot-pruefen"
        locationKey="duesseldorf"
        title="Visuelle Orientierung für Düsseldorf ohne Kundendaten"
        intro="Sichtbare Grafiken bleiben abstrakt. Echte Projektfotos, Dokumente oder Before-/After-Belege erscheinen nur nach Freigabe."
      />

      <ProjectStoryGrid
        serviceKey="angebot-pruefen"
        locationKey="duesseldorf"
        title="Typische Anfragen aus Düsseldorf"
        intro="Diese Beispiele beschreiben neutrale Ausgangslagen für Angebotsprüfung und Anfragevorbereitung. Es sind keine behaupteten Kundenfälle."
      />

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <NoFakeClaimsNotice />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              50-km-Umgebung
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
                  Einsatzgebiet wird nach Ihren konkreten Angaben bestätigt.
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
              href={clearanceHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              data-event="seo_cta_click"
              data-region="duesseldorf"
              data-service="entruempelung"
              data-city="duesseldorf"
              data-page-intent="entruempelung-duesseldorf"
              data-priority="p1"
              data-cta-label="Räumung anfragen"
              data-destination={clearanceHref}
            >
              Räumung anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt?service=angebot-pruefen&intent=english-offer-check&source=seo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              English contact path
            </Link>
          </div>
        </div>
      </section>

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
