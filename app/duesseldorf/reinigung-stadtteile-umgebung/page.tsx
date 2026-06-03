import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  Clock3,
  Languages,
  MapPin,
  MessageCircle,
  Navigation,
  Send,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SNIPPET_ANSWERS,
  DUESSELDORF_CLEANING_SERVICES,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningProviderJsonLd,
  buildDuesseldorfCleaningWhatsAppHref,
  buildDuesseldorfServiceJsonLd,
} from "@/lib/duesseldorf-cleaning";
import {
  getDuesseldorfCleaningInternationalAliases,
  type SearchIntentAliasLanguage,
} from "@/lib/search-intent-aliases";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

const path = "/duesseldorf/reinigung-stadtteile-umgebung";
const title = "Reinigungsfirma Düsseldorf für Stadtteile und Umgebung";
const description =
  "Reinigungsfirma Düsseldorf für Büro, Hotel, Wohnung und Objekt: Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, Neuss, Ratingen, Meerbusch, Mettmann und Duisburg.";

const internationalLanguageLabels: Record<SearchIntentAliasLanguage, string> = {
  en: "Englisch",
  ru: "Russisch",
  zh: "Chinesisch",
  ko: "Koreanisch",
};

function htmlLangForAlias(language: SearchIntentAliasLanguage) {
  return language === "zh" ? "zh-Hans" : language;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Reinigungsfirma Düsseldorf Stadtteile & Umgebung | FLOXANT",
    description,
  });
}

const districtGroups = [
  {
    title: "Innenstadt und zentrale Geschäftslagen",
    areas: ["Altstadt", "Stadtmitte", "Pempelfort", "Carlstadt", "Derendorf", "Golzheim"],
    text: "In zentralen Geschäftslagen zählen planbare Zeitfenster, diskreter Zugang, Lieferzone, Etage, Hausordnung und ein verlässlicher Ansprechpartner. Besonders bei Büros, Kanzleien, Hotels und Übergabereinigung entscheidet diese Vorprüfung über Qualität, Ablauf und Preisrahmen.",
  },
  {
    title: "Bilk, MedienHafen und linksrheinische Objekte",
    areas: ["Bilk", "Unterbilk", "MedienHafen", "Oberkassel", "Lörick", "Heerdt"],
    text: "Hier treffen Wohnungen, Apartments, Büros, Praxen, Hotellerie und Gewerbeflächen häufig aufeinander. Für eine seriöse Einschätzung braucht FLOXANT Fläche, Nutzung, Turnus, Boden- und Sanitärbereiche, Fotos und den gewünschten Qualitätsstandard.",
  },
  {
    title: "Süd, Ost und anspruchsvolle Wohnlagen",
    areas: ["Benrath", "Eller", "Gerresheim", "Grafenberg", "Lierenfeld", "Kaiserswerth"],
    text: "Bei Wohnungsreinigung, Endreinigung, Kellerreinigung und Treppenhausreinigung zählen Zustand, Zugang, Parkmöglichkeit, Keller- und Nebenräume sowie der gewünschte Fertigstellungstermin. Fotos verhindern Missverständnisse und beschleunigen die Rückmeldung.",
  },
  {
    title: "Nahe Umgebung mit Düsseldorfer Bezug",
    areas: ["Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg", "Hilden", "Erkrath"],
    text: "Anfragen aus der Umgebung werden nach Ort, Objektart, Termin, Fotos, Zugang und Kapazität geprüft. FLOXANT bleibt dabei klar auf Reinigung und Düsseldorfer Entsorgung begrenzt; Umzug und Transport werden nicht als Düsseldorfer Leistung beworben.",
  },
] as const;

