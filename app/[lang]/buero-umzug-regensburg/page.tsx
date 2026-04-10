import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import Link from "next/link";
import { Briefcase, Shield, Truck } from "lucide-react";

const CITY = "Regensburg";
const PATH = "buero-umzug-regensburg";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang as Locale;

    const { content, fallback, seoContent, seoFallback, city } =
        await getSpecialtyPageData({
            locale: pageLocale,
            baseKey: "bueroumzug",
            seoKey: "bueroumzug_regensburg",
            city: CITY,
        });

    const title =
        resolveField(seoContent.meta_title, seoFallback.meta_title, city) ||
        resolveField(content.meta_title, fallback.meta_title, city) ||
        `Büroumzug ${city} | FLOXANT`;

    const description =
        resolveField(seoContent.meta_desc, seoFallback.meta_desc, city) ||
        resolveField(content.meta_desc, fallback.meta_desc, city) ||
        `Professioneller Büroumzug in ${city}.`;

    return generatePageSEO({
        pageLocale,
        path: PATH,
        title,
        description,
    });
}

export default async function BueroumzugRegensburgPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const pageLocale: Locale = lang;

    const { localeDict, content, fallback, seoContent, seoFallback, city } =
        await getSpecialtyPageData({
            locale: pageLocale,
            baseKey: "bueroumzug",
            seoKey: "bueroumzug_regensburg",
            city: CITY,
        });

    const heroTitle = resolveField(content.hero_h1, fallback.hero_h1, city) || "Büroumzug";
    const serviceName = `${heroTitle} ${city}`.trim();

    const metaDescription =
        resolveField(seoContent.meta_desc, seoFallback.meta_desc, city) ||
        resolveField(content.meta_desc, fallback.meta_desc, city);

    const moveLabel =
        resolveField(content.link_umzug, fallback.link_umzug, city) ||
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
            "@type": "City",
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
                item: `https://www.floxant.de/${pageLocale}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: moveLabel,
                item: `https://www.floxant.de/${pageLocale}/umzug-regensburg`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: serviceName,
                item: `https://www.floxant.de/${pageLocale}/${PATH}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
            />

            <SpecialtyPageLayout
                pageLocale={pageLocale}
                dict={localeDict}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city)}
                heroTitle={heroTitle}
                city={city}
                heroText={resolveField(content.hero_p, fallback.hero_p, city)}
                ctaText={resolveField(content.cta, fallback.cta, city)}
                breadcrumbs={[
                    {
                        label: moveLabel,
                        href: `/${pageLocale}/umzug-regensburg`,
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