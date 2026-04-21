import { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import Link from "next/link";
import { Briefcase, Shield, Truck } from "lucide-react";
const CITY = "Bayern";
const PATH = "familienumzug-bayern";
export async function generateMetadata({
    params,
}: {
    params: Promise<{}>;
}): Promise<Metadata> {
    const pageLocale: Locale = "de";
    const { content, fallback, seoContent, seoFallback, city } =
        await getSpecialtyPageData({
            locale: pageLocale,
            baseKey: "familienumzug",
            seoKey: "familienumzug_bayern",
            city: CITY,
        });
    const title =
        resolveField(seoContent.meta_title, seoFallback.meta_title, city, "de") ||
        resolveField(content.meta_title, fallback.meta_title, city, "de") ||
        `Familienumzug ${city} | FLOXANT`;
    const description =
        resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, "de") ||
        resolveField(content.meta_desc, fallback.meta_desc, city, "de") ||
        `Professioneller Familienumzug in ${city}.`;
    return generatePageSEO({
        pageLocale,
        path: PATH,
        title,
        description,
    });
}
export default async function FamilienumzugBayernPage({
    params,
}: {
    params: Promise<{}>;
}) {
    const pageLocale: Locale = "de";
    const { localeDict, content, fallback, seoContent, seoFallback, city } =
        await getSpecialtyPageData({
            locale: pageLocale,
            baseKey: "familienumzug",
            seoKey: "familienumzug_bayern",
            city: CITY,
        });
    const heroTitle =
        resolveField(content.hero_h1, fallback.hero_h1, city, "de") || "Familienumzug";
    const serviceName = `${heroTitle} ${city}`.trim();
    const metaDescription =
        resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, "de") ||
        resolveField(content.meta_desc, fallback.meta_desc, city, "de");
    const moveLabel =
        resolveField(content.link_umzug, fallback.link_umzug, city, "de") ||
        `Umzug ${city}`;
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        description: metaDescription,
        provider: {
            "@type": "MovingCompany",
            name: "FLOXANT",
            telephone: "+4915771105087",
        },
        areaServed: {
            "@type": "AdministrativeArea",
            name: city,
        },
        serviceType: [serviceName],
    };
    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "FLOXANT",
                item: `https://www.floxant.de/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: moveLabel,
                item: `https://www.floxant.de/umzug-bayern`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: serviceName,
                item: `https://www.floxant.de/${PATH}`,
            },
        ],
    };
    return (
        <SpecialtyPageLayout
                lang="de"
                dict={localeDict}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
                heroTitle={heroTitle}
                city={city}
                heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
                ctaText={resolveField(content.cta, fallback.cta, city, "de")}
                breadcrumbs={[
                    {
                        label: moveLabel,
                        href: `/umzug-bayern`,
                    },
                    {
                        label: serviceName,
                    },
                ]}
                chips={[
                    {
                        icon: Briefcase,
                        text: resolveNestedField(content.badges, fallback.badges, "permit", city),
                    },
                    {
                        icon: Truck,
                        text: resolveNestedField(content.badges, fallback.badges, "signs", city),
                        iconClassName: "h-5 w-5 text-muted-foreground",
                    },
                    {
                        icon: Shield,
                        text: resolveNestedField(
                            content.badges,
                            fallback.badges,
                            "stressfree"
                        ),
                    },
                ]}
                cards={[
                    {
                        icon: Briefcase,
                        title: resolveNestedField(content.service1, fallback.service1, "title", city),
                        lines: [
                            resolveNestedField(content.service1, fallback.service1, "l1", city),
                            resolveNestedField(content.service1, fallback.service1, "l2", city),
                            resolveNestedField(content.service1, fallback.service1, "l3", city),
                            resolveNestedField(content.service1, fallback.service1, "l4", city),
                        ],
                    },
                    {
                        icon: Truck,
                        iconClassName: "mb-6 h-10 w-10 text-muted-foreground",
                        title: resolveNestedField(content.service2, fallback.service2, "title", city),
                        lines: [
                            resolveNestedField(content.service2, fallback.service2, "l1", city),
                            resolveNestedField(content.service2, fallback.service2, "l2", city),
                            resolveNestedField(content.service2, fallback.service2, "l3", city),
                            resolveNestedField(content.service2, fallback.service2, "l4", city),
                        ],
                    },
                ]}
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, "de")}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city, "de"),
                    resolveField(content.section2_p2, fallback.section2_p2, city, "de"),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, "de")}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, "de")}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, "de")}
            />
    );
}
