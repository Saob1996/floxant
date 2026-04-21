import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Calendar, Clock, PhoneCall, Zap } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { company } from "@/lib/company";
import {
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
    buildServiceJsonLd,
    buildWebPageJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "express-anfrage",
        title: "Express-Anfrage Bayern | Kurzfristig Umzug & Reinigung",
        description:
            "Kurzfristiger Umzug, Express-Reinigung oder Räumung in Regensburg und Bayern. FLOXANT prüft Ihre Anfrage schnell auf realistische Machbarkeit.",
    });
}

export default async function ExpressPage() {
    const dict = await getDictionary("de");

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Express Anfrage" },
    ];

    const faqItems = [
        {
            q: "Wie schnell reagiert FLOXANT auf eine Express-Anfrage?",
            a: "Bei Express-Anfragen priorisieren wir die Kapazitätsprüfung. In der Regel erhalten Sie innerhalb kurzer Zeit eine Rückmeldung zur Machbarkeit in Regensburg oder Bayern.",
        },
        {
            q: "Für welche Situationen ist der Express-Service gedacht?",
            a: "Für kurzfristige Wohnungsübergaben, Ausfall von anderen Dienstleistern oder dringende Räumungen nach einem Immobilienverkauf.",
        },
        {
            q: "Zahle ich bei einer Express-Anfrage einen Aufpreis?",
            a: "Da wir Personal und Fahrzeuge oft kurzfristig umdisponieren müssen, können je nach Dringlichkeit Express-Zuschläge anfallen. Diese werden vorab transparent kommuniziert.",
        },
        {
            q: "Welche Zusage gibt es bei einer Notfall-Anfrage?",
            a: "FLOXANT prüft ehrlich und kommuniziert klar, ob Termin, Team und Fahrzeug realistisch verfügbar sind. Wir machen keine falschen Versprechungen.",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Express Anfrage", item: "/express-anfrage" },
            ]),
            buildServiceJsonLd({
                name: "Express-Anfrage in Regensburg und Bayern",
                description:
                    "Schnelle Machbarkeitsprüfung für kurzfristige Umzüge, Reinigungen und Räumungen mit FLOXANT.",
                path: "/express-anfrage",
                areaServed: ["Regensburg", "Bayern"],
            }),
            buildWebPageJsonLd({
                name: "Express Anfrage | FLOXANT",
                description:
                    "Definition, Grenzen und direkte Anfrage für kurzfristige Einsätze in Regensburg und Bayern.",
                path: "/express-anfrage",
                about: ["Express-Anfrage", "Kurzfristiger Umzug", "Regensburg", "Bayern"],
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
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_50%)]" />
                <div className="mx-auto max-w-6xl text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-blue-400">
                        <Clock size={14} className="text-blue-500/60" />
                        Express Anfrage Bayern
                    </div>
                    <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl text-white">
                        Express-Anfrage & Notfall-Service in Regensburg & Bayern
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/50">
                        Wenn Zeitfenster kippen und schnelle Ergebnisse zählen: FLOXANT prüft kurzfristige Umzüge, Reinigungen und Räumungen mit priorisierter Kapazitätslogik. Wir bieten eine verlässliche Anlaufstelle für Notfall-Einsätze auf dem gewohnt hohen Premium-Niveau in ganz Bayern.
                    </p>
                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/rechner"
                            className="inline-flex h-14 items-center justify-center rounded-xl bg-blue-600 px-10 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-500"
                        >
                            Express-Anfrage starten
                        </Link>
                        <a
                            href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-white/10 px-10 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
                        >
                            <PhoneCall size={16} />
                            WhatsApp Sofort-Check
                        </a>
                    </div>
                </div>
            </section>

            <section className="border-y border-white/5 bg-white/[0.01] px-6 py-20">
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                    {[
                        { icon: Zap, title: "Was ist das?", text: "Ein priorisierter Einstieg für knappe Zeitfenster und schnelle Machbarkeitsprüfung." },
                        { icon: Calendar, title: "Für wen?", text: "Für Kunden mit kurzfristigen Übergaben, Ausfällen oder sehr engem Terminrahmen." },
                        { icon: AlertCircle, title: "Welche Grenzen gelten?", text: "Express ist nur sinnvoll, wenn Team, Fahrzeuge und regionale Machbarkeit real vorhanden sind." },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                                <Icon className="mb-5 h-8 w-8 text-blue-400" />
                                <h2 className="mb-3 text-xl font-bold">{item.title}</h2>
                                <p className="text-white/60">{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-3xl font-bold">Häufige Fragen zur Express-Anfrage</h2>
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
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <h2 className="mb-12 text-3xl font-bold">Jetzt Express-Status anfragen</h2>
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
                        { href: "/umzug", label: "Umzug als Hauptservice" },
                        { href: "/reinigung", label: "Reinigung als Hauptservice" },
                        { href: "/entruempelung", label: "Entrümpelung als Hauptservice" },
                        { href: "/service-area-bayern", label: "Servicegebiet Bayern" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-2xl border border-white/10 bg-[#0B0B14] px-6 py-4 font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
