import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Search, Globe, ChevronRight, Radar } from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { BAVARIAN_CITIES_GEO, type CityGeoData } from "@/lib/geo-data";
import { generatePageSEO } from "@/lib/seo";
export async function generateMetadata(): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "/standorte",
        title: "Standorte & Servicegebiete | FLOXANT Regensburg, Bayern & 200 km",
        description: "Alle wichtigen FLOXANT Standorte rund um Regensburg, Bayern und den 200-km-Einsatzraum. Umzug, Reinigung, Entrümpelung und Büroumzug in Ihrer Nähe.",
    });
}
export default async function StandortePage() {
    const dict = await getDictionary("de");
    // Group cities by region
    const regions: Record<string, CityGeoData[]> = {};
    Object.values(BAVARIAN_CITIES_GEO).forEach(city => {
        const r = city.region || "Weitere Regionen";
        if (!regions[r]) regions[r] = [];
        regions[r].push(city);
    });
    return (
        <main className="min-h-screen bg-background">
            {/* National Header */}
            <section className="relative overflow-hidden bg-slate-950 py-24 px-6">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto text-center md:text-start">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-8">
                        <Globe className="w-4 h-4 text-primary" />
                        Standort- und Einsatznetzwerk
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                        Unsere <span className="text-primary">Standorte</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
                        Von Regensburg über Bayern bis in den erweiterten 200-km-Einsatzraum: FLOXANT verbindet Umzug, Reinigung, Entrümpelung und Büroumzug mit klaren regionalen Einstiegspunkten.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                        <Link href="/einsatzgebiet-regensburg-200km" className="inline-flex items-center gap-2 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/15 hover:text-white">
                            <Radar className="h-4 w-4" />
                            200-km-Einsatzgebiet
                        </Link>
                        <Link href="/rechner" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                            Anfrage prüfen
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
            {/* Quick Search */}
            <section className="relative -mt-12 px-6">
                <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl shadow-2xl p-4 flex items-center gap-4">
                    <Search className="w-6 h-6 text-muted-foreground ml-2" />
                    <p className="w-full text-lg text-muted-foreground">
                        Stadt unten auswählen oder direkt eine Anfrage mit Einsatzort starten.
                    </p>
                    <Link href="/rechner" className="hidden md:block whitespace-nowrap px-8 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        Anfrage starten
                    </Link>
                </div>
            </section>
            {/* Regional Clusters */}
            <section id="regionen" className="py-24 px-6">
                <div className="max-w-7xl mx-auto space-y-24">
                    {Object.entries(regions).map(([regionName, cities]) => (
                        <div key={regionName} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-4 space-y-4">
                                <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                                <h2 className="text-4xl font-bold text-foreground tracking-tighter">
                                    {regionName}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Lokale Expertise und schnelle Reaktionszeiten in der Region {regionName}. Wir decken alle Kernstädte und das Umland ab.
                                </p>
                            </div>
                            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cities.map((city) => {
                                    const slug = city.name.toLowerCase().replace(/\s+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
                                    return (
                                        <Link 
                                            key={city.name}
                                            href={`/umzug-${slug}`}
                                            className="group flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-secondary rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-lg group-hover:text-primary transition-colors">
                                                    {city.name}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Global CTA */}
            <section className="py-24 px-6 bg-secondary/30">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Stadt nicht gefunden?
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Kein Problem. Wir führen Fernumzüge und Logistikprojekte in **ganz Europa** durch. Kontaktieren Sie uns für ein individuelles Angebot.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/rechner" className="px-10 py-5 bg-primary text-white font-bold rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-3">
                            Individuelle Anfrage
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
