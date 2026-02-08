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
                        <p>Termine werden individuell mit dem Kunden vereinbart und sind verbindlich.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Vorbereitung durch den Kunden</h2>
                        <p>Der Kunde stellt sicher, dass am vereinbarten Termin Zugang zur Immobilie sowie zu allen relevanten Räumlichkeiten besteht.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Zusatzleistungen</h2>
                        <p>
                            Zusätzliche Leistungen, die nicht im ursprünglichen Angebot enthalten sind, müssen vorab vereinbart werden und können gesondert berechnet werden.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Haftung für Wertgegenstände</h2>
                        <p>
                            Der Kunde ist verpflichtet, Wertgegenstände, Bargeld, wichtige Dokumente sowie empfindliche Gegenstände vor Beginn der Arbeiten eigenständig zu sichern. Für nicht gesicherte Wertgegenstände übernimmt FLOXANT keine Haftung.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Verspätungen und höhere Gewalt</h2>
                        <p>
                            Zeitliche Verzögerungen aufgrund von Verkehr, Wetterbedingungen oder höherer Gewalt können auftreten. In solchen Fällen besteht kein Anspruch auf Schadensersatz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Stornierung</h2>
                        <p>
                            Terminabsagen müssen mindestens 24 Stunden vor dem vereinbarten Termin erfolgen. Bei kurzfristigeren Absagen behalten wir uns vor, eine Ausfallpauschale zu berechnen.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
