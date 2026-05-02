import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Home,
  MapPin,
  Sparkles,
  Building,
} from "lucide-react";

import { DuesseldorfCleaningCalculator } from "@/components/duesseldorf/DuesseldorfCleaningCalculator";
import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_SERVICES,
  DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  buildDuesseldorfCleaningMetadata,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/reinigung",
    title: "Reinigung Düsseldorf | Wohnungen, Büros & Übergaben anfragen",
    description:
      "FLOXANT Reinigung Düsseldorf ordnet Reinigungsanfragen für Wohnungen, Büros und Übergaben realistisch ein. Mit WhatsApp-Anfrage, Preisrechner und Budgetrahmen.",
  });
}

const trustLine = [
  "Reinigung in Düsseldorf",
  "Wohnungen, Büros & Übergaben",
  "Anfrage per WhatsApp möglich",
  "Budget ehrlich einordnen",
];

const heroHighlights = [
  {
    label: "Klarer Umfang",
    title: "Reinigung mit klarem Ziel",
    text: "Nicht jede Reinigung hat denselben Anspruch. Eine Wohnung vor der Übergabe braucht andere Details als ein Büro im laufenden Betrieb. Wir klären vorab, was wirklich zählt.",
  },
  {
    label: "Schnelle Einschätzung",
    title: "Direkter Kontakt statt langer Umwege",
    text: "Sie schicken uns Fläche, Zustand, Terminwunsch und Fotos. Wir ordnen den Aufwand ein und melden uns mit einer realistischen Einschätzung zurück.",
  },
  {
    label: "Preisrahmen",
    title: "Budget nennen, ehrlich einordnen lassen",
    text: "Wenn Sie einen festen Preisrahmen haben, sagen Sie ihn direkt. Wir ordnen ein, ob der Auftrag dafür machbar ist oder welcher Umfang realistisch wäre.",
  },
];

const focusCards = [
  {
    title: "Wohnungsreinigung, wenn der Zustand wieder stimmen muss",
    text: "Ob nach Auszug, vor Einzug oder vor einer Übergabe: Bei Wohnungen zählt nicht nur der sichtbare Eindruck. Küche, Bad, Böden, Fensterbereiche und schwer zugängliche Stellen entscheiden oft darüber, ob eine Reinigung als wirklich sauber wahrgenommen wird.",
  },
  {
    title: "Büroreinigung ohne unnötige Reibung",
    text: "Ein Büro soll sauber sein, ohne den Betrieb zu stören. Deshalb prüfen wir Terminfenster, Flächen, Frequenz und besondere Anforderungen vorab. So entsteht keine theoretische Reinigung, sondern ein Ablauf, der zum Arbeitsalltag passt.",
  },
  {
    title: "Reinigung vor Übergabe: Der letzte Eindruck zählt",
    text: "Vor einer Wohnungs- oder Objektübergabe wird Reinigung anders bewertet. Kleine Rückstände, vergessene Bereiche oder Zeitdruck können schnell zum Problem werden. Wir helfen, die Reinigung sauber vorzubereiten und realistisch zu planen.",
  },
];

const serviceIcons = [Home, Building2, Sparkles, Building, ClipboardCheck, CheckCircle2];

const faqs = [
  {
    q: "Kann ich bei FLOXANT Reinigung Düsseldorf ein eigenes Budget nennen?",
    a: "Ja. Sie können uns Ihren Preisrahmen direkt mitteilen. Wir ordnen dann ehrlich ein, ob der Auftrag dafür machbar ist, welcher Umfang möglich wäre oder ob der Aufwand realistisch höher liegt.",
  },
  {
    q: "Ist der Preisvorschlag automatisch verbindlich?",
    a: "Nein. Ein Budget oder Preisvorschlag ist zunächst eine Orientierung. Verbindlich wird ein Auftrag erst, wenn Umfang, Zustand, Termin und Leistung klar eingeordnet und bestätigt wurden.",
  },
  {
    q: "Welche Informationen helfen für eine schnelle Einschätzung?",
    a: "Hilfreich sind Fläche, Adresse oder Stadtteil, gewünschter Termin, Reinigungsart, Fotos vom Zustand und besondere Bereiche wie Küche, Bad, Fenster oder starke Verschmutzung.",
  },
  {
    q: "Macht FLOXANT Reinigung Düsseldorf auch Übergabereinigung?",
    a: "Ja, je nach Kapazität und Umfang können Reinigungen vor Wohnungs- oder Objektübergaben angefragt werden. Wichtig sind klare Angaben zum Zustand, Termin und gewünschten Ergebnis.",
  },
  {
    q: "Warum nennt FLOXANT nicht sofort einen festen Preis?",
    a: "Weil Reinigung stark vom Zustand, Umfang, Termin und Anspruch abhängt. Ein sofortiger Pauschalpreis ohne Einordnung kann später zu falschen Erwartungen führen. Wir kalkulieren lieber realistisch.",
  },
];

