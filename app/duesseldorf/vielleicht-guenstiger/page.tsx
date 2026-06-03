import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  KeyRound,
  MapPin,
  RotateCcw,
  Store,
  UploadCloud,
} from "lucide-react";

import { CheaperAlternativeForm } from "@/components/CheaperAlternativeForm";
import { DuesseldorfCleaningBuyerJourney } from "@/components/duesseldorf/DuesseldorfCleaningBuyerJourney";
import { DuesseldorfCleaningDecisionGuide } from "@/components/duesseldorf/DuesseldorfCleaningDecisionGuide";
import {
  buildDuesseldorfCleaningWhatsAppHref,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningProviderJsonLd,
  buildDuesseldorfServiceJsonLd,
} from "@/lib/duesseldorf-cleaning";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

const path = "/duesseldorf/vielleicht-guenstiger";
const title = "Reinigungsangebot Düsseldorf prüfen lassen";
const description =
  "Reinigungsangebot, Screenshot oder Preis aus Düsseldorf senden: FLOXANT prüft Kosten, Umfang, Turnus, Fotos, Termin und mögliche Alternative ohne Preisgarantie.";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Reinigungsangebot prüfen Düsseldorf | Vielleicht günstiger | FLOXANT",
    description,
  });
}

const areas = [
  "Altstadt",
  "Stadtmitte",
  "Pempelfort",
  "Bilk",
  "Oberkassel",
  "MedienHafen",
  "Derendorf",
  "Neuss",
  "Ratingen",
  "Meerbusch",
  "Mettmann",
  "Duisburg",
] as const;

const faqItems = [
  {
    q: "Kann FLOXANT ein Reinigungsangebot aus Düsseldorf fachlich einordnen?",
    a: "Ja. Sie können ein vorhandenes Angebot, Fotos oder die wichtigsten Eckdaten senden. FLOXANT prüft Preis, Leistungsumfang, Fläche, Turnus, Zeitfenster, Zugang und offene Punkte aus praktischer Sicht eines Reinigungsdienstleisters.",
  },
  {
    q: "Kann eine Alternative wirtschaftlicher sein?",
    a: "Möglich, aber nicht garantiert. Entscheidend sind Fläche, Zustand, Turnus, Zeitfenster, Zugang, Fotos und Kapazität. Manchmal ist eine wirtschaftlichere Lösung möglich, manchmal zeigt die Prüfung, dass der vorhandene Preis nachvollziehbar ist.",
  },
  {
    q: "Gilt diese Seite für Neuss, Ratingen, Meerbusch, Mettmann und Duisburg?",
    a: "Ja, Reinigungsangebote aus Düsseldorf und der nahen Umgebung können geprüft werden, wenn Ort, Objekt, Fotos, Termin und Umfang klar beschrieben sind.",
  },
  {
    q: "Prüft FLOXANT darüber auch Umzüge in Düsseldorf?",
    a: "Nein. Düsseldorf bleibt bei FLOXANT für Reinigung und Entsorgung getrennt. Umzug, Transport und Büroumzug werden hier nicht als Düsseldorfer Leistung beworben.",
  },
  {
    q: "Kann FLOXANT beim Wechsel der Putzfirma helfen?",
    a: "Ja, wenn Objektart, Fläche, Turnus, Zeitfenster, Schlüsselweg und vorhandener Leistungsumfang klar sind. FLOXANT prüft dann praktisch, ob ein sauberer Wechsel oder ein besser passender Reinigungsplan möglich ist.",
  },
] as const;

