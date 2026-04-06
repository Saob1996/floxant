import { Metadata } from "next";
import { Lock, Music, Shield } from "lucide-react";

import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import {
    getSpecialtyPageData,
    resolveField,
    resolveNestedField,
} from "@/lib/specialty-page";
import { generatePageSEO } from "@/lib/seo";
import { type Locale } from "../../../i18n-config";

const CITY = "München";
const PATH = "klaviertransport-muenchen";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const pageLocale = lang as Locale;

    const { content, fallback, seoContent, seoFallback, city } =
        await getSpecialtyPageData({
            locale: pageLocale,
            baseKey: "klaviertransport",
            seoKey: "klaviertransport_muenchen",
            city: CITY,
        });

    const title =
        resolveField(seoContent.meta_title, seoFallback.meta_title, city) ||
        resolveField(content.meta_title, fallback.meta_title, city) ||
        `Klaviertransport ${city} | FLOXANT`;

    const description =
        resolveField(seoContent.meta_desc, seoFallback.meta_desc, city) ||
        resolveField(content.meta_desc, fallback.meta_desc, city) ||
        `Professioneller Klaviertransport in ${city}.`;

    return generatePageSEO({
        pageLocale,
        path: PATH,
        title,
        description,
    });
}

export default async function KlaviertransportMuenchenPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const pageLocale = lang as Locale;

    const { localeDict, content, fallback, seoContent, seoFallback, city } =
        await getSpecialtyPageData({
            locale: pageLocale,
            baseKey: "klaviertransport",
            seoKey: "klaviertransport_muenchen",
            city: CITY,
        });

    const heroTitle =
        resolveField(content.hero_h1, fallback.hero_h1) || "Klaviertransport";
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
            address: {
                "@type": "PostalAddress",
                streetAddress: "Friedenstraße 24",
                addressLocality: "Regensburg",
                postalCode: "93053",
                addressCountry: "DE",
            },
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
                item: `https://www.floxant.de/${pageLocale}/umzug-muenchen`,
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
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge)}
                heroTitle={heroTitle}
                city={city}
                heroText={resolveField(content.hero_p, fallback.hero_p, city)}
                ctaText={resolveField(content.cta, fallback.cta)}
                breadcrumbs={[
                    {
                        label: moveLabel,
                        href: `/${pageLocale}/umzug-muenchen`,
                    },
                    {
                        label: serviceName,
                    },
                ]}
                chips={[
                    {
                        icon: Music,
                        text: resolveNestedField(content.badges, fallback.badges, "piano"),
                    },
                    {
                        icon: Lock,
                        text: resolveNestedField(content.badges, fallback.badges, "safe"),
                        iconClassName: "h-5 w-5 text-muted-foreground",
                    },
                    {
                        icon: Shield,
                        text: resolveNestedField(
                            content.badges,
                            fallback.badges,
                            "insurance"
                        ),
                    },
                ]}
                cards={[
                    {
                        icon: Music,
                        title: resolveNestedField(content.service1, fallback.service1, "title"),
                        lines: [
                            resolveNestedField(content.service1, fallback.service1, "l1"),
                            resolveNestedField(content.service1, fallback.service1, "l2"),
                            resolveNestedField(content.service1, fallback.service1, "l3"),
                            resolveNestedField(content.service1, fallback.service1, "l4"),
                        ],
                    },
                    {
                        icon: Lock,
                        iconClassName: "mb-6 h-10 w-10 text-muted-foreground",
                        title: resolveNestedField(content.service2, fallback.service2, "title"),
                        lines: [
                            resolveNestedField(content.service2, fallback.service2, "l1"),
                            resolveNestedField(content.service2, fallback.service2, "l2"),
                            resolveNestedField(content.service2, fallback.service2, "l3"),
                            resolveNestedField(content.service2, fallback.service2, "l4"),
                        ],
                    },
                ]}
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city)}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city),
                    resolveField(content.section2_p2, fallback.section2_p2, city),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge)}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city)}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city)}
            />
        </>
    );
}