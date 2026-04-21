"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
    Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { useCalculatorStore } from "@/store/calculatorStore";

type ServiceType =
    | "umzug"
    | "reinigung"
    | "entsorgung"
    | "bueroumzug"
    | "seniorenumzug"
    | "klaviertransport"
    | "einlagerung"
    | "malerarbeiten"
    | "akteneinlagerung"
    | "leerfahrt"
    | null;

interface BookingState {
    step: number;
    service: ServiceType;
    details: {
        startAddress: string;
        endAddress: string;
        date: string;
    };
    upgrades: string[];
}

interface SmartBookingWizardProps {
    dict: any;
}

function SmartBookingWizardInner({ dict }: SmartBookingWizardProps) {
    const [initialized, setInitialized] = useState(false);
    const storeService = useCalculatorStore((s) => s.serviceType);
    const storeBase = useCalculatorStore((s) => s.baseDetails);
    const storeLead = useCalculatorStore((s) => s.leadDetails);
    const setMode = useCalculatorStore((s) => s.setMode);

    useEffect(() => {
        setInitialized(true);
        if (storeService) {
            setState((prev) => ({
                ...prev,
                service: storeService as ServiceType,
                details: {
                    ...prev.details,
                    startAddress: storeBase.fromAddress || "",
                    endAddress: storeBase.toAddress || "",
                    date: storeBase.moveDate || "",
                },
                step: 2, // Skip service selection if already selected
            }));
        }
        if (storeLead) {
            setFormData({
                name: storeLead.customerName || "",
                email: storeLead.customerEmail || "",
                phone: storeLead.customerPhone || "",
            });
        }
    }, [storeService, storeBase, storeLead]);

    const defaultBooking = {
        steps: {
            service: "Service",
            details: "Details",
            upgrades: "Extras",
            contact: "Kontakt",
        },
        headings: {
            service_selection: "Leistung auswählen",
            service_subtitle: "Wählen Sie die passende Anfrageart",
            details_prefix: "Angaben zu",
            upgrades_title: "Optionale Extras",
            upgrades_subtitle: "Ergänzen Sie Ihre Anfrage bei Bedarf",
            summary_title: "Kontaktdaten",
            summary_subtitle: "Wir melden uns passend zu Ihrer Anfrage",
            success_title: "Anfrage gesendet",
            success_message: "Vielen Dank {name}",
            success_email: "Wir melden uns über {email}",
        },
        services: {
            umzug: { label: "Umzug", desc: "Wohnungs- und Firmenumzug" },
            reinigung: { label: "Reinigung", desc: "Professionelle Reinigung" },
            entsorgung: { label: "Entrümpelung", desc: "Räumung und Entsorgung" },
        },
        form: {
            start_address: "Startadresse",
            end_address: "Zieladresse",
            date: "Wunschtermin",
            name: "Name",
            email: "E-Mail",
            phone: "Telefon",
            photos: "Fotos",
            photos_placeholder: "Fotos hinzufügen",
            photos_count: "{count} Dateien ausgewählt",
            placeholder_address: "Adresse oder Ort",
            placeholder_name: "Ihr Name",
            placeholder_email: "name@beispiel.de",
            placeholder_phone: "+49 ...",
        },
        buttons: {
            back: "Zurück",
            next: "Weiter",
            finish: "Weiter",
            submit: "Anfrage absenden",
            sending: "Wird gesendet...",
            new_request: "Neue Anfrage",
        },
        upgrades: {
            ladies_team: {
                title: "Frauen-Team",
                desc: "Besonders sensible Einsätze",
            },
            "24h_service": {
                title: "24h-Service",
                desc: "Kurzfristige Verfügbarkeit",
            },
            furniture_opt: {
                title: "Möbelservice",
                desc: "Zusatzhilfe bei Möbeln",
            },
            storage_rot: {
                title: "Zwischenlagerung",
                desc: "Temporäre Lagerlösung",
            },
            maybe_box: {
                title: "Unsicheres Volumen",
                desc: "Später präzisieren",
            },
            clean_shield: {
                title: "Schutzservice",
                desc: "Zusätzliche Absicherung",
            },
        },
        error: {
            submit: "Fehler beim Senden",
            generic: "Ein Fehler ist aufgetreten",
        },
    };

    const t = dict?.booking || defaultBooking;

    const [state, setState] = useState<BookingState>({
        step: 1,
        service: null,
        details: {
            startAddress: "",
            endAddress: "",
            date: "",
        },
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

    const steps = useMemo(
        () => [
            { number: 1, title: t?.steps?.service || "Service" },
            { number: 2, title: t?.steps?.details || "Details" },
            { number: 3, title: t?.steps?.upgrades || "Extras" },
            { number: 4, title: t?.steps?.contact || "Kontakt" },
        ],
        [t]
    );

    const isStepTwoValid = useMemo(() => {
        const hasStart = state.details.startAddress.trim().length >= 2;
        const hasDate = state.details.date.trim().length > 0;
        const hasEnd =
            state.service !== "umzug" || state.details.endAddress.trim().length >= 2;

        return Boolean(state.service && hasStart && hasDate && hasEnd);
    }, [state.service, state.details]);

    const isContactValid = useMemo(() => {
        return (
            formData.name.trim().length >= 2 &&
            formData.email.trim().length >= 5 &&
            formData.phone.trim().length >= 6
        );
    }, [formData]);

    const nextStep = () => {
        setState((prev) => ({
            ...prev,
            step: Math.min(prev.step + 1, 4),
        }));
    };

    const prevStep = () => {
        setState((prev) => ({
            ...prev,
            step: Math.max(prev.step - 1, 1),
        }));
    };

    const resetWizard = () => {
        setState({
            step: 1,
            service: null,
            details: {
                startAddress: "",
                endAddress: "",
                date: "",
            },
            upgrades: [],
        });
        setFormData({
            name: "",
            email: "",
            phone: "",
        });
        setFiles([]);
        setIsSuccess(false);
        setIsSubmitting(false);
        setMode("selection");
    };

    const compressImage = async (file: File): Promise<File> => {
        return new Promise((resolve) => {
            if (!file.type.startsWith("image/")) {
                resolve(file);
                return;
            }

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
                    } else if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
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

        if (!state.service || !isStepTwoValid || !isContactValid) {
            alert(t?.error?.generic || "Ein Fehler ist aufgetreten");
            return;
        }

        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append("service", state.service);
        submitData.append("upgrades", JSON.stringify(state.upgrades));
        submitData.append("details", JSON.stringify(state.details));
        submitData.append("name", formData.name.trim());
        submitData.append("email", formData.email.trim());
        submitData.append("phone", formData.phone.trim());
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

            if (!response.ok) {
                alert(t?.error?.submit || "Fehler beim Senden");
                return;
            }

            setIsSuccess(true);
        } catch (error) {
            console.error("Submission error:", error);
            alert(t?.error?.generic || "Ein Fehler ist aufgetreten");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderPhotosLabel = () => {
        const template =
            t?.form?.photos_count || defaultBooking.form.photos_count || "{count} Dateien ausgewählt";

        return files.length > 0
            ? template.replace("{count}", String(files.length))
            : t?.form?.photos_placeholder ||
            defaultBooking.form.photos_placeholder ||
            "Fotos hinzufügen";
    };

    const renderServiceSelection = () => (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
                {
                    id: "umzug",
                    label: t?.services?.umzug?.label || "Umzug",
                    icon: Box,
                    desc: t?.services?.umzug?.desc || "",
                },
                {
                    id: "reinigung",
                    label: t?.services?.reinigung?.label || "Reinigung",
                    icon: Sparkles,
                    desc: t?.services?.reinigung?.desc || "",
                },
                {
                    id: "entsorgung",
                    label: t?.services?.entsorgung?.label || "Entrümpelung",
                    icon: Trash2,
                    desc: t?.services?.entsorgung?.desc || "",
                },
                {
                    id: "budget",
                    label: "Preisvorschlag",
                    icon: Banknote,
                    desc: "Haben Sie ein festes Budget? Nennen Sie uns Ihren Rahmen.",
                    isLink: true,
                    href: "/anfrage-mit-preisrahmen"
                },
            ].map((option: any) => (
                option.isLink ? (
                    <Link
                        key={option.id}
                        href={option.href || "/"}
                        className="group relative w-full rounded-[24px] border border-blue-400/20 bg-blue-400/5 p-7 text-start shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-400/10"
                    >
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10 transition-colors group-hover:bg-blue-400/20">
                            <option.icon className="h-7 w-7 text-blue-300" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
                            {option.label}
                        </h3>
                        <p className="text-sm leading-relaxed text-blue-100/60">{option.desc}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                            Preisanfrage starten <ArrowRight size={14} />
                        </div>
                    </Link>
                ) : (
                    <button
                        key={option.id}
                        onClick={() =>
                            setState((prev) => ({
                                ...prev,
                                service: option.id as ServiceType,
                                step: 2,
                            }))
                        }
                        className="group relative w-full rounded-[24px] border border-white/10 bg-[#11131A] p-7 text-start shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.03]"
                        type="button"
                    >
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] transition-colors group-hover:bg-blue-400/10">
                            <option.icon className="h-7 w-7 text-white/75 transition-colors group-hover:text-blue-300" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
                            {option.label}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/50">{option.desc}</p>
                    </button>
                )
            ))}
        </div>
    );

    const renderDetails = () => (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-2 text-center">
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {t?.headings?.details_prefix || "Angaben zu"}{" "}
                    {state.service ? t?.services?.[state.service]?.label : ""}
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FieldBox
                    label={t?.form?.start_address || "Startadresse"}
                    icon={<MapPin size={16} />}
                >
                    <input
                        value={state.details.startAddress || ""}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                details: { ...prev.details, startAddress: e.target.value },
                            }))
                        }
                        className="h-11 w-full bg-transparent text-white outline-none placeholder:text-white/30"
                        placeholder={
                            t?.form?.placeholder_address ||
                            defaultBooking.form.placeholder_address
                        }
                    />
                </FieldBox>

                {state.service === "umzug" && (
                    <FieldBox
                        label={t?.form?.end_address || "Zieladresse"}
                        icon={<MapPin size={16} />}
                    >
                        <input
                            value={state.details.endAddress || ""}
                            onChange={(e) =>
                                setState((prev) => ({
                                    ...prev,
                                    details: { ...prev.details, endAddress: e.target.value },
                                }))
                            }
                            className="h-11 w-full bg-transparent text-white outline-none placeholder:text-white/30"
                            placeholder={
                                t?.form?.placeholder_address ||
                                defaultBooking.form.placeholder_address
                            }
                        />
                    </FieldBox>
                )}
            </div>

            <FieldBox label={t?.form?.date || "Wunschtermin"} icon={<Calendar size={16} />}>
                <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={state.details.date || ""}
                    onChange={(e) =>
                        setState((prev) => ({
                            ...prev,
                            details: { ...prev.details, date: e.target.value },
                        }))
                    }
                    className="h-11 w-full bg-transparent text-white outline-none"
                />
            </FieldBox>

            <div className="flex justify-center gap-4 pt-6">
                <PremiumButton variant="ghost" onClick={prevStep} type="button">
                    <ArrowLeft className="me-2 h-4 w-4" /> {t?.buttons?.back || "Zurück"}
                </PremiumButton>
                <PremiumButton
                    onClick={nextStep}
                    type="button"
                    disabled={!isStepTwoValid}
                >
                    {t?.buttons?.next || "Weiter"}{" "}
                    <ArrowRight className="ms-2 h-4 w-4" />
                </PremiumButton>
            </div>
        </div>
    );

    const renderUpgrades = () => {
        const u = t?.upgrades || {};
        const relevantUpgrades = [
            {
                id: "ladies_team",
                title: u?.ladies_team?.title || "Frauen-Team",
                icon: Users,
                desc: u?.ladies_team?.desc || "",
                service: ["umzug", "reinigung"],
            },
            {
                id: "24h_service",
                title: u?.["24h_service"]?.title || "24h-Service",
                icon: Clock,
                desc: u?.["24h_service"]?.desc || "",
                service: ["umzug", "entsorgung", "reinigung"],
            },
            {
                id: "furniture_opt",
                title: u?.furniture_opt?.title || "Möbelservice",
                icon: Sparkles,
                desc: u?.furniture_opt?.desc || "",
                service: "umzug",
            },
            {
                id: "storage_rot",
                title: u?.storage_rot?.title || "Zwischenlagerung",
                icon: PackageOpen,
                desc: u?.storage_rot?.desc || "",
                service: "umzug",
            },
            {
                id: "maybe_box",
                title: u?.maybe_box?.title || "Unsicheres Volumen",
                icon: Box,
                desc: u?.maybe_box?.desc || "",
                service: ["umzug", "entsorgung"],
            },
            {
                id: "clean_shield",
                title: u?.clean_shield?.title || "Schutzservice",
                icon: Shield,
                desc: u?.clean_shield?.desc || "",
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
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                        {t?.headings?.upgrades_title || "Optionale Extras"}
                    </h3>
                    <p className="text-white/50">
                        {t?.headings?.upgrades_subtitle || "Ergänzen Sie Ihre Anfrage bei Bedarf"}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                                    "relative rounded-[22px] border p-6 text-start transition-all",
                                    isSelected
                                        ? "border-blue-400/30 bg-blue-400/[0.08]"
                                        : "border-white/10 bg-[#11131A] hover:border-blue-400/25 hover:bg-white/[0.03]"
                                )}
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className={cn(
                                            "rounded-xl p-2.5",
                                            isSelected
                                                ? "bg-blue-400 text-[#0B0D12]"
                                                : "bg-white/[0.06] text-white/75"
                                        )}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-300" />}
                                </div>
                                <h4 className="mb-1 font-semibold text-white">{upgrade.title}</h4>
                                <p className="text-sm leading-relaxed text-white/50">
                                    {upgrade.desc}
                                </p>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 pt-6">
                    <PremiumButton variant="ghost" onClick={prevStep} type="button">
                        <ArrowLeft className="me-2 h-4 w-4" /> {t?.buttons?.back || "Zurück"}
                    </PremiumButton>
                    <PremiumButton onClick={nextStep} type="button">
                        {t?.buttons?.finish || "Weiter"}{" "}
                        <ArrowRight className="ms-2 h-4 w-4" />
                    </PremiumButton>
                </div>
            </div>
        );
    };

    const renderContact = () => {
        return (
            <div className="mx-auto max-w-2xl space-y-8">
                <div className="text-center">
                    <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white">
                        {t?.headings?.summary_title || "Kontaktdaten"}
                    </h3>
                    <p className="text-white/50">
                        {t?.headings?.summary_subtitle || "Wir melden uns passend zu Ihrer Anfrage"}
                    </p>
                </div>

                <div className="space-y-4 rounded-[24px] border border-white/10 bg-[#11131A] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-lg font-semibold capitalize text-white">
                            {state.service ? t?.services?.[state.service]?.label : ""}
                        </span>
                        <CheckCircle2 className="h-5 w-5 text-blue-300" />
                    </div>

                    <div className="grid gap-2 text-sm text-white/50">
                        {state.details.startAddress ? (
                            <div>
                                <span className="font-medium text-white">
                                    {t?.form?.start_address || "Startadresse"}:
                                </span>{" "}
                                {state.details.startAddress}
                            </div>
                        ) : null}

                        {state.details.endAddress ? (
                            <div>
                                <span className="font-medium text-white">
                                    {t?.form?.end_address || "Zieladresse"}:
                                </span>{" "}
                                {state.details.endAddress}
                            </div>
                        ) : null}

                        {state.details.date ? (
                            <div>
                                <span className="font-medium text-white">
                                    {t?.form?.date || "Wunschtermin"}:
                                </span>{" "}
                                {state.details.date}
                            </div>
                        ) : null}
                    </div>

                    {state.upgrades.length > 0 && (
                        <div className="space-y-2">
                            <span className="text-sm text-white/45">Extras:</span>
                            <div className="flex flex-wrap gap-2">
                                {state.upgrades.map((upgradeId: string) => {
                                    const title = t?.upgrades?.[upgradeId]?.title || upgradeId;
                                    return (
                                        <span
                                            key={upgradeId}
                                            className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-200"
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
                        <FieldBox label={t?.form?.name || "Name"}>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                }
                                className="h-11 w-full bg-transparent text-white outline-none placeholder:text-white/30"
                                placeholder={
                                    t?.form?.placeholder_name ||
                                    defaultBooking.form.placeholder_name
                                }
                            />
                        </FieldBox>

                        <FieldBox label={t?.form?.email || "E-Mail"}>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                className="h-11 w-full bg-transparent text-white outline-none placeholder:text-white/30"
                                placeholder={
                                    t?.form?.placeholder_email ||
                                    defaultBooking.form.placeholder_email
                                }
                            />
                        </FieldBox>
                    </div>

                    <FieldBox label={t?.form?.phone || "Telefon"}>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            className="h-11 w-full bg-transparent text-white outline-none placeholder:text-white/30"
                            placeholder={
                                t?.form?.placeholder_phone ||
                                defaultBooking.form.placeholder_phone
                            }
                        />
                    </FieldBox>

                    <div className="space-y-2 rounded-[20px] border border-white/10 bg-[#11131A] p-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-white">
                            <Upload size={16} className="text-blue-300" />
                            {t?.form?.photos || "Fotos"}
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
                                id="smart-booking-file-upload"
                            />
                            <label
                                htmlFor="smart-booking-file-upload"
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 p-4 text-white transition-all hover:border-blue-400/40 hover:bg-white/[0.03]"
                            >
                                <Upload className="h-5 w-5 text-white/40" />
                                <span className="text-sm text-white/50">{renderPhotosLabel()}</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                        <PremiumButton variant="ghost" type="button" onClick={prevStep}>
                            <ArrowLeft className="me-2 h-4 w-4" /> {t?.buttons?.back || "Zurück"}
                        </PremiumButton>
                        <PremiumButton
                            className="w-full md:w-auto"
                            disabled={isSubmitting || !isContactValid}
                        >
                            {isSubmitting
                                ? t?.buttons?.sending || "Wird gesendet..."
                                : t?.buttons?.submit || "Anfrage absenden"}
                        </PremiumButton>
                    </div>
                </form>
            </div>
        );
    };

    if (!initialized) {
        return (
            <div className="mx-auto min-h-[400px] w-full max-w-5xl rounded-[28px] border border-white/10 bg-[#11131A]" />
        );
    }

    if (isSuccess) {
        const successTitle =
            t?.headings?.success_title || defaultBooking.headings.success_title;
        const successMessageTemplate =
            t?.headings?.success_message || defaultBooking.headings.success_message;
        const successEmailTemplate =
            t?.headings?.success_email || defaultBooking.headings.success_email;

        return (
            <div className="mx-auto flex min-h-[420px] w-full max-w-3xl flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#11131A] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/10">
                    <CheckCircle2 className="text-emerald-300" size={40} />
                </div>

                <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                    {successTitle}
                </h2>

                <p className="mb-2 text-sm text-white/70">
                    {successMessageTemplate.replace("{name}", formData.name || "")}
                </p>
                <p className="mb-8 text-sm text-white/50">
                    {successEmailTemplate.replace("{email}", formData.email || "")}
                </p>

                <PremiumButton onClick={resetWizard} type="button">
                    {t?.buttons?.new_request || "Neue Anfrage"}
                </PremiumButton>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl">
            <div className="mb-12">
                <div className="relative flex justify-between gap-2">
                    <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-white/10" />
                    <div
                        className="absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-blue-400 transition-all duration-500"
                        style={{
                            width: `${((state.step - 1) / (steps.length - 1)) * 100}%`,
                        }}
                    />

                    {steps.map((s) => (
                        <div
                            key={s.number}
                            className="flex flex-col items-center gap-2 bg-background px-2"
                        >
                            <div
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-all duration-300",
                                    state.step >= s.number
                                        ? "border-blue-400 bg-blue-400 text-[#0B0D12]"
                                        : "border-white/15 bg-[#11131A] text-white/45"
                                )}
                            >
                                {s.number}
                            </div>
                            <span
                                className={cn(
                                    "text-[11px] font-medium transition-colors",
                                    state.step >= s.number ? "text-blue-300" : "text-white/40"
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
                    transition={{ duration: 0.25 }}
                >
                    {state.step === 1 && (
                        <div className="space-y-8 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-semibold tracking-tight text-white">
                                    {t?.headings?.service_selection || "Leistung auswählen"}
                                </h2>
                                <p className="text-white/50">
                                    {t?.headings?.service_subtitle ||
                                        "Wählen Sie die passende Anfrageart"}
                                </p>
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

function FieldBox({
    label,
    icon,
    children,
}: {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2 rounded-[20px] border border-white/10 bg-[#11131A] p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-white">
                {icon}
                {label}
                <span className="text-red-400">*</span>
            </label>
            {children}
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
                <div className="mx-auto min-h-[400px] w-full max-w-5xl" />
            )}
        </div>
    );
}
