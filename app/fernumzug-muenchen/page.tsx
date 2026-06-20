import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  ClipboardCheck,
  Home,
  MessageCircle,
  Route,
  Truck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { buildLeadHref } from "@/lib/lead-intents";

const path = "/fernumzug-muenchen";
const title = "Fernumzug München | Strecke & Angebot anfragen";
const description =
  "Fernumzug München: Start, Ziel, Ladevolumen, Etage, Haltezone, Termin und Fotos senden. FLOXANT prüft Strecke und Zusatzleistungen.";

const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte einen Fernumzug aus oder nach München anfragen.",
    "Start, Ziel, Volumen, Etage, Zugang, Termin und Fotos kann ich senden.",
  ].join("\n"),
);
const leadHref = buildLeadHref({
  service: "fernumzug",
  city: "muenchen",
  intent: "fernumzug-muenchen",
  priority: "p0",
});

const faqItems = [
  {
    q: "Was zählt bei einem Fernumzug aus oder nach München?",
    a: "Wichtig sind Start, Ziel, Strecke, Ladevolumen, Etage, Aufzug, Laufweg, Haltezone, Terminfenster, Fotos und gewünschte Zusatzleistungen.",
  },
  {
    q: "Kann FLOXANT einen Festpreis ohne Besichtigung nennen?",
    a: "Ein belastbarer Preis ist erst möglich, wenn Volumen, Strecke, Zugang und Leistungen klar sind. FLOXANT prüft vorhandene Angaben und vermeidet Blindzusagen.",
  },
  {
    q: "Kann Reinigung nach dem Fernumzug mitgedacht werden?",
    a: "Ja. Wenn die alte Wohnung übergeben werden muss, können Reinigung, Restmengen, Schlüsselweg und Übergabetermin direkt in der Anfrage genannt werden.",
  },
  {
    q: "Kann ich ein vorhandenes Umzugsangebot prüfen lassen?",
    a: "Ja. Ein vorhandenes Angebot kann mit Fotos, Strecke, Volumen, Etage und Zusatzleistungen sachlich eingeordnet werden. Eine Preisgarantie gibt es nicht.",
  },
] as const;

const planningFacts = [
  "Start- und Zieladresse oder zumindest beide Orte",
  "Etage, Aufzug, Laufweg und Haltemöglichkeit",
  "Grobe Möbelmenge, Kartons und große Einzelstücke",
  "Fotos von Treppenhaus, Hauseingang und Engstellen",
  "Terminfenster, Übergabetermin und Zusatzleistungen",
  "Vorhandenes Angebot oder Budgetrahmen, falls vorhanden",
] as const;

