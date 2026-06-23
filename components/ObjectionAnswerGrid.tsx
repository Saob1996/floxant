import { CheckCircle2 } from "lucide-react";

const objectionAnswers = [
  ["Schon ein Angebot", "Angebot kann strukturiert nach Umfang, Zusatzkosten und offenen Punkten eingeordnet werden."],
  ["Es ist dringend", "Dringlichkeit angeben. Termine werden nach Verfügbarkeit geprüft, ohne Sofortgarantie."],
  ["Sensibler Fall", "Diskrete Kontaktaufnahme und zurückhaltende Kommunikation sind möglich."],
  ["Gewerbekunde", "Objektart, Fläche, Turnus, Zeiten und Ansprechpartner helfen bei der ersten Einordnung."],
  ["Noch keine Adresse", "Ort/Stadt und grobe Beschreibung reichen für den ersten Schritt."],
  ["Nur grober Umfang", "Fotos und eine kurze Lagebeschreibung sind für die Vorprüfung oft ausreichend."],
] as const;

export function ObjectionAnswerGrid() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="ObjectionAnswerGrid">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-slate-50 p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Einwände klären</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Was häufig gegen das Absenden spricht und wie FLOXANT damit umgeht.
          </h2>
        </div>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {objectionAnswers.map(([title, answer]) => (
            <article key={title} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <h3 className="text-base font-black text-slate-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">{answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
