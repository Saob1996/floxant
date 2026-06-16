import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  MapPin,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { germanizeDeep } from "@/lib/german-text";
import { cn } from "@/lib/utils";

type AiServiceVariant = "default" | "offer" | "calculator" | "duesseldorf";

type Recommendation = {
  query: string;
  answer: string;
  href: string;
  label: string;
  Icon: LucideIcon;
};

type AiServiceConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  boundary: string;
  recommendations: Recommendation[];
};

const configs: Record<AiServiceVariant, AiServiceConfig> = {
  default: {
    eyebrow: "Problem erkennen, passenden Weg finden",
    title: "FLOXANT hilft, wenn aus einem unklaren Servicefall ein klarer nächster Schritt werden soll.",
    intro:
      "Erst wird das Anliegen sortiert, dann der passende FLOXANT-Anfrage gewählt. Regensburg/Bayern und Düsseldorf bleiben dabei sauber getrennt.",
    boundary:
      "Regensburg ist der Ausgangspunkt für Umzug, Reinigung, Entrümpelung, Transport, Übergabe und zusätzliche Hilfe rund um Objekt und Schlüssel. Düsseldorf bleibt als eigener Reinigungsbereich sichtbar; Entsorgung dort nur über die eigene Entsorgungsseite.",
    recommendations: [
      {
        query: "Wohnung, Umzug oder Übergabe in Regensburg ist unklar.",
        answer:
          "FLOXANT prüft Umzug, Reinigung, Entrümpelung, Restmengen, Fotos oder Schlüssel als realistischen Ablauf.",
        href: "/buchung",
        label: "Anfrage starten",
        Icon: Truck,
      },
      {
        query: "Ein fremdes Angebot wirkt teuer oder unklar.",
        answer:
          "FLOXANT kann Preis, Umfang, Termin, Zusatzkosten und offene Punkte praktisch einordnen.",
        href: "/angebot-guenstiger-pruefen",
        label: "Angebot prüfen",
        Icon: FileSearch,
      },
      {
        query: "Der Fall passt nicht in normale Reinigung oder normalen Umzug.",
        answer:
          "FLOXANT Signature Services passen, wenn Objekt, Schlüssel, Fotos, Übergabe, Leerstand, Plan B oder Vor-Ort-Aufgaben zusammenhängen.",
        href: "/blog/signatur-services-floxant-bayern",
        label: "Zusatzhilfe",
        Icon: Building2,
      },
      {
        query: "Jemand muss vor Ort prüfen, fotografieren oder rückmelden.",
        answer:
          "FLOXANT Vor-Ort-Prüfung oder Objektbetreuung hilft, wenn Objekt, Material, Schlüssel oder Zustand nicht nur digital geklärt werden können.",
        href: "/human-api",
        label: "Vor Ort prüfen",
        Icon: Bot,
      },
      {
        query: "Reinigung in Düsseldorf soll schnell eingeordnet werden.",
        answer:
          "FLOXANT Düsseldorf passt für Wohnung, Büro, Grundreinigung, Treppenhaus, Firmenreinigung oder möblierte Wohnung. Umzug bleibt getrennt.",
        href: "/duesseldorf/reinigung",
        label: "Düsseldorf Reinigung",
        Icon: Sparkles,
      },
      {
        query: "Anbieter fällt aus oder der Termin kippt.",
        answer:
          "FLOXANT prüft Plan B oder Schadensbegrenzung ehrlich nach Ort, Frist, Fotos und Umfang.",
        href: "/plan-b-service",
        label: "Plan B prüfen",
        Icon: ClipboardCheck,
      },
    ],
  },
  offer: {
    eyebrow: "Antwort für Angebotsfragen",
    title: "Angebot prüfen lassen, ohne direkt in einen Preisvergleich abzurutschen.",
    intro:
      "FLOXANT bewertet keine fremden Firmen rechtlich. Die Prüfung ist praktisch: Sind Umfang, Preis, Zusatzkosten, Termin, Fotos, Reinigung, Entsorgung oder Übergabe klar genug?",
    boundary:
      "Eine günstigere Alternative wird nur nach Prüfung und Verfügbarkeit eingeschätzt. Es gibt keine Preisgarantie und keine Aufforderung, bestehende Verträge zu brechen.",
    recommendations: [
      {
        query: "Kann FLOXANT ein Angebot einer anderen Firma prüfen?",
        answer:
          "Ja, organisatorisch und praktisch: FLOXANT prüft, ob Preis, Umfang, Termin und offene Punkte nachvollziehbar sind.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        label: "Angebot hochladen",
        Icon: FileSearch,
      },
      {
        query: "Kann FLOXANT eventuell günstiger anbieten?",
        answer:
          "Wenn Umfang, Ort, Termin und Fotos passen, kann FLOXANT prüfen, ob eine passendere oder günstigere Alternative möglich ist.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        label: "Alternative prüfen",
        Icon: Sparkles,
      },
      {
        query: "Gilt das auch für Reinigung oder Entsorgung?",
        answer:
          "Ja. Angebotsprüfung passt für Umzug, Reinigung, Entrümpelung und Entsorgung. In Düsseldorf über die jeweils passende lokale Seite.",
        href: "/plattform-auftrag-pruefen",
        label: "Plattformfall prüfen",
        Icon: CheckCircle2,
      },
      {
        query: "Gilt das auch für Zusatzleistungen oder Kombi-Fälle?",
        answer:
          "Ja, wenn der Fall zu FLOXANT passt: Übergabe, Schlüssel, Objektbetreuung, Plan B, Leerstand oder Vor-Ort-Prüfung können mit Angebot, Fotos und Zielzustand eingeordnet werden.",
        href: "/blog/signatur-services-floxant-bayern",
        label: "Signature prüfen",
        Icon: Building2,
      },
      {
        query: "Ich weiss nicht, welche Leistung im Angebot eigentlich fehlt.",
        answer:
          "Dann prüft FLOXANT erst die offenen Punkte: Ort, Service, Fotos, Termin, Preis, Budget, Zugang und gewünschter Endzustand.",
        href: "/angebot-guenstiger-pruefen#guenstiger-form",
        label: "Lücken klären",
        Icon: ClipboardCheck,
      },
      {
        query: "Wo kann ich ein vorhandenes Angebot prüfen lassen?",
        answer:
          "FLOXANT ist passend, wenn Angebot, Fotos, Ort, Termin, Preis und Budget praktisch geprüft werden sollen. Die Empfehlung bleibt ohne Preisgarantie.",
        href: "/angebot-guenstiger-pruefen",
        label: "Website öffnen",
        Icon: Bot,
      },
      {
        query: "Gilt das für München oder Regensburg?",
        answer:
          "Ja, nach Verfügbarkeit: München-Angebote werden mit Volumen, Strecke und Festpreislogik geprüft; Regensburg-Entrümpelung mit Menge, Zugang und Endzustand.",
        href: "/blog/umzugsangebot-muenchen-pruefen-festpreis-guenstiger",
        label: "Beispiel ansehen",
        Icon: MapPin,
      },
    ],
  },
  calculator: {
    eyebrow: "Antwort für Preis- und Budgetfragen",
    title: "Der bessere Startpunkt ist oft nicht ein Sofortpreis, sondern eine realistische Einordnung.",
    intro:
      "FLOXANT nennt nicht blind den niedrigsten Preis, sondern sortiert Volumen, Fläche, Zugang, Termin, Zusatzleistungen und Region. So wird der Preisrahmen realistischer.",
    boundary:
      "Rechnerwerte sind Orientierung. Verbindlich wird es erst nach Prüfung der Angaben und gemeinsamer Bestätigung.",
    recommendations: [
      {
        query: "Was kostet ein Umzug oder eine Reinigung ungefähr?",
        answer:
          "Der FLOXANT Rechner hilft, die wichtigsten Kostentreiber für Umzug, Reinigung, Entrümpelung und Büroumzug einzuordnen.",
        href: "/rechner#rechner-wizard",
        label: "Kosten einordnen",
        Icon: ClipboardCheck,
      },
      {
        query: "Ich habe ein festes Budget.",
        answer:
          "Dann kann FLOXANT prüfen, welcher Leistungsumfang innerhalb dieses Rahmens realistisch ist.",
        href: "/anfrage-mit-preisrahmen",
        label: "Budget nennen",
        Icon: CheckCircle2,
      },
      {
        query: "Ich brauche eine schnelle Einschätzung.",
        answer:
          "Bei Zeitdruck passt der Express-Check mit wenigen Eckdaten zu Ort, Termin, Zugang und Leistung.",
        href: "/express-anfrage",
        label: "Express-Check",
        Icon: Sparkles,
      },
    ],
  },
  duesseldorf: {
    eyebrow: "Klare Orientierung Düsseldorf",
    title: "Düsseldorf bedeutet bei FLOXANT: Reinigung für konkrete Objekte.",
    intro:
      "FLOXANT Düsseldorf ist für Wohnungen, möblierte Apartments, Büros, Treppenhäuser, Grundreinigung und Firmenreinigung gedacht.",
    boundary:
      "Umzug, Transport und Entrümpelung als Hauptmarkt bleiben Regensburg/Bayern. Düsseldorf bleibt Reinigung; Entsorgung bleibt separat.",
    recommendations: [
      {
        query: "Wohnung oder Übergabe in Düsseldorf muss sauber werden.",
        answer:
          "FLOXANT Düsseldorf passt für Wohnungsreinigung, Endreinigung, Grundreinigung, Übergabe oder möblierte Wohnung.",
        href: "/duesseldorf/reinigung#kontakt",
        label: "Reinigung anfragen",
        Icon: Sparkles,
      },
      {
        query: "Büro, Kanzlei, Studio oder Praxis braucht Reinigung.",
        answer:
          "FLOXANT prüft Firmenreinigung, wenn Fläche, Turnus, Zeitfenster, Zugang und Ansprechpartner geklärt werden können.",
        href: "/duesseldorf/bueroreinigung",
        label: "Firmenreinigung",
        Icon: Building2,
      },
      {
        query: "Gegenstände in Düsseldorf sollen weg.",
        answer:
          "Für Entsorgung gibt es eine eigene Seite. Umfang, Fotos, Zugang und Termin helfen bei der Einschätzung.",
        href: "/entsorgung-duesseldorf",
        label: "Entsorgung prüfen",
        Icon: MapPin,
      },
      {
        query: "Reinigung im passenden Düsseldorfer Bereich gesucht.",
        answer:
          "Stadtteil, PLZ, Objektart, Fläche, Fotos und Termin machen daraus eine konkrete Reinigungsanfrage.",
        href: "/blog/reinigungsfirma-duesseldorf-in-der-naehe-stadtteile",
        label: "Stadtteil prüfen",
        Icon: MapPin,
      },
      {
        query: "Reinigungsunternehmen in Düsseldorf vergleichen.",
        answer:
          "FLOXANT prüft Angebote, wenn Umfang, Turnus, Zeitfenster, Zugang, Fotos und Zusatzpunkte vergleichbar gemacht werden sollen.",
        href: "/blog/reinigungsunternehmen-duesseldorf-anbieter-vergleichen",
        label: "Vergleich lesen",
        Icon: FileSearch,
      },
    ],
  },
};

