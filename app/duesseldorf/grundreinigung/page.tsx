import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/grundreinigung",
    title: "Grundreinigung Düsseldorf | starke Verschmutzung prüfen",
    description:
      "Grundreinigung in Düsseldorf für stärkere Verschmutzung, Einzug, Auszug oder Objektwechsel: Fotos senden und realistischen Preisrahmen prüfen lassen.",
  });
}

export default function DuesseldorfGrundreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/grundreinigung"
      metaDescription="Grundreinigung in Düsseldorf für stärkere Verschmutzung, Einzug, Auszug oder Objektwechsel: Fotos senden und realistischen Preisrahmen prüfen lassen."
      kicker="FLOXANT Grundreinigung Düsseldorf"
      title="Grundreinigung in Düsseldorf"
      serviceLabel="Grundreinigung"
      description="Für Flächen in Düsseldorf, die mehr als eine normale Unterhaltsreinigung brauchen und deshalb sauber vorgeprüft werden müssen."
      contentSections={[
        {
          title: "Grundreinigung, wenn normale Reinigung nicht reicht",
          paragraphs: [
            "Grundreinigung in Düsseldorf wird meist angefragt, wenn sich Verschmutzung aufgebaut hat, nach längerer Nutzung ein Neustart nötig ist oder eine Fläche vor Einzug, Übergabe oder neuer Nutzung wieder deutlich sauberer wirken soll. Der Aufwand hängt stark von Boden, Küche, Bad, Rändern, Ecken, Oberflächen und zugänglichen Bereichen ab.",
            "FLOXANT prüft vorab, ob eine Grundreinigung realistisch planbar ist und welche Bereiche Priorität haben. Fotos helfen besonders, weil starke Verschmutzung, Kalk, Fett, Staub, Laufspuren oder Rückstände auf Bildern schneller einzuordnen sind als in einer kurzen Textnachricht.",
          ],
        },
        {
          title: "Sauberer Preisrahmen statt schneller Pauschale",
          paragraphs: [
            "Bei Grundreinigung wirken kleine Details stark auf den Preis: Material, Zustand, Zeitdruck, Etage, Zugang und gewünschtes Ergebnis. Deshalb ist ein fester Preis ohne Objektprüfung oft ungenau.",
            "Wenn Sie ein Budget nennen, ordnet FLOXANT ein, welcher Umfang dafür realistisch ist. So bekommen Sie eine ehrlichere Rückmeldung und vermeiden falsche Erwartungen vor Ort.",
          ],
        },
      ]}
      bullets={[
        "Geeignet bei stärkerer Verschmutzung, nach längerer Nutzung oder vor neuer Belegung.",
        "Der tatsächliche Zustand beeinflusst Umfang, Zeit und Preis stärker als bei Standardreinigung.",
        "Die Seite bleibt bewusst auf Reinigung begrenzt und vermeidet fremde Leistungsversprechen.",
      ]}
      localFocus={["Innenstadt", "Gerresheim", "Benrath", "Kaiserswerth", "Hilden", "Erkrath"]}
      priceLogic={[
        "Starke Verschmutzung, Kalk, Fett, Laufspuren, Bodenart und schwer zugängliche Bereiche erhöhen den Aufwand.",
        "Fotos und Prioritäten helfen, Grundreinigung von normaler Unterhaltsreinigung sauber zu trennen.",
        "Ein Budget ist hilfreich, wird aber erst nach Zustand, Termin und Leistungsumfang realistisch eingeordnet.",
      ]}
    />
  );
}
