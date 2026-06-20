import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, Clock, Shield, Star, Truck, Zap } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { GrowthServiceLandingPage } from "@/components/GrowthServiceLandingPage";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { company } from "@/lib/company";
import {
  buildGrowthServiceMetadata,
  getGrowthServicePageBySlug,
  growthServiceRootPageSlugs,
} from "@/lib/growth-service-pages";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "@/get-dictionary";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import ReviewCarousel from "@/components/trust/ReviewCarousel";
import { buildWhatsAppHref, getWhatsAppContext } from "@/lib/whatsapp";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import {
  getSpecialtyPageData,
  resolveField,
  resolveNestedField,
} from "@/lib/specialty-page";
import { germanizeText } from "@/lib/german-text";
import { getGscClickPriority } from "@/lib/gsc-click-priorities";
import { buildLeadHref } from "@/lib/lead-intents";
import {
  dynamicLocalSeoRoutes,
  getDynamicLocalSeoRoute,
  type DynamicLocalSeoRoute,
} from "@/lib/local-seo-routes";

const DYNAMIC_CORE_SERVICE_PARAMS = ["fernumzug", "montage"] as const;
const DEPRIORITIZED_DYNAMIC_CITY_SLUGS = new Set(["forchheim", "friedberg"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...dynamicLocalSeoRoutes.map((entry) => ({
      serviceSlug: entry.route.replace(/^\//, ""),
    })),
    ...growthServiceRootPageSlugs.map((serviceSlug) => ({ serviceSlug })),
    ...DYNAMIC_CORE_SERVICE_PARAMS.map((serviceSlug) => ({ serviceSlug })),
  ];
}

const SERVICE_SLUGS = [
  "umzug",
  "bueroumzug",
  "fernumzug",
  "reinigung",
  "entruempelung",
  "montage",
] as const;
type ServiceSlug = (typeof SERVICE_SLUGS)[number];
const SLUG_TO_KEY: Record<ServiceSlug, string> = {
  umzug: "service_umzug",
  bueroumzug: "service_buero_umzug",
  fernumzug: "service_fernumzug",
  reinigung: "service_reinigung",
  entruempelung: "service_entruempelung",
  montage: "service_montage",
};
const RELATED_SERVICES: Record<ServiceSlug, readonly ServiceSlug[]> = {
  umzug: ["fernumzug", "montage", "reinigung"],
  bueroumzug: ["fernumzug", "montage", "reinigung"],
  fernumzug: ["umzug", "bueroumzug", "montage"],
  reinigung: ["entruempelung", "umzug", "montage"],
  entruempelung: ["reinigung", "umzug", "montage"],
  montage: ["umzug", "bueroumzug", "reinigung"],
};

const SERVICE_SUPPORT_LINKS: Record<
  ServiceSlug,
  ReadonlyArray<{ title: string; href: string; text: string }>
> = {
  umzug: [
    {
      title: "Direkt anfragen",
      href: "/buchung?service=umzug#buchungssystem",
      text: "Wenn Umfang, Zugang und Termin direkt sauber aufgenommen werden sollen.",
    },
    {
      title: "Kostenrahmen prüfen",
      href: "/rechner?service=umzug",
      text: "Wenn vor der Anfrage erst Volumen, Strecke oder Preisgefühl sortiert werden müssen.",
    },
    {
      title: "Ratgeber vertiefen",
      href: "/blog",
      text: "Wenn vorab noch Checklisten, Übergabe oder Ablauf besser eingeordnet werden sollen.",
    },
  ],
  bueroumzug: [
    {
      title: "Firmenumzug anfragen",
      href: "/buchung?service=umzug#buchungssystem",
      text: "Wenn Büroflächen, Teamgröße und Zeitfenster strukturiert geprüft werden sollen.",
    },
    {
      title: "Aufwand vorrechnen",
      href: "/rechner?service=umzug",
      text: "Wenn zuerst eine belastbare Größenordnung gebraucht wird.",
    },
    {
      title: "Kontaktweg abstimmen",
      href: "/kontakt",
      text: "Wenn Rückfragen, Erreichbarkeit oder Standortthemen vorab geklärt werden sollen.",
    },
  ],
  fernumzug: [
    {
      title: "Fernumzug anfragen",
      href: "/buchung?service=umzug#buchungssystem",
      text: "Wenn Strecke, Ladefenster und Zwischenstopps direkt mitgedacht werden sollen.",
    },
    {
      title: "Rahmen kalkulieren",
      href: "/rechner?service=umzug",
      text: "Wenn Distanz und Volumen zuerst preislich eingeordnet werden müssen.",
    },
    {
      title: "Standorte ansehen",
      href: "/standorte",
      text: "Wenn Einsatzgebiet und regionale Anschlüsse vorab wichtig sind.",
    },
  ],
  reinigung: [
    {
      title: "Reinigung anfragen",
      href: "/buchung?service=reinigung#buchungssystem",
      text: "Wenn Fläche, Objektart und gewünschter Standard direkt geprüft werden sollen.",
    },
    {
      title: "Leistungsweg prüfen",
      href: "/rechner?service=reinigung",
      text: "Wenn vor der Buchung noch Aufwand und Preisrahmen sortiert werden sollen.",
    },
    {
      title: "Wissen vertiefen",
      href: "/blog",
      text: "Wenn Übergabe, Nachreinigung oder Kombination mit Räumung noch offen sind.",
    },
  ],
  entruempelung: [
    {
      title: "Entrümpelung anfragen",
      href: "/buchung?service=entsorgung#buchungssystem",
      text: "Wenn Volumen, Zugang und Entsorgungsweg direkt sauber geprüft werden sollen.",
    },
    {
      title: "Preislogik prüfen",
      href: "/rechner?service=entsorgung",
      text: "Wenn vor der Anfrage erst ein realistischer Rahmen gebraucht wird.",
    },
    {
      title: "Kontakt aufnehmen",
      href: "/kontakt",
      text: "Wenn Fotos, Sonderfälle oder Rückfragen schnell abgestimmt werden sollen.",
    },
  ],
  montage: [
    {
      title: "Montage anfragen",
      href: "/buchung?service=umzug#buchungssystem",
      text: "Wenn Möbel, Zusatzaufwand und Ablauf direkt gemeinsam geprüft werden sollen.",
    },
    {
      title: "Projekt strukturieren",
      href: "/kontakt",
      text: "Wenn mehrere Bausteine oder besondere Stücke vorab besprochen werden müssen.",
    },
    {
      title: "Weitere Services ansehen",
      href: "/standorte",
      text: "Wenn Montage mit Umzug, Reinigung oder regionalem Einsatz verbunden ist.",
    },
  ],
};
type PageProps = {
  params: Promise<{ serviceSlug: string }>;
};

function isValidServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

function getServiceContent(dict: any, slug: ServiceSlug): any {
  const key = SLUG_TO_KEY[slug];
  return dict?.pages?.[key] || {};
}

function getNestedRecord(obj: any, key: string): any {
  return obj?.[key] || {};
}

function getServiceType(slug: ServiceSlug): string {
  switch (slug) {
    case "umzug":
    case "bueroumzug":
    case "fernumzug":
      return "MovingService";
    case "reinigung":
      return "CleaningService";
    case "entruempelung":
      return "DebrisRemovalService";
    default:
      return "Service";
  }
}

function getProviderSchemaType(slug: ServiceSlug): string | string[] {
  switch (slug) {
    case "reinigung":
      return "HouseCleaningService";
    case "entruempelung":
      return ["LocalBusiness", "ProfessionalService"];
    case "montage":
    default:
      return "MovingCompany";
  }
}

function getHomeLabel(lang: string): string {
  return lang === "de" ? "Startseite" : "Home";
}

function sanitizeString(val: any, fallback: string = ""): string {
  return typeof val === "string" ? val : fallback;
}

function getLocalizedCityLabel(cities: any, key: string, fallback: string): string {
  return cities?.[key] || fallback;
}

function getLocalSeoBreadcrumbs(route: DynamicLocalSeoRoute) {
  const serviceLabel = germanizeText(route.label);

  switch (route.service) {
    case "bueroumzug":
      return [
        { label: "Home", href: "/" },
        { label: "Umzug", href: "/umzug" },
        { label: serviceLabel, href: "/bueroumzug" },
        { label: germanizeText(route.city) },
      ];
    case "wohnungsaufloesung":
      return [
        { label: "Home", href: "/" },
        { label: "Entrümpelung", href: "/entruempelung" },
        { label: serviceLabel, href: "/wohnungsaufloesung-bayern" },
        { label: germanizeText(route.city) },
      ];
    case "klaviertransport":
      return [
        { label: "Home", href: "/" },
        { label: "Umzug", href: "/umzug" },
        { label: serviceLabel, href: "/klaviertransport" },
        { label: germanizeText(route.city) },
      ];
    case "seniorenumzug":
      return [
        { label: "Home", href: "/" },
        { label: "Umzug", href: "/umzug" },
        { label: serviceLabel, href: "/seniorenumzug" },
        { label: germanizeText(route.city) },
      ];
    case "reinigung":
      return [
        { label: "Home", href: "/" },
        { label: serviceLabel, href: "/reinigung" },
        { label: germanizeText(route.city) },
      ];
    case "entruempelung":
      return [
        { label: "Home", href: "/" },
        { label: serviceLabel, href: "/entruempelung" },
        { label: germanizeText(route.city) },
      ];
    case "umzug":
    default:
      return [
        { label: "Home", href: "/" },
        { label: serviceLabel, href: "/umzug" },
        { label: germanizeText(route.city) },
      ];
  }
}

function renderLocalGscOpportunity(route: DynamicLocalSeoRoute, city: string) {
  const gscPriority = getGscClickPriority(route.route);

  if (!gscPriority) return null;

  const serviceLabel = germanizeText(route.label);
  const bookingHref = buildLeadHref({
    service: route.service,
    city: route.citySlug,
    intent: `${route.service}-${route.citySlug}`,
    priority: gscPriority.priority.toLowerCase(),
  });

  if (route.service !== "seniorenumzug") {
    return (
      <GscOpportunitySection
        eyebrow={`${serviceLabel} ${city}`}
        title={gscPriority.h1}
        intro={`${serviceLabel} in ${city} wird besser einschätzbar, wenn Ort, Termin, Umfang, Zugang, Fotos und gewünschter Zielzustand zusammen vorliegen. FLOXANT prüft daraus den sinnvollen nächsten Schritt, ohne pauschale Preis- oder Sofortzusage.`}
        proofTitle="Hilfreich für die Prüfung"
        proofItems={[
          `${city}, Stadtteil oder genaue Strecke nennen, damit Anfahrt, Laufwege und Terminfenster realistisch eingeordnet werden können.`,
          "Fotos von Objekt, Menge, Fläche, Möbeln, Treppenhaus, Zugang oder Zustand verkürzen Rückfragen deutlich.",
          "Ein vorhandenes Angebot oder Budget kann mitgesendet werden; FLOXANT ordnet Umfang und offene Punkte sachlich ein.",
        ]}
        cards={[
          {
            title: `${serviceLabel} direkt anfragen`,
            text: "Starten Sie mit kurzer Beschreibung, Termin, Kontaktweg und den wichtigsten Eckdaten. Ausführliche Texte sind nicht nötig.",
            href: bookingHref,
            cta: "Eckdaten senden",
          },
          {
            title: "Fotos und Zugang zeigen",
            text: "Bilder von Treppenhaus, Laufweg, Räumen, Möbeln, Flächen oder Restmengen helfen mehr als eine grobe Schätzung.",
            href: bookingHref,
            cta: "Fotos vorbereiten",
          },
          {
            title: "Angebot oder Budget prüfen",
            text: "Wenn schon ein Preis oder Angebot vorliegt, können Umfang, Zusatzpunkte, Termin und Fotos zusammen eingeordnet werden.",
            href: "/angebot-guenstiger-pruefen",
            cta: "Angebot prüfen",
          },
          {
            title: "Kombinationen früh nennen",
            text: "Reinigung, Räumung, Restmengen, Übergabe oder Transport sollten früh sichtbar sein, damit der Ablauf nicht zu spät kippt.",
            href: "/kontakt",
            cta: "Kontaktweg klären",
          },
        ]}
        checklistTitle={`Diese Angaben helfen bei ${serviceLabel} in ${city}`}
        checklist={[
          "Ort, Terminwunsch, Ansprechpartner und gewünschter Kontaktweg.",
          "Umfang, Räume, Fläche, Möbelmenge, Etage, Aufzug, Laufweg oder Zugang.",
          "Fotos, vorhandenes Angebot, Budgetrahmen oder spätester Übergabetermin.",
          "Zusatzbedarf wie Reinigung, Entrümpelung, Entsorgung, Transport oder Übergabe.",
        ]}
        combinationsTitle="Häufige Ergänzungen zur Anfrage"
        combinations={[
          {
            title: `${serviceLabel} + Preisrahmen`,
            text: "Budget oder vorhandenes Angebot direkt mitschicken, damit Rückfragen konkreter werden.",
            href: "/anfrage-mit-preisrahmen",
          },
          {
            title: `${serviceLabel} + Reinigung`,
            text: "Wenn danach eine Fläche übergeben oder nutzbar sein soll, Reinigung früh einplanen.",
            href: "/reinigung",
          },
          {
            title: `${serviceLabel} + Räumung`,
            text: "Restmengen, Keller, Nebenräume oder alte Möbel separat sichtbar machen.",
            href: "/entruempelung",
          },
          {
            title: "Angebot sachlich prüfen",
            text: "Vorhandene Angebote werden nur nach Umfang, Fotos und offenen Punkten eingeordnet.",
            href: "/angebot-guenstiger-pruefen",
          },
        ]}
        primaryHref={bookingHref}
        primaryLabel={`${serviceLabel} ${city} anfragen`}
        secondaryHref="/angebot-guenstiger-pruefen"
        secondaryLabel="Angebot prüfen"
        trackingService={route.service}
        trackingCity={route.citySlug}
        trackingPageIntent={route.service}
        trackingPriority={gscPriority.priority.toLowerCase() as "p0" | "p1" | "p2" | "p3"}
      />
    );
  }

  return (
    <GscOpportunitySection
      eyebrow={`Umzug im Alter ${city}`}
      title={gscPriority.h1}
      intro={`Ein Umzug im Alter in ${city} braucht ruhige Vorbereitung: Packhilfe, Möbelabbau, Transport, Schlüsselweg, Fotos, Angehörigen-Abstimmung und bei Bedarf Reinigung oder Wohnungsauflösung werden vorab getrennt geklärt.`}
      proofTitle="Ruhig planbar"
      proofItems={[
        "Angehörige können die Anfrage stellen, wenn Kontaktweg, Freigabe, Rückruf und gewünschte Rückmeldung klar benannt sind.",
        "Packen, kleine Demontage, Transport und Aufbau werden nach Umfang, Etage, Aufzug, Laufweg und Terminfenster realistisch geprüft.",
        "Entrümpelung, Wohnungsauflösung oder Endreinigung sind optional und werden nicht automatisch versprochen, sondern nach Fotos und Zielzustand eingeordnet.",
      ]}
      cards={[
        {
          title: "Packhilfe und Vorbereitung",
          text: "Kartons, Kleidung, persönliche Gegenstände und empfindliche Dinge werden vorab als Bedarf genannt, damit der Umfang nicht erst am Umzugstag sichtbar wird.",
          href: bookingHref,
          cta: "Packbedarf nennen",
        },
        {
          title: "Möbelabbau und Transport",
          text: "Schränke, Bett, Tisch, Regale oder einzelne schwere Stücke sollten mit Fotos beschrieben werden. So wird klar, was zerlegt, getragen und transportiert werden muss.",
          href: bookingHref,
          cta: "Möbelumfang senden",
        },
        {
          title: "Angehörige organisieren mit",
          text: "Wenn Kinder, Verwandte oder Betreuer koordinieren, helfen ein Ansprechpartner, Rückrufzeit, Freigabe, Schlüsselweg und klare Entscheidungen.",
          href: "/blog/seniorenumzug-fuer-angehoerige",
          cta: "Ratgeber öffnen",
        },
        {
          title: "Entrümpelung optional",
          text: "Wenn nicht alles mitzieht, werden Keller, Möbel, Restmengen oder Nebenräume getrennt betrachtet. Fotos machen die Entscheidung leichter.",
          href: "/entruempelung-bayern",
          cta: "Räumung prüfen",
        },
        {
          title: "Wohnungsauflösung optional",
          text: "Bei Aufgabe einer Wohnung zählen Freigabe, Zielzustand, Entsorgung und mögliche Reinigung danach. Das wird ruhig und ohne Druck eingeordnet.",
          href: "/wohnungsaufloesung-bayern",
          cta: "Auflösung klären",
        },
        {
          title: "Angebot sachlich prüfen",
          text: "Wenn schon ein Umzugs- oder Räumungsangebot vorliegt, kann FLOXANT Umfang, Fotos, Termin, Etage und Budget ohne Preisgarantie einordnen.",
          href: "/angebot-guenstiger-pruefen",
          cta: "Angebot prüfen",
        },
      ]}
      checklistTitle="Diese Angaben helfen besonders"
      checklist={[
        `Start, Ziel, Etage, Aufzug, Laufweg und Terminfenster in ${city}.`,
        "Möbelmenge, Kartons, Fotos und was nicht mitgenommen werden soll.",
        "Ob Packhilfe, Möbelabbau, Transport, Reinigung oder Räumung gebraucht wird.",
        "Wer entscheidet, wer erreichbar ist und ob Angehörige nicht vor Ort sind.",
      ]}
      combinationsTitle="Häufige Kombinationen beim Umzug im Alter"
      combinations={[
        {
          title: "Seniorenumzug + Packhilfe",
          text: "Wenn Vorbereitung, Kartons und kleine Demontage entlasten sollen.",
          href: bookingHref,
        },
        {
          title: "Umzug + Wohnungsauflösung",
          text: "Wenn nur ein Teil mitzieht und der Rest geordnet geräumt werden muss.",
          href: "/wohnungsaufloesung-bayern",
        },
        {
          title: "Umzug + Endreinigung",
          text: "Für die alte Wohnung vor Übergabe, Verkauf oder Neuvermietung.",
          href: "/umzug-mit-reinigung",
        },
        {
          title: "Angehörige + Rückruf",
          text: "Wenn Entscheidungen nicht vor Ort getroffen werden können.",
          href: "/blog/seniorenumzug-fuer-angehoerige",
        },
      ]}
      primaryHref={bookingHref}
      primaryLabel="Umzug im Alter anfragen"
      secondaryHref="/angebot-guenstiger-pruefen"
      secondaryLabel="Angebot prüfen"
      trackingService={route.service}
      trackingCity={route.citySlug}
      trackingPageIntent="seniorenumzug"
      trackingPriority={gscPriority.priority.toLowerCase() as "p0" | "p1" | "p2" | "p3"}
    />
  );
}

async function generateLocalSeoMetadata(route: DynamicLocalSeoRoute): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: route.baseKey,
    city: route.city,
  });
  const resolvedCity = germanizeText(city);

  const metadata = generatePageSEO({
    lang: "de",
    path: route.route.replace(/^\//, ""),
    title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, resolvedCity, "de"),
    description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, resolvedCity, "de"),
  });

  if (!DEPRIORITIZED_DYNAMIC_CITY_SLUGS.has(route.citySlug)) {
    return metadata;
  }

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

