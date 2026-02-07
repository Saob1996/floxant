"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { EditModal } from "@/components/EditModal";
import {
    Box, Sparkles, Trash2, Calendar, FileText, Download,
    User, Phone, Mail, Clock, Search, Filter,
    MoreHorizontal, CheckCircle2, AlertCircle, Inbox, LayoutDashboard, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Booking {
    id: string;
    service: string;
    name: string;
    email: string;
    phone: string;
    timestamp: string;
    status: string;
    upgrades: string[];
    file_url?: string;
}

export default function Dashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterService, setFilterService] = useState<string | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        fetch("/api/bookings")
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getIcon = (service: string) => {
        switch (service) {
            case "umzug": return <Box className="w-5 h-5 text-blue-400" />;
            case "reinigung": return <Sparkles className="w-5 h-5 text-cyan-400" />;
            case "entsorgung": return <Trash2 className="w-5 h-5 text-orange-400" />;
            default: return <FileText className="w-5 h-5" />;
        }
    };

    const getColor = (service: string) => {
        switch (service) {
            case "umzug": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "reinigung": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
            case "entsorgung": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesService = filterService ? b.service === filterService : true;
        return matchesSearch && matchesService;
    });

    // Stats calculation
    const totalRequests = bookings.length;
    const newRequests = bookings.filter(b => {
        const date = new Date(b.timestamp);
        const now = new Date();
        return (now.getTime() - date.getTime()) < (24 * 60 * 60 * 1000);
    }).length;

    const handleUpdateBooking = (updated: Booking) => {
        const newBookings = bookings.map(b => b.id === updated.id ? updated : b);
        setBookings(newBookings);
        // In a real app, you would PUT to API here
    };

    return (
        <div className="min-h-screen bg-background">
            <AnimatePresence>
                {selectedBooking && (
                    <EditModal
                        booking={selectedBooking}
                        onClose={() => setSelectedBooking(null)}
                        onSave={handleUpdateBooking}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar / Navigation */}
            <header className="border-b border-white/10 bg-black/5 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="text-primary-foreground w-5 h-5" />
                        </div>
                        <h1 className="font-bold text-xl tracking-tight">Floxant<span className="opacity-50 font-normal">Internal</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium">System operational</span>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden md:inline">Abmelden</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Inbox className="w-16 h-16" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Gesamt Anfragen</p>
                        <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">{totalRequests}</h3>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-primary group-hover:scale-110 transition-transform">
                            <Sparkles className="w-16 h-16" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Neu (24h)</p>
                        <h3 className="text-4xl font-bold text-primary">{newRequests}</h3>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-green-500 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-16 h-16" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Status</p>
                        <h3 className="text-4xl font-bold text-green-500">Aktiv</h3>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Suchen nach Name oder Email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setFilterService(null)}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap", !filterService ? "bg-primary text-primary-foreground border-primary" : "bg-white/5 border-white/10 hover:bg-white/10")}
                        >
                            Alle
                        </button>
                        <button
                            onClick={() => setFilterService("umzug")}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap", filterService === "umzug" ? "bg-blue-500 text-white border-blue-500" : "bg-white/5 border-white/10 hover:bg-white/10")}
                        >
                            Umzug
                        </button>
                        <button
                            onClick={() => setFilterService("reinigung")}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap", filterService === "reinigung" ? "bg-cyan-500 text-white border-cyan-500" : "bg-white/5 border-white/10 hover:bg-white/10")}
                        >
                            Reinigung
                        </button>
                        <button
                            onClick={() => setFilterService("entsorgung")}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap", filterService === "entsorgung" ? "bg-orange-500 text-white border-orange-500" : "bg-white/5 border-white/10 hover:bg-white/10")}
                        >
                            Entsorgung
                        </button>
                    </div>
                </div>

                {/* List */}
                {loading ? (
                    <div className="text-center py-20 text-muted-foreground animate-pulse">Synchronisiere Datenbank...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                        <Inbox className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground font-medium">Keine passenden Anfragen gefunden.</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">Versuchen Sie die Filter anzupassen.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <AnimatePresence>
                            {filteredBookings.map((booking, index) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass p-0 rounded-xl border border-white/10 hover:border-primary/20 transition-all overflow-hidden group"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left Status Bar */}
                                        <div className={cn("w-full lg:w-2 h-2 lg:h-auto", booking.service === 'umzug' ? 'bg-blue-500' : booking.service === 'reinigung' ? 'bg-cyan-500' : 'bg-orange-500')} />

                                        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                            <div className="flex gap-4 items-center">
                                                <div className={cn("p-3 rounded-xl h-fit", getColor(booking.service))}>
                                                    {getIcon(booking.service)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-bold text-lg capitalize">{booking.service}</h3>
                                                        <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border", getColor(booking.service))}>
                                                            {booking.service}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(booking.timestamp).toLocaleString("de-DE")}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1 text-sm text-foreground/80">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-muted-foreground" />
                                                    <span className="font-medium">{booking.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                                    <a href={`mailto:${booking.email}`} className="hover:text-primary transition-colors">{booking.email}</a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                                    <a href={`tel:${booking.phone}`} className="hover:text-primary transition-colors">{booking.phone}</a>
                                                </div>
                                                {booking.file_url && (
                                                    <img
                                                        src={booking.file_url}
                                                        alt="Booking upload"
                                                        style={{
                                                            width: "120px",
                                                            marginTop: "8px",
                                                            borderRadius: "6px",
                                                            border: "1px solid #e5e7eb",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 max-w-xs justify-start md:justify-end">
                                                {booking.upgrades && booking.upgrades.length > 0 ? booking.upgrades.map(u => (
                                                    <span key={u} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                                                        {u.replace(/_/g, " ")}
                                                    </span>
                                                )) : <span className="text-xs text-muted-foreground italic">Keine Extras</span>}
                                            </div>

                                            <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                                                {booking.file_url ? (
                                                    <PremiumButton size="icon" variant="ghost" className="h-10 w-10 text-primary bg-primary/10 hover:bg-primary/20" onClick={() => window.open(booking.file_url, '_blank')}>
                                                        <FileText className="w-5 h-5" />
                                                    </PremiumButton>
                                                ) : (
                                                    <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center opacity-50 cursor-not-allowed">
                                                        <FileText className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                )}

                                                <PremiumButton className="w-full md:w-auto" onClick={() => setSelectedBooking(booking)}>
                                                    Bearbeiten
                                                </PremiumButton>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
