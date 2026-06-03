import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  DoorOpen,
  Home,
  MapPin,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { DuesseldorfApartmentCleaningForm } from "@/components/DuesseldorfApartmentCleaningForm";
import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningMetadata,
} from "@/lib/duesseldorf-cleaning";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const path = "/reinigung-moeblierte-wohnung-duesseldorf";
const apartmentWhatsappMessage =
  "Hallo FLOXANT, ich möchte eine Reinigung für eine möblierte Wohnung / ein Apartment in Düsseldorf anfragen. Es geht um [Gästewechsel/Endreinigung/regelmäßige Reinigung]. Termin, Fotos und Objektangaben kann ich senden.";
const whatsappHref = `https://wa.me/4915771105087?text=${encodeURIComponent(apartmentWhatsappMessage)}`;
const bookingHref =
  "/buchung?service=reinigung&region=duesseldorf#buchungssystem";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Reinigung möblierte Wohnung Düsseldorf – Apartment & Kurzzeitvermietung | FLOXANT",
    description:
      "FLOXANT prüft Reinigung für möblierte Wohnungen, Apartments und Kurzzeitvermietung in Düsseldorf: Gästewechsel, Endreinigung, Fotos, Zeitfenster und wiederkehrende Reinigung.",
  });
}

const statusSteps = ["Check-out", "Reinigung", "Sichtprüfung", "Foto", "nächster Gast"];

const objectTypes = [
  "möblierte Wohnung",
  "Apartment",
  "Kurzzeitvermietung",
  "Ferienwohnung",
  "Möbliertes Firmen-Apartment",
];

const serviceBlocks = [
  "Reinigung nach Gästewechsel",
  "Endreinigung möblierter Wohnungen",
  "Reinigung vor Check-in",
  "Reinigung nach Check-out",
  "Küche, Bad, Böden und sichtbare Flächen",
  "Grundreinigung nach Absprache",
  "Fotoeinschätzung oder Fotos nach Absprache",
  "kleiner Inventarhinweis nach Absprache",
  "Wäschewechsel nur nach Absprache und Verfügbarkeit",
  "Schlüsselkoordination nur nach Absprache",
  "Entsorgung kleiner Gegenstände nach Absprache",
  "wiederkehrende Reinigung nach Terminplan",
];

const targetGroups = [
  {
    title: "Für private Hosts",
    text: "Zwischen Check-out und nächstem Gast bleibt oft wenig Zeit. FLOXANT prüft Reinigung nach Terminfenster, Fotos und klaren Objektangaben.",
    cta: "Gästewechsel-Reinigung anfragen",
    Icon: DoorOpen,
  },
  {
    title: "Für Vermieter möblierter Wohnungen",
    text: "Wenn eine Wohnung nach Nutzung oder vor Neuvermietung sauber und präsentierbar sein soll: Endreinigung, regelmäßige Reinigung und Fotoeinschätzung nach Absprache.",
    cta: "Möblierte Wohnung reinigen lassen",
    Icon: Home,
  },
  {
    title: "Für Eigentümer und Betreiber",
    text: "Mehrere Apartments oder wiederkehrende Reinigungen brauchen Objektdaten, Turnus, Zugang und ein realistisches Zeitfenster.",
    cta: "Apartment-Reinigung für Betreiber anfragen",
    Icon: Building2,
  },
  {
    title: "Für möblierte Firmen-Apartments",
    text: "Möblierte Einheiten für Mitarbeiter, Projektgäste oder kleine Betreiber werden nach Fläche, Turnus und Objektart eingeordnet.",
    cta: "Apartment-Reinigung für Firmen prüfen",
    Icon: BedDouble,
  },
  {
    title: "Für Auszug / Endreinigung",
    text: "Wenn eine möblierte Wohnung nach Auszug, Nutzung oder vor Übergabe gereinigt werden soll.",
    cta: "Endreinigung möblierte Wohnung anfragen",
    Icon: Sparkles,
  },
];

