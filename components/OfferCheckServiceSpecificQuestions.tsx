import { HelpCircle } from "lucide-react";

const questionGroups = [
  {
    title: "Reinigung",
    items: ["Fläche?", "Objektart?", "Turnus?", "Zustand?", "gewünschter Termin?"],
  },
  {
    title: "Umzug",
    items: ["Start/Ziel?", "Etage/Aufzug?", "Menge?", "Termin?", "besondere Stuecke?"],
  },
  {
    title: "Entrümpelung",
    items: ["Räume?", "Menge?", "Zugang?", "Entsorgung?", "Frist?"],
  },
  {
    title: "Solarreinigung",
    items: ["Dachart?", "Modulfläche?", "Zugang?", "Fotos?"],
  },
] as const;

export function OfferCheckServiceSpecificQuestions() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="OfferCheckServiceSpecificQuestions">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Service-spezifische Fragen</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Diese Angaben machen den Angebotscheck konkreter.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {questionGroups.map((group) => (
            <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <HelpCircle className="h-5 w-5 text-blue-700" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{group.title}</h3>
              <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 text-slate-700">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
