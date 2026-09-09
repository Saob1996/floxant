import { socialProfiles } from "@/lib/social-profiles";
import type { FloxantLocationKey } from "@/lib/floxant-locations";

export function SocialLinks({ location, english = false, light = false }: {
  location?: FloxantLocationKey;
  english?: boolean;
  light?: boolean;
}) {
  const facebook = location === "regensburg"
    ? [socialProfiles.facebookRegensburg, socialProfiles.facebookDuesseldorf]
    : [socialProfiles.facebookDuesseldorf, socialProfiles.facebookRegensburg];
  const profiles = [socialProfiles.instagram, socialProfiles.x, ...facebook, socialProfiles.youtube];
  return (
    <nav aria-label={english ? "FLOXANT on social media" : "FLOXANT auf Social Media"} data-social-links className="mt-8 max-w-xl">
      <h2 className={`text-xl font-black ${light ? "text-slate-950" : "text-white"}`}>{english ? "FLOXANT on social media" : "FLOXANT auf Social Media"}</h2>
      <p className={`mt-2 text-sm leading-6 ${light ? "text-slate-600" : "text-slate-300"}`}>{english ? "Our profiles for Düsseldorf and Regensburg." : "Unsere Profile für Düsseldorf und Regensburg."}</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {profiles.map((profile) => (
        <a key={profile.href} href={profile.href} target="_blank" rel="noopener noreferrer"
          className={`inline-flex min-h-14 min-w-0 items-center gap-3 rounded-lg border px-4 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-100 focus-visible:outline-blue-700" : "border-white/25 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-cyan-200"}`}>
          <SocialIcon kind={profile.icon} light={light} />
          <span>{profile.label}</span>
          <span className="sr-only">{english ? " (opens in a new tab)" : " (öffnet in neuem Tab)"}</span>
        </a>
      ))}
      </div>
    </nav>
  );
}

function SocialIcon({ kind, light }: { kind: "instagram" | "x" | "facebook" | "youtube"; light: boolean }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" className="shrink-0" aria-hidden="true" focusable="false" fill="currentColor">
    {kind === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" /></> : null}
    {kind === "x" ? <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l8.3-9.5L1 2h6.5l4.5 6.8L18.9 2ZM17.9 20h1.7L6.5 4H4.7L17.9 20Z" /> : null}
    {kind === "facebook" ? <path d="M14 22v-9h3l.5-4H14V6.5c0-1.2.4-2 2-2h1.8V1.2C17.5 1.1 16.4 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z" /> : null}
    {kind === "youtube" ? <><path d="M21.6 6.3a3 3 0 0 0-2.1-2.1C17.7 3.7 12 3.7 12 3.7s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A32 32 0 0 0 2 12a32 32 0 0 0 .4 5.7 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A32 32 0 0 0 22 12a32 32 0 0 0-.4-5.7Z" /><path d="m10 8 6 4-6 4Z" fill={light ? "#ffffff" : "#0f172a"} /></> : null}
  </svg>;
}
