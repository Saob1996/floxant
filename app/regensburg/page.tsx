import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";

import {
  InternationalCustomerHint,
  LocalIntentBlock,
  ServiceDecisionGuide,
  TrustProofSection,
} from "@/components/conversion";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { LocalContactPanel } from "@/components/LocalContactPanel";
import { LocationClarityPanel } from "@/components/LocationClarityPanel";
import { LocationFaq } from "@/components/LocationFaq";
import { ProjectStoryGrid } from "@/components/ProjectStoryGrid";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { ServiceClusterGrid } from "@/components/ServiceClusterGrid";
import { FloxServiceCard } from "@/components/FloxServiceCard";
import { FloxantObjectBrief } from "@/components/FloxantObjectBrief";
import { company } from "@/lib/company";
import { ServiceFitAdvisor } from "@/components/ServiceFitAdvisor";
import { AiAnswerBlock } from "@/components/ai-answer";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantCategoryOrder,
  floxantRegions,
  getServicesByRegionAndCategory,
} from "@/lib/floxant-services";
import { locationClarityItems } from "@/lib/professional-copy";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const region = floxantRegions.regensburg;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte eine Anfrage in Regensburg stellen.",
    "Es geht um Umzug, Reinigung, Gewerbereinigung, Entrümpelung, Haushaltsauflösung oder Übergabe.",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Regensburg Service: Umzug, Reinigung und Raeumung klaeren",
  description:
    "Regensburg-Anfrage fuer Umzug, Reinigung, Entruempelung oder Uebergabe: Start, Ziel, Objekt, Umfang, Fotos und Terminwunsch senden.",
  alternates: { canonical: "/regensburg" },
};

const regensburgLocalSignals = [
  "Regensburg, Landkreis und Umgebung nach Strecke, Termin, Umfang und verfügbarer Kapazität prüfen.",
  "Bei Umzug und Transport zählen Start/Ziel, Etage, Laufweg, Volumen, Haltezone und mögliche Rückfahrt.",
  "Bei Entrümpelung, Haushaltsauflösung und Nachlass helfen Fotos, Freigabe, Menge, Material und Endzustand.",
  "Bei Übergabe und Endreinigung sind Termin, Schlüsselweg, Restpunkte, Fotos und gewünschter Zustand entscheidend.",
] as const;

const regensburgDecisionGuide = [
  {
    title: "Umzug, Mini-Umzug und Transport",
    text: "Für Wohnungswechsel, Möbeltransport, Express-Umzug oder flexible Rückfahrt mit Route, Volumen und Zugang.",
    href: "/regensburg/umzugsunternehmen",
    cta: "Umzug öffnen",
  },
  {
    title: "Region Regensburg und 200 km Umfeld",
    text: "Kuratierter Hub für Umzug, Räumung, Reinigung nach Umzug und Angebotsprüfung im Regensburger Einsatzgebiet.",
    href: "/region-regensburg",
    cta: "Region öffnen",
  },
  {
    title: "Umzugskosten und Umzugsservice",
    text: "Für Kostenfaktoren, Volumen, Etage, Laufweg, Zusatzleistungen und vorhandene Umzugsangebote.",
    href: "/regensburg/umzug-kosten",
    cta: "Kosten prüfen",
  },
  {
    title: "Büroreinigung und Reinigungsfirma",
    text: "Für Büro, Kanzlei, Gewerbefläche oder Endreinigung mit Raumliste, Turnus, Fotos und Angebot.",
    href: "/regensburg/bueroreinigung",
    cta: "Büroreinigung prüfen",
  },
  {
    title: "Entrümpelung und Haushaltsauflösung",
    text: "Für Keller, Wohnung, Nachlass, Lager oder Restmengen mit Fotos, Menge, Material und Zielzustand.",
    href: "/regensburg/wohnungsaufloesung",
    cta: "Wohnungsauflösung prüfen",
  },
  {
    title: "Reinigung und Übergabe",
    text: "Für Endreinigung, Übergabereinigung, Mieterwechsel oder sichtbare Restpunkte vor Rückgabe und Besichtigung.",
    href: "/regensburg/reinigung-nach-umzug",
    cta: "Reinigung wählen",
  },
  {
    title: "Signature und Plan B",
    text: "Wenn Anbieter, Termin, Preis, Rückfahrt, Objektbrief oder Übergabe erst sortiert werden müssen.",
    href: "/signature-services",
    cta: "Signature-Hub öffnen",
  },
] as const;

const regensburgTrustProofs = [
  "Regensburg-Anfragen werden nach Umzug, Reinigung, Entrümpelung, Transport und Übergabe getrennt.",
  "Ort, Leistung, kurze Beschreibung und Kontaktweg reichen für den Start.",
  "Budget, Fotos, vorhandenes Angebot, Termin oder Dringlichkeit können freiwillig ergänzt werden.",
] as const;