const offerCheckIntentItems = [
  {
    query: "Reinigungsangebot Düsseldorf prüfen",
    title: "Angebot vor der Zusage einordnen lassen",
    text: "Senden Sie Angebot, Screenshot oder Preisangaben zusammen mit Stadtteil, Fläche, Turnus, Zugang und Fotos.",
    href: "#guenstiger-form",
    cta: "Angebot senden",
    external: false,
  },
  {
    query: "Reinigung Kosten Düsseldorf vergleichen",
    title: "Preis, Umfang und offene Punkte sauber trennen",
    text: "Ein Preis ist erst verständlich, wenn Leistung, Zeitfenster, Zustand und Zusatzpunkte klar sind.",
    href: "#kosten-check",
    cta: "Kostenpunkte prüfen",
    external: false,
  },
  {
    query: "Putzfirma Angebot per WhatsApp prüfen",
    title: "Fotos und Angebot schnell per WhatsApp vorbereiten",
    text: "Gerade bei unklaren Angeboten helfen Fotos, PDF, Screenshot, Objektart und Budget für eine schnelle Rückfrage.",
    href: buildDuesseldorfCleaningWhatsAppHref(
      "Hallo FLOXANT Reinigung Düsseldorf, ich möchte ein Reinigungsangebot prüfen lassen. Angebot/Screenshot, Fotos, Fläche, Stadtteil, Termin und Budget kann ich senden.",
    ),
    cta: "WhatsApp öffnen",
    external: true,
  },
  {
    query: "Alternative Reinigungsfirma Düsseldorf",
    title: "Alternative nur prüfen, wenn Umfang und Kapazität passen",
    text: "FLOXANT ist kein Vergleichsportal. Geprüft wird, ob eine klarere oder passendere Alternative realistisch möglich ist.",
    href: "/duesseldorf/reinigung",
    cta: "Reinigung ansehen",
    external: false,
  },
] as const;

const savingsLevers = [
  {
    title: "Turnus statt Pauschale prüfen",
    text: "Bei Büros, Kanzleien, Praxen und Hausverwaltungen kann der richtige Rhythmus wichtiger sein als ein niedriger Quadratmeterpreis.",
    Icon: CalendarClock,
  },
  {
    title: "Leistungslücken sichtbar machen",
    text: "Sanitär, Küche, Glas, Müllraum, Kellerflur, Treppenhaus, Sonderflächen und Nachweise sollten nicht erst nach der Zusage auftauchen.",
    Icon: ClipboardList,
  },
  {
    title: "Schlüsselweg und Fotodoku nutzen",
    text: "Wenn Zugang, Rückmeldung und Fotos geklärt sind, wird die Reinigung planbarer und der Kunde muss nicht ständig vor Ort sein.",
    Icon: KeyRound,
  },
  {
    title: "Putzfirma-Wechsel ordnen",
    text: "FLOXANT prüft, ob ein Wechsel mit Bestandsangebot, Objektzustand, Turnus und Starttermin realistisch sauber aufgesetzt werden kann.",
    Icon: RotateCcw,
  },
] as const;

const highValueFunnels = [
  {
    title: "Büro, Kanzlei oder Praxis",
    query: "Büroreinigung Angebot Düsseldorf prüfen",
    text: "Fläche, Raumliste, Sanitär, Küche, Zeitfenster, Schlüsselweg und Turnus sauber vergleichen.",
    href: "/duesseldorf/bueroreinigung",
    Icon: Building2,
  },
  {
    title: "Hausverwaltung / WEG",
    query: "Hausverwaltung Reinigung Düsseldorf Angebot",
    text: "Treppenhaus, Eingänge, Kellerflur, Müllraum, Beschwerden, Fotos und wiederkehrende Reinigung prüfen.",
    href: "/duesseldorf/hausverwaltung-reinigung",
    Icon: KeyRound,
  },
  {
    title: "Laden / Showroom",
    query: "Ladenreinigung Düsseldorf Preis prüfen",
    text: "Verkaufsfläche, Glas, Boden, Öffnungszeiten und Reinigung vor Geschäftsstart einordnen.",
    href: "/duesseldorf/ladenreinigung",
    Icon: Store,
  },
  {
    title: "Mieterwechsel / Übergabe",
    query: "Endreinigung Düsseldorf Angebot prüfen",
    text: "Wohnung, Übergabetermin, Schlüssel, Fotos, Restpunkte und mögliche Entsorgung getrennt prüfen.",
    href: "/duesseldorf/endreinigung",
    Icon: ClipboardList,
  },
] as const;