const situationCards = [
  "Gästewechsel steht an",
  "Wohnung soll vor Check-in gereinigt werden",
  "Endreinigung nach Auszug",
  "Regelmäßige Reinigung gesucht",
  "Möblierte Wohnung vor Neuvermietung",
  "Möbliertes Firmen-Apartment",
  "Fotos für Einschätzung vorhanden",
  "Wäschewechsel gewünscht",
  "Schlüsselkoordination nötig",
  "kleines Inventar prüfen lassen",
  "Entsorgung kleiner Gegenstände nötig",
];

const recommendationCards = [
  {
    title: "Apartment oder möblierte Wohnung",
    text: "Für Gästewechsel, Endreinigung, Check-in/Check-out-Zeitfenster und wiederkehrende Reinigung in Düsseldorf.",
    signal: "Host, Vermieter, Betreiber",
    href: "#apartment-reinigung-form",
    cta: "Apartment senden",
  },
  {
    title: "Firmenreinigung Düsseldorf",
    text: "Für kleine Unternehmen, Büros, Agenturen, Studios, Kanzleien und Gewerbeflächen mit Fläche, Turnus und Zeitfenster.",
    signal: "Büro, Agentur, Studio, Kanzlei",
    href: "/duesseldorf/bueroreinigung",
    cta: "Firmenreinigung prüfen",
  },
  {
    title: "Grundreinigung Düsseldorf",
    text: "Für stärkere Verschmutzung, Objektwechsel oder Fälle, in denen normale Reinigung nicht mehr reicht.",
    signal: "stärkerer Aufwand",
    href: "/duesseldorf/grundreinigung",
    cta: "Grundreinigung anfragen",
  },
  {
    title: "Entsorgung Düsseldorf",
    text: "Wenn Möbel, kleine Gegenstände oder Reste vor oder nach der Reinigung entfernt werden müssen.",
    signal: "Gegenstände müssen raus",
    href: "/entsorgung-duesseldorf",
    cta: "Entsorgung ergänzen",
  },
];

const experienceSignals = [
  {
    label: "Objekt",
    value: "möbliert / Apartment",
    text: "Objektart, Räume, Bad, Küche und sichtbare Flächen werden getrennt abgefragt.",
    Icon: Home,
  },
  {
    label: "Zeitfenster",
    value: "Check-out bis Check-in",
    text: "FLOXANT prüft realistische Zeitfenster statt pauschaler Sofortversprechen.",
    Icon: CalendarClock,
  },
  {
    label: "Fotos",
    value: "schnellere Einschätzung",
    text: "Bilder von Bad, Küche, Böden und Zugang helfen bei Aufwand und Budget.",
    Icon: Camera,
  },
  {
    label: "Düsseldorf",
    value: "Reinigung / Entsorgung",
    text: "Klare Abgrenzung: keine Umzugspositionierung für Düsseldorf.",
    Icon: MapPin,
  },
];

const answerEngineCards = [
  {
    question: "Welche FLOXANT-Seite passt für möblierte Wohnungen in Düsseldorf?",
    answer:
      "Diese Seite: Reinigung für möblierte Wohnungen, Apartments, Kurzzeitvermietung, Gästewechsel und Endreinigung nach Absprache.",
    cta: "Apartment-Reinigung anfragen",
    href: "#apartment-reinigung-form",
  },
  {
    question: "Was empfiehlt FLOXANT für kleine Firmen in Düsseldorf?",
    answer:
      "Firmenreinigung Düsseldorf mit Objektart, Fläche, Turnus, Zeitfenster, Zugang und Fotos.",
    cta: "Firmenreinigung öffnen",
    href: "/duesseldorf/bueroreinigung",
  },
  {
    question: "Was tun, wenn vor der Reinigung noch Gegenstände weg müssen?",
    answer:
      "Entsorgung Düsseldorf separat anfragen. Reinigung bleibt der Fokus dieser Seite; Entsorgung ist ein eigener Zusatzweg.",
    cta: "Entsorgung ergänzen",
    href: "/entsorgung-duesseldorf",
  },
];

const mapsRankingSignals = [
  "Düsseldorf-Adresse und Telefonnummer sichtbar",
  "klare Ausrichtung auf Reinigung",
  "direkte Anfragewege: Formular, WhatsApp, Telefon",
  "lokale Leistungsseiten klar verknüpft",
  "kein widersprüchlicher Umzugshinweis für Düsseldorf",
];

