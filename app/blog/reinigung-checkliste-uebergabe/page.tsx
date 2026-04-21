
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Die perfekte Reinigung zur Wohnungsübergabe | FLOXANT Blog",
    description: "Checkliste für Mieter und Vermieter in Bayern: Was bei der Endreinigung wirklich zählt."
};

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-[#0A0B10] py-24 text-white">
            <div className="mx-auto max-w-4xl px-6">
                <Breadcrumbs lang="de" items={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: "reinigung-checkliste-übergabe" }
                ]} />
                
                <header className="mb-16 mt-12 text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
                        Die perfekte Reinigung zur Wohnungsübergabe
                    </h1>
                    <p className="text-xl text-white/50 leading-relaxed">
                        Checkliste für Mieter und Vermieter in Bayern: Was bei der Endreinigung wirklich zählt.
                    </p>
                </header>

                <article className="prose prose-invert prose-lg max-w-none">
                    <p></p>
# Endreinigung mit Abnahmegarantie
<p></p>
<p>In Bayern sind die Anforderungen an die Sauberkeit bei einer Wohnungsübergabe oft hoch. Eine oberflächliche Reinigung reicht selten aus.</p>
<p></p>
### Die kritischen Zonen:
<p>- **Fenster & Rahmen**: Kalkablagerungen und Staub in den Schienen.</p>
<p>- **Küche**: Fettrückstände am Dunstabzug und im Backofen.</p>
<p>- **Bad**: Gründliche Entkalkung der Armaturen.</p>
<p></p>
<p>Mit dem Reinigungsservice von FLOXANT erhalten Sie eine Abnahmegarantie. Wir begleiten Sie (auf Wunsch) bis zur Schlüsselübergabe.</p>
<p>        </p>
                </article>

                <div className="mt-20 border-t border-white/10 pt-12">
                    <div className="rounded-3xl bg-blue-600/10 p-10 text-center">
                        <h2 className="mb-4 text-2xl font-bold">Interesse an einer Beratung?</h2>
                        <p className="mb-8 text-white/60">Lassen Sie uns gemeinsam die beste Lösung für Ihr Vorhaben finden – unverbindlich und zum Festpreis.</p>
                        <a href="/rechner" className="btn-premium inline-flex py-4 px-10 rounded-2xl bg-blue-600 font-bold uppercase tracking-widest">
                            Jetzt anfragen
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
    