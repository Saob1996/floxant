import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { TrustStack } from "@/components/TrustStack";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
    MapPin,
    Milestone,
    Layers,
    Award,
    ArrowRight,
    Shield,
    CheckCircle2,
} from "lucide-react";

const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    {
        loading: () => (
            <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" />
        ),
    }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: pageLocale } = await params;
    const dict = (await getDictionary(pageLocale as Locale)) as any;
    const metaTitle = dict.pages?.umzug_nuernberg?.meta_title || "Umzugsunternehmen Nürnberg ✓ Festpreis ✓ Versichert | FLOXANT";
    const metaDesc = dict.pages?.umzug_nuernberg?.meta_desc || "Professionelles Umzugsunternehmen in Nürnberg & Franken. Jetzt Angebot anfragen!";

    return generatePageSEO({
        pageLocale: pageLocale as Locale,
        path: "umzug-nuernberg",
        title: metaTitle,
        description: metaDesc,
    });
}

export default async function UmzugNuernberg({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang: pageLocale } = await params;
    const dict = await getDictionary(pageLocale as Locale);
    const dictionary = dict as any;
    const content = dictionary?.pages?.service_umzug || {};

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: content.faqs?.[0]?.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        content.faqs?.[0]?.a,
                },
            },
            {
                "@type": "Question",
                name:
                    content.faqs?.[1]?.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        content.faqs?.[1]?.a,
                },
            },
            {
                "@type": "Question",
                name:
                    content.faqs?.[2]?.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        content.faqs?.[2]?.a,
                },
            },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "@id": `https://www.floxant.de/${pageLocale}/umzug-nuernberg#localbusiness`,
        name: "FLOXANT Umzug Nürnberg",
        description:
            "Professionelles Umzugsunternehmen für Nürnberg. Privatumzug, Firmenumzug, Fernumzug, Entrümpelung und Reinigung mit Festpreis und versichertem Transport.",
        url: `https://www.floxant.de/${pageLocale}/umzug-nuernberg`,
        telephone: "+4915771105087",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Nürnberg",
            addressRegion: "Bayern",
            addressCountry: "DE",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 49.452,
            longitude: 11.0767,
        },
        areaServed: [
            { "@type": "City", name: "Nürnberg" },
            { "@type": "AdministrativeArea", name: "Mittelfranken" },
            { "@type": "City", name: "Fürth" },
            { "@type": "City", name: "Erlangen" },
            { "@type": "City", name: "Schwabach" },
            { "@type": "City", name: "Feucht" },
        ],
        priceRange: "$$",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "134",
            bestRating: "5",
        },
    };

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Umzugsunternehmen Nürnberg",
        serviceType: "Umzug, Transport, Entrümpelung, Reinigung",
        provider: {
            "@type": "LocalBusiness",
            name: "FLOXANT Umzug Nürnberg",
            telephone: "+4915771105087",
        },
        areaServed: {
            "@type": "City",
            name: "Nürnberg",
        },
    };

    const breadcrumbsJsonLd = {
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
                name: "Umzug Bayern",
                item: `https://www.floxant.de/${pageLocale}/umzug-bayern`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Umzug Nürnberg",
                item: `https://www.floxant.de/${pageLocale}/umzug-nuernberg`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs
                pageLocale={pageLocale}
                items={[
                    { label: "Umzug Bayern", href: `/${pageLocale}/umzug-bayern` },
                    { label: "Umzug Nürnberg" },
                ]}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
            />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Nürnberg & Mittelfranken</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        {dict.pages?.umzug_nuernberg?.hero_h1 || "Umzugsunternehmen in "} <span className="text-primary">{dict.pages?.umzug_nuernberg?.hero_h1_highlight || "Nürnberg"}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {dictionary?.pages?.umzug_nuernberg?.hero_text}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            {dictionary?.calculator?.insured_tag}
                        </span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-primary" />
                            {dictionary?.calculator?.inspection_tag}
                        </span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            {dictionary?.calculator?.fixed_price_tag}
                        </span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            Ihr verlässlicher Umzug in Nürnberg
                        </h2>
                        <p>
                            Nürnberg verbindet historische Altstadt mit moderner
                            Wirtschaftsregion. Ob in Sankt Johannis, Gostenhof, Zerzabelshof
                            oder Langwasser – wir kennen die logistischen Anforderungen der
                            fränkischen Metropole genau. Enge Höfe, Altbau-Treppenhäuser,
                            Aufzugstermine und Ladezonen organisieren wir strukturiert und
                            effizient.
                        </p>
                        <p>
                            Ein Umzug ist mehr als nur der Transport von Kartons. Es ist ein
                            Neustart. FLOXANT setzt alles daran, Ihren Wohnungswechsel so
                            stressfrei wie möglich zu gestalten. Neben dem Möbeltransport
                            bieten wir in Nürnberg auch Demontage- und Montagearbeiten,
                            Einpackservice sowie hochwertiges Verpackungsmaterial an.
                        </p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic mt-6">
                            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                {dictionary?.common?.transparency_start}
                            </h4>
                            <p className="m-0 text-sm">
                                Nach einer kostenlosen, oft virtuellen Besichtigung erhalten
                                Sie ein verbindliches Festpreisangebot. Keine versteckten
                                Gebühren, keine offenen Stundensätze, keine Überraschungen am
                                Umzugstag.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">
                            Unsere Kompetenzen für Nürnberg
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    {dictionary?.common?.local_expertise}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Kenntnis der örtlichen Gegebenheiten, Treppenhäuser,
                                    Ladezonen und Halteverbots-Beantragung direkt in Nürnberg.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Shield className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    {dictionary?.common?.full_insurance}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {dictionary?.common?.full_insurance_desc}
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    {dictionary?.calculator?.fixed_price_tag}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Verbindliche Angebote nach kostenloser Besichtigung. Keine
                                    versteckten Kosten, keine Nachverhandlungen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            {dictionary?.common?.extra_services_relocation}
                        </h2>
                        <p>
                            Wer nach Nürnberg zieht oder die Stadt verlässt, muss oft auch alte
                            Möbel entsorgen. FLOXANT bietet dafür professionelle{" "}
                            <Link
                                href={`/${pageLocale}/entruempelung-nuernberg`}
                                className="font-semibold hover:text-primary transition-colors"
                            >
                                Entrümpelung in Nürnberg
                            </Link>{" "}
                            sowie strukturierte Lösungen für Wohnungsauflösungen und
                            besenreine Übergaben.
                        </p>
                        <p>
                            Zusätzlich organisieren wir auf Wunsch auch die{" "}
                            <Link
                                href={`/${pageLocale}/reinigung-nuernberg`}
                                className="font-semibold hover:text-primary transition-colors"
                            >
                                Reinigung in Nürnberg
                            </Link>{" "}
                            für eine saubere und stressfreie Wohnungs- oder Büroübergabe.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">
                            Häufige Fragen zum Umzug in Nürnberg
                        </h2>
                        <div className="space-y-4">
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none">
                                    <span>Was kostet ein Umzug in Nürnberg?</span>
                                    <span className="transition group-open:rotate-180">↓</span>
                                </summary>
                                <div className="pt-4 text-muted-foreground">
                                    Ein lokaler Umzug kostet im Schnitt zwischen 400 und 2.000
                                    Euro. Der genaue Preis hängt vom Transportvolumen,
                                    Stockwerk, Laufwegen und der Parkplatzsituation ab. Nach
                                    Besichtigung nennen wir Ihnen einen verbindlichen
                                    Festpreis.
                                </div>
                            </details>

                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none">
                                    <span>
                                        {dictionary?.common?.faq_boxes_q}
                                    </span>
                                    <span className="transition group-open:rotate-180">↓</span>
                                </summary>
                                <div className="pt-4 text-muted-foreground">
                                    {dictionary?.common?.faq_boxes_a}
                                </div>
                            </details>

                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none">
                                    <span>
                                        {dictionary?.common?.faq_no_parking_who_q}
                                    </span>
                                    <span className="transition group-open:rotate-180">↓</span>
                                </summary>
                                <div className="pt-4 text-muted-foreground">
                                    Falls am Be- oder Entladeort in Nürnberg keine geeigneten
                                    Parkplätze verfügbar sind, übernehmen wir auf Wunsch die
                                    Anmeldung und Beschilderung der offiziellen
                                    Halteverbotszone.
                                </div>
                            </details>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-8 rounded-3xl border border-border/50 text-center">
                        <h2 className="text-2xl font-bold mb-6">
                            {dictionary?.common?.customer_voices}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start max-w-3xl mx-auto">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">
                                    "Schneller Firmenumzug in der Nürnberger Südstadt. Das Team
                                    war hochprofessionell und hat unsere Technik sicher
                                    transportiert."
                                </p>
                                <p className="font-semibold">
                                    – Premium Dienstleister, Nürnberg
                                </p>
                            </div>
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">
                                    "Wir hatten große Sorge wegen unserer schweren
                                    Massivholzküche. Das FLOXANT-Team hat alles sauber zerlegt
                                    und sicher verladen."
                                </p>
                                <p className="font-semibold">– Familie Meier</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">
                            {dictionary?.common?.additional_services_locations}
                        </h3>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/${pageLocale}/reinigung-nuernberg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Reinigung Nürnberg
                            </Link>
                            <Link
                                href={`/${pageLocale}/entruempelung-nuernberg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Entrümpelung Nürnberg
                            </Link>
                            <Link
                                href={`/${pageLocale}/halteverbotszone-nuernberg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Halteverbotszone Nürnberg
                            </Link>
                            <Link
                                href={`/${pageLocale}/seniorenumzug-nuernberg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Seniorenumzug Nürnberg
                            </Link>
                            <Link
                                href={`/${pageLocale}/klaviertransport-nuernberg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Klaviertransport Nürnberg
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzug-regensburg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Umzug Regensburg
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzug-muenchen`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                {dictionary?.common?.umzug_munich}
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzug-bayern`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                {dictionary?.common?.umzug_bavaria}
                            </Link>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-lg font-semibold mb-6">
                                Umzugsservice rund um Nürnberg
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={`/${pageLocale}/umzug-fuerth`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Fürth
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-erlangen`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Erlangen
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-feucht`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Feucht
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-schwabach`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Schwabach
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-herzogenaurach`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Herzogenaurach
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-zirndorf`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Zirndorf
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-oberasbach`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Oberasbach
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-wendelstein`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Wendelstein
                                </Link>
                            </div>
                        </div>
                    </div>

                    <TrustStack className="my-16" />

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg mt-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {dictionary?.common?.calculate_price}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Kontaktieren Sie uns noch heute. Wir erstellen Ihr individuelles
                            Festpreisangebot für Nürnberg.
                        </p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}