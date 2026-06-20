import Link from "next/link";
import { ArrowRight, Building2, Clock3, DoorOpen, Sparkles } from "lucide-react";

const scopes = [
  {
    title: "Buero / Kanzlei",
    text: "Arbeitsplaetze, Meetingraeume, Empfang, Kueche und Sanitaer.",
    href: "/kontakt?service=bueroreinigung&intent=buero-kanzlei-reinigung&source=b2b",
    Icon: Building2,
  },
  {
    title: "Praxis / Studio",
    text: "Allgemeine Reinigung nach Absprache, ohne Spezialdesinfektionszusage.",
    href: "/kontakt?service=gewerbereinigung&intent=praxis-studio-reinigung&source=b2b",
    Icon: Sparkles,
  },
  {
    title: "Treppenhaus / Verwaltung",
    text: "Eingang, Etagen, Gemeinschaftsflaechen, Zugang und Turnus.",
    href: "/kontakt?service=gewerbereinigung&intent=treppenhaus-verwaltung&source=b2b",
    Icon: DoorOpen,
  },
  {
    title: "Regelmaessiger Turnus",
    text: "Woechentlich, mehrfach pro Woche oder nach Bedarf mit Zeitfenster.",
    href: "/kontakt?service=bueroreinigung&intent=regelmaessige-reinigung&source=b2b",
    Icon: Clock3,
  },
] as const;

type CommercialCleaningScopeSelectorProps = {
  city?: string;
};

function withCity(href: string, city: string) {
  return href.includes("&source=") ? href.replace("&source=", `&city=${city}&source=`) : href;
}

function getHrefParam(href: string, key: string) {
  return new URLSearchParams(href.slice(href.indexOf("?") + 1)).get(key) || "";
}

export function CommercialCleaningScopeSelector({ city = "duesseldorf" }: CommercialCleaningScopeSelectorProps) {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="CommercialCleaningScopeSelector">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-cyan-800">Objektart waehlen</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Welche gewerbliche Flaeche soll gereinigt werden?
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {scopes.map((scope) => {
            const href = withCity(scope.href, city);
            const service = getHrefParam(href, "service") || "bueroreinigung";
            const intent = getHrefParam(href, "intent") || "b2b";

            return (
              <Link
                key={scope.title}
                href={href}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-cyan-200"
                data-event="seo_cta_click"
                data-service={service}
                data-city={city}
                data-page-intent={intent}
                data-priority="p1"
                data-cta-label={scope.title}
                data-destination={href}
              >
                <scope.Icon className="h-5 w-5 text-cyan-800" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{scope.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{scope.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                  Auswaehlen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
