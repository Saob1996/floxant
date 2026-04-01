import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = dict?.pages?.fernumzug_bayern_nrw_tipps || {};
    return generatePageSEO({
        pageLocale,
        path: "blog/fernumzug-bayern-nrw-tipps",
        title: content.meta_title || "Fernumzug von Bayern nach NRW: Ablauf, Kosten & Ti | FLOXANT",
        description: content.meta_desc || `Fernumzug von Regensburg/München nach Köln, Düsseldorf oder Dortmund? Alles über Kosten, Ablauf, Beiladung und clevere Spartipps. Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.`,
    });
}

export default async function BlogArticle({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Fernumzug von Bayern nach NRW: Ablauf, Kosten & Tipps",
        "description": "Fernumzug von Regensburg/München nach Köln, Düsseldorf oder Dortmund? Alles über Kosten, Ablauf, Beiladung und clevere Spartipps.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "url": "https://www.floxant.de" },
        "datePublished": "2026-03-18",
        "dateModified": "2026-03-18",
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Blog", href: "/" + pageLocale + "/blog" }, { label: "Fernumzug von Bayern nach NRW: Der komplette Guide" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            
            <article className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-8">Fernumzug von Bayern nach NRW: Der komplette Guide</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                        <span>Von FLOXANT Redaktion</span>
                        <span>·</span>
                        <time dateTime="2026-03-18">18. März 2026</time>
                        <span>·</span>
                        <span>Lesezeit: 8 Min.</span>
                    </div>
                    
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Bayern und Nordrhein-Westfalen sind durch Arbeitsmigration eng verbunden. Jedes Jahr ziehen tausende Menschen zwischen den beiden Bundesländern um. Die Distanz von rund 500-600 Kilometern macht den Transport zu einer logistischen Herausforderung – aber mit der richtigen Planung ist auch ein Fernumzug stressfrei machbar.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Was kostet ein Fernumzug Bayern → NRW?</h2>
                        <p>Die Kosten hängen primär vom Transportvolumen ab. Grobe Richtwerte: Ein 1-Zimmer-Apartment (ca. 20m³) kostet zwischen 1.200€ und 2.000€. Eine 3-Zimmer-Wohnung (ca. 50m³) liegt bei 2.500€ bis 4.500€. Full-Service mit Einpacken und Auspacken kostet naturgemäß mehr. Der Schlüssel: Holen Sie sich immer ein verbindliches Festpreisangebot nach Besichtigung.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Beiladung: Die clevere Sparoption</h2>
                        <p>Wenn Ihr Zeitplan flexibel ist, können Sie Ihre Möbel als Beiladung auf einem ohnehin fahrenden LKW mitnehmen lassen. FLOXANT fährt wöchentlich Routen zwischen Bayern und NRW – dadurch sinken die Kosten um bis zu 40%.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Zwischenlagerung: Wenn die Termine nicht passen</h2>
                        <p>Häufig überschneiden sich Mietverträge nicht perfekt. In diesem Fall bietet sich eine temporäre Zwischenlagerung an. Achten Sie auf einen trockenen, versicherten Lagerraum. FLOXANT bietet kurzfristige Lageroptionen in Regensburg an.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Checkliste: Fernumzug organisieren</h2>
                        <ul className="space-y-3 text-lg">
                            <li>✅ Frühzeitig kündigen (3 Monate Kündigungsfrist beachten)</li>
                            <li>✅ Arbeitgeber informieren und ggf. Umzugskostenzuschuss beantragen</li>
                            <li>✅ Kita/Schulplatz am neuen Wohnort organisieren</li>
                            <li>✅ Hausarzt, Zahnarzt und Tierarzt am neuen Ort finden</li>
                            <li>✅ Nachsendeauftrag bei der Post einrichten (6 Monate)</li>
                            <li>✅ Halteverbotszone an beiden Standorten beantragen</li>
                            <li>✅ Zählerstände an beiden Wohnungen dokumentieren</li>
                        </ul>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Ummeldefristen nicht vergessen</h2>
                        <p>Sie haben 14 Tage nach Einzug Zeit, sich beim Einwohnermeldeamt am neuen Wohnort umzumelden. Für das Fahrzeug gilt: Innerhalb eines Monats bei der neuen Zulassungsstelle ummelden. Verstöße können Bußgelder nach sich ziehen.</p>
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
