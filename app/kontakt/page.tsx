import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPinned, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactPathChooser } from "@/components/ContactPathChooser";
import {
  InternationalCustomerHint,
  ServiceDecisionGuide,
  TrustProofSection,
} from "@/components/conversion";
import { CustomerNextStepPanel } from "@/components/CustomerNextStepPanel";
import { CustomerConcernPanel } from "@/components/CustomerConcernPanel";
import { LeadTrustBlock } from "@/components/LeadTrustBlock";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { LocalContactPanel } from "@/components/LocalContactPanel";
import { LocationServiceSwitcher } from "@/components/LocationServiceSwitcher";
import { NoFakeClaimsNotice } from "@/components/NoFakeClaimsNotice";
import { ObjectionAnswerGrid } from "@/components/ObjectionAnswerGrid";
import { ProcessProofSteps } from "@/components/ProcessProofSteps";
import { SeoLeadForm } from "@/components/SeoLeadForm";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceFitAdvisor } from "@/components/ServiceFitAdvisor";
import { ServiceIntentSelector } from "@/components/ServiceIntentSelector";
import { WhatWeNeedChecklist } from "@/components/WhatWeNeedChecklist";
import {
  ContactTrustPanel,
  contactEntryPoints,
  googleMapsUrl,
  whatsappUrl,
} from "@/components/seo/ContactTrustPanel";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { getDictionary } from "@/get-dictionary";
import { company } from "@/lib/company";
import { customerNextSteps } from "@/lib/professional-copy";
import { generatePageSEO } from "@/lib/seo";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_METRO_DISTRICT_LINKS,
} from "@/lib/bavaria-coverage";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { resolveLeadIntent } from "@/lib/lead-intents";

const faqItems = [
  {
    q: "Wie erreiche ich FLOXANT am schnellsten?",
    a: "Am schnellsten starten Sie über die Buchungsseite, den Rechner oder die Express-Anfrage. Für direkte Rückfragen sind Telefon, WhatsApp und E-Mail klar sichtbar angegeben.",
  },
  {
    q: "Ist eine Kontaktaufnahme direkt eine Buchung?",
    a: "Nein. Eine Kontaktaufnahme oder Rechner-Anfrage startet zuerst die fachliche Vorprüfung. Eine Beauftragung entsteht erst nach klarer Abstimmung von Leistung, Termin und Dokumenten.",
  },
  {
    q: "Welche Angaben helfen bei einer schnellen Rückmeldung?",
    a: "Hilfreich sind Serviceart, Ort, Umfang, Zugang, Terminwunsch, Fotos, besondere Bedingungen und eine optionale Preisvorstellung.",
  },
  {
    q: "Für welche Region ist FLOXANT erreichbar?",
    a: "FLOXANT führt Regensburg und Düsseldorf als lokale Standorte. Regensburg ist für Umzug, Reinigung, Entrümpelung und Übergabe stark gepflegt; Düsseldorf hat einen eigenen Schwerpunkt für Reinigung und objektbezogene Anfragen.",
  },
  {
    q: "Kann ich auch nur eine Preisvorstellung senden?",
    a: "Ja. Die Preisvorstellung ergänzt die fachliche Einschätzung, ersetzt sie aber nicht. Sie hilft bei der Prüfung, ob Budget und Leistungsumfang zusammenpassen.",
  },
  {
    q: "Welche URL eignet sich für Google Maps oder das Google-Unternehmensprofil?",
    a: "Für direkte Anfragen eignet sich vor allem die Buchungsseite. Sie bündelt Buchung, Express-Check, Preisvorstellung und klare nächste Schritte in einem einzigen sauberen Startpunkt.",
  },
  {
    q: "Gibt es auch einen gezielten Kontaktweg für Firmen oder sensible Anfragen?",
    a: "Ja. Für gewerbliche Reinigung gibt es die B2B-Seite in Regensburg. Wenn es um sensible private Themen geht, ist der Private-Client-Bereich der ruhigere Startpunkt.",
  },
];

const preparationItems = [
  "Serviceart wählen: Umzug, Reinigung, Entrümpelung, Büroumzug oder zusätzliche Hilfe.",
  "Ort und Zeitraum nennen: Regensburg, Bayern, Strecke, Datum oder gewünschtes Zeitfenster.",
  "Umfang beschreiben: Volumen, Fläche, Räume, Etagen, Aufzug, Laufwege oder Fotos.",
  "Kontaktweg festlegen: Rückruf, WhatsApp oder E-Mail für die nächste Abstimmung.",
];

