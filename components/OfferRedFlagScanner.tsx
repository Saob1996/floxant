"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  MessageCircle,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

export type RedFlagScoreLevel = "gering" | "mittel" | "hoch";

export interface RedFlagScannerResult {
  completed: boolean;
  scoreLevel: RedFlagScoreLevel;
  scoreLabel: string;
  scoreValue: number;
  categories: string[];
  items: string[];
  summary: string;
}

interface RedFlagQuestion {
  id: string;
  label: string;
}

interface RedFlagCategory {
  id: string;
  title: string;
  text: string;
  questions: RedFlagQuestion[];
}

const redFlagCategories: RedFlagCategory[] = [
  {
    id: "umfang",
    title: "Umfang",
    text: "Leistungen, Ausschluesse, Menge und Fotos sollten nachvollziehbar sein.",
    questions: [
      { id: "umfang_leistungen", label: "Welche Leistungen genau enthalten sind" },
      { id: "umfang_ausschluesse", label: "Welche Zusatzleistungen ausgeschlossen sind" },
      { id: "umfang_moebel_kartons", label: "Moebel, Kartons oder Volumen beschrieben sind" },
      { id: "umfang_fotos", label: "Fotos oder Besichtigung beruecksichtigt sind" },
    ],
  },
  {
    id: "zugang",
    title: "Zugang / Etage / Trageweg",
    text: "Etage, Aufzug und Laufwege beeinflussen Aufwand und Preis stark.",
    questions: [
      { id: "zugang_etage", label: "Etage am Start oder Ziel genannt ist" },
      { id: "zugang_aufzug", label: "Aufzug beruecksichtigt ist" },
      { id: "zugang_trageweg", label: "Trageweg oder schwieriger Zugang erwaehnt ist" },
      { id: "zugang_adressen", label: "Start und Ziel grob beruecksichtigt sind" },
    ],
  },
  {
    id: "fahrzeug",
    title: "Fahrzeug / Volumen / Fahrten",
    text: "Unklare Fahrzeug- oder Volumenangaben fuehren oft zu Zusatzfahrten.",
    questions: [
      { id: "fahrzeug_anzahl", label: "Fahrzeug oder Anzahl der Fahrten klar ist" },
      { id: "fahrzeug_volumen", label: "Volumen realistisch beschrieben ist" },
      { id: "fahrzeug_zusatzfahrten", label: "Zusatzfahrten geregelt sind" },
      { id: "fahrzeug_schwer", label: "Grosse oder schwere Gegenstaende genannt sind" },
    ],
  },
  {
    id: "termin",
    title: "Termin / Zeitfenster",
    text: "Termin, Dauer und Deadline sollten vor der Zusage greifbar sein.",
    questions: [
      { id: "termin_datum", label: "Datum oder Zeitraum eindeutig ist" },
      { id: "termin_dauer", label: "Dauer oder Zeitfenster genannt ist" },
      { id: "termin_verzoegerung", label: "Verzoegerung oder Mehrzeit geregelt ist" },
      { id: "termin_uebergabe", label: "Uebergabetermin beruecksichtigt ist" },
    ],
  },
  {
    id: "parken",
    title: "Zugang / Parken",
    text: "Parken entscheidet, ob der Ablauf planbar bleibt.",
    questions: [
      { id: "parken_halteverbot", label: "Zugang oder Parken geklaert ist" },
      { id: "parken_organisation", label: "Wer die Zugangslage prueft" },
      { id: "parken_situation", label: "Park- oder Zugangssituation beschrieben ist" },
      { id: "parken_kosten", label: "Zusatzkosten fuer Parken geregelt sind" },
    ],
  },
  {
    id: "reinigung_uebergabe",
    title: "Reinigung / Uebergabe",
    text: "Reinigung und Uebergabe sind oft nicht automatisch enthalten.",
    questions: [
      { id: "reinigung_enthalten", label: "Reinigung enthalten oder ausgeschlossen ist" },
      { id: "reinigung_endreinigung", label: "Endreinigung relevant ist" },
      { id: "reinigung_vorbereitung", label: "Uebergabevorbereitung genannt ist" },
      { id: "reinigung_schluessel", label: "Schluesseluebergabe erwaehnt ist" },
      { id: "reinigung_akte", label: "Uebergabeakte oder Dokumentation sinnvoll waere" },
    ],
  },
  {
    id: "entruempelung_entsorgung",
    title: "Entruempelung / Entsorgung",
    text: "Entsorgungskosten und Ausschluesse muessen sauber getrennt sein.",
    questions: [
      { id: "entsorgung_kosten", label: "Entsorgungskosten enthalten sind" },
      { id: "entsorgung_gegenstaende", label: "Welche Gegenstaende enthalten sind" },
      { id: "entsorgung_ausschluesse", label: "Ausschluesse genannt sind" },
      { id: "entsorgung_nebenraeume", label: "Keller, Garage oder Nebenraeume beruecksichtigt sind" },
      { id: "entsorgung_gefahrstoffe", label: "Gefaehrliche Stoffe ausgeschlossen sind" },
    ],
  },
  {
    id: "preis_zahlung",
    title: "Preis / Mehrwertsteuer / Zahlung",
    text: "Netto, brutto, Zahlungsweg und Zusatzkosten sollten eindeutig sein.",
    questions: [
      { id: "preis_brutto", label: "Netto oder brutto klar ist" },
      { id: "preis_mwst", label: "Mehrwertsteuer angegeben ist" },
      { id: "preis_zahlung", label: "Zahlungsbedingungen genannt sind" },
      { id: "preis_zusatzkosten", label: "Zusatzkosten-Regeln klar sind" },
    ],
  },
  {
    id: "haftung",
    title: "Haftung / Versicherung / Schaeden",
    text: "Empfindliche Gegenstaende und Montage brauchen klare Absprachen.",
    questions: [
      { id: "haftung_versicherung", label: "Versicherung oder Haftung erwaehnt ist" },
      { id: "haftung_schaeden", label: "Regelungen bei Schaeden beschrieben sind" },
      { id: "haftung_montage", label: "Montage oder Demontage geregelt ist" },
      { id: "haftung_empfindlich", label: "Empfindliche Gegenstaende genannt sind" },
    ],
  },
  {
    id: "kommunikation",
    title: "Anbieter-Kommunikation",
    text: "Klare Rueckfragen und schriftliche Bestaetigung machen Angebote belastbarer.",
    questions: [
      { id: "kommunikation_ansprechpartner", label: "Ansprechpartner klar ist" },
      { id: "kommunikation_schriftlich", label: "Schriftliche Bestaetigung vorhanden ist" },
      { id: "kommunikation_rueckfragen", label: "Rueckfragen moeglich sind" },
      { id: "kommunikation_dokumentiert", label: "Leistungsumfang eindeutig dokumentiert ist" },
    ],
  },
];

