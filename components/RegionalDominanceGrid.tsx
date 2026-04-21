import Link from "next/link";
import { ArrowRight, Building2, Clock3, MapPin, Radar, ShieldCheck, Sparkles, Trash2, Truck } from "lucide-react";
import { SERVICE_AREA_SERVICES, SERVICE_AREA_ZONES } from "@/lib/service-area-200km";

const serviceIcons = [Truck, Trash2, Building2, Sparkles];

export function RegionalDominanceGrid({ dic }: { dic?: any }) {
    const t = dic?.regional_grid || {};
    const featuredCities = SERVICE_AREA_ZONES.flatMap((zone) => zone.cities).slice(0, 18);

    return (
        <section className="relative overflow-hidden border-t border-white/5 bg-background px-6 py-32">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_46%)]" />
            <div className="absolute left-1/2 top-24 -z-10 h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-blue-400/5" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                    <div>
                        <span className="label-premium mb-4 block text-blue-400">
                            {t.badge || "Einsatzgebiet Regensburg"}
                        </span>
                        <h2 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                            Services im 200-km-Raum um Regensburg
                        </h2>
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/45">
                            FLOXANT bündelt Umzug, Entrümpelung, Büroumzug, Reinigung und Express-Anfragen
                            aus dem operativen Kern Regensburg. Der Radius ist kein pauschales Versprechen,
                            sondern ein sauberer Planungsraum für realistische Vorprüfung.
                        </p>
                    </div>

                    <Link
                        href="/einsatzgebiet-regensburg-200km"
                        className="premium-scan group rounded-[2rem] border border-blue-400/20 bg-blue-500/[0.08] p-7 transition-all hover:-translate-y-1 hover:bg-blue-500/[0.12]"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                                    Neuer SEO-Hub
                                </div>
                                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                                    200-km-Einsatzgebiet öffnen
                                </h3>
                            </div>
                            <Radar className="h-9 w-9 text-blue-200" />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-blue-50/55">
                            Orte, Services, Suchintentionen und direkte Einstiege rund um Regensburg.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                            Hub ansehen
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {SERVICE_AREA_SERVICES.map((service, index) => {
                        const Icon = serviceIcons[index] || Truck;
                        return (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="premium-scan group rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-6 transition-all hover:-translate-y-1 hover:border-blue-400/25"
                            >
                                <Icon className="h-6 w-6 text-blue-300" />
                                <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{service.name}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/45">{service.description}</p>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                    {SERVICE_AREA_ZONES.map((zone) => (
                        <div key={zone.id} className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">{zone.radius}</div>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{zone.title}</h3>
                                </div>
                                {zone.id === "core" ? <MapPin className="h-6 w-6 text-blue-300" /> : zone.id === "regional" ? <ShieldCheck className="h-6 w-6 text-blue-300" /> : <Clock3 className="h-6 w-6 text-blue-300" />}
                            </div>
                            <p className="mb-6 text-sm leading-relaxed text-white/42">{zone.description}</p>
                            <div className="grid gap-2">
                                {zone.cities.slice(0, 6).map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/umzug-${city.slug}`}
                                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-white/48 transition-all hover:border-blue-400/20 hover:bg-white/[0.035] hover:text-white"
                                    >
                                        <span className="text-sm font-medium">{city.name}</span>
                                        <span className="text-[11px] text-white/30">{city.distance}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-6">
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">Städte-Auswahl</div>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Direkte Einstiegspunkte im Einsatzraum</h3>
                        </div>
                        <Link href="/standorte" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-white">
                            Alle Standorte
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {featuredCities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/umzug-${city.slug}`}
                                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold text-white/50 transition-all hover:border-blue-400/25 hover:text-white"
                            >
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
