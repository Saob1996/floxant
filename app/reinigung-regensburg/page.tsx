import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { RegensburgCleaningConversionLift } from "@/components/RegensburgCleaningConversionLift";
import { RegensburgCleaningClickDecisionPanel } from "@/components/RegensburgCleaningClickDecisionPanel";
import { RegensburgCleaningLocalSignals } from "@/components/RegensburgCleaningLocalSignals";
import { RegensburgCleaningServiceHub } from "@/components/RegensburgCleaningServiceHub";
import { RegensburgCleaningSnippetAnswers } from "@/components/RegensburgCleaningSnippetAnswers";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { company } from "@/lib/company";
import {
    regensburgCleaningBuyerPaths,
    regensburgCleaningLocalAreas,
    regensburgCleaningLocalFaqs,
    regensburgCleaningServices,
    regensburgCleaningSnippetFaqs,
} from "@/lib/regensburg-cleaning-services";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import {
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
    buildServiceJsonLd,
    buildWebPageJsonLd,
} from "@/lib/structured-data";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "reinigung-regensburg",
        title: "Reinigung Regensburg | Büro, Grund, Fenster & B2B | FLOXANT",
        description:
            "Reinigung Regensburg: Büroreinigung, Grundreinigung, Fensterreinigung, Teppich, Bau, Praxis, Hotel und Treppenhaus. Fotos, Fläche und Termin senden.",
        keywords: [
            "Reinigung Regensburg",
            "Reinigungsfirma Regensburg",
            "Putzfirma Regensburg",
            "Putzservice Regensburg",
            "Reinigung Kosten Regensburg",
            "Reinigung Altstadt Regensburg",
            "Reinigung Innenstadt Regensburg",
            "Reinigung Gewerbepark Regensburg",
            "Reinigung Neutraubling",
            "Reinigung Lappersdorf",
            "Büroreinigung Regensburg",
            "Grundreinigung Regensburg",
            "Fensterreinigung Regensburg",
            "Teppichreinigung Regensburg",
            "Baureinigung Regensburg",
            "Praxisreinigung Regensburg",
            "Hotelreinigung Regensburg",
            "Treppenhausreinigung Regensburg",
        ],
    });
}

