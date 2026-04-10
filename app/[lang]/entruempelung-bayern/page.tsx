import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import Link from "next/link";
import { Trash2, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return {};

    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: lang as Locale,
        baseKey: "entruempelung_spec",
        seoKey: "entruempelung_bayern",
        city: "Bayern",
    });

    return generatePageSEO({
        pageLocale: lang,
        path: `entruempelung-bayern`,
        title: resolveField(seoContent.meta_title, seoFallback.meta_title, city),
        description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city),
    });
}

export default async function EntruempelungBayernPage({ params }: PageProps) {
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
        baseKey: "entruempelung_spec",
        seoKey: "entruempelung_bayern",
        city: "Bayern",
    });

    const faqItems = (seoContent.faqs || seoFallback.faqs || []) as Array<{ q: string; a: string }>;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": `Entrümpelung ${city} | FLOXANT`,
                "description": resolveField(seoContent.meta_desc, seoFallback.meta_desc, city),
                "url": `https://www.floxant.de/${lang}/entruempelung-bayern`,
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
                "areaServed": { "@type": "State", "name": "Bayern" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${lang}` },
                    { "@type": "ListItem", "position": 2, "name": `Entrümpelung ${city}`, "item": `https://www.floxant.de/${lang}/entruempelung-bayern` }
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
                    { label: `Entrümpelung ${city}` }
                ]}
                chips={[
                    { icon: Trash2, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
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
        </>
    );
}