"use client";

import React, { useMemo, useState } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Home,
  Settings,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

type PropertyType = "wohnung" | "haus" | "buero";
type ConditionLevel = "leicht" | "mittel" | "stark";
type FrequencyType = "einmalig" | "regelmaessig";

function parseNumber(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function ReinigungForm({ dic }: { dic?: any }) {
  const reinigungData = useCalculatorStore((s) => s.reinigungData);
  const updateReinigungData = useCalculatorStore((s) => s.updateReinigungData);

  const [openSection, setOpenSection] = useState<string | null>("condition");

  const sections = useMemo(
    () => [
      {
        id: "condition",
        label: dic?.calculator?.condition_equipment || "Zustand & Ausstattung",
        icon: Sparkles,
      },
      {
        id: "logistics",
        label: dic?.calculator?.process_extras || "Ablauf & Extras",
        icon: Settings,
      },
      {
        id: "notes",
        label: dic?.calculator?.notes_title || "Notizen",
        icon: MessageSquare,
      },
    ],
    [dic]
  );

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const toggleExtra = (extra: string) => {
    const exists = reinigungData.extras.includes(extra);
    updateReinigungData({
      extras: exists
        ? reinigungData.extras.filter((item) => item !== extra)
        : [...reinigungData.extras, extra],
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
          <Home size={14} className="text-blue-300" />
          {dic?.calculator?.basis_data || "Basisdaten"}
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FieldCard label={dic?.calculator?.property_type || "Objektart"}>
            <select
              value={reinigungData.propertyType}
              onChange={(e) =>
                updateReinigungData({
                  propertyType: e.target.value as PropertyType,
                })
              }
              className="w-full bg-transparent text-sm text-white outline-none"
            >
              <option value="wohnung" className="bg-[#0B0D12]">
                {dic?.calculator?.apartment || "Wohnung"}
              </option>
              <option value="haus" className="bg-[#0B0D12]">
                {dic?.calculator?.house || "Haus"}
              </option>
              <option value="buero" className="bg-[#0B0D12]">
                {dic?.calculator?.commercial_office || "Büro / Gewerbe"}
              </option>
            </select>
          </FieldCard>

          <FieldCard label={dic?.calculator?.living_area || "Fläche"}>
            <input
              type="number"
              min={0}
              value={reinigungData.areaM2 || ""}
              onChange={(e) =>
                updateReinigungData({ areaM2: parseNumber(e.target.value) })
              }
              placeholder={dic?.calculator?.area_placeholder || "z. B. 60"}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </FieldCard>

          <FieldCard
            label={dic?.calculator?.windows_approx || "Fenster ungefähr"}
          >
            <input
              type="number"
              min={0}
              value={reinigungData.windowsCount || ""}
              onChange={(e) =>
                updateReinigungData({
                  windowsCount: parseNumber(e.target.value),
                })
              }
              placeholder={dic?.calculator?.windows_hint || "z. B. 6"}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </FieldCard>
        </div>
      </div>

      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const Icon = section.icon;

        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between px-4 py-4 text-start transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={16}
                  className={isOpen ? "text-blue-300" : "text-white/40"}
                />
                <span
                  className={`text-sm font-medium tracking-tight ${isOpen ? "text-white" : "text-white/78"
                    }`}
                >
                  {section.label}
                </span>
              </div>

              {isOpen ? (
                <ChevronUp size={16} className="text-white/40" />
              ) : (
                <ChevronDown size={16} className="text-white/40" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="border-t border-white/8 px-4 pb-4 pt-4"
                >
                  {section.id === "condition" && (
                    <div className="space-y-8 pt-2">
                      <FieldCard
                        label={
                          dic?.calculator?.condition_level ||
                          "Verschmutzungsgrad"
                        }
                      >
                        <select
                          value={reinigungData.condition}
                          onChange={(e) =>
                            updateReinigungData({
                              condition: e.target.value as ConditionLevel,
                            })
                          }
                          className="w-full bg-transparent text-sm text-white outline-none"
                        >
                          <option value="leicht" className="bg-[#0B0D12]">
                            {dic?.calculator?.light || "Leicht"}
                          </option>
                          <option value="mittel" className="bg-[#0B0D12]">
                            {dic?.calculator?.medium || "Mittel"}
                          </option>
                          <option value="stark" className="bg-[#0B0D12]">
                            {dic?.calculator?.heavy || "Stark"}
                          </option>
                        </select>
                      </FieldCard>

                      <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-[#0B0D12] p-4 transition-colors hover:bg-white/[0.03]">
                        <input
                          type="checkbox"
                          checked={reinigungData.uncertainCondition}
                          onChange={(e) =>
                            updateReinigungData({
                              uncertainCondition: e.target.checked,
                            })
                          }
                          className="mt-1 h-4 w-4 accent-blue-500"
                        />
                        <div>
                          <span className="block text-sm font-medium text-white">
                            {dic?.calculator?.uncertain_condition ||
                              "Zustand noch unsicher"}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-white/50">
                            {dic?.calculator?.uncertain_condition_desc ||
                              "Eine grobe Einschätzung reicht zunächst aus."}
                          </span>
                        </div>
                      </label>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <OptionCard
                          checked={reinigungData.isFurnished}
                          title={dic?.calculator?.is_furnished || "Möbliert"}
                          description={
                            dic?.calculator?.is_furnished_desc ||
                            "Zusätzlicher Aufwand durch Möbel und eingeschränkte Flächen."
                          }
                          onChange={(checked) =>
                            updateReinigungData({ isFurnished: checked })
                          }
                        />

                        <OptionCard
                          checked={reinigungData.extras.includes("teppich")}
                          title={
                            dic?.calculator?.carpet_cleaning ||
                            "Teppichreinigung"
                          }
                          description={
                            dic?.calculator?.carpet_cleaning_desc ||
                            "Reinigung textiler Flächen und Teppichbereiche."
                          }
                          onChange={() => toggleExtra("teppich")}
                        />

                        <OptionCard
                          checked={reinigungData.extras.includes(
                            "kueche_tiefenreinigung"
                          )}
                          title={
                            dic?.calculator?.kitchen_deep_clean ||
                            "Küchen-Tiefenreinigung"
                          }
                          description={
                            dic?.calculator?.kitchen_deep_clean_desc ||
                            "Intensivere Reinigung von Küche, Schränken und typischen Fettzonen."
                          }
                          onChange={() =>
                            toggleExtra("kueche_tiefenreinigung")
                          }
                        />

                        <OptionCard
                          checked={reinigungData.extras.includes("bad_kalk")}
                          title={
                            dic?.calculator?.lime_removal || "Kalkentfernung"
                          }
                          description={
                            dic?.calculator?.lime_removal_desc ||
                            "Intensiventkalkung in Bad, Dusche oder Armaturen."
                          }
                          onChange={() => toggleExtra("bad_kalk")}
                        />
                      </div>
                    </div>
                  )}

                  {section.id === "logistics" && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FieldCard
                        label={dic?.calculator?.frequency || "Häufigkeit"}
                      >
                        <select
                          value={reinigungData.frequency}
                          onChange={(e) =>
                            updateReinigungData({
                              frequency: e.target.value as FrequencyType,
                            })
                          }
                          className="w-full bg-transparent text-sm text-white outline-none"
                        >
                          <option value="einmalig" className="bg-[#0B0D12]">
                            {dic?.calculator?.one_time || "Einmalig"}
                          </option>
                          <option
                            value="regelmaessig"
                            className="bg-[#0B0D12]"
                          >
                            {dic?.calculator?.regular || "Regelmäßig"}
                          </option>
                        </select>
                      </FieldCard>

                      <OptionCard
                        checked={reinigungData.keysHandover}
                        title={
                          dic?.calculator?.keys_handover || "Schlüsselübergabe"
                        }
                        description={
                          dic?.calculator?.keys_handover_desc ||
                          "Organisation von Schlüsselübergabe oder Zugang."
                        }
                        onChange={(checked) =>
                          updateReinigungData({ keysHandover: checked })
                        }
                        compact
                      />

                      <div className="md:col-span-2">
                        <OptionCard
                          checked={reinigungData.cleaningGuarantee}
                          title={
                            dic?.calculator?.handover_guarantee ||
                            "Abnahmegarantie"
                          }
                          description={
                            dic?.calculator?.handover_guarantee_desc ||
                            "Auf Wunsch mit Fokus auf saubere Übergabe."
                          }
                          onChange={(checked) =>
                            updateReinigungData({ cleaningGuarantee: checked })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {section.id === "notes" && (
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                        {dic?.calculator?.additional_notes ||
                          "Zusätzliche Hinweise"}
                      </label>
                      <textarea
                        value={reinigungData.freeTextNote || ""}
                        onChange={(e) =>
                          updateReinigungData({ freeTextNote: e.target.value })
                        }
                        placeholder={
                          dic?.calculator?.cleaning_notes_placeholder ||
                          "Besondere Anforderungen, Verschmutzung oder Terminwünsche"
                        }
                        className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-[#0B0D12] p-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-blue-400/30"
                      />
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="flex items-start gap-3 rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] px-4 py-3">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-300" />
        <p className="text-xs leading-relaxed text-white/55">
          {dic?.calculator?.social_proof ||
            "Je klarer Zustand und Sonderwünsche beschrieben sind, desto präziser wird die Schätzung."}
        </p>
      </div>
    </div>
  );
}

function FieldCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-[#0B0D12] p-4">
      <label className="text-[11px] uppercase tracking-[0.14em] text-white/40">
        {label}
      </label>
      {children}
    </div>
  );
}

function OptionCard({
  checked,
  title,
  description,
  onChange,
  compact = false,
}: {
  checked: boolean;
  title: string;
  description: string;
  onChange: (checked: boolean) => void;
  compact?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${checked
          ? "border-blue-400/30 bg-blue-400/[0.07]"
          : "border-white/10 bg-[#0B0D12] hover:bg-white/[0.03]"
        } ${compact ? "h-full" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 accent-blue-500"
      />
      <div>
        <span className="block text-sm font-medium text-white">{title}</span>
        <span className="text-[11px] leading-relaxed text-white/50">
          {description}
        </span>
      </div>
    </label>
  );
}