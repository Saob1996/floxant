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
        city: "Regensburg",
    });

    return generatePageSEO({
        lang: "de",
        path: "entruempelung-regensburg",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function EntruempelungRegensburgPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "entruempelung_spec",
        city: "Regensburg",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Entrümpelung","href":"/entruempelung"},{"label":"Regensburg"}]}
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
                    eyebrow="Entrümpelung Regensburg richtig starten"
                    title="Wohnung, Keller, Gewerbefläche oder Nachlass: erst klären, dann räumen."
                    intro="Viele Entrümpelungen beginnen mit Unsicherheit: Was muss weg, was bleibt, wer gibt frei und muss danach gereinigt werden? FLOXANT ordnet Menge, Zugang, Fotos, Entsorgung, Termin und den gewünschten Endzustand, bevor ein Auftrag verbindlich geplant wird."
                    proofTitle="Wichtig für Regensburg"
                    proofItems={[
                        "Für Wohnungen, Keller, Dachboden, Garage, Lager, Büroreste und Haushaltsauflösung zählen Fotos, Etage, Laufweg und Freigabe.",
                        "Wenn eine Übergabe bevorsteht, sollten Räumung, Endreinigung, Schlüsselweg und Rückmeldung zusammen gedacht werden.",
                        "Vorhandene Angebote können sachlich geprüft werden, wenn Umfang, Entsorgungsweg, Zusatzkosten und Termin erkennbar sind.",
                    ]}
                    cards={[
                        {
                            title: "Wohnung oder Haus räumen",
                            text: "Zimmer, Keller, Balkon, Garage und Restmengen beschreiben. Fotos reichen oft, um den ersten Aufwand einzuschätzen.",
                            href: "/wohnungsaufloesung-regensburg",
                            cta: "Wohnungsauflösung ansehen",
                        },
                        {
                            title: "Entrümpelung vor Übergabe",
                            text: "Wenn Vermieter, Käufer oder Verwaltung einen Termin gesetzt haben, werden Räumung, Reinigung und Schlüsselweg gemeinsam sortiert.",
                            href: "/regensburg/uebergabereinigung",
                            cta: "Übergabe mitdenken",
                        },
                        {
                            title: "Angebot prüfen lassen",
                            text: "Sie haben schon ein Entrümpelungsangebot? Senden Sie Preis, Umfang, Fotos und offene Punkte für eine zweite Einordnung.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                    ]}
                    checklistTitle="Diese Angaben helfen bei der ersten Rückmeldung"
                    checklist={[
                        "Adresse oder Stadtteil in Regensburg, Etage, Aufzug, Laufweg und Parkmöglichkeit.",
                        "Fotos von Räumen, Keller, Möbeln, Sperrmüll, Elektrogeräten und besonderen Stellen.",
                        "Was bleibt, was muss weg, wer darf entscheiden und ob eine Reinigung danach gebraucht wird.",
                        "Terminwunsch, Übergabetermin oder Frist sowie ein grober Budgetrahmen, falls vorhanden.",
                    ]}
                    combinationsTitle="Häufig sinnvoll kombiniert"
                    combinations={[
                        {
                            title: "Entrümpelung + Endreinigung",
                            text: "Nach dem Räumen werden Küche, Bad, Böden und Laufwege oft erst richtig sichtbar.",
                            href: "/endreinigung-regensburg",
                        },
                        {
                            title: "Haushaltsauflösung + Übergabe",
                            text: "Für Nachlass, Umzug ins Pflegeheim oder Wohnungsaufgabe mit klarer Freigabe.",
                            href: "/wohnungsaufloesung-regensburg",
                        },
                        {
                            title: "Kleinmengen + Entsorgung",
                            text: "Wenn kein kompletter Haushalt betroffen ist, kann eine kleinere Entsorgung reichen.",
                            href: "/kleinmengen-entsorgung",
                        },
                        {
                            title: "Nicht vor Ort",
                            text: "Schlüsselweg, Fotos und Rückmeldung können vorab sauber vereinbart werden.",
                            href: "/human-api",
                        },
                    ]}
                    primaryHref="/buchung?service=entruempelung&city=regensburg#buchungssystem"
                    primaryLabel="Entrümpelung anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                />
                <LocalSeoSearchIntentBridge
                    service="entruempelung"
                    city={city}
                    currentHref="/entruempelung-regensburg"
                />
            </SpecialtyPageLayout>
    );
}
