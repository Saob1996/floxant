"use client";

import { UploadCloud } from "lucide-react";

import { germanizeText } from "@/lib/german-text";

type UploadTone = "blue" | "emerald";

type UploadDropCardProps = {
  title: string;
  description: string;
  helper: string;
  accept: string;
  files: File[];
  dataEvent: string;
  tone?: UploadTone;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
};

const toneClasses: Record<
  UploadTone,
  { card: string; icon: string; button: string; helper: string; summary: string }
> = {
  blue: {
    card: "border-blue-200 bg-gradient-to-br from-white via-blue-50/50 to-white hover:border-blue-400 hover:bg-blue-50/80",
    icon: "bg-blue-600 text-white shadow-blue-600/20",
    button: "bg-blue-600 text-white group-hover:bg-blue-700",
    helper: "text-blue-800",
    summary: "border-blue-100 bg-blue-50 text-blue-950",
  },
  emerald: {
    card: "border-emerald-200 bg-gradient-to-br from-white via-emerald-50/50 to-white hover:border-emerald-400 hover:bg-emerald-50/80",
    icon: "bg-emerald-500 text-white shadow-emerald-500/20",
    button: "bg-emerald-600 text-white group-hover:bg-emerald-700",
    helper: "text-emerald-800",
    summary: "border-emerald-100 bg-emerald-50 text-emerald-950",
  },
};

function getFileSummary(files: File[]) {
  if (files.length === 0) return "Noch keine Datei ausgewählt";
  if (files.length === 1) return files[0].name;
  return `${files.length} Dateien ausgewählt`;
}

export function UploadDropCard({
  title,
  description,
  helper,
  accept,
  files,
  dataEvent,
  tone = "blue",
  multiple = true,
  onFilesChange,
}: UploadDropCardProps) {
  const classes = toneClasses[tone];
  const visibleFiles = files.slice(0, 3);
  const remainingCount = Math.max(0, files.length - visibleFiles.length);
  const cleanTitle = germanizeText(title);
  const cleanDescription = germanizeText(description);
  const cleanHelper = germanizeText(helper);

  return (
    <label
      aria-label={`${cleanTitle}: Dateien auswählen`}
      className={`group grid min-h-[11rem] cursor-pointer gap-4 rounded-[1.45rem] border border-dashed p-4 text-left shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-950/10 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 ${classes.card}`}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        data-event={dataEvent}
        onChange={(event) => onFilesChange(Array.from(event.target.files || []))}
        className="sr-only"
      />

      <span className="flex items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-lg ${classes.icon}`}>
          <UploadCloud className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-black text-slate-950">{cleanTitle}</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">{cleanDescription}</span>
        </span>
      </span>

      <span className="grid gap-3">
        <span className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-center">
          <span className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-xs font-black shadow-sm transition ${classes.button}`}>
            Dateien wählen
          </span>
          <span className={`min-w-0 truncate rounded-full border px-3 py-2.5 text-xs font-bold ${classes.summary}`}>
            {getFileSummary(files)}
          </span>
        </span>

        {files.length > 0 ? (
          <span className="grid gap-1 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
            {visibleFiles.map((file) => (
              <span key={`${file.name}-${file.size}`} className="truncate text-xs font-semibold text-slate-600">
                {file.name}
              </span>
            ))}
            {remainingCount > 0 ? (
              <span className="text-xs font-semibold text-slate-500">+ {remainingCount} weitere</span>
            ) : null}
          </span>
        ) : null}
      </span>

      <span className={`text-xs font-semibold leading-5 ${classes.helper}`}>{cleanHelper}</span>
    </label>
  );
}
