import { RequestTypeCards } from "@/components/RequestTypeCards";
import { SafeRequestNotice } from "@/components/SafeRequestNotice";

export function ContactPathChooser() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="ContactPathChooser">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-normal text-blue-700">Kontaktpfad waehlen</div>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Ohne klare Auswahl direkt zum passenden Formularzustand.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <SafeRequestNotice />
          </div>
        </div>
        <RequestTypeCards />
      </div>
    </section>
  );
}