const localTrustCards = [
  {
    title: "Schnell anfragen",
    text: "Wer schon weiß, worum es geht, landet direkt bei der Buchung: Leistung, Ort, Termin und Kontaktweg werden sauber abgefragt.",
    href: "/buchung",
    cta: "Buchungsseite öffnen",
  },
  {
    title: "Regensburg als Basis",
    text: "Adresse, Telefonnummer und Kontaktwege bleiben klar sichtbar. So wissen Kunden sofort, wo FLOXANT erreichbar ist und welcher Weg zur Anfrage passt.",
    href: company.mapsSearchUrl,
    cta: "Standort bei Google Maps",
  },
  {
    title: "Klare Wege statt Umwege",
    text: "Kontakt, Rechner, Express und Preisvorstellung bleiben getrennt. Das macht die Anfrage einfacher und spart spätere Rückfragen.",
    href: "/rechner",
    cta: "Rechner ansehen",
  },
  {
    title: "FLOXANT empfehlen",
    text: "Kunden, Freunde, Vermieter oder Makler können einen Partnercode teilen. Der 50-Euro-Bonus wird nur bei bestätigtem und bezahltem Auftrag geprüft.",
    href: "/empfehlen",
    cta: "Empfehlungslink ansehen",
  },
];

const mapsReadyPoints = [
  "Buchung, WhatsApp und Telefon sind ohne Umwege erreichbar.",
  "Adresse, Telefonnummer und E-Mail sind konsistent sichtbar.",
  "Ort, Leistung und Kontaktweg bleiben für Kunden klar nachvollziehbar.",
];

const mapsClosingSignals = [
  {
    title: "Direkter Kontakt statt Leerlauf",
    text: "Kunden sehen sofort, wie sie Buchung, WhatsApp oder Preisprüfung ohne Suchschleife starten.",
  },
  {
    title: "Vertrauen durch klare Angaben",
    text: "Adresse, Telefonnummer, E-Mail und die nächsten Kontaktwege sind sichtbar, statt in langen Texten versteckt zu sein.",
  },
  {
    title: "Spezialbereiche sauber getrennt",
    text: "Für Reinigung in Düsseldorf gibt es einen eigenen lokalen Bereich mit eigenem Kontaktweg und klarer Adresse.",
  },
];

const supportingKnowledgeLinks = [
  {
    title: "Preisrahmen statt Schnellpreis besser verstehen",
    href: "/blog/preisrahmen-vorpruefung-statt-festpreis",
    text: "Hilft, wenn vor der Kontaktaufnahme noch unklar ist, wie realistisch ein Budget oder Zeitfenster ist.",
  },
  {
    title: "Wohnungsübergabe sauber vorbereiten",
    href: "/blog/wohnungsuebergabe-regensburg-vorbereiten",
    text: "Sinnvoll, wenn Schlüssel, Fotos, Restmengen oder Reinigung vor dem Vermietertermin mitgedacht werden müssen.",
  },
  {
    title: "Direkt anfragen statt Umwege über Portale",
    href: "/blog/direkt-anfragen-statt-vergleichsportal-regensburg",
    text: "Erklärt, warum ein klarer direkter Kontaktweg oft bessere Rückfragen und weniger Reibung erzeugt.",
  },
] as const;

const contactDecisionGuide = [
  {
    title: "Direkt anfragen",
    text: "Wenn Service, Ort und kurzer Umfang bekannt sind. Der Wizard fragt nur die wichtigsten Angaben zuerst ab.",
    href: "#direktanfrage",
    cta: "Formular öffnen",
  },
  {
    title: "Angebot prüfen lassen",
    text: "Wenn schon ein PDF, Screenshot, Preis oder fremdes Angebot vorliegt.",
    href: "/angebot-guenstiger-pruefen#guenstiger-form",
    cta: "Angebot prüfen",
  },
  {
    title: "Objektbrief senden",
    text: "Wenn Ziel, Fotos, Zugang, Termin oder Budget noch sortiert werden sollen.",
    href: "/objektbrief#schnellstart",
    cta: "Objektbrief öffnen",
  },
] as const;

