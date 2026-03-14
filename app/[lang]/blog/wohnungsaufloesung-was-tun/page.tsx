import { type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, Scale, Building2, Coins, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'blog/wohnungsaufloesung-was-tun',
        title: 'Wohnungsauflösung im Todesfall: Checkliste & Kosten | FLOXANT',
        description: 'Ein Angehöriger ist verstorben: Was ist jetzt zu tun? Leitfaden zur Wohnungsauflösung, Kündigungsfristen, Erbrecht und Übernahme der Kosten.',
    });
}

export default async function BlogWohnungsaufloesungTodesfall({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Wohnungsauflösung im Todesfall: Ein Leitfaden für Angehörige",
        "description": "Was ist nach einem Todesfall bezüglich der Mietwohnung zu tun? Ein kompletter Leitfaden zu Erbrecht, Kündigung, Kosten und Räumung.",
        "author": { "@type": "Organization", "name": "FLOXANT Redaktion" },
        "datePublished": "2024-03-30T14:00:00+01:00",
        "dateModified": "2024-03-30T14:00:00+01:00"
    };

    const breadcrumbs = [
        { label: "Home", href: `/${lang}` },
        { label: "Blog", href: `/${lang}/blog` },
        { label: "Wohnungsauflösung Todesfall", href: `/${lang}/blog/wohnungsaufloesung-was-tun` }
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
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 30. März 2024</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 Min. Lesezeit</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Experten</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Wohnungsauflösung im Todesfall: Was Angehörige jetzt tun müssen
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                            Neben der Trauer um den Verlust eines geliebten Menschen sehen sich Hinterbliebene oft mit einem Berg an bürokratischen und logistischen Aufgaben konfrontiert. Was passiert mit dem bestehenden Mietvertrag? Und wer zahlt die Räumung?
                        </p>
                    </header>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none hover:prose-a:text-primary">
                        <p>
                            Der Tod eines engen Angehörigen ist eine psychische Ausnahmesituation. Die Auflösung des Hausstandes ist dabei oft der schwerste Schritt beim endgültigen Abschiednehmen. Doch das deutsche Vertragsrecht duldet keinen Stillstand. Wir haben diesen Leitfaden entwickelt, um Sie als zertifizierter Fachbetrieb für <a href={`/${lang}/entruempelung`}>Wohnungsauflösungen in Bayern</a> sicher durch diesen Prozess zu navigieren.
                        </p>

                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-8">
                            <h3 className="flex items-center gap-2 mt-0 text-amber-900"><Scale className="w-6 h-6" /> Wichtiger Haftungsausschluss</h3>
                            <p className="text-sm text-amber-800 m-0">Die folgenden Informationen basieren auf unserer langjährigen logistischen Branchenerfahrung und stellen <strong>keine rechtsverbindliche Beratung</strong> dar. Konsultieren Sie in komplizierten Erbstreitigkeiten immer eine Kanzlei für Erbrecht.</p>
                        </div>

                        <h2>Schritt 1: Der rechtliche Status (Wer erbt die Wohnung?)</h2>
                        <p>
                            Grundsätzlich gilt in Deutschland (§ 1922 BGB): <strong>Erben treten automatisch als Rechtsnachfolger in alle Vermögensrechte und -pflichten des Verstorbenen ein.</strong> Das schließt auch laufende Mietverträge und Stromverträge mit ein! Ein Mietvertrag endet <em>nicht</em> automatisch mit dem Tod des Mieters.
                        </p>

                        <h3>Das Sonderkündigungsrecht</h3>
                        <p>
                            Wenn Sie als Ehe- oder Lebenspartner nicht ohnehin gemeinsam im Mietvertrag standen (und diesen nun allein fortführen möchten), haben Sie als Erbe ein <strong>außerordentliches Sonderkündigungsrecht</strong> (§ 564 BGB).
                        </p>
                        <ul>
                            <li>Sie haben <strong>einen Monat ab Kenntnis</strong> vom Tod des Mieters Zeit, dieses Sonderkündigungsrecht gegenüber dem Vermieter schriftlich auszuüben.</li>
                            <li>Die Kündigungsfrist beträgt in diesem Fall nur <strong>drei Monate</strong> (unabhängig davon, wie lange der Verstorbene dort gewohnt hat).</li>
                        </ul>

                        <h2>Schritt 2: Wer zahlt die Kosten der Auflösung?</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="p-6 bg-slate-50 rounded-xl border">
                                <Coins className="w-8 h-8 text-primary mb-4" />
                                <h3 className="mt-0">Zahlung aus dem Nachlass</h3>
                                <p className="text-sm">Primär werden alle Kosten (offene Mieten, Räumung, Renovierung) aus dem Barvermögen (Nachlass) des Verstorbenen bezahlt.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border">
                                <Building2 className="w-8 h-8 text-primary mb-4" />
                                <h3 className="mt-0">Muss der Vermieter zahlen?</h3>
                                <p className="text-sm">Nein. Weist der Nachlass keine Deckung auf und haben Sie das Erbe nicht ausgeschlagen, kommen Sie als Erbe in die persönliche Haftung und müssen die Räumung bezahlen.</p>
                            </div>
                        </div>

                        <h3>Was passiert, wenn ich das Erbe ausschlage?</h3>
                        <p>
                            Wenn der Verstorbene überschuldet war, können Sie das Erbe beim zuständigen Nachlassgericht <strong>innerhalb von 6 Wochen</strong> nach Kenntnisnahme ausschlagen. 
                            <strong>Achtung:</strong> Wer das Erbe ausschlägt, darf aus der Wohnung <em>nichts</em> mitnehmen – auch keine emotional wertvollen Andenken oder Fotoalben! Sie haben dann aber auch keine Verpflichtung mehr, die Wohnung aufzulösen oder offene Mieten zu begleichen; dies fällt an das Amtsgericht (Nachlassverwaltung) bzw. den Staat.
                        </p>

                        <h2>Schritt 3: Die praktische Umsetzung der Wohnungsauflösung</h2>
                        <p>
                            Haben Sie das Erbe angetreten und den Mietvertrag termingerecht gekündigt, beginnt die logistische Arbeit. So gehen Sie in <a href={`/${lang}/entruempelung-regensburg`}>Regensburg, München und ganz Bayern</a> am besten vor:
                        </p>

                        <ol>
                            <li>
                                <strong>Persönliches sichern:</strong> Gehen Sie ohne Zeitdruck durch die Räume. Sichern Sie wichtige Dokumente (Testament, Policen, Bankdaten), Bargeld, Schmuck und emotionale Erinnerungsstücke.
                            </li>
                            <li>
                                <strong>Wertsachen schätzen lassen:</strong> Oft schlummern echte Schätze im Haushalt (Antiquitäten, Silberwaren). Verkaufen Sie diese Gegenstände oder übergeben Sie sie einem <a href={`/${lang}/entruempelung`}>zertifizierten Entrümpelungsunternehmen</a> mit dem Auftrag der Wertanrechnung.
                            </li>
                            <li>
                                <strong>Möbelverteilung in der Familie:</strong> Klären Sie zügig mit anderen Erben, wer welche Möbelstücke behält. Für den Transport an die neuen Standorte bieten sich <a href={`/${lang}/kleintransporte`}>günstige Kleintransporte</a> oder Beiladungen an.
                            </li>
                            <li>
                                <strong>Kostenvoranschläge einholen:</strong> Rufen Sie nicht den erstbesten Lockvogel-Flyer aus dem Briefkasten an. Suchen Sie nach transparenten Festpreis-Angeboten ansässiger Speditionen.
                            </li>
                        </ol>

                        <h2>Die Räumung der restlichen Wohnung</h2>
                        <p>
                            Der Rest (oft über 80% des Hausstandes) muss nun fristgerecht aus der Wohnung. Sie können dies selbst tun (Container mieten, tagelang Möbel schleppen, demontieren) oder die Profis beauftragen.
                        </p>
                        
                        <p>
                            Ein professioneller Entrümpler übernimmt die absolute Restentleerung der Zimmer. Tapeten, Teppichböden, fest verbaute Deckenpaneele oder schwere Einbauküchen werden auf Wunsch fachmännisch demontiert und dem Recyclingkreislauf (Holz, Metall, Restmüll) auf bayerischen Wertstoffhöfen zugeführt. Am Ende wird die Wohnung "besenrein" übergeben. 
                        </p>

                        <p>
                            Besonders bei Extremfällen (z.B. Vernachlässigung) bieten Full-Service Anbieter wie FLOXANT auch die abschließende, hygienische <a href={`/${lang}/reinigung`}>Grundreinigung</a> an, um die Wohnung sofort wieder an den Vermieter übergeben zu können.
                        </p>

                        <div className="bg-primary/5 p-8 rounded-2xl border-primary/20 border mt-12 text-center">
                            <h3 className="mt-0">Benötigen Sie diskrete Unterstützung?</h3>
                            <p className="mb-6">Wir von FLOXANT gehen bei Trauerfällen mit höchster Sensibilität, Pietät und Diskretion im Hausflur vor. Wir begutachten den aufzulösenden Haushalt kostenlos per Videoanruf und fixieren den Preis.</p>
                            <a href={`/${lang}/#booking`} className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors no-underline">
                                Anfrage für Haushaltsauflösung <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            
            <div className="bg-slate-50 py-16 border-t">
                <div className="container px-4 text-center max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8">Lesen Sie auch</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${lang}/blog/entrumpelung-kosten-bayern`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">Was kostet eine Auflösung?</a>
                        <a href={`/${lang}/entruempelung-muenchen`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">Haushaltsauflösung München</a>
                        <a href={`/${lang}/entruempelung-nuernberg`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">Haushaltsauflösung Nürnberg</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
