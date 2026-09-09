import Link from "next/link";
import { ArrowRight, BookOpen, Building2, Sparkles } from "lucide-react";

type RelatedLink = {
  href: string;
  label: string;
  text: string;
};

type RelatedServicesBlockProps = {
  className?: string;
  currentHref?: string;
  title?: string;
  intro?: string;
  links?: readonly RelatedLink[];
  limit?: number;
  showSupportArticles?: boolean;
};

const defaultServiceLinks: readonly RelatedLink[] = [
  {
    href: "/regensburg/reinigung",
    label: "Gebäudereinigung Regensburg",
    text: "Reinigung für Wohnung, Büro und Gewerbe in Regensburg und 75 km Umgebung, einmalig oder regelmäßig.",
  },
  {
    href: "/regensburg/gewerbereinigung",
    label: "Gewerbereinigung Regensburg",
    text: "Für Büro, Praxis, Kanzlei, Studio, Hausverwaltung und Objektflächen mit Turnus oder Raumliste.",
  },
  {
    href: "/regensburg/bueroreinigung",
    label: "Büroreinigung Regensburg",
    text: "Für Arbeitsplätze, Empfang, Besprechung, Küche, Sanitär, Randzeit und Schlüsselweg.",
  },
  {
    href: "/unterhaltsreinigung-regensburg",
    label: "Unterhaltsreinigung Regensburg",
    text: "Für regelmäßige Reinigung mit Frequenz, Leistungsverzeichnis und festem Ansprechpartner.",
  },
  {
    href: "/praxisreinigung-regensburg",
    label: "Praxisreinigung Regensburg",
    text: "Für Empfang, Wartebereich, Sanitär und Nebenflächen ohne pauschale Spezialdesinfektions-Zusage.",
  },
  {
    href: "/treppenhausreinigung-regensburg",
    label: "Treppenhausreinigung Regensburg",
    text: "Für WEG, Hausverwaltung, Eingänge, Etagen, Kellerflur, Müllraum und Turnus.",
  },
  {
    href: "/fensterreinigung-regensburg",
    label: "Fensterreinigung Regensburg",
    text: "Für Fensterzahl, Glasflächen, Schaufenster, Rahmenwunsch, Etage und Zugang.",
  },
  {
    href: "/grundreinigung-regensburg",
    label: "Grundreinigung Regensburg",
    text: "Für Leerstand, Einzug, Auszug, starke Verschmutzung, Küche, Bad, Boden und Übergabetermin.",
  },
  {
    href: "/baureinigung-regensburg",
    label: "Baureinigung Regensburg",
    text: "Für Renovierung, Umbau, Baufeinreinigung, Handwerkerstaub, Fläche und Deadline.",
  },
  {
    href: "/reinigungsfirma-angebot",
    label: "Reinigungsfirma-Angebot prüfen",
    text: "Für vorhandene Angebote, wenn Umfang, Turnus, Zusatzpunkte oder Preislogik unklar sind.",
  },
] as const;

const supportArticles: readonly RelatedLink[] = [
  {
    href: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl",
    label: "Reinigungsfirma für Büro oder Praxis auswählen",
    text: "Ratgeber zur Einordnung von Objektart, Raumliste, Turnus, Vertrauen und Grenzen.",
  },
  {
    href: "/blog/bueroreinigung-regensburg-angebot-einholen",
    label: "Büroreinigung-Angebot einholen",
    text: "Welche Angaben bei Arbeitsplätzen, Küche, Sanitär, Randzeiten und Fläche helfen.",
  },
  {
    href: "/blog/gewerbereinigung-regensburg-objekte-b2b",
    label: "Gewerbereinigung für B2B-Objekte",
    text: "Ratgeber für Büro, Praxis, Hotel, Hausverwaltung und laufende Objektpflege.",
  },
  {
    href: "/blog/hausverwaltung-treppenhausreinigung-regensburg",
    label: "Treppenhausreinigung für Hausverwaltung",
    text: "Hilft bei WEG, Mehrfamilienhaus, Eingängen, Etagen, Turnus und Beschwerden.",
  },
  {
    href: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel",
    label: "Unterhaltsreinigung planen",
    text: "Erklärt Frequenz, Leistungsverzeichnis, Ansprechpartner und Starttermin.",
  },
] as const;

export function RelatedServicesBlock({
  className = "",
  currentHref,
  title = "Verwandte Regensburger Reinigungsseiten",
  intro = "Diese Links führen von der allgemeinen Reinigung zur passenden Leistung und zu hilfreichen Ratgebern.",
  links = defaultServiceLinks,
  limit = 6,
  showSupportArticles = true,
}: RelatedServicesBlockProps) {
  const normalizedCurrent = currentHref?.replace(/\/$/u, "");
  const visibleLinks = links
    .filter((item) => item.href.replace(/\/$/u, "") !== normalizedCurrent)
    .slice(0, limit);

  return (
    <section className={`bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`} aria-labelledby="related-cleaning-services-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              Passende Wege
            </p>
            <h2 id="related-cleaning-services-title" className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
          </div>
          <Link
            href="/regensburg/reinigung"
            data-event="internal_cluster_click"
            data-region="regensburg"
            data-service="reinigung"
            data-source="related_services_block_hub"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
          >
            Reinigungsleistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-event="internal_cluster_click"
              data-region="regensburg"
              data-service="reinigung"
              data-source="related_services_block"
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
            >
              <Sparkles className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{item.label}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Seite öffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        {showSupportArticles ? (
          <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Ratgeber
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {supportArticles.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-event="internal_cluster_click"
                  data-region="regensburg"
                  data-service="reinigung"
                  data-source="related_services_support"
                  className="rounded-lg border border-slate-200 bg-white p-4 text-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  <span className="font-black text-slate-950">{item.label}</span>
                  <span className="mt-2 block font-semibold leading-6 text-slate-600">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
