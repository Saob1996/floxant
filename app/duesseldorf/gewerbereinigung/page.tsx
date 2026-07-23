import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("gewerbereinigung");

export default function DuesseldorfGewerbereinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="gewerbereinigung" />;
}
