import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

import { AiAnswerCard } from "@/components/AiAnswerCard";
import { HumanReadableFAQ, QuickDecisionBox } from "@/components/ai-answer";
import {
  ProblemBasedServiceLinks,
  ProblemSituationGrid,
  RelatedSpecialServices,
  ServiceDecisionGuide,
  SignatureServicesGrid,
  TrustProofSection,
} from "@/components/conversion";
import { NoFakeClaimsNotice } from "@/components/NoFakeClaimsNotice";
import { ProjectStoryGrid } from "@/components/ProjectStoryGrid";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { SignatureServiceClarityGrid } from "@/components/SignatureServiceClarityGrid";
import { TrustProofPanel } from "@/components/TrustProofPanel";
import { company } from "@/lib/company";
import { signatureServiceClarityItems } from "@/lib/professional-copy";
import { signatureServiceLinks } from "@/lib/signature-special-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/signature-services";
const canonical = `${company.url}${path}`;
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich suche den passenden Signature Service.",
    "Es geht um Angebot, Objektbrief, Übergabe, Plan B, Rückfahrt oder PV.",
    "Ort, Termin, Fotos oder Angebot kann ich senden.",
  ].join("\n"),
);

const signatureSituations = [
  {
    title: "Angebot wirkt unklar",
    text: "Preis, Umfang, Zusatzkosten, Termin oder Fotos passen nicht sauber zusammen.",
  },
  {
    title: "Objekt ist schwer zu beschreiben",
    text: "Zugang, Zustand, Ziel, Fotos, Budget oder Ansprechpartner sind noch unsortiert.",
  },
  {
    title: "Übergabe rückt näher",
    text: "Restmengen, Reinigung, Schlüssel, Fotos oder sichtbare Punkte müssen priorisiert werden.",
  },
  {
    title: "Plan A wackelt",
    text: "Anbieter, Helfer, Reinigung, Transport oder Deadline werden unsicher und brauchen Prüfung.",
  },
] as const;

const signatureServices = [
  ...signatureServiceLinks.slice(0, 6).map((item) => ({
    title: item.title.replace("FLOXANT ", ""),
    text: item.text,
    href: item.href,
    cta: item.cta || "Service öffnen",
  })),
] as const;

const trustProofs = [
  "Signature Services sind Anfragewege für Fälle, die vor einem Auftrag erst sortiert werden müssen.",
  "FLOXANT fragt nach Ort, Leistung, Kontaktweg und kurzer Lage, bevor Details vertieft werden.",
  "Fotos, Angebot, Budget, Deadline, Zugang und gewünschter Zielzustand sind hilfreich, aber nicht immer Pflicht.",
  "Keine Preisgarantie, keine Rechtsberatung und keine pauschale Soforteinsatzzusage.",
] as const;

const faqItems = [
  {
    q: "Was sind FLOXANT Signature Services?",
    a: "Signature Services sind strukturierte Startpunkte für Fälle mit Angebot, Objektbrief, Übergabe, Plan B, Rückfahrt, PV oder besonderem Abstimmungsbedarf.",
  },
  {
    q: "Muss ich vorher genau wissen, welcher Service passt?",
    a: "Nein. Ort, gewünschtes Ziel, kurze Beschreibung und ein Kontaktweg reichen für den Start. FLOXANT ordnet den passenden Weg ein.",
  },
  {
    q: "Entsteht durch die Anfrage schon ein Auftrag?",
    a: "Nein. Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst nach klarer Abstimmung.",
  },
] as const;

const signatureAnswerPoints = [
  "Angebotscheck und Fairpreis-Check passen, wenn bereits ein Preis, PDF, Screenshot oder Vergleichsangebot vorliegt.",
  "Objektbrief und Uebergabeakte passen, wenn Fotos, Zugang, Zielzustand oder Schluesselweg erst sortiert werden muessen.",
  "Plan-B-Service, Rueckfahrt-Radar und Diskret-Service passen, wenn Frist, Route oder sensible Kommunikation wichtiger sind als ein Standardformular.",
] as const;

