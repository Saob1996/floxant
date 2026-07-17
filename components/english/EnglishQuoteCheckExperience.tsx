"use client";

import { useCallback, useState } from "react";

import { EnglishRequestForm } from "@/components/english/EnglishRequestForm";
import { ClarityCheckTool } from "@/components/tools/ClarityCheckTool";
import type { ClarityCheckResult } from "@/lib/clarity-check";

export function EnglishQuoteCheckExperience() {
  const [result, setResult] = useState<ClarityCheckResult | null>(null);
  const handleResult = useCallback((nextResult: ClarityCheckResult) => setResult(nextResult), []);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:px-10">
      <ClarityCheckTool
        locale="en"
        contactHref="/en/contact"
        formTargetId="english-scope-request"
        onResultChange={handleResult}
      />
      <section id="english-scope-request" className="scroll-mt-24" aria-labelledby="english-scope-request-title">
        <div className="mb-6 max-w-3xl">
          <h2 id="english-scope-request-title" className="text-3xl font-black tracking-tight text-slate-950">Send the result only if you want FLOXANT to review your request</h2>
          <p className="mt-3 text-base leading-8 text-slate-700">Nothing is sent during the Scope Check. The existing request endpoint is used only after you complete and submit this form.</p>
        </div>
        <EnglishRequestForm
          initialDetails={result?.completed ? result.summary : ""}
          source="/en/quote-check"
          intent="english-quote-scope-check"
          defaultService="angebot-vergleichen"
          formId="english-quote-request-form"
        />
      </section>
    </div>
  );
}
