import { Metadata } from "next";
import Link from "next/link";
import { generatePageSEO } from "@/lib/seo";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { ArrowRight, Clock, Shield, Star, Truck, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{}>;
}

const nurembergClearanceCards = [
    {
        Icon: Shield,
        title: "Praxisräume räumen lassen",
        text: "Bei Praxisentrümpelung zählen Räume, Möbel, Akten, Geräte, sensible Restpunkte, Freigabe, Zugang und die Frage, ob danach gereinigt werden soll.",
        href: "/blog/praxisentruempelung-nuernberg-richtig-anfragen",
        cta: "Praxisfall vorbereiten",
    },
    {
        Icon: Truck,
        title: "Büro, Lager oder Nebenraum leeren",
        text: "Für gewerbliche Räume helfen Fotos, Etage, Laufweg, Menge, Terminfenster und eine kurze Trennung zwischen Entsorgung, Transport und Wiederverwendung.",
        href: "/entruempelung-nuernberg",
        cta: "Räume beschreiben",
    },
    {
        Icon: Clock,
        title: "Räumung vor Übergabe",
        text: "Wenn ein Termin naht, sollten Restmengen, Schlüsselweg, Ansprechpartner, gewünschter Endzustand und Reinigung danach sofort zusammen genannt werden.",
        href: "/angebot-guenstiger-pruefen",
        cta: "Termin prüfen",
    },
    {
        Icon: Star,
        title: "Wohnung oder Haushalt ausräumen",
        text: "Bei Wohnung, Keller oder Nachlass reicht für den Start eine grobe Raumliste mit Fotos. FLOXANT prüft dann Menge, Zugang, Entsorgung und den nächsten sinnvollen Schritt.",
        href: "/wohnungsaufloesung-bayern",
        cta: "Ausräumen einordnen",
    },
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: "de",
        baseKey: "entruempelung_spec",
        city: "Nürnberg",
    });

    return generatePageSEO({
        lang: "de",
        path: "entruempelung-nuernberg",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}

export default async function EntruempelungNuernbergPage({ params }: PageProps) {
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
                breadcrumbs={[{"label":"Home","href":"/"},{"label":"Entrümpelung","href":"/entruempelung"},{"label":"Nürnberg"}]}
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
                    service="entruempelung"
                    city={city}
                    currentHref="/entruempelung-nuernberg"
                />
                <section className="flox-section px-6 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="max-w-3xl">
                            <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
                                Praxis, Büro, Wohnung
                            </div>
                            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
                                Entrümpelung in Nürnberg mit klarer Vorbereitung
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Ob Praxisentrümpelung, Büroraum, Keller oder Wohnung:
                                Entscheidend sind Freigabe, Zugang, Menge, Fotos, Termin und
                                der gewünschte Zustand nach der Räumung.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {nurembergClearanceCards.map(({ Icon, ...item }) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group flex min-h-[17rem] flex-col rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
                                    data-event="service_card_click"
                                    data-region="nuernberg"
                                    data-service="entruempelung"
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
            </SpecialtyPageLayout>
    );
}
