"use client";

import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
 Box,
 Briefcase,
 CheckCircle2,
 Clock,
 Crown,
 FileText,
 Inbox,
 LayoutDashboard,
 LogOut,
 MapPin,
 PauseCircle,
 PieChart as PieChartIcon,
 PlusCircle,
 Route,
 Search,
 Sparkles,
 Trash2,
 TrendingUp,
 Truck,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { BookingDetailView } from "@/components/dashboard/BookingDetailView";
import { GalleryModal } from "@/components/GalleryModal";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { IntakePayload } from "@/lib/types/intake";
import type { BackhaulOffer } from "@/lib/backhaul-offers";

export interface Booking {
 id: string;
 service: string;
 name: string;
 email: string;
 phone: string;
 timestamp: string;
 status: string;
 notes?: string;
 upgrades: string[];
 file_urls?: string[];
 file_url?: string;
 details?: IntakePayload;
}

interface DashboardClientProps {
 dict: any;
}

const initialBackhaulForm: Partial<BackhaulOffer> = {
 title: "Leer-Rückfahrt für Firmen und Privatkunden Richtung Regensburg",
 date: "",
 timeWindow: "nach Absprache",
 origin: "Deutschlandweit auf Anfrage",
 destination: "Regensburg",
 destinationRadius: "ca. 150 km um Regensburg",
 routeAreas: ["Nürnberg", "München", "Ingolstadt", "Landshut"],
 vehicleType: "Transporter oder LKW nach Tour",
 availableCapacity: "Büroinventar, Möbel, Kartons, Paletten, Einzelstücke",
 priceHint: "fairer Rückfahrt-Preis nach Route und Volumen",
 fairPriceNote:
  "Wenn Route, Datum und Ladepunkte zur ohnehin geplanten Rückfahrt passen, kann FLOXANT freie Fahrzeugkapazität fair anbieten. Sinnvolle Stopps unterwegs werden mit transparentem Umwegpreis geprüft.",
 status: "active",
 adminNote: "",
};

function formatStatus(status: string) {
 if (!status) return "Unbekannt";
 if (status === "new") return "Neu";
 return status.replace(/_/g, " ");
}

function getStatusTone(status: string) {
 if (status === "new") return "border-green-500/20 bg-green-500/10 text-green-400";
 if (status === "in_bearbeitung") return "border-blue-500/20 bg-blue-500/10 text-blue-400";
 if (status === "angebot_versendet") return "border-cyan-500/20 bg-cyan-500/10 text-cyan-300";
 if (status === "abgeschlossen") return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
 return "border-white/10 bg-white/5 text-muted-foreground";
}

function formatMoneyRange(booking: Booking) {
 const valuation = booking.details?.valuation;
 if (!valuation?.systemPriceRangeMin || !valuation?.systemPriceRangeMax) return "Noch keine Einschätzung";
 return `${valuation.systemPriceRangeMin} EUR - ${valuation.systemPriceRangeMax} EUR`;
}

function serviceMatchesFilter(service: string, filterService: string | null) {
 if (!filterService) return true;
 if (filterService === "private_client") return service === "private_client" || service === "villenservice";
 return service === filterService;
}

function getServiceDisplay(service: string) {
 const normalized = service === "villenservice" ? "private_client" : service;
 const fallback = {
  label: service.replace(/_/g, " "),
  Icon: Box,
  railClass: "bg-slate-400",
  iconClass: "bg-slate-500/10 text-slate-300",
 };

 const displays: Record<string, typeof fallback> = {
  umzug: {
   label: "Umzug",
   Icon: Box,
   railClass: "bg-blue-500",
   iconClass: "bg-blue-500/10 text-blue-400",
  },
  reinigung: {
   label: "Reinigung",
   Icon: Sparkles,
   railClass: "bg-cyan-500",
   iconClass: "bg-cyan-500/10 text-cyan-400",
  },
  entsorgung: {
   label: "Entrümpelung",
   Icon: Trash2,
   railClass: "bg-orange-500",
   iconClass: "bg-orange-500/10 text-orange-400",
  },
  bueroumzug: {
   label: "Büroumzug",
   Icon: Briefcase,
   railClass: "bg-sky-400",
   iconClass: "bg-sky-500/10 text-sky-300",
  },
  firmenentsorgung: {
   label: "Firmenentsorgung",
   Icon: Trash2,
   railClass: "bg-teal-400",
   iconClass: "bg-teal-500/10 text-teal-300",
  },
  leerfahrt: {
   label: "Leer-Rückfahrt",
   Icon: Truck,
   railClass: "bg-emerald-400",
   iconClass: "bg-emerald-500/10 text-emerald-300",
  },
  beiladung: {
   label: "Beiladung",
   Icon: Truck,
   railClass: "bg-indigo-400",
   iconClass: "bg-indigo-500/10 text-indigo-300",
  },
  private_client: {
   label: "Private Client",
   Icon: Crown,
   railClass: "bg-[#d8b76e]",
   iconClass: "bg-[#d8b76e]/10 text-[#d8b76e]",
  },
 };

 return displays[normalized] || fallback;
}

