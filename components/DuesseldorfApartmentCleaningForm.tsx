"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Home,
  KeyRound,
  Loader2,
  Mail,
  Phone,
  RefreshCcw,
  Shirt,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = ["Host", "Vermieter", "Eigentümer", "Betreiber", "B2B / Unternehmen", "Sonstiges"];
const objectTypeOptions = [
  "möblierte Wohnung",
  "Apartment",
  "Business Apartment",
  "Ferienwohnung / Kurzzeitvermietung",
  "mehrere Einheiten",
  "sonstiges",
];
const cleaningTypeOptions = [
  "Gästewechsel",
  "Endreinigung",
  "Grundreinigung",
  "regelmäßige Reinigung",
  "vor Check-in",
  "nach Check-out",
  "Auszugsreinigung",
];
const frequencyOptions = ["einmalig", "wöchentlich", "nach Buchung/Gästewechsel", "monatlich", "nach Absprache"];

const statusCards = [
  {
    value: "Gästewechsel",
    title: "Gästewechsel steht an",
    text: "Zeitfenster, Check-out, nächster Check-in und sichtbare Flächen sauber klären.",
    Icon: RefreshCcw,
  },
  {
    value: "Endreinigung",
    title: "Endreinigung",
    text: "Möblierte Wohnung nach Nutzung, Auszug oder vor neuer Nutzung prüfen lassen.",
    Icon: Home,
  },
  {
    value: "regelmäßige Reinigung",
    title: "Wiederkehrend",
    text: "Frequenz, Einheiten, Zugang und Ansprechpartner für Betreiber oder B2B erfassen.",
    Icon: Clock3,
  },
  {
    value: "Zusatzwünsche",
    title: "Zusatzwünsche",
    text: "Wäsche, Schlüssel, Fotos oder kleiner Inventarhinweis nur nach Absprache.",
    Icon: KeyRound,
  },
];