async function renderLocalSeoPage(route: DynamicLocalSeoRoute) {
  const locale = "de";
  const { localeDict, content, fallback, city } = await getSpecialtyPageData({
    locale,
    baseKey: route.baseKey,
    city: route.city,
  });
  const resolvedCity = germanizeText(city);
  const gscOpportunity = renderLocalGscOpportunity(route, resolvedCity);

  return (
    <SpecialtyPageLayout
      lang="de"
      dict={localeDict}
      city={resolvedCity}
      heroBadge={resolveField(content.hero_badge, fallback.hero_badge, resolvedCity, "de")}
      heroTitle={resolveField(content.hero_h1, fallback.hero_h1, resolvedCity, "de")}
      heroText={resolveField(content.hero_p, fallback.hero_p, resolvedCity, "de")}
      ctaText={resolveField(content.cta, fallback.cta, resolvedCity, "de")}
      breadcrumbs={getLocalSeoBreadcrumbs(route)}
      chips={[
        { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", resolvedCity) },
        { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", resolvedCity) },
        { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", resolvedCity) },
      ]}
      cards={[
        {
          icon: Star,
          title: resolveNestedField(content.service1, fallback.service1, "title", resolvedCity),
          lines: [
            resolveNestedField(content.service1, fallback.service1, "l1", resolvedCity),
            resolveNestedField(content.service1, fallback.service1, "l2", resolvedCity),
            resolveNestedField(content.service1, fallback.service1, "l3", resolvedCity),
            resolveNestedField(content.service1, fallback.service1, "l4", resolvedCity),
          ],
        },
        {
          icon: Zap,
          title: resolveNestedField(content.service2, fallback.service2, "title", resolvedCity),
          lines: [
            resolveNestedField(content.service2, fallback.service2, "l1", resolvedCity),
            resolveNestedField(content.service2, fallback.service2, "l2", resolvedCity),
            resolveNestedField(content.service2, fallback.service2, "l3", resolvedCity),
            resolveNestedField(content.service2, fallback.service2, "l4", resolvedCity),
          ],
        },
      ]}
      sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, resolvedCity, "de")}
      sectionParagraphs={[
        resolveField(content.section2_p1, fallback.section2_p1, resolvedCity, "de"),
        resolveField(content.section2_p2, fallback.section2_p2, resolvedCity, "de"),
      ]}
      wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, resolvedCity, "de")}
      wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, resolvedCity, "de")}
      wizardText={resolveField(content.wizard_p, fallback.wizard_p, resolvedCity, "de")}
    >
      <LocalSeoSearchIntentBridge
        service={route.service}
        city={resolvedCity}
        currentHref={route.route}
      />
      {gscOpportunity}
    </SpecialtyPageLayout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const localSeoRoute = getDynamicLocalSeoRoute(serviceSlug);
  if (localSeoRoute) {
    return generateLocalSeoMetadata(localSeoRoute);
  }

  const growthServicePage = getGrowthServicePageBySlug(serviceSlug);
  if (growthServicePage) {
    return buildGrowthServiceMetadata(growthServicePage);
  }

  if (!isValidServiceSlug(serviceSlug)) {
    notFound();
  }
  const dict = (await getDictionary("de")) as unknown as Record<string, unknown>;
  const content = getServiceContent(dict, serviceSlug);
  return generatePageSEO({
    lang: "de",
    path: serviceSlug,
    title: content.meta_title || content.hero_title,
    description: content.meta_desc || content.hero_desc,
  });
}
export default async function CoreServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const localSeoRoute = getDynamicLocalSeoRoute(serviceSlug);
  if (localSeoRoute) {
    return renderLocalSeoPage(localSeoRoute);
  }

  const growthServicePage = getGrowthServicePageBySlug(serviceSlug);
  if (growthServicePage) {
    return <GrowthServiceLandingPage config={growthServicePage} />;
  }

  if (!isValidServiceSlug(serviceSlug)) {
    notFound();
  }
  const dict = (await getDictionary("de")) as unknown as Record<string, unknown>;
  const isDe = true;
  const content = getServiceContent(dict, serviceSlug);
  const area = getNestedRecord(dict, "area");
  const cities = getNestedRecord(area, "cities");
  const common = getNestedRecord(dict, "common");
  const servicesSection = getNestedRecord(dict, "services_section");
  const related = RELATED_SERVICES[serviceSlug];
  const faqs = content.faqs ?? [];
  const processSteps = content.process_steps ?? [];
  const forWhomItems = content.for_whom_items ?? [];
  const guarantees = content.guarantees ?? [];
  const canonicalUrl = `${company.url}/${serviceSlug}`;
  const regensburgServiceArea = [
    { "@type": "City", name: "Regensburg" },
    { "@type": "AdministrativeArea", name: "Umgebung Regensburg ca. 200 km" },
    { "@type": "State", name: "Bayern" },
  ];
  const faqJsonLd =
    faqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
      : null;
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": getProviderSchemaType(serviceSlug),
    "@id": `${canonicalUrl}#localbusiness`,
    name: company.name,
    url: canonicalUrl,
    telephone: company.phoneRaw,
    email: company.email,
    areaServed: regensburgServiceArea,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.city,
      postalCode: company.postalCode,
      addressRegion: "Bayern",
      addressCountry: company.countryCode,
    },
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: getServiceType(serviceSlug),
    name: content.hero_title || serviceSlug,
    description: content.hero_desc || content.meta_desc || "",
    provider: {
      "@type": getProviderSchemaType(serviceSlug),
      name: company.name,
      telephone: company.phoneRaw,
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.streetAddress,
        addressLocality: company.city,
        postalCode: company.postalCode,
        addressRegion: "Bayern",
        addressCountry: company.countryCode,
      },
    },
    areaServed: regensburgServiceArea,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: getHomeLabel("de"),
        item: `${company.url}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.hero_title || serviceSlug,
        item: canonicalUrl,
      },
    ],
  };
  const alsoAvailableIn = sanitizeString(common.also_available_in, "Auch verfügbar in");
  const whatsappCtaTitle = sanitizeString(common.whatsapp_cta_title, "Schnell per WhatsApp anfragen");
  const whatsappCtaDesc = sanitizeString(
    common.whatsapp_cta_desc,
    "Direkter Kontakt für Rückfragen und Angebote in Deutschland."
  );
  const relatedServicesTitle = sanitizeString(servicesSection.title, "Weitere Leistungen");
  const hubNote = sanitizeString(area.hub_note);
  const supportLinks = SERVICE_SUPPORT_LINKS[serviceSlug];
  const pageSections = [
    { href: "#leistungen", title: "Leistungsbild", text: "Prinzipien und Einordnung auf einen Blick." },
    { href: "#ablauf", title: "Ablauf", text: "So wird Anfrage, Prüfung und Umsetzung geführt." },
    { href: "#faq", title: "FAQ", text: "Häufige Fragen direkt vor der Anfrage klären." },
    { href: "#anfrage", title: "Anfrage", text: "Zum strukturierten Startpunkt oder WhatsApp-Pfad." },
  ];
  const whatsappHref = buildWhatsAppHref(
    company.phoneRaw,
    getWhatsAppContext(`/${serviceSlug}`, serviceSlug).message
  );
  return (
    <main className="min-h-screen bg-background">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumbs
        lang="de"
        items={[{ label: content.hero_title || serviceSlug }]}
      />
      <section className="section-glow bg-gradient-to-b from-primary/5 to-background px-6 pb-20 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          {content.badge && (
            <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {content.badge}
            </span>
          )}
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-6xl">
            {content.hero_title || (serviceSlug.charAt(0).toUpperCase() + serviceSlug.slice(1).replace("-", " "))}
          </h1>
          {content.hero_desc && (
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {content.hero_desc}
            </p>
          )}
        </div>
      </section>
      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageSections.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group rounded-[1.45rem] border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-slate-950/10"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary/70">
                Schnellstart
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-950 transition-colors group-hover:text-primary">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </a>
          ))}
        </div>
      </section>
      <section id="leistungen" className="px-6 pb-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            {
              title: "Realistisch statt Lockpreis",
              text: "Ein Auftrag wird erst belastbar, wenn Umfang, Zugang, Terminlage und Zusatzleistungen zusammenpassen.",
            },
            {
              title: "Klare Zuständigkeit",
              text: "FLOXANT prüft, welcher Service wirklich gebraucht wird und welcher nächste Schritt sinnvoll ist.",
            },
            {
              title: "Übergabe mitdenken",
              text: "Wenn Reinigung, Restmengen, Schlüssel oder Dokumentation relevant sind, werden sie früh eingeordnet.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.45rem] border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-950/5"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                FLOXANT Prinzip
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      {(content.intro_title || content.intro_p1 || content.intro_p2) && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            {content.intro_title && (
              <h2 className="mb-8 text-3xl font-bold text-slate-950">{content.intro_title}</h2>
            )}
            {content.intro_p1 && (
              <p className="mb-6 text-lg leading-relaxed text-slate-600">
                {content.intro_p1}
              </p>
            )}
            {content.intro_p2 && (
              <p className="text-lg leading-relaxed text-slate-600">
                {content.intro_p2}
              </p>
            )}
          </div>
        </section>
      )}
      {(content.for_whom_title || forWhomItems.length > 0) && (
        <section className="section-glow px-6 py-16">
          <div className="mx-auto max-w-3xl">
            {content.for_whom_title && (
              <h2 className="mb-8 text-2xl font-bold text-slate-950">{content.for_whom_title}</h2>
            )}
            {forWhomItems.length > 0 && (
              <div className="space-y-4">
                {forWhomItems.map((item: any, index: number) => (
                  <div key={`${item}-${index}`} className="card-premium flex items-start gap-4 rounded-[1.6rem] p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {(content.process_title || processSteps.length > 0) && (
        <section id="ablauf" className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            {content.process_title && (
              <h2 className="mb-12 text-center text-3xl font-bold text-slate-950">
                {content.process_title}
              </h2>
            )}
            {processSteps.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {processSteps.map((step: any, index: number) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="card-premium relative rounded-[1.8rem] p-6"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                    </div>
                    <p className="leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {faqs.length > 0 && (
        <section id="faq" className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-primary/70">
                Vor der Anfrage
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-4xl">
                Häufige Fragen zu {content.hero_title || serviceSlug}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Damit vor dem ersten Kontakt schon klar ist, wie FLOXANT prüft, einordnet und den nächsten sinnvollen Schritt auswählt.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((faq: any, index: number) => (
                <details
                  key={`${faq.q}-${index}`}
                  open={index === 0}
                  className="group rounded-[1.55rem] border border-slate-200 bg-white px-6 py-5 shadow-sm shadow-slate-950/5"
                >
                  <summary className="cursor-pointer list-none text-left text-lg font-semibold text-slate-950">
                    <span className="flex items-center justify-between gap-4">
                      <span>{faq.q}</span>
                      <span className="text-xl leading-none text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
      {(content.guarantees_title || guarantees.length > 0) && (
        <section className="section-glow px-6 py-16">
          <div className="mx-auto max-w-3xl">
            {content.guarantees_title && (
              <h2 className="mb-8 text-2xl font-bold text-slate-950">
                {content.guarantees_title}
              </h2>
            )}
            {guarantees.length > 0 && (
              <div className="space-y-4">
                {guarantees.map((guarantee: any, index: number) => (
                  <div key={`${guarantee}-${index}`} className="card-premium flex items-start gap-4 rounded-[1.6rem] p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="font-medium text-slate-700">
                      {guarantee}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-slate-50/90 px-6 py-7 shadow-sm shadow-slate-950/5 md:px-8">
          <div className="max-w-2xl">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-primary/70">
              Weiterführend
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Vor der Anfrage noch besser einordnen
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Diese Wege helfen, wenn vor der eigentlichen Buchung noch Preislogik, Ablauf oder der passende Kontaktpfad sortiert werden sollen.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {supportLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.4rem] border border-slate-200 bg-white px-5 py-5 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-slate-950/10"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary/70">
                  Nächster Schritt
                </div>
                <h3 className="mt-3 flex items-center gap-2 text-lg font-semibold text-slate-950 transition-colors group-hover:text-primary">
                  {item.title}
                  <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {hubNote && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <p className="border-s-2 border-primary/20 ps-4 text-sm italic leading-relaxed text-muted-foreground/70">
              {hubNote}
            </p>
          </div>
        </section>
      )}
      <ReviewCarousel dic={dict} />
      <section className="border-t border-border/50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-muted-foreground">
            {relatedServicesTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((slug: any) => {
              const relContent = getServiceContent(dict, slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group rounded-xl border border-border/50 p-5 transition-all hover:border-primary/30"
                >
                  <h3 className="flex items-center gap-2 font-semibold transition-colors group-hover:text-primary">
                    {relContent.hero_title || slug}
                    <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {relContent.hero_desc || ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {isDe && (
        <section className="border-t border-border/50 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {alsoAvailableIn}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { slug: "regensburg", label: getLocalizedCityLabel(cities, "regensburg", "Regensburg") },
                { slug: "bayern", label: getLocalizedCityLabel(cities, "bavaria", "Bayern") },
                { slug: "muenchen", label: getLocalizedCityLabel(cities, "munich", "München") },
                { slug: "nuernberg", label: getLocalizedCityLabel(cities, "nuremberg", "Nürnberg") },
                { slug: "augsburg", label: getLocalizedCityLabel(cities, "augsburg", "Augsburg") },
                { slug: "landshut", label: "Landshut" },
                { slug: "passau", label: "Passau" },
                { slug: "straubing", label: "Straubing" },
                { slug: "schwandorf", label: "Schwandorf" },
                { slug: "ingolstadt", label: "Ingolstadt" },
              ].map((city: any) => {
                let href = `/umzug-${city.slug}`;
                if (serviceSlug === "reinigung" || serviceSlug === "entruempelung") {
                  href = `/${serviceSlug}-${city.slug}`;
                } else if (serviceSlug === "bueroumzug" && city.slug === "regensburg") {
                  href = `/bueroumzug-regensburg`;
                } else if ((serviceSlug as string) === "seniorenumzug" && (city.slug === "regensburg" || city.slug === "muenchen" || city.slug === "nuernberg")) {
                  href = `/seniorenumzug-${city.slug}`;
                }
                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-full border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                  >
                    {city.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section className="border-y border-[#25D366]/10 bg-[#25D366]/5 px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              {whatsappCtaTitle}
            </h3>
            <p className="text-sm text-muted-foreground">{whatsappCtaDesc}</p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-[#128C7E]"
          >
            <span className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              WhatsApp Chat
            </span>
          </a>
        </div>
      </section>
      {(content.cta_title || content.cta_text) && (
        <section id="anfrage" className="section-glow relative overflow-hidden px-6 py-24">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {content.cta_title && (
              <h2 className="mb-6 text-3xl font-bold text-slate-950 md:text-5xl">
                {content.cta_title}
              </h2>
            )}
            {content.cta_text && (
              <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600">
                {content.cta_text}
              </p>
            )}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-violet-500/10 to-indigo-500/10 blur-xl opacity-0 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
              <div className="glass-elevated relative overflow-hidden rounded-[2rem] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] md:p-8">
                <SmartBookingWizard dict={dict} />
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="px-6 pb-16">
        <div className="mx-auto flex max-w-4xl justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            {getHomeLabel("de")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
