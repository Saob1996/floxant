"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2 } from "lucide-react";

import { bookingFetch } from "@/lib/booking-submission-client";
import { REQUEST_ATTACHMENT_RULES } from "@/lib/booking/request-service-policy.js";
import type {
  RoundThreeLocale,
  RoundThreeRequestType,
} from "@/lib/round3/service-matrix";

type Props = {
  locale: RoundThreeLocale;
  requestType: RoundThreeRequestType;
  serviceId: string;
  sourcePage: string;
};

const control =
  "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-200";
const label = "block text-sm font-black text-slate-900";

const europeDestinations = [
  ["AT", "Austria / Österreich"], ["BE", "Belgium / Belgien"], ["BG", "Bulgaria / Bulgarien"],
  ["HR", "Croatia / Kroatien"], ["CY", "Cyprus / Zypern"], ["CZ", "Czechia / Tschechien"],
  ["DK", "Denmark / Dänemark"], ["EE", "Estonia / Estland"], ["FI", "Finland / Finnland"],
  ["FR", "France / Frankreich"], ["GR", "Greece / Griechenland"], ["HU", "Hungary / Ungarn"],
  ["IE", "Ireland / Irland"], ["IT", "Italy / Italien"], ["LV", "Latvia / Lettland"],
  ["LT", "Lithuania / Litauen"], ["LU", "Luxembourg / Luxemburg"], ["MT", "Malta"],
  ["NL", "Netherlands / Niederlande"], ["PL", "Poland / Polen"], ["PT", "Portugal"],
  ["RO", "Romania / Rumänien"], ["SK", "Slovakia / Slowakei"], ["SI", "Slovenia / Slowenien"],
  ["ES", "Spain / Spanien"], ["SE", "Sweden / Schweden"], ["CH", "Switzerland / Schweiz"],
  ["GB", "United Kingdom / Vereinigtes Königreich"], ["NO", "Norway / Norwegen"],
  ["AL", "Albania / Albanien"], ["BA", "Bosnia and Herzegovina / Bosnien und Herzegowina"],
  ["IS", "Iceland / Island"], ["LI", "Liechtenstein"], ["ME", "Montenegro"],
  ["MK", "North Macedonia / Nordmazedonien"], ["RS", "Serbia / Serbien"],
] as const;

const euCountries = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);

function borderClass(country: string) {
  if (euCountries.has(country)) return "EU";
  if (["CH", "GB", "NO"].includes(country)) return "NON_EU";
  return country ? "TRANSIT_REVIEW" : "";
}

function checkedValues(formData: FormData, name: string) {
  return formData.getAll(name).map(String).filter(Boolean);
}

