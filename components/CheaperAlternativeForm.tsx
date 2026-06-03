"use client";

import { type FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone, ShieldCheck } from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const standardServices = [
  { value: "umzug", label: "Umzug" },
  { value: "reinigung", label: "Reinigung" },
  { value: "entruempelung", label: "Entrümpelung" },
  { value: "transport", label: "Transport" },
  { value: "entsorgung", label: "Entsorgung" },
  { value: "kombination", label: "Kombination" },
];

const duesseldorfServices = [
  { value: "reinigung", label: "Düsseldorf Reinigung" },
  { value: "b2b_reinigung", label: "Düsseldorf Firmenreinigung" },
  { value: "hausverwaltung_reinigung", label: "Düsseldorf Hausverwaltung / WEG" },
  { value: "mieterwechsel_reinigung", label: "Düsseldorf Mieterwechsel" },
  { value: "kanzlei_praxis_reinigung", label: "Düsseldorf Kanzlei / Praxis" },
  { value: "laden_showroom_reinigung", label: "Düsseldorf Laden / Showroom" },
  { value: "airbnb_business_apartment", label: "Düsseldorf möblierte Wohnung" },
  { value: "treppenhaus_muellraum", label: "Düsseldorf Treppenhaus / Müllraum" },
  { value: "hotelreinigung", label: "Düsseldorf Hotelreinigung" },
  { value: "entsorgung", label: "Düsseldorf Entsorgung" },
];

const concernOptions = [
  "Preis wirkt zu hoch",
  "Leistungsumfang unklar",
  "Zusatzkosten unklar",
  "Termin knapp",
  "Turnus oder Häufigkeit unklar",
  "Fläche oder Objektart passt nicht",
  "Putzfirma wechseln",
  "Dokumentation / Nachweis fehlt",
  "Reinigung fehlt",
  "Entsorgung fehlt",
  "Fotos oder Umfang wurden nicht berücksichtigt",
  "Ich möchte eine klare Alternative",
];

