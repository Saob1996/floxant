import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return {};

    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: lang as Locale,
        baseKey: "reinigung_spec",
        city: "Würzburg",
    });

    return generatePageSEO({
        pageLocale: lang,
        path: "reinigung-wuerzburg",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, lang),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, lang),
    });
}

export default async function ReinigungWuerzburgPage({ params }: PageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const locale = lang as Locale;
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "reinigung_spec",
        city: "Würzburg",
    });

    return (
        <SpecialtyPageLayout
                pageLocale={lang}
                dict={localeDict}
                city={city}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, lang)}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, lang)}
                heroText={resolveField(content.hero_p, fallback.hero_p, city, lang)}
                ctaText={resolveField(content.cta, fallback.cta, city, lang)}
                breadcrumbs={[
                    { label: "Home", href: `/${lang}` },
                    { label: "Reinigung", href: `/${lang}/umzug-bayern` },
                    { label: city }
                ]}
                chips={[
                    { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
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
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, lang)}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city, lang),
                    resolveField(content.section2_p2, fallback.section2_p2, city, lang),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, lang)}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, lang)}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, lang)}
            />
    );
}
