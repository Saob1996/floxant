"use client";

import React, { useMemo, useState } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { m, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Box,
  Briefcase,
  Calendar,
  MessageSquare,
  Truck,
  CheckCircle2,
} from "lucide-react";

type TimeConstraint = "flexibel" | "wochenende" | "dringend" | "genaues_datum";

function parseNumber(value: string): number {
  if (!value.trim()) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function UmzugForm({ dic }: { dic?: any }) {
  const umzugData = useCalculatorStore((s) => s.umzugData);
  const updateUmzugData = useCalculatorStore((s) => s.updateUmzugData);

  const [openSection, setOpenSection] = useState<string | null>("access");

  const sections = useMemo(
    () => [
      {
        id: "access",
        label: dic?.calculator?.access_conditions || "Zugang & Adressen",
        icon: MapPin,
      },
      {
        id: "volume",
        label: dic?.calculator?.inventory_volume || "Volumen & Inventar",
        icon: Box,
      },
      {
        id: "services",
        label: dic?.calculator?.service_scope || "Leistungsumfang",
        icon: Briefcase,
      },
      {
        id: "time",
        label: dic?.calculator?.arrival_time || "Termin & Zeitfenster",
        icon: Calendar,
      },
      {
        id: "notes",
        label: dic?.calculator?.notes_title || "Notizen",
        icon: MessageSquare,
      },
    ],
    [dic]
  );

  const heavyItemsMap =
    dic?.calculator?.heavy_items || {
      piano: "Piano",
      safe: "Safe",
      fitness_gear: "Fitnessgerät",
      aquarium: "Aquarium",
      grand_piano: "Flügel",
    };

  const liftLabel = dic?.calculator?.lift || "Aufzug";
  const narrowStairsLabel = dic?.calculator?.narrow_stairs || "Enge Treppe";
  const courtyardAccessLabel =
    dic?.calculator?.courtyard_access || "Innenhof / schwieriger Zugang";
  const noParkingZoneLabel =
    dic?.footer?.no_parking_zone || "Halteverbotszone";

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const toggleHeavyItem = (item: string) => {
    const exists = umzugData.heavyItems.includes(item);
    updateUmzugData({
      heavyItems: exists
        ? umzugData.heavyItems.filter((i) => i !== item)
        : [...umzugData.heavyItems, item],
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
          <Truck size={14} className="text-blue-300" />
          {dic?.calculator?.basis_data || "Basisdaten"}
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FieldCard label={dic?.calculator?.living_area || "Wohnfläche"}>
            <input
              type="number"
              min={0}
              value={umzugData.areaM2 || ""}
              onChange={(e) =>
                updateUmzugData({ areaM2: parseNumber(e.target.value) })
              }
              placeholder={dic?.calculator?.area_placeholder || "z. B. 80"}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </FieldCard>

          <FieldCard label={dic?.calculator?.rooms || "Zimmer"}>
            <input
              type="number"
              min={0}
              value={umzugData.rooms || ""}
              onChange={(e) =>
                updateUmzugData({ rooms: parseNumber(e.target.value) })
              }
              placeholder={dic?.calculator?.rooms_placeholder || "z. B. 3"}
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
                  {section.id === "access" && (
                    <div className="space-y-8 pt-2">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <AddressBlock
                          title={dic?.calculator?.from_address || "Startadresse"}
                          addressValue={umzugData.fromAddressDetailed || ""}
                          addressPlaceholder={
                            dic?.calculator?.address_placeholder ||
                            "Straße / Ort"
                          }
                          addressLabel={
                            dic?.calculator?.address_optional ||
                            "Adresse optional"
                          }
                          floorValue={umzugData.fromFloor ?? ""}
                          floorLabel={dic?.calculator?.floor || "Etage"}
                          floorPlaceholder="0 = Erdgeschoss"
                          walkingDistanceValue={umzugData.walkingDistanceFrom ?? ""}
                          walkingDistanceLabel={
                            dic?.calculator?.distance_parking ||
                            "Laufweg zum LKW (Meter)"
                          }
                          walkingDistancePlaceholder={
                            dic?.calculator?.dist_placeholder || "z. B. 15"
                          }
                          onAddressChange={(value) =>
                            updateUmzugData({ fromAddressDetailed: value })
                          }
                          onFloorChange={(value) =>
                            updateUmzugData({ fromFloor: parseNumber(value) })
                          }
                          onWalkingDistanceChange={(value) =>
                            updateUmzugData({
                              walkingDistanceFrom: parseNumber(value),
                            })
                          }
                          checks={[
                            {
                              checked: Boolean(umzugData.hasElevatorFrom),
                              label: liftLabel,
                              onChange: (checked) =>
                                updateUmzugData({ hasElevatorFrom: checked }),
                            },
                            {
                              checked: Boolean(umzugData.narrowStairsFrom),
                              label: narrowStairsLabel,
                              onChange: (checked) =>
                                updateUmzugData({ narrowStairsFrom: checked }),
                            },
                            {
                              checked: Boolean(umzugData.courtyardAccessFrom),
                              label: courtyardAccessLabel,
                              onChange: (checked) =>
                                updateUmzugData({ courtyardAccessFrom: checked }),
                            },
                            {
                              checked: Boolean(umzugData.noParkingZoneFrom),
                              label: noParkingZoneLabel,
                              onChange: (checked) =>
                                updateUmzugData({ noParkingZoneFrom: checked }),
                            },
                          ]}
                        />

                        <AddressBlock
                          title={dic?.calculator?.to_address || "Zieladresse"}
                          addressValue={umzugData.toAddressDetailed || ""}
                          addressPlaceholder={
                            dic?.calculator?.address_placeholder ||
                            "Straße / Ort"
                          }
                          addressLabel={
                            dic?.calculator?.address_optional ||
                            "Adresse optional"
                          }
                          floorValue={umzugData.toFloor ?? ""}
                          floorLabel={dic?.calculator?.floor || "Etage"}
                          floorPlaceholder="0 = Erdgeschoss"
                          walkingDistanceValue={umzugData.walkingDistanceTo ?? ""}
                          walkingDistanceLabel={
                            dic?.calculator?.distance_parking ||
                            "Laufweg zum LKW (Meter)"
                          }
                          walkingDistancePlaceholder={
                            dic?.calculator?.dist_placeholder || "z. B. 15"
                          }
                          onAddressChange={(value) =>
                            updateUmzugData({ toAddressDetailed: value })
                          }
                          onFloorChange={(value) =>
                            updateUmzugData({ toFloor: parseNumber(value) })
                          }
                          onWalkingDistanceChange={(value) =>
                            updateUmzugData({
                              walkingDistanceTo: parseNumber(value),
                            })
                          }
                          checks={[
                            {
                              checked: Boolean(umzugData.hasElevatorTo),
                              label: liftLabel,
                              onChange: (checked) =>
                                updateUmzugData({ hasElevatorTo: checked }),
                            },
                            {
                              checked: Boolean(umzugData.narrowStairsTo),
                              label: narrowStairsLabel,
                              onChange: (checked) =>
                                updateUmzugData({ narrowStairsTo: checked }),
                            },
                            {
                              checked: Boolean(umzugData.courtyardAccessTo),
                              label: courtyardAccessLabel,
                              onChange: (checked) =>
                                updateUmzugData({ courtyardAccessTo: checked }),
                            },
                            {
                              checked: Boolean(umzugData.noParkingZoneTo),
                              label: noParkingZoneLabel,
                              onChange: (checked) =>
                                updateUmzugData({ noParkingZoneTo: checked }),
                            },
                          ]}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 border-t border-white/8 pt-6 md:grid-cols-2">
                        <FieldCard
                          label={dic?.calculator?.distance || "Entfernung (km)"}
                        >
                          <input
                            type="number"
                            min={0}
                            placeholder={
                              dic?.calculator?.dist_placeholder || "z. B. 15"
                            }
                            value={umzugData.distanceKm || ""}
                            onChange={(e) =>
                              updateUmzugData({
                                distanceKm: parseNumber(e.target.value),
                              })
                            }
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                          />
                        </FieldCard>

                        <div className="rounded-2xl border border-white/10 bg-[#0B0D12] p-4">
                          <p className="text-xs leading-relaxed text-white/45">
                            {dic?.calculator?.access_hint ||
                              "Zugang, Laufwege und Halteverbotszonen beeinflussen Aufwand und Tragezeit deutlich."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "volume" && (
                    <div className="space-y-8 pt-2">
                      <FieldCard
                        label={
                          dic?.calculator?.estimated_boxes ||
                          "Geschätzte Kartons"
                        }
                      >
                        <input
                          type="number"
                          min={0}
                          placeholder={
                            dic?.calculator?.boxes_placeholder || "z. B. 20"
                          }
                          value={umzugData.boxesCount || ""}
                          onChange={(e) =>
                            updateUmzugData({
                              boxesCount: parseNumber(e.target.value),
                            })
                          }
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                        />
                      </FieldCard>

                      <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-[#0B0D12] p-4 transition-colors hover:bg-white/[0.03]">
                        <input
                          type="checkbox"
                          checked={umzugData.uncertainVolume}
                          onChange={(e) =>
                            updateUmzugData({
                              uncertainVolume: e.target.checked,
                            })
                          }
                          className="mt-1 h-4 w-4 accent-blue-500"
                        />
                        <div>
                          <span className="block text-sm font-medium text-white">
                            {dic?.calculator?.uncertain_volume ||
                              "Volumen noch unsicher"}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-white/50">
                            {dic?.calculator?.uncertain_volume_desc ||
                              "Kein Problem. Eine grobe Angabe reicht zunächst aus."}
                          </span>
                        </div>
                      </label>

                      <div className="space-y-3 pt-2">
                        <label className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          {dic?.calculator?.heavy_items_title ||
                            "Schwere Einzelstücke"}
                        </label>

                        <div className="flex flex-wrap gap-2">
                          {Object.entries(heavyItemsMap).map(([key, label]) => {
                            const active = umzugData.heavyItems.includes(key);

                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() => toggleHeavyItem(key)}
                                className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors ${active
                                    ? "border-blue-400/40 bg-blue-400/10 text-blue-200"
                                    : "border-white/10 bg-[#0B0D12] text-white/55 hover:bg-white/[0.04]"
                                  }`}
                              >
                                {String(label)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "services" && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <OptionCard
                        checked={umzugData.packingService}
                        title={dic?.calculator?.packing_service || "Einpackservice"}
                        description={
                          dic?.calculator?.packing_desc ||
                          "Wir übernehmen das fachgerechte Verpacken."
                        }
                        onChange={(checked) =>
                          updateUmzugData({ packingService: checked })
                        }
                      />

                      <OptionCard
                        checked={umzugData.unpackingService}
                        title={
                          dic?.calculator?.unpacking_service || "Auspackservice"
                        }
                        description={
                          dic?.calculator?.unpacking_desc ||
                          "Wir helfen beim strukturierten Auspacken."
                        }
                        onChange={(checked) =>
                          updateUmzugData({ unpackingService: checked })
                        }
                      />

                      <OptionCard
                        checked={umzugData.disassemblyService}
                        title={dic?.calculator?.disassembly_service || "Demontage"}
                        description={
                          dic?.calculator?.disassembly_desc ||
                          "Abbau von Möbeln vor dem Transport."
                        }
                        onChange={(checked) =>
                          updateUmzugData({ disassemblyService: checked })
                        }
                      />

                      <OptionCard
                        checked={umzugData.assemblyService}
                        title={dic?.calculator?.assembly_service || "Montage"}
                        description={
                          dic?.calculator?.assembly_desc ||
                          "Wiederaufbau am Zielort."
                        }
                        onChange={(checked) =>
                          updateUmzugData({ assemblyService: checked })
                        }
                      />

                      <div className="md:col-span-2">
                        <OptionCard
                          checked={umzugData.kitchenAssembly}
                          title={dic?.calculator?.kitchen_service || "Küchenservice"}
                          description={
                            dic?.calculator?.kitchen_desc ||
                            "Demontage und Montage der Küche."
                          }
                          onChange={(checked) =>
                            updateUmzugData({ kitchenAssembly: checked })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {section.id === "time" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FieldCard
                          label={
                            dic?.calculator?.time_flexibility ||
                            "Zeitliche Flexibilität"
                          }
                        >
                          <select
                            value={umzugData.timeConstraint}
                            onChange={(e) =>
                              updateUmzugData({
                                timeConstraint: e.target.value as TimeConstraint,
                              })
                            }
                            className="w-full bg-transparent text-sm text-white outline-none"
                          >
                            <option value="flexibel" className="bg-[#0B0D12]">
                              {dic?.calculator?.flexible_time || "Flexibel"}
                            </option>
                            <option
                              value="genaues_datum"
                              className="bg-[#0B0D12]"
                            >
                              {dic?.calculator?.exact_date || "Genaues Datum"}
                            </option>
                            <option value="wochenende" className="bg-[#0B0D12]">
                              {dic?.calculator?.weekend_only || "Nur Wochenende"}
                            </option>
                            <option value="dringend" className="bg-[#0B0D12]">
                              {dic?.calculator?.urgent || "Dringend"}
                            </option>
                          </select>
                        </FieldCard>

                        <OptionCard
                          checked={umzugData.isPartialMove}
                          title={dic?.calculator?.partial_move || "Teilleistung"}
                          description={
                            dic?.calculator?.partial_move_desc ||
                            "Nur ein Teil des Hausrats oder einzelne Möbelstücke."
                          }
                          onChange={(checked) =>
                            updateUmzugData({ isPartialMove: checked })
                          }
                          compact
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
                        value={umzugData.freeTextNote || ""}
                        onChange={(e) =>
                          updateUmzugData({ freeTextNote: e.target.value })
                        }
                        placeholder={
                          dic?.calculator?.notes_placeholder_detailed ||
                          "Besondere Hinweise zu Zugang, Möbeln oder Termin"
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
            "Je genauer die Angaben, desto präziser wird die Schätzung und das spätere Angebot."}
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

function AddressBlock({
  title,
  addressValue,
  addressPlaceholder,
  addressLabel,
  floorValue,
  floorLabel,
  floorPlaceholder,
  walkingDistanceValue,
  walkingDistanceLabel,
  walkingDistancePlaceholder,
  onAddressChange,
  onFloorChange,
  onWalkingDistanceChange,
  checks,
}: {
  title: string;
  addressValue: string;
  addressPlaceholder: string;
  addressLabel: string;
  floorValue: number | string;
  floorLabel: string;
  floorPlaceholder: string;
  walkingDistanceValue: number | string;
  walkingDistanceLabel: string;
  walkingDistancePlaceholder: string;
  onAddressChange: (value: string) => void;
  onFloorChange: (value: string) => void;
  onWalkingDistanceChange: (value: string) => void;
  checks: Array<{
    checked: boolean;
    label: string;
    onChange: (checked: boolean) => void;
  }>;
}) {
  return (
    <div className="space-y-5">
      <h4 className="border-b border-white/8 pb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/38">
        {title}
      </h4>

      <FieldCard label={addressLabel}>
        <input
          type="text"
          placeholder={addressPlaceholder}
          value={addressValue}
          onChange={(e) => onAddressChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </FieldCard>

      <FieldCard label={floorLabel}>
        <input
          type="number"
          placeholder={floorPlaceholder}
          value={floorValue}
          onChange={(e) => onFloorChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </FieldCard>

      <FieldCard label={walkingDistanceLabel}>
        <input
          type="number"
          min={0}
          placeholder={walkingDistancePlaceholder}
          value={walkingDistanceValue}
          onChange={(e) => onWalkingDistanceChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </FieldCard>

      <div className="space-y-3 pt-1">
        {checks.map((item, index) => (
          <label
            key={`${item.label}-${index}`}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors ${item.checked
                ? "border-blue-400/30 bg-blue-400/[0.07] text-white"
                : "border-white/10 bg-[#0B0D12] text-white/72 hover:bg-white/[0.03]"
              }`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => item.onChange(e.target.checked)}
              className="h-4 w-4 accent-blue-500"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}