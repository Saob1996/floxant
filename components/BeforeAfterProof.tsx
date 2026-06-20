export function BeforeAfterProof({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="BeforeAfterProof">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Before/After-Regel</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Sichtbeweise nur neutral oder mit echter Freigabe.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Ohne echte freigegebene Bilder nutzt FLOXANT abstrakte Vorher-/Nachher-Visuals. Sie zeigen einen Prozess, kein behauptetes Kundenobjekt.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {["Vorher neutral", "Nachher neutral"].map((label, panelIndex) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-normal text-slate-500">{label}</p>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={`${label}-${index}`} className={`h-8 rounded-md ${panelIndex === 0 ? "bg-slate-300" : "bg-white"}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
