"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const flexibilityOptions = [
  { value: "fixes_datum", label: "Fixes Datum", hint: "schwerer planbar" },
  { value: "plus_minus_2_tage", label: "±1-2 Tage flexibel", hint: "besser prüfbar" },
  { value: "diese_woche_flexibel", label: "Diese Woche flexibel", hint: "gut" },
  { value: "naechste_woche_flexibel", label: "Nächste Woche flexibel", hint: "gut" },
  { value: "komplett_flexibel", label: "Komplett flexibel", hint: "beste Chance" },
];

const requestTypes = [
  "Möbeltransport",
  "kleiner Umzug",
  "Kartons/Gegenstände",
  "einzelne schwere Gegenstände",
  "Entrümpelung/Entsorgung mit Strecke",
  "Sonstiges",
];

const addonOptions = ["Reinigung", "Entrümpelung", "Entsorgung", "Schlüsselübergabe", "Diskrete Abstimmung"];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getUtmValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function validateImageFiles(files: File[]) {
  const invalidType = files.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type));
  if (invalidType) return "Bitte nur JPG, PNG oder WebP als Fotos hochladen.";
  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Fotos unter 12 MB hochladen oder per WhatsApp senden.";
  return "";
}

export function ReturnTripBoardForm() {
  const [dateFlexibility, setDateFlexibility] = useState("plus_minus_2_tage");
  const [requestType, setRequestType] = useState("Möbeltransport");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich möchte eine Rückfahrt/Leerfahrt prüfen lassen. Start: [Ort], Ziel: [Ort], Datum/Zeitraum: [Datum], Umfang: [kurz beschreiben]. Fotos kann ich senden.",
      ),
    [],
  );

  function toggleAddon(addon: string) {
    setSelectedAddons((current) => (current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const startLocation = String(formData.get("startLocation") || "").trim();
    const destinationLocation = String(formData.get("destinationLocation") || "").trim();
    const desiredDate = String(formData.get("desiredDate") || "").trim();
    const itemDescription = String(formData.get("itemDescription") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte prüfen Sie die Telefonnummer.");
      return;
    }
    if (!startLocation || !destinationLocation) {
      setErrorMessage("Bitte Startort und Zielort angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Datum oder Zeitraum angeben.");
      return;
    }
    if (itemDescription.length < 8) {
      setErrorMessage("Bitte kurz beschreiben, was transportiert werden soll.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const fileError = validateImageFiles(photos);
    if (fileError) {
      setErrorMessage(fileError);
      return;
    }

    formData.set("type", "route_board");
    formData.set("lead_type", "rueckfahrt_boerse");
    formData.set("service", "leerfahrt");
    formData.set("dateFlexibility", dateFlexibility);
    formData.set("requestType", requestType);
    formData.set("selectedAddons", JSON.stringify(selectedAddons));
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "return_trip_board");
    formData.set("source", "return_trip_board");
    formData.set("landingPage", typeof window === "undefined" ? "/rueckfahrt-boerse" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("routePhoto", file));

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || "Die Strecke konnte nicht gesendet werden.");
      }

      form.reset();
      setDateFlexibility("plus_minus_2_tage");
      setRequestType("Möbeltransport");
      setSelectedAddons([]);
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Strecke konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="rueckfahrt-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div className="mb-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
        <strong>Wichtig:</strong> Die Rückfahrt-Börse ist ein Nachfrage-System, kein Live-Tourenversprechen. FLOXANT prüft Strecke, Datum, Umfang, Zugang und Kapazität nach Verfügbarkeit.
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="für schnelle Rückfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anfrageart*
            <select
              name="requestType"
              value={requestType}
              onChange={(event) => setRequestType(event.target.value)}
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500"
            >
              {requestTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Startort / PLZ*
            <input name="startLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. München, 80331" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zielort / PLZ*
            <input name="destinationLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Datum oder Zeitraum*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. KW 24, 15.06., diese Woche" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Gewünschtes Zeitfenster
            <input name="timeWindow" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. vormittags, ab 16 Uhr" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-950">Flexibilität*</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {flexibilityOptions.map((item) => {
              const active = dateFlexibility === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDateFlexibility(item.value)}
                  data-event="service_card_click"
                  data-flexibility={item.value}
                  className={`rounded-xl border px-3 py-3 text-left text-xs transition ${
                    active ? "border-emerald-500 bg-emerald-50 text-emerald-950" : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200"
                  }`}
                >
                  <span className="block font-black">{item.label}</span>
                  <span className="mt-1 block">{item.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Umfang / Volumen
            <input name="estimatedVolume" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. 8 Kartons, 2 m³, Sofa" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage Start
            <input name="startFloor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. EG, 2. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage Ziel
            <input name="destinationFloor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="z. B. 1. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug Start
            <select name="startElevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500">
              <option value="">Nicht angegeben</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug Ziel
            <select name="destinationElevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500">
              <option value="">Nicht angegeben</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Dringlichkeit
            <select name="urgency" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-emerald-500">
              <option value="normal">Normal</option>
              <option value="kurzfristig">Kurzfristig</option>
              <option value="flexibel">Flexibel</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="itemDescription" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="Was soll transportiert werden? Gibt es Maße, Gewicht, Fotos, Tragewege oder Besonderheiten?" />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugang / Trageweg
            <textarea name="accessNotes" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="Parken, Laufweg, enge Treppe, Ladezone, Ansprechpartner vor Ort." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <textarea name="budget" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500" placeholder="Falls ein Rahmen bekannt ist. Kein Festpreisversprechen." />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <p className="text-sm font-black text-slate-950">Zusatzleistungen optional</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {addonOptions.map((addon) => (
              <label key={addon} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={selectedAddons.includes(addon)} onChange={() => toggleAddon(addon)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                {addon}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Gegenstaende, Zugang, Etage oder Ladepunkt."
            helper="Fotos helfen bei Fahrzeug- und Platzplanung."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_route_photos"
            tone="emerald"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="preferredContact" type="checkbox" value="whatsapp" className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600" />
          WhatsApp bevorzugt.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600" />
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Prüfung der Rückfahrt-/Leerfahrt-Anfrage verarbeitet. Es wird keine Verfügbarkeit oder ein Festpreis garantiert.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Strecke ist eingegangen. FLOXANT prüft Start, Ziel, Datum, Umfang und Flexibilität. Wenn Ihre Anfrage zu einer passenden Rückfahrt, Leerfahrt oder Transportlösung passt, melden wir uns mit Rückfragen oder einem Vorschlag.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Strecke prüfen lassen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="whatsapp_click"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Strecke per WhatsApp senden
          </a>
        </div>

        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <a href={`tel:${PHONE_TEL}`} data-event="phone_click" className="inline-flex items-center gap-2 transition hover:text-emerald-700">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} data-event="hero_cta_click" className="inline-flex items-center gap-2 transition hover:text-emerald-700">
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </form>
    </div>
  );
}
