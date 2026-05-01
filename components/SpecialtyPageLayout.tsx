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
              >
                {germanText(ctaText || `${serviceContext.name} in ${city} anfragen`, ctaText || `${serviceContext.name} in ${city} anfragen`)}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/anfrage-mit-preisrahmen"
                className="flox-button-secondary min-h-[3.65rem] px-8"
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
        </div>
      </section>

      <section className="section-glow flox-section py-20">
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

      {finalFaqs.length > 0 ? (
        <section className="section-glow flox-section py-22">
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
              {finalFaqs.map((faq, index) => (
                <article
                  key={faq.q}
                  className="card-premium rounded-[1.45rem] p-7"
                >
                  <h3 className="text-[1.45rem] font-bold text-slate-950">
                    {germanText(faq.q, faq.q)}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    {germanText(faq.a, faq.a)}
                  </p>
                </article>
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