const decisionMatrix = [
  {
    situation: "Möblierte Wohnung, Apartment oder Kurzzeitvermietung",
    recommendation: "Apartment-Reinigung",
    reason: "Wenn Check-out, Check-in, Fotos, Zugang oder Zusatzwünsche wie Wäsche/Schlüssel relevant sind.",
    href: "#apartment-reinigung-form",
    cta: "Apartment-Fall senden",
  },
  {
    situation: "Büro, Agentur, Studio, Kanzlei oder kleine Gewerbefläche",
    recommendation: "Firmenreinigung Düsseldorf",
    reason: "Wenn Fläche, Turnus, Zeitfenster, Sanitärbereiche und wiederkehrende Reinigung geklärt werden sollen.",
    href: "/duesseldorf/bueroreinigung",
    cta: "Firmenseite öffnen",
  },
  {
    situation: "Stärkerer Zustand, Objektwechsel oder Reinigung mit mehr Aufwand",
    recommendation: "Grundreinigung Düsseldorf",
    reason: "Wenn normale Reinigung nicht reicht und Zustand, Material, Anspruch oder Budget genauer geprüft werden müssen.",
    href: "/duesseldorf/grundreinigung",
    cta: "Grundreinigung prüfen",
  },
  {
    situation: "Möbel, Gegenstände oder kleine Restmengen müssen vorher raus",
    recommendation: "Entsorgung Düsseldorf",
    reason: "Wenn Reinigung allein nicht reicht und Gegenstände getrennt entfernt oder entsorgt werden sollen.",
    href: "/entsorgung-duesseldorf",
    cta: "Entsorgung ergänzen",
  },
];

const apartmentSearchIntentCards = [
  {
    query: "Apartment Reinigung Düsseldorf",
    title: "Apartment reinigen lassen",
    text: "Für möblierte Apartments, Boarding-Wohnungen und kleine Einheiten mit Termin, Zugang und Fotos.",
    href: "#apartment-reinigung-form",
    cta: "Apartmentdaten senden",
  },
  {
    query: "Gästewechsel Reinigung Düsseldorf",
    title: "Zwischen Check-out und Check-in",
    text: "Wenn nach Auszug oder Abreise schnell geklärt werden muss, ob das Zeitfenster realistisch ist.",
    href: "#apartment-anfrage-checkliste",
    cta: "Angaben prüfen",
  },
  {
    query: "Endreinigung möblierte Wohnung",
    title: "Nach Nutzung oder vor Übergabe",
    text: "Für Bad, Küche, Böden, sichtbare Flächen und den Zustand vor Neuvermietung oder Rückgabe.",
    href: "#apartment-reinigung-form",
    cta: "Endreinigung anfragen",
  },
  {
    query: "Business Apartment Reinigung",
    title: "Für Firmen-Apartments",
    text: "Für Projektgäste, Mitarbeiterwohnungen und Betreiber mit Turnus, Fläche und mehreren Einheiten.",
    href: "#apartment-reinigung-form",
    cta: "Firmenfall senden",
  },
  {
    query: "Kurzzeitvermietung Reinigung mit Fotos",
    title: "Fotos helfen beim Aufwand",
    text: "Bilder von Bad, Küche, Bettbereich, Böden und Zugang machen Rückfragen kürzer.",
    href: "#apartment-anfrage-checkliste",
    cta: "Foto-Checkliste",
  },
  {
    query: "Reinigung plus Entsorgung Düsseldorf",
    title: "Wenn vorher noch etwas raus muss",
    text: "Kleine Gegenstände, Möbel oder Reste bitte getrennt nennen, damit Reinigung und Entsorgung sauber getrennt bleiben.",
    href: "/entsorgung-duesseldorf",
    cta: "Entsorgung ergänzen",
  },
];

