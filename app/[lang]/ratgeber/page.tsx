import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'ratgeber', title: 'Umzug Ratgeber | Tipps & Kosten | FLOXANT', description: 'Ratgeber rund um Umzug, Entrümpelung und Reinigung. Kosten, Checklisten und Tipps von FLOXANT – Ihrer Umzugsfirma in Regensburg.' });
}

const articles = [
    { slug: 'umzug-kosten-regensburg', title: 'Umzug Kosten Regensburg 2026', desc: 'Was kostet ein Umzug in Regensburg? Preise, Faktoren und Spartipps.' },
    { slug: 'checkliste-umzug', title: 'Checkliste für stressfreien Umzug', desc: 'Die ultimative Umzug-Checkliste: Schritt für Schritt zum perfekten Umzug.' },
    { slug: 'gute-umzugsfirma-finden', title: 'Wie findet man eine gute Umzugsfirma?', desc: 'Worauf Sie bei der Wahl einer Umzugsfirma achten sollten.' },
    { slug: 'entruempelung-kosten-pro-m3', title: 'Entrümpelung Kosten pro m³ erklärt', desc: 'Was kostet eine Entrümpelung pro Kubikmeter? Alle Preise im Überblick.' },
    { slug: 'umzug-vorbereiten-7-schritte', title: 'Umzug vorbereiten in 7 Schritten', desc: '7 einfache Schritte für eine perfekte Umzugsvorbereitung.' },
    { slug: 'wann-lohnt-sich-umzugsfirma', title: 'Wann lohnt sich eine Umzugsfirma?', desc: 'Ab wann lohnt sich der Profi? Kosten-Nutzen-Analyse.' },
    { slug: 'moebeltransport-sicher', title: 'Möbeltransport sicher organisieren', desc: 'So kommen Ihre Möbel sicher an: Verpackung, Transport, Versicherung.' },
    { slug: 'umzug-tipps-familien', title: 'Umzug Tipps für Familien', desc: 'Umzug mit Kindern: praktische Tipps für Familien.' },
    { slug: 'reinigung-nach-umzug', title: 'Reinigung nach Umzug: Tipps vom Profi', desc: 'Professionelle Reinigung nach dem Umzug für die Wohnungsübergabe.' },
    { slug: 'umzug-kosten-rechner', title: 'Umzug Kosten Rechner Erklärung', desc: 'Wie funktioniert ein Umzugskostenrechner? Faktoren und Berechnung.' },
    { slug: 'umzug-anmelden-ummelden', title: 'Umzug anmelden & ummelden', desc: 'Alle Behördengänge beim Umzug: Anmeldung, Ummeldung, Fristen.' },
    { slug: 'umzug-versicherung', title: 'Umzug Versicherung: Was ist wichtig?', desc: 'Transportversicherung beim Umzug: Was deckt sie ab, was nicht?' },
    { slug: 'wohnungsaufloesung-tipps', title: 'Wohnungsauflösung: Tipps und Kosten', desc: 'Wohnungsauflösung organisieren: Ablauf, Kosten und Checkliste.' },
    { slug: 'umzug-im-winter', title: 'Umzug im Winter: Vor- und Nachteile', desc: 'Lohnt sich ein Umzug im Winter? Tipps für den Winterumzug.' },
    { slug: 'umzug-erste-wohnung', title: 'Erste Wohnung: Umzug richtig planen', desc: 'Der erste eigene Umzug: Was Studierende und Berufseinsteiger wissen müssen.' },
];

export default async function Ratgeber({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Ratgeber" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <BookOpen className="w-4 h-4" /><span>FLOXANT Ratgeber</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzug <span className="text-primary">Ratgeber</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Tipps, Checklisten und Kostenübersichten rund um Umzug, Entrümpelung und Reinigung – von den Profis bei FLOXANT.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link key={article.slug} href={`/${lang}/ratgeber/${article.slug}`} className="group p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                            <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{article.desc}</p>
                            <span className="inline-block mt-4 text-xs font-semibold text-primary">Weiterlesen →</span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
