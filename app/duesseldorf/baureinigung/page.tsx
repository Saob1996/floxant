import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("baureinigung");

export default function DuesseldorfBaureinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="baureinigung" />;
}
