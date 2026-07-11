"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyRequestSummaryButtonProps = {
  text: string;
  label?: string;
};

export function CopyRequestSummaryButton({
  text,
  label = "Zusammenfassung kopieren",
}: CopyRequestSummaryButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {copied ? "Kopiert" : label}
    </button>
  );
}
