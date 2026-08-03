import { RequestTypeCards } from "@/components/RequestTypeCards";
import { SafeRequestNotice } from "@/components/SafeRequestNotice";
import {
  buildServiceContactHref,
  resolveServiceRoute,
  type ServiceRouteResult,
} from "@/lib/service-routing";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileSearch,
  Globe2,
  MapPin,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";

type FinderItemInput = {
  label: string;
  description: string;
  serviceKey: string;
  city?: string;
  intent?: string;
  priority?: string;
  source: string;
  Icon?: LucideIcon;
};

type FinderItem = FinderItemInput & {
  href: string;
  route: ServiceRouteResult;
  Icon: LucideIcon;
};

type ServiceFinderProps = {
  currentCity?: string;
  compact?: boolean;
  title?: string;
  intro?: string;
  source?: string;
  componentName?: "ServiceFinder" | "ContactPathChooser";
};

function item(input: FinderItemInput): FinderItem {
  const route = resolveServiceRoute({
    serviceKey: input.serviceKey,
    city: input.city,
    intent: input.intent,
    priority: input.priority,
    source: input.source,
  });

  return {
    ...input,
    href: buildServiceContactHref({
      serviceKey: input.serviceKey,
      city: input.city,
      intent: input.intent,
      priority: input.priority,
      source: input.source,
    }),
    route,
    Icon: input.Icon || Route,
  };
}

function serviceGroupItems(source: string, currentCity?: string): readonly FinderItem[] {
  const city = currentCity || "regensburg";
  return [
    item({ label: "Reinigung", description: "Wohnung, Endreinigung, Fenster oder Grundreinigung.", serviceKey: "reinigung", city, intent: "reinigung-anfrage", priority: "p1", source, Icon: Sparkles }),
    item({ label: "Solar/PV prüfen", description: "Anlage, Dachzugang und Verschmutzung zunächst neutral einordnen.", serviceKey: "solarreinigung", city, intent: "solarreinigung-anfrage", priority: "p2", source, Icon: Sparkles }),
    item({ label: "Büro/Gewerbe", description: "Fläche, Turnus, Zeitfenster und Zugang.", serviceKey: "bueroreinigung", city, intent: "b2b-bueroreinigung", priority: "p0", source, Icon: Building2 }),
    item({ label: "Hausverwaltung", description: "Treppenhaus, Unterhalt, Objekt und Angebot.", serviceKey: "hausverwaltung-reinigung", city, intent: "hausverwaltung-reinigung-anfrage", priority: "p0", source, Icon: Building2 }),
    item({ label: "Umzug/Transport", description: "Start, Ziel, Umfang, Etage und Termin.", serviceKey: "umzug", city, intent: "umzug-transport", priority: "p1", source, Icon: Truck }),
    item({ label: "Entrümpelung", description: "Räume, Menge, Freigabe und Zielzustand.", serviceKey: "entruempelung", city, intent: "entruempelung-aufloesung", priority: "p1", source, Icon: Route }),
    item({ label: "Angebot prüfen", description: "Angebot, Preis, Umfang und Prüfgrund.", serviceKey: "angebot-pruefen", city, intent: "angebot-pruefen", priority: "p0", source, Icon: FileSearch }),
  ] as const;
}

function locationItems(source: string): readonly FinderItem[] {
  return [
    item({ label: "Regensburg", description: "Leistung in Regensburg oder der näheren Umgebung anfragen.", serviceKey: "reinigung", city: "regensburg", intent: "regensburg-anfrage", priority: "p1", source, Icon: MapPin }),
    item({ label: "Düsseldorf", description: "Reinigung, Objektservice oder Angebotsprüfung in Düsseldorf anfragen.", serviceKey: "hausverwaltung-reinigung", city: "duesseldorf", intent: "duesseldorf-anfrage", priority: "p0", source, Icon: MapPin }),
    item({ label: "Bayern und Umgebung", description: "Ort angeben und prüfen lassen, ob die Leistung dort möglich ist.", serviceKey: "sonstiges", city: "bayern", intent: "servicegebiet-pruefen", priority: "p2", source, Icon: MapPin }),
  ] as const;
}

function reasonItems(source: string, currentCity?: string): readonly FinderItem[] {
  const city = currentCity || "regensburg";
  return [
    item({ label: "Ich brauche eine Leistung", description: "Wählen Sie den ungefähren Bedarf. Einzelheiten folgen im Formular.", serviceKey: "sonstiges", city, intent: "leistung-anfragen", priority: "p2", source, Icon: Send }),
    item({ label: "Ich habe ein Angebot", description: "Beschreiben Sie Preis, Umfang und Ihre offenen Fragen.", serviceKey: "angebot-pruefen", city, intent: "angebot-pruefen", priority: "p0", source, Icon: FileSearch }),
    item({ label: "Es ist dringend", description: "Nennen Sie Frist, Absagegrund und was noch erledigt werden muss.", serviceKey: "plan-b-service", city, intent: "plan-b-anbieterabsage", priority: "p0", source, Icon: ShieldCheck }),
    item({ label: "Diskret abstimmen", description: "Grobe Lage und sicherer Kontaktweg reichen.", serviceKey: "diskret-service", city, intent: "diskret-service", priority: "p0", source, Icon: ShieldCheck }),
    item({ label: "English request", description: "Cleaning, moving, clearance or offer check in English.", serviceKey: "english-contact", city, intent: "english-contact", priority: "p1", source, Icon: Globe2 }),
    item({ label: "Ich bin unsicher", description: "FLOXANT fragt gezielt nach, wenn etwas fehlt.", serviceKey: "sonstiges", city, intent: "unsichere-anfrage", priority: "p2", source, Icon: Route }),
  ] as const;
}

