import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Camera,
  CheckCircle2,
  Clock3,
  HelpCircle,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_AI_RECOMMENDATIONS,
  DUESSELDORF_CLEANING_SNIPPET_ANSWERS,
  buildDuesseldorfCleaningSchema,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import {
  getDuesseldorfCleaningInternationalAliases,
  type SearchIntentAliasLanguage,
} from "@/lib/search-intent-aliases";
import { SearchIntentExpansion } from "@/components/seo/SearchIntentExpansion";

type ServicePageProps = {
  path?: string;
  metaDescription?: string;
  kicker: string;
  title: string;
  description: string;
  contentSections?: readonly {
    title: string;
    paragraphs: readonly string[];
  }[];
  bullets: readonly string[];
  localFocus: readonly string[];
  priceLogic?: readonly string[];
  faqItems?: readonly { q: string; a: string }[];
  relatedLinks?: readonly { href: string; label: string }[];
  boundaryText?: string;
  serviceLabel?: string;
};

const fallbackRelatedLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf anfragen" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung prüfen" },
  { href: "/duesseldorf/b2b-reinigung", label: "Firmenreinigung planen" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung einschätzen" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil prüfen" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung anfragen" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung separat prüfen" },
];

const heroProofItems = [
  {
    Icon: Camera,
    title: "Fotos reichen zum Start",
    text: "Objekt, Fläche, Stadtteil und Zustand senden.",
  },
  {
    Icon: Clock3,
    title: "Zeitfenster sauber klären",
    text: "Einmalig, regelmäßig, vor Öffnung oder nach Feierabend.",
  },
  {
    Icon: ShieldCheck,
    title: "Keine falschen Versprechen",
    text: "Düsseldorf bleibt Reinigung und Entsorgung.",
  },
] as const;

const internationalLanguageLabels: Record<SearchIntentAliasLanguage, string> = {
  en: "Englisch",
  ru: "Russisch",
  zh: "Chinesisch",
  ko: "Koreanisch",
};

function htmlLangForAlias(language: SearchIntentAliasLanguage) {
  return language === "zh" ? "zh-Hans" : language;
}

function buildDefaultFaqItems(serviceLabel: string, title: string) {
  return [
    {
      q: `Was kostet ${serviceLabel} in Düsseldorf?`,
      a: `Der Preis hängt von Fläche, Zustand, Objektart, Stadtteil, Zugang, Termin und gewünschtem Ergebnis ab. Für ${title} hilft ein kurzer Preisrahmen, damit FLOXANT die Machbarkeit ehrlich einordnen kann.`,
    },
    {
      q: "Welche Angaben beschleunigen die Rückmeldung?",
      a: "Senden Sie Objektart, Düsseldorfer Stadtteil oder PLZ, Fläche, Terminwunsch, Zugang, Fotos und bei Bedarf Ihr Budget. Je klarer diese Angaben sind, desto schneller kann der Auftrag geprüft werden.",
    },
    {
      q: "Kann ich einfach Fotos per WhatsApp senden?",
      a: "Ja. Fotos vom Zustand, Zugang, Boden, Küche, Bad, Nebenflächen oder Gewerbebereich helfen sehr. Die Anfrage bleibt unverbindlich, bis Umfang, Termin und Leistung bestätigt sind.",
    },
    {
      q: "Bietet FLOXANT in Düsseldorf auch Umzüge an?",
      a: "Nein. Düsseldorf ist bei FLOXANT bewusst auf Reinigung und Entsorgung ausgerichtet. Umzug, Transport und Büroumzug werden hier nicht als Düsseldorfer Leistung beworben.",
    },
  ];
}

