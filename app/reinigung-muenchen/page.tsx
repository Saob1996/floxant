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
        city: "München",
    });

    return generatePageSEO({
        lang: "de",
        path: "reinigung-muenchen",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function ReinigungMuenchenPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "reinigung_spec",
        city: "München",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Reinigung","href":"/reinigung"},{"label":"München"}]}
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
                    eyebrow="Reinigung München"
                    title="Wohnung, Büro oder Übergabe in München realistisch reinigen lassen."
                    intro="Reinigung in München wird schnell unklar, wenn nur nach einem Preis gefragt wird. Für eine brauchbare Rückmeldung zählen Objektart, Fläche, Zustand, Fotos, Zugang, Termin, gewünschtes Ergebnis und ob Umzug, Entrümpelung oder Übergabe mit hineinspielen."
                    proofTitle="Wichtig für München"
                    proofItems={[
                        "Für Wohnung, Büro, Apartment, Treppenhaus oder Übergabe unterscheiden sich Aufwand, Material und Zeitfenster deutlich.",
                        "Fotos von Küche, Bad, Boden, Fenstern, Laufwegen und besonderen Stellen machen die erste Einschätzung konkreter.",
                        "Kurzfristige Termine werden nach Machbarkeit geprüft. Es gibt keine pauschale Sofort- oder Preisgarantie.",
                    ]}
                    cards={[
                        {
                            title: "Endreinigung nach Auszug",
                            text: "Wenn Vermietertermin, Schlüsselrückgabe oder Verkauf ansteht, zählen Küche, Bad, Böden, Fensterbereiche und Restpunkte.",
                            href: "/umzug-mit-reinigung",
                            cta: "Übergabe vorbereiten",
                        },
                        {
                            title: "Büro oder Gewerbefläche",
                            text: "Raumliste, Turnus, Randzeiten, Sanitärbereiche, Küche, Zugang und Ansprechpartner direkt nennen.",
                            href: "/gewerbereinigung",
                            cta: "Gewerbe prüfen",
                        },
                        {
                            title: "Angebot prüfen lassen",
                            text: "Vorhandenes Reinigungsangebot hochladen oder Eckdaten senden. FLOXANT prüft Umfang und mögliche Alternative sachlich.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                    ]}
                    checklistTitle="Diese Angaben helfen bei Reinigung in München"
                    checklist={[
                        "Stadtteil oder PLZ, Objektart, Fläche, Räume, Etage, Zugang und gewünschter Termin.",
                        "Fotos von Zustand, Küche, Bad, Boden, Glasflächen, Möbeln oder Restmengen.",
                        "Einmalige Reinigung, regelmäßiger Turnus, Endreinigung oder Reinigung nach Umzug klar benennen.",
                        "Budgetrahmen, vorhandenes Angebot oder Deadline optional mitsenden.",
                    ]}
                    combinationsTitle="München-Fälle mit zusätzlichem Bedarf"
                    combinations={[
                        {
                            title: "Umzug + Reinigung",
                            text: "Wenn Transport und Übergabe zeitlich zusammenhängen.",
                            href: "/umzug-muenchen",
                        },
                        {
                            title: "Entrümpelung + Reinigung",
                            text: "Nach Räumung oder Kellerleerung wird der Reinigungsbedarf oft erst sichtbar.",
                            href: "/entruempelung-muenchen",
                        },
                        {
                            title: "Apartment oder möblierte Wohnung",
                            text: "Für möblierte Flächen zählen Fotos, Nutzung, Bettwäsche/Inventargrenzen und Zeitfenster.",
                            href: "/reinigung-muenchen",
                        },
                        {
                            title: "Preisrahmen nennen",
                            text: "Für Kostenfragen sind Fläche, Zustand, Termin und Fotos wichtiger als eine schnelle Pauschale.",
                            href: "/anfrage-mit-preisrahmen",
                        },
                    ]}
                    primaryHref="/buchung?service=reinigung&city=muenchen#buchungssystem"
                    primaryLabel="Reinigung München anfragen"
                    secondaryHref="/anfrage-mit-preisrahmen"
                    secondaryLabel="Budget nennen"
                />
                <LocalSeoSearchIntentBridge
                    service="reinigung"
                    city={city}
                    currentHref="/reinigung-muenchen"
                />
            </SpecialtyPageLayout>
    );
}
