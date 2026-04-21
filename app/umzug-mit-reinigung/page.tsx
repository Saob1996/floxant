import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Key, ShieldCheck, Sparkles, Truck } from "lucide-react";

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
        path: "umzug-mit-reinigung",
        title: "Umzug mit Reinigung Bayern | Übergabe klar koordiniert",
        description:
            "Kombinieren Sie Umzug und professionelle Endreinigung mit FLOXANT in Regensburg und ganz Bayern. Abgestimmte Projekttermine für eine stressfreie Übergabe.",
    });
}

export default async function AllInPage() {
    const dict = await getDictionary("de");

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Umzug mit Reinigung" },
    ];

    const faqItems = [
        {
            q: "Welche Vorteile bietet der Umzug mit Endreinigung?",
            a: "Durch die Kombination entfällt die Koordination zweier unterschiedlicher Gewerke. FLOXANT taktet die Reinigung direkt im Anschluss an die Beladung, sodass das Objekt zeitnah übergabebereit ist.",
        },
        {
            q: "Ist eine Endreinigung für die Übergabe möglich?",
            a: "Ja, wir fokussieren uns auf fachgerechte Reinigungsstandards, die für die Übergabe an Vermieter oder Käufer in Bayern üblich sind.",
        },
        {
            q: "Wann unterscheidet sich der Kombi-Service vom Standard-Umzug?",
            a: "Der Standard-Umzug endet mit der Entladung. Der Kombi-Service umfasst zusätzlich die vollständige Reinigung des Auszugsobjekts, oft noch am selben oder am Folgetag.",
        },
        {
            q: "Für wen ist dieser Service in Regensburg und Bayern besonders geeignet?",
            a: "Für Mieter mit engen Kündigungsfristen, vielbeschäftigte Fachkräfte und Immobilienbesitzer, die eine schlüsselfertige Lösung für den Objektwechsel suchen.",
        },
        {
            q: "Wie funktioniert die Abstimmung der Termine?",
            a: "In unserem Intake-Prozess erfassen wir sowohl das Umzugsvolumen als auch die Flächenart. Unser System berechnet daraufhin den optimalen Zeitplan für beide Phasen.",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Umzug mit Reinigung", item: "/umzug-mit-reinigung" },
            ]),
            buildServiceJsonLd({
                name: "Umzug mit Reinigung in Regensburg und Bayern",
                description:
                    "Abgestimmte Kombination aus Umzug und Endreinigung mit FLOXANT.",
                path: "/umzug-mit-reinigung",
                areaServed: ["Regensburg", "Bayern"],
            }),
            buildWebPageJsonLd({
                name: "Umzug mit Reinigung | FLOXANT",
                description:
                    "Definition, Ablauf und Anfrage für die Kombination aus Umzug und Reinigung in Regensburg und Bayern.",
                path: "/umzug-mit-reinigung",
                about: ["Umzug", "Reinigung", "Regensburg", "Bayern", "Endreinigung"],
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
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_50%)]" />
                <div className="mx-auto max-w-6xl text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                        <Sparkles size={14} className="text-emerald-500/60" />
                        Kombi-Service Bayern
                    </div>
                    <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl text-white">
                        Umzug mit Endreinigung in Regensburg & Bayern
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/50">
                        FLOXANT bündelt Transportlogistik und Reinigungskompetenz zu einem nahtlosen All-in-One Service. Wir lösen das operative Problem der doppelten Koordination und bereiten Ihr Objekt fachgerecht für die Übergabe in Bayern vor.
                    </p>
                </div>
            </section>

            <section className="border-y border-white/5 px-6 py-20">
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        { icon: Truck, title: "Was ist das?", text: "Ein koordinierter Ablauf aus Beladung, Transport und anschließender Reinigung." },
                        { icon: Sparkles, title: "Für wen?", text: "Für Auszüge mit direkter Übergabe oder wenn Vermietung und Transport eng getaktet sind." },
                        { icon: ShieldCheck, title: "Wann sinnvoll?", text: "Wenn zwei Gewerke nicht getrennt organisiert werden sollen und Zeitverluste vermieden werden müssen." },
                        { icon: Key, title: "Wie läuft es ab?", text: "Erst Umzug planen, dann Reinigungsumfang definieren und den Ablauf am selben Projekttag aufeinander abstimmen." },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                                <Icon className="mb-5 h-8 w-8 text-emerald-400" />
                                <h2 className="mb-3 text-xl font-bold tracking-tight">{item.title}</h2>
                                <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-3xl font-bold">Häufige Fragen zu Umzug mit Reinigung</h2>
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

            <section id="booking" className="py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold">Kombi-Service anfragen</h2>
                        <p className="mt-4 text-white/50">
                            Nutzen Sie den Rechner, wenn Umzug und Endreinigung gemeinsam geplant werden sollen.
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-1 shadow-2xl backdrop-blur-xl">
                        <div className="p-4 md:p-8">
                            <SmartBookingWizard
                                dict={{
                                    common: dict.common,
                                    calculator: dict.calculator,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 px-6 py-16">
                <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { href: "/umzug", label: "Standard-Umzug ansehen" },
                        { href: "/reinigung", label: "Reinigung als Hauptservice" },
                        { href: "/express-anfrage", label: "Kurzfristige Anfrage" },
                        { href: "/service-area-bayern", label: "Servicegebiet Bayern" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-emerald-500/40 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
