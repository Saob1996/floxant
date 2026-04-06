"use client";

import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Box,
    Sparkles,
    Trash2,
    ArrowRight,
    ArrowLeft,
    MapPin,
    Calendar,
    PackageOpen,
    Users,
    Clock,
    Shield,
    CheckCircle2,
    Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/PremiumButton";

type ServiceType = "umzug" | "reinigung" | "entsorgung" | null;

interface BookingState {
    step: number;
    service: ServiceType;
    details: any;
    upgrades: string[];
}

interface SmartBookingWizardProps {
    dict: any;
}

function SmartBookingWizardInner({ dict }: SmartBookingWizardProps) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        setInitialized(true);
    }, []);

    const defaultBooking = {
        steps: {
            service: "Service",
            details: "Details",
            upgrades: "Upgrades",
            contact: "Contact",
        },
        headings: {
            service_selection: "Select Service",
            service_subtitle: "Choose your service",
            details_prefix: "Details",
            upgrades_title: "Upgrades",
            upgrades_subtitle: "Select extras",
            summary_title: "Summary",
            summary_subtitle: "Review details",
            success_title: "Success",
            success_message: "Thank you {name}",
            success_email: "Email sent to {email}",
        },
        services: {
            umzug: { label: "Moving", desc: "Standard move" },
            reinigung: { label: "Cleaning", desc: "Cleaning service" },
            entsorgung: { label: "Disposal", desc: "Disposal service" },
        },
        form: {
            start_address: "Start Address",
            end_address: "End Address",
            date: "Date",
            name: "Name",
            email: "Email",
            phone: "Phone",
            photos: "Photos",
            photos_placeholder: "Upload photos",
            photos_count: "{count} selected",
            placeholder_address: "Address",
            placeholder_name: "Name",
            placeholder_email: "Email",
            placeholder_phone: "Phone",
        },
        buttons: {
            back: "Back",
            next: "Next",
            finish: "Finish",
            submit: "Submit",
            sending: "Sending...",
            new_request: "New Request",
        },
        upgrades: {
            ladies_team: { title: "Ladies Team", desc: "Care team" },
            "24h_service": { title: "24h Service", desc: "Fast service" },
            furniture_opt: { title: "Furniture Opt", desc: "Optimization" },
            storage_rot: { title: "Storage", desc: "Storage service" },
            maybe_box: { title: "Maybe Box", desc: "Decision box" },
            clean_shield: { title: "Clean Shield", desc: "Protection" },
        },
        error: { submit: "Error", generic: "Error" },
    };

    const t = dict?.booking || defaultBooking;

    const [state, setState] = useState<BookingState>({
        step: 1,
        service: null,
        details: {},
        upgrades: [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [files, setFiles] = useState<File[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!initialized) {
        return (
            <div className="w-full max-w-5xl mx-auto min-h-[400px] rounded-3xl border border-border bg-card" />
        );
    }

    const steps = [
        { number: 1, title: t?.steps?.service || "Service" },
        { number: 2, title: t?.steps?.details || "Details" },
        { number: 3, title: t?.steps?.upgrades || "Upgrades" },
        { number: 4, title: t?.steps?.contact || "Contact" },
    ];

    const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
    const prevStep = () => setState((prev) => ({ ...prev, step: prev.step - 1 }));

    const compressImage = async (file: File): Promise<File> => {
        return new Promise((resolve) => {
            if (!file.type.startsWith("image/")) return resolve(file);

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(
                                    new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                                        type: "image/jpeg",
                                    })
                                );
                            } else {
                                resolve(file);
                            }
                        },
                        "image/jpeg",
                        0.7
                    );
                };

                img.onerror = () => resolve(file);
            };

            reader.onerror = () => resolve(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append("service", state.service || "");
        submitData.append("upgrades", JSON.stringify(state.upgrades));
        submitData.append("details", JSON.stringify(state.details));
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("timestamp", new Date().toISOString());

        try {
            if (files.length > 0) {
                for (const file of files) {
                    const compressedFile = await compressImage(file);
                    submitData.append("file", compressedFile);
                }
            }

            const response = await fetch("/api/bookings", {
                method: "POST",
                body: submitData,
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert(t.error.submit);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert(t.error.generic);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-2xl mx-auto py-12 text-center space-y-8">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">
                        {t.headings.success_title}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        {t.headings.success_message.replace("{name}", formData.name)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t.headings.success_email.replace("{email}", formData.email)}
                    </p>
                </div>
                <div className="pt-8">
                    <PremiumButton onClick={() => window.location.reload()}>
                        {t.buttons.new_request}
                    </PremiumButton>
                </div>
            </div>
        );
    }

    const renderServiceSelection = () => (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
                {
                    id: "umzug",
                    label: t?.services?.umzug?.label || "Moving",
                    icon: Box,
                    desc: t?.services?.umzug?.desc || "",
                },
                {
                    id: "reinigung",
                    label: t?.services?.reinigung?.label || "Cleaning",
                    icon: Sparkles,
                    desc: t?.services?.reinigung?.desc || "",
                },
                {
                    id: "entsorgung",
                    label: t?.services?.entsorgung?.label || "Disposal",
                    icon: Trash2,
                    desc: t?.services?.entsorgung?.desc || "",
                },
            ].map((option) => (
                <button
                    key={option.id}
                    onClick={() => {
                        setState((prev) => ({ ...prev, service: option.id as ServiceType }));
                        nextStep();
                    }}
                    className="group relative h-64 w-full text-start transition-all hover:-translate-y-1"
                    type="button"
                >
                    <div className="absolute inset-0 rounded-2xl border border-border bg-card shadow-lg transition-all group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                        <div className="rounded-full bg-secondary p-4 transition-colors group-hover:bg-primary/15">
                            <option.icon className="h-8 w-8 text-foreground transition-colors group-hover:text-primary md:h-10 md:w-10" />
                        </div>
                        <div className="relative z-10 text-center">
                            <h3 className="mb-2 text-xl font-bold text-foreground">
                                {option.label}
                            </h3>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );

    const renderDetails = () => (
        <div className="mx-auto max-w-2xl space-y-6">
            <h3 className="mb-4 text-center text-2xl font-semibold text-foreground">
                {t.headings?.details_prefix || "Details"}{" "}
                {t.services?.[state.service || "umzug"]?.label}
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <MapPin size={16} /> {t.form?.start_address || "Start Address"}
                    </label>
                    <input
                        className="h-11 w-full rounded-lg border border-border bg-card px-4 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder={t.form?.placeholder_address || "Address"}
                    />
                </div>

                {state.service === "umzug" && (
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <MapPin size={16} /> {t.form?.end_address || "End Address"}
                        </label>
                        <input
                            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder={t.form?.placeholder_address || "Address"}
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Calendar size={16} /> {t.form.date}
                </label>
                <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="h-11 w-full rounded-lg border border-border bg-card px-4 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="flex justify-center gap-4 pt-8">
                <PremiumButton variant="ghost" onClick={prevStep} type="button">
                    <ArrowLeft className="me-2 h-4 w-4" /> {t.buttons.back}
                </PremiumButton>
                <PremiumButton onClick={nextStep} type="button">
                    {t.buttons.next} <ArrowRight className="ms-2 h-4 w-4" />
                </PremiumButton>
            </div>
        </div>
    );

    const renderUpgrades = () => {
        const u = t.upgrades || {};
        const relevantUpgrades = [
            {
                id: "ladies_team",
                title: u.ladies_team?.title || "Ladies Team",
                icon: Users,
                desc: u.ladies_team?.desc || "",
                service: ["umzug", "reinigung"],
            },
            {
                id: "24h_service",
                title: u["24h_service"]?.title || "24h Service",
                icon: Clock,
                desc: u["24h_service"]?.desc || "",
                service: ["umzug", "entsorgung", "reinigung"],
            },
            {
                id: "furniture_opt",
                title: u.furniture_opt?.title || "Furniture Opt",
                icon: Sparkles,
                desc: u.furniture_opt?.desc || "",
                service: "umzug",
            },
            {
                id: "storage_rot",
                title: u.storage_rot?.title || "Storage",
                icon: PackageOpen,
                desc: u.storage_rot?.desc || "",
                service: "umzug",
            },
            {
                id: "maybe_box",
                title: u.maybe_box?.title || "Maybe Box",
                icon: Box,
                desc: u.maybe_box?.desc || "",
                service: ["umzug", "entsorgung"],
            },
            {
                id: "clean_shield",
                title: u.clean_shield?.title || "Clean Shield",
                icon: Shield,
                desc: u.clean_shield?.desc || "",
                service: ["umzug", "entsorgung"],
            },
        ].filter((item) =>
            Array.isArray(item.service)
                ? item.service.includes(state.service || "")
                : item.service === state.service
        );

        return (
            <div className="space-y-8">
                <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-bold text-foreground">
                        {t.headings.upgrades_title}
                    </h3>
                    <p className="text-muted-foreground">{t.headings.upgrades_subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relevantUpgrades.map((upgrade) => {
                        const isSelected = state.upgrades.includes(upgrade.id);
                        const Icon = upgrade.icon;

                        return (
                            <button
                                key={upgrade.id}
                                onClick={() =>
                                    setState((prev) => ({
                                        ...prev,
                                        upgrades: isSelected
                                            ? prev.upgrades.filter((id) => id !== upgrade.id)
                                            : [...prev.upgrades, upgrade.id],
                                    }))
                                }
                                type="button"
                                className={cn(
                                    "relative rounded-2xl border p-6 text-start transition-all group",
                                    isSelected
                                        ? "border-primary bg-primary/10"
                                        : "border-border bg-card hover:border-primary/30"
                                )}
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className={cn(
                                            "rounded-lg p-2 transition-colors",
                                            isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-foreground"
                                        )}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                </div>
                                <h4 className="mb-1 font-semibold text-foreground">
                                    {upgrade.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">{upgrade.desc}</p>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 pt-8">
                    <PremiumButton variant="ghost" onClick={prevStep} type="button">
                        <ArrowLeft className="me-2 h-4 w-4" /> {t.buttons.back}
                    </PremiumButton>
                    <PremiumButton onClick={nextStep} type="button">
                        {t.buttons.finish} <ArrowRight className="ms-2 h-4 w-4" />
                    </PremiumButton>
                </div>
            </div>
        );
    };

    const renderContact = () => {
        return (
            <div className="mx-auto max-w-2xl space-y-8">
                <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">
                        {t.headings.summary_title}
                    </h3>
                    <p className="text-muted-foreground">{t.headings.summary_subtitle}</p>
                </div>

                <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-lg font-semibold capitalize text-foreground">
                            {state.service ? t.services[state.service]?.label : ""}
                        </span>
                        <span className="text-primary">
                            <CheckCircle2 className="h-5 w-5" />
                        </span>
                    </div>

                    {state.upgrades.length > 0 && (
                        <div className="space-y-2">
                            <span className="text-sm text-muted-foreground">Extras:</span>
                            <div className="flex flex-wrap gap-2">
                                {state.upgrades.map((u: string) => {
                                    const title = t.upgrades[u]?.title || u;
                                    return (
                                        <span
                                            key={u}
                                            className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs text-primary"
                                        >
                                            {title}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                {t.form.name} <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                }
                                className="h-11 w-full rounded-lg border border-border bg-card px-4 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder={t.form.placeholder_name}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                {t.form.email} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                className="h-11 w-full rounded-lg border border-border bg-card px-4 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder={t.form.placeholder_email}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            {t.form.phone} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder={t.form.placeholder_phone}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            {t.form.photos}
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setFiles(Array.from(e.target.files));
                                    }
                                }}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-4 text-foreground transition-all hover:border-primary/50 hover:bg-secondary/40"
                            >
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {files.length > 0
                                        ? t.form.photos_count.replace("{count}", files.length.toString())
                                        : t.form.photos_placeholder}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                        <PremiumButton variant="ghost" type="button" onClick={prevStep}>
                            <ArrowLeft className="me-2 h-4 w-4" /> {t.buttons.back}
                        </PremiumButton>
                        <PremiumButton className="w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? t.buttons.sending : t.buttons.submit}
                        </PremiumButton>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="mb-12">
                <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 -z-10 h-0.5 w-full bg-border" />
                    <div
                        className="absolute top-1/2 left-0 -z-10 h-0.5 bg-primary transition-all duration-500"
                        style={{ width: `${((state.step - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((s) => (
                        <div
                            key={s.number}
                            className="flex flex-col items-center gap-2 bg-card px-2"
                        >
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300",
                                    state.step >= s.number
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-muted-foreground/30 bg-card text-muted-foreground"
                                )}
                            >
                                {s.number}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-medium transition-colors",
                                    state.step >= s.number ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <m.div
                    key={state.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {state.step === 1 && (
                        <div className="space-y-8 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-foreground">
                                    {t.headings.service_selection}
                                </h2>
                                <p className="text-muted-foreground">{t.headings.service_subtitle}</p>
                            </div>
                            {renderServiceSelection()}
                        </div>
                    )}

                    {state.step === 2 && renderDetails()}
                    {state.step === 3 && renderUpgrades()}
                    {state.step === 4 && renderContact()}
                </m.div>
            </AnimatePresence>
        </div>
    );
}

export function SmartBookingWizard({ dict }: SmartBookingWizardProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef}>
            {isVisible ? (
                <SmartBookingWizardInner dict={dict} />
            ) : (
                <div className="w-full max-w-5xl mx-auto min-h-[400px]" />
            )}
        </div>
    );
}