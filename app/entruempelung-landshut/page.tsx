import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: "de",
        baseKey: "entruempelung_spec",
        city: "Landshut",
    });

    return generatePageSEO({
        lang: "de",
        path: "entruempelung-landshut",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function EntruempelungLandshutPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "entruempelung_spec",
        city: "Landshut",
    });

    return (
        <SpecialtyPageLayout
                lang="de"
                dict={localeDict}
                city={city}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, "de")}
                heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
                ctaText={resolveField(content.cta, fallback.cta, city, "de")}
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Entrümpelung","href":"/entruempelung"},{"label":"Landshut"}]}
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
                <GscOpportunitySection
                    eyebrow="Entrümpelung Landshut"
                    title="Entrümpelung Landshut mit Menge, Zugang und Zielzustand klären."
                    intro="Für Entrümpelung in Landshut sind Fotos, Menge, Material, Etage, Laufweg, Freigabe und gewünschter Endzustand wichtiger als ein pauschaler Schnellpreis. FLOXANT prüft, ob Räumung, Entsorgung und Reinigung danach zusammen oder getrennt sinnvoll sind."
                    proofTitle="Wichtig vor dem Angebot"
                    proofItems={[
                        "Fotos von Räumen, Keller, Garage, Möbeln, Zugang und Laufwegen beschleunigen die Einschätzung.",
                        "Menge, Material, Gewicht, Etage, Aufzug und Parkmöglichkeit verändern Aufwand und Ablauf deutlich.",
                        "Reinigung nach Räumung, Übergabe oder Restmengen werden getrennt geprüft und nicht pauschal versprochen.",
                    ]}
                    cards={[
                        {
                            title: "Wohnung, Keller oder Garage",
                            text: "Räume, Menge, schwere Stücke, Laufwege und Freigabe direkt nennen, damit der Umfang sichtbar wird.",
                            href: "/buchung?service=entsorgung&city=landshut#buchungssystem",
                            cta: "Entrümpelung anfragen",
                        },
                        {
                            title: "Reinigung danach",
                            text: "Wenn danach übergeben, vermietet oder verkauft werden soll, hilft ein sauberer Reinigungsplan nach der Räumung.",
                            href: "/reinigung-landshut",
                            cta: "Reinigung prüfen",
                        },
                        {
                            title: "Angebot einordnen",
                            text: "Ein vorhandenes Räumungs- oder Entsorgungsangebot kann mit Fotos, Menge und Zielzustand sachlich geprüft werden.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                    ]}
                    checklistTitle="Diese Angaben helfen bei Entrümpelung in Landshut"
                    checklist={[
                        "Räume, Menge, Fotos, Materialarten, schwere Gegenstände und gewünschter Endzustand.",
                        "Etage, Aufzug, Laufweg, Parkmöglichkeit, Schlüsselweg und Ansprechpartner.",
                        "Ob danach Reinigung, Übergabe, Verkaufsvorbereitung oder weitere Entsorgung nötig ist.",
                        "Vorhandenes Angebot, Budget oder Deadline optional mitsenden.",
                    ]}
                    combinationsTitle="Sinnvolle Kombinationen"
                    combinations={[
                        {
                            title: "Entrümpelung + Reinigung",
                            text: "Wenn nach der Räumung Küche, Bad, Böden oder Übergabe vorbereitet werden müssen.",
                            href: "/reinigung-landshut",
                        },
                        {
                            title: "Entrümpelung + Wohnungsauflösung",
                            text: "Wenn Wohnung, Keller und Freigabe zusammen betrachtet werden müssen.",
                            href: "/wohnungsaufloesung-bayern",
                        },
                        {
                            title: "Kleinmengen + Entsorgung",
                            text: "Wenn einzelne Gegenstände, Sperrgut oder reguläre Restmengen eingeordnet werden sollen.",
                            href: "/kleinmengen-entsorgung",
                        },
                    ]}
                    primaryHref="/buchung?service=entsorgung&city=landshut#buchungssystem"
                    primaryLabel="Entrümpelung Landshut anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                    trackingService="entruempelung"
                    trackingCity="landshut"
                    trackingPageIntent="entruempelung-landshut"
                    trackingPriority="p0"
                />
                <LocalSeoSearchIntentBridge
                    service="entruempelung"
                    city={city}
                    currentHref="/entruempelung-landshut"
                />
            </SpecialtyPageLayout>
    );
}