export default async function ReinigungRegensburgPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "reinigung_spec",
        city: "Regensburg",
    });

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Reinigung", item: "/reinigung" },
                { name: "Reinigung Regensburg", item: "/reinigung-regensburg" },
            ]),
            buildServiceJsonLd({
                name: "Reinigung Regensburg",
                description:
                    "Reinigung in Regensburg fuer Buero, Praxis, Hotel, Fenster, Teppich, Treppenhaus, Baustaub, Grundreinigung, Uebergabe und kurzfristige Situationen.",
                path: "/reinigung-regensburg",
                serviceType:
                    "Reinigungsfirma, Putzfirma, Gebaeudereinigung, Gewerbereinigung und Spezialreinigung in Regensburg",
                areaServed: [
                    "Regensburg",
                    "Altstadt Regensburg",
                    "Innenstadt Regensburg",
                    "Kumpfmuehl",
                    "Galgenberg",
                    "Gewerbepark Regensburg",
                    "Neutraubling",
                    "Barbing",
                    "Lappersdorf",
                    "Wenzenbach",
                    "Oberpfalz",
                    "Bayern",
                ],
            }),
            buildWebPageJsonLd({
                name: "Reinigung Regensburg mit Service-Finder und direkter Anfrage",
                description:
                    "Kundennaher Einstieg fuer Reinigung in Regensburg: passende Leistung finden, Fotos senden, Termin klaeren und ohne Umweg anfragen.",
                path: "/reinigung-regensburg",
                about: [
                    "Reinigung Regensburg",
                    "Reinigungsfirma Regensburg",
                    "Putzfirma Regensburg",
                    "Bueroreinigung Regensburg",
                    "Gewerbereinigung Regensburg",
                    "Fensterreinigung Regensburg",
                    "Grundreinigung Regensburg",
                    "Baureinigung Regensburg",
                    "Wohnungsuebergabe Reinigung",
                    "kurzfristige Reinigung Regensburg",
                    "Regensburg",
                    "Oberpfalz",
                    "Bayern",
                ],
                potentialActions: [
                    { name: "Reinigung in Regensburg anfragen", target: "/buchung?service=reinigung&city=regensburg#buchungssystem", type: "ContactAction" },
                    { name: "WhatsApp mit Fotos senden", target: `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`, type: "ContactAction" },
                    { name: "Passende Reinigungsleistung finden", target: "/reinigung-regensburg#reinigungsservice-regensburg", type: "Action" },
                ],
            }),
            {
                "@type": "ItemList",
                name: "Reinigungsleistungen in Regensburg",
                itemListElement: regensburgCleaningServices.map((service, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: service.label,
                    url: `${company.url}${service.href.split("#")[0]}`,
                    description: `${service.intro} ${service.clickHook} ${service.goodFor}`,
                })),
            },
            {
                "@type": "OfferCatalog",
                name: "FLOXANT Reinigung Regensburg Servicekatalog",
                url: `${company.url}/reinigung-regensburg`,
                itemListElement: regensburgCleaningServices.map((service, index) => ({
                    "@type": "Offer",
                    position: index + 1,
                    name: service.label,
                    url: `${company.url}${service.href.split("#")[0]}`,
                    category: "Reinigung Regensburg",
                    availability: "https://schema.org/InStock",
                    itemOffered: {
                        "@type": "Service",
                        name: service.label,
                        description: `${service.intro} ${service.goodFor}`,
                        areaServed: {
                            "@type": "City",
                            name: "Regensburg",
                        },
                    },
                })),
            },
            {
                "@type": "ItemList",
                name: "Reinigung in Regensburg Stadtteilen und Umgebung",
                itemListElement: regensburgCleaningLocalAreas.map((area, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: area.intent,
                    url: `${company.url}${area.href.split("#")[0]}`,
                    description: `${area.area}: ${area.text}`,
                })),
            },
            {
                "@type": "ItemList",
                name: "Klicknahe Reinigungswege in Regensburg",
                itemListElement: regensburgCleaningBuyerPaths.map((path, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: path.label,
                    url: `${company.url}${path.href.split("#")[0]}`,
                    description: `${path.customerPhrase} ${path.answer}`,
                })),
            },
            {
                "@type": "LocalBusiness",
                "@id": `${company.url}/#localbusiness`,
                name: company.name,
                url: company.url,
                telephone: company.phoneRaw,
                image: `${company.url}/opengraph-image`,
                priceRange: "nach Vorpruefung",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: company.streetAddress,
                    addressLocality: company.city,
                    postalCode: company.postalCode,
                    addressRegion: company.state,
                    addressCountry: company.countryCode,
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: company.geo.lat,
                    longitude: company.geo.lng,
                },
                areaServed: company.primaryServiceAreas.map((area) => ({
                    "@type": "AdministrativeArea",
                    name: area,
                })),
                sameAs: company.sameAs,
            },
            buildFaqJsonLd([...regensburgCleaningSnippetFaqs, ...regensburgCleaningLocalFaqs]),
        ],
    };

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SpecialtyPageLayout
                lang="de"
                dict={localeDict}
                city={city}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, "de")}
                heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
                ctaText={resolveField(content.cta, fallback.cta, city, "de")}
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Reinigung","href":"/reinigung"},{"label":"Regensburg"}]}
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
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, "de")}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city, "de"),
                    resolveField(content.section2_p2, fallback.section2_p2, city, "de"),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, "de")}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, "de")}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, "de")}
            >
                <RegensburgCleaningServiceHub />
                <RegensburgCleaningConversionLift />
                <RegensburgCleaningClickDecisionPanel />
                <RegensburgCleaningLocalSignals />
                <RegensburgCleaningSnippetAnswers />
            </SpecialtyPageLayout>
        </>
    );
}
