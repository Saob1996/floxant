import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolJourneyPanel } from "@/components/conversion/ToolJourneyPanel";
import { SeoLeadForm } from "@/components/SeoLeadForm";
import { company } from "@/lib/company";
import { buildLeadHref, resolveLeadIntent } from "@/lib/lead-intents";
import { generatePageSEO } from "@/lib/seo";
import { searchAuthorityPages } from "@/lib/search-authority";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/reinigungsfirma-angebot";
const pageMetadata = searchAuthorityPages[path];
const title = pageMetadata.seoTitle;
const description = pageMetadata.description;
const leadIntent = resolveLeadIntent({
  path,
  service: "reinigung",
  intent: "reinigungsfirma-angebot",
  priority: "p1",
});
const leadHref = buildLeadHref(leadIntent);

const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte ein Angebot für Reinigung anfragen.",
    "Objekt, Ort, Fläche, Turnus, Fotos und Termin kann ich senden.",
  ].join("\n"),
);

const faqItems = [
  {
    q: "Was braucht FLOXANT für ein Reinigungsfirma-Angebot?",
    a: "Hilfreich sind Ort, Objektart, Fläche, gewünschte Leistung, Turnus oder Einmaltermin, Fotos vom Zustand, Zugang und ein Terminwunsch.",
  },
  {
    q: "Nennt FLOXANT sofort einen Preis?",
    a: "Nein. Ein belastbarer Preis hängt von Fläche, Zustand, Zugang, Zeitfenster und Leistungsumfang ab. FLOXANT prüft die Eckdaten zuerst sachlich.",
  },
  {
    q: "Kann ich auch ein vorhandenes Reinigungsangebot prüfen lassen?",
    a: "Ja. Ein vorhandenes Angebot kann mit Fotos, Umfang, Termin und offenen Positionen eingeordnet werden. Es gibt keine Preisgarantie und keine Abwertung anderer Anbieter.",
  },
  {
    q: "Für welche Reinigungsarten passt die Anfrage?",
    a: "Die Seite passt für Büroreinigung, Praxisreinigung, Grundreinigung, Wohnungsreinigung, Treppenhausreinigung und gewerbliche Objekte.",
  },
] as const;

const cleaningLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf", text: "Für Wohnung, Büro, Praxis, Gewerbe und weitere Objekte in Düsseldorf." },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf", text: "Für Arbeitsplätze, Raumliste, Turnus, Zeitfenster und Zugang." },
  { href: "/angebot-vergleichen-duesseldorf", label: "Angebote Düsseldorf vergleichen", text: "Für ein bereits vorhandenes Reinigungsangebot mit offenen Positionen." },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg", text: "Zentraler Einstieg für Wohnung, Büro, Praxis und Objekt." },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg", text: "Für Büro, Kanzlei, Agentur und Gewerbefläche." },
  { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg", text: "Für Auszug, Einzug, starke Verschmutzung oder Objektstart." },
] as const;

