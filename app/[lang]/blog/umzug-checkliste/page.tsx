import { type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, CheckSquare, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'blog/umzug-checkliste',
        title: 'Die ultimative Umzug Checkliste: PDF & Zeitplan | FLOXANT',
        description: 'Vom Packen bis zur Ummeldung: Unsere interaktive Umzug Checkliste bewahrt Sie vor dem Chaos. Der perfekte Zeitplan 3 Monate vor dem Umzug.',
    });
}

export default async function BlogUmzugCheckliste({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Die ultimative Umzug Checkliste: Zeitplan & Tipps",
        "description": "Vom Packen bis zur Ummeldung: Unsere interaktive Umzug Checkliste bewahrt Sie vor dem Chaos. Der perfekte Zeitplan für Ihren privaten oder gewerblichen Umzug.",
        "author": { "@type": "Organization", "name": "FLOXANT Redaktion" },
        "datePublished": "2024-03-26T08:00:00+01:00",
        "dateModified": "2024-03-26T08:00:00+01:00"
    };

    const breadcrumbs = [
        { label: "Home", href: `/${lang}` },
        { label: "Blog", href: `/${lang}/blog` },
        { label: "Umzugscheckliste", href: `/${lang}/blog/umzug-checkliste` }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Header lang={lang} dic={(dict as any).nav} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20">
                <div className="mb-8"><Breadcrumbs lang={lang} items={breadcrumbs} /></div>
                
                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 26. März 2024</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 Min. Lesezeit</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Umzugsprofis</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Die ultimative Umzug Checkliste: Schritt für Schritt zum neuen Zuhause
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                            Nichts verursacht mehr Stress als ein unkoordinierter Umzug, bei dem Verträge weiterlaufen, Kartons fehlen und der Internetanschluss in der neuen Wohnung blockiert ist. Mit unserem chronologischen Zeitplan haken Sie alles stressfrei ab.
                        </p>
                    </header>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none hover:prose-a:text-primary">
                        <p>
                            Unsere Erfahrung aus hunderten Projekten bei <a href={`/${lang}/umzug`}>FLOXANT in ganz Bayern</a> beweist: Gute Logistik verzeiht fast jeden Fehler – schlechte Planung verzeiht nichts. Beginnen Sie mit dieser Checkliste idealerweise <strong>drei Monate vor dem Stichtag</strong>.
                        </p>

                        <div className="bg-slate-900 text-white p-8 rounded-3xl my-10 shadow-xl">
                            <h2 className="text-3xl text-white mt-0 mb-6 flex items-center gap-3"><Clock className="text-primary w-8 h-8" /> Purer Vorlauf (3 Monate vorher)</h2>
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex gap-4">
                                    <CheckSquare className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="block text-lg">Mietvertrag kündigen</strong>
                                        <span className="text-slate-400 text-base">Achten Sie auf Ihre Kündigungsfrist im alten Mietvertrag. Meist sind dies 3 Monate.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <CheckSquare className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="block text-lg">Urlaub beim Arbeitgeber beantragen</strong>
                                        <span className="text-slate-400 text-base">Viele Tarifverträge bescheinigen Ihnen einen bis zwei Tage Sonderurlaub für einen Umzug.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <CheckSquare className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="block text-lg">Internet & Strom ummelden</strong>
                                        <span className="text-slate-400 text-base">Telekommunikationsanbieter brauchen oft wochenlangen Vorlauf für die Anschluss-Schaltung an der neuen Adresse. Unbedingt jetzt anstoßen!</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <CheckSquare className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="block text-lg">Angebote der Umzugsfirma einholen</strong>
                                        <span className="text-slate-400 text-base">Holen Sie jetzt die Angebote für den <a href={`/${lang}/umzug-regensburg`}>Festpreis Umzug</a> ein und fixieren Sie den Termin, bevor die Kalender der Firmen voll sind.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <h2>Die heiße Phase (1 Monat vorher)</h2>
                        <p>
                            Der Countdown läuft. Jetzt geht es an die logistische Feinarbeit und das gefürchtete Kartonpacken.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border my-6">
                            <ul className="list-none pl-0 space-y-3">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Starten Sie mit der <a href={`/${lang}/entruempelung`}>Entrümpelung</a>. Was jetzt an den Wertstoffhof geht, muss nicht mehr eingepackt werden.</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Kaufen oder mieten Sie hochwertige Umzugskartons (FLOXANT bringt Ihnen diese auf Wunsch direkt vor die Haustür).</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Beantragen Sie bei der Stadt (falls beim Umzugsunternehmen nicht inbegriffen) die Halteverbotszone.</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Einrichten eines Nachsendeauftrags bei der Deutschen Post.</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Adressänderung bei Banken, Versicherungen, GEZ und Automobilclubs durchgeben.</li>
                            </ul>
                        </div>

                        <div className="flex gap-4 items-start p-6 bg-amber-50 rounded-2xl border border-amber-200 my-8">
                            <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                            <div>
                                <h3 className="mt-0 text-amber-900">Achtung: Die Karton-Regel</h3>
                                <p className="text-amber-800 m-0">Packen Sie Bücherkartons niemals randvoll! Ein Karton sollte die 20-kg-Marke (als Faustregel: Sie können ihn selbst noch gut anheben) nicht überschreiten, da sonst der Boden reißt.</p>
                            </div>
                        </div>

                        <h2>Die letzte Woche (Countdown)</h2>
                        <p>
                            Das Chaos scheint nun perfekt, doch wer sich an den Plan hält, bleibt entspannt. 
                        </p>
                        <ul>
                            <li><strong>Pack-Management:</strong> Packen Sie einen "Survival-Koffer" oder Karton. Darin: Zahnbürste, Wechselkleidung, Kaffeemaschine, Toilettenpapier, wichtige Medikamente und das Ladekabel fürs Handy. Dieser Karton wird am Stichtag in Ihrem eigenen PKW transportiert.</li>
                            <li><strong>Lebensmittel:</strong> Tauen Sie den Kühlschrank und Gefrierschrank ab.</li>
                            <li><strong>Wohnungsübergabe:</strong> Vereinbaren Sie den exakten Termin zur Wohnungsübergabe mit Ihrem alten Vermieter. Falls eine Endreinigung nötig ist, buchen Sie spätestens jetzt eine <a href={`/${lang}/reinigung`}>professionelle Wohnungsreinigung</a>.</li>
                        </ul>

                        <h2>Der Umzugstag & Die Woche danach</h2>
                        <p>
                            Wenn Sie eine professionelle Firma engagiert haben, ist Ihr Hauptjob heute: Kaffee bereitstellen und Türen aufschließen.
                        </p>
                        <ol>
                            <li>Zählerstände (Strom, Gas, Wasser) in der alten und der neuen Wohnung ablesen und fotografieren.</li>
                            <li>Übergabeprotokoll (alt und neu) vom Vermieter unterschreiben lassen.</li>
                            <li>Einwohnermeldeamt: Innerhalb von 14 Tagen müssen Sie sich an dem neuen Wohnort (z.B. Bürgerbüro Regensburg) mitsamt Wohnungsgeberbestätigung offiziell ummelden! Nicht vergessen, sonst droht ein Bußgeld.</li>
                            <li>KFZ-Schein auf die neue Adresse bei der Zulassungsstelle umschreiben lassen.</li>
                        </ol>

                        <div className="bg-primary/5 p-8 rounded-2xl border-primary/20 border mt-12 text-center">
                            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="mt-0">Haben Sie das Wichtigste schon erledigt?</h3>
                            <p className="mb-6">Das A&O einer erfolgreichen Umzugscheckliste ist der Transport selbst. Sichern Sie sich jetzt Ihren Wunschtermin bei FLOXANT. Wir checken unsere Verfügbarkeiten in wenigen Minuten!</p>
                            <a href={`/${lang}/#booking`} className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors no-underline">
                                Zur kostenfreien Buchungsanfrage
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            
            <div className="bg-slate-50 py-16 border-t">
                <div className="container px-4 text-center max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8">Serviceangebote & Hilfreiche Links</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${lang}/umzug-regensburg`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">Umziehen in Regensburg</a>
                        <a href={`/${lang}/umzug-muenchen`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">Umziehen in München</a>
                        <a href={`/${lang}/reinigung`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">Endreinigung Buchen</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