export default function DuesseldorfReinigungPage() {
  const whatsappHeroHref = buildDuesseldorfCleaningWhatsAppHref(
    DUESSELDORF_CLEANING_WHATSAPP_BASE_MESSAGE,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CleaningService",
        "@id": "https://www.floxant.de/duesseldorf/reinigung#cleaning-service",
        name: "FLOXANT Reinigung Düsseldorf",
        url: "https://www.floxant.de/duesseldorf/reinigung",
        telephone: "+4915771105087",
        email: DUESSELDORF_CLEANING.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Breite Str. 22",
          postalCode: "40213",
          addressLocality: "Düsseldorf",
          addressCountry: "DE",
        },
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Hilden", "Erkrath"],
        serviceType: [
          "Wohnungsreinigung",
          "Büroreinigung",
          "Grundreinigung",
          "Treppenhausreinigung",
          "Übergabereinigung",
          "Endreinigung",
        ],
        priceRange: "€",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+4915771105087",
          contactType: "customer service",
          areaServed: "Düsseldorf",
          availableLanguage: "de",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Reinigungsleistungen in Düsseldorf",
          itemListElement: DUESSELDORF_CLEANING_SERVICES.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.label,
              url: `https://www.floxant.de${item.href}`,
            },
          })),
        },
        logo: "https://www.floxant.de/logo_v10.png",
        image: "https://www.floxant.de/opengraph-image",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="px-4 pb-24 pt-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl">
        <section className="duesseldorf-hero rounded-[2.6rem] border border-white/16 px-6 py-10 text-white shadow-[0_34px_110px_rgba(3,7,18,0.34)] md:px-10 md:py-12">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-200">
              FLOXANT Reinigung Düsseldorf
            </div>
            <h1 className="duesseldorf-hero-title mt-5 max-w-[17ch] text-[clamp(2.55rem,5.4vw,5rem)] font-bold">
              Reinigung in Düsseldorf für Wohnungen, Büros und Übergaben
            </h1>
            <p className="duesseldorf-hero-copy mt-5 max-w-3xl text-lg">
              Eine gute Reinigung beginnt nicht erst mit dem Wischen, sondern mit klarer
              Absprache: Was muss gereinigt werden, bis wann, in welchem Zustand und mit
              welchem Anspruch? Genau das klären wir vorab, damit aus einer Anfrage ein
              sauber planbarer Einsatz wird.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#rechner"
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_14px_34px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5"
              >
                Unverbindlich Preis berechnen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#preisvorschlag"
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-teal-200/35 bg-teal-300/15 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(20,184,166,0.18)] transition hover:-translate-y-0.5 hover:bg-teal-300/22"
              >
                Eigenes Budget einordnen lassen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHeroHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[1.2rem] border border-white/14 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                Per WhatsApp anfragen
              </a>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Sie haben einen festen Preisrahmen? Nennen Sie uns Ihr Budget - wir ordnen
              ehrlich, ob und in welchem Umfang der Auftrag machbar ist.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustLine.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold text-white/92"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.35rem] border border-white/14 bg-white/8 px-4 py-4 shadow-[0_18px_42px_rgba(2,6,23,0.18)] backdrop-blur transition hover:-translate-y-1 hover:border-teal-200/45 hover:bg-white/12"
                >
                  <div className="text-[11px] font-black uppercase tracking-[0.16em] text-teal-200">
                    {item.label}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Warum FLOXANT Reinigung Düsseldorf?
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-slate-950">
              Gute Reinigung beginnt mit einer ehrlichen Einschätzung
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Viele Reinigungsanfragen scheitern nicht an der Reinigung selbst, sondern an
              unklaren Erwartungen: Wie groß ist die Fläche wirklich? Wie stark ist die
              Verschmutzung? Geht es um regelmäßige Reinigung, Grundreinigung oder Übergabe?
              Gibt es Fotos? Gibt es einen festen Termin? Wir klären diese Punkte vorab,
              damit beide Seiten wissen, was realistisch ist.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Dieser Bereich ist bewusst auf Reinigung in Düsseldorf und der näheren Umgebung
              ausgerichtet. Keine verwirrenden Zusatzthemen, sondern ein klarer Anfrageweg für
              Wohnungsreinigung, Büroreinigung, Grundreinigung, Treppenhausreinigung und
              Übergabereinigung.
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {focusCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white"
              >
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="leistungen" className="pt-12">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Leistungen
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-slate-950">
              Reinigungsleistungen für Wohnungen, Büros und saubere Übergaben
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DUESSELDORF_CLEANING_SERVICES.map((item, index) => {
              const Icon = serviceIcons[index];
              return (
                <article
                  key={item.href}
                  className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_22px_58px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_30px_72px_rgba(15,118,110,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-teal-50 text-teal-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-950">{item.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
                  >
                    Detailseite öffnen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section id="einsatzgebiet" className="pt-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Reinigung in Düsseldorf und Umgebung
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-slate-950">
                Lokaler Schwerpunkt in Düsseldorf
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DUESSELDORF_CLEANING.districts.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    <MapPin className="h-4 w-4 text-teal-600" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.06)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Nähere Umgebung
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-slate-950">
                Nah genug für saubere Abstimmung
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Der Schwerpunkt bleibt Düsseldorf. Nahe Orte prüfen wir, wenn Anfahrt,
                Terminfenster und Umfang sinnvoll zusammenpassen.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DUESSELDORF_CLEANING.nearbyAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="preisvorschlag" className="pt-12">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <article className="rounded-[2rem] border border-teal-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_58%,#f8fafc_100%)] p-7 shadow-[0_26px_70px_rgba(15,118,110,0.12)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-700">
                Preisvorschlag / Budget
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-slate-950 md:text-4xl">
                Sie haben ein Budget? Dann nennen Sie es direkt.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Manche Kunden wissen nicht genau, was eine Reinigung kosten darf. Andere haben
                bereits einen festen Preisrahmen. Beides ist in Ordnung. Wenn Sie uns Ihr Budget
                nennen, ordnen wir ehrlich ein, ob der Auftrag dafür realistisch machbar ist, welcher
                Umfang möglich wäre oder welche Punkte angepasst werden müssten.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#rechner"
                  className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Eigenes Budget einordnen lassen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={whatsappHeroHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                >
                  Budget per WhatsApp senden
                </a>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  "Keine automatische Zusage",
                  "Ehrliche Einschätzung nach Umfang und Zustand",
                  "Hilfreich mit Fotos, Fläche und Terminwunsch",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.1rem] border border-teal-100 bg-white/80 px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                So ordnen wir Ihre Anfrage ein
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-slate-950">
                Erst klären, dann sauber planen
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Welche Fläche soll gereinigt werden?",
                  "Geht es um Wohnung, Büro, Praxis, Treppenhaus oder Übergabe?",
                  "Wie ist der aktuelle Zustand?",
                  "Gibt es Fotos oder kurze Videos?",
                  "Bis wann muss die Reinigung erledigt sein?",
                  "Gibt es einen Preisrahmen oder Budgetwunsch?",
                  "Gibt es besondere Bereiche wie Küche, Bad, Fenster, Böden oder starke Verschmutzung?",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.15rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Keine vorschnellen Preisversprechen
            </div>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
              Ein sehr niedriger Preis klingt gut, bis der tatsächliche Aufwand sichtbar wird.
              Deshalb arbeiten wir lieber mit einer ehrlichen Einschätzung: Fläche, Zustand,
              Termin, Reinigungsart und gewünschtes Ergebnis müssen zusammenpassen. So vermeiden
              wir falsche Erwartungen auf beiden Seiten.
            </p>
          </article>
        </section>

        <section id="rechner" className="pt-12">
          <div className="mb-8 max-w-3xl">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Reinigungsrechner
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-slate-950">
              Reinigungsaufwand einschätzen und Budget mitgeben
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Der Rechner liefert eine erste Orientierung. Wenn Sie bereits einen Preisrahmen
              im Kopf haben, tragen Sie ihn direkt mit ein. Wir ordnen dann ein, ob der gewünschte
              Umfang zum Budget, Zustand und Termin passt.
            </p>
          </div>

          <DuesseldorfCleaningCalculator />
        </section>

        <section id="kontakt" className="pt-12">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#132238_100%)] p-7 text-white shadow-[0_28px_72px_rgba(15,23,42,0.22)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-300">
                FLOXANT Reinigung Düsseldorf
              </div>
              <div className="mt-5 space-y-2 text-base leading-8 text-slate-200">
                <div>{DUESSELDORF_CLEANING.address.streetAddress}</div>
                <div>
                  {DUESSELDORF_CLEANING.address.postalCode}{" "}
                  {DUESSELDORF_CLEANING.address.city}
                </div>
                <div>Telefon/WhatsApp: {DUESSELDORF_CLEANING.phoneDisplay}</div>
                <div>E-Mail: {DUESSELDORF_CLEANING.email}</div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Termine nur nach vorheriger Anfrage oder Absprache. Keine offene
                Laufkundschaft.
              </p>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Lokale Folgeseiten
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/duesseldorf/reinigung/datenschutz"
                  className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Datenschutz Düsseldorf
                </Link>
                <Link
                  href="/duesseldorf/reinigung/agb"
                  className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  AGB Düsseldorf
                </Link>
              </div>
              <div className="mt-6 grid gap-3">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