const goalOptions = [
  { value: "guenstiger_pruefen", label: "Vielleicht günstiger prüfen" },
  { value: "umfang_klaeren", label: "Leistungsumfang klären" },
  { value: "anbieter_wechseln", label: "Anbieter wechseln" },
  { value: "plan_b", label: "Plan B wegen Termin oder Unsicherheit" },
  { value: "b2b_turnus", label: "B2B-Turnus / Reinigungsplan prüfen" },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

type CheaperAlternativeFormProps = {
  defaultRegion?: string;
  defaultService?: string;
  defaultCityOrZip?: string;
  defaultMessage?: string;
  sourceComponent?: string;
  landingPageFallback?: string;
};

function getUtmValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function validateFiles(files: File[], allowedTypes: string[]) {
  const invalidType = files.find((file) => !allowedTypes.includes(file.type));
  if (invalidType) return "Bitte nur PDF, JPG, PNG oder WebP hochladen.";
  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Dateien unter 12 MB hochladen oder per WhatsApp senden.";
  return "";
}

export function CheaperAlternativeForm({
  defaultRegion = "regensburg",
  defaultService = "umzug",
  defaultCityOrZip = "",
  defaultMessage = "",
  sourceComponent = "cheaper_alternative_page",
  landingPageFallback = "/angebot-guenstiger-pruefen",
}: CheaperAlternativeFormProps = {}) {
  const [region, setRegion] = useState(defaultRegion);
  const [service, setService] = useState(defaultService);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [offerFiles, setOfferFiles] = useState<File[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = region === "duesseldorf" ? duesseldorfServices : standardServices;
  const selectedServiceLabel = serviceOptions.find((item) => item.value === service)?.label || "einen Auftrag";

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        `Hallo FLOXANT, ich möchte prüfen lassen, ob eine wirtschaftlichere oder passendere Alternative möglich ist. Es geht um ${selectedServiceLabel} in ${region === "duesseldorf" ? "Düsseldorf" : "[Ort]"}. Angebot, Fotos und Preisrahmen kann ich senden.`,
      ),
    [region, selectedServiceLabel],
  );

  function updateRegion(nextRegion: string) {
    setRegion(nextRegion);
    if (nextRegion === "duesseldorf" && !duesseldorfServices.some((item) => item.value === service)) {
      setService("reinigung");
    }
  }

  function toggleConcern(concern: string) {
    setSelectedConcerns((current) =>
      current.includes(concern) ? current.filter((item) => item !== concern) : [...current, concern],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const cityOrZip = String(formData.get("cityOrZip") || "").trim();
    const desiredDate = String(formData.get("desiredDate") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben.");
      return;
    }
    if (!cityOrZip) {
      setErrorMessage("Bitte Ort oder PLZ angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Termin oder Zeitraum angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte kurz beschreiben, was am vorhandenen Angebot oder Preisrahmen geprüft werden soll.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const offerFileError = validateFiles(offerFiles, ["application/pdf", "image/jpeg", "image/png", "image/webp"]);
    const photoFileError = validateFiles(photoFiles, ["image/jpeg", "image/png", "image/webp"]);
    if (offerFileError || photoFileError) {
      setErrorMessage(offerFileError || photoFileError);
      return;
    }

    formData.set("type", "offer_check");
    formData.set("lead_type", "angebotscheck");
    formData.set("leadSubtype", "cheaper_alternative");
    formData.set("leadSource", "cheaper_alternative");
    formData.set("source", "cheaper_alternative");
    formData.set("sourceComponent", sourceComponent);
    formData.set("service", service);
    formData.set("region", region);
    formData.set("selectedAddons", JSON.stringify(selectedConcerns));
    formData.set("platformSituation", "Günstigere oder passendere Alternative prüfen");
    formData.set("offerCheckIntent", String(formData.get("offerCheckGoal") || "guenstiger_pruefen"));
    formData.set("timestamp", new Date().toISOString());
    formData.set("landingPage", typeof window === "undefined" ? landingPageFallback : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));

    offerFiles.forEach((file) => formData.append("offerFile", file));
    photoFiles.forEach((file) => formData.append("photo", file));

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || "Die Anfrage konnte nicht gesendet werden.");
      }

      form.reset();
      setOfferFiles([]);
      setPhotoFiles([]);
      setSelectedConcerns([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div
      id="guenstiger-form"
      className="rounded-[1rem] border border-blue-100 bg-white p-5 shadow-2xl shadow-slate-950/10 ring-1 ring-blue-50 sm:p-7"
    >
      <div className="mb-5 grid gap-4 rounded-[0.95rem] border border-slate-200 bg-slate-950 p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-blue-200">Angebot prüfen</p>
          <h2 className="mt-2 text-2xl font-black tracking-normal">Angebot senden und Alternative prüfen lassen</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Laden Sie ein Angebot hoch oder beschreiben Sie Preis, Umfang, Turnus und Termin. FLOXANT prüft, ob Preis,
            Leistung, Zeitfenster und die Anforderungen vor Ort zusammenpassen und ob eine wirtschaftlichere, klarere oder passendere Alternative möglich ist.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-normal">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Datei möglich</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Budget möglich</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Ohne Preisgarantie</span>
        </div>
      </div>

      <div className="rounded-[0.95rem] border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          <p>
            FLOXANT prüft, ob auf Basis von Angebot, Ort, Termin, Umfang, Fotos und Kapazität eine wirtschaftlichere,
            klarere oder passendere Alternative möglich ist. Es gibt keine Preisgarantie und keine Abwertung anderer Anbieter.
          </p>
        </div>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800 md:col-span-2">
            Was ist Ihr Ziel?
            <select name="offerCheckGoal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              {goalOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Ihr Name" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Für schnelle Rückfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Region*
            <select value={region} onChange={(event) => updateRegion(event.target.value)} name="region" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              <option value="regensburg">Regensburg</option>
              <option value="regensburg_200km">Umgebung Regensburg ca. 200 km</option>
              <option value="bayern">Bayern nach Verfügbarkeit</option>
              <option value="duesseldorf">Düsseldorf: Reinigung oder Entsorgung</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Service*
            <select value={service} onChange={(event) => setService(event.target.value)} name="service" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              {serviceOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ort / PLZ*
            <input name="cityOrZip" defaultValue={defaultCityOrZip} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Termin / Zeitraum*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. nächste Woche oder 15.06." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Vorhandener Angebotspreis
            <input name="quotedPrice" inputMode="decimal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="falls bekannt, z. B. 950 EUR" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Wunschbudget / Zielrahmen
            <input name="budget" inputMode="decimal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. bis 800 EUR, falls realistisch" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Woher kommt das Angebot?
            <select name="offerSourceType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              <option value="">Bitte wählen</option>
              <option value="plattform">Online-Plattform</option>
              <option value="lokaler_anbieter">Lokaler Anbieter</option>
              <option value="anderes_unternehmen">Anderes Unternehmen</option>
              <option value="nicht_angeben">Möchte ich nicht angeben</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektart / Fläche
            <input name="objectScope" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. Büro 280 m², Wohnung 72 m²" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Turnus / Zeitfenster
            <input name="cleaningFrequency" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. 2x pro Woche, nach Feierabend" />
          </label>
        </div>

        <div className="rounded-[0.95rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/70 p-4 shadow-sm shadow-slate-950/5">
          <div className="mb-4">
            <p className="text-sm font-black text-slate-950">Angebot und Fotos senden</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Angebot, Screenshot oder Preisangaben helfen. Fotos sind optional, machen Umfang, Zustand, Zugang und mögliche Preishebel aber klarer.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <UploadDropCard
              title="Angebot hochladen"
              description="PDF, Screenshot oder Angebotsbild."
              helper="PDF, JPG, PNG oder WebP bis 12 MB je Datei."
              accept="application/pdf,image/jpeg,image/png,image/webp"
              files={offerFiles}
              dataEvent="upload_cheaper_alternative_offer"
              onFilesChange={setOfferFiles}
            />
            <UploadDropCard
              title="Fotos optional"
              description="Zugang, Menge, Zustand, Fläche oder Etage."
              helper="Fotos helfen bei der praktischen Einschätzung."
              accept="image/jpeg,image/png,image/webp"
              files={photoFiles}
              dataEvent="upload_cheaper_alternative_photos"
              tone="emerald"
              onFilesChange={setPhotoFiles}
            />
          </div>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Angebotstext optional einfügen
          <textarea name="offerText" rows={4} data-event="form_submit" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Falls Sie keine Datei hochladen möchten, können Sie den wichtigsten Angebotstext hier einfügen." />
        </label>

        <div className="rounded-[0.95rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-900">Was soll geprüft werden?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {concernOptions.map((concern) => (
              <label key={concern} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={selectedConcerns.includes(concern)} onChange={() => toggleConcern(concern)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                {concern}
              </label>
            ))}
          </div>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} defaultValue={defaultMessage} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Was ist am Angebot zu teuer, unklar oder nicht passend? Welche Leistung, welcher Turnus oder welcher Preisrahmen soll FLOXANT alternativ prüfen?" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            WhatsApp für Rückfragen bevorzugt.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            Rückruf gewünscht, wenn eine Alternative realistisch wirkt.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung verarbeitet. Es wird keine Preisgarantie, keine Rechtsberatung und keine Anbieterbewertung versprochen.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Anfrage ist eingegangen. FLOXANT prüft Angebot, Preisrahmen, Ort, Termin, Umfang und Verfügbarkeit. Wenn eine wirtschaftlichere oder passendere Alternative möglich ist oder Rückfragen nötig sind, melden wir uns.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Angebot prüfen und Alternative anfragen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="whatsapp_click"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Angebot per WhatsApp senden
          </a>
        </div>

        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <a href={`tel:${PHONE_TEL}`} data-event="phone_click" className="inline-flex items-center gap-2 transition hover:text-blue-700">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} data-event="hero_cta_click" className="inline-flex items-center gap-2 transition hover:text-blue-700">
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </form>
    </div>
  );
}
