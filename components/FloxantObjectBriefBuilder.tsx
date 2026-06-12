"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  KeyRound,
  ListChecks,
  MapPin,
  MessageCircle,
  Target,
  WalletCards,
} from "lucide-react";

import { company } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type RegionKey = "duesseldorf" | "regensburg";

const regionOptions = {
  duesseldorf: {
    label: "Düsseldorf",
    text: "Reinigung für Büro, Praxis, Gewerbefläche, Wohnung und Übergabe.",
    services: [
      "Gewerbereinigung",
      "Büroreinigung",
      "Praxisreinigung",
      "Treppenhausreinigung",
      "Endreinigung",
      "Angebot prüfen lassen",
    ],
    goals: [
      "Laufende Reinigung sauber starten",
      "Übergabe oder Auszug vorbereiten",
      "Kurzfristige Machbarkeit klären",
      "Vorhandenes Angebot einordnen",
    ],
  },
  regensburg: {
    label: "Regensburg",
    text: "Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe.",
    services: [
      "Umzug",
      "Entrümpelung",
      "Haushaltsauflösung",
      "Endreinigung",
      "Übergabevorbereitung",
      "Umzug + Reinigung",
    ],
    goals: [
      "Wohnungswechsel vorbereiten",
      "Räumung und Entsorgung klären",
      "Übergabe besenrein vorbereiten",
      "Kombination aus Leistung und Reinigung planen",
    ],
  },
} as const;

const accessOptions = [
  "Ich bin vor Ort",
  "Schlüsselweg muss geklärt werden",
  "Ansprechpartner vor Ort vorhanden",
  "Zugang nur zu bestimmten Zeiten",
] as const;

const urgencyOptions = [
  "Nicht dringend",
  "Diese Woche",
  "Heute oder morgen",
  "Fester Übergabetermin",
] as const;

const serviceLinks: Record<RegionKey, Record<string, string>> = {
  duesseldorf: {
    Gewerbereinigung: "/duesseldorf/gewerbereinigung",
    Büroreinigung: "/duesseldorf/bueroreinigung",
    Praxisreinigung: "/duesseldorf/praxisreinigung",
    Treppenhausreinigung: "/duesseldorf/treppenhausreinigung",
    Endreinigung: "/duesseldorf/endreinigung",
    "Angebot prüfen lassen": "/angebot-vergleichen-duesseldorf",
  },
  regensburg: {
    Umzug: "/regensburg/umzug",
    Entrümpelung: "/regensburg/entruempelung",
    Haushaltsauflösung: "/regensburg/haushaltsaufloesung",
    Endreinigung: "/regensburg/endreinigung",
    Übergabevorbereitung: "/regensburg/uebergabereinigung",
    "Umzug + Reinigung": "/regensburg/umzug-reinigung",
  },
};

function codePart(value: string, fallback: string, maxLength = 6) {
  const cleaned = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 3).toUpperCase())
    .join("");

  return (cleaned || fallback).slice(0, maxLength);
}

function deadlineCode(value: string) {
  const normalized = value.toLowerCase();

  if (normalized.includes("heute") || normalized.includes("morgen")) return "SOFORT";
  if (normalized.includes("woche")) return "WOCHE";
  if (normalized.includes("übergabe") || normalized.includes("uebergabe")) return "UEB";
  return "PLAN";
}

function locationCode(value: string) {
  const zip = value.match(/\d{4,5}/)?.[0];
  if (zip) return zip.slice(0, 3);
  return codePart(value, "ORT", 4);
}

