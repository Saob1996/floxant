"use client";

import { useEffect, useState } from "react";
import { Shield, Mail, Database, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminHealthControl() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/health");
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const isLive = health?.mailing?.status === "live";
  const isDbOk = health?.database?.status === "connected";

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Live Readiness</h3>
        </div>
        <button 
          onClick={checkHealth}
          disabled={loading}
          className="p-1 hover:bg-white/5 rounded-lg transition-colors"
        >
          <RefreshCw className={cn("w-3 h-3 text-muted-foreground", loading && "animate-spin")} />
        </button>
      </div>

      <div className="space-y-3">
        {/* Mailing Status */}
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg mt-0.5",
            isLive ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
          )}>
            <Mail className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white uppercase tracking-tight">E-Mail Versand</p>
            <p className="text-[10px] text-muted-foreground">
              {isLive ? "Produktiv-Modus aktiv" : "Simulator / Dry-Run Modus"}
            </p>
          </div>
        </div>

        {/* Database Status */}
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg mt-0.5",
            isDbOk ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          )}>
            <Database className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white uppercase tracking-tight">Datenbank (Supabase)</p>
            <p className="text-[10px] text-muted-foreground">
              {isDbOk ? `Verbunden (${health?.database?.latency}ms)` : "Verbindung unterbrochen"}
            </p>
          </div>
        </div>

        {/* Readiness Summary */}
        <div className={cn(
          "mt-4 p-3 rounded-xl flex items-center gap-3 border",
          isLive && isDbOk 
            ? "bg-green-500/5 border-green-500/20 text-green-400" 
            : "bg-amber-500/5 border-amber-500/20 text-amber-400"
        )}>
          {isLive && isDbOk ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span className="text-[10px] font-bold uppercase tracking-wide">
            {isLive && isDbOk ? "Ready for Live Ops" : "Check Config / Credentials"}
          </span>
        </div>
      </div>
    </div>
  );
}
