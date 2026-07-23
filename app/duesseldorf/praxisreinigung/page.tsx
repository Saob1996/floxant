import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("praxisreinigung");

export default function DuesseldorfPraxisreinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="praxisreinigung" />;
}
