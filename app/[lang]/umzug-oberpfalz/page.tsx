import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, ArrowRight, Layers, Shield } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "umzug-oberpfalz",
        title: "Umzugsunternehmen Oberpfalz – Ihr regionaler Partner | FLOXANT",
        description: "Professioneller Transporte und Umzüge in Oberpfalz. Die gesamte Oberpfalz von Regensburg bis Tirschenreuth. 100% Versichert, Festpreisgarantie.",
    });
}

export default async function HubUmzugoberpfalz({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const bridgeLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug Oberpfalz",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Oberpfalz" },
        "areaServed": { "@type": "AdministrativeArea", "name": "Oberpfalz" }
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Standorte", href: "/" + lang + "/service-area-bayern" }, { label: "Oberpfalz" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeLd) }} />
            
            <section className="pt-20 pb-20 px-6 bg-muted/20">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                        Ihr Umzugspartner in der <span className="text-primary">Oberpfalz</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Als tief in Ostbayern verwurzeltes Logistik- und Dienstleistungsunternehmen betreuen wir Privathaushalte und Firmenkunden zuverlässig im gesamten Bezirk.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
                
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <h2>Wir vernetzen die Region</h2>
                    <p>Ein Umzug über Gemeinde- oder Landkreisgrenzen hinweg erfordert ein Transportunternehmen, welches die lokalen Infrastrukturen kennt. Die gesamte Oberpfalz von Regensburg bis Tirschenreuth. Von ländlichen Resthöfen bis zu Etagenwohnungen im städtischen Ballungsraum – unsere Flotte und Teams sind für jedes Einsatzszenario in der Oberpfalz optimal ausgerüstet.</p>
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
                                <p className="text-sm text-muted-foreground">Kurze Anfahrtswege, egal in welcher Kommune der Oberpfalz Sie starten oder ankommen.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-6">Wichtige Knotenpunkte in unserem Netzwerk</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href={"/" + lang + "/umzug-regensburg"} className="px-6 py-3 bg-primary/10 text-primary font-bold rounded-full">Regensburg Headquarter</Link>
                        <Link href={"/" + lang + "/umzug-neutraubling"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Neutraubling</Link>
                        <Link href={"/" + lang + "/umzug-schwandorf"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Schwandorf</Link>
                        <Link href={"/" + lang + "/umzug-kelheim"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Kelheim</Link>
                        <Link href={"/" + lang + "/umzug-amberg"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Amberg</Link>
                        <Link href={"/" + lang + "/umzug-parsberg"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Parsberg</Link>
                        <Link href={"/" + lang + "/umzug-burglengenfeld"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Burglengenfeld</Link>
                        <Link href={"/" + lang + "/umzug-weiden"} className="px-6 py-3 border border-border/50 rounded-full hover:border-primary">Weiden</Link>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold mb-8">Kostenfrei innerhalb der Oberpfalz anfragen</h2>
                    <SmartBookingWizard dict={dict} />
                </div>
            </section>
        </main>
    )
}
