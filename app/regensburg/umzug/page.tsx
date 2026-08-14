import type { Metadata } from "next";
import Link from "next/link";
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

import { company } from "@/lib/company";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const canonicalPath = "/regensburg/umzug";
const moveContactHref =
  "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo";
const offerCheckHref =
  "/kontakt?service=umzug&city=regensburg&intent=umzugsangebot-pruefen&source=seo";
const pageTitle = "Umzug Regensburg anfragen - Start, Ziel und Termin klären";
const pageDescription =
  "Umzug in Regensburg geplant? Start, Ziel, Etage, Umfang und Termin beschreiben. FLOXANT prüft die Anfrage anhand der genannten Eckdaten.";
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
    title: pageTitle,
    description: pageDescription,
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
    text: "Wenn Schlüsselübergabe oder Nachmietertermin feststehen, planen wir Reihenfolge und Zeitfenster gemeinsam.",
    icon: Clock3,
  },
] as const;

const neededDetails = [
  "vollständiger Start- und Zielort",
  "Etage und Aufzug an beiden Adressen",
  "Möbelmenge, Kartons und große Einzelstücke",
  "Treppen, Laufwege und mögliche Ladeplätze",
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
          { name: "Umzug in Regensburg anfragen", target: moveContactHref, type: "ContactAction" },
          { name: "Vorhandenes Angebot prüfen", target: offerCheckHref, type: "ContactAction" },
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

export default function RegensburgUmzugPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300">
              <Link href="/" className="hover:text-white">FLOXANT</Link>
              <span>/</span>
              <Link href="/regensburg" className="hover:text-white">Regensburg</Link>
              <span>/</span>
              <span className="text-white">Umzug</span>
            </nav>
            <p className="mt-7 flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Umzug in Regensburg
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Umzug in Regensburg klar vorbereiten
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Senden Sie Start, Ziel, Etagen, Möbelumfang und Terminwunsch. Wir klären Zugänge,
              gewünschte Leistungen und den passenden Ablauf mit Ihnen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={moveContactHref}
                data-event="cta_click"
                data-city="regensburg"
                data-service="umzug"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
              >
                Umzug anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phone}
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white/[0.07] p-5 backdrop-blur sm:p-6">
            <Truck className="h-7 w-7 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black">Für die erste Rückmeldung</h2>
            <div className="mt-5 grid gap-3">
              {heroFacts.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm font-bold leading-6 text-slate-100">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Passende Umzüge</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Welcher Wechsel steht an?
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {moveTypes.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Ihre Angaben</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Das sollten wir vorab wissen.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {neededDetails.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Aufwand</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Diese Punkte wirken sich aus.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Ein verlässlicher Preis braucht mehr als nur die Strecke. Je genauer Menge und
              Zugänge beschrieben sind, desto weniger Rückfragen entstehen.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {effortFactors.map((item) => (
                <span key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
            <Link href={offerCheckHref} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
              Vorhandenes Angebot prüfen
              <FileSearch className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Ablauf</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Vom ersten Kontakt zur abgestimmten Planung.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">Ergänzende Leistungen</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
            Nur ergänzen, was wirklich dazugehört.
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-300">
            Transport, Räumung und Reinigung bleiben getrennte Arbeitsschritte. So erkennen Sie,
            welche Angaben für welchen Teil benötigt werden.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedServices.map((service) => (
              <Link key={service.href} href={service.href} className="group rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:bg-white/[0.1]">
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{service.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Antworten vor Ihrer Anfrage.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Noch etwas offen? Senden Sie Ihre Eckdaten oder rufen Sie uns an.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={moveContactHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white">
                Umzug anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-black text-slate-950">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phone}
              </a>
            </div>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
