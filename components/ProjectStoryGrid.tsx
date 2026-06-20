import { getPublicProjectStories } from "@/lib/project-stories";
import { ProjectStoryCard } from "@/components/ProjectStoryCard";

type ProjectStoryGridProps = {
  serviceKey?: string;
  locationKey?: string;
  title?: string;
  intro?: string;
  className?: string;
};

export function ProjectStoryGrid({
  serviceKey,
  locationKey,
  title = "Projektstorys nur mit sauberer Kennzeichnung",
  intro = "Ohne echte freigegebene Daten zeigt FLOXANT typische Ausgangslagen. Sie sind Entscheidungshilfen, keine behaupteten Kundenfaelle.",
  className = "",
}: ProjectStoryGridProps) {
  const stories = getPublicProjectStories({ serviceKey, locationKey, limit: 3 });
  if (!stories.length) return null;

  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="ProjectStoryGrid">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Projektlogik</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <ProjectStoryCard key={story.storyKey} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
