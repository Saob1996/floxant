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

    const { seoContent, seoFallback, city, neighborhoods, keywords } = await getSpecialtyPageData({
        locale: lang as Locale,
        baseKey: "umzug_spec",
        city: "München",
    });

    return generatePageSEO({
        pageLocale: lang,
        path: "umzug-muenchen",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, neighborhoods, lang),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, neighborhoods, lang),
        keywords,
    });
}

export default async function UmzugMuenchenPage({ params }: PageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const locale = lang as Locale;
    const { 
        localeDict, 
        content, 
        fallback, 
        city,
        neighborhoods
    } = await getSpecialtyPageData({
        locale,
        baseKey: "umzug_spec",
        city: "München",
    });

    return (
        <SpecialtyPageLayout
                pageLocale={lang}
                dict={localeDict}
                city={city}
                neighborhoods={neighborhoods}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, neighborhoods, lang)}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, neighborhoods, lang)}
                heroText={resolveField(content.hero_p, fallback.hero_p, city, neighborhoods, lang)}
                ctaText={resolveField(content.cta, fallback.cta, city, neighborhoods, lang)}
                breadcrumbs={[
                    { label: "Home", href: `/${lang}` },
                    { label: "Umzug", href: `/${lang}/umzug-bayern` },
                    { label: city }
                ]}
                chips={[
                    { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city, neighborhoods) },
                    { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city, neighborhoods) },
                    { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city, neighborhoods) }
                ]}
                cards={[
                    {
                        icon: Star,
                        title: resolveNestedField(content.service1, fallback.service1, "title", city, neighborhoods),
                        lines: [
                            resolveNestedField(content.service1, fallback.service1, "l1", city, neighborhoods),
                            resolveNestedField(content.service1, fallback.service1, "l2", city, neighborhoods),
                            resolveNestedField(content.service1, fallback.service1, "l3", city, neighborhoods),
                            resolveNestedField(content.service1, fallback.service1, "l4", city, neighborhoods),
                        ]
                    },
                    {
                        icon: Zap,
                        title: resolveNestedField(content.service2, fallback.service2, "title", city, neighborhoods),
                        lines: [
                            resolveNestedField(content.service2, fallback.service2, "l1", city, neighborhoods),
                            resolveNestedField(content.service2, fallback.service2, "l2", city, neighborhoods),
                            resolveNestedField(content.service2, fallback.service2, "l3", city, neighborhoods),
                            resolveNestedField(content.service2, fallback.service2, "l4", city, neighborhoods),
                        ]
                    }
                ]}
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, neighborhoods, lang)}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city, neighborhoods, lang),
                    resolveField(content.section2_p2, fallback.section2_p2, city, neighborhoods, lang),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, neighborhoods, lang)}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, neighborhoods, lang)}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, neighborhoods, lang)}
            />
    );
}
