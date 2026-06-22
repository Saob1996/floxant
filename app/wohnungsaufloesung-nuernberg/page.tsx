import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
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
        city: "Nürnberg",
    });

    return generatePageSEO({
        lang: "de",
        path: "wohnungsaufloesung-nuernberg",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function WohnungsaufloesungNuernbergPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "entruempelung_spec",
        city: "Nürnberg",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Entrümpelung","href":"/entruempelung"},{"label":"Wohnungsauflösung","href":"/wohnungsaufloesung-bayern"},{"label":"Nürnberg"}]}
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
                    eyebrow="Wohnungsauflösung Nürnberg"
                    title="Wohnung, Keller oder Haushalt in Nürnberg geordnet auflösen."
                    intro="Eine Wohnungsauflösung in Nürnberg braucht klare Freigaben: Was darf weg, was bleibt, wer hat Schlüssel und welcher Zustand wird für Übergabe, Verkauf oder Neuvermietung gebraucht? FLOXANT prüft Umfang, Fotos, Zugang, Entsorgung und mögliche Endreinigung gemeinsam."
                    proofTitle="Wichtig für Nürnberg"
                    proofItems={[
                        "Für Wohnung, Keller, Dachboden, Garage oder Nachlass zählen Fotos, Raumliste, Etage und Laufweg.",
                        "Wenn eine Übergabe ansteht, sollten Räumung, Endreinigung und Schlüsselweg direkt zusammen geplant werden.",
                        "Ein vorhandenes Angebot kann geprüft werden, wenn Umfang, Zusatzkosten, Entsorgung und Termin sichtbar sind.",
                    ]}
                    cards={[
                        {
                            title: "Wohnung vollständig leeren",
                            text: "Räume, Keller, Balkon und größere Möbel erfassen. Fotos helfen, den Umfang ohne lange Vorbesichtigung einzuordnen.",
                            href: "/wohnungsaufloesung-bayern",
                            cta: "Ablauf ansehen",
                        },
                        {
                            title: "Nachlass oder sensible Lage",
                            text: "Bei Nachlass, Pflegeheim, Trennung oder Zeitdruck zählt ruhige Abstimmung mit einer entscheidenden Kontaktperson.",
                            href: "/blog/nachlassraeumung-mit-respekt",
                            cta: "Ruhig vorbereiten",
                        },
                        {
                            title: "Angebot prüfen lassen",
                            text: "Preis, Umfang, Container, Entsorgungsweg und Zusatzleistungen werden erst vergleichbar, wenn die Eckdaten klar sind.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                    ]}
                    checklistTitle="Diese Angaben reichen für den Start"
                    checklist={[
                        "Nürnberger Stadtteil, Etage, Aufzug, Laufweg, Parkmöglichkeit und Schlüsselweg.",
                        "Fotos von Räumen, Keller, Dachboden, Garage, Möbeln und Restmengen.",
                        "Freigabe: was bleibt, was darf weg, wer entscheidet und welche Frist gilt.",
                        "Ob Endreinigung, Übergabevorbereitung oder Rückmeldung mit Fotos benötigt wird.",
                    ]}
                    combinationsTitle="Sinnvolle Kombinationen"
                    combinations={[
                        {
                            title: "Räumung + Endreinigung",
                            text: "Für Übergabe, Verkauf oder Neuvermietung nach der Haushaltsauflösung.",
                            href: "/regensburg/endreinigung",
                        },
                        {
                            title: "Keller + Wohnung",
                            text: "Wichtig, wenn Vermieter oder Käufer alle Nebenflächen leer erwarten.",
                            href: "/entruempelung-bayern",
                        },
                        {
                            title: "Nicht vor Ort",
                            text: "Mit Schlüsselweg, Fotos und Rückmeldung lässt sich der Ablauf auch aus der Ferne vorbereiten.",
                            href: "/human-api",
                        },
                        {
                            title: "Preisrahmen nennen",
                            text: "Budget und vorhandene Angebote helfen, eine realistische Richtung zu prüfen.",
                            href: "/anfrage-mit-preisrahmen",
                        },
                    ]}
                    primaryHref="/buchung?service=wohnungsaufloesung&city=nuernberg#buchungssystem"
                    primaryLabel="Wohnungsauflösung anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                />
            </SpecialtyPageLayout>
    );
}
