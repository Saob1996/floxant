import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: "Studentenumzug Regensburg | Günstig & Zuverlässig | FLOXANT",
        description: "Studentenumzug in Regensburg – flexibel, günstig und professionell. Bordsteinkante zu Bordsteinkante oder Rundum-Service. FLOXANT – Ihr Umzugspartner für Studierende.",
        alternates: {
            canonical: `https://floxant.de/${lang}/studentenumzug-regensburg`,
            languages: i18n.locales.reduce((acc, l) => { acc[l] = `https://floxant.de/${l}/studentenumzug-regensburg`; return acc; }, {} as Record<string, string>),
        },
    };
}

export default async function StudentenumzugRegensburg({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Regensburg", href: `/${lang}/umzug-regensburg` }, { label: "Studentenumzug" }]} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <GraduationCap className="w-4 h-4" /><span>Für Studierende in Regensburg</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Studentenumzug in <span className="text-primary">Regensburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Regensburg ist Universitätsstadt. Semesterwechsel, WG-Umzüge und der erste eigene Haushalt – FLOXANT bietet flexible und faire Umzugslösungen für Studierende.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Umziehen als Student – einfach und bezahlbar</h2>
                        <p>
                            Als Universitätsstadt mit über 30.000 Studierenden ist Regensburg ein Ort, an dem Umzüge zum Alltag gehören. Ob der Wechsel vom Studentenwohnheim in die erste WG, der Auszug nach dem Abschluss oder der saisonale Zimmertausch – Studierende brauchen einen Umzugspartner, der flexibel, zuverlässig und fair kalkuliert.
                        </p>
                        <p>
                            FLOXANT bietet speziell auf Studierende zugeschnittene Umzugsoptionen: vom reinen „Bordsteinkante zu Bordsteinkante"-Transport bis zum Komplettservice mit Verpackung und Montage. Unsere Preise sind transparent und studentenfreundlich – ohne versteckte Kosten, ohne Mindestauftragsvolumen.
                        </p>
                        <p>
                            Die Universität Regensburg, die OTH Regensburg und das Studentenwerk sorgen für eine hohe Umzugsfrequenz in den Semestermonaten. Wir kennen die Wohnsituationen rund um den Campus, in der Altstadt, im Kasernenviertel und in Prüfening genau und wissen, worauf es bei der Anfahrt, beim Parken und beim Transport in enge Treppenhäuser ankommt.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Unsere Studentenumzug-Optionen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                <h3 className="text-xl font-bold mb-3">Basis-Transport</h3>
                                <p className="text-muted-foreground mb-4">Bordsteinkante zu Bordsteinkante. Sie packen – wir transportieren. Die günstigste Option für Studierende mit kleinem Budget.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Ab einem Zimmer buchbar</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Keine Mindestmenge</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Festpreis ohne Überraschungen</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                <h3 className="text-xl font-bold mb-3">Komplett-Service</h3>
                                <p className="text-muted-foreground mb-4">Wir übernehmen alles: Verpackung, Transport, Aufbau. Ideal für den Umzug in die erste eigene Wohnung oder bei wenig Zeit.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Verpackungsmaterial inklusive</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Möbelmontage auf Wunsch</li>
                                    <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Endreinigung optional zubuchbar</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/umzugskosten-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugskosten Bayern</Link>
                            <Link href={`/${lang}/reinigung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Regensburg</Link>
                            <Link href={`/${lang}/kurzfristiger-umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Kurzfristiger Umzug</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Studentenumzug anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Angebot – studentenfreundlich kalkuliert. Jetzt anfragen!</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