const contactTrustProofs = [
  "Pflicht für den Start: Name, Kontaktweg, Ort oder Einsatzort, Leistung und kurze Beschreibung.",
  "Optional hilfreich: Telefon/WhatsApp, Fotos, Termin, Dringlichkeit, Angebot, Budget, Objektart und Umfang.",
  "FLOXANT meldet sich mit Rückfragen oder realistischer Einschätzung statt mit automatischer Zusage.",
] as const;

type KontaktSearchParams = Promise<Record<string, string | string[] | undefined>>;

function readSearchParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string,
) {
  const value = params?.[key];
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "kontakt",
    title: "FLOXANT Kontakt: Service, Ort und nächsten Schritt klären",
    description:
      "Senden Sie Service, Ort, Umfang, Fotos, Terminwunsch und bevorzugten Kontaktweg. FLOXANT ordnet die Anfrage und offene Punkte ein.",
  });
}

export default async function KontaktPage({
  searchParams,
}: {
  searchParams?: KontaktSearchParams;
}) {
  const dict = await getDictionary("de");
  const params = searchParams ? await searchParams : {};
  const leadIntent = resolveLeadIntent({
    path: "/kontakt",
    service: readSearchParam(params, "service"),
    city: readSearchParam(params, "city"),
    intent: readSearchParam(params, "intent"),
    priority: readSearchParam(params, "priority") || "p0",
  });
  const initialOfferConcern = readSearchParam(params, "offerConcern");
  const initialOfferStatus = readSearchParam(params, "offerStatus");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Kontakt Düsseldorf und Regensburg",
        description:
          "Kontaktseite für FLOXANT mit Buchung, Rechner, Anfrage, Telefon, WhatsApp, E-Mail und den Standorten Düsseldorf und Regensburg.",
        path: "/kontakt",
        about: [
          "FLOXANT Kontakt",
          "Umzug Regensburg",
          "Reinigung Regensburg",
          "Entrümpelung Regensburg",
          "Büroumzug",
          "WhatsApp Kontakt",
          "Regensburg",
          "Bayern",
        ],
        potentialActions: [
          { name: "Direkte Anfrage starten", target: "/buchung" },
          { name: "Preisrahmen prüfen", target: "/rechner" },
        ],
      }),
      {
        "@type": "ContactPage",
        "@id": `${company.url}/kontakt#contactpage`,
        name: "FLOXANT Kontakt",
        url: `${company.url}/kontakt`,
        mainEntity: {
          "@type": "LocalBusiness",
          "@id": `${company.url}/#localbusiness`,
          name: company.name,
          telephone: company.phoneRaw,
          email: company.email,
          url: company.url,
          address: {
            "@type": "PostalAddress",
            streetAddress: company.streetAddress,
            postalCode: company.postalCode,
            addressLocality: company.city,
            addressCountry: company.countryCode,
          },
          areaServed: [
            { "@type": "City", name: "Regensburg" },
            { "@type": "State", name: "Bayern" },
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: company.phoneRaw,
              contactType: "customer service",
              areaServed: "DE",
              availableLanguage: ["de", "en"],
            },
          ],
        },
      },
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Kontakt", item: "/kontakt" },
      ]),
      buildFaqJsonLd(faqItems),
      {
        "@type": "ItemList",
        name: "FLOXANT Kontakt-Startpunkte",
        itemListElement: contactEntryPoints.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title,
          url: `${company.url}${entry.href}`,
          description: entry.text,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Kontakt" }]} />

      <section className="relative px-6 pb-14 pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[590px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.21),transparent_64%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
            <MapPinned className="h-4 w-4" />
            FLOXANT Kontakt Düsseldorf und Regensburg
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            FLOXANT Kontakt: Anfrage mit Ort, Service und offener Frage senden
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
            {leadIntent.suggestedFormIntro} Hilfreich sind Service, Ort, Umfang,
            Fotos, Terminwunsch und der Kontaktweg, über den FLOXANT gezielt nachfragen darf.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
            <div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#direktanfrage"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              data-event="seo_cta_click"
              data-service={leadIntent.trackingService}
              data-city={leadIntent.trackingCity}
              data-page-intent={leadIntent.trackingIntent}
              data-priority="p0"
              data-cta-label="Anfrage mit Eckdaten senden"
              data-destination="#direktanfrage"
            >
              Anfrage mit Eckdaten senden
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/rechner"
              className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-100"
              data-event="service_card_click"
              data-service="kontakt"
              data-city="regensburg"
              data-page-intent="preisrahmen-pruefen"
              data-priority="p0"
              data-cta-label="Aufwand erst einordnen"
            >
              Aufwand erst einordnen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-500/15"
              data-event="seo_cta_click"
              data-service="kontakt"
              data-city="regensburg"
              data-page-intent="whatsapp-anfrage"
              data-priority="p0"
              data-cta-label="WhatsApp öffnen"
              data-destination={whatsappUrl}
            >
              WhatsApp öffnen
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground/82 transition hover:bg-white/[0.08]"
            >
              Standort ansehen
            </a>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {mapsClosingSignals.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.35rem] border border-white/65 bg-white/82 px-4 py-4 shadow-sm shadow-slate-950/5 backdrop-blur"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  Schneller Kontakt
                </div>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
              <div className="mt-4">
                <LeadTrustBlock />
              </div>
            </div>

            <SeoLeadForm
              initialIntent={leadIntent}
              sourcePage="/kontakt"
              initialOfferConcern={initialOfferConcern}
              initialOfferStatus={initialOfferStatus}
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              {
                label: "Direkt zur Buchung",
                href: "/buchung",
                text: "Wenn der Fall klar ist und Sie ohne Umweg in die strukturierte Anfrage wollen.",
              },
              {
                label: "Zum Rechner",
                href: "/rechner",
                text: "Wenn zuerst Aufwand, Zugang und Preisrahmen eingeordnet werden sollen.",
              },
              {
                label: "Lokale Kontaktwege",
                href: "/standorte",
                text: "Wenn Sie zuerst den passenden Ort, Bereich oder Service in Regensburg und Bayern öffnen möchten.",
              },
              {
                label: "WhatsApp",
                href: whatsappUrl,
                text: "Wenn Fotos, kurze Rückfragen oder schnelle Abstimmung im Vordergrund stehen.",
              },
            ].map((item) =>
              item.href.startsWith("http") ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[1.35rem] border border-slate-200 bg-white/86 px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-[1.35rem] border border-slate-200 bg-white/86 px-4 py-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <CustomerNextStepPanel
        title="Was nach dem Absenden passiert."
        intro="Die Kontaktseite soll keine Blackbox sein. FLOXANT prüft zuerst die Eckdaten und fragt gezielt nach, wenn Ort, Umfang, Fotos oder Termin noch fehlen."
        steps={customerNextSteps}
      />

      <ContactPathChooser />

      <ServiceFitAdvisor
        currentCity={leadIntent.city && leadIntent.city !== "deutschland" ? leadIntent.city : undefined}
        title="Nicht sicher, welcher Service passt?"
        intro="Der Anfrageberater setzt nur service, city, intent und priority im Kontaktlink. Bestehende URL-Parameter bleiben beim Formularstart weiter massgeblich."
      />

      <LocationServiceSwitcher
        title="Den passenden Standort direkt vor der Anfrage wählen."
        intro="Düsseldorf und Regensburg haben eigene lokale Schwerpunkte. Der Kontakt bleibt gleich einfach, aber city=duesseldorf oder city=regensburg wird sauber in den Anfrageweg übernommen."
      />

      <LocalContactPanel
        service={leadIntent.service}
        title="Kontakt für beide FLOXANT Standorte."
        intro="Adresse, Telefon und E-Mail bleiben sichtbar. Öffnungszeiten und GBP-Profil-URLs werden nicht geraten, sondern als manuelle Prüfung behandelt."
      />

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ServiceIntentSelector />
        </div>
      </section>

      <WhatWeNeedChecklist
        group={leadIntent.service === "angebot-pruefen" ? "angebot-pruefen" : leadIntent.service === "umzug" ? "umzug" : leadIntent.service === "entruempelung" || leadIntent.service === "wohnungsaufloesung" ? "entruempelung" : leadIntent.service === "bueroreinigung" || leadIntent.service === "gewerbereinigung" ? "b2b" : "reinigung"}
        title="Welche Angaben jetzt reichen"
        intro="Ort, Service, grober Umfang und Kontaktweg reichen für den Start. Die Details werden nach Bedarf nachgefragt."
        limit={4}
      />

      <CustomerConcernPanel />

      <ObjectionAnswerGrid />

      <TrustProofPanel
        allowedPage="/kontakt"
        serviceKey={leadIntent.service}
        locationKey={leadIntent.city === "regensburg" ? "regensburg" : "duesseldorf"}
        title="Kontakt ohne erfundene Vertrauenssignale."
        intro="Die Kontaktseite trennt echte Anfragehilfen von ungeprüften Belegen: keine Sterne ohne Quelle, keine erfundenen Kundenstimmen, keine Garantie ohne Objektangaben."
      />

      <ServiceProofChecklist
        serviceKey={leadIntent.service === "angebot-pruefen" ? "angebot-pruefen" : leadIntent.service === "umzug" ? "umzug" : leadIntent.service === "entruempelung" || leadIntent.service === "wohnungsaufloesung" ? "entruempelung" : leadIntent.service === "bueroreinigung" || leadIntent.service === "gewerbereinigung" ? "b2b" : "reinigung"}
        title="Was als Proof vor der Rückmeldung wirklich hilft"
        intro="Diese Angaben ersetzen keine Besichtigung, machen die erste Einordnung aber belastbarer und vermeiden Rückfragen."
      />

      <ProcessProofSteps />

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <NoFakeClaimsNotice />
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {localTrustCards.map((item) => {
            const external = item.href.startsWith("http");
            const classes =
              "rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";

            return external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Lokal & klar
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={classes}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Lokal & klar
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <ContactTrustPanel compact />

      <LocalProofPanel location="duesseldorf" />
      <LocalProofPanel location="regensburg" className="bg-slate-900" />

      <InternationalCustomerHint
        cityLabel="Düsseldorf oder Regensburg"
        serviceLabel="Umzug, Reinigung, Entrümpelung, Büroumzug oder Angebotsprüfung"
        tags={["Cleaning service", "Moving help", "Office cleaning", "House clearance", "Quote check"]}
        primaryHref="#direktanfrage"
        photoHref="/buchung#buchungssystem"
      />

      <ServiceDecisionGuide
        eyebrow="Kontaktweg wählen"
        title="Schnell zum passenden Startpunkt."
        intro="Wenn Sie nicht sicher sind, welcher Weg passt, starten Sie direkt mit der kurzen Anfrage. Spezielle Fälle führen zu Angebot oder Objektbrief."
        items={contactDecisionGuide}
      />

      <section id="detaillierte-anfrage" className="border-y border-slate-200 bg-slate-50/80 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Direkte Anfrage
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Name, Kontakt, Ort und kurze Lage reichen für den Start.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:text-right">
              Wählen Sie Service und Einsatzort. Fotos, Termin, Budget oder Angebot können später ergänzt werden.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/5 sm:p-5">
            <SmartBookingWizard
              dict={{
                common: dict.common,
                calculator: dict.calculator,
                booking: dict.booking,
              }}
              initialEntry="kontakt_minimal"
            />
          </div>
        </div>
      </section>

      <TrustProofSection
        eyebrow="Angaben"
        title="So bleibt Kontakt einfach und verwertbar."
        intro="Die Kontaktseite soll keine Hürde sein. Die wichtigsten Daten kommen zuerst, alles andere verbessert nur die Einschätzung."
        proofs={contactTrustProofs}
      />

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Lokal erreichbar
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Alles, was für eine schnelle Anfrage wichtig ist
            </h2>
            <div className="mt-5 grid gap-3">
              {mapsReadyPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Lokale Startpunkte
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Häufige Kontaktwege ohne lange Suche
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {BAVARIA_METRO_DISTRICT_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-[1.15rem] border border-emerald-200 bg-emerald-50 px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                Separater Reinigungsbereich
              </div>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/80">
                Für lokale Reinigungsanfragen in Düsseldorf gibt es einen eigenen Bereich mit
                Adresse, Rechner, Kontakt und klarer Reinigungspositionierung.
              </p>
              <Link
                href="/duesseldorf/reinigung"
                className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800"
              >
                Düsseldorf Reinigung ansehen
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Vorbereiten
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              So wird die Rückmeldung schneller und genauer.
            </h2>
          </div>
          <div className="grid gap-4">
            {preparationItems.map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <p className="text-sm leading-relaxed text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(255,255,255,1))] p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Vor dem Kontakt
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Erst kurz einordnen, dann schneller die richtige Rückmeldung bekommen.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 lg:text-right">
              Diese Inhalte helfen, Budget, Übergabe und direkte Kontaktwege besser zu sortieren,
              bevor Sie FLOXANT kontaktieren.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {supportingKnowledgeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.45rem] border border-white bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Ratgeber
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Weiterlesen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Häufige Fragen zu Kontakt und Anfrage
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
