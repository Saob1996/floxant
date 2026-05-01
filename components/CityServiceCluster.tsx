import Link from "next/link";
import { ArrowRight, Building2, PackageCheck, Piano, Sparkles, Trash2, Truck } from "lucide-react";

import { company } from "@/lib/company";
import { germanText } from "@/lib/german-text";

interface CityServiceClusterProps {
  locale: string;
  city: string;
  citySlug: string;
}

export function CityServiceCluster({ locale, city, citySlug }: CityServiceClusterProps) {
  if (locale !== "de") return null;

  const incompleteServiceCitySlugs = new Set([
    "garmisch-partenkirchen",
    "kulmbach",
    "lindau",
    "muenchen-bogenhausen",
    "muenchen-haidhausen",
    "muenchen-maxvorstadt",
    "muenchen-sendling",
    "muenchen-schwabing",
    "nuernberg-gostenhof",
    "nuernberg-moegeldorf",
    "nuernberg-suedstadt",
    "nuernberg-ziegelstein",
  ]);

  const useServiceFallbacks = incompleteServiceCitySlugs.has(citySlug);

  const services = [
    {
      title: "Umzug",
      hint: `Umzug in ${city}`,
      href: `/umzug-${citySlug}`,
      icon: Truck,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      title: "Entrümpelung",
      hint: `Entrümpelung in ${city}`,
      href: useServiceFallbacks ? "/entruempelung" : `/entruempelung-${citySlug}`,
      icon: Trash2,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Klaviertransport",
      hint: `Klaviertransport in ${city}`,
      href: useServiceFallbacks ? "/klaviertransport" : `/klaviertransport-${citySlug}`,
      icon: Piano,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      title: "Reinigung",
      hint: `Reinigung in ${city}`,
      href: useServiceFallbacks ? "/reinigung" : `/reinigung-${citySlug}`,
      icon: Sparkles,
      tone: "bg-cyan-50 text-cyan-700",
    },
    {
      title: "Büroumzug",
      hint: `Büroumzug in ${city}`,
      href: useServiceFallbacks ? "/bueroumzug" : `/bueroumzug-${citySlug}`,
      icon: Building2,
      tone: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Rechner",
      hint: "Preisrahmen direkt einordnen",
      href: "/rechner",
      icon: PackageCheck,
      tone: "bg-slate-100 text-slate-800",
    },
  ];

  return (
    <section className="section-glow relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-elevated rounded-[1.8rem] px-7 py-7 md:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
              Regionale Wege
            </div>
            <h2 className="mt-6 text-[2.2rem] font-bold tracking-tight text-slate-950 md:text-[2.7rem]">
              Direkt zur passenden Leistung in {germanText(city, city)}.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
              {company.name} bündelt für {germanText(city, city)} die wichtigsten Anfragewege zwischen
              Umzug, Reinigung, Entrümpelung, Büroumzug und Rechner. So finden Kunden schneller
              die richtige Leistung statt einer unklaren Sammelseite.
            </p>
          </div>

          <div className="card-premium rounded-[1.8rem] px-7 py-7 md:px-8">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Nächster Schritt
            </div>
            <h3 className="mt-4 text-[1.6rem] font-bold tracking-tight text-slate-950">
              Welche Anfrage passt für {germanText(city, city)}?
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Regensburg bleibt die Basis. Für {germanText(city, city)} prüfen wir Serviceart,
              Umfang, Termin und Route, bevor aus einer Anfrage eine planbare Durchführung wird.
            </p>
            <Link
              href="/standorte"
              className="mt-7 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700"
            >
              Alle Standorte ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.href} href={service.href} className="card-premium card-depth rounded-[1.35rem] p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-[1rem] ${service.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[1.28rem] font-bold tracking-tight text-slate-950">
                  {germanText(service.title, service.title)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{germanText(service.hint, service.hint)}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Passende Seite öffnen
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
