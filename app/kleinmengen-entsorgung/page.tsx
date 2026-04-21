import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Construction, Recycle, ShieldAlert, Trash2 } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
    buildServiceJsonLd,
    buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "kleinmengen-entsorgung",
        title: "Kleinmengen-Entsorgung Bayern | Bauschutt & Sperrmüll",
        description:
            "Fachgerechte Entsorgung von Kleinmengen wie Renovierungsabfällen oder Sperrmüll in Bayern. Die effiziente Lösung zwischen Hausmüll und Container.",
    });
}

export default async function EntsorgungPage() {
    const dict = await getDictionary("de");

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Kleinmengen-Entsorgung" },
    ];

    const faqItems = [
        {
            q: "Wann gilt eine Menge als 'Kleinmenge'?",
            a: "Typischerweise sprechen wir von Mengen zwischen 1 und 5 Kubikmetern – etwa der Rest einer Bad-Renovierung oder ein überschaubarer Keller-Auszug in Bayern.",
        },
        {
            q: "Welche Materialien können entsorgt werden?",
            a: "Sperrmüll, Altholz, Bauschutt (sortenrein), Fliesenreste und allgemeiner Siedlungsabfall. Gefährliche Stoffe wie Asbest oder Farben sind ausgeschlossen.",
        },
        {
            q: "Warum ist FLOXANT effizienter als ein eigener Container?",
            a: "Für kleine Mengen ist die Container-Stellung oft zu teuer und nimmt zu viel Platz ein. Wir holen die sortierten Materialien direkt ab und erledigen die Entsorgung am selben Tag.",
        },
        {
            q: "Bieten Sie den Service in ganz Bayern an?",
            a: "Ja, wir nutzen unsere Logistik-Touren in Bayern, um die Abholung von Kleinmengen effizient einzuplanen, wobei Regensburg unser zentraler Verteilungspunkt ist.",
        },
        {
            q: "Wie läuft die Anfrage für die Entsorgung ab?",
            a: "Sie fotografieren idealerweise die Menge oder beschreiben sie kurz im Intake. Danach prüfen wir Materialart, Menge und Abholort und nennen einen passenden Preisrahmen oder ein konkretes Angebot.",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Kleinmengen-Entsorgung", item: "/kleinmengen-entsorgung" },
            ]),
            buildServiceJsonLd({
                name: "Kleinmengen-Entsorgung in Regensburg und Bayern",
                description:
                    "Abholung und fachgerechte Entsorgung überschaubarer Mengen mit FLOXANT.",
                path: "/kleinmengen-entsorgung",
                areaServed: ["Regensburg", "Bayern"],
            }),
            buildWebPageJsonLd({
                name: "Kleinmengen-Entsorgung | FLOXANT",
                description:
                    "Definition, Grenzen und direkte Anfrage für Kleinmengen-Entsorgung in Regensburg und Bayern.",
                path: "/kleinmengen-entsorgung",
                about: ["Kleinmengen-Entsorgung", "Bauabfall", "Regensburg", "Bayern"],
            }),
            buildFaqJsonLd(faqItems),
        ],
    };

    return (
        <main className="min-h-screen bg-background text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Breadcrumbs lang="de" items={breadcrumbs} />

            <section className="relative overflow-hidden px-6 pb-20 pt-16">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.06),transparent_50%)]" />
                <div className="mx-auto max-w-6xl text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-red-400">
                        <Construction size={14} className="text-red-500/60" />
                        Kleinmengen Bayern
                    </div>
                    <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl text-white">
                        Kleinmengen-Entsorgung in Regensburg & Bayern
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/50">
                        FLOXANT schließt die operative Lücke zwischen Hausmüll und teurem Großcontainer. Wir entsorgen Renovierungsreste, Bauschutt-Teilmengen und Sperrmüll fachgerecht, schnell und transparent in ganz Bayern, mit Regensburg als zentralem Logistik-Knotenpunkt.
                    </p>
                </div>
            </section>

            <section className="border-y border-white/5 bg-white/[0.01] px-6 py-20">
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        { icon: Trash2, title: "Was ist das?", text: "Abholung kleiner bis mittlerer Mengen ohne eigenen Großcontainer." },
                        { icon: Recycle, title: "Für wen?", text: "Für Renovierung, Umbau, kleine Baustellen und Eigentümer mit klar abgegrenzten Materialien." },
                        { icon: CheckCircle2, title: "Wann sinnvoll?", text: "Wenn der Aufwand für einen Container unverhältnismäßig wäre, die Menge aber für Eigenfahrt zu groß bleibt." },
                        { icon: ShieldAlert, title: "Welche Grenzen gelten?", text: "Gefährliche Stoffe sind ausgeschlossen. Materialarten müssen vorher klar definiert sein." },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                                <Icon className="mb-5 h-8 w-8 text-red-400" />
                                <h2 className="mb-3 text-xl font-bold">{item.title}</h2>
                                <p className="text-white/60">{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-3xl font-bold">Häufige Fragen zur Kleinmengen-Entsorgung</h2>
                    <div className="space-y-6">
                        {faqItems.map((item) => (
                            <div key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                                <h3 className="mb-4 text-xl font-bold">{item.q}</h3>
                                <p className="text-white/60">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="booking" className="bg-slate-900/50 py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold">Menge und Abholung anfragen</h2>
                        <p className="mt-4 text-white/50">
                            Geben Sie Materialart, Menge und Abholort an. FLOXANT prüft, ob der Service für Ihre Situation passt.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-white/5 bg-black/40 p-4 shadow-2xl backdrop-blur-xl">
                        <SmartBookingWizard
                            dict={{
                                common: dict.common,
                                calculator: dict.calculator,
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 px-6 py-16">
                <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { href: "/entruempelung", label: "Entrümpelung als Hauptservice" },
                        { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt für kleine Mengen" },
                        { href: "/firmenentsorgung", label: "Firmenentsorgung ohne Sonderabfall" },
                        { href: "/rechner", label: "Rechner als Einstieg" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-red-500/40 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
