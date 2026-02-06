"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Copy, Printer, CheckCircle2, Plus, Trash2 } from "lucide-react";

interface ServiceItem {
    name: string;
    description: string;
    price: number;
}

export default function DocumentPage() {
    const params = useParams();
    const [booking, setBooking] = useState<any>(null);
    const [docType, setDocType] = useState<"angebot" | "auftrag">("angebot");
    const [items, setItems] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch booking details (Mock for now, would be API)
        // In real app: fetch(`/api/bookings/${params.id}`)
        fetch("/api/bookings").then(res => res.json()).then(data => {
            const found = data.find((b: any) => b.id === params.id);
            if (found) {
                setBooking(found);
                // Initialize items based on service and upgrades
                const initialItems: ServiceItem[] = [
                    {
                        name: found.service.charAt(0).toUpperCase() + found.service.slice(1),
                        description: `Basis-Paket für ${found.service} - Datum: ${found.details?.date || 'Nach Vereinbarung'}`,
                        price: 0
                    }
                ];
                if (found.upgrades) {
                    found.upgrades.forEach((u: string) => {
                        initialItems.push({
                            name: u.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                            description: "Signature Service Upgrade",
                            price: 0
                        });
                    });
                }
                setItems(initialItems);
            }
            setLoading(false);
        });
    }, [params.id]);

    const calculateTotal = () => {
        const subtotal = items.reduce((sum, item) => sum + item.price, 0);
        const vat = subtotal * 0.19;
        return { subtotal, vat, total: subtotal + vat };
    };

    const addItem = () => {
        setItems([...items, { name: "Neuer Posten", description: "Beschreibung eingeben...", price: 0 }]);
    };

    const deleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    if (loading || !booking) return <div className="p-10 text-center">Laden...</div>;

    const { subtotal, vat, total } = calculateTotal();
    const today = new Date().toLocaleDateString("de-DE");

    return (
        <div className="min-h-screen bg-slate-100 p-8 print:p-0 print:bg-white text-black">
            {/* Controls - Hidden in Print */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
                <div className="flex gap-4">
                    <PremiumButton
                        variant={docType === "angebot" ? "primary" : "ghost"}
                        onClick={() => setDocType("angebot")}
                        className={docType === "angebot" ? "" : "text-black hover:bg-black/5"}
                    >
                        Angebot
                    </PremiumButton>
                    <PremiumButton
                        variant={docType === "auftrag" ? "primary" : "ghost"}
                        onClick={() => setDocType("auftrag")}
                        className={docType === "auftrag" ? "" : "text-black hover:bg-black/5"}
                    >
                        Auftrag
                    </PremiumButton>
                </div>
                <PremiumButton onClick={() => window.print()} className="gap-2">
                    <Printer size={16} /> PDF Herunterladen / Drucken
                </PremiumButton>
            </div>

            {/* A4 Page */}
            <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-xl p-[20mm] print:shadow-none print:p-0 relative text-sm leading-relaxed font-sans">

                {/* Header */}
                <div className="flex justify-between items-start mb-16">
                    <div>
                        <div className="relative w-24 h-24 mb-6">
                            <Image src="/logo_v10.png" alt="Floxant" fill className="object-contain" priority />
                        </div>
                        <h1 className="text-3xl font-bold tracking-wide">floxant.</h1>
                        <p className="text-sm text-gray-500 mt-2">Premium Services</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        <p>Floxant GmbH</p>
                        <p>Musterstraße 123</p>
                        <p>10115 Berlin</p>
                        <p>Deutschland</p>
                        <p className="mt-2">Tel: +49 30 12345678</p>
                        <p>Email: contact@floxant.de</p>
                    </div>
                </div>

                {/* Recipient line */}
                <div className="mb-12 text-sm">
                    <p>{booking.name}</p>
                    <p>{booking.email}</p>
                    <p>{booking.phone}</p>
                </div>

                {/* Subject & Date */}
                <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            {docType === "angebot" ? "Angebot" : "Auftragsbestätigung"}
                        </h2>
                        <p className="text-gray-500">Nr. {booking.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <p className="text-gray-500">Berlin, den {today}</p>
                </div>

                {/* Intro */}
                <p className="mb-8">
                    Sehr geehrte(r) {booking.name},
                </p>
                <p className="mb-8">
                    vielen Dank für Ihre Anfrage. Basierend auf Ihren Angaben, erlauben wir uns, Ihnen folgendes {docType === "angebot" ? "Angebot" : "Auftrag"} zu unterbreiten:
                </p>

                {/* Table */}
                <table className="w-full mb-8 border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300 text-left">
                            <th className="py-2 w-16">Pos.</th>
                            <th className="py-2">Beschreibung</th>
                            <th className="py-2 text-right w-32">Betrag (€)</th>
                            <th className="py-2 w-10 print:hidden"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-100 group">
                                <td className="py-4 text-black align-top">{idx + 1}</td>
                                <td className="py-4 align-top">
                                    <input
                                        value={item.name}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].name = e.target.value;
                                            setItems(newItems);
                                        }}
                                        className="font-semibold block w-full bg-transparent mb-1 focus:outline-none placeholder:text-gray-300"
                                        placeholder="Dienstleistung"
                                    />
                                    <textarea
                                        value={item.description}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].description = e.target.value;
                                            setItems(newItems);
                                        }}
                                        rows={2}
                                        className="text-gray-700 text-xs w-full bg-transparent focus:outline-none resize-y min-h-[40px]"
                                        placeholder="Beschreibung..."
                                    />
                                </td>
                                <td className="py-4 text-right align-top">
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].price = Number(e.target.value);
                                            setItems(newItems);
                                        }}
                                        className="text-right w-full bg-transparent p-1 border border-transparent hover:border-gray-200 rounded focus:border-primary focus:outline-none transition-colors"
                                    />
                                </td>
                                <td className="py-4 text-center align-top print:hidden">
                                    <button
                                        onClick={() => deleteItem(idx)}
                                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2} className="py-4 text-right font-medium text-gray-500">Zwischensumme</td>
                            <td className="py-4 text-right font-medium">{subtotal.toFixed(2)} €</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="py-2 text-right text-gray-500">MwSt. 19%</td>
                            <td className="py-2 text-right text-gray-500">{vat.toFixed(2)} €</td>
                        </tr>
                        <tr className="text-lg">
                            <td colSpan={2} className="py-4 text-right font-bold">Gesamtsumme</td>
                            <td className="py-4 text-right font-bold">{total.toFixed(2)} €</td>
                        </tr>
                    </tfoot>
                </table>

                <div className="mb-8 print:hidden">
                    <PremiumButton variant="ghost" size="sm" onClick={addItem} className="gap-2 text-xs h-8 text-muted-foreground border border-dashed border-gray-300 w-full justify-center hover:bg-gray-50 hover:text-primary hover:border-primary">
                        <Plus size={14} /> Position hinzufügen
                    </PremiumButton>
                </div>

                {/* Footer Text */}
                <div className="mt-12 text-xs text-gray-800 leading-relaxed border-t border-gray-300 pt-8">
                    <p className="mb-4">
                        Dieses Angebot ist freibleibend. Zahlungsziel: 14 Tage nach Rechnungserhalt.
                        Es gelten unsere Allgemeinen Geschäftsbedingungen (AGB).
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <strong>Bankverbindung:</strong><br />
                            Floxant Bank<br />
                            IBAN: DE12 3456 7890 1234 5678 90<br />
                            BIC: FLOXDEBB
                        </div>
                        <div className="text-right">
                            <strong>Handelsregister:</strong><br />
                            Amtsgericht Berlin-Charlottenburg<br />
                            HRB 123456<br />
                            Geschäftsführer: Max Mustermann
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
