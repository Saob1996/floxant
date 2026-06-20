import { ShieldAlert } from "lucide-react";

export function SensitiveCaseNotice() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="SensitiveCaseNotice">
      <div className="mx-auto max-w-7xl rounded-lg border border-amber-200 bg-amber-50 p-6 md:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-normal text-amber-800">Sensible Faelle</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-stone-950">
              Diskret heisst auch: klare Grenzen.
            </h2>
          </div>
          <div className="flex gap-3 text-sm font-bold leading-7 text-amber-950">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Bitte keine Zugangscodes, Ausweisdaten, Zahlungsdaten oder intime Details in die erste Anfrage schreiben. Bei Gefahr, Gewalt oder akuter Bedrohung sind Notruf, Polizei oder geeignete Beratungsstellen der richtige Erstkontakt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
