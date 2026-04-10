import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
    Building,
    CheckCircle2,
    Droplets,
    Home,
    MapPin,
    Sparkles,
    Stethoscope,
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

type ReinigungContent = {
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
        path: "reinigung",
        title: "Reinigung Bayern | Gebäudereinigung & Endreinigung mit FLOXANT",
        description:
            "Professionelle Reinigung in Bayern mit Fokus auf Regensburg. Endreinigung, Grundreinigung, Büroreinigung und Praxisreinigung zum Festpreis.",
    });
}

export default async function ReinigungPillarPage({ params }: PageProps) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;
    const dict = await getDictionary(pageLocale);
    const isDe = pageLocale === "de";

    const content = (dict.pages?.service_reinigung ?? {}) as ReinigungContent;

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
        { label: "Reinigung" },
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
                name: "Reinigung",
                item: `https://www.floxant.de/${pageLocale}/reinigung`,
            },
        ],
    };

    const cityLinks = [
        { href: `/${pageLocale}/reinigung-regensburg`, label: "Gebäudereinigung Regensburg" },
        { href: `/${pageLocale}/reinigung-muenchen`, label: "Gebäudereinigung München" },
        { href: `/${pageLocale}/reinigung-nuernberg`, label: "Gebäudereinigung Nürnberg" },
        { href: `/${pageLocale}/reinigung-augsburg`, label: "Gebäudereinigung Augsburg" },
        { href: `/${pageLocale}/reinigung-landshut`, label: "Gebäudereinigung Landshut" },
        { href: `/${pageLocale}/reinigung-passau`, label: "Gebäudereinigung Passau" },
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
                        <span>Glanzleistungen für Gewerbe und Immobilien</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        Professionelle <span className="text-primary">Reinigung</span> auf höchstem Niveau
                    </h1>

                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                        Von der intensiven Grundreinigung und Endreinigung bis hin zur
                        strukturierten Büro- und Praxisreinigung. FLOXANT ist Ihr
                        Reinigungsdienstleister für Bayern mit Fokus auf saubere Abläufe,
                        klare Leistungen und feste Preise.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="mb-16 text-center">
                        <Sparkles className="mx-auto mb-6 h-16 w-16 text-primary" />
                        <h2 className="mb-4 text-4xl font-bold tracking-tight">
                            Wohnungsreinigung & intensive Grundreinigung
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                            Die saubere Lösung, wenn eine oberflächliche Übergabe nicht reicht.
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-2">
                        <div className="rounded-3xl border bg-slate-50 p-10">
                            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                                <Home className="text-slate-800" />
                                Die professionelle Wohnungsreinigung
                            </h3>

                            <div className="prose text-slate-700">
                                <p>
                                    Nach dem Auszug bleiben oft Rückstände, die bei der
                                    Übergabe sofort auffallen. Unsere{" "}
                                    <strong>Wohnungsreinigung</strong> sichert eine
                                    belastbare Endreinigung vor Vermieter- oder
                                    Eigentümerabnahme.
                                </p>
                                <p>
                                    Dazu gehören Fenster und Rahmen, Flächenreinigung,
                                    Sanitärbereiche, Kalk- und Fettentfernung sowie
                                    kritische Zonen in Küche und Bad. Eine professionelle{" "}
                                    <strong>Wohnungsreinigung</strong> schützt Zeit,
                                    Nerven und oft auch die Kaution.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-10">
                            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-blue-900">
                                <Droplets className="text-blue-600" />
                                Die porentiefe Grundreinigung
                            </h3>

                            <div className="prose text-slate-700">
                                <p>
                                    Eine <strong>Grundreinigung</strong> geht deutlich
                                    weiter als reguläre Unterhaltsreinigung. Sie entfernt
                                    hartnäckige Rückstände, alte Pflegeschichten,
                                    Sanierungsstaub und stark belastete Ablagerungen.
                                </p>
                                <p>
                                    Wir bearbeiten auch schwer zugängliche Stellen wie
                                    Fugen, Heizkörper, Türblätter, Zargen und sensible
                                    Übergangsflächen. Eine saubere{" "}
                                    <strong>Grundreinigung</strong> ist besonders vor
                                    Einzug, Übergabe oder Wiedervermietung sinnvoll.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
                <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />

                <div className="container relative z-10 mx-auto max-w-6xl px-4">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="mb-2 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
                                B2B Facility Management
                            </div>

                            <h2 className="text-4xl font-bold tracking-tight">
                                Spezialisten für Praxisreinigung & Büroreinigung
                            </h2>

                            <div className="prose prose-lg text-slate-300">
                                <p>
                                    Gewerbliche Räume wirken direkt auf Kunden,
                                    Patienten und Mitarbeitende. Unsere{" "}
                                    <strong>Büroreinigung</strong> schafft eine saubere,
                                    produktive und repräsentative Umgebung mit klaren
                                    Intervallen und festen Standards.
                                </p>
                                <p>
                                    Die <strong>Praxisreinigung</strong> stellt höhere
                                    Anforderungen an Hygiene, Struktur und Dokumentation.
                                    Gerade in sensiblen Bereichen braucht es kontrollierte
                                    Abläufe statt improvisierter Reinigung.
                                </p>
                            </div>

                            <ul className="space-y-3 pt-6">
                                <li className="flex items-start gap-3 text-slate-200">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Reinigung außerhalb der Öffnungszeiten
                                </li>
                                <li className="flex items-start gap-3 text-slate-200">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Fest zugewiesenes, vertrauenswürdiges Reinigungspersonal
                                </li>
                                <li className="flex items-start gap-3 text-slate-200">
                                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" />
                                    Transparente Leistungsverzeichnisse und Qualitätsprotokolle
                                </li>
                            </ul>
                        </div>

                        <div className="grid gap-6">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                                <Building className="mb-4 h-10 w-10 text-primary" />
                                <h3 className="mb-2 text-2xl font-bold text-white">
                                    Büroreinigung
                                </h3>
                                <p className="text-slate-400">
                                    Schreibtische, Böden, Küchen, Konferenzräume und
                                    Sanitärbereiche. Strukturierte Reinigung für ein
                                    stabiles Arbeitsumfeld.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                                <Stethoscope className="mb-4 h-10 w-10 text-blue-400" />
                                <h3 className="mb-2 text-2xl font-bold text-white">
                                    Praxisreinigung
                                </h3>
                                <p className="text-slate-400">
                                    Höhere Hygienestandards, sensible Flächen und
                                    saubere Patientenzonen. Belastbare Reinigung für
                                    medizinisch geprägte Umgebungen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="booking" className="bg-white py-24">
                <div className="container px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
                            Fordern Sie Ihr Reinigungs-Angebot an
                        </h2>
                        <p className="text-lg text-slate-500">
                            Ob Endreinigung beim Auszug oder laufende Betreuung für
                            Büro und Gewerbe: Nutzen Sie den Konfigurator für eine
                            schnelle Preisschätzung.
                        </p>
                    </div>

                    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-white shadow-xl">
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
                <section className="border-t bg-slate-50 py-16">
                    <div className="container mx-auto max-w-5xl px-4 text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-tight">
                            Unsere Reinigungs-Standorte
                        </h2>
                        <p className="mx-auto mb-8 max-w-3xl text-slate-600">
                            Wir bieten unsere Reinigung lokal in Bayern mit eigenen
                            Einsatzteams und klaren Einsatzgebieten an.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {cityLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-xl border bg-white px-6 py-3 font-medium shadow-sm transition-all hover:border-primary hover:text-primary"
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