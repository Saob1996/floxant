import { Header } from "@/components/Header";

export const metadata = {
    title: "Widerruf – FLOXANT",
    description: "Widerrufsbelehrung von Floxant.",
    robots: "index, follow",
};

export default function Widerrufsbelehrung() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Widerrufsbelehrung</h1>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Widerrufsbelehrung</h2>
                        <p>Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen einen Vertrag zu widerrufen.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Widerrufsfrist</h2>
                        <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
                        <p className="mt-2">
                            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (FLOXANT, Breite Straße 22, 40213 Düsseldorf, Deutschland, Telefon: +49 1577 1105087) mittels einer eindeutigen Erklärung (z. B. per Telefon oder E-Mail) über Ihren Entschluss informieren.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Folgen des Widerrufs</h2>
                        <p>
                            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Ausschluss bzw. vorzeitiges Erlöschen des Widerrufsrechts</h2>
                        <p>
                            Das Widerrufsrecht erlischt vorzeitig, wenn die Dienstleistung vollständig erbracht wurde und mit der Ausführung der Dienstleistung erst begonnen wurde, nachdem der Kunde ausdrücklich zugestimmt hat und gleichzeitig bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