function LinkGrid({ items }: { items: readonly FinderItem[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((link) => (
        <Link
          key={`${link.label}-${link.href}`}
          href={link.href}
          className="group grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          data-event="seo_cta_click"
          data-source={link.source}
          data-service={link.route.service}
          data-city={link.route.city}
          data-page-intent={link.route.intent}
          data-priority={link.route.priority}
          data-cta-label={link.label}
          data-destination={link.href}
          data-no-api-on-select="true"
          data-manual-review={link.route.manualReview ? "true" : undefined}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-700 ring-1 ring-slate-200">
            <link.Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black leading-tight text-slate-950">{link.label}</span>
            <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">{link.description}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

function FinderBlock({
  title,
  text,
  Icon,
  items,
}: {
  title: string;
  text: string;
  Icon: LucideIcon;
  items: readonly FinderItem[];
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-black leading-tight text-slate-950">{title}</h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{text}</p>
        </div>
      </div>
      <div className="mt-4">
        <LinkGrid items={items} />
      </div>
    </div>
  );
}

export function ServiceGroupSelector({ currentCity, source = "service-finder-service" }: { currentCity?: string; source?: string }) {
  return (
    <FinderBlock
      title="Leistung auswählen"
      text="Wählen Sie die Leistung, die am ehesten zu Ihrer Situation passt."
      Icon={Route}
      items={serviceGroupItems(source, currentCity)}
    />
  );
}

export function LocationSelector({ source = "service-finder-location" }: { source?: string }) {
  return (
    <FinderBlock
      title="Einsatzort auswählen"
      text="Wählen Sie den passenden Ort oder lassen Sie einen anderen Einsatzort prüfen."
      Icon={MapPin}
      items={locationItems(source)}
    />
  );
}

export function RequestReasonSelector({ currentCity, source = "service-finder-reason" }: { currentCity?: string; source?: string }) {
  return (
    <FinderBlock
      title="Anliegen auswählen"
      text="Wählen Sie, ob Sie eine Leistung, eine Angebotsprüfung oder diskrete Unterstützung brauchen."
      Icon={Send}
      items={reasonItems(source, currentCity)}
    />
  );
}

export function ContactFormIntro() {
  return (
    <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm font-semibold leading-7 text-slate-700">
      Ort, Service, kurze Lage und Kontaktweg reichen für den Start. Fotos, Angebot, Termin und Budget bleiben freiwillig und werden erst beim Absenden übermittelt.
    </aside>
  );
}

export function WhatHappensNext() {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-black text-slate-950">Was danach passiert</h3>
      <div className="mt-3 grid gap-2 text-sm font-semibold leading-7 text-slate-700">
        <p>1. FLOXANT liest Ort, Service, Umfang und offene Frage.</p>
        <p>2. Fehlende Punkte werden gezielt nachgefragt.</p>
        <p>3. Erst nach Abstimmung entsteht ein konkreter nächster Schritt.</p>
      </div>
    </aside>
  );
}

export function ServiceFinder({
  currentCity,
  compact = false,
  title = "Welche Leistung passt zu Ihrer Situation?",
  intro = "Wählen Sie Leistung, Ort und Anliegen. Ihre Anfrage wird erst gesendet, wenn Sie das Formular abschicken.",
  source = "service-finder",
  componentName = "ServiceFinder",
}: ServiceFinderProps) {
  return (
    <section
      className={compact ? "px-4 py-8 sm:px-6" : "px-4 py-12 sm:px-6"}
      data-component={`${componentName} ServiceFinder`}
      data-no-api-on-select="true"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-normal text-blue-700">Schnell zur passenden Anfrage</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">{title}</h2>
          </div>
          <div className="grid gap-3 lg:justify-self-end">
            <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-700 lg:text-right">{intro}</p>
            <SafeRequestNotice />
          </div>
        </div>

        <div className={compact ? "grid gap-5" : "grid gap-6 lg:grid-cols-3"}>
          <ServiceGroupSelector currentCity={currentCity} source={`${source}-service`} />
          <LocationSelector source={`${source}-location`} />
          {!compact ? <RequestReasonSelector currentCity={currentCity} source={`${source}-reason`} /> : null}
        </div>

        {!compact ? (
          <>
            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <ContactFormIntro />
              <WhatHappensNext />
            </div>
            <div className="mt-6">
              <RequestTypeCards />
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

export function ContactPathChooser() {
  return (
    <ServiceFinder
      title="Noch unsicher? Finden Sie den passenden Start."
      intro="Wählen Sie Leistung, Ort und Anliegen. Einzelheiten können Sie anschließend im Formular ergänzen."
      source="contact-path-chooser"
      componentName="ContactPathChooser"
    />
  );
}