const duesseldorfOfferGuides = [
  {
    title: "Grundreinigung in Düsseldorf",
    text: "Wann ein Angebot für Grundreinigung wirklich passt und welche Fotos, Flächen und Terminangaben helfen.",
    href: "/blog/grundreinigung-duesseldorf-angebot-kosten-pruefen",
  },
  {
    title: "Büro- und Praxisreinigung",
    text: "Wie Firmen, Kanzleien und Praxisflächen Turnus, Raumliste, Zugang und Preisrahmen sauber einordnen.",
    href: "/blog/buero-praxisreinigung-duesseldorf-angebot",
  },
  {
    title: "Treppenhausreinigung für Hausverwaltung",
    text: "Worauf Hausverwaltungen und WEGs bei Etagen, Eingängen, Kellerflur, Müllbereich und Turnus achten sollten.",
    href: "/blog/treppenhausreinigung-duesseldorf-hausverwaltung-angebot",
  },
] as const;

const offerCheckSteps = [
  "Angebot oder Screenshot senden",
  "Fläche, Objektart, Stadtteil und Turnus ergänzen",
  "Offene Leistungen und Zusatzkosten markieren",
  "FLOXANT prüft mögliche Alternative ohne Preisgarantie",
] as const;

export default function DuesseldorfVielleichtGuenstigerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Angebot prüfen Düsseldorf", item: path },
      ]),
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Angebot prüfen Düsseldorf",
          "Reinigungsangebot Düsseldorf prüfen",
          "Reinigungsangebot wirtschaftlich prüfen",
          "Düsseldorf Reinigung Alternative",
        ],
        potentialActions: [{ name: "Angebot hochladen", target: `${path}#guenstiger-form`, type: "ContactAction" }],
      }),
      buildDuesseldorfCleaningProviderJsonLd(),
      buildDuesseldorfServiceJsonLd({
        name: "Reinigungsangebot Düsseldorf prüfen",
        description:
          "FLOXANT prüft Reinigungsangebote in Düsseldorf und Umgebung nach Preis, Leistungsumfang, Fläche, Turnus, Fotos, Zugang und Termin.",
        path,
        serviceType: "Angebotsprüfung für Reinigung Düsseldorf",
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"],
      }),
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#offer-check-intents`,
        name: "Kaufnahe Suchabsichten für Reinigungsangebote in Düsseldorf",
        itemListElement: offerCheckIntentItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.query,
          url: item.href.startsWith("#")
            ? `https://www.floxant.de${path}${item.href}`
            : item.href.startsWith("http")
              ? item.href
              : `https://www.floxant.de${item.href}`,
          item: {
            "@type": "Thing",
            name: item.title,
            description: item.text,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#high-value-funnels`,
        name: "Düsseldorfer Reinigungsangebote mit hohem Kaufinteresse",
        itemListElement: highValueFunnels.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.query,
          url: `https://www.floxant.de${item.href}`,
          item: {
            "@type": "Service",
            name: item.title,
            description: item.text,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#offer-check-guides`,
        name: "Ratgeber zur Angebotsprüfung für Reinigung in Düsseldorf",
        itemListElement: duesseldorfOfferGuides.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `https://www.floxant.de${item.href}`,
          item: {
            "@type": "Article",
            headline: item.title,
            description: item.text,
          },
        })),
      },
    ],
  };
  const faqJsonLd = buildFaqJsonLd(faqItems);

  return (
    <main className="px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="mx-auto grid w-full min-w-0 max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0 rounded-[0.95rem] border border-white/10 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(7,17,29,0.28)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-emerald-100">
            <BadgeEuro className="h-4 w-4" />
            Düsseldorf Angebot prüfen
          </div>
          <h1 className="duesseldorf-offer-title mt-6 max-w-full break-words text-[2rem] font-black leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl xl:text-7xl">
            Vielleicht günstiger? Erst Angebot prüfen lassen.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200">
            Wenn Sie bereits ein Angebot für Büroreinigung, Hotelreinigung, Grundreinigung, Hausverwaltung oder Wohnungsreinigung in Düsseldorf haben, laden Sie es hoch oder senden Sie die Eckdaten. FLOXANT prüft Preis, Turnus, Leistung, Stadtteil, Zugang und Ablauf und klärt, ob eine klarere oder wirtschaftlichere Alternative möglich ist.
          </p>
          <div className="mt-7 grid min-w-0 gap-3">
            {[
              "Angebot, Screenshot oder PDF sicher übermitteln",
              "Fläche, Objektart, Turnus, Stadtteil, Zugang, Zeitfenster und Fotos ergänzen",
              "FLOXANT prüft Preishebel, Umfang und eine mögliche Alternative ohne Preisgarantie",
            ].map((item) => (
              <div key={item} className="flex min-w-0 gap-3 rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-slate-100">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#guenstiger-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
              <UploadCloud className="h-4 w-4" />
              Angebot hochladen
            </a>
            <Link href="/duesseldorf/reinigung" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-slate-700 bg-slate-900/75 px-5 text-sm font-bold !text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-slate-800">
              Reinigung Düsseldorf
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <CheaperAlternativeForm
          defaultRegion="duesseldorf"
          defaultService="reinigung"
          defaultCityOrZip="Düsseldorf"
          defaultMessage="Ich habe ein Reinigungsangebot und möchte prüfen lassen, ob FLOXANT eine wirtschaftlichere, klarere oder passendere Alternative anbieten kann."
          sourceComponent="duesseldorf_cheaper_alternative_page"
          landingPageFallback={path}
        />
      </section>

      <div className="mx-auto mt-8 max-w-7xl">
        <DuesseldorfCleaningBuyerJourney
          serviceLabel="Reinigungsangebot Düsseldorf prüfen"
          compact
          focusHrefs={[
            "/duesseldorf/vielleicht-guenstiger",
            "/duesseldorf/reinigung",
            "/duesseldorf/gewerbereinigung",
            "/duesseldorf/bueroreinigung",
            "/duesseldorf/grundreinigung",
            "/duesseldorf/wohnungsreinigung",
            "/duesseldorf/entsorgung",
          ]}
        />
        <DuesseldorfCleaningDecisionGuide
          serviceLabel="Reinigungsangebot Düsseldorf prüfen"
          compact
          focusHrefs={[
            "/duesseldorf/vielleicht-guenstiger",
            "/duesseldorf/reinigung#kontakt",
            "/duesseldorf/bueroreinigung",
            "/duesseldorf/sonderreinigung",
          ]}
        />
      </div>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">
            Vielleicht günstiger, aber sauber
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
            FLOXANT prüft nicht nur den Preis, sondern den Preishebel.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Ein Reinigungsangebot wird oft teuer oder unklar, weil Turnus, Flächen, Zugang, Sonderbereiche oder
            Nachweise nicht sauber getrennt sind. Genau dort setzt der FLOXANT-Check an: erst verstehen, dann
            eine mögliche Alternative prüfen.
          </p>
          <div className="mt-5 grid gap-2">
            {offerCheckSteps.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-[0.85rem] border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-950">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          {savingsLevers.map((item) => {
            const Icon = item.Icon;
            return (
              <article key={item.title} className="rounded-[0.95rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <Icon className="h-5 w-5 text-emerald-700" />
                <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="high-value-funnels" className="mx-auto mt-8 max-w-7xl rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_22px_60px_rgba(15,23,42,0.18)]">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-emerald-200">
              Passender Reinigungsfall in Düsseldorf
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-white">
              Wählen Sie den Fall, der Ihrem Angebot am nächsten kommt.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Ob Büro, Hausverwaltung, Ladenfläche oder Übergabe: Sie senden Angebot, Objektart, Stadtteil,
              Fläche und Turnus. FLOXANT prüft, ob Umfang und Preis zusammenpassen und ob eine Alternative
              realistisch ist.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {highValueFunnels.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[0.9rem] border border-white/10 bg-white/[0.08] p-4 transition hover:-translate-y-0.5 hover:border-emerald-300/50 hover:bg-white/[0.12]"
                  data-event="hero_cta_click"
                >
                  <Icon className="h-5 w-5 text-emerald-200" />
                  <div className="mt-3 text-[10px] font-black uppercase tracking-normal text-emerald-100">
                    {item.query}
                  </div>
                  <h3 className="mt-2 text-base font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200/85">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-emerald-200">
                    Bereich öffnen
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">
              Ratgeber für Ihr Angebot
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              Mehr Sicherheit vor der Zusage.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-[0.75rem] border border-slate-200 px-4 py-2 text-sm font-black text-slate-900 transition hover:border-emerald-300 hover:text-emerald-800"
          >
            Alle Ratgeber
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {duesseldorfOfferGuides.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
              data-event="hero_cta_click"
            >
              <h3 className="text-base font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-emerald-800">
                Ratgeber lesen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[0.76fr_1.24fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">
            Kaufnahe Suchfragen
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
            Wenn Kunden vor der Zusage noch unsicher sind
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Viele suchen nicht nach einer langen Erklärung, sondern nach einer zweiten
            Einordnung: Ist der Preis nachvollziehbar, fehlen Leistungen, lohnt sich eine
            Alternative und welche Fotos werden gebraucht?
          </p>
        </article>
        <div className="grid gap-3 md:grid-cols-2">
          {offerCheckIntentItems.map((item) => {
            const className =
              "group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(5,150,105,0.12)]";
            const content = (
              <>
                <div className="text-[11px] font-black uppercase tracking-normal text-emerald-800">
                  {item.query}
                </div>
                <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-emerald-800">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </>
            );

            return item.external ? (
              <a
                key={item.query}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                data-event="hero_cta_click"
                data-region="duesseldorf"
              >
                {content}
              </a>
            ) : (
              <Link
                key={item.query}
                href={item.href}
                className={className}
                data-event="hero_cta_click"
                data-region="duesseldorf"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">Düsseldorf und Umgebung</div>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
            Stadtteil, Zugang und Nähe entscheiden mit
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Bei Reinigung zählt nicht nur der Quadratmeterpreis. Entscheidend sind Objektart, gewünschter Qualitätsstandard, Turnus, Zugang, Boden- und Sanitärflächen, Zeitfenster und Dokumentation. Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen oder Derendorf haben andere Park- und Zugangslogik als Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg. Deshalb prüft FLOXANT Angebot, Ort, Termin, Fotos und Umfang zusammen.
          </p>
        </article>
        <article className="rounded-[0.95rem] border border-emerald-200 bg-emerald-50 p-6">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-800">Düsseldorf und nahe Orte</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span key={area} className="rounded-[0.75rem] border border-emerald-200 bg-white px-3 py-2 text-sm font-bold text-emerald-950">
                <MapPin className="mr-1 inline h-3.5 w-3.5" />
                {area}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section id="kosten-check" className="mx-auto mt-8 max-w-7xl rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-slate-500">
          <FileSearch className="h-4 w-4" />
          Wichtig
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Diese Seite ist für Düsseldorfer Reinigungsangebote gebaut. Sie ersetzt keine Rechtsberatung, garantiert keinen niedrigeren Preis und bewertet keine andere Firma. Sie schafft einen klaren Anfrageweg, damit Unternehmen, Verwaltungen, Hotels und Privatkunden FLOXANT mit Angebot, Fotos, Objektangaben und Preisrahmen kontaktieren können.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faqItems.map((item) => (
            <details key={item.q} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
