"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const uncertainOptions = [
  "Transport / Umzug",
  "Reinigung",
  "Entruempelung",
  "Entsorgung",
  "Schluesseluebergabe",
  "Uebergabe",
  "Angebot / Preis",
  "Duesseldorf Reinigung",
  "Duesseldorf Entsorgung",
  "mehrere Punkte",
];

const riskLevels = [
  {
    id: "beobachten",
    title: "Beobachten",
    text: "Termin ist noch nicht akut, Angebot wirkt unklar oder Sie wollen eine zweite Einschaetzung.",
    cta: "Zweite Einschaetzung starten",
  },
  {
    id: "absichern",
    title: "Absichern",
    text: "Termin rueckt naeher, Anbieter wirkt unsicher oder Reinigung/Raeumung ist noch offen.",
    cta: "Ablauf absichern",
  },
  {
    id: "plan_b_noetig",
    title: "Plan B noetig",
    text: "Deadline ist nah, Anbieter/Helfer faellt aus oder mehrere Punkte blockieren die Uebergabe.",
    cta: "Plan B dringend pruefen",
  },
];

const packageOptions = [
  "Ersatztransport",
  "Reinigungs-Backup",
  "Raeumungs-Backup",
  "Uebergabe-Backup",
  "Komplett-Plan-B",
  "Duesseldorf Reinigung/Entsorgung",
  "Diskreter Rueckruf",
];

const openItemOptions = [
  "Anbieter meldet sich nicht",
  "Helfer / Transporter unsicher",
  "Angebot unvollstaendig",
  "Termin knapp",
  "Reinigung vergessen",
  "Keller / Sperrmuell offen",
  "Schluessel / Uebergabe unklar",
  "Preisrahmen unrealistisch",
  "zweite Absicherung gewuenscht",
  "Fotos vorhanden",
  "Budget vorhanden",
  "Düsseldorf passend zum Anliegen",
];

