import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock3,
  FileSearch,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Truck,
} from "lucide-react";

import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { EffortFactorsPanel } from "@/components/EffortFactorsPanel";
import { company } from "@/lib/company";
import { getPrioritySeoMeta } from "@/lib/content/seo-meta-registry";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const canonicalPath = "/regensburg/umzug";
const moveContactHref = "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=website";
const furnitureAssemblyHref = "/kontakt?service=umzug&city=regensburg&intent=moebelmontage-regensburg&source=website";
const offerCheckHref =
  "/kontakt?service=umzug&city=regensburg&intent=umzugsangebot-pruefen&source=website";
const pageMeta = getPrioritySeoMeta(canonicalPath);
const pageTitle = pageMeta.seoTitle;
const pageDescription = pageMeta.description;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte einen Umzug in Regensburg anfragen.",
    "Start, Ziel, Etagen, Umfang und Termin:",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalPath,
    languages: {
      "de-DE": canonicalPath,
      "x-default": canonicalPath,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonicalPath,
    title: pageMeta.ogTitle,
    description: pageMeta.ogDescription,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

const heroFacts = [
  "Start, Ziel und gewünschter Termin",
  "Etage, Aufzug und Trageweg",
  "Möbelumfang, Kartons und Fotos",
] as const;

const moveTypes = [
  {
    title: "Wohnungswechsel in Regensburg",
    text: "Für einen Umzug innerhalb der Stadt zählen Etage, Aufzug, Ladepunkt und Trageweg besonders.",
    icon: Home,
  },
  {
    title: "Umzug ins Umland oder nach Regensburg",
    text: "Bei längeren Strecken helfen vollständige Start- und Zielorte sowie ein realistisches Zeitfenster.",
    icon: Route,
  },
  {
    title: "Kleiner Umzug",
    text: "Für wenige Möbel oder Kartons genügt eine kurze Liste mit Maßen, Zugängen und Fotos.",
    icon: Boxes,
  },
  {
    title: "Umzug mit festem Übergabetermin",
    text: "Wenn Schlüsselübergabe oder Nachmietertermin feststehen, stimmen wir Reihenfolge und Zeitfenster mit Ihnen ab.",
    icon: Clock3,
  },
] as const;

const serviceScope = [
  "kompletter Umzug mit Möbeln und Kartons",
  "reine Tragehilfe mit klar beschriebenem Umfang",
  "Möbeltransport oder Transport einzelner Gegenstände",
  "Möbelabbau und Möbelaufbau nach Absprache",
  "Einpackservice als eigener Leistungspunkt",
  "Reinigung oder Entrümpelung getrennt ergänzen",
] as const;

const neededDetails = [
  "vollständige Start- und Zieladresse mit Postleitzahl",
  "Etage und Aufzug an beiden Adressen",
  "Zimmerzahl, Wohnfläche, Möbelmenge und Kartons",
  "besondere Gegenstände und gewünschte Zusatzleistungen",
  "Treppen, Laufwege und mögliche Ladeplätze",
  "Fotos von Möbeln, Zugängen und Engstellen",
  "Terminwunsch oder verfügbares Zeitfenster",
  "Montage, Packhilfe oder Reinigung als getrennte Wünsche",
] as const;

const effortFactors = [
  "Menge und Größe der Möbel",
  "Entfernung zwischen Start und Ziel",
  "Treppen, Aufzüge und Laufwege",
  "Park- und Lademöglichkeiten",
  "Montage- oder Packarbeiten",
  "Terminlage und gewünschtes Zeitfenster",
] as const;

const processSteps = [
  {
    title: "Eckdaten senden",
    text: "Sie nennen Start, Ziel, Etagen, Umfang und Terminwunsch.",
  },
  {
    title: "Zugänge klären",
    text: "Fotos von Treppenhaus, Türen und großen Möbeln helfen bei offenen Fragen.",
  },
  {
    title: "Leistungen abstimmen",
    text: "Montage, Packhilfe, Reinigung oder Räumung werden einzeln besprochen.",
  },
  {
    title: "Nächsten Schritt vereinbaren",
    text: "Sie erhalten eine Rückmeldung zur Machbarkeit und zum weiteren Ablauf.",
  },
] as const;

const relatedServices = [
  {
    title: "Seniorenumzug",
    text: "Wohnungswechsel mit persönlicher Abstimmung für Senioren, Angehörige und professionelle Ansprechpartner planen.",
    href: "/regensburg/seniorenumzug",
  },
  {
    title: "Klaviertransport",
    text: "Instrument, Treppen, Türen und Zielraum mit Fotos vorbereiten.",
    href: "/klaviertransport-regensburg",
  },
  {
    title: "Entrümpelung vor dem Umzug",
    text: "Dinge, die nicht mitziehen, vor dem Transport aus Keller oder Wohnung entfernen lassen.",
    href: "/regensburg/entruempelung",
  },
  {
    title: "Reinigung nach dem Auszug",
    text: "Fläche, Zustand und Übergabetermin unabhängig vom Umzug beschreiben.",
    href: "/regensburg/reinigung-nach-umzug",
  },
] as const;

const faqItems = [
  {
    q: "Welche Angaben braucht FLOXANT für einen Umzug in Regensburg?",
    a: "Wichtig sind Start, Ziel, Etagen, Aufzüge, Möbelumfang, Kartons, Laufwege und Terminwunsch. Fotos können die erste Einschätzung erleichtern.",
  },
  {
    q: "Kann ich auch einen kleinen Umzug anfragen?",
    a: "Ja. Nennen Sie die Möbelstücke, Kartons, Strecke, Etagen und den möglichen Termin. So lässt sich der passende Umfang klären.",
  },
  {
    q: "Was beeinflusst den Aufwand?",
    a: "Entscheidend sind Möbelmenge, Entfernung, Etagen, Aufzüge, Tragewege, Parkmöglichkeiten, Montagearbeiten und das Zeitfenster.",
  },
  {
    q: "Kann ich ein vorhandenes Umzugsangebot prüfen lassen?",
    a: "Ja. Senden Sie das Angebot zusammen mit Start, Ziel, Umfang und Fotos. Wir weisen auf offene Angaben und mögliche Zusatzpositionen hin.",
  },
  {
    q: "Kann der Umzug mit Reinigung verbunden werden?",
    a: "Ja. Die Reinigung wird als eigener Arbeitsschritt mit Fläche, Zustand und Übergabetermin abgestimmt.",
  },
] as const;

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: pageTitle,
        description: pageDescription,
        path: canonicalPath,
        about: ["Umzug Regensburg", "Wohnungswechsel", "kleiner Umzug"],
        potentialActions: [
          {
            name: "Umzug in Regensburg anfragen",
            target: moveContactHref,
            type: "ContactAction",
          },
          {
            name: "Vorhandenes Angebot prüfen",
            target: offerCheckHref,
            type: "ContactAction",
          },
        ],
      }),
      buildServiceJsonLd({
        name: "Umzug Regensburg",
        description: pageDescription,
        path: canonicalPath,
        serviceType: "Umzug und Möbeltransport",
        areaServed: [
          "Regensburg",
          "Landkreis Regensburg",
          "Neutraubling",
          "Lappersdorf",
          "Regenstauf",
          "Bad Abbach",
        ],
        availableLanguage: ["de", "en"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Regensburg", item: "/regensburg" },
        { name: "Umzug", item: canonicalPath },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
            aria-hidden="true"
          />
          {item}
        </div>
      ))}
    </div>
  );
}

