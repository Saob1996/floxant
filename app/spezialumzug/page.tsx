import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PackageCheck, Route } from "lucide-react";

import { AiAnswerCard } from "@/components/AiAnswerCard";
import { ChecklistBlock, QuickDecisionBox } from "@/components/ai-answer";
import {
  LocalServiceBridge,
  OfferCheckCTA,
  RelatedSpecialServices,
  ServiceClusterLinks,
  SignatureServicesGrid,
} from "@/components/conversion";
import { company } from "@/lib/company";
import {
  signatureServiceLinks,
  specialMovingLinks,
} from "@/lib/signature-special-services";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/spezialumzug";
const canonical = `${company.url}${path}`;

const situations = [
  "Mini-Umzug, Einzeltransport oder kleine Wohnung passt nicht sauber in ein grosses Umzugsformular.",
  "Express-Umzug, kurzfristiger Termin oder Plan B braucht zuerst eine realistische Machbarkeitspruefung.",
  "Moebeltransport, Klaviertransport oder sensible Stuecke haengen an Gewicht, Abbau, Schutz und Laufweg.",
  "Rueckfahrt, Beiladung oder flexible Strecke wird nur sinnvoll, wenn Route, Zeitfenster und Transportgut passen.",
] as const;

const process = [
  "Start, Ziel, Etage, Aufzug, Laufweg und moegliche Haltezone nennen.",
  "Volumen, Fotos, Einzelstuecke, Demontage und Schutzbedarf beschreiben.",
  "Terminfenster, Dringlichkeit, Flexibilitaet und vorhandenes Angebot ergaenzen.",
  "FLOXANT trennt direkte Umzugsanfrage, Beiladung, Rueckfahrt und Plan-B-Fall.",
] as const;

const boundaries = [
  "Keine Sofortzusage ohne Route, Volumen, Zugang und Terminlage.",
  "Keine Festpreise ohne Fotos, Etagen, Laufweg, Haltezone und Zusatzleistungen.",
  "Keine riskanten Zusagen fuer Klavier, Tresor oder Spezialgut ohne genaue Daten.",
  "Keine erfundene Verfuegbarkeit fuer Rueckfahrt oder Beiladung.",
] as const;

const movingAnswerPoints = [
  "Mini-Umzug und Moebeltransport brauchen genaue Stuecke, Etage, Laufweg und Termin.",
  "Express-Umzug und Plan B brauchen zuerst Frist, Umfang und Machbarkeitspruefung.",
  "Rueckfahrt oder Beiladung passt nur, wenn Route, Volumen und Zeitfenster flexibel genug sind.",
] as const;

const movingChecklist = [
  "Start, Ziel, Etage, Aufzug und Haltezone nennen.",
  "Volumen, Einzelstuecke, Fotos und Demontagebedarf beschreiben.",
  "Terminfenster, Dringlichkeit und Flexibilitaet markieren.",
  "Vorhandenes Umzugs- oder Transportangebot mitsenden.",
  "Keine Sofort- oder Preisgarantie ohne Daten erwarten.",
] as const;

const faqItems = [
  {
    q: "Was zaehlt bei FLOXANT als Spezialumzug?",
    a: "Spezialumzug umfasst Mini-Umzug, Express-Umzug, Moebeltransport, Klaviertransport, Beiladung, Rueckfahrt, Seniorenumzug und Plan-B-Faelle, bei denen Strecke, Volumen, Zugang oder Zeitfenster zuerst geordnet werden muessen.",
  },
  {
    q: "Kann FLOXANT kurzfristige Umzuege uebernehmen?",
    a: "Kurzfristige Faelle werden nach Machbarkeit geprueft. Entscheidend sind Start, Ziel, Volumen, Etage, Laufweg, Fotos, Zeitfenster und vorhandene Helfer oder Anbieter.",
  },
  {
    q: "Ist ein kleiner Umzug automatisch guenstig?",
    a: "Nicht zwingend. Auch kleine Umzuege koennen durch Laufweg, Haltezone, Abbau, Gewicht, Termin oder Strecke aufwendig werden. FLOXANT prueft den Aufwand transparent.",
  },
  {
    q: "Welche Angaben helfen fuer Rueckfahrt oder Beiladung?",
    a: "Route, Zeitraum, Transportgut, Masse, Gewicht, Fotos, Abhol- und Lieferadresse, Zugang und Flexibilitaet sind wichtig. Eine Beiladung wird nicht pauschal versprochen.",
  },
] as const;

