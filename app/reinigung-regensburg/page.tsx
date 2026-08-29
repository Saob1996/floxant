import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { RegensburgCleaningConversionLift } from "@/components/RegensburgCleaningConversionLift";
import { RegensburgCleaningClickDecisionPanel } from "@/components/RegensburgCleaningClickDecisionPanel";
import { RegensburgCleaningLocalSignals } from "@/components/RegensburgCleaningLocalSignals";
import { RegensburgCleaningServiceHub } from "@/components/RegensburgCleaningServiceHub";
import { RegensburgCleaningSnippetAnswers } from "@/components/RegensburgCleaningSnippetAnswers";
import { CleaningProcessBlock } from "@/components/cleaning-seo/CleaningProcessBlock";
import { LocalTrustBlock } from "@/components/cleaning-seo/LocalTrustBlock";
import { RelatedServicesBlock } from "@/components/cleaning-seo/RelatedServicesBlock";
import { RequestChecklistBlock } from "@/components/cleaning-seo/RequestChecklistBlock";
import { ServiceAreaBlock } from "@/components/cleaning-seo/ServiceAreaBlock";
import { InternationalCustomerHint } from "@/components/conversion";
import { EffortFactorsPanel } from "@/components/EffortFactorsPanel";
import { LocalProofPanel } from "@/components/LocalProofPanel";
import { PhotoGuidanceBlock } from "@/components/PhotoGuidanceBlock";
import { RequestChecklistBlock as RequestBriefChecklistBlock } from "@/components/RequestChecklistBlock";
import { ServiceProofChecklist } from "@/components/ServiceProofChecklist";
import { ServiceVisualProofGrid } from "@/components/ServiceVisualProofGrid";
import { ServicePackageSelector } from "@/components/ServicePackageSelector";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { TrustProofPanel } from "@/components/TrustProofPanel";
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
import { buildRegensburgCleaningAreaServedJsonLd } from "@/lib/regensburg-cleaning-service-area";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "regensburg/reinigung",
        title: "Gebäudereinigung Regensburg mit Objekt und Angebot",
        description:
            "Reinigung Regensburg anfragen: Objekt, Fläche, Zustand, Fotos, Termin, Zielzustand und Angebot im 50-km-Umkreis klären.",
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
    const cleaningAreaServed = buildRegensburgCleaningAreaServedJsonLd();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            buildBreadcrumbJsonLd([
                { name: "FLOXANT", item: "/" },
                { name: "Reinigung", item: "/reinigung" },
                { name: "Reinigung Regensburg", item: "/regensburg/reinigung" },
            ]),
            buildServiceJsonLd({
                name: "Reinigung Regensburg",
                description:
                    "Reinigung in Regensburg für Büro, Praxis, Hotel, Fenster, Teppich, Treppenhaus, Baustaub, Grundreinigung, Übergabe und kurzfristige Situationen.",
                path: "/regensburg/reinigung",
                serviceType:
                    "Reinigungsfirma, Putzfirma, Gebäudereinigung, Gewerbereinigung und Spezialreinigung in Regensburg",
                areaServed: cleaningAreaServed,
                availableLanguage: ["de", "en"],
            }),
            buildWebPageJsonLd({
                name: "Reinigung Regensburg mit Service-Finder und direkter Anfrage",
                description:
                    "Reinigung in Regensburg für Büro, Praxis, Treppenhaus, Hotel, Grundreinigung, Baureinigung und Übergabe mit Fotos, Termin, Objektangaben und direkter Anfrage.",
                path: "/regensburg/reinigung",
                about: [
                    "Reinigung Regensburg",
                    "Reinigungsfirma Regensburg",
                    "Putzfirma Regensburg",
                    "Büroreinigung Regensburg",
                    "Gewerbereinigung Regensburg",
                    "Gewerbereinigung",
                    "Reinigung Firmen",
                    "Fensterreinigung Regensburg",
                    "Grundreinigung Regensburg",
                    "Baureinigung Regensburg",
                    "Reinigungsfirma Regensburg Privathaushalt",
                    "Wohnungsreinigungen",
                    "Angebot Reinigung",
                    "Angebot für Reinigungsarbeiten",
                    "Reinigung mit Objektangaben und Fotos",
                    "Hotelreinigung",
                    "Treppenreinigung",
                    "Schlüsselübergabeprotokoll Reinigungsfirma",
                    "Wohnungsübergabe Reinigung",
                    "kurzfristige Reinigung Regensburg",
                    "Regensburg",
                    "Regensburg plus 50 km",
                ],
                potentialActions: [
                    { name: "Reinigung in Regensburg anfragen", target: "/buchung?service=reinigung&city=regensburg#buchungssystem", type: "ContactAction" },
                    { name: "WhatsApp mit Fotos senden", target: `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`, type: "ContactAction" },
                    { name: "Passende Reinigungsleistung finden", target: "/regensburg/reinigung#reinigungsservice-regensburg", type: "Action" },
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
                url: `${company.url}/regensburg/reinigung`,
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
                name: "Passende Wege für Reinigungsanfragen in Regensburg",
                itemListElement: regensburgCleaningBuyerPaths.map((path, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: path.label,
                    url: `${company.url}${path.href.split("#")[0]}`,
                    description: path.answer,
                })),
            },
            {
                "@type": "LocalBusiness",
                "@id": `${company.url}/#localbusiness`,
                name: company.name,
                url: company.url,
                telephone: company.phoneRaw,
                image: `${company.url}/opengraph-image`,
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
                areaServed: cleaningAreaServed,
                knowsAbout: [
                    "Reinigung Regensburg",
                    "Reinigungsfirma Regensburg",
                    "Reinigungsfirma Regensburg Privathaushalt",
                    "Büroreinigung Regensburg",
                    "Praxisreinigung Regensburg",
                    "Hotelreinigung Regensburg",
                    "Grundreinigung Regensburg",
                    "Treppenreinigung",
                    "Gewerbereinigung",
                    "Angebot Reinigung",
                    "Angebot für Reinigungsarbeiten",
                    "Reinigung nach Umzug",
                    "Reinigung Regensburg plus 50 km",
                    "Schlüsselübergabeprotokoll Reinigungsfirma",
                ],
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
                heroBadge="Reinigung Regensburg"
                heroTitle="Reinigung Regensburg mit Fläche, Zustand und Termin anfragen"
                heroText="Beschreiben Sie Objekt, Räume, Zustand, Fotos und Terminwunsch. FLOXANT ordnet Endreinigung, Büroreinigung, Grundreinigung oder Übergabereinigung passend ein, ohne Preis- oder Abnahmeversprechen."
                ctaText="Reinigung anfragen"
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
                <InternationalCustomerHint
                    cityLabel="Regensburg"
                    serviceLabel="Reinigung, Büroreinigung oder Übergabereinigung"
                    tags={["Cleaning service", "Office cleaning", "End-of-tenancy cleaning", "Photos welcome"]}
                    primaryHref="/kontakt?service=reinigung&city=regensburg&intent=reinigung-regensburg&source=website#direktanfrage"
                    photoHref="/kontakt?service=reinigung&city=regensburg&intent=reinigung-mit-fotos&source=website#direktanfrage"
                    offerHref="/angebot-guenstiger-pruefen#guenstiger-form"
                />
                <section className="mx-auto my-10 max-w-6xl rounded-lg border border-cyan-100 bg-cyan-50 p-5 text-slate-950">
                    <p className="text-sm font-black uppercase tracking-normal text-cyan-800">Solarreinigung Regensburg</p>
                    <h2 className="mt-3 text-2xl font-black tracking-normal">
                        PV-Anlage, Dachzugang und Verschmutzung vorab beschreiben.
                    </h2>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                        Für Solarreinigung oder PV-Anlagen-Reinigung in Regensburg helfen Ort, Dachart, Zugang,
                        ungefähre Modulfläche, sichtbare Verschmutzung und Fotos. FLOXANT ordnet Anfrage oder Angebot
                        anhand dieser Eckdaten ein. Ertrag, Preis und Termin werden dadurch nicht zugesagt.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            href="/pv-anlagen-reinigung"
                            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-black text-white"
                        >
                            Solarreinigung Regensburg ansehen
                        </a>
                        <a
                            href="/kontakt?service=angebotscheck&city=regensburg&intent=solarreinigungsangebot-pruefen&source=website"
                            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-slate-950"
                        >
                            Solarreinigungsangebot prüfen
                        </a>
                    </div>
                </section>
                <ServicePackageSelector groups="reinigung" limit={4} />
                <EffortFactorsPanel group="reinigung" limit={6} />
                <TrustProofPanel
                    allowedPage="/regensburg/reinigung"
                    serviceKey="reinigung"
                    locationKey="regensburg"
                    title="Reinigung Regensburg mit sichtbarer Proof-Logik."
                    intro="Fläche, Zustand, Fotos, Zugang, Turnus und Zielzustand machen die R?ckmeldung belastbarer. Bewertungen, Sterne und Ergebnisse werden nicht erfunden."
                />
                <ServiceProofChecklist serviceKey="reinigung" />
                <RequestBriefChecklistBlock
                    serviceKey="reinigung"
                    ctaHref="/buchung?service=reinigung&city=regensburg#buchungssystem"
                    ctaLabel="Anfragebrief vorbereiten"
                    compact
                />
                <PhotoGuidanceBlock serviceKey="reinigung" compact />
                <ServiceVisualProofGrid serviceKey="reinigung" locationKey="regensburg" />
                <LocalProofPanel location="regensburg" />
                <RegensburgCleaningServiceHub />
                <ServiceAreaBlock
                    title="Reinigungs-Servicegebiet Regensburg bis 50 km"
                    intro="Der Reinigungshub bündelt Regensburg, Stadtteile und Orte im Umkreis bis 50 km. Weiter entfernte Orte werden nicht als eigene Reinigungsziele aufgebaut."
                />
                <LocalTrustBlock
                    ctaHref="/buchung?service=reinigung&city=regensburg#buchungssystem"
                    ctaLabel="Reinigung in Regensburg anfragen"
                />
                <CleaningProcessBlock
                    ctaHref="/buchung?service=reinigung&city=regensburg#buchungssystem"
                    ctaLabel="Objektangaben senden"
                />
                <RequestChecklistBlock
                    ctaHref="/buchung?service=reinigung&city=regensburg#buchungssystem"
                    ctaLabel="Reinigungsanfrage vorbereiten"
                />
                <RelatedServicesBlock
                    currentHref="/regensburg/reinigung"
                    title="Reinigungscluster Regensburg"
                    intro="Vom Hub führen die Links zu passenden Leistungsseiten, Angebotsprüfung und Ratgebern für Büro, Gewerbe, Unterhalt, Praxis, Treppenhaus, Fenster, Bau und Grundreinigung."
                    limit={8}
                />
                <RegensburgCleaningConversionLift />
                <RegensburgCleaningClickDecisionPanel />
                <RegensburgCleaningLocalSignals />
                <RegensburgCleaningSnippetAnswers />
            </SpecialtyPageLayout>
        </>
    );
}
