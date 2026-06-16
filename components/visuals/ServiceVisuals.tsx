type VisualTone = "blue" | "emerald" | "amber" | "slate";

type VisualProps = {
  title?: string;
  label?: string;
  tone?: VisualTone;
  className?: string;
};

const toneClasses: Record<VisualTone, { bg: string; accent: string; text: string; line: string }> = {
  blue: {
    bg: "bg-blue-50",
    accent: "bg-blue-600",
    text: "text-blue-900",
    line: "border-blue-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    accent: "bg-emerald-600",
    text: "text-emerald-900",
    line: "border-emerald-200",
  },
  amber: {
    bg: "bg-amber-50",
    accent: "bg-amber-500",
    text: "text-amber-950",
    line: "border-amber-200",
  },
  slate: {
    bg: "bg-slate-100",
    accent: "bg-slate-900",
    text: "text-slate-950",
    line: "border-slate-200",
  },
};

export function VisualServiceShape({
  title = "Service-Cluster",
  label = "Anfrage sortieren",
  tone = "blue",
  className = "",
}: VisualProps) {
  const t = toneClasses[tone];
  return (
    <div className={`overflow-hidden rounded-lg border ${t.line} ${t.bg} p-5 ${className}`} aria-label={title}>
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-xs font-black uppercase tracking-normal ${t.text}`}>{label}</p>
          <span className={`h-3 w-14 rounded-full ${t.accent}`} />
        </div>
        <svg viewBox="0 0 420 180" role="img" aria-label={title} className="h-auto w-full">
          <rect x="12" y="24" width="116" height="82" rx="14" fill="white" opacity="0.96" />
          <rect x="152" y="24" width="116" height="82" rx="14" fill="white" opacity="0.96" />
          <rect x="292" y="24" width="116" height="82" rx="14" fill="white" opacity="0.96" />
          <path d="M128 65H152M268 65H292M70 106V140H350V106" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" className={t.text} opacity="0.45" />
          <circle cx="70" cy="65" r="18" fill="currentColor" className={t.text} opacity="0.7" />
          <circle cx="210" cy="65" r="18" fill="currentColor" className={t.text} opacity="0.7" />
          <circle cx="350" cy="65" r="18" fill="currentColor" className={t.text} opacity="0.7" />
          <rect x="112" y="132" width="196" height="28" rx="14" fill="currentColor" className={t.text} opacity="0.86" />
        </svg>
      </div>
    </div>
  );
}

export function BeforeAfterCard({
  title = "Vorher / Nachher",
  label = "Neutraler Sichtcheck",
  tone = "emerald",
  className = "",
}: VisualProps) {
  const t = toneClasses[tone];
  return (
    <div className={`rounded-lg border ${t.line} bg-white p-5 shadow-sm ${className}`}>
      <p className={`text-xs font-black uppercase tracking-normal ${t.text}`}>{label}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-100 p-4">
          <div className="mb-3 text-xs font-black uppercase tracking-normal text-slate-500">Vorher</div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="h-8 rounded-md bg-slate-300" />
            ))}
          </div>
        </div>
        <div className={`rounded-lg border ${t.line} ${t.bg} p-4`}>
          <div className={`mb-3 text-xs font-black uppercase tracking-normal ${t.text}`}>Nachher</div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="h-8 rounded-md bg-white" />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
        Visualisierung ohne Personen, Kennzeichen oder private Gegenstaende. Gedacht fuer Glas, PV, Boden, Keller oder Bueroflaeche.
      </p>
    </div>
  );
}

export function OfferCheckVisual({
  title = "Angebot pruefen",
  label = "Preis, Umfang, Termin",
  tone = "blue",
  className = "",
}: VisualProps) {
  const t = toneClasses[tone];
  return (
    <div className={`rounded-lg border ${t.line} ${t.bg} p-5 ${className}`}>
      <p className={`text-xs font-black uppercase tracking-normal ${t.text}`}>{label}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <svg viewBox="0 0 420 220" role="img" aria-label={title} className="mt-4 h-auto w-full">
        <rect x="38" y="24" width="210" height="164" rx="18" fill="white" />
        <rect x="70" y="58" width="120" height="10" rx="5" fill="currentColor" className={t.text} opacity="0.8" />
        <rect x="70" y="88" width="148" height="10" rx="5" fill="currentColor" className={t.text} opacity="0.35" />
        <rect x="70" y="116" width="116" height="10" rx="5" fill="currentColor" className={t.text} opacity="0.35" />
        <rect x="70" y="144" width="136" height="10" rx="5" fill="currentColor" className={t.text} opacity="0.35" />
        <circle cx="292" cy="114" r="58" fill="white" />
        <path d="M270 114l16 16 34-42" stroke="currentColor" className={t.text} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M248 114h-38" stroke="currentColor" className={t.text} strokeWidth="8" strokeLinecap="round" opacity="0.4" />
        <rect x="274" y="164" width="92" height="18" rx="9" fill="currentColor" className={t.text} opacity="0.85" />
      </svg>
    </div>
  );
}

export function BlogInsightGraphic({
  title = "Blog-Entscheidungshilfe",
  label = "Antwort, Checkliste, naechster Schritt",
  tone = "amber",
  className = "",
}: VisualProps) {
  const t = toneClasses[tone];
  return (
    <div className={`rounded-lg border ${t.line} bg-white p-5 shadow-sm ${className}`}>
      <p className={`text-xs font-black uppercase tracking-normal ${t.text}`}>{label}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-3">
        {["Direkte Antwort", "Entscheidung", "Checkliste", "Anfragepfad"].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-md ${t.accent} text-xs font-black text-white`}>
              {index + 1}
            </span>
            <span className="text-sm font-black text-slate-800">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocalServiceVisual({
  title = "Lokales Signal",
  label = "Ort, Kontakt, Leistung",
  tone = "slate",
  className = "",
}: VisualProps) {
  const t = toneClasses[tone];
  return (
    <div className={`rounded-lg border ${t.line} ${t.bg} p-5 ${className}`}>
      <p className={`text-xs font-black uppercase tracking-normal ${t.text}`}>{label}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-3">
        <div className="h-28 rounded-lg border border-white bg-white/80 p-4">
          <div className={`h-3 w-28 rounded-full ${t.accent}`} />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="h-12 rounded-md bg-slate-200" />
            <span className="h-12 rounded-md bg-slate-200" />
            <span className="h-12 rounded-md bg-slate-200" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <span className="rounded-md bg-white px-3 py-3 text-sm font-black text-slate-700">NAP klar</span>
          <span className="rounded-md bg-white px-3 py-3 text-sm font-black text-slate-700">Kontakt klar</span>
        </div>
      </div>
    </div>
  );
}

export function ProcessStepGraphic({
  title = "Ablaufgrafik",
  label = "Von Anfrage bis Rueckmeldung",
  tone = "blue",
  className = "",
}: VisualProps) {
  const t = toneClasses[tone];
  return (
    <div className={`rounded-lg border ${t.line} bg-white p-5 shadow-sm ${className}`}>
      <p className={`text-xs font-black uppercase tracking-normal ${t.text}`}>{label}</p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {["Senden", "Sortieren", "Pruefen", "Antwort"].map((item, index) => (
          <div key={item} className={`relative flex-1 rounded-lg border ${t.line} ${t.bg} p-4`}>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${t.accent} text-xs font-black text-white`}>
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-black text-slate-800">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
