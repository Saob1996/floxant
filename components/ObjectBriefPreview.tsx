import { FileText } from "lucide-react";

import { CopyRequestSummaryButton } from "@/components/CopyRequestSummaryButton";
import { getObjectBriefChecklist, objectBriefSections } from "@/lib/object-brief-checklists";
import { buildRequestSummaryPayload } from "@/lib/missing-info";

type ObjectBriefPreviewProps = {
  serviceKey?: string;
  className?: string;
};

export function ObjectBriefPreview({
  serviceKey = "objektbrief",
  className = "",
}: ObjectBriefPreviewProps) {
  const checklist = getObjectBriefChecklist(serviceKey);
  const summary = buildRequestSummaryPayload({
    serviceKey,
    cityOrZip: "genannt",
    objectType: "genannt",
    urgency: "genannt",
    scope: "genannt",
    hasPhotos: true,
    hasOffer: serviceKey === "angebot-pruefen",
  });

  return (
    <section
      className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}
      data-component="ObjectBriefPreview"
      data-request-checklist-key={checklist.key}
      aria-labelledby="object-brief-preview"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Anfragebrief-Vorschau
          </p>
          <h2 id="object-brief-preview" className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            So wirkt ein kurzer, brauchbarer Objektbrief.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Die Vorschau speichert nichts und sendet nichts. Sie zeigt nur, welche Struktur FLOXANT schneller lesen kann.
          </p>
          <div className="mt-5">
            <CopyRequestSummaryButton text={summary.requestSummary} />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">{checklist.title}</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {objectBriefSections.map((section) => (
              <article key={section.key} className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="text-base font-black text-slate-950">{section.title}</h4>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{section.text}</p>
              </article>
            ))}
          </div>
          <ul className="mt-5 grid gap-2 text-sm font-bold leading-6 text-slate-700">
            {checklist.items.map((item) => (
              <li key={item} className="rounded-lg border border-blue-100 bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
