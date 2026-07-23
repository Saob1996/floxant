import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("fensterreinigung");

export default function DuesseldorfFensterreinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="fensterreinigung" />;
}
