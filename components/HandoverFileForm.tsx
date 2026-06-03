"use client";

import { type Dispatch, FormEvent, type SetStateAction, useMemo, useState } from "react";
import { ArrowRight, Camera, CheckCircle2, FileText, KeyRound, Loader2, Mail, Phone } from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const objectTypeOptions = ["Wohnung", "Haus", "Zimmer", "Keller", "Garage", "Buero / Gewerbeflaeche", "Sonstiges"];

const roleTypeOptions = ["Privatkunde", "Vermieter", "Hausverwaltung", "Makler", "Eigentuemer", "Unternehmen", "Sonstiges"];

const serviceOptions = [
  "Uebergabeakte allein anfragen",
  "Uebergabeakte mit Endreinigung",
  "Uebergabeakte mit Schluesseluebergabe",
  "Uebergabeakte mit Entruempelung",
  "Uebergabeakte mit Entsorgung",
  "Uebergabeakte mit Umzug",
  "Uebergabeakte im Mieterwechsel-Service",
  "Uebergabeakte + Wohnung wieder vermietbar",
  "Diskrete Abstimmung",
];

const additionalSpaceOptions = ["Keller", "Garage", "Dachboden", "Balkon", "Muellraum"];

const documentationScopeOptions = [
  "Foto-Dokumentation",
  "Leistungsuebersicht",
  "Schluesselstatus",
  "Offene Hinweise",
  "Oeffentliche Zusammenfassung",
];

const photoSectionOptions = ["Kueche", "Bad", "Boeden", "Raeume", "Keller", "Garage", "Zugang", "Gegenstaende", "Sonstiges"];

const openItemOptions = ["Reinigung pruefen", "Nebenraeume offen", "Schluesselstatus unklar", "Empfaenger offen", "Fotos fehlen", "Termin kritisch"];

