import dynamic from "next/dynamic";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";

const SmartBookingWizard = dynamic(
    () =>
        import("@/components/SmartBookingWizard").then((mod) => ({
            default: mod.SmartBookingWizard,
        })),
    {
        loading: () => (
            <div className="mx-auto min-h-[400px] w-full max-w-5xl rounded-3xl bg-white/5" />
        ),
    }
);

type IconEntry = {
    icon: LucideIcon;
    text: string;
    iconClassName?: string;
};

type ServiceCard = {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    lines: string[];
};

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type SpecialtyPageLayoutProps = {
    pageLocale: string;
    dict: any;
    heroBadge?: string;
    heroTitle: string;
    city: string;
    heroText?: string;
    ctaText?: string;
    breadcrumbs: BreadcrumbItem[];
    chips?: IconEntry[];
    cards?: ServiceCard[];
    sectionTitle?: string;
    sectionParagraphs?: string[];
    wizardBadge?: string;
    wizardTitle?: string;
    wizardText?: string;
};

function nonEmpty(values: Array<string | undefined | null>) {
    return values.filter((value): value is string => Boolean(value && value.trim()));
}

export function SpecialtyPageLayout({
    pageLocale,
    dict,
    heroBadge,
    heroTitle,
    city,
    heroText,
    ctaText,
    breadcrumbs,
    chips = [],
    cards = [],
    sectionTitle,
    sectionParagraphs = [],
    wizardBadge,
    wizardTitle,
    wizardText,
}: SpecialtyPageLayoutProps) {
    const visibleChips = chips.filter((chip) => chip.text?.trim());
    const visibleCards = cards
        .map((card) => ({
            ...card,
            lines: nonEmpty(card.lines),
        }))
        .filter((card) => card.title?.trim() || card.lines.length > 0);

    const visibleParagraphs = nonEmpty(sectionParagraphs);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Breadcrumbs pageLocale={pageLocale} items={breadcrumbs} />

            <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background px-6 pb-24 pt-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,121,255,0.10),transparent_36%)]" />

                <div className="relative z-10 mx-auto max-w-7xl space-y-8 text-center">
                    {heroBadge ? (
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold text-card-foreground shadow-sm backdrop-blur-sm">
                            <AlertTriangle className="h-4 w-4 text-primary" />
                            <span>{heroBadge}</span>
                        </div>
                    ) : null}

                    <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-6xl xl:text-7xl">
                        {heroTitle}
                        <br className="hidden md:block" />
                        <span className="text-primary">{city}</span>
                    </h1>

                    {heroText ? (
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-2xl">
                            {heroText}
                        </p>
                    ) : null}

                    {visibleChips.length > 0 ? (
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            {visibleChips.map((chip, index) => {
                                const Icon = chip.icon;
                                return (
                                    <span
                                        key={`${chip.text}-${index}`}
                                        className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-sm"
                                    >
                                        <Icon className={chip.iconClassName || "h-5 w-5 text-primary"} />
                                        {chip.text}
                                    </span>
                                );
                            })}
                        </div>
                    ) : null}

                    {ctaText ? (
                        <div className="mt-12 flex justify-center">
                            <a
                                href="#wizard"
                                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90"
                            >
                                {ctaText}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                            </a>
                        </div>
                    ) : null}
                </div>
            </section>

            <section className="px-6 py-24 text-start">
                <div className="mx-auto max-w-4xl">
                    {visibleCards.length > 0 ? (
                        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                            {visibleCards.map((card, index) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={`${card.title}-${index}`}
                                        className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-md"
                                    >
                                        <Icon className={card.iconClassName || "mb-6 h-10 w-10 text-primary"} />
                                        {card.title ? (
                                            <h2 className="mb-4 text-2xl font-bold">{card.title}</h2>
                                        ) : null}
                                        {card.lines.length > 0 ? (
                                            <ul className="space-y-3 text-muted-foreground">
                                                {card.lines.map((line, lineIndex) => (
                                                    <li key={`${line}-${lineIndex}`} className="flex gap-2">
                                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                    {sectionTitle || visibleParagraphs.length > 0 ? (
                        <div className="space-y-6 text-lg leading-loose text-muted-foreground">
                            {sectionTitle ? (
                                <h2 className="text-3xl font-extrabold text-foreground">
                                    {sectionTitle}
                                </h2>
                            ) : null}
                            {visibleParagraphs.map((paragraph, index) => (
                                <p key={`${paragraph}-${index}`}>{paragraph}</p>
                            ))}
                        </div>
                    ) : null}

                    <div
                        id="wizard"
                        className="relative mt-16 scroll-mt-24 rounded-[2rem] border border-border bg-card px-6 py-16 text-center text-card-foreground shadow-2xl md:rounded-[3rem]"
                    >
                        {wizardBadge ? (
                            <div className="absolute -top-6 start-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-lg rtl:translate-x-1/2">
                                {wizardBadge}
                            </div>
                        ) : null}

                        {wizardTitle ? (
                            <h2 className="mb-6 mt-6 text-3xl font-extrabold md:text-4xl">
                                {wizardTitle}
                            </h2>
                        ) : null}

                        {wizardText ? (
                            <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
                                {wizardText}
                            </p>
                        ) : null}

                        <div className="px-0 text-start md:px-6">
                            <SmartBookingWizard dict={dict} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}