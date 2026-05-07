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

const roleOptions = ["Host", "Vermieter", "Eigentuemer", "Betreiber", "B2B / Unternehmen", "Sonstiges"];
const objectTypeOptions = [
  "moeblierte Wohnung",
  "Apartment",
  "Business Apartment",
  "Ferienwohnung / Kurzzeitvermietung",
  "mehrere Einheiten",
  "sonstiges",
];
const cleaningTypeOptions = [
  "Gaestewechsel",
  "Endreinigung",
  "Grundreinigung",
  "regelmaessige Reinigung",
  "vor Check-in",
  "nach Check-out",
  "Auszugsreinigung",
];
const frequencyOptions = ["einmalig", "woechentlich", "nach Buchung/Gaestewechsel", "monatlich", "nach Absprache"];

const statusCards = [
  {
    value: "Gaestewechsel",
    title: "Gaestewechsel steht an",
    text: "Zeitfenster, Check-out, naechster Check-in und sichtbare Flaechen sauber klaeren.",
    Icon: RefreshCcw,
  },
  {
    value: "Endreinigung",
    title: "Endreinigung",
    text: "Moeblierte Wohnung nach Nutzung, Auszug oder vor neuer Nutzung pruefen lassen.",
    Icon: Home,
  },
  {
    value: "regelmaessige Reinigung",
    title: "Wiederkehrend",
    text: "Frequenz, Einheiten, Zugang und Ansprechpartner fuer Betreiber oder B2B erfassen.",
    Icon: Clock3,
  },
  {
    value: "Zusatzwuensche",
    title: "Zusatzwuensche",
    text: "Waesche, Schluessel, Fotos oder kleiner Inventarhinweis nur nach Absprache.",
    Icon: KeyRound,
  },
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
  const [objectType, setObjectType] = useState("moeblierte Wohnung");
  const [cleaningType, setCleaningType] = useState("Gaestewechsel");
  const [frequency, setFrequency] = useState("nach Buchung/Gaestewechsel");
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
        "Hallo FLOXANT, ich moechte eine Reinigung fuer eine moeblierte Wohnung / ein Apartment in Duesseldorf anfragen. Es geht um [Gaestewechsel/Endreinigung/regelmaessige Reinigung]. Termin, Fotos und Objektangaben kann ich senden.",
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
      setErrorMessage("Bitte pruefen Sie die Telefonnummer.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte Objektort oder PLZ in Duesseldorf angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Termin, Zeitfenster oder Reinigungsfenster angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz Objekt, Situation oder Zusatzwuensche.");
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
      setObjectType("moeblierte Wohnung");
      setCleaningType("Gaestewechsel");
      setFrequency("nach Buchung/Gaestewechsel");
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
    <div id="apartment-reinigung-form" className="rounded-[2rem] border border-cyan-200 bg-white p-5 shadow-2xl shadow-cyan-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Apartment-Status</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Was ist Ihre Situation?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          FLOXANT fragt bewusst nach Zeitfenster, Objektart, Fotos und Zusatzwuenschen, damit Gaestewechsel oder Endreinigung in Duesseldorf realistisch geprueft werden koennen.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-4">
        {statusCards.map((item) => {
          const Icon = item.Icon;
          const active = cleaningType === item.value || (item.value === "Zusatzwuensche" && (laundryRequested === "ja" || keyRequested === "ja" || inventoryNote === "ja"));
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                if (item.value !== "Zusatzwuensche") setCleaningType(item.value);
                if (item.value === "Zusatzwuensche") {
                  setLaundryRequested("ja");
                  setKeyRequested("ja");
                }
              }}
              data-event="select_apartment_cleaning_type"
              data-cleaning-type={item.value}
              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                active ? "border-cyan-700 bg-cyan-50 shadow-lg shadow-cyan-950/10" : "border-slate-200 bg-white hover:border-cyan-200"
              }`}
            >
              <Icon className="h-5 w-5 text-cyan-700" />
              <div className="mt-3 text-sm font-black text-slate-950">{item.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="start_apartment_cleaning_lead">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Rolle*
            <select name="roleType" value={role} onChange={(event) => setRole(event.target.value)} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              {roleOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder={PHONE_DISPLAY} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektort / PLZ in Duesseldorf*
            <input name="objectLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 40213, Bilk, Pempelfort" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektart*
            <select name="objectType" value={objectType} onChange={(event) => setObjectType(event.target.value)} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              {objectTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Reinigungsart*
            <select
              name="cleaningType"
              value={cleaningType}
              onChange={(event) => setCleaningType(event.target.value)}
              data-event="select_apartment_cleaning_type"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700"
            >
              {cleaningTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Termin / Zeitfenster*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. Freitag 10-14 Uhr" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Check-out-Zeit
            <input name="checkoutTime" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 10:00" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Naechster Check-in
            <input name="nextCheckinTime" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 16:00" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Flaeche ca.
            <input name="areaM2" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 62 m2" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zimmer
            <input name="roomsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 2" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Baeder
            <input name="bathroomsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. 1" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Kueche
            <select name="kitchenPresent" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              <option>ja</option>
              <option>nein</option>
              <option>unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Moebliert
            <select name="furnishedStatus" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              <option>ja</option>
              <option>nein</option>
              <option>teilweise</option>
              <option>unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Frequenz
            <select name="recurringFrequency" value={frequency} onChange={(event) => setFrequency(event.target.value)} data-event="select_recurring_frequency" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-700">
              {frequencyOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          <OptionSelect label="Waeschewechsel" value={laundryRequested} onChange={setLaundryRequested} eventName="select_laundry_request" Icon={Shirt} />
          <OptionSelect label="Schluesselkoordination" value={keyRequested} onChange={setKeyRequested} eventName="select_key_coordination_request" Icon={KeyRound} />
          <OptionSelect label="Foto-Dokumentation" value={photoDocumentation} onChange={setPhotoDocumentation} eventName="upload_apartment_photos" Icon={Camera} />
          <OptionSelect label="Inventarhinweis" value={inventoryNote} onChange={setInventoryNote} Icon={CheckCircle2} />
          <OptionSelect label="Kleine Entsorgung" value={smallDisposal} onChange={setSmallDisposal} Icon={Home} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugangshinweise
            <textarea name="accessNotes" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-700" placeholder="Keine Zugangscodes im Formular erzwingen. Zugang, Etage, Ansprechpartner oder Absprachen kurz nennen." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <textarea name="budget" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-700" placeholder="z. B. Preisrahmen pro Einsatz, monatlich oder bitte pruefen" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Bad, Kueche, Boeden, sichtbare Flaechen oder Zugang."
            helper="Keine Zugangscodes oder personenbezogenen Daten in Dateinamen verwenden."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_apartment_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-700" placeholder="Was soll gereinigt werden? Wann ist Check-out/Check-in? Welche Zusatzwuensche gibt es?" />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
            Rueckruf zur Termin- und Objektklaerung gewuenscht.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
            WhatsApp fuer Rueckfragen bevorzugt.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. Mir ist klar: Waeschewechsel, Schluesselkoordination, Inventarhinweis und kleine Entsorgung erfolgen nur nach Absprache und Verfuegbarkeit.
        </label>

        {errorMessage ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div> : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Anfrage zur Reinigung einer moeblierten Wohnung in Duesseldorf ist eingegangen. FLOXANT prueft Objektart, Terminfenster, Reinigungsumfang und Zusatzwuensche. Falls Angaben fehlen, melden wir uns mit Rueckfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="submit_apartment_cleaning_lead"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Apartment-Reinigung anfragen
          </button>
          <a href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`} data-event="click_apartment_cleaning_whatsapp" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100">
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
    <label className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-black text-slate-800">
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyan-700" />
        {label}
      </span>
      <select value={value} onChange={(event) => onChange(event.target.value)} data-event={eventName} className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none transition focus:border-cyan-700">
        <option>ja</option>
        <option>nein</option>
        <option>unklar</option>
      </select>
    </label>
  );
}
