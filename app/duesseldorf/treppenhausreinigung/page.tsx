import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("treppenhausreinigung");

export default function DuesseldorfTreppenhausreinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="treppenhausreinigung" />;
}
