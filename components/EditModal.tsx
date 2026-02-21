"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import { PremiumButton } from "./ui/PremiumButton";

interface EditModalProps {
    booking: any;
    onClose: () => void;
    onSave: (updatedBooking: any) => void;
}

export function EditModal({ booking, onClose, onSave }: EditModalProps) {
    const [status, setStatus] = useState(booking.status);
    const [notes, setNotes] = useState(booking.notes || "");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        onSave({
            ...booking,
            status,
            notes
        });
        setSaving(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <m.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden"
            >
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -z-10" />

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Buchung bearbeiten</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Status ändern</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['offen', 'in_bearbeitung', 'abgeschlossen'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${status === s
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-200'
                                        }`}
                                >
                                    {s.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Interne Notizen</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Notizen zur Buchung..."
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 h-32 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Abbrechen
                        </button>
                        <a href={`/dashboard/documents/${booking.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <PremiumButton variant="outline" className="gap-2 h-9">
                                Dokument
                            </PremiumButton>
                        </a>
                        <PremiumButton onClick={handleSave} disabled={saving} className="min-w-[100px]">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Speichern</div>}
                        </PremiumButton>
                    </div>
                </div>
            </m.div>
        </div>
    );
}
