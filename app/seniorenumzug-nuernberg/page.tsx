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
        baseKey: "seniorenumzug_spec",
        city: "Nürnberg",
    });

    return generatePageSEO({
        lang: "de",
        path: "seniorenumzug-nuernberg",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function SeniorenumzugNuernbergPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "seniorenumzug_spec",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Umzug","href":"/umzug"},{"label":"Seniorenumzug","href":"/seniorenumzug"},{"label":"Nürnberg"}]}
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
                    eyebrow="Seniorenumzug Nürnberg"
                    title="Wenn ein Umzug ruhig, verständlich und mit Rücksicht geplant werden muss."
                    intro="Ein Seniorenumzug in Nürnberg betrifft oft mehrere Personen: die umziehende Person, Angehörige, Vermieter, Pflegeeinrichtung oder Hausverwaltung. FLOXANT prüft Möbelmenge, Zugang, Termin, Packhilfe, Reinigung und mögliche Wohnungsauflösung gemeinsam."
                    proofTitle="Gut zu wissen"
                    proofItems={[
                        "Fotos, Möbelmenge, Etage, Aufzug und Laufwege helfen, den Aufwand ohne Vor-Ort-Termin besser einzuschätzen.",
                        "Angehörige können Ansprechpartner, Freigaben, Schlüsselweg und gewünschte Rückmeldung direkt mitsenden.",
                        "Wenn Räumung, Entsorgung, Reinigung oder Übergabe dazugehören, sollten diese Punkte früh getrennt genannt werden.",
                    ]}
                    cards={[
                        {
                            title: "Umzug aus Wohnung oder Haus",
                            text: "Start, Ziel, Möbelmenge, Kartons, Etage, Aufzug, Laufweg und Terminfenster reichen für eine erste Prüfung.",
                            href: "/seniorenumzug-nuernberg",
                            cta: "Umzug anfragen",
                        },
                        {
                            title: "Angehörige organisieren mit",
                            text: "Wenn Entscheidungen auf mehrere Personen verteilt sind, helfen klare Freigaben, Rückrufzeit und ein Ansprechpartner.",
                            href: "/seniorenumzug",
                            cta: "Abstimmung klären",
                        },
                        {
                            title: "Wohnung danach räumen",
                            text: "Wenn nur ein Teil mitzieht, werden Restmöbel, Keller, Entsorgung und Zielzustand gesondert geprüft.",
                            href: "/wohnungsaufloesung-nuernberg",
                            cta: "Auflösung prüfen",
                        },
                        {
                            title: "Endreinigung und Übergabe",
                            text: "Für die alte Wohnung zählen Schlüsselweg, Räume, Fotos, Restpunkte und der verbindliche Übergabetermin.",
                            href: "/umzug-mit-reinigung",
                            cta: "Übergabe vorbereiten",
                        },
                        {
                            title: "Angebot prüfen lassen",
                            text: "Vorhandenes Angebot, Fotos, Termin, Etage, Volumen und Budget können für eine zweite Einschätzung gesendet werden.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                        {
                            title: "Bayernweite Route prüfen",
                            text: "Nürnberg wird nach Strecke, Termin, Umfang und verfügbaren Kombinationen eingeordnet.",
                            href: "/regensburg",
                            cta: "Regensburg ansehen",
                        },
                    ]}
                    checklistTitle="Für die erste Rückmeldung"
                    checklist={[
                        "Startadresse, Zieladresse, Etage, Aufzug, Laufweg und Termin.",
                        "Möbelmenge, Kartons, Fotos und besondere Stücke.",
                        "Ansprechpartner, Angehörige, Freigaben und Schlüsselweg.",
                        "Zusatzbedarf: Packhilfe, Entrümpelung, Reinigung oder Übergabe.",
                    ]}
                    combinationsTitle="Häufig passende Zusatzleistungen"
                    combinations={[
                        {
                            title: "Seniorenumzug + Packhilfe",
                            text: "Wenn Vorbereitung und Kartons ruhig organisiert werden sollen.",
                            href: "/seniorenumzug",
                        },
                        {
                            title: "Seniorenumzug + Wohnungsauflösung",
                            text: "Wenn nur ein Teil mitzieht und der Rest geordnet geräumt wird.",
                            href: "/wohnungsaufloesung-nuernberg",
                        },
                        {
                            title: "Umzug + Endreinigung",
                            text: "Für eine sauber vorbereitete Wohnungsübergabe.",
                            href: "/umzug-mit-reinigung",
                        },
                        {
                            title: "Angebot prüfen",
                            text: "Vorhandenes Angebot mit Fotos und Eckdaten einordnen.",
                            href: "/angebot-guenstiger-pruefen",
                        },
                    ]}
                    primaryHref="/buchung?service=seniorenumzug#buchungssystem"
                    primaryLabel="Seniorenumzug Nürnberg anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                />
            </SpecialtyPageLayout>
    );
}
