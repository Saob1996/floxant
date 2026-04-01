import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

import Link from "next/link";
import { MapPin, ArrowRight, Layers, Shield } from "lucide-react";



export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = dict?.pages?.umzug_landkreis_regensburg || {};
    return generatePageSEO({
        pageLocale,
        path: "umzug-landkreis-regensburg",
        title: content.meta_title || "Umzug Landkreis Regensburg – Ihr regionaler Partne | FLOXANT",
        description: `Professionelle Transporte und Umzüge im Landkreis Regensburg. Alle 41 Gemeinden und Märkte im direkten Umkreis der Domstadt.`,
    });
}

export default async function HubUmzuglandkreisregensburg({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const bridgeLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug Landkreis Regensburg",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Landkreis Regensburg" },
        "areaServed": { "@type": "AdministrativeArea", "name": "Landkreis Regensburg" }
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Standorte", href: "/" + pageLocale + "/service-area-bayern" }, { label: "Landkreis Regensburg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeLd) }} />
            
            <section className="pt-20 pb-20 px-6 bg-muted/20">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                        Ihr Umzugspartner in der <span className="text-primary">Landkreis Regensburg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Als tief in Ostbayern verwurzeltes Logistik- und Dienstleistungsunternehmen betreuen wir Privathaushalte und Firmenkunden zuverlässig im gesamten Landkreis.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
                
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <h2>Wir vernetzen die Region</h2>
                    <p>Ein Umzug über Gemeinde- oder Landkreisgrenzen hinweg erfordert ein Transportunternehmen, welches die lokalen Infrastrukturen kennt. Alle 41 Gemeinden und Märkte im direkten Umkreis der Domstadt. Von ländlichen Resthöfen bis zu Etagenwohnungen im städtischen Ballungsraum – unsere Flotte und Teams sind für jedes Einsatzszenario in der Landkreis Regensburg optimal ausgerüstet.</p>
                </div>

                <div className="bg-card p-10 rounded-3xl border border-border shadow-sm">
                    <h3 className="text-2xl font-bold mb-8">Unsere Kern-Ressourcen für Ihr Gebiet</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <Shield className="w-8 h-8 text-emerald-500 shrink-0"/>
                            <div>
                                <h4 className="font-bold text-lg">Zertifiziert regional</h4>
                                <p className="text-sm text-muted-foreground">Eingetragener Betrieb der Verkehrshaftung. 100% rechtssicher aus Regensburg gesteuert.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <MapPin className="w-8 h-8 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-bold text-lg">Flächendeckende Disposition</h4>
                                <p className="text-sm text-muted-foreground">Kurze Anfahrtswege, egal in welcher Kommune der Landkreis Regensburg Sie starten oder ankommen.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-6">Wichtige Knotenpunkte in unserem Netzwerk</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href={"/" + pageLocale + "/umzug-regensburg"} className="px-6 py-3 bg-primary/10 text-primary font-bold rounded-full">Regensburg Headquarter</Link>
                        <Link href={"/" + pageLocale + "/umzug-neutraubling"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Neutraubling</Link>
                        <Link href={"/" + pageLocale + "/umzug-schwandorf"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Schwandorf</Link>
                        <Link href={"/" + pageLocale + "/umzug-kelheim"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Kelheim</Link>
                        <Link href={"/" + pageLocale + "/umzug-amberg"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Amberg</Link>
                        <Link href={"/" + pageLocale + "/umzug-parsberg"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Parsberg</Link>
                        <Link href={"/" + pageLocale + "/umzug-burglengenfeld"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Burglengenfeld</Link>
                        <Link href={"/" + pageLocale + "/umzug-weiden"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Weiden</Link>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold mb-8">Kostenfrei innerhalb der Landkreis Regensburg anfragen</h2>
                    <DualCalculator dic={dict} />
                </div>
            </section>
        </main>
    )
}
