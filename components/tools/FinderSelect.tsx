type FinderSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [string, string])[];
};

export function FinderSelect({ label, value, onChange, options }: FinderSelectProps) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-800">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}
