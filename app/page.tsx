import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  FileSearch,
  KeyRound,
  Languages,
  MapPin,
  PackageOpen,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { ToolJourneyPanel } from "@/components/conversion/ToolJourneyPanel";
import { company } from "@/lib/company";
import { buildGlobalRequestHref } from "@/lib/lead-intents/resolve-request-context";
import { generatePageSEO } from "@/lib/seo";
import { searchAuthorityPages } from "@/lib/search-authority";
import { buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

const path = "/";
const canonical = `${company.url}${path}`;
const requestHref = buildGlobalRequestHref("global_homepage");
const offerHref = "/angebot-guenstiger-pruefen";

const homepageAuthority = searchAuthorityPages["/"];
const homepageTitle = homepageAuthority.seoTitle;
const homepageDescription = homepageAuthority.description;

const mainServices = [
  {
    title: "Umzug in Regensburg",
    text: "Privat-, Senioren-, Möbel- und Klaviertransporte mit klaren Angaben zu Strecke, Etage, Zugang und Termin.",
    cta: "Umzug in Regensburg ansehen",
    href: "/regensburg/umzug",
    icon: Truck,
  },
  {
    title: "Reinigung in Düsseldorf",
    text: "Reinigung für Wohnung, Büro, Praxis, Gewerbe oder Fenster – mit Fläche, Turnus und Terminwunsch.",
    cta: "Reinigung in Düsseldorf ansehen",
    href: "/duesseldorf/reinigung",
    icon: Sparkles,
  },
  {
    title: "Räumung in Regensburg",
    text: "Keller, Wohnung, Haushalt oder Gewerbefläche räumen – auf Wunsch mit anschließender Reinigung.",
    cta: "Räumung in Regensburg ansehen",
    href: "/regensburg/entruempelung",
    icon: PackageOpen,
  },
  {
    title: "Büro & Gewerbe in Düsseldorf",
    text: "Büro-, Gewerbe- und Praxisreinigung nach Fläche, Raumliste, Turnus, Zugang und Zeitfenster.",
    cta: "Reinigung für Unternehmen ansehen",
    href: "/duesseldorf/bueroreinigung",
    icon: BriefcaseBusiness,
  },
  {
    title: "Angebot prüfen",
    text: "Vorhandenes Angebot prüfen lassen, wenn Preis, Leistungsumfang oder mögliche Zusatzkosten unklar sind.",
    cta: "Angebot prüfen lassen",
    href: offerHref,
    icon: FileSearch,
  },
  {
    title: "Besondere Situationen",
    text: "Diskrete Fälle, kurzfristiger Plan B, Übergabe oder Objektbrief passend zur Situation anfragen.",
    cta: "Besondere Lösungen ansehen",
    href: "/signature-services",
    icon: ShieldCheck,
  },
] as const;

const locations = [
  {
    title: "Düsseldorf",
    text: "Reinigung für Wohnung, Büro, Praxis, Gewerbe und Fenster sowie Prüfung vorhandener Reinigungsangebote.",
    cta: "Leistungen in Düsseldorf",
    href: "/duesseldorf",
  },
  {
    title: "Regensburg",
    text: "Umzug, Reinigung, Entrümpelung, Klaviertransport, Seniorenumzug und Wohnungsauflösung.",
    cta: "Leistungen in Regensburg",
    href: "/regensburg",
  },
] as const;

const specialSolutions = [
  {
    title: "Diskret-Service",
    text: "Für sensible Anfragen mit zurückhaltender Kommunikation.",
    href: "/diskret-service",
  },
  {
    title: "Plan-B-Service",
    text: "Wenn ein Anbieter absagt oder ein Termin kurzfristig neu abgestimmt werden muss.",
    href: "/plan-b-service",
  },
  {
    title: "Objektbrief",
    text: "Objekt, Fotos, Umfang und Termin für eine klare Anfrage zusammenfassen.",
    href: "/objektbrief",
  },
  {
    title: "Übergabehilfe",
    text: "Reinigung, Entrümpelung und offene Punkte vor einer Übergabe abstimmen.",
    href: "/uebergabeakte",
  },
] as const;

const faqItems = [
  {
    q: "Welche Leistungen bietet FLOXANT an?",
    a: "Zu den Hauptleistungen gehören Umzug und Transport, Reinigung, Entrümpelung und Auflösung. Für Unternehmen sowie besondere oder sensible Situationen gibt es passende Kontaktwege.",
  },
  {
    q: "Arbeitet FLOXANT in Düsseldorf und Regensburg?",
    a: "Ja, FLOXANT nimmt Anfragen für Düsseldorf und Regensburg an. Liegt Ihr Einsatzort im Umfeld, nennen Sie ihn einfach im Formular.",
  },
  {
    q: "Kann ich Fotos mitsenden?",
    a: "Ja. Fotos sind optional, helfen aber oft dabei, Umfang und Zugang besser einzuschätzen.",
  },
  {
    q: "Kann ich ein vorhandenes Angebot prüfen lassen?",
    a: "Ja. Sie können ein Angebot, einen Screenshot oder die wichtigsten Angaben senden. FLOXANT betrachtet Leistungsumfang, Preispositionen und mögliche Zusatzkosten.",
  },
  {
    q: "Ist meine Anfrage bereits eine Buchung?",
    a: "Nein. Ihre Anfrage ist unverbindlich und noch keine Buchung. Ein Auftrag entsteht erst nach einer ausdrücklichen Vereinbarung.",
  },
  {
    q: "Was passiert nach dem Absenden?",
    a: "Wir sehen uns Ihre Angaben an und melden uns über den gewählten Kontaktweg. Falls Informationen fehlen, fragen wir gezielt nach.",
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
        alt: "FLOXANT Dienstleistungen für Umzug, Reinigung und Entrümpelung",
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
        name: homepageAuthority.headline,
        description: homepageDescription,
        path,
        about: ["Umzug", "Reinigung", "Entrümpelung", "Angebotsprüfung"],
        potentialActions: [
          { name: "Anfrage senden", target: requestHref, type: "ContactAction" },
          { name: "Angebot prüfen", target: offerHref, type: "Action" },
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Dienstleistungen",
        description: homepageDescription,
        path,
        serviceType: "Umzug, Reinigung und Entrümpelung",
        areaServed: ["Düsseldorf", "Regensburg"],
        availableLanguage: ["de", "en"],
      }),
      {
        "@type": "Organization",
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        email: company.email,
        telephone: company.phoneRaw,
        sameAs: company.sameAs,
      },
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

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <JsonLd />
      <LocalBusinessJsonLd />

      <section data-home-section="hero" className="relative isolate overflow-hidden bg-slate-950 text-white">
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
              {homepageAuthority.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100 sm:text-xl">
              FLOXANT unterstützt Privatkunden, Unternehmen und Hausverwaltungen. Beschreiben Sie kurz Ihren Auftrag oder senden Sie ein vorhandenes Angebot zur Prüfung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={requestHref}
                data-home-hero-primary
                data-event="seo_cta_click"
                data-source="homepage_hero"
                data-service="sonstiges"
                data-page-intent="homepage-anfrage"
                data-priority="p1"
                data-cta-label="Anfrage senden"
                data-destination={requestHref}
                className={primaryButton}
              >
                Anfrage senden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={offerHref} data-home-offer-cta data-event="service_card_click" data-source="homepage_hero" className={secondaryButton}>
                Angebot prüfen
                <FileSearch className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 grid max-w-2xl gap-3 text-sm font-bold text-slate-200 sm:grid-cols-3" aria-label="Hinweise zur Anfrage">
              {["Fotos sind optional", "Termine nach Verfügbarkeit", "Anfrage ist noch keine Buchung"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section data-home-section="main-services" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">Hauptleistungen</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Wobei können wir Sie unterstützen?</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">Wählen Sie einen passenden Bereich. Weitere Details finden Sie auf den jeweiligen Leistungsseiten.</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-cyan-200"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-5 text-xl font-black">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-slate-600">{service.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-800">{service.cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section data-home-section="locations" className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-cyan-200">Standorte</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">FLOXANT in Düsseldorf und Regensburg</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <Link key={location.href} href={location.href} data-home-card data-home-location={location.title} className="group rounded-xl border border-white/15 bg-white/10 p-6 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:p-8">
                <Building2 className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-black">{location.title}</h3>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-200">{location.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200">{location.cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm font-semibold leading-7 text-slate-300">Liegt der Einsatzort im Umfeld? Geben Sie den Ort im Anfrageformular an. Wir sehen nach, ob die Leistung dort möglich ist.</p>
        </div>
      </section>

      <section data-home-section="offer-check" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl bg-cyan-50 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="max-w-3xl">
            <FileSearch className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Schon ein Angebot erhalten?</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">Wir sehen uns an, ob Leistungsumfang, Preispositionen und mögliche Zusatzkosten verständlich beschrieben sind. Sie können ein Angebot, einen Screenshot oder die wichtigsten Angaben senden.</p>
            <p className="mt-3 text-sm font-bold text-slate-600">Keine Rechtsberatung und keine Ersparnisgarantie.</p>
          </div>
          <div className="grid gap-3 md:min-w-64">
            <Link href={`${offerHref}#guenstiger-form`} data-home-offer-cta className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Angebot prüfen lassen<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href={offerHref} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950 hover:border-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Mehr über die Angebotsprüfung</Link>
          </div>
        </div>
      </section>

      <section data-home-section="special-solutions" className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">Besondere Situationen</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Wenn ein Standardauftrag nicht ausreicht</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {specialSolutions.map((solution) => (
              <Link key={solution.href} href={solution.href} data-home-card data-home-special={solution.title} className="group flex min-h-56 flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <KeyRound className="h-5 w-5 text-blue-800" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black">{solution.title}</h3>
                <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-slate-600">{solution.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-800">Mehr erfahren<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-home-section="process" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700">So funktioniert es</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">So stellen Sie Ihre Anfrage</h2>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { title: "Leistung und Ort wählen", text: "Starten Sie mit dem Bereich, der am besten zu Ihrem Auftrag passt." },
              { title: "Auftrag kurz beschreiben", text: "Fotos oder ein vorhandenes Angebot können Sie optional ergänzen." },
              { title: "Rückmeldung erhalten", text: "Wir sehen uns Ihre Angaben an und melden uns über den gewählten Kontaktweg." },
            ].map((step, index) => (
              <li key={step.title} className="border-t-2 border-slate-950 pt-5">
                <span className="text-sm font-black text-blue-800">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-home-section="language" className="border-t border-slate-200 bg-cyan-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-blue-800">
              <Languages className="h-4 w-4" aria-hidden="true" />
              Deutsch or English
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Service information is also available in English.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              English-speaking customers can choose localized information for cleaning in Düsseldorf and for moving,
              clearance or cleaning in Regensburg. Services are provided in Germany.
            </p>
          </div>
          <Link
            href="/en"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            View services in English
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ToolJourneyPanel intent="overview" region="both" />

      <section data-home-section="faq-final" className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-cyan-200">Häufige Fragen</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Kurz erklärt</h2>
            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
                    {item.q}
                    <span className="text-cyan-200 transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 pr-8 text-sm font-semibold leading-7 text-slate-300">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-2xl bg-white p-7 text-slate-950 sm:p-9">
            <h2 className="text-3xl font-black tracking-tight">Bereit für Ihre Anfrage?</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">Nennen Sie Leistung, Einsatzort und Terminwunsch. Weitere Angaben können Sie später ergänzen.</p>
            <Link href={requestHref} data-home-final-cta className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
              Anfrage senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