const quickEntries = [
  {
    value: "move_out",
    title: "Auszug dokumentieren",
    text: "Reinigung, Restpunkte, Fotos und Schluesselstatus vor der Uebergabe einordnen.",
    Icon: FileText,
  },
  {
    value: "key_handover",
    title: "Schluesselstatus klaeren",
    text: "Wenn Schluessel, Zugang oder Uebergabetermin sauber abgestimmt werden sollen.",
    Icon: KeyRound,
  },
  {
    value: "photo_documentation",
    title: "Fotos mitdenken",
    text: "Wenn sichtbare Punkte nach Absprache dokumentiert werden sollen.",
    Icon: Camera,
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

export function HandoverFileForm() {
  const [quickEntry, setQuickEntry] = useState("move_out");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Uebergabeakte mit Endreinigung"]);
  const [additionalSpaces, setAdditionalSpaces] = useState<string[]>([]);
  const [documentationScope, setDocumentationScope] = useState<string[]>(["Foto-Dokumentation", "Leistungsuebersicht", "Schluesselstatus"]);
  const [photoSections, setPhotoSections] = useState<string[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich moechte eine Uebergabeakte anfragen. Es geht um ein Objekt in [Ort]. Gewuenscht sind Dokumentation, Fotos/Schluesselstatus/Endreinigung/Uebergabevorbereitung nach Absprache. Termin und Details kann ich senden.",
      ),
    [],
  );

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
  }

  function toggleAdditionalSpace(space: string) {
    setAdditionalSpaces((current) =>
      current.includes(space) ? current.filter((item) => item !== space) : [...current, space],
    );
  }

  function toggleValue(value: string, setter: Dispatch<SetStateAction<string[]>>) {
    setter((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
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
      setErrorMessage("Bitte Ort oder PLZ des Objekts angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Zeitraum oder Uebergabetermin angeben.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens eine gewuenschte Leistung auswaehlen.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte kurz beschreiben, was dokumentiert oder kombiniert werden soll.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestaetigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const fileError = validateImageFiles(photos);
    if (fileError) {
      setErrorMessage(fileError);
      return;
    }

    formData.set("type", "handover_file");
    formData.set("lead_type", "uebergabeakte");
    formData.set("service", "uebergabeakte");
    formData.set("quickEntry", quickEntry);
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("additionalSpaces", JSON.stringify(additionalSpaces));
    formData.set("documentationScope", JSON.stringify(documentationScope));
    formData.set("photoSections", JSON.stringify(photoSections));
    formData.set("openItems", JSON.stringify(openItems));
    formData.set("handoverFileRequested", "true");
    formData.set("fileStatus", "daten_fehlen");
    formData.set("exportStatus", "nicht_vorbereitet");
    formData.set("sourceFlow", "uebergabeakte_page");
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "handover_file");
    formData.set("source", "handover_file");
    formData.set("landingPage", typeof window === "undefined" ? "/uebergabeakte" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("handoverPhoto", file));

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
      setSelectedServices(["Uebergabeakte mit Endreinigung"]);
      setAdditionalSpaces([]);
      setDocumentationScope(["Foto-Dokumentation", "Leistungsuebersicht", "Schluesselstatus"]);
      setPhotoSections([]);
      setOpenItems([]);
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="uebergabeakte-form" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
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
                active ? "border-amber-500 bg-amber-50 text-amber-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-200"
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
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Ihr Name / Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="fuer schnelle Rueckfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Rolle optional
            <select name="roleType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500">
              {roleTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ort / PLZ*
            <input name="objectLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. Regensburg, 93047" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektlabel optional
            <input name="objectLabel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. Wohnung EG links / Objekt 12" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Objektart*
            <select name="objectType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500">
              {objectTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zeitraum / Uebergabetermin*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. vor 15.06. oder diese Woche" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-950">Gewuenschte Leistung*</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((service) => (
              <label key={service} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} data-event="service_card_click" className="h-4 w-4 rounded border-slate-300 text-amber-600" />
                {service}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-amber-100 bg-amber-50/70 p-4">
          <p className="text-sm font-black text-amber-950">Gewuenschte Bestandteile der Akte</p>
          <p className="mt-1 text-xs leading-5 text-amber-800">Auswahl dient der Vorbereitung. Der genaue Umfang wird vor Auftragserteilung abgestimmt.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {documentationScopeOptions.map((scope) => (
              <label key={scope} className="flex items-center gap-2 rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={documentationScope.includes(scope)}
                  onChange={() => toggleValue(scope, setDocumentationScope)}
                  data-event="service_card_click"
                  className="h-4 w-4 rounded border-slate-300 text-amber-600"
                />
                {scope}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Anzahl Raeume
            <input name="roomsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. 3" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage optional
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. 2. OG, Aufzug ja/nein" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Schluesselstatus
            <select name="keyStatus" data-event="service_card_click" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500">
              <option value="nicht_relevant">Nicht relevant</option>
              <option value="schluessel_beim_kunden">Schluessel bei Kunde</option>
              <option value="bei_floxant_uebernommen">Bei FLOXANT uebernommen</option>
              <option value="schluessel_beim_vermieter">Schluessel bei Vermieter/Hausverwaltung</option>
              <option value="uebergeben_an_empfaenger">Uebergeben an Vermieter/Hausverwaltung/Makler</option>
              <option value="uebergabe_geplant">Uebergabe geplant</option>
              <option value="schluesseluebergabe_gewuenscht">Schluesseluebergabe gewuenscht</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Empfaenger der Akte
            <select name="recipientType" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500">
              <option value="kunde">Nur Kunde</option>
              <option value="vermieter">Vermieter</option>
              <option value="hausverwaltung">Hausverwaltung</option>
              <option value="makler">Makler</option>
              <option value="offen">Noch offen</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Schluesseltermin optional
            <input name="keyHandoverDate" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. 14.06., 10 Uhr" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Schluessel-Empfaenger optional
            <input name="keyHandoverRecipient" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="z. B. Hausverwaltung / Makler" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugangshinweise optional
            <input name="accessNotes" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Zugang, Aufzug, Ansprechpartner" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-950">Nebenraeume optional</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {additionalSpaceOptions.map((space) => (
              <label key={space} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={additionalSpaces.includes(space)} onChange={() => toggleAdditionalSpace(space)} className="h-4 w-4 rounded border-slate-300 text-amber-600" />
                {space}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-950">Fotobereiche optional</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {photoSectionOptions.map((section) => (
                <label key={section} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                  <input type="checkbox" checked={photoSections.includes(section)} onChange={() => toggleValue(section, setPhotoSections)} className="h-4 w-4 rounded border-slate-300 text-amber-600" />
                  {section}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-950">Offene Punkte optional</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {openItemOptions.map((item) => (
                <label key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                  <input type="checkbox" checked={openItems.includes(item)} onChange={() => toggleValue(item, setOpenItems)} className="h-4 w-4 rounded border-slate-300 text-amber-600" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <textarea name="budget" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Falls ein Rahmen oder Kostenziel bekannt ist." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Besondere Hinweise
            <textarea name="specialNotes" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Zugang, Ansprechpartner, offene Punkte, sensible Abstimmung." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Schluesselnotiz optional
            <textarea name="keyNotes" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Was soll zum Schluesselstatus abgestimmt werden?" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Gewuenschte Zusammenfassung optional
            <textarea name="publicSummary" rows={3} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Welche Punkte sollen spaeter in der Akte sichtbar zusammengefasst werden?" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-yellow-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Raeume, Nebenraeume, Schluesselstatus oder sichtbare Punkte."
            helper="Fotos helfen bei der Dokumentationsabstimmung, wenn sie nach Absprache genutzt werden sollen."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_handover_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Kurze Beschreibung*
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-amber-500" placeholder="Was soll dokumentiert werden? Welche Leistungen sollen mit der Uebergabeakte kombiniert werden?" />
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600" />
          Rueckruf zur Abstimmung der Uebergabeakte gewuenscht.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600" />
          Ich bin damit einverstanden, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. Die Uebergabeakte ist eine organisatorische Dokumentation und ersetzt keine rechtliche Pruefung.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Anfrage zur FLOXANT Uebergabeakte ist eingegangen. Wir pruefen Objektart, Termin, gewuenschte Leistungen und Dokumentationsumfang. Wenn Angaben fehlen, melden wir uns mit Rueckfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Uebergabeakte anfragen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="whatsapp_click"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Uebergabeakte per WhatsApp anfragen
          </a>
        </div>

        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <a href={`tel:${PHONE_TEL}`} data-event="phone_click" className="inline-flex items-center gap-2 transition hover:text-amber-700">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} data-event="hero_cta_click" className="inline-flex items-center gap-2 transition hover:text-amber-700">
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </div>
      </form>
    </div>
  );
}