export function DuesseldorfServicePage({
  path = "/duesseldorf/reinigung",
  metaDescription,
  kicker,
  title,
  description,
  contentSections = [],
  bullets,
  localFocus,
  priceLogic = [],
  faqItems = [],
  relatedLinks = [],
  boundaryText = "Düsseldorf ist bei FLOXANT klar für Reinigung und Entsorgung positioniert. Umzug, Transport und ähnliche Umzugsleistungen werden hier nicht beworben.",
  serviceLabel = "Reinigung",
}: ServicePageProps) {
  const visibleLinks = relatedLinks.length > 0 ? relatedLinks : fallbackRelatedLinks;
  const isCommercialIntent = /B2B|Büro|Firma|Gewerbe|Kanzlei|Praxis|Hotel|Krankenhaus/i.test(serviceLabel);
  const whatsappMessage = `Hallo FLOXANT Reinigung Düsseldorf, ich möchte ${title} anfragen. Objektart, Stadtteil, Fläche, Turnus/Zeitfenster und Fotos kann ich senden.`;
  const activeFaqItems = faqItems.length > 0 ? faqItems : buildDefaultFaqItems(serviceLabel, title);
  const internationalSearchAliases = getDuesseldorfCleaningInternationalAliases();
  const serviceSnippetAnswerItems = DUESSELDORF_CLEANING_SNIPPET_ANSWERS.slice(0, 4);
  const quickAnswers = [
    {
      Icon: Banknote,
      title: "Preis nur realistisch mit Zustand",
      text: `Für ${serviceLabel} zählen Fläche, Verschmutzung, Zugang, Termin und Ziel. Ein Budget ist willkommen, aber keine automatische Zusage.`,
    },
    {
      Icon: Camera,
      title: "Fotos machen die Anfrage schneller",
      text: "Bilder von Räumen, Boden, Küche, Bad, Zugang oder Objektflächen sparen Rückfragen und verbessern die erste Einschätzung.",
    },
    {
      Icon: MessageCircle,
      title: "Direkt per WhatsApp möglich",
      text: "Kurz Stadtteil, Fläche, Zeitfenster und Fotos senden. FLOXANT prüft, ob der Auftrag in Düsseldorf machbar ist.",
    },
  ] as const;
  const snippetAnswerItems = [
    {
      title: `Wann passt ${serviceLabel} in Düsseldorf?`,
      text: `Wenn Objektart, Stadtteil, Fläche, Zustand, Termin und gewünschtes Ergebnis klar beschrieben werden können, lässt sich ${serviceLabel} deutlich schneller prüfen.`,
    },
    {
      title: "Welche Angaben sparen Zeit?",
      text: "PLZ oder Stadtteil, Raum- oder Flächenangabe, Fotos, Zugang, Zeitfenster, Ansprechpartner und ein möglicher Preisrahmen machen die erste Rückmeldung belastbarer.",
    },
    {
      title: "Warum keine Sofort-Pauschale?",
      text: "Reinigung hängt stark von Zustand, Material, Nutzung und Anspruch ab. FLOXANT prüft lieber realistisch, bevor ein Preis falsche Erwartungen erzeugt.",
    },
  ] as const;
  const decisionItems = [
    {
      title: `Passt ${serviceLabel} zu meiner Anfrage?`,
      text: `Ja, wenn es um Reinigung oder Entsorgung in Düsseldorf geht und Objektart, Stadtteil, Fläche, Zustand, Termin und Ziel kurz beschrieben werden können.`,
      href: "#kontakt",
      cta: "Anfrage richtig senden",
      external: false,
    },
    {
      title: "Wie bekomme ich schneller Rückmeldung?",
      text: "Am besten mit Fotos, PLZ oder Stadtteil, Flächenangabe, Zugang, Zeitfenster, Ansprechpartner und einem realistischen Preisrahmen.",
      href: buildDuesseldorfCleaningWhatsAppHref(whatsappMessage),
      cta: "WhatsApp vorbereiten",
      external: true,
    },
    {
      title: "Wo prüfe ich Kosten oder ein vorhandenes Angebot?",
      text: "Wenn Sie schon einen Preis, ein Angebot oder eine Budgetgrenze haben, führt die Angebotsprüfung schneller zur passenden Einordnung.",
      href: "/duesseldorf/vielleicht-guenstiger",
      cta: "Angebot prüfen",
      external: false,
    },
  ] as const;
  const mobileShortcutItems = [
    { href: "#schnell-entscheiden", label: "Passt?", note: "Weg wählen" },
    { href: "#kontakt", label: "Kontakt", note: "Daten senden" },
    { href: "/duesseldorf/vielleicht-guenstiger", label: "Kosten?", note: "Angebot prüfen" },
  ] as const;
  const jsonLd = buildDuesseldorfCleaningSchema({
    path,
    title,
    description: metaDescription || description,
    serviceLabel,
    relatedLinks: visibleLinks,
  });

  return (
    <main className="overflow-x-clip px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        <section className="duesseldorf-service-hero overflow-hidden rounded-[1rem] border border-white/10 px-5 py-8 text-white shadow-[0_24px_70px_rgba(7,17,29,0.24)] sm:px-7 md:px-9 md:py-10">
          <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
            {kicker}
          </div>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.05rem,4.6vw,4.1rem)] font-bold leading-[1.04] tracking-normal">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100">
            {description}
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {heroProofItems.map(({ Icon, title: itemTitle, text }) => (
              <div
                key={itemTitle}
                className="flex min-h-[5.5rem] gap-3 rounded-[0.85rem] border border-white/12 bg-white/8 px-4 py-3"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-200" />
                <div>
                  <div className="text-sm font-black text-white">{itemTitle}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-200">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/duesseldorf/reinigung#rechner"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
              data-event="start_calculator"
              data-service="reinigung"
              data-region="duesseldorf"
            >
              Preisrahmen prüfen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildDuesseldorfCleaningWhatsAppHref(
                `Hallo FLOXANT Reinigung Düsseldorf, ich interessiere mich für ${title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] border border-emerald-200/80 bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_14px_30px_rgba(5,150,105,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
              data-event="click_whatsapp"
              data-service="reinigung"
              data-region="duesseldorf"
            >
              WhatsApp mit Fotos senden
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/reinigung-moeblierte-wohnung-duesseldorf"
              className="inline-flex min-h-12 items-center justify-center rounded-[0.8rem] border border-cyan-100/35 bg-cyan-200/16 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-200/24"
              data-event="internal_link_duesseldorf_apartment_cleaning"
              data-region="duesseldorf"
            >
              Apartment-Reinigung
            </Link>
          </div>
        </section>

        <nav
          aria-label="Schnelle Auswahl für Düsseldorfer Reinigungsanfragen"
          className="mt-3 grid grid-cols-3 gap-2 md:hidden"
        >
          {mobileShortcutItems.map((item) => (
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

        <section className="grid gap-4 pt-6 md:grid-cols-3">
          {quickAnswers.map(({ Icon, title: itemTitle, text }) => (
            <article
              key={itemTitle}
              className="rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-teal-100 bg-teal-50 text-teal-700">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-lg font-black tracking-normal text-slate-950">
                {itemTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Kurzantwort für Kunden
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              {serviceLabel} in Düsseldorf realistisch anfragen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Diese Seite soll schnell beantworten, ob Ihre Anfrage passt, welche Angaben
              FLOXANT braucht und warum Fotos, Stadtteil und Preisrahmen die Einschätzung
              beschleunigen.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {snippetAnswerItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="schnell-entscheiden" className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Vor der Anfrage
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Schnell erkennen, welcher Weg für {serviceLabel} passt
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Kunden suchen oft mit konkreten Fragen: Kosten, Fotos, Angebot, Stadtteil
              oder schneller Kontakt. Diese Einstiege führen direkt zur richtigen nächsten
              Handlung, ohne die Düsseldorfer Seite mit Umzugsthemen zu vermischen.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-3">
            {decisionItems.map((item) => {
              const className =
                "group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]";
              const content = (
                <>
                  <CheckCircle2 className="h-5 w-5 text-teal-700" />
                  <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </>
              );

              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  data-event="click_duesseldorf_service_decision"
                  data-region="duesseldorf"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={className}
                  data-event="click_duesseldorf_service_decision"
                  data-region="duesseldorf"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Häufig gesucht
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Antworten, die vor der Anfrage helfen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Kurze, klare Antworten auf kaufnahe Fragen verbessern die Lesbarkeit und
              machen schon vor dem Kontakt verständlich, welcher nächste Schritt passt.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {serviceSnippetAnswerItems.map((item, index) => (
              <Link
                key={item.query}
                href={item.href}
                className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]"
                data-event="click_duesseldorf_service_snippet_answer"
                data-region="duesseldorf"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  Antwort {index + 1}
                </div>
                <h3 className="mt-3 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  Passende Seite öffnen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 pt-6 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Empfehlung & Zuordnung
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Wann FLOXANT für diese Düsseldorfer Reinigung passt
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Kunden sollen schnell erkennen, wann FLOXANT passt: Ort, Objektart,
              Fläche, Zustand, Fotos, Termin und die klare Grenze zu Umzug oder Transport.
              So wird die Anfrage für {serviceLabel} verständlich.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {DUESSELDORF_CLEANING_AI_RECOMMENDATIONS.slice(0, 4).map((item) => (
              <Link
                key={item.intent}
                href={item.href}
                className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-[0_16px_38px_rgba(15,118,110,0.1)]"
                data-event="click_duesseldorf_service_ai_recommendation"
                data-region="duesseldorf"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                  {item.intent}
                </div>
                <h3 className="mt-2 text-base font-black text-slate-950">
                  {item.recommendation}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                  {item.nextStep}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="international-verstaendlich" className="grid gap-4 pt-6 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_16px_38px_rgba(15,23,42,0.12)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
              <Languages className="h-4 w-4" />
            </div>
            <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-cyan-100">
              International verständlich
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-white">
              {serviceLabel} in Düsseldorf auch bei anderssprachiger Suche finden
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Die Inhalte bleiben deutsch. Kurze Suchbegriffe in Englisch, Russisch,
              Chinesisch und Koreanisch helfen bei der Zuordnung, wenn Kunden nach
              Reinigung in Düsseldorf suchen und keine Umzugsleistung meinen.
            </p>
          </article>
          <div className="grid gap-3 md:grid-cols-2">
            {internationalSearchAliases.map((alias) => (
              <article
                key={alias.language}
                className="rounded-[0.9rem] border border-slate-200 bg-white p-4"
              >
                <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
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

        {isCommercialIntent ? (
          <section className="grid gap-4 pt-6 lg:grid-cols-[1fr_0.92fr]">
            <article className="rounded-[0.95rem] border border-emerald-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">
                Schnelle Rückmeldung für Firmen
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
                Geschäftliche Reinigungsanfrage direkt prüfbar machen
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Für Hotels, Büros, Firmen, Kanzleien, Praxen und Gewerbeflächen zählt eine schnelle,
                belastbare Einordnung. Senden Sie Objektart, Düsseldorfer Stadtteil, Fläche,
                gewünschten Turnus, Zeitfenster und Fotos. So kann FLOXANT professionell prüfen,
                ob der Auftrag realistisch planbar ist und wie eine saubere Angebotsgrundlage entsteht.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={buildDuesseldorfCleaningWhatsAppHref(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                  data-event="click_b2b_quick_whatsapp"
                  data-region="duesseldorf"
                >
                  Per WhatsApp anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-slate-800 bg-slate-950 px-5 text-sm font-black !text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                  data-event="click_b2b_contact_anchor"
                  data-region="duesseldorf"
                  style={{ color: "#ffffff" }}
                >
                  Direkt Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4 text-white" />
                </a>
              </div>
            </article>

            <article className="rounded-[0.95rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
                Was wir für ein Angebot brauchen
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  "Objektart: Hotel, Büro, Kanzlei, Praxis, Firma oder Gewerbe",
                  "Stadtteil, Fläche, Etagen, Zugang und Park-/Lieferzone",
                  "Turnus, gewünschtes Zeitfenster, Fotos und Ansprechpartner",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-[0.9rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </section>
        ) : null}

        <section className="grid gap-6 pt-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
              Düsseldorf klar getrennt
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Eigener Standortfokus statt vermischter Stadtseite
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Diese Seite ist für {serviceLabel} in Düsseldorf aufgebaut und bleibt bewusst
              von Regensburg getrennt. Entscheidend sind Objektart, Stadtteil, Fläche,
              gewünschte Häufigkeit, Zeitfenster, Zugang und Fotos. So entsteht keine
              austauschbare Stadtseite, sondern eine Anfrage, die zur Düsseldorfer Adresse
              und zum tatsächlichen Einsatzgebiet passt.
            </p>
          </article>

          <article className="overflow-hidden rounded-[0.95rem] border border-teal-100 bg-teal-50 p-6 sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-800">
              Lokale Einordnung
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Planung nach Stadtteil, Objekt und Zugang
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              In Düsseldorf verändern Innenstadtlage, Parkmöglichkeit, Hausordnung,
              Aufzug, Etage, Hinterhof, Lieferzone und Terminfenster den Aufwand deutlich.
              Deshalb wird nicht pauschal versprochen, sondern nach Objekt und Lage
              geprüft: Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, Derendorf,
              Flingern, MedienHafen und angrenzende Bereiche wie Neuss, Ratingen,
              Meerbusch, Mettmann und Duisburg werden sauber zugeordnet.
            </p>
          </article>
        </section>

        {contentSections.length > 0 ? (
          <section className="grid gap-6 pt-10 lg:grid-cols-2">
            {contentSections.map((section) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7"
              >
                <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : null}

        <SearchIntentExpansion
          route="/duesseldorf/reinigung"
          city="Düsseldorf"
          serviceName={serviceLabel}
          market="duesseldorf"
          relatedLinks={visibleLinks}
          className="px-0 pt-10"
        />

        <section className="grid gap-6 pt-10 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Worum es hier geht
            </div>
            <div className="mt-5 space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Lokaler Fokus
            </div>
            <div className="mt-5 grid gap-3">
              {localFocus.map((item) => (
                <div
                  key={item}
                  className="flex min-w-0 items-center gap-3 rounded-[0.9rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                  <span className="min-w-0">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[0.9rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
              Kontakt: {DUESSELDORF_CLEANING.address.streetAddress},{" "}
              {DUESSELDORF_CLEANING.address.postalCode}{" "}
              {DUESSELDORF_CLEANING.address.city} · {DUESSELDORF_CLEANING.phoneDisplay}
            </div>
          </article>
        </section>

        <section className="grid gap-6 pt-10 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-teal-700">
              <Route className="h-4 w-4" />
              Preis- und Anfahrtslogik
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Was den Aufwand in Düsseldorf wirklich verändert
            </h2>
            <div className="mt-5 grid gap-3">
              {(priceLogic.length > 0
                ? priceLogic
                : [
                    "Fläche, Objektart, Zustand und gewünschtes Ergebnis bestimmen den Grundaufwand.",
                    "Zugang, Etage, Parkmöglichkeit und Zeitfenster verändern die Planung vor Ort.",
                    "Fotos und ein klarer Preisrahmen helfen, die Anfrage schneller realistisch einzuordnen.",
                  ]
              ).map((item) => (
                <div key={item} className="rounded-[0.9rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[0.95rem] border border-amber-200 bg-amber-50 p-6 sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-amber-800">
              Klare Abgrenzung
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Düsseldorf bleibt eigenständig und getrennt von Regensburg
            </h2>
            <p className="mt-4 text-sm leading-7 text-amber-950">{boundaryText}</p>
            <div className="mt-5 rounded-[0.9rem] border border-amber-200 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700">
              Adresse Düsseldorf: {DUESSELDORF_CLEANING.address.streetAddress},{" "}
              {DUESSELDORF_CLEANING.address.postalCode} {DUESSELDORF_CLEANING.address.city}. Anfragen werden für Düsseldorf nach Objekt, Stadtteil, Umfang, Fotos und Termin geprüft.
            </div>
          </article>
        </section>

        <section className="grid gap-6 pt-10 lg:grid-cols-[1fr_0.88fr]">
          <article className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-slate-500">
              Passende Wege
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Passende Düsseldorfer Seiten
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {visibleLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-[0.9rem] border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 transition hover:border-teal-200 hover:bg-white hover:text-slate-950"
                >
                  <span className="min-w-0">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal-700" />
                </Link>
              ))}
            </div>
          </article>

          <article id="kontakt" className="scroll-mt-28 overflow-hidden rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.14)] sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
              Kontaktmöglichkeit
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Direkt mit Düsseldorf-Bezug anfragen
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Nennen Sie Objektart, Düsseldorfer Stadtteil, Fläche, gewünschten Termin, Zugang und Fotos. So wird die Anfrage nicht mit Regensburg oder Umzugsthemen vermischt.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
                className="inline-flex min-h-12 items-center gap-3 rounded-[0.9rem] border border-slate-700 bg-slate-900/75 px-4 text-sm font-bold !text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-slate-800"
              >
                <Phone className="h-4 w-4 text-teal-200" />
                {DUESSELDORF_CLEANING.phoneDisplay}
              </a>
              <a
                href={buildDuesseldorfCleaningWhatsAppHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                WhatsApp mit Objektangaben öffnen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </section>

        <section className="pt-10">
          <div className="overflow-hidden rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-teal-700">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
              Häufige Fragen zu {title}
            </h2>
            <div className="mt-5 space-y-3">
              {activeFaqItems.map((item, index) => (
                <details
                  key={item.q}
                  open={index === 0}
                  className="rounded-[0.9rem] border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <summary className="cursor-pointer text-sm font-bold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
