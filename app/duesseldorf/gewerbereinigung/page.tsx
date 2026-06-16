import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  FileSearch,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";

import { GewerbereinigungAdsForm } from "@/components/duesseldorf/GewerbereinigungAdsForm";
import { InternationalCustomerHint } from "@/components/conversion";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { company, duesseldorfCompany } from "@/lib/company";
import { floxantServices } from "@/lib/floxant-services";
import { getServiceVisual } from "@/lib/service-visuals";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/duesseldorf/gewerbereinigung";
const canonical = `${company.url}${path}`;
const heroVisual = getServiceVisual({
  region: "duesseldorf",
  slug: "gewerbereinigung",
  path,
  serviceLabel: "Gewerbereinigung",
});
const heroImage = heroVisual.src;
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Reinigung Düsseldorf,",
    "ich möchte Gewerbereinigung in Düsseldorf anfragen.",
    "Objektart, PLZ, Fläche, Turnus und Fotos kann ich senden.",
  ].join("\n"),
);

const serviceCards = floxantServices.filter(
  (service) =>
    service.region === "duesseldorf" &&
    [
      "duesseldorf-gewerbereinigung",
      "duesseldorf-bueroreinigung",
      "duesseldorf-praxisreinigung",
      "duesseldorf-unterhaltsreinigung",
      "duesseldorf-treppenhausreinigung",
      "duesseldorf-angebot-vergleichen",
    ].includes(service.id),
);

const heroTrustItems = [
  "Kostenlose erste Rückmeldung",
  "WhatsApp, Telefon oder Formular",
  "Bestehendes Angebot prüfbar",
  "Keine Preisversprechen",
];
const pageTitle = "Gewerbereinigung Düsseldorf | Commercial Cleaning";
const pageDescription =
  "FLOXANT prüft Gewerbereinigung in Düsseldorf für Büro, Praxis, Kanzlei und Objekt. Raumliste, Turnus, Fotos und Angebot senden. Anfrage auf Deutsch oder Englisch möglich.";

const requestHints = [
  "Objektart: Büro, Praxis, Kanzlei, Treppenhaus oder Gewerbeobjekt",
  "Ort oder PLZ in Düsseldorf, Zugang und Ansprechpartner",
  "Fläche, Räume, Sanitärbereiche und gewünschter Turnus",
  "Fotos, Zeitfenster und besondere Anforderungen",
];

const processSteps = [
  {
    title: "Kurz anfragen",
    text: "Sie senden Objektart, Ort, Kontaktweg und die wichtigsten Eckdaten per Formular, WhatsApp oder Telefon.",
  },
  {
    title: "Bedarf einordnen",
    text: "FLOXANT prüft, welcher Umfang realistisch ist und welche Punkte vor einem Angebot noch fehlen.",
  },
  {
    title: "Rückmeldung erhalten",
    text: "Sie bekommen Rückfragen, einen Vorschlag für den nächsten Schritt oder ein unverbindliches Angebot.",
  },
  {
    title: "Sauber entscheiden",
    text: "Erst wenn Umfang, Zugang, Turnus und Termin klar sind, wird aus der Anfrage eine verbindliche Planung.",
  },
];

const trustItems = [
  {
    title: "Büros und Unternehmen",
    text: "Arbeitsplätze, Besprechungsräume, Küchen, Sanitärbereiche und Eingänge werden nach Nutzung und Zeitfenster geplant.",
    Icon: Building2,
  },
  {
    title: "Praxen nach Absprache",
    text: "Allgemeine Praxisflächen können geprüft werden. Medizinische Spezialdesinfektion wird nicht pauschal zugesagt.",
    Icon: Stethoscope,
  },
  {
    title: "Regelmäßige Reinigung",
    text: "Unterhaltsreinigung wird nach Raumliste, Turnus, Zugang und Ansprechpartner abgestimmt.",
    Icon: Clock3,
  },
  {
    title: "Klare Grenzen",
    text: "Leistungsumfang, Zusatzpunkte und besondere Anforderungen werden vor einer Zusage verständlich geklärt.",
    Icon: ShieldCheck,
  },
];