const requestFacts = [
  { title: "Ort oder Postleitzahl", question: "Wo liegt das Objekt?", why: "Anfahrt und zuständiger Standort müssen zum Auftrag passen.", risk: "Ohne Ort ist keine belastbare Machbarkeitsprüfung möglich.", provide: "Stadt, Stadtteil oder PLZ.", check: "Eine Besichtigung ist dafür nicht nötig." },
  { title: "Objektart und Nutzung", question: "Handelt es sich um Wohnung, Büro, Praxis, Laden oder Gemeinschaftsfläche?", why: "Nutzung und Abläufe verändern den benötigten Leistungsumfang.", risk: "Eine falsche Objektannahme führt zu fehlenden Positionen.", provide: "Objektart, Nutzung und besondere Bereiche.", check: "Fotos helfen bei gemischten oder ungewöhnlichen Flächen." },
  { title: "Fläche und Räume", question: "Wie groß ist das Objekt und welche Räume gehören dazu?", why: "Fläche und Raumarten machen Mengen und Wege nachvollziehbar.", risk: "Fehlende Räume können Aufwand und Angebot verzerren.", provide: "Quadratmeter, Raumzahl sowie Küche, Sanitär und Nebenflächen.", check: "Grundriss oder Besichtigung helfen bei komplexen Objekten." },
  { title: "Gewünschte Leistung", question: "Was soll gereinigt werden und welcher Zustand wird erwartet?", why: "Normale Reinigung, Grundreinigung und Übergabe haben andere Ziele.", risk: "Ein unklarer Zielzustand erzeugt unterschiedliche Erwartungen.", provide: "Flächen, Tätigkeiten, Ausschlüsse und gewünschtes Ergebnis.", check: "Fotos sind bei starker Verschmutzung oder empfindlichen Materialien sinnvoll." },
  { title: "Einmalig oder Turnus", question: "Ist die Reinigung einmalig oder regelmäßig?", why: "Ein Turnus bestimmt Ablauf, Zeitfenster und wiederkehrende Aufgaben.", risk: "Ohne Rhythmus lassen sich Leistungen nicht sauber vergleichen.", provide: "Einmaltermin oder Häufigkeit, Wochentage und bevorzugte Zeiten.", check: "Eine Besichtigung ist bei großen regelmäßigen Objekten sinnvoll." },
  { title: "Zugang und Besonderheiten", question: "Wie gelangt das Team zu allen Bereichen?", why: "Etage, Aufzug, Schlüsselweg und sensible Flächen beeinflussen die Durchführung.", risk: "Ungeklärter Zugang kann einen Termin verhindern oder Zusatzaufwand erzeugen.", provide: "Etage, Aufzug, Parken, Schlüsselübergabe und Ansprechpartner – keine Zugangscodes im Formular.", check: "Fotos von Zugängen oder schwer erreichbaren Stellen helfen." },
  { title: "Termin und Frist", question: "Wann soll die Leistung stattfinden?", why: "Wunschtermin, Übergabe und Zeitfenster bestimmen, was realistisch planbar ist.", risk: "Eine unbekannte Frist kann zu falschen Verfügbarkeitsannahmen führen.", provide: "Wunschtermin, alternatives Zeitfenster und feste Übergabefrist.", check: "Bei engem Zeitfenster sollten Fotos oder Besichtigung früh geklärt werden." },
] as const;

