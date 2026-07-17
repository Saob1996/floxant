"use client";

import { useCallback, useState } from "react";

import { EnglishRequestForm } from "@/components/english/EnglishRequestForm";
import { RequestBriefBuilder } from "@/components/tools/RequestBriefBuilder";
import type { RequestBriefResult } from "@/lib/request-builder";

export function EnglishRequestBriefExperience() {
  const [result, setResult] = useState<RequestBriefResult | null>(null);
  const handleResult = useCallback((nextResult: RequestBriefResult) => setResult(nextResult), []);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:px-10">
      <RequestBriefBuilder
        locale="en"
        contactHref="/en/contact"
        formTargetId="english-request-brief"
        onResultChange={handleResult}
      />
      <section id="english-request-brief" className="scroll-mt-24" aria-labelledby="english-request-brief-title">
        <div className="mb-6 max-w-3xl">
          <h2 id="english-request-brief-title" className="text-3xl font-black tracking-tight text-slate-950">Send the brief only when you are ready</h2>
          <p className="mt-3 text-base leading-8 text-slate-700">Creating the brief does not transmit data. The existing request endpoint is used only after you review and submit this form.</p>
        </div>
        <EnglishRequestForm
          initialDetails={result?.completed ? result.brief : ""}
          source="/en/create-request"
          intent="english-request-brief"
          formId="english-request-brief-form"
        />
      </section>
    </div>
  );
}
