import { RoundThreeServicePage } from "@/components/round3/RoundThreeServicePage";
import { roundThreeMetadata } from "@/lib/round3/metadata";

export const metadata = roundThreeMetadata("europeMove", "en");

export default function Page() {
  return <RoundThreeServicePage serviceKey="europeMove" locale="en" />;
}
