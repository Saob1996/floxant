"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  DoorOpen,
  Loader2,
  Mail,
  Phone,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = [
  "Hausverwaltung",
  "Vermieter",
  "Eigentuemergemeinschaft / WEG",
  "Gewerbe",
  "Privatkunde",
  "Sonstiges",
];

const areaOptions = [
  "Keller",
  "Kellerabteil",
  "Garage",
  "Muellraum",
  "Lagerraum",
  "Treppenhaus / Nebenflaeche",
  "Wohnung + Keller",
  "mehrere Bereiche",
  "unklar",
];

const serviceOptions = [
  "Raeumung",
  "Entruempelung",
  "Entsorgung",
  "Reinigung nach Raeumung",
  "Foto-Dokumentation",
  "Uebergabeakte",
  "Mieterwechsel-Service",
  "Wohnung wieder vermietbar",
  "Rueckruf",
];

const itemTypeOptions = ["Moebel", "Kartons", "Hausrat", "Sperrmuell", "Elektrogeraete klein", "unklar"];

const urgencyOptions = ["diese Woche", "naechste Woche", "vor Uebergabe", "flexibel"];

const areaCards = [
  {
    value: "Keller",
    title: "Keller oder Kellerabteil",
    text: "Restgegenstaende, Regale, Kartons oder Sperrmuell mit Zugang und Freigabe pruefen.",
    recommendation: "Raeumung + Fotoeinschaetzung",
    Icon: DoorOpen,
  },
  {
    value: "Muellraum",
    title: "Muellraum blockiert",
    text: "Sperrmuell, falsch abgestellte Gegenstaende oder blockierte Wege einordnen.",
    recommendation: "Entsorgung + Reinigung nach Absprache",
    Icon: Trash2,
  },
  {
    value: "Garage",
    title: "Garage oder Lagerraum",
    text: "Volumen, Gegenstandsarten, Zugang, Trageweg und Termin schnell erfassen.",
    recommendation: "Raeumung + Entsorgung",
    Icon: Building2,
  },
  {
    value: "mehrere Bereiche",
    title: "Mehrere Nebenflaechen",
    text: "Bei Hausverwaltung, WEG oder Gewerbe lohnt sich eine strukturierte Objektanfrage.",
    recommendation: "Objektflaechen-Check",
    Icon: CheckCircle2,
  },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getUtmValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function validatePhotos(files: File[]) {
  const invalidType = files.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type));
  if (invalidType) return "Bitte nur JPG, PNG oder WebP als Fotos hochladen.";
  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Fotos unter 12 MB hochladen oder per WhatsApp senden.";
  return "";
}

