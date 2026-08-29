import { RoundThreeServicePage } from "@/components/round3/RoundThreeServicePage";
import { roundThreeMetadata } from "@/lib/round3/metadata";

export const metadata = roundThreeMetadata("budgetMove", "de");

export default function Page() {
  return <RoundThreeServicePage serviceKey="budgetMove" locale="de" />;
}
