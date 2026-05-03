import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MapPin,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import ServiceRechnerHub from "@/components/calculator/ServiceRechnerHub";
import { BavariaRouteMap } from "@/components/operations/BavariaRouteMap";
import { BudgetOperatingCta } from "@/components/operations/BudgetOperatingCta";
import { OperatingProofStrip } from "@/components/operations/OperatingProofStrip";
import { OperatingStatusBar } from "@/components/operations/OperatingStatusBar";
import { MaskReveal, Reveal, TextReveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/get-dictionary";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_COVERAGE_GROUPS,
  BAVARIA_MAPS_SERVICE_INTENTS,
  BAVARIA_METRO_DISTRICT_LINKS,
  BAVARIA_REGENSBURG_PROXIMITY_LINKS,
} from "@/lib/bavaria-coverage";
import { germanText } from "@/lib/german-text";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "rechner",
    title: "Kostenrechner Regensburg | Umzug, Reinigung & Entrümpelung",
    description:
      "Kosten für Umzug, Reinigung, Entrümpelung oder Büroumzug in Regensburg und Bayern einschätzen. FLOXANT prüft Aufwand, Zugang, Termin und Budget.",
    keywords: [
      "Umzug Rechner Regensburg",
      "Reinigung Rechner Regensburg",
      "Entrümpelung Rechner Bayern",
      "Entsorgung Rechner Regensburg",
      "Büroumzug Rechner Bayern",
      "Umzug Kosten einschätzen",
      "Reinigung Preisrahmen",
      "Kostenrechner Bayern",
      "Preisvorschlag Umzug Reinigung",
      "Entrümpelung Kosten Bayern",
      "Reinigung Kosten Bayern",
      "Umzugsfirma Regensburg Rechner",
      "Reinigungsfirma Regensburg",
      "Google Maps Umzug Regensburg",
      "Service Regensburg Bayern",
      "Bayern Umzug Reinigung Entrümpelung",
      "FLOXANT Rechner",
    ],
  });
}

type RechnerService = "umzug" | "reinigung" | "entsorgung" | "bueroumzug";

function buildServiceMarketHref(service: RechnerService, baseHref: string) {
  if (service === "umzug") {
    return baseHref;
  }

  if (service === "entsorgung") {
    return baseHref.replace("/umzug-", "/entruempelung-");
  }

  if (service === "reinigung") {
    return baseHref.replace("/umzug-", "/reinigung-");
  }

  return baseHref.replace("/umzug-", "/bueroumzug-");
}