const localDecisionItems = [
  {
    title: "Ist mein Stadtteil passend?",
    text: "Ja, wenn die Anfrage in Düsseldorf oder direkter Umgebung liegt und Objektart, Zugang, Fläche, Termin und Fotos genannt werden können.",
    href: "/duesseldorf/reinigung#kontakt",
    cta: "Stadtteil senden",
  },
  {
    title: "Welche Lageangaben helfen wirklich?",
    text: "PLZ, Stadtteil, Etage, Aufzug, Parkmöglichkeit, Lieferzone, Hausordnung und Zeitfenster machen die Rückmeldung konkreter.",
    href: "/duesseldorf/reinigung#kontakt",
    cta: "Angaben prüfen",
  },
  {
    title: "Was kostet Reinigung in der Umgebung?",
    text: "Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg werden nach Anfahrt, Objektart, Umfang und Kapazität geprüft.",
    href: "/duesseldorf/vielleicht-guenstiger",
    cta: "Preisrahmen prüfen",
  },
] as const;

const localMobileShortcuts = [
  { href: "#lokale-klickfaelle", label: "Nähe", note: "Suchwege" },
  { href: "#stadtteil-schnellcheck", label: "Ort", note: "Zugang" },
  { href: "#lokale-schnellantworten", label: "FAQ", note: "kurz" },
  { href: "#stadtteil-anfrage", label: "Senden", note: "Fotos" },
] as const;

const localClickCaseItems = [
  {
    query: "Putzfirma in meiner Nähe Düsseldorf",
    title: "Nähe heißt: Stadtteil plus Objekt",
    answer:
      "Bitte Stadtteil oder PLZ, Objektart, Fläche, Etage, Aufzug und Parkmöglichkeit nennen. So wird aus einer Nähe-Suche eine prüfbare Anfrage.",
    href: "#stadtteil-anfrage",
    cta: "Nähe-Anfrage vorbereiten",
  },
  {
    query: "Reinigung heute oder diese Woche Düsseldorf",
    title: "Terminfenster ehrlich prüfen",
    answer:
      "Kurzfristige Reinigung hängt an Objektumfang, Fotos, Zugang und freiem Zeitfenster. Ein konkretes Datum hilft mehr als nur 'schnell'.",
    href: "/duesseldorf/reinigung#kontakt",
    cta: "Termin mit Fotos senden",
  },
  {
    query: "Reinigungsfirma Altstadt, Stadtmitte, Pempelfort",
    title: "Zentrale Lagen brauchen Zugangsdaten",
    answer:
      "In zentralen Lagen sind Lieferzone, Parken, Hausordnung, Etage, Aufzug und Ansprechpartner wichtig, besonders für Büro, Kanzlei, Hotel und Praxis.",
    href: "#stadtteil-schnellcheck",
    cta: "Stadtteil prüfen",
  },
  {
    query: "Wohnungsreinigung Bilk, Oberkassel, Derendorf",
    title: "Wohnung, Auszug oder Übergabe sauber trennen",
    answer:
      "Für Wohnungen zählen Zustand, Bad, Küche, Böden, Fotos, Schlüsselweg, Termin und ob Endreinigung oder regelmäßige Reinigung gemeint ist.",
    href: "/duesseldorf/wohnungsreinigung",
    cta: "Wohnungsreinigung öffnen",
  },
  {
    query: "Reinigung Neuss, Ratingen, Meerbusch",
    title: "Umgebung nach Machbarkeit einordnen",
    answer:
      "Nahe Orte werden mit Ort, Strecke, Objektart, Fotos, Zugang und Kapazität geprüft. Es gibt keine pauschale Zusage ohne Objektdaten.",
    href: "#stadtteil-anfrage",
    cta: "Umgebung senden",
  },
  {
    query: "Reinigung per WhatsApp mit Fotos Düsseldorf",
    title: "Fotos verkürzen Rückfragen",
    answer:
      "Bilder von Eingang, Bad, Küche, Boden, Sanitärbereichen, Laufwegen und besonderen Stellen helfen bei Aufwand, Termin und Preisrahmen.",
    href: "#stadtteil-anfrage",
    cta: "Fotoangaben ansehen",
  },
] as const;

