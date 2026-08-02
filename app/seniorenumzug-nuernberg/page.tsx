import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { LocalSeniorMoveSupport, SeniorMoveOfferCheckCTA } from "@/components/seniorenumzug/SeniorMoveSections";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return generatePageSEO({
        lang: "de",
        path: "seniorenumzug-nuernberg",
        title: "Seniorenumzug ab Regensburg mit Fernziel Nürnberg | FLOXANT",
        description: "Seniorenumzug im Einsatzgebiet bis 75 km um Regensburg mit Nürnberg als möglichem Fernziel anfragen. Keine lokale Verfügbarkeitszusage in Nürnberg.",
    });
}

export default async function SeniorenumzugNuernbergPage({ params }: PageProps) {
    const locale = "de";
    const { localeDict } = await getSpecialtyPageData({
        locale,
        baseKey: "seniorenumzug_spec",
        city: "Nürnberg",
    });

    return (
        <SpecialtyPageLayout
                lang="de"
                dict={localeDict}
                city="Regensburg"
                heroBadge="Fernziel-Anfrage ab Regensburg"
                heroTitle="Seniorenumzug ab Regensburg mit Fernziel Nürnberg"
                heroText="FLOXANT prüft Seniorenumzüge im Einsatzgebiet bis 75 km um Regensburg. Nürnberg kann Ziel einer konkreten Umzugsanfrage sein, ist aber keine lokale FLOXANT Einsatzregion."
                ctaText="Seniorenumzug mit Fernziel anfragen"
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Umzug","href":"/umzug"},{"label":"Seniorenumzug","href":"/seniorenumzug"},{"label":"Fernziel Nürnberg"}]}
                chips={[
                    { icon: Truck, text: "Start im Regensburger Einsatzgebiet" },
                    { icon: Shield, text: "Nürnberg nur als Fernziel" },
                    { icon: Clock, text: "Zusage nach Termin- und Routenprüfung" }
                ]}
                cards={[
                    {
                        icon: Star,
                        title: "Ruhige Umzugsplanung",
                        lines: [
                            "Möbelmenge und Packhilfe erfassen",
                            "Etage, Aufzug und Laufwege klären",
                            "Angehörige und Schlüsselweg abstimmen",
                            "Termin und Fernziel separat prüfen",
                        ]
                    },
                    {
                        icon: Zap,
                        title: "Fernziel Nürnberg",
                        lines: [
                            "Zieladresse und Zugang konkret nennen",
                            "Strecke und Zeitfenster prüfen",
                            "Keine lokale Verfügbarkeit in Nürnberg behaupten",
                            "Durchführung erst nach Machbarkeitszusage",
                        ]
                    }
                ]}
                sectionTitle="Seniorenumzug mit Fernziel realistisch einordnen"
                sectionParagraphs={[
                    "Das verifizierte FLOXANT Einsatzgebiet reicht bis 75 km um Regensburg. Dort werden Start, Umfang, Zugang und Zusatzleistungen eingeordnet.",
                    "Nürnberg ist auf dieser Seite ausschließlich ein mögliches Fernziel der Anfrage und keine Behauptung eines lokalen Standorts oder Einsatzgebiets.",
                ]}
                wizardBadge="Fernziel-Anfrage"
                wizardTitle="Seniorenumzug ab Regensburg anfragen"
                wizardText="Nennen Sie Start im Regensburger Einsatzgebiet, Ziel Nürnberg, Termin, Umfang und Zugang. Die Anfrage ist noch keine Zusage."
            >
                <LocalSeniorMoveSupport city="Fernziel Nürnberg ab Regensburg" route="nuernberg" />
                <SeniorMoveOfferCheckCTA compact />
                <GscOpportunitySection
                    eyebrow="Seniorenumzug mit Fernziel Nürnberg"
                    title="Wenn ein Umzug ruhig, verständlich und mit Rücksicht geplant werden muss."
                    intro="Ein Seniorenumzug in Regensburg betrifft oft mehrere Personen: die umziehende Person, Angehörige, Vermieter, Pflegeeinrichtung oder Hausverwaltung. FLOXANT prüft Möbelmenge, Zugang, Termin, Packhilfe, Reinigung und mögliche Wohnungsauflösung gemeinsam."
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
                            title: "Fernziel Nürnberg prüfen",
                            text: "Nürnberg wird nur als Ziel einer konkreten Anfrage nach Strecke, Termin und Umfang eingeordnet.",
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
                    primaryLabel="Seniorenumzug mit Fernziel Nürnberg anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                />
            </SpecialtyPageLayout>
    );
}
