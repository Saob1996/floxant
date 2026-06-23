import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

import { germanText } from "@/lib/german-text";
import type { ProjectStory } from "@/lib/project-stories";

export function ProjectStoryCard({ story }: { story: ProjectStory }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" data-component="ProjectStoryCard" data-real-case={story.isRealCase ? "true" : "false"}>
      <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-blue-700">
        <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
        {story.isRealCase ? "Echte Projektstory" : "Typische Situation"}
      </p>
      <h3 className="mt-3 text-xl font-black text-slate-950">{germanText(story.title, story.title)}</h3>
      <dl className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
        <div>
          <dt className="font-black text-slate-950">Ausgangslage</dt>
          <dd className="font-semibold">{germanText(story.situation, story.situation)}</dd>
        </div>
        <div>
          <dt className="font-black text-slate-950">Vorgehen</dt>
          <dd className="font-semibold">{germanText(story.approach, story.approach)}</dd>
        </div>
        <div>
          <dt className="font-black text-slate-950">Was geholfen hätte</dt>
          <dd className="font-semibold">{germanText(story.whatHelped.join(", "), story.whatHelped.join(", "))}</dd>
        </div>
      </dl>
      <Link href={story.relatedCTA.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
        {germanText(story.relatedCTA.label, story.relatedCTA.label)}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