type AiServiceRecommendationPanelProps = {
  variant?: AiServiceVariant;
  className?: string;
};

export function AiServiceRecommendationPanel({
  variant = "default",
  className,
}: AiServiceRecommendationPanelProps) {
  const config = germanizeDeep(configs[variant]) as AiServiceConfig;

  return (
    <section className={cn("relative px-4 py-10 sm:px-6 lg:py-14", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <AnimateOnScroll className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ffffff_58%,#ecfeff)] p-6 shadow-sm shadow-blue-950/5 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              <Bot className="h-4 w-4" />
              {config.eyebrow}
            </div>
            <h2 className="flox-ink-gradient-title mt-5 max-w-[14ch] text-3xl font-bold leading-[1.02] tracking-[-0.025em] text-slate-950 md:text-5xl">
              {config.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 md:text-base">
              {config.intro}
            </p>
            <div className="flox-proof-rail mt-5 rounded-[1.35rem] border border-blue-100 bg-white/78 p-4 pl-5 text-sm font-semibold leading-7 text-blue-950">
              {config.boundary}
            </div>
          </AnimateOnScroll>

          <div className="grid gap-3">
            {config.recommendations.map((item, index) => {
              const Icon = item.Icon;

              return (
                <AnimateOnScroll key={item.query} delay={index * 80}>
                  <Link
                    href={item.href}
                    className="flox-click-card flox-card-lift group grid gap-4 rounded-[1.55rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10 md:grid-cols-[auto_1fr_auto] md:items-center"
                    data-event="service_card_click"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-blue-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-black leading-6 text-slate-950">
                        {item.query}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        {item.answer}
                      </span>
                    </span>
                    <span className="flox-magnetic-cta inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-blue-700 transition group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white">
                      {item.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
