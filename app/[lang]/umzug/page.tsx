import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
    Banknote,
    CheckCircle2,
    Clock,
    MapPin,
    Package,
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

type UmzugContent = {
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
        path: "umzug",
        title: "Umzugsunternehmen Bayern | Professioneller Umzug mit FLOXANT",
        description:
            "Professionelles Umzugsunternehmen in Bayern mit Fokus auf Regensburg. Transparente Festpreise, planbare Abläufe und zuverlässiger Umzugsservice.",
    });
}

export default async function UmzugPillarPage({ params }: PageProps) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const isDe = pageLocale === "de";

    const content = (dict.pages?.service_umzug ?? {}) as UmzugContent;

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
        { label: "Umzug" },
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
                name: "Umzug",
                item: `https://www.floxant.de/${pageLocale}/umzug`,
            },
        ],
    };

    const trustItems = [
        "Kostenlose und unverbindliche Vorabbesichtigung zur genauen Kalkulation",
        "Transparenter Kostenvoranschlag mit Festpreisgarantie",
        "Abgeschlossene Transport- und Verkehrshaftungsversicherung",
        "Bereitstellung von professionellem Umzugsmaterial",
        "Eigene, geschulte Handwerker und Möbelpacker",
        "Zusatzleistungen wie Entrümpelung oder Endreinigung aus einer Hand",
    ];

    const cityLinks = [
        { href: `/${pageLocale}/umzug-regensburg`, label: "Umzugsfirma Regensburg" },
        { href: `/${pageLocale}/umzug-muenchen`, label: "Umzugsfirma München" },
        { href: `/${pageLocale}/umzug-nuernberg`, label: "Umzugsfirma Nürnberg" },
        { href: `/${pageLocale}/umzug-augsburg`, label: "Umzugsfirma Augsburg" },
        { href: `/${pageLocale}/umzug-ingolstadt`, label: "Umzugsfirma Ingolstadt" },
        { href: `/${pageLocale}/umzug-weiden`, label: "Umzugsfirma Weiden" },
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
                        <span>Ihr Leitfaden für den perfekten Wohnortwechsel</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        Das Kompetenzzentrum für Ihren{" "}
                        <span className="text-primary">Umzug</span>
                    </h1>

                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                        Ein Umzug ist ein komplexes logistisches Projekt. Erfahren
                        Sie hier alles über professionelle Umzugsunternehmen,
                        transparente Umzugskosten, Full-Service-Leistungen und wie
                        Sie Ihren Umzug sauber planen. FLOXANT ist Ihr Partner für
                        planbare Umzüge in Bayern.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="mb-8 text-4xl font-bold tracking-tight">
                        Wie Sie das richtige Umzugsunternehmen finden
                    </h2>

                    <div className="prose prose-lg max-w-none text-slate-700">
                        <p>
                            Der Markt der <strong>Umzugsunternehmen</strong> ist
                            groß, unübersichtlich und nicht immer seriös. Die Suche
                            nach der richtigen <strong>Umzugsfirma</strong> erfordert
                            daher eine nüchterne Prüfung der Anbieter. Ein seriöses{" "}
                            <em>Umzugsunternehmen in Bayern</em> zeichnet sich durch
                            klare Prozesse, feste Teams, einen gepflegten Fuhrpark,
                            Versicherungen und nachvollziehbare Preise aus.
                        </p>

                        <p>
                            Wenn Sie eine <strong>Umzug Firma</strong> beauftragen,
                            überlassen Sie Dritten Ihren gesamten Hausrat. Genau
                            deshalb zählt nicht Werbung, sondern Struktur. FLOXANT
                            arbeitet mit klaren Abläufen und Festpreisen statt mit
                            intransparenten Nachforderungen.
                        </p>

                        <h3>Merkmale eines professionellen Umzugsunternehmens in Bayern</h3>

                        <ul className="grid list-none gap-4 ps-0 md:grid-cols-2">
                            {trustItems.map((item, idx) => (
                                <li key={idx} className="mb-0 flex gap-3">
                                    <div className="mt-1 shrink-0 rounded-full bg-green-100 p-1 text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="border-y bg-slate-50 py-20">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="mb-8 text-4xl font-bold tracking-tight">
                        Den perfekten Umzug planen mit unserem Umzugsservice
                    </h2>

                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="relative mb-6 overflow-hidden rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-[100px] bg-primary/5" />
                                <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                                    <Clock className="h-6 w-6 text-primary" />
                                    Umzug planen: Das Timing
                                </h3>
                                <p className="text-slate-600">
                                    Erfolgreiche Logistik beginnt lange vor dem
                                    eigentlichen Umzugstag. Wer den Umzug früh plant,
                                    Verträge sauber organisiert und parallel
                                    vorsortiert, senkt Kosten, reduziert Stress und
                                    vermeidet operative Reibung.
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-[100px] bg-primary/5" />
                                <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                                    <Package className="h-6 w-6 text-primary" />
                                    Der richtige Umzugsservice
                                </h3>
                                <p className="text-slate-600">
                                    Nicht jeder Umzug ist gleich. Ein professioneller
                                    Umzugsservice ist modular: Transport, Packservice,
                                    Möbelmontage oder Full Service. FLOXANT richtet
                                    den Leistungsumfang nach Budget, Zeitfenster und
                                    Objektstruktur aus.
                                </p>
                            </div>
                        </div>

                        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl lg:h-full lg:max-h-[600px]">
                            <div className="absolute inset-0 bg-slate-800" />
                            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/90 to-primary/40 mix-blend-multiply" />
                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 text-white">
                                <h3 className="mb-4 text-3xl font-bold">
                                    Masterplan statt Chaos
                                </h3>
                                <p className="text-lg text-white/90">
                                    Ein professionell geplanter Umzug schont nicht nur
                                    das Inventar, sondern vor allem Ihre Zeit und
                                    Nerven.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="mb-12 text-center">
                        <Banknote className="mx-auto mb-6 h-16 w-16 text-primary" />
                        <h2 className="mb-4 text-4xl font-bold tracking-tight">
                            Zusammensetzung der Umzugskosten
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Transparenz statt böser Überraschungen.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none text-center text-slate-700">
                        <p>
                            Einer der häufigsten Suchbegriffe lautet{" "}
                            <strong>Umzug Kosten</strong>. Pauschalen wirken
                            verlockend, sind aber selten belastbar. Ein seriöses{" "}
                            <strong>Umzugsunternehmen in Bayern</strong> kalkuliert
                            erst dann sauber, wenn Volumen, Distanz, Tragewege und
                            Zusatzleistungen klar sind.
                        </p>

                        <div className="mt-12 grid gap-8 text-left md:grid-cols-2">
                            <div className="rounded-2xl border bg-slate-50 p-8">
                                <h3 className="mt-0 text-xl font-bold">
                                    Faktoren für die Umzugskosten
                                </h3>
                                <ul>
                                    <li>
                                        <strong>Transportvolumen:</strong> Wie viel
                                        Möbel- und Hausrat muss transportiert werden?
                                    </li>
                                    <li>
                                        <strong>Distanz:</strong> Nahumzug oder
                                        Fernumzug?
                                    </li>
                                    <li>
                                        <strong>Tragewege & Stockwerke:</strong> Aufzug,
                                        Laufwege, enge Treppenhäuser, Parklage.
                                    </li>
                                    <li>
                                        <strong>Zusatzleistungen:</strong> Montage,
                                        Packservice, Halteverbotszone, Entrümpelung.
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground shadow-xl">
                                <h3 className="mt-0 text-xl font-bold text-white">
                                    Die FLOXANT Festpreis-Logik
                                </h3>
                                <p className="text-primary-foreground/90">
                                    Um unklare Umzugskosten zu vermeiden, erfassen wir
                                    die relevanten Faktoren vorab strukturiert.
                                </p>
                                <p className="mt-4 font-bold text-primary-foreground/90">
                                    Ergebnis: planbarer Festpreis ohne versteckte
                                    Nachforderungen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {isDe && (
                <section className="bg-white py-20">
                    <div className="container mx-auto max-w-5xl px-4 text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-tight">
                            Unser Umzugsunternehmen in Ihrer Region
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-slate-600">
                            Als Umzugsunternehmen in Bayern bedienen wir zahlreiche
                            Städte und Regionen mit eigenen Einsatzteams.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {cityLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-xl border bg-slate-50 px-6 py-3 font-medium transition-all hover:border-primary hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section id="booking" className="border-t bg-slate-900 py-24">
                <div className="container px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                            Berechnen Sie jetzt Ihre Umzugskosten
                        </h2>
                        <p className="text-lg text-slate-400">
                            Fordern Sie Ihr unverbindliches Angebot an. In wenigen
                            Minuten übermitteln Sie die wichtigsten Eckdaten.
                        </p>
                    </div>

                    <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl">
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
        </main>
    );
}