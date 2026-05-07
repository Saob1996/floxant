import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  type LucideIcon,
  MapPin,
  Shield,
  Zap,
  Banknote,
} from "lucide-react";

import { AuthorityMagnet } from "@/components/AuthorityMagnet";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityServiceCluster } from "@/components/CityServiceCluster";
import DualCalculator from "@/components/calculator/DualCalculator";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import {
  PublicAuthorityModules,
  type PublicAuthorityModuleId,
} from "@/components/PublicAuthorityModules";
import { SignatureServices, type SignatureServiceId } from "@/components/SignatureServices";
import { TrustBadge } from "@/components/trust/TrustBadge";
import { getCityGeoData, BAVARIAN_CITIES_GEO } from "@/lib/geo-data";
import { germanText, germanizeDeep } from "@/lib/german-text";
import { applyCity } from "@/lib/specialty-page";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

type IconEntry = {
  icon: LucideIcon;
  text: string;
  iconClassName?: string;
};

type ServiceCard = {
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
  lines: string[];
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SpecialtyPageLayoutProps = {
  lang: string;
  dict: any;
  heroBadge?: string;
  heroTitle: string;
  city: string;
  heroText?: string;
  ctaText?: string;
  breadcrumbs: BreadcrumbItem[];
  chips?: IconEntry[];
  cards?: ServiceCard[];
  sectionTitle?: string;
  sectionParagraphs?: string[];
  wizardBadge?: string;
  wizardTitle?: string;
  wizardText?: string;
  neighborhoods?: string[];
  heroImage?: string;
  highlightWord?: string;
  signatureServices?: readonly SignatureServiceId[];
  signatureBadge?: string;
  signatureTitle?: string;
  signatureSubtitle?: string;
  authorityModules?: readonly PublicAuthorityModuleId[];
  authorityBadge?: string;
  authorityTitle?: string;
  authoritySubtitle?: string;
};

function nonEmpty(values: Array<string | undefined | null>) {
  return values.filter((value): value is string => Boolean(value && value.trim()));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getServiceContext(signal: string, city: string, citySlug: string, region: string, isBavariaPage: boolean) {
  if (signal.includes("büro") || signal.includes("buero") || signal.includes("firmenumzug")) {
    return {
      name: "Büroumzug",
      pagePath: isBavariaPage ? "/bueroumzug-bayern" : `/bueroumzug-${citySlug}`,
      primaryPath: "/bueroumzug",
      calculatorHref: "/rechner?service=bueroumzug",
      calculatorService: "umzug" as const,
      audience: `Der Büroumzug in ${city} richtet sich an Unternehmen, Kanzleien, Praxen und Büros, die Arbeitsplatzwechsel, Inventar, Akten und Zeitfenster sauber koordinieren müssen.`,
      timing: `Er ist sinnvoll, wenn laufender Betrieb, IT, Archiv, Möbel, Etagen, Ladewege oder Übergabetermine in ${city} planbar bleiben sollen.`,
      process: `Wir erfassen Arbeitsplätze, Inventar, Laufwege, Zugang, Park- oder Ladezonen und stimmen den Ablauf so ab, dass der Geschäftsbetrieb möglichst wenig gestört wird.`,
      difference: `Im Unterschied zum privaten Standardumzug zählen beim Büroumzug vor allem Betriebsunterbrechung, Teamkoordination, Inventarstruktur, sensible Unterlagen und verbindliche Zeitfenster.`,
      relatedLinks: [
        { href: "/bueroumzug", label: "Büroumzug als Hauptservice" },
        { href: "/firmenentsorgung", label: "Firmenentsorgung für Büroinventar" },
        { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt für Firmen nutzen" },
        { href: "/service-area-bayern", label: `Büroumzug in ${region} und Bayern` },
      ],
    };
  }

  if (signal.includes("reinigung")) {
    return {
      name: "Reinigung",
      pagePath: isBavariaPage ? "/reinigung-bayern" : `/reinigung-${citySlug}`,
      primaryPath: "/reinigung",
      calculatorHref: "/rechner?service=reinigung",
      calculatorService: "reinigung" as const,
      audience: `Die Reinigung in ${city} richtet sich an Vermieter, Mieter, Hausverwaltungen und Gewerbekunden, die saubere und klar dokumentierte Ergebnisse brauchen.`,
      timing: `Sie ist besonders sinnvoll vor Übergaben, nach Auszug, vor Wiedervermietung oder für regelmäßig betreute Flächen in ${city}.`,
      process: `Wir klären Objekt, Flächen und Verschmutzungsgrad, stimmen die Leistungen ab und planen einen festen Termin für die Reinigung in ${city}.`,
      difference: `Im Unterschied zur spontanen Alltagsreinigung ist der Service auf Abnahme, Hygiene und klar definierte Leistungen ausgelegt.`,
      relatedLinks: [
        { href: "/reinigung", label: "Reinigung in Bayern im Überblick" },
        { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
        { href: "/rechner", label: "Reinigung direkt kalkulieren" },
        { href: "/service-area-bayern", label: `Reinigung in ${region} und Bayern` },
      ],
    };
  }

  if (signal.includes("entr") || signal.includes("wohnungsaufloesung")) {
    return {
      name: "Entrümpelung",
      pagePath: isBavariaPage ? "/entruempelung-bayern" : `/entruempelung-${citySlug}`,
      primaryPath: "/entruempelung",
      calculatorHref: "/rechner?service=entsorgung",
      calculatorService: "entsorgung" as const,
      audience: `Die Entrümpelung in ${city} ist für Haushalte, Erbfälle, Vermieter und Unternehmen gedacht, die Räume schnell, diskret und besenrein frei bekommen müssen.`,
      timing: `Sie ist sinnvoll bei Wohnungsauflösungen, Kellerräumungen, Nachlassfällen oder vor Sanierung, Verkauf und Neuvermietung in ${city}.`,
      process: `Wir sichten Umfang und Zugangswege, trennen verwertbare Materialien, organisieren Abtransport und hinterlassen die Flächen in ${city} besenrein.`,
      difference: `Im Unterschied zur reinen Sperrmüllabholung umfasst der Service Sortierung, Tragearbeit, Transport und fachgerechte Entsorgung aus einer Hand.`,
      relatedLinks: [
        { href: "/entruempelung", label: "Entrümpelung in Bayern erklärt" },
        { href: "/kleinmengen-entsorgung", label: "Kleinmengen fachgerecht entsorgen" },
        { href: "/entruempelung-kosten-regensburg", label: "Entrümpelungskosten in Regensburg einordnen" },
        { href: "/service-area-bayern", label: `Entrümpelung in ${region} und Bayern` },
      ],
    };
  }

  return {
    name: "Umzug",
    pagePath: isBavariaPage ? "/umzug-bayern" : `/umzug-${citySlug}`,
    primaryPath: "/umzug",
    calculatorHref: "/rechner?service=umzug",
    calculatorService: "umzug" as const,
    audience: `Der Umzugsservice in ${city} ist für Privatkunden, Familien und Unternehmen gedacht, die einen planbaren Ortswechsel mit klaren Zuständigkeiten brauchen.`,
    timing: `Er lohnt sich, wenn Volumen, Tragewege, Zeitfenster oder Zusatzleistungen in ${city} sauber koordiniert werden müssen.`,
    process: `Wir erfassen Strecke, Volumen und Zusatzleistungen, planen Fahrzeuge und Team und setzen den Umzug in ${city} strukturiert am Wunschtermin um.`,
    difference: `Im Unterschied zu improvisierten Einzeltransporten erhalten Sie eine abgestimmte Einsatzplanung mit festen Leistungen und klarer regionaler Verfügbarkeit.`,
    relatedLinks: [
      { href: "/umzug", label: "Umzug in Bayern im Überblick" },
      { href: "/beiladung", label: "Beiladung für einzelne Möbel prüfen" },
      { href: "/rechner", label: "Umzug direkt kalkulieren" },
      { href: "/service-area-bayern", label: `Umzug in ${region} und Bayern` },
    ],
  };
}

function getRegensburgAuthorityContent(serviceName: string) {
  const sharedTrust = [
    "Regensburg ist der operative Kern; weitere Orte werden nach Route, Umfang und Kapazität geprüft.",
    "Fotos von Zugang, Zustand, Menge oder Fläche verkürzen Rückfragen und machen Angebote belastbarer.",
    "Budget und Preisrahmen sind willkommen, werden aber erst nach Umfang und Machbarkeit eingeordnet.",
  ];

  if (serviceName === "Reinigung") {
    return {
      eyebrow: "Lokale Reinigungssituationen",
      title: "Typische Reinigungsfälle in Regensburg",
      intro:
        "Viele Reinigungsanfragen entstehen kurz vor Übergabe, Einzug oder Wiedervermietung. Entscheidend ist dann nicht ein schöner Werbesatz, sondern ob Fläche, Zustand, Termin und gewünschtes Ergebnis sauber geklärt sind.",
      situations: [
        {
          title: "Endreinigung vor Wohnungsübergabe",
          text: "Küche, Bad, Böden, Fensterbereiche und schwer erreichbare Stellen müssen vor dem Termin realistisch eingeordnet werden.",
        },
        {
          title: "Reinigung nach Auszug",
          text: "Wenn Möbel weg sind, werden Staub, Klebereste, Laufspuren oder vergessene Bereiche erst richtig sichtbar.",
        },
        {
          title: "Kombi mit Umzug",
          text: "Wenn Transport und Reinigung eng zusammenliegen, hilft ein gemeinsamer Ablauf statt zwei getrennter Dienstleister.",
        },
      ],
      inputTitle: "Was Kunden vorab angeben sollten",
      inputs: [
        "Fläche in Quadratmetern oder Raumanzahl",
        "Reinigungsziel: Übergabe, Grundreinigung, Büro oder laufender Objektbedarf",
        "Fotos von Küche, Bad, Boden, Fenstern und starken Verschmutzungen",
        "Terminwunsch und spätester Übergabetermin",
      ],
      faqs: [
        {
          q: "Kann FLOXANT Reinigung und Umzug in Regensburg kombinieren?",
          a: "Ja, je nach Kapazität und Auftrag können Reinigung, Umzug, Restmengen und Übergabe gemeinsam geplant werden. Sinnvoll ist das besonders, wenn die Wohnung zeitnah zurückgegeben werden muss.",
        },
        {
          q: "Sind Fotos für eine Reinigungsanfrage hilfreich?",
          a: "Ja. Fotos von Küche, Bad, Böden, Fenstern und starken Verschmutzungen helfen, den Aufwand schneller und fairer einzuordnen.",
        },
      ],
      trust: sharedTrust,
    };
  }

  if (serviceName === "Entrümpelung") {
    return {
      eyebrow: "Lokale Räumungssituationen",
      title: "Typische Entrümpelungsfälle in Regensburg",
      intro:
        "Bei Entrümpelung geht es selten nur ums Wegtragen. Wichtig sind Menge, Zugang, Material, Zielzustand und die Frage, ob danach noch gereinigt oder übergeben werden soll.",
      situations: [
        {
          title: "Keller, Garage oder Dachboden",
          text: "Laufwege, Treppen, Innenhof und Menge entscheiden, ob ein kleiner Einsatz reicht oder mehr Kapazität nötig ist.",
        },
        {
          title: "Wohnung leer bekommen",
          text: "Bei Auszug, Nachlass oder Neuvermietung zählt am Ende, ob die Fläche wirklich frei und nutzbar ist.",
        },
        {
          title: "Entrümpelung plus Reinigung",
          text: "Wenn Räume anschließend übergeben werden sollen, ist die Kombination aus Räumung und Reinigung oft ruhiger.",
        },
      ],
      inputTitle: "Was den Preis beeinflusst",
      inputs: [
        "Menge oder geschätztes Volumen",
        "Materialarten und schwere Gegenstände",
        "Etage, Aufzug, Laufweg und Parkmöglichkeit",
        "Fotos von Menge, Zugang und gewünschtem Zielzustand",
      ],
      faqs: [
        {
          q: "Kann ich Fotos statt langer Beschreibung senden?",
          a: "Ja. Gerade bei Keller, Wohnung, Garage oder Dachboden helfen Fotos oft schneller als lange Telefonate, weil Menge und Zugang sichtbarer werden.",
        },
        {
          q: "Kann FLOXANT nach der Entrümpelung auch reinigen?",
          a: "Je nach Auftrag kann eine besenreine Vorbereitung oder anschließende Reinigung mitgedacht werden, wenn die Fläche danach übergeben oder weiter genutzt werden soll.",
        },
      ],
      trust: sharedTrust,
    };
  }

  return {
    eyebrow: "Lokale Umzugssituationen",
    title: "Typische Umzugssituationen in Regensburg",
    intro:
      "Ein Umzug in Regensburg scheitert selten an einem einzelnen Karton. Meist sind es Zugang, Parken, Timing, Reinigung, Restmengen oder Schlüsselübergabe, die den Ablauf anstrengend machen.",
    situations: [
      {
        title: "Umzug mit Reinigung und Schlüsselübergabe",
        text: "Wenn Auszug, Endreinigung und Übergabetermin dicht beieinanderliegen, braucht der Ablauf eine klare Reihenfolge.",
      },
      {
        title: "Halteverbotszone in engen Straßen",
        text: "Altstadt, Innenhöfe, schmale Zufahrten oder lange Laufwege sollten vor dem Angebot sichtbar sein.",
      },
      {
        title: "Rückfahrt oder Leerfahrt nutzen",
        text: "Wenn Route und Termin passen, kann freie Kapazität für einzelne Transporte oder Rückfahrten geprüft werden.",
      },
    ],
    inputTitle: "Was ein realistisches Angebot verbessert",
    inputs: [
      "Fotos von Möbelmenge, Kartons, Treppenhaus und Zugang",
      "Start, Ziel, Etagen, Aufzug und Parkmöglichkeit",
      "Wunschtermin, Übergabetermin und mögliche Zeitfenster",
      "Zusatzbedarf wie Reinigung, Rest-Entrümpelung oder Schlüsselübergabe",
    ],
    faqs: [
      {
        q: "Wie schnell bekomme ich ein Angebot für einen Umzug in Regensburg?",
        a: "Das hängt davon ab, wie vollständig die Angaben sind. Ort, Termin, Umfang, Fotos und Zusatzleistungen helfen, schneller eine belastbare Rückmeldung zu geben.",
      },
      {
        q: "Kann FLOXANT die Schlüsselübergabe unterstützen?",
        a: "Ja, je nach Auftrag und Absprache kann die Schlüsselübergabe mit Protokoll, Fotos oder Übergabevorbereitung mitgedacht werden.",
      },
      {
        q: "Arbeitet FLOXANT nur in Regensburg?",
        a: "Regensburg ist der operative Kern. Einsätze in der Umgebung und in Bayern werden nach Strecke, Kapazität und Leistungsumfang geprüft.",
      },
    ],
    trust: sharedTrust,
  };
}

export function SpecialtyPageLayout({
  lang,
  dict,
  heroBadge,
  heroTitle,
  city,
  heroText,
  ctaText,
  breadcrumbs,
  chips = [],
  cards = [],
  sectionTitle,
  sectionParagraphs = [],
  wizardBadge,
  wizardTitle,
  wizardText,
  neighborhoods = [],
  heroImage = "/assets/service-moving.png",
  highlightWord,
  signatureServices = [],
  signatureBadge,
  signatureTitle,
  signatureSubtitle,
  authorityModules = [],
  authorityBadge,
  authorityTitle,
  authoritySubtitle,
}: SpecialtyPageLayoutProps) {
  const visibleChips = chips.filter((chip) => chip.text?.trim());
  const visibleCards = cards
    .map((card) => ({
      ...card,
      lines: nonEmpty(card.lines),
    }))
    .filter((card) => card.title?.trim() || card.lines.length > 0);
  const visibleParagraphs = nonEmpty(sectionParagraphs);

  const geo = getCityGeoData(city);
  const citySlug = slugify(city);
  const serviceSignal = `${heroTitle} ${breadcrumbs.map((item) => item.label).join(" ")}`.toLowerCase();
  const isBavariaPage =
    city.toLowerCase().includes("bayern") ||
    breadcrumbs.some((item) => item.label.toLowerCase().includes("bayern") || item.href?.endsWith("-bayern"));
  const serviceContext = getServiceContext(serviceSignal, city, citySlug, geo?.region || "Bayern", isBavariaPage);

  const rawFaqs = (dict?.faqs || []) as Array<{ q: string; a: string }>;
  const resolvedFaqs = rawFaqs
    .map((faq) => ({
      q: applyCity(faq.q, city, neighborhoods),
      a: applyCity(faq.a, city, neighborhoods),
    }))
    .filter((faq) => faq.q.trim() && faq.a.trim());

  const budgetFaqs = (dict?.common?.budget_faqs || []) as Array<{ q: string; a: string }>;
  const injectedBudgetFaqs = budgetFaqs.map((faq) => ({
    q: applyCity(faq.q, city, neighborhoods),
    a: applyCity(faq.a, city, neighborhoods),
  }));

  const finalFaqs = [...resolvedFaqs, ...injectedBudgetFaqs];

  const localizedBreadcrumbs = breadcrumbs.map((item) => {
    if (item.label.toLowerCase() === "home") return { ...item, label: dict.nav?.home || item.label };
    if (item.label.toLowerCase() === "umzug") return { ...item, label: dict.nav?.service_umzug || item.label };
    if (item.label.toLowerCase() === "reinigung") return { ...item, label: dict.nav?.service_reinigung || item.label };
    if (item.label.toLowerCase() === "entrümpelung") return { ...item, label: dict.nav?.service_entruempelung || item.label };
    return item;
  });

  const contextBlocks = germanizeDeep([
    { title: "Was ist das?", text: heroText || `${serviceContext.name} in ${city} mit Fokus auf klare Leistungen und planbare Termine.` },
    { title: "Für wen ist das?", text: serviceContext.audience },
    { title: "Wann ist das sinnvoll?", text: serviceContext.timing },
    { title: "Wie läuft es ab?", text: serviceContext.process },
  ]);

  const nearbyCities = geo
    ? Object.values(BAVARIAN_CITIES_GEO)
        .filter((entry) => entry.region === geo.region && entry.name !== city)
        .slice(0, 6)
    : [];

  const helpfulLinks = [
    ...serviceContext.relatedLinks,
    { href: "/standorte", label: "Alle Standorte und Einsatzgebiete" },
    { href: serviceContext.primaryPath, label: `${serviceContext.name} als Hauptservice` },
    { href: serviceContext.calculatorHref, label: `${serviceContext.name} im Rechner anfragen` },
    { href: "/empfehlen", label: "FLOXANT mit Partnercode empfehlen" },
  ];
  const pageRoutes = [
    {
      href: "#service-klarheit",
      title: "Leistung einordnen",
      text: "Verstehen, für wen der Service gedacht ist und wie er in der Praxis läuft.",
    },
    {
      href: "#naechste-wege",
      title: "Nächste Wege",
      text: "Direkt zu Rechner, Hauptservice, Region oder ergänzenden Leistungen springen.",
    },
    {
      href: "#faq",
      title: "FAQ",
      text: "Die häufigsten Fragen noch vor Anfrage und Vorprüfung sauber klären.",
    },
    {
      href: "#wizard",
      title: "Anfrage starten",
      text: "Mit klaren Angaben direkt in den passenden Anfrage- oder Rechnerpfad gehen.",
    },
  ];
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]?.label;
  const showRegensburgAuthority =
    city === "Regensburg" &&
    lastBreadcrumb === "Regensburg" &&
    ["Umzug", "Reinigung", "Entrümpelung"].includes(serviceContext.name);
  const regensburgAuthority = showRegensburgAuthority
    ? getRegensburgAuthorityContent(serviceContext.name)
    : null;
  const faqItems = regensburgAuthority
    ? [...finalFaqs, ...regensburgAuthority.faqs]
    : finalFaqs;
  const planningLinks = [
    {
      href: serviceContext.calculatorHref,
      title: `${serviceContext.name} vorrechnen`,
      text: "Wenn zuerst Volumen, Preisrahmen oder Aufwand für den Standort besser eingeordnet werden sollen.",
    },
    {
      href: "/anfrage-mit-preisrahmen",
      title: "Budget direkt nennen",
      text: "Wenn schon eine Zielgröße da ist und FLOXANT den passenden Rahmen daran spiegeln soll.",
    },
    {
      href: "/kontakt",
      title: "Rückfragen abstimmen",
      text: `Wenn Zugang, Fotos, Sonderfälle oder Terminfenster in ${germanText(city, city)} vorab geklärt werden müssen.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceJsonLd({
        name: `${serviceContext.name} ${city}`,
        description: heroText || `${serviceContext.name} in ${city} mit FLOXANT.`,
        path: serviceContext.pagePath,
        serviceType: `${serviceContext.name} in ${city}`,
        areaServed: [city, geo?.region || "Bayern"],
      }),
      buildWebPageJsonLd({
        name: `${heroTitle} | FLOXANT`,
        description: heroText || `${serviceContext.name} in ${city}.`,
        path: serviceContext.pagePath,
        about: [serviceContext.name, city, geo?.region || "Bayern"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        ...localizedBreadcrumbs.map((item) => ({
          name: item.label,
          item: item.href,
        })),
      ]),
      ...(faqItems.length > 0 ? [buildFaqJsonLd(faqItems)] : []),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={localizedBreadcrumbs} />

      <section className="flox-section overflow-hidden pb-10 pt-10 lg:pb-14">
        <div className="pointer-events-none absolute inset-0">
          <FloxantSymbolLayer variant="moving" density="soft" mode="hero" className="opacity-65" />
        </div>

        <div className="flox-shell relative grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-center">
          <div className="flox-panel px-7 py-8 sm:px-9 sm:py-9 xl:px-10 xl:py-10">
            <div className="flex flex-wrap items-center gap-3">
              {heroBadge ? (
                <div className="flox-kicker">
                  <Zap className="h-4 w-4" />
                  {germanText(heroBadge, heroBadge)}
                </div>
              ) : null}
              <TrustBadge type="expert" />
              <Link
                href="/anfrage-mit-preisrahmen"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5"
              >
                <Banknote className="h-4 w-4" />
                Preisrahmen nennen
              </Link>
            </div>

            <h1 className="mt-8 max-w-[14ch] flox-title-xl flox-display-hero text-slate-950">
              {germanText(applyCity(heroTitle, city, neighborhoods), heroTitle)}
              {highlightWord ? (
                <span className="mt-2 block text-blue-600">{germanText(highlightWord, highlightWord)}</span>
              ) : null}
            </h1>

            {heroText ? (
              <p className="flox-body mt-6 max-w-2xl">
                {germanText(applyCity(heroText, city, neighborhoods), heroText)}
              </p>
            ) : null}

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#wizard"
                className="btn-premium flox-button-primary min-h-[3.65rem] px-8"
                data-event="start_booking"
                data-service={serviceContext.name.toLowerCase()}
                data-region={city}
              >
                {germanText(ctaText || `${serviceContext.name} in ${city} anfragen`, ctaText || `${serviceContext.name} in ${city} anfragen`)}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/anfrage-mit-preisrahmen"
                className="flox-button-secondary min-h-[3.65rem] px-8"
                data-event="submit_budget_request"
                data-service={serviceContext.name.toLowerCase()}
                data-region={city}
              >
                Projekt mit Preisrahmen
              </Link>
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-slate-200 bg-white/86 p-3 shadow-sm shadow-slate-950/5">
              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Direkt weiter ohne lange Suche
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "#service-klarheit", label: "Leistung verstehen" },
                  { href: "#wizard", label: "Anfrage starten" },
                  { href: serviceContext.calculatorHref, label: "Rechner öffnen" },
                  { href: "/anfrage-mit-preisrahmen", label: "Budget nennen" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-black uppercase tracking-[0.13em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                    data-event={item.href.includes("rechner") ? "start_calculator" : item.href.includes("preisrahmen") ? "submit_budget_request" : "start_booking"}
                    data-service={serviceContext.name.toLowerCase()}
                    data-region={city}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {visibleChips.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-3">
                {visibleChips.map((chip, index) => {
                  const Icon = chip.icon;
                  return (
                    <span
                      key={`${chip.text}-${index}`}
                      className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/5"
                    >
                      <Icon className={chip.iconClassName || "h-4 w-4 text-blue-700"} />
                      {germanText(chip.text, chip.text)}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="flox-panel p-4 shadow-[0_24px_52px_rgba(15,23,42,0.09)]">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <div className="relative h-[430px]">
                <Image
                  src={heroImage}
                  alt={`${heroTitle} | FLOXANT`}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 1024px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0c1630]/22 via-transparent to-white/24" />
                <div className="absolute left-5 top-5 rounded-[1.15rem] border border-white/75 bg-white/92 px-4 py-4 shadow-sm shadow-slate-950/5">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {germanText(city, city)} · {germanText(geo?.region || "Bayern", geo?.region || "Bayern")}
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    Regional geplant, klar umgesetzt
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.2rem] border border-white/70 bg-white/92 px-5 py-5 shadow-sm shadow-slate-950/5">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">
                    Klarer Ablauf
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                    Erst sauber einordnen, dann passend anfragen. So wird aus einem Klick ein ruhiger nächster Schritt mit klaren Angaben.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageRoutes.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group rounded-[1.45rem] border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                Schnellstart
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-950 transition-colors group-hover:text-blue-700">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </a>
          ))}
        </div>
      </section>

      {signatureServices.length > 0 ? (
        <SignatureServices
          locale={lang}
          dict={dict}
          serviceIds={signatureServices}
          badge={signatureBadge}
          title={signatureTitle}
          subtitle={signatureSubtitle}
          compact
          source={`specialty_${serviceContext.name.toLowerCase()}_${citySlug}`}
        />
      ) : null}

      {authorityModules.length > 0 ? (
        <PublicAuthorityModules
          moduleIds={authorityModules}
          badge={authorityBadge}
          title={authorityTitle}
          subtitle={authoritySubtitle}
          source={`authority_${serviceContext.name.toLowerCase()}_${citySlug}`}
        />
      ) : null}

      <section id="service-klarheit" className="section-glow flox-section scroll-mt-24 py-20">
        <div className="flox-shell">
          {visibleCards.length > 0 ? (
            <div className="mb-14 grid gap-4 md:grid-cols-2">
              {visibleCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <article
                    key={`${card.title}-${index}`}
                    className="card-premium card-depth rounded-[1.45rem] p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                      <Icon className={card.iconClassName || "h-6 w-6"} />
                    </div>
                    <h2 className="mt-5 text-[1.35rem] font-bold tracking-tight text-slate-950">
                      {germanText(applyCity(card.title, city, neighborhoods), card.title)}
                    </h2>
                    <ul className="mt-4 space-y-3 text-slate-700">
                      {card.lines.map((line, lineIndex) => (
                        <li key={`${line}-${lineIndex}`} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          <span className="text-sm leading-7">{germanText(applyCity(line, city, neighborhoods), line)}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          ) : null}

          <div className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contextBlocks.map((block, index) => (
              <div key={block.title} className={index === 0 ? "flox-panel rounded-[1.45rem] px-5 py-5" : "card-premium card-depth rounded-[1.45rem] p-5"}>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {germanText(block.title, block.title)}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {germanText(block.text, block.text)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flox-panel rounded-[1.8rem] px-7 py-7">
              <h3 className="text-[1.8rem] font-bold tracking-tight text-slate-950">Wie unterscheidet sich der Service vom Standardfall?</h3>
              <p className="mt-4 text-base leading-8 text-slate-700">{germanText(serviceContext.difference, serviceContext.difference)}</p>
            </div>

            <div className="flox-panel rounded-[1.8rem] px-7 py-7">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                <Banknote className="h-4 w-4" />
                Budget & Planung
              </div>
              <h3 className="mt-4 text-[1.8rem] font-bold tracking-tight text-slate-950">Ihr Budget kann direkt mitgedacht werden</h3>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Sie möchten nicht erst lange rechnen, sondern haben schon einen Zielrahmen für Ihr Projekt in {germanText(city, city)}? Ihre Preisvorstellung ergänzt die Vorprüfung und hilft, Leistung, Umfang und nächste Schritte realistischer einzuordnen.
              </p>
              <Link
                href="/anfrage-mit-preisrahmen"
                className="flox-button-secondary mt-7 min-h-[3.2rem] px-5"
              >
                Projekt mit Preisrahmen anfragen
              </Link>
            </div>
          </div>

          {sectionTitle || visibleParagraphs.length > 0 ? (
            <div className="mt-16 rounded-[2.2rem] border border-slate-200 bg-white/96 px-7 py-7 shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
              {sectionTitle ? (
                <h2 className="flox-display-section-tight text-3xl font-bold text-slate-950">
                  {germanText(applyCity(sectionTitle, city), sectionTitle)}
                </h2>
              ) : null}
              <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
                {visibleParagraphs.map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>
                    {germanText(applyCity(paragraph, city, neighborhoods), paragraph)}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {regensburgAuthority ? (
            <section className="mt-16 rounded-[2.2rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.92),rgba(255,255,255,0.98)_56%,rgba(236,253,245,0.58))] px-7 py-7 shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
              <div className="max-w-3xl">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  {regensburgAuthority.eyebrow}
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                  {regensburgAuthority.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {regensburgAuthority.intro}
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {regensburgAuthority.situations.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.45rem] border border-slate-200 bg-white/92 px-5 py-5 shadow-sm shadow-slate-950/5"
                  >
                    <h3 className="text-lg font-bold tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-[1.45rem] border border-slate-200 bg-white/92 px-5 py-5 shadow-sm shadow-slate-950/5">
                  <h3 className="text-xl font-bold tracking-tight text-slate-950">
                    {regensburgAuthority.inputTitle}
                  </h3>
                  <div className="mt-4 grid gap-3">
                    {regensburgAuthority.inputs.map((item) => (
                      <div key={item} className="flex gap-3 rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[1.45rem] border border-blue-100 bg-blue-950 px-5 py-5 text-white shadow-sm shadow-blue-950/10">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                    Lokales Vertrauen
                  </div>
                  <div className="mt-4 grid gap-3">
                    {regensburgAuthority.trust.map((item) => (
                      <div key={item} className="rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3 text-sm leading-6 text-slate-200">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href="#wizard"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-[11px] font-black uppercase tracking-[0.14em] text-slate-950 transition hover:-translate-y-0.5"
                      data-event="start_booking"
                      data-service={serviceContext.name.toLowerCase()}
                      data-region="Regensburg"
                    >
                      Anfrage mit Fotos starten
                    </a>
                    <Link
                      href="/anfrage-mit-preisrahmen"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/8 px-4 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-white/12"
                      data-event="submit_budget_request"
                      data-service={serviceContext.name.toLowerCase()}
                      data-region="Regensburg"
                    >
                      Budget nennen
                    </Link>
                  </div>
                </article>
              </div>
            </section>
          ) : null}

          <div className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-50/90 px-7 py-7 shadow-sm shadow-slate-950/5">
            <div className="max-w-2xl">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Vor der Anfrage
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Den passenden nächsten Schritt für {germanText(city, city)} wählen
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Nicht jeder Einstieg passt zu jeder Situation. Diese Wege helfen, Preislogik, Rückfragen und Anfrageform schon vor der eigentlichen Buchung sauber zu trennen.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {planningLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[1.4rem] border border-slate-200 bg-white px-5 py-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Nächster Schritt
                  </div>
                  <h3 className="mt-3 flex items-center gap-2 text-lg font-semibold text-slate-950 transition-colors group-hover:text-blue-700">
                    {item.title}
                    <ArrowRight className="h-4 w-4" />
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="naechste-wege" className="section-glow flox-section py-20">
        <div className="flox-shell max-w-none">
          <div className="flox-section-heading mb-10">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
              Passende nächste Wege
            </div>
            <h2 className="mt-4 flox-display-section text-4xl font-bold text-slate-950 md:text-5xl">
              Hilfreiche Seiten für {germanText(city, city)}
            </h2>
            <p className="flox-body max-w-3xl">
              Diese Links führen zu Rechner, Hauptservice, Region und passenden Zusatzleistungen, damit Kunden schneller die richtige Seite öffnen.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {helpfulLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="flox-link-card"
              >
                <BookOpen className="h-6 w-6 text-blue-700" />
                <span className="mt-4 block text-base font-bold leading-7 text-slate-900">
                  {germanText(link.label, link.label)}
                </span>
              </Link>
            ))}
          </div>

          {nearbyCities.length > 0 ? (
            <div className="mt-12 rounded-[2.2rem] border border-slate-200 bg-white/96 px-7 py-7 shadow-[0_18px_46px_rgba(15,23,42,0.06)]">
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                Weitere relevante Orte in {germanText(geo?.region || "Bayern", geo?.region || "Bayern")}
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyCities.map((nearby) => (
                  <Link
                    key={nearby.name}
                    href={`${serviceContext.primaryPath}-${slugify(nearby.name)}`}
                    className="flox-link-card flex items-center gap-4 px-4 py-4"
                  >
                    <div className="rounded-[1rem] bg-blue-50 p-3 text-blue-700">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{germanText(nearby.name, nearby.name)}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                        {germanText(geo?.region || "Bayern", geo?.region || "Bayern")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {faqItems.length > 0 ? (
        <section id="faq" className="section-glow flox-section py-22">
          <div className="flox-shell max-w-5xl">
            <div className="mb-10 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                FAQ
              </div>
              <h2 className="mt-4 flox-display-section text-[2.2rem] font-bold text-slate-950 md:text-[2.8rem]">
                Häufige Fragen zu {germanText(serviceContext.name, serviceContext.name)} in {germanText(city, city)}
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <details
                  key={faq.q}
                  open={index === 0}
                  className="card-premium group rounded-[1.45rem] p-7"
                >
                  <summary className="cursor-pointer list-none text-[1.45rem] font-bold text-slate-950">
                    <span className="flex items-center justify-between gap-4">
                      <span>{germanText(faq.q, faq.q)}</span>
                      <span className="text-xl leading-none text-blue-700 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    {germanText(faq.a, faq.a)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-glow flox-section py-18">
        <div className="flox-shell max-w-5xl overflow-hidden rounded-[2.3rem] border border-slate-200 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
          <iframe
            width="100%"
            height="420"
            style={{ border: 0, filter: "grayscale(0.08) contrast(1.08)" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${city} Bavaria Germany`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </section>

      <section id="wizard" className="flox-section scroll-mt-24 py-22">
        <div className="flox-shell max-w-6xl">
          <div className="mb-10 text-center">
            {wizardBadge ? (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                <Zap className="h-4 w-4" />
                {germanText(wizardBadge, wizardBadge)}
              </div>
            ) : null}
            <h2 className="flox-display-section text-4xl font-bold text-slate-950 md:text-5xl">
              {germanText(applyCity(wizardTitle || `Jetzt ${serviceContext.name.toLowerCase()} für ${city} anfragen`, city), wizardTitle || `Jetzt ${serviceContext.name.toLowerCase()} für ${city} anfragen`)}
            </h2>
            {wizardText ? (
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700">
                {germanText(wizardText, wizardText)}
              </p>
            ) : null}
          </div>

          <DualCalculator dic={dict} initialService={serviceContext.calculatorService} />
        </div>
      </section>

      {neighborhoods.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50/70 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              {germanText(applyCity(dict.common?.neighborhoods_title || "Verfügbarkeit in {city} und Umgebung", city), dict.common?.neighborhoods_title || "Verfügbarkeit in {city} und Umgebung")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((district) => (
                <span
                  key={district}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm shadow-slate-950/5"
                >
                  {germanText(city, city)} {germanText(district, district)}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <AuthorityMagnet city={city} region={geo?.region} dic={dict} showNAP />

      <CityServiceCluster locale="de" city={city} citySlug={citySlug} />
    </main>
  );
}
