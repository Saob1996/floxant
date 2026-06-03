"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = [
  "Vermieter",
  "Hausverwaltung",
  "Makler",
  "Eigentümer",
  "ausziehender Mieter",
  "sonstiges",
];

const objectTypeOptions = [
  "Wohnung",
  "Haus",
  "Zimmer",
  "Keller",
  "Garage",
  "Büro / Gewerbefläche",
  "mehrere Einheiten",
];

const goalOptions = [
  "wieder vermieten",
  "Besichtigung vorbereiten",
  "Übergabe vorbereiten",
  "nach Auszug reinigen",
  "nach Entrümpelung reinigen",
  "wieder nutzbar machen",
  "anderes",
];

const serviceOptions = [
  "Räumung / Entrümpelung",
  "Entsorgung",
  "Endreinigung",
  "Grundreinigung",
  "Keller / Nebenräume",
  "Möbel entfernen",
  "Foto-Dokumentation",
  "Übergabeakte",
  "Schlüsselkoordination",
  "Mieterwechsel-Service",
  "Diskrete Abstimmung",
];

const statusOptions = [
  {
    value: "empty_needs_cleaning",
    title: "Leer, Reinigung fehlt",
    text: "Endreinigung, sichtbare Übergabepunkte oder Grundreinigung prüfen.",
    recommendation: "Reinigung + Fotoeinschätzung",
    Icon: Sparkles,
  },
  {
    value: "items_inside",
    title: "Möbel oder Gegenstände drin",
    text: "Räumung, Entsorgung und Reinigung sinnvoll zusammen prüfen.",
    recommendation: "Räumung + Entsorgung + Reinigung",
    Icon: Home,
  },
  {
    value: "storage_full",
    title: "Keller/Nebenräume voll",
    text: "Nebenflächen können Besichtigung, Übergabe oder Neuvermietung blockieren.",
    recommendation: "Keller/Nebenräume + Fotos",
    Icon: Building2,
  },
  {
    value: "viewing_soon",
    title: "Besichtigung steht an",
    text: "Priorität auf präsentierbare Bereiche, Termin und schnelle Rückfrage legen.",
    recommendation: "Besichtigungsvorbereitung",
    Icon: UsersRound,
  },
  {
    value: "handover_soon",
    title: "Übergabe steht bald an",
    text: "Schlüsselstatus, Übergabeakte und sichtbare Übergabepunkte mitdenken.",
    recommendation: "Übergabeakte + Endreinigung",
    Icon: CheckCircle2,
  },
];

const urgencyOptions = [
  "diese Woche",
  "nächste Woche",
  "vor Besichtigung",
  "vor Übergabe",
  "flexibel",
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

export function RentalReadyForm() {
  const [role, setRole] = useState("Vermieter");
  const [goal, setGoal] = useState("wieder vermieten");
  const [objectStatus, setObjectStatus] = useState("empty_needs_cleaning");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Endreinigung", "Foto-Dokumentation"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich möchte eine Wohnung nach Auszug/Leerstand wieder vorbereiten lassen. Es geht um ein Objekt in [Ort]. Benötigt werden Räumung/Reinigung/Entsorgung/Übergabevorbereitung nach Absprache. Fotos und Termin kann ich senden.",
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
      setErrorMessage("Bitte Zeitraum, Besichtigungstermin oder Übergabetermin angeben.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens einen Service-Baustein auswählen.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was am Objekt offen ist.");
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

    formData.set("type", "rental_ready");
    formData.set("lead_type", "wohnung_wieder_vermietbar");
    formData.set("service", "wohnung_wieder_vermietbar");
    formData.set("roleType", role);
    formData.set("goalType", goal);
    formData.set("objectStatus", objectStatus);
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "rental_ready_service");
    formData.set("source", "rental_ready_service");
    formData.set("landingPage", typeof window === "undefined" ? "/wohnung-wieder-vermietbar" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("rentalReadyPhoto", file));

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
      setSelectedServices(["Endreinigung", "Foto-Dokumentation"]);
      setPhotos([]);
      setObjectStatus("empty_needs_cleaning");
      setRole("Vermieter");
      setGoal("wieder vermieten");
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="wohnung-ready-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">Objektstatus</div>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Wie ist der Zustand der Wohnung?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Wählen Sie den passendsten Zustand. FLOXANT nutzt das nur zur ersten Einordnung, nicht als automatisches Versprechen.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {statusOptions.map((item) => {
          const Icon = item.Icon;
          const active = objectStatus === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setObjectStatus(item.value)}
              data-event="service_card_click"
              data-status={item.value}
              className={`rounded-[1.2rem] border p-4 text-left transition ${
                active ? "border-orange-500 bg-orange-50 text-orange-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-3 block text-sm font-black">{item.title}</span>
              <span className="mt-1 block text-xs leading-5">{item.text}</span>
              <span className="mt-3 block rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-orange-700">
                {item.recommendation}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Firma / Organisation optional
            <input name="companyName" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="Hausverwaltung, Maklerbüro, Eigentümergesellschaft" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Rolle*
            <select
              name="roleType"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500"
            >
              {roleOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ziel*
            <select
              name="goalType"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500"
            >
              {goalOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="für schnelle Rückfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektort / PLZ*
            <input name="objectLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="Regensburg, Neutraubling, Kelheim..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektart*
            <select name="objectType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500">
              {objectTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zeitraum / Termin*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="z. B. nächste Woche, vor Besichtigung, vor Übergabe" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Dringlichkeit
            <select name="urgency" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500">
              {urgencyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Besichtigungstermin optional
            <input name="viewingDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="falls schon bekannt" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Übergabetermin optional
            <input name="handoverDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="falls schon bekannt" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Fläche ca.
            <input name="areaM2" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="z. B. 72 m²" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anzahl Räume
            <input name="roomsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="z. B. 3" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="z. B. 2. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500">
              <option value="">Bitte wählen</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anzahl Einheiten
            <input name="unitsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="1 oder mehrere" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <input name="budget" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="falls es einen Rahmen gibt" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-black text-slate-900">Welche Bausteine sollen geprüft werden?</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {serviceOptions.map((service) => (
              <label key={service} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-600" />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugang / Schlüsselstatus
            <textarea name="accessNotes" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="Wer hat Schlüssel? Zugang möglich? Parkplatz, Keller, Hausflur?" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Kurze Beschreibung*
            <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-500" placeholder="Was ist noch offen: Möbel, Sperrmüll, Reinigung, Keller, Besichtigung, Übergabe?" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Wohnung, Moebel, Sperrmuell, Keller, Zugang oder Verschmutzung."
            helper="Fotos helfen bei einer realistischen Einschaetzung. Bitte keine sensiblen Dokumente mitsenden."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_rental_ready_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
          <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600" />
          <span>Rückruf zur Objektvorbereitung gewünscht</span>
        </label>
        <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung dieser Anfrage verarbeitet. Sensible Zugangsdaten oder persönliche Dokumente bitte nicht mitsenden.
          </span>
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div>
        ) : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
            Danke. Ihre Anfrage ist eingegangen. FLOXANT prüft Objektzustand, Ort, Termin, benötigte Leistungen und Fotos. Wenn Angaben fehlen, melden wir uns mit Rückfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-orange-700 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Objektfall senden
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
            data-event="whatsapp_click"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-orange-200 hover:bg-orange-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>

        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
          Direktkontakt: <a href={`tel:${PHONE_TEL}`} className="font-black text-slate-950" data-event="phone_click">{PHONE_DISPLAY}</a> · {EMAIL}
        </div>
      </form>
    </div>
  );
}
