import { Header } from "@/components/Header";

export const metadata = {
    title: "Buchungsbedingungen – FLOXANT",
    description: "Buchungsbedingungen von Floxant.",
    robots: "index, follow",
};

export default function Buchungsbedingungen() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Buchungsbedingungen</h1>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Terminvereinbarung</h2>
                        <p>Termine werden individuell abgestimmt.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Vorbereitung</h2>
                        <p>Kunden müssen den Zugang zur Immobilie sicherstellen.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Zusatzleistungen</h2>
                        <p>Zusatzleistungen müssen vorab vereinbart werden.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Haftung für Kundenbesitz</h2>
                        <p>Wertgegenstände müssen vom Kunden separat gesichert werden.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Verspätungen</h2>
                        <p>Verzögerungen durch Verkehr oder höhere Gewalt können auftreten.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
