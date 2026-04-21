import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Banknote,
    CheckCircle2,
    Clock,
    MapPin,
    Package,
    ShieldCheck,
} from "lucide-react";

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
        path: "umzug",
        title: "Umzug Regensburg & Bayern | Privat, Gewerbe, Planung",
        description:
            "FLOXANT plant Umzüge in Regensburg und Bayern mit klarer Vorprüfung, Transport, Montageoptionen und nachvollziehbarem Preisrahmen.",
    });
}

export default async function UmzugPillarPage() {
    const dict = await getDictionary("de");

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Umzug" },
    ];

    const faqItems = [
        {
            q: "Was umfasst ein professioneller Umzug mit FLOXANT?",
            a: "FLOXANT plant Transport, Tragewege, Zeitfenster und zusätzliche Module wie Montage, Reinigung oder Entrümpelung in einem klaren Ablauf.",
        },
        {
            q: "Für wen ist der Service gedacht?",
            a: "Der Umzugsservice eignet sich für Privatkunden, Familien und Unternehmen, die in Regensburg oder Bayern einen planbaren Ortswechsel brauchen.",
        },
        {
            q: "Wann ist ein Umzugsunternehmen sinnvoll?",
            a: "Besonders sinnvoll ist es bei größerem Volumen, engen Zeitfenstern, schwierigen Tragewegen, Firmenumzügen oder wenn mehrere Zusatzleistungen aufeinander abgestimmt werden müssen.",
        },
        {
            q: "Wie startet die Anfrage?",
            a: "Am schnellsten über den FLOXANT Rechner. Dort erfassen Sie Strecke, Volumen und Zusatzleistungen und erhalten einen klaren Preisrahmen für die weitere Planung.",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Umzug", item: "/umzug" },
            ]),
            buildServiceJsonLd({
                name: "Umzug in Regensburg und Bayern",
                description:
                    "Planbare Privat- und Firmenumzüge mit FLOXANT in Regensburg, der Oberpfalz und ganz Bayern.",
                path: "/umzug",
                areaServed: ["Regensburg", "Bayern"],
            }),
            buildWebPageJsonLd({
                name: "Umzug in Regensburg und Bayern | FLOXANT",
                description:
                    "Service-Definition, Ablauf, Kostenfaktoren und direkte Anfrage für Umzüge mit FLOXANT.",
                path: "/umzug",
                about: ["Umzug", "Regensburg", "Bayern", "Privatumzug", "Firmenumzug"],
            }),
            buildFaqJsonLd(faqItems),
        ],
    };

    const cityLinks = [
        { href: "/umzug-regensburg", label: "Umzug Regensburg" },
        { href: "/umzug-muenchen", label: "Umzug München" },
        { href: "/umzug-nuernberg", label: "Umzug Nürnberg" },
        { href: "/umzug-augsburg", label: "Umzug Augsburg" },
        { href: "/umzug-ingolstadt", label: "Umzug Ingolstadt" },
        { href: "/umzug-weiden", label: "Umzug Weiden" },
    ];

    const serviceLinks = [
        { href: "/rechner", label: "Umzug direkt kalkulieren" },
        { href: "/beiladung", label: "Beiladung für Einzelmöbel prüfen" },
        { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
        { href: "/express-anfrage", label: "Express-Anfrage für kurzfristige Umzüge" },
        { href: "/anfrage-mit-preisrahmen", label: "Umzug mit Preisrahmen planen" },
        { href: "/service-area-bayern", label: "Servicegebiet Bayern ansehen" },
    ];

    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Breadcrumbs lang="de" items={breadcrumbs} />

            <section className="bg-gradient-to-b from-primary/5 to-background px-6 pb-20 pt-8">
                <div className="mx-auto max-w-6xl space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        <MapPin className="h-4 w-4" />
                        <span>Umzug mit Fokus auf Regensburg und Bayern</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                        Umzugsunternehmen für Regensburg und Bayern
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-400">
                        FLOXANT organisiert Privat- und Firmenumzüge mit klaren Zuständigkeiten, planbaren Zeitfenstern und sauber abgestimmten Zusatzleistungen. Diese Seite erklärt, für wen der Service gedacht ist, wann er sinnvoll wird und wie der Ablauf funktioniert.
                    </p>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        {
                            icon: Package,
                            title: "Was ist das?",
                            text: "Ein strukturierter Umzugsservice für Wohnungen, Häuser und Unternehmen mit klarer Einsatzplanung.",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Für wen?",
                            text: "Für Privatkunden, Familien, Firmen und Hausverwaltungen in Regensburg und Bayern.",
                        },
                        {
                            icon: Clock,
                            title: "Wann sinnvoll?",
                            text: "Wenn Volumen, Tragewege, Zeitfenster oder Zusatzleistungen sauber koordiniert werden müssen.",
                        },
                        {
                            icon: Banknote,
                            title: "Wie läuft es ab?",
                            text: "Erst Datenaufnahme, dann Preisrahmen, danach konkrete Einsatzplanung mit Transport, Team und optionalen Modulen.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                                <Icon className="mb-5 h-8 w-8 text-primary" />
                                <h2 className="mb-3 text-xl font-bold text-white">{item.title}</h2>
                                <p className="leading-relaxed text-slate-300">{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-slate-900 py-20">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="mb-8 text-4xl font-bold tracking-tight text-white">
                        Was FLOXANT beim Umzug vom Standard unterscheidet
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                            <h3 className="mb-4 text-2xl font-bold text-white">Klare Service-Definition</h3>
                            <p className="text-slate-300">
                                FLOXANT ist nicht nur Transport. Der Service deckt auf Wunsch Planung, Tragearbeit, Schutzmaterial, Montage, Reinigung und Entrümpelung in einer abgestimmten Reihenfolge ab.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                            <h3 className="mb-4 text-2xl font-bold text-white">Regionale Relevanz</h3>
                            <p className="text-slate-300">
                                Der Schwerpunkt liegt auf Regensburg und Bayern. Das hilft bei kurzen Wegen, realistischen Zeitfenstern und sinnvollen Empfehlungen für Standort, Strecke und Zusatzservices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-white/5 bg-slate-950/50 py-20">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="mb-8 text-4xl font-bold tracking-tight text-white">
                        Kostenfaktoren, die für den Preisrahmen zählen
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <h3 className="mb-4 text-xl font-bold text-white">Wichtige Faktoren</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li>Volumen und Objektgröße</li>
                                <li>Strecke zwischen Start und Ziel</li>
                                <li>Stockwerke, Aufzug und Tragewege</li>
                                <li>Montage, Verpackung und Halteverbotszonen</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-8 text-white">
                            <h3 className="mb-4 text-xl font-bold text-primary">Warum der Rechner wichtig ist</h3>
                            <p className="text-slate-300">
                                Der FLOXANT Rechner sammelt genau die Informationen, die für einen belastbaren Preisrahmen und spätere Einsatzplanung wirklich zählen. So entsteht keine Keyword-Fassade, sondern eine nutzbare Anfragebasis.
                            </p>
                            <Link
                                href="/rechner"
                                className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline"
                            >
                                Zum Rechner
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-3xl font-bold text-white">Häufige Fragen zum Umzug</h2>
                    <div className="space-y-6">
                        {faqItems.map((item) => (
                            <div key={item.q} className="rounded-3xl border border-white/10 bg-[#0B0B14] p-8">
                                <h3 className="mb-4 text-xl font-bold text-white">{item.q}</h3>
                                <p className="text-slate-300">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="booking" className="bg-slate-900 py-24 border-t border-white/5">
                <div className="container px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                            Umzug in Regensburg oder Bayern anfragen
                        </h2>
                        <p className="text-lg text-slate-400">
                            Nutzen Sie den Rechner für einen klaren Preisrahmen und eine saubere Einsatzvorbereitung.
                        </p>
                    </div>
                    <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0C10] p-1 shadow-2xl">
                        <div className="relative z-10 p-4 md:p-8">
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

            <section className="border-t border-white/5 bg-slate-950 py-16">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Wichtige interne Einstiege rund um den Umzug
                        </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {serviceLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-slate-300 transition-all hover:border-primary hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 bg-slate-950 py-16">
                <div className="container mx-auto max-w-6xl px-4 text-center">
                    <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
                        Umzug lokal in wichtigen Regionen
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {cityLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-300 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
