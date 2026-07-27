import type { ElementType, ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function ProfessionalSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("professional-section-heading", align === "center" && "professional-section-heading--center", className)}>
      <p className="professional-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="professional-section-copy">{description}</p> : null}
    </div>
  );
}

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  tone?: "plain" | "soft" | "dark";
};

export function ProfessionalCard({ children, className, as: Tag = "article", id, tone = "plain" }: CardProps) {
  return <Tag id={id} className={cn("professional-card", `professional-card--${tone}`, className)}>{children}</Tag>;
}

type FactListProps = {
  items: readonly string[];
  className?: string;
};

export function ProfessionalFactList({ items, className }: FactListProps) {
  return (
    <ul className={cn("professional-fact-list", className)}>
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type StatusProps = {
  label: string;
  children: ReactNode;
  tone?: "info" | "success" | "warning";
  className?: string;
};

export function ProfessionalStatus({ label, children, tone = "info", className }: StatusProps) {
  return (
    <aside className={cn("professional-status", `professional-status--${tone}`, className)}>
      <p className="professional-status-label">{label}</p>
      <div>{children}</div>
    </aside>
  );
}
