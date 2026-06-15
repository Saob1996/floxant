import { Metadata } from "next";
import Link from "next/link";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import {
    ArrowRight,
    BadgeEuro,
    Building2,
    ClipboardCheck,
    Home,
    Route,
    Shield,
    Sparkles,
    Star,
    Truck,
    Clock,
    Zap,
} from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

const munichCustomerIntents = [
    {
        Icon: BadgeEuro,
        title: "Umzugsangebot München prüfen",
        text: "Wenn bereits ein Angebot, ein Preisrahmen oder eine Kostenschätzung vorliegt, helfen Start, Ziel, Etage, Laufweg, Volumen, Termin und Fotos für eine sachliche Einordnung.",
        href: "/angebot-guenstiger-pruefen",
        cta: "Angebot/Budget senden",
    },
    {
        Icon: Home,
        title: "Privatumzug München ohne unnötige Hektik",
        text: "Für Wohnung, Apartment oder WG reichen zum Start grobe Möbelmenge, Kartons, Etagen, Aufzug, Haltezone, Terminfenster und Fotos von Treppenhaus oder Laufweg.",
        href: "/umzug-muenchen",
        cta: "Privatumzug anfragen",
    },
    {
        Icon: Route,
        title: "Umzug in München und Umgebung prüfen",
        text: "Ob Schwanthalerhöhe, Haidhausen, Sendling, Grafing oder ein Ort im Umland: Entscheidend sind Start, Ziel, Laufweg, Haltezone, Termin und Fotos.",
        href: "/umzug-muenchen",
        cta: "Ort und Termin klären",
    },
    {
        Icon: Sparkles,
        title: "Komplettumzug mit Reinigung oder Übergabe",
        text: "Wenn Abbau, Tragen, Verpacken, Restmengen, Endreinigung oder Übergabe zusammenhängen, wird der Ablauf in klare Schritte getrennt.",
        href: "/umzug-mit-reinigung",
        cta: "Kombination prüfen",
    },
    {
        Icon: Shield,
        title: "Seniorenumzug mit ruhiger Abstimmung",
        text: "Wenn Angehörige mitorganisieren, zählen Rückruf, Packhilfe, klare Freigabe, Reinigung, Übergabe und ein Ansprechpartner, der den Ablauf ruhig hält.",
        href: "/seniorenumzug-bayern",
        cta: "Ruhig planen",
    },
    {
        Icon: Building2,
        title: "Büroumzug München mit planbarem Zeitfenster",
        text: "Für Büro, praxisnahe Räume oder kleine Firmen zählen Arbeitsplätze, Möbel, IT-nahe Bereiche, Randzeiten, Ansprechpartner und ein Zeitfenster, das den Betrieb möglichst wenig stört.",
        href: "/bueroumzug-muenchen",
        cta: "Büroumzug planen",
    },
    {
        Icon: Route,
        title: "Fernumzug aus oder nach München",
        text: "Bei längeren Strecken werden Route, Rückfahrt, Ladevolumen, Terminfenster, Zugang und Zusatzleistungen besonders wichtig. Fotos vermeiden falsche Annahmen.",
        href: "/blog/fernumzug-bayern-nrw-tipps",
        cta: "Fernumzug einordnen",
    },
    {
        Icon: ClipboardCheck,
        title: "Nach dem Umzug: Reinigung, Restmengen und Übergabe",
        text: "Wenn die alte Wohnung noch übergeben werden muss, sollten Endreinigung, Restmengen, Schlüsselweg, Fotos und Übergabetermin früh mitgedacht werden.",
        href: "/blog/reinigung-nach-umzug-angebot-regensburg-muenchen",
        cta: "Übergabe vorbereiten",
    },
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: "de",
        baseKey: "umzug_spec",
        city: "München",
    });

    return generatePageSEO({
        lang: "de",
        path: "umzug-muenchen",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function UmzugMuenchenPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "umzug_spec",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Umzug","href":"/umzug"},{"label":"München"}]}
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
                <LocalSeoSearchIntentBridge
                    service="umzug"
                    city={city}
                    currentHref="/umzug-muenchen"
                />
                <section className="flox-section px-6 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 max-w-3xl">
                            <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
                                Häufige Anliegen in München
                            </div>
                            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
                                Umzug München: Kosten, Termin und Umfang verständlich klären
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Ob Privatumzug, Büroumzug, Komplettumzug, Seniorenumzug oder
                                Fernumzug: Für eine verlässliche Rückmeldung zählen praktische
                                Eckdaten. Je konkreter Start, Ziel, Menge, Zugang, Termin, Budget
                                und Fotos sind, desto schneller lässt sich der nächste Schritt prüfen.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {munichCustomerIntents.map(({ Icon, ...item }) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group flex min-h-[16rem] min-w-0 flex-col rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
                                    data-event="service_card_click"
                                    data-region="muenchen"
                                    data-service="umzug"
                                >
                                    <span className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-slate-950 text-white">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-5 text-xl font-black leading-snug text-slate-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                                        {item.text}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                                        {item.cta}
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <GscOpportunitySection
                    eyebrow="Umzug München aus Google-Suchen"
                    title="Damit aus einer groben Suche nach Umzug München eine prüfbare Anfrage wird."
                    intro="Viele Münchner Umzugsanfragen starten mit Unsicherheit: Festpreis, Privatumzug, Fernumzug, Haltezone, Reinigung danach oder kurzfristiger Termin. FLOXANT ordnet Start, Ziel, Etage, Laufweg, Volumen, Fotos, Termin und Budget, bevor ein Auftrag verbindlich geplant wird."
                    proofTitle="Wichtig für München"
                    proofItems={[
                        "Für München zählen Haltezone, Parkmöglichkeit, Aufzug, Laufweg, Etage und enge Zeitfenster oft stärker als eine pauschale Zimmeranzahl.",
                        "Privatumzug, Fernumzug und Komplettumzug brauchen unterschiedliche Angaben zu Volumen, Strecke, Zusatzleistungen und Übergabe.",
                        "Wenn Reinigung nach dem Umzug, Restmengen oder Schlüsselübergabe dazugehören, sollte das direkt mit Fotos und Deadline genannt werden.",
                    ]}
                    cards={[
                        {
                            title: "Privatumzug München",
                            text: "Wohnung, Apartment oder WG mit Möbelmenge, Kartons, Etage, Aufzug, Laufweg, Haltezone und Fotos realistisch einordnen.",
                            href: "/umzug-muenchen",
                            cta: "Privatumzug prüfen",
                        },
                        {
                            title: "Fernumzug München",
                            text: "Für längere Strecken zählen Route, Rückfahrt, Ladevolumen, Terminfenster, Zugang und mögliche Zusatzleistungen.",
                            href: "/blog/umzug-muenchen-festpreis-fernumzug-organisieren",
                            cta: "Fernumzug planen",
                        },
                        {
                            title: "Umzugsangebot München prüfen",
                            text: "Vorhandenes Angebot, Preisrahmen, Fotos, Strecke, Etage und Volumen können vor einer Zusage sachlich eingeordnet werden.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot senden",
                        },
                        {
                            title: "Reinigung nach Umzug München",
                            text: "Wenn die alte Wohnung übergeben werden muss, helfen Räume, Zustand, Fotos, Schlüsselweg und Übergabetermin.",
                            href: "/reinigung-muenchen",
                            cta: "Reinigung mitdenken",
                        },
                        {
                            title: "Büroumzug München",
                            text: "Arbeitsplätze, Möbel, IT-nahe Bereiche, Randzeiten, Zugang und Ansprechpartner müssen vorab sauber getrennt werden.",
                            href: "/bueroumzug-muenchen",
                            cta: "Büro planen",
                        },
                        {
                            title: "Kurzfristiger Termin",
                            text: "Bei Eilumzug zählt, was zwingend mit muss, welche Zugänge frei sind und welche Fotos Engstellen zeigen.",
                            href: "/notfall-umzug-bayern",
                            cta: "Machbarkeit prüfen",
                        },
                    ]}
                    checklistTitle="Diese Angaben beschleunigen die Rückmeldung"
                    checklist={[
                        "Start, Ziel, Etage, Aufzug, Laufweg, Parkmöglichkeit und Haltezone.",
                        "Grobe Möbelmenge, Kartons, große Einzelstücke und Fotos von Engstellen.",
                        "Terminfenster, gewünschte Zusatzleistungen, Reinigung danach und Ansprechpartner.",
                        "Budget oder vorhandenes Angebot, wenn eine Einordnung gewünscht ist.",
                    ]}
                    combinationsTitle="Häufige Kombinationen in München"
                    combinations={[
                        {
                            title: "Umzug + Reinigung",
                            text: "Alte Wohnung, Übergabetermin, Schlüsselweg und Restpunkte früh mitplanen.",
                            href: "/reinigung-muenchen",
                        },
                        {
                            title: "Umzug + Angebot prüfen",
                            text: "Preis, Umfang, Etagen, Laufwege und Zusatzleistungen vor Zusage einordnen.",
                            href: "/angebot-guenstiger-pruefen",
                        },
                        {
                            title: "Privatumzug + Fernstrecke",
                            text: "Route, Ladevolumen, Termin und mögliche Rückfahrt sauber klären.",
                            href: "/blog/fernumzug-bayern-nrw-tipps",
                        },
                        {
                            title: "Büro + Randzeit",
                            text: "Betriebsunterbrechung vermeiden und Ansprechpartner, Technik und Zugang abstimmen.",
                            href: "/bueroumzug-muenchen",
                        },
                    ]}
                    primaryHref="/buchung?service=umzug&city=muenchen#buchungssystem"
                    primaryLabel="Umzug München anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                />
            </SpecialtyPageLayout>
    );
}
