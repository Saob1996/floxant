"use client";

import { m } from "framer-motion";
import {
    PackageOpen, Sparkles, Users, Clock, Shield, Wrench,
    CheckCircle2, RotateCw, Baby, Truck, Heart, Archive,
    HelpCircle, Key
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface SignatureServicesProps {
    dict: any;
}

export function SignatureServices({ dict }: SignatureServicesProps) {
    const t = dict?.signature_services || { items: {}, badge: "", title: "", subtitle: "" };
    const items = t.items || {};

    const serviceList = [
        { id: "ritual_exit", icon: PackageOpen, color: "text-amber-400" },
        { id: "clean_start", icon: Sparkles, color: "text-cyan-400" },
        { id: "neighbour_kit", icon: Users, color: "text-green-400" },
        { id: "first_48h", icon: Clock, color: "text-blue-400" },
        { id: "bureaucracy", icon: Shield, color: "text-slate-400" },
        { id: "furniture_opt", icon: Wrench, color: "text-orange-400" },
        { id: "cleaning_guarantee", icon: CheckCircle2, color: "text-teal-400" },
        { id: "storage_rot", icon: RotateCw, color: "text-indigo-400" },
        { id: "kids_box", icon: Baby, color: "text-pink-400" },
        { id: "service_24h", icon: Truck, color: "text-red-400" },
        { id: "ladies_team", icon: Heart, color: "text-rose-400" },
        { id: "memory_capsule", icon: Archive, color: "text-purple-400" },
        { id: "maybe_box", icon: HelpCircle, color: "text-yellow-400" },
        { id: "key_handover", icon: Key, color: "text-emerald-400" },
    ];

    return (
        <section id="extras" className="py-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-blue-900/5 skew-y-3 transform -z-10 origin-top-left" />

            <div className="mx-auto max-w-7xl">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                        {t.badge}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t.title}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {serviceList.map((service, index) => {
                        const Icon = service.icon;
                        const content = items[service.id] || { title: service.id, desc: "..." };

                        return (
                            <m.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-sm group-hover:blur-md transition-all opacity-50 dark:opacity-20" />

                                <div className="glass h-full p-6 rounded-2xl border border-white/10 relative overflow-hidden group-hover:border-primary/30 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Icon className="w-24 h-24" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className={cn("p-3 rounded-xl bg-background/50 w-fit mb-4 backdrop-blur-sm border border-white/5", service.color)}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                                            {content.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
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
