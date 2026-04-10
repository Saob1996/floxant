"use client";

import { m } from "framer-motion";
import {
    PackageOpen,
    Sparkles,
    Users,
    Clock,
    Shield,
    Wrench,
    CheckCircle2,
    RotateCw,
    Baby,
    Truck,
    Heart,
    Archive,
    HelpCircle,
    Key,
} from "lucide-react";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface SignatureServicesProps {
    dict: any;
}

type ServiceContent = {
    title?: string;
    desc?: string;
};

export function SignatureServices({ dict }: SignatureServicesProps) {
    const t = dict?.signature_services || {
        items: {},
        badge: "",
        title: "",
        subtitle: "",
    };

    const items: Record<string, ServiceContent> = t.items || {};

    const serviceList = useMemo(
        () => [
            { id: "ritual_exit", icon: PackageOpen, color: "text-amber-300", image: "/assets/sig-ritual.png" },
            { id: "clean_start", icon: Sparkles, color: "text-cyan-300", image: "/assets/sig-clean.png" },
            { id: "neighbour_kit", icon: Users, color: "text-green-300", image: "/assets/sig-kit.png" },
            { id: "first_48h", icon: Clock, color: "text-blue-300", image: "/assets/sig-48h.png" },
            { id: "bureaucracy", icon: Shield, color: "text-slate-300", image: "/assets/service-moving.png" },
            { id: "furniture_opt", icon: Wrench, color: "text-orange-300", image: "/assets/service-moving.png" },
            { id: "cleaning_guarantee", icon: CheckCircle2, color: "text-teal-300", image: "/assets/sig-clean.png" },
            { id: "storage_rot", icon: RotateCw, color: "text-indigo-300", image: "/assets/sig-ritual.png" },
            { id: "kids_box", icon: Baby, color: "text-pink-300", image: "/assets/sig-kit.png" },
            { id: "service_24h", icon: Truck, color: "text-red-300", image: "/assets/service-moving.png" },
            { id: "ladies_team", icon: Heart, color: "text-rose-300", image: "/assets/service-cleaning.png" },
            { id: "memory_capsule", icon: Archive, color: "text-purple-300", image: "/assets/sig-ritual.png" },
            { id: "maybe_box", icon: HelpCircle, color: "text-yellow-300", image: "/assets/sig-ritual.png" },
            { id: "key_handover", icon: Key, color: "text-emerald-300", image: "/assets/sig-kit.png" },
        ],
        []
    );

    const visibleServices = serviceList.filter((service) => {
        const content = items[service.id];
        return content?.title && content?.desc;
    });

    if (visibleServices.length === 0) return null;

    return (
        <section id="extras" className="relative overflow-hidden px-6 py-24">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-500/[0.04] to-transparent" />

            <div className="mx-auto max-w-7xl">
                <m.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="mb-4 inline-block rounded-full border border-blue-400/15 bg-blue-400/10 px-3 py-1 text-sm font-medium text-blue-300">
                        {t.badge || "Zusätzliche Leistungen"}
                    </span>

                    <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        {t.title || "Mehr als nur Standard"}
                    </h2>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50">
                        {t.subtitle ||
                            "Leistungen, die den Ablauf strukturierter, komfortabler und verlässlicher machen."}
                    </p>
                </m.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {visibleServices.map((service, index) => {
                        const Icon = service.icon;
                        const content = items[service.id];

                        return (
                            <m.div
                                key={service.id}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.04 }}
                                className="group h-full"
                            >
                                <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#11131A] p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-400/20">
                                    {/* Branded Background with Glassmorphism */}
                                    <div className="absolute inset-0 -z-10">
                                        <img
                                            src={service.image}
                                            alt=""
                                            className="h-full w-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-35"
                                        />
                                        <div className="absolute inset-0 bg-[#11131A]/80 backdrop-blur-[2px] transition-colors group-hover:bg-[#11131A]/70" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-[#11131A]/40 to-transparent" />
                                    </div>

                                    <div className="absolute right-5 top-5 opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.1]">
                                        <Icon className="h-16 w-16 text-white" />
                                    </div>

                                    <div className="relative z-10">
                                        <div
                                            className={cn(
                                                "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0B0D12]/80 backdrop-blur-md",
                                                service.color
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-blue-300">
                                            {content.title}
                                        </h3>

                                        <p className="text-sm font-medium leading-relaxed text-white/60 group-hover:text-white/80">
                                            {content.desc}
                                        </p>
                                    </div>
                                </div>
                            </m.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}