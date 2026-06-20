import { Clock3 } from "lucide-react";

export function RecurringCleaningHint() {
  return (
    <aside className="rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-cyan-950" data-component="RecurringCleaningHint">
      <Clock3 className="h-5 w-5" />
      <h3 className="mt-4 text-lg font-black">Regelmaessige Reinigung braucht Turnus und Zeitfenster</h3>
      <p className="mt-2 text-sm font-semibold leading-7">
        Woechentlich, mehrmals pro Woche oder nach Bedarf: Fuer die erste Einordnung helfen Flaeche, Raumliste, Sanitaer/Kueche, Zugang, Ansprechpartner und gewuenschte Uhrzeit.
      </p>
    </aside>
  );
}
