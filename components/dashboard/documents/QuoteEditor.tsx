"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Calculator, History, Info, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { m } from "framer-motion";
import { PremiumButton } from "../../ui/PremiumButton";
import { cn } from "@/lib/utils";
import { DocumentLineItem, FloxDocument, FloxDocumentStatus } from "@/lib/types/intake";

interface QuoteEditorProps {
  document: FloxDocument;
  onClose: () => void;
  onSave: (updatedDoc: FloxDocument) => Promise<void>;
}

function cloneDocument(document: FloxDocument): FloxDocument {
  return {
    ...document,
    editableData: {
      ...document.editableData,
      items: document.editableData.items.map((item) => ({ ...item })),
    },
    totals: { ...document.totals },
  };
}

function calculateTotals(items: DocumentLineItem[]) {
  const net = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0);
  const tax = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0) * ((Number(item.taxRate || 0) || 0) / 100),
    0
  );

  return {
    net,
    tax,
    gross: net + tax,
    currency: "EUR",
  };
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

export function QuoteEditor({ document, onClose, onSave }: QuoteEditorProps) {
  const [doc, setDoc] = useState<FloxDocument>(() => cloneDocument(document));
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const isLocked = ["approved", "sent", "paid"].includes(document.status);

  const totals = useMemo(() => calculateTotals(doc.editableData.items), [doc.editableData.items]);

  useEffect(() => {
    setDoc((prev) => ({ ...prev, totals }));
  }, [totals]);

  useEffect(() => {
    const errors: string[] = [];

    if (doc.editableData.items.length === 0) {
      errors.push("Es ist noch keine Position angelegt.");
    }

    if (
      doc.editableData.items.some(
        (item) => !(item.description || "").trim() || Number(item.quantity) <= 0 || Number(item.unitPrice) < 0
      )
    ) {
      errors.push("Alle Positionen brauchen Beschreibung, Menge und einen gültigen Preis.");
    }

    if (doc.type === "invoice" && !doc.editableData.dueDate) {
      errors.push("Für Rechnungen sollte ein Fälligkeitsdatum gesetzt sein.");
    }

    setValidationErrors(errors);
  }, [doc]);

  function handleUpdateItem(id: string, updates: Partial<DocumentLineItem>) {
    setDoc((prev) => ({
      ...prev,
      editableData: {
        ...prev.editableData,
        items: prev.editableData.items.map((item) => {
          if (item.id !== id) return item;
          const next = { ...item, ...updates };
          return {
            ...next,
            total: Number(next.quantity || 0) * Number(next.unitPrice || 0),
          };
        }),
      },
    }));
  }

  function handleAddItem() {
    const nextItem: DocumentLineItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unit: "Pauschale",
      unitPrice: 0,
      taxRate: 19,
      total: 0,
    };

    setDoc((prev) => ({
      ...prev,
      editableData: {
        ...prev.editableData,
        items: [...prev.editableData.items, nextItem],
      },
    }));
  }

  function handleRemoveItem(id: string) {
    setDoc((prev) => ({
      ...prev,
      editableData: {
        ...prev.editableData,
        items: prev.editableData.items.filter((item) => item.id !== id),
      },
    }));
  }

  async function handleSave() {
    if (validationErrors.length > 0) return;

    setSaving(true);
    try {
      await onSave({
        ...doc,
        totals,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
      />

      <m.div
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 16 }}
        className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-white">Dokument bearbeiten</h2>
              <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-white/55">{doc.number}</span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              {doc.type.replace(/_/g, " ")} | Version {doc.version}
            </p>
          </div>

          <button onClick={onClose} className="rounded-full p-2 text-white/45 transition-colors hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
            <div className="space-y-8">
              {validationErrors.length > 0 ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-red-400" />
                    <div>
                      <h3 className="text-sm font-semibold text-red-300">Dokument prüfen</h3>
                      <ul className="mt-2 space-y-1 text-xs text-red-200/90">
                        {validationErrors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {isLocked ? (
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <History className="mt-0.5 h-5 w-5 text-blue-400" />
                    <div>
                      <h3 className="text-sm font-semibold text-blue-300">Versionierte Bearbeitung</h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/55">
                        Dieses Dokument wurde bereits freigegeben oder versendet. Beim Speichern erzeugt FLOXANT automatisch
                        eine neue Entwurfs-Version.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <section className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Einleitung</label>
                  <textarea
                    value={doc.editableData.introText || ""}
                    onChange={(event) =>
                      setDoc((prev) => ({
                        ...prev,
                        editableData: { ...prev.editableData, introText: event.target.value },
                      }))
                    }
                    className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none transition-all focus:border-blue-400/30"
                    placeholder="Kurzer Einleitungstext für den Kunden..."
                  />
                </div>

                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-2 text-white/45">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Metadaten</span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-white/45">Dokumentdatum</label>
                      <input
                        type="date"
                        value={doc.editableData.documentDate?.split("T")[0] || ""}
                        onChange={(event) =>
                          setDoc((prev) => ({
                            ...prev,
                            editableData: {
                              ...prev.editableData,
                              documentDate: event.target.value ? new Date(event.target.value).toISOString() : undefined,
                            },
                          }))
                        }
                        className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-white/45">Fälligkeit</label>
                      <input
                        type="date"
                        value={doc.editableData.dueDate?.split("T")[0] || ""}
                        onChange={(event) =>
                          setDoc((prev) => ({
                            ...prev,
                            editableData: {
                              ...prev.editableData,
                              dueDate: event.target.value ? new Date(event.target.value).toISOString() : undefined,
                            },
                          }))
                        }
                        className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-white/45">Zahlungsbedingungen</label>
                    <input
                      type="text"
                      value={doc.editableData.paymentTerms || ""}
                      onChange={(event) =>
                        setDoc((prev) => ({
                          ...prev,
                          editableData: { ...prev.editableData, paymentTerms: event.target.value },
                        }))
                      }
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                      placeholder="z.B. 14 Tage netto"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Positionen</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">Leistungs- und Preispositionen</h3>
                  </div>

                  <PremiumButton
                    variant="ghost"
                    size="sm"
                    className="h-9 border border-white/10 bg-white/5 px-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    onClick={handleAddItem}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Position
                  </PremiumButton>
                </div>

                <div className="space-y-3">
                  {doc.editableData.items.map((item, index) => (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.15fr_0.18fr_0.24fr_0.15fr]">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-white/45">Beschreibung</label>
                          <input
                            value={item.description}
                            onChange={(event) => handleUpdateItem(item.id, { description: event.target.value })}
                            className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                            placeholder={`Position ${index + 1}`}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-white/45">Menge</label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={item.quantity}
                            onChange={(event) => handleUpdateItem(item.id, { quantity: Number(event.target.value) || 0 })}
                            className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-white/45">Einheit</label>
                          <input
                            value={item.unit}
                            onChange={(event) => handleUpdateItem(item.id, { unit: event.target.value })}
                            className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                            placeholder="Pauschale"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] text-white/45">Einzelpreis</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(event) => handleUpdateItem(item.id, { unitPrice: Number(event.target.value) || 0 })}
                            className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                          />
                        </div>

                        <div className="flex items-end gap-2">
                          <div className="flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm font-semibold text-white">
                            {formatPrice(Number(item.quantity || 0) * Number(item.unitPrice || 0))}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/45 transition-all hover:border-red-400/30 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Hinweise / Bedingungen</label>
                  <textarea
                    value={doc.editableData.conditions || ""}
                    onChange={(event) =>
                      setDoc((prev) => ({
                        ...prev,
                        editableData: { ...prev.editableData, conditions: event.target.value },
                      }))
                    }
                    className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none transition-all focus:border-blue-400/30"
                    placeholder="AGB, Gültigkeit, Ablaufhinweise..."
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-2 text-white/45">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Referenz aus dem Vorgang</span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-white/65">
                    <div className="flex justify-between gap-4">
                      <span>System-Orientierungsrahmen</span>
                      <span className="font-semibold text-white">
                        {doc.snapshot.valuation.systemPriceRangeMin} EUR - {doc.snapshot.valuation.systemPriceRangeMax} EUR
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Kundenbudget</span>
                      <span className="font-semibold text-white">
                        {doc.snapshot.valuation.customerBudget ? `${doc.snapshot.valuation.customerBudget} EUR` : "Nicht angegeben"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Vorprüfung</span>
                      <span className="font-semibold text-white">{doc.snapshot.valuation.valuationStage || "Vorprüfung"}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[1.75rem] border border-blue-500/20 bg-blue-500/5 p-6">
                <div className="flex items-center gap-2 text-blue-300">
                  <Calculator className="h-4 w-4" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Kalkulation</span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Netto</span>
                    <span>{formatPrice(totals.net)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Steuer</span>
                    <span>{formatPrice(totals.tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 text-base font-semibold text-white">
                    <span>Brutto</span>
                    <span>{formatPrice(totals.gross)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Dokumentenstatus</label>
                <select
                  value={doc.status}
                  onChange={(event) =>
                    setDoc((prev) => ({
                      ...prev,
                      status: event.target.value as FloxDocumentStatus,
                    }))
                  }
                  className="mt-4 h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-400/30"
                >
                  <option value="draft">Entwurf</option>
                  <option value="approved">Freigegeben</option>
                  <option value="sent">Versendet</option>
                  <option value="cancelled">Storniert</option>
                  <option value="paid">Bezahlt</option>
                </select>

                <PremiumButton
                  className={cn(
                    "mt-6 h-12 w-full text-[11px] font-semibold uppercase tracking-[0.18em]",
                    isLocked ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-primary text-black"
                  )}
                  onClick={handleSave}
                  disabled={saving || validationErrors.length > 0}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {isLocked ? <History className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                      {isLocked ? `Neue Version V${doc.version + 1}` : "Dokument speichern"}
                    </>
                  )}
                </PremiumButton>
              </div>
            </aside>
          </div>
        </div>
      </m.div>
    </div>
  );
}
