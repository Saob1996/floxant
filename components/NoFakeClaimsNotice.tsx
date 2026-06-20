import { ShieldCheck } from "lucide-react";

export function NoFakeClaimsNotice({ className = "" }: { className?: string }) {
  return (
    <aside className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${className}`} data-component="NoFakeClaimsNotice">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-black text-slate-950">Keine Fake-Claims</h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
            FLOXANT zeigt keine erfundenen Sterne, keine Kundenlogos, keine Garantien und keine Fake-Case-Studies. Termine, Preise und Alternativen bleiben von Ort, Umfang, Zugang und Verfuegbarkeit abhaengig.
          </p>
        </div>
      </div>
    </aside>
  );
}