function getMainLocation(booking: Booking) {
 return booking.details?.configuration?.fromAddress || booking.details?.configuration?.location || "Unbekannt";
}

export default function DashboardClient({ dict }: DashboardClientProps) {
 const { data: session, status } = useSession();
 const router = useRouter();
 const [bookings, setBookings] = useState<Booking[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [filterService, setFilterService] = useState<string | null>(null);
 const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
 const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
 const [galleryIndex, setGalleryIndex] = useState(0);
 const [mounted, setMounted] = useState(false);
 const [backhaulOffers, setBackhaulOffers] = useState<BackhaulOffer[]>([]);
 const [backhaulForm, setBackhaulForm] = useState<Partial<BackhaulOffer>>(initialBackhaulForm);
 const [savingBackhaul, setSavingBackhaul] = useState(false);

 const t = dict.dashboard;
 const tAuth = dict.auth;

 useEffect(() => {
  setMounted(true);
 }, []);

 useEffect(() => {
  if (status === "unauthenticated") {
   router.push("/login");
  }
 }, [router, status]);

 useEffect(() => {
  if (status !== "authenticated") return;

  supabase.from("bookings").select("id").limit(1).then(({ error }) => {
   if (error) {
    console.error("Supabase client ping failed:", error);
   }
  });

  fetch("/api/bookings")
   .then((response) => response.json())
   .then((data) => {
    setBookings(Array.isArray(data) ? data : []);
    setLoading(false);
   })
   .catch((error) => {
    console.error(error);
    setLoading(false);
   });

  fetch("/api/backhauls?all=1")
   .then((response) => response.json())
   .then((data) => {
    if (Array.isArray(data)) setBackhaulOffers(data);
   })
   .catch((error) => console.error("Backhaul offer fetch failed:", error));
 }, [status]);

 const filteredBookings = useMemo(() => {
  return bookings.filter((booking) => {
   const matchesSearch =
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.toLowerCase().includes(searchTerm.toLowerCase());
   const matchesService = serviceMatchesFilter(booking.service, filterService);
   return matchesSearch && matchesService;
  });
 }, [bookings, filterService, searchTerm]);

 const timelineData = useMemo(() => {
  if (!mounted) return [];
  const map = new Map<string, number>();

  bookings.forEach((booking) => {
   const label = new Date(booking.timestamp).toLocaleDateString("de-DE", { month: "short", day: "numeric" });
   map.set(label, (map.get(label) || 0) + 1);
  });

  return Array.from(map.entries())
   .map(([name, leads]) => ({ name, leads }))
   .reverse()
   .slice(0, 14);
 }, [bookings, mounted]);

 const serviceData = useMemo(() => {
  if (!mounted) return [];
  let umzug = 0;
  let reinigung = 0;
  let entsorgung = 0;
  let bueroumzug = 0;
  let leerfahrt = 0;
  let firmenentsorgung = 0;
  let privateClient = 0;

  bookings.forEach((booking) => {
   if (booking.service === "umzug") umzug += 1;
   if (booking.service === "reinigung") reinigung += 1;
   if (booking.service === "entsorgung") entsorgung += 1;
   if (booking.service === "bueroumzug") bueroumzug += 1;
   if (booking.service === "leerfahrt") leerfahrt += 1;
   if (booking.service === "firmenentsorgung") firmenentsorgung += 1;
   if (booking.service === "private_client" || booking.service === "villenservice") privateClient += 1;
  });

  return [
   { name: "Umzug", value: umzug, color: "#3b82f6" },
   { name: "Reinigung", value: reinigung, color: "#22d3ee" },
   { name: "Entsorgung", value: entsorgung, color: "#f97316" },
   { name: "Büroumzug", value: bueroumzug, color: "#06b6d4" },
   { name: "Leerfahrt", value: leerfahrt, color: "#34d399" },
   { name: "Firmenentsorgung", value: firmenentsorgung, color: "#38bdf8" },
   { name: "Private Client", value: privateClient, color: "#d8b76e" },
  ].filter((entry) => entry.value > 0);
 }, [bookings, mounted]);

 const newRequests = mounted
  ? bookings.filter((booking) => Date.now() - new Date(booking.timestamp).getTime() < 24 * 60 * 60 * 1000).length
  : 0;

 function handleUpdateBooking(updated: Booking) {
  setBookings((prev) => prev.map((booking) => (booking.id === updated.id ? updated : booking)));
 }

 function openGallery(images: string[], index = 0) {
  setGalleryImages(images);
  setGalleryIndex(index);
 }

 function updateBackhaulField(field: keyof BackhaulOffer, value: string) {
  setBackhaulForm((current) => ({
   ...current,
   [field]: field === "routeAreas" ? value.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean) : value,
  }));
 }

 async function reloadBackhaulOffers() {
  const response = await fetch("/api/backhauls?all=1");
  const data = await response.json();
  if (Array.isArray(data)) setBackhaulOffers(data);
 }

 async function saveBackhaulOffer(event: React.FormEvent) {
  event.preventDefault();
  setSavingBackhaul(true);

  try {
   const response = await fetch("/api/backhauls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backhaulForm),
   });

   if (!response.ok) throw new Error("Backhaul save failed");
   await reloadBackhaulOffers();
   setBackhaulForm(initialBackhaulForm);
  } catch (error) {
   console.error(error);
   alert("Leer-Rückfahrt konnte nicht gespeichert werden.");
  } finally {
   setSavingBackhaul(false);
  }
 }

 async function setBackhaulStatus(offer: BackhaulOffer, nextStatus: BackhaulOffer["status"]) {
  try {
   const response = await fetch(`/api/backhauls/${offer.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...offer, status: nextStatus }),
   });

   if (!response.ok) throw new Error("Backhaul update failed");
   await reloadBackhaulOffers();
  } catch (error) {
   console.error(error);
   alert("Status konnte nicht geändert werden.");
  }
 }

 if (status === "loading") {
  return (
   <div className="flex h-screen items-center justify-center bg-background">
    <div className="animate-pulse space-y-4 text-center">
     <div className="mx-auto h-12 w-12 rounded-full bg-primary/20" />
     <p className="font-medium text-muted-foreground">{t.status.loading}</p>
    </div>
   </div>
  );
 }

 if (!session) return null;

 return (
  <div className="min-h-screen bg-background">
   <AnimatePresence>
    {selectedBooking ? (
     <BookingDetailView booking={selectedBooking} onClose={() => setSelectedBooking(null)} onSave={handleUpdateBooking} />
    ) : null}

    {galleryImages ? (
     <GalleryModal images={galleryImages} initialIndex={galleryIndex} onClose={() => setGalleryImages(null)} />
    ) : null}
   </AnimatePresence>

   <header className="sticky top-0 z-50 border-b border-white/10 bg-black/5 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
     <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
       <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-white">
       FLOXANT <span className="font-normal opacity-50">Backoffice</span>
      </h1>
     </div>

     <div className="flex items-center gap-4">
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:flex">
       <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
       <span className="text-xs font-medium">{tAuth.system_operational}</span>
      </div>

      <button
       onClick={() => signOut({ callbackUrl: "/login" })}
       className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
      >
       <LogOut className="h-4 w-4" />
       <span className="hidden md:inline">{tAuth.logout}</span>
      </button>
     </div>
    </div>
   </header>

   <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
    <div className="grid gap-4 md:grid-cols-3">
     <div className="glass group relative overflow-hidden rounded-2xl border border-white/10 p-6">
      <div className="absolute right-0 top-0 p-4 opacity-10 transition-transform group-hover:scale-110">
       <Inbox className="h-16 w-16" />
      </div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">{t.stats.total}</p>
      <h2 className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-bold text-transparent">{bookings.length}</h2>
     </div>

     <div className="glass group relative overflow-hidden rounded-2xl border border-white/10 p-6">
      <div className="absolute right-0 top-0 p-4 text-primary opacity-10 transition-transform group-hover:scale-110">
       <Sparkles className="h-16 w-16" />
      </div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">{t.stats.new}</p>
      <h2 className="text-4xl font-bold text-primary">{newRequests}</h2>
     </div>

     <div className="glass group relative overflow-hidden rounded-2xl border border-white/10 p-6">
      <div className="absolute right-0 top-0 p-4 text-green-500 opacity-10 transition-transform group-hover:scale-110">
       <CheckCircle2 className="h-16 w-16" />
      </div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">{t.stats.status}</p>
      <h2 className="text-4xl font-bold text-green-500">{t.stats.active}</h2>
     </div>
    </div>

    <section className="rounded-[2rem] border border-emerald-300/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),rgba(255,255,255,0.025))] p-6 shadow-2xl shadow-black/20">
     <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
       <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200">
        <Truck className="h-3.5 w-3.5" />
        Leer-Rückfahrten
       </div>
       <h2 className="text-2xl font-bold tracking-tight text-white">Rückfahrten veröffentlichen</h2>
       <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
        Hier eingetragene Rückfahrten erscheinen direkt auf der öffentlichen Leer-Rückfahrt-Seite.
        Ziel ist Regensburg mit ca. 150 km Radius. Firmen, große Büros und Privatkunden erkennen damit schnell, ob Möbel, Büroinventar oder Paletten zur Tour passen.
       </p>
      </div>
      <a
       href="/leerfahrt-rueckfahrt"
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/55 transition hover:text-white"
      >
       Öffentliche Seite
       <Route className="h-4 w-4" />
      </a>
     </div>

     <form onSubmit={saveBackhaulOffer} className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 lg:grid-cols-4">
      <DashboardField label="Titel" value={backhaulForm.title || ""} onChange={(value) => updateBackhaulField("title", value)} required />
      <DashboardField label="Datum" value={backhaulForm.date || ""} onChange={(value) => updateBackhaulField("date", value)} type="date" />
      <DashboardField label="Zeitfenster" value={backhaulForm.timeWindow || ""} onChange={(value) => updateBackhaulField("timeWindow", value)} />
      <DashboardField label="Status" value={backhaulForm.status || "active"} onChange={(value) => updateBackhaulField("status", value)} asSelect />
      <DashboardField label="Startgebiet" value={backhaulForm.origin || ""} onChange={(value) => updateBackhaulField("origin", value)} />
      <DashboardField label="Ziel" value={backhaulForm.destination || ""} onChange={(value) => updateBackhaulField("destination", value)} />
      <DashboardField label="Zielradius" value={backhaulForm.destinationRadius || ""} onChange={(value) => updateBackhaulField("destinationRadius", value)} />
      <DashboardField label="Fahrzeug" value={backhaulForm.vehicleType || ""} onChange={(value) => updateBackhaulField("vehicleType", value)} />
      <div className="lg:col-span-2">
       <DashboardField label="Gebiete auf Route" value={(backhaulForm.routeAreas || []).join(", ")} onChange={(value) => updateBackhaulField("routeAreas", value)} />
      </div>
      <DashboardField label="Kapazität" value={backhaulForm.availableCapacity || ""} onChange={(value) => updateBackhaulField("availableCapacity", value)} />
      <DashboardField label="Preishinweis" value={backhaulForm.priceHint || ""} onChange={(value) => updateBackhaulField("priceHint", value)} />
      <div className="lg:col-span-3">
       <DashboardField label="Faire-Preis-Erklärung" value={backhaulForm.fairPriceNote || ""} onChange={(value) => updateBackhaulField("fairPriceNote", value)} />
      </div>
      <button
       type="submit"
       disabled={savingBackhaul}
       className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-emerald-200 disabled:opacity-60"
      >
       <PlusCircle className="h-4 w-4" />
       {savingBackhaul ? "Speichert..." : "Veröffentlichen"}
      </button>
     </form>

     <div className="mt-5 grid gap-3 lg:grid-cols-2">
      {backhaulOffers.length === 0 ? (
       <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-white/45">
        Noch keine admin-gepflegte Leer-Rückfahrt gespeichert.
       </div>
      ) : (
       backhaulOffers.map((offer) => (
        <div key={offer.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
         <div className="flex items-start justify-between gap-4">
          <div>
           <h3 className="font-bold text-white">{offer.title}</h3>
           <p className="mt-1 text-xs text-white/45">
            {offer.origin} → {offer.destination} | {offer.date || "flexibel"} | {offer.availableCapacity}
           </p>
          </div>
          <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase", offer.status === "active" ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200" : "border-white/10 bg-white/5 text-white/40")}>
           {offer.status}
          </span>
         </div>
         <div className="mt-4 flex flex-wrap gap-2">
          {offer.routeAreas.slice(0, 6).map((area) => (
           <span key={area} className="rounded-full bg-white/[0.04] px-3 py-1 text-[10px] text-white/40">
            {area}
           </span>
          ))}
         </div>
         <div className="mt-4 flex gap-2">
          <button
           type="button"
           onClick={() => setBackhaulStatus(offer, offer.status === "active" ? "paused" : "active")}
           className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/55 transition hover:text-white"
          >
           <PauseCircle className="h-4 w-4" />
           {offer.status === "active" ? "Pausieren" : "Aktivieren"}
          </button>
          <button
           type="button"
           onClick={() => setBackhaulStatus(offer, "archived")}
           className="inline-flex items-center gap-2 rounded-xl border border-red-300/10 bg-red-400/5 px-3 py-2 text-xs font-semibold text-red-200/70 transition hover:text-red-100"
          >
           Archivieren
          </button>
         </div>
        </div>
       ))
      )}
     </div>
    </section>

    {!loading && bookings.length > 0 ? (
     <div className="grid gap-6 border-b border-white/5 pb-6 lg:grid-cols-2">
      <div className="glass rounded-2xl border border-white/10 p-6">
       <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Lead-Timeline</h3>
       </div>
       <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
         <BarChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <RechartsTooltip cursor={{ fill: "#222" }} contentStyle={{ backgroundColor: "#111", borderColor: "#333", borderRadius: "12px", color: "#fff" }} />
          <Bar dataKey="leads" fill="#00e5ff" radius={[4, 4, 0, 0]} maxBarSize={40} />
         </BarChart>
        </ResponsiveContainer>
       </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
       <div className="mb-6 flex items-center gap-2">
        <PieChartIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Service-Verteilung</h3>
       </div>
       <div className="h-64 w-full">
        {serviceData.length > 0 ? (
         <ResponsiveContainer width="100%" height="100%">
          <PieChart>
           <Pie data={serviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={{ fill: "#fff", fontSize: 12 }}>
            {serviceData.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
           </Pie>
           <RechartsTooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333", borderRadius: "12px", color: "#fff" }} />
          </PieChart>
         </ResponsiveContainer>
        ) : (
         <div className="flex h-full w-full items-center justify-center text-muted-foreground">{t.status.empty}</div>
        )}
       </div>
      </div>
     </div>
    ) : null}

    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
     <div className="relative w-full md:w-96">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
       placeholder={t.filters.search_placeholder}
       value={searchTerm}
       onChange={(event) => setSearchTerm(event.target.value)}
       className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
     </div>

     <div className="flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
      {[
       { id: null, label: t.filters.all },
       { id: "umzug", label: t.filters.umzug },
       { id: "reinigung", label: t.filters.reinigung },
       { id: "entsorgung", label: t.filters.entsorgung },
       { id: "bueroumzug", label: "Büroumzug" },
       { id: "leerfahrt", label: "Leerfahrt" },
       { id: "firmenentsorgung", label: "Firmenentsorgung" },
       { id: "private_client", label: "Private Client" },
      ].map((item) => (
       <button
        key={item.label}
        onClick={() => setFilterService(item.id)}
        className={cn(
         "whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-all",
         filterService === item.id || (!filterService && item.id === null)
          ? "border-primary bg-primary text-primary-foreground"
          : "border-white/10 bg-white/5 hover:bg-white/10"
        )}
       >
        {item.label}
       </button>
      ))}
     </div>
    </div>

    {loading ? (
     <div className="py-20 text-center text-muted-foreground">{t.status.syncing}</div>
    ) : filteredBookings.length === 0 ? (
     <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-20 text-center">
      <Inbox className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
      <p className="font-medium text-muted-foreground">{t.status.empty}</p>
      <p className="mt-1 text-xs text-muted-foreground/60">{t.status.empty_hint}</p>
     </div>
    ) : (
     <div className="grid gap-4">
      <AnimatePresence>
       {filteredBookings.map((booking, index) => {
        const serviceDisplay = getServiceDisplay(booking.service);
        const ServiceIcon = serviceDisplay.Icon;

        return (
         <m.div
          key={booking.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ delay: index * 0.04 }}
          className="glass group overflow-hidden rounded-xl border border-white/10 p-0 transition-all hover:border-primary/20"
         >
         <div className="flex flex-col lg:flex-row">
          <div className={cn("h-2 w-full lg:h-auto lg:w-2", serviceDisplay.railClass)} />

          <div className="flex flex-1 flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">
           <div className="flex min-w-[250px] items-center gap-4">
            <div
             className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              serviceDisplay.iconClass
             )}
            >
             <ServiceIcon className="h-5 w-5" />
            </div>

            <div>
             <div className="mb-1 flex items-center gap-2">
              <h3 className="text-sm font-bold leading-tight text-white">{booking.name}</h3>
              <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", getStatusTone(booking.status))}>
               {formatStatus(booking.status)}
              </span>
             </div>

             <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="max-w-[140px] truncate">{getMainLocation(booking)}</span>
              <span className="text-white/20">|</span>
              <span className="font-semibold text-white/45">{serviceDisplay.label}</span>
             </div>

             <div className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground/60">
              <Clock className="h-3 w-3" />
              {new Date(booking.timestamp).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
             </div>
            </div>
           </div>

           <div className="flex flex-1 flex-col gap-6 md:flex-row md:gap-12">
            <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">System-Einschätzung</span>
             <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white">{formatMoneyRange(booking)}</span>
              <span className="text-[10px] font-bold text-primary/80">{booking.details?.valuation?.valuationStage || "Vorprüfung"}</span>
             </div>
             {booking.details?.valuation?.topDrivers?.length ? (
              <div className="mt-0.5 flex flex-wrap gap-1.5">
               {booking.details.valuation.topDrivers.slice(0, 3).map((driver) => (
                <span key={driver} className="text-[10px] font-medium text-muted-foreground/55">
                 # {driver}
                </span>
               ))}
              </div>
             ) : null}
            </div>

            <div className="border-l border-white/5 pl-6">
             <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">Kunden-Budget</span>
             <div className="mt-1 text-base font-bold text-blue-400">
              {booking.details?.valuation?.customerBudget ? `${booking.details.valuation.customerBudget} EUR` : "Nicht angegeben"}
             </div>
             {booking.details?.admin?.docs?.length ? (
              <div className="mt-1 text-[10px] text-muted-foreground/60">{booking.details.admin.docs.length} Dokumente gespeichert</div>
             ) : (
              <div className="mt-1 text-[10px] text-muted-foreground/40">Noch keine Dokumente</div>
             )}
            </div>
           </div>

           {booking.file_urls?.length ? (
            <button
             onClick={() => openGallery(booking.file_urls || [], 0)}
             className="hidden items-center gap-1 xl:flex"
             type="button"
            >
             {booking.file_urls.slice(0, 2).map((url, index) => (
              <img key={index} src={url} alt="Upload" className="h-8 w-8 rounded-md border border-white/10 object-cover opacity-50 transition-opacity hover:opacity-100" />
             ))}
             {(booking.file_urls.length || 0) > 2 ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[10px] font-bold text-muted-foreground">
               +{booking.file_urls.length - 2}
              </div>
             ) : null}
            </button>
           ) : null}

           <div className="mt-4 flex w-full items-center gap-3 border-t border-white/5 pt-4 lg:mt-0 lg:w-auto lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <PremiumButton variant="ghost" size="icon" className="h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20" onClick={() => setSelectedBooking(booking)}>
             <FileText className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton className="h-10 flex-1 px-6 text-[10px] font-bold uppercase tracking-[0.18em] lg:flex-none" onClick={() => setSelectedBooking(booking)}>
             Verwalten
            </PremiumButton>
           </div>
          </div>
         </div>
         </m.div>
        );
       })}
      </AnimatePresence>
     </div>
    )}
   </main>
  </div>
 );
}

function DashboardField({
 label,
 value,
 onChange,
 required,
 type = "text",
 asSelect,
}: {
 label: string;
 value: string;
 onChange: (value: string) => void;
 required?: boolean;
 type?: string;
 asSelect?: boolean;
}) {
 return (
  <label className="block">
   <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">{label}</span>
   {asSelect ? (
    <select
     value={value}
     onChange={(event) => onChange(event.target.value)}
     className="h-11 w-full rounded-xl border border-white/10 bg-[#0B0D12] px-3 text-sm text-white outline-none focus:border-emerald-300/35"
    >
     <option value="active">Aktiv</option>
     <option value="paused">Pausiert</option>
     <option value="draft">Entwurf</option>
    </select>
   ) : (
    <input
     required={required}
     type={type}
     value={value}
     onChange={(event) => onChange(event.target.value)}
     className="h-11 w-full rounded-xl border border-white/10 bg-[#0B0D12] px-3 text-sm text-white outline-none focus:border-emerald-300/35"
    />
   )}
  </label>
 );
}
