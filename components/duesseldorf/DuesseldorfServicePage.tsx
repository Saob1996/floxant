import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Phone,
  Route,
} from "lucide-react";

import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";
import { SearchIntentExpansion } from "@/components/seo/SearchIntentExpansion";

type ServicePageProps = {
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
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/b2b-reinigung", label: "B2B-Reinigung Düsseldorf" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Düsseldorf" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteile & Umgebung" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Vielleicht günstiger?" },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung Düsseldorf" },
];

export function DuesseldorfServicePage({
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

  return (
    <main className="overflow-x-clip px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        <section className="duesseldorf-service-hero overflow-hidden rounded-[1.5rem] border border-white/10 px-5 py-8 text-white shadow-[0_24px_70px_rgba(7,17,29,0.28)] sm:px-7 md:px-9 md:py-10">
          <div className="text-[11px] font-black uppercase tracking-normal text-teal-200">
            {kicker}
          </div>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.05rem,4.6vw,4.1rem)] font-bold leading-[1.04] tracking-normal">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/duesseldorf/reinigung#rechner"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
              data-event="start_calculator"
              data-service="reinigung"
              data-region="duesseldorf"
            >
              Unverbindlich Preis berechnen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildDuesseldorfCleaningWhatsAppHref(
                `Hallo FLOXANT Reinigung Düsseldorf, ich interessiere mich für ${title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-emerald-200/80 bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_14px_30px_rgba(5,150,105,0.24)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
              data-event="click_whatsapp"
              data-service="reinigung"
              data-region="duesseldorf"
            >
              <WhatsAppMark className="h-5 w-5 shrink-0" />
              Per WhatsApp anfragen
            </a>
            <Link
              href="/reinigung-moeblierte-wohnung-duesseldorf"
              className="inline-flex min-h-12 items-center justify-center rounded-[0.9rem] border border-cyan-100/35 bg-cyan-200/16 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-200/24"
              data-event="internal_link_duesseldorf_apartment_cleaning"
              data-region="duesseldorf"
            >
              Apartment-Reinigung
            </Link>
          </div>
        </section>

        {isCommercialIntent ? (
          <section className="grid gap-4 pt-6 lg:grid-cols-[1fr_0.92fr]">
            <article className="rounded-[1.25rem] border border-emerald-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
              <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">
                Schnelle B2B-Rückmeldung
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
                Mehr Chancen auf Kontakt: kurze Anfrage mit Objekt, Fläche und Fotos
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Für Hotels, Büros, Firmen, Kanzleien, Praxen und Gewerbeflächen reicht für den ersten
                Schritt eine klare Kurzinfo: Objektart, Düsseldorfer Stadtteil, ungefähre Fläche,
                gewünschter Turnus, Zeitfenster und Fotos. Damit kann FLOXANT schneller prüfen,
                ob der Auftrag passt und welcher nächste Schritt sinnvoll ist.
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
                  <WhatsAppMark className="h-5 w-5 shrink-0" />
                  B2B per WhatsApp anfragen
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-slate-200 bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  data-event="click_b2b_contact_anchor"
                  data-region="duesseldorf"
                >
                  Kontakt öffnen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>

            <article className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6">
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
          <article className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
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

          <article className="overflow-hidden rounded-[1.25rem] border border-teal-100 bg-teal-50 p-6 sm:p-7">
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
                className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7"
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
          <article className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
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

          <article className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-7">
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
          <article className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
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

          <article className="overflow-hidden rounded-[1.25rem] border border-amber-200 bg-amber-50 p-6 sm:p-7">
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
          <article className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
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

          <article id="kontakt" className="scroll-mt-28 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.14)] sm:p-7">
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
                className="inline-flex min-h-12 items-center gap-3 rounded-[0.9rem] border border-white/10 bg-white/8 px-4 text-sm font-bold text-white transition hover:bg-white/12"
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
                <WhatsAppMark className="h-5 w-5 shrink-0" />
                WhatsApp mit Objektangaben öffnen
              </a>
            </div>
          </article>
        </section>

        {faqItems.length > 0 ? (
          <section className="pt-10">
            <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] sm:p-7">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-teal-700">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
                Häufige Fragen zu {title}
              </h2>
              <div className="mt-5 space-y-3">
                {faqItems.map((item, index) => (
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
        ) : null}
      </div>
    </main>
  );
}
