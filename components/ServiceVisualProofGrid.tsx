import { getPublicVisualProofItems } from "@/lib/visual-proof";
import { VisualProofCard } from "@/components/VisualProofCard";
import { germanText } from "@/lib/german-text";

type ServiceVisualProofGridProps = {
  serviceKey?: string;
  locationKey?: string;
  title?: string;
  intro?: string;
  className?: string;
};

export function ServiceVisualProofGrid({
  serviceKey,
  locationKey,
  title = "Visuelle Orientierung ohne private Daten",
  intro = "Die sichtbaren Proof-Visuals sind abstrakt oder neutral. Echte Fotos brauchen Privacy-Check, Freigabe und dürfen keine Personen, Kennzeichen oder privaten Dokumente zeigen.",
  className = "",
}: ServiceVisualProofGridProps) {
  const items = getPublicVisualProofItems({ serviceKey, locationKey, limit: 3 });
  if (!items.length) return null;

  return (
    <section className={`bg-slate-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="ServiceVisualProofGrid">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Visual Proof</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <VisualProofCard key={item.visualKey} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
