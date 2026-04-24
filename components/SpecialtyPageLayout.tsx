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
import { TrustBadge } from "@/components/trust/TrustBadge";
import { getCityGeoData, BAVARIAN_CITIES_GEO } from "@/lib/geo-data";
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
      audience: `Die Entrümpelung in ${city} ist für Haushalte, Erbfälle, Vermieter und Unternehmen gedacht, die Räume schnell, diskret und besenrein freibekommen müssen.`,
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

export function SpecialtyPageLayout({
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

  // Inject Budget FAQs for EEAT and conversion
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

  const contextBlocks = [
    { title: "Was ist das?", text: heroText || `${serviceContext.name} in ${city} mit Fokus auf klare Leistungen und planbare Termine.` },
    { title: "Für wen ist das?", text: serviceContext.audience },
    { title: "Wann ist das sinnvoll?", text: serviceContext.timing },
    { title: "Wie läuft es ab?", text: serviceContext.process },
  ];

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
      ...(finalFaqs.length > 0 ? [buildFaqJsonLd(finalFaqs)] : []),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={localizedBreadcrumbs} />

      <section className="relative overflow-hidden px-6 pb-20 pt-12 lg:pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl space-y-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {heroBadge ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 label-premium !text-primary shadow-sm backdrop-blur-md">
                <Zap className="h-3 w-3" />
                <span>{heroBadge}</span>
              </div>
            ) : null}
            <TrustBadge type="expert" />
            <Link 
              href="/anfrage-mit-preisrahmen" 
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 label-premium !text-blue-300 shadow-sm backdrop-blur-md transition-all hover:bg-blue-400/20"
            >
              <Banknote className="h-3 w-3" />
              <span>Preisrahmen nennen</span>
            </Link>
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl xl:text-7xl">
            {heroTitle}
            {highlightWord && (
              <span className="block mt-2 text-blue-500">{highlightWord}</span>
            )}
          </h1>

          {heroText ? (
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-2xl">
              {heroText}
            </p>
          ) : null}

          <div className="relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src={heroImage}
              alt={`${heroTitle} | FLOXANT`}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 1024px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          {visibleChips.length > 0 ? (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {visibleChips.map((chip, index) => {
                const Icon = chip.icon;
                if (!Icon) return null;
                return (
                  <span
                    key={`${chip.text}-${index}`}
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm"
                  >
                    <Icon className={chip.iconClassName || "h-5 w-5 text-primary"} />
                    {chip.text}
                  </span>
                );
              })}
            </div>
          ) : null}

          <div className="mt-12 flex flex-col items-center gap-6">
            <a
              href="#wizard"
              className="group inline-flex items-center gap-4 rounded-xl bg-white px-8 py-4 text-lg font-bold text-zinc-950 shadow-[0_4px_24px_rgba(255,255,255,0.15)] ring-1 ring-white/50 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-100"
            >
              {ctaText || `${serviceContext.name} in ${city} anfragen`}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>{dict.common?.trust_bar?.certified || "Geprüfter bayerischer Fachbetrieb"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>{dict.common?.trust_bar?.insurance || "Versicherungsschutz"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>
                  {(dict.common?.trust_bar?.fixed_price || "Nachvollziehbarer Preisrahmen")
                    .replace(/Festpreise ohne Überraschungen/g, "Nachvollziehbarer Preisrahmen")
                    .replace(/Festpreis/g, "Preisrahmen")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-start relative bg-black/20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-3xl font-bold text-white">
            {applyCity(dict.common?.services_in_city || "Unsere Leistungen für {city}", city)}
          </h2>

          {visibleCards.length > 0 ? (
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              {visibleCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={`${card.title}-${index}`}
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-md transition-all hover:border-primary/20"
                  >
                    <Icon className={card.iconClassName || "mb-6 h-10 w-10 text-primary"} />
                    <h3 className="mb-4 text-2xl font-semibold">
                      {applyCity(card.title, city, neighborhoods)}
                    </h3>
                    <ul className="space-y-3 text-slate-300">
                      {card.lines.map((line, lineIndex) => (
                        <li key={`${line}-${lineIndex}`} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {contextBlocks.map((block) => (
              <div key={block.title} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                <h3 className="mb-4 text-xl font-semibold text-white">{block.title}</h3>
                <p className="leading-relaxed text-slate-300">{block.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">Wie unterscheidet sich der Service vom Standardfall?</h3>
            <p className="text-slate-300">{serviceContext.difference}</p>
          </div>

          {sectionTitle || visibleParagraphs.length > 0 ? (
            <div className="mt-16 space-y-6 text-lg leading-loose text-slate-300">
              {sectionTitle ? (
                <h2 className="text-3xl font-bold text-white">
                  {applyCity(sectionTitle, city)}
                </h2>
              ) : null}
              {visibleParagraphs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{applyCity(paragraph, city, neighborhoods)}</p>
              ))}
            </div>
          ) : null}

          {/* Global Budget CTA */}
          <div className="mt-20 rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-transparent p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
              <Banknote size={32} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ihr Budget, unsere Planung
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
              Sie möchten nicht kalkulieren, sondern haben einen Zielrahmen für Ihr Projekt in {city}?
              Ihre Preisvorstellung ergänzt die Vorprüfung und hilft, Leistung, Umfang und nächste Schritte realistisch einzuordnen.
            </p>
            <Link 
              href="/anfrage-mit-preisrahmen" 
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Projekt mit Preisrahmen anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase text-emerald-400">
              <Shield className="h-4 w-4" />
              Sicherheit und Sorgfalt
            </div>
            <h3 className="text-2xl font-bold text-white">
              {dict.common?.human_trust?.security_title || "Ihr Hab und Gut in sicheren Händen"}
            </h3>
            <p className="text-slate-300">
              {dict.common?.human_trust?.security_text ||
                "Unsere Teams arbeiten mit festen Prozessen, geeignetem Material und klarer Aufgabenverteilung."}
            </p>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 label-premium !text-primary">
              <MapPin className="h-4 w-4" />
              Regionale Relevanz
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {applyCity(dict.common?.human_trust?.local_title || "Fest verwurzelt in {city}", city)}
            </h3>
            <p className="text-slate-300">
              {applyCity(
                dict.common?.human_trust?.local_text ||
                  "Keine anonyme Vermittlung. FLOXANT plant Einsätze in {city} und der jeweiligen Region mit lokaler Ortskenntnis.",
                city
              )}
            </p>
          </div>
        </div>
      </section>

      {resolvedFaqs.length > 0 ? (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-3xl font-bold text-white">
              Häufige Fragen zu {serviceContext.name} in {city}
            </h2>
            <div className="space-y-6">
              {finalFaqs.map((faq) => (
                <div key={faq.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                  <h3 className="mb-4 text-xl font-bold text-white">{faq.q}</h3>
                  <p className="leading-relaxed text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/5 bg-black/40 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Hilfreiche Seiten für {city}</h2>
              <p className="mt-3 max-w-3xl text-lg text-slate-300">
                Starke interne Verbindungen zwischen Service, Rechner, Regionen und angrenzenden Leistungen helfen bei schneller Orientierung.
              </p>
            </div>
            <Link href="/standorte" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
              Alle Standorte anzeigen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {helpfulLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="rounded-3xl border border-white/10 bg-[#0B0B14] p-6 text-white transition-all hover:border-primary/40"
              >
                <div className="mb-4 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="block text-base font-bold leading-snug">{link.label}</span>
              </Link>
            ))}
          </div>

          {nearbyCities.length > 0 ? (
            <div className="mt-12">
              <h3 className="mb-6 text-xl font-bold text-white">
                Weitere relevante Orte in {geo?.region}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyCities.map((nearby) => (
                  <Link
                    key={nearby.name}
                    href={`${serviceContext.primaryPath}-${slugify(nearby.name)}`}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition-all hover:border-primary/40"
                  >
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold">{nearby.name}</div>
                      <div className="text-xs uppercase tracking-widest text-slate-400">{geo?.region}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-lg">
          <iframe
            width="100%"
            height="420"
            style={{ border: 0, filter: "grayscale(0.1) contrast(1.1)" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${city} Bavaria Germany`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </section>

      <section id="wizard" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            {wizardBadge ? (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Zap className="h-4 w-4" />
                {wizardBadge}
              </div>
            ) : null}
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {applyCity(wizardTitle || `Jetzt ${serviceContext.name.toLowerCase()} für {city} anfragen`, city)}
            </h2>
            {wizardText ? (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{wizardText}</p>
            ) : null}
          </div>

          <DualCalculator dic={dict} initialService={serviceContext.calculatorService} />
        </div>
      </section>

      {neighborhoods.length > 0 ? (
        <section className="border-t border-white/5 bg-white/[0.02] px-6 py-12">
          <div className="mx-auto max-w-4xl text-center md:text-start">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {applyCity(dict.common?.neighborhoods_title || "Verfügbarkeit in {city} und Umgebung", city)}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {neighborhoods.map((district) => (
                <span
                  key={district}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-slate-300 md:text-xs"
                >
                  {city} {district}
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
