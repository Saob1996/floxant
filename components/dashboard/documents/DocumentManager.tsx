"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Download,
  Edit3,
  FileCheck,
  FileText,
  History,
  Loader2,
  Mail,
  Plus,
  Receipt,
  RefreshCw,
  Send,
  ShoppingCart,
  Clock,
} from "lucide-react";
import { PremiumButton } from "../../ui/PremiumButton";
import { cn } from "@/lib/utils";
import { FloxDocument, FloxDocumentStatus, FloxDocumentType } from "@/lib/types/intake";
import { QuoteEditor } from "./QuoteEditor";

interface DocumentManagerProps {
  bookingId: string;
  documents: FloxDocument[];
  onUpdate: (payload: any) => Promise<void>;
}

export function DocumentManager({ bookingId, documents, onUpdate }: DocumentManagerProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState<FloxDocument | null>(null);

  async function handleAction(action: string, payload: any) {
    setLoading(payload.documentType || payload.documentId || "action");
    try {
      await onUpdate({ action, ...payload });
    } catch {
      // Parent surface handles the visible error state.
    } finally {
      setLoading(null);
    }
  }

  async function handleSendDoc(doc: FloxDocument) {
    if (!window.confirm(`Möchten Sie das Dokument ${doc.number} jetzt an den Kunden senden?`)) return;
    setSendingId(doc.id);
    try {
      await handleAction("send_doc", { documentId: doc.id });
    } finally {
      setSendingId(null);
    }
  }

  function getStatusConfig(status: FloxDocumentStatus) {
    switch (status) {
      case "approved":
        return { label: "Freigegeben", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: FileCheck };
      case "sent":
        return { label: "Versendet", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Mail };
      case "draft":
        return { label: "Entwurf", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: Edit3 };
      default:
        return { label: status, color: "text-muted-foreground bg-white/5 border-white/10", icon: Clock };
    }
  }

  function getTypeLabel(type: FloxDocumentType) {
    switch (type) {
      case "quote":
        return "Angebot";
      case "order_confirmation":
        return "Auftragsbestätigung";
      case "invoice":
        return "Rechnung";
      case "inquiry_summary":
        return "Zusammenfassung";
      default:
        return type;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Operative Dokumente</h3>
        <div className="flex flex-wrap gap-2">
          <PremiumButton
            variant="ghost"
            size="sm"
            className="h-8 border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider"
            onClick={() => handleAction("create_doc", { documentType: "inquiry_summary" })}
            disabled={!!loading}
          >
            {loading === "inquiry_summary" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
            Zusammenfassung
          </PremiumButton>

          <PremiumButton
            variant="ghost"
            size="sm"
            className="h-8 border border-primary/20 bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/20"
            onClick={() => handleAction("create_doc", { documentType: "quote" })}
            disabled={!!loading}
          >
            {loading === "quote" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
            Angebot
          </PremiumButton>

          <PremiumButton
            variant="ghost"
            size="sm"
            className="h-8 border border-blue-500/20 bg-blue-500/10 text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:bg-blue-500/20"
            onClick={() => handleAction("create_doc", { documentType: "order_confirmation" })}
            disabled={!!loading}
          >
            {loading === "order_confirmation" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
            Bestätigung
          </PremiumButton>

          <PremiumButton
            variant="ghost"
            size="sm"
            className="h-8 border border-indigo-500/20 bg-indigo-500/10 text-[10px] font-bold uppercase tracking-wider text-indigo-400 hover:bg-indigo-500/20"
            onClick={() => handleAction("create_doc", { documentType: "invoice" })}
            disabled={!!loading}
          >
            {loading === "invoice" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="mr-1.5 h-3 w-3" />}
            Rechnung
          </PremiumButton>
        </div>
      </div>

      <div className="space-y-3">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-8 text-center">
            <FileText className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-xs text-muted-foreground">Noch keine operativen Dokumente erstellt.</p>
          </div>
        ) : (
          [...documents]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((doc) => {
              const status = getStatusConfig(doc.status);
              const StatusIcon = status.icon;

              return (
                <div
                  key={doc.id}
                  className="glass group flex flex-col items-start justify-between gap-4 rounded-xl border border-white/5 p-4 transition-all hover:border-white/20 md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "rounded-lg border p-2.5",
                        status.color.split(" ")[1],
                        status.color.split(" ")[2]
                      )}
                    >
                      {doc.type === "quote" && <FileCheck className="h-5 w-5" />}
                      {doc.type === "order_confirmation" && <ShoppingCart className="h-5 w-5" />}
                      {doc.type === "invoice" && <Receipt className="h-5 w-5" />}
                      {doc.type === "inquiry_summary" && <FileText className="h-5 w-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{getTypeLabel(doc.type)}</span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{doc.number}</span>
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <div className={cn("flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase", status.color)}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          <span>{status.label}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground/40">/</span>
                        <span className="text-[10px] text-muted-foreground/60">{new Date(doc.createdAt).toLocaleDateString("de-DE")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-end gap-2 border-t border-white/5 pt-3 md:w-auto md:border-t-0 md:pt-0">
                    {doc.status === "draft" && getTypeLabel(doc.type) !== "Zusammenfassung" ? (
                      <>
                        <PremiumButton
                          variant="ghost"
                          size="sm"
                          className="h-8 border border-white/10 bg-white/5 px-3 text-[10px] font-bold uppercase"
                          onClick={() => setEditingDoc(doc)}
                        >
                          <Edit3 className="mr-1.5 h-3 w-3" />
                          Bearbeiten
                        </PremiumButton>
                        <PremiumButton
                          variant="ghost"
                          size="sm"
                          className="h-8 border border-green-500/20 bg-green-500/10 px-3 text-[10px] font-bold uppercase text-green-500 hover:bg-green-500/20"
                          onClick={() => handleAction("update_doc", { documentId: doc.id, updatedDoc: { ...doc, status: "approved" } })}
                        >
                          <Check className="mr-1.5 h-3 w-3" />
                          Freigeben
                        </PremiumButton>
                      </>
                    ) : null}

                    {doc.status === "approved" ? (
                      <>
                        <PremiumButton
                          variant="ghost"
                          size="sm"
                          className="h-8 border border-white/10 bg-white/5 px-3 text-[10px] font-bold uppercase"
                          onClick={() => setEditingDoc(doc)}
                          title="Neue Version erstellen"
                        >
                          <History className="mr-1.5 h-3 w-3" />
                          Ändern
                        </PremiumButton>
                        <PremiumButton
                          variant="ghost"
                          size="sm"
                          className="h-8 bg-primary px-3 text-[10px] font-bold uppercase text-black hover:opacity-90"
                          onClick={() => handleSendDoc(doc)}
                          disabled={sendingId === doc.id}
                        >
                          {sendingId === doc.id ? (
                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                          ) : (
                            <Send className="mr-1.5 h-3 w-3" />
                          )}
                          Senden
                        </PremiumButton>
                      </>
                    ) : null}

                    {doc.status === "sent" ? (
                      <div className="flex flex-col items-end gap-1">
                        <div
                          className={cn(
                            "flex items-center gap-2 rounded-lg border px-3 py-1.5",
                            doc.deliveryInfo?.status === "success"
                              ? "border-green-500/10 bg-green-500/5 text-green-400"
                              : "border-blue-500/10 bg-blue-500/5 text-blue-400"
                          )}
                        >
                          {doc.deliveryInfo?.status === "success" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <RefreshCw className="h-3 w-3 animate-pulse" />
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {doc.deliveryInfo?.status === "success" ? "Zugestellt" : "Simulator / Dry-Run"}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground/60">
                          {doc.sentAt ? new Date(doc.sentAt).toLocaleString("de-DE") : "..."}
                        </span>
                      </div>
                    ) : null}

                    {doc.status === "paid" ? (
                      <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/20 px-3 py-1.5 text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Bezahlt</span>
                      </div>
                    ) : null}

                    <div className="mx-1 hidden h-6 w-px bg-white/5 md:block" />

                    <a
                      href={`/api/pdf/${bookingId}?documentId=${doc.id}`}
                      target="_blank"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
                      title="Download PDF"
                      rel="noreferrer"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
        )}
      </div>

      {editingDoc ? (
        <QuoteEditor
          document={editingDoc}
          onClose={() => setEditingDoc(null)}
          onSave={(updated) => handleAction("update_doc", { documentId: updated.id, updatedDoc: updated })}
        />
      ) : null}
    </div>
  );
}