const signatureCards = [
  {
    title: "Premium-Reinigung",
    text: "Für repräsentative Flächen, empfindliche Bereiche und Objekte, bei denen Auftritt und Diskretion besonders wichtig sind.",
    href: "/duesseldorf/luxusreinigung",
    Icon: Sparkles,
  },
  {
    title: "Diskrete Reinigung",
    text: "Für Kanzleien, Praxen, private Bürobereiche und Termine mit wenig sichtbarer Abstimmung vor Ort.",
    href: "/duesseldorf/kanzleireinigung",
    Icon: ShieldCheck,
  },
  {
    title: "Individuelle Objektbetreuung",
    text: "Für Hausverwaltungen, mehrere Einheiten oder Objekte mit wiederkehrenden Kontroll- und Abstimmungspunkten.",
    href: "/duesseldorf/hausverwaltung-reinigung",
    Icon: UsersRound,
  },
  {
    title: "Angebotsprüfung",
    text: "Vorhandenes Angebot hochladen oder Eckdaten senden. FLOXANT prüft sachlich, ob eine passende Alternative möglich ist.",
    href: "/angebot-vergleichen-duesseldorf",
    Icon: FileSearch,
    event: "offer_check_started",
  },
  {
    title: "Reinigungskonzept",
    text: "Für Büros und Praxen, die einen klaren Turnus, Raumlisten, Prioritäten und Zeitfenster abstimmen möchten.",
    href: "/duesseldorf/bueroreinigung",
    Icon: ClipboardCheck,
  },
];

const costFactors = [
  "Fläche, Raumanzahl und Nutzungsart",
  "Turnus: einmalig, wöchentlich oder häufiger",
  "Sanitärbereiche, Küchen, Eingänge und Nebenflächen",
  "Zeitfenster, Zugang und Schlüsselregelung",
  "Besondere Anforderungen, Material oder Zusatzleistungen",
  "Fotos, vorhandene Angebote und gewünschter Starttermin",
];