const localSearchAnswerItems = [
  {
    query: "Reinigung Altstadt oder Stadtmitte Düsseldorf",
    title: "Zentrale Lage braucht klare Zugangsdaten",
    answer:
      "Für Altstadt, Stadtmitte, Pempelfort, Carlstadt und Derendorf sind Lieferzone, Parken, Etage, Aufzug, Zeitfenster und Ansprechpartner besonders wichtig.",
    href: "/duesseldorf/b2b-reinigung",
  },
  {
    query: "Reinigung Bilk, MedienHafen oder Oberkassel",
    title: "Gemischte Objekte sauber einordnen",
    answer:
      "Bei Wohnung, Büro, Hotel, Praxis oder Gewerbefläche zählen Nutzung, Boden, Sanitär, Flächenangabe, Fotos und gewünschter Standard.",
    href: "/duesseldorf/reinigung",
  },
  {
    query: "Reinigung Neuss, Ratingen oder Meerbusch",
    title: "Umgebung nach Machbarkeit prüfen",
    answer:
      "Nahe Orte werden geprüft, wenn Ort, Objektart, Termin, Fotos, Zugang und Umfang klar sind. Düsseldorf bleibt Reinigung und Entsorgung.",
    href: "/duesseldorf/reinigung#kontakt",
  },
] as const;

const serviceAreaClickLinks = [
  { label: "Büroreinigung Stadtmitte", href: "/duesseldorf/bueroreinigung" },
  { label: "Hotelreinigung MedienHafen", href: "/duesseldorf/hotelreinigung" },
  { label: "Praxisreinigung Pempelfort", href: "/duesseldorf/praxisreinigung" },
  { label: "Kanzleireinigung Carlstadt", href: "/duesseldorf/kanzleireinigung" },
  { label: "Wohnungsreinigung Bilk", href: "/duesseldorf/wohnungsreinigung" },
  { label: "Endreinigung Oberkassel", href: "/duesseldorf/endreinigung" },
  { label: "Treppenhausreinigung Derendorf", href: "/duesseldorf/treppenhausreinigung" },
  { label: "Entsorgung Düsseldorf Umgebung", href: "/duesseldorf/entsorgung" },
] as const;

const localRequestFields = [
  {
    label: "Stadtteil oder PLZ",
    value: "Zum Beispiel Altstadt, Stadtmitte, Bilk, Oberkassel, Pempelfort, Neuss, Ratingen oder Meerbusch.",
    Icon: MapPin,
  },
  {
    label: "Objekt und Nutzung",
    value: "Wohnung, Büro, Praxis, Kanzlei, Hotel, Treppenhaus, Keller oder Gewerbefläche mit grober Fläche nennen.",
    Icon: Building2,
  },
  {
    label: "Zugang und Parken",
    value: "Etage, Aufzug, Schlüsselweg, Lieferzone, Parkmöglichkeit, Hausordnung und Ansprechpartner ergänzen.",
    Icon: Navigation,
  },
  {
    label: "Termin und Turnus",
    value: "Wunschdatum, Uhrzeit, kurzfristiger Bedarf, wiederkehrender Turnus oder Übergabetermin kurz beschreiben.",
    Icon: Clock3,
  },
  {
    label: "Fotos und Zustand",
    value: "Fotos von Eingang, Laufweg, Bad, Küche, Böden, Sanitärbereichen und besonderen Stellen mitsenden.",
    Icon: Camera,
  },
  {
    label: "Budget oder Angebot",
    value: "Falls vorhanden: Preisrahmen, Vergleichsangebot oder offene Punkte angeben, damit die Rückmeldung konkreter wird.",
    Icon: Send,
  },
] as const;

const internationalSearchAliases = getDuesseldorfCleaningInternationalAliases();
const visibleSnippetAnswers = DUESSELDORF_CLEANING_SNIPPET_ANSWERS.slice(0, 3);

