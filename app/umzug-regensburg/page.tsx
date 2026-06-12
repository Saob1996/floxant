import { Metadata } from "next";
import Link from "next/link";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { ArrowRight, Clock, Shield, Star, Truck, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

const regensburgMoveCards = [
    {
        Icon: Truck,
        title: "Umzug in Regensburg klar anfragen",
        text: "Für den Start reichen Startadresse, Zieladresse, Etage, Aufzug, grobe Möbelmenge, Terminfenster und ein paar Fotos von Laufwegen oder Treppenhaus.",
        href: "/buchung?service=umzug#buchungssystem",
        cta: "Umzug anfragen",
    },
    {
        Icon: Star,
        title: "Umzugsservice mit Abbau",
        text: "Wenn Schränke, Betten, Küche oder Regale abgebaut werden sollen, hilft eine kurze Liste mit Fotos. So lässt sich klären, was am Umzugstag realistisch eingeplant werden kann.",
        href: "/umzug-regensburg#umzug-regensburg-kundenfragen",
        cta: "Abbau nennen",
    },
    {
        Icon: Shield,
        title: "Auszug, Reinigung und Übergabe mitdenken",
        text: "Bei vielen Umzügen bleibt die alte Wohnung nicht einfach leer zurück. Restmengen, Endreinigung, Schlüsselweg und Übergabetermin sollten früh zusammen genannt werden.",
        href: "/umzug-reinigung-regensburg",
        cta: "Übergabe vorbereiten",
    },
    {
        Icon: Clock,
        title: "Termin mit wenig Vorlauf",
        text: "Wenn der Termin drückt, zählen klare Prioritäten: Was muss zwingend mit, was kann später folgen, welche Zugänge sind frei und welche Fotos zeigen die Engstellen?",
        href: "/notfall-umzug-bayern",
        cta: "Machbarkeit prüfen",
    },
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: "de",
        baseKey: "umzug_spec",
        city: "Regensburg",
    });

    return generatePageSEO({
        lang: "de",
        path: "umzug-regensburg",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function UmzugRegensburgPage({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "umzug_spec",
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Umzug","href":"/umzug"},{"label":"Regensburg"}]}
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
                    currentHref="/umzug-regensburg"
                />
                <section id="umzug-regensburg-kundenfragen" className="flox-section px-6 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="max-w-3xl">
                            <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
                                Häufige Anliegen in Regensburg
                            </div>
                            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
                                Vom Umzugsvorhaben zur klaren Rückmeldung
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                FLOXANT prüft Umzüge in Regensburg nicht nach Schlagworten,
                                sondern nach den Angaben, die am Umzugstag wirklich zählen:
                                Strecke, Etage, Möbelmenge, Zugang, Termin, Fotos und gewünschte
                                Zusatzleistungen.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {regensburgMoveCards.map(({ Icon, ...item }) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group flex min-h-[17rem] flex-col rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
                                    data-event="service_card_click"
                                    data-region="regensburg"
                                    data-service="umzug"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-slate-950 text-white">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <h3 className="mt-5 text-lg font-black tracking-normal text-slate-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                                        {item.text}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                                        {item.cta}
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <GscOpportunitySection
                    eyebrow="Umzug Regensburg sauber vorbereiten"
                    title="Ein guter Umzug beginnt mit klaren Eckdaten und einer ruhigen Vorbereitung."
                    intro="FLOXANT prüft Umzüge in Regensburg nach Start, Ziel, Etage, Laufweg, Möbelmenge, Termin und Fotos. Wenn Reinigung, Entrümpelung, Restmengen oder Übergabe dazukommen, wird das direkt getrennt und sauber eingeplant."
                    proofTitle="Wichtig für die Planung"
                    proofItems={[
                        "Fotos von Treppenhaus, Aufzug, Hauseingang, Laufweg und großen Möbeln machen den Aufwand realistischer.",
                        "Start- und Zieladresse, Etage, Haltemöglichkeit, Terminfenster und grobe Möbelmenge reichen für eine erste Einordnung.",
                        "Abbau, Packhilfe, Entsorgung, Reinigung und Schlüsselübergabe sollten früh genannt werden, wenn sie dazugehören.",
                    ]}
                    cards={[
                        {
                            title: "Privatumzug in Regensburg",
                            text: "Für Wohnung, Apartment oder WG helfen Möbelmenge, Kartons, Etagen, Aufzug, Laufweg und Fotos.",
                            href: "/umzug-regensburg",
                            cta: "Umzug anfragen",
                        },
                        {
                            title: "Umzug mit Reinigung",
                            text: "Wenn die alte Wohnung danach sauber übergeben werden soll, zählen Deadline, Schlüsselweg, Räume und Restpunkte.",
                            href: "/umzug-reinigung-regensburg",
                            cta: "Kombination prüfen",
                        },
                        {
                            title: "Entrümpelung vor dem Umzug",
                            text: "Alles, was nicht mit soll, sollte vorher sichtbar werden: Keller, Garage, alte Möbel, Sperrgut oder Restmengen.",
                            href: "/entruempelung-regensburg",
                            cta: "Restmengen klären",
                        },
                        {
                            title: "Seniorenumzug mit Angehörigen",
                            text: "Wenn Angehörige mitorganisieren, helfen klare Freigaben, Rückruf, Packhilfe, Übergabe und ein ruhiger Ablauf.",
                            href: "/seniorenumzug-regensburg",
                            cta: "Ruhig planen",
                        },
                        {
                            title: "Umzugsangebot prüfen",
                            text: "Vorhandenes Angebot, Fotos, Strecke, Etage, Volumen und Budget können für eine zweite Einschätzung gesendet werden.",
                            href: "/angebot-guenstiger-pruefen",
                            cta: "Angebot prüfen",
                        },
                        {
                            title: "Kurzfristiger Termin",
                            text: "Wenn der Termin drückt, zählen Prioritäten: was zwingend mit muss, welche Zugänge frei sind und welche Fotos Engstellen zeigen.",
                            href: "/notfall-umzug-bayern",
                            cta: "Machbarkeit prüfen",
                        },
                    ]}
                    checklistTitle="Diese Angaben beschleunigen die Rückmeldung"
                    checklist={[
                        "Start, Ziel, Etage, Aufzug, Laufweg und Parkmöglichkeit.",
                        "Grobe Möbelmenge, Kartons, große Einzelstücke und Fotos.",
                        "Terminfenster, gewünschte Zusatzleistungen und Ansprechpartner.",
                        "Budget oder vorhandenes Angebot, wenn Sie eine Einordnung wünschen.",
                    ]}
                    combinationsTitle="Wenn mehr als Tragen dazugehört"
                    combinations={[
                        {
                            title: "Umzug + Reinigung",
                            text: "Alte Wohnung, Übergabetermin und Schlüsselweg direkt mitplanen.",
                            href: "/umzug-reinigung-regensburg",
                        },
                        {
                            title: "Umzug + Entrümpelung",
                            text: "Nicht alles muss mit. Restmengen vorher sichtbar machen.",
                            href: "/entruempelung-regensburg",
                        },
                        {
                            title: "Seniorenumzug + Übergabe",
                            text: "Ruhige Abstimmung mit Angehörigen, Packhilfe und Rückmeldung.",
                            href: "/seniorenumzug-regensburg",
                        },
                        {
                            title: "Angebot prüfen",
                            text: "Vorhandenes Angebot mit Fotos und Eckdaten sachlich einordnen.",
                            href: "/angebot-guenstiger-pruefen",
                        },
                    ]}
                    primaryHref="/buchung?service=umzug#buchungssystem"
                    primaryLabel="Umzug Regensburg anfragen"
                    secondaryHref="/angebot-guenstiger-pruefen"
                    secondaryLabel="Angebot prüfen"
                />
            </SpecialtyPageLayout>
    );
}
