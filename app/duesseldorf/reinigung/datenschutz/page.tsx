import type { Metadata } from "next";

import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningMetadata,
} from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/reinigung/datenschutz",
    title: "Datenschutz Düsseldorf Reinigung | FLOXANT",
    description:
      "Datenschutzhinweise für FLOXANT Reinigung Düsseldorf zur Bearbeitung von Reinigungsanfragen per Formular, Telefon, E-Mail und WhatsApp.",
  });

  return {
    ...metadata,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function DuesseldorfDatenschutzPage() {
  return (
    <main className="px-4 pb-24 pt-12 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-[1rem] border border-slate-200 bg-white p-8 shadow-[0_24px_64px_rgba(15,23,42,0.08)] md:p-10">
        <h1 className="text-4xl font-bold tracking-normal text-slate-950">
          Datenschutzhinweise für FLOXANT Reinigung Düsseldorf
        </h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">Verantwortlicher</h2>
            <p className="mt-2">
              FLOXANT Reinigung Düsseldorf
              <br />
              {DUESSELDORF_CLEANING.address.streetAddress}
              <br />
              {DUESSELDORF_CLEANING.address.postalCode} {DUESSELDORF_CLEANING.address.city}
              <br />
              E-Mail: {DUESSELDORF_CLEANING.email}
              <br />
              Telefon/WhatsApp: {DUESSELDORF_CLEANING.phoneDisplay}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Erhobene Daten über das Formular</h2>
            <p className="mt-2">
              Bei Reinigungsanfragen verarbeiten wir insbesondere Name, Telefonnummer,
              optionale E-Mail-Adresse, Reinigungsart, Fläche, Zustandsangaben,
              Terminwunsch, Stadtteil oder PLZ, Freitext-Hinweise und die unverbindliche
              Ersteinschätzung aus dem Rechner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Zweck der Verarbeitung</h2>
            <p className="mt-2">
              Die Daten werden genutzt, um Reinigungsanfragen für Düsseldorf und die nähere
              Umgebung zu prüfen, Rückfragen zu stellen, Termine vorzubereiten und passende
              Angebote oder Abstimmungen durchzuführen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Kontaktaufnahme</h2>
            <p className="mt-2">
              Die Kontaktaufnahme kann per Telefon, E-Mail oder WhatsApp erfolgen, wenn dies
              zur Bearbeitung Ihrer Anfrage notwendig oder von Ihnen gewünscht ist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Speicherung zur Bearbeitung Ihrer Anfrage</h2>
            <p className="mt-2">
              Anfragen aus dem Formular werden in den dafür genutzten FLOXANT-Systemen
              gespeichert, damit Rückfragen, Angebote, Termine und Nachweise nachvollziehbar
              bearbeitet werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Rechtsgrundlagen</h2>
            <p className="mt-2">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
              (Anbahnung und Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1
              lit. f DSGVO (berechtigtes Interesse an geordneter Kundenkommunikation und
              Bearbeitung von Anfragen).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">WhatsApp-Hinweis</h2>
            <p className="mt-2">
              Wenn Sie WhatsApp nutzen, erfolgt die Kommunikation über die Infrastruktur von
              WhatsApp. Dabei können zusätzliche Daten außerhalb unseres direkten Einflusses
              verarbeitet werden. Nutzen Sie alternativ gern Telefon oder E-Mail, wenn Sie
              diesen Kanal nicht möchten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Hosting-Hinweis</h2>
            <p className="mt-2">
              Die Website wird über bestehende Hosting- und Infrastruktur-Dienste des
              Projekts bereitgestellt. Darüber hinaus nennen wir hier bewusst keine weiteren
              Tracking-Behauptungen, die in diesem Kontext nicht gesondert geprüft wurden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Rechte der betroffenen Personen</h2>
            <p className="mt-2">
              Sie haben nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft,
              Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und
              Datenübertragbarkeit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">Löschung und Speicherdauer</h2>
            <p className="mt-2">
              Wir speichern anfragebezogene Daten nur so lange, wie dies für Bearbeitung,
              Rückfragen, rechtliche Pflichten und nachvollziehbare interne Dokumentation
              erforderlich ist. Danach werden die Daten gelöscht oder entsprechend
              eingeschränkt verarbeitet.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