const relatedLinks = [
  { href: "/umzug-muenchen", label: "Umzug München", text: "Zentraler Einstieg für Privat-, Büro- und Kombiumzug." },
  { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen", text: "Vorhandenes Angebot mit Strecke, Volumen und Zusatzpositionen einordnen." },
  { href: "/reinigung-muenchen", label: "Reinigung nach Umzug München", text: "Wenn Auszug, Endreinigung und Übergabe zusammenhängen." },
  { href: "/bueroumzug-muenchen", label: "Büroumzug München", text: "Für Büro, Praxis, kleine Firma und planbare Randzeiten." },
  { href: "/seniorenumzug-bayern", label: "Seniorenumzug Bayern", text: "Wenn Rückruf, Angehörige, Packhilfe und Übergabe wichtig sind." },
  { href: "/blog/fernumzug-bayern-nrw-tipps", label: "Ratgeber Fernumzug", text: "Zusätzliche Hinweise zu Strecke, Rückfahrt und Vorbereitung." },
] as const;

export const metadata: Metadata = generatePageSEO({
  path,
  title,
  description,
  keywords: [
    "fernumzug münchen",
    "umzug münchen fernumzug",
    "umzug von münchen",
    "umzug nach münchen",
    "umzugsangebot münchen prüfen",
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
          "Fernumzug München",
          "Umzug München",
          "Umzugsangebot München prüfen",
          "Privatumzug München",
          "Büroumzug München",
          "Reinigung nach Umzug München",
        ],
        potentialActions: [
          { name: "Fernumzug München anfragen", target: leadHref, type: "ContactAction" },
          { name: "WhatsApp mit Fotos senden", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildServiceJsonLd({
        name: "Fernumzug München",
        description,
        path,
        serviceType: "Fernumzug und Umzug",
        areaServed: ["München", "Bayern", "Regensburg", "Deutschland"],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Umzug", item: "/umzug" },
        { name: "Umzug München", item: "/umzug-muenchen" },
        { name: "Fernumzug München", item: path },
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

export default function FernumzugMuenchenPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
        <JsonLd />

        <section className="relative isolate bg-slate-950 px-5 pb-14 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(30,41,59,0.96),rgba(2,6,23,0.98)_56%,rgba(14,116,144,0.48))]" />
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.96fr_0.74fr] lg:items-end">
            <div>
              <Breadcrumbs
                items={[
                  { label: "Umzug", href: "/umzug" },
                  { label: "Umzug München", href: "/umzug-muenchen" },
                  { label: "Fernumzug München" },
                ]}
              />
              <div className="mt-7 inline-flex items-center gap-2 rounded-lg border border-cyan-100/20 bg-cyan-100/12 px-3 py-2 text-sm font-black text-cyan-100">
                <Route className="h-4 w-4" aria-hidden="true" />
                Strecke zuerst klären
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.03] tracking-normal sm:text-5xl lg:text-6xl">
                Fernumzug München: Strecke, Volumen und Termin sauber anfragen
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-100">
                Bei einem Fernumzug aus oder nach München entscheiden nicht nur Kilometer. Wichtig
                sind Ladevolumen, Etage, Zugang, Haltezone, Terminfenster, Zusatzleistungen und
                Fotos. FLOXANT prüft die Anfrage, bevor aus einem groben Wunsch ein falscher Preis
                wird.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={leadHref}
                  data-event="seo_cta_click"
                  data-service="fernumzug"
                  data-city="muenchen"
                  data-page-intent="fernumzug-muenchen"
                  data-priority="p0"
                  data-cta-label="Fernumzug anfragen"
                  data-destination={leadHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                >
                  Fernumzug anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="seo_cta_click"
                  data-service="fernumzug"
                  data-city="muenchen"
                  data-page-intent="fernumzug-muenchen"
                  data-priority="p0"
                  data-cta-label="WhatsApp mit Fotos"
                  data-destination={whatsappHref}
                  data-contact-channel="whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp mit Fotos
                </a>
                <Link
                  href={leadHref}
                  data-event="seo_cta_click"
                  data-service="fernumzug"
                  data-city="muenchen"
                  data-page-intent="fernumzug-muenchen"
                  data-priority="p0"
                  data-cta-label="Rueckruf anfragen"
                  data-destination={leadHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Rueckruf anfragen
                </Link>
              </div>
            </div>

            <aside className="rounded-lg border border-white/15 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/20">
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Schnell einschätzbar
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal">
                Diese Angaben machen den Unterschied
              </h2>
              <div className="mt-5 grid gap-3">
                {planningFacts.slice(0, 5).map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <article>
              <p className="text-sm font-black uppercase tracking-normal text-blue-700">
                Planung statt Pauschale
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Ein Fernumzug wird über Strecke, Zugang und Volumen realistisch.
              </h2>
              <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
                München bringt oft enge Zeitfenster, Haltezonen und lange Laufwege mit. Auf der
                Fernstrecke kommen Ladevolumen, Route, Rückfahrt und Übergabe hinzu. Je früher diese
                Punkte sichtbar sind, desto besser lässt sich der nächste Schritt prüfen.
              </p>
            </article>
            <div className="grid gap-3 md:grid-cols-2">
              {planningFacts.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
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
                Passende nächste Wege
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
                Fernumzug, Angebot, Reinigung und Büro sauber trennen.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-event="service_card_click"
                  data-service="umzug"
                  data-city="muenchen"
                  data-page-intent="fernumzug-muenchen"
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  <Route className="h-6 w-6 text-blue-700" aria-hidden="true" />
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
                Icon: Home,
                title: "Wohnung und Zugang",
                text: "Etage, Aufzug, Laufweg, Treppenhaus und Haltezone beeinflussen den Aufwand deutlich.",
              },
              {
                Icon: BadgeEuro,
                title: "Angebot vergleichbar machen",
                text: "Ein vorhandenes Angebot ist nur mit gleichem Volumen, gleicher Strecke und gleichen Zusatzleistungen fair vergleichbar.",
              },
              {
                Icon: ClipboardCheck,
                title: "Übergabe mitdenken",
                text: "Reinigung, Restmengen, Schlüsselweg und Übergabetermin sollten direkt in der Anfrage auftauchen.",
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
                Häufige Fragen zum Fernumzug München
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