const previousSourceOptions = [
  "Plattform",
  "lokaler Anbieter",
  "privat organisiert",
  "moechte ich nicht angeben",
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

function validateOfferFiles(files: File[]) {
  const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
  const invalidType = files.find((file) => !allowed.includes(file.type));
  if (invalidType) return "Bitte vorhandene Angebote nur als PDF, JPG, PNG oder WebP hochladen.";
  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Angebotsdateien unter 12 MB hochladen oder per WhatsApp senden.";
  return "";
}

export function PlanBServiceForm() {
  const [riskLevel, setRiskLevel] = useState("absichern");
  const [uncertainArea, setUncertainArea] = useState("mehrere Punkte");
  const [desiredPackage, setDesiredPackage] = useState("Komplett-Plan-B");
  const [selectedOpenItems, setSelectedOpenItems] = useState<string[]>([
    "Angebot unvollstaendig",
    "Termin knapp",
    "zweite Absicherung gewuenscht",
  ]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [offerFiles, setOfferFiles] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappHref = useMemo(() => {
    const text =
      uncertainArea.includes("Duesseldorf") || uncertainArea.includes("Düsseldorf")
        ? "Hallo FLOXANT, ich brauche einen Plan B fuer Reinigung/Entsorgung in Duesseldorf. Ort, Termin und Fotos kann ich senden."
        : "Hallo FLOXANT, ich brauche einen Plan B. Mein aktueller Ablauf ist unsicher. Es geht um [Umzug/Reinigung/Entruempelung/Uebergabe] in [Ort]. Deadline: [Datum]. Fotos/Angebot/offene Punkte kann ich senden.";
    return `https://wa.me/${PHONE_TEL.replace("+", "")}?text=${encodeURIComponent(text)}`;
  }, [uncertainArea]);

  function toggleItem(value: string) {
    setSelectedOpenItems((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
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
    const deadline = String(formData.get("deadline") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT reagieren kann.");
      return;
    }
    if (!cityOrZip) {
      setErrorMessage("Bitte Ort oder PLZ angeben.");
      return;
    }
    if (!deadline) {
      setErrorMessage("Bitte Deadline, Termin oder Wunschzeitraum angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte kurz beschreiben, warum Plan A unsicher ist.");
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
    const offerError = validateOfferFiles(offerFiles);
    if (offerError) {
      setErrorMessage(offerError);
      return;
    }

    formData.set("type", "plan_b_service");
    formData.set("lead_type", "plan_b_service");
    formData.set("service", "plan_b_service");
    formData.set("riskLevel", riskLevel);
    formData.set("uncertainArea", uncertainArea);
    formData.set("problemType", uncertainArea);
    formData.set("desiredPlanBPackage", desiredPackage);
    formData.set("requestType", desiredPackage);
    formData.set("selectedOpenItems", JSON.stringify(selectedOpenItems));
    formData.set("selectedAddons", JSON.stringify([desiredPackage, ...selectedOpenItems]));
    formData.set("region", "regensburg_bayern_duesseldorf_cleaning_disposal");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "plan_b_service");
    formData.set("source", "plan_b_service");
    formData.set("sourceComponent", "plan_b_form");
    formData.set("sourceContext", riskLevel);
    formData.set("sourcePage", "/plan-b-service");
    formData.set("landingPage", typeof window === "undefined" ? "/plan-b-service" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    photos.forEach((file) => formData.append("planBPhoto", file));
    offerFiles.forEach((file) => formData.append("planBOfferFile", file));

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", { method: "POST", body: formData });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || result.error || "Die Anfrage konnte nicht gesendet werden.");

      form.reset();
      setRiskLevel("absichern");
      setUncertainArea("mehrere Punkte");
      setDesiredPackage("Komplett-Plan-B");
      setSelectedOpenItems(["Angebot unvollstaendig", "Termin knapp", "zweite Absicherung gewuenscht"]);
      setPhotos([]);
      setOfferFiles([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="plan-b-form" className="rounded-[2rem] border border-blue-200 bg-white p-5 shadow-2xl shadow-blue-950/10 sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
        <ShieldCheck className="h-4 w-4" />
        Backup-Control
      </div>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Plan B pruefen lassen</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Kurze Angaben reichen fuer den Start. FLOXANT prueft nach Verfuegbarkeit, ob ein Ersatz- oder Ergaenzungsplan realistisch ist.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {riskLevels.map((level) => {
          const active = riskLevel === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setRiskLevel(level.id)}
              data-event="service_card_click"
              data-risk-level={level.id}
              className={`rounded-[1.2rem] border p-4 text-left transition ${
                active ? "border-blue-600 bg-blue-50 text-blue-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200"
              }`}
            >
              <span className="block text-sm font-black">{level.title}</span>
              <span className="mt-1 block text-xs leading-5">{level.text}</span>
              <span className="mt-3 block text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">{level.cta}</span>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="fuer schnelle Rueckfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ort / PLZ*
            <input name="cityOrZip" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Regensburg, Kelheim, Duesseldorf..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Was ist unsicher?*
            <select
              name="uncertainArea"
              value={uncertainArea}
              onChange={(event) => setUncertainArea(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500"
            >
              {uncertainOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Deadline / Termin*
            <input name="deadline" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. diese Woche, Uebergabe am..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Gewuenschtes Plan-B-Paket
            <select
              name="desiredPlanBPackage"
              value={desiredPackage}
              onChange={(event) => setDesiredPackage(event.target.value)}
              data-event="service_card_click"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500"
            >
              {packageOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Bisherige Organisation optional
            <select name="previousOfferSource" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              {previousSourceOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Startort bei Transport
            <input name="startLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="falls relevant" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zielort bei Transport
            <input name="destinationLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="falls relevant" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. 3. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500">
              <option value="">Bitte waehlen</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Umfang / Volumen
            <input name="estimatedVolume" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="z. B. 20 Kartons, Keller, 2 Zimmer" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <input name="budget" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="falls vorhanden" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-slate-900">
            <CheckCircle2 className="h-4 w-4 text-blue-700" />
            Warum braucht es Plan B?
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {openItemOptions.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={selectedOpenItems.includes(item)}
                  onChange={() => toggleItem(item)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugang / Trageweg / Besonderheiten
            <textarea name="accessNotes" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Parken, Hausflur, Etage, Schluessel, Zugang..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Kurze Beschreibung*
            <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Warum wirkt Plan A unsicher? Was muss bis wann abgesichert werden?" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/70 p-4 shadow-sm shadow-slate-950/5">
          <div className="mb-4">
            <p className="text-sm font-black text-slate-950">Dateien fuer den Plan-B-Check</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Fotos und vorhandene Angebote bleiben getrennt. So sieht FLOXANT schnell, ob Umfang, Zustand oder Angebot geprueft werden soll.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <UploadDropCard
              title="Fotos optional"
              description="Umfang, Zugang, Restmenge oder Zustand."
              helper="JPG, PNG oder WebP bis 12 MB je Datei."
              accept="image/jpeg,image/png,image/webp"
              files={photos}
              dataEvent="upload_plan_b_photos"
              tone="emerald"
              onFilesChange={setPhotos}
            />
            <UploadDropCard
              title="Vorhandenes Angebot optional"
              description="PDF, Screenshot oder Angebotsbild."
              helper="Sensible Angebotsdetails können Sie nach persönlicher Abstimmung ergänzen."
              accept="application/pdf,image/jpeg,image/png,image/webp"
              files={offerFiles}
              dataEvent="upload_plan_b_offer"
              onFilesChange={setOfferFiles}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
            <input name="preferredContact" type="checkbox" value="whatsapp" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            <span>WhatsApp bevorzugt</span>
          </label>
          <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            <span>Rueckruf gewuenscht</span>
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          <span>Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung dieser Anfrage verarbeitet. Sensible Zugangsdaten oder persönliche Dokumente bitte nicht mitsenden.</span>
        </label>

        {errorMessage ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div> : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
            Danke. Ihre Plan-B-Anfrage ist eingegangen. FLOXANT prueft Ort, Termin, offene Punkte, Fotos und Verfuegbarkeit. Wenn ein Ersatz- oder Ergaenzungsplan moeglich ist oder Rueckfragen noetig sind, melden wir uns.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <button type="submit" disabled={isSubmitting} data-event="form_submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Plan B pruefen lassen
          </button>
          <a href={whatsappHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100" data-event="whatsapp_click">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>

        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
          Keine Notdienst- oder Soforteinsatzgarantie. Machbarkeit haengt von Ort, Termin, Umfang und Kapazitaet ab. Direktkontakt:{" "}
          <a href={`tel:${PHONE_TEL}`} className="font-black text-slate-950" data-event="phone_click">{PHONE_DISPLAY}</a>
          {" "}- {EMAIL}
        </div>
      </form>
    </div>
  );
}
