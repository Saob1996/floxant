"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Home, Loader2, Mail, Phone, UsersRound } from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = [
  { value: "hausverwaltung", label: "Hausverwaltung", event: "select_role_property_manager" },
  { value: "vermieter", label: "Vermieter", event: "select_role_landlord" },
  { value: "makler", label: "Makler", event: "select_role_realtor" },
  { value: "eigentuemer", label: "Eigentümer", event: "select_role_owner" },
  { value: "sonstiges", label: "Sonstiges", event: "select_role_other" },
];

const objectTypeOptions = [
  "Wohnung",
  "Haus",
  "Keller",
  "Garage",
  "Büro / Gewerbefläche",
  "Müllraum / Nebenfläche",
  "mehrere Objekte",
];

const serviceOptions = [
  "Räumung / Entrümpelung",
  "Entsorgung",
  "Endreinigung",
  "Keller / Nebenräume",
  "Müllraum",
  "Schlüsselkoordination",
  "Wohnungsübergabe-Vorbereitung",
  "Foto-Dokumentation",
  "Übergabeakte",
  "wiederkehrende Zusammenarbeit",
];

const quickEntries = [
  {
    value: "single_case",
    title: "Einzelfall prüfen",
    text: "Eine Wohnung oder ein Objekt muss vorbereitet werden.",
    Icon: Home,
  },
  {
    value: "recurring",
    title: "Wiederkehrende Fälle",
    text: "Hausverwaltung oder Vermieter mit mehreren Wechseln.",
    Icon: Building2,
  },
  {
    value: "urgent_handover",
    title: "Dringender Übergabetermin",
    text: "Übergabe steht bald an, schnelle Prüfung nach Verfügbarkeit.",
    Icon: UsersRound,
  },
];

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

export function TenantTurnoverForm() {
  const [role, setRole] = useState("hausverwaltung");
  const [quickEntry, setQuickEntry] = useState("single_case");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Endreinigung"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich möchte einen Mieterwechsel-Fall anfragen. Es geht um ein Objekt in [Ort]. Benötigt werden Räumung/Reinigung/Entsorgung/Übergabevorbereitung. Fotos und Termin kann ich senden.",
      ),
    [],
  );

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
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
    const objectLocation = String(formData.get("objectLocation") || "").trim();
    const desiredDate = String(formData.get("desiredDate") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT Rückfragen stellen kann.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte prüfen Sie die Telefonnummer.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte Objektort oder PLZ angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Zeitraum oder Übergabetermin angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was nach dem Auszug offen ist.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens einen Service-Baustein auswählen.");
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

    formData.set("type", "tenant_turnover");
    formData.set("lead_type", "mieterwechsel_service");
    formData.set("service", "mieterwechsel_service");
    formData.set("roleType", role);
    formData.set("quickEntry", quickEntry);
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("region", "regensburg");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "tenant_turnover_service");
    formData.set("source", "tenant_turnover_service");
    formData.set("landingPage", typeof window === "undefined" ? "/mieterwechsel-service-regensburg" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("tenantPhoto", file));

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
      setSelectedServices(["Endreinigung"]);
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="mieterwechsel-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div className="grid gap-3 lg:grid-cols-3">
        {quickEntries.map((item) => {
          const Icon = item.Icon;
          const active = quickEntry === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setQuickEntry(item.value)}
              data-event="service_card_click"
              data-entry={item.value}
              className={`rounded-[1.2rem] border p-4 text-left transition ${
                active ? "border-cyan-500 bg-cyan-50 text-cyan-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-3 block text-sm font-black">{item.title}</span>
              <span className="mt-1 block text-xs leading-5">{item.text}</span>
            </button>
          );
        })}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Firma / Organisation optional
            <input name="companyName" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="Hausverwaltung, Maklerbüro, Eigentümergesellschaft" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Rolle*
            <select
              name="roleType"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500"
            >
              {roleOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektart*
            <select name="objectType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500">
              {objectTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="für schnelle Rückfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektort / PLZ*
            <input name="objectLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zeitraum / Übergabetermin*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="z. B. diese Woche, vor 15.06." />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-950">Benötigte Service-Bausteine*</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((service) => (
              <label key={service} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} className="h-4 w-4 rounded border-slate-300 text-cyan-600" />
                {service}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Fläche ca.
            <input name="areaM2" inputMode="decimal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="z. B. 72 m²" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="z. B. 3. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500">
              <option value="">Nicht angegeben</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Schlüsselstatus
            <input name="keyStatus" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="z. B. Schlüssel bei Verwaltung" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anzahl Einheiten
            <input name="unitsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="z. B. 1 oder 4" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Dringlichkeit
            <select name="urgency" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-cyan-500">
              <option value="diese_woche">Diese Woche</option>
              <option value="naechste_woche">Nächste Woche</option>
              <option value="vor_uebergabetermin">Vor Übergabetermin</option>
              <option value="flexibel">Flexibel</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugang / Hinweise
            <textarea name="accessNotes" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="Zugang, Parken, Keller, Müllraum, Ansprechpartner vor Ort." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <textarea name="budget" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="Falls ein Rahmen oder Kostenziel bekannt ist." />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Wohnung, Keller, Restmengen, Zugang oder Muellraum."
            helper="Fotos helfen bei der Einschaetzung und bleiben ohne PII-Tracking."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_tenant_turnover_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-cyan-500" placeholder="Was ist nach dem Auszug offen? Was muss bis wann vorbereitet werden?" />
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="recurringInterest" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600" />
          Wiederkehrende Zusammenarbeit ist interessant.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600" />
          Rückruf gewünscht.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600" />
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. FLOXANT unterstützt organisatorisch und praktisch, ersetzt aber keine rechtliche Übergabeprüfung.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Mieterwechsel-Anfrage ist eingegangen. Wir prüfen Objektart, Ort, Zeitraum, benötigte Leistungen und Fotos. Falls Angaben fehlen, melden wir uns mit Rückfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Objektfall prüfen lassen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="whatsapp_click"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Mieterwechsel per WhatsApp anfragen
          </a>
        </div>

        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <a href={`tel:${PHONE_TEL}`} data-event="phone_click" className="inline-flex items-center gap-2 transition hover:text-cyan-700">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} data-event="hero_cta_click" className="inline-flex items-center gap-2 transition hover:text-cyan-700">
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </form>
    </div>
  );
}
