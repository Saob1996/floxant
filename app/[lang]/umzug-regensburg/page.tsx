import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { TrustStack } from "@/components/TrustStack";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Milestone, Layers, Award, ArrowRight, CheckCircle2 } from "lucide-react";

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
    const metaTitle = dict.pages?.umzug_regensburg?.meta_title || "Umzugsunternehmen Regensburg ✓ Festpreis ✓ Versichert | FLOXANT";
    const metaDesc = dict.pages?.umzug_regensburg?.meta_desc || "Professionelles Umzugsunternehmen in Regensburg & Oberpfalz. Umzug, Entrümpelung und Reinigung zum Festpreis. Jetzt kostenloses Angebot anfragen!";

    return generatePageSEO({
        pageLocale: pageLocale as Locale,
        path: "umzug-regensburg",
        title: metaTitle,
        description: metaDesc,
    });
}

export default async function UmzugRegensburg({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang: pageLocale } = await params;
    const dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};
    const rg = (dict as any)?.pages?.umzug_regensburg || {};

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
        "@id": `https://www.floxant.de/${pageLocale}/umzug-regensburg#localbusiness`,
        name: "FLOXANT Umzug Regensburg",
        description:
            "Professionelles Umzugsunternehmen in Regensburg. Umzug, Fernumzug, Entrümpelung, Reinigung und Verpackungsservice mit Festpreis und lokaler Expertise.",
        url: `https://www.floxant.de/${pageLocale}/umzug-regensburg`,
        telephone: "+4915771105087",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Johanna-Kinkel-Straße 1 + 2",
            addressLocality: "Regensburg",
            postalCode: "93049",
            addressRegion: "Bayern",
            addressCountry: "DE",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 49.0134,
            longitude: 12.1016,
        },
        areaServed: [
            { "@type": "City", name: "Regensburg" },
            { "@type": "AdministrativeArea", name: "Oberpfalz" },
            { "@type": "City", name: "Neutraubling" },
            { "@type": "City", name: "Lappersdorf" },
            { "@type": "City", name: "Regenstauf" },
            { "@type": "City", name: "Nittendorf" },
            { "@type": "City", name: "Sinzing" },
            { "@type": "City", name: "Pentling" },
            { "@type": "City", name: "Barbing" },
            { "@type": "City", name: "Tegernheim" },
        ],
        priceRange: "$$",
        hasMap: "https://maps.google.com/?q=FLOXANT+Regensburg+Johanna-Kinkel-Straße+1",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "127",
            bestRating: "5",
        },
    };

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Umzug, Transport, Entrümpelung, Reinigung",
        name: "Umzugsunternehmen Regensburg",
        provider: {
            "@type": "LocalBusiness",
            name: "FLOXANT Umzug Regensburg",
            telephone: "+4915771105087",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Johanna-Kinkel-Straße 1 + 2",
                addressLocality: "Regensburg",
                postalCode: "93049",
                addressCountry: "DE",
            },
        },
        areaServed: { "@type": "City", name: "Regensburg" },
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
                name: "Umzug Regensburg",
                item: `https://www.floxant.de/${pageLocale}/umzug-regensburg`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs
                pageLocale={pageLocale}
                items={[
                    { label: "Umzug Bayern", href: `/${pageLocale}/umzug-bayern` },
                    { label: "Umzug Regensburg" },
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
                        <span>Regensburg & Oberpfalz</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        {rg.hero_h1 || "Umzugsunternehmen in "} <span className="text-primary">{rg.hero_h1_highlight || "Regensburg"}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {(dict as any)?.pages?.umzug_regensburg?.hero_text}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            {(dict as any)?.calculator?.insured_tag || "100% Versichert"}
                        </span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-primary" />
                            {(dict as any)?.calculator?.inspection_tag || "Kostenlose Besichtigung"}
                        </span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            {(dict as any)?.calculator?.fixed_price_tag || "Festpreisgarantie"}
                        </span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            {rg.section1_title || "Umziehen im Herzen der Oberpfalz"}
                        </h2>
                        <p>
                            {rg.section1_p1}
                        </p>
                        <p>
                            {rg.section1_p2}
                        </p>

                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">
                                {rg.standort_title || "Unser Standort-Konzept"}
                            </h4>
                            <p className="m-0 text-sm">
                                {rg.standort_text}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">
                            {rg.skills_title || "Unsere Kompetenzen für Regensburg"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">{rg.skill1_title || "Altstadt-Logistik"}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {rg.skill1_text}
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Layers className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    {rg.skill2_title || "Sorgfältige Verpackung"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {rg.skill2_text}
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    {(dict as any)?.calculator?.fixed_price_tag ||
                                        "Festpreisgarantie"}
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
                            {rg.module_title || "Modularer Service für jeden Bedarf"}
                        </h2>
                        <p>
                            {rg.module_p1}
                        </p>

                        <h3>{rg.longdistance_title || "Fernumzüge ab Regensburg"}</h3>
                        <p>
                            {rg.longdistance_text}
                        </p>

                        <h3>{rg.students_title || "Service für Studenten und Senioren"}</h3>
                        <p>
                            {rg.students_text}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">
                            {rg.faq_title || "Häufige Fragen zum Umzug in Regensburg"}
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    q: content.faqs?.[0]?.q,
                                    a: content.faqs?.[0]?.a,
                                },
                                {
                                    q: content.faqs?.[1]?.q,
                                    a: content.faqs?.[1]?.a,
                                },
                                {
                                    q: content.faqs?.[2]?.q,
                                    a: content.faqs?.[2]?.a,
                                },
                                {
                                    q: rg.faq_extra1_q,
                                    a: rg.faq_extra1_a,
                                },
                                {
                                    q: rg.faq_extra2_q,
                                    a: rg.faq_extra2_a,
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl bg-muted/10 border border-border/50"
                                >
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">
                            Weitere Leistungen in Regensburg & Bayern
                        </h3>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/${pageLocale}/reinigung-regensburg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Reinigung Regensburg
                            </Link>
                            <Link
                                href={`/${pageLocale}/entruempelung-regensburg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Entrümpelung Regensburg
                            </Link>
                            <Link
                                href={`/${pageLocale}/buero-umzug-regensburg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Büroumzug Regensburg
                            </Link>
                            <Link
                                href={`/${pageLocale}/studentenumzug-regensburg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Studentenumzug Regensburg
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzug-bayern`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                {(dict as any)?.common?.umzug_bavaria || "Umzug Bayern"}
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzugskosten-bayern`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Umzugskosten Bayern
                            </Link>
                            <Link
                                href={`/${pageLocale}/entruempelung-kosten-regensburg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                Entrümpelung Kosten Regensburg
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzug-nuernberg`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                {(dict as any)?.common?.umzug_nuremberg || "Umzug Nürnberg"}
                            </Link>
                            <Link
                                href={`/${pageLocale}/umzug-muenchen`}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                {(dict as any)?.common?.umzug_munich || "Umzug München"}
                            </Link>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-lg font-semibold mb-6">
                                Umzugsservice rund um Regensburg
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={`/${pageLocale}/umzug-neutraubling`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Neutraubling
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-lappersdorf`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Lappersdorf
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-regenstauf`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Regenstauf
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-pentling`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Pentling
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-sinzing`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Sinzing
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-nittendorf`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Nittendorf
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-tegernheim`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Tegernheim
                                </Link>
                                <Link
                                    href={`/${pageLocale}/umzug-barbing`}
                                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    Umzug Barbing
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-8 rounded-3xl border border-border/50 text-center">
                        <h2 className="text-2xl font-bold mb-6">
                            {rg.reviews_title || "Was unsere Kunden in Regensburg sagen"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">
                                    {rg.review1_text}
                                </p>
                                <p className="font-semibold">{rg.review1_author}</p>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">
                                    {rg.review2_text}
                                </p>
                                <p className="font-semibold">{rg.review2_author}</p>
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm hidden md:block">
                                <p className="italic text-muted-foreground mb-4">
                                    {rg.review3_text}
                                </p>
                                <p className="font-semibold">{rg.review3_author}</p>
                            </div>
                        </div>
                    </div>

                    <TrustStack className="my-16" />

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">
                            {rg.final_title || "Ihr Umzug in Regensburg"}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            {rg.final_text}
                        </p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}