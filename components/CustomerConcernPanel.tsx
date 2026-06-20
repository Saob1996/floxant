import { HelpCircle, MessageCircle, ShieldCheck } from "lucide-react";

const concerns = [
  {
    title: "Ich weiss nicht, welche Leistung passt.",
    answer: "Beschreiben Sie die Situation kurz. FLOXANT ordnet die Anfrage dem passenden Service zu.",
    Icon: HelpCircle,
  },
  {
    title: "Ich habe nur grobe Informationen.",
    answer: "Ort, grober Umfang und Fotos reichen oft fuer den ersten Schritt. Details koennen spaeter folgen.",
    Icon: MessageCircle,
  },
  {
    title: "Ich habe Angst vor hohen Kosten.",
    answer: "FLOXANT erklaert Aufwandstreiber. Es gibt keine Preisgarantie, aber eine klare Einordnung.",
    Icon: ShieldCheck,
  },
];

export function CustomerConcernPanel() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="CustomerConcernPanel">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-blue-700">Unsicher?</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Gute Anfrage bedeutet nicht, dass schon alles perfekt bekannt sein muss.
          </h2>
          <p className="mt-3 text-base leading-8 text-slate-700">
            Die wichtigsten Zweifel lassen sich ohne Druck klaeren. Eine Anfrage ist noch keine Buchung.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {concerns.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <item.Icon className="h-5 w-5 text-blue-700" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
