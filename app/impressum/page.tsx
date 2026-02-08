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

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Angaben gemäß § 5 TMG</h2>
                        <p>
                            FLOXANT<br />
                            Inhaber: Saleh Obid<br />
                            Breite Straße 22<br />
                            40213 Düsseldorf<br />
                            Deutschland
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Kontakt</h2>
                        <p>
                            Telefon: +49 1577 1105087<br />
                            E-Mail: [wird ergänzt]
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Umsatzsteuer</h2>
                        <p>
                            Umsatzsteuer-Identifikationsnummer gemäß §27a UStG:<br />
                            wird beantragt
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                        <p>
                            Saleh Obid<br />
                            Breite Straße 22<br />
                            40213 Düsseldorf
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Hinweis</h2>
                        <p>
                            Dieses Unternehmen wird als Einzelunternehmen geführt.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
