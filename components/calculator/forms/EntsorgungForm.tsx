"use client";

import React, { useMemo, useState } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Route,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

type AccessDifficulty = "einfach" | "mittel" | "schwer";
type UrgencyType = "flexibel" | "dringend";

function parseNumber(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function EntsorgungForm({ dic }: { dic?: any }) {
  const entsorgungData = useCalculatorStore((s) => s.entsorgungData);
  const updateEntsorgungData = useCalculatorStore((s) => s.updateEntsorgungData);

  const [openSection, setOpenSection] = useState<string | null>("access");

  const sections = useMemo(
    () => [
      {
        id: "access",
        label: dic?.calculator?.access_disassembly || "Zugang & Demontage",
        icon: Route,
      },
      {
        id: "details",
        label: dic?.calculator?.safety_urgency || "Sicherheit & Dringlichkeit",
        icon: AlertTriangle,
      },
      {
        id: "notes",
        label: dic?.calculator?.notes_title || "Notizen",
        icon: MessageSquare,
      },
    ],
    [dic]
  );

  const wasteCategories = useMemo(
    () => [
      {
        id: "sperrmuell",
        label: dic?.calculator?.bulky_waste || "Sperrmüll",
      },
      {
        id: "elektroschrott",
        label: dic?.calculator?.e_waste || "Elektroschrott",
      },
      {
        id: "bauschutt",
        label: dic?.calculator?.construction_waste || "Bauschutt",
      },
      {
        id: "gruenschnitt",
        label: dic?.calculator?.green_waste || "Grünschnitt",
      },
      {
        id: "hausmuell",
        label: dic?.calculator?.household_waste || "Hausmüll",
      },
      {
        id: "altmetall",
        label: dic?.calculator?.scrap_metal || "Altmetall",
      },
      {
        id: "mischabfall",
        label: dic?.calculator?.mixed_waste || "Mischabfall",
      },
    ],
    [dic]
  );

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const toggleCategory = (category: string) => {
    const exists = entsorgungData.wasteCategories.includes(category);
    updateEntsorgungData({
      wasteCategories: exists
        ? entsorgungData.wasteCategories.filter((item) => item !== category)
        : [...entsorgungData.wasteCategories, category],
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
          <Trash2 size={14} className="text-blue-300" />
          {dic?.calculator?.waste_volume_title || "Volumen & Material"}
        </h3>

        <div className="space-y-4">
          <FieldCard
            label={
              dic?.calculator?.estimated_waste_volume ||
              "Geschätztes Volumen"
            }
          >
            <input
              type="number"
              min={0}
              value={entsorgungData.wasteVolumeM3 || ""}
              onChange={(e) =>
                updateEntsorgungData({
                  wasteVolumeM3: parseNumber(e.target.value),
                })
              }
              placeholder={
                dic?.calculator?.waste_volume_placeholder || "z. B. 8"
              }
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </FieldCard>

          <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-[#0B0D12] p-4 transition-colors hover:bg-white/[0.03]">
            <input
              type="checkbox"
              checked={entsorgungData.uncertainVolume}
              onChange={(e) =>
                updateEntsorgungData({
                  uncertainVolume: e.target.checked,
                })
              }
              className="mt-1 h-4 w-4 accent-blue-500"
            />
            <div>
              <span className="block text-sm font-medium text-white">
                {dic?.calculator?.uncertain_waste_volume ||
                  "Volumen noch unsicher"}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-white/50">
                {dic?.calculator?.uncertain_waste_volume_desc ||
                  "Eine grobe Schätzung reicht zunächst aus."}
              </span>
            </div>
          </label>

          <div className="space-y-2 pt-2">
            <label className="text-[11px] uppercase tracking-[0.14em] text-white/40">
              {dic?.calculator?.waste_types || "Materialarten"}
            </label>

            <div className="flex flex-wrap gap-2">
              {wasteCategories.map((category) => {
                const active = entsorgungData.wasteCategories.includes(
                  category.id
                );

                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${active
                        ? "border-blue-400/40 bg-blue-400/10 text-blue-200"
                        : "border-white/10 bg-[#0B0D12] text-white/55 hover:bg-white/[0.04]"
                      }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
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
                  {section.id === "access" && (
                    <div className="grid grid-cols-1 gap-5 pt-2 md:grid-cols-2">
                      <FieldCard
                        label={
                          dic?.calculator?.access_difficulty ||
                          "Zugänglichkeit"
                        }
                      >
                        <select
                          value={entsorgungData.accessDifficulty}
                          onChange={(e) =>
                            updateEntsorgungData({
                              accessDifficulty: e.target.value as AccessDifficulty,
                            })
                          }
                          className="w-full bg-transparent text-sm text-white outline-none"
                        >
                          <option value="einfach" className="bg-[#0B0D12]">
                            {dic?.calculator?.easy || "Einfach"}
                          </option>
                          <option value="mittel" className="bg-[#0B0D12]">
                            {dic?.calculator?.medium || "Mittel"}
                          </option>
                          <option value="schwer" className="bg-[#0B0D12]">
                            {dic?.calculator?.difficult || "Schwer"}
                          </option>
                        </select>
                      </FieldCard>

                      <FieldCard
                        label={
                          dic?.calculator?.loading_path_meters ||
                          "Laufweg in Metern"
                        }
                      >
                        <input
                          type="number"
                          min={0}
                          value={entsorgungData.loadingDistanceMeters || ""}
                          onChange={(e) =>
                            updateEntsorgungData({
                              loadingDistanceMeters: parseNumber(e.target.value),
                            })
                          }
                          placeholder={
                            dic?.calculator?.loading_path_placeholder ||
                            "z. B. 20"
                          }
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                        />
                      </FieldCard>

                      <div className="md:col-span-2">
                        <OptionCard
                          checked={entsorgungData.disassemblyRequired}
                          title={
                            dic?.calculator?.disassembly_required ||
                            "Demontage erforderlich"
                          }
                          description={
                            dic?.calculator?.disassembly_required_desc ||
                            "Zerlegung größerer Möbel oder Einbauten vor der Entsorgung."
                          }
                          onChange={(checked) =>
                            updateEntsorgungData({
                              disassemblyRequired: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {section.id === "details" && (
                    <div className="grid grid-cols-1 gap-4">
                      <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                        <input
                          type="checkbox"
                          checked={entsorgungData.hazardMaterials}
                          onChange={(e) =>
                            updateEntsorgungData({
                              hazardMaterials: e.target.checked,
                            })
                          }
                          className="mt-1 h-4 w-4 accent-amber-500"
                        />
                        <div>
                          <span className="block text-sm font-medium text-amber-200">
                            {dic?.calculator?.hazard_materials ||
                              "Gefahrstoffe vorhanden"}
                          </span>
                          <span className="text-xs leading-relaxed text-white/50">
                            {dic?.calculator?.hazard_materials_desc ||
                              "Bitte angeben, falls Sondermaterial oder problematische Stoffe vorhanden sind."}
                          </span>
                        </div>
                      </label>

                      <FieldCard
                        label={dic?.calculator?.urgency || "Dringlichkeit"}
                      >
                        <select
                          value={entsorgungData.urgency}
                          onChange={(e) =>
                            updateEntsorgungData({
                              urgency: e.target.value as UrgencyType,
                            })
                          }
                          className="w-full bg-transparent text-sm text-white outline-none"
                        >
                          <option value="flexibel" className="bg-[#0B0D12]">
                            {dic?.calculator?.standard_flexible || "Flexibel"}
                          </option>
                          <option value="dringend" className="bg-[#0B0D12]">
                            {dic?.calculator?.urgent_express ||
                              "Dringend / Express"}
                          </option>
                        </select>
                      </FieldCard>
                    </div>
                  )}

                  {section.id === "notes" && (
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                        {dic?.calculator?.additional_notes ||
                          "Zusätzliche Hinweise"}
                      </label>
                      <textarea
                        value={entsorgungData.freeTextNote || ""}
                        onChange={(e) =>
                          updateEntsorgungData({ freeTextNote: e.target.value })
                        }
                        placeholder={
                          dic?.calculator?.waste_notes_placeholder ||
                          "Besondere Hinweise zu Material, Zugang oder Termin"
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
            "Je klarer Volumen, Zugang und Materialart beschrieben sind, desto präziser wird die Schätzung."}
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
}: {
  checked: boolean;
  title: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${checked
          ? "border-blue-400/30 bg-blue-400/[0.07]"
          : "border-white/10 bg-[#0B0D12] hover:bg-white/[0.03]"
        }`}
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