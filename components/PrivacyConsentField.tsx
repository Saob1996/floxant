type PrivacyConsentFieldProps = {
  inverted?: boolean;
  locale?: "de" | "en";
};

export function PrivacyConsentField({ inverted = false, locale = "de" }: PrivacyConsentFieldProps) {
  const copy = locale === "en"
    ? { prefix: "I have read the", link: "privacy notice", suffix: "and agree to the processing of my request." }
    : { prefix: "Ich habe den", link: "Datenschutz-Hinweis", suffix: "gelesen und stimme der Bearbeitung meiner Anfrage zu." };
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-6 ${inverted ? "border-white/15 bg-white/5 text-white/80" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
      <input
        type="checkbox"
        name="privacyConsent"
        value="true"
        required
        aria-required="true"
        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600"
      />
      <span>
        {copy.prefix}{" "}
        <a className="font-bold underline underline-offset-2" href="/datenschutz" target="_blank" rel="noreferrer">
          {copy.link}
        </a>{" "}
        {copy.suffix}
      </span>
    </label>
  );
}
