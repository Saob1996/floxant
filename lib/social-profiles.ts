export const socialProfiles = {
  instagram: { label: "Instagram", href: "https://www.instagram.com/flox.ant/", icon: "instagram" },
  x: { label: "X", href: "https://x.com/Floxant", icon: "x" },
  facebookDuesseldorf: { label: "Facebook Düsseldorf", href: "https://www.facebook.com/profile.php?id=61594035637893", icon: "facebook" },
  facebookRegensburg: { label: "Facebook Regensburg", href: "https://www.facebook.com/profile.php?id=61586434809898", icon: "facebook" },
  youtube: { label: "YouTube", href: "https://www.youtube.com/@FLOXANTServices", icon: "youtube" },
} as const;

export const organizationSocialUrls = Object.values(socialProfiles).map((profile) => profile.href);

export function getLocationSocialUrls(location: "duesseldorf" | "regensburg") {
  return [socialProfiles.instagram.href, socialProfiles.x.href,
    location === "duesseldorf" ? socialProfiles.facebookDuesseldorf.href : socialProfiles.facebookRegensburg.href,
    socialProfiles.youtube.href];
}
