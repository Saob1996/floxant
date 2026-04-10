import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Sparkles, Shield, Clock, Star, Zap } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return {};

    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: lang as Locale,
        baseKey: "reinigung_spec",
        seoKey: "reinigung_deggendorf",
        city: "Deggendorf",
    });

    return generatePageSEO({
        pageLocale: lang,
        path: `reinigung-deggendorf`,
        title: resolveField(seoContent.meta_title, seoFallback.meta_title, city),
        description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city),
    });
}

export default async function ReinigungCityPage({ params }: PageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const locale = lang as Locale;
    const { 
        localeDict, 
        content, 
        fallback, 
        seoContent, 
        seoFallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "reinigung_spec",
        seoKey: "reinigung_deggendorf",
        city: "Deggendorf",
    });

    const faqItems = (seoContent.faqs || seoFallback.faqs || []) as Array<{ q: string; a: string }>;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": `Reinigung ${city} | FLOXANT`,
                "description": resolveField(seoContent.meta_desc, seoFallback.meta_desc, city),
                "provider": {
                    "@type": "LocalBusiness",
                    "name": "FLOXANT",
                    "telePhone": "+49 1577 1105087",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Regensburg",
                        "addressRegion": "Bayern",
                        "addressCountry": "DE"
                    }
                },
                "areaServed": { "@type": "City", "name": city }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${lang}` },
                    { "@type": "ListItem", "position": 2, "name": "Reinigung Bayern", "item": `https://www.floxant.de/${lang}/reinigung-bayern` },
                    { "@type": "ListItem", "position": 3, "name": city, "item": `https://www.floxant.de/${lang}/reinigung-deggendorf` }
                ]
            },
            ...(faqItems.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": faqItems.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": { "@type": "Answer", "text": item.a }
                }))
            }] : [])
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SpecialtyPageLayout
                pageLocale={lang}
                dict={localeDict}
                city={city}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city)}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city)}
                heroText={resolveField(content.hero_p, fallback.hero_p, city)}
                ctaText={resolveField(content.cta, fallback.cta, city)}
                breadcrumbs={[
                    { label: "Home", href: `/${lang}` },
                    { label: "Reinigung", href: `/${lang}/reinigung-bayern` },
                    { label: city }
                ]}
                chips={[
                    { icon: Sparkles, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
                    { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
                    { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city) }
                ]}
                cards={[
                    {
                        icon: Star,
                        title: resolveNestedField(content.service1, fallback.service1, "title", city),
                        lines: [
                            resolveNestedField(content.service1, fallback.service1, "l1", city),
                            resolveNestedField(content.service1, fallback.service1, "l2", city),
                            resolveNestedField(content.service1, fallback.service1, "l3", city),
                            resolveNestedField(content.service1, fallback.service1, "l4", city),
                        ]
                    },
                    {
                        icon: Zap,
                        title: resolveNestedField(content.service2, fallback.service2, "title", city),
                        lines: [
                            resolveNestedField(content.service2, fallback.service2, "l1", city),
                            resolveNestedField(content.service2, fallback.service2, "l2", city),
                            resolveNestedField(content.service2, fallback.service2, "l3", city),
                            resolveNestedField(content.service2, fallback.service2, "l4", city),
                        ]
                    }
                ]}
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city)}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city),
                    resolveField(content.section2_p2, fallback.section2_p2, city),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city)}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city)}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city)}
            />

            {/* Regional SEO Gating (DE-only) */}
            {lang === "de" && (
                <section className="bg-slate-50 py-16 px-6 border-t border-border">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold mb-8 text-slate-800">Regionale Reinigungs-Services in Bayern</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: "München", href: "/de/reinigung-muenchen" },
                                { name: "Nürnberg", href: "/de/reinigung-nuernberg" },
                                { name: "Regensburg", href: "/de/reinigung-regensburg" },
                                { name: "Augsburg", href: "/de/reinigung-augsburg" },
                                { name: "Ingolstadt", href: "/de/reinigung-ingolstadt" },
                                { name: "Landshut", href: "/de/reinigung-landshut" },
                                { name: "Rosenheim", href: "/de/reinigung-rosenheim" },
                                { name: "Passau", href: "/de/reinigung-passau" },
                                { name: "Würzburg", href: "/de/reinigung-wuerzburg" },
                                { name: "Straubing", href: "/de/reinigung-straubing" }
                            ].map((loc) => (
                                <Link 
                                    key={loc.name} 
                                    href={loc.href}
                                    className="text-sm text-slate-600 hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary pb-1"
                                >
                                    Reinigung {loc.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}