import type { Metadata } from "next";
import EntsorgungDuesseldorfPage, {
  generateMetadata as generatePrimaryMetadata,
} from "@/app/entsorgung-duesseldorf/page";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await generatePrimaryMetadata();
  return {
    ...metadata,
    alternates: { ...metadata.alternates, languages: undefined },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default EntsorgungDuesseldorfPage;
