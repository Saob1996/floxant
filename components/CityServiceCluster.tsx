import Link from "next/link";
import { Truck, Trash2, Piano, Sparkles, Building2, PackageCheck } from "lucide-react";
import { company } from "@/lib/company";

interface CityServiceClusterProps {
  locale: string;
  city: string;
  citySlug: string;
}

export function CityServiceCluster({ locale, city, citySlug }: CityServiceClusterProps) {
  if (locale !== "de") return null; // DE-only SEO Gating

  const incompleteServiceCitySlugs = new Set([
    "garmisch-partenkirchen",
    "kulmbach",
    "lindau",
    "muenchen-bogenhausen",
    "muenchen-schwabing",
    "nuernberg-gostenhof",
  ]);
  const useServiceFallbacks = incompleteServiceCitySlugs.has(citySlug);

  const services = [
    {
      title: "Umzug",
      href: `/umzug-${citySlug}`,
      icon: Truck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Entrümpelung",
      href: useServiceFallbacks ? "/entruempelung" : `/entruempelung-${citySlug}`,
      icon: Trash2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Klaviertransport",
      href: useServiceFallbacks ? "/klaviertransport" : `/klaviertransport-${citySlug}`,
      icon: Piano,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Reinigung",
      href: useServiceFallbacks ? "/reinigung" : `/reinigung-${citySlug}`,
      icon: Sparkles,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Büroumzug",
      href: useServiceFallbacks ? "/bueroumzug" : `/bueroumzug-${citySlug}`,
      icon: Building2,
      color: "text-slate-500",
      bg: "bg-slate-500/10",
    },
    {
      title: "Full-Service",
      href: `/rechner`,
      icon: PackageCheck,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <section className="border-t border-white/5 bg-black/40 py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 text-start">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Lokale Expertise in <span className="text-primary">{city}</span>
            </h3>
            <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
              {company.name} ist Ihr kompetenter Partner für alle Anliegen rund um Umzug, Logistik und Immobilien-Services in der Region {city}. Entdecken Sie unsere spezialisierten Fachbereiche vor Ort.
            </p>
          </div>
          
          <div className="hidden lg:block text-end space-y-1">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Servicestatus</div>
            <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sofort verfügbar in {city}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group relative flex flex-col items-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl transition-all hover:bg-white/[0.04] hover:-translate-y-1 hover:border-primary/20"
              >
                <div className={`mb-4 p-4 rounded-2xl ${service.bg} ${service.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors text-center">
                  {service.title} in {city}
                </span>
                
                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  Preise für {city} ansehen
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