const apartmentRequestChecklist = [
  {
    label: "Check-out / Check-in",
    value: "Abreise, nächster Check-in, Wunschdatum und mögliche Pufferzeit nennen.",
  },
  {
    label: "Stadtteil & Zugang",
    value: "Düsseldorfer Stadtteil, Etage, Aufzug, Schlüsselweg, Parkmöglichkeit und Zugangssituation angeben.",
  },
  {
    label: "Wohnung & Umfang",
    value: "Fläche, Zimmer, Betten, Bad, Küche, Balkon oder besondere Bereiche kurz beschreiben.",
  },
  {
    label: "Fotos & Zustand",
    value: "Fotos von Bad, Küche, Böden, Bettbereich, Müll und auffälligen Stellen senden.",
  },
  {
    label: "Zusatzwünsche",
    value: "Wäsche, Verbrauchsmaterial, Schlüsselkoordination, Inventarhinweis oder Entsorgung getrennt erwähnen.",
  },
  {
    label: "Turnus & Budget",
    value: "Bei wiederkehrender Reinigung Turnus, mehrere Einheiten und groben Preisrahmen direkt mitschicken.",
  },
];

const recommendationItemListJsonLd = {
  "@type": "ItemList",
  name: "FLOXANT Service-Empfehlungen für Düsseldorf Reinigung",
  itemListElement: recommendationCards.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.text,
    url: item.href.startsWith("#")
      ? `https://www.floxant.de${path}${item.href}`
      : `https://www.floxant.de${item.href}`,
  })),
};

const answerEngineItemListJsonLd = {
  "@type": "ItemList",
  name: "FLOXANT Antwortlogik für Düsseldorf Reinigung",
  itemListElement: answerEngineCards.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.question,
    description: item.answer,
    url: item.href.startsWith("#")
      ? `https://www.floxant.de${path}${item.href}`
      : `https://www.floxant.de${item.href}`,
  })),
};

const apartmentSearchIntentJsonLd = {
  "@type": "ItemList",
  "@id": `https://www.floxant.de${path}#apartment-click-intents`,
  name: "Kundensuchen zur Apartment-Reinigung Düsseldorf",
  itemListElement: apartmentSearchIntentCards.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.query,
    description: item.text,
    url: item.href.startsWith("#")
      ? `https://www.floxant.de${path}${item.href}`
      : `https://www.floxant.de${item.href}`,
  })),
};

const apartmentRequestChecklistJsonLd = {
  "@type": "ItemList",
  "@id": `https://www.floxant.de${path}#apartment-request-checklist`,
  name: "Anfrageangaben für Apartment-Reinigung Düsseldorf",
  itemListElement: apartmentRequestChecklist.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    description: item.value,
    url: `https://www.floxant.de${path}#apartment-anfrage-checkliste`,
  })),
};

const limits = [
  "Keine Verbindung oder Partnerschaft mit Airbnb.",
  "Keine Airbnb-Zertifizierung und kein Plattform-Versprechen.",
  "Kein garantierter Hotelstandard und keine Garantie für Gästebewertungen.",
  "Wäschewechsel, Schlüsselkoordination und Inventarhinweis nur nach Absprache.",
  "Keine 24/7 Betreuung, keine Rezeption, keine Gästekommunikation.",
  "Keine Umzugsleistung als Schwerpunkt für Düsseldorf.",
];

const faqs = [
  {
    q: "Reinigt FLOXANT Airbnb-Wohnungen in Düsseldorf?",
    a: "FLOXANT bietet Reinigung für möblierte Wohnungen, Apartments und Kurzzeitvermietung in Düsseldorf an. Es besteht keine Verbindung oder Partnerschaft mit Airbnb.",
  },
  {
    q: "Ist Reinigung nach Gästewechsel möglich?",
    a: "Ja, nach Verfügbarkeit. Wichtig sind Check-out-Zeit, nächster Check-in, Objektumfang, Fotos und ein realistisches Zeitfenster.",
  },
  {
    q: "Kann ich wiederkehrende Reinigung anfragen?",
    a: "Ja. Für Betreiber, Hosts oder Vermieter können Turnus, mehrere Einheiten, Zugang und Terminlogik nach Absprache geprüft werden.",
  },
  {
    q: "Gibt es Wäschewechsel?",
    a: "Nur nach Absprache und Verfügbarkeit. Diese Seite behauptet keinen garantierten Wäscheservice.",
  },
  {
    q: "Kann FLOXANT Schlüssel koordinieren?",
    a: "Nur nach Absprache. Zugang, Berechtigung und Verantwortlichkeit müssen vorher klar sein. Zugangscodes sollten nicht ungeschützt im Formular gesendet werden.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Bad, Küche, Böden, sichtbaren Flächen und Zugang helfen bei der Einschätzung.",
  },
  {
    q: "Sind Firmenanfragen möglich?",
    a: "Ja. Kleine Betreiber, Vermieter und Anfragen für möblierte Firmen-Apartments können mit Objektart, Fläche, Turnus und Zeitfenster gestellt werden.",
  },
  {
    q: "Was ist nicht enthalten?",
    a: "Nicht automatisch enthalten sind Wäschelogistik, Schlüsselverwahrung, Inventarhaftung, Schadenprüfung, Gästekommunikation, Rezeption oder 24/7-Betreuung.",
  },
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Düsseldorf ist bei FLOXANT auf Reinigung ausgerichtet; Entsorgung bleibt ein eigener Zusatzweg. Umzüge werden dort nicht positioniert.",
  },
];

