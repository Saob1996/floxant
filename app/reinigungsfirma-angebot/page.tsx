import type { Metadata } from "next";
import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
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
import { SeoLeadForm } from "@/components/SeoLeadForm";
import { company } from "@/lib/company";
import { getPrioritySeoMeta } from "@/lib/content/seo-meta-registry";
import { buildLeadHref, resolveLeadIntent } from "@/lib/lead-intents";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/reinigungsfirma-angebot";
const pageMeta = getPrioritySeoMeta(path);
const title = pageMeta.seoTitle;
const description = pageMeta.description;
const leadIntent = resolveLeadIntent({
  path,
  service: "reinigung",
  intent: "reinigungsfirma-angebot",
  priority: "p1",
});
const leadHref = buildLeadHref(leadIntent);
const existingOfferHref = "/angebotscheck";

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
    q: "Welche Angaben braucht ein neues Reinigungsangebot?",
    a: "Hilfreich sind Ort, Objektart, Fläche, gewünschte Leistung, Turnus oder Einmaltermin, Fotos vom Zustand, Zugang und ein Terminwunsch.",
  },
  {
    q: "Nennt FLOXANT sofort einen Preis?",
    a: "Nein. Ein belastbarer Preis hängt von Fläche, Zustand, Zugang, Zeitfenster und Leistungsumfang ab. FLOXANT prüft die Eckdaten zuerst sachlich.",
  },
  {
    q: "Wo lasse ich ein bereits vorhandenes Reinigungsangebot prüfen?",
    a: "Nutzen Sie dafür den getrennten Angebotscheck. Diese Seite ist für eine neue Reinigungsanfrage gedacht; der Angebotscheck ordnet ein vorhandenes Dokument, dessen Umfang und offene Positionen ein.",
  },
  {
    q: "Für welche Reinigungsarten passt die Anfrage?",
    a: "Die Seite passt für Büroreinigung, Praxisreinigung, Grundreinigung, Wohnungsreinigung, Treppenhausreinigung und gewerbliche Objekte.",
  },
] as const;

const cleaningLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf", text: "Reinigungsart für Wohnung, Büro, Praxis, Glas oder Objekt auswählen." },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg", text: "Reinigung für Wohnung, Büro, Praxis oder Objekt in Regensburg einordnen." },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf", text: "Arbeitsplätze, Räume, Turnus, Zeitfenster und Zugang beschreiben." },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg", text: "Büro, Kanzlei oder Agentur mit Fläche und Leistungsplan anfragen." },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf", text: "Empfang, Warte- und Behandlungsräume sowie Zeitfenster klären." },
  { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg", text: "Praxisräume und sensible Bereiche in Regensburg beschreiben." },
] as const;

const requestFacts = [
  "Ort oder Stadtteil und Objektart",
  "Fläche, Räume oder grober Umfang",
  "Einmalige Reinigung oder regelmäßiger Turnus",
  "Fotos von Zustand, Zugang und besonderen Stellen",
  "Terminwunsch, Zeitfenster und Ansprechpartner",
  "Gewünschter Leistungsumfang und wichtige Prioritäten",
] as const;

export const metadata: Metadata = generatePageSEO({
  path,
  title,
  description,
  keywords: [
    "reinigungsfirma angebot",
    "angebot reinigung",
    "angebot für reinigungsarbeiten",
  ],
});

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Reinigungsangebot anfragen",
          "Angebot für Reinigungsarbeiten",
          "Büroreinigung",
          "Praxisreinigung",
          "Grundreinigung",
          "Wohnungsreinigung",
          "Unterhaltsreinigung",
          "Düsseldorf",
          "Regensburg",
        ],
        potentialActions: [
          { name: "Reinigungsangebot anfragen", target: leadHref, type: "ContactAction" },
          { name: "Neue Reinigungsanfrage per WhatsApp senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Reinigungsfirma Angebot anfragen",
        description,
        path,
        serviceType: "Anfrage für ein neues Reinigungsangebot",
        areaServed: ["Düsseldorf", "Regensburg"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung", item: "/reinigung" },
        { name: "Reinigungsangebot anfragen", item: path },
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
                  { label: "Reinigungsangebot anfragen" },
                ]}
              />
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-cyan-100/20 bg-cyan-100/12 px-3 py-2 text-sm font-black text-cyan-100">
                <FileSearch className="h-4 w-4" aria-hidden="true" />
                Angebot Reinigung
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl xl:text-6xl">
                {pageMeta.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-100">
                Sie möchten ein neues Reinigungsangebot erhalten? Senden Sie Ort, Objekt, Fläche,
                Zustand, gewünschten Turnus und Termin. FLOXANT ordnet die neue Anfrage ein und
                führt Sie zur passenden Reinigungsleistung. Ein bereits vorliegendes Angebot
                gehört in den getrennten Angebotscheck.
              </p>
              <div className="mt-7 grid gap-3 xl:grid-cols-3">
                {[
                  { value: "01", label: "Daten senden", text: "Ort, Objekt, Fläche und Zielzustand." },
                  { value: "02", label: "Einordnung", text: "Leistung, Umfang und offene Punkte klären." },
                  { value: "03", label: "Naechster Schritt", text: "Rückfrage, WhatsApp oder Anfrageformular." },
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
                      Was FLOXANT für die neue Anfrage braucht
                    </h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {requestFacts.slice(0, 4).map((item) => (
                        <div key={item} className="flex gap-2 text-sm font-semibold leading-6 text-slate-200">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={leadHref}
                  data-event="request_cta_click"
                  data-service="reinigung"
                  data-city="deutschland"
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
                  data-event="request_cta_click"
                  data-service="reinigung"
                  data-city="deutschland"
                  data-cta-label="WhatsApp mit Eckdaten"
                  data-destination={whatsappHref}
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp mit Fotos
                </a>
                <Link
                  href="/leistungen"
                  data-event="service_card_click"
                  data-service="reinigung"
                  data-city="standortauswahl"
                  data-cta-label="Reinigungsarten auswählen"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Reinigungsarten auswählen
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

        <section className="border-b border-slate-200 bg-cyan-50 px-5 py-10 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-xl border border-cyan-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Bereits ein Angebot erhalten?</p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                Vorhandenes Reinigungsangebot getrennt prüfen lassen
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                Der Angebotscheck betrachtet ein bestehendes Dokument, enthaltene Leistungen und offene Positionen.
                Er ist bewusst von der neuen Angebotsanfrage auf dieser Seite getrennt.
              </p>
            </div>
            <Link
              href={existingOfferHref}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-cyan-800"
            >
              Vorhandenes Angebot prüfen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <article>
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Was die Anfrage beschleunigt
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
            <div className="grid gap-3 md:grid-cols-2">
              {requestFacts.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
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
                title: "Leistungsumfang abgrenzen",
                text: "Fenster, Geräte innen, Verbrauchsmaterial oder andere Zusatzarbeiten werden ausdrücklich benannt.",
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
