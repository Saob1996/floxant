"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Download, Printer, Plus, Trash2, Loader2 } from "lucide-react";

// Force dynamic rendering — prevents 404 on dynamic [id] param
export const dynamic = 'force-dynamic';

interface LineItem {
    description: string;
    quantity: number;
    unitPrice: number; // Netto price per unit
}

// FLOXANT Business Data (German Compliance)
const BUSINESS = {
    name: "FLOXANT – Saleh Obid",
    street: "Johanna-Kinkel-Straße 1 + 2",
    zip: "93049",
    city: "Regensburg",
    country: "Deutschland",
    phone: "+49 1577 1105087",
    email: "info@floxant.de",
    steuernummer: "103/5163/5231",
    ustIdNr: "DE 45971484",
    bank: "Sparkasse Neuss",
    iban: "DE87 3055 0000 0093 7290 93",
    bic: "",
    vatRate: 0.19,
    vatLabel: "Umsatzsteuer 19%",
} as const;

export default function DocumentPage() {
    const params = useParams();
    const [booking, setBooking] = useState<any>(null);
    const [docType, setDocType] = useState<"rechnung" | "angebot" | "auftragsbestaetigung">("angebot");
    const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "", address: "" });
    const [items, setItems] = useState<LineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [leistungsdatum, setLeistungsdatum] = useState(
        new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    );

    useEffect(() => {
        fetch("/api/bookings").then(res => res.json()).then(data => {
            const found = data.find((b: any) => b.id === params.id);
            if (found) {
                setBooking(found);
                setClientInfo({
                    name: found.name || "",
                    email: found.email || "",
                    phone: found.phone || "",
                    address: ""
                });
                
                const initialItems: LineItem[] = [
                    {
                        description: '$...$... – $...',
                        quantity: 1,
                        unitPrice: 0,
                    }
                ];
                if (found.upgrades) {
                    found.upgrades.forEach((u: string) => {
                        initialItems.push({
                            description: u.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                            quantity: 1,
                            unitPrice: 0,
                        });
                    });
                }
                setItems(initialItems);
            }
            setLoading(false);
        });
    }, [params.id]);

    // -- Calculation --
    const calculateTotals = () => {
        const netto = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const ust = netto * BUSINESS.vatRate;
        const brutto = netto + ust;
        return { netto, ust, brutto };
    };

    const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
        setItems(prev => {
            const next = [...prev];
            if (field === 'description') {
                next[index] = { ...next[index], description: value as string };
            } else {
                next[index] = { ...next[index], [field]: Number(value) || 0 };
            }
            return next;
        });
    };

    const addItem = () => {
        setItems(prev => [...prev, { description: "", quantity: 1, unitPrice: 0 }]);
    };

    const deleteItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleDownload = async () => {
        if (!booking) return;
        setDownloading(true);
        try {
            const response = await fetch(`/api/pdf/${params.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    docType,
                    items,
                    clientInfo,
                    leistungsdatum
                })
            });
            if (!response.ok) throw new Error('PDF Generation failed');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const prefix = docType === 'rechnung' ? 'RE' : docType === 'auftragsbestaetigung' ? 'AB' : 'AG';
            a.download = `${prefix}-${(params.id as string).slice(0, 8).toUpperCase()}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("PDF Download error:", error);
            alert("Fehler beim Erstellen des PDFs.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Laden...</div>;
    if (!booking) return <div className="p-10 text-center text-red-500">Buchung nicht gefunden.</div>;

    const { netto, ust, brutto } = calculateTotals();
    const today = new Date().toLocaleDateString("de-DE");
    const docTitle = docType === "rechnung" ? "RECHNUNG" : docType === "auftragsbestaetigung" ? "AUFTRAGSBESTÄTIGUNG" : "ANGEBOT";
    const docNr = `${docType === "rechnung" ? "RE" : docType === "auftragsbestaetigung" ? "AB" : "AG"}-${booking.id.slice(0, 8).toUpperCase()}`;

    // Format dates for display
    const dateArr = leistungsdatum.split('-');
    const formattedDate = dateArr.length === 3 ? `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}` : leistungsdatum;

    return (
        <div className="min-h-screen bg-slate-100 p-8 print:p-0 print:bg-white text-black">
            {/* Controls — hidden in print */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex gap-2">
                    <PremiumButton
                        variant={docType === "angebot" ? "primary" : "ghost"}
                        onClick={() => setDocType("angebot")}
                        className={`px-3 py-1.5 h-auto text-sm ${docType === "angebot" ? "" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        Angebot
                    </PremiumButton>
                    <PremiumButton
                        variant={docType === "auftragsbestaetigung" ? "primary" : "ghost"}
                        onClick={() => setDocType("auftragsbestaetigung")}
                        className={`px-3 py-1.5 h-auto text-sm ${docType === "auftragsbestaetigung" ? "" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        Auftragsbestätigung
                    </PremiumButton>
                    <PremiumButton
                        variant={docType === "rechnung" ? "primary" : "ghost"}
                        onClick={() => setDocType("rechnung")}
                        className={`px-3 py-1.5 h-auto text-sm ${docType === "rechnung" ? "" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                        Rechnung
                    </PremiumButton>
                </div>

                <div className="flex gap-3">
                    <PremiumButton
                        onClick={handleDownload}
                        disabled={downloading}
                        className="gap-2 px-4 py-2 h-auto text-sm"
                    >
                        {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
                        PDF Herunterladen
                    </PremiumButton>
                    <PremiumButton variant="ghost" onClick={() => window.print()} className="gap-2 px-4 py-2 h-auto text-sm text-gray-600 hover:bg-gray-100">
                        <Printer size={16} /> Drucken
                    </PremiumButton>
                </div>
            </div>

            {/* A4 Page */}
            <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl p-[20mm] print:shadow-none print:p-[15mm] text-sm leading-relaxed font-sans flex flex-col relative overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <div className="relative w-20 h-20 mb-4">
                            <Image src="/logo_v10.png" alt="FLOXANT" fill className="object-contain" priority />
                        </div>
                        <h1 className="text-2xl font-bold tracking-wide">FLOXANT</h1>
                        <p className="text-xs text-gray-500 mt-1">Premium Umzug · Reinigung · Entrümpelung</p>
                    </div>
                    <div className="text-end text-[11px] text-gray-600 leading-relaxed">
                        <p className="font-semibold">{BUSINESS.name}</p>
                        <p>{BUSINESS.street}</p>
                        <p>{BUSINESS.zip} {BUSINESS.city}</p>
                        <p>{BUSINESS.country}</p>
                        <p className="mt-2">Tel: {BUSINESS.phone}</p>
                        <p>E-Mail: {BUSINESS.email}</p>
                    </div>
                </div>

                {/* Recipient - Editable */}
                <div className="mb-10 text-sm">
                    <p className="text-[9px] text-gray-400 mb-1 border-b border-gray-200 pb-1">
                        {BUSINESS.name} · {BUSINESS.street} · {BUSINESS.zip} {BUSINESS.city}
                    </p>
                    <div className="mt-3 flex flex-col gap-1 w-72">
                        <input 
                            value={clientInfo.name} 
                            onChange={(e) => setClientInfo(prev => ({...prev, name: e.target.value}))} 
                            className="font-bold bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none py-1 text-base p-0 m-0"
                            placeholder="Kundenname..."
                        />
                        <input 
                            value={clientInfo.email} 
                            onChange={(e) => setClientInfo(prev => ({...prev, email: e.target.value}))} 
                            className="bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none py-0.5 p-0 m-0"
                            placeholder="E-Mail Adresse..."
                        />
                        <input 
                            value={clientInfo.phone} 
                            onChange={(e) => setClientInfo(prev => ({...prev, phone: e.target.value}))} 
                            className="bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none py-0.5 p-0 m-0"
                            placeholder="Telefonnummer..."
                        />
                        <input 
                            value={clientInfo.address} 
                            onChange={(e) => setClientInfo(prev => ({...prev, address: e.target.value}))} 
                            className="bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none py-0.5 p-0 m-0"
                            placeholder="Zusatzadresse (optional)"
                        />
                    </div>
                </div>

                {/* Document Title + Number + Dates */}
                <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-4">
                    <div>
                        <h2 className="text-xl font-bold">{docTitle}</h2>
                        <p className="text-gray-500 text-sm">{docNr}</p>
                    </div>
                    <div className="text-end text-sm text-gray-600">
                        <p>Datum: {today}</p>
                        <div className="flex items-center gap-2 mt-1 print:block">
                            <span>Leistungsdatum:</span>
                            <input
                                type="date"
                                value={leistungsdatum}
                                onChange={(e) => setLeistungsdatum(e.target.value)}
                                className="bg-transparent border-b border-gray-300 focus:border-primary focus:outline-none text-end print:border-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Intro */}
                <p className="mb-6">
                    <span className="flex items-center gap-1">Sehr geehrte(r) <span className="font-medium">{clientInfo.name || "Kunde"}</span>,</span>
                </p>
                <p className="mb-8">
                    {docType === "angebot"
                        ? "vielen Dank für Ihre Anfrage. Wir unterbreiten Ihnen folgendes Angebot:"
                        : docType === "rechnung"
                        ? "wir stellen Ihnen folgende Leistungen in Rechnung:"
                        : "hiermit bestätigen wir Ihren Auftrag basierend auf den folgenden Angaben:"}
                </p>

                {/* Table — Editable */}
                <table className="w-full mb-6 border-collapse">
                    <thead>
                        <tr className="border-b-2 border-gray-300 text-start text-xs uppercase tracking-wider text-gray-500">
                            <th className="py-2 w-12">Pos.</th>
                            <th className="py-2">Beschreibung</th>
                            <th className="py-2 text-end w-16">Menge</th>
                            <th className="py-2 text-end w-28">Einzelpreis</th>
                            <th className="py-2 text-end w-28">Gesamt</th>
                            <th className="py-2 w-10 print:hidden"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => {
                            const lineTotal = item.quantity * item.unitPrice;
                            return (
                                <tr key={idx} className="border-b border-gray-100 group">
                                    <td className="py-3 text-gray-500 align-top">{idx + 1}</td>
                                    <td className="py-3 align-top pe-">
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updateItem(idx, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full bg-transparent focus:outline-none resize-y min-h-[36px] text-sm placeholder:text-gray-300 border border-transparent hover:border-gray-200 rounded p-1"
                                            placeholder="Leistungsbeschreibung eingeben..."
                                        />
                                    </td>
                                    <td className="py-3 text-end align-top">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                                            className="w-14 text-end bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none"
                                        />
                                    </td>
                                    <td className="py-3 text-end align-top">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={item.unitPrice}
                                            onChange={(e) => updateItem(idx, 'unitPrice', e.target.value)}
                                            className="w-24 text-end bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none"
                                        />
                                    </td>
                                    <td className="py-3 text-end align-top font-medium">
                                        {lineTotal.toFixed(2)} €
                                    </td>
                                    <td className="py-3 text-center align-top print:hidden">
                                        <button
                                            onClick={() => deleteItem(idx)}
                                            className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Add row button */}
                <div className="mb-8 print:hidden">
                    <PremiumButton
                        variant="ghost"
                        size="sm"
                        onClick={addItem}
                        className="gap-2 text-xs h-8 text-gray-500 border border-dashed border-gray-300 w-full justify-center hover:bg-gray-50 hover:text-black hover:border-black"
                    >
                        <Plus size={14} /> Position hinzufügen
                    </PremiumButton>
                </div>

                {/* Totals */}
                <div className="ms- w-72 border-t border-gray-200 pt-4">
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500">Zwischensumme (Netto)</span>
                        <span>{netto.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="text-gray-500">{BUSINESS.vatLabel}</span>
                        <span>{ust.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between py-2 mt-2 border-t-2 border-black text-lg font-bold">
                        <span>Gesamtbetrag (Brutto)</span>
                        <span>{brutto.toFixed(2)} €</span>
                    </div>
                </div>

                {/* Footer — Legal & Signature Block */}
                <div className="mt-auto pt-16 border-t border-gray-300 text-[9px] text-gray-600 leading-relaxed pb-[40px]">
                    <p className="mb-3 text-[10px]">
                        {docType === "angebot"
                            ? "Dieses Angebot ist freibleibend und 30 Tage gültig. Es gelten unsere AGB."
                            : docType === "rechnung"
                            ? "Zahlungsziel: 14 Tage nach Rechnungserhalt ohne Abzug. Es gelten unsere AGB."
                            : "Bitte senden Sie uns ein unterzeichnetes Exemplar zurück. Es gelten unsere AGB."}
                    </p>

                    {docType === 'auftragsbestaetigung' && (
                        <div className="mt-8 mb-6 flex justify-between print:mt-12">
                            <div className="border-t border-gray-400 w-48 pt-1 text-[10px] text-gray-500">
                                Ort, Datum
                            </div>
                            <div className="border-t border-gray-400 w-56 pt-1 text-[10px] text-gray-500">
                                Unterschrift Kunde ({clientInfo.name || "Auftraggeber"})
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-6 pt-4">
                        <div>
                            <p className="font-semibold mb-1">{BUSINESS.name}</p>
                            <p>{BUSINESS.street}</p>
                            <p>{BUSINESS.zip} {BUSINESS.city}</p>
                            <p>Tel: {BUSINESS.phone}</p>
                            <p>E-Mail: {BUSINESS.email}</p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Bankverbindung</p>
                            <p>{BUSINESS.bank}</p>
                            <p>IBAN: {BUSINESS.iban}</p>
                            {BUSINESS.bic && <p>BIC: {BUSINESS.bic}</p>}
                        </div>
                        <div className="text-end">
                            <p className="font-semibold mb-1">Steuerliche Angaben</p>
                            <p>St.-Nr.: {BUSINESS.steuernummer}</p>
                            <p>USt-IdNr: {BUSINESS.ustIdNr}</p>
                            <p className="mt-1 text-[8px]">
                                Umsatzsteuer wird gemäß<br />
                                §1 Abs. 1 Nr. 1 UStG berechnet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