export function RoundThreeRequestForm({ locale, requestType, serviceId, sourcePage }: Props) {
  const isDe = locale === "de";
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [destinationCountry, setDestinationCountry] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [summary, setSummary] = useState<{ route: string; period: string; scope: string; budgetOrPayer: string } | null>(null);
  const classification = useMemo(() => borderClass(destinationCountry), [destinationCountry]);

  const copy = isDe
    ? {
        title: "Anfrage in drei Schritten",
        intro: "Nur die aktuelle Stufe ist geöffnet. Ihre Angaben werden erst mit Absenden übertragen.",
        steps: ["Aufgabe", "Umfang", "Kontakt"],
        next: "Weiter",
        back: "Zurück",
        submit: "Unverbindlich prüfen lassen",
        sent: "Anfrage sicher eingegangen",
        sentText: "Wir prüfen Ihre Angaben persönlich. Ein Auftrag, Preis oder Termin ist damit noch nicht bestätigt.",
        privacy: "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung dieser Anfrage zu.",
      }
    : {
        title: "Request in three steps",
        intro: "Only the current step is open. Your information is transmitted only when you submit.",
        steps: ["Task", "Scope", "Contact"],
        next: "Continue",
        back: "Back",
        submit: "Request a non-binding review",
        sent: "Request received securely",
        sentText: "We will review your information personally. No order, price or date has been confirmed yet.",
        privacy: "I have read the privacy policy and agree that my information may be processed to handle this request.",
      };

  function validateCurrentStep() {
    const fields = formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      `[data-form-step="${step}"] input, [data-form-step="${step}"] select, [data-form-step="${step}"] textarea`,
    );
    for (const field of fields || []) {
      if (!field.reportValidity()) return false;
    }
    return true;
  }

  function nextStep() {
    setError("");
    if (!validateCurrentStep()) return;
    if (step === 2 && formRef.current) {
      const data = new FormData(formRef.current);
      const start = String(data.get("startLocation") || data.get("location") || "");
      const destination = String(data.get("destinationLocation") || "");
      setSummary({
        route: destination ? `${start} → ${destination}` : start,
        period: String(data.get("desiredPeriod") || (isDe ? "noch offen" : "still open")),
        scope: String(data.get("scopeDetails") || data.get("taskDescription") || ""),
        budgetOrPayer: String(data.get("grossBudget") || data.get("payer") || (isDe ? "nicht angegeben" : "not provided")),
      });
    }
    setStep((value) => Math.min(3, value + 1));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!validateCurrentStep()) return;

    const data = new FormData(event.currentTarget);
    if ((contactMethod === "telefon" || contactMethod === "whatsapp") && !String(data.get("phone") || "").trim()) {
      setError(isDe ? "Für Telefon oder WhatsApp benötigen wir eine Telefonnummer." : "A phone number is required for phone or WhatsApp contact.");
      return;
    }

    const service = requestType === "DIFFICULT_SITUATION"
      ? String(data.get("primaryService") || "umzug")
      : "umzug";
    data.set("service", service);
    data.set("requestType", requestType);
    data.set("sourcePage", sourcePage);
    data.set("leadSource", "round3_service_hub");
    data.set("sourceComponent", "RoundThreeRequestForm");
    data.set("locale", locale);
    if (requestType === "EUROPE_MOVE") data.set("originCountry", "DE");

    const initialStatus = requestType === "COST_COVERAGE_REQUEST" ? "not_applied" : "new";
    const workflow = {
      version: 1,
      requestType,
      serviceId,
      sourcePage,
      locale,
      region: String(data.get("startLocation") || data.get("location") || ""),
      startLocation: String(data.get("startLocation") || data.get("location") || ""),
      destinationLocation: String(data.get("destinationLocation") || ""),
      scope: String(data.get("scopeDetails") || data.get("taskDescription") || data.get("volume") || ""),
      desiredPeriod: String(data.get("desiredPeriod") || ""),
      flexibility: String(data.get("dateFlexibility") || ""),
      possibleSelfServices: String(data.get("flexibleScope") || ""),
      preferredContactMethod: String(data.get("contactMethod") || ""),
      originCountry: requestType === "EUROPE_MOVE" ? "DE" : undefined,
      destinationCountry: String(data.get("destinationCountry") || ""),
      borderClassification: classification || undefined,
      requestedServices: checkedValues(data, "requestedServices"),
      selectedAddons: checkedValues(data, "selectedAddons"),
      grossBudget: String(data.get("grossBudget") || ""),
      payer: String(data.get("payer") || ""),
      payerApplicationStatus: String(data.get("payerApplicationStatus") || ""),
      approvedGrossAmount: "",
      approvedServiceItems: [],
      possibleCopay: "",
      counterOffer: "",
      assignedEmployee: "unassigned",
      calculationStatus: "not_started",
      offerStatus: "not_created",
      orderStatus: "not_created",
      coverageStatus: requestType === "COST_COVERAGE_REQUEST" ? "not_applied" : "not_applicable",
      possibleBackhaul: requestType === "EUROPE_MOVE" ? "to_review" : "not_applicable",
      includedItems: [],
      excludedItems: [],
      customerReplies: [],
      internalNotes: [],
      statusHistory: [{ status: initialStatus, at: new Date().toISOString(), source: "public_form" }],
    };
    data.set("details", JSON.stringify({
      configuration: {
        requestType,
        round3Workflow: workflow,
        startLocation: String(data.get("startLocation") || data.get("location") || ""),
        destinationLocation: String(data.get("destinationLocation") || ""),
        desiredPeriod: String(data.get("desiredPeriod") || ""),
      },
      metadata: { source: "round3_service_hub", locale, sourcePage },
    }));

    setSubmitting(true);
    try {
      const attemptKey = `round3:${Date.now()}:${crypto.randomUUID()}`;
      const response = await bookingFetch("/api/bookings", {
        method: "POST",
        headers: { "Idempotency-Key": attemptKey },
        body: data,
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; requestId?: string; code?: string } | null;
      if (response.status !== 201 || result?.ok !== true || !result.requestId) {
        throw new Error(result?.code || "SUBMISSION_FAILED");
      }
      setReference(result.requestId);
      event.currentTarget.reset();
    } catch {
      setError(isDe
        ? "Die Anfrage konnte gerade nicht sicher gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie Telefon/WhatsApp."
        : "The request could not be sent safely. Please try again or use phone/WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <section id="anfrage" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-emerald-700" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-black text-slate-950">{copy.sent}</h2>
        <p className="mt-3 leading-7 text-slate-700">{copy.sentText}</p>
        <p className="mt-3 break-all text-sm font-bold text-slate-800">{isDe ? "Referenz" : "Reference"}: {reference}</p>
      </section>
    );
  }

  return (
    <section id="anfrage" className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black text-slate-950">{copy.title}</h2>
      <p className="mt-2 max-w-3xl leading-7 text-slate-700">{copy.intro}</p>
      <ol className="mt-6 grid grid-cols-3 gap-2" aria-label={isDe ? "Formularfortschritt" : "Form progress"}>
        {copy.steps.map((item, index) => (
          <li key={item} className={`rounded-xl px-3 py-3 text-center text-xs font-black sm:text-sm ${step === index + 1 ? "bg-slate-950 text-white" : step > index + 1 ? "bg-emerald-100 text-emerald-900" : "bg-white text-slate-500"}`} aria-current={step === index + 1 ? "step" : undefined}>
            {index + 1}. {item}
          </li>
        ))}
      </ol>

      <form ref={formRef} className="mt-7" onSubmit={submit} encType="multipart/form-data">
        <div data-form-step="1" hidden={step !== 1} className="grid gap-5 md:grid-cols-2">
            {requestType === "EUROPE_MOVE" ? <>
              <div><span className={label}>{isDe ? "Startland" : "Origin country"}</span><div className={`${control} bg-slate-100 font-bold`}>{isDe ? "Deutschland (fest)" : "Germany (fixed)"}</div></div>
              <label className={label}>{isDe ? "Startort in Deutschland" : "Origin city in Germany"}<input className={control} name="startLocation" autoComplete="address-level2" required maxLength={160} /></label>
              <label className={label}>{isDe ? "Zielland" : "Destination country"}<select className={control} name="destinationCountry" value={destinationCountry} onChange={(event) => setDestinationCountry(event.target.value)} required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option>{europeDestinations.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
              <label className={label}>{isDe ? "Zielort" : "Destination city"}<input className={control} name="destinationLocation" required maxLength={160} /></label>
              <label className={label}>{isDe ? "Wunschtermin oder Zeitraum" : "Preferred date or window"}<input className={control} name="desiredPeriod" required maxLength={120} placeholder={isDe ? "z. B. 12.–18. Oktober" : "e.g. 12–18 October"} /></label>
              <label className={label}>{isDe ? "Haushalt / grober Umfang" : "Household / approximate scope"}<select className={control} name="householdSize" required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option><option>1 room</option><option>2 rooms</option><option>3 rooms</option><option>4 rooms</option><option>5+ rooms</option><option>{isDe ? "Büro / Gewerbe" : "Office / business"}</option></select></label>
            </> : null}

            {requestType === "BUDGET_MOVE" ? <>
              <label className={label}>{isDe ? "Startort" : "Origin"}<input className={control} name="startLocation" required maxLength={160} /></label>
              <label className={label}>{isDe ? "Zielort" : "Destination"}<input className={control} name="destinationLocation" required maxLength={160} /></label>
              <label className={label}>{isDe ? "Wunschtermin" : "Preferred date"}<input className={control} name="desiredPeriod" required maxLength={120} /></label>
              <label className={label}>{isDe ? "Zimmer / Volumen" : "Rooms / volume"}<input className={control} name="volume" required maxLength={160} placeholder={isDe ? "z. B. 3 Zimmer, ca. 25 Kartons" : "e.g. 3 rooms, approx. 25 boxes"} /></label>
              <label className={`${label} md:col-span-2`}>{isDe ? "Bruttopreisvorstellung inklusive 19 % MwSt." : "Gross budget including 19% VAT"}<div className="relative"><input className={`${control} pr-12`} name="grossBudget" type="number" min="1" step="0.01" inputMode="decimal" required /><span className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 font-bold text-slate-500">€</span></div></label>
            </> : null}

            {requestType === "DIFFICULT_SITUATION" ? <>
              <label className={label}>{isDe ? "Wobei wird praktische Hilfe benötigt?" : "Which practical help is needed?"}<select className={control} name="primaryService" required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option><option value="umzug">{isDe ? "Umzug" : "Moving"}</option><option value="transport">Transport</option><option value="entsorgung">{isDe ? "Räumung / Entrümpelung" : "Clearance"}</option><option value="reinigung">{isDe ? "Reinigung" : "Cleaning"}</option></select></label>
              <label className={label}>{isDe ? "Ort" : "Location"}<input className={control} name="location" required maxLength={160} /></label>
              <label className={label}>{isDe ? "Zeitfenster / wichtiger Termin" : "Time window / important date"}<input className={control} name="desiredPeriod" required maxLength={120} /></label>
              <label className={label}>{isDe ? "Bevorzugte Reaktionszeit" : "Preferred response timing"}<select className={control} name="urgency" required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option><option value="normal">{isDe ? "In den nächsten Werktagen" : "Within the next working days"}</option><option value="soon">{isDe ? "Möglichst zeitnah" : "As soon as reasonably possible"}</option><option value="fixed_date">{isDe ? "Fester Termin vorhanden" : "There is a fixed date"}</option></select></label>
              <label className={`${label} md:col-span-2`}>{isDe ? "Praktische Aufgabe – ohne Diagnose oder private Lebensgeschichte" : "Practical task – no diagnosis or private life story"}<textarea className={control} name="taskDescription" required rows={4} maxLength={1600} /></label>
            </> : null}

            {requestType === "COST_COVERAGE_REQUEST" ? <>
              <label className={label}>{isDe ? "Benötigte praktische Leistung" : "Practical service required"}<select className={control} name="primaryService" required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option><option value="umzug">{isDe ? "Umzug" : "Moving"}</option><option value="reinigung">{isDe ? "Haushaltsnahe Reinigung" : "Household cleaning"}</option><option value="transport">Transport</option><option value="entsorgung">{isDe ? "Räumung" : "Clearance"}</option></select></label>
              <label className={label}>{isDe ? "Leistungsort / Route" : "Service location / route"}<input className={control} name="location" required maxLength={180} /></label>
              <label className={label}>{isDe ? "Möglicher Kostenträger" : "Possible payer"}<select className={control} name="payer" required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option><option value="jobcenter">Jobcenter</option><option value="arbeitsagentur">Agentur für Arbeit</option><option value="krankenkasse">{isDe ? "Krankenkasse" : "Health insurer"}</option><option value="pflegekasse">{isDe ? "Pflegekasse" : "Long-term care fund"}</option><option value="sozialamt">{isDe ? "Sozialamt" : "Social welfare office"}</option><option value="arbeitgeber">{isDe ? "Arbeitgeber" : "Employer"}</option><option value="other">{isDe ? "Andere / noch unklar" : "Other / not clear yet"}</option></select></label>
              <label className={label}>{isDe ? "Stand der Anfrage" : "Application status"}<select className={control} name="payerApplicationStatus" required><option value="not_applied">{isDe ? "Noch nicht beantragt" : "Not applied yet"}</option><option value="requirements_known">{isDe ? "Vorgaben liegen vor" : "Requirements are known"}</option><option value="estimate_requested">{isDe ? "Kostenvoranschlag angefordert" : "Cost estimate requested"}</option><option value="submitted">{isDe ? "Bereits eingereicht" : "Already submitted"}</option><option value="approved_in_writing">{isDe ? "Schriftliche Zusage liegt vor" : "Written approval received"}</option></select></label>
              <label className={label}>{isDe ? "Benötigter Zeitraum" : "Required time window"}<input className={control} name="desiredPeriod" required maxLength={120} /></label>
              <label className={`${label} md:col-span-2`}>{isDe ? "Was genau soll angeboten werden? Keine Diagnose angeben." : "What exactly should the estimate cover? Do not provide a diagnosis."}<textarea className={control} name="taskDescription" required rows={4} maxLength={1600} /></label>
            </> : null}
        </div>

        <div data-form-step="2" hidden={step !== 2} className="grid gap-5 md:grid-cols-2">
            <label className={label}>{isDe ? "Etagen, Aufzug und Zugang" : "Floors, lift and access"}<textarea className={control} name="accessDetails" required rows={3} maxLength={1000} /></label>
            <label className={label}>{isDe ? "Menge, Volumen oder Fläche" : "Quantity, volume or area"}<textarea className={control} name="scopeDetails" required rows={3} maxLength={1000} /></label>
            <label className={label}>{isDe ? "Terminflexibilität" : "Date flexibility"}<select className={control} name="dateFlexibility" required><option value="">{isDe ? "Bitte wählen" : "Please select"}</option><option value="fixed">{isDe ? "Termin fest" : "Fixed date"}</option><option value="few_days">{isDe ? "Einige Tage flexibel" : "Flexible by a few days"}</option><option value="flexible_window">{isDe ? "Flexibles Zeitfenster" : "Flexible window"}</option></select></label>
            {requestType === "EUROPE_MOVE" && classification ? (
              <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                <strong>{isDe ? "Routenklasse" : "Route class"}: {classification}</strong>
                <p className="mt-1">{classification === "EU"
                  ? (isDe ? "EU-Route: Transport- und Steuerbehandlung werden vor dem Angebot geprüft." : "EU route: transport and tax treatment are checked before a quote.")
                  : (isDe ? "Grenz- oder Transitprüfung nötig. FLOXANT erteilt keine Zollberatung und bestätigt Anforderungen erst nach Prüfung offizieller Vorgaben." : "Border or transit review required. FLOXANT does not provide customs advice and confirms requirements only after checking official guidance.")}</p>
              </div>
            ) : null}
            {requestType === "EUROPE_MOVE" && classification !== "EU" ? <>
              <label className={label}>{isDe ? "Aufenthalts-/Umzugsstatus (soweit bekannt)" : "Residence/relocation status (if known)"}<input className={control} name="relocationStatus" maxLength={240} /></label>
              <label className={label}>{isDe ? "Transitländer oder besondere Route (soweit bekannt)" : "Transit countries or special route (if known)"}<input className={control} name="transitNotes" maxLength={240} /></label>
            </> : null}
            {requestType === "BUDGET_MOVE" ? <>
              <label className={label}>{isDe ? "Unverzichtbare Leistungen" : "Essential services"}<textarea className={control} name="essentialScope" required rows={3} maxLength={1000} /></label>
              <label className={label}>{isDe ? "Flexible oder reduzierbare Leistungen" : "Flexible or reducible services"}<textarea className={control} name="flexibleScope" required rows={3} maxLength={1000} /></label>
            </> : null}
            {requestType === "DIFFICULT_SITUATION" ? <label className={label}>{isDe ? "Optionale Bruttopreisvorstellung inkl. 19 % MwSt." : "Optional gross budget incl. 19% VAT"}<input className={control} name="grossBudget" type="number" min="1" step="0.01" inputMode="decimal" /></label> : null}
            {requestType === "COST_COVERAGE_REQUEST" ? <label className={label}>{isDe ? "Schriftliche Vorgaben des Kostenträgers (ohne Gesundheitsdaten)" : "Written payer requirements (without health data)"}<textarea className={control} name="payerRequirements" rows={3} maxLength={1200} /></label> : null}
            <fieldset className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4">
              <legend className="px-2 text-sm font-black">{isDe ? "Gewünschte Zusatzleistungen" : "Requested add-ons"}</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[["packing", isDe ? "Verpacken" : "Packing"], ["assembly", isDe ? "Montage" : "Assembly"], ["cleaning", isDe ? "Reinigung" : "Cleaning"], ["storage", isDe ? "Lagerung" : "Storage"]].map(([value, text]) => <label key={value} className="flex min-h-11 items-center gap-3 rounded-xl bg-slate-50 px-3 text-sm font-bold"><input type="checkbox" name="selectedAddons" value={value} className="h-5 w-5" />{text}</label>)}
              </div>
            </fieldset>
            <label className={`${label} md:col-span-2`}>{isDe ? "Weitere sachliche Hinweise (optional)" : "Further factual notes (optional)"}<textarea className={control} name="message" rows={3} maxLength={1600} /></label>
        </div>

        <div data-form-step="3" hidden={step !== 3} className="grid gap-5 md:grid-cols-2">
            {summary ? <div className="md:col-span-2 rounded-2xl border border-cyan-200 bg-cyan-50 p-5"><h3 className="font-black text-slate-950">{isDe ? "Zusammenfassung vor dem Absenden" : "Summary before submission"}</h3><dl className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2"><div><dt className="font-black">{isDe ? "Ort / Route" : "Location / route"}</dt><dd>{summary.route || (isDe ? "noch offen" : "still open")}</dd></div><div><dt className="font-black">{isDe ? "Zeitraum" : "Time window"}</dt><dd>{summary.period}</dd></div><div><dt className="font-black">{isDe ? "Umfang" : "Scope"}</dt><dd className="line-clamp-3">{summary.scope}</dd></div><div><dt className="font-black">{requestType === "COST_COVERAGE_REQUEST" ? (isDe ? "Kostenträger" : "Payer") : (isDe ? "Budget / Status" : "Budget / status")}</dt><dd>{summary.budgetOrPayer}</dd></div></dl></div> : null}
            <label className={label}>{isDe ? "Name" : "Name"}<input className={control} name="name" autoComplete="name" required minLength={2} maxLength={120} /></label>
            <label className={label}>{isDe ? "Antwortsprache" : "Response language"}<select className={control} name="responseLanguage" defaultValue={locale} required><option value="de">Deutsch</option><option value="en">English</option></select></label>
            <label className={label}>{isDe ? "E-Mail" : "Email"}<input className={control} name="email" type="email" autoComplete="email" required={contactMethod === "email"} maxLength={254} /></label>
            <label className={label}>{isDe ? "Telefon / WhatsApp" : "Phone / WhatsApp"}<input className={control} name="phone" type="tel" autoComplete="tel" required={contactMethod !== "email"} maxLength={50} /></label>
            <label className={label}>{isDe ? "Bevorzugter Kontaktweg" : "Preferred contact method"}<select className={control} name="contactMethod" value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} required><option value="email">E-Mail</option><option value="telefon">{isDe ? "Telefon" : "Phone"}</option><option value="whatsapp">WhatsApp</option></select></label>
            <label className={label}>{isDe ? "Fotos oder Unterlagen (optional)" : "Photos or documents (optional)"}<span className="mt-2 flex min-h-12 items-center gap-2 rounded-xl border border-dashed border-slate-400 bg-white px-4 py-3"><FileUp className="h-5 w-5" aria-hidden="true" /><input name="files" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" className="w-full text-sm" /></span><span className="mt-2 block text-xs font-medium text-slate-600">{isDe ? `Maximal ${REQUEST_ATTACHMENT_RULES.maxFiles} Dateien, je 8 MB; JPG, PNG, WebP oder PDF. Keine Diagnosen oder unnötigen sensiblen Dokumente.` : `Up to ${REQUEST_ATTACHMENT_RULES.maxFiles} files, 8 MB each; JPG, PNG, WebP or PDF. Do not upload diagnoses or unnecessary sensitive documents.`}</span></label>
            <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"><input className="mt-1 h-5 w-5 shrink-0" name="privacyConsent" type="checkbox" value="accepted" required /><span>{copy.privacy} <Link className="font-black text-cyan-800 underline" href="/datenschutz">{isDe ? "Datenschutz" : "Privacy policy"}</Link></span></label>
        </div>

        {error ? <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900" role="alert">{error}</p> : null}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {step > 1 ? <button type="button" onClick={() => setStep((value) => Math.max(1, value - 1))} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{copy.back}</button> : <span />}
          {step < 3 ? <button type="button" onClick={nextStep} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white hover:bg-blue-950 focus-visible:ring-2 focus-visible:ring-cyan-700">{copy.next}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button> : <button type="submit" disabled={submitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-black text-white hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-800 disabled:cursor-wait disabled:opacity-70">{submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}{copy.submit}</button>}
        </div>
      </form>
    </section>
  );
}