const signatureDecisionFaq = [
  {
    q: "Welcher Signature Service ist der richtige Start?",
    a: "Wenn ein Angebot vorliegt, starten Sie mit Angebotscheck oder Fairpreis-Check. Wenn das Objekt unklar ist, passt der Objektbrief. Bei Fristdruck passt Plan B oder Uebergabe-Sprint.",
  },
  {
    q: "Kann ein Signature Service auch fuer Duesseldorf genutzt werden?",
    a: "Ja, wenn die Leistung im Code fuer Duesseldorf gefuehrt oder als manuelle Pruefung markiert ist. Unsichere Daten werden nicht als bestaetigte Verfuegbarkeit behauptet.",
  },
  {
    q: "Was braucht FLOXANT fuer die Einordnung?",
    a: "Ort, Leistung, Kontaktweg, kurze Lage und falls vorhanden Fotos, Angebot, Preis, Deadline oder Zielzustand reichen fuer den Start.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Signature Services | Fairpreis, Objektbrief & Plan B",
  description:
    "FLOXANT Signature Services helfen bei Angebot, Objektbrief, Übergabe, Plan B, Rückfahrt, PV und diskreten Fällen mit klarem nächsten Schritt.",
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonical,
    siteName: "FLOXANT",
    title: "FLOXANT Signature Services",
    description:
      "Fairpreis, Angebotscheck, Anbieter-Vergleich, Objektbrief, Übergabe, Plan B, Rückfahrt, PV und diskrete Fälle sauber einordnen.",
    images: [
      {
        url: "/assets/floxant-hero-neu-gedacht.png",
        width: 1200,
        height: 630,
        alt: "FLOXANT Signature Services",
      },
    ],
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Signature Services",
        description:
          "Hub für FLOXANT Fairpreis-Check, Angebotscheck, Anbieter-Vergleich, Objektbrief, Übergabeakte, Übergabe-Sprint, Plan-B-Service, Rückfahrt-Radar, PV-Sichtklar, Diskret-Service, Vermieter-Ready und Büro-Startklar.",
        path,
        about: signatureServiceLinks.map((item) => item.title),
        potentialActions: [
          { name: "Signature Service anfragen", target: "/buchung?entry=signature#buchungssystem" },
          { name: "WhatsApp starten", target: whatsappHref, type: "ContactAction" },
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "Startseite", item: "/" },
        { name: "Signature Services", item: path },
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

export default function SignatureServicesPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <JsonLd />

      <section className="relative isolate min-h-[78svh] overflow-hidden bg-slate-950 px-5 pb-14 pt-32 text-white sm:px-8 lg:px-10">
        <Image
          src="/assets/floxant-hero-neu-gedacht.webp"
          alt="FLOXANT Signature Services für besondere Servicefälle"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-58"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.82)_58%,rgba(15,23,42,0.45)_100%)]" />
        <div className="mx-auto grid min-h-[62svh] max-w-7xl content-end">
          <p className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-black text-cyan-100 backdrop-blur">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            FLOXANT Signature Services
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.03] tracking-normal sm:text-5xl lg:text-6xl">
            Signature Services für Angebot, Objekt, Übergabe und Plan B.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-100">
            Wenn ein Auftrag nicht sauber in Umzug, Reinigung, Räumung oder Transport passt,
            helfen die Signature Services beim Sortieren: erst Lage klären, dann den richtigen
            nächsten Schritt wählen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#signature-auswahl"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
            >
              Passenden Service wählen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              data-event="whatsapp_click"
              data-source="signature_services_hero"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp starten
            </a>
          </div>
        </div>
      </section>

      <ProblemSituationGrid
        title="Wenn ein Standardformular zu eng wirkt."
        intro="Diese Situationen brauchen zuerst Orientierung: Was ist wirklich offen, welche Leistung passt, und welche Angaben reichen für eine seriöse Rückmeldung?"
        items={signatureSituations}
      />

      <SignatureServiceClarityGrid
        title="Welcher Signature Service passt zu welcher Lage?"
        intro="Die Auswahl richtet sich nach dem Problem: vorhandenes Angebot, schwer beschreibbares Objekt, wackelnder Termin, diskrete Situation oder Spezialreinigung mit Zugangsrisko."
        services={signatureServiceClarityItems}
      />

      <AiAnswerCard
        title="Signature Services sind Entscheidungswege, keine leeren Markenbegriffe."
        answer="FLOXANT nutzt Signature Services, wenn vor einer Anfrage zuerst Angebot, Objekt, Uebergabe, Frist, Route oder Diskretion geordnet werden muessen. Der Service fuehrt zu einem konkreten Kontaktweg mit passenden Angaben."
        points={signatureAnswerPoints}
        nextStep="Naechster Schritt: den Service waehlen, der zur Lage passt, und Ort, Ziel, Kontaktweg sowie vorhandene Unterlagen mitsenden."
      />

      <QuickDecisionBox
        title="Passt ein Signature Service zu Ihrem Fall?"
        fits={[
          "Ein Angebot, Foto, Objekt oder Termin ist vorhanden, aber die Einordnung fehlt.",
          "Der Fall verbindet Reinigung, Raeumung, Umzug, Uebergabe oder Anbieterwechsel.",
          "Sie brauchen einen ruhigen Startpunkt statt einer pauschalen Sofortzusage.",
        ]}
        notFits={[
          "Sie erwarten eine Preisgarantie ohne Daten.",
          "Es geht um Rechtsberatung, Bewertung anderer Anbieter oder garantierte Verfuegbarkeit.",
          "Adresse, Telefonnummer oder Oeffnungszeiten sollen geraten werden.",
        ]}
        nextSteps={[
          "Angebot vorhanden: Angebotscheck oder Fairpreis-Check.",
          "Objekt unklar: Objektbrief oder Uebergabeakte.",
          "Frist oder Ausfall: Plan-B-Service oder Uebergabe-Sprint.",
        ]}
        ctaHref="/kontakt?service=angebot-pruefen&intent=entscheidungs-kompass&source=signature-services#direktanfrage"
        ctaLabel="Entscheidung klaeren"
      />

      <div id="signature-auswahl" className="scroll-mt-28">
        <ServiceDecisionGuide
          eyebrow="Signature-Auswahl"
          title="Den passenden FLOXANT Startpunkt wählen."
          intro="Jeder Signature Service führt zu einem konkreten nächsten Schritt: prüfen, sortieren, anfragen oder mit WhatsApp nachreichen."
          items={signatureServices}
        />
      </div>

      <SignatureServicesGrid
        title="Alle Signature Services als echte FLOXANT-Produkte."
        intro="Die Services sind keine losen Zusatzideen. Jeder Startpunkt klaert eine konkrete Situation: Angebot, Vergleich, Objekt, Uebergabe, Plan B, Rueckfahrt, PV, Diskretion, Vermieter oder Buero."
        services={signatureServiceLinks}
      />

      <HumanReadableFAQ
        title="Fragen, die vor der Auswahl helfen."
        intro="Die Antworten sind sichtbar und entsprechen den Daten, die FLOXANT tatsaechlich sicher verwenden kann."
        items={signatureDecisionFaq}
      />

      <ProblemBasedServiceLinks />

      <RelatedSpecialServices
        kind="offer"
        title="Wenn Signature Service und Angebotspruefung zusammenhaengen."
        intro="Viele besondere Faelle beginnen mit einem vorhandenen Angebot, einer unsicheren Anbieterwahl oder einer Deadline. Diese Wege halten die Entscheidung sachlich."
        limit={3}
      />

      <TrustProofSection
        eyebrow="Sauber eingeordnet"
        title="Besondere Services ohne falsche Versprechen."
        intro="Die Services sind keine Zauberwörter, sondern klare Anfragewege für Lage, Ort, Fotos, Termin, Budget und Kontakt."
        proofs={trustProofs}
      />

      <TrustProofPanel
        allowedPage="/signature-services"
        serviceKey="angebot-pruefen"
        signatureServiceKey="angebotscheck"
        title="Signature Services brauchen Belege und Grenzen."
        intro="Jeder Spezialweg bleibt an sichtbare Angaben gebunden: Angebot, Objekt, Ort, Frist, Fotos oder Ziel. Unbelegte Ergebnisse werden nicht behauptet."
      />

      <ProjectStoryGrid serviceKey="angebot-pruefen" />
      <ServiceVisualProofGrid serviceKey="angebot-pruefen" />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <NoFakeClaimsNotice />
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              Unsicher welcher Weg passt?
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
              Kurz schildern reicht.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              Senden Sie Ort, Ziel, Termin, Angebot oder Fotos. FLOXANT ordnet ein,
              ob Fairpreis, Objektbrief, Plan B, Rückfahrt oder PV-Sichtklar passt.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/buchung?entry=signature#buchungssystem"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100"
            >
              Anfrage starten
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-200/30 bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
