import { Mail, MessageCircle, Phone } from "lucide-react";

const methods = [
  { title: "Rueckruf", text: "Wenn Details besser muendlich und ruhig geklaert werden.", Icon: Phone },
  { title: "WhatsApp", text: "Wenn Fotos oder kurze Abstimmung hilfreich sind. Bitte keine Zugangscodes senden.", Icon: MessageCircle },
  { title: "E-Mail", text: "Wenn Sie lieber schriftlich, knapp und mit wenig Details starten moechten.", Icon: Mail },
] as const;

export function PreferredContactMethodPanel() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="PreferredContactMethodPanel">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-normal text-stone-600">Bevorzugter Kontaktweg</div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-stone-950">
            Sie bestimmen, wie die Rueckfrage starten soll.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {methods.map((method) => (
            <article key={method.title} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm shadow-stone-950/5">
              <method.Icon className="h-5 w-5 text-stone-700" />
              <h3 className="mt-4 text-lg font-black text-stone-950">{method.title}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-700">{method.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
