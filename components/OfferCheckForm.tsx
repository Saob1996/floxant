"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, FileText, Loader2, Mail, Phone, UploadCloud } from "lucide-react";

import type { RedFlagScannerResult } from "@/components/OfferRedFlagScanner";
import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const allServiceOptions = [
  { value: "umzug", label: "Umzug" },
  { value: "reinigung", label: "Reinigung" },
  { value: "entruempelung", label: "Entrümpelung" },
  { value: "transport", label: "Transport" },
  { value: "entsorgung", label: "Entsorgung" },
  { value: "kombination", label: "Kombination" },
  { value: "private_client", label: "Premium/Diskret" },
];

const duesseldorfServiceOptions = [
  { value: "reinigung", label: "Reinigung Düsseldorf" },
  { value: "entsorgung", label: "Entsorgung Düsseldorf" },
];

const addonOptions = [
  "Reinigung",
  "Entrümpelung",
  "Entsorgung",
  "Schlüsselübergabe",
  "Halteverbotszone",
  "Leerfahrt/Rückfahrt",
  "Premium-Abstimmung",
];

type SubmitState = "idle" | "submitting" | "success" | "error";
type EntryMode = "upload" | "no_upload";

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

export function OfferCheckForm({ redFlagResult = null }: { redFlagResult?: RedFlagScannerResult | null }) {
  const [entryMode, setEntryMode] = useState<EntryMode>("upload");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [region, setRegion] = useState("regensburg");
  const [service, setService] = useState("umzug");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [offerFiles, setOfferFiles] = useState<File[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const hasRedFlagResult = Boolean(redFlagResult?.completed);
  const serviceOptions = region === "duesseldorf" ? duesseldorfServiceOptions : allServiceOptions;

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        `Hallo FLOXANT, ich habe bereits ein Angebot erhalten und möchte eine zweite Einschätzung. Es geht um ${serviceOptions.find((item) => item.value === service)?.label || "einen Service"} in ${region === "duesseldorf" ? "Düsseldorf" : "Regensburg/Umgebung"}. Ich kann Angebot/Fotos senden.`,
      ),
    [region, service, serviceOptions],
  );

  function updateRegion(nextRegion: string) {
    setRegion(nextRegion);
    if (nextRegion === "duesseldorf" && !["reinigung", "entsorgung"].includes(service)) {
      setService("reinigung");
    }
  }

  function toggleAddon(addon: string) {
    setSelectedAddons((current) =>
      current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon],
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
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit wir Rückfragen stellen können.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte prüfen Sie die Telefonnummer.");
      return;
    }
    if (!cityOrZip) {
      setErrorMessage("Bitte Ort oder PLZ angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte gewünschten Termin oder Zeitraum angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, worum es im Angebot geht.");
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
    formData.set("service", service);
    formData.set("region", region);
    formData.set("selectedAddons", JSON.stringify(selectedAddons));
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", hasRedFlagResult ? "red_flag_scanner" : "offer_check");
    formData.set("source", hasRedFlagResult ? "red_flag_scanner" : "offer_check");
    formData.set("leadSubtype", hasRedFlagResult ? "red_flag_scanner" : "");
    formData.set("sourceComponent", hasRedFlagResult ? "red_flag_scanner" : "offer_check_form");
    formData.set("scannerScoreLevel", hasRedFlagResult ? redFlagResult?.scoreLevel || "" : "");
    formData.set("scannerScoreLabel", hasRedFlagResult ? redFlagResult?.scoreLabel || "" : "");
    formData.set("scannerScoreValue", hasRedFlagResult ? String(redFlagResult?.scoreValue || 0) : "");
    formData.set("redFlagCategories", hasRedFlagResult ? JSON.stringify(redFlagResult?.categories || []) : "[]");
    formData.set("redFlagItems", hasRedFlagResult ? JSON.stringify(redFlagResult?.items || []) : "[]");
    formData.set("redFlagSummary", hasRedFlagResult ? redFlagResult?.summary || "" : "");
    formData.set("landingPage", typeof window === "undefined" ? "/angebotscheck" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));

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
      setSelectedAddons([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="angebotscheck-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row">
        {[
          { mode: "upload" as const, title: "Angebot hochladen", text: "PDF, Screenshot oder Angebotsbild prüfen lassen.", Icon: UploadCloud },
          { mode: "no_upload" as const, title: "Ohne Upload prüfen", text: "Preis, Termin und Umfang grob senden.", Icon: FileText },
        ].map((item) => {
          const Icon = item.Icon;
          const active = entryMode === item.mode;
          return (
            <button
              key={item.mode}
              type="button"
              onClick={() => setEntryMode(item.mode)}
              data-event={hasRedFlagResult ? "start_red_flag_scanner" : "start_offer_check"}
              data-mode={item.mode}
              className={`flex flex-1 items-start gap-3 rounded-[1.25rem] border p-4 text-left transition ${
                active ? "border-blue-500 bg-blue-50 text-blue-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200"
              }`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <span className="block text-sm font-black">{item.title}</span>
                <span className="mt-1 block text-xs leading-5">{item.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} data-event={hasRedFlagResult ? "start_red_flag_scanner" : "start_offer_check"}>
        <input type="hidden" name="leadSubtype" value={hasRedFlagResult ? "red_flag_scanner" : ""} />
        <input type="hidden" name="sourceComponent" value={hasRedFlagResult ? "red_flag_scanner" : "offer_check_form"} />
        <input type="hidden" name="scannerScoreLevel" value={hasRedFlagResult ? redFlagResult?.scoreLevel || "" : ""} />
        <input type="hidden" name="scannerScoreLabel" value={hasRedFlagResult ? redFlagResult?.scoreLabel || "" : ""} />
        <input type="hidden" name="scannerScoreValue" value={hasRedFlagResult ? String(redFlagResult?.scoreValue || 0) : ""} />
        <input type="hidden" name="redFlagCategories" value={hasRedFlagResult ? JSON.stringify(redFlagResult?.categories || []) : "[]"} />
        <input type="hidden" name="redFlagItems" value={hasRedFlagResult ? JSON.stringify(redFlagResult?.items || []) : "[]"} />
        <input type="hidden" name="redFlagSummary" value={hasRedFlagResult ? redFlagResult?.summary || "" : ""} />
        <div className="grid gap-4 md:grid-cols-2">
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
            <select value={region} onChange={(event) => updateRegion(event.target.value)} name="region" data-event={`select_region_${region}`} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              <option value="regensburg">Regensburg</option>
              <option value="regensburg_200km">Umgebung Regensburg ca. 200 km</option>
              <option value="bayern">Bayern nach Verfügbarkeit</option>
              <option value="duesseldorf">Düsseldorf: Reinigung/Entsorgung</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Service-Art*
            <select value={service} onChange={(event) => setService(event.target.value)} name="service" data-event="select_offer_service" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              {serviceOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ort / PLZ*
            <input name="cityOrZip" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Termin / Zeitraum*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. nächste Woche, 15.06." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Vorhandener Angebotspreis
            <input name="quotedPrice" inputMode="decimal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="falls bekannt, z. B. 950 €" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anbieter / Plattform optional
            <select name="offerSourceType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              <option value="">Bitte wählen</option>
              <option value="plattform">Plattform</option>
              <option value="lokaler_anbieter">Lokaler Anbieter</option>
              <option value="anderes_unternehmen">Anderes Unternehmen</option>
              <option value="nicht_angeben">Möchte ich nicht angeben</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <input name="budget" inputMode="decimal" data-event="submit_budget_request" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Was wäre für Sie machbar?" />
          </label>
        </div>

        {entryMode === "upload" ? (
          <div className="rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/70 p-4 shadow-sm shadow-slate-950/5">
            <div className="mb-4">
              <p className="text-sm font-black text-slate-950">Upload für die zweite Einschätzung</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Angebot und Fotos sind getrennt, damit im Dashboard sofort klar ist, was geprüft werden soll.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <UploadDropCard
                title="Angebot hochladen"
                description="PDF, Screenshot oder Angebotsbild."
                helper="PDF, Screenshot, JPG/PNG/WebP bis 12 MB je Datei."
                accept=".pdf,image/jpeg,image/png,image/webp"
                files={offerFiles}
                dataEvent={hasRedFlagResult ? "upload_offer_for_scanner" : "upload_offer_file"}
                onFilesChange={setOfferFiles}
              />
              <UploadDropCard
                title="Fotos optional"
                description="Zugang, Etage, Menge, Zustand oder Räume."
                helper="Fotos helfen bei der praktischen Einschätzung, sind aber optional."
                accept="image/jpeg,image/png,image/webp"
                files={photoFiles}
                dataEvent="upload_images"
                tone="emerald"
                onFilesChange={setPhotoFiles}
              />
            </div>
          </div>
        ) : null}

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Angebotstext optional einfügen
          <textarea name="offerText" data-event={hasRedFlagResult ? "paste_offer_text_for_scanner" : "paste_offer_text"} rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Falls Sie kein PDF hochladen möchten, können Sie den wichtigsten Angebotstext hier einfügen." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Was soll geprüft werden? Umfang, Etage, Zugang, Termin, offene Punkte oder Zusatzleistungen." />
        </label>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-900">Zusatzservices, die im Angebot fehlen könnten</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {addonOptions.map((addon) => (
              <label key={addon} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={selectedAddons.includes(addon)} onChange={() => toggleAddon(addon)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                {addon}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          Rückruf gewünscht, wenn für die Einschätzung Rückfragen sinnvoll sind.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. Keine Rechtsberatung; geprüft wird organisatorisch und praktisch.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            {hasRedFlagResult
              ? "Danke. Ihr Red-Flag-Ergebnis wurde an FLOXANT gesendet. Wir pruefen Angebot, offene Punkte, Ort, Termin und Umfang. Wenn Angaben fehlen, melden wir uns mit Rueckfragen."
              : "Danke. Ihre Anfrage zum Angebotscheck ist eingegangen. Wir pruefen Umfang, Termin, Ort, vorhandenes Angebot und moegliche offene Punkte. Wenn Angaben fehlen, melden wir uns mit Rueckfragen."}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event={hasRedFlagResult ? "submit_red_flag_lead" : "submit_offer_check"}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Angebot prüfen lassen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event={hasRedFlagResult ? "click_red_flag_whatsapp" : "click_offer_check_whatsapp"}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            WhatsApp mit Angebot senden
          </a>
        </div>

        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <a href={`tel:${PHONE_TEL}`} data-event={hasRedFlagResult ? "click_red_flag_phone" : "click_offer_check_phone"} className="inline-flex items-center gap-2 transition hover:text-blue-700">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} data-event="click_email" className="inline-flex items-center gap-2 transition hover:text-blue-700">
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </form>
    </div>
  );
}
