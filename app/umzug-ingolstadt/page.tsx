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
        baseKey: "umzug_spec",
        city: "Ingolstadt",
    });

    return generatePageSEO({
        lang: "de",
        path: "umzug-ingolstadt",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function UmzugIngolstadtPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "umzug_spec",
        city: "Ingolstadt",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Umzug","href":"/umzug"},{"label":"Ingolstadt"}]}
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
                    eyebrow="Umzug Ingolstadt"
                    title="Umzug in Ingolstadt mit Strecke, Zugang und Budget sauber vorbereiten."
                    intro="Bei einem Umzug in Ingolstadt geht es nicht nur um Kartons. Entscheidend sind Start, Ziel, Etage, Laufweg, Haltezone, Möbelmenge, Termin und ob Reinigung, Entsorgung oder Übergabe danach mitgedacht werden müssen."
                    proofTitle="Wichtig für Ingolstadt"
                    proofItems={[
                        "Für Altbau, Innenstadtlage, enge Zufahrt oder längere Strecke zählen Fotos von Treppenhaus, Eingang und Möbeln.",
                        "Ein Budget hilft, wenn gleichzeitig Volumen, Etagen, Laufwege und Zusatzleistungen ehrlich beschrieben werden.",
                        "Wenn ein vorhandenes Angebot vorliegt, können Umfang, Festpreislogik und offene Zusatzkosten sachlich geprüft werden.",
                    ]}
                    cards={[
                        {
                            title: "Privatumzug oder Wohnungswechsel",
                            text: "Start, Ziel, Möbelmenge, Kartons, Etagen, Aufzug und Termin reichen für eine erste Prüfung.",
                            href: "/buchung?service=umzug&city=ingolstadt#buchungssystem",
                            cta: "Umzug anfragen",
                        },
                        {
                            title: "Umzug mit Reinigung",
                            text: "Wenn die alte Wohnung übergeben werden muss, sollten Endreinigung, Restmengen und Schlüsseltermin direkt mitgedacht werden.",
                            href: "/umzug-mit-reinigung",
                            cta: "Kombi prüfen",
                        },
                        {
                            title: "Angebot oder Festpreis prüfen",
                            text: "Ein Preis ist nur belastbar, wenn Volumen, Laufwege, Zusatzleistungen und Termin wirklich enthalten sind.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                    ]}
                    checklistTitle="Für eine schnelle Rückmeldung"
                    checklist={[
                        "Startadresse, Zieladresse, Etagen, Aufzug, Laufweg, Haltezone und Terminwunsch.",
                        "Fotos von großen Möbeln, Treppenhaus, Hauseingang, Keller und schwierigen Stellen.",
                        "Grobe Kartonzahl, Abbauwünsche, empfindliche Gegenstände und mögliche Entsorgung.",
                        "Ob danach Reinigung, Übergabe, Einlagerung oder Rückfahrt eine Rolle spielt.",
                    ]}
                    combinationsTitle="Häufig zusammen angefragt"
                    combinations={[
                        {
                            title: "Umzug + Endreinigung",
                            text: "Für Auszug, Übergabe und Vermietertermin nach dem Transport.",
                            href: "/umzug-mit-reinigung",
                        },
                        {
                            title: "Umzug + Entsorgung",
                            text: "Für alte Möbel, Kellerreste oder Dinge, die nicht mit in die neue Wohnung sollen.",
                            href: "/firmenentsorgung",
                        },
                        {
                            title: "Seniorenumzug",
                            text: "Für Angehörige mit ruhiger Abstimmung, Packhilfe und klarer Freigabe.",
                            href: "/seniorenumzug-bayern",
                        },
                        {
                            title: "Budget nennen",
                            text: "Wenn ein Preisrahmen wichtig ist, helfen Fotos und ehrliche Eckdaten.",
                            href: "/anfrage-mit-preisrahmen",
                        },
                    ]}
                    primaryHref="/buchung?service=umzug&city=ingolstadt#buchungssystem"
                    primaryLabel="Umzug Ingolstadt anfragen"
                    secondaryHref="/anfrage-mit-preisrahmen"
                    secondaryLabel="Budget nennen"
                />
                <LocalSeoSearchIntentBridge
                    service="umzug"
                    city={city}
                    currentHref="/umzug-ingolstadt"
                />
            </SpecialtyPageLayout>
    );
}
