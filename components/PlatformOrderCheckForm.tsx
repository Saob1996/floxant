"use client";

import { type FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, FileText, Loader2, Mail, MessageCircle, Phone, UploadCloud } from "lucide-react";

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
  { value: "entsorgung", label: "Düsseldorf Entsorgung" },
];

const situationOptions = [
  "Angebot erhalten, aber unsicher",
  "Anbieter meldet sich nicht",
  "Auftrag geschlossen oder abgebrochen",
  "Preis unklar",
  "Leistung unklar",
  "Termin unklar",
  "Möchte Alternative",
  "Direkte zweite Einschätzung",
  "Düsseldorf Reinigung/Entsorgung prüfen",
];

const platformOptions = [
  { value: "", label: "Möchte ich nicht angeben" },
  { value: "myhammer", label: "MyHammer" },
  { value: "check24", label: "Check24" },
  { value: "andere_plattform", label: "Andere Plattform" },
  { value: "lokaler_anbieter", label: "Lokaler Anbieter" },
  { value: "anderer_anbieter", label: "Anderer Anbieter" },
];

const addonOptions = [
  "Endreinigung",
  "Entrümpelung",
  "Entsorgung",
  "Schlüsselübergabe",
  "Übergabeakte",
  "Zugang / Parken",
  "Rückfahrt/Leerfahrt",
  "Premium/Rückruf",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

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

export function PlatformOrderCheckForm() {
  const [region, setRegion] = useState("regensburg");
  const [service, setService] = useState("umzug");
  const [platformSituation, setPlatformSituation] = useState(situationOptions[0]);
  const [platformType, setPlatformType] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [offerFiles, setOfferFiles] = useState<File[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = region === "duesseldorf" ? duesseldorfServices : standardServices;

  const whatsappText = useMemo(() => {
    const duesseldorfText =
      "Hallo FLOXANT, ich habe bereits über eine Plattform oder einen anderen Anbieter angefragt. Es geht um Reinigung/Entsorgung in Düsseldorf. Angebot/Screenshot/Fotos/Preis kann ich senden.";
    const standardText =
      "Hallo FLOXANT, ich habe bereits über eine Plattform oder einen anderen Anbieter angefragt und möchte den Auftrag prüfen lassen. Es geht um [Service] in [Ort]. Angebot/Screenshot/Fotos/Preis kann ich senden.";
    return encodeURIComponent(region === "duesseldorf" ? duesseldorfText : standardText);
  }, [region]);

  function updateRegion(nextRegion: string) {
    setRegion(nextRegion);
    if (nextRegion === "duesseldorf" && !["reinigung", "entsorgung"].includes(service)) {
      setService("reinigung");
      setPlatformSituation("Düsseldorf Reinigung/Entsorgung prüfen");
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
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben.");
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
      setErrorMessage("Bitte Termin oder Zeitraum angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was unklar ist.");
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
    formData.set("leadSubtype", "plattform_auftrag");
    formData.set("leadSource", "platform_order_check");
    formData.set("source", "platform_order_check");
    formData.set("sourceComponent", "platform_order_page");
    formData.set("service", service);
    formData.set("region", region);
    formData.set("platformSituation", platformSituation);
    formData.set("platformType", platformType);
    formData.set("offerSourceType", platformType || "nicht_angeben");
    formData.set("selectedAddons", JSON.stringify(selectedAddons));
    formData.set("timestamp", new Date().toISOString());
    formData.set("landingPage", typeof window === "undefined" ? "/plattform-auftrag-pruefen" : `${window.location.pathname}${window.location.search}`);
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
      setPlatformSituation(situationOptions[0]);
      setPlatformType("");
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="plattform-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: "Angebot hochladen", text: "PDF, Screenshot oder Bild senden.", Icon: UploadCloud },
          { title: "Red Flags klären", text: "Offene Punkte sichtbar machen.", Icon: FileText },
          { title: "Direkt anfragen", text: "Alternative mit FLOXANT prüfen.", Icon: MessageCircle },
        ].map((item) => {
          const Icon = item.Icon;
          return (
            <div key={item.title} className="rounded-[1.25rem] border border-blue-100 bg-blue-50/70 p-4">
              <Icon className="h-5 w-5 text-blue-700" />
              <p className="mt-3 text-sm font-black text-slate-950">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
            </div>
          );
        })}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} data-event="start_platform_order_check">
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
            <select value={region} onChange={(event) => updateRegion(event.target.value)} name="region" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              <option value="regensburg">Regensburg</option>
              <option value="regensburg_200km">Umgebung Regensburg ca. 200 km</option>
              <option value="bayern">Bayern nach Verfügbarkeit</option>
              <option value="duesseldorf">Düsseldorf: Reinigung/Entsorgung</option>
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
            <input name="cityOrZip" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Plattform-Situation*
            <select
              value={platformSituation}
              onChange={(event) => setPlatformSituation(event.target.value)}
              name="platformSituation"
              data-event="select_platform_situation"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500"
            >
              {situationOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Plattform optional
            <select
              value={platformType}
              onChange={(event) => setPlatformType(event.target.value)}
              name="platformType"
              data-event="select_platform_type"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500"
            >
              {platformOptions.map((item) => (
                <option key={item.value || "none"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Termin / Zeitraum*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. 15.06. oder nächste Woche" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Vorhandener Angebotspreis
            <input name="quotedPrice" inputMode="decimal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="falls bekannt, z. B. 950 EUR" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen
            <input name="budget" inputMode="decimal" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="optional" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/70 p-4 shadow-sm shadow-slate-950/5">
          <div className="mb-4">
            <p className="text-sm font-black text-slate-950">Upload für Plattform-Angebot und Fotos</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Senden Sie Angebot/Screenshot und Fotos getrennt. So bleibt die Prüfung schnell und übersichtlich.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <UploadDropCard
              title="Angebot / Screenshot"
              description="PDF, Screenshot oder Angebotsbild."
              helper="PDF, Screenshot, JPG/PNG/WebP bis 12 MB je Datei."
              accept=".pdf,image/jpeg,image/png,image/webp"
              files={offerFiles}
              dataEvent="upload_platform_offer"
              onFilesChange={setOfferFiles}
            />
            <UploadDropCard
              title="Fotos optional"
              description="Zugang, Etage, Menge, Zustand oder Räume."
              helper="Fotos helfen bei der praktischen Einschätzung, sind aber optional."
              accept="image/jpeg,image/png,image/webp"
              files={photoFiles}
              dataEvent="upload_platform_photos"
              tone="emerald"
              onFilesChange={setPhotoFiles}
            />
          </div>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Angebotstext optional einfügen
          <textarea name="offerText" data-event="paste_platform_offer_text" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Falls Sie keinen Upload nutzen möchten, können Sie Angebotstext oder offene Punkte hier einfügen." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Was ist unklar? Umfang, Preis, Etage, Zugang, Termin, Reinigung, Entsorgung oder Übergabe." />
        </label>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-900">Zusatzservices, die geprüft werden sollen</p>
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
          <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          WhatsApp bevorzugt, wenn Rückfragen schnell geklärt werden sollen.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          Rückruf gewünscht, wenn eine eigene FLOXANT-Einschätzung möglich ist.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung verarbeitet. FLOXANT bewertet keine Plattform rechtlich, sondern prüft die Angaben organisatorisch und praktisch.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Plattform-Auftrag-Anfrage ist eingegangen. FLOXANT prüft vorhandene Angaben, Umfang, Termin, Preisrahmen und offene Punkte. Wenn Angaben fehlen, melden wir uns mit Rückfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="submit_platform_order_lead"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Direkt prüfen lassen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="click_platform_order_whatsapp"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Plattform-Angebot per WhatsApp senden
          </a>
        </div>

        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <a href={`tel:${PHONE_TEL}`} data-event="click_platform_order_phone" className="inline-flex items-center gap-2 transition hover:text-blue-700">
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
