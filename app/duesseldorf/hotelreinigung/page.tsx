import { buildDuesseldorfCleaningMetadata, DuesseldorfCleaningServicePage } from "@/components/duesseldorf/DuesseldorfCleaningServicePage";

export const metadata = buildDuesseldorfCleaningMetadata("hotelreinigung");

export default function HotelreinigungDuesseldorfPage() {
  return <DuesseldorfCleaningServicePage pageKey="hotelreinigung" />;
}