export function FloxantObjectBriefBuilder() {
  const [region, setRegion] = useState<RegionKey>("duesseldorf");
  const [service, setService] = useState<string>(regionOptions.duesseldorf.services[0]);
  const [goal, setGoal] = useState<string>(regionOptions.duesseldorf.goals[0]);
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState<string>(urgencyOptions[1]);
  const [access, setAccess] = useState<string>(accessOptions[0]);
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const selectedRegion = regionOptions[region];

  const readinessChecks = useMemo(
    () => [
      { label: "Region", done: Boolean(region) },
      { label: "Leistung", done: Boolean(service) },
      { label: "Ziel", done: Boolean(goal) },
      { label: "Ort oder PLZ", done: location.trim().length >= 2 },
      { label: "Terminlage", done: Boolean(deadline) },
      { label: "Zugang", done: Boolean(access) },
      { label: "Budget", done: budget.trim().length > 0 },
      { label: "Beschreibung", done: notes.trim().length >= 8 },
      { label: "Fotos oder Angebot", done: attachmentCount > 0 },
    ],
    [access, attachmentCount, budget, deadline, goal, location, notes, region, service],
  );
  const requiredChecks = readinessChecks.slice(0, 6);
  const doneCount = readinessChecks.filter((item) => item.done).length;
  const requiredDone = requiredChecks.every((item) => item.done);
  const readinessScore = Math.round((doneCount / readinessChecks.length) * 100);
  const readinessLabel =
    readinessScore >= 80
      ? "Sehr gut vorbereitet"
      : requiredDone
        ? "Bereit für die erste Prüfung"
    : "Noch kurz ergänzen";
  const missingHints = readinessChecks.filter((item) => !item.done).map((item) => item.label);
  const nextAdvice = requiredDone
    ? attachmentCount > 0
      ? "Sie können die WhatsApp-Nachricht starten und die ausgewählten Dateien direkt im Chat senden."
      : "Sie können bereits starten. Fotos oder ein vorhandenes Angebot können Sie danach im Chat ergänzen."
    : "Für den Start fehlen noch Ziel, Ort oder PLZ, Terminlage oder Zugang. Danach ist die Anfrage deutlich klarer.";

  const objectCode = useMemo(() => {
    const regionCode = region === "duesseldorf" ? "DUS" : "REG";
    const serviceCode = codePart(service, "SERVICE", 6);
    const goalCode = codePart(goal, "ZIEL", 5);
    const timeCode = deadlineCode(deadline);
    const placeCode = locationCode(location);

    return `FLOX-${regionCode}-${serviceCode}-${goalCode}-${timeCode}-${placeCode}`;
  }, [deadline, goal, location, region, service]);

  const message = useMemo(
    () =>
      [
        `Hallo FLOXANT ${selectedRegion.label},`,
        "ich möchte einen Objektbrief senden.",
        `Anfrage-Kurzzeichen: ${objectCode}`,
        `Region: ${selectedRegion.label}`,
        `Leistung: ${service}`,
        `Ziel: ${goal}`,
        `Ort / PLZ: ${location || "[bitte eintragen]"}`,
        `Termin / Deadline: ${deadline}`,
        `Zugang: ${access}`,
        `Budgetrahmen: ${budget || "noch offen"}`,
        `Kurzbeschreibung: ${notes || "[Fotos, Zustand und offene Punkte folgen]"}`,
        `Unterlagen: ${
          attachmentCount > 0
            ? `${attachmentCount} Datei${attachmentCount === 1 ? "" : "en"} ausgewählt`
            : "Fotos oder Angebot folgen bei Bedarf"
        }`,
        "Fotos oder ein vorhandenes Angebot kann ich im Chat senden.",
      ].join("\n"),
    [access, attachmentCount, budget, deadline, goal, location, notes, objectCode, selectedRegion.label, service],
  );

  const whatsappHref = buildWhatsAppHref(company.phoneRaw, message);
  const serviceHref = serviceLinks[region][service] || (region === "duesseldorf" ? "/duesseldorf/reinigung" : "/regensburg");
  const nextAction = useMemo(() => {
    const urgent = deadline.includes("Heute") || deadline.includes("morgen") || deadline.includes("Diese Woche");

    if (service.includes("Angebot") || goal.includes("Angebot")) {
      return {
        label: "Angebot vergleichbar machen",
        text: "Senden Sie das vorhandene Angebot zusammen mit Fotos, Ort, Umfang und Termin. Wichtig ist, ob Leistungen wirklich vergleichbar beschrieben sind.",
      };
    }

    if (goal.includes("Übergabe") || deadline.includes("Übergabetermin")) {
      return {
        label: "Übergabe zuerst absichern",
        text: "Nennen Sie Deadline, Schlüsselweg, Zustand und offene Punkte. Fotos von Küche, Bad, Boden, Keller oder Restmengen helfen besonders.",
      };
    }

    if (urgent) {
      return {
        label: "Machbarkeit schnell klären",
        text: "Bei kurzfristigen Terminen zählen klare Prioritäten: Was muss unbedingt erledigt werden, wer öffnet das Objekt und bis wann wird Rückmeldung gebraucht?",
      };
    }

    if (region === "duesseldorf") {
      return {
        label: "Reinigungsumfang sauber festlegen",
        text: "Für Düsseldorf sind Objektart, Fläche, Turnus, Zeitfenster, Zugang und Fotos entscheidend. So wird aus einer Anfrage ein planbarer Reinigungsfall.",
      };
    }

    return {
      label: "Leistungen sinnvoll kombinieren",
      text: "Für Regensburg lohnt sich die Kombination aus Umzug, Räumung, Entsorgung, Endreinigung und Übergabevorbereitung oft besonders.",
    };
  }, [deadline, goal, region, service]);

  function selectRegion(nextRegion: RegionKey) {
    setRegion(nextRegion);
    setService(regionOptions[nextRegion].services[0]);
    setGoal(regionOptions[nextRegion].goals[0]);
    setCopied(false);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Objektbrief starten
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            In zwei Minuten eine bessere Anfrage vorbereiten.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
            Sie müssen keine perfekte Beschreibung vorbereiten. Wählen Sie Region, Leistung,
            Terminlage und Zugang aus, ergänzen Sie Ort, Fotos oder Budgetrahmen und senden Sie
            daraus eine klare WhatsApp-Anfrage.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-4">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950">
                  <MapPin className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  Region wählen
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Object.keys(regionOptions) as RegionKey[]).map((key) => {
                    const option = regionOptions[key];
                    const active = region === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => selectRegion(key)}
                        className={`rounded-lg border p-4 text-left transition ${
                          active
                            ? "border-blue-600 bg-blue-50 text-slate-950"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                        }`}
                        data-event="region_select"
                        data-region={key}
                        data-source="object_brief_builder"
                      >
                        <span className="block text-base font-black">{option.label}</span>
                        <span className="mt-2 block text-sm font-semibold leading-6">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950">
                  <Target className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  Ziel der Anfrage
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedRegion.goals.map((item) => {
                    const active = goal === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setGoal(item);
                          setCopied(false);
                        }}
                        className={`rounded-lg border p-4 text-left text-sm font-black leading-6 transition ${
                          active
                            ? "border-blue-600 bg-blue-50 text-slate-950"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                        }`}
                        data-event="service_card_click"
                        data-region={region}
                        data-source="object_brief_goal"
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
                    <ClipboardCheck className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    Leistung
                  </span>
                  <select
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {selectedRegion.services.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
                    <MapPin className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    Ort / PLZ
                  </span>
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="z. B. Düsseldorf 40213 oder Regensburg 93049"
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
                    <FileText className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    Terminlage
                  </span>
                  <select
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {urgencyOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
                    <KeyRound className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    Zugang
                  </span>
                  <select
                    value={access}
                    onChange={(event) => setAccess(event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {accessOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
                    <WalletCards className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    Budgetrahmen
                  </span>
                  <input
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    placeholder="optional, z. B. 500 bis 800 Euro"
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
                    <Building2 className="h-4 w-4 text-blue-700" aria-hidden="true" />
                    Kurzbeschreibung
                  </span>
                  <input
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="z. B. Büro 180 m², Fotos vorhanden, Schlüssel über Empfang"
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <label className="block rounded-lg border border-dashed border-blue-200 bg-blue-50/70 p-4">
                  <span className="flex items-start gap-3">
                    <Camera className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-black text-slate-950">
                        Fotos oder Angebot vormerken
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-6 text-slate-600">
                        Wählen Sie Bilder, Screenshots oder ein Angebot aus. Die Dateien werden hier
                        nicht hochgeladen, sondern für den Versand per WhatsApp vorbereitet.
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={(event) => setAttachmentCount(event.currentTarget.files?.length || 0)}
                    className="mt-4 block w-full cursor-pointer rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-sm file:font-black file:text-white"
                    data-event="upload_started"
                    data-change-event="upload_completed"
                    data-region={region}
                    data-source="object_brief_builder"
                  />
                </label>

                <div
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  data-region={region}
                  data-source="object_brief_builder"
                >
                  <p className="text-sm font-black text-slate-950">Unterlagen-Status</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {attachmentCount > 0
                      ? `${attachmentCount} Datei${attachmentCount === 1 ? "" : "en"} ausgewählt. Senden Sie diese nach dem WhatsApp-Start direkt im Chat.`
                      : "Noch keine Datei ausgewählt. Fotos sind optional, machen die Rückmeldung aber oft deutlich schneller."}
                  </p>
                  {attachmentCount > 0 ? (
                    <p
                      className="mt-3 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800"
                      data-event="upload_completed"
                      data-region={region}
                      data-source="object_brief_builder"
                    >
                      Dateien für den Objektbrief vorgemerkt
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
                    Hilfreich: Übersicht, Problemstellen, Zugang, Treppenhaus, Boden, Küche,
                    Bad oder vorhandenes Angebot.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-6">
            <p className="text-sm font-black uppercase tracking-normal text-cyan-100">
              Vorschau
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-normal">
              So kommt Ihre Anfrage bei FLOXANT an.
            </h3>

            <div className="mt-5 rounded-lg border border-cyan-200/25 bg-cyan-300/10 p-4">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-100">
                <FileText className="h-4 w-4" aria-hidden="true" />
                FLOXANT Anfrage-Kurzzeichen
              </div>
              <div className="mt-3 rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 font-mono text-lg font-black tracking-normal text-white">
                {objectCode}
              </div>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-300">
                Dieses Kurzzeichen können Sie im Chat, am Telefon oder im Formular nennen.
                So erkennt FLOXANT Ihre Angaben schneller wieder.
              </p>
            </div>

            <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-emerald-100">
                <Target className="h-4 w-4" aria-hidden="true" />
                Empfohlener nächster Schritt
              </div>
              <h4 className="mt-3 text-xl font-black text-white">{nextAction.label}</h4>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-200">{nextAction.text}</p>
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-white/8 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-100">
                    <ListChecks className="h-4 w-4" aria-hidden="true" />
                    Startklarheit
                  </div>
                  <p className="mt-2 text-lg font-black text-white">{readinessLabel}</p>
                </div>
                <div className="rounded-lg border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-2xl font-black text-cyan-50">
                  {readinessScore}%
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-300">{nextAdvice}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {readinessChecks.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black ${
                      item.done
                        ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                        : "border-white/10 bg-white/[0.06] text-slate-300"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${item.done ? "text-emerald-300" : "text-slate-500"}`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </div>
                ))}
              </div>
              {missingHints.length ? (
                <p className="mt-3 text-xs font-semibold leading-6 text-slate-400">
                  Noch offen: {missingHints.join(", ")}.
                </p>
              ) : null}
            </div>

            <pre className="mt-5 whitespace-pre-wrap rounded-lg border border-white/10 bg-white/8 p-4 text-sm font-semibold leading-7 text-slate-100">
              {message}
            </pre>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                data-event="whatsapp_click"
                data-region={region}
                data-source="object_brief_builder"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Objektbrief per WhatsApp senden
              </a>
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                data-event="hero_cta_click"
                data-region={region}
                data-source="object_brief_copy"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {copied ? "Nachricht kopiert" : "Nachricht kopieren"}
              </button>
              <Link
                href={serviceHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200/30 bg-cyan-300/10 px-5 text-sm font-black text-cyan-50 transition hover:bg-cyan-300/15"
                data-event="service_card_click"
                data-region={region}
                data-source="object_brief_service_link"
              >
                Passende Leistungsseite öffnen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
                data-event="hero_cta_click"
                data-region={region}
                data-source="object_brief_builder"
              >
                Kontaktseite öffnen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-5 text-xs font-semibold leading-6 text-slate-300">
              Die Anfrage bleibt kostenlos und unverbindlich. Ein Budgetrahmen ist eine Orientierung,
              keine Preisgarantie und keine automatische Zusage.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