const faqItems = [
  {
    q: "Welche Düsseldorfer Stadtteile sind für Reinigung relevant?",
    a: "FLOXANT prüft Reinigungsanfragen unter anderem für Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen, Derendorf, Benrath, Gerresheim und Kaiserswerth. Wichtig sind Objektart, Fläche, Zustand, Turnus und Zugang.",
  },
  {
    q: "Gilt das auch für Neuss, Ratingen, Meerbusch, Mettmann und Duisburg?",
    a: "Ja, Anfragen aus der direkten Umgebung können geprüft werden, wenn Objektart, Ort, Fläche, Termin, Zugang und Fotos vorliegen.",
  },
  {
    q: "Warum ist der Stadtteil für Angebot und Ablauf wichtig?",
    a: "Parkmöglichkeit, Lieferzone, Etage, Aufzug, Hausordnung, Zeitfenster, Objektart und gewünschter Standard verändern den Aufwand. Deshalb kalkuliert FLOXANT nicht pauschal nach Stadtname, sondern nach prüfbaren Objektdaten.",
  },
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Düsseldorf ist bei FLOXANT für Reinigung und Entsorgung positioniert. Umzug, Transport und Büroumzug bleiben getrennt.",
  },
] as const;

export default function DuesseldorfStadtteileUmgebungPage() {
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    "Hallo FLOXANT Reinigung Düsseldorf, ich möchte eine Reinigung nach Stadtteil/Umgebung anfragen. Stadtteil/Ort, Objektart, Fläche, Zugang, Termin und Fotos kann ich senden.",
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Stadtteile und Umgebung", item: path },
      ]),
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Reinigung Düsseldorf Stadtteile",
          "Reinigung Neuss",
          "Reinigung Ratingen",
          "Reinigung Meerbusch",
          "Reinigung Mettmann",
          "Reinigung Duisburg",
        ],
        potentialActions: [{ name: "Düsseldorfer Reinigung anfragen", target: "/duesseldorf/reinigung#kontakt", type: "ContactAction" }],
      }),
      buildDuesseldorfCleaningProviderJsonLd(),
      buildDuesseldorfServiceJsonLd({
        name: "Reinigung Düsseldorf und Umgebung",
        description:
          "Reinigungsanfragen in Düsseldorf, Stadtteilen und naher Umgebung nach Objektart, Fläche, Zugang, Fotos und Zeitfenster prüfen lassen.",
        path,
        serviceType: "Reinigung Düsseldorf Stadtteile und Umgebung",
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"],
      }),
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#district-groups`,
        name: "Düsseldorfer Stadtteilgruppen für Reinigungsanfragen",
        itemListElement: districtGroups.map((group, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: group.title,
          description: `${group.areas.join(", ")}: ${group.text}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#local-search-answers`,
        name: "Lokale Schnellantworten für Reinigung Düsseldorf und Umgebung",
        itemListElement: localSearchAnswerItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.query,
          url: `https://www.floxant.de${item.href}`,
          item: {
            "@type": "Thing",
            name: item.title,
            description: item.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#local-click-cases`,
        name: "Kundennah gesuchte Reinigungsfälle in Düsseldorf",
        itemListElement: localClickCaseItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.query,
          description: item.answer,
          url: item.href.startsWith("#")
            ? `https://www.floxant.de${path}${item.href}`
            : `https://www.floxant.de${item.href}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `https://www.floxant.de${path}#local-request-fields`,
        name: "Angaben für Reinigungsanfragen nach Stadtteil und Umgebung",
        itemListElement: localRequestFields.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          description: item.value,
          url: `https://www.floxant.de${path}#stadtteil-anfrage`,
        })),
      },
    ],
  };
  const faqJsonLd = buildFaqJsonLd(faqItems);

  return (
    <main className="px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="mx-auto max-w-7xl rounded-[1rem] border border-white/10 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(7,17,29,0.28)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-cyan-100">
          <Navigation className="h-4 w-4" />
          Reinigungsfirma Düsseldorf
        </div>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4.9rem)] font-black leading-[0.98] tracking-normal">
          Reinigung in Düsseldorf, den Stadtteilen und der nahen Umgebung
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200">
          FLOXANT steht in Düsseldorf für klar geprüfte Reinigung statt pauschaler Versprechen. Für Büro, Hotel, Wohnung, Kanzlei, Praxis, Treppenhaus oder Gewerbefläche werden Stadtteil, Objektart, Zugang, Fotos, Fläche, Turnus, Zeitfenster und Nähe zu Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg sauber eingeordnet.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/duesseldorf/reinigung#kontakt" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-slate-100">
            Reinigung anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/duesseldorf/vielleicht-guenstiger" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-emerald-200/40 bg-emerald-300/15 px-5 text-sm font-bold text-emerald-50 transition hover:bg-emerald-300/25">
            Angebot prüfen lassen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-cyan-200/35 bg-cyan-300/12 px-5 text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/20">
            <MessageCircle className="h-4 w-4" />
            Stadtteil per WhatsApp senden
          </a>
        </div>
      </section>

      <nav
        aria-label="Schnelle Auswahl für Reinigung nach Stadtteil"
        className="mx-auto mt-3 grid max-w-7xl grid-cols-4 gap-2 md:hidden"
      >
        {localMobileShortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[0.75rem] border border-slate-200 bg-white px-3 py-3 text-center shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
          >
            <span className="block text-xs font-black text-slate-950">{item.label}</span>
            <span className="mt-1 block text-[10px] font-semibold leading-4 text-slate-600">
              {item.note}
            </span>
          </Link>
        ))}
      </nav>

      <section id="lokale-klickfaelle" className="mx-auto mt-8 grid max-w-7xl scroll-mt-28 gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            In der Nähe gesucht
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Von Suchwort zur passenden Düsseldorfer Anfrage
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Wer nach Reinigung in der Nähe sucht, braucht keine lange Stadtseite, sondern
            einen klaren Weg: Ort nennen, Objekt erklären, Fotos senden und Machbarkeit
            prüfen lassen.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="#stadtteil-anfrage" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-4 text-sm font-black text-white">
              Angaben vorbereiten
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-800">
              <MessageCircle className="h-4 w-4" />
              Fotos senden
            </a>
          </div>
        </article>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {localClickCaseItems.map((item) => (
            <Link
              key={item.query}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)]"
              data-event="region_select"
              data-region="duesseldorf"
            >
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-cyan-800">
                <MapPin className="h-4 w-4" />
                {item.query}
              </div>
              <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                {item.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="stadtteil-schnellcheck" className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            Vor der Anfrage geklärt
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Stadtteil, Objekt und Zugang direkt richtig senden
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Die lokale Lage entscheidet, ob eine Reinigung schnell planbar ist. Für bessere
            Rückmeldung zählen nicht nur Düsseldorf oder Umgebung, sondern die konkreten
            Angaben zu Ort, Etage, Zugang, Parken, Fläche und Fotos.
          </p>
        </article>
        <div className="grid gap-3 md:grid-cols-3">
          {localDecisionItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)]"
              data-event="region_select"
              data-region="duesseldorf"
            >
              <CheckCircle2 className="h-5 w-5 text-cyan-700" />
              <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                {item.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 md:grid-cols-2">
        {districtGroups.map((group) => (
          <article key={group.title} className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-cyan-800">
              <MapPin className="h-4 w-4" />
              Lokaler Fokus
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">{group.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{group.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.areas.map((area) => (
                <span key={area} className="rounded-[0.75rem] border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">
                  {area}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section id="lokale-schnellantworten" className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[0.74fr_1.26fr]">
        <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
            Kurze Antworten
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Lokale Fragen kurz beantworten
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Diese Antworten sind bewusst kurz, konkret und kundennah formuliert. So finden
            Besucher schneller den passenden Einstieg und müssen nicht erst mehrere
            ähnliche Seiten vergleichen.
          </p>
        </article>
        <div className="grid gap-3 md:grid-cols-3">
          {localSearchAnswerItems.map((item) => (
            <Link
              key={item.query}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)]"
              data-event="region_select"
              data-region="duesseldorf"
            >
              <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
                {item.query}
              </div>
              <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                Passenden Weg öffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[0.95rem] border border-cyan-200 bg-cyan-50 p-6">
        <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">Passende Düsseldorfer Leistungen</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceAreaClickLinks.map((item) => (
            <Link key={item.label} href={item.href} className="group rounded-[0.8rem] border border-cyan-100 bg-white p-4 text-sm font-bold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-900">
              <MapPin className="mb-3 h-5 w-5 text-cyan-700" />
              {item.label}
              <span className="mt-2 flex items-center gap-1 text-xs text-slate-500 group-hover:text-cyan-800">
                Stadtteilweg öffnen <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
          {DUESSELDORF_CLEANING_SERVICES.slice(0, 12).map((service) => (
            <Link key={service.href} href={service.href} className="group rounded-[0.8rem] border border-cyan-100 bg-white p-4 text-sm font-bold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-900">
              <Building2 className="mb-3 h-5 w-5 text-cyan-700" />
              {service.label}
              <span className="mt-2 flex items-center gap-1 text-xs text-slate-500 group-hover:text-cyan-800">
                Objekt prüfen <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="stadtteil-anfrage" className="mx-auto mt-8 grid max-w-7xl scroll-mt-28 gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <article className="rounded-[0.95rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-[0_16px_38px_rgba(15,23,42,0.14)]">
          <div className="text-[11px] font-black uppercase tracking-normal text-cyan-100">
            Anfrage schneller prüfbar machen
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-white">
            Diese Angaben sparen Rückfragen bei Stadtteil und Umgebung.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Je klarer Ort, Zugang, Fotos und Termin sind, desto schneller kann FLOXANT
            Düsseldorf, Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg realistisch
            einordnen. Bitte keine Zugangscodes offen in Formulartexte schreiben.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] bg-emerald-400 px-4 text-sm font-black text-slate-950" data-event="whatsapp_click">
              <MessageCircle className="h-4 w-4" />
              Per WhatsApp senden
            </a>
            <Link href="/duesseldorf/reinigung#kontakt" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] border border-white/15 bg-white/10 px-4 text-sm font-black text-white" data-event="hero_cta_click">
              Formular öffnen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {localRequestFields.map((item, index) => {
            const Icon = item.Icon;
            return (
              <article key={item.label} className="rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.8rem] bg-cyan-50 text-cyan-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-black text-slate-950">{item.label}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="international-verstaendlich" className="mx-auto mt-8 grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <article className="rounded-[0.95rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-[0_16px_38px_rgba(15,23,42,0.14)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
            <Languages className="h-4 w-4" />
          </div>
          <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-cyan-100">
            International verständlich
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-white">
            Reinigung in Düsseldorf und Umgebung auch anderssprachig zuordnen
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Die Seite bleibt deutsch. Englische, russische, chinesische und koreanische
            Suchbegriffe helfen bei der Zuordnung, wenn Kunden nach Reinigung im Raum
            Düsseldorf suchen. Es werden keine falschen Sprachversionen behauptet.
          </p>
        </article>
        <div className="grid gap-3 md:grid-cols-2">
          {internationalSearchAliases.map((alias) => (
            <article key={alias.language} className="rounded-[0.9rem] border border-slate-200 bg-white p-4">
              <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
                {internationalLanguageLabels[alias.language]}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {alias.terms.slice(0, 4).map((term) => (
                  <span
                    key={term}
                    lang={htmlLangForAlias(alias.language)}
                    className="rounded-[0.7rem] border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold leading-5 text-slate-800"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-3 md:grid-cols-3">
        {visibleSnippetAnswers.map((item) => (
          <Link
            key={item.query}
            href={item.href}
            className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)]"
            data-event="region_select"
            data-region="duesseldorf"
          >
            <div className="text-[11px] font-black uppercase tracking-normal text-cyan-800">
              Häufige Suchfrage
            </div>
            <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
              Mehr dazu
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-3 md:grid-cols-2">
        {faqItems.map((item) => (
          <details key={item.q} className="rounded-[0.85rem] border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-black text-slate-950">
              <CheckCircle2 className="mr-2 inline h-4 w-4 text-cyan-700" />
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
          </details>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-7 text-slate-700">
          Adresse Düsseldorf: {DUESSELDORF_CLEANING.address.streetAddress}, {DUESSELDORF_CLEANING.address.postalCode} {DUESSELDORF_CLEANING.address.city}. Anfragen aus Düsseldorf und Umgebung werden nach Objektart, Stadtteil, Umfang, Fotos, Zugang, Turnus und Termin geprüft, damit Kunden eine belastbare Rückmeldung erhalten.
        </p>
      </section>
    </main>
  );
}
