import { Header } from "@/components/Header";

export const metadata = {
    title: "Impressum – FLOXANT",
    description: "Impressum von Floxant.",
    robots: "index, follow",
};

export default function Impressum() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold">Impressum</h1>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p><strong>Angaben gemäß § 5 TMG</strong></p>
                    <p>
                        FLOXANT<br />
                        [Vorname Nachname / Firmenname]<br />
                        [Adresse]<br />
                        [PLZ Ort]<br />
                        Deutschland
                    </p>

                    <p><strong>Kontakt:</strong><br />
                        Telefon: [Telefonnummer]<br />
                        E-Mail: [E-Mail-Adresse]<br />
                        Website: www.floxant.de</p>

                    <p><strong>Vertreten durch:</strong><br />
                        [Name des Geschäftsführers / Inhabers]</p>

                    <p><strong>Umsatzsteuer-ID:</strong><br />
                        [USt-IdNr., falls vorhanden]</p>

                    <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
                        [Name + Adresse]</p>

                    <p><strong>Haftung für Inhalte</strong><br />
                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.</p>

                    <p><strong>Haftung für Links</strong><br />
                        Unsere Website enthält Links zu externen Websites Dritter.</p>

                    <p><strong>Urheberrecht</strong><br />
                        Die durch FLOXANT erstellten Inhalte unterliegen dem deutschen Urheberrecht.</p>
                </div>
            </div>
        </main>
    );
}
