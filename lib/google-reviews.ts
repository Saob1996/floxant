import type { FloxantLocationKey } from "@/lib/floxant-locations";

export type VerifiedGoogleProfile = {
  profileUrl: string | null;
  reviewsUrl: string | null;
  writeReviewUrl: string | null;
  average: number | null;
  total: number | null;
  checkedOn: string;
};

// Manually read from Google's public business panel. No API, review texts or live sync.
export const googleReviewProfiles: Record<FloxantLocationKey, VerifiedGoogleProfile> = {
  duesseldorf: {
    profileUrl: "https://share.google/tedY32KMHfhljRSI5",
    reviewsUrl: "https://share.google/tedY32KMHfhljRSI5",
    writeReviewUrl: "https://www.google.com/search?q=FLOXANT+D%C3%BCsseldorf#lrd=0x47b8cbf6712047e7:0xaf7d07ef895953fd,3,,,,",
    average: 5.0,
    total: 21,
    checkedOn: "2026-09-09",
  },
  regensburg: {
    profileUrl: "https://share.google/sagV9wQiim0Uxfcnr",
    reviewsUrl: "https://share.google/sagV9wQiim0Uxfcnr",
    writeReviewUrl: "https://www.google.com/search?q=FLOXANT+Regensburg#lrd=0x2d18af8c882f718f:0x65b3f9030c90cc4e,3,,,,",
    average: 4.8,
    total: 17,
    checkedOn: "2026-09-09",
  },
};