const planBServices = signatureServiceLinks.filter((item) =>
  [
    "FLOXANT Fairpreis-Check",
    "FLOXANT Objektbrief",
    "FLOXANT Plan-B-Service",
    "FLOXANT Rueckfahrt-Radar",
  ].includes(item.title),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Spezialumzug | Mini-Umzug, Express, Transport & Plan B | FLOXANT",
  description:
    "Spezialumzug mit FLOXANT: Mini-Umzug, Express-Umzug, Moebeltransport, Klaviertransport, Beiladung, Rueckfahrt und Plan B realistisch pruefen.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "Spezialumzug mit klarer Machbarkeitspruefung",
    description:
      "Mini-Umzug, Express, Transport, Klaviertransport, Beiladung und Rueckfahrt anhand von Route, Volumen, Zugang und Zeitfenster einordnen.",
    images: [
      {
        url: "/assets/service-moving.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Spezialumzug und Transport",
      },
    ],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Spezialumzug",
        description:
          "FLOXANT Spezialumzug fuer Mini-Umzug, Express-Umzug, Moebeltransport, Klaviertransport, Beiladung, Rueckfahrt, Seniorenumzug und Plan-B-Faelle.",
        path,
        about: specialMovingLinks.map((item) => item.title),
        potentialActions: [
          { name: "Spezialumzug anfragen", target: "/kontakt?service=umzug&source=spezialumzug#direktanfrage", type: "ContactAction" },
          { name: "Rueckfahrt pruefen", target: "/rueckfahrt-boerse" },
        ],
      }),
      buildServiceJsonLd({
        name: "Spezialumzug",
        description:
          "Machbarkeitspruefung fuer besondere Umzugs- und Transportfaelle mit Route, Volumen, Zugang, Fotos und Termin.",
        path,
        serviceType: "Spezialumzug und Transport",
        areaServed: ["Regensburg", "Duesseldorf", "Bayern nach Pruefung"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Leistungen", item: "/leistungen" },
        { name: "Spezialumzug", item: path },
      ]),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

export default function SpezialumzugPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate overflow-hidden bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/service-moving.png"
          alt="FLOXANT Spezialumzug mit Transportfahrzeug"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.86)_58%,rgba(15,23,42,0.48)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100 backdrop-blur">
              <PackageCheck className="h-4 w-4" aria-hidden="true" />
              FLOXANT Spezialumzug
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Mini-Umzug, Express, Moebeltransport, Rueckfahrt und Plan B sauber pruefen.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
              Ein Spezialumzug ist selten nur klein oder dringend. FLOXANT prueft Route,
              Volumen, Zugang, Zeitfenster, Fotos und Grenzen, bevor aus der Anfrage ein
              realistischer Umzugs- oder Transportweg wird.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/kontakt?service=umzug&source=spezialumzug#direktanfrage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
              >
                Spezialumzug anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/rueckfahrt-boerse"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
              >
                Rueckfahrt pruefen
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {situations.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-white/12 bg-white/[0.08] p-4 text-sm font-bold leading-6 text-slate-100 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedSpecialServices
        kind="moving"
        title="Welche Umzugs-Spezialleistung passt zum Fall?"
        intro="Diese Wege helfen, wenn ein Standardumzug nicht exakt passt: kleines Volumen, Zeitdruck, Einzelstuecke, Rueckfahrt, Beiladung oder sensibler Ablauf."
        services={specialMovingLinks}
        limit={8}
      />

      <AiAnswerCard
        title="Spezialumzug heisst: Route, Volumen und Risiko zuerst klaeren."
        answer="FLOXANT unterscheidet kleinen Umzug, Moebeltransport, Klaviertransport, Rueckfahrt, Beiladung und Plan B, damit aus Zeitdruck keine falsche Sofortzusage entsteht."
        points={movingAnswerPoints}
        nextStep="Naechster Schritt: Start, Ziel, Umfang, Fotos, Zugang und Terminfenster mitsenden."
      />

      <QuickDecisionBox
        title="Direkter Umzug oder Plan-B-Pruefung?"
        fits={[
          "Start, Ziel, Volumen und Termin sind bekannt.",
          "Einzelstuecke, Klavier oder Moebeltransport brauchen genaue Daten.",
          "Ein bestehendes Angebot soll nach Route, Zusatzleistung oder Preis geprueft werden.",
        ]}
        notFits={[
          "Es wird eine garantierte Sofortverfuegbarkeit erwartet.",
          "Start, Ziel oder Umfang sind noch nicht beschreibbar.",
          "Spezialgut soll ohne Fotos oder Zugangsdaten zugesagt werden.",
        ]}
        nextSteps={[
          "Daten klar: direkte Umzugsanfrage.",
          "Anbieter wackelt: Plan-B-Service.",
          "Route flexibel: Rueckfahrt-Radar oder Beiladung pruefen.",
        ]}
        ctaHref="/kontakt?service=umzug&intent=spezialumzug-einordnen&source=spezialumzug#direktanfrage"
        ctaLabel="Umzug einordnen"
      />

      <ChecklistBlock
        title="Checkliste fuer Spezialumzug"
        intro="Diese Angaben helfen, ohne dass FLOXANT Verfuegbarkeit oder Preis raten muss."
        items={movingChecklist}
        columns={3}
      />

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Route className="h-4 w-4" aria-hidden="true" />
              Anfragefuehrung
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Was FLOXANT fuer eine serioese Einschaetzung braucht.
            </h2>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {process.map((item, index) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceClusterLinks
        eyebrow="Grenzen und Machbarkeit"
        title="Was bei Spezialumzug nicht pauschal versprochen wird."
        intro="Klare Grenzen schuetzen Erwartung und Ablauf. FLOXANT trennt Anfrage, Machbarkeit, Rueckfragen und verbindliche Zusage."
        links={boundaries.map((text) => ({
          title: text,
          text: "Diese Grenze wird vor einer Zusage sichtbar gemacht, damit Route, Aufwand und Termin nicht geraten werden.",
          href: "/kontakt?service=umzug&source=spezialumzug#direktanfrage",
          cta: "Fall klaeren",
        }))}
      />

      <SignatureServicesGrid
        title="Welche Signature Services zu Spezialumzug passen."
        intro="Fairpreis, Objektbrief, Plan B und Rueckfahrt-Radar helfen, wenn Umzug oder Transport erst sortiert werden muessen."
        services={planBServices}
      />

      <LocalServiceBridge
        serviceLabel="Spezialumzug"
        duesseldorfHref="/duesseldorf"
        regensburgHref="/regensburg/umzug"
      />

      <OfferCheckCTA
        title="Liegt schon ein Umzugs- oder Transportangebot vor?"
        text="FLOXANT kann Umfang, Strecke, Zusatzpositionen, Laufweg, Haltezone, Fotos und Preisrahmen sachlich einordnen. Keine Preisgarantie, keine Abwertung anderer Anbieter."
      />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Haeufige Fragen zum Spezialumzug.</h2>
          </article>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white px-5 py-4">
                <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
