import { Camera } from "lucide-react";

import {
  regensburgCleaningLocalFaqs,
  regensburgCleaningSnippetFaqs,
} from "@/lib/regensburg-cleaning-services";

const snippetFaqs = [...regensburgCleaningSnippetFaqs, ...regensburgCleaningLocalFaqs];

export function RegensburgCleaningSnippetAnswers() {
  return (
    <section id="reinigung-snippets-regensburg" className="flox-section pt-0">
      <div className="flox-shell">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-7 md:px-8 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <div className="flox-kicker">
                <Camera className="h-4 w-4" />
                FAQ & Snippet-Chancen
              </div>
              <h2 className="mt-6 flox-title-lg text-slate-950">
                Kurze Antworten, die vor dem Klick helfen.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Diese Antworten sprechen typische Suchfragen direkt an und
                machen klar, was Kunden senden sollen: Service, Ort, Fläche,
                Turnus, Zugang und Fotos.
              </p>
            </div>

            <div className="grid gap-3">
              {snippetFaqs.map((item) => (
                <details key={item.q} className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                  <summary className="cursor-pointer list-none text-base font-black text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