export default function RegensburgUmzugPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <nav
              aria-label="Brotkrümelnavigation"
              className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300"
            >
              <Link href="/" className="hover:text-white">
                FLOXANT
              </Link>
              <span>/</span>
              <Link href="/regensburg" className="hover:text-white">
                Regensburg
              </Link>
              <span>/</span>
              <span className="text-white">Umzug</span>
            </nav>
            <p className="mt-7 flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Umzugshilfe Regensburg
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              {pageMeta.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
              Ob kompletter Umzug, Tragehilfe, Möbeltransport oder Montage: Senden Sie
              Start, Ziel, Etagen, Aufzug, Zimmer, Wohnfläche, Möbel, Kartons, Fotos und
              Terminwunsch. FLOXANT prüft Umfang und mögliche Zusatzleistungen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={moveContactHref}
                data-event="cta_click"
                data-city="regensburg"
                data-service="umzug"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Umzug in Regensburg anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fotos für eine Einschätzung senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Umzug telefonisch besprechen
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white/[0.07] p-5 backdrop-blur sm:p-6">
            <Truck className="h-7 w-7 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black">
              Für die erste Rückmeldung
            </h2>
            <div className="mt-5 grid gap-3">
              {heroFacts.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm font-bold leading-6 text-slate-100"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200"
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <EffortFactorsPanel
        group="umzug"
        title="Diese Angaben bestimmen den Aufwand Ihres Umzugs"
        intro="Strecke, Volumen, Zugänge und Zusatzarbeiten werden vor einer Termin- oder Preiseinordnung gemeinsam geprüft."
        limit={6}
      />

      <section className="border-b border-slate-200 bg-cyan-50 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-cyan-100 bg-white p-6">
            <p className="text-sm font-black uppercase tracking-wide text-cyan-800">Direkt beantwortet</p>
            <h2 className="mt-3 text-2xl font-black">Was kostet eine Umzugshilfe in Regensburg?</h2>
            <p className="mt-4 font-semibold leading-8 text-slate-700">Ohne Umfang und Zugänge lässt sich kein belastbarer Preis nennen. Entscheidend sind Möbel und Kartons, Strecke, Etagen, Aufzüge, Laufwege, die Parksituation, gewünschte Trage-, Pack- oder Montagearbeiten und der Termin. Fotos und eine kurze Inventarliste helfen bei der Prüfung.</p>
          </article>
          <article id="moebelmontage" className="scroll-mt-28 rounded-lg border border-cyan-100 bg-white p-6">
            <p className="text-sm font-black uppercase tracking-wide text-cyan-800">Möbelmontage beim Umzug in Regensburg</p>
            <h2 className="mt-3 text-2xl font-black">Kann FLOXANT Möbel abbauen und wieder aufbauen?</h2>
            <p className="mt-4 font-semibold leading-8 text-slate-700">Möbelabbau vor dem Transport und Wiederaufbau am Ziel können angefragt werden. Nennen Sie die betroffenen Schränke, Betten oder Tische, Maße, Besonderheiten und vorhandene Anleitungen; Fotos zeigen Verbindungen und Zustand. Anschlüsse oder Arbeiten außerhalb der vereinbarten Möbelmontage sind nicht automatisch enthalten.</p>
            <Link href={furnitureAssemblyHref} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white">
              Möbelmontage anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Für wen eignet sich der Service?
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Welcher Wechsel steht an?
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {moveTypes.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-10">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Umfang
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Welche Leistungen können dazugehören?
            </h2>
            <div className="mt-6">
              <CheckList items={serviceScope} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Benötigte Angaben
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              Das sollten wir vorab wissen.
            </h2>
            <div className="mt-6">
              <CheckList items={neededDetails} />
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Aufwandsfaktoren
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              Davon hängt die Einschätzung ab.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Ein verlässlicher Preis braucht mehr als nur die Strecke. Je
              genauer Menge und Zugänge beschrieben sind, desto weniger
              Rückfragen entstehen.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {effortFactors.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href={offerCheckHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700"
            >
              Vorhandenes Angebot prüfen
              <FileSearch className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Nächster Schritt
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Vom ersten Kontakt zur abgestimmten Planung.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
            Ergänzende Leistungen
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Nur ergänzen, was wirklich dazugehört.
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-300">
            Transport, Räumung und Reinigung bleiben getrennte Arbeitsschritte.
            So erkennen Sie, welche Angaben für welchen Teil benötigt werden.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:bg-white/[0.1]"
              >
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                  {service.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                  Mehr erfahren
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Häufige Fragen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Antworten vor Ihrer Anfrage.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Noch etwas offen? Senden Sie Ihre Eckdaten oder rufen Sie uns an.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={moveContactHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white"
              >
                Umzug anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-950"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phone}
              </a>
            </div>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
