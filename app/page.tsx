import type { Metadata } from "next";
import Image from "next/image";
import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  FileSearch,
  MapPin,
  MessageCircle,
  PackageOpen,
  Phone,
  Sparkles,
  Truck,
} from "lucide-react";

import { company } from "@/lib/company";
import { buildLeadHref } from "@/lib/lead-intents";
import { generatePageSEO } from "@/lib/seo";
import { buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const path = "/";
const canonical = `${company.url}${path}`;
const requestHref = buildLeadHref({
  path,
  service: "sonstiges",
  intent: "homepage-anfrage",
  priority: "p1",
});
const offerHref = "/angebot-guenstiger-pruefen";
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  "Hallo FLOXANT, ich möchte einen Auftrag in Düsseldorf oder Regensburg kurz besprechen.",
);

const homepageHeadline =
  "Reinigung in Düsseldorf. Umzug und Entrümpelung in Regensburg.";
const homepageTitle = "FLOXANT | Reinigung Düsseldorf & Umzug Regensburg";
const homepageDescription =
  "FLOXANT für Reinigung in Düsseldorf sowie Umzug, Transport, Entrümpelung und Wohnungsauflösung in Regensburg. Online, telefonisch oder per WhatsApp anfragen.";

const mainServices = [
  {
    title: "Reinigung in Düsseldorf",
    text: "Reinigung für Wohnung, Büro, Praxis, Gewerbe, Fenster oder Grundreinigung – einmalig oder regelmäßig.",
    cta: "Reinigung in Düsseldorf ansehen",
    href: "/duesseldorf/reinigung",
    icon: Sparkles,
  },
  {
    title: "Büro & Praxis in Düsseldorf",
    text: "Reinigung für Büros, Praxen und Gewerbeflächen nach Fläche, Räumen, Turnus und möglichen Zeitfenstern.",
    cta: "Büroreinigung ansehen",
    href: "/duesseldorf/bueroreinigung",
    icon: BriefcaseBusiness,
  },
  {
    title: "Umzug & Transport in Regensburg",
    text: "Privatumzug, Möbeltransport, Seniorenumzug oder Klaviertransport mit Angaben zu Strecke, Etagen und Termin.",
    cta: "Umzug in Regensburg ansehen",
    href: "/regensburg/umzug",
    icon: Truck,
  },
  {
    title: "Entrümpelung & Auflösung in Regensburg",
    text: "Keller, Wohnung, Haushalt oder Gewerbefläche räumen und eine Wohnungsauflösung übersichtlich abstimmen.",
    cta: "Entrümpelung ansehen",
    href: "/regensburg/entruempelung",
    icon: PackageOpen,
  },
] as const;

const locations = [
  {
    title: "Düsseldorf",
    text: "Reinigung für Wohnungen, Büros, Praxen, Gewerbeflächen und Fenster sowie Grundreinigung.",
    cta: "Leistungen in Düsseldorf",
    href: "/duesseldorf",
  },
  {
    title: "Regensburg",
    text: "Umzug, Transport, Entrümpelung, Wohnungsauflösung, Seniorenumzug und Klaviertransport.",
    cta: "Leistungen in Regensburg",
    href: "/regensburg",
  },
] as const;

const faqItems = [
  {
    q: "Welche Leistungen kann ich bei FLOXANT anfragen?",
    a: "In Düsseldorf liegt der Schwerpunkt auf Reinigung für private und gewerbliche Räume. In Regensburg können Sie vor allem Umzug, Transport, Entrümpelung und Wohnungsauflösung anfragen.",
  },
  {
    q: "Welche Angaben helfen für eine erste Einschätzung?",
    a: "Hilfreich sind Leistung, Einsatzort, gewünschter Zeitraum und ein kurzer Überblick zum Umfang. Bei Reinigung helfen Fläche, Räume und Turnus; bei Umzügen Start, Ziel, Etagen, Aufzug sowie Möbel und Kartons.",
  },
  {
    q: "Kann ich Fotos mitsenden?",
    a: "Ja. Fotos sind optional und können helfen, Räume, Möbel, Zugänge oder den Umfang besser einzuordnen.",
  },
  {
    q: "Ist einmalige und regelmäßige Reinigung möglich?",
    a: "Beides kann angefragt werden. Nennen Sie dafür die Räume, die ungefähre Fläche und den gewünschten Turnus.",
  },
  {
    q: "Ist meine Anfrage bereits eine Buchung?",
    a: "Nein. Eine Anfrage ist noch keine Buchung. Umfang, Termin und offene Punkte werden zuerst mit Ihnen geklärt.",
  },
] as const;

