import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "blog/umzugskosten-senken-7-tipps",
        title: "7 bewährte Tipps, um Umzugskosten drastisch zu senken | FLOXANT Ratgeber",
        description: "Umzugskosten sparen ohne Qualitätsverlust. 7 Profi-Tipps: vom richtigen Zeitpunkt über Beiladung bis zur cleveren Verpackung. Jetzt lesen! Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.",
    });
}

export default async function BlogArticle({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "7 bewährte Tipps, um Umzugskosten drastisch zu senken",
        "description": "Umzugskosten sparen ohne Qualitätsverlust. 7 Profi-Tipps: vom richtigen Zeitpunkt über Beiladung bis zur cleveren Verpackung. Jetzt lesen!",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "url": "https://www.floxant.de" },
        "datePublished": "2026-03-18",
        "dateModified": "2026-03-18",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Blog", href: "/" + lang + "/blog" }, { label: "7 bewährte Tipps, um Ihre Umzugskosten zu senken" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            
            <article className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-8">7 bewährte Tipps, um Ihre Umzugskosten zu senken</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                        <span>Von FLOXANT Redaktion</span>
                        <span>·</span>
                        <time dateTime="2026-03-18">18. März 2026</time>
                        <span>·</span>
                        <span>Lesezeit: 8 Min.</span>
                    </div>
                    
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Ein Umzug muss nicht teuer sein. Mit diesen sieben Strategien reduzieren Sie die Kosten erheblich, ohne Abstriche bei Sicherheit und Qualität zu machen.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">1. Umzugstermin klug wählen</h2>
                        <p>Monatsende, Freitag, Sommer – das sind die teuersten Zeiten für Umzüge. Wer unter der Woche oder Mitte des Monats umzieht, profitiert von deutlich niedrigeren Preisen. Im Winter sind Umzugsunternehmen weniger ausgelastet und bieten oft Sonderkonditionen an.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">2. Rigoros entrümpeln</h2>
                        <p>Jeder Kubikmeter zählt. Weniger Volumen bedeutet: kleinerer LKW, weniger Träger, niedrigerer Preis. Verkaufen Sie gut erhaltene Möbel vorab auf lokalen Portalen. Was keinen Wert mehr hat, kann eine <Link href={"/" + lang + "/entruempelung"} className="text-primary underline hover:text-primary/80">Entrümpelung</Link> schnell und fachgerecht entsorgen.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">3. Selbst packen, Profis tragen lassen</h2>
                        <p>Der teuerste Einzelposten ist oft der Einpack-Service. Wenn Sie selbst packen, sparen Sie 20–30% der Gesamtkosten. Investieren Sie in gute Kartons und Packpapier – defekte Güter sind am Ende teurer als professionelle Verpackung.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">4. Beiladung nutzen</h2>
                        <p>Bei Fernumzügen (z.B. von Bayern nach NRW) können Sie stark sparen, wenn Ihr Umzugsgut als Beiladung auf einem ohnehin fahrenden LKW mitgenommen wird. FLOXANT bietet wöchentliche Routen durch ganz Deutschland an.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">5. Verpackungsmaterial clever beschaffen</h2>
                        <p>Fragen Sie in lokalen Supermärkten nach Bananenkisten – die sind stabil und kostenlos. Handtücher und Bettwäsche eignen sich hervorragend als Polstermaterial für Geschirr und Gläser.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">6. Umzugskosten steuerlich absetzen</h2>
                        <p>Beruflich bedingte Umzugskosten können Sie in der Steuererklärung als Werbungskosten geltend machen. Auch bei privaten Umzügen sind sogenannte haushaltsnahe Dienstleistungen absetzbar (20% der Arbeitskosten, max. 4.000€ pro Jahr).</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">7. Festpreisangebot einholen</h2>
                        <p>Der wichtigste Tipp überhaupt: Bestehen Sie auf einem <strong>verbindlichen Festpreis</strong> nach Besichtigung. Stundenbasierte Angebote führen fast immer zu einer höheren Endrechnung als erwartet. Bei <Link href={"/" + lang + "/umzug"} className="text-primary underline hover:text-primary/80">FLOXANT</Link> erhalten Sie immer einen garantierten Festpreis.</p>
                    </div>

                    <div className="mt-20 p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Bereit für Ihren Umzug?</h3>
                        <p className="text-muted-foreground mb-6">Holen Sie sich jetzt Ihr unverbindliches Festpreisangebot bei FLOXANT.</p>
                        <Link href={"/" + lang + "/umzug"} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                            Angebot anfordern →
                        </Link>
                    </div>

                    <div className="mt-12 border-t border-border pt-8">
                        <h4 className="font-bold mb-4">Weitere Artikel</h4>
                        <div className="flex flex-wrap gap-3">
                            <Link href={"/" + lang + "/blog/umzug-kosten-regensburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzugskosten Regensburg</Link>
                            <Link href={"/" + lang + "/blog/umzug-checkliste"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Checkliste</Link>
                            <Link href={"/" + lang + "/blog/umzug-tipps-bayern"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Tipps Bayern</Link>
                            <Link href={"/" + lang + "/ratgeber"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Alle Ratgeber</Link>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