const formGuidance = [
  "Ort / PLZ",
  "Zeitfenster",
  "Objektart",
  "Fotos optional",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getQueryValue(key: string) {
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

export function DuesseldorfApartmentCleaningForm() {
  const [role, setRole] = useState("Host");
  const [objectType, setObjectType] = useState("möblierte Wohnung");
  const [cleaningType, setCleaningType] = useState("Gästewechsel");
  const [frequency, setFrequency] = useState("nach Buchung/Gästewechsel");
  const [laundryRequested, setLaundryRequested] = useState("unklar");
  const [keyRequested, setKeyRequested] = useState("unklar");
  const [photoDocumentation, setPhotoDocumentation] = useState("ja");
  const [inventoryNote, setInventoryNote] = useState("nein");
  const [smallDisposal, setSmallDisposal] = useState("nein");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich möchte eine Reinigung für eine möblierte Wohnung / ein Apartment in Düsseldorf anfragen. Es geht um [Gästewechsel/Endreinigung/regelmäßige Reinigung]. Termin, Fotos und Objektangaben kann ich senden.",
      ),
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const objectLocation = String(formData.get("objectLocation") || "").trim();
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
    if (!objectLocation) {
      setErrorMessage("Bitte Objektort oder PLZ in Düsseldorf angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Termin, Zeitfenster oder Reinigungsfenster angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz Objekt, Situation oder Zusatzwünsche.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const photoError = validatePhotos(photos);
    if (photoError) {
      setErrorMessage(photoError);
      return;
    }

    formData.set("type", "duesseldorf_apartment_cleaning");
    formData.set("lead_type", "duesseldorf_moeblierte_wohnung_reinigung");
    formData.set("service", "duesseldorf_moeblierte_wohnung_reinigung");
    formData.set("roleType", role);
    formData.set("objectType", objectType);
    formData.set("cleaningType", cleaningType);
    formData.set("recurringFrequency", frequency);
    formData.set("laundryChangeRequested", laundryRequested);
    formData.set("keyCoordinationRequested", keyRequested);
    formData.set("photoDocumentationRequested", photoDocumentation);
    formData.set("inventoryNoteRequested", inventoryNote);
    formData.set("disposalSmallItemsRequested", smallDisposal);
    formData.set("region", "duesseldorf");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "duesseldorf_apartment_cleaning");
    formData.set("source", "duesseldorf_apartment_cleaning");
    formData.set("landingPage", typeof window === "undefined" ? "/reinigung-moeblierte-wohnung-duesseldorf" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getQueryValue("utm_source"));
    formData.set("utmMedium", getQueryValue("utm_medium"));
    formData.set("utmCampaign", getQueryValue("utm_campaign"));
    formData.set("utmContent", getQueryValue("utm_content"));
    const referralCode = getQueryValue("ref") || getQueryValue("partner_code") || getQueryValue("referral_code");
    formData.set("referralCode", referralCode);
    formData.set("partnerCode", referralCode);
    photos.forEach((file) => formData.append("apartmentCleaningPhoto", file));

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
      setRole("Host");
      setObjectType("möblierte Wohnung");
      setCleaningType("Gästewechsel");
      setFrequency("nach Buchung/Gästewechsel");
      setLaundryRequested("unklar");
      setKeyRequested("unklar");
      setPhotoDocumentation("ja");
      setInventoryNote("nein");
      setSmallDisposal("nein");
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="apartment-reinigung-form" className="min-w-0 rounded-[2.15rem] border border-cyan-200 bg-white p-5 shadow-2xl shadow-cyan-950/10 ring-1 ring-white sm:p-7">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
          Apartment-Status
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Was ist Ihre Situation?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          FLOXANT fragt bewusst nach Zeitfenster, Objektart, Fotos und Zusatzwünschen, damit Gästewechsel oder Endreinigung in Düsseldorf realistisch geprüft werden können.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {formGuidance.map((item, index) => (
            <div key={item} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Angabe {index + 1}</div>
              <div className="mt-1 text-xs font-black leading-5 text-slate-800">{item}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {statusCards.map((item) => {
          const Icon = item.Icon;
          const active = cleaningType === item.value || (item.value === "Zusatzwünsche" && (laundryRequested === "ja" || keyRequested === "ja" || inventoryNote === "ja"));
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                if (item.value !== "Zusatzwünsche") setCleaningType(item.value);
                if (item.value === "Zusatzwünsche") {
                  setLaundryRequested("ja");
                  setKeyRequested("ja");
                }
              }}
              data-event="service_card_click"
              data-cleaning-type={item.value}
              className={`min-w-0 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                active ? "border-cyan-700 bg-cyan-50 shadow-lg shadow-cyan-950/10 ring-2 ring-cyan-100" : "border-slate-200 bg-white hover:border-cyan-200 hover:shadow-md hover:shadow-cyan-950/5"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-cyan-700" />
                {active ? <span className="rounded-full bg-cyan-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">aktiv</span> : null}
              </div>
              <div className="mt-3 text-sm font-black leading-5 text-slate-950">{item.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid min-w-0 gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid min-w-0 gap-4">
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="Ansprechpartner" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Rolle*
            <select name="roleType" value={role} onChange={(event) => setRole(event.target.value)} className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              {roleOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder={PHONE_DISPLAY} />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder={EMAIL} />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Objektort / PLZ in Düsseldorf*
            <input name="objectLocation" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 40213, Bilk, Pempelfort" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Objektart*
            <select name="objectType" value={objectType} onChange={(event) => setObjectType(event.target.value)} className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              {objectTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Reinigungsart*
            <select
              name="cleaningType"
              value={cleaningType}
              onChange={(event) => setCleaningType(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700"
            >
              {cleaningTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Termin / Zeitfenster*
            <input name="desiredDate" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. Freitag 10-14 Uhr" />
          </label>
        </div>

        <div className="grid min-w-0 gap-4">
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Check-out-Zeit
            <input name="checkoutTime" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 10:00" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Nächster Check-in
            <input name="nextCheckinTime" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 16:00" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Fläche ca.
            <input name="areaM2" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 62 m2" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Zimmer
            <input name="roomsCount" inputMode="numeric" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 2" />
          </label>
        </div>

        <div className="grid min-w-0 gap-4">
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Bäder
            <input name="bathroomsCount" inputMode="numeric" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 1" />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Küche
            <select name="kitchenPresent" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              <option>ja</option>
              <option>nein</option>
              <option>unklar</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Möbliert
            <select name="furnishedStatus" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              <option>ja</option>
              <option>nein</option>
              <option>teilweise</option>
              <option>unklar</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Frequenz
            <select name="recurringFrequency" value={frequency} onChange={(event) => setFrequency(event.target.value)} data-event="service_card_click" className="min-h-12 w-full min-w-0 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              {frequencyOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid min-w-0 gap-3">
          <OptionSelect label="Wäschewechsel" value={laundryRequested} onChange={setLaundryRequested} eventName="select_laundry_request" Icon={Shirt} />
          <OptionSelect label="Schlüsselkoordination" value={keyRequested} onChange={setKeyRequested} eventName="select_key_coordination_request" Icon={KeyRound} />
          <OptionSelect label="Foto-Dokumentation" value={photoDocumentation} onChange={setPhotoDocumentation} eventName="upload_apartment_photos" Icon={Camera} />
          <OptionSelect label="Inventarhinweis" value={inventoryNote} onChange={setInventoryNote} Icon={CheckCircle2} />
          <OptionSelect label="Kleine Entsorgung" value={smallDisposal} onChange={setSmallDisposal} Icon={Home} />
        </div>

        <div className="grid min-w-0 gap-4">
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Zugangshinweise
            <textarea name="accessNotes" rows={3} className="w-full min-w-0 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-700" placeholder="Keine Zugangscodes im Formular erzwingen. Zugang, Etage, Ansprechpartner oder Absprachen kurz nennen." />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <textarea name="budget" rows={3} className="w-full min-w-0 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. Preisrahmen pro Einsatz, monatlich oder bitte prüfen" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Bad, Küche, Böden, sichtbare Flächen oder Zugang."
            helper="Keine Zugangscodes oder personenbezogenen Daten in Dateinamen verwenden."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_apartment_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="w-full min-w-0 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-700" placeholder="Was soll gereinigt werden? Wann ist Check-out/Check-in? Welche Zusatzwünsche gibt es?" />
        </label>

        <div className="grid min-w-0 gap-3">
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
            Rückruf zur Termin- und Objektklärung gewünscht.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
            WhatsApp für Rückfragen bevorzugt.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. Mir ist klar: Wäschewechsel, Schlüsselkoordination, Inventarhinweis und kleine Entsorgung erfolgen nur nach Absprache und Verfügbarkeit.
        </label>

        {errorMessage ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div> : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Anfrage zur Reinigung einer möblierten Wohnung in Düsseldorf ist eingegangen. FLOXANT prüft Objektart, Terminfenster, Reinigungsumfang und Zusatzwünsche. Falls Angaben fehlen, melden wir uns mit Rückfragen.
          </div>
        ) : null}

        <div className="grid min-w-0 gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="flox-readable-cta-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-black transition"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Apartment-Reinigung anfragen
          </button>
          <a href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`} data-event="whatsapp_click" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100">
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>
      </form>
    </div>
  );
}

function OptionSelect({
  label,
  value,
  onChange,
  eventName,
  Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  eventName?: string;
  Icon: typeof Camera;
}) {
  return (
    <label className="grid min-w-0 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-black text-slate-800">
      <span className="flex min-w-0 items-center gap-2">
        <Icon className="h-4 w-4 text-cyan-700" />
        <span className="min-w-0 truncate">{label}</span>
      </span>
      <select value={value} onChange={(event) => onChange(event.target.value)} data-source={eventName} className="min-h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none transition focus:border-cyan-700">
        <option>ja</option>
        <option>nein</option>
        <option>unklar</option>
      </select>
    </label>
  );
}