function RechnerHeroVisual() {
  const serviceNodes = [
    { label: "Umzug", tone: "bg-blue-600 text-white" },
    { label: "Reinigung", tone: "bg-emerald-500 text-white" },
    { label: "Entrümpelung", tone: "bg-slate-950 text-white" },
    { label: "Büro", tone: "bg-cyan-500 text-white" },
  ];

  const decisionSteps = [
    { label: "Service", value: "Was muss passieren?", icon: Sparkles },
    { label: "Aufwand", value: "Fläche, Volumen, Zugang", icon: Calculator },
    { label: "Ort", value: "Regensburg & Bayern", icon: MapPin },
    { label: "Rahmen", value: "Preisrahmen einordnen", icon: Wallet },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-[-1rem] top-4 hidden h-[590px] w-[36rem] lg:block xl:right-0 xl:h-[640px] xl:w-[43rem]">
      <div className="absolute right-0 top-0 h-[540px] w-[34rem] rounded-[4rem] border border-blue-100/80 bg-[linear-gradient(135deg,rgba(239,246,255,0.96),rgba(255,255,255,0.58)_48%,rgba(236,253,245,0.72))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_28px_90px_rgba(37,99,235,0.10)] xl:w-[40rem]" />
      <div className="absolute right-14 top-10 h-28 w-28 rounded-[2rem] bg-blue-600/10" />
      <div className="absolute right-[19rem] top-24 h-20 w-20 rounded-full bg-emerald-400/15" />
      <div className="absolute right-10 top-4 h-72 w-72 rounded-full border border-blue-100 bg-blue-50/65 blur-[0.2px]" />
      <div className="absolute right-28 top-36 h-80 w-80 rounded-full border border-slate-200/80" />
      <div className="absolute right-12 top-16 h-[510px] w-[510px] rounded-[4rem] bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_75%_70%,rgba(16,185,129,0.19),transparent_34%)] opacity-95" />
      <div className="absolute right-20 top-12 h-2 w-56 rounded-full bg-blue-200/85" />
      <div className="absolute right-8 top-44 h-2 w-40 rounded-full bg-emerald-200/90" />
      <div className="absolute right-[20rem] top-[27rem] h-2 w-48 rounded-full bg-slate-200/95 xl:right-[27rem]" />

      <div className="absolute right-4 top-14 w-[21.5rem] rounded-[2rem] border border-slate-200 bg-white/94 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl xl:right-10 xl:top-20 xl:w-[25rem]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Einsatz einordnen
            </p>
            <p className="mt-1 text-sm font-bold text-slate-950">Von Anfrage zu planbarem Rahmen</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-900/20">
            <Calculator className="h-5 w-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {serviceNodes.map((node) => (
            <div key={node.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${node.tone}`}>
                {node.label}
              </span>
              <div className="mt-3 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-2/3 rounded-full bg-blue-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          {decisionSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{step.label}</p>
                  <p className="truncate text-sm font-semibold text-slate-800">{step.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-black text-emerald-950">Ehrlicher Rahmen</p>
              <p className="mt-1 text-xs leading-5 text-emerald-800">
                Erst Orientierung, dann Einschätzung von Termin, Zugang und tatsächlichem Umfang.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[22rem] top-[23rem] h-24 w-24 rounded-[2rem] border border-blue-200 bg-white/85 shadow-[0_18px_50px_rgba(37,99,235,0.12)] xl:right-[29rem]" />
      <div className="absolute right-[2rem] top-[32rem] h-16 w-48 rounded-full border border-emerald-200 bg-emerald-50/95 shadow-[0_18px_50px_rgba(16,185,129,0.14)]" />
      <div className="absolute right-[26rem] top-[8rem] h-14 w-14 rounded-2xl border border-cyan-200 bg-cyan-50/90 shadow-[0_18px_50px_rgba(8,145,178,0.10)] xl:right-[34rem]" />
    </div>
  );
}

export default async function RechnerPage() {
  const dict = await getDictionary("de");

  const serviceEntryLinks = [
    {
      label: "Umzug-Rechner",
      href: "/rechner?service=umzug#rechner-wizard",
      description: "Direkt in die erste Einordnung für Privat- und Firmenumzug einsteigen.",
    },
    {
      label: "Reinigungs-Rechner",
      href: "/rechner?service=reinigung#rechner-wizard",
      description: "Direkt in die erste Einordnung für Reinigung, Übergabe und Objektservice einsteigen.",
    },
    {
      label: "Entsorgungs-Rechner",
      href: "/rechner?service=entsorgung#rechner-wizard",
      description: "Direkt in die erste Einordnung für Entrümpelung und Entsorgung einsteigen.",
    },
    {
      label: "Büroumzug-Rechner",
      href: "/rechner?service=bueroumzug#rechner-wizard",
      description: "Direkt in die erste Einordnung für Büroumzug, Teamlogik und Firmenstandorte einsteigen.",
    },
  ] as const;

  const calculatorIntentCards = [
    {
      title: "Umzug berechnen",
      query: "Umzug Kosten einschätzen",
      href: "/rechner?service=umzug#rechner-wizard",
      text: "Für Möbel, Kartons, Etagen, Laufwege, Strecke und Zusatzaufgaben.",
    },
    {
      title: "Reinigung berechnen",
      query: "Reinigung Preisrahmen einschätzen",
      href: "/rechner?service=reinigung#rechner-wizard",
      text: "Für Wohnung, Büro, Grundreinigung, Übergabe und objektbezogene Reinigung.",
    },
    {
      title: "Entrümpelung berechnen",
      query: "Entsorgung und Räumung einordnen",
      href: "/rechner?service=entsorgung#rechner-wizard",
      text: "Für Keller, Wohnung, Restmengen, Entsorgung, Volumen und Zugang.",
    },
    {
      title: "Büroumzug planen",
      query: "Firmenumzug planbar machen",
      href: "/rechner?service=bueroumzug#rechner-wizard",
      text: "Für Teams, Arbeitsplätze, Technik, Zeitfenster und Betriebsablauf.",
    },
  ] as const;

  const localSearchShortcuts = BAVARIA_MAPS_SERVICE_INTENTS.map((intent) => ({
    label: intent.primary.label,
    href: intent.primary.href,
    query: intent.query,
  })).slice(0, 8);

  const rechnerOutcomes = [
    {
      title: "Den richtigen Service",
      text: "Sie sehen schneller, ob Ihr Fall eher in Umzug, Reinigung, Entrümpelung oder Büroumzug sauber aufgehoben ist.",
    },
    {
      title: "Den realistischen Rahmen",
      text: "Statt vorschneller Zahl bekommen Sie eine ehrliche Einordnung mit Bandbreite, Kostentreibern und sinnvollen nächsten Schritten.",
    },
    {
      title: "Den passenden Folgeweg",
      text: "Nach der Einordnung geht es geordnet weiter in Anfrage, Preisvorstellung oder Express-Check.",
    },
  ];

  const routingSignals = [
    {
      label: "Ruhiger Start",
      text: "Sie müssen nicht sofort wissen, welcher Service perfekt passt. Der Rechner sortiert Umzug, Reinigung, Entrümpelung und Büroumzug zuerst nach Ihrem Fall.",
    },
    {
      label: "Besser vorbereitet",
      text: "Budget, Termin, Zugang, Fläche, Volumen und Fotos können anschließend sauber ergänzt werden, statt alles in eine unklare Nachricht zu packen.",
    },
    {
      label: "Direkter nächster Schritt",
      text: "Wenn der Rahmen passt, geht es ohne Umweg weiter zu Buchung, WhatsApp, Express-Check oder Preisvorschlag.",
    },
  ];

  const professionalSignals = [
    {
      title: "Klare Rückmeldung",
      text: "Ihre Angaben landen nicht in einer offenen Liste. FLOXANT prüft Umfang, Termin und Machbarkeit und meldet sich mit einem nachvollziehbaren nächsten Schritt.",
    },
    {
      title: "Schneller zum passenden Kontakt",
      text: "Der Rechner sortiert zuerst den Fall. Danach geht es direkt weiter in Anfrage, Express-Kontakt oder Preisvorstellung.",
    },
    {
      title: "Belastbare Einordnung",
      text: "Bandbreite, Kostentreiber und Zusatzleistungen bleiben sichtbar, statt vorschnell einen Preis zu nennen, der später nicht hält.",
    },
  ] as const;

  const decisionPathCards = [
    {
      title: "Ich möchte erst Orientierung",
      text: "Starten Sie mit dem passenden Rechner, wenn Umfang, Ort und Termin noch eingeordnet werden müssen.",
      href: "#rechner-wizard",
      label: "Rechner starten",
      icon: Calculator,
      tone: "border-blue-100 bg-blue-50 text-blue-900",
    },
    {
      title: "Ich habe einen festen Preisrahmen",
      text: "Nennen Sie Ihr Budget, damit FLOXANT einschätzen kann, welcher Umfang dafür realistisch machbar ist.",
      href: "/anfrage-mit-preisrahmen",
      label: "Budget einschätzen lassen",
      icon: Wallet,
      tone: "border-emerald-100 bg-emerald-50 text-emerald-950",
    },
    {
      title: "Der Termin ist dringend",
      text: "Nutzen Sie den Express-Check, wenn Zeitfenster, Zugang oder Übergabe kurzfristig geklärt werden müssen.",
      href: "/express-anfrage",
      label: "Express-Check öffnen",
      icon: Zap,
      tone: "border-amber-100 bg-amber-50 text-amber-950",
    },
    {
      title: "Der Auftrag ist schon klar",
      text: "Gehen Sie direkt zur Buchung, wenn Leistung, Ort und gewünschter Zeitraum bereits feststehen.",
      href: "/buchung",
      label: "Direkt anfragen",
      icon: Sparkles,
      tone: "border-slate-200 bg-white text-slate-950",
    },
  ] as const;

  const costDriverCards = [
    {
      title: "Fläche oder Volumen",
      text: "Wohnfläche, Bürofläche, Möbelmenge oder Entsorgungsvolumen bestimmen den Grundaufwand.",
      icon: Calculator,
    },
    {
      title: "Zugang und Laufwege",
      text: "Etagen, Aufzug, Treppenhaus, Parkmöglichkeit und lange Wege verändern Team- und Zeitbedarf.",
      icon: MapPin,
    },
    {
      title: "Termin und Zeitdruck",
      text: "Flexible Termine lassen sich anders planen als Express, Wochenendfenster oder feste Übergaben.",
      icon: Zap,
    },
    {
      title: "Zusatzleistungen",
      text: "Reinigung, Entsorgung, Tragen, Demontage, Fenster oder Übergabe verändern den realistischen Rahmen.",
      icon: Sparkles,
    },
    {
      title: "Preisrahmen",
      text: "Ein genanntes Budget hilft, Umfang und Machbarkeit ehrlich gegeneinander einzuordnen.",
      icon: Wallet,
    },
    {
      title: "Einschätzung vor Zusage",
      text: "Der Rechner gibt Orientierung. Verbindlich wird es erst nach Einschätzung von Zustand, Umfang und Termin.",
      icon: CheckCircle2,
    },
  ] as const;

  const preparationCards = [
    {
      title: "Ort und Zugang",
      text: "Stadt oder Stadtteil, Etage, Aufzug, Treppenhaus, Laufweg und Parkmöglichkeit helfen bei der ersten Einschätzung.",
      icon: MapPin,
    },
    {
      title: "Umfang und Zustand",
      text: "Fläche, Volumen, Fotos oder kurze Videos machen sichtbar, ob es um Standard, Übergabe, Räumung oder Zusatzaufwand geht.",
      icon: Calculator,
    },
    {
      title: "Termin und Budget",
      text: "Ein Wunschzeitraum und ein Preisrahmen helfen, schnell einzuschätzen, welcher Ablauf realistisch machbar ist.",
      icon: Wallet,
    },
  ] as const;

  const mapsSignals = [
    {
      title: "Standort und Kontakt klar finden",
      text: "Kontakt, Buchung und Service-Seiten zeigen Kunden schnell, welcher Weg für ihre Anfrage passt.",
      href: "/kontakt",
      label: "Kontakt & Standort",
    },
    {
      title: "Service und Ort direkt wählen",
      text: "Wer Ort und Leistung schon kennt, landet über konkrete Stadt- und Service-Seiten schneller beim passenden Einstieg.",
      href: "/standorte",
      label: "Standorte ansehen",
    },
    {
      title: "Anfrage ohne Umweg",
      text: "Nach dem ersten Eindruck muss der nächste Klick schnell in Anfrage, Preisrahmen oder WhatsApp führen.",
      href: "/buchung",
      label: "Buchung öffnen",
    },
  ] as const;

  const knowledgeLinks = [
    {
      title: "Umzugskosten senken ohne Fehlkalkulation",
      href: "/blog/umzugskosten-senken-7-tipps",
      text: "Wenn Sie sparen wollen, ohne am Einsatztag von fehlender Zeit oder Kapazität überrascht zu werden.",
    },
    {
      title: "Preisrahmen vor Festpreis besser verstehen",
      href: "/blog/preisrahmen-vorpruefung-statt-festpreis",
      text: "Warum ein sauberer Rahmen vor der eigentlichen Zusage oft belastbarer ist als ein schneller Fixpreis.",
    },
    {
      title: "Volumen und Risiko richtig einordnen",
      href: "/blog/volumen-risiko-check-umzug",
      text: "Wenn Menge, Zugang und Zusatzaufwand den Unterschied zwischen Theorie und echtem Aufwand machen.",
    },
  ] as const;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Rechner" },
  ];

  const faqItems = [
    {
      q: "Was ist der FLOXANT Rechner?",
      a: "Der Rechner ist der zentrale Einstieg für Umzug, Reinigung, Entrümpelung und Büroumzug. Er sammelt die wichtigsten Angaben und bereitet daraus eine belastbare erste Einordnung vor.",
    },
    {
      q: "Ist der angezeigte Preis ein Endpreis?",
      a: "Nein. Der Rechner dient als Orientierung. Verbindlich wird ein Auftrag erst nach Einschätzung der Angaben, Umfang, Zugang, Termin, Zusatzleistungen und schriftlicher Bestätigung.",
    },
    {
      q: "Kann ich eine eigene Preisvorstellung angeben?",
      a: "Ja. Im späteren Verlauf können Sie optional ein Zielbudget angeben. Diese Angabe ergänzt die Einschätzung, ersetzt sie aber nicht.",
    },
    {
      q: "Für wen ist der Rechner sinnvoll?",
      a: "Für Privatkunden, Unternehmen, Vermieter und Hausverwaltungen, die Aufwand, regionale Relevanz und Zusatzleistungen vor einer Anfrage sauber einordnen wollen.",
    },
    {
      q: "Welchen Rechner soll ich auswählen?",
      a: "Wählen Sie Umzug, wenn Transport, Tragen und Strecke im Mittelpunkt stehen. Wählen Sie Reinigung für Wohnung, Büro, Grundreinigung oder Übergabe. Wählen Sie Entrümpelung, wenn Mengen, Entsorgung und freie Flächen entscheidend sind. Für Firmenstandorte passt der Büroumzug-Rechner.",
    },
    {
      q: "Welche Angaben beeinflussen die Einschätzung am stärksten?",
      a: "Wichtig sind Fläche oder Volumen, Etagen, Laufwege, Parkmöglichkeit, Terminwunsch, Zustand, Zusatzleistungen und Ort. Je genauer diese Angaben sind, desto besser kann FLOXANT Aufwand, Preisrahmen und nächsten Schritt einschätzen.",
    },
    {
      q: "Welche Regionen deckt der Rechner ab?",
      a: "Der Rechner ist vor allem für Regensburg, Bayern und passende planbare Einsätze gedacht. Entscheidend sind Strecke, Termin, Umfang und freie Kapazität.",
    },
    {
      q: "Warum ist der Rechner besser als eine reine Preisfrage?",
      a: "Eine einzelne Preisfrage übersieht oft Zugang, Zeitfenster, Zusatzleistungen und Risiko. Der Rechner führt diese Punkte zusammen und hilft, aus einer losen Anfrage einen klar einschätzbaren Auftrag zu machen.",
    },
    {
      q: "Hilft der Rechner auch bei lokalen Suchen über Google Maps?",
      a: "Ja, indirekt. Die Seite führt Nutzer von Suchintentionen wie Umzug, Reinigung, Entsorgung, Entrümpelung, Lagerung oder Büroumzug schneller zum passenden lokalen FLOXANT-Einstieg, statt alles über eine allgemeine Kontaktseite laufen zu lassen.",
    },
    {
      q: "Was fragt der Reinigungs-Rechner besonders ab?",
      a: "Beim Reinigungs-Rechner zählen vor allem Reinigungsziel, Objektart, Fläche, Zustand, Fenster, Küche, Bad, Möblierung, Terminwunsch und mögliche Übergabeanforderungen. Diese Angaben helfen, Wohnungsreinigung, Büroreinigung, Grundreinigung oder Übergabereinigung sauberer einzuordnen.",
    },
    {
      q: "Was sollte ich vor dem Rechner bereithalten?",
      a: "Hilfreich sind Ort oder Stadtteil, Fläche oder Volumen, Etage, Aufzug, Parkmöglichkeit, Terminwunsch, grober Zustand und optional ein Budget. Fotos oder kurze Videos können später bei der Einschätzung sehr helfen.",
    },
    {
      q: "Muss ich schon alle Details kennen?",
      a: "Nein. Der Rechner funktioniert auch als erster Einstieg. Wenn einzelne Angaben fehlen, kann FLOXANT später gezielt nachfragen und den Preisrahmen realistischer einordnen.",
    },
  ];

  const marketGroups = BAVARIA_COVERAGE_GROUPS.map((group) => ({
    ...group,
    links: group.links.slice(0, 6),
  }));

  const metroDirectLinks = BAVARIA_METRO_DISTRICT_LINKS.map((item) => ({
    label: item.label,
    href: item.href,
    note: item.note,
  }));

  const regensburgCoreLinks = BAVARIA_DIRECT_DEMAND_LINKS.slice(0, 6);

  const localSeoTags = [
    { label: "Umzug Regensburg", href: "/umzug-regensburg" },
    { label: "Reinigung Regensburg", href: "/reinigung-regensburg" },
    { label: "Entrümpelung Regensburg", href: "/entruempelung-regensburg" },
    { label: "Büroumzug Regensburg", href: "/bueroumzug-regensburg" },
    { label: "Wohnungsauflösung Regensburg", href: "/wohnungsaufloesung-regensburg" },
    { label: "Beiladung Regensburg", href: "/beiladung-regensburg" },
    { label: "Einlagerung Regensburg", href: "/einlagerung" },
    { label: "Kostenrechner Bayern", href: "/rechner" },
  ] as const;

  const businessModelSteps = [
    {
      title: "1. Erst Orientierung oder Direktanfrage wählen",
      text: "Der Rechner ist für Einordnung und Preisrahmen. Die Buchung passt, wenn der Auftrag schon klar ist.",
    },
    {
      title: "2. Service, Ort und Machbarkeit sortieren",
      text: "Statt anonyme Vergleichsformulare zu füllen, führt FLOXANT Leistung, Ort und Machbarkeit in einer klaren Anfrage zusammen.",
    },
    {
      title: "3. In den passenden Kontaktweg weitergehen",
      text: "Danach geht es geordnet in Anfrage, WhatsApp, Express-Check oder Preisvorstellung weiter.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Rechner", item: "/rechner" },
      ]),
      buildWebPageJsonLd({
        name: "FLOXANT Rechner für Umzug, Reinigung und Entrümpelung",
        description:
          "Der FLOXANT Rechner ist der direkte Einstieg für unverbindliche Orientierungsrahmen in Regensburg und Bayern.",
        path: "/rechner",
        about: [
          "Preisrahmen",
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Büroumzug",
          "Regensburg",
          "Bayern",
          "200-km-Einsatzgebiet",
        ],
      }),
      buildServiceJsonLd({
        name: "FLOXANT Rechner und Einschätzung",
        description:
          "Der FLOXANT Rechner ordnet Umzug, Reinigung, Entrümpelung und Büroumzug in einen nachvollziehbaren Orientierungsrahmen ein.",
        path: "/rechner",
        serviceType: "Rechner und Einschätzung",
        areaServed: ["Regensburg", "Bayern"],
      }),
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#service-einstiege",
        name: "FLOXANT Rechner-Einstiege",
        description:
          "Direkte URL-Einstiege in den passenden FLOXANT Rechner für Umzug, Reinigung, Entsorgung und Büroumzug.",
        itemListElement: serviceEntryLinks.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `https://www.floxant.de${item.href}`,
          description: item.description,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#suchabsichten",
        name: "FLOXANT Rechner Suchabsichten",
        description:
          "Häufige Suchabsichten für Umzugskosten, Reinigungskosten, Entrümpelung, Entsorgung und Büroumzug im FLOXANT Rechner.",
        itemListElement: calculatorIntentCards.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `https://www.floxant.de${item.href}`,
          description: `${item.query}: ${item.text}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#maps-service-intents",
        name: "FLOXANT Maps-Service-Intentionen",
        description:
          "Direkte Servicepfade für Maps-Suchen nach Umzug, Reinigung, Entrümpelung, Entsorgung, Lagerung, Büroumzug und Gewerbereinigung.",
        itemListElement: BAVARIA_MAPS_SERVICE_INTENTS.map((intent, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: intent.title,
          url: `https://www.floxant.de${intent.primary.href}`,
          description: intent.description,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#regensburg-kernpfade",
        name: "FLOXANT Regensburg Kernpfade",
        description:
          "Direkte lokale FLOXANT Einstiege für Regensburg: Umzug, Reinigung, Entrümpelung, Büroumzug, Einlagerung und Akteneinlagerung.",
        itemListElement: regensburgCoreLinks.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `https://www.floxant.de${item.href}`,
          description: item.note,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#lokale-tags",
        name: "FLOXANT lokale Such-Tags",
        description:
          "Lokale Suchbegriffe und interne Links für Regensburg, Bayern, Umzug, Reinigung, Entrümpelung, Büroumzug, Beiladung und Einlagerung.",
        itemListElement: localSeoTags.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `https://www.floxant.de${item.href}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#preisfaktoren",
        name: "FLOXANT Rechner Preisfaktoren",
        description:
          "Die wichtigsten Preisfaktoren für Umzug, Reinigung, Entrümpelung und Büroumzug im FLOXANT Kostenrechner.",
        itemListElement: costDriverCards.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          description: item.text,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#vorbereitung",
        name: "FLOXANT Rechner Vorbereitung",
        description:
          "Welche Angaben Kunden vor dem FLOXANT Rechner für Umzug, Reinigung, Entrümpelung oder Büroumzug bereithalten können.",
        itemListElement: preparationCards.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          description: item.text,
        })),
      },
      {
        "@type": "ItemList",
        "@id": "https://www.floxant.de/rechner#kundenweg",
        name: "FLOXANT Rechner Kundenweg",
        description:
          "Wie der FLOXANT Rechner Kunden von der ersten Preisfrage zu einem realistisch einschätzbaren nächsten Schritt führt.",
        itemListElement: routingSignals.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          description: item.text,
        })),
      },
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs lang="de" items={breadcrumbs} />

      <section id="ueberblick" className="section-glow relative px-6 pb-20 pt-10">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <FloxantSymbolLayer variant="office" density="rich" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <RechnerHeroVisual />
          <div className="relative z-10 max-w-4xl xl:max-w-[760px]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
                <Calculator className="h-4 w-4" />
                FLOXANT Rechner
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              text="Preisrahmen für Regensburg und Bayern sauber einschätzen"
              className="mt-8 max-w-[15ch] text-4xl font-bold leading-[0.99] tracking-[-0.02em] text-slate-950 md:text-7xl"
              delay={0.08}
              wordDelay={0.055}
            />
            <MaskReveal delay={0.22}>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                Wählen Sie Umzug, Reinigung, Entrümpelung oder Büroumzug. FLOXANT fragt die
                Punkte ab, die später wirklich zählen: Fläche oder Volumen, Zugang, Termin,
                Zusatzleistungen und Ort. Danach geht es ohne Umweg weiter in Anfrage,
                Budgeteinschätzung oder Express-Check.
              </p>
            </MaskReveal>
            <Reveal delay={0.28}>
              <OperatingStatusBar />
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#rechner-wizard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[1.2rem] border border-blue-200 bg-white px-5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm shadow-slate-950/5 transition hover:bg-blue-50"
                >
                  Passenden Rechner starten
                  <Calculator className="h-4 w-4" />
                </Link>
                <Link
                  href="/buchung"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[1.2rem] bg-blue-600 px-5 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500"
                >
                  Direkt anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/express-anfrage"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 text-[11px] font-black uppercase tracking-[0.16em] text-amber-900 transition hover:bg-amber-100"
                >
                  <Zap className="h-4 w-4" />
                  Express-Check
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.38}>
              <div className="mt-6 flex flex-wrap gap-2">
                {serviceEntryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950 hover:shadow-md"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {calculatorIntentCards.map((item, index) => (
                <Reveal key={item.href} delay={0.44 + index * 0.06} className="h-full">
                  <Link
                    href={item.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/92 p-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-xl hover:shadow-blue-950/10"
                  >
                    <span className="absolute right-4 top-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                    <div className="pr-12">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                        {item.query}
                      </p>
                      <h2 className="mt-2 text-lg font-bold tracking-[-0.015em] text-slate-950">
                        {item.title}
                      </h2>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-5 rounded-[1.45rem] border border-slate-200 bg-white/88 p-4 shadow-sm shadow-slate-950/5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Lokale Suchwege
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Wenn Service und Ort schon feststehen, direkt zur passenden Seite statt lange
                    suchen.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {localSearchShortcuts.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                      title={germanText(item.query, item.query)}
                    >
                      {germanText(item.label, item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Was ist das?",
                text: "Ein geführter Einstieg für Umzug, Reinigung, Entrümpelung und Büroumzug. Sie geben die wichtigsten Eckdaten an und sehen schneller, welcher Weg realistisch passt.",
              },
              {
                title: "Für wen?",
                text: "Für Privatkunden, Unternehmen, Vermieter und Hausverwaltungen, die Aufwand, Region und Zusatzleistungen sauber einordnen wollen.",
              },
              {
                title: "Was zeigt der Rechner?",
                text: "Einen unverbindlichen Orientierungsrahmen plus die wichtigsten Kostentreiber, nicht aber einen garantierten Endpreis.",
              },
              {
                title: "Was bleibt offen?",
                text: "Der Rechner ersetzt keine finale Einsatzabstimmung, schafft aber eine bessere Grundlage für Termin, Team, Zugang, Preisrahmen und Angebot.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <article className="card-premium group relative h-full overflow-hidden rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
                  <div className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    0{index + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <OperatingProofStrip />
        </div>
      </section>

      <section id="rechner-einstieg" className="section-glow relative scroll-mt-28 px-6 pb-14 pt-0">
        <div className="mx-auto max-w-7xl">
          <div id="leistungen" className="relative -top-24 block h-0 w-0" />
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <span className="label-premium text-blue-700">Schnellstart</span>
              <TextReveal
                as="h2"
                text="Erst rechnen. Dann direkt anfragen."
                className="mt-4 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-5xl"
                wordDelay={0.055}
              />
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
                Sie können sofort mit Umzug, Reinigung, Entrümpelung oder Büroumzug starten.
                Ausführliche Hinweise, regionale Wege und häufige Fragen stehen darunter, ohne den
                Einstieg zu blockieren.
              </p>
            </Reveal>
          </div>
          <div className="mb-6 rounded-[2rem] border border-slate-200 bg-white/92 p-4 shadow-sm shadow-slate-950/5 md:p-5">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Entscheidungshilfe
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-950">
                  Welcher Einstieg passt gerade?
                </h3>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Nicht jeder Kunde braucht denselben Start. Wählen Sie den Weg, der zu
                Preisfrage, Budget, Zeitdruck oder klarer Anfrage passt.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {decisionPathCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.href} delay={index * 0.06} className="h-full">
                    <Link
                      href={item.href}
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-4 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10 ${item.tone}`}
                    >
                      <span className="absolute right-4 top-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current/10 bg-white/54 text-current/70 transition group-hover:bg-white/82 group-hover:text-current">
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                      <Icon className="h-5 w-5 shrink-0" />
                      <h4 className="mt-4 pr-10 text-base font-black leading-tight">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 opacity-75">{item.text}</p>
                      <span className="mt-4 inline-flex text-[11px] font-black uppercase tracking-[0.14em]">
                        {item.label}
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
            <BudgetOperatingCta className="mt-4" />
          </div>
          <div
            id="preisfaktoren"
            className="mb-6 scroll-mt-28 rounded-[2rem] border border-blue-100 bg-blue-50/45 p-4 shadow-sm shadow-slate-950/5 md:p-5"
          >
            <div className="mb-4 grid gap-3 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Preisfaktoren
                </div>
                <TextReveal
                  as="h3"
                  text="Was den Aufwand wirklich bewegt"
                  className="mt-2 max-w-[14ch] text-2xl font-bold tracking-[-0.02em] text-slate-950"
                  wordDelay={0.05}
                />
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Gute Einschätzungen entstehen nicht durch eine einzelne Zahl. Sie entstehen,
                wenn Umfang, Zugang, Termin, Ort und Zusatzleistungen zusammen betrachtet werden.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {costDriverCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-[1.25rem] border border-white/80 bg-white/88 p-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/10"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-slate-950">{item.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-blue-100 pt-4 sm:flex-row sm:flex-wrap">
              <Link
                href="#rechner-wizard"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[1rem] bg-blue-600 px-4 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-blue-500"
              >
                Preisfaktoren verstehen
                <Calculator className="h-4 w-4" />
              </Link>
              <Link
                href="/anfrage-mit-preisrahmen"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[1rem] border border-blue-200 bg-white px-4 text-[11px] font-black uppercase tracking-[0.14em] text-blue-700 transition hover:bg-blue-50"
              >
                Budget nennen
                <Wallet className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div
            id="vorbereitung"
            className="mb-6 scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94)_45%,rgba(236,253,245,0.64))] p-5 shadow-sm shadow-slate-950/5 md:p-6"
          >
            <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  Vor dem Start
                </div>
                <h3 className="mt-2 max-w-[15ch] text-2xl font-bold leading-[1.04] tracking-[-0.02em] text-slate-950 md:text-3xl">
                  Drei Dinge machen die Einschätzung sofort besser
                </h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                Sie müssen nicht alles perfekt wissen. Wenn diese Punkte grob vorhanden sind,
                wird aus dem Rechner aber schneller eine brauchbare Anfrage für Umzug, Reinigung,
                Entrümpelung oder Büroumzug.
              </p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {preparationCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group rounded-[1.35rem] border border-white/80 bg-white/88 p-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h4 className="mt-4 text-sm font-black text-slate-950">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {professionalSignals.map((item) => (
              <article key={item.title} className="glass-elevated rounded-[1.45rem] px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Planungssignal
                </div>
                <h3 className="mt-2 text-[1.05rem] font-bold leading-[1.1] tracking-[-0.018em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>

          <div id="rechner-wizard" className="scroll-mt-28" />
          <ServiceRechnerHub dic={dict} />
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-elevated relative overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-white via-blue-50/55 to-emerald-50/45 p-6 md:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-emerald-200/25 blur-2xl" />
            <div className="relative">
            <div className="label-premium text-blue-700">Was Sie hier wirklich bekommen</div>
            <h2 className="mt-4 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Ein ruhiger Einstieg statt Preischaos
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
              Der Rechner ist ein sauberer Einstieg für Kunden, die Aufwand, Service-Fit und
              nächste Entscheidung ruhig einordnen wollen. Ein zu früher Billigpreis hilft wenig,
              wenn am Einsatztag Fahrzeug, Zeitfenster oder Übergabe nicht zur Aufgabe passen.
            </p>
            <div className="mt-6 grid gap-3">
              {routingSignals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.15rem] border border-white/80 bg-white/86 px-4 py-3 shadow-sm shadow-slate-950/5"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    {item.label}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {rechnerOutcomes.map((item) => (
              <article key={item.title} className="card-premium group relative overflow-hidden rounded-[1.7rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition group-hover:opacity-100" />
                <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-10">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {businessModelSteps.map((item) => (
            <article key={item.title} className="glass-elevated rounded-[1.8rem] p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Kundenweg-Klarheit
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="regensburg-kern" className="section-glow relative content-auto px-6 pb-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(239,246,255,0.78)_48%,rgba(255,247,237,0.58))] p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Regensburg als Kern
              </div>
              <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
                Regensburg zuerst. Bayern sauber angebunden.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                FLOXANT wird lokal über konkrete Leistungen gefunden: Umzug, Reinigung,
                Entrümpelung, Büroumzug, Einlagerung und Akteneinlagerung. Der Rechner verbindet
                diese Regensburg-Kernpfade mit passenden Bayern-Seiten, ohne Nutzer in einer
                allgemeinen Kontaktseite zu verlieren.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {localSeoTags.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/80 bg-white/90 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-700 shadow-sm shadow-slate-950/5 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {regensburgCoreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[1.35rem] border border-white/80 bg-white/88 p-4 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                        Kernpfad Regensburg
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-slate-950">
                        {germanText(item.label, item.label)}
                      </h3>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {germanText(item.note, item.note || "")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <BavariaRouteMap />
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(239,246,255,0.78)_48%,rgba(236,253,245,0.62))] p-7 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-8 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Suche, Maps und direkte Anfrage
            </div>
            <h2 className="mt-3 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Aus der Suche direkt zum passenden Einstieg
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Wer nach Umzug, Reinigung, Entsorgung, Entrümpelung, Lagerung oder Büroumzug
              sucht, will nicht erst eine allgemeine Website durchsuchen. Diese Übersicht führt
              Kunden aus Google, Maps oder WhatsApp direkt zu dem Weg, der zum konkreten Anliegen passt.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BAVARIA_MAPS_SERVICE_INTENTS.map((intent) => (
              <article
                key={intent.id}
                className="group relative overflow-hidden rounded-[1.55rem] border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-950/10"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-0 transition group-hover:opacity-100" />
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {germanText(intent.query, intent.query)}
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{germanText(intent.title, intent.title)}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{germanText(intent.description, intent.description)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={intent.primary.href}
                    className="rounded-full bg-blue-600 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-sm shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                  >
                    {germanText(intent.primary.label, intent.primary.label)}
                  </Link>
                  {intent.supporting.slice(0, 2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                    >
                      {germanText(item.label, item.label)}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(255,255,255,1))] p-6 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Vertiefung
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Erst den Rahmen verstehen, dann den Rechner nutzen.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 lg:text-right">
              Diese Beiträge schärfen genau die Fragen, die vor Preisrahmen, Volumen und
              echter Einsatzplanung am häufigsten auftauchen.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {knowledgeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.45rem] border border-white bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Ratgeber
                </div>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Weiterlesen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="label-premium text-blue-700">Bayern-Servicewege</span>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
              Direkte Wege aus Bayern in den passenden Rechner
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Regensburg bleibt der operative Kern. Gleichzeitig sollen Kunden aus Bayern
              sofort sehen, welche Orte, Regionen und Leistungen bei FLOXANT sauber
              angefragt werden können.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {marketGroups.map((group) => (
              <article key={group.id} className="card-premium rounded-[2rem] p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  {germanText(group.region, group.region)}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{germanText(group.description, group.description)}</p>
                <div className="mt-6 grid gap-3">
                  {group.links.map((link) => (
                    <div
                      key={link.href}
                      className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm shadow-slate-950/5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold text-slate-950">{germanText(link.label, link.label)}</div>
                        <Link
                          href={link.href}
                          className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 hover:text-blue-900"
                        >
                          Seite
                        </Link>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                          href={buildServiceMarketHref("umzug", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Umzug
                        </Link>
                        <Link
                          href={buildServiceMarketHref("reinigung", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Reinigung
                        </Link>
                        <Link
                          href={buildServiceMarketHref("entsorgung", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Entrümpelung
                        </Link>
                        <Link
                          href={buildServiceMarketHref("bueroumzug", link.href)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                        >
                          Büroumzug
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.98))] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Stadtbezirke mit klaren Einstiegen
                </div>
                <h3 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-950">
                  Schnellere Wege für dichte Stadtlagen
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  In großen Städten zählt oft der konkrete Stadtteil. Diese Wege helfen bei
                  knappen Zeitfenstern, engen Zufahrten und Anfragen, die direkt zur passenden
                  Leistung führen sollen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {metroDirectLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-blue-50 hover:text-slate-950"
                  >
                    {germanText(item.label, item.label)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Direkte Stadt- und Servicewege
            </div>
            <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Wenn der Ort schon feststeht, geht es direkt in die passende Seite
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Nicht jeder Nutzer braucht zuerst den Rechner. Diese Seiten holen Bayern-Suchen
              direkt dort ab, wo Service und Stadt schon konkret sind.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BAVARIA_DIRECT_DEMAND_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-premium rounded-[1.6rem] p-5 transition-all hover:-translate-y-1 hover:border-blue-300/30"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Direktseite Bayern
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{germanText(item.label, item.label)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{germanText(item.note, item.note || "")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Lokale Orientierung
            </div>
            <h2 className="mt-3 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Was Kunden vor der Anfrage schnell erkennen sollten
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Niemand kann eine bestimmte Platzierung garantieren. Klar sichtbare Kontaktwege,
              passende Standortseiten und nachvollziehbare Leistungen helfen Kunden aber,
              schneller den richtigen FLOXANT Einstieg zu wählen.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {mapsSignals.map((item) => (
              <article key={item.title} className="glass-elevated rounded-[1.8rem] p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Lokaler Weg
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow relative content-auto px-6 pb-14">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm shadow-slate-950/5 md:p-8">
          <div className="mb-6 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Regensburg Nahraum
            </div>
            <h2 className="mt-3 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.02em] text-slate-950 md:text-4xl">
              Stadtnahe Orte als starke lokale Einstiegspunkte
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Wer aus dem direkten Umfeld anfragt, soll schnell zur passenden Leistung kommen.
              Diese Orte helfen Kunden, Nähe, Anfahrt und Service schneller einzuordnen.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BAVARIA_REGENSBURG_PROXIMITY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
              >
                {germanText(item.label, item.label)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="ablauf" className="section-glow relative content-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <span className="label-premium text-blue-700">Einordnung</span>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-bold leading-[1] tracking-[-0.022em] text-slate-950 md:text-5xl">
              Wie der Rechner die Einschätzung aufbaut
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Ausgangslage erfassen",
                text: "Objekt, Umfang, Region und Zusatzleistungen werden so abgefragt, dass keine wesentlichen Faktoren verloren gehen.",
                icon: MapPin,
              },
              {
                title: "Kostentreiber sichtbar machen",
                text: "Fläche, Zugang, Etage, Entfernung, Teamlogik und Zusatzwünsche bilden die reale Belastung für Planung und Einsatz ab.",
                icon: Wallet,
              },
              {
                title: "Nächsten Schritt klar führen",
                text: "Nach dem Rahmen geht es geordnet weiter in Buchung, Preisvorstellung oder Express-Check statt in ein offenes Ende.",
                icon: Sparkles,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="card-premium rounded-[2rem] p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zum FLOXANT Rechner
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-blue-700" />
                  <div>
                    <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