const faqJsonLd = buildFaqJsonLd(faqs);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildBreadcrumbJsonLd([
      { name: "FLOXANT", item: "/" },
      { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
      { name: "Reinigung möblierte Wohnung Düsseldorf", item: path },
    ]),
    buildWebPageJsonLd({
      name: "Reinigung für möblierte Wohnungen in Düsseldorf",
      description:
        "Spezialseite für Reinigung möblierter Wohnungen, Apartments und Kurzzeitvermietung in Düsseldorf mit Gästewechsel, Endreinigung, Fotos, Zeitfenster und wiederkehrender Anfrage nach Absprache.",
      path,
      about: [
        "Airbnb-ähnliche Vermietung",
        "möblierte Wohnung Düsseldorf",
        "Apartment Reinigung Düsseldorf",
        "Gästewechsel Reinigung",
        "Kurzzeitvermietung Reinigung",
      ],
      potentialActions: [
        { name: "Apartment-Reinigung anfragen", target: `${path}#apartment-reinigung-form` },
        { name: "Per WhatsApp anfragen", target: whatsappHref, type: "ContactAction" },
      ],
    }),
    {
      "@type": "CleaningService",
      "@id": `https://www.floxant.de${path}#cleaning-service`,
      name: "FLOXANT Apartment-Reset Düsseldorf",
      url: `https://www.floxant.de${path}`,
      telephone: "+4915771105087",
      email: DUESSELDORF_CLEANING.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: DUESSELDORF_CLEANING.address.streetAddress,
        postalCode: DUESSELDORF_CLEANING.address.postalCode,
        addressLocality: "Düsseldorf",
        addressCountry: "DE",
      },
      areaServed: ["Düsseldorf"],
      serviceType: [
        "Reinigung möblierter Wohnungen",
        "Apartment-Reinigung",
        "Reinigung nach Gästewechsel",
        "Endreinigung möblierter Wohnungen",
        "Reinigung Kurzzeitvermietung",
      ],
      description:
        "Reinigung für möblierte Wohnungen, Apartments und Kurzzeitvermietung in Düsseldorf. Zusatzleistungen wie Wäschewechsel, Schlüsselkoordination oder Inventarhinweis nur nach Absprache.",
    },
    recommendationItemListJsonLd,
    answerEngineItemListJsonLd,
    apartmentSearchIntentJsonLd,
    apartmentRequestChecklistJsonLd,
  ],
};