export default function RegensburgHubPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              {region.label}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Regensburg: Umzug, Reinigung, Raeumung und Uebergabe sauber einordnen
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Beschreiben Sie Start, Ziel, Objekt, Raeume, Umfang, Fotos und Terminwunsch.
              FLOXANT trennt Umzug, Reinigung, Entruempelung, Wohnungsaufloesung und Angebotscheck,
              damit aus einer groben Anfrage ein sinnvoller naechster Schritt wird.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/regensburg/umzug"
                data-event="hero_cta_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
              >
                Services ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 sm:min-h-[420px]">
            <Image
              src="/assets/service-moving.png"
              alt="FLOXANT Umzugsfahrzeug für Umzug und Räumung in Regensburg"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="grid gap-2 sm:grid-cols-3">
                {["Umzug", "Entrümpelung", "Übergabe"].map((item) => (
                  <div key={item} className="rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-sm font-black text-white backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloxantObjectBrief variant="regensburg" className="border-b border-slate-200" />

      <LocationClarityPanel
        title="Regensburg bleibt der eigene Servicebereich für Wechsel und Übergabe."
        intro="Regensburg wird nicht mit Duesseldorf vermischt. Fuer die erste Einordnung zaehlen Start, Ziel, Etage, Laufweg, Menge, Fotos, Zugang und Terminwunsch."
        locations={locationClarityItems}
      />

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Für Regensburg und Umgebung
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Hilfe rund um Wechsel, Räumung und Übergabe.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              FLOXANT Regensburg unterstützt bei Wohnungswechsel, Räumung,
              Haushaltsauflösung, Endreinigung und Vorbereitung der Übergabe.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Region: Regensburg und Umgebung",
              "Leistungen: Umzug, Reinigung, Entrümpelung, Haushaltsauflösung",
              "Gewerbe: Büroreinigung, Objekt und Turnus nach Prüfung",
              "Anfrage: Fotos, Ort, Termin und Umfang senden",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocalIntentBlock
        regionLabel="Regensburg lokal"
        title="Ort, Termin und Ziel der Übergabe früh nennen."
        intro="Viele Regensburger Anfragen hängen an Fristen: Auszug, Schlüssel, Keller, Reinigung, Restmengen oder Besichtigung. Je klarer der Zielzustand ist, desto besser wird die Rückmeldung."
        signals={regensburgLocalSignals}
        links={[
          { href: "/regensburg/umzugsunternehmen", label: "Umzugsunternehmen" },
          { href: "/region-regensburg", label: "Region Regensburg" },
          { href: "/regensburg/umzugsservice", label: "Umzugsservice" },
          { href: "/regensburg/umzug-kosten", label: "Umzugskosten" },
          { href: "/regensburg/seniorenumzug", label: "Seniorenumzug" },
          { href: "/regensburg/bueroreinigung", label: "Büroreinigung" },
          { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung" },
          { href: "/regensburg/reinigungsfirma", label: "Reinigungsfirma" },
          { href: "/regensburg/entruempelung", label: "Entrümpelung" },
          { href: "/regensburg/reinigung", label: "Reinigung" },
          { href: "/regensburg/reinigung-nach-umzug", label: "Reinigung nach Umzug" },
          { href: "/regensburg/angebot-vergleichen", label: "Angebotsprüfung" },
          { href: "/angebot-vergleichen-regensburg", label: "Angebot vergleichen" },
        ]}
      />

      <AiAnswerBlock
        eyebrow="Kurze Antwort"
        title="Regensburg: Umzug, Reinigung oder Entruempelung zuerst sauber einordnen."
        answer="FLOXANT Regensburg fuehrt Anfragen ueber den konkreten Bedarf: Start- und Zielort, Termin, Umfang, Fotos und vorhandene Angebote. So wird klar, ob eine direkte Anfrage, eine Angebotspruefung oder ein Plan-B-Weg der bessere naechste Schritt ist."
        points={[
          "Umzug und Transport brauchen Strecke, Etage, Laufweg und Volumen.",
          "Reinigung und Uebergabe brauchen Zielzustand, Flaeche, Fotos und Termin.",
          "Entruempelung und Aufloesung brauchen Menge, Material, Zugang und Freigabe.",
          "Klaviertransport und Seniorenumzug werden als Spezialfaelle getrennt vorbereitet.",
        ]}
        usefulWhen={["Termin oder Frist absehbar ist", "Fotos oder ein Angebot vorliegen", "mehrere Leistungen kombiniert werden muessen"]}
        notUsefulWhen={["eine Preisgarantie ohne Orts- und Objektangaben erwartet wird", "rechtliche Beratung zur Uebergabe gesucht wird"]}
        neededInfo={["Ort und Termin", "Leistung", "Fotos", "vorhandenes Angebot oder kurze Lagebeschreibung"]}
        ctaHref="/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo"
        ctaLabel="Regensburg-Anfrage starten"
      />

      <LocationFaq
        location="regensburg"
        includeJsonLd
        className="border-y border-slate-200"
      />

      <LocalContactPanel
        locationKeys={["regensburg"]}
        service="umzug"
        title="FLOXANT Regensburg mit sichtbaren Standortdaten."
        intro="Regensburger Adresse, Telefon, E-Mail und Maps-Suchlink kommen aus zentralen Standortdaten. Oeffnungszeiten und GBP-Profil-URL bleiben bis zur manuellen Pruefung ungenannt."
      />

      <ServiceFitAdvisor
        currentCity="regensburg"
        title="Regensburger Anfrage schnell richtig einordnen."
        intro="Die Auswahl fuehrt zu Kontaktlinks mit city=regensburg und passendem Intent. Es wird nichts automatisch gesendet."
      />

      <ServiceClusterGrid
        locationKey="regensburg"
        categories={[
          "umzug_transport",
          "entruempelung_aufloesung",
          "reinigung",
          "angebot_pruefen",
          "signature_service",
        ]}
        title="Regensburger Services nach Umzug, Raeumung, Reinigung und Plan B."
        intro="Die zentrale Inventur zeigt, welche Leistungen direkt gepflegt sind und welche manuell bestaetigt werden muessen."
        limitPerCategory={5}
      />

      <InternationalCustomerHint
        cityLabel="Regensburg"
        serviceLabel="Umzug, Reinigung, Gewerbereinigung, Entrümpelung oder Haushaltsauflösung in Regensburg"
        tags={["Moving help", "Cleaning service", "Office cleaning", "House clearance", "Decluttering"]}
        primaryHref="/kontakt#direktanfrage"
        photoHref="/buchung#buchungssystem"
      />

      <ServiceDecisionGuide
        eyebrow="Regensburg-Service wählen"
        title="Wechsel, Räumung, Reinigung oder Plan B?"
        intro="Diese Wege bilden die häufigsten lokalen Situationen ab und führen direkt zu passenden Seiten oder Formularen."
        items={regensburgDecisionGuide}
      />

      <TrustProofSection
        eyebrow="Klare Anfrage"
        title="Wenige Pflichtfelder, viele hilfreiche optionale Angaben."
        intro="FLOXANT braucht kein perfektes Briefing. Wichtig ist nur, dass Ort, Leistung, kurze Lage und Kontaktweg stimmen."
        proofs={regensburgTrustProofs}
      />

      <LocalProofPanel location="regensburg" />

      <TrustProofPanel
        allowedPage="/regensburg"
        serviceKey="umzug"
        locationKey="regensburg"
        title="Regensburg-Trust bleibt lokal und pruefbar."
        intro="Regensburg wird mit sichtbaren Kontaktwegen, lokalen Serviceclustern und manuellen Grenzen fuer GBP, Reviews und Oeffnungszeiten gefuehrt."
      />

      <ServiceProofChecklist
        serviceKey="umzug"
        title="Was Regensburger Umzugs- und Serviceanfragen belegbarer macht"
        intro="Route, Zugang, Volumen, Fotos, Termin und Zielzustand helfen, ohne einen Preis oder Termin vorab zu versprechen."
      />

      <ProjectStoryGrid serviceKey="umzug" locationKey="regensburg" />
      <ServiceVisualProofGrid serviceKey="reinigung" locationKey="regensburg" />

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Was brauchen Sie gerade?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Wählen Sie den passenden Regensburger Service.
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Wählen Sie den Startpunkt, der am besten zu Ihrer Situation passt. Wenn noch nicht alles
            klar ist, reichen Ort, Termin, Fotos und eine kurze Beschreibung für den Start.
          </p>

          <div className="mt-8 grid gap-5">
            {floxantCategoryOrder.map((category) => {
              const services = getServicesByRegionAndCategory("regensburg", category);
              if (!services.length) return null;

              return (
                <section key={category} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                        FLOXANT Regensburg
                      </p>
                      <h3 className="mt-1 text-2xl font-black tracking-normal text-slate-950">
                        {floxantCategoryLabels[category]}
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                      {floxantCategoryDescriptions[category]}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                      <FloxServiceCard
                        key={service.id}
                        service={service}
                        source={`regensburg_hub_${category}`}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
