import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

import Link from "next/link";
import { MapPin } from "lucide-react";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    return generatePageSEO({
        pageLocale,
        path: 'reinigung-augsburg',
        title: 'Professionelle Reinigung in Augsburg | FLOXANT',
        description: 'Professionelle Professionelle Reinigung in Augsburg in Bayern. Seriöse Abwicklung, Festpreisgarantie und versicherter Transport. Jetzt online berechnen!',
    });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_reinigung || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q || "Was kostet eine Reinigung in Augsburg?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a || "3 bis 5 Euro pro Quadratmeter für eine professionelle Endreinigung. Festpreis nach Besichtigung." } },
                { "@type": "Question", "name": content.faqs?.[1]?.q || "Gibt es eine Abnahmegarantie?", "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a || "Ja. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück." } }
            ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "FLOXANT Reinigung Augsburg",
        "url": `https://www.floxant.de/${pageLocale}/reinigung-augsburg`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "areaServed": [{ "@type": "City", "name": "Augsburg" }],
        "priceRange": "$$",
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Reinigung, Endreinigung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Reinigung Augsburg", "telephone": "+4915771105087" },
        "areaServed": { "@type": "City", "name": "Augsburg" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${pageLocale}` },
            { "@type": "ListItem", "position": 2, "name": "Reinigung Bayern", "item": `https://www.floxant.de/${pageLocale}/reinigung-bayern` },
            { "@type": "ListItem", "position": 3, "name": "Reinigung Augsburg", "item": `https://www.floxant.de/${pageLocale}/reinigung-augsburg` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Reinigung Bayern", href: `/${pageLocale}/reinigung-bayern` }, { label: "Reinigung Augsburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Augsburg & Schwaben</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle Reinigung in <span className="text-primary">Augsburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT bietet professionelle Reinigungsservices in Augsburg und Umgebung. Von der Endreinigung bei der Wohnungsübergabe bis zur Grundreinigung – wir garantieren ein Ergebnis, das jeden Vermieter überzeugt.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Endreinigung in Augsburg</h2>
                        <p>Die Endreinigung ist der Schlüssel zur erfolgreichen Wohnungsübergabe. Unser Team reinigt alle Räume nach den höchsten Standards: Badezimmer, Küche, Fenster, Heizkörper und Böden. So vermeiden Sie Nachforderungen durch den Vermieter.</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Unsere Reinigungsstandards</h2>
                        <p>Wir arbeiten mit professioneller Ausrüstung und umweltfreundlichen Reinigungsmitteln. Jede Reinigung wird dokumentiert und Sie erhalten eine Abnahmegarantie. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück.</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{dict.common.combination_move}</h2>
                        <p>Buchen Sie Reinigung und Umzug zusammen und sparen Sie. FLOXANT bietet Kombi-Pakete, bei denen Umzug und Endreinigung aus einer Hand koordiniert werden. So haben Sie am Ende nur einen Ansprechpartner.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">{dict.common.faq_title}</h2>
                        <div className="space-y-6">
                            {[
                            { q: "Was kostet eine Reinigung in Augsburg?", a: "3 bis 5 Euro pro Quadratmeter für eine professionelle Endreinigung. Festpreis nach Besichtigung." },
                            { q: "Gibt es eine Abnahmegarantie?", a: "Ja. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">{dict.common.more_services}</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${pageLocale}/umzug-augsburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Augsburg</Link>
                            <Link href={`/${pageLocale}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${pageLocale}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_bavaria}</Link>
                            <Link href={`/${pageLocale}/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.guide}</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Reinigung in Augsburg anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Reinigung in Augsburg.</p>
                        <DualCalculator dic={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
