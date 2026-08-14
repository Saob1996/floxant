import {
  buildDuesseldorfCleaningMetadata,
  DuesseldorfCleaningServicePage,
} from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("unterhaltsreinigung");

export default function DuesseldorfUnterhaltsreinigungPage() {
  return <DuesseldorfCleaningServicePage pageKey="unterhaltsreinigung" />;
}