export const metadata: Metadata = {
  ...generatePageSEO({ path, title: homepageTitle, description: homepageDescription }),
  metadataBase: new URL(company.url),
  title: homepageTitle,
  description: homepageDescription,
  alternates: {
    canonical,
    languages: { "de-DE": path, en: "/en", "x-default": path },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: homepageTitle,
    description: homepageDescription,
    images: [
      {
        url: "/assets/floxant-hero-neu-gedacht.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Dienstleistungen für Reinigung, Umzug und Entrümpelung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: ["/assets/floxant-hero-neu-gedacht.png"],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: homepageHeadline,
        description: homepageDescription,
        path,
        about: ["Reinigung", "Umzug", "Transport", "Entrümpelung", "Wohnungsauflösung"],
        potentialActions: [
          { name: "Anfrage senden", target: requestHref, type: "ContactAction" },
          { name: "Angebot prüfen", target: offerHref, type: "Action" },
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Dienstleistungen in Düsseldorf und Regensburg",
        description: homepageDescription,
        path,
        serviceType: "Reinigung, Umzug, Transport, Entrümpelung und Wohnungsauflösung",
        areaServed: ["Düsseldorf", "Regensburg"],
        availableLanguage: ["de", "en"],
      }),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <JsonLd />

      <section
        data-home-section="hero"
        className="relative isolate overflow-hidden bg-slate-950 text-white"
      >
        <Image
          src="/assets/floxant-hero-neu-gedacht.webp"
          alt="FLOXANT Fahrzeug bei einem regionalen Dienstleistungseinsatz"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[68%_center] opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.97)_0%,rgba(15,23,42,0.9)_48%,rgba(15,23,42,0.28)_100%)]" />
        <div className="mx-auto grid min-h-[min(47rem,100svh)] max-w-7xl items-center px-5 pb-14 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black text-cyan-200">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Düsseldorf und Regensburg
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {homepageHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100 sm:text-xl">
              FLOXANT unterstützt Privatkunden, Unternehmen und Hausverwaltungen. Beschreiben
              Sie kurz, was erledigt werden soll – oder rufen Sie direkt an.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={requestHref}
                data-home-hero-primary
                data-event="request_cta_click"
                data-source="homepage_hero"
                data-service="sonstiges"
                data-cta-label="Anfrage senden"
                data-destination={requestHref}
                className={primaryButton}
              >
                Anfrage senden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
                data-source="homepage_hero"
                className={secondaryButton}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Jetzt anrufen
              </a>
            </div>
            <ul
              className="mt-8 grid max-w-2xl gap-3 text-sm font-bold text-slate-200 sm:grid-cols-3"
              aria-label="Hinweise zur Anfrage"
            >
              {["Fotos sind optional", "Termine nach Verfügbarkeit", "Anfrage ist noch keine Buchung"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      <section
        data-home-section="main-services"
        className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">
              Hauptleistungen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Wobei können wir Sie unterstützen?
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Wählen Sie den Standort und die Leistung, die zu Ihrem Auftrag passen.
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mainServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  data-home-card
                  data-home-main-service={service.title}
                  data-event="service_card_click"
                  data-source="homepage_main_services"
                  className="group flex min-h-64 flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-cyan-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-black">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-slate-600">
                    {service.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-800">
                    {service.cta}
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-home-section="locations"
        className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-cyan-200">
              Standorte
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              FLOXANT in Düsseldorf und Regensburg
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <Link
                key={location.href}
                href={location.href}
                data-home-card
                data-home-location={location.title}
                className="group rounded-xl border border-white/15 bg-white/10 p-6 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:p-8"
              >
                <Building2 className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-black">{location.title}</h3>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-200">
                  {location.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                  {location.cta}
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm font-semibold leading-7 text-slate-300">
            Liegt der Einsatzort im Umfeld? Nennen Sie den Ort in Ihrer Anfrage. Wir prüfen,
            ob die gewünschte Leistung dort möglich ist.
          </p>
        </div>
      </section>

      <section
        data-home-section="about"
        className="bg-cyan-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">
              Über FLOXANT
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              FLOXANT – persönlich erreichbar, wenn etwas erledigt werden muss
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">
              FLOXANT unterstützt Privatkunden, Unternehmen und Hausverwaltungen in Düsseldorf
              und Regensburg. Sie können Ihren Auftrag kurz beschreiben, Fotos ergänzen oder
              direkt anrufen. Danach klären wir Umfang, Termin und offene Punkte persönlich mit
              Ihnen.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-100 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-black text-slate-950">So erreichen Sie FLOXANT</h3>
            <ul className="mt-5 space-y-4 text-sm font-semibold leading-7 text-slate-600">
              {[
                "Auftrag online kurz beschreiben",
                "Fotos oder vorhandenes Angebot ergänzen",
                `Telefonisch unter ${company.phone}`,
                "Per WhatsApp schreiben",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        data-home-section="offer-check"
        className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="max-w-3xl">
            <FileSearch className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Schon ein Angebot erhalten?
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Wenn Leistungsumfang, Preispositionen oder mögliche Zusatzkosten unklar sind,
              können Sie das Angebot, einen Screenshot oder die wichtigsten Angaben senden.
            </p>
            <p className="mt-3 text-sm font-bold text-slate-600">
              Keine Rechtsberatung und keine Ersparnisgarantie.
            </p>
          </div>
          <Link
            href={`${offerHref}#guenstiger-form`}
            data-home-offer-cta
            data-event="service_card_click"
            data-source="homepage_offer_check"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Angebot prüfen lassen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        data-home-section="process"
        className="border-t border-slate-100 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">
              So funktioniert es
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              In drei Schritten zur geklärten Anfrage
            </h2>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Leistung und Ort nennen",
                text: "Wählen Sie den passenden Bereich und sagen Sie uns, wo der Auftrag ausgeführt werden soll.",
              },
              {
                title: "Auftrag kurz beschreiben",
                text: "Nennen Sie Umfang und Terminwunsch. Fotos oder ein vorhandenes Angebot sind optional.",
              },
              {
                title: "Offene Punkte klären",
                text: "Danach stimmen wir mit Ihnen ab, was dazugehört und welche Angaben noch fehlen.",
              },
            ].map((step, index) => (
              <li key={step.title} className="border-t-2 border-slate-950 pt-5">
                <span className="text-sm font-black text-blue-800">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        data-home-section="faq"
        className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-wider text-cyan-200">
            Häufige Fragen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Kurz und konkret beantwortet
          </h2>
          <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
                  {item.q}
                  <span
                    className="text-cyan-200 transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-8 text-sm font-semibold leading-7 text-slate-300">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        data-home-section="contact"
        aria-labelledby="home-contact-title"
        className="bg-cyan-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-cyan-100 lg:grid-cols-[1fr_auto] lg:items-center sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">
              Direkter Kontakt
            </p>
            <h2
              id="home-contact-title"
              className="mt-3 text-3xl font-black tracking-tight sm:text-5xl"
            >
              Lieber kurz klären? Rufen Sie uns an.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Wenn sich Ihr Auftrag schwer in wenigen Feldern beschreiben lässt, müssen Sie
              kein langes Formular ausfüllen. Rufen Sie FLOXANT an oder schreiben Sie per
              WhatsApp. Für eine schriftliche Anfrage bleibt der Anfrageweg verfügbar.
            </p>
            <p className="mt-3 text-lg font-black text-slate-950">{company.phone}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[38rem]">
            <a
              href={`tel:${company.phoneRaw}`}
              data-event="phone_click"
              data-source="homepage_contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Jetzt anrufen
            </a>
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              data-source="homepage_contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-900 transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp öffnen
            </a>
            <Link
              href={requestHref}
              data-home-final-cta
              data-event="request_cta_click"
              data-source="homepage_contact"
              data-service="sonstiges"
              data-cta-label="Anfrage senden"
              data-destination={requestHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950 transition hover:border-blue-300 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Anfrage senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
