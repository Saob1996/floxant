import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = dict?.pages?.wohnungsuebergabe_protokoll_guide || {};
    return generatePageSEO({
        pageLocale,
        path: "blog/wohnungsuebergabe-protokoll-guide",
        title: content.meta_title || "Wohnungsübergabe: So sichern Sie sich rechtlich ab | FLOXANT",
        description: content.meta_desc || `Wohnungsübergabeprotokoll richtig erstellen. Was muss rein, worauf achten und wie vermeiden Sie Streit um die Kaution? Kompletter Guide. Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.`,
    });
}

export default async function BlogArticle({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Wohnungsübergabe: So sichern Sie sich rechtlich ab",
        "description": "Wohnungsübergabeprotokoll richtig erstellen. Was muss rein, worauf achten und wie vermeiden Sie Streit um die Kaution? Kompletter Guide.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "url": "https://www.floxant.de" },
        "datePublished": "2026-03-18",
        "dateModified": "2026-03-18",
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Blog", href: "/" + pageLocale + "/blog" }, { label: "Wohnungsübergabe: So erstellen Sie ein wasserdichtes Protokoll" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            
            <article className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-8">Wohnungsübergabe: So erstellen Sie ein wasserdichtes Protokoll</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                        <span>Von FLOXANT Redaktion</span>
                        <span>·</span>
                        <time dateTime="2026-03-18">18. März 2026</time>
                        <span>·</span>
                        <span>Lesezeit: 8 Min.</span>
                    </div>
                    
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Die Wohnungsübergabe ist der letzte kritische Termin Ihres Umzugs. Ein sauber erstelltes Übergabeprotokoll schützt Sie vor unberechtigten Forderungen und sichert Ihre Kaution.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Was gehört in ein Übergabeprotokoll?</h2>
                        <p>Ein vollständiges Protokoll dokumentiert: Datum und Uhrzeit der Übergabe, Namen aller Anwesenden, alle vorhandenen Schlüssel und deren Anzahl, die Zählerstände (Strom, Gas, Wasser, Heizung), den Zustand jedes einzelnen Raums inklusive Böden, Wände, Fenster und Sanitäranlagen.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Fotos als Beweismittel</h2>
                        <p>Fotografieren Sie jeden Raum systematisch. Achten Sie besonders auf bestehende Schäden (Kratzer im Parkett, Risse in Fliesen, Verfärbungen an Wänden). Diese Fotos sollten mit Zeitstempel versehen sein und idealerweise im Beisein des Vermieters aufgenommen werden.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Besenrein: Was bedeutet das wirklich?</h2>
                        <p>"Besenrein" ist juristisch definiert als: grobe Verschmutzungen entfernt, Böden gefegt, keine persönlichen Gegenstände zurückgelassen. Es bedeutet ausdrücklich <strong>nicht</strong> "professionell gereinigt". Dennoch empfehlen wir eine gründliche <Link href={"/" + pageLocale + "/reinigung"} className="text-primary underline hover:text-primary/80">Endreinigung</Link>, um Diskussionen zu vermeiden.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Schönheitsreparaturen: Müssen Sie renovieren?</h2>
                        <p>Starre Fristenklauseln in Mietverträgen (z.B. "alle 3 Jahre streichen") sind seit dem BGH-Urteil von 2015 unwirksam. Prüfen Sie Ihren Mietvertrag sorgfältig. Im Zweifel hat der Mieterverein die Antwort.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Kaution: Wann bekommen Sie Ihr Geld zurück?</h2>
                        <p>Der Vermieter darf die Kaution bis zu 6 Monate nach Auszug einbehalten, um eventuelle Nebenkostennabrechnungen abzuwarten. Nach Ablauf dieser Frist haben Sie Anspruch auf vollständige Rückzahlung (abzüglich berechtigter Abzüge).</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Profi-Tipp: Kombinieren Sie Umzug und Endreinigung</h2>
                        <p>Wenn die Möbelpacker gerade den letzten Schrank verladen haben, steht das Reinigungsteam schon bereit. Bei <Link href={"/" + pageLocale + "/umzug"} className="text-primary underline hover:text-primary/80">FLOXANT</Link> bieten wir diesen Kombi-Service aus einer Hand – das spart Ihnen einen zusätzlichen Termin und oft auch Geld.</p>
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
