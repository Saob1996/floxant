import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = dict?.pages?.umzug_planen_schritt_fuer_schritt || {};
    return generatePageSEO({
        pageLocale,
        path: "blog/umzug-planen-schritt-fuer-schritt",
        title: content.meta_title,
        description: content.meta_desc,
    });
}

export default async function BlogArticle({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug planen: Der ultimative Leitfaden in 10 Schritten",
        "description": "Umzug richtig planen – von der Kündigung bis zur Schlüsselübergabe. 10-Schritte-Anleitung mit Checklisten, Fristen und Insider-Tipps für Bayern.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "url": "https://www.floxant.de" },
        "datePublished": "2026-03-18",
        "dateModified": "2026-03-18",
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Blog", href: "/" + pageLocale + "/blog" }, { label: "Umzug planen: Der ultimative Leitfaden in 10 Schritten" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            
            <article className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-8">Umzug planen: Der ultimative Leitfaden in 10 Schritten</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                        <span>Von FLOXANT Redaktion</span>
                        <span>·</span>
                        <time dateTime="2026-03-18">18. März 2026</time>
                        <span>·</span>
                        <span>Lesezeit: 8 Min.</span>
                    </div>
                    
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Jeder Umzug beginnt mit einer Entscheidung und endet hoffentlich in einem neuen Zuhause, in dem Sie sich wohlfühlen. Dazwischen liegen Wochen voller Organisation. Mit diesem Leitfaden navigieren Sie souverän durch jede Phase.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">1. Drei Monate vorher: Grundsatzplanung</h2>
                        <p>Kündigen Sie den alten Mietvertrag fristgerecht (die meisten Verträge haben eine 3-Monats-Frist). Erstellen Sie ein Inventar aller Möbel und Kartons. Holen Sie sich mindestens drei Angebote von Umzugsunternehmen ein – achten Sie auf <strong>verbindliche Festpreise</strong> statt offener Stundenzettel.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">2. Zwei Monate vorher: Entrümpeln und Sortieren</h2>
                        <p>Jetzt ist der perfekte Zeitpunkt, um radikal auszumisten. Was Sie in den letzten zwei Jahren nicht benutzt haben, brauchen Sie wahrscheinlich nicht. Verkaufen Sie auf Portalen, spenden Sie an Sozialkaufhäuser oder beauftragen Sie eine <Link href={"/" + pageLocale + "/entruempelung"} className="text-primary underline hover:text-primary/80">professionelle Entrümpelung</Link>.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">3. Sechs Wochen vorher: Behördliches und Verträge</h2>
                        <p>Informieren Sie Stromanbieter, Internet- und Telefonanbieter, GEZ, Bank und Versicherungen über Ihren Umzug. Beantragen Sie bei Bedarf einen Nachsendeauftrag bei der Post (online in 5 Minuten erledigt).</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">4. Vier Wochen vorher: Halteverbotszone beantragen</h2>
                        <p>Falls Parkplätze vor der alten oder neuen Wohnung knapp sind, beantragen Sie frühzeitig eine <Link href={"/" + pageLocale + "/halteverbotszone"} className="text-primary underline hover:text-primary/80">amtliche Halteverbotszone</Link>. Die meisten Kommunen benötigen 14 Tage Vorlauf. Professionelle Umzugsunternehmen wie FLOXANT übernehmen diesen Service gerne für Sie.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">5. Zwei Wochen vorher: Verpackung und Vorbereitung</h2>
                        <p>Beginnen Sie mit dem Einpacken von selten genutzten Gegenständen (Bücher, Deko, Saisonkleidung). Beschriften Sie jeden Karton mit Raum und Inhalt. Nummerieren Sie die Kartons und führen Sie eine Liste – so behalten Sie den Überblick und bemerken sofort, wenn beim Transport etwas fehlt.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">6. Eine Woche vorher: Küchen-Demontage und Technik</h2>
                        <p>Lassen Sie die Einbauküche von einem Fachmann demontieren. Sichern Sie alle Kabel und Anschlüsse mit Etiketten (z.B. "Wohnzimmer TV HDMI 1"). Defrosten Sie Kühlschrank und Gefriertruhe mindestens 24 Stunden vor dem Umzug.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">7. Umzugstag: Abläufe und Koordination</h2>
                        <p>Stehen Sie früh auf. Legen Sie eine "Survival-Box" mit Kaffee, Snacks, Ladekabeln und Toilettenpapier bereit – die letzte Kiste, die eingepackt, und die erste, die ausgepackt wird. Halten Sie den Grundriss der neuen Wohnung bereit, damit die Möbelträger wissen, wohin jedes Teil gehört.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">8. Am Abend: Übergabe der alten Wohnung</h2>
                        <p>Machen Sie einen Rundgang und dokumentieren Sie den Zustand mit Fotos. Lesen Sie alle Zählerstände ab (Strom, Gas, Wasser). Idealerweise übergeben Sie besenrein – oder buchen Sie eine <Link href={"/" + pageLocale + "/reinigung"} className="text-primary underline hover:text-primary/80">professionelle Endreinigung</Link>.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">9. Erste Woche: Ummeldung und Einleben</h2>
                        <p>Melden Sie Ihren Wohnsitz innerhalb von 14 Tagen beim Einwohnermeldeamt um (Pflicht nach §17 BMG). Vergessen Sie nicht die Ummeldung des Fahrzeugs bei der Zulassungsstelle.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">10. Langfristig: Garantie prüfen</h2>
                        <p>Überprüfen Sie in den Wochen nach dem Umzug, ob alle Möbel unbeschädigt angekommen sind. Seriöse Umzugsunternehmen haften über die gesetzliche Verkehrshaftung – eventuelle Schadensmeldungen sollten Sie zeitnah einreichen.</p>
                    </div>

                    <div className="mt-20 p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Bereit für Ihren Umzug?</h3>
                        <p className="text-muted-foreground mb-6">Holen Sie sich jetzt Ihr unverbindliches Festpreisangebot bei FLOXANT.</p>
                        <Link href={"/" + pageLocale + "/umzug"} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                            Angebot anfordern →
                        </Link>
                    </div>

                    <div className="mt-12 border-t border-border pt-8">
                        <h4 className="font-bold mb-4">Weitere Artikel</h4>
                        <div className="flex flex-wrap gap-3">
                            <Link href={"/" + pageLocale + "/blog/umzug-kosten-regensburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzugskosten Regensburg</Link>
                            <Link href={"/" + pageLocale + "/blog/umzug-checkliste"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Checkliste</Link>
                            <Link href={"/" + pageLocale + "/blog/umzug-tipps-bayern"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Tipps Bayern</Link>
                            <Link href={"/" + pageLocale + "/ratgeber"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Alle Ratgeber</Link>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