const faqItems = [
  {
    q: "Was kostet eine Gewerbereinigung in Düsseldorf?",
    a: "Die Kosten hängen von Objektart, Fläche, Turnus, Zeitfenster, Sanitärbereichen, Zugang und gewünschten Zusatzleistungen ab. FLOXANT nennt keine Pauschalpreise ohne Prüfung, damit die Rückmeldung zum Objekt passt.",
  },
  {
    q: "Welche Informationen braucht FLOXANT für ein Angebot?",
    a: "Hilfreich sind Objektart, Stadtteil oder PLZ, Fläche, Räume, Sanitärbereiche, gewünschter Turnus, Zeitfenster, Zugang, Fotos und ein Ansprechpartner.",
  },
  {
    q: "Reinigt FLOXANT Büros, Praxen und Kanzleien?",
    a: "Ja, FLOXANT Düsseldorf prüft gewerbliche Reinigung für Büros, Praxen nach Absprache, Kanzleien, Studios, Treppenhäuser, Hausverwaltungen und weitere Gewerbeobjekte.",
  },
  {
    q: "Kann ich Fotos oder ein vorhandenes Angebot per WhatsApp senden?",
    a: "Ja. Fotos, Raumlisten oder ein bestehendes Angebot können per WhatsApp oder über das Formular gesendet werden. Zugangscodes und sensible Daten sollten nicht unverschlüsselt geschickt werden.",
  },
  {
    q: "Ist die Anfrage kostenlos und unverbindlich?",
    a: "Ja. Die erste Anfrage ist kostenlos und unverbindlich. Eine verbindliche Planung entsteht erst nach Abstimmung von Umfang, Termin und Leistung.",
  },
  {
    q: "Prüft FLOXANT auch bestehende Reinigungsangebote?",
    a: "Ja. FLOXANT prüft vorhandene Angebote sachlich und individuell. Es gibt kein Versprechen, jedes Angebot zu unterbieten.",
  },
  {
    q: "Sind regelmäßige Reinigungstermine möglich?",
    a: "Ja. Regelmäßige Unterhaltsreinigung kann nach Objekt, Raumliste, Turnus und Zeitfenster abgestimmt werden.",
  },
  {
    q: "Arbeitet FLOXANT auch außerhalb der Geschäftszeiten?",
    a: "Zeitfenster vor Arbeitsbeginn, nach Feierabend oder am Wochenende können nach Objekt, Umfang, Zugang und Verfügbarkeit geprüft werden.",
  },
  {
    q: "Was ist der Unterschied zwischen Büroreinigung und Gewerbereinigung?",
    a: "Büroreinigung bezieht sich meist auf Arbeitsplätze, Besprechungsräume, Küchen und Sanitärbereiche. Gewerbereinigung ist breiter und kann Praxen, Kanzleien, Treppenhäuser, Studios oder andere gewerbliche Flächen umfassen.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Gewerbereinigung Düsseldorf",
    "Büroreinigung Düsseldorf",
    "Praxisreinigung Düsseldorf",
    "Unterhaltsreinigung Düsseldorf",
    "Treppenhausreinigung Düsseldorf",
    "Reinigungsfirma Düsseldorf",
  ],
  alternates: {
    canonical,
    languages: {
      "de-DE": canonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: heroVisual.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImage],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Gewerbereinigung Düsseldorf",
        description:
          "Gewerbereinigung in Düsseldorf für Unternehmen, Praxen, Kanzleien und Gewerbeobjekte mit Formular, WhatsApp, Telefon und Angebotsprüfung.",
        path,
        about: [
          "Gewerbereinigung Düsseldorf",
          "Büroreinigung Düsseldorf",
          "Praxisreinigung Düsseldorf",
          "Unterhaltsreinigung Düsseldorf",
          "Reinigungsangebot prüfen Düsseldorf",
        ],
        potentialActions: [
          { name: "Kostenlos anfragen", target: `${path}#kontakt`, type: "ContactAction" },
          { name: "Per WhatsApp Kontakt aufnehmen", target: whatsappHref, type: "ContactAction" },
          { name: "Angebot prüfen lassen", target: "/angebot-vergleichen-duesseldorf", type: "Action" },
        ],
      }),
      {
        "@type": "LocalBusiness",
        "@id": `${company.url}/duesseldorf#localbusiness`,
        name: duesseldorfCompany.name,
        url: canonical,
        telephone: duesseldorfCompany.phoneRaw,
        email: duesseldorfCompany.email,
        image: `${company.url}${heroImage}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: duesseldorfCompany.streetAddress,
          postalCode: duesseldorfCompany.postalCode,
          addressLocality: duesseldorfCompany.city,
          addressCountry: duesseldorfCompany.countryCode,
        },
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann"].map((name) => ({
          "@type": "City",
          name,
        })),
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Gewerbereinigung Düsseldorf",
        serviceType: "Gewerbereinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung",
        provider: { "@id": `${company.url}/duesseldorf#localbusiness` },
        areaServed: "Düsseldorf und Umgebung",
        url: canonical,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: canonical,
          availableLanguage: ["de", "en"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gewerbliche Reinigung in Düsseldorf",
          itemListElement: serviceCards.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              url: `${company.url}${service.href}`,
            },
          })),
        },
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Düsseldorf", item: "/duesseldorf" },
        { name: "Gewerbereinigung", item: path },
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

export default function GewerbereinigungDuesseldorfPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt={heroVisual.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[62%_50%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.86)_48%,rgba(15,23,42,0.44)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-16 lg:pt-40">
          <div className="self-center">
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              FLOXANT Düsseldorf
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Gewerbereinigung in Düsseldorf - klare Rückmeldung für Büros, Praxen und Unternehmen
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Senden Sie kurz Objektart, Fläche, gewünschten Turnus und Zeitfenster.
              FLOXANT prüft den Bedarf und meldet sich mit einer realistischen Einschätzung zurück.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {heroTrustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#kontakt"
                data-event="hero_cta_click"
                data-contact-channel="form"
                data-source="gewerbereinigung_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-300"
              >
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                data-contact-channel="whatsapp"
                data-source="gewerbereinigung_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/40 bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:${duesseldorfCompany.phoneRaw}`}
                data-event="phone_click"
                data-contact-channel="phone"
                data-source="gewerbereinigung_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {duesseldorfCompany.phone}
              </a>
              <Link
                href="/angebot-vergleichen-duesseldorf"
                data-event="offer_check_started"
                data-source="gewerbereinigung_hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
              >
                Angebot prüfen
                <FileSearch className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div id="kontakt" className="scroll-mt-32">
            <GewerbereinigungAdsForm />
          </div>
        </div>
      </section>

      <InternationalCustomerHint
        cityLabel="Düsseldorf"
        serviceLabel="Gewerbereinigung, Büroreinigung, Praxisreinigung oder Unterhaltsreinigung"
        tags={["Commercial cleaning", "Office cleaning", "Cleaning company", "Cleaning quote", "Photos welcome"]}
        primaryHref="#kontakt"
        photoHref="#kontakt"
        offerHref="/angebot-guenstiger-pruefen#guenstiger-form"
      />

      <section className="border-b border-slate-200 bg-slate-50 px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Was wir vorab wissen sollten
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Gute Rückmeldung braucht keine lange Vorbereitung.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Eine kurze Beschreibung reicht für den Start. Je konkreter Objekt, Turnus und Zeitfenster sind,
              desto schneller lässt sich der passende nächste Schritt klären.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {requestHints.map((hint) => (
              <div key={hint} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                {hint}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Leistungen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Gewerbliche Reinigung für Düsseldorf, klar eingeordnet.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Wählen Sie die passende Richtung oder senden Sie nur die Eckdaten. FLOXANT ordnet die Anfrage
              nach Objekt, Nutzung und gewünschtem Reinigungsrhythmus ein.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service) => (
              <FloxServiceCard key={service.id} service={service} source="gewerbereinigung_page" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Vertrauen im Alltag
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
              Reinigung, die zu Ihrem Betrieb passen muss.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-300">
              FLOXANT arbeitet nicht mit pauschalen Versprechen. Wichtig sind klare Zuständigkeiten,
              erreichbare Ansprechpartner, realistische Zeitfenster und ein Umfang, der zum Objekt passt.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <item.Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              FLOXANT Signature
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Extra abgestimmt, wenn das Objekt mehr Ruhe braucht.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Für repräsentative, sensible oder komplexere Objekte kann die Anfrage genauer geführt werden:
              diskreter, strukturierter und mit klareren Zuständigkeiten.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {signatureCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                data-event={card.event || "service_card_click"}
                data-source="gewerbereinigung_signature"
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
              >
                <card.Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  Ansehen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Kosten realistisch einschätzen
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Der Preis entsteht aus dem Objekt, nicht aus einer Zahl im Voraus.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Damit ein Angebot belastbar ist, müssen Fläche, Nutzung, Turnus und Zugänglichkeit zusammenpassen.
              FLOXANT prüft diese Punkte, bevor ein Leistungsumfang empfohlen wird.
            </p>
            <Link
              href="#kontakt"
              data-event="hero_cta_click"
              data-source="gewerbereinigung_costs"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Eckdaten senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {costFactors.map((factor) => (
              <div key={factor} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
                <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                {factor}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              So läuft die Anfrage ab
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Vom ersten Kontakt zur klaren Rückmeldung.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="angebot-pruefen" className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Bereits ein Angebot erhalten?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Reinigungsangebot sachlich prüfen lassen.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Wenn bereits ein Angebot vorliegt, prüft FLOXANT kostenlos und unverbindlich, ob eine
              passende Alternative möglich ist. Es geht nicht um leere Preisversprechen, sondern um
              Objekt, Umfang, Turnus und realistische Machbarkeit.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-3">
              {[
                "Kein pauschales Unterbieten und keine Preisgarantie.",
                "Objekt, Umfang, Turnus und Zeitfenster werden individuell bewertet.",
                "Sie erhalten eine klare Rückmeldung, wenn Angaben fehlen oder eine Alternative nicht sinnvoll ist.",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm font-bold leading-6 text-slate-700">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/angebot-vergleichen-duesseldorf"
              data-event="offer_check_started"
              data-source="gewerbereinigung_offer_check"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Angebot prüfen lassen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Häufige Fragen zur Gewerbereinigung.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Die wichtigsten Punkte für Unternehmen, Praxen, Kanzleien und Hausverwaltungen in Düsseldorf.
            </p>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.q} open={index === 0} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-black text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
