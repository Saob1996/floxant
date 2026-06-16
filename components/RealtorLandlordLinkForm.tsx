"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  Home,
  KeyRound,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = ["Makler", "Vermieter", "Eigentuemer", "Hausverwaltung", "Sonstiges"];

const objectTypeOptions = [
  "Wohnung",
  "Haus",
  "Zimmer",
  "Keller",
  "Garage",
  "Buero / Gewerbe",
  "mehrere Objekte",
  "Sonstiges",
];

const objectCaseOptions = [
  "nach Auszug",
  "vor Besichtigung",
  "Mieterwechsel",
  "Reinigung fehlt",
  "Raeumung/Entsorgung noetig",
  "Keller/Garage/Nebenraum",
  "Uebergabe/Schluessel",
  "anderes",
];

const serviceOptions = [
  "Raeumung",
  "Entsorgung",
  "Reinigung",
  "Uebergabeakte",
  "Schluesselkoordination",
  "Mieterwechsel-Service",
  "Wohnung wieder vermietbar",
  "Diskrete Abstimmung",
];

const objectCaseCards = [
  {
    value: "nach Auszug",
    title: "Wohnung nach Auszug",
    text: "Restmoebel, Reinigung, Keller oder Uebergabe zusammen einordnen.",
    services: "Raeumung + Reinigung + Uebergabeakte",
    Icon: Home,
  },
  {
    value: "vor Besichtigung",
    title: "Vor Besichtigung",
    text: "Objekt fuer Foto, Termin oder Erstbesichtigung sichtbarer vorbereiten.",
    services: "Reinigung + Entsorgung + Fotos",
    Icon: Camera,
  },
  {
    value: "Keller/Garage/Nebenraum",
    title: "Keller / Garage voll",
    text: "Nebenflaechen mit Fotos, Zugang und Freigabe schnell pruefen.",
    services: "Objektflaeche + Entsorgung",
    Icon: Trash2,
  },
  {
    value: "Uebergabe/Schluessel",
    title: "Schluessel oder Uebergabe offen",
    text: "Termin, Schluesselstatus und Dokumentation nach Absprache mitdenken.",
    services: "Schluessel + Uebergabeakte",
    Icon: KeyRound,
  },
  {
    value: "mehrere Objekte",
    title: "Wiederkehrende Faelle",
    text: "Makler, Vermieter und Verwaltung koennen den Link mehrfach nutzen.",
    services: "B2B-Schnelllink",
    Icon: Building2,
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

export function RealtorLandlordLinkForm() {
  const [role, setRole] = useState("Makler");
  const [objectCaseType, setObjectCaseType] = useState("vor Besichtigung");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Reinigung", "Entsorgung"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich moechte einen Objektfall als Makler/Vermieter/Eigentuemer senden. Es geht um ein Objekt in [Ort]. Benoetigt werden Raeumung/Reinigung/Entsorgung/Uebergabevorbereitung nach Absprache. Fotos und Termin kann ich senden.",
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
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT Rueckfragen stellen kann.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte pruefen Sie die Telefonnummer.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte Objektort oder PLZ angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Zeitraum, Besichtigungstermin oder Uebergabetermin angeben.");
      return;
    }
    if (!objectCaseType) {
      setErrorMessage("Bitte Objektfall auswaehlen.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens einen Service-Baustein auswaehlen.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was am Objekt offen ist.");
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

    formData.set("type", "realtor_landlord_link");
    formData.set("lead_type", "makler_vermieter_link");
    formData.set("service", "makler_vermieter_link");
    formData.set("roleType", role);
    formData.set("objectCaseType", objectCaseType);
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "realtor_landlord_link");
    formData.set("source", "realtor_landlord_link");
    formData.set("landingPage", typeof window === "undefined" ? "/makler-vermieter-link" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("objectCasePhoto", file));

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
      setRole("Makler");
      setObjectCaseType("vor Besichtigung");
      setSelectedServices(["Reinigung", "Entsorgung"]);
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="objektfall-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Objektfall-Schnelllink</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Welcher Objektfall liegt vor?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Dieser Startpunkt ist kurz gehalten: Rolle, Objekt, Zustand, Termin, Fotos und Rueckmeldung reichen fuer die erste Pruefung.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {objectCaseCards.map((item) => {
          const Icon = item.Icon;
          const active = objectCaseType === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setObjectCaseType(item.value)}
              data-event="service_card_click"
              data-object-case={item.value}
              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                active ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/20" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-amber-200" : "text-slate-700"}`} />
              <span className="mt-3 block text-sm font-black">{item.title}</span>
              <span className={`mt-2 block text-xs leading-5 ${active ? "text-slate-200" : "text-slate-600"}`}>{item.text}</span>
              <span className={`mt-3 block rounded-xl px-3 py-2 text-[11px] font-black ${active ? "bg-white/10 text-amber-100" : "bg-white text-slate-700"}`}>
                {item.services}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Firma / Organisation optional
            <input name="companyName" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="Maklerbuero, Hausverwaltung, Eigentuemer..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Rolle*
            <select
              name="roleType"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950"
            >
              {roleOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektart*
            <select name="objectType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950">
              {objectTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="fuer schnelle Rueckfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektort / PLZ*
            <input name="objectLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektfall*
            <select
              name="objectCaseType"
              value={objectCaseType}
              onChange={(event) => setObjectCaseType(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950"
            >
              {objectCaseOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Gewuenschter Zeitraum*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="z. B. vor Besichtigung, naechste Woche" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Besichtigungstermin optional
            <input name="viewingDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="falls bekannt" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Uebergabetermin optional
            <input name="handoverDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="falls bekannt" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anzahl Einheiten
            <input name="unitsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="1 oder mehrere" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-black text-slate-950">Gewuenschte Leistungen</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {serviceOptions.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-black transition ${
                    active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugang / Schluesselstatus
            <textarea name="accessNotes" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950" placeholder="Wer hat Schluessel? Zugang moeglich? Etage, Aufzug, Parken?" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <textarea name="budget" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950" placeholder="Falls ein Rahmen oder Kostenziel bekannt ist." />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Flaeche ca.
            <input name="areaM2" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="z. B. 72 m2" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Raeume
            <input name="roomsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="z. B. 3" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950" placeholder="z. B. 2. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-950">
              <option value="">Nicht angegeben</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Wohnung, Keller, Moebel, Reinigung, Zugang oder Nebenflaechen."
            helper="Keine personenbezogenen Daten in Dateinamen verwenden."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_object_case_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950" placeholder="Was ist offen? Was soll vorbereitet werden? Gibt es Besichtigung, Uebergabe, Leerstand oder Mieterwechsel?" />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950" />
            Rueckruf zum Objektfall gewuenscht.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950" />
            WhatsApp fuer Rueckfragen bevorzugt.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950" />
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. FLOXANT bietet praktische und organisatorische Unterstuetzung, keine Maklerleistung, keine Rechtsberatung und keine Vermietungsgarantie.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div>
        ) : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihr Objektfall ist eingegangen. FLOXANT prueft Ort, Zustand, Termin, Fotos und gewuenschte Leistungen. Falls Angaben fehlen, melden wir uns mit Rueckfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Objektfall senden
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="whatsapp_click"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Sparkles className="h-3 w-3" /> Keine Vermietungsgarantie</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><UsersRound className="h-3 w-3" /> B2B-Schnelllink</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Phone className="h-3 w-3" /> {PHONE_DISPLAY}</span>
        </div>
      </form>
    </div>
  );
}