export default function ReinigungMoeblierteWohnungDuesseldorfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_46%,#f8fafc_100%)] text-slate-950">
        <section className="px-4 pb-12 pt-10 sm:px-6 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-normal text-cyan-800 shadow-sm">
                <RefreshCcw className="h-4 w-4" />
                FLOXANT Apartment-Reset Düsseldorf
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
                Reinigung für möblierte Wohnungen in Düsseldorf
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Für Vermieter, Hosts, Eigentümer und kleine Betreiber: FLOXANT prüft Reinigung, Gästewechsel, Endreinigung und Zusatzleistungen für möblierte Wohnungen und Kurzzeitvermietung in Düsseldorf.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#apartment-reinigung-form" className="flox-readable-cta-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] px-6 text-sm font-black transition" data-event="service_card_click">
                  Apartment-Reinigung anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-6 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
                  Per WhatsApp anfragen
                </a>
                <Link href={bookingHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-cyan-200 hover:bg-cyan-50">
                  Buchung/Rechner
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                {["Düsseldorf Reinigung", "keine Airbnb-Partnerschaft", "Fotos helfen", "Wäsche/Schlüssel nur nach Absprache"].map((item) => (
                  <span key={item} className="rounded-[0.75rem] border border-slate-200 bg-white px-3 py-1">{item}</span>
                ))}
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {experienceSignals.slice(0, 2).map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div key={item.label} className="rounded-[0.95rem] border border-slate-200 bg-white/88 p-4 shadow-sm shadow-slate-950/5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-[0.8rem] bg-cyan-50 text-cyan-800">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-normal text-slate-500">{item.label}</div>
                          <div className="text-sm font-black text-slate-950">{item.value}</div>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-5 text-slate-600">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[0.95rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
              <div className="rounded-[0.95rem] border border-white/10 bg-[linear-gradient(145deg,#1e293b,#020617)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-normal text-cyan-200">Check-in / Check-out Logik</div>
                    <h2 className="mt-2 text-3xl font-black tracking-normal">Gereinigtes Apartment statt offener Fragen</h2>
                  </div>
                  <BedDouble className="h-10 w-10 text-amber-200" />
                </div>
                <div className="mt-7 grid gap-3">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="group flex items-center gap-3 rounded-[0.85rem] border border-white/10 bg-white/8 px-4 py-3 transition hover:border-cyan-200/35 hover:bg-white/12">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-xs font-black text-slate-950 shadow-[0_0_0_5px_rgba(103,232,249,0.12)]">{index + 1}</span>
                      <span className="text-sm font-black text-white">{step}</span>
                      <span className="ml-auto h-2 w-2 rounded-full bg-emerald-300 opacity-70 transition group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {experienceSignals.slice(2).map((item) => {
                    const Icon = item.Icon;
                    return (
                      <div key={item.label} className="rounded-[0.85rem] border border-white/10 bg-white/8 p-4">
                        <Icon className="h-5 w-5 text-cyan-200" />
                        <div className="mt-3 text-[10px] font-black uppercase tracking-normal text-slate-300">{item.label}</div>
                        <div className="mt-1 text-sm font-black text-white">{item.value}</div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-6 rounded-[0.85rem] border border-white/10 bg-white/8 p-4 text-sm leading-7 text-slate-200">
                  FLOXANT prüft Zeitfenster, Umfang, Zugang, Fotos und Zusatzwünsche nach Absprache. So bleibt die Anfrage realistisch und verständlich.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 lg:p-8">
              <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-normal text-cyan-900">
                    <SearchCheck className="h-4 w-4" />
                    FLOXANT Wegweiser
                  </div>
                  <h2 className="mt-4 text-3xl font-black tracking-normal text-slate-950">
                    Welche FLOXANT-Seite passt zu Ihrer Situation?
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Diese Auswahl reduziert Chaos: Sie wählen nicht aus zehn ähnlichen Angeboten,
                    sondern aus klar getrennten FLOXANT-Wegen für Düsseldorf. Das hilft Kunden,
                    sofort den richtigen Einstieg für Wohnung, Apartment, Firma oder Entsorgung zu erkennen.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {decisionMatrix.map((item, index) => (
                    <Link
                      key={item.recommendation}
                      href={item.href}
                      className="group block h-full rounded-[0.95rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
                      data-event="service_card_click"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-[0.75rem] bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-normal text-white">
                          Pfad {index + 1}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-700" />
                      </div>
                      <div className="mt-4 text-xs font-black uppercase tracking-normal text-cyan-800">
                        {item.recommendation}
                      </div>
                      <h3 className="mt-2 text-base font-black text-slate-950">{item.situation}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.reason}</p>
                      <span className="mt-4 inline-flex text-sm font-black text-cyan-800">
                        {item.cta}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apartment-klick-einstiege" className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-normal text-cyan-900 shadow-sm">
                <SearchCheck className="h-4 w-4" />
                Kunden suchen so
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-slate-950">
                Schnelle Einstiege für Apartment, Gästewechsel und Endreinigung.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Viele Anfragen starten nicht mit einem Fachbegriff, sondern mit einer konkreten Lage:
                nächster Gast kommt, Wohnung ist möbliert, Fotos liegen vor oder es muss vor der Reinigung noch etwas raus.
                Diese Wege führen direkt zur passenden FLOXANT-Anfrage.
              </p>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {apartmentSearchIntentCards.map((item, index) => (
                <Link
                  key={item.query}
                  href={item.href}
                  className="group block h-full rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 hover:shadow-xl hover:shadow-cyan-950/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
                  data-event="service_card_click"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-[0.75rem] bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-normal text-white">
                      Suche {index + 1}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-700" />
                  </div>
                  <div className="mt-4 text-[11px] font-black uppercase tracking-normal text-cyan-800">
                    {item.query}
                  </div>
                  <h3 className="mt-2 text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex text-sm font-black text-cyan-800">
                    {item.cta}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[0.95rem] border border-slate-200 bg-white/92 p-6 shadow-sm lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <div className="text-xs font-black uppercase tracking-normal text-cyan-800">
                  FLOXANT Service-Empfehlung
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                  Welche Reinigung oder Zusatzleistung passt zu Ihrer Anfrage?
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Für Kunden ist die Trennung wichtig:
                  Düsseldorf steht bei FLOXANT für Reinigung; Entsorgung bleibt separat. Nicht für Umzug.
                  Wählen Sie den passenden Einstieg, damit Ort, Objektart, Turnus, Fotos und Zeitfenster direkt klar sind.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendationCards.map((item, index) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group block h-full rounded-[0.95rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
                    data-event="service_card_click"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-[0.75rem] bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-normal text-cyan-900">
                        Weg {index + 1}
                      </span>
                      <span className="rounded-[0.75rem] border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold text-slate-500">
                        {item.signal}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[0.95rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-normal text-cyan-100">
                  <SearchCheck className="h-4 w-4" />
                  Passender Einstieg
                </div>
                <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-normal text-white">
                  Klare Empfehlungen, wenn der Fall wirklich zur FLOXANT-Leistung passt.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Diese Seite macht die Zuordnung eindeutig: möblierte Wohnung, Apartment, Gästewechsel,
                  Endreinigung oder wiederkehrende Reinigung in Düsseldorf. Für Firmenflächen gibt es eine eigene
                  Seite, für Entsorgung eine separate Route. So finden Kunden schneller den passenden
                  Kontaktweg, ohne Reinigung, Entsorgung und Umzug zu vermischen.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {mapsRankingSignals.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[0.85rem] border border-white/10 bg-white/8 p-4 text-sm font-bold leading-6 text-slate-100">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {answerEngineCards.map((item) => (
                  <Link
                    key={item.question}
                    href={item.href}
                    className="group block rounded-[0.95rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200/35"
                    data-event="service_card_click"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.8rem] bg-cyan-300 text-slate-950">
                        <ClipboardCheck className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-black text-white">{item.question}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-100">
                          {item.cta}
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[0.95rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Warum diese Seite existiert</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
                Bei möblierten Wohnungen entscheidet nicht nur sauber, sondern Timing.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Bei Kurzzeitvermietung, Airbnb-ähnlicher Nutzung oder möblierten Firmen-Apartments sind Zeitfenster, Zustand, Zugang und klare Zusatzwünsche entscheidend. FLOXANT fragt deshalb nicht nur nach Quadratmetern, sondern auch nach Check-out, nächstem Check-in, Fotos, Wäschewunsch und Schlüsselkoordination nach Absprache.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {objectTypes.map((item) => (
                  <span key={item} className="rounded-[0.75rem] border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-900">{item}</span>
                ))}
              </div>
            </article>
            <div className="grid gap-3 sm:grid-cols-2">
              {situationCards.map((item, index) => (
                <Link key={item} href="#apartment-reinigung-form" className="group rounded-[0.95rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 hover:shadow-lg hover:shadow-cyan-950/8" data-event="service_card_click">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-700" />
                    <span className="rounded-[0.75rem] bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500 transition group-hover:bg-cyan-100 group-hover:text-cyan-900">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Service-Bausteine</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Was FLOXANT bei möblierten Wohnungen prüfen kann</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Alle Zusatzoptionen sind bewusst als Prüfung nach Absprache formuliert. Es gibt keine Plattform-, Hotel- oder Wäschelogistik-Garantie.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {serviceBlocks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[0.9rem] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Zielgruppen</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Gebaut für Hosts, Vermieter, Betreiber und Firmen</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {targetGroups.map((item) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className="group rounded-[0.95rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-950/10">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[0.85rem] bg-cyan-50 text-cyan-800 transition group-hover:bg-cyan-700 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                    <Link href="#apartment-reinigung-form" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-800" data-event="service_card_click">
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="space-y-5">
              <article className="rounded-[0.95rem] border border-cyan-200 bg-cyan-50 p-7">
                <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Düsseldorf-Abgrenzung</div>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Diese Seite ist nur für Reinigung in Düsseldorf.</h2>
                <p className="mt-4 text-sm leading-7 text-cyan-950">
                  Düsseldorf ist bei FLOXANT für Reinigung positioniert. Diese Seite behandelt Reinigung für möblierte Wohnungen, Apartments und Kurzzeitvermietung in Düsseldorf. Entsorgung bleibt ein separater Zusatzweg; keine Umzugsleistung als Schwerpunkt für Düsseldorf.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/duesseldorf/reinigung" className="inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] bg-slate-950 px-4 text-sm font-black text-white">
                    Reinigung Düsseldorf
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/duesseldorf/bueroreinigung" className="inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] border border-cyan-200 bg-white px-4 text-sm font-black text-cyan-900">
                    Firmenreinigung
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/entsorgung-duesseldorf" className="inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] border border-cyan-200 bg-white px-4 text-sm font-black text-cyan-900">
                    Entsorgung ergänzen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
              <article className="rounded-[0.95rem] border border-amber-200 bg-white p-7">
                <div className="text-xs font-black uppercase tracking-normal text-amber-700">Grenzen und Sicherheit</div>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                  {limits.map((item) => (
                    <div key={item} className="flex gap-3 rounded-[0.85rem] bg-amber-50 px-4 py-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article id="apartment-anfrage-checkliste" className="scroll-mt-28 rounded-[0.95rem] border border-slate-200 bg-white p-7">
                <div className="text-xs font-black uppercase tracking-normal text-slate-500">
                  Schnell richtig anfragen
                </div>
                <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                  Welche Angaben machen die Apartment-Reinigung prüfbar?
                </h2>
                <div className="mt-5 grid gap-3">
                  {apartmentRequestChecklist.map((item, index) => (
                    <div key={item.label} className="rounded-[0.85rem] bg-slate-50 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[10px] font-black uppercase tracking-normal text-slate-500">{item.label}</div>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-cyan-800">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-bold leading-6 text-slate-700">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href="#apartment-reinigung-form" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-4 text-sm font-black text-white" data-event="service_card_click">
                    Angaben senden
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={whatsappHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.85rem] border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-800" data-event="whatsapp_click">
                    Per WhatsApp klären
                  </a>
                </div>
              </article>
            </div>
            <DuesseldorfApartmentCleaningForm />
          </div>
        </section>

        <section id="faq" className="px-4 py-12 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-black uppercase tracking-normal text-cyan-800">FAQ</div>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">Häufige Fragen zur Apartment-Reinigung in Düsseldorf</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-black text-slate-950">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="flox-mobile-action-wrap flox-duesseldorf-action-wrap z-40 md:hidden">
          <div className="flox-mobile-action-shell">
            <div className="flox-mobile-action-grid">
              <Link href="#apartment-reinigung-form" className="flox-mobile-action flox-mobile-action-primary" data-event="service_card_click">
                Anfragen
              </Link>
              <a href={whatsappHref} className="flox-mobile-action flox-mobile-action-whatsapp" data-event="whatsapp_click">
                WhatsApp
              </a>
              <a href="tel:+4915771105087" className="flox-mobile-action flox-mobile-action-light" data-event="phone_click">
                Anrufen
              </a>
              <Link href="#apartment-anfrage-checkliste" className="flox-mobile-action flox-mobile-action-dark" data-event="service_card_click">
                Checkliste
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