export const metadata: Metadata = {
  ...generatePageSEO({
    path,
    title,
    description,
    keywords: [
      "reinigungsfirma angebot",
      "angebot reinigung",
      "angebot für reinigungsarbeiten",
      "reinigungsangebot prüfen",
    ],
  }),
  title,
  description,
  alternates: {
    canonical: path,
    languages: { "de-DE": path, "x-default": path },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: pageMetadata.ogTitle,
    description: pageMetadata.ogDescription,
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Reinigungsfirma Angebot",
          "Angebot Reinigung",
          "Büroreinigung",
          "Praxisreinigung",
          "Grundreinigung",
          "Wohnungsreinigung",
          "Treppenhausreinigung",
          "Regensburg",
          "Reinigung Regensburg 50 km",
        ],
        potentialActions: [
          { name: "Reinigungsangebot anfragen", target: leadHref, type: "ContactAction" },
          { name: "WhatsApp mit Fotos senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Reinigungsfirma Angebot anfragen",
        description,
        path,
        serviceType: "Reinigung und Reinigungsangebot",
        areaServed: ["Düsseldorf", "Regensburg", "Landkreis Regensburg"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Reinigungsfirma Angebot", item: path },
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

export default function ReinigungsfirmaAngebotPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
        <JsonLd />

        <section className="relative isolate bg-slate-950 px-5 pb-16 pt-24 text-white sm:px-8 lg:px-10 lg:pt-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(8,47,73,0.86),rgba(2,6,23,0.98)_56%,rgba(20,83,45,0.5))]" />
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,0.78fr)] lg:items-start xl:grid-cols-[minmax(0,0.95fr)_minmax(520px,0.78fr)]">
            <div>
              <Breadcrumbs
                items={[
                  { label: "Reinigung", href: "/reinigung" },
                  { label: "Reinigungsfirma Angebot" },
                ]}
              />
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-cyan-100/20 bg-cyan-100/12 px-3 py-2 text-sm font-black text-cyan-100">
                <FileSearch className="h-4 w-4" aria-hidden="true" />
                Angebot Reinigung
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl xl:text-6xl">
                {pageMetadata.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-100">
                Für ein gutes Reinigungsangebot zählen keine großen Versprechen, sondern klare
                Eckdaten: Ort, Objekt, Fläche, Zustand, Turnus, Fotos und Termin. FLOXANT ordnet
                die Anfrage ein und führt Sie zur passenden Reinigungsseite.
              </p>
              <div className="mt-7 grid gap-3 xl:grid-cols-3">
                {[
                  { value: "01", label: "Daten senden", text: "Ort, Objekt, Flaeche und Zielzustand." },
                  { value: "02", label: "Einordnung", text: "Leistung, Umfang und offene Punkte klaeren." },
                  { value: "03", label: "Naechster Schritt", text: "Rueckfrage, WhatsApp oder Anfrageformular." },
                ].map((item) => (
                  <div key={item.value} className="rounded-lg border border-white/12 bg-white/[0.07] p-4 shadow-sm">
                    <div className="text-xs font-black uppercase tracking-normal text-cyan-100">{item.value}</div>
                    <div className="mt-2 text-base font-black text-white">{item.label}</div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <ClipboardCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-100" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-black tracking-normal text-white">
                      Was FLOXANT fuer die Vorpruefung braucht
                    </h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {requestFacts.slice(0, 4).map((item) => (
                        <div key={item.title} className="flex gap-2 text-sm font-semibold leading-6 text-slate-200">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={leadHref}
                  data-event="seo_cta_click"
                  data-service="reinigung"
                  data-city="deutschland"
                  data-page-intent="reinigungsfirma-angebot"
                  data-priority="p1"
                  data-cta-label="Angebot vorbereiten"
                  data-destination={leadHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                >
                  Angebot vorbereiten
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="seo_cta_click"
                  data-service="reinigung"
                  data-city="deutschland"
                  data-page-intent="reinigungsfirma-angebot"
                  data-priority="p1"
                  data-cta-label="WhatsApp mit Eckdaten"
                  data-destination={whatsappHref}
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp mit Fotos
                </a>
                <Link
                  href="/regensburg/reinigung"
                  data-event="service_card_click"
                  data-service="reinigung"
                  data-city="regensburg"
                  data-page-intent="reinigung-regensburg"
                  data-priority="p1"
                  data-cta-label="Reinigung Regensburg"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Reinigung Regensburg
                </Link>
              </div>
            </div>

            <aside id="angebot-form" className="text-slate-950 lg:pt-3">
              <p className="text-sm font-black uppercase tracking-normal text-cyan-100">
                Anfrage starten
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-white">
                Eckdaten für das Angebot
              </h2>
              <div className="mt-5">
                <SeoLeadForm initialIntent={leadIntent} sourcePage={path} />
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <article>
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Was die Prüfung beschleunigt
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Gute Angaben machen das Reinigungsangebot belastbarer.
              </h2>
              <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
                FLOXANT vermeidet Blindpreise. Je konkreter Objekt und Ziel beschrieben sind,
                desto leichter lässt sich klären, ob Büroreinigung, Praxisreinigung,
                Grundreinigung, Wohnungsreinigung oder Treppenhausreinigung der passende Weg ist.
              </p>
            </article>
            <ol className="grid gap-3 md:grid-cols-2">
              {requestFacts.map((item, index) => (
                <li key={item.title} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-700 text-xs font-black text-white">{index + 1}</span>
                  <span>
                    <strong className="block text-slate-950">{item.title}: {item.question}</strong>
                    <span className="mt-2 block"><strong>Warum:</strong> {item.why}</span>
                    <span className="mt-1 block"><strong>Risiko:</strong> {item.risk}</span>
                    <span className="mt-1 block"><strong>Ihre Angabe:</strong> {item.provide}</span>
                    <span className="mt-1 block"><strong>Fotos/Besichtigung:</strong> {item.check}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Passende Reinigungsseiten
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Die Angebotsanfrage führt zur richtigen Leistungsseite.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cleaningLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-event="service_card_click"
                  data-service="reinigung"
                  data-city="regensburg"
                  data-page-intent="reinigungsfirma-angebot"
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  <Building2 className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black text-slate-950">{item.label}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    Öffnen
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {[
              {
                Icon: ClipboardCheck,
                title: "Leistung trennen",
                text: "Büro, Praxis, Wohnung, Treppenhaus und Grundreinigung haben unterschiedliche Anforderungen.",
              },
              {
                Icon: Sparkles,
                title: "Zustand sichtbar machen",
                text: "Fotos von Boden, Küche, Sanitär, Zugang und starken Stellen verhindern falsche Annahmen.",
              },
              {
                Icon: FileSearch,
                title: "Angebot einordnen",
                text: "Ein vorhandenes Angebot kann sachlich mit Umfang, Termin und Leistungsgrenzen geprüft werden.",
              },
            ].map(({ Icon, title: cardTitle, text }) => (
              <article key={cardTitle} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-black tracking-normal">{cardTitle}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <ToolJourneyPanel intent="quote" region="both" />

        <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <article>
              <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Häufige Fragen zum Reinigungsangebot
              </h2>
            </article>
            <div className="grid gap-3">
              {faqItems.map((item, index) => (
                <details key={item.q} open={index === 0} className="rounded-lg border border-white/12 bg-white/[0.06] px-5 py-4">
                  <summary className="cursor-pointer text-base font-black text-white">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
    </main>
  );
}