export function CellarTrashroomRescueForm() {
  const [role, setRole] = useState("Hausverwaltung");
  const [areaType, setAreaType] = useState("Muellraum");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Raeumung", "Entsorgung", "Reinigung nach Raeumung"]);
  const [itemTypes, setItemTypes] = useState<string[]>(["Sperrmuell"]);
  const [hazardousStatus, setHazardousStatus] = useState("unklar");
  const [clearanceStatus, setClearanceStatus] = useState("unklar");
  const [urgency, setUrgency] = useState("diese Woche");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich moechte eine Keller-/Muellraum-Raeumung anfragen. Es geht um [Keller/Muellraum/Garage/Nebenflaeche] in [Ort]. Fotos, Zugang und Umfang kann ich senden. Bitte pruefen, ob Raeumung/Entsorgung/Reinigung moeglich ist.",
      ),
    [],
  );

  function toggle(value: string, current: string[], setter: (value: string[]) => void) {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
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
    const deadline = String(formData.get("deadline") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT Rueckfragen stellen kann.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte pruefen Sie die Telefonnummer.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte Ort oder PLZ angeben.");
      return;
    }
    if (!deadline) {
      setErrorMessage("Bitte Zeitraum, Deadline oder Uebergabetermin angeben.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens einen Service-Baustein auswaehlen.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was in der Flaeche steht oder offen ist.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestaetigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const photoError = validatePhotos(photos);
    if (photoError) {
      setErrorMessage(photoError);
      return;
    }

    formData.set("type", "cellar_trashroom_rescue");
    formData.set("lead_type", "keller_muellraum_rettung");
    formData.set("service", "keller_muellraum_rettung");
    formData.set("roleType", role);
    formData.set("areaType", areaType);
    formData.set("objectType", areaType);
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("itemTypes", JSON.stringify(itemTypes));
    formData.set("hazardousMaterialsStatus", hazardousStatus);
    formData.set("legalClearanceStatus", clearanceStatus);
    formData.set("urgency", urgency);
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "cellar_trashroom_rescue");
    formData.set("source", "cellar_trashroom_rescue");
    formData.set("landingPage", typeof window === "undefined" ? "/keller-muellraum-rettung-regensburg" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("cellarTrashroomPhoto", file));

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
      setRole("Hausverwaltung");
      setAreaType("Muellraum");
      setSelectedServices(["Raeumung", "Entsorgung", "Reinigung nach Raeumung"]);
      setItemTypes(["Sperrmuell"]);
      setHazardousStatus("unklar");
      setClearanceStatus("unklar");
      setUrgency("diese Woche");
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="keller-muellraum-form" className="rounded-[2rem] border border-amber-200 bg-white p-5 shadow-2xl shadow-amber-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Objektflaechen-Check</div>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Welche Flaeche ist betroffen?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Fotos, Zugang, Freigabe und Materialart entscheiden, ob FLOXANT Raeumung, Entsorgung und Reinigung sinnvoll pruefen kann.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-4">
        {areaCards.map((item) => {
          const Icon = item.Icon;
          const active = areaType === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setAreaType(item.value)}
              data-event="region_select"
              data-area-type={item.value}
              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                active ? "border-amber-600 bg-amber-50 shadow-lg shadow-amber-950/10" : "border-slate-200 bg-white hover:border-amber-200"
              }`}
            >
              <Icon className="h-5 w-5 text-amber-700" />
              <div className="mt-3 text-sm font-black text-slate-950">{item.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
              <div className="mt-3 rounded-xl bg-slate-950 px-3 py-2 text-[11px] font-black text-white">{item.recommendation}</div>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Name *
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="Vor- und Nachname" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Firma / Organisation optional
            <input name="companyName" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="Hausverwaltung, WEG, Gewerbe..." />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder={PHONE_DISPLAY} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder={EMAIL} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Rolle *
            <select
              name="roleType"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500"
            >
              {roleOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Betroffene Flaeche *
            <select
              name="areaType"
              value={areaType}
              onChange={(event) => setAreaType(event.target.value)}
              data-event="region_select"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500"
            >
              {areaOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Ort / PLZ *
            <input name="objectLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="Regensburg, PLZ..." />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Zeitraum / Deadline *
            <input name="deadline" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="z. B. diese Woche, vor Uebergabe" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Dringlichkeit
            <select name="urgency" value={urgency} onChange={(event) => setUrgency(event.target.value)} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500">
              {urgencyOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Budget / Preisrahmen optional
            <input name="budget" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="z. B. 500 EUR" />
          </label>
        </div>

        <div>
          <div className="text-sm font-black text-slate-800">Welche Leistungen sollen geprueft werden?</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {serviceOptions.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggle(service, selectedServices, setSelectedServices)}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-black transition ${
                    active ? "border-amber-600 bg-amber-50 text-amber-900" : "border-slate-200 bg-white text-slate-600 hover:border-amber-200"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-sm font-black text-slate-800">Gegenstandsarten grob</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {itemTypeOptions.map((item) => {
              const active = itemTypes.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggle(item, itemTypes, setItemTypes)}
                  className={`rounded-full border px-3 py-2 text-xs font-black transition ${
                    active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-amber-200"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Problematische Stoffe?
            <select
              name="hazardousMaterialsStatus"
              value={hazardousStatus}
              onChange={(event) => setHazardousStatus(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500"
            >
              <option>nein</option>
              <option>ja</option>
              <option>unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Freigabe / Eigentumsfrage geklaert?
            <select
              name="legalClearanceStatus"
              value={clearanceStatus}
              onChange={(event) => setClearanceStatus(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500"
            >
              <option>ja</option>
              <option>nein</option>
              <option>unklar</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Flaeche ca.
            <input name="areaSize" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="z. B. 15 m2" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="Keller, EG, 2. OG..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500">
              <option>unklar</option>
              <option>ja</option>
              <option>nein</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Zugang / Schluesselstatus
            <input name="keyStatus" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="Zugang frei, Schluessel bei Verwaltung..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Trageweg / Zugang
            <input name="accessNotes" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-amber-500" placeholder="enger Keller, Hof, Treppenhaus..." />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Kurze Beschreibung *
          <textarea name="message" rows={5} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500" placeholder="Was steht dort? Wer beauftragt? Ist Freigabe geklaert? Gibt es Fotos oder eine Deadline?" />
        </label>

        <div className="rounded-[1.75rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-orange-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Keller, Muellraum, Zugang, Restmenge oder Materialart."
            helper="JPG, PNG oder WebP. Keine sensiblen Kundendaten in Dateinamen verwenden."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_cellar_trashroom_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
          <input name="callbackWanted" type="checkbox" value="true" className="mt-1" />
          <span>Rueckruf erwuenscht, wenn Rueckfragen zu Freigabe, Zugang, Umfang oder Materialart bestehen.</span>
        </label>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
          <input name="privacy" type="checkbox" className="mt-1" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage nutzt. Sensible Zugangsdaten oder persönliche Dokumente bitte nicht mitsenden.
          </span>
        </label>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-800">
            Danke. Ihre Anfrage zur Keller-/Muellraum-Rettung ist eingegangen. FLOXANT prueft Ort, Umfang, Fotos, Zugang, Freigabe und gewuenschte Leistungen. Falls Angaben fehlen, melden wir uns mit Rueckfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Objektflaeche pruefen lassen
          </button>
          <a href={`https://wa.me/4915771105087?text=${whatsappText}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-amber-200 hover:bg-amber-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>
      </form>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          FLOXANT prueft keine Eigentumsfragen und bietet keine Gefahrstoff-, Asbest-, Chemie-, Oel-, Farben- oder Schaedelingsbekaempfung an. Freigabe und problematische Stoffe muessen vor der Umsetzung geklaert sein.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Camera className="h-3 w-3" /> Fotos helfen</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><CheckCircle2 className="h-3 w-3" /> Freigabe klaeren</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Trash2 className="h-3 w-3" /> Materialart nennen</span>
      </div>
    </div>
  );
}
