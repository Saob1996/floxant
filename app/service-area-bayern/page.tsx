import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Radar } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
    buildBreadcrumbJsonLd,
    buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "service-area-bayern",
        title: "Servicegebiet Bayern | FLOXANT Regionen & Städte",
        description:
            "FLOXANT plant Umzug, Reinigung, Entrümpelung und Büroumzug ab Regensburg in Bayern. Regionen, Städte, 200-km-Einsatzgebiet und wichtigste Servicebereiche.",
    });
}

export default async function ServiceAreaBayern() {
    const dict = await getDictionary("de");

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Servicegebiet Bayern" },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Servicegebiet Bayern", item: "/service-area-bayern" },
            ]),
            buildWebPageJsonLd({
                name: "Servicegebiet Bayern | FLOXANT",
                description:
                    "Regionale Einordnung des FLOXANT Einsatzgebiets mit Schwerpunkt Regensburg und Bayern.",
                path: "/service-area-bayern",
                about: ["Regensburg", "Bayern", "Umzug", "Reinigung", "Entrümpelung", "Büroumzug", "200-km-Einsatzgebiet"],
            }),
        ],
    };

    const regions = [
        {
            name: "Regensburg und Oberpfalz",
            desc: "Das operative Zentrum mit kurzer Reaktionszeit und dichtem Einsatznetz für Umzug, Reinigung, Entrümpelung und Büroumzug.",
            links: [
                { href: "/umzug-regensburg", label: "Umzug Regensburg" },
                { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
                { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
                { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg" },
            ],
        },
        {
            name: "Nürnberg und Mittelfranken",
            desc: "Wichtige Nachfrage-Region für Umzüge, Entrümpelung, Büroumzug und kurzfristige Anfragen im erweiterten Einsatzraum.",
            links: [
                { href: "/umzug-nuernberg", label: "Umzug Nürnberg" },
                { href: "/reinigung-nuernberg", label: "Reinigung Nürnberg" },
                { href: "/entruempelung-nuernberg", label: "Entrümpelung Nürnberg" },
                { href: "/bueroumzug-nuernberg", label: "Büroumzug Nürnberg" },
            ],
        },
        {
            name: "München und Oberbayern",
            desc: "Starker Ausbaukorridor für Umzug, Objektservice und kombinierte Leistungen.",
            links: [
                { href: "/umzug-muenchen", label: "Umzug München" },
                { href: "/reinigung-muenchen", label: "Reinigung München" },
                { href: "/entruempelung-muenchen", label: "Entrümpelung München" },
                { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-background text-start">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Breadcrumbs lang="de" items={breadcrumbs} />

            <section className="bg-gradient-to-b from-muted/20 to-background px-6 pb-20 pt-8">
                <div className="mx-auto max-w-6xl space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        <MapPin className="h-4 w-4" />
                        <span>Regionale Relevanz für Regensburg und Bayern</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                        FLOXANT Servicegebiet in Bayern
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-400">
                        FLOXANT arbeitet mit Schwerpunkt Regensburg und plant regelmäßige Einsätze für Umzug, Reinigung, Entrümpelung und Büroumzug in Bayern. Diese Seite ordnet die wichtigsten Regionen, Einstiege und den erweiterten 200-km-Einsatzraum sauber ein.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/einsatzgebiet-regensburg-200km"
                            className="inline-flex items-center gap-2 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/15 hover:text-white"
                        >
                            <Radar className="h-4 w-4" />
                            200-km-Einsatzgebiet ansehen
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-6xl space-y-8">
                    {regions.map((region) => (
                        <div key={region.name} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                            <h2 className="mb-3 text-2xl font-bold text-white">{region.name}</h2>
                            <p className="mb-6 text-slate-300">{region.desc}</p>
                            <div className="grid gap-4 md:grid-cols-3">
                                {region.links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="rounded-2xl border border-white/10 bg-[#0B0B14] px-5 py-4 font-medium text-slate-300 transition-all hover:border-primary hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-t border-white/5 px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-3xl font-bold text-white">Wichtige Hub-Seiten für Bayern</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { href: "/umzug-bayern", label: "Umzug Bayern" },
                            { href: "/reinigung-bayern", label: "Reinigung Bayern" },
                            { href: "/entruempelung-bayern", label: "Entrümpelung Bayern" },
                            { href: "/bueroumzug-bayern", label: "Büroumzug Bayern" },
                            { href: "/einsatzgebiet-regensburg-200km", label: "200-km-Einsatzgebiet" },
                            { href: "/rechner", label: "Zum FLOXANT Rechner" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-primary hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section id="kontakt" className="px-6 pb-24">
                <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/5 bg-slate-900 px-6 py-16 shadow-2xl">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-white">Anfrage für Ihre Region in Bayern</h2>
                        <p className="mt-4 text-slate-400">
                            Nutzen Sie den Rechner, wenn Standort, Service und Preisrahmen regional sauber vorbereitet werden sollen.
                        </p>
                    </div>
                    <SmartBookingWizard
                        dict={{
                            common: dict.common as any,
                            calculator: (dict as any).calculator,
                        }}
                    />
                    <div className="mt-10 text-center">
                        <Link href="/standorte" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
                            Alle Standorte ansehen
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
