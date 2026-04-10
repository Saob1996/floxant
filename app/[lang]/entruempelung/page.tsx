import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
    Building2,
    CheckCircle2,
    Home,
    Leaf,
    MapPin,
    Shield,
    Trash2,
} from "lucide-react";

import { type Locale, isValidLocale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SmartBookingWizard = dynamic(
    () =>
        import("@/components/SmartBookingWizard").then((mod) => ({
            default: mod.SmartBookingWizard,
        })),
    { loading: () => <div className="mx-auto min-h-[400px] w-full max-w-5xl" /> }
);

type PageProps = {
    params: Promise<{ lang: string }>;
};

type FaqItem = {
    q?: string;
    a?: string;
};

type EntruempelungContent = {
    faqs?: FaqItem[];
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    await getDictionary(pageLocale);

    return generatePageSEO({
        pageLocale,
        path: "entruempelung",
        title: "Entrümpelung Bayern | Wohnungsauflösung & Räumung mit FLOXANT",
        description:
            "Professionelle Entrümpelung in Bayern mit Fokus auf Regensburg. Wohnungsauflösung, Kellerentrümpelung und Firmenräumung zum Festpreis.",
    });
}

export default async function EntruempelungPillarPage({ params }: PageProps) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const isDe = pageLocale === "de";

    const content = (dict.pages?.service_entruempelung ?? {}) as EntruempelungContent;

    const faqItems = Array.isArray(content.faqs)
        ? content.faqs.filter(
            (item): item is Required<FaqItem> =>
                Boolean(item?.q?.trim()) && Boolean(item?.a?.trim())
        )
        : [];

    const faqJsonLd =
        faqItems.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((item) => ({
                    "@type": "Question",
                    name: item.q,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.a,
                    },
                })),
            }
            : null;

    const breadcrumbs = [
        { label: "Home", href: `/${pageLocale}` },
        { label: "Entrümpelung" },
    ];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `https://www.floxant.de/${pageLocale}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Entrümpelung",
                item: `https://www.floxant.de/${pageLocale}/entruempelung`,
            },
        ],
    };

    const cityLinks = [
        { href: `/${pageLocale}/entruempelung-regensburg`, label: "Entrümpelung Regensburg" },
        { href: `/${pageLocale}/entruempelung-muenchen`, label: "Entrümpelung München" },
        { href: `/${pageLocale}/entruempelung-nuernberg`, label: "Entrümpelung Nürnberg" },
        { href: `/${pageLocale}/entruempelung-augsburg`, label: "Entrümpelung Augsburg" },
        { href: `/${pageLocale}/entruempelung-landshut`, label: "Entrümpelung Landshut" },
        { href: `/${pageLocale}/entruempelung-passau`, label: "Entrümpelung Passau" },
    ];

    return (
        <main className="min-h-screen bg-background">
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Breadcrumbs lang={pageLocale} items={breadcrumbs} />

            <section className="bg-gradient-to-b from-muted/20 to-background px-6 pb-20 pt-8">
                <div className="mx-auto max-w-7xl space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        <MapPin className="h-4 w-4" />
                        <span>Ihr Experte für Räumungen in Bayern</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        Professionelle <span className="text-primary">Entrümpelung</span> & Auflösung
                    </h1>

                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                        Wir schaffen Platz. Ob Wohnungsauflösung, Firmenräumung oder
                        Kellerentrümpelung: FLOXANT räumt schnell, diskret, umweltbewusst
                        und hinterlässt Objekte besenrein.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight">
                                Wohnungsauflösung: taktvoll und zuverlässig entrümpeln
                            </h2>

                            <div className="prose prose-lg text-slate-700">
                                <p>
                                    Eine <strong>Wohnungsauflösung</strong> ist oft mit
                                    emotionalem und organisatorischem Druck verbunden.
                                    Gerade nach Todesfällen, Heimumzug oder langen
                                    Problemverhältnissen wird die Räumung schnell zur
                                    Belastung.
                                </p>
                                <p>
                                    FLOXANT übernimmt die komplette{" "}
                                    <strong>Entrümpelung</strong> diskret, strukturiert
                                    und besenrein. Auf Wunsch trennen wir persönliche
                                    Unterlagen, sortieren verwertbare Gegenstände und
                                    organisieren den zügigen Abtransport ohne unnötige
                                    Unruhe im Umfeld.
                                </p>
                            </div>
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-xl">
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                <Home className="h-32 w-32 text-slate-300" />
                            </div>
                            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-bold text-primary shadow backdrop-blur">
                                <Shield className="h-5 w-5" />
                                Diskret & Besenrein
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 py-20 text-white">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold tracking-tight">
                            Hausentrümpelung und Kellerentrümpelung
                        </h2>
                        <p className="text-xl text-slate-400">
                            Vom Dachboden bis zum hintersten Kellerraum.
                        </p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-2">
                        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 transition-colors hover:border-primary/50">
                            <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                                <Home className="h-8 w-8 text-primary" />
                                Die komplette Hausentrümpelung
                            </h3>

                            <p className="mb-6 leading-relaxed text-slate-300">
                                Eine <strong>Hausentrümpelung</strong> betrifft oft ganze
                                Immobilien vor Verkauf, Sanierung oder Übergabe. Wir
                                räumen Möbel, Einbauten, Dachbodeninhalte, Kellerräume
                                und Nebenzonen strukturiert und schnell.
                            </p>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Demontage von Einbauten
                                </li>
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Fachgerechte Wertstofftrennung
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 transition-colors hover:border-primary/50">
                            <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                                <Trash2 className="h-8 w-8 text-primary" />
                                Die schnelle Kellerentrümpelung
                            </h3>

                            <p className="mb-6 leading-relaxed text-slate-300">
                                Eine <strong>Kellerentrümpelung</strong> befreit von
                                Sperrmüll, feuchten Kartons, alten Möbeln und belasteten
                                Resten nach Wasserschaden oder Vernachlässigung. Oft ist
                                die Räumung in wenigen Stunden abgeschlossen.
                            </p>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Schnelle Umsetzung
                                </li>
                                <li className="flex items-start gap-3 text-slate-300">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Sperrmüllentsorgung & Abtransport
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b bg-slate-50 py-20">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="order-2 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-xl lg:order-1">
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                                <Building2 className="h-32 w-32 text-primary/40" />
                            </div>
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 z-20 text-white">
                                <p className="text-xl font-bold">Sichere Firmenauflösung</p>
                            </div>
                        </div>

                        <div className="order-1 space-y-6 lg:order-2">
                            <div className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary">
                                B2B & Gewerbe
                            </div>

                            <h2 className="text-4xl font-bold tracking-tight">
                                Akten, IT & Schrott: die Firmenentrümpelung
                            </h2>

                            <div className="prose prose-lg text-slate-700">
                                <p>
                                    Die gewerbliche <strong>Firmenentrümpelung</strong>
                                    verlangt Tempo, Präzision und saubere Prozesse.
                                    Arbeitsplätze, Alttechnik, Lagerreste und schwere
                                    Einbauten müssen kontrolliert entfernt werden.
                                </p>
                                <p>
                                    FLOXANT organisiert die{" "}
                                    <strong>Firmenentrümpelung</strong> rechtssicher und
                                    strukturiert. Dazu gehören auf Wunsch auch sensible
                                    Materialien, dokumentierte Entsorgungswege und die
                                    besenreine Übergabe für Rückbau oder Neuvermietung.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                                <Leaf className="h-10 w-10 shrink-0 text-emerald-500" />
                                <p className="text-sm text-emerald-900">
                                    <strong>Zertifizierte Entsorgung:</strong> Jede
                                    Entrümpelung erfolgt unter Einhaltung deutscher
                                    Entsorgungsrichtlinien und sauberer Wertstofftrennung.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="booking" className="bg-white py-24">
                <div className="container px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">
                            Entrümpelungs-Kosten online berechnen
                        </h2>
                        <p className="text-lg text-slate-500">
                            Wir erstellen ein klares Festpreisangebot für
                            Wohnungsauflösung, Kellerentrümpelung oder Firmenräumung.
                        </p>
                    </div>

                    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-slate-50 text-slate-900 shadow-sm">
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

            {isDe && (
                <section className="bg-slate-900 py-16 text-white">
                    <div className="container mx-auto max-w-5xl px-4 text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-tight">
                            Unsere Entrümpelungsservices vor Ort
                        </h2>
                        <p className="mx-auto mb-8 max-w-3xl text-slate-400">
                            Besenreine Räumungen und Wohnungsauflösungen bieten wir
                            flächendeckend in Bayern an.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {cityLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium transition-all hover:border-primary hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}