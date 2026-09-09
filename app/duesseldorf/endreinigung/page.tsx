import { buildDuesseldorfCleaningMetadata, DuesseldorfCleaningServicePage } from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("endreinigung");

export default function EndreinigungDuesseldorfPage() {
  return <DuesseldorfCleaningServicePage pageKey="endreinigung" />;
}
