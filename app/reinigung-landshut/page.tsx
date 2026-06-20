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
        baseKey: "reinigung_spec",
        city: "Landshut",
    });

    return generatePageSEO({
        lang: "de",
        path: "reinigung-landshut",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function ReinigungLandshutPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "reinigung_spec",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Reinigung","href":"/reinigung"},{"label":"Landshut"}]}
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
                    eyebrow="Reinigung Landshut"
                    title="Reinigung Landshut mit Fotos, Fläche und Übergabeziel klären."
                    intro="Bei Reinigung in Landshut zählt nicht nur die Stadt, sondern das konkrete Ziel: Wohnung nach Auszug, Bürofläche, Übergabe, Reinigung nach Räumung oder kurzfristiger Termin. Mit Fläche, Zustand, Fotos und gewünschtem Ergebnis kann FLOXANT den nächsten Schritt sachlich prüfen."
                    proofTitle="Für die erste Einschätzung"
                    proofItems={[
                        "Fotos von Küche, Bad, Boden, Fenstern, Zugang und starken Verschmutzungen machen den Aufwand schneller sichtbar.",
                        "Fläche, Raumanzahl, Termin, Schlüsselweg und gewünschter Zielzustand helfen mehr als eine pauschale Preisfrage.",
                        "Wenn vorher geräumt oder umgezogen wird, sollten Restmengen, Übergabe und Reihenfolge direkt mitgenannt werden.",
                    ]}
                    cards={[
                        {
                            title: "Wohnung oder Übergabe",
                            text: "Für Auszug, Einzug oder Vermietertermin zählen Küche, Bad, Böden, Fensterbereiche, Deadline und Schlüsselweg.",
                            href: "/buchung?service=reinigung&city=landshut#buchungssystem",
                            cta: "Reinigung anfragen",
                        },
                        {
                            title: "Reinigung nach Räumung",
                            text: "Nach Entrümpelung werden Staub, Laufspuren, Kellerwege oder vergessene Bereiche oft erst richtig sichtbar.",
                            href: "/entruempelung-landshut",
                            cta: "Räumung mitdenken",
                        },
                        {
                            title: "Angebot prüfen",
                            text: "Vorhandenes Reinigungsangebot mit Fotos, Fläche, Termin und Leistungsumfang senden. FLOXANT prüft sachlich ohne Preisgarantie.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot senden",
                        },
                    ]}
                    checklistTitle="Diese Angaben helfen bei Reinigung in Landshut"
                    checklist={[
                        "Ort oder Stadtteil, Objektart, Fläche, Räume, Termin und Zugang.",
                        "Fotos von Zustand, Küche, Bad, Boden, Fenstern und starken Stellen.",
                        "Ziel: Übergabe, Grundreinigung, Büro, Wohnung, Nachreinigung oder regelmäßiger Bedarf.",
                        "Budget, vorhandenes Angebot oder späteste Deadline optional mitsenden.",
                    ]}
                    combinationsTitle="Sinnvolle Kombinationen"
                    combinations={[
                        {
                            title: "Reinigung + Entrümpelung",
                            text: "Wenn Räume erst frei werden müssen und danach sauber übergeben werden sollen.",
                            href: "/entruempelung-landshut",
                        },
                        {
                            title: "Reinigung + Umzug",
                            text: "Wenn Transport und Rückgabe zeitlich zusammenhängen.",
                            href: "/umzug-landshut",
                        },
                        {
                            title: "Angebot + Fotos",
                            text: "Wenn schon ein Preis vorliegt und Umfang oder Zusatzpunkte unklar sind.",
                            href: "/angebot-guenstiger-pruefen",
                        },
                    ]}
                    primaryHref="/buchung?service=reinigung&city=landshut#buchungssystem"
                    primaryLabel="Reinigung Landshut anfragen"
                    secondaryHref="/kontakt"
                    secondaryLabel="Kontakt öffnen"
                    trackingService="reinigung"
                    trackingCity="landshut"
                    trackingPageIntent="reinigung-landshut"
                    trackingPriority="p0"
                />
                <LocalSeoSearchIntentBridge
                    service="reinigung"
                    city={city}
                    currentHref="/reinigung-landshut"
                />
            </SpecialtyPageLayout>
    );
}
