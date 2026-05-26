import type { Metadata } from "next";

import {
  buildDuesseldorfCleaningMetadata,
} from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/reinigung/agb",
    title: "AGB Düsseldorf Reinigung | FLOXANT",
    description:
      "AGB und Leistungsbedingungen für FLOXANT Reinigung Düsseldorf mit Hinweisen zu unverbindlichen Rechnerpreisen, Terminabstimmung und Ausführung.",
  });
}

export default function DuesseldorfAgbPage() {
  return (
    <main className="px-4 pb-24 pt-12 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-[1rem] border border-slate-200 bg-white p-8 shadow-[0_24px_64px_rgba(15,23,42,0.08)] md:p-10">
        <h1 className="text-4xl font-bold tracking-normal text-slate-950">
          AGB / Leistungsbedingungen für FLOXANT Reinigung Düsseldorf
        </h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. Geltungsbereich</h2>
            <p className="mt-2">
              Diese Bedingungen gelten für Reinigungsleistungen von FLOXANT Reinigung
              Düsseldorf in Düsseldorf und der näheren Umgebung.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. Unverbindliche Anfrage</h2>
            <p className="mt-2">
              Eine Anfrage über Website, Telefon, E-Mail oder WhatsApp ist zunächst
              unverbindlich. Ein Vertrag entsteht erst nach ausdrücklicher Bestätigung oder
              Angebotsannahme.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. Rechnerpreise</h2>
            <p className="mt-2">
              Rechnerpreise und Preisbereiche sind unverbindliche Ersteinschätzungen. Ein
              verbindlicher Preis kann erst nach Prüfung der Angaben, gegebenenfalls nach
              Rückfrage oder genauerer Abstimmung bestätigt werden.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. Leistungsumfang</h2>
            <p className="mt-2">
              Maßgeblich ist der individuell abgestimmte Leistungsumfang. Dazu zählen zum
              Beispiel Reinigungsart, Flächengröße, Zustand, Fenster, Küche, Bad und
              gewünschte Zusatzarbeiten.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. Zugang und Voraussetzungen</h2>
            <p className="mt-2">
              Der Kunde muss den Zugang zum Objekt ermöglichen. Soweit für die vereinbarte
              Leistung erforderlich, sollten Strom und Wasser verfügbar sein.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">6. Abweichender Zustand</h2>
            <p className="mt-2">
              Weicht der tatsächliche Zustand erheblich von den vorab übermittelten Angaben
              ab, kann sich der Preis oder die Ausführungszeit ändern. In solchen Fällen wird
              dies vor Fortsetzung der Leistung möglichst abgestimmt.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">7. Zahlung</h2>
            <p className="mt-2">
              Die Zahlung erfolgt nach Vereinbarung. Sofern nichts Abweichendes abgestimmt
              ist, sind bestätigte Leistungen nach Rechnungsstellung ohne unangemessene
              Verzögerung zu begleichen.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">8. Stornierung und Terminverschiebung</h2>
            <p className="mt-2">
              Terminverschiebungen oder Stornierungen sollten so früh wie möglich mitgeteilt
              werden. Bei sehr kurzfristigen Änderungen behalten wir uns vor, bereits
              reservierte Zeitfenster und entstandenen Aufwand angemessen zu berücksichtigen.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">9. Haftung</h2>
            <p className="mt-2">
              FLOXANT Reinigung Düsseldorf haftet im gesetzlichen Rahmen für vorsätzlich oder
              grob fahrlässig verursachte Schäden. Offensichtliche Mängel oder Schäden sollten
              möglichst unmittelbar nach Leistungserbringung gemeldet werden.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-950">10. Schlussbestimmungen</h2>
            <p className="mt-2">
              Es gilt deutsches Recht. Sollten einzelne Regelungen unwirksam sein oder
              werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