function getScore(openItemsCount: number) {
  if (openItemsCount <= 3) {
    return {
      level: "gering" as const,
      label: "Geringer Klaerungsbedarf",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-900",
      bar: "bg-emerald-500",
      width: "w-1/4",
    };
  }

  if (openItemsCount <= 8) {
    return {
      level: "mittel" as const,
      label: "Mittlerer Klaerungsbedarf",
      tone: "border-amber-200 bg-amber-50 text-amber-950",
      bar: "bg-amber-500",
      width: "w-2/3",
    };
  }

  return {
    level: "hoch" as const,
    label: "Hoher Klaerungsbedarf",
    tone: "border-rose-200 bg-rose-50 text-rose-950",
    bar: "bg-rose-500",
    width: "w-full",
  };
}

function joinPreview(items: string[]) {
  if (!items.length) return "Keine offenen Punkte markiert.";
  return items.slice(0, 6).join("; ");
}

export function OfferRedFlagScanner({
  onResultChange,
}: {
  onResultChange?: (result: RedFlagScannerResult) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resultAccepted, setResultAccepted] = useState(false);
  const selectedSet = useMemo(() => new Set(selectedItems), [selectedItems]);

  const openItems = useMemo(
    () =>
      redFlagCategories.flatMap((category) =>
        category.questions
          .filter((question) => selectedSet.has(question.id))
          .map((question) => `${category.title}: ${question.label}`),
      ),
    [selectedSet],
  );

  const openCategories = useMemo(
    () =>
      redFlagCategories
        .filter((category) => category.questions.some((question) => selectedSet.has(question.id)))
        .map((category) => category.title),
    [selectedSet],
  );

  const score = useMemo(() => getScore(openItems.length), [openItems.length]);

  const result = useMemo<RedFlagScannerResult>(
    () => ({
      completed: resultAccepted,
      scoreLevel: score.level,
      scoreLabel: score.label,
      scoreValue: openItems.length,
      categories: openCategories,
      items: openItems,
      summary: `${score.label}: ${joinPreview(openItems)}`,
    }),
    [openCategories, openItems, resultAccepted, score.label, score.level],
  );

  const whatsappText = useMemo(() => {
    const scannerLine = result.completed
      ? ` Mein Red-Flag-Scanner zeigt ${result.scoreLabel.toLowerCase()}. Offene Punkte: ${joinPreview(result.items)}`
      : "";

    return encodeURIComponent(
      `Hallo FLOXANT, ich moechte ein vorhandenes Angebot auf offene Punkte pruefen lassen. Es geht um [Service] in [Ort]. Angebot/Fotos/Preis kann ich senden.${scannerLine}`,
    );
  }, [result]);

  useEffect(() => {
    onResultChange?.(result);
  }, [onResultChange, result]);

  function toggleQuestion(questionId: string) {
    setSelectedItems((current) =>
      current.includes(questionId) ? current.filter((item) => item !== questionId) : [...current, questionId],
    );
  }

  function scrollToForm() {
    document.getElementById("angebotscheck-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function acceptResult() {
    setResultAccepted(true);
    window.setTimeout(scrollToForm, 60);
  }

  return (
    <div
      className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/10"

    >
      <div className="grid gap-6 border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#dbeafe_0,transparent_32rem),linear-gradient(135deg,#f8fafc,#ffffff)] p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            <Gauge className="h-4 w-4" />
            FLOXANT Angebots-Radar
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Angebot-Red-Flag-Scanner: Ist Ihr Angebot vollstaendig?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
            Markieren Sie die Punkte, die im vorhandenen Angebot unklar sind. Der Score zeigt praktischen
            Klaerungsbedarf, keine Rechtsbewertung und keine Aussage ueber den Anbieter.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Rechtsberatung</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Keine Anbieterbewertung</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-2">Dauer ca. 2 Minuten</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Schnell-Scanner",
              text: "Checkfragen beantworten.",
              Icon: ClipboardCheck,
              event: "hero_cta_click",
              source: "red_flag_scanner_start",
              onClick: () => undefined,
            },
            {
              title: "Angebot hochladen",
              text: "PDF, Screenshot oder Bild senden.",
              Icon: UploadCloud,
              event: "upload_started",
              source: "red_flag_scanner_upload",
              onClick: scrollToForm,
            },
            {
              title: "Text einfügen",
              text: "Angebotstext kopieren.",
              Icon: FileText,
              event: "hero_cta_click",
              source: "red_flag_scanner_text",
              onClick: scrollToForm,
            },
          ].map((item) => {
            const Icon = item.Icon;
            return (
              <button
                key={item.title}
                type="button"
                aria-label={item.title}
                onClick={item.onClick}
                data-event={item.event}
                data-source={item.source}
                className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-left text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/5"
              >
                <Icon className="h-5 w-5 text-blue-700" />
                <span className="mt-3 block text-sm font-black text-slate-950">{item.title}</span>
                <span className="mt-1 block text-xs leading-5">{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-start">
        <div className="grid gap-4 lg:grid-cols-2">
          {redFlagCategories.map((category) => {
            const openCount = category.questions.filter((question) => selectedSet.has(question.id)).length;
            return (
              <article key={category.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-slate-950">{category.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{category.text}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-black text-slate-600">
                    {openCount} offen
                  </span>
                </div>
                <div className="mt-4 grid gap-2">
                  {category.questions.map((question) => {
                    const checked = selectedSet.has(question.id);
                    return (
                      <label
                        key={question.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 text-sm font-semibold leading-6 transition ${
                          checked
                            ? "border-amber-300 bg-amber-50 text-amber-950"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleQuestion(question.id)}
                          data-event="service_card_click"
                          data-category={category.id}
                          data-question={question.id}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                        />
                        <span>{question.label}</span>
                      </label>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <aside className="sticky top-24 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/10">
          <div className={`rounded-[1.25rem] border p-4 ${score.tone}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm font-black">{score.label}</p>
            </div>
            <p className="mt-2 text-xs leading-5">
              {openItems.length} praktische oder organisatorische Punkte sollten vor einer Zusage geklaert werden.
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/80">
              <div className={`h-full rounded-full ${score.bar} ${score.width}`} />
            </div>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-950">Ergebniszusammenfassung</p>
            {openItems.length ? (
              <ul className="mt-3 grid gap-2 text-xs leading-5 text-slate-700">
                {openItems.slice(0, 7).map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-xs leading-5 text-slate-700">
                Keine offenen Punkte markiert. Sie koennen das Angebot trotzdem hochladen, wenn Sie eine zweite
                organisatorische Einschaetzung moechten.
              </p>
            )}
          </div>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={acceptResult}
              data-event="form_submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Ergebnis in Anfrage uebernehmen
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={`https://wa.me/4915771105087?text=${whatsappText}`}
              data-event="whatsapp_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
            >
              <MessageCircle className="h-4 w-4" />
              Ergebnis per WhatsApp senden
            </a>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-blue-100 bg-blue-50 p-4 text-xs leading-6 text-blue-950">
            <ShieldCheck className="mb-2 h-5 w-5 text-blue-700" />
            Der Score zeigt Klaerungsbedarf. Er ersetzt keine Rechtsberatung, bewertet keine Anbieter rechtlich und
            ist kein Preis- oder Wechselversprechen.
          </div>
        </aside>
      </div>
    </div>
  );
}
