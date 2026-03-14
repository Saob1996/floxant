import { type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'blog/umzug-kosten-regensburg',
        title: 'Umzugskosten Regensburg: Echte Preise & Spartipps | FLOXANT',
        description: 'Was kostet ein Umzug in Regensburg wirklich? Wir schlüsseln reale Preise, Faktoren und versteckte Kosten auf. So sparen Sie beim Umzug.',
    });
}

export default async function BlogUmzugKostenRegensburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Umzugskosten in Regensburg: Was Sie 2024 wirklich zahlen",
        "description": "Was kostet ein Umzug in Regensburg wirklich? Wir schlüsseln reale Preise, Faktoren und versteckte Kosten auf. So sparen Sie beim Umzug.",
        "author": { "@type": "Organization", "name": "FLOXANT Experten" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo.png" } },
        "datePublished": "2024-03-24T08:00:00+01:00",
        "dateModified": "2024-03-24T08:00:00+01:00"
    };

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug innerhalb von Regensburg durchschnittlich?", "acceptedAnswer": { "@type": "Answer", "text": "Für eine 2-Zimmer-Wohnung innerhalb Regensburgs müssen Sie bei einem professionellen Umzugsunternehmen mit Kosten zwischen 600 und 1.200 Euro rechnen, abhängig vom Transportvolumen und Serviceumfang." } },
            { "@type": "Question", "name": "Wie kann ich bei den Umzugskosten sparen?", "acceptedAnswer": { "@type": "Answer", "text": "Sie senken die Kosten erheblich, indem Sie vorab rigoros entrümpeln, Umzugskartons selbst packen und die Halteverbotszone (falls erlaubt) selbst organisieren. Buchen Sie bei FLOXANT nur den Transport und Beladeservice." } }
        ]
    };

    const breadcrumbs = [
        { label: "Home", href: `/${lang}` },
        { label: "Blog", href: `/${lang}/blog` },
        { label: "Umzugskosten Regensburg" }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Header lang={lang} dic={(dict as any).nav} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20">
                <div className="mb-8"><Breadcrumbs lang={lang} items={breadcrumbs}  /></div>
                
                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 24. März 2024</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 Min. Lesezeit</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Redaktion</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Umzugskosten in Regensburg: Was Sie wirklich zahlen
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                            Ein Wohnortwechsel in der Domstadt ist logistisch oft eine Herausforderung. Enge Gassen, historische Gebäude ohne Aufzug und knapper Parkraum prägen Regensburg. Doch wie wirken sich diese Faktoren auf die Umzugskosten aus?
                        </p>
                    </header>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none hover:prose-a:text-primary">
                        <p>
                            Wer einen Umzug in Regensburg plant, stellt sich unweigerlich die Frage: "Was kostet mich das Ganze?" Leider gibt es darauf keine pauschale Antwort, wie "Ein Umzug kostet immer 800 Euro". Zu viele Variablen fließen in die Kalkulation eines seriösen <strong>Umzugsunternehmen in Regensburg</strong> ein. In diesem umfassenden Guide schlüsseln wir die Preise transparent für Sie auf.
                        </p>

                        <h2>Die 4 Hauptfaktoren der Preisberechnung</h2>
                        <p>
                            Egal ob Sie von Kumpfmühl nach Stadtamhof ziehen oder aus dem Landkreis in die Innenstadt – vier essenzielle Faktoren bestimmen maßgeblich den Endpreis auf Ihrer Rechnung:
                        </p>
                        <ul>
                            <li><strong>Das Transportvolumen:</strong> Bemessen in Kubikmetern (cbm). Ein Singlehaushalt hat oft 10-15 cbm, eine 4-köpfige Familie schnell über 40 cbm. Je mehr Volumen, desto größer der LKW und desto mehr Packer werden benötigt.</li>
                            <li><strong>Die Distanz:</strong> Nahumzüge innerhalb Regensburgs berechnen sich oft nach Aufwand (Stunden x Personal). Zieht man von Regensburg nach Berlin, spielt die gefahrene Kilometerzahl eine dominierende Rolle bei den Sprit- und Mautkosten.</li>
                            <li><strong>Die Zugänglichkeit:</strong> Muss das Klavier aus dem 4. Stock ohne Aufzug durch das enge Altstadttreppenhaus getragen werden? Erfordert die Parksituation vor der Haustür eine teure, behördlich genehmigte Halteverbotszone?</li>
                            <li><strong>Zusatzleistungen (Full-Service):</strong> Buchen Sie lediglich den Transport, oder sollen die Profis von FLOXANT auch Ihre Küche demontieren, die Waschmaschine anschließen und Ihr Porzellan in Seidenpapier verpacken?</li>
                        </ul>

                        <h2>Preistabellen: Echte Beispiele aus Regensburg</h2>
                        <p>
                            Damit Sie ein Gefühl für die <strong>Umzug Kosten</strong> bekommen, haben wir Durchschnittswerte aus unseren hunderten durchgeführten Umzügen in Regensburg der letzten Jahre aggregiert. Bitte beachten Sie, dass dies Richtwerte für einen <em>Standard-Umzug</em> (Beladen, Transport, Entladen) ohne Zusatzservices sind:
                        </p>

                        <div className="overflow-x-auto my-8 border rounded-xl shadow-sm">
                            <table className="w-full text-left border-collapse m-0 text-base">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="p-4 border-b">Wohnungsgröße (Wohnfläche)</th>
                                        <th className="p-4 border-b">Einsatzteam</th>
                                        <th className="p-4 border-b">Geschätzte Kosten (Nahumzug)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border-b bg-white">1- bis 2-Zimmer (30 - 50 m²)</td>
                                        <td className="p-4 border-b bg-white">2 Möbelpacker + Sprinter</td>
                                        <td className="p-4 border-b bg-white font-bold">ca. 400 € – 800 €</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b bg-slate-50">3-Zimmer (60 - 80 m²)</td>
                                        <td className="p-4 border-b bg-slate-50">3 Möbelpacker + 3.5t LKW</td>
                                        <td className="p-4 border-b bg-slate-50 font-bold">ca. 800 € – 1.400 €</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b bg-white">4-Zimmer / Haus (ab 100 m²)</td>
                                        <td className="p-4 border-b bg-white">4 Möbelpacker + 7.5t LKW</td>
                                        <td className="p-4 border-b bg-white font-bold">ab 1.500 €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2>Versteckte Kostenfallen vermeiden</h2>
                        <p>
                            Der Markt ist kompetitiv. Leider versuchen unseriöse Anbieter oft mit Lockangeboten von "Umzug ab 199 Euro" Kunden zu gewinnen. Am Ende des Tages droht das böse Erwachen. Auf diese Kostenpunkte sollten Sie bei Angeboten unbedingt achten:
                        </p>
                        
                        <div className="bg-slate-50 p-6 rounded-2xl border my-8">
                            <ul className="list-none pl-0 m-0 space-y-4">
                                <li className="flex gap-3 m-0">
                                    <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                    <span><strong>An- und Abfahrtskosten:</strong> Sind diese bereits im Preis inkludiert? Bei überregionalen Anbietern können hier leicht hunderte Euro veranschlagt werden.</span>
                                </li>
                                <li className="flex gap-3 m-0">
                                    <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                    <span><strong>Etagenzuschläge:</strong> Einige Firmen berechnen ab dem 3. Stock ohne Fahrstuhl pro Stockwerk einen extremen Pauschalaufschlag.</span>
                                </li>
                                <li className="flex gap-3 m-0">
                                    <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                    <span><strong>Materialmiete:</strong> Wurde das geliehene Verpackungsmaterial, Spannseile oder Decken explizit im Angebot aufgeführt?</span>
                                </li>
                            </ul>
                        </div>
                        <p>
                            <strong>Der FLOXANT-Vorteil:</strong> Wir bei <a href={`/${lang}/umzug-regensburg`}>FLOXANT in Regensburg</a> arbeiten ausschließlich mit schriftlich fixierten <strong>Festpreisen</strong>. Nach einer kurzen (oft digitalen) Vorab-Besichtigung Ihres Inventars garantieren wir Ihnen den Preis stichtagsgenau.
                        </p>

                        <h2>5 Geheimtipps: So drücken Sie die Umzugskosten</h2>
                        <ol>
                            <li><strong>Gnadenlos Entrümpeln:</strong> Je weniger mitkommt, desto billiger wird es. Nutzen Sie die Gelegenheit für eine radikale <a href={`/${lang}/entruempelung-regensburg`}>Entrümpelung</a> Ihres Kellers. Was auf den Flohmarkt oder Wertstoffhof geht, muss nicht im teuren LKW transportiert werden.</li>
                            <li><strong>Flexibilität beim Datum:</strong> Umzüge zum Monatsende oder an Freitagen/Wochenenden sind am teuersten, da die Nachfrage explodiert. Wer flexibel zur Monatsmitte (z.B. an einem Dienstag) umzieht, kann bei fast allen Umzugsunternehmen Rabatte aushandeln.</li>
                            <li><strong>Eigenleistung erbringen:</strong> Übernehmen Sie den Packservice selbst. Wer seine Kartons (fachgerecht!) selbst packt und Möbel eigenständig vorab demontiert, spart wertvolle Arbeitsstunden des Fachpersonals.</li>
                            <li><strong>Beiladungen bei Kleinstmengen nutzen:</strong> Wenn Sie nur ein Sofa und drei Kommoden transportieren müssen, buchen Sie eine studentische <a href={`/${lang}/kleintransporte`}>Beiladung / Kleintransport</a> anstatt eines Voll-Umzugs.</li>
                            <li><strong>Steuerliche Absetzbarkeit:</strong> Vergessen Sie nicht: Haushaltsnahe Dienstleistungen (wie ein Umzug) können Sie in Deutschland zu 20% (bis max. 4.000 € pro Jahr) direkt von der Steuerschuld abziehen. Bei berufsbedingten Umzügen winken sogar noch höhere Werbungskostenabzüge!</li>
                        </ol>

                        <div className="bg-primary/5 p-8 rounded-2xl border-primary/20 border mt-12 text-center">
                            <h3 className="mt-0">Lassen Sie uns Ihren Festpreis berechnen</h3>
                            <p className="mb-6">Anonyme Listen im Internet ersetzen keine professionelle Kalkulation. Nutzen Sie unser smartes Buchungstool, geben Sie Ihre Zimmeranzahl ein und wir senden Ihnen sofort einen verlässlichen Preis für Ihren Umzug in Regensburg.</p>
                            <a href={`/${lang}/#booking`} className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors no-underline">
                                Zum Preisrechner <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                        
                    </div>
                </article>

                <div className="mt-16 pt-8 border-t">
                    <h3 className="text-2xl font-bold mb-6 text-center">Häufig gestellte Fragen (FAQ)</h3>
                    <div className="space-y-4">
                        <details className="group border rounded-lg p-4 bg-white shadow-sm open:ring-2 open:ring-primary/20">
                            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Zahlt das Jobcenter die Umzugskosten in Regensburg?</span><span className="transition group-open:rotate-180">↓</span></summary>
                            <div className="pt-4 text-slate-600 leading-relaxed max-w-3xl">
                                Ja, unter bestimmten Voraussetzungen (z.B. bei Familienzuwachs, gesundheitlichen Gründen oder einer vom Amt geforderten Kostensenkung) übernimmt das Jobcenter Regensburg die Kosten. Sie müssen in der Regel 3 Kostenvoranschläge verschiedener Umzugsunternehmen einreichen. FLOXANT erstellt Ihnen hierfür gerne zügig die notwendigen Dokumente.
                            </div>
                        </details>
                        <details className="group border rounded-lg p-4 bg-white shadow-sm open:ring-2 open:ring-primary/20">
                            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Was kostet eine Halteverbotszone in Regensburg?</span><span className="transition group-open:rotate-180">↓</span></summary>
                            <div className="pt-4 text-slate-600 leading-relaxed max-w-3xl">
                                Die städtischen Gebühren für eine Halteverbotszone in Regensburg gepaart mit den Kosten für unseren Aufstell-Service (Schildermiete, Fristenwahrung, Protokollierung) belaufen sich auf ca. 80 bis 150 Euro. Dieser Service ist Gold wert, da er lange Tragewege (und damit Arbeitszeit) drastisch reduziert.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-50 py-16 border-t">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-8">Mehr zum Thema</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${lang}/umzug`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Allgemeine Umzugsinformationen</a>
                        <a href={`/${lang}/entruempelung-regensburg`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Entrümpelungskosten Regensburg</a>
                        <a href={`/${lang}/blog/umzug-checkliste`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Die perfekte Checkliste</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
