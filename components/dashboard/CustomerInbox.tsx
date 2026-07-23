"use client";

import { useMemo, useState } from "react";
import { Search, MapPin, Inbox, Clock, Phone, Mail, ArrowRight, UserRoundCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { Booking } from "@/app/dashboard/DashboardClient";

interface CustomerInboxProps {
 bookings: Booking[];
 onOpenBooking: (booking: Booking, mode: any) => void;
}

export function CustomerInbox({ bookings, onOpenBooking }: CustomerInboxProps) {
 const [searchTerm, setSearchTerm] = useState("");
 const [statusFilter, setStatusFilter] = useState<string>("all");

 const filteredBookings = useMemo(() => {
  return bookings
   .filter((booking) => booking.status !== "deleted")
   .filter((booking) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "open") return !["abgeschlossen", "storniert"].includes(booking.status);
    return booking.status === statusFilter;
   })
   .filter((booking) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
     booking.name.toLowerCase().includes(term) ||
     booking.email.toLowerCase().includes(term) ||
     booking.phone.toLowerCase().includes(term) ||
     (booking.details?.configuration?.companyName || "").toLowerCase().includes(term)
    );
   })
   .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
 }, [bookings, searchTerm, statusFilter]);

 const formatStatus = (status: string) => {
  if (status === "new") return "Neu";
  return status.replace(/_/g, " ");
 };

 const getStatusTone = (status: string) => {
  if (status === "new") return "bg-green-100 text-green-700 border-green-200";
  if (status === "in_bearbeitung") return "bg-blue-100 text-blue-700 border-blue-200";
  if (status === "angebot_versendet") return "bg-cyan-100 text-cyan-700 border-cyan-200";
  if (status === "abgeschlossen") return "bg-slate-100 text-slate-700 border-slate-200";
  if (status === "storniert") return "bg-red-50 text-red-600 border-red-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
 };

 const getLeadAge = (timestamp: string) => {
  const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
  if (hours < 1) return "gerade eben";
  if (hours < 24) return `vor ${hours} h`;
  const days = Math.floor(hours / 24);
  return `vor ${days} Tag${days > 1 ? "en" : ""}`;
 };

 return (
  <div className="flex h-[calc(100vh-140px)] flex-col rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5 overflow-hidden">
   {/* Header & Filters */}
   <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-6 md:flex-row md:items-center md:justify-between">
    <div>
     <h2 className="flex items-center gap-2 text-xl font-black text-slate-900">
      <Inbox className="h-5 w-5 text-blue-600" />
      Kundenanfragen
     </h2>
     <p className="mt-1 text-sm text-slate-500">
      Alle eingehenden Anfragen, Leads und Projekte im Überblick.
     </p>
    </div>

    <div className="flex flex-col gap-3 sm:flex-row">
     <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
       type="text"
       aria-label="Kundenanfragen suchen"
       placeholder="Suchen..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 sm:w-64"
      />
     </div>
     <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-400"
     >
      <option value="all">Alle Status</option>
      <option value="open">Offene Anfragen</option>
      <option value="new">Nur Neue</option>
      <option value="in_bearbeitung">In Bearbeitung</option>
      <option value="angebot_versendet">Angebot versendet</option>
      <option value="abgeschlossen">Abgeschlossen</option>
     </select>
    </div>
   </div>

   {/* List */}
   <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/30">
    {filteredBookings.length === 0 ? (
     <div className="flex h-40 flex-col items-center justify-center text-slate-500">
      <Inbox className="mb-2 h-8 w-8 opacity-20" />
      <p>Keine Anfragen gefunden.</p>
     </div>
    ) : (
     <div className="grid gap-4">
      {filteredBookings.map((booking) => {
       const companyName = booking.details?.configuration?.companyName;
       const location =
        booking.details?.configuration?.fromAddress ||
        booking.details?.configuration?.location ||
        (booking.details as any)?.pricingSignals?.location ||
        "Regensburg";

       return (
        <button
         type="button"
         key={booking.id}
         onClick={() => onOpenBooking(booking, "request")}
         className="group w-full cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
        >
         <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
           <div className="flex flex-wrap items-center gap-2">
            <span
             className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider",
              getStatusTone(booking.status)
             )}
            >
             {formatStatus(booking.status)}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
             <Clock className="h-3.5 w-3.5" />
             {getLeadAge(booking.timestamp)}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
             {booking.service === "private_client" ? "Villenservice" : booking.service}
            </span>
           </div>

           <div>
            <h3 className="text-lg font-bold text-slate-900">
             {companyName ? `${companyName} (${booking.name})` : booking.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-500">
             {booking.phone && (
              <div className="flex items-center gap-1">
               <Phone className="h-4 w-4 text-slate-400" />
               {booking.phone}
              </div>
             )}
             {booking.email && (
              <div className="flex items-center gap-1">
               <Mail className="h-4 w-4 text-slate-400" />
               <span className="truncate max-w-[200px]">{booking.email}</span>
              </div>
             )}
             <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-slate-400" />
              {location}
             </div>
            </div>
           </div>
          </div>

          <div className="flex items-center gap-3">
           <span className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-foreground">
            Öffnen
            <ArrowRight className="h-4 w-4" />
           </span>
          </div>
         </div>
        </button>
       );
      })}
     </div>
    )}
   </div>
  </div>
 );
}
